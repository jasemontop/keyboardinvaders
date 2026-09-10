// ========================================================
// SAVE DATA
// ========================================================

const bootGuestMode = localStorage.getItem("kiGuestMode3") === "true";
const localKey = (normalKey, guestKey) => bootGuestMode ? guestKey : normalKey;

let username =
  localStorage.getItem(
    localKey("kiUsername3", "kiGuestUsername3")
  ) || "";


let usedNames =
  JSON.parse(
    localStorage.getItem(
      "kiUsedNames3"
    )
  ) || [];


let coins =
  Number(
    localStorage.getItem(
      localKey("kiCoins3", "kiGuestCoins3")
    )
  ) || 0;


let bestWave =
  Number(
    localStorage.getItem(
      localKey("kiBestWave3", "kiGuestBestWave3")
    )
  ) || 0;


let totalKills =
  Number(
    localStorage.getItem(
      localKey("kiKills3", "kiGuestKills3")
    )
  ) || 0;


let rebirths =
  Number(
    localStorage.getItem(
      localKey("kiRebirths3", "kiGuestRebirths3")
    )
  ) || 0;


const defaultUpgrades = {
  damage: 1,
  bullets: 1,
  cooling: 1,
  health: 1,
  precision: 1,
  crit: 1,
  magnet: 1,
  bulletSpeed: 0
};

let upgrades = {
  ...defaultUpgrades,
  ...(JSON.parse(
    localStorage.getItem(
      localKey("kiUpgrades3", "kiGuestUpgrades3")
    )
  ) || {})
};

if (
  typeof upgrades.bulletSpeed !==
  "number"
) {
  upgrades.bulletSpeed =
    0;
}


let tutorialSeen =
  localStorage.getItem(
    localKey("kiTutorialSeen3", "kiGuestTutorialSeen3")
  ) ===
  "true";


let owned =
  JSON.parse(
    localStorage.getItem(
      localKey("kiOwned3", "kiGuestOwned3")
    )
  ) || {
    guns: ["pulse"],
    drones: [],
    keyboards: ["standard"]
  };


let equipped =
  JSON.parse(
    localStorage.getItem(
      localKey("kiEquipped3", "kiGuestEquipped3")
    )
  ) || {
    gun: "pulse",
    drone: null,
    keyboard: "standard",
    keycap: "standard"
  };


let ownedKeycaps =
  JSON.parse(
    localStorage.getItem(
      localKey("kiKeycaps3", "kiGuestKeycaps3")
    )
  ) || [
    "standard"
  ];


// ========================================================
// ITEMS
// ========================================================

const guns = {
  pulse: { name: "Pulse Blaster", icon: "🔫", price: 0, description: "STARTER • 1.0X DAMAGE", damage: 1, heat: 1, bulletClass: "pulse", speed: -13, sound: "pulse" },
  redLaser: { name: "Red Laser", icon: "🔴", price: 900, description: "1.20X DAMAGE • 35% LESS HEAT", damage: 1.2, heat: 0.65, bulletClass: "red-laser", speed: -19, sound: "laser" },
  cryo: { name: "Cryo Blaster", icon: "❄️", price: 1800, description: "1.45X DAMAGE • CAN FREEZE", damage: 1.45, heat: 0.90, bulletClass: "cryo", speed: -14, sound: "cryo" },
  flame: { name: "Flame Cannon", icon: "🔥", price: 3200, description: "1.85X DAMAGE • HARD HITS", damage: 1.85, heat: 1.15, bulletClass: "fire", speed: -12, sound: "flame" },
  scatter: { name: "Scatter Blaster", icon: "💥", price: 5200, description: "1.35X EACH SHOT • WIDE BURST", damage: 1.35, heat: 1.2, bulletClass: "scatter", speed: -13, sound: "scatter" },
  rail: { name: "Railgun", icon: "⚡", price: 8500, description: "3.25X DAMAGE • VERY FAST", damage: 3.25, heat: 1.65, bulletClass: "rail", speed: -22, sound: "rail" },
  void: { name: "Void Cannon", icon: "🌌", price: 12500, description: "2.65X DAMAGE • AREA BURST", damage: 2.65, heat: 1.25, bulletClass: "void", speed: -12, sound: "void" },
  nova: { name: "Nova Pulse", icon: "☄️", price: 18000, description: "3.60X DAMAGE • FAST STAR SHOTS", damage: 3.6, heat: 1.45, bulletClass: "nova", speed: -18, sound: "rail" },
  arc: { name: "Arc Storm", icon: "⚙️", price: 26000, description: "4.30X DAMAGE • LONG RANGE", damage: 4.3, heat: 1.65, bulletClass: "arc", speed: -21, sound: "void" },
  hyper: { name: "Hyper Beam", icon: "💠", price: 38000, description: "5.25X DAMAGE • LOW HEAT", damage: 5.25, heat: 1.35, bulletClass: "red-laser", speed: -24, sound: "laser" },
  titanBreaker: { name: "Titan Breaker", icon: "🔨", price: 60000, description: "7.00X DAMAGE • MADE FOR BOSSES", damage: 7, heat: 2.0, bulletClass: "rail", speed: -23, sound: "rail" },
  omega: { name: "Omega Cannon", icon: "🌠", price: 95000, description: "9.00X DAMAGE • END GAME WEAPON", damage: 9, heat: 2.25, bulletClass: "nova", speed: -25, sound: "void" }
};

const drones = {
  gun: { name: "Gun Drone", icon: "🛸", price: 1800, description: "SHOOTS FOR 24 DAMAGE." },
  repair: { name: "Repair Drone", icon: "🤖", price: 3200, description: "HEALS 8 HEALTH EVERY TICK." },
  cryo: { name: "Cryo Drone", icon: "❄️", price: 5200, description: "SLOWS ENEMIES A LOT LONGER." },
  coin: { name: "Coin Drone", icon: "🪙", price: 8000, description: "+50% COINS FROM KILLS." },
  tesla: { name: "Tesla Drone", icon: "⚡", price: 12500, description: "ZAPS 4 ENEMIES FOR 28 DAMAGE." },
  prism: { name: "Prism Drone", icon: "🔷", price: 19000, description: "FAST 45 DAMAGE SHOTS." },
  harvester: { name: "Harvester Drone", icon: "🌾", price: 28000, description: "+90% COINS FROM KILLS." },
  guardian: { name: "Guardian Drone", icon: "🛡️", price: 42000, description: "HEALS 18 HEALTH EVERY TICK." },
  hunter: { name: "Hunter Drone", icon: "🎯", price: 62000, description: "HITS FOR 90 DAMAGE." },
  royal: { name: "Royal Drone", icon: "👑", price: 90000, description: "+150% COINS FROM KILLS." }
};

const keyboards = {
  standard: { name: "Standard Board", icon: "⌨️", price: 0, description: "STARTER KEYBOARD.", shield: 0, cooling: 0, className: "" },
  neon: { name: "Neon Board", icon: "🌈", price: 1200, description: "+30 SHIELD • +0.25 COOLING", shield: 30, cooling: 0.25, className: "neon-board" },
  military: { name: "Military Board", icon: "🪖", price: 2600, description: "+65 SHIELD • +0.35 COOLING", shield: 65, cooling: 0.35, className: "military-board" },
  cryo: { name: "Cryo Board", icon: "🧊", price: 5000, description: "+90 SHIELD • +1.10 COOLING", shield: 90, cooling: 1.1, className: "cryo-board" },
  void: { name: "Void Board", icon: "🌌", price: 9000, description: "+150 SHIELD • +1.50 COOLING", shield: 150, cooling: 1.5, className: "void-board" },
  sentinel: { name: "Sentinel Board", icon: "🛰️", price: 15000, description: "+230 SHIELD • +2.00 COOLING", shield: 230, cooling: 2, className: "sentinel-board" },
  eclipse: { name: "Eclipse Board", icon: "🌑", price: 24000, description: "+340 SHIELD • +2.70 COOLING", shield: 340, cooling: 2.7, className: "eclipse-board" },
  plasma: { name: "Plasma Board", icon: "💜", price: 36000, description: "+480 SHIELD • +3.50 COOLING", shield: 480, cooling: 3.5, className: "void-board" },
  reactor: { name: "Reactor Board", icon: "☢️", price: 55000, description: "+650 SHIELD • +4.50 COOLING", shield: 650, cooling: 4.5, className: "sentinel-board" },
  cosmic: { name: "Cosmic Board", icon: "🌠", price: 85000, description: "+900 SHIELD • +6.00 COOLING", shield: 900, cooling: 6, className: "eclipse-board" }
};

const keycaps = {

  standard: {
    name:
      "Standard",

    className:
      ""
  },

  red: {
    name:
      "Red",

    className:
      "keycap-red"
  },

  blue: {
    name:
      "Blue",

    className:
      "keycap-blue"
  },

  green: {
    name:
      "Green",

    className:
      "keycap-green"
  },

  yellow: {
    name:
      "Yellow",

    className:
      "keycap-yellow"
  },

  purple: {
    name:
      "Purple",

    className:
      "keycap-purple"
  },

  pink: {
    name:
      "Pink",

    className:
      "keycap-pink"
  },

  orange: {
    name:
      "Orange",

    className:
      "keycap-orange"
  },

  white: {
    name:
      "White",

    className:
      "keycap-white"
  },

  rainbow: {
    name:
      "Rainbow",

    className:
      "keycap-rainbow"
  },

  galaxy: {
    name:
      "Galaxy",

    className:
      "keycap-galaxy"
  },

  cyan: {
    name: "Cyan Glow",
    className: "keycap-cyan"
  },

  gold: {
    name: "Gold",
    className: "keycap-gold"
  },

  obsidian: {
    name: "Obsidian",
    className: "keycap-obsidian"
  }

};


// ========================================================
// MOBS
// ========================================================

const enemyTypes = {

  zombie: {
    name:
      "SPACE ZOMBIE",

    icon:
      "🧟",

    hp:
      32,

    speed:
      0.46,

    damage:
      10,

    reward:
      1,

    unlock:
      1
  },


  armorBeast: {
    name:
      "ARMOR BEAST",

    icon:
      "🦎",

    hp:
      72,

    shield:
      40,

    speed:
      0.40,

    damage:
      15,

    reward:
      4,

    unlock:
      5
  },


  runner: {
    name:
      "VOID RUNNER",

    icon:
      "👹",

    hp:
      58,

    speed:
      0.92,

    damage:
      15,

    reward:
      6,

    unlock:
      10
  },


  blastBug: {
    name:
      "BLAST BUG",

    icon:
      "🪲",

    hp:
      88,

    speed:
      0.64,

    damage:
      30,

    reward:
      9,

    unlock:
      15
  },


  teleporter: {
    name:
      "PHASE ALIEN",

    icon:
      "👽",

    hp:
      135,

    speed:
      0.52,

    damage:
      18,

    reward:
      14,

    unlock:
      20
  },


  mutant: {
    name:
      "VOID MUTANT",

    icon:
      "🧟‍♂️",

    hp:
      205,

    speed:
      0.47,

    damage:
      22,

    reward:
      20,

    unlock:
      25
  },


  wraith: {
    name:
      "NIGHT WRAITH",

    icon:
      "👻",

    hp:
      260,

    speed:
      1.02,

    damage:
      26,

    reward:
      28,

    unlock:
      30
  },


  brute: {
    name:
      "VOID BRUTE",

    icon:
      "🦴",

    hp:
      390,

    speed:
      0.34,

    damage:
      34,

    reward:
      38,

    unlock:
      35
  },


  seer: {
    name:
      "ASTRAL SEER",

    icon:
      "🔮",

    hp:
      480,

    speed:
      0.40,

    damage:
      38,

    reward:
      50,

    unlock:
      40
  },


  glitchHound: {
    name:
      "VOID HOUND",

    icon:
      "🐺",

    hp:
      610,

    speed:
      0.86,

    damage:
      44,

    reward:
      65,

    unlock:
      46
  },


  runeCrawler: {
    name:
      "ARC SPIDER",

    icon:
      "🕷️",

    hp:
      820,

    speed:
      0.60,

    damage:
      50,

    reward:
      82,

    unlock:
      52
  },


  necromancer: {
    name:
      "DARK SUMMONER",

    icon:
      "🧙‍♂️",

    hp:
      315,

    speed:
      0.36,

    damage:
      20,

    reward:
      32,

    unlock:
      30
  },


  novaStalker: {
    name:
      "NOVA STALKER",

    icon:
      "🛸",

    hp:
      680,

    speed:
      0.67,

    damage:
      42,

    reward:
      70,

    unlock:
      45
  },


  titan: {
    name:
      "GALACTIC TITAN",

    icon:
      "👾",

    hp:
      800,

    speed:
      0.19,

    damage:
      50,

    reward:
      25,

    unlock:
      10
  }

};


// ========================================================
// WORDS
// ========================================================

const normalWords = [
  "GO",
  "UP",
  "GUN",
  "HIT",
  "RUN"
];


const eliteWords = [
  "FIRE",
  "BOOM",
  "STAR"
];


const bossWords = [
  "BOSS",
  "VOID"
];


const worldOrder = [
  "orbit",
  "moon",
  "mars",
  "void",
  "cyber"
];


const worlds = {
  orbit: {
    name: "ORBITAL STATION",
    range: "WAVES 1–10",
    intro: "THREAT LEVEL RISING",
    bodyClass: "world-orbit"
  },

  moon: {
    name: "LUNAR WARD",
    range: "WAVES 11–20",
    intro: "SECTOR DOCKED",
    bodyClass: "world-moon"
  },

  mars: {
    name: "RED FRONTIER",
    range: "WAVES 21–30",
    intro: "HELLSCAPE ALERT",
    bodyClass: "world-mars"
  },

  void: {
    name: "VOID DEPTHS",
    range: "WAVES 31–40",
    intro: "DEEP SPACE COLLAPSE",
    bodyClass: "world-void"
  },

  cyber: {
    name: "CYBER NECROPOLIS",
    range: "WAVES 41+",
    intro: "FINAL SECTOR",
    bodyClass: "world-cyber"
  }
};


const bossTypes = {
  titan: {
    name: "GALACTIC TITAN",
    icon: "👾",
    hp: 900,
    speed: 0.19,
    damage: 52,
    reward: 28,
    unlock: 10,
    tier: "boss-tier-1",
    world: "orbit"
  },

  moonWarden: {
    name: "MOON WARDEN",
    icon: "🛡️",
    hp: 1600,
    speed: 0.22,
    damage: 60,
    reward: 40,
    unlock: 20,
    tier: "boss-tier-2",
    world: "moon"
  },

  magmaBeast: {
    name: "MAGMA BEHEMOTH",
    icon: "🔥",
    hp: 2400,
    speed: 0.25,
    damage: 68,
    reward: 55,
    unlock: 30,
    tier: "boss-tier-3",
    world: "mars"
  },

  abyssalKing: {
    name: "ABYSSAL KING",
    icon: "🌌",
    hp: 3400,
    speed: 0.2,
    damage: 78,
    reward: 70,
    unlock: 40,
    tier: "boss-tier-4",
    world: "void"
  },

  eclipseSentinel: {
    name: "ECLIPSE SENTINEL",
    icon: "🛸",
    hp: 5000,
    speed: 0.18,
    damage: 90,
    reward: 100,
    unlock: 50,
    tier: "boss-tier-5",
    world: "cyber"
  }
};

const bossNameLadder = [
  "GALACTIC TITAN",
  "MOON WARDEN",
  "MAGMA BEHEMOTH",
  "ABYSSAL KING",
  "ECLIPSE SENTINEL",
  "STAR DEVOURER",
  "VOID EMPEROR",
  "NEBULA REAPER",
  "COSMIC ANNIHILATOR",
  "OMEGA OVERLORD"
];

function getBossDisplayName(targetWave, fallbackName = "BOSS") {
  const bossNumber = Math.max(1, Math.floor(targetWave / 10));
  const baseIndex = (bossNumber - 1) % bossNameLadder.length;
  const cycle = Math.floor((bossNumber - 1) / bossNameLadder.length);
  const baseName = bossNameLadder[baseIndex];

  return cycle > 0
    ? `${baseName} MK.${cycle + 1}`
    : baseName || fallbackName;
}


// ========================================================
// STATE
// ========================================================

let running =
  false;


let wave =
  1;


let kills =
  0;


let combo =
  0;


let runCoins =
  0;


let maxHealth =
  100;


let health =
  100;


let heat =
  0;


let precision =
  100;


let overheated =
  false;


let lastShot =
  0;


let bullets =
  [];


let enemies =
  [];


let enemiesRemaining =
  0;


let waveTotal =
  0;


let waveChanging =
  false;


let spawnTimers =
  [];


let activeExecution =
  null;


let droneTimer =
  null;


let floatingCoinTimer =
  null;


let currentModifier =
  "NONE";


