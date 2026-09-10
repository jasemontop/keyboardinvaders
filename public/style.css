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
// Always serve the game homepage as HTML.
app.get("/", (req, res) => {
  res.type("html");
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve CSS, JS, images, sounds, etc.
// index:false prevents static middleware from deciding what "/" should be.
app.use(express.static(path.join(__dirname, "public"), { index: false }));

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

  await pool.query(`
    ALTER TABLE players
    ADD COLUMN IF NOT EXISTS save_version BIGINT NOT NULL DEFAULT 0;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS game_events (
      id BIGSERIAL PRIMARY KEY,
      target_username_key TEXT,
      event_type TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      payload JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS game_events_target_id_idx
    ON game_events (target_username_key, id);
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
    saveVersion: Number(player.save_version || 0),

    upgrades: player.upgrades || {},
    owned: player.owned || {},
    equipped: player.equipped || {},
    keycaps: player.keycaps || ["standard"]
  };
}

async function createGameEvent({ targetUsernameKey = null, eventType = "info", title, message, payload = {} }) {
  await pool.query(
    `INSERT INTO game_events (target_username_key, event_type, title, message, payload)
     VALUES ($1, $2, $3, $4, $5)`,
    [targetUsernameKey, eventType, String(title || ""), String(message || ""), payload || {}]
  );
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


function requireAdmin(req, res, next) {
  if (!req.user || String(req.user.usernameKey || "").toLowerCase() !== "jasem") {
    return res.status(403).json({
      error: "Admin access denied."
    });
  }

  next();
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

      const allowedCharacters = [
        "astronaut",
        "pilot",
        "robot",
        "rogue"
      ];

      const character =
        allowedCharacters.includes(String(req.body.character || "").toLowerCase())
          ? String(req.body.character).toLowerCase()
          : "astronaut";

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
            pin_hash,
            equipped
          )

          VALUES ($1, $2, $3, $4)

          RETURNING *
          `,
          [
            usernameKey,
            username,
            pinHash,
            { gun: "pulse", drone: null, keyboard: "standard", keycap: "standard", character }
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
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const currentResult = await client.query(
        `
        SELECT *
        FROM players
        WHERE id = $1
        FOR UPDATE
        `,
        [req.user.id]
      );

      if (!currentResult.rows.length) {
        await client.query("ROLLBACK");
        return res.status(404).json({
          error: "Account not found."
        });
      }

      const current = currentResult.rows[0];

      // Coins are always merged as a +/- delta.
      // A stale browser can never replace the whole server balance.
      const coinDelta =
        Math.max(
          -1000000000,
          Math.min(
            1000000000,
            Math.floor(Number(req.body.coinDelta) || 0)
          )
        );

      const requestedVersion =
        Math.max(
          0,
          Math.floor(Number(req.body.saveVersion) || 0)
        );

      const currentVersion =
        Math.max(
          0,
          Number(current.save_version || 0)
        );

      const stateIsCurrent =
        requestedVersion === currentVersion;

      const rebirths =
        Math.max(
          0,
          Math.floor(Number(req.body.rebirths) || 0)
        );

      const bestWave =
        Math.max(
          0,
          Math.floor(Number(req.body.bestWave) || 0)
        );

      const totalKills =
        Math.max(
          0,
          Math.floor(Number(req.body.totalKills) || 0)
        );

      const incomingUpgrades =
        req.body.upgrades && typeof req.body.upgrades === "object" && !Array.isArray(req.body.upgrades)
          ? req.body.upgrades
          : {};

      const incomingOwned =
        req.body.owned && typeof req.body.owned === "object" && !Array.isArray(req.body.owned)
          ? req.body.owned
          : {};

      const incomingEquipped =
        req.body.equipped && typeof req.body.equipped === "object" && !Array.isArray(req.body.equipped)
          ? req.body.equipped
          : current.equipped;

      const incomingKeycaps =
        Array.isArray(req.body.keycaps)
          ? req.body.keycaps
          : [];

      const currentUpgrades =
        current.upgrades && typeof current.upgrades === "object" && !Array.isArray(current.upgrades)
          ? current.upgrades
          : {};

      const currentOwned =
        current.owned && typeof current.owned === "object" && !Array.isArray(current.owned)
          ? current.owned
          : {};

      const currentKeycaps =
        Array.isArray(current.keycaps)
          ? current.keycaps
          : ["standard"];

      const isRebirth =
        rebirths > Math.max(0, Number(current.rebirths || 0));

      let mergedUpgrades;
      let mergedOwned;
      let mergedEquipped;

      if (isRebirth) {
        // Rebirth is an intentional reset, so accept the client's reset state.
        mergedUpgrades = incomingUpgrades;
        mergedOwned = incomingOwned;
        mergedEquipped = incomingEquipped;
      }
      else {
        // Normal saves are monotonic:
        // an old tab can NEVER erase an upgrade or owned item.
        mergedUpgrades = { ...currentUpgrades };

        for (const [key, value] of Object.entries(incomingUpgrades)) {
          const incomingLevel = Number(value);
          const currentLevel = Number(mergedUpgrades[key]);

          if (Number.isFinite(incomingLevel)) {
            mergedUpgrades[key] = Number.isFinite(currentLevel)
              ? Math.max(currentLevel, incomingLevel)
              : incomingLevel;
          }
        }

        const mergeOwnedList = (currentList, incomingList, starter = []) => {
          const combined = [
            ...starter,
            ...(Array.isArray(currentList) ? currentList : []),
            ...(Array.isArray(incomingList) ? incomingList : [])
          ];

          return [...new Set(combined.filter(value => typeof value === "string" && value))];
        };

        mergedOwned = {
          guns: mergeOwnedList(currentOwned.guns, incomingOwned.guns, ["pulse"]),
          drones: mergeOwnedList(currentOwned.drones, incomingOwned.drones),
          keyboards: mergeOwnedList(currentOwned.keyboards, incomingOwned.keyboards, ["standard"])
        };

        // Equip changes are allowed, but ownership itself is never lost.
        mergedEquipped = incomingEquipped;
      }

      const mergedKeycaps = [
        ...new Set([
          "standard",
          ...currentKeycaps,
          ...incomingKeycaps
        ].filter(value => typeof value === "string" && value))
      ];

      const result = await client.query(
        `
        UPDATE players
        SET
          coins = GREATEST(0, coins + $2),

          rebirths = GREATEST(rebirths, $3),

          best_wave = CASE
            WHEN $10 THEN $4
            ELSE GREATEST(best_wave, $4)
          END,

          total_kills = GREATEST(total_kills, $5),

          highest_wave = GREATEST(highest_wave, $4),
          highest_money = GREATEST(highest_money, GREATEST(0, coins + $2)),
          highest_kills = GREATEST(highest_kills, $5),

          upgrades = $6::jsonb,
          owned = $7::jsonb,
          equipped = $8::jsonb,
          keycaps = $9::jsonb,

          save_version = save_version + 1,
          updated_at = NOW()

        WHERE id = $1
        RETURNING *
        `,
        [
          req.user.id,
          coinDelta,
          rebirths,
          bestWave,
          totalKills,
          JSON.stringify(mergedUpgrades),
          JSON.stringify(mergedOwned),
          JSON.stringify(mergedEquipped),
          JSON.stringify(mergedKeycaps),
          isRebirth
        ]
      );

      await client.query("COMMIT");

      res.json({
        success: true,
        stateConflict: !stateIsCurrent,
        player: publicPlayer(result.rows[0])
      });
    }
    catch (error) {
      try {
        await client.query("ROLLBACK");
      } catch {}

      console.error("SAVE ERROR:", error);

      res.status(500).json({
        error: "Could not save progress."
      });
    }
    finally {
      client.release();
    }
  }
);

// ======================================================
// PROGRESS RESET
// ======================================================

async function resetPlayerProgressByKey(usernameKey) {
  const result = await pool.query(
    `
    UPDATE players
    SET
      coins = 0,
      rebirths = 0,
      best_wave = 0,
      total_kills = 0,
      highest_wave = 0,
      highest_money = 0,
      highest_kills = 0,
      upgrades = '{"damage":1,"bullets":1,"cooling":1,"health":1,"precision":1,"crit":1,"magnet":1,"bulletSpeed":0}'::jsonb,
      owned = '{"guns":["pulse"],"drones":[],"keyboards":["standard"]}'::jsonb,
      equipped = '{"gun":"pulse","drone":null,"keyboard":"standard","keycap":"standard","character":"astronaut"}'::jsonb,
      keycaps = '["standard"]'::jsonb,
      save_version = save_version + 1,
      updated_at = NOW()
    WHERE username_key = $1
    RETURNING *
    `,
    [String(usernameKey || "").toLowerCase()]
  );

  return result.rows[0] || null;
}

app.post(
  "/api/reset-progress",
  requireLogin,
  async (req, res) => {
    try {
      const player = await resetPlayerProgressByKey(req.user.usernameKey);
      if (!player) return res.status(404).json({ error: "Account not found." });

      await createGameEvent({
        targetUsernameKey: String(req.user.usernameKey || "").toLowerCase(),
        eventType: "reset",
        title: "♻ PROGRESS RESET",
        message: "Your game progress was reset.",
        payload: { by: "self" }
      });

      res.json({ success: true, player: publicPlayer(player) });
    } catch (error) {
      console.error("SELF RESET ERROR:", error);
      res.status(500).json({ error: "Could not reset progress." });
    }
  }
);

// ======================================================
// ADMIN
// ======================================================

app.get(
  "/api/admin/users",
  requireLogin,
  requireAdmin,
  async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT
          username,
          coins,
          rebirths,
          best_wave,
          total_kills,
          GREATEST(highest_wave, best_wave) AS highest_wave,
          GREATEST(highest_kills, total_kills) AS highest_kills,
          GREATEST(highest_money, coins) AS highest_money,
          created_at,
          updated_at
        FROM players
        ORDER BY
          updated_at DESC,
          username ASC
      `);

      res.json({
        players: result.rows.map(player => ({
          username: player.username,
          coins: Number(player.coins || 0),
          rebirths: Number(player.rebirths || 0),
          bestWave: Number(player.best_wave || 0),
          totalKills: Number(player.total_kills || 0),
          highestWave: Number(player.highest_wave || 0),
          highestKills: Number(player.highest_kills || 0),
          highestMoney: Number(player.highest_money || 0),
          updatedAt: player.updated_at
        }))
      });
    }
    catch (error) {
      console.error("ADMIN USERS ERROR:", error);
      res.status(500).json({
        error: "Could not load players."
      });
    }
  }
);

app.post(
  "/api/admin/reset-progress",
  requireLogin,
  requireAdmin,
  async (req, res) => {
    try {
      const target = String(req.body.target || "").trim().toLowerCase();
      if (!target) return res.status(400).json({ error: "Enter a player username." });

      const player = await resetPlayerProgressByKey(target);
      if (!player) return res.status(404).json({ error: "Player not found." });

      await createGameEvent({
        targetUsernameKey: target,
        eventType: "reset",
        title: "♻ PROGRESS RESET",
        message: "jasem reset your game progress.",
        payload: { by: "jasem" }
      });

      res.json({ success: true, player: publicPlayer(player) });
    } catch (error) {
      console.error("ADMIN RESET ERROR:", error);
      res.status(500).json({ error: "Could not reset player progress." });
    }
  }
);

app.post(
  "/api/admin/coins",
  requireLogin,
  requireAdmin,
  async (req, res) => {
    try {
      const target =
        String(req.body.target || "")
          .trim()
          .toLowerCase();

      const action =
        String(req.body.action || "")
          .trim()
          .toLowerCase();

      const amount =
        Math.max(
          0,
          Math.min(
            1000000000,
            Math.floor(Number(req.body.amount) || 0)
          )
        );

      if (!target) {
        return res.status(400).json({
          error: "Enter a player username."
        });
      }

      if (!["add", "remove", "set"].includes(action)) {
        return res.status(400).json({
          error: "Invalid admin action."
        });
      }

      let expression;

      if (action === "add") {
        expression = "coins + $2";
      } else if (action === "remove") {
        expression = "GREATEST(0, coins - $2)";
      } else {
        expression = "$2";
      }

      const result = await pool.query(
        `
        UPDATE players
        SET
          coins = ${expression},
          highest_money = GREATEST(
            highest_money,
            CASE
              WHEN '${action}' = 'add' THEN coins + $2
              WHEN '${action}' = 'set' THEN $2
              ELSE highest_money
            END
          ),
          updated_at = NOW()
        WHERE username_key = $1
        RETURNING *
        `,
        [target, amount]
      );

      if (!result.rows.length) {
        return res.status(404).json({
          error: "Player not found."
        });
      }

      const updatedPlayer = result.rows[0];

      await createGameEvent({
        targetUsernameKey: target,
        eventType: "coins",
        title: action === "add" ? "🪙 COINS RECEIVED" : "🛠 BALANCE UPDATED",
        message:
          action === "add"
            ? `jasem sent you ${amount.toLocaleString()} coins.`
            : action === "remove"
              ? `jasem removed ${amount.toLocaleString()} coins from your balance.`
              : `jasem set your balance to ${Number(updatedPlayer.coins || 0).toLocaleString()} coins.`,
        payload: {
          action,
          amount,
          coins: Number(updatedPlayer.coins || 0)
        }
      });

      res.json({
        success: true,
        player: publicPlayer(updatedPlayer)
      });
    }
    catch (error) {
      console.error("ADMIN COINS ERROR:", error);
      res.status(500).json({
        error: "Admin action failed."
      });
    }
  }
);


// ======================================================
// LIVE EVENTS / GLOBAL ADMIN MESSAGES
// ======================================================

app.get(
  "/api/events",
  requireLogin,
  async (req, res) => {
    try {
      const after = Math.max(0, Math.floor(Number(req.query.after) || 0));

      const result = await pool.query(
        `
        SELECT id, event_type, title, message, payload, created_at
        FROM game_events
        WHERE id > $1
          AND (target_username_key IS NULL OR target_username_key = $2)
          AND created_at > NOW() - INTERVAL '24 hours'
        ORDER BY id ASC
        LIMIT 50
        `,
        [after, String(req.user.usernameKey || "").toLowerCase()]
      );

      const latest = await pool.query(`SELECT COALESCE(MAX(id), 0) AS id FROM game_events`);

      res.json({
        events: result.rows.map(row => ({
          id: Number(row.id),
          type: row.event_type,
          title: row.title,
          message: row.message,
          payload: row.payload || {},
          createdAt: row.created_at
        })),
        latestId: Number(latest.rows[0]?.id || 0)
      });
    }
    catch (error) {
      console.error("EVENT FEED ERROR:", error);
      res.status(500).json({ error: "Could not load live events." });
    }
  }
);

app.post(
  "/api/admin/global-message",
  requireLogin,
  requireAdmin,
  async (req, res) => {
    try {
      const message = String(req.body.message || "").trim().slice(0, 220);

      if (!message) {
        return res.status(400).json({ error: "Type a global message first." });
      }

      await createGameEvent({
        targetUsernameKey: null,
        eventType: "global",
        title: "📡 JASEM",
        message,
        payload: { from: "jasem" }
      });

      res.json({ success: true, message });
    }
    catch (error) {
      console.error("GLOBAL MESSAGE ERROR:", error);
      res.status(500).json({ error: "Could not send global message." });
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
            GREATEST(highest_wave, best_wave) AS score
          FROM players
          ORDER BY
            GREATEST(highest_wave, best_wave) DESC,
            updated_at ASC
          LIMIT 10
        `);

      const kills =
        await pool.query(`
          SELECT
            username,
            GREATEST(highest_kills, total_kills) AS score
          FROM players
          ORDER BY
            GREATEST(highest_kills, total_kills) DESC,
            updated_at ASC
          LIMIT 10
        `);

      const money =
        await pool.query(`
          SELECT
            username,
            coins AS score
          FROM players
          ORDER BY
            coins DESC,
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

  res.type("html");
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
