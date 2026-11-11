// Fight screen: cinematic entrance, HUD, touch/keyboard/mouse controls, replay,
// career consequences and authoritative peer-to-peer multiplayer.
import { icon } from '../icons.js';
import {
  esc, h, fmtNum, fmtDate, initials, recordText, divisionName, countryName, beltTierName, orgOf, overall,
} from '../helpers.js';
import {
  ARENA_BY_ID, DIVISION_BY_ID, CONTROL_DEFAULTS, ANNOUNCE_INTRO, BROADCAST_NAMES, STYLE_BY_ID,
} from '../../core/data.js';
import { createPlayerFighter, persist, addCoins } from '../../core/store.js';
import { applyFightResult } from '../../core/career.js';
import { appearanceForFighter } from '../../core/appearance.js';
import { FightEngine, PUNCHES } from '../../game/fight.js';
import { FightView } from '../../game/fightview.js';
import { matchReceipt } from '../../net/net.js';
import { getMp, sendMp, attachMp, closeMp, mpFighterDef } from './multiplayer.js';

const PUNCH_KEYS = {
  KeyJ: 'jab', KeyK: 'cross', KeyL: 'hook', KeyI: 'uppercut', KeyB: 'body',
  Digit1: 'jab', Digit2: 'cross', Digit3: 'hook', Digit4: 'uppercut', Digit5: 'body',
};

const METHOD_LABEL = {
  KO: 'NOCAUTE', TKO: 'NOCAUTE TÉCNICO', DEC: 'DECISÃO', DRAW: 'EMPATE', QUIT: 'DESISTÊNCIA',
};

function neutralInput() {
  return { moveX: 0, moveZ: 0, block: false, dodge: false, punch: null, getUp: false };
}

function clampInput(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.max(-1, Math.min(1, n));
}

function sanitizeInput(raw) {
  const input = neutralInput();
  if (!raw || typeof raw !== 'object') return input;
  input.moveX = clampInput(raw.moveX);
  input.moveZ = clampInput(raw.moveZ);
  input.block = !!raw.block;
  input.dodge = !!raw.dodge;
  input.getUp = !!raw.getUp;
  input.punch = PUNCHES[raw.punch] ? raw.punch : null;
  return input;
}

function fmtPercent(part, total) {
  if (!total) return '0%';
  return `${Math.round((part / total) * 100)}%`;
}