const modifierInfo = {
  NONE: { name: "NORMAL WAVE", text: "NO EXTRA EFFECTS THIS WAVE." },
  SWARM: { name: "BIG WAVE", text: "A LOT MORE ENEMIES WILL SPAWN." },
  FAST: { name: "SPEED WAVE", text: "ENEMIES MOVE 65% FASTER." },
  ARMORED: { name: "POWER WAVE", text: "ENEMIES HAVE 125% MORE HEALTH." },
  BOUNTY: { name: "RICH WAVE", text: "ENEMIES GIVE 3X COINS." },
  CHAOS: { name: "CHAOS WAVE", text: "MORE ENEMIES, MORE HEALTH, MORE SPEED, 2X COINS." }
};

const questTemplates = [
  { kind: "kills", icon: "💀", title: "GET KILLS", text: "Destroy enemies.", baseTarget: 25, baseReward: 300 },
  { kind: "coins", icon: "🪙", title: "EARN COINS", text: "Earn coins during runs.", baseTarget: 500, baseReward: 450 },
  { kind: "wave", icon: "🌊", title: "REACH A WAVE", text: "Survive to the target wave.", baseTarget: 5, baseReward: 600 }
];

let questTier = 1;
let quests = [];

function questStorageKey() {
  if (guestMode) return "kiGuestQuests3";
  const name = (username || "local").toLowerCase();
  return `kiQuests3_${name}`;
}

function makeQuest(template, tier) {
  const scale = Math.max(1, tier);
  const target = template.kind === "wave"
    ? template.baseTarget + (scale - 1) * 3
    : Math.round(template.baseTarget * (1 + (scale - 1) * 0.45));
  return {
    kind: template.kind,
    icon: template.icon,
    title: template.title,
    text: template.text,
    target,
    progress: 0,
    reward: Math.round(template.baseReward * (1 + (scale - 1) * 0.5)),
    complete: false
  };
}

function resetQuests(tier = questTier) {
  questTier = tier;
  quests = questTemplates.map(template => makeQuest(template, tier));
  saveQuests();
  renderQuests();
}

function loadQuests() {
  try {
    const saved = JSON.parse(localStorage.getItem(questStorageKey()) || "null");
    if (saved && Array.isArray(saved.quests) && saved.quests.length === 3) {
      questTier = Math.max(1, Number(saved.tier) || 1);
      quests = saved.quests;
    } else {
      resetQuests(1);
    }
  } catch {
    resetQuests(1);
  }
  renderQuests();
}

function saveQuests() {
  localStorage.setItem(questStorageKey(), JSON.stringify({ tier: questTier, quests }));
}

function addQuestProgress(kind, amount = 1, absolute = false) {
  let changed = false;
  quests.forEach(q => {
    if (q.kind !== kind || q.complete) return;
    q.progress = absolute
      ? Math.max(q.progress || 0, amount)
      : Math.min(q.target, (q.progress || 0) + amount);
    if (q.progress >= q.target) q.complete = true;
    changed = true;
  });
  if (changed) {
    saveQuests();
    renderQuests();
  }
}

function claimQuest(index) {
  const q = quests[index];
  if (!q || !q.complete) return;
  coins += q.reward;
  showLobbyFlash(`QUEST DONE! +${q.reward} COINS`);
  playSuccessSound();
  const template = questTemplates.find(t => t.kind === q.kind);
  quests[index] = makeQuest(template, questTier + 1);
  if (quests.every(item => item.progress === 0)) questTier++;
  saveQuests();
  save();
  updateLobby();
  renderQuests();
}

function renderQuests() {
  const list = document.getElementById("quest-list");
  if (list) {
    list.innerHTML = "";
    quests.forEach((q, index) => {
      const card = document.createElement("div");
      card.className = `quest-card ${q.complete ? "complete" : ""}`;
      const pct = Math.min(100, Math.round((q.progress / q.target) * 100));
      card.innerHTML = `
        <div class="quest-icon">${q.icon}</div>
        <div class="quest-info">
          <h3>${q.title}</h3>
          <p>${q.text} Reward: 🪙${q.reward}</p>
          <div class="quest-progress-bar"><div class="quest-progress-fill" style="width:${pct}%"></div></div>
          <span class="quest-progress-text">${Math.min(q.progress, q.target)} / ${q.target}</span>
        </div>
        <button class="quest-claim" type="button" data-quest-index="${index}" ${q.complete ? "" : "disabled"}>${q.complete ? "CLAIM" : "IN PROGRESS"}</button>`;
      list.appendChild(card);
    });
    list.querySelectorAll(".quest-claim").forEach(button => {
      button.addEventListener("click", () => claimQuest(Number(button.dataset.questIndex)));
    });
  }

  const hudTitle = document.getElementById("quest-hud-title");
  const hudProgress = document.getElementById("quest-hud-progress");
  if (hudTitle && hudProgress && quests.length) {
    const active = quests.find(q => !q.complete) || quests[0];
    hudTitle.textContent = active.complete ? "QUEST READY!" : active.title;
    hudProgress.textContent = active.complete
      ? "CLAIM IN LOBBY"
      : `${Math.min(active.progress, active.target)} / ${active.target}`;
  }
}


let currentWorld =
  "orbit";


// ========================================================
// ELEMENTS
// ========================================================

const lobby =
  document.getElementById(
    "lobby"
  );


const game =
  document.getElementById(
    "game"
  );


const arena =
  document.getElementById(
    "arena"
  );


const keyboard =
  document.getElementById(
    "keyboard"
  );


const enemyLayer =
  document.getElementById(
    "enemy-layer"
  );


const bulletLayer =
  document.getElementById(
    "bullet-layer"
  );


const coinLayer =
  document.getElementById(
    "coin-layer"
  );


const particleLayer =
  document.getElementById(
    "particle-layer"
  );


const combatLayer =
  document.getElementById(
    "combat-text-layer"
  );


const enemyProjectileLayer =
  document.getElementById(
    "enemy-projectile-layer"
  );


// ========================================================
// ONLINE ACCOUNT
// ========================================================

const API_BASE = "";

async function apiFetch(path, options = {}, timeoutMs = 60000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(`${API_BASE}${path}`, {
      ...options,
      signal: controller.signal,
      cache: "no-store"
    });
  } catch (error) {
    if (error && error.name === "AbortError") {
      throw new Error("Server took too long to respond. Try again.");
    }
    throw new Error("Could not reach the game server. Make sure the Render service is online.");
  } finally {
    clearTimeout(timeout);
  }
}

let accountMode = "register";
let accountToken = localStorage.getItem("kiAccountToken3") || "";
let guestMode = bootGuestMode;
let onlineSaveTimer = null;
let leaderboardCache = { waves: [], kills: [], money: [] };
let currentLeaderboardTab = "waves";

const accountOverlay = document.getElementById("username-overlay");
const usernameInput = document.getElementById("username-input");
const pinInput = document.getElementById("pin-input");
const accountError = document.getElementById("username-error");
const accountSubmit = document.getElementById("username-submit");
const accountModeToggle = document.getElementById("account-mode-toggle");
const guestPlayButton = document.getElementById("guest-play-button");

function showAccountOverlay(mode = "register") {
  accountMode = mode;
  accountOverlay.classList.add("show");
  updateAccountModeUI();
  setTimeout(() => usernameInput.focus(), 50);
}

function hideAccountOverlay() {
  accountOverlay.classList.remove("show");
  accountError.textContent = "";
  pinInput.value = "";
}

function updateAccountModeUI(clearError = true) {
  const registering = accountMode === "register";

  document.getElementById("account-title").textContent =
    registering ? "CREATE COMMANDER" : "WELCOME BACK";

  document.getElementById("account-description").textContent =
    registering
      ? "Choose a username and a 4-digit code so you can log in on any device."
      : "Enter your commander username and 4-digit code.";

  accountSubmit.textContent = registering ? "CREATE ACCOUNT" : "LOG IN";
  accountModeToggle.innerHTML = registering
    ? 'Already have an account? <b>LOG IN</b>'
    : 'Need a new commander? <b>CREATE ACCOUNT</b>';

  pinInput.autocomplete = registering ? "new-password" : "current-password";

  if (clearError) {
    accountError.textContent = "";
  }
}

accountModeToggle.addEventListener("click", () => {
  accountMode = accountMode === "register" ? "login" : "register";
  pinInput.value = "";
  updateAccountModeUI();
});

pinInput.addEventListener("input", () => {
  pinInput.value = pinInput.value.replace(/\D/g, "").slice(0, 4);
});

[usernameInput, pinInput].forEach(input => {
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") submitAccount();
  });
});

accountSubmit.addEventListener("click", submitAccount);

guestPlayButton.addEventListener("click", () => {
  const hasGuestSave =
    localStorage.getItem("kiGuestInitialized3") === "true";

  guestMode = true;
  accountToken = "";
  localStorage.removeItem("kiAccountToken3");
  localStorage.setItem("kiGuestMode3", "true");

  username = "Guest";

  if (hasGuestSave) {
    coins = Number(localStorage.getItem("kiGuestCoins3")) || 0;
    bestWave = Number(localStorage.getItem("kiGuestBestWave3")) || 0;
    totalKills = Number(localStorage.getItem("kiGuestKills3")) || 0;
    rebirths = Number(localStorage.getItem("kiGuestRebirths3")) || 0;
    upgrades = {
      ...defaultUpgrades,
      ...(JSON.parse(localStorage.getItem("kiGuestUpgrades3")) || {})
    };
    owned = JSON.parse(localStorage.getItem("kiGuestOwned3")) || {
      guns: ["pulse"],
      drones: [],
      keyboards: ["standard"]
    };
    equipped = JSON.parse(localStorage.getItem("kiGuestEquipped3")) || {
      gun: "pulse",
      drone: null,
      keyboard: "standard",
      keycap: "standard"
    };
    ownedKeycaps = JSON.parse(localStorage.getItem("kiGuestKeycaps3")) || ["standard"];
    tutorialSeen = localStorage.getItem("kiGuestTutorialSeen3") === "true";
  } else {
    coins = 0;
    bestWave = 0;
    totalKills = 0;
    rebirths = 0;
    upgrades = { ...defaultUpgrades };
    owned = {
      guns: ["pulse"],
      drones: [],
      keyboards: ["standard"]
    };
    equipped = {
      gun: "pulse",
      drone: null,
      keyboard: "standard",
      keycap: "standard"
    };
    ownedKeycaps = ["standard"];
    tutorialSeen = false;
    localStorage.setItem("kiGuestInitialized3", "true");
  }

  localStorage.setItem("kiGuestUsername3", "Guest");
  save(false);
  renderShops();
  applyLoadoutVisuals();
  updateLobby();
  hideAccountOverlay();
  updateUsernameUI();
  updateAccountStatus();
  loadQuests();
  playSuccessSound();
  showTutorial("lobby");
});

async function submitAccount() {
  const value = usernameInput.value.trim();
  const code = pinInput.value.trim();

  if (value.length < 3) {
    accountError.textContent = "Username must be at least 3 characters.";
    playErrorSound();
    return;
  }

  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    accountError.textContent = "Use only letters, numbers and underscores.";
    playErrorSound();
    return;
  }

  if (!/^\d{4}$/.test(code)) {
    accountError.textContent = "Your code must be exactly 4 numbers.";
    playErrorSound();
    return;
  }

  accountSubmit.disabled = true;
  accountSubmit.textContent = accountMode === "register" ? "CREATING..." : "CONNECTING...";
  accountError.textContent = "";

  try {
    const response = await apiFetch(`/api/${accountMode === "register" ? "register" : "login"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: value, code })
    });

    const responseText = await response.text();
    let data = {};

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      data = {};
    }

    if (!response.ok) {
      const fallback =
        response.status === 429
          ? "Too many attempts. Wait a moment and try again."
          : response.status >= 500
            ? "The account server had an error. Check the Render logs."
            : "Could not connect to commander network.";

      throw new Error(data.error || fallback);
    }

    if (!data.token) {
      throw new Error("Server did not return a login token.");
    }

    accountToken = data.token;
    guestMode = false;

    localStorage.setItem("kiAccountToken3", accountToken);
    localStorage.removeItem("kiGuestMode3");

    username = data.player?.username || value;
    localStorage.setItem("kiUsername3", username);

    if (data.player) {
      applyOnlinePlayer(data.player);
    } else {
      save(false);
    }

    // Update the logged-in UI before removing the account screen.
    updateUsernameUI();
    updateAccountStatus();
    loadQuests();

    hideAccountOverlay();
    accountOverlay.style.display = "none";

    // Clear the inline safety override after the browser paints the lobby.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        accountOverlay.style.removeProperty("display");
      });
    });

    playSuccessSound();
    showTutorial("lobby");
  }
  catch (error) {
    accountError.textContent = error.message;
    playErrorSound();
  }
  finally {
    accountSubmit.disabled = false;
    updateAccountModeUI(false);
  }
}

async function checkAccount() {
  const statusName = document.getElementById("account-status-name");

  if (accountToken && !guestMode && statusName) {
    statusName.textContent = "CONNECTING...";
  } else {
    updateAccountStatus();
  }

  if (guestMode) {
    username = "Guest";
    hideAccountOverlay();
    updateUsernameUI();
    updateAccountStatus();
    loadQuests();
    showTutorial("lobby");
    return;
  }

  if (!accountToken) {
    showAccountOverlay("register");
    return;
  }

  try {
    const response = await apiFetch("/api/me", {
      headers: { Authorization: `Bearer ${accountToken}` }
    });

    if (!response.ok) throw new Error("Session expired");

    const data = await response.json();

    if (data.player) {
      username = data.player.username || username;
      localStorage.setItem("kiUsername3", username);
      applyOnlinePlayer(data.player);
    }

    hideAccountOverlay();
    updateUsernameUI();
    updateAccountStatus();
    loadQuests();
    showTutorial("lobby");
  }
  catch (error) {
    console.warn("Account check failed:", error.message);
    accountToken = "";
    localStorage.removeItem("kiAccountToken3");
    updateAccountStatus();
    showAccountOverlay("login");
  }
}

function applyOnlinePlayer(player) {
  if (!player) return;

  const read = (camel, snake, fallback) =>
    player[camel] ?? player[snake] ?? fallback;

  coins = Math.max(0, Number(read("coins", "coins", coins)) || 0);
  bestWave = Math.max(0, Number(read("bestWave", "best_wave", bestWave)) || 0);
  totalKills = Math.max(0, Number(read("totalKills", "total_kills", totalKills)) || 0);
  rebirths = Math.max(0, Number(read("rebirths", "rebirths", rebirths)) || 0);

  const serverUpgrades = read("upgrades", "upgrades", null);
  if (serverUpgrades && typeof serverUpgrades === "object") {
    upgrades = { ...defaultUpgrades, ...serverUpgrades };
  }

  const serverOwned = read("owned", "owned", null);
  if (serverOwned && typeof serverOwned === "object") {
    owned = {
      guns: Array.isArray(serverOwned.guns)
        ? serverOwned.guns.filter(id => guns[id])
        : ["pulse"],

      drones: Array.isArray(serverOwned.drones)
        ? serverOwned.drones.filter(id => drones[id])
        : [],

      keyboards: Array.isArray(serverOwned.keyboards)
        ? serverOwned.keyboards.filter(id => keyboards[id])
        : ["standard"]
    };
  }

  // Starter items must always exist even on older/corrupted saves.
  if (!owned.guns.includes("pulse")) owned.guns.unshift("pulse");
  if (!owned.keyboards.includes("standard")) owned.keyboards.unshift("standard");

  const serverEquipped = read("equipped", "equipped", null);
  if (serverEquipped && typeof serverEquipped === "object") {
    equipped = {
      gun:
        serverEquipped.gun && guns[serverEquipped.gun]
          ? serverEquipped.gun
          : "pulse",

      drone:
        serverEquipped.drone && drones[serverEquipped.drone]
          ? serverEquipped.drone
          : null,

      keyboard:
        serverEquipped.keyboard && keyboards[serverEquipped.keyboard]
          ? serverEquipped.keyboard
          : "standard",

      keycap:
        serverEquipped.keycap && keycaps[serverEquipped.keycap]
          ? serverEquipped.keycap
          : "standard"
    };
  } else {
    equipped = {
      gun: "pulse",
      drone: null,
      keyboard: "standard",
      keycap: "standard"
    };
  }

  const serverKeycaps = read("keycaps", "keycaps", null);
  if (Array.isArray(serverKeycaps)) {
    ownedKeycaps = serverKeycaps.filter(id => keycaps[id]);
  }

  if (!ownedKeycaps.includes("standard")) {
    ownedKeycaps.unshift("standard");
  }

  save(false);
  renderShops();
  applyLoadoutVisuals();
  updateLobby();
}

function getOnlineSavePayload() {
  return {
    coins,
    bestWave,
    totalKills,
    rebirths,
    upgrades,
    owned,
    equipped,
    keycaps: ownedKeycaps
  };
}

function syncOnlineSave(immediate = false) {
  if (!accountToken) return;

  clearTimeout(onlineSaveTimer);

  const send = async () => {
    try {
      const response = await apiFetch("/api/save", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accountToken}`
        },
        body: JSON.stringify(getOnlineSavePayload())
      });

      if (response.status === 401) {
        accountToken = "";
        localStorage.removeItem("kiAccountToken3");
        updateAccountStatus();
      }
    }
    catch (error) {
      console.warn("Online save unavailable:", error.message);
    }
  };

  if (immediate) send();
  else onlineSaveTimer = setTimeout(send, 800);
}

