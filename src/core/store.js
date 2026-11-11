// Persistent save state, economy, settings and small event bus.
import {
  SAVE_KEY, SAVE_VERSION, DIVISION_BY_ID, DIVISIONS, HAIR, BEARDS, BROWS, FACE_SHAPES, EYES, NOSES,
  MOUTHS, SCARS, SKIN_TONES, SHORTS, TOPS, SHOES, ROBES, GLOVES, COLORWAYS, SKIN_TONES as SKINS,
  STYLE_BY_ID, SHOP_ITEMS, ACHIEVEMENTS, CONTROL_DEFAULTS,
} from './data.js';
import { clamp } from './rng.js';

const UNIVERSE_KEY = 'tgboxing.universe.v1';

export const bus = {
  handlers: new Map(),
  on(event, fn) {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event).add(fn);
    return () => this.handlers.get(event)?.delete(fn);
  },
  emit(event, payload) {
    for (const fn of this.handlers.get(event) || []) {
      try { fn(payload); } catch (err) { console.error(err); }
    }
  },
};

export const DEFAULT_APPEARANCE = {
  hair: 'hair10', beard: 'none', brow: 'b0', face: 'square', eyes: 'e0', nose: 'n0', mouth: 'm4',
  scar: 's0', skin: 'sk5', height: 0.48, reach: 0.5, muscle: 0.58, width: 0.52,
  shorts: 'shorts0', top: 'none', shoe: 'shoe0', robe: 'robe0', glove: 'glove0',
  colorway: 'cw8', wrap: 'none', headgear: 'none', medal: 'none', tattoo: 'Nenhuma',
};

export const DEFAULT_SETTINGS = {
  sfx: 0.85, music: 0.4, crowd: 0.75, quality: 'auto', autoSave: true, muted: false,
  controls: { ...CONTROL_DEFAULTS }, difficulty: 'pro', reducedMotion: false, cameraShake: true, showHints: true, highContrast: false,
};

export function baseAttributes() {
  return {
    strength: 42, speed: 42, stamina: 42, precision: 42, defense: 42, reflexes: 42,
    mobility: 42, recovery: 42, conditioning: 42,
  };
}

export function newCareer({ name = 'Kaito', nickname = 'The Rising Sun', nationality = 'BRA', division = 'middle', style = 'technical', appearance = DEFAULT_APPEARANCE, attributes = baseAttributes(), age = 22 } = {}) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 28);
  const save = {
    version: SAVE_VERSION,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    profile: {
      name, nickname, nationality, division, style, age,
      appearance: { ...appearance }, attributes: { ...attributes },
      created: true,
    },
    career: {
      date: start.toISOString(),
      money: 2500,
      coins: 300,
      reputation: 8,
      points: 12,
      record: { w: 0, l: 0, d: 0, ko: 0 },
      streak: 0,
      bestStreak: 0,
      belts: [],
      history: [],
      offers: [],
      news: [],
      rivalries: [],
      awards: [],
      achievements: [],
      trophies: [],
      foughtArenas: [],
      training: { sessionsLeft: 4, totalSessions: 0, fatigue: 0, lastDrill: null },
      gym: { level: 1, equipment: [], coach: 'Basico' },
      sponsor: null,
      totalPurse: 0,
      season: { year: now.getFullYear(), fights: 0, wins: 0, kos: 0, defenses: 0, bestWin: null },
      nextEvent: null,
      daysUntilFight: null,
      activeOffer: null,
      appliedMatches: [],
      boosters: {},
      rankHistory: [],
      beltHistory: [],
    },
    settings: { ...DEFAULT_SETTINGS, controls: { ...DEFAULT_SETTINGS.controls } },
    multiplayer: { history: [], lastCode: null, name: name, totalMatches: 0, wins: 0 },
  };
  return save;
}

export function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || !data.profile) return null;
    return migrate(data);
  } catch (err) {
    console.warn('Save load failed', err);
    return null;
  }
}

function migrate(data) {
  if (!data.settings) data.settings = { ...DEFAULT_SETTINGS };
  data.settings.controls = { ...DEFAULT_SETTINGS.controls, ...(data.settings.controls || {}) };
  data.settings = { ...DEFAULT_SETTINGS, ...data.settings, controls: data.settings.controls };
  data.career = data.career || {};
  const c = data.career;
  c.record = c.record || { w: 0, l: 0, d: 0, ko: 0 };
  c.history = c.history || [];
  c.news = c.news || [];
  c.offers = c.offers || [];
  c.belts = c.belts || [];
  c.rivalries = c.rivalries || [];
  c.awards = c.awards || [];
  c.achievements = c.achievements || [];
  c.trophies = c.trophies || [];
  c.foughtArenas = c.foughtArenas || [];
  c.rankHistory = c.rankHistory || [];
  c.beltHistory = c.beltHistory || [];
  c.training = c.training || { sessionsLeft: 4, totalSessions: 0, fatigue: 0 };
  c.gym = c.gym || { level: 1, equipment: [], coach: 'Basico' };
  c.season = c.season || { year: new Date().getFullYear(), fights: 0, wins: 0, kos: 0, defenses: 0, bestWin: null };
  c.appliedMatches = c.appliedMatches || [];
  c.boosters = c.boosters || {};
  c.activeOffer = c.activeOffer || null;
  data.multiplayer = { history: [], lastCode: null, name: data.profile.name, totalMatches: 0, wins: 0, ...(data.multiplayer || {}) };
  data.version = SAVE_VERSION;
  return data;
}