export function fightScreen(ui, data = {}) {
  const mode = data.mode === 'multiplayer' ? 'multiplayer' : 'career';
  const mp = getMp(ui);
  const match = mp?.match || null;
  const save = ui.save;
  const settings = save?.settings || {};
  const controlSettings = { ...CONTROL_DEFAULTS, ...(settings.controls || {}) };

  if (mode === 'multiplayer' && (!mp || !match)) {
    return h(`<div class="screen plain">
      ${ui.topbar('multiplayer')}
      <div class="empty-state">${icon('wifiOff', 44)}<b>Partida não encontrada</b>
        <p>A sessão online expirou. Volte ao lobby e crie ou entre em uma sala.</p>
        <button class="btn btn-primary" data-nav="multiplayer">Voltar ao lobby</button>
      </div>
    </div>`);
  }

  const offer = data.offer || (mode === 'career' ? save?.career?.activeOffer : null);
  if (mode === 'career' && !offer) {
    return h(`<div class="screen plain">
      ${ui.topbar('career')}
      <div class="empty-state">${icon('calendar', 44)}<b>Nenhuma luta contratada</b>
        <p>Assine um contrato na carreira para entrar no ringue.</p>
        <button class="btn btn-primary" data-nav="career">Voltar à carreira</button>
      </div>
    </div>`);
  }

  const role = mode === 'multiplayer' ? mp.role : 'host';
  const isHost = mode === 'career' || role === 'host';
  const localSlot = mode === 'multiplayer' ? (role === 'host' ? 'p1' : 'p2') : 'p1';
  const localSlotIndex = localSlot === 'p1' ? 0 : 1;
  const division = data.division || offer?.opponent?.division || save?.profile?.division || match?.division || 'middle';
  const arenaId = data.arenaId || offer?.arenaId || match?.arenaId || 'neighborhood';
  const arena = ARENA_BY_ID[arenaId] || ARENA_BY_ID.neighborhood;
  const rounds = Math.max(1, Number(data.rounds || offer?.rounds || match?.rounds) || 3);
  const roundTime = Math.max(30, Number(match?.roundTime) || 60);
  const difficulty = offer?.difficulty || settings.difficulty || 'pro';

  let p1def;
  let p2def;
  let p1app;
  let p2app;

  if (mode === 'multiplayer') {
    p1def = mpFighterDef(match.p1, 'p1');
    p2def = mpFighterDef(match.p2, 'p2');
    p1def.division = match.p1?.division || division;
    p2def.division = match.p2?.division || division;
    p1app = match.p1?.appearance || appearanceForFighter(p1def, p1def.division);
    p2app = match.p2?.appearance || appearanceForFighter(p2def, p2def.division);
  } else {
    const player = createPlayerFighter(save);
    p1def = {
      ...player,
      division,
      height: save?.profile?.appearance?.height,
      reach: save?.profile?.appearance?.reach,
      overall: player?.overall || overall(save?.profile?.attributes || {}),
    };
    p2def = { ...offer.opponent, division: offer.opponent?.division || division };
    p1app = save?.profile?.appearance || appearanceForFighter(p1def, division);
    p2app = appearanceForFighter(p2def, p2def.division || division);
  }

  const eventName = offer?.eventName
    || (mode === 'multiplayer' ? `TG ONLINE · ${arena.city}` : 'TG BOXING');
  const title = offer?.title || null;
  const titleLine = title ? `${orgOf(title.org).short} · ${beltTierName(title.tier)}` : '';

  const engine = new FightEngine({
    rounds,
    roundTime,
    mode: mode === 'multiplayer' ? 'multiplayer' : 'career',
    difficulty,
    seed: (Date.now() ^ Math.floor(Math.random() * 0xffff)) >>> 0,
    p1: p1def,
    p2: p2def,
    ai1: false,
    ai2: mode === 'career',
    division,
    matchId: `${mode === 'multiplayer' ? match.matchId : 'career-' + Date.now().toString(36)}`,
  });

  const view = new FightView({
    renderer: ui.app.renderer,
    engine,
    arenaConfig: arena,
    quality: ui.app.quality,
    appearances: { p1: p1app, p2: p2app },
    mobile: !!ui.app.mobile,
  });

  const originalViewUpdate = view.update.bind(view);
  let destroyed = false;
  let paused = false;
  let netPaused = false;
  let introDone = false;
  let resultShown = false;
  let processed = false;
  let outcome = null;
  let multiplayerOutcome = null;
  let resultTimer = null;
  let announceTimer = null;
  let countTimer = null;
  let replaying = false;
  let leavingToMp = false;
  let lastNetSend = 0;
  let lastInputSent = 0;
  let lastGuestInputAt = 0;
  let guestInput = neutralInput();
  let fxQueue = [];

  const keys = new Set();
  const touchMove = { x: 0, y: 0 };
  let stickPointer = null;
  let blockTouch = false;
  let blockMouse = false;
  let pendingPunch = null;
  let dodgeQueued = false;
  let getUpUntil = 0;

  const el = h(`<div class="screen fight-screen" data-mode="${mode}">
    <div class="fight-ui">
      <div class="hud-top">
        ${hudFighter(engine.fighters[0], 'p1', false)}
        <div class="round-center">
          <div class="round-label" data-round-label>ROUND 1 / ${rounds}</div>
          <div class="round-timer" data-timer>${roundTime}</div>
          <div class="round-dots" data-round-dots>${Array.from({ length: rounds }, (_, i) => `<i class="${i === 0 ? 'done' : ''}"></i>`).join('')}</div>
          ${mode === 'multiplayer' ? `<div class="network-chip"><i></i><span data-net-label>P2P · ${role === 'host' ? 'ANFITRIÃO' : 'CONVIDADO'}</span></div>` : ''}
        </div>
        ${hudFighter(engine.fighters[1], 'p2', true)}
      </div>

      <div class="combo-meter" data-combo><span data-combo-val>2</span><small>COMBO</small></div>
      <div class="announcer" data-announcer><div class="big"></div><div class="small"></div></div>
      <div class="count-overlay" data-count><div class="count-num"></div></div>

      <button class="getup-btn hidden" data-action="getup" type="button">${icon('upgrade', 19)} LEVANTE-SE!<span>Toque repetidamente</span></button>

      <div class="hud-bottom">
        <div class="hud-stats" data-hud-stats></div>
        <div class="desktop-hint">
          <span><b class="key">WASD</b> mover</span>
          <span><b class="key">J</b> jab</span>
          <span><b class="key">K</b> direto</span>
          <span><b class="key">L</b> gancho</span>
          <span><b class="key">I</b> uppercut</span>
          <span><b class="key">B</b> corpo</span>
          <span><b class="key">ESPAÇO</b> guarda</span>
          <span><b class="key">Q</b> esquiva</span>
        </div>
        <div class="hud-actions">
          <button class="hud-btn" data-action="pause" title="Pausar (Esc)" aria-label="Pausar">${icon('pause', 16)}</button>
        </div>
      </div>

      <div class="touch-controls" data-touch-controls data-side="${controlSettings.side || 'right'}">
        <div class="joystick" data-joystick><div class="joystick-knob" data-joystick-knob></div><div class="joy-label">MOVER</div></div>
        <div class="action-pad" data-action-pad>
          <button class="act-btn punch jab" data-touch="jab" type="button" aria-label="Jab">J</button>
          <button class="act-btn punch cross" data-touch="cross" type="button" aria-label="Direto">K</button>
          <button class="act-btn punch hook" data-touch="hook" type="button" aria-label="Gancho">L</button>
          <button class="act-btn punch upper" data-touch="uppercut" type="button" aria-label="Uppercut">I</button>
          <button class="act-btn punch body" data-touch="body" type="button" aria-label="Golpe no corpo">B</button>
          <button class="act-btn block" data-touch="block" type="button" aria-label="Guarda">GUARDA</button>
          <button class="act-btn dodge" data-touch="dodge" type="button" aria-label="Esquiva">ESQUIVA</button>
        </div>
      </div>

      <div class="replay-overlay hidden" data-replay-label>${icon('return', 13)} REPLAY · CÂMERA LENTA</div>
      <div class="reconnect-banner hidden" data-reconnect>
        <div class="spinner"></div>
        <div class="grow"><b data-reconnect-title>Reconectando…</b><span data-reconnect-text>A luta está pausada até a conexão voltar.</span></div>
        ${role === 'host' && mode === 'multiplayer' ? `<button class="btn btn-sm btn-gold-outline" data-action="net-wo">Vitória por W.O.</button>` : ''}
        <button class="btn btn-sm btn-ghost" data-action="net-leave">Sair</button>
      </div>
    </div>

    <div class="fight-overlay" data-intro>
      <div class="fight-intro-wrap">
        <div class="intro-kicker">${icon('ring', 13)} ${esc(eventName)}</div>
        <div class="vs-card">
          <div class="vs-fighter">
            <div class="portrait">${initials(p1def.name)}</div>
            <h2>${esc(p1def.name)}</h2>
            <div class="nickname">${esc(p1def.nick || 'Sem apelido')}</div>
            <div class="rec">${recordText(p1def.record)} · ${divisionName(p1def.division || division)}</div>
            <div class="vs-tags">
              <span class="chip">${icon('flag', 11)} ${esc(p1def.nationality || countryName(p1def.nationality))}</span>
              <span class="chip gold">OVR ${p1def.overall || overall(p1def.attributes)}</span>
            </div>
          </div>
          <div class="vs-mid">
            <div class="at">${mode === 'multiplayer' ? 'ONLINE P2P' : 'MAIN EVENT'}</div>
            <div class="vs">VS</div>
            <div class="at">${esc(arena.name)}</div>
          </div>
          <div class="vs-fighter">
            <div class="portrait red">${initials(p2def.name)}</div>
            <h2>${esc(p2def.name)}</h2>
            <div class="nickname">${esc(p2def.nick || 'Sem apelido')}</div>
            <div class="rec">${recordText(p2def.record)} · ${divisionName(p2def.division || division)}</div>
            <div class="vs-tags">
              <span class="chip">${icon('flag', 11)} ${esc(p2def.nationality || countryName(p2def.nationality))}</span>
              <span class="chip gold">OVR ${p2def.overall || overall(p2def.attributes)}</span>
            </div>
          </div>
        </div>
        <div class="intro-details">
          <div class="event">${esc(eventName)}</div>
          <div class="meta">${icon('calendar', 11)} ${fmtDate(offer?.date || new Date().toISOString())} · ${icon('flag', 11)} ${esc(arena.city)} · ${rounds} ROUNDS</div>
          ${titleLine ? `<div class="title-line">${icon('belt', 15)} DISPUTA DE ${esc(titleLine.toUpperCase())}</div>` : ''}
          ${mode === 'multiplayer' ? `<div class="title-line">${icon('wifi', 13)} PARTIDA ONLINE REAL · APOSTA VIRTUAL: ${fmtNum(match.wager || 0)} TG</div>` : ''}
          <p class="intro-quote">“${esc(ANNOUNCE_INTRO[(p1def.name.length + p2def.name.length) % ANNOUNCE_INTRO.length])}”</p>
        </div>
        <div class="intro-buttons">
          <button class="btn btn-primary btn-lg" data-action="enter">${icon('play', 17)} Entrar no ringue</button>
          <button class="btn btn-ghost" data-action="skip">Pular entrada</button>
        </div>
        <div class="intro-hint"><span class="key">ENTER</span> começar · <span class="key">ESC</span> pausar · ${mode === 'multiplayer' ? 'cada jogador controla seu próprio lutador' : 'teclado, mouse ou toque'}</div>
      </div>
    </div>

    <div class="fight-overlay hidden" data-pause>
      <div class="panel pause-menu">
        <h2>PAUSA</h2>
        <div class="panel-body">
          <button class="btn btn-primary" data-action="resume">${icon('play', 15)} Continuar luta</button>
          <button class="btn" data-action="replay-pause">${icon('return', 15)} Ver replay</button>
          <button class="btn" data-action="sound">${icon('volume', 15)} Som</button>
          <button class="btn btn-ghost" data-action="leave">Encerrar luta</button>
        </div>
      </div>
    </div>

    <div class="fight-overlay hidden" data-result>
      <div class="panel result-card" data-result-card></div>
    </div>
  </div>`);

  const introOverlay = el.querySelector('[data-intro]');
  const pauseOverlay = el.querySelector('[data-pause]');
  const resultOverlay = el.querySelector('[data-result]');
  const resultCard = el.querySelector('[data-result-card]');
  const pauseBtn = el.querySelector('[data-action="pause"]');
  const getUpBtn = el.querySelector('[data-action="getup"]');
  const announcer = el.querySelector('[data-announcer]');
  const announcerBig = announcer.querySelector('.big');
  const announcerSmall = announcer.querySelector('.small');
  const countOverlay = el.querySelector('[data-count]');
  const countNum = countOverlay.querySelector('.count-num');
  const combo = el.querySelector('[data-combo]');
  const comboVal = el.querySelector('[data-combo-val]');
  const hudStats = el.querySelector('[data-hud-stats]');
  const timerEl = el.querySelector('[data-timer]');
  const roundLabel = el.querySelector('[data-round-label]');
  const roundDots = el.querySelector('[data-round-dots]');
  const reconnectBanner = el.querySelector('[data-reconnect]');
  const reconnectTitle = el.querySelector('[data-reconnect-title]');
  const reconnectText = el.querySelector('[data-reconnect-text]');
  const replayLabel = el.querySelector('[data-replay-label]');
  const netLabel = el.querySelector('[data-net-label]');
  const hpFills = { p1: el.querySelector('[data-hp="p1"]'), p2: el.querySelector('[data-hp="p2"]') };
  const staminaFills = { p1: el.querySelector('[data-stamina="p1"]'), p2: el.querySelector('[data-stamina="p2"]') };

  // -------------------------------------------------------------------------
  // HUD
  // -------------------------------------------------------------------------
  function hudFighter(fighter, slot, right) {
    const def = fighter.def || {};
    return `<div class="hud-fighter ${right ? 'right' : ''}">
      <div class="hud-avatar">${initials(fighter.name)}</div>
      <div class="hud-info">
        <div class="hud-name">${esc(fighter.name)}</div>
        <div class="hud-record">${recordText(def.record)} · OVR ${def.overall || overall(fighter.attributes)}${def.style ? ` · ${esc(STYLE_BY_ID[def.style]?.name || def.style)}` : ''}</div>
        <div class="hp-track"><div class="hp-fill ${slot === 'p2' ? 'p2' : ''}" data-hp="${slot}"></div></div>
        <div class="stamina-track"><div class="stamina-fill ${slot === 'p2' ? 'p2' : ''}" data-stamina="${slot}"></div></div>
      </div>
    </div>`;
  }

  function updateHud(now) {
    const [f1, f2] = engine.fighters;
    if (!f1 || !f2) return;
    hpFills.p1.style.width = `${Math.max(0, (f1.hp / Math.max(1, f1.maxHp)) * 100)}%`;
    hpFills.p2.style.width = `${Math.max(0, (f2.hp / Math.max(1, f2.maxHp)) * 100)}%`;
    staminaFills.p1.style.width = `${Math.max(0, Math.min(100, f1.stamina))}%`;
    staminaFills.p2.style.width = `${Math.max(0, Math.min(100, f2.stamina))}%`;

    const secs = Math.max(0, Math.ceil(engine.clock));
    timerEl.textContent = String(secs).padStart(2, '0');
    timerEl.classList.toggle('low', secs <= 10 && engine.phase === 'fight');

    if (engine.phase === 'roundEnd') roundLabel.textContent = 'INTERVALO';
    else if (engine.phase === 'knockdown') roundLabel.textContent = 'CONTAGEM';
    else if (engine.phase === 'intro') roundLabel.textContent = `ROUND 1 / ${rounds}`;
    else if (engine.phase === 'end' || engine.phase === 'ko') roundLabel.textContent = 'FIM DA LUTA';
    else roundLabel.textContent = `ROUND ${engine.round} / ${rounds}`;

    const dots = roundDots.querySelectorAll('i');
    dots.forEach((dot, i) => dot.classList.toggle('done', i < engine.round));

    const local = engine.fighters[localSlotIndex];
    if (local && local.combo >= 2 && engine.phase === 'fight') {
      comboVal.textContent = local.combo;
      combo.classList.add('show');
    } else {
      combo.classList.remove('show');
    }

    const stats = local?.stats || {};
    hudStats.innerHTML = `<span>GOLPES <b>${stats.thrown || 0}</b></span>
      <span>ACERTOS <b>${stats.landed || 0}</b></span>
      <span>DANO <b>${Math.round(stats.damage || 0)}</b></span>
      <span>DEFESAS <b>${(stats.blocks || 0) + (stats.dodges || 0)}</b></span>`;

    const localDown = engine.phase === 'knockdown' && engine.down?.fighter?.id === localSlot;
    getUpBtn.classList.toggle('hidden', !localDown);
    if (localDown) getUpBtn.classList.add('urgent');
    else getUpBtn.classList.remove('urgent');

    if (netLabel && mode === 'multiplayer') {
      netLabel.textContent = netPaused ? 'RECONECTANDO' : `P2P · ${role === 'host' ? 'ANFITRIÃO' : 'CONVIDADO'}`;
    }

    if (settings.cameraShake === false) view.shake = 0;
    ui.app.audio.setHeat(view.heat);
  }

  // -------------------------------------------------------------------------
  // Announcements / event handling
  // -------------------------------------------------------------------------
  function announce(big, small = '', duration = 1400) {
    announcerBig.textContent = big;
    announcerSmall.textContent = small;
    announcer.classList.add('show');
    if (announceTimer) clearTimeout(announceTimer);
    announceTimer = setTimeout(() => announcer.classList.remove('show'), duration);
  }

  function showCount(value) {
    countNum.textContent = value;
    countNum.style.animation = 'none';
    void countNum.offsetWidth;
    countNum.style.animation = '';
    countOverlay.classList.add('show');
    if (countTimer) clearTimeout(countTimer);
    countTimer = setTimeout(() => countOverlay.classList.remove('show'), 620);
  }

  function handleEvents(events) {
    if (!events?.length) return;
    for (const ev of events) {
      if (!ev) continue;
      switch (ev.type) {
        case 'hit':
        case 'critical':
          view.handleEvent(ev);
          if (ev.defender === localSlot && controlSettings.haptic && navigator.vibrate) {
            navigator.vibrate(ev.type === 'critical' ? 45 : 18);
          }
          break;
        case 'block':
        case 'guardBreak':
        case 'dodge':
        case 'dodgeSuccess':
        case 'whiff':
          view.handleEvent(ev);
          break;
        case 'getUp':
          view.handleEvent(ev);
          announce('LEVANTOU!', 'A luta continua', 1100);
          break;
        case 'knockdown': {
          view.handleEvent(ev);
          const f = engine.fighters.find((x) => x.id === ev.id);
          announce('KNOCKDOWN!', f ? f.name : '', 1600);
          break;
        }
        case 'count':
          showCount(ev.count);
          break;
        case 'ko':
          view.handleEvent(ev);
          announce('NOCAUTE!', 'A luta acabou', 2200);
          break;
        case 'roundStart':
          announce(`ROUND ${ev.round}`, eventName, 1300);
          break;
        case 'roundEnd':
          announce('FIM DO ROUND', 'Os juízes registram o round', 1500);
          break;
        case 'decision':
          announce('DECISÃO', 'Os juízes vão anunciar', 1600);
          break;
        case 'result':
          // The authoritative result is processed from engine.result / the snapshot.
          break;
        default:
          view.handleEvent(ev);
          break;
      }
    }
    ui.app.audio.handleEvents(events);
    ui.app.audio.setHeat(view.heat);
  }

  // -------------------------------------------------------------------------
  // Result, career consequences, wager settlement
  // -------------------------------------------------------------------------
  function settleMultiplayer(result) {
    if (mode !== 'multiplayer' || !match) return null;
    const wager = Math.max(0, Math.min(500, Number(match.wager) || 0));
    const localWon = result.winnerId === localSlot;
    const localLost = !!result.winnerId && !localWon;
    const receipt = matchReceipt({
      matchId: match.matchId,
      p1: match.p1?.name,
      p2: match.p2?.name,
      wager,
      result,
    });
    const fallback = { wager, delta: 0, localWon, localLost, receipt, balance: save?.career?.coins ?? null };
    if (!save?.career) return fallback;

    save.multiplayer = save.multiplayer || { history: [], lastCode: null, name: save.profile?.name, totalMatches: 0, wins: 0 };
    save.multiplayer.history = Array.isArray(save.multiplayer.history) ? save.multiplayer.history : [];
    const previous = save.multiplayer.history.find((entry) => entry.matchId === match.matchId);
    if (previous) {
      return {
        wager: previous.wager,
        delta: previous.coinsDelta,
        localWon: previous.won,
        localLost: previous.lost,
        receipt: previous.receipt,
        balance: save.career.coins,
        replay: true,
      };
    }

    let delta = 0;
    if (localWon) delta = wager;
    else if (localLost) delta = -Math.min(wager, Math.max(0, save.career.coins));
    if (delta) addCoins(save, delta, 'Aposta online virtual');

    save.multiplayer.totalMatches = (save.multiplayer.totalMatches || 0) + 1;
    if (localWon) save.multiplayer.wins = (save.multiplayer.wins || 0) + 1;
    save.multiplayer.lastCode = match.code || null;
    save.multiplayer.history.unshift({
      matchId: match.matchId,
      code: match.code || null,
      at: new Date().toISOString(),
      opponent: (localSlot === 'p1' ? match.p2?.name : match.p1?.name) || 'Adversário',
      result: result.winnerId ? (localWon ? 'V' : 'D') : 'E',
      method: result.method,
      round: result.round || null,
      wager,
      coinsDelta: delta,
      won: localWon,
      lost: localLost,
      receipt,
    });
    if (save.multiplayer.history.length > 30) save.multiplayer.history.length = 30;
    persist(save, true);
    return { wager, delta, localWon, localLost, receipt, balance: save.career.coins };
  }

  function processResult(result) {
    if (processed || !result) return;
    processed = true;
    if (mode === 'career' && save) {
      try {
        outcome = applyFightResult({
          save,
          universe: ui.universe,
          result,
          offer,
          division,
          arenaId,
        });
      } catch (err) {
        console.error('Falha ao aplicar resultado da carreira', err);
        outcome = { ok: false, message: err?.message || 'Falha ao registrar o resultado.' };
      }
      if (outcome?.ok) persist(save, true);
    } else {
      multiplayerOutcome = settleMultiplayer(result);
      if (multiplayerOutcome) persist(save, true);
    }

    if (mode === 'career' && title && outcome?.titleWon) {
      view.showBelt({
        org: title.org,
        tier: outcome.titleWon.tier || title.tier,
        name: title.name,
        holder: save?.profile?.name || '',
      });
    }
    scheduleResult(result);
    if (isHost) sendStateNow();
  }

  function scheduleResult(result) {
    if (resultShown || resultTimer) return;
    const method = result?.method;
    const delay = method === 'KO' || method === 'TKO' ? 2350 : method === 'DEC' ? 1050 : 350;
    resultTimer = setTimeout(() => {
      resultTimer = null;
      showResult(result);
    }, delay);
  }

  function showResult(result) {
    if (resultShown || !result) return;
    resultShown = true;
    paused = true;
    closePauseOverlay();
    introOverlay.classList.add('hidden');
    resultCard.innerHTML = resultMarkup(result);
    resultOverlay.classList.remove('hidden');
    bindResultActions();
    if (mode === 'career') {
      if (result.winnerId === 'p1') ui.app.audio.cheer();
      else if (!result.winnerId) ui.app.audio.ui();
    } else {
      if (multiplayerOutcome?.localWon) ui.app.audio.cheer();
      else ui.app.audio.ui();
    }
  }

  function resultMarkup(result) {
    const localWon = result.winnerId ? result.winnerId === localSlot : null;
    const method = METHOD_LABEL[result.method] || result.method || 'RESULTADO';
    const s1 = result.stats?.p1 || {};
    const s2 = result.stats?.p2 || {};
    const winner = result.winnerName || (result.winnerId === 'p1' ? p1def.name : result.winnerId === 'p2' ? p2def.name : '');
    const cards = (result.scorecards || []).map((card) => {
      const totalA = card.p1 ?? card.a ?? 0;
      const totalB = card.p2 ?? card.b ?? 0;
      return `<div class="scorecard"><span>${esc(card.judge || 'Juiz')}</span><b>${totalA} - ${totalB}</b><span>${totalA === totalB ? 'EMPATE' : totalA > totalB ? 'P1' : 'P2'}</span></div>`;
    }).join('');

    const statPairs = [
      ['Golpes', s1.thrown || 0, s2.thrown || 0],
      ['Acertos', s1.landed || 0, s2.landed || 0],
      ['Precisão', fmtPercent(s1.landed || 0, s1.thrown || 0), fmtPercent(s2.landed || 0, s2.thrown || 0)],
      ['Dano', Math.round((s1.damage || 0) * 10) / 10, Math.round((s2.damage || 0) * 10) / 10],
      ['Quedas', s1.knockdowns || 0, s2.knockdowns || 0],
      ['Defesas', (s1.blocks || 0) + (s1.dodges || 0), (s2.blocks || 0) + (s2.dodges || 0)],
      ['Contra-ataques', s1.counters || 0, s2.counters || 0],
      ['Maior combo', s1.maxCombo || 0, s2.maxCombo || 0],
    ];
    const leftRows = statPairs.map(([label, a]) => `<div class="result-stat"><span>${label}</span><b>${a}</b></div>`).join('');
    const rightRows = statPairs.map(([label, , b]) => `<div class="result-stat"><span>${label}</span><b>${b}</b></div>`).join('');

    let rewardMarkup = '';
    let newsMarkup = '';
    let titleMarkup = '';
    if (mode === 'career' && outcome?.ok) {
      rewardMarkup = `<div class="result-rewards">
        <div class="reward"><span>Bolsa</span><b>C$ ${fmtNum(outcome.purse)}</b></div>
        <div class="reward"><span>TG COIN</span><b>+${fmtNum(outcome.coins)}</b></div>
        <div class="reward"><span>Reputação</span><b class="${outcome.repDelta >= 0 ? 'green' : 'red'}">${outcome.repDelta >= 0 ? '+' : ''}${outcome.repDelta}</b></div>
        <div class="reward"><span>Ranking</span><b>#${outcome.rank}</b></div>
      </div>`;
      if (outcome.resultArticle) {
        newsMarkup = `<div class="result-news"><span>TG NEWS · ${esc(outcome.resultArticle.tag || 'RESULTADO')}</span>${esc(outcome.resultArticle.title)}</div>`;
      }
      if (outcome.titleWon) {
        titleMarkup = `<div class="notice green" style="margin-top:14px">${icon('belt', 16)} <b>NOVO CINTURÃO:</b> ${esc(title?.name || beltTierName(outcome.titleWon.tier))} · ${orgOf(title?.org || outcome.titleWon.org).short}. ${outcome.titleWon.defense ? 'Defesa de título registrada.' : 'Seu nome entra na história.'}</div>`;
      } else if (outcome.titleLost) {
        titleMarkup = `<div class="notice red" style="margin-top:14px">${icon('belt', 16)} <b>CINTURÃO PERDIDO:</b> ${esc(beltTierName(outcome.titleLost.tier))}.</div>`;
      }
    } else if (mode === 'career' && outcome && !outcome.ok) {
      rewardMarkup = `<div class="notice red" style="margin-top:14px">${icon('shield', 14)} ${esc(outcome.message || 'Resultado não aplicado.')}</div>`;
    }

    if (mode === 'multiplayer') {
      const mo = multiplayerOutcome;
      if (mo) {
        rewardMarkup = `<div class="result-rewards">
          <div class="reward"><span>Aposta efetiva</span><b>${fmtNum(mo.wager)} TG</b></div>
          <div class="reward"><span>Seu saldo</span><b>${fmtNum(mo.balance ?? save?.career?.coins ?? 0)} TG</b></div>
          <div class="reward"><span>Resultado da aposta</span><b class="${mo.delta > 0 ? 'green' : mo.delta < 0 ? 'red' : ''}">${mo.delta > 0 ? '+' : ''}${fmtNum(mo.delta)} TG</b></div>
          <div class="reward"><span>Recibo</span><b class="mono">${esc(mo.receipt)}</b></div>
        </div>
        <div class="result-news"><span>PARTIDA ONLINE · REGISTRO À PROVA DE DUPLICIDADE</span>
          ${esc(match.code || match.matchId)} · ${esc(match.p1?.name || 'P1')} vs ${esc(match.p2?.name || 'P2')} · apostas apenas em TG COIN virtual, sem valor real.
        </div>`;
      }
    }

    const perspective = localWon === null
      ? '<span class="tag">EMPATE</span>'
      : localWon
        ? '<span class="tag green">VOCÊ VENCEU</span>'
        : '<span class="tag red">VOCÊ PERDEU</span>';

    const actions = mode === 'multiplayer'
      ? `<button class="btn btn-primary" data-result-action="rematch">${icon('clash', 15)} Revanche</button>
         <button class="btn" data-result-action="lobby">${icon('wifi', 15)} Voltar ao lobby</button>
         <button class="btn btn-ghost" data-result-action="replay">${icon('return', 15)} Replay</button>
         <button class="btn btn-ghost" data-result-action="menu">${icon('home', 15)} Menu</button>`
      : `<button class="btn btn-primary" data-result-action="career">${icon('crown', 15)} Voltar à carreira</button>
         ${outcome?.resultArticle ? `<button class="btn" data-result-action="news">${icon('news', 15)} Ler notícia</button>` : ''}
         <button class="btn btn-ghost" data-result-action="replay">${icon('return', 15)} Replay</button>
         <button class="btn btn-ghost" data-result-action="menu">${icon('home', 15)} Menu</button>`;

    return `<div class="result-head">
      <div class="kicker">${esc(eventName)} · ${esc(arena.name)} · ${esc(arena.city)}</div>
      <div class="method">${esc(method)}</div>
      <div class="winner">${result.winnerId ? `VENCEDOR: <span>${esc(winner)}</span>` : 'LUTA EMPATADA'}</div>
      <div class="meta">ROUND ${result.round || rounds} · ${rounds} ROUNDS · ${fmtDate(result.date || new Date().toISOString())}</div>
      <div class="result-tags">${perspective}
        ${result.decisionType ? `<span class="tag blue">${esc(result.decisionType)}</span>` : ''}
        ${mode === 'career' && result.winnerId === 'p1' ? '<span class="tag gold">RESULTADO OFICIAL</span>' : ''}
      </div>
    </div>
    <div class="result-fighters">
      <div><b>${esc(p1def.name)}</b><span>${recordText(p1def.record)}</span></div>
      <span class="vs-small">VS</span>
      <div><b>${esc(p2def.name)}</b><span>${recordText(p2def.record)}</span></div>
    </div>
    <div class="result-stats">
      <div class="result-side">${leftRows}</div>
      <div class="vs-small">VS</div>
      <div class="result-side right">${rightRows}</div>
    </div>
    ${cards ? `<div class="scorecards">${cards}</div>` : ''}
    ${rewardMarkup}
    ${titleMarkup}
    ${newsMarkup}
    <div class="result-actions">${actions}</div>`;
  }

  function bindResultActions() {
    resultCard.querySelectorAll('[data-result-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.resultAction;
        if (action === 'career') return leaveTo('career');
        if (action === 'rematch') {
          leavingToMp = true;
          return ui.navigate('multiplayer', { rematch: true });
        }
        if (action === 'lobby') {
          leavingToMp = true;
          return ui.navigate('multiplayer');
        }
        if (action === 'menu') return leaveTo('menu');
        if (action === 'news' && outcome?.resultArticle) return ui.navigate('news', { id: outcome.resultArticle.id });
        if (action === 'replay') return playReplay(false);
        return undefined;
      });
    });
  }

  function leaveTo(screen, screenData = {}) {
    if (mode === 'multiplayer' && screen === 'multiplayer') leavingToMp = true;
    ui.navigate(screen, screenData);
  }

  // -------------------------------------------------------------------------
  // Replay and pause
  // -------------------------------------------------------------------------
  function playReplay(returnToPause = false) {
    if (replaying) return;
    if (view.frames.length < 4) {
      ui.toast('Replay ainda não disponível.', 'info', 'play');
      return;
    }
    replaying = true;
    resultOverlay.classList.add('hidden');
    pauseOverlay.classList.add('hidden');
    el.classList.add('replaying');
    replayLabel.classList.remove('hidden');
    const wasPaused = paused;
    paused = true;
    const started = view.startReplay(5.5, 0.48, () => {
      replaying = false;
      el.classList.remove('replaying');
      replayLabel.classList.add('hidden');
      if (returnToPause || wasPaused) {
        paused = true;
        if (!resultShown) pauseOverlay.classList.remove('hidden');
      } else {
        paused = false;
      }
      if (resultShown) resultOverlay.classList.remove('hidden');
    });
    if (!started) {
      replaying = false;
      el.classList.remove('replaying');
      replayLabel.classList.add('hidden');
      if (resultShown) resultOverlay.classList.remove('hidden');
      else if (returnToPause) pauseOverlay.classList.remove('hidden');
    }
  }

  function openPause() {
    if (introDone === false) return;
    if (resultShown) {
      playReplay(false);
      return;
    }
    paused = true;
    closePauseOverlay();
    pauseOverlay.classList.remove('hidden');
    ui.app.audio.ui();
  }

  function closePauseOverlay() {
    pauseOverlay.classList.add('hidden');
  }

  function resumeFight() {
    if (resultShown) return;
    closePauseOverlay();
    paused = false;
    ui.app.audio.ui();
    lastInputState = '';
  }

  // -------------------------------------------------------------------------
  // Input
  // -------------------------------------------------------------------------
  let lastInputState = '';

  function readMove() {
    let x = 0;
    let z = 0;
    if (keys.has('KeyD') || keys.has('ArrowRight')) x += 1;
    if (keys.has('KeyA') || keys.has('ArrowLeft')) x -= 1;
    if (keys.has('KeyW') || keys.has('ArrowUp')) z += 1;
    if (keys.has('KeyS') || keys.has('ArrowDown')) z -= 1;
    x += touchMove.x;
    z += touchMove.y;
    const length = Math.hypot(x, z);
    if (length > 1) {
      x /= length;
      z /= length;
    }
    return { x, z };
  }

  function buildInput(now, consume = true) {
    const move = readMove();
    const block = !!(blockTouch || blockMouse || keys.has('Space') || keys.has('ShiftLeft'));
    const input = {
      moveX: move.x,
      moveZ: move.z,
      block,
      dodge: dodgeQueued,
      punch: pendingPunch,
      getUp: now < getUpUntil,
    };
    if (consume) {
      pendingPunch = null;
      dodgeQueued = false;
    }
    return input;
  }

  function queuePunch(type) {
    if (!PUNCHES[type] || resultShown) return;
    if (!introDone) return;
    if (engine.phase === 'knockdown' && engine.down?.fighter?.id === localSlot) {
      pulseGetUp();
      return;
    }
    pendingPunch = type;
    sendInputNow();
  }

  function queueDodge() {
    if (!introDone || resultShown || paused) return;
    dodgeQueued = true;
    sendInputNow();
  }

  function pulseGetUp() {
    getUpUntil = performance.now() + 130;
    sendInputNow();
  }

  function sendInput(now = performance.now(), force = false) {
    if (mode !== 'multiplayer' || role !== 'guest') return;
    if (!force && now - lastInputSent < 62) return;
    if (!mp?.session) return;
    const input = buildInput(now, true);
    const signature = `${input.moveX.toFixed(2)}|${input.moveZ.toFixed(2)}|${input.block}|${input.dodge}|${input.punch}|${input.getUp}`;
    if (!force && signature === lastInputState) {
      lastInputSent = now;
      return;
    }
    lastInputState = signature;
    lastInputSent = now;
    sendMp(ui, { t: 'input', input });
  }

  function sendInputNow() {
    if (mode === 'multiplayer' && role === 'guest') sendInput(performance.now(), true);
  }

  function sendStateNow() {
    if (mode !== 'multiplayer' || role !== 'host' || !mp?.session) return;
    const events = fxQueue.splice(0, fxQueue.length);
    sendMp(ui, {
      t: 'state',
      snapshot: engine.getSnapshot(),
      events,
      at: Date.now(),
    });
  }

  function isTypingTarget(target) {
    return !!target?.closest?.('input, textarea, select, [contenteditable="true"]');
  }

  const onKeyDown = (e) => {
    if (isTypingTarget(e.target)) return;
    if (e.code === 'Escape' || e.code === 'KeyP') {
      e.preventDefault();
      if (introDone && !resultShown) {
        if (paused) resumeFight();
        else openPause();
      }
      return;
    }
    if (!introDone) {
      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        beginEntrance(false);
      }
      return;
    }
    if (resultShown) return;
    if (e.code === 'Space' || e.code === 'ShiftLeft' || e.code === 'ShiftRight') e.preventDefault();
    if (e.repeat) {
      if (e.code === 'Space' || e.code === 'ShiftLeft') keys.add(e.code);
      return;
    }
    keys.add(e.code);
    if (PUNCH_KEYS[e.code]) {
      e.preventDefault();
      queuePunch(PUNCH_KEYS[e.code]);
      return;
    }
    if (e.code === 'KeyQ' || e.code === 'KeyE') {
      e.preventDefault();
      queueDodge();
    }
  };

  const onKeyUp = (e) => {
    keys.delete(e.code);
  };

  const clearInputs = () => {
    keys.clear();
    blockMouse = false;
    blockTouch = false;
    touchMove.x = 0;
    touchMove.y = 0;
    pendingPunch = null;
    dodgeQueued = false;
  };

  const onWindowBlur = () => clearInputs();

  const onPointerDown = (e) => {
    if (!introDone || paused || resultShown) return;
    if (e.target.closest('button, .touch-controls, .fight-overlay, .hud-btn')) return;
    if (e.pointerType === 'mouse' && e.button === 2) {
      blockMouse = true;
      e.preventDefault();
      return;
    }
    if (e.pointerType === 'mouse' && e.button === 0) {
      queuePunch(e.clientY > window.innerHeight * 0.62 ? 'body' : 'jab');
      e.preventDefault();
    }
  };

  const onPointerUp = (e) => {
    if (e.pointerType === 'mouse' && e.button === 2) blockMouse = false;
  };

  const onContextMenu = (e) => {
    if (e.target.closest('.fight-screen')) e.preventDefault();
  };

  // -------------------------------------------------------------------------
  // Touch controls
  // -------------------------------------------------------------------------
  function setupTouchControls() {
    const touch = el.querySelector('[data-touch-controls]');
    const joystick = el.querySelector('[data-joystick]');
    const knob = el.querySelector('[data-joystick-knob]');
    const actionPad = el.querySelector('[data-action-pad]');
    if (!touch || !joystick) return;

    const touchCapable = ui.app.mobile || (typeof matchMedia !== 'undefined' && matchMedia('(pointer:coarse)').matches);
    if (!touchCapable) return;
    touch.classList.add('enabled');

    const stickSize = Math.max(80, Math.min(190, Number(controlSettings.joystick) || 128));
    joystick.style.width = `${stickSize}px`;
    joystick.style.height = `${stickSize}px`;
    touch.style.setProperty('--ctrl-opacity', String(Math.max(0.3, Math.min(1, Number(controlSettings.opacity) || 0.8))));
    const btnScale = Math.max(0.75, Math.min(1.35, (Number(controlSettings.buttons) || 132) / 132));
    if (actionPad) actionPad.style.setProperty('--btn-scale', btnScale.toFixed(2));
    const side = controlSettings.side === 'left' ? 'left' : 'right';
    touch.dataset.side = side;

    const updateStick = (e) => {
      const rect = joystick.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let dx = e.clientX - cx;
      let dy = e.clientY - cy;
      const radius = rect.width * 0.38;
      const length = Math.hypot(dx, dy);
      if (length > radius) {
        dx = (dx / length) * radius;
        dy = (dy / length) * radius;
      }
      knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
      touchMove.x = dx / radius;
      touchMove.y = -dy / radius;
    };

    const resetStick = () => {
      stickPointer = null;
      touchMove.x = 0;
      touchMove.y = 0;
      knob.style.transform = 'translate(-50%, -50%)';
    };

    joystick.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      stickPointer = e.pointerId;
      joystick.setPointerCapture?.(e.pointerId);
      updateStick(e);
    });
    joystick.addEventListener('pointermove', (e) => {
      if (stickPointer !== e.pointerId) return;
      e.preventDefault();
      updateStick(e);
    });
    joystick.addEventListener('pointerup', (e) => {
      if (stickPointer === e.pointerId) resetStick();
    });
    joystick.addEventListener('pointercancel', resetStick);

    touch.querySelectorAll('[data-touch]').forEach((btn) => {
      const action = btn.dataset.touch;
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (action === 'block') {
          blockTouch = true;
          btn.classList.add('pressed');
        } else if (action === 'dodge') {
          queueDodge();
          btn.classList.add('pressed');
        } else {
          queuePunch(action);
          btn.classList.add('pressed');
        }
      });
      const release = () => {
        btn.classList.remove('pressed');
        if (action === 'block') blockTouch = false;
      };
      btn.addEventListener('pointerup', release);
      btn.addEventListener('pointercancel', release);
      btn.addEventListener('pointerleave', release);
    });
  }

  setupTouchControls();

  // -------------------------------------------------------------------------
  // Entrance
  // -------------------------------------------------------------------------
  function beginEntrance(skip = false) {
    if (introDone) return;
    introDone = true;
    introOverlay.classList.add('hidden');
    view.startEntrance();
    if (mode === 'multiplayer' && role === 'host') sendMp(ui, { t: 'begin' });

    const startLocalEngine = () => {
      if (mode === 'multiplayer') {
        if (role === 'host') {
          engine.start();
          sendMp(ui, { t: 'started' });
        }
      } else {
        engine.start();
      }
    };

    if (skip) {
      view.onEntranceDone = null;
      view.endEntrance();
      startLocalEngine();
    } else {
      view.onEntranceDone = () => {
        view.onEntranceDone = null;
        startLocalEngine();
      };
    }
  }

  function remoteBegin() {
    if (!introDone) beginEntrance(false);
  }

  function remoteStarted() {
    if (!introDone) {
      introDone = true;
      introOverlay.classList.add('hidden');
    }
    if (view.entrance) view.endEntrance();
    if (!engine.started) engine.started = true;
  }

  // -------------------------------------------------------------------------
  // Multiplayer sync
  // -------------------------------------------------------------------------
  const netHandler = (type, d = {}) => {
    if (mode !== 'multiplayer') return;
    switch (type) {
      case 'state': {
        if (role !== 'guest') break;
        if (Array.isArray(d.events) && d.events.length) handleEvents(d.events);
        if (d.snapshot) {
          remoteStarted();
          engine.applySnapshot(d.snapshot);
          hideReconnect();
          netPaused = false;
          if (d.snapshot.result) processResult(d.snapshot.result);
        }
        break;
      }
      case 'input': {
        if (role !== 'host') break;
        guestInput = sanitizeInput(d.input);
        lastGuestInputAt = performance.now();
        break;
      }
      case 'begin': {
        if (role !== 'guest') break;
        remoteBegin();
        break;
      }
      case 'started': {
        if (role !== 'guest') break;
        remoteStarted();
        break;
      }
      case 'resync': {
        if (role !== 'host') break;
        sendStateNow();
        break;
      }
      case 'hello': {
        if (role !== 'host') break;
        netPaused = false;
        hideReconnect();
        if (engine.started) sendStateNow();
        break;
      }
      case 'connected': {
        if (d.resumed) {
          netPaused = false;
          hideReconnect();
          if (role === 'host') sendStateNow();
          else sendMp(ui, { t: 'resync' });
        }
        break;
      }
      case 'reconnected': {
        netPaused = false;
        hideReconnect();
        if (role === 'guest') sendMp(ui, { t: 'resync' });
        break;
      }
      case 'disconnected': {
        netPaused = true;
        showReconnect('Conexão perdida', 'A luta foi pausada. Tentando reconectar automaticamente…');
        if (!resultShown) ui.toast('Conexão instável. A luta está pausada.', 'error', 'wifiOff');
        break;
      }
      case 'status': {
        if (d.state === 'reconnecting' || d.state === 'offline') {
          netPaused = true;
          showReconnect('Reconectando…', d.label || 'Aguardando o adversário.');
        }
        break;
      }
      case 'closed': {
        netPaused = true;
        showReconnect('Sala encerrada', 'O anfitrião encerrou a partida.');
        break;
      }
      case 'error': {
        if (d.message) ui.toast(d.message, 'error', 'wifiOff');
        break;
      }
      default:
        break;
    }
  };
  const detachNet = mode === 'multiplayer' ? attachMp(ui, netHandler) : () => {};

  function showReconnect(titleText, text) {
    reconnectTitle.textContent = titleText;
    reconnectText.textContent = text;
    reconnectBanner.classList.remove('hidden');
  }

  function hideReconnect() {
    reconnectBanner.classList.add('hidden');
  }

  function winByDisconnect() {
    if (mode !== 'multiplayer' || role !== 'host' || engine.result) return;
    engine.endFight({
      winnerId: 'p1',
      loserId: 'p2',
      method: 'QUIT',
      round: engine.round,
      time: Math.max(0, engine.clock),
    });
    processResult(engine.result);
    hideReconnect();
    netPaused = false;
  }

  // -------------------------------------------------------------------------
  // Main tick (called before the 3D view update)
  // -------------------------------------------------------------------------
  function tick(dt) {
    if (destroyed) return;
    const now = performance.now();
    const effectivePaused = paused || netPaused;
    if (introDone && !replaying) {
      if (isHost) {
        if (!effectivePaused) {
          const p1input = buildInput(now, true);
          if (mode === 'multiplayer') {
            if (now - lastGuestInputAt > 900) guestInput = neutralInput();
            engine.update(dt, { p1: p1input, p2: guestInput });
          } else {
            engine.update(dt, { p1: p1input });
          }
        }
        const events = engine.drainEvents();
        if (events.length) {
          handleEvents(events);
          fxQueue.push(...events);
        }
        if (engine.result) processResult(engine.result);
        if (mode === 'multiplayer' && !resultShown && now - lastNetSend > 66) {
          lastNetSend = now;
          sendStateNow();
        }
      } else {
        // Guest never simulates. It only renders authoritative snapshots.
        const events = engine.drainEvents();
        if (events.length) { /* snapshots/results are handled separately */ }
        if (engine.result) processResult(engine.result);
        if (!resultShown && now - lastInputSent > 62) sendInput(now, false);
      }
    }
    updateHud(now);
  }

  // Replace the view update so the engine advances before rendering.
  view.update = (dt) => {
    tick(dt);
    originalViewUpdate(dt);
  };

  ui.app.showFight(view);
  ui.app.audio.setScene('fight');
  ui.app.audio.setHeat(0.4);

  // Bind HUD/overlay controls.
  el.querySelectorAll('[data-action]').forEach((btn) => {
    const action = btn.dataset.action;
    if (action === 'pause') return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (action === 'enter') beginEntrance(false);
      else if (action === 'skip') beginEntrance(true);
      else if (action === 'resume') resumeFight();
      else if (action === 'replay-pause') playReplay(true);
      else if (action === 'leave') {
        ui.confirm({
          title: mode === 'multiplayer' ? 'Sair da partida?' : 'Encerrar a luta?',
          message: mode === 'multiplayer'
            ? 'A sala online será encerrada para os dois jogadores.'
            : 'Encerrar agora conta como desistência para a carreira.',
          confirmLabel: 'Sair',
          danger: true,
          onConfirm: () => {
            if (mode === 'career') {
              paused = false;
              engine.quit('p1');
            } else {
              leaveTo('multiplayer');
            }
          },
        });
      } else if (action === 'sound') {
        toggleSound(btn);
      } else if (action === 'getup') {
        pulseGetUp();
        ui.app.audio.ui();
      } else if (action === 'net-leave') {
        leaveTo('multiplayer');
      } else if (action === 'net-wo') {
        winByDisconnect();
      }
    });
  });
  pauseBtn.addEventListener('click', () => openPause());

  function toggleSound(btn) {
    ui.audioMuted = !ui.audioMuted;
    if (ui.app.audio.master) ui.app.audio.master.gain.value = ui.audioMuted ? 0 : 0.9;
    btn.innerHTML = `${icon(ui.audioMuted ? 'volume' : 'volume', 15)} Som ${ui.audioMuted ? 'desligado' : 'ligado'}`;
  }

  // Global input listeners.
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', onWindowBlur);
  el.addEventListener('pointerdown', onPointerDown);
  el.addEventListener('pointerup', onPointerUp);
  el.addEventListener('contextmenu', onContextMenu);

  // Ensure the intro overlay remains usable when the fight starts remotely.
  if (mode === 'multiplayer' && role === 'guest') {
    introOverlay.dataset.remote = '1';
  }

  ui.onCleanup(() => {
    destroyed = true;
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    window.removeEventListener('blur', onWindowBlur);
    el.removeEventListener('pointerdown', onPointerDown);
    el.removeEventListener('pointerup', onPointerUp);
    el.removeEventListener('contextmenu', onContextMenu);
    detachNet();
    if (announceTimer) clearTimeout(announceTimer);
    if (countTimer) clearTimeout(countTimer);
    if (resultTimer) clearTimeout(resultTimer);
    if (mode === 'multiplayer' && !leavingToMp) closeMp(ui);
    ui.lastBackground = null;
    ui.app.clearBackground();
  });

  return el;
}