function updateUsernameUI() {
  document.getElementById("profile-username").textContent = username || "COMMANDER";
  document.getElementById("game-username").textContent = username || "COMMANDER";
  updateAccountStatus();
}

function updateAccountStatus() {
  const statusName = document.getElementById("account-status-name");
  const logoutButton = document.getElementById("logout-button");
  if (!statusName || !logoutButton) return;

  if (accountToken && username) {
    statusName.textContent = username.toUpperCase();
    logoutButton.textContent = "LOG OUT";
    logoutButton.style.display = "inline-block";
  } else if (guestMode) {
    statusName.textContent = "GUEST";
    logoutButton.textContent = "EXIT GUEST";
    logoutButton.style.display = "inline-block";
  } else {
    statusName.textContent = "OFFLINE";
    logoutButton.textContent = "LOG OUT";
    logoutButton.style.display = "none";
  }

  const adminButton = document.getElementById("open-admin");
  if (adminButton) {
    const isJasemAdmin = Boolean(accountToken && username && username.toLowerCase() === "jasem");
    adminButton.style.display = isJasemAdmin ? "inline-block" : "none";
  }
}

document.getElementById("logout-button").addEventListener("click", () => {
  if (accountToken) syncOnlineSave(true);

  accountToken = "";
  guestMode = false;
  localStorage.removeItem("kiAccountToken3");
  localStorage.removeItem("kiGuestMode3");
  updateAccountStatus();
  usernameInput.value = username && username !== "Guest" ? username : "";
  showAccountOverlay("login");
});


// ========================================================
// ADMIN PANEL (server-verified)
// ========================================================

const adminOverlay = document.getElementById("admin-overlay");
const adminTarget = document.getElementById("admin-target");
const adminAmount = document.getElementById("admin-amount");
const adminMessage = document.getElementById("admin-message");
const adminUserList = document.getElementById("admin-user-list");

function isLocalAdminName() {
  return Boolean(accountToken && username && username.toLowerCase() === "jasem");
}

function setAdminMessage(message, ok = false) {
  if (!adminMessage) return;
  adminMessage.textContent = message || "";
  adminMessage.className = `admin-message ${message ? (ok ? "ok" : "err") : ""}`;
}

async function adminRequest(path, options = {}) {
  if (!accountToken) throw new Error("You must be logged in.");
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accountToken}`,
      ...(options.headers || {})
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Admin request failed.");
  return data;
}

async function openAdminPanel() {
  if (!isLocalAdminName()) return;
  adminOverlay.classList.add("show");
  document.getElementById("admin-self-name").textContent = username.toUpperCase();
  adminTarget.value = username;
  setAdminMessage("");
  await loadAdminUsers();
}

function closeAdminPanel() {
  adminOverlay.classList.remove("show");
}

async function loadAdminUsers() {
  adminUserList.innerHTML = '<div class="admin-loading">LOADING PLAYERS...</div>';
  try {
    const data = await adminRequest("/api/admin/users", { method: "GET" });
    const players = Array.isArray(data.players) ? data.players : [];
    adminUserList.innerHTML = "";
    if (!players.length) {
      adminUserList.innerHTML = '<div class="admin-loading">NO PLAYERS FOUND</div>';
      return;
    }
    players.forEach(player => {
      const row = document.createElement("div");
      row.className = "admin-user-row";

      const name = document.createElement("strong");
      name.textContent = player.username;

      const coinText = document.createElement("span");
      coinText.className = "admin-user-coins";
      coinText.textContent = `${Number(player.coins || 0).toLocaleString()} 🪙`;

      const select = document.createElement("button");
      select.type = "button";
      select.textContent = "SELECT";
      select.addEventListener("click", () => {
        adminTarget.value = player.username;
        adminTarget.focus();
      });

      row.append(name, coinText, select);
      adminUserList.appendChild(row);
    });
  } catch (error) {
    adminUserList.innerHTML = `<div class="admin-loading">⚠ ${escapeLeaderboardText(error.message)}</div>`;
  }
}

async function runCoinAdminAction(action, targetOverride = null, amountOverride = null) {
  const target = (targetOverride || adminTarget.value).trim();
  const rawAmount = amountOverride ?? Number(adminAmount.value);
  const amount = Math.floor(Number(rawAmount));

  if (!target) {
    setAdminMessage("Enter a player username.");
    return;
  }
  if (!Number.isFinite(amount) || amount < 0 || amount > 1000000000) {
    setAdminMessage("Amount must be between 0 and 1,000,000,000.");
    return;
  }

  try {
    const data = await adminRequest("/api/admin/coins", {
      method: "POST",
      body: JSON.stringify({ target, action, amount })
    });
    setAdminMessage(`✓ ${data.player.username} now has ${Number(data.player.coins).toLocaleString()} coins.`, true);

    if (data.player.username.toLowerCase() === username.toLowerCase()) {
      coins = Number(data.player.coins) || 0;
      save(false);
      updateLobby();
    }
    await loadAdminUsers();
  } catch (error) {
    setAdminMessage(error.message);
    playErrorSound();
  }
}

const openAdminButton = document.getElementById("open-admin");
if (openAdminButton) openAdminButton.addEventListener("click", openAdminPanel);
document.getElementById("close-admin")?.addEventListener("click", closeAdminPanel);
document.getElementById("admin-refresh-users")?.addEventListener("click", loadAdminUsers);
document.getElementById("admin-give-coins")?.addEventListener("click", () => runCoinAdminAction("add"));
document.getElementById("admin-remove-coins")?.addEventListener("click", () => runCoinAdminAction("remove"));
document.getElementById("admin-set-coins")?.addEventListener("click", () => runCoinAdminAction("set"));

document.querySelectorAll("[data-self-coins]").forEach(button => {
  button.addEventListener("click", () => {
    runCoinAdminAction("add", username, Number(button.dataset.selfCoins || 0));
  });
});

adminOverlay?.addEventListener("click", event => {
  if (event.target === adminOverlay) closeAdminPanel();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && adminOverlay?.classList.contains("show")) {
    closeAdminPanel();
  }
});

// ========================================================
// GLOBAL LEADERBOARD
// ========================================================

const leaderboardOverlay = document.getElementById("leaderboard-overlay");
const leaderboardList = document.getElementById("online-leaderboard-list");

async function openLeaderboard() {
  currentLeaderboardTab = "waves";
  setLeaderboardTab("waves");
  leaderboardOverlay.classList.add("show");
  leaderboardList.innerHTML = '<div class="leaderboard-loading">CONNECTING TO NETWORK...</div>';

  try {
    const response = await fetch(`${API_BASE}/api/leaderboard`);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) throw new Error(data.error || "Leaderboard unavailable.");

    leaderboardCache = {
      waves: Array.isArray(data.waves) ? data.waves : [],
      kills: Array.isArray(data.kills) ? data.kills : [],
      money: Array.isArray(data.money) ? data.money : []
    };

    renderOnlineLeaderboard();
  }
  catch (error) {
    leaderboardList.innerHTML = `<div class="leaderboard-error">⚠ ${escapeLeaderboardText(error.message)}</div>`;
  }
}

function closeLeaderboard() {
  leaderboardOverlay.classList.remove("show");
}

function setLeaderboardTab(tab) {
  currentLeaderboardTab = tab;

  document.querySelectorAll(".leaderboard-tab").forEach(button => {
    button.classList.toggle("active", button.dataset.board === tab);
  });

  renderOnlineLeaderboard();
}

function renderOnlineLeaderboard() {
  const rows = leaderboardCache[currentLeaderboardTab] || [];

  if (!rows.length) {
    leaderboardList.innerHTML = '<div class="leaderboard-empty">NO COMMANDERS RANKED YET.</div>';
    return;
  }

  leaderboardList.innerHTML = "";

  rows.slice(0, 10).forEach((entry, index) => {
    const row = document.createElement("div");
    row.className = "online-leaderboard-row";

    const entryName = String(entry.username || "COMMANDER");
    if (username && entryName.toLowerCase() === username.toLowerCase()) {
      row.classList.add("current");
    }

    const rank = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}.`;

    const rankSpan = document.createElement("span");
    rankSpan.className = "leaderboard-rank";
    rankSpan.textContent = rank;

    const playerSpan = document.createElement("span");
    playerSpan.className = "leaderboard-player";
    playerSpan.textContent = entryName;

    const value = document.createElement("strong");
    value.className = "leaderboard-value";
    value.textContent = formatLeaderboardValue(entry.score);

    row.append(rankSpan, playerSpan, value);
    leaderboardList.appendChild(row);
  });
}

function formatLeaderboardValue(value) {
  const number = Math.max(0, Number(value) || 0);
  return number.toLocaleString();
}

function escapeLeaderboardText(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.getElementById("open-leaderboard").addEventListener("click", () => {
  tone(620, 0.04, "sine", 0.012, 800);
  openLeaderboard();
});

document.getElementById("close-leaderboard").addEventListener("click", closeLeaderboard);

leaderboardOverlay.addEventListener("click", event => {
  if (event.target === leaderboardOverlay) closeLeaderboard();
});

document.querySelectorAll(".leaderboard-tab").forEach(button => {
  button.addEventListener("click", () => setLeaderboardTab(button.dataset.board));
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && leaderboardOverlay.classList.contains("show")) {
    closeLeaderboard();
  }
});

// ========================================================
// TUTORIAL
// ========================================================

const tutorialOverlay = document.getElementById("tutorial-overlay");
const tutorialFocus = document.getElementById("tutorial-focus");
const tutorialTip = document.getElementById("tutorial-tip");
const tutorialTitle = document.getElementById("tutorial-title");
const tutorialText = document.getElementById("tutorial-text");
const tutorialCount = document.getElementById("tutorial-step-count");
const tutorialNext = document.getElementById("tutorial-next");
const tutorialSkip = document.getElementById("tutorial-skip");

let tutorialStep = 0;
let tutorialPart = "lobby";

const lobbyTutorialSteps = [
  { target: "#start-run", title: "START A RUN", text: "Press this when you are ready to fight enemies." },
  { target: ".upgrade-strip", title: "UPGRADES", text: "Spend coins here to make your damage, health, and other stats better." },
  { target: '[data-menu="guns"]', title: "GUNS", text: "Buy stronger guns and equip the one you want to use." },
  { target: '[data-menu="drones"]', title: "DRONES", text: "Drones help you during a run. Each one gives a different bonus." },
  { target: '[data-menu="keyboards"]', title: "KEYBOARDS", text: "Keyboards change your stats and the look of your setup." },
  { target: '[data-menu="quests"]', title: "QUESTS", text: "Finish simple goals to earn extra coins. Come back here to claim them." },
  { target: '[data-menu="rebirth"]', title: "REBIRTH", text: "Later, you can reset some progress to get permanent bonuses." },
  { target: "#open-leaderboard", title: "LEADERBOARD", text: "See the best players for waves, kills, and coins." }
];

const gameTutorialSteps = [
  { target: ".game-hud", title: "YOUR RUN", text: "This shows your wave, kills, coins, and name." },
  { target: ".game-left", title: "YOUR STATS", text: "Shield is your health. Heat goes up when you shoot. Precision affects your shots." },
  { target: ".game-right", title: "WAVE INFO", text: "This shows your combo, danger level, current event, and quest progress." },
  { target: "#arena", title: "ENEMIES", text: "Enemies move toward your keyboard. Stop them before they reach it." },
  { target: "#keyboard-zone", title: "TYPE TO SHOOT", text: "Press the matching keyboard keys to shoot. Wrong keys can break your streak." }
];

function positionTutorial(step) {
  const target = document.querySelector(step.target);
  if (!target || !tutorialOverlay) return;
  const rect = target.getBoundingClientRect();
  const pad = 8;
  const left = Math.max(8, rect.left - pad);
  const top = Math.max(8, rect.top - pad);
  const width = Math.min(window.innerWidth - left - 8, rect.width + pad * 2);
  const height = Math.min(window.innerHeight - top - 8, rect.height + pad * 2);
  tutorialFocus.style.left = `${left}px`;
  tutorialFocus.style.top = `${top}px`;
  tutorialFocus.style.width = `${Math.max(40, width)}px`;
  tutorialFocus.style.height = `${Math.max(40, height)}px`;

  const tipWidth = Math.min(330, window.innerWidth - 28);
  let tipLeft = Math.max(14, Math.min(window.innerWidth - tipWidth - 14, left));
  let tipTop = top + height + 14;
  if (tipTop + 190 > window.innerHeight) tipTop = Math.max(14, top - 200);
  tutorialTip.style.left = `${tipLeft}px`;
  tutorialTip.style.top = `${tipTop}px`;
}

function renderTutorialStep() {
  const steps = tutorialPart === "lobby" ? lobbyTutorialSteps : gameTutorialSteps;
  const step = steps[tutorialStep];
  if (!step) return finishTutorialPart();
  tutorialTitle.textContent = step.title;
  tutorialText.textContent = step.text;
  tutorialCount.textContent = `${tutorialPart === "lobby" ? "LOBBY" : "RUN"} ${tutorialStep + 1} / ${steps.length}`;
  tutorialNext.textContent = tutorialStep === steps.length - 1
    ? (tutorialPart === "lobby" ? "GOT IT →" : "FINISH")
    : "NEXT →";
  positionTutorial(step);
}

function showTutorial(part = "lobby") {
  if (tutorialSeen) return;
  tutorialPart = part;
  tutorialStep = 0;
  tutorialOverlay.classList.add("show");
  tutorialOverlay.setAttribute("aria-hidden", "false");
  setTimeout(renderTutorialStep, 80);
}

function finishTutorialPart() {
  tutorialOverlay.classList.remove("show");
  tutorialOverlay.setAttribute("aria-hidden", "true");
  if (tutorialPart === "game") {
    tutorialSeen = true;
    save();
  }
}

tutorialNext.addEventListener("click", () => {
  const steps = tutorialPart === "lobby" ? lobbyTutorialSteps : gameTutorialSteps;
  tutorialStep++;
  if (tutorialStep >= steps.length) finishTutorialPart();
  else renderTutorialStep();
});

tutorialSkip.addEventListener("click", () => {
  tutorialSeen = true;
  save();
  tutorialOverlay.classList.remove("show");
  tutorialOverlay.setAttribute("aria-hidden", "true");
});

window.addEventListener("resize", () => {
  if (tutorialOverlay.classList.contains("show")) renderTutorialStep();
});


// ========================================================
// AUDIO ENGINE
// ========================================================

let audioContext =
  null;


function getAudio() {

  if (
    !audioContext
  ) {

    audioContext =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();

  }


  return audioContext;

}


function tone(
  frequency,
  duration,
  type = "sine",
  volume = 0.025,
  endFrequency = null
) {

  try {

    const ctx =
      getAudio();


    const osc =
      ctx.createOscillator();


    const gain =
      ctx.createGain();


    osc.type =
      type;


    osc.frequency.setValueAtTime(
      frequency,
      ctx.currentTime
    );


    if (
      endFrequency
    ) {

      osc.frequency.exponentialRampToValueAtTime(
        endFrequency,
        ctx.currentTime +
        duration
      );

    }


    gain.gain.setValueAtTime(
      volume,
      ctx.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      ctx.currentTime +
      duration
    );


    osc.connect(
      gain
    );


    gain.connect(
      ctx.destination
    );


    osc.start();


    osc.stop(
      ctx.currentTime +
      duration
    );

  }

  catch (error) {}

}


// ========================================================
// UNIQUE GUN SOUNDS
// ========================================================

function playGunSound(
  gunId
) {

  if (
    gunId ===
    "pulse"
  ) {

    tone(
      420,
      0.055,
      "square",
      0.018,
      280
    );

  }


  else if (
    gunId ===
    "redLaser"
  ) {

    tone(
      900,
      0.07,
      "sawtooth",
      0.016,
      430
    );

  }


  else if (
    gunId ===
    "cryo"
  ) {

    tone(
      780,
      0.09,
      "sine",
      0.018,
      1150
    );

    setTimeout(
      () =>
        tone(
          1300,
          0.05,
          "sine",
          0.008,
          900
        ),
      25
    );

  }


  else if (
    gunId ===
    "flame"
  ) {

    tone(
      150,
      0.11,
      "sawtooth",
      0.02,
      70
    );

  }


  else if (
    gunId ===
    "scatter"
  ) {

    tone(
      105,
      0.08,
      "square",
      0.028,
      65
    );

    setTimeout(
      () =>
        tone(
          190,
          0.035,
          "square",
          0.012,
          95
        ),
      20
    );

  }


  else if (
    gunId ===
    "rail"
  ) {

    tone(
      85,
      0.16,
      "sawtooth",
      0.028,
      35
    );

    setTimeout(
      () =>
        tone(
          1100,
          0.12,
          "sine",
          0.02,
          380
        ),
      25
    );

  }


  else if (
    gunId ===
    "void"
  ) {

    tone(
      70,
      0.18,
      "triangle",
      0.025,
      40
    );

    setTimeout(
      () =>
        tone(
          320,
          0.15,
          "sine",
          0.015,
          110
        ),
      20
    );

  }

}


