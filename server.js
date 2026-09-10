const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const { Pool } = require("pg");

const app = express();

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(express.json());

app.use((req, res, next) => {
  // During active development/deploys, do not let the browser keep an old
  // index/script/style version that makes the app appear broken until refresh.
  res.setHeader("Cache-Control", "no-store");
  next();
});

// SERVE YOUR GAME
app.use(express.static(path.join(__dirname, "public")));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false
});

const JWT_SECRET =
  process.env.JWT_SECRET || "change-this-before-production";

pool.on("error", (error) => {
  console.error("POSTGRES POOL ERROR:", error);
});

// ======================================================
// DATABASE
// ======================================================

async function initDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS players (
      id BIGSERIAL PRIMARY KEY,

      username_key TEXT UNIQUE NOT NULL,
      username TEXT NOT NULL,
      pin_hash TEXT NOT NULL,

      coins BIGINT NOT NULL DEFAULT 0,
      rebirths INTEGER NOT NULL DEFAULT 0,
      best_wave INTEGER NOT NULL DEFAULT 0,
      total_kills BIGINT NOT NULL DEFAULT 0,

      highest_wave INTEGER NOT NULL DEFAULT 0,
      highest_money BIGINT NOT NULL DEFAULT 0,
      highest_kills BIGINT NOT NULL DEFAULT 0,

      upgrades JSONB NOT NULL DEFAULT '{}'::jsonb,
      owned JSONB NOT NULL DEFAULT '{}'::jsonb,
      equipped JSONB NOT NULL DEFAULT '{}'::jsonb,
      keycaps JSONB NOT NULL DEFAULT '["standard"]'::jsonb,

      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  console.log("Database ready.");
}

// ======================================================
// HELPERS
// ======================================================

function createToken(player) {
  return jwt.sign(
    {
      id: player.id,
      usernameKey: player.username_key
    },
    JWT_SECRET,
    {
      expiresIn: "30d"
    }
  );
}

function publicPlayer(player) {
  return {
    username: player.username,

    coins: Number(player.coins || 0),
    rebirths: Number(player.rebirths || 0),

    bestWave: Number(player.best_wave || 0),
    totalKills: Number(player.total_kills || 0),

    highestWave: Number(player.highest_wave || 0),
    highestMoney: Number(player.highest_money || 0),
    highestKills: Number(player.highest_kills || 0),

    upgrades: player.upgrades || {},
    owned: player.owned || {},
    equipped: player.equipped || {},
    keycaps: player.keycaps || ["standard"]
  };
}

function requireLogin(req, res, next) {
  const header = req.headers.authorization || "";

  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Not logged in."
    });
  }

  const token = header.slice(7);

  try {
    req.user = jwt.verify(
      token,
      JWT_SECRET
    );

    next();
  }
  catch {
    return res.status(401).json({
      error: "Session expired."
    });
  }
}

// ======================================================
// RATE LIMIT LOGIN
// ======================================================

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many login attempts. Try again later."
  }
});

// ======================================================
// STATUS
// ======================================================

app.get("/api/status", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      online: true,
      database: true,
      game: "Keyboard Invaders"
    });
  } catch (error) {
    console.error("STATUS ERROR:", error);
    res.status(503).json({
      online: false,
      database: false,
      game: "Keyboard Invaders"
    });
  }
});

// ======================================================
// CREATE ACCOUNT
// ======================================================

app.post(
  "/api/register",
  loginLimiter,
  async (req, res) => {

    try {

      let username =
        String(req.body.username || "").trim();

      let code =
        String(req.body.code || "").trim();

      if (
        username.length < 3 ||
        username.length > 16
      ) {
        return res.status(400).json({
          error: "Username must be 3-16 characters."
        });
      }

      if (
        !/^[a-zA-Z0-9_]+$/.test(username)
      ) {
        return res.status(400).json({
          error:
            "Username can only use letters, numbers and underscores."
        });
      }

      if (!/^\d{4}$/.test(code)) {
        return res.status(400).json({
          error: "Code must be exactly 4 numbers."
        });
      }

      const usernameKey =
        username.toLowerCase();

      const existing =
        await pool.query(
          `
          SELECT id
          FROM players
          WHERE username_key = $1
          `,
          [usernameKey]
        );

      if (existing.rows.length) {
        return res.status(409).json({
          error: "Username already taken."
        });
      }

      const pinHash =
        await bcrypt.hash(code, 12);

      const result =
        await pool.query(
          `
          INSERT INTO players (
            username_key,
            username,
            pin_hash
          )

          VALUES ($1, $2, $3)

          RETURNING *
          `,
          [
            usernameKey,
            username,
            pinHash
          ]
        );

      const player = result.rows[0];

      const token =
        createToken(player);

      res.json({
        success: true,
        token,
        player: publicPlayer(player)
      });

    }
    catch (error) {

      console.error(
        "REGISTER ERROR:",
        error
      );

      if (error && error.code === "23505") {
        return res.status(409).json({
          error: "Username already taken."
        });
      }

      res.status(500).json({
        error: "Could not create account."
      });

    }

  }
);

// ======================================================
// LOGIN
// ======================================================