export function saveGame(save, { universe = null } = {}) {
  if (!save) return;
  try {
    save.updatedAt = new Date().toISOString();
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    if (universe) localStorage.setItem(UNIVERSE_KEY, JSON.stringify(universe));
  } catch (err) {
    console.warn('Save failed (quota?)', err);
    bus.emit('toast', { text: 'Falha ao salvar. Armazenamento cheio?', type: 'error' });
  }
}

export function loadUniverseRaw() {
  try {
    const raw = localStorage.getItem(UNIVERSE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

export function clearAll() {
  localStorage.removeItem(SAVE_KEY);
  localStorage.removeItem(UNIVERSE_KEY);
}

let saveTimer = null;
let universeRef = null;
export function setUniverse(u) { universeRef = u; }
export function getUniverse() { return universeRef; }
export function persist(save, immediate = false) {
  if (!save) return;
  if (immediate) {
    if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
    saveGame(save, { universe: universeRef });
    return;
  }
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveTimer = null;
    saveGame(save, { universe: universeRef });
  }, 260);
}

export function catalogItem(slot, id) {
  const map = {
    hair: HAIR, beard: BEARDS, brow: BROWS, face: FACE_SHAPES, eyes: EYES, nose: NOSES, mouth: MOUTHS,
    scar: SCARS, skin: SKIN_TONES, shorts: SHORTS, top: TOPS, shoe: SHOES, robe: ROBES, glove: GLOVES,
    colorway: COLORWAYS,
  };
  const list = map[slot];
  if (!list) return null;
  return list.find((x) => x.id === id) || list[0];
}

export function appearanceOf(profile) {
  return { ...DEFAULT_APPEARANCE, ...(profile?.appearance || {}) };
}

export function divisionOf(profile) {
  return DIVISION_BY_ID[profile?.division] || DIVISIONS[6];
}

export function heightMeters(appearance) {
  const t = clamp(appearance?.height ?? 0.5, 0, 1);
  return 1.62 + t * 0.42;
}

export function reachCm(appearance) {
  return Math.round(168 + (appearance?.reach ?? 0.5) * 30);
}

export function overallOf(attributes) {
  const vals = Object.values(attributes || {});
  if (!vals.length) return 0;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

export function rankTitle(rank, total = 100) {
  if (rank === 1) return 'CAMPEÃO';
  if (rank <= 3) return 'DESAFIANTE Nº ' + (rank - 1);
  if (rank <= 10) return 'TOP 10';
  if (rank <= 30) return 'TOP 30';
  return `#${rank}`;
}

export function addNews(save, article) {
  if (!save) return;
  const item = {
    id: 'n' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
    date: save.career.date,
    ...article,
  };
  save.career.news.unshift(item);
  if (save.career.news.length > 70) save.career.news.length = 70;
  bus.emit('news', item);
  return item;
}

export function unlockAchievement(save, id) {
  if (!save) return false;
  if (save.career.achievements.includes(id)) return false;
  const ach = ACHIEVEMENTS.find((a) => a.id === id);
  if (!ach) return false;
  save.career.achievements.push(id);
  save.career.coins += ach.coins || 0;
  bus.emit('toast', { text: `Conquista: ${ach.name} (+${ach.coins || 0} TG)`, type: 'achievement', icon: ach.icon });
  bus.emit('achievement', ach);
  return true;
}

export function addCoins(save, amount, reason = '') {
  if (!save) return;
  save.career.coins = Math.max(0, save.career.coins + Math.round(amount));
  if (reason) bus.emit('economy', { amount, reason });
}

export function addMoney(save, amount) {
  if (!save) return;
  save.career.money = Math.max(0, save.career.money + Math.round(amount));
}

export function advanceDate(save, days) {
  if (!save) return;
  const d = new Date(save.career.date);
  d.setDate(d.getDate() + days);
  save.career.date = d.toISOString();
}

export function daysBetween(a, b = new Date()) {
  const ms = new Date(a).getTime() - new Date(b).getTime();
  return Math.ceil(ms / 86400000);
}

export function createPlayerFighter(save) {
  if (!save) return null;
  const p = save.profile;
  const c = save.career;
  return {
    id: 'player',
    isPlayer: true,
    name: p.name,
    nick: p.nickname,
    nationality: p.nationality,
    age: p.age,
    division: p.division,
    style: p.style,
    attributes: { ...p.attributes },
    record: { ...c.record },
    points: c.points,
    appearance: { ...p.appearance },
    overall: overallOf(p.attributes),
    belts: c.belts,
  };
}

export function ownedItems(save) {
  return save?.career?.gym?.equipment || [];
}

export function hasItem(save, id) {
  return ownedItems(save).includes(id);
}

export function gearBoost(save, attr) {
  let boost = 0;
  for (const id of ownedItems(save)) {
    const item = SHOP_ITEMS.find((i) => i.id === id);
    if (!item?.boost) continue;
    boost += item.boost[attr] || 0;
    boost += item.boost.all || 0;
  }
  return boost;
}

export function getAchievement(id) {
  return ACHIEVEMENTS.find((a) => a.id === id);
}

export function recordText(record) {
  if (!record) return '0-0-0';
  return `${record.w || 0}-${record.l || 0}-${record.d || 0}`;
}

export function shortRecord(record) {
  if (!record) return '0-0-0';
  return `${record.w || 0}-${record.l || 0}-${record.d || 0}`;
}

export function fighterLabel(f) {
  if (!f) return 'Lutador';
  return f.nick ? `${f.name} "${f.nick}"` : f.name;
}

export function styleOrDefault(id) {
  return STYLE_BY_ID[id] || STYLE_BY_ID.technical;
}

export function currentSkin(appearance) {
  return SKINS.find((s) => s.id === appearance?.skin) || SKINS[5];
}

export const AppState = {
  save: null,
  universe: null,
  scene: 'menu',
  currentFight: null,
  audioMuted: false,
};