function playKillSound() {

  tone(
    220,
    0.05,
    "square",
    0.018,
    130
  );


  setTimeout(
    () =>
      tone(
        520,
        0.06,
        "sine",
        0.012,
        760
      ),
    25
  );

}


function playCoinSound() {

  tone(
    720,
    0.05,
    "sine",
    0.025,
    980
  );


  setTimeout(
    () =>
      tone(
        1200,
        0.05,
        "sine",
        0.018,
        1500
      ),
    45
  );

}


function playCrateSound() {

  tone(
    120,
    0.15,
    "triangle",
    0.025,
    75
  );


  setTimeout(
    () =>
      tone(
        500,
        0.15,
        "sine",
        0.018,
        900
      ),
    100
  );

}


function playBreachSound() {

  tone(
    90,
    0.2,
    "sawtooth",
    0.03,
    45
  );

}


function playJamSound() {

  tone(
    180,
    0.07,
    "square",
    0.02,
    90
  );


  setTimeout(
    () =>
      tone(
        130,
        0.07,
        "square",
        0.015,
        70
      ),
    70
  );

}


function playDroneSound(
  type
) {

  if (
    type ===
    "gun"
  ) {

    tone(
      650,
      0.04,
      "square",
      0.012,
      420
    );

  }


  if (
    type ===
    "repair"
  ) {

    tone(
      520,
      0.1,
      "sine",
      0.01,
      780
    );

  }


  if (
    type ===
    "cryo"
  ) {

    tone(
      980,
      0.08,
      "sine",
      0.012,
      1300
    );

  }


  if (
    type ===
    "tesla"
  ) {

    tone(
      1300,
      0.05,
      "square",
      0.012,
      700
    );

  }

}


function playSuccessSound() {

  tone(
    500,
    0.06,
    "sine",
    0.025,
    700
  );


  setTimeout(
    () =>
      tone(
        800,
        0.07,
        "sine",
        0.02,
        1100
      ),
    55
  );

}


function playErrorSound() {

  tone(
    130,
    0.13,
    "square",
    0.025,
    80
  );

}


function playRebirthSound() {

  tone(
    180,
    0.3,
    "sine",
    0.025,
    600
  );


  setTimeout(
    () =>
      tone(
        600,
        0.3,
        "sine",
        0.02,
        1300
      ),
    160
  );

}


// ========================================================
// MENU
// ========================================================

document
  .querySelectorAll(
    ".menu-tab"
  )
  .forEach(

    button => {

      button.addEventListener(

        "click",

        () => {

          tone(
            430,
            0.035,
            "sine",
            0.01,
            520
          );


          const page =
            button.dataset.menu;


          document
            .querySelectorAll(
              ".menu-tab"
            )
            .forEach(

              tab =>
                tab.classList.toggle(
                  "active",
                  tab === button
                )

            );


          document
            .querySelectorAll(
              ".menu-page"
            )
            .forEach(

              pageElement =>
                pageElement.classList.toggle(
                  "active",
                  pageElement.dataset.page === page
                )

            );


          if (
            page ===
            "rebirth"
          ) {

            updateRebirthUI();

          }

          if (page === "quests") {
            renderQuests();
          }

        }

      );

    }

  );


// ========================================================
// SHOP RENDERING
// ========================================================

function renderShops() {

  renderShop(
    "guns",
    guns,
    document.getElementById(
      "gun-shop"
    )
  );


  renderShop(
    "drones",
    drones,
    document.getElementById(
      "drone-shop"
    )
  );


  renderShop(
    "keyboards",
    keyboards,
    document.getElementById(
      "keyboard-shop"
    )
  );


  renderKeycaps();

}


function renderShop(
  category,
  data,
  container
) {

  container.innerHTML =
    "";


  Object.entries(
    data
  )
  .forEach(

    ([id, item]) => {

      const isOwned =
        owned[
          category
        ].includes(
          id
        );


      const equippedId =
        category ===
        "guns"
          ?
          equipped.gun
          :
        category ===
        "drones"
          ?
          equipped.drone
          :
          equipped.keyboard;


      const isEquipped =
        equippedId ===
        id;


      const card =
        document.createElement(
          "article"
        );


      card.className =
        "shop-item";


      if (
        isEquipped
      ) {

        card.classList.add(
          "equipped"
        );

      }


      card.innerHTML = `

        ${
          isEquipped
            ?
            `
            <div class="equipped-badge">
              EQUIPPED
            </div>
            `
            :
            ""
        }

        <div class="item-icon">
          ${item.icon}
        </div>

        <h3>
          ${item.name}
        </h3>

        <p>
          ${item.description}
        </p>

        <div class="item-price">

          ${
            isOwned
              ?
              "OWNED"
              :
              `🪙 ${item.price}`
          }

        </div>

        <button class="item-action">

          ${
            isEquipped
              ?
              "EQUIPPED"
              :
            isOwned
              ?
              "EQUIP"
              :
              "BUY"
          }

        </button>

      `;


      card
        .querySelector(
          ".item-action"
        )
        .addEventListener(

          "click",

          () => {

            if (
              isEquipped
            ) {

              return;

            }


            if (
              isOwned
            ) {

              equipItem(
                category,
                id
              );

            }

            else {

              buyItem(
                category,
                id
              );

            }

          }

        );


      container.appendChild(
        card
      );

    }

  );

}


// ========================================================
// KEYCAP COLLECTION
// ========================================================

function renderKeycaps() {

  const list =
    document.getElementById(
      "keycap-list"
    );


  list.innerHTML =
    "";


  ownedKeycaps.forEach(

    id => {

      const data =
        keycaps[
          id
        ];


      if (
        !data
      ) {

        return;

      }


      const button =
        document.createElement(
          "button"
        );


      button.className =
        "keycap-chip";


      if (
        equipped.keycap ===
        id
      ) {

        button.classList.add(
          "active"
        );

      }


      button.textContent =
        data.name;


      const previewClass =
        data.className;


      if (
        previewClass ===
        "keycap-red"
      ) {
        button.style.background =
          "#b9213b";
      }

      else if (
        previewClass ===
        "keycap-blue"
      ) {
        button.style.background =
          "#315db5";
      }

      else if (
        previewClass ===
        "keycap-green"
      ) {
        button.style.background =
          "#228755";
      }

      else if (
        previewClass ===
        "keycap-yellow"
      ) {
        button.style.background =
          "#b99b2b";

        button.style.color =
          "#211b00";
      }

      else if (
        previewClass ===
        "keycap-purple"
      ) {
        button.style.background =
          "#7128b7";
      }

      else if (
        previewClass ===
        "keycap-pink"
      ) {
        button.style.background =
          "#c43291";
      }

      else if (
        previewClass ===
        "keycap-orange"
      ) {
        button.style.background =
          "#b95d21";
      }

      else if (
        previewClass ===
        "keycap-white"
      ) {
        button.style.background =
          "#e7edf4";

        button.style.color =
          "#10151c";
      }

      else if (previewClass === "keycap-cyan") {
        button.style.background = "#21b7c9";
      }

      else if (previewClass === "keycap-gold") {
        button.style.background = "#c49a22";
        button.style.color = "#171000";
      }

      else if (previewClass === "keycap-obsidian") {
        button.style.background = "#11131a";
        button.style.borderColor = "#767b8c";
      }

      else if (
        previewClass ===
        "keycap-rainbow"
      ) {

        button.style.background =
          "linear-gradient(90deg,#ff5570,#ffd44d,#55e58f,#50b7ff,#bf67ff)";

      }

      else if (
        previewClass ===
        "keycap-galaxy"
      ) {

        button.style.background =
          "linear-gradient(90deg,#251052,#6630aa,#254e98)";

      }


      button.addEventListener(

        "click",

        () => {

          equipped.keycap =
            id;


          playSuccessSound();

          save();

          applyLoadoutVisuals();

          renderKeycaps();

        }

      );


      list.appendChild(
        button
      );

    }

  );

}


// ========================================================
// BUY / EQUIP
// ========================================================

function buyItem(
  category,
  id
) {

  const data =
    category ===
    "guns"
      ?
      guns
      :
    category ===
    "drones"
      ?
      drones
      :
      keyboards;


  const item =
    data[
      id
    ];


  if (
    coins <
    item.price
  ) {

    playErrorSound();

    flashCoinBalance();

    return;

  }


  coins -=
    item.price;


  owned[
    category
  ].push(
    id
  );


  equipItem(
    category,
    id
  );


  save();

}


function equipItem(
  category,
  id
) {

  if (
    category ===
    "guns"
  ) {

    equipped.gun =
      id;

  }


  if (
    category ===
    "drones"
  ) {

    equipped.drone =
      id;

  }


  if (
    category ===
    "keyboards"
  ) {

    equipped.keyboard =
      id;

  }


  playSuccessSound();


  save();

  renderShops();

  applyLoadoutVisuals();

}


// ========================================================
// UPGRADES
// ========================================================

const upgradeCosts = {

  damage:
    8,

  bullets:
    25,

  cooling:
    12,

  health:
    10,

  precision:
    18,

  crit:
    26,

  magnet:
    30,

  bulletSpeed:
    35

};


function getUpgradeCost(
  type
) {

  const level =
    Number.isFinite(
      upgrades[type]
    )
      ? upgrades[type]
      : 0;

  return Math.floor(

    (upgradeCosts[type] || 0)

    *

    Math.pow(
      1.65,
      level -
      1
    )

  );

}


document
  .querySelectorAll(
    ".quick-upgrade"
  )
  .forEach(

    button => {

      button.addEventListener(

        "click",

        () => {

          const type =
            button.dataset.upgrade;


          if (
            type ===
            "bullets" &&
            upgrades.bullets >=
            6
          ) {

            playErrorSound();

            return;

          }

          if (
            (type ===
              "precision" &&
              upgrades.precision >=
              8) ||
            (type ===
              "crit" &&
              upgrades.crit >=
              8) ||
            (type ===
              "magnet" &&
              upgrades.magnet >=
              8) ||
            (type ===
              "bulletSpeed" &&
              upgrades.bulletSpeed >=
              8)
          ) {

            playErrorSound();

            return;

          }


          const cost =
            getUpgradeCost(
              type
            );


          if (
            coins <
            cost
          ) {

            flashCoinBalance();

            playErrorSound();

            return;

          }


          coins -=
            cost;


          upgrades[
            type
          ]++;


          playSuccessSound();

          save();

        }

      );

    }

  );


// ========================================================
// CRATES — NERFED
// ========================================================

const cratePrices = {
  basic: 350,
  neon: 900,
  cosmic: 2200,
  legend: 5000
};


const basicKeycapPool = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "white"
];


const neonKeycapPool = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "pink",
  "purple"
];


const cosmicKeycapPool = [
  "pink",
  "purple",
  "rainbow",
  "galaxy",
  "cyan"
];

const legendKeycapPool = [
  "rainbow",
  "galaxy",
  "cyan",
  "gold",
  "obsidian"
];


document
  .querySelectorAll(
    ".crate-button"
  )
  .forEach(

    button => {

      button.addEventListener(

        "click",

        () => {

          openCrate(
            button.dataset.crate
          );

        }

      );

    }

  );


function openCrate(
  type
) {

  const price =
    cratePrices[
      type
    ];


  if (
    coins <
    price
  ) {

    flashCoinBalance();

    playErrorSound();

    return;

  }


  coins -=
    price;


  save();


  const overlay =
    document.getElementById(
      "crate-overlay"
    );


  const crate =
    document.getElementById(
      "opening-crate"
    );


  const light =
    document.querySelector(
      ".crate-light"
    );


  document.getElementById(
    "crate-result-title"
  ).textContent =
    "OPENING...";


  document.getElementById(
    "crate-result-description"
  ).textContent =
    "CHECKING KEYCAPS";


  document.getElementById(
    "close-crate"
  ).style.display =
    "none";


  crate.className =
    "shake";


  overlay.classList.add(
    "show"
  );


  playCrateSound();


  setTimeout(

    () => {

      crate.className =
        "burst";


      light.classList.add(
        "flash"
      );


      const reward =
        getCrateReward(
          type
        );


      document.getElementById(
        "crate-result-title"
      ).textContent =
        reward.title;


      document.getElementById(
        "crate-result-description"
      ).textContent =
        reward.description;


      document.getElementById(
        "close-crate"
      ).style.display =
        "block";


      playSuccessSound();


      save();

      renderKeycaps();


      setTimeout(

        () => {

          light.classList.remove(
            "flash"
          );

        },

        550

      );

    },

    1400

  );

}


function getCrateReward(
  type
) {

  let pool =
    basicKeycapPool;


  let keycapChance =
    0.72;


  let duplicateCoins =
    120;


  if (
    type ===
    "neon"
  ) {

    pool =
      neonKeycapPool;


    keycapChance =
      0.82;


    duplicateCoins =
      320;

  }


  if (
    type ===
    "cosmic"
  ) {

    pool =
      cosmicKeycapPool;


    keycapChance =
      0.9;


    duplicateCoins =
      850;

  }

  if (type === "legend") {
    pool = legendKeycapPool;
    keycapChance = 0.96;
    duplicateCoins = 2000;
  }


  if (
    Math.random() <
    keycapChance
  ) {

    const keycap =
      randomItem(
        pool
      );


    if (
      !ownedKeycaps.includes(
        keycap
      )
    ) {

      ownedKeycaps.push(
        keycap
      );


      return {

        title:
          "NEW KEYCAP!",

        description:
          `🎨 ${keycaps[keycap].name.toUpperCase()} KEYCAPS`

      };

    }


    coins +=
      duplicateCoins;


    return {

      title:
        "DUPLICATE",

      description:
        `Converted to 🪙${duplicateCoins}`

    };

  }


  const smallCoins =
    type ===
    "basic"
      ?
      randomInteger(
        15,
        40
      )
      :
    type ===
    "neon"
      ?
      randomInteger(
        45,
        90
      )
      :
      randomInteger(
        100,
        170
      );


  coins +=
    smallCoins;


  return {

    title:
      "CREDIT CHIP",

    description:
      `🪙 +${smallCoins}`

  };

}


document
  .getElementById(
    "close-crate"
  )
  .addEventListener(

    "click",

    () => {

      document
        .getElementById(
          "crate-overlay"
        )
        .classList.remove(
          "show"
        );

    }

  );


// ========================================================
// REBIRTH
// ========================================================

function rebirthRequirement() {

  return {

    wave:
      20 +
      rebirths *
      5,

    coins:
      Math.floor(
        2500 *
        Math.pow(
          1.7,
          rebirths
        )
      )

  };

}


function rebirthPreviewText() {

  const nextBonus =
    1 +
    rebirths *
    0.08;

  const nextCash =
    cashMultiplier() +
    0.5;

  const nextShield =
    rebirthShieldBonus() +
    10;

  return [
    `+${(nextBonus * 100 - 100).toFixed(0)}% damage`,
    `+${nextCash.toFixed(2)}× coin gain`,
    `+${nextShield} starting shield`
  ];

}


function cashMultiplier() {

  return (
    1 +
    rebirths *
    0.5
  );

}


function rebirthDamageMultiplier() {

  return (
    1 +
    rebirths *
    0.08
  );

}


function rebirthShieldBonus() {

  return (
    rebirths *
    10
  );

}


function updateRebirthUI() {

  const requirement =
    rebirthRequirement();

  const preview =
    rebirthPreviewText();


  document.getElementById(
    "rebirth-cash-multiplier"
  ).textContent =
    cashMultiplier()
    .toFixed(2)
    +
    "×";


  document.getElementById(
    "rebirth-damage-bonus"
  ).textContent =
    `+${rebirths * 8}%`;


  document.getElementById(
    "rebirth-shield-bonus"
  ).textContent =
    `+${rebirthShieldBonus()}`;


  document.getElementById(
    "rebirth-wave-requirement"
  ).textContent =
    `Reach Wave ${requirement.wave}`;


  document.getElementById(
    "rebirth-coin-requirement"
  ).textContent =
    `Have 🪙${requirement.coins.toLocaleString()}`;


  document.getElementById(
    "rebirth-preview"
  ).innerHTML =
    preview
      .map(
        line =>
          `<span>${line}</span>`
      )
      .join("");


  const canRebirth =
    bestWave >=
    requirement.wave
    &&
    coins >=
    requirement.coins;


  document.getElementById(
    "rebirth-button"
  ).disabled =
    !canRebirth;

}