app.post(
  "/api/login",
  loginLimiter,
  async (req, res) => {

    try {

      const username =
        String(req.body.username || "")
          .trim();

      const code =
        String(req.body.code || "")
          .trim();

      if (!username || !/^\d{4}$/.test(code)) {
        return res.status(400).json({
          error:
            "Enter your username and 4-digit code."
        });
      }

      const usernameKey =
        username.toLowerCase();

      const result =
        await pool.query(
          `
          SELECT *
          FROM players
          WHERE username_key = $1
          `,
          [usernameKey]
        );

      if (!result.rows.length) {
        return res.status(401).json({
          error: "Account not found."
        });
      }

      const player =
        result.rows[0];

      const correctCode =
        await bcrypt.compare(
          code,
          player.pin_hash
        );

      if (!correctCode) {
        return res.status(401).json({
          error: "Incorrect code."
        });
      }

      const token =
        createToken(player);

      res.json({
        success: true,
        token,
        player: publicPlayer(player)
      });

    }
    catch (error) {

      console.error(
        "LOGIN ERROR:",
        error
      );

      res.status(500).json({
        error: "Could not log in."
      });

    }

  }
);

// ======================================================
// CURRENT ACCOUNT
// ======================================================

app.get(
  "/api/me",
  requireLogin,
  async (req, res) => {

    try {

      const result =
        await pool.query(
          `
          SELECT *
          FROM players
          WHERE id = $1
          `,
          [req.user.id]
        );

      if (!result.rows.length) {
        return res.status(404).json({
          error: "Account not found."
        });
      }

      res.json({
        player:
          publicPlayer(
            result.rows[0]
          )
      });

    }
    catch (error) {

      console.error(
        "ME ERROR:",
        error
      );

      res.status(500).json({
        error: "Could not load account."
      });

    }

  }
);

// ======================================================
// SAVE GAME
// ======================================================

app.put(
  "/api/save",
  requireLogin,
  async (req, res) => {

    try {

      const coins =
        Math.max(
          0,
          Math.floor(
            Number(req.body.coins) || 0
          )
        );

      const rebirths =
        Math.max(
          0,
          Math.floor(
            Number(req.body.rebirths) || 0
          )
        );

      const bestWave =
        Math.max(
          0,
          Math.floor(
            Number(req.body.bestWave) || 0
          )
        );

      const totalKills =
        Math.max(
          0,
          Math.floor(
            Number(req.body.totalKills) || 0
          )
        );

      const upgrades =
        req.body.upgrades || {};

      const owned =
        req.body.owned || {};

      const equipped =
        req.body.equipped || {};

      const keycaps =
        Array.isArray(req.body.keycaps)
          ? req.body.keycaps
          : ["standard"];

      const result =
        await pool.query(
          `
          UPDATE players

          SET
            coins = $2,
            rebirths = $3,
            best_wave = $4,
            total_kills = $5,

            highest_wave =
              GREATEST(
                highest_wave,
                $4
              ),

            highest_money =
              GREATEST(
                highest_money,
                $2
              ),

            highest_kills =
              GREATEST(
                highest_kills,
                $5
              ),

            upgrades = $6,
            owned = $7,
            equipped = $8,
            keycaps = $9,

            updated_at = NOW()

          WHERE id = $1

          RETURNING *
          `,
          [
            req.user.id,
            coins,
            rebirths,
            bestWave,
            totalKills,
            upgrades,
            owned,
            equipped,
            keycaps
          ]
        );

      if (!result.rows.length) {
        return res.status(404).json({
          error: "Account not found."
        });
      }

      res.json({
        success: true,
        player:
          publicPlayer(
            result.rows[0]
          )
      });

    }
    catch (error) {

      console.error(
        "SAVE ERROR:",
        error
      );

      res.status(500).json({
        error: "Could not save game."
      });

    }

  }
);

// ======================================================
// LEADERBOARD
// ======================================================

app.get(
  "/api/leaderboard",
  async (req, res) => {

    try {

      const waves =
        await pool.query(`
          SELECT
            username,
            highest_wave AS score
          FROM players
          ORDER BY
            highest_wave DESC,
            updated_at ASC
          LIMIT 10
        `);

      const kills =
        await pool.query(`
          SELECT
            username,
            highest_kills AS score
          FROM players
          ORDER BY
            highest_kills DESC,
            updated_at ASC
          LIMIT 10
        `);

      const money =
        await pool.query(`
          SELECT
            username,
            highest_money AS score
          FROM players
          ORDER BY
            highest_money DESC,
            updated_at ASC
          LIMIT 10
        `);

      res.json({
        waves: waves.rows,
        kills: kills.rows,
        money: money.rows
      });

    }
    catch (error) {

      console.error(
        "LEADERBOARD ERROR:",
        error
      );

      res.status(500).json({
        error:
          "Could not load leaderboard."
      });

    }

  }
);

// ======================================================
// FALLBACK TO GAME
// ======================================================

app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found." });
  }

  res.sendFile(
    path.join(__dirname, "public", "index.html"),
    error => {
      if (error) next(error);
    }
  );
});

app.use((error, req, res, next) => {
  console.error("SERVER ERROR:", error);

  if (res.headersSent) return next(error);

  res.status(500).json({
    error: "Server error."
  });
});

// ======================================================
// START SERVER
// ======================================================

const PORT =
  process.env.PORT || 3000;

initDatabase()
  .then(() => {

    app.listen(
      PORT,
      "0.0.0.0",
      () => {

        console.log(
          `Keyboard Invaders running on port ${PORT}`
        );

      }
    );

  })
  .catch(error => {

    console.error(
      "DATABASE STARTUP ERROR:",
      error
    );

    process.exit(1);

  });