document
  .getElementById(
    "rebirth-button"
  )
  .addEventListener(

    "click",

    () => {

      const requirement =
        rebirthRequirement();


      if (
        bestWave <
        requirement.wave
        ||
        coins <
        requirement.coins
      ) {

        playErrorSound();

        return;

      }


      rebirths++;


      coins =
        0;


      bestWave =
        0;


      upgrades = {
        damage:
          1,

        bullets:
          1,

        cooling:
          1,

        health:
          1
      };


      owned = {
        guns:
          ["pulse"],

        drones:
          [],

        keyboards:
          ["standard"]
      };


      equipped.gun =
        "pulse";


      equipped.drone =
        null;


      equipped.keyboard =
        "standard";


      // keycaps stay forever
      // username stays forever


      playRebirthSound();


      save();

      renderShops();

      applyLoadoutVisuals();

      updateRebirthUI();


      showLobbyFlash(
        `REBIRTH ${rebirths}!`
      );

    }

  );


// ========================================================
// START RUN
// ========================================================

const DIFFICULTIES = {
  easy: {
    id: "easy",
    name: "EASY",
    icon: "🟢",
    tagline: "WARM-UP PROTOCOL",
    description: "Slower, weaker invaders. Great for learning builds.",
    speed: 0.78,
    health: 0.75,
    shooterChance: 0.01,
    cash: 0.75
  },
  normal: {
    id: "normal",
    name: "NORMAL",
    icon: "🔵",
    tagline: "STANDARD INVASION",
    description: "The classic Keyboard Invaders experience.",
    speed: 1,
    health: 1,
    shooterChance: 0.03,
    cash: 1
  },
  hard: {
    id: "hard",
    name: "HARD",
    icon: "🟠",
    tagline: "HOSTILE PROTOCOL",
    description: "Faster, tougher enemies with more shooters — bigger rewards.",
    speed: 1.65,
    health: 2.25,
    shooterChance: 0.065,
    cash: 1.75
  },
  insane: {
    id: "insane",
    name: "INSANE",
    icon: "🔴",
    tagline: "DO NOT ENTER",
    description: "3× speed. 5× health. 10% shooters. Maximum chaos.",
    speed: 3,
    health: 5,
    shooterChance: 0.10,
    cash: 2.5
  }
};

let selectedDifficulty = "normal";

function getDifficulty() {
  return DIFFICULTIES[selectedDifficulty] || DIFFICULTIES.normal;
}

function ensureDifficultyPicker() {
  let overlay = document.getElementById("difficulty-overlay");
  if (overlay) return overlay;

  overlay = document.createElement("div");
  overlay.id = "difficulty-overlay";
  overlay.className = "difficulty-overlay";
  overlay.innerHTML = `
    <div class="difficulty-panel">
      <button class="difficulty-close" type="button" aria-label="Close">×</button>

      <div class="difficulty-kicker">⚠ RUN CONFIGURATION</div>
      <h2>CHOOSE DIFFICULTY</h2>
      <p class="difficulty-subtitle">
        Higher danger = higher coin multiplier. Pick your protocol.
      </p>

      <div class="difficulty-grid">
        ${Object.values(DIFFICULTIES).map(diff => `
          <button class="difficulty-card difficulty-${diff.id}" data-difficulty="${diff.id}" type="button">
            <div class="difficulty-card-top">
              <span class="difficulty-icon">${diff.icon}</span>
              <div>
                <strong>${diff.name}</strong>
                <small>${diff.tagline}</small>
              </div>
            </div>

            <p>${diff.description}</p>

            <div class="difficulty-stats">
              <span>⚡ ${diff.speed.toFixed(diff.speed % 1 ? 2 : 0)}× SPEED</span>
              <span>❤️ ${diff.health.toFixed(diff.health % 1 ? 2 : 0)}× HP</span>
              <span>🎯 ${Math.round(diff.shooterChance * 100)}% SHOOTERS</span>
              <span class="difficulty-cash">🪙 ${diff.cash}× CASH</span>
            </div>

            <div class="difficulty-select-text">SELECT ${diff.name}</div>
          </button>
        `).join("")}
      </div>

      <div class="difficulty-tip">
        💡 Difficulty only affects the current run. You can choose again next time.
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector(".difficulty-close").addEventListener("click", closeDifficultyPicker);
  overlay.addEventListener("click", event => {
    if (event.target === overlay) closeDifficultyPicker();
  });

  overlay.querySelectorAll("[data-difficulty]").forEach(card => {
    card.addEventListener("click", () => {
      selectedDifficulty = card.dataset.difficulty || "normal";
      closeDifficultyPicker();
      startGame();
    });
  });

  return overlay;
}

function openDifficultyPicker() {
  const overlay = ensureDifficultyPicker();
  overlay.classList.add("show");
  playMenuSound?.();
}

function closeDifficultyPicker() {
  document.getElementById("difficulty-overlay")?.classList.remove("show");
}

document
  .getElementById(
    "start-run"
  )
  .addEventListener(

    "click",

    openDifficultyPicker

  );


function updateDifficultyBadge() {
  let badge = document.getElementById("run-difficulty-badge");

  if (!badge) {
    badge = document.createElement("div");
    badge.id = "run-difficulty-badge";
    badge.className = "run-difficulty-badge";

    const hud = document.querySelector(".game-hud") || document.querySelector(".game-top") || game;
    hud?.appendChild(badge);
  }

  const diff = getDifficulty();
  if (badge) {
    badge.className = `run-difficulty-badge diff-${diff.id}`;
    badge.innerHTML = `<span>${diff.icon}</span><b>${diff.name}</b><small>${diff.cash}× CASH</small>`;
  }
}


function startGame() {

  lobby.classList.remove(
    "active"
  );


  game.classList.add(
    "active"
  );


  updateDifficultyBadge();


  clearArena();

  clearJammedKeys();


  currentWorld =
    "orbit";

  applyWorldTheme(
    currentWorld
  );


  running =
    true;


  wave =
    1;


  kills =
    0;


  combo =
    0;


  runCoins =
    0;


  heat =
    0;


  precision =
    100;


  overheated =
    false;


  const board =
    keyboards[equipped.keyboard] || keyboards.standard;


  maxHealth =
    100
    +
    upgrades.health *
    18
    +
    board.shield
    +
    rebirthShieldBonus();


  health =
    maxHealth;


  applyLoadoutVisuals();


  startDrone();


  scheduleFloatingCoin();


  const difficulty = getDifficulty();

  showAnnouncement(
    `${difficulty.icon} ${difficulty.name} MODE`,
    `${difficulty.cash}× CASH • SURVIVE THE INVASION`
  );


  updateHUD();
  addQuestProgress("wave", 1, true);

  if (!tutorialSeen) {
    setTimeout(() => showTutorial("game"), 180);
  }

  setTimeout(
    startWave,
    800
  );

}


function getWorldForWave(
  targetWave
) {

  const index =
    Math.min(
      worldOrder.length -
      1,
      Math.floor(
        (targetWave -
          1) /
        10
      )
    );

  return worldOrder[
    index
  ];

}


function applyWorldTheme(
  worldId
) {

  const world =
    worlds[
      worldId
    ] ||
    worlds.orbit;

  document.body.classList.remove(
    ...Object.keys(
      worlds
    ).map(
      key =>
        `world-${key}`
    )
  );

  document.body.classList.add(
    world.bodyClass
  );

  document.getElementById(
    "world-name"
  ).textContent =
    world.name;

  document.getElementById(
    "world-range"
  ).textContent =
    world.range;

}


function showWorldTransition(
  worldId
) {

  const world =
    worlds[
      worldId
    ] ||
    worlds.orbit;

  const box =
    document.getElementById(
      "world-transition"
    );

  document.getElementById(
    "world-transition-small"
  ).textContent =
    "ENTERING SECTOR";

  document.getElementById(
    "world-transition-name"
  ).textContent =
    world.name;

  document.getElementById(
    "world-transition-sub"
  ).textContent =
    world.intro;

  box.classList.remove(
    "show"
  );

  void box.offsetWidth;

  box.classList.add(
    "show"
  );

  setTimeout(
    () =>
      box.classList.remove(
        "show"
      ),
    2200
  );

}


// ========================================================
// KEYBOARD VISUALS
// ========================================================

function applyLoadoutVisuals() {

  keyboard.className =
    "";


  const board =
    keyboards[equipped.keyboard] || keyboards.standard;


  if (
    board.className
  ) {

    keyboard.classList.add(
      board.className
    );

  }


  const keycap =
    keycaps[
      equipped.keycap
    ];


  if (
    keycap &&
    keycap.className
  ) {

    keyboard.classList.add(
      keycap.className
    );

  }


  const droneVisual =
    document.getElementById(
      "drone-visual"
    );


  if (
    !equipped.drone
  ) {

    droneVisual.classList.add(
      "hidden"
    );

  }

  else {

    droneVisual.classList.remove(
      "hidden"
    );


    document.getElementById(
      "drone-body"
    ).textContent =
      drones[
        equipped.drone
      ].icon;

  }

}


// ========================================================
// WAVE SYSTEM
// ========================================================

function startWave() {

  if (
    !running
  ) {

    return;

  }


  const nextWorld =
    getWorldForWave(
      wave
    );

  if (
    nextWorld !==
    currentWorld
  ) {

    currentWorld =
      nextWorld;

    applyWorldTheme(
      currentWorld
    );

    showWorldTransition(
      currentWorld
    );

  }


  waveChanging =
    false;


  closeExecution();


  const bossWave =
    wave %
    10 ===
    0;


  const events = [
    "NONE",
    "SWARM",
    "FAST",
    "ARMORED",
    "BOUNTY",
    "CHAOS"
  ];


  currentModifier =
    wave >=
    4
    &&
    Math.random() <
    0.5
      ?
      randomItem(
        events.slice(
          1
        )
      )
      :
      "NONE";


  let amount =
    6 +
    Math.floor(
      wave *
      1.5
    );


  if (
    wave ===
    1
  ) {

    amount =
      8;

  }


  if (
    wave ===
    2
  ) {

    amount =
      10;

  }


  if (currentModifier === "SWARM") {
    amount = Math.ceil(amount * 1.65);
  }

  if (currentModifier === "CHAOS") {
    amount = Math.ceil(amount * 1.35);
  }


  if (
    bossWave
  ) {

    const bossKey =
      getBossForWave(
        wave
      );

    const bossMeta =
      bossTypes[
        bossKey
      ];

    showAnnouncement(
      "⚠ BOSS WAVE ⚠",
      bossMeta
        ? `GET READY: ${getBossDisplayName(wave, bossMeta.name)}`
        : `GET READY: ${getBossDisplayName(wave, "TITAN")}`,
      4200
    );

  }


  else if (
    wave >
    1
    &&
    wave %
    5 ===
    0
  ) {

    const newMob =
      Object.values(
        enemyTypes
      )
      .find(

        mob =>
          mob.unlock ===
          wave
          &&
          mob.name !==
          "GALACTIC TITAN"

      );


    showAnnouncement(
      "NEW ENEMY UNLOCKED",
      newMob ? newMob.name : `WAVE ${wave}`,
      3300
    );

  }


  else {

    const eventInfo = modifierInfo[currentModifier] || modifierInfo.NONE;
    showAnnouncement(
      currentModifier === "NONE" ? `WAVE ${wave}` : `⚡ ${eventInfo.name} ⚡`,
      currentModifier === "NONE" ? "GET READY." : eventInfo.text,
      currentModifier === "NONE" ? 2400 : 3400
    );

  }


  waveTotal =
    amount;


  enemiesRemaining =
    amount;


  for (
    let i =
      0;

    i <
    amount;

    i++
  ) {

    const timer =
      setTimeout(

        () => {

          if (
            !running
          ) {

            return;

          }


          if (
            bossWave
            &&
            i ===
            0
          ) {

            spawnEnemy(
              getBossForWave(
                wave
              )
            );

          }

          else {

            spawnEnemy();

          }

        },

        i *
        Math.max(
          170,
          440 -
          wave *
          7
        )

      );


    spawnTimers.push(
      timer
    );

  }


  updateHUD();

}


// ========================================================
// MOB SELECTION
// ========================================================

function getBossForWave(
  targetWave
) {

  const worldId =
    getWorldForWave(
      targetWave
    );

  const bossPool =
    [
      "titan",
      "moonWarden",
      "magmaBeast",
      "abyssalKing",
      "eclipseSentinel"
    ]
    .filter(
      key =>
        bossTypes[
          key
        ].unlock <=
        targetWave
        &&
        bossTypes[
          key
        ].world ===
        worldId
    );

  if (
    !bossPool.length
  ) {

    return "titan";

  }

  return randomItem(
    bossPool
  );

}


function chooseEnemy() {

  const available =
    Object.keys(
      enemyTypes
    )
    .filter(

      type =>
        !Object.hasOwn(
          bossTypes,
          type
        )
        &&
        enemyTypes[
          type
        ].unlock <=
        wave

    );


  return randomItem(
    available
  );

}


// ========================================================
// SPAWN MOB
// ========================================================

function spawnEnemy(
  forced =
    null
) {

  const type =
    forced ||
    chooseEnemy();


  const bossMeta =
    bossTypes[
      type
    ];


  const boss =
    !!bossMeta;


  const base =
    boss
      ?
      {
        ...bossMeta,
        name: getBossDisplayName(wave, bossMeta.name)
      }
      :
      enemyTypes[
        type
      ];


  const elite =
    !boss
    &&
    wave >=
    3
    &&
    Math.random() <
    Math.min(
      0.04 +
      wave *
      0.004,
      0.22
    );


  const difficulty =
    getDifficulty();


  const shooter =
    boss
    ||
    (
      Math.random() <
      difficulty.shooterChance
    );


  const bossNumber =
    boss
      ?
      Math.max(
        1,
        Math.floor(
          wave / 10
        )
      )
      :
      0;


  let hp =
    base.hp *
    (
      1 +
      wave *
      0.085
    );


  let speed =
    base.speed *
    (
      1 +
      wave *
      0.021
    );


  let reward =
    base.reward *
    (
      1 +
      Math.max(
        0,
        wave - base.unlock
      ) *
      0.025
    );


  if (
    boss
  ) {

    const bossPower =
      1.45 *
      Math.pow(
        1.68,
        bossNumber - 1
      );


    hp =
      base.hp *
      bossPower;


    speed =
      base.speed *
      (
        1.18 +
        Math.min(
          0.55,
          (
            bossNumber - 1
          ) *
          0.07
        )
      );


    reward =
      base.reward *
      (
        2.4 +
        bossNumber *
        0.9
      );

  }


  // RUN DIFFICULTY
  // Reward multiplier is applied on kill so it also affects drone/upgrades consistently.
  hp *= difficulty.health;
  speed *= difficulty.speed;


  if (currentModifier === "ARMORED") {
    hp *= 2.25;
    reward *= 1.35;
  }


  if (currentModifier === "FAST") {
    speed *= 1.65;
    reward *= 1.25;
  }


  if (currentModifier === "BOUNTY") {
    reward *= 3;
  }

  if (currentModifier === "CHAOS") {
    hp *= 1.5;
    speed *= 1.35;
    reward *= 2;
  }


  if (
    elite
  ) {

    hp *=
      1.7;


    speed *=
      1.12;


    reward *=
      2;

  }


  hp =
    Math.round(
      hp
    );


  const level =
    Math.max(
      1,
      wave +
      randomInteger(
        -1,
        2
      )
    );


  const element =
    document.createElement(
      "div"
    );


  element.className =
    `enemy ${
      boss
        ?
        "boss"
        :
        ""
    }`;


  element.innerHTML = `

    <div class="enemy-info">

      <div class="enemy-tags">

        ${
          elite
            ?
            `
            <span class="enemy-tag elite-tag">
              ★ ELITE
            </span>
            `
            :
            ""
        }

        ${
          shooter
            ?
            `
            <span class="enemy-tag shooter-tag">
              🔴 SHOOTER
            </span>
            `
            :
            ""
        }

      </div>

      <div class="enemy-title">

        ${base.name}

        <span class="enemy-level">
          LV.${level}
        </span>

      </div>

      <div class="enemy-hp-text">
        ${hp} / ${hp}
      </div>

      <div class="enemy-hp">
        <div class="enemy-hp-fill"></div>
      </div>

      ${
        base.shield
          ?
          `
          <div class="enemy-shield">
            <div class="enemy-shield-fill"></div>
          </div>
          `
          :
          ""
      }

    </div>

    <div class="enemy-body">
      ${base.icon}
    </div>

    ${
      boss
        ?
        `<div class="boss-aura-ring" style="color:${bossMeta.tier.includes('2') ? '#ffdf62' : bossMeta.tier.includes('3') ? '#57edff' : bossMeta.tier.includes('4') ? '#c57aff' : bossMeta.tier.includes('5') ? '#64ff9f' : '#ff6e6e'}"></div>`
        :
        ""
    }

  `;


  enemyLayer.appendChild(
    element
  );


  const arenaRect =
    arena.getBoundingClientRect();


  const boardRect =
    keyboard.getBoundingClientRect();


  const width =
    boss
      ?
      155
      :
      110;


  if (
    boss
    &&
    element.classList
  ) {

    element.classList.add(
      bossMeta.tier
    );

  }


  const minX =
    boardRect.left -
    arenaRect.left +
    10;


  const maxX =
    boardRect.right -
    arenaRect.left -
    width -
    10;


  const shield =
    base.shield
      ?
      Math.round(
        base.shield *
        (
          1 +
          wave *
          0.05
        )
      )
      :
      0;


  const enemy = {

    type,

    base,

    element,

    boss,

    elite,

    shooter,

    level,

    hp,

    maxHp:
      hp,

    shield,

    maxShield:
      shield,

    speed,

    baseSpeed:
      speed,

    damage:
      base.damage,

    reward:
      Math.round(
        reward
      ),

    x:
      randomNumber(
        minX,
        Math.max(
          minX +
          20,
          maxX
        )
      ),

    y:
      randomNumber(
        -220,
        -100
      ),

    nextShot:
      performance.now()
      +
      randomInteger(
        2800,
        5000
      ),

    nextAbility:
      performance.now()
      +
      2600,

    executionOffered:
      false,

    bossNumber,
    phase2: false,
    abilityBusy: false

  };


  enemies.push(
    enemy
  );


  updateEnemyUI(
    enemy
  );


  renderEnemy(
    enemy
  );


  if (
    boss
  ) {

    document.body.classList.add(
      "boss-active"
    );

    showBossBar(
      enemy
    );

  }

}


// ========================================================
// INPUT
// ========================================================

document.addEventListener(

  "keydown",

  event => {

    if (
      !running
      ||
      event.repeat
    ) {

      return;

    }


    const pressed =
      event.key
      .toLowerCase();


    const key =
      document.querySelector(
        `.key[data-key="${CSS.escape(pressed)}"]`
      );


    if (
      !key
    ) {

      return;

    }


    event.preventDefault();


    key.classList.add(
      "active"
    );


    if (
      activeExecution
      &&
      pressed !==
      " "
    ) {

      handleExecution(
        pressed
      );

    }


    attemptShoot(
      key
    );

  }

);


document
  .querySelectorAll(
    ".key"
  )
  .forEach(
    key => {
      key.addEventListener(
        "click",
        () => {
          if (
            !running
          ) {
            return;
          }

          const keyValue =
            key.dataset.key;

          key.classList.add(
            "active"
          );

          if (
            activeExecution
            &&
            keyValue !==
            " "
          ) {
            handleExecution(
              keyValue.toLowerCase()
            );
            setTimeout(
              () =>
                key.classList.remove(
                  "active"
                ),
              110
            );
            return;
          }

          attemptShoot(
            key
          );

          setTimeout(
            () =>
              key.classList.remove(
                "active"
              ),
            110
          );
        }
      );
    }
  );


document.addEventListener(

  "keyup",

  event => {

    const pressed =
      event.key
      .toLowerCase();


    const key =
      document.querySelector(
        `.key[data-key="${CSS.escape(pressed)}"]`
      );


    if (
      key
    ) {

      key.classList.remove(
        "active"
      );

    }

  }

);


// ========================================================
// SHOOT
// ========================================================

function attemptShoot(
  key
) {

  if (
    overheated
    ||
    key.classList.contains(
      "jammed"
    )
  ) {

    return;

  }


  const gun =
    guns[equipped.gun] || guns.pulse;


  const now =
    performance.now();


  const gap =
    now -
    lastShot;


  lastShot =
    now;


  if (
    gap <
    50
  ) {

    precision -=
      13;

  }


  else if (
    gap <
    80
  ) {

    precision -=
      5;

  }


  else {

    precision +=
      2;

  }


  precision =
    clamp(
      precision,
      10,
      100
    );


  heat +=
    (
      7.5 +
      Math.max(
        0,
        upgrades.bullets -
        1
      )
    )
    *
    gun.heat;


  if (
    heat >=
    100
  ) {

    heat =
      100;


    triggerOverheat();

    return;

  }


  fireGun(
    key
  );


  playGunSound(
    equipped.gun
  );

}


// ========================================================
// DIFFERENT WEAPON FIRE
// ========================================================

function fireGun(
  key
) {

  const gun =
    guns[equipped.gun] || guns.pulse;


  const rect =
    key.getBoundingClientRect();


  const arenaRect =
    arena.getBoundingClientRect();


  const x =
    rect.left +
    rect.width /
    2 -
    arenaRect.left;


  const y =
    arena.clientHeight -
    12;


  let amount =
    Math.min(
      upgrades.bullets,
      6
    );


  let spread =
    0.8;


  if (
    equipped.gun ===
    "scatter"
  ) {

    amount +=
      3;


    spread =
      1.5;

  }


  for (
    let i =
      0;

    i <
    amount;

    i++
  ) {

    const center =
      (
        amount -
        1
      )
      /
      2;


    createBullet(

      x,

      y,

      (
        i -
        center
      )
      *
      spread,

      gun

    );

  }

}


// ========================================================
// BULLET
// ========================================================

function createBullet(
  x,
  y,
  vx,
  gun
) {

  const element =
    document.createElement(
      "div"
    );


  element.className =
    `bullet ${
      gun.bulletClass
    }`;


  bulletLayer.appendChild(
    element
  );


  const bulletSpeedLevel =
    Number.isFinite(
      upgrades.bulletSpeed
    )
      ? upgrades.bulletSpeed
      : 0;

  bullets.push({

    element,

    x,

    y,

    vx,

    vy:
      gun.speed *
      (
        1 +
        bulletSpeedLevel *
        0.12
      ),

    damage:
      (
        8 +
        upgrades.damage *
        5
      )
      *
      gun.damage
      *
      rebirthDamageMultiplier()
      *
      (
        1 +
        precision /
        100 *
        0.25
      )

  });

}


// ========================================================
// COOLING
// ========================================================

setInterval(

  () => {

    if (
      !running
      ||
      overheated
    ) {

      return;

    }


    const board =
      keyboards[
        equipped.keyboard
      ];


    heat -=
      1.25
      +
      upgrades.cooling *
      0.55
      +
      board.cooling;


    heat =
      Math.max(
        0,
        heat
      );


    precision =
      Math.min(
        100,
        precision +
        0.6 +
        upgrades.precision *
        0.3
      );


    updateHUD();

  },

  100

);


// ========================================================
// OVERHEAT
// ========================================================

function triggerOverheat() {

  overheated =
    true;


  combo =
    0;


  document.getElementById(
    "overheat-warning"
  )
  .classList.add(
    "show"
  );


  tone(
    110,
    0.2,
    "sawtooth",
    0.025,
    60
  );


  setTimeout(

    () => {

      overheated =
        false;


      heat =
        45;


      document.getElementById(
        "overheat-warning"
      )
      .classList.remove(
        "show"
      );

    },

    1450

  );

}


// ========================================================
// LOOP
// ========================================================

function gameLoop() {

  if (
    running
  ) {

    moveBullets();

    moveEnemies();

    collisions();

  }


  requestAnimationFrame(
    gameLoop
  );

}


gameLoop();


// ========================================================
// BULLET MOVEMENT
// ========================================================

function moveBullets() {

  for (
    let i =
      bullets.length -
      1;

    i >=
    0;

    i--
  ) {

    const bullet =
      bullets[
        i
      ];


    bullet.x +=
      bullet.vx;


    bullet.y +=
      bullet.vy;


    bullet.element.style.left =
      bullet.x +
      "px";


    bullet.element.style.top =
      bullet.y +
      "px";


    if (
      bullet.y <
      -90
    ) {

      bullet.element.remove();


      bullets.splice(
        i,
        1
      );

    }

  }

}


// ========================================================
// BOSS MECHANICS
// ========================================================

function bossAbility(enemy, left, right) {
  if (!enemy.boss || enemy.abilityBusy || performance.now() < enemy.nextAbility) return;
  enemy.abilityBusy = true;
  const type = ((enemy.bossNumber - 1) % 5) + 1;
  const delay = Math.max(1800, 4300 - enemy.bossNumber * 180);
  enemy.nextAbility = performance.now() + delay;

  if (type === 1) {
    showAnnouncement("⚠ BOSS MOVE: CHARGE ⚠", "THE BOSS IS RUSHING AT YOU. MOVE!", 3200);
    enemy.speed = enemy.baseSpeed * 2.2;
    setTimeout(() => {
      if (enemies.includes(enemy)) enemy.speed = enemy.baseSpeed * (enemy.phase2 ? 1.35 : 1);
      enemy.abilityBusy = false;
    }, 1200);
    return;
  }

  if (type === 2) {
    showAnnouncement("⚠ BOSS MOVE: HEAL ⚠", "THE BOSS GOT SOME HEALTH BACK.", 3200);
    enemy.hp = Math.min(enemy.maxHp, enemy.hp + enemy.maxHp * 0.08);
    updateEnemyUI(enemy);
    updateBossBar(enemy);
  } else if (type === 3) {
    showAnnouncement("⚠ BOSS MOVE: DOUBLE SHOT ⚠", "THE BOSS ATTACKS TWICE. WATCH OUT!", 3200);
    enemyShoot(enemy);
    setTimeout(() => enemies.includes(enemy) && enemyShoot(enemy), 500);
  } else if (type === 4) {
    showAnnouncement("⚠ BOSS MOVE: TELEPORT ⚠", "THE BOSS MOVED TO A NEW SPOT.", 3200);
    enemy.x = randomNumber(left, Math.max(left, right));
    combatText(enemy.x, enemy.y, "TELEPORT!", "special-text");
  } else {
    showAnnouncement("⚠ BOSS MOVE: BACKUP ⚠", "MORE ENEMIES ARE JOINING THE FIGHT.", 3200);
    enemiesRemaining += 2;
    spawnEnemy();
    setTimeout(() => running && spawnEnemy(), 300);
  }

  setTimeout(() => { enemy.abilityBusy = false; }, 650);
}

function checkBossPhase(enemy) {
  if (!enemy.boss || enemy.phase2 || enemy.hp > enemy.maxHp * 0.5) return;
  enemy.phase2 = true;
  enemy.baseSpeed *= 1.35;
  enemy.speed = enemy.baseSpeed;
  enemy.damage = Math.round(enemy.damage * 1.25);
  enemy.element.classList.add("boss-phase-two");
  showAnnouncement("⚠ BOSS GOT STRONGER ⚠", "IT IS NOW FASTER AND HITS HARDER.", 3600);
  combatText(enemy.x + 30, enemy.y, "PHASE 2!", "boss-phase-text");
  tone(120, 0.35, "sawtooth", 0.03, 55);
}


// ========================================================
// MOB MOVEMENT
// ========================================================

function moveEnemies() {

  const arenaRect =
    arena.getBoundingClientRect();


  const boardRect =
    keyboard.getBoundingClientRect();


  const left =
    boardRect.left -
    arenaRect.left +
    5;


  for (
    let i =
      enemies.length -
      1;

    i >=
    0;

    i--
  ) {

    const enemy =
      enemies[
        i
      ];


    const width =
      enemy.boss
        ?
        155
        :
        110;


    const right =
      boardRect.right -
      arenaRect.left -
      width -
      5;


    // shooter

    if (
      enemy.shooter
      &&
      performance.now() >
      enemy.nextShot
    ) {

      enemyShoot(
        enemy
      );


      enemy.nextShot =
        performance.now()
        +
        randomInteger(

          enemy.boss
            ?
            1800
            :
            3000,

          enemy.boss
            ?
            2800
            :
            5200

        );

    }


    // teleport

    if (
      enemy.type ===
      "teleporter"
      &&
      performance.now() >
      enemy.nextAbility
    ) {

      enemy.x =
        randomNumber(
          left,
          Math.max(
            left,
            right
          )
        );


      enemy.nextAbility =
        performance.now()
        +
        2400;


      combatText(
        enemy.x,
        enemy.y,
        "BLINK!",
        "special-text"
      );


      tone(
        900,
        0.07,
        "sine",
        0.012,
        1200
      );

    }


    if (enemy.boss) {
      bossAbility(enemy, left, right);
      checkBossPhase(enemy);
    }


    // mutant rage

    if (
      enemy.type ===
      "mutant"
      &&
      enemy.hp <
      enemy.maxHp *
      0.5
    ) {

      enemy.speed =
        enemy.baseSpeed *
        1.6;

    }


    // summoner heal

    if (
      enemy.type ===
      "necromancer"
      &&
      performance.now() >
      enemy.nextAbility
    ) {

      enemy.nextAbility =
        performance.now()
        +
        3000;


      enemies.forEach(

        mob => {

          if (
            mob !==
            enemy
          ) {

            mob.hp =
              Math.min(
                mob.maxHp,
                mob.hp +
                mob.maxHp *
                0.05
              );


            updateEnemyUI(
              mob
            );

          }

        }

      );


      combatText(
        enemy.x,
        enemy.y,
        "HEAL!",
        "special-text"
      );


      tone(
        340,
        0.12,
        "sine",
        0.012,
        650
      );

    }


    enemy.y +=
      enemy.speed;


    enemy.x +=
      Math.sin(
        performance.now()
        /
        470
        +
        i
      )
      *
      0.18;


    enemy.x =
      clamp(
        enemy.x,
        left,
        Math.max(
          left,
          right
        )
      );


    renderEnemy(
      enemy
    );


    maybeExecution(
      enemy
    );


    if (
      enemy.y >
      arena.clientHeight -
      70
    ) {

      breach(
        enemy
      );


      removeEnemy(
        enemy
      );


      enemiesRemaining--;


      checkWaveComplete();

    }

  }

}


// ========================================================
// SHOOTER ATTACK
// ========================================================

function enemyShoot(
  enemy
) {

  const available =
    Array.from(
      document.querySelectorAll(
        ".key:not(.jammed)"
      )
    );


  if (
    !available.length
  ) {

    return;

  }


  const key =
    randomItem(
      available
    );


  key.classList.add(
    "targeted"
  );


  tone(
    260,
    0.055,
    "square",
    0.012,
    180
  );


  setTimeout(

    () => {

      if (
        !running
        ||
        !enemies.includes(
          enemy
        )
      ) {

        key.classList.remove(
          "targeted"
        );

        return;

      }


      launchEnemyShot(
        enemy,
        key
      );

    },

    400

  );

}


// ========================================================
// ENEMY PROJECTILE
// ========================================================

function launchEnemyShot(
  enemy,
  key
) {

  const body =
    enemy.element
    .querySelector(
      ".enemy-body"
    );


  if (
    !body
  ) {

    return;

  }


  const enemyRect =
    body.getBoundingClientRect();


  const keyRect =
    key.getBoundingClientRect();


  const sx =
    enemyRect.left +
    enemyRect.width /
    2;


  const sy =
    enemyRect.top +
    enemyRect.height /
    2;


  const ex =
    keyRect.left +
    keyRect.width /
    2;


  const ey =
    keyRect.top +
    keyRect.height /
    2;


  const shot =
    document.createElement(
      "div"
    );


  shot.className =
    "enemy-projectile";


  shot.style.left =
    sx +
    "px";


  shot.style.top =
    sy +
    "px";


  enemyProjectileLayer.appendChild(
    shot
  );


  const animation =
    shot.animate(

      [
        {
          transform:
            "translate(0,0)"
        },

        {
          transform:
            `translate(
              ${ex - sx}px,
              ${ey - sy}px
            )`
        }
      ],

      {
        duration:
          650,

        easing:
          "linear"
      }

    );


  animation.onfinish =
    () => {

      shot.remove();


      key.classList.remove(
        "targeted"
      );


      if (
        running
      ) {

        jamKey(
          key
        );


        playJamSound();


        showAnnouncement(
          "KEY HIT!",
          `${keyLabel(key)} JAMMED`
        );

      }

    };

}


// ========================================================
// JAM
// ========================================================

function jamKey(
  key
) {

  if (
    key.classList.contains(
      "jammed"
    )
  ) {

    return;

  }


  key.classList.add(
    "jammed"
  );


  const label =
    document.createElement(
      "span"
    );


  label.className =
    "jam-label";


  key.appendChild(
    label
  );


  const start =
    performance.now();


  const duration =
    5000;


  const timer =
    setInterval(

      () => {

        const remaining =
          duration
          -
          (
            performance.now()
            -
            start
          );


        label.textContent =
          `JAM ${
            Math.max(
              0,
              remaining /
              1000
            )
            .toFixed(1)
          }`;


        if (
          remaining <=
          0
        ) {

          clearInterval(
            timer
          );


          key.classList.remove(
            "jammed"
          );


          label.remove();

        }

      },

      100

    );

}


// ========================================================
// BREACH
// ========================================================

function breach(
  enemy
) {

  const damage =
    enemy.damage;


  health -=
    damage;


  health =
    Math.max(
      0,
      health
    );


  combo =
    0;


  showShieldLoss(
    damage
  );


  const available =
    Array.from(
      document.querySelectorAll(
        ".key:not(.jammed)"
      )
    );


  if (
    available.length
  ) {

    const key =
      randomItem(
        available
      );


    jamKey(
      key
    );


    showAnnouncement(
      "BREACH!",
      `${keyLabel(key)} JAMMED`
    );

  }


  playBreachSound();


  if (
    health <=
    0
  ) {

    die();

  }

}


// ========================================================
// SHIELD LOSS POPUP
// ========================================================

function showShieldLoss(
  amount
) {

  const text =
    document.createElement(
      "div"
    );


  text.className =
    "shield-loss";


  text.textContent =
    `-${amount} SHIELD`;


  document.body.appendChild(
    text
  );


  setTimeout(

    () =>
      text.remove(),

    950

  );

}


// ========================================================
// COLLISIONS
// ========================================================

function collisions() {

  for (
    let b =
      bullets.length -
      1;

    b >=
    0;

    b--
  ) {

    const bullet =
      bullets[
        b
      ];


    if (
      !bullet.element.isConnected
    ) {

      continue;

    }


    const bulletRect =
      bullet.element
      .getBoundingClientRect();


    for (
      let e =
        enemies.length -
        1;

      e >=
      0;

      e--
    ) {

      const enemy =
        enemies[
          e
        ];


      const body =
        enemy.element
        .querySelector(
          ".enemy-body"
        );


      if (
        !body
      ) {

        continue;

      }


      const enemyRect =
        body.getBoundingClientRect();


      const hit =
        bulletRect.left <
        enemyRect.right
        &&
        bulletRect.right >
        enemyRect.left
        &&
        bulletRect.top <
        enemyRect.bottom
        &&
        bulletRect.bottom >
        enemyRect.top;


      if (
        !hit
      ) {

        continue;

      }


      hitEnemy(
        enemy,
        bullet.damage
      );


      bullet.element.remove();


      bullets.splice(
        b,
        1
      );


      break;

    }

  }

}


// ========================================================
// HIT MOB
// ========================================================

function hitEnemy(
  enemy,
  damage
) {

  const critical =
    Math.random() <
    (
      0.06
      +
      precision /
      100 *
      0.08
      +
      upgrades.crit *
      0.012
    );


  if (
    critical
  ) {

    damage *=
      2;

  }


  if (
    enemy.shield >
    0
  ) {

    const absorbed =
      Math.min(
        enemy.shield,
        damage
      );


    enemy.shield -=
      absorbed;


    damage -=
      absorbed;

  }


  if (
    damage >
    0
  ) {

    enemy.hp -=
      damage;

  }


  gunSpecialEffect(
    enemy,
    damage
  );


  updateEnemyUI(
    enemy
  );


  enemy.element.classList.remove(
    "enemy-hit"
  );


  void enemy.element.offsetWidth;


  enemy.element.classList.add(
    "enemy-hit"
  );


  combatText(

    enemy.x +
    35,

    enemy.y +
    20,

    critical
      ?
      `CRIT ${Math.round(damage)}`
      :
      `-${Math.round(damage)}`,

    critical
      ?
      "crit-text"
      :
      "damage-text"

  );


  particles(
    enemy.x +
    50,
    enemy.y +
    70,
    5,
    "spark"
  );


  if (
    enemy.boss
  ) {

    updateBossBar(
      enemy
    );

  }


  if (
    enemy.hp <=
    0
  ) {

    killEnemy(
      enemy
    );

  }

}


// ========================================================
// WEAPON EFFECTS
// ========================================================

function gunSpecialEffect(
  enemy,
  damage
) {

  if (
    equipped.gun ===
    "cryo"
    &&
    Math.random() <
    0.17
  ) {

    enemy.speed =
      enemy.baseSpeed *
      0.4;


    combatText(
      enemy.x,
      enemy.y,
      "FROZEN!",
      "special-text"
    );


    setTimeout(

      () => {

        if (
          enemies.includes(
            enemy
          )
        ) {

          enemy.speed =
            enemy.baseSpeed;

        }

      },

      1700

    );

  }


  if (
    equipped.gun ===
    "flame"
    &&
    Math.random() <
    0.22
  ) {

    let ticks =
      3;


    const burn =
      setInterval(

        () => {

          if (
            !enemies.includes(
              enemy
            )
          ) {

            clearInterval(
              burn
            );

            return;

          }


          enemy.hp -=
            Math.max(
              3,
              damage *
              0.1
            );


          updateEnemyUI(
            enemy
          );


          combatText(
            enemy.x,
            enemy.y,
            "🔥",
            "special-text"
          );


          ticks--;


          if (
            enemy.hp <=
            0
          ) {

            clearInterval(
              burn
            );


            killEnemy(
              enemy
            );

          }


          if (
            ticks <=
            0
          ) {

            clearInterval(
              burn
            );

          }

        },

        350

      );

  }


  if (
    equipped.gun ===
    "void"
    &&
    Math.random() <
    0.18
  ) {

    enemies
      .slice()
      .forEach(

        other => {

          if (
            other !==
            enemy
            &&
            Math.abs(
              other.x -
              enemy.x
            ) <
            140
          ) {

            other.hp -=
              damage *
              0.45;


            updateEnemyUI(
              other
            );


            if (
              other.hp <=
              0
            ) {

              killEnemy(
                other
              );

            }

          }

        }

      );


    combatText(
      enemy.x,
      enemy.y,
      "VOID BURST!",
      "special-text"
    );

  }

}


// ========================================================
// KILL
// ========================================================

function killEnemy(
  enemy
) {

  if (
    !enemies.includes(
      enemy
    )
  ) {

    return;

  }


  let reward =
    enemy.reward;


  if (equipped.drone === "coin") reward *= 1.5;
  if (equipped.drone === "harvester") reward *= 1.9;
  if (equipped.drone === "royal") reward *= 2.5;


  reward *=
    1 +
    upgrades.magnet *
    0.06;


  reward *=
    cashMultiplier();


  // Difficulty cash bonus/penalty
  reward *=
    getDifficulty().cash;


  reward =
    Math.max(
      1,
      Math.round(
        reward
      )
    );


  kills++;
  addQuestProgress("kills", 1);
  addQuestProgress("coins", reward);


  totalKills++;


  combo++;


  // MUCH BIGGER PARTICLE EFFECT

  killParticles(
    enemy
  );


  playKillSound();


  addRunCoinsAnimated(
    reward,
    enemy
  );


  combatText(
    enemy.x + 38,
    enemy.y + 8,
    `+${reward} 🪙`,
    "coin-reward-text"
  );


  addKillFeed(
    enemy.base.name
  );


  if (
    enemy.boss
  ) {

    hideBossBar();


    showAnnouncement(
      "BOSS DOWN!",
      `${getBossDisplayName(wave, enemy.base.name)} DESTROYED`
    );


    tone(
      90,
      0.3,
      "sawtooth",
      0.035,
      35
    );

  }


  removeEnemy(
    enemy
  );


  enemiesRemaining--;


  if (
    activeExecution
    &&
    activeExecution.enemy ===
    enemy
  ) {

    closeExecution();

  }


  checkWaveComplete();

}


// ========================================================
// BIG KILL PARTICLES
// ========================================================

function killParticles(
  enemy
) {

  const x =
    enemy.x +
    50;


  const y =
    enemy.y +
    65;


  particles(
    x,
    y,
    enemy.boss
      ?
      35
      :
      16,
    "spark"
  );


  particles(
    x,
    y,
    enemy.boss
      ?
      25
      :
      10,
    "enemy-chunk"
  );


  particles(
    x,
    y,
    enemy.boss
      ?
      18
      :
      6,
    "coin-spark"
  );


  const ring =
    document.createElement(
      "div"
    );


  ring.className =
    "kill-ring";


  ring.style.left =
    x +
    "px";


  ring.style.top =
    y +
    "px";


  particleLayer.appendChild(
    ring
  );


  setTimeout(

    () =>
      ring.remove(),

    500

  );

}


// ========================================================
// PARTICLES
// ========================================================

function particles(
  x,
  y,
  amount,
  type =
    "spark"
) {

  for (
    let i =
      0;

    i <
    amount;

    i++
  ) {

    const particle =
      document.createElement(
        "div"
      );


    particle.className =
      `particle ${type}`;


    particle.style.left =
      x +
      "px";


    particle.style.top =
      y +
      "px";


    particle.style.setProperty(
      "--x",
      randomNumber(
        -100,
        100
      )
      +
      "px"
    );


    particle.style.setProperty(
      "--y",
      randomNumber(
        -100,
        100
      )
      +
      "px"
    );


    particle.style.setProperty(
      "--spin",
      randomInteger(
        -360,
        360
      )
      +
      "deg"
    );


    particleLayer.appendChild(
      particle
    );


    setTimeout(

      () =>
        particle.remove(),

      750

    );

  }

}


// ========================================================
// COINS
// ========================================================

function addRunCoinsAnimated(
  amount,
  enemy
) {

  const arenaRect =
    arena.getBoundingClientRect();


  flyCoinToBalance(

    arenaRect.left +
    enemy.x +
    50,

    arenaRect.top +
    enemy.y +
    60,

    amount

  );

}


function flyCoinToBalance(
  startX,
  startY,
  amount
) {

  const target =
    document.getElementById(
      "game-credit-box"
    );


  const targetRect =
    target.getBoundingClientRect();


  const coin =
    document.createElement(
      "div"
    );


  coin.className =
    "coin-fly";


  coin.textContent =
    "🪙";


  coin.style.left =
    startX +
    "px";


  coin.style.top =
    startY +
    "px";


  document.body.appendChild(
    coin
  );


  const tx =
    targetRect.left +
    targetRect.width /
    2 -
    startX;


  const ty =
    targetRect.top +
    targetRect.height /
    2 -
    startY;


  const animation =
    coin.animate(

      [
        {
          transform:
            "translate(0,0) scale(1.25)"
        },

        {
          transform:
            `translate(
              ${tx * 0.45}px,
              ${ty * 0.4 - 80}px
            )
            scale(1.05)`
        },

        {
          transform:
            `translate(
              ${tx}px,
              ${ty}px
            )
            scale(.25)`
        }
      ],

      {
        duration:
          650,

        easing:
          "ease-in"
      }

    );


  animation.onfinish =
    () => {

      coin.remove();


      runCoins +=
        amount;


      playCoinSound();


      target.classList.remove(
        "coin-pop"
      );


      void target.offsetWidth;


      target.classList.add(
        "coin-pop"
      );


      updateHUD();

    };

}


// ========================================================
// RANDOM FLOATING COIN
// ========================================================

function scheduleFloatingCoin() {

  clearTimeout(
    floatingCoinTimer
  );


  if (
    !running
  ) {

    return;

  }


  floatingCoinTimer =
    setTimeout(

      () => {

        if (
          running
        ) {

          spawnFloatingCoin();

          scheduleFloatingCoin();

        }

      },

      randomInteger(
        7000,
        15000
      )

    );

}


function spawnFloatingCoin() {

  const coin =
    document.createElement(
      "div"
    );


  coin.className =
    "floating-coin";


  coin.textContent =
    "🪙";


  const baseValue =
    randomInteger(
      2,
      6
    );


  const value =
    Math.round(
      baseValue *
      cashMultiplier()
    );


  coin.style.left =
    randomNumber(
      arena.clientWidth *
      0.23,
      arena.clientWidth *
      0.77
    )
    +
    "px";


  coin.style.top =
    randomNumber(
      70,
      Math.max(
        100,
        arena.clientHeight -
        110
      )
    )
    +
    "px";


  coinLayer.appendChild(
    coin
  );


  coin.addEventListener(

    "click",

    () => {

      const rect =
        coin.getBoundingClientRect();


      flyCoinToBalance(
        rect.left,
        rect.top,
        value
      );


      coin.remove();

    },

    {
      once:
        true
    }

  );


  setTimeout(

    () => {

      if (
        coin.isConnected
      ) {

        coin.animate(

          [
            {
              opacity:
                1
            },

            {
              opacity:
                0
            }
          ],

          {
            duration:
              300
          }

        );


        setTimeout(
          () =>
            coin.remove(),
          300
        );

      }

    },

    5500

  );

}


// ========================================================
// DRONES
// ========================================================

function startDrone() {

  clearInterval(
    droneTimer
  );


  const visual =
    document.getElementById(
      "drone-visual"
    );


  if (
    !equipped.drone
  ) {

    visual.classList.add(
      "hidden"
    );

    return;

  }


  visual.classList.remove(
    "hidden"
  );


  document.getElementById(
    "drone-body"
  ).textContent =
    drones[
      equipped.drone
    ].icon;


  droneTimer =
    setInterval(

      () => {

        if (
          !running
        ) {

          return;

        }


        const drone =
          equipped.drone;


        if (drone === "repair" || drone === "guardian") {

          if (
            health <
            maxHealth
          ) {

            health =
              Math.min(
                maxHealth,
                health +
                (drone === "guardian" ? 18 : 8)
              );


            playDroneSound(
              "repair"
            );


            updateHUD();

          }


          return;

        }


        if (
          enemies.length ===
          0
        ) {

          return;

        }


        const target =
          randomItem(
            enemies
          );


        if (
          drone ===
          "gun"
        ) {

          droneAttackVisual(
            target,
            "#47efff"
          );


          target.hp -=
            24;


          playDroneSound(
            "gun"
          );

        }


        else if (
          drone ===
          "cryo"
        ) {

          droneAttackVisual(
            target,
            "#a9f9ff"
          );


          target.speed =
            target.baseSpeed *
            0.3;


          playDroneSound(
            "cryo"
          );


          setTimeout(

            () => {

              if (
                enemies.includes(
                  target
                )
              ) {

                target.speed =
                  target.baseSpeed;

              }

            },

            2800

          );


          return;

        }


        else if (
          drone ===
          "tesla"
        ) {

          enemies
            .slice(
              0,
              4
            )
            .forEach(

              mob => {

                droneAttackVisual(
                  mob,
                  "#ffe95a"
                );


                mob.hp -=
                  28;


                updateEnemyUI(
                  mob
                );


                if (
                  mob.hp <=
                  0
                ) {

                  killEnemy(
                    mob
                  );

                }

              }

            );


          playDroneSound(
            "tesla"
          );


          return;

        }


        else if (drone === "prism") {
          droneAttackVisual(target, "#8be9ff");
          target.hp -= 45;
          playDroneSound("gun");
        }

        else if (drone === "hunter") {
          droneAttackVisual(target, "#ffe95a");
          target.hp -= 90;
          playDroneSound("gun");
        }

        updateEnemyUI(
          target
        );


        if (
          target.hp <=
          0
        ) {

          killEnemy(
            target
          );

        }

      },

      2000

    );

}


// ========================================================
// DRONE BEAM
// ========================================================

function droneAttackVisual(
  enemy,
  color
) {

  const drone =
    document.getElementById(
      "drone-visual"
    );


  const target =
    enemy.element
    .querySelector(
      ".enemy-body"
    );


  if (
    !target
  ) {

    return;

  }


  const dr =
    drone.getBoundingClientRect();


  const tr =
    target.getBoundingClientRect();


  const x1 =
    dr.left +
    dr.width /
    2;


  const y1 =
    dr.top +
    dr.height /
    2;


  const x2 =
    tr.left +
    tr.width /
    2;


  const y2 =
    tr.top +
    tr.height /
    2;


  const distance =
    Math.hypot(
      x2 -
      x1,
      y2 -
      y1
    );


  const angle =
    Math.atan2(
      y2 -
      y1,
      x2 -
      x1
    )
    *
    180 /
    Math.PI;


  const beam =
    document.createElement(
      "div"
    );


  Object.assign(
    beam.style,
    {
      position:
        "fixed",

      left:
        x1 +
        "px",

      top:
        y1 +
        "px",

      width:
        distance +
        "px",

      height:
        "4px",

      zIndex:
        "95",

      transformOrigin:
        "left center",

      transform:
        `rotate(${angle}deg)`,

      background:
        color,

      boxShadow:
        `0 0 12px ${color}`,

      pointerEvents:
        "none"
    }
  );


  document.body.appendChild(
    beam
  );


  setTimeout(

    () =>
      beam.remove(),

    130

  );

}


// ========================================================
// EXECUTION
// ========================================================

function maybeExecution(
  enemy
) {

  if (
    activeExecution
    ||
    enemy.executionOffered
    ||
    enemy.hp >
    enemy.maxHp *
    0.28
  ) {

    return;

  }


  let chance =
    0.0017;


  if (
    enemy.elite
  ) {

    chance =
      0.008;

  }


  if (
    enemy.boss
  ) {

    chance =
      0.015;

  }


  if (
    Math.random() >
    chance
  ) {

    return;

  }


  enemy.executionOffered =
    true;


  const pool =
    enemy.boss
      ?
      bossWords
      :
    enemy.elite
      ?
      eliteWords
      :
      normalWords;


  activeExecution = {

    enemy,

    word:
      randomItem(
        pool
      )
      .toLowerCase(),

    index:
      0

  };


  document.getElementById(
    "execution-box"
  )
  .classList.add(
    "active"
  );


  renderExecution();

}


function handleExecution(
  key
) {

  if (
    !activeExecution
  ) {

    return;

  }


  if (
    key ===
    activeExecution.word[
      activeExecution.index
    ]
  ) {

    activeExecution.index++;


    renderExecution();


    if (
      activeExecution.index >=
      activeExecution.word.length
    ) {

      const enemy =
        activeExecution.enemy;


      killEnemy(
        enemy
      );


      showAnnouncement(
        "FINISH!",
        "TARGET ERASED"
      );


      tone(
        650,
        0.1,
        "sine",
        0.02,
        1100
      );

    }

  }

  else if (
    key.length ===
    1
  ) {

    activeExecution.index =
      0;


    renderExecution();


    tone(
      120,
      0.05,
      "square",
      0.01,
      80
    );

  }

}


function renderExecution() {

  const box =
    document.getElementById(
      "execution-word"
    );


  box.innerHTML =
    "";


  activeExecution.word
    .toUpperCase()
    .split("")
    .forEach(

      (
        letter,
        index
      ) => {

        const span =
          document.createElement(
            "span"
          );


        span.textContent =
          letter;


        span.className =
          "execution-letter";


        if (
          index <
          activeExecution.index
        ) {

          span.classList.add(
            "correct"
          );

        }


        else if (
          index ===
          activeExecution.index
        ) {

          span.classList.add(
            "current"
          );

        }


        box.appendChild(
          span
        );

      }

    );

}


function closeExecution() {

  activeExecution =
    null;


  document.getElementById(
    "execution-box"
  )
  .classList.remove(
    "active"
  );

}


// ========================================================
// WAVE COMPLETE
// ========================================================

function checkWaveComplete() {

  if (
    enemiesRemaining >
    0
    ||
    enemies.length >
    0
    ||
    waveChanging
    ||
    !running
  ) {

    return;

  }


  waveChanging =
    true;


  health =
    Math.min(
      maxHealth,
      health +
      maxHealth *
      0.06
    );


  showAnnouncement(
    "WAVE CLEARED!",
    `WAVE ${wave}`
  );


  tone(
    480,
    0.08,
    "sine",
    0.015,
    700
  );


  setTimeout(

    () => {

      wave++;
      addQuestProgress("wave", wave, true);

      startWave();

    },

    1500

  );

}


// ========================================================
// MOB UI
// ========================================================

function updateEnemyUI(
  enemy
) {

  const hpFill =
    enemy.element
    .querySelector(
      ".enemy-hp-fill"
    );


  hpFill.style.width =
    clamp(
      enemy.hp /
      enemy.maxHp *
      100,
      0,
      100
    )
    +
    "%";


  enemy.element
    .querySelector(
      ".enemy-hp-text"
    )
    .textContent =
      `${Math.ceil(enemy.hp)} / ${enemy.maxHp}`;


  if (
    enemy.maxShield
  ) {

    enemy.element
      .querySelector(
        ".enemy-shield-fill"
      )
      .style.width =
        clamp(
          enemy.shield /
          enemy.maxShield *
          100,
          0,
          100
        )
        +
        "%";

  }

}


function renderEnemy(
  enemy
) {

  enemy.element.style.left =
    enemy.x +
    "px";


  enemy.element.style.top =
    enemy.y +
    "px";

}


function removeEnemy(
  enemy
) {

  const index =
    enemies.indexOf(
      enemy
    );


  if (
    index >=
    0
  ) {

    enemies.splice(
      index,
      1
    );

  }


  enemy.element.remove();

}


// ========================================================
// BOSS
// ========================================================

function showBossBar(
  enemy
) {

  document.getElementById(
    "boss-bar"
  )
  .classList.add(
    "show"
  );


  document.getElementById(
    "boss-name"
  ).textContent =
    enemy.base.name;


  updateBossBar(
    enemy
  );

}


function updateBossBar(
  enemy
) {

  document.getElementById(
    "boss-fill"
  )
  .style.width =
    clamp(
      enemy.hp /
      enemy.maxHp *
      100,
      0,
      100
    )
    +
    "%";


  document.getElementById(
    "boss-hp"
  ).textContent =
    `${Math.ceil(enemy.hp)} / ${enemy.maxHp}`;

}


function hideBossBar() {

  document.getElementById(
    "boss-bar"
  )
  .classList.remove(
    "show"
  );

  document.body.classList.remove(
    "boss-active"
  );

}


// ========================================================
// HUD
// ========================================================

function updateHUD() {

  document.getElementById(
    "wave"
  ).textContent =
    wave;


  document.getElementById(
    "kills"
  ).textContent =
    kills;


  document.getElementById(
    "run-coins"
  ).textContent =
    runCoins;


  document.getElementById(
    "combo"
  ).textContent =
    combo;


  document.getElementById(
    "health-text"
  ).textContent =
    `${Math.ceil(health)} / ${maxHealth}`;


  document.getElementById(
    "health-fill"
  ).style.width =
    health /
    maxHealth *
    100
    +
    "%";


  document.getElementById(
    "heat-text"
  ).textContent =
    Math.round(
      heat
    );


  document.getElementById(
    "heat-fill"
  ).style.width =
    heat +
    "%";


  document.getElementById(
    "precision-text"
  ).textContent =
    Math.round(
      precision
    );


  document.getElementById(
    "precision-fill"
  ).style.width =
    precision +
    "%";


  document.getElementById(
    "modifier"
  ).textContent =
    (modifierInfo[currentModifier] || modifierInfo.NONE).name;


  let heatState =
    "COOL";


  if (
    heat >
    80
  ) {

    heatState =
      "DANGER";

  }


  else if (
    heat >
    55
  ) {

    heatState =
      "HOT";

  }


  else if (
    heat >
    30
  ) {

    heatState =
      "WARM";

  }


  document.getElementById(
    "heat-state"
  ).textContent =
    heatState;


  const completed =
    waveTotal -
    enemiesRemaining;


  document.getElementById(
    "wave-progress-fill"
  ).style.width =
    (
      waveTotal
        ?
        clamp(
          completed /
          waveTotal *
          100,
          0,
          100
        )
        :
        0
    )
    +
    "%";


  const threat =
    document.getElementById(
      "threat"
    );


  if (
    wave >=
    30
  ) {

    threat.textContent =
      "INSANE";


    threat.style.color =
      "#ff3d64";

  }


  else if (
    wave >=
    20
  ) {

    threat.textContent =
      "EXTREME";


    threat.style.color =
      "#ff923d";

  }


  else if (
    wave >=
    10
  ) {

    threat.textContent =
      "HIGH";


    threat.style.color =
      "#ffe95a";

  }


  else if (
    wave >=
    5
  ) {

    threat.textContent =
      "MEDIUM";


    threat.style.color =
      "#47efff";

  }


  else {

    threat.textContent =
      "LOW";


    threat.style.color =
      "#54ffa1";

  }

}


// ========================================================
// LOBBY UI
// ========================================================

function updateLobby() {

  document.getElementById(
    "lobby-coins"
  ).textContent =
    coins;


  document.getElementById(
    "best-wave"
  ).textContent =
    bestWave;


  document.getElementById(
    "total-kills"
  ).textContent =
    totalKills;


  document.getElementById(
    "top-rebirths"
  ).textContent =
    rebirths;


  document.getElementById(
    "profile-rebirths"
  ).textContent =
    rebirths;


  const equippedGunData =
    guns[equipped.gun] || guns.pulse;

  const equippedDroneData =
    equipped.drone ? drones[equipped.drone] : null;

  const equippedKeyboardData =
    keyboards[equipped.keyboard] || keyboards.standard;


  document.getElementById(
    "equipped-gun-name"
  ).textContent =
    equippedGunData.name.toUpperCase();


  document.getElementById(
    "equipped-drone-name"
  ).textContent =
    equippedDroneData
      ?
      equippedDroneData.name.toUpperCase()
      :
      "NONE";


  document.getElementById(
    "equipped-board-name"
  ).textContent =
    equippedKeyboardData.name.toUpperCase();


  document.getElementById(
    "equipped-keycap-name"
  ).textContent =
    keycaps[
      equipped.keycap
    ]
      ?
      keycaps[
        equipped.keycap
      ].name.toUpperCase()
      :
      "STANDARD";


  [
    "damage",
    "bullets",
    "cooling",
    "health",
    "precision",
    "crit",
    "magnet",
    "bulletSpeed"
  ]
  .forEach(

    type => {

      document.getElementById(
        `${type}-level`
      ).textContent =
        upgrades[
          type
        ];


      document.getElementById(
        `${type}-cost`
      ).textContent =
        type ===
        "bullets"
        &&
        upgrades.bullets >=
        6
          ?
          "MAX"
          :
          getUpgradeCost(
            type
          );

    }

  );


  updateUsernameUI();

  updateRebirthUI();

}


// ========================================================
// ANNOUNCEMENT
// ========================================================

let announcementTimer = null;

function showAnnouncement(small, main, duration = 2800) {
  const box = document.getElementById("announcement");
  const smallEl = document.getElementById("announcement-small");
  const mainEl = document.getElementById("announcement-main");

  if (!box || !smallEl || !mainEl) return;

  const safeDuration = Math.max(1800, Number(duration) || 2800);

  smallEl.textContent = String(small || "").toUpperCase();
  mainEl.textContent = String(main || "").toUpperCase();
  box.style.setProperty("--announce-duration", `${safeDuration}ms`);

  clearTimeout(announcementTimer);

  box.classList.remove("show");
  // Force a reflow so repeated announcements restart the animation.
  void box.offsetWidth;
  box.classList.add("show");

  announcementTimer = setTimeout(() => {
    box.classList.remove("show");
  }, safeDuration + 80);
}


// ========================================================
// COMBAT TEXT
// ========================================================

function combatText(
  x,
  y,
  text,
  type
) {

  const element =
    document.createElement(
      "div"
    );


  element.className =
    `combat-text ${type}`;


  element.textContent =
    text;


  element.style.left =
    x +
    "px";


  element.style.top =
    y +
    "px";


  combatLayer.appendChild(
    element
  );


  setTimeout(

    () =>
      element.remove(),

    750

  );

}


// ========================================================
// FEED
// ========================================================

function addKillFeed(
  text
) {

  const feed =
    document.getElementById(
      "kill-feed"
    );


  const item =
    document.createElement(
      "div"
    );


  item.className =
    "kill-feed-item";


  item.textContent =
    `☠ ${text}`;


  feed.prepend(
    item
  );


  while (
    feed.children.length >
    5
  ) {

    feed.lastChild.remove();

  }

}


// ========================================================
// DEATH
// ========================================================

function die() {

  if (
    !running
  ) {

    return;

  }


  running =
    false;


  clearInterval(
    droneTimer
  );


  clearTimeout(
    floatingCoinTimer
  );


  coins +=
    runCoins;


  bestWave =
    Math.max(
      bestWave,
      wave
    );


  save();

  // Push final run stats to Postgres immediately so the leaderboard
  // updates even if the player closes/leaves right after the run.
  if (accountToken) {
    syncOnlineSave(true);
  }


  document.getElementById(
    "death-wave"
  ).textContent =
    wave;


  document.getElementById(
    "death-kills"
  ).textContent =
    kills;


  document.getElementById(
    "death-coins"
  ).textContent =
    runCoins;


  document.getElementById(
    "death-screen"
  )
  .classList.add(
    "show"
  );


  tone(
    170,
    0.35,
    "sawtooth",
    0.025,
    55
  );

}


document.getElementById(
  "return-lobby"
)
.addEventListener(

  "click",

  () => {

    document.getElementById(
      "death-screen"
    )
    .classList.remove(
      "show"
    );


    game.classList.remove(
      "active"
    );


    lobby.classList.add(
      "active"
    );


    clearArena();

    updateLobby();

    renderShops();

  }

);


// ========================================================
// CLEAR
// ========================================================

function clearArena() {

  enemyLayer.innerHTML =
    "";


  bulletLayer.innerHTML =
    "";


  coinLayer.innerHTML =
    "";


  particleLayer.innerHTML =
    "";


  combatLayer.innerHTML =
    "";


  enemyProjectileLayer.innerHTML =
    "";


  enemies =
    [];


  bullets =
    [];


  spawnTimers.forEach(

    timer =>
      clearTimeout(
        timer
      )

  );


  spawnTimers =
    [];


  hideBossBar();

}


function clearJammedKeys() {

  document
    .querySelectorAll(
      ".key"
    )
    .forEach(

      key => {

        key.classList.remove(
          "jammed",
          "targeted",
          "active"
        );


        key
          .querySelectorAll(
            ".jam-label"
          )
          .forEach(

            label =>
              label.remove()

          );

      }

    );

}


// ========================================================
// SAVE
// ========================================================

function save(syncOnline = true) {

  const prefix =
    guestMode
      ?
      "kiGuest"
      :
      "ki";


  localStorage.setItem(
    `${prefix}TutorialSeen3`,
    tutorialSeen
  );


  localStorage.setItem(
    `${prefix}Coins3`,
    coins
  );


  localStorage.setItem(
    `${prefix}BestWave3`,
    bestWave
  );


  localStorage.setItem(
    `${prefix}Kills3`,
    totalKills
  );


  localStorage.setItem(
    `${prefix}Rebirths3`,
    rebirths
  );


  localStorage.setItem(
    `${prefix}Upgrades3`,
    JSON.stringify(
      upgrades
    )
  );


  localStorage.setItem(
    `${prefix}Owned3`,
    JSON.stringify(
      owned
    )
  );


  localStorage.setItem(
    `${prefix}Equipped3`,
    JSON.stringify(
      equipped
    )
  );


  localStorage.setItem(
    `${prefix}Keycaps3`,
    JSON.stringify(
      ownedKeycaps
    )
  );


  updateLobby();

  if (syncOnline) {
    syncOnlineSave();
  }

}


// ========================================================
// SMALL UI FX
// ========================================================

function flashCoinBalance() {

  document.getElementById(
    "lobby-credit-box"
  )
  .animate(

    [
      {
        transform:
          "translateX(0)"
      },

      {
        transform:
          "translateX(-8px)"
      },

      {
        transform:
          "translateX(8px)"
      },

      {
        transform:
          "translateX(0)"
      }
    ],

    {
      duration:
        300
    }

  );

}


function showLobbyFlash(
  text
) {

  const popup =
    document.createElement(
      "div"
    );


  popup.textContent =
    text;


  Object.assign(
    popup.style,
    {
      position:
        "fixed",

      zIndex:
        "1500",

      left:
        "50%",

      top:
        "50%",

      transform:
        "translate(-50%,-50%)",

      color:
        "#d9a6ff",

      fontSize:
        "55px",

      fontWeight:
        "900",

      textShadow:
        "0 0 30px #a459ff",

      pointerEvents:
        "none"
    }
  );


  document.body.appendChild(
    popup
  );


  popup.animate(

    [
      {
        opacity:
          0,

        transform:
          "translate(-50%,-50%) scale(1.7)"
      },

      {
        opacity:
          1,

        transform:
          "translate(-50%,-50%) scale(1)"
      },

      {
        opacity:
          0,

        transform:
          "translate(-50%,-80%) scale(.8)"
      }
    ],

    {
      duration:
        1300
    }

  );


  setTimeout(
    () =>
      popup.remove(),
    1350
  );

}


// ========================================================
// HELPERS
// ========================================================

function keyLabel(
  key
) {

  return key.dataset.key ===
    " "
      ?
      "SPACE"
      :
      key.dataset.key
      .toUpperCase();

}


function clamp(
  value,
  min,
  max
) {

  return Math.min(
    Math.max(
      value,
      min
    ),
    max
  );

}


function randomNumber(
  min,
  max
) {

  return (
    Math.random()
    *
    (
      max -
      min
    )
    +
    min
  );

}


function randomInteger(
  min,
  max
) {

  return Math.floor(
    randomNumber(
      min,
      max +
      1
    )
  );

}


function randomItem(
  array
) {

  return array[
    Math.floor(
      Math.random()
      *
      array.length
    )
  ];

}


// ========================================================
// INITIALIZE
// ========================================================

updateLobby();

renderShops();

applyLoadoutVisuals();

checkAccount();
