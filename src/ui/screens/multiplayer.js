// Real online multiplayer lobby: private invite links, public rooms, ready handshake and chat.
import { icon } from '../icons.js';
import { esc, h, fmtNum, initials, recordText, overall, divisionName, screenHead } from '../helpers.js';
import { ARENAS, ARENA_BY_ID, DIVISION_BY_ID, ORGS, STYLES } from '../../core/data.js';
import { DEFAULT_APPEARANCE, baseAttributes, overallOf } from '../../core/store.js';
import { randomAppearance } from '../../core/appearance.js';
import { NetSession, randomRoomCode, cleanCode, isPublicCode, inviteUrl } from '../../net/net.js';

const WAGERS = [0, 50, 100, 250, 500];
const ROUND_OPTIONS = [3, 4, 6];

export function localFighterInfo(save) {
  if (save?.profile?.created) {
    const p = save.profile;
    return {
      id: 'player', name: p.name, nick: p.nickname || '', nationality: p.nationality,
      division: p.division, style: p.style, age: p.age,
      attributes: { ...(p.attributes || {}) },
      appearance: { ...DEFAULT_APPEARANCE, ...(p.appearance || {}) },
      record: { ...(save.career?.record || { w: 0, l: 0, d: 0, ko: 0 }) },
      overall: overallOf(p.attributes),
      points: save.career?.points || 0,
      belts: (save.career?.belts || []).map((b) => ({ ...b })),
    };
  }
  const attributes = { ...baseAttributes() };
  for (const key of Object.keys(attributes)) attributes[key] = 58;
  return {
    id: 'guest', name: 'Desafiante TG', nick: 'The Challenger', nationality: 'BRA',
    division: 'middle', style: 'technical', age: 24,
    attributes,
    appearance: { ...DEFAULT_APPEARANCE, ...randomAppearance('tg-online-challenger') },
    record: { w: 0, l: 0, d: 0, ko: 0 },
    overall: overallOf(attributes), points: 0, belts: [],
  };
}

export function sanitizeFighterInfo(info = {}) {
  const attrs = info.attributes || {};
  const cleanAttrs = {};
  for (const key of ['strength', 'speed', 'stamina', 'precision', 'defense', 'reflexes', 'mobility', 'recovery', 'conditioning']) {
    cleanAttrs[key] = Math.max(20, Math.min(99, Number(attrs[key]) || 50));
  }
  return {
    id: String(info.id || 'guest').slice(0, 30),
    name: String(info.name || 'Lutador Online').slice(0, 26),
    nick: String(info.nick || '').slice(0, 24),
    nationality: String(info.nationality || 'BRA').slice(0, 3).toUpperCase(),
    division: DIVISION_BY_ID[info.division] ? info.division : 'middle',
    style: STYLES.find((s) => s.id === info.style)?.id || 'technical',
    age: Math.max(16, Math.min(60, Number(info.age) || 24)),
    attributes: cleanAttrs,
    appearance: { ...DEFAULT_APPEARANCE, ...(info.appearance && typeof info.appearance === 'object' ? info.appearance : {}) },
    record: {
      w: Math.max(0, Number(info.record?.w) || 0),
      l: Math.max(0, Number(info.record?.l) || 0),
      d: Math.max(0, Number(info.record?.d) || 0),
      ko: Math.max(0, Number(info.record?.ko) || 0),
    },
    overall: Math.max(20, Math.min(99, Number(info.overall) || overallOf(cleanAttrs))),
    points: Math.max(0, Number(info.points) || 0),
    belts: Array.isArray(info.belts) ? info.belts.slice(0, 12) : [],
  };
}

export function getMp(ui) {
  return ui.mp || null;
}

export function sendMp(ui, message) {
  return ui.mp?.session?.send(message) || false;
}

export function attachMp(ui, handler) {
  if (!ui.mp) return () => {};
  ui.mp.listeners.add(handler);
  return () => ui.mp?.listeners.delete(handler);
}

export function closeMp(ui) {
  const mp = ui.mp;
  if (!mp) return;
  try { mp.session?.destroy(); } catch {}
  mp.listeners?.clear();
  ui.mp = null;
}

export function mpFighterDef(info, slot) {
  const clean = sanitizeFighterInfo(info);
  return {
    ...clean,
    id: slot,
    isPlayer: slot === 'p1',
  };
}

export function multiplayerScreen(ui, data = {}) {
  const existing = ui.mp;
  const rejoining = !!(existing?.session && !existing.session.destroyed);
  const role0 = rejoining ? existing.role : null;
  const state = {
    phase: rejoining ? 'lobby' : 'menu',
    code: rejoining ? existing.code : '',
    public: rejoining ? !!existing.public : false,
    role: role0,
    status: rejoining ? { state: 'online', label: 'Conectado' } : { state: 'idle', label: 'Pronto para conectar' },
    localInfo: sanitizeFighterInfo(rejoining ? existing.localInfo : localFighterInfo(ui.save)),
    remoteInfo: rejoining ? existing.remoteInfo : null,
    hostReady: rejoining ? !!existing.hostReady : false,
    guestReady: rejoining ? !!existing.guestReady : false,
    hostWager: rejoining ? (existing.hostWager || 0) : 0,
    guestWager: rejoining ? (existing.guestWager || 0) : 0,
    wager: rejoining ? (existing.wager || 0) : 0,
    rounds: rejoining ? (existing.rounds || 3) : 3,
    arenaId: rejoining ? (existing.arenaId || 'national') : 'national',
    messages: rejoining ? (existing.messages || []) : [],
    chatText: '',
    error: '',
    joining: false,
    busy: false,
    starting: false,
  };
  if (ui.save?.career?.coins != null) state.localCoins = ui.save.career.coins;

  let el;
  let content;
  let detach = () => {};

  const saveStateToMp = () => {
    const mp = ui.mp;
    if (!mp) return;
    mp.role = state.role;
    mp.code = state.code;
    mp.public = state.public;
    mp.localInfo = state.localInfo;
    mp.remoteInfo = state.remoteInfo;
    mp.hostReady = state.hostReady;
    mp.guestReady = state.guestReady;
    mp.hostWager = state.hostWager;
    mp.guestWager = state.guestWager;
    mp.wager = state.wager;
    mp.rounds = state.rounds;
    mp.arenaId = state.arenaId;
    mp.messages = state.messages;
    mp.status = state.status;
  };

  const createSession = (role) => {
    const mp = {
      role,
      localInfo: state.localInfo,
      remoteInfo: null,
      code: state.code,
      public: false,
      hostReady: false,
      guestReady: false,
      hostWager: 0,
      guestWager: 0,
      wager: 0,
      rounds: state.rounds,
      arenaId: state.arenaId,
      messages: [],
      listeners: new Set(),
      match: null,
    };
    mp.session = new NetSession({
      onEvent: (type, payload) => {
        if (type === 'message') return;
        for (const fn of mp.listeners) {
          try { fn(type, payload || {}); } catch (err) { console.warn('mp listener', type, err); }
        }
      },
    });
    ui.mp = mp;
    detach = attachMp(ui, onNetEvent);
    return mp;
  };

  const setStatus = (stateName, label) => {
    state.status = { state: stateName, label };
  };

  const resetToMenu = (message = '') => {
    closeMp(ui);
    detach();
    detach = () => {};
    state.phase = 'menu';
    state.error = message;
    state.role = null;
    state.remoteInfo = null;
    state.joining = false;
    state.busy = false;
    state.code = '';
    setStatus('idle', 'Desconectado');
    paint();
  };

  const onNetEvent = (type, d = {}) => {
    switch (type) {
      case 'room': {
        if (d.code) state.code = d.code;
        if (d.public != null) state.public = !!d.public;
        if (state.phase !== 'lobby') state.phase = 'lobby';
        saveStateToMp();
        paint();
        break;
      }
      case 'connected': {
        setStatus('online', 'Conectado · P2P');
        if (ui.mp) ui.mp.connected = true;
        paint();
        break;
      }
      case 'status': {
        setStatus(d.state || 'info', d.label || '');
        paint();
        break;
      }
      case 'error': {
        state.error = d.message || 'Falha na conexão.';
        state.joining = false;
        state.busy = false;
        setStatus('offline', state.error);
        ui.toast(state.error, 'error', 'wifiOff');
        if (state.phase === 'menu' || !ui.mp?.connected) {
          resetToMenu(state.error);
        } else {
          paint();
        }
        break;
      }
      case 'notice': {
        if (d.message) ui.toast(d.message, 'info', 'wifi');
        break;
      }
      case 'disconnected': {
        setStatus('offline', 'Conexão perdida. Tentando reconectar...');
        saveStateToMp();
        paint();
        break;
      }
      case 'reconnected': {
        setStatus('online', 'Reconectado');
        ui.toast('Reconectado ao adversário.', 'success', 'wifi');
        paint();
        break;
      }
      case 'hello': {
        if (state.role !== 'host') break;
        state.remoteInfo = sanitizeFighterInfo(d);
        if (ui.mp) ui.mp.remoteInfo = state.remoteInfo;
        if (typeof d.ready === 'boolean') state.guestReady = d.ready;
        if (Number.isFinite(Number(d.wager))) state.guestWager = Number(d.wager);
        sendMp(ui, {
          t: 'welcome',
          host: state.localInfo,
          code: state.code,
          ready: state.hostReady,
          wager: state.hostWager,
          rounds: state.rounds,
          arenaId: state.arenaId,
          match: ui.mp?.match || null,
        });
        setStatus('online', d.resume ? 'Adversário reconectado' : 'Adversário conectado');
        saveStateToMp();
        if (d.resume) ui.toast('Adversário reconectado.', 'success', 'wifi');
        paint();
        break;
      }
      case 'welcome': {
        if (state.role !== 'guest') break;
        state.remoteInfo = sanitizeFighterInfo(d.host || d);
        if (ui.mp) ui.mp.remoteInfo = state.remoteInfo;
        if (typeof d.ready === 'boolean') state.hostReady = d.ready;
        if (Number.isFinite(Number(d.wager))) state.hostWager = Number(d.wager);
        if (Number.isFinite(Number(d.rounds))) state.rounds = Number(d.rounds);
        if (ARENA_BY_ID[d.arenaId]) state.arenaId = d.arenaId;
        if (d.match) ui.mp.match = d.match;
        setStatus('online', 'Conectado ao anfitrião');
        saveStateToMp();
        paint();
        break;
      }
      case 'settings': {
        if (state.role !== 'guest') break;
        if (ROUND_OPTIONS.includes(Number(d.rounds))) state.rounds = Number(d.rounds);
        if (ARENA_BY_ID[d.arenaId]) state.arenaId = d.arenaId;
        paint();
        break;
      }
      case 'ready': {
        if (state.role === 'host') {
          state.guestReady = !!d.ready;
          if (Number.isFinite(Number(d.wager))) state.guestWager = Number(d.wager);
          if (d.info) state.remoteInfo = sanitizeFighterInfo(d.info);
        } else {
          state.hostReady = !!d.ready;
          if (Number.isFinite(Number(d.wager))) state.hostWager = Number(d.wager);
          if (d.info) state.remoteInfo = sanitizeFighterInfo(d.info);
        }
        saveStateToMp();
        paint();
        break;
      }
      case 'chat': {
        const text = String(d.text || '').slice(0, 180).trim();
        if (!text) break;
        state.messages.push({ from: state.remoteInfo?.name || 'Adversário', text, mine: false });
        if (state.messages.length > 40) state.messages.shift();
        saveStateToMp();
        paint({ keepChat: true });
        break;
      }
      case 'match': {
        if (!d.match || state.role !== 'guest') break;
        if (ui.mp) ui.mp.match = d.match;
        state.starting = true;
        saveStateToMp();
        launchFight();
        break;
      }
      case 'closed': {
        if (state.phase === 'lobby') {
          setStatus('offline', 'Sala encerrada pelo anfitrião.');
          ui.toast('A sala foi encerrada.', 'error', 'wifiOff');
          resetToMenu('Sala encerrada.');
        }
        break;
      }
      default:
        break;
    }
  };

  const paint = ({ keepChat = false } = {}) => {
    if (!content) return;
    content.innerHTML = state.phase === 'lobby' ? lobbyMarkup() : menuMarkup();
    bind();
    if (keepChat) {
      const feed = content.querySelector('[data-chat-feed]');
      if (feed) feed.scrollTop = feed.scrollHeight;
    }
  };

  const identityMarkup = () => {
    const f = state.localInfo;
    return `<div class="mp-identity">
      <div class="avatar-lg">${initials(f.name)}</div>
      <div style="flex:1;min-width:0">
        <div class="kicker">Seu lutador</div>
        <b class="mp-name">${esc(f.name)}</b>
        <div class="tiny">${recordText(f.record)} · ${divisionName(f.division)} · Overall ${f.overall} · ${esc(f.nationality)}</div>
      </div>
      <span class="chip gold">${icon('coin', 12)} ${fmtNum(state.localCoins ?? 300)} TG</span>
    </div>`;
  };

  const statusPill = () => {
    const st = state.status?.state || 'idle';
    const cls = st === 'online' ? 'online' : st === 'offline' || st === 'error' ? 'offline' : '';
    return `<span class="connection-pill ${cls}"><i class="dot"></i>${esc(state.status?.label || 'Aguardando')}</span>`;
  };

  const menuMarkup = () => `
    ${state.error ? `<div class="notice red" style="margin-bottom:14px">${icon('wifiOff', 14)} ${esc(state.error)}</div>` : ''}
    <div class="mp-layout">
      <div class="stack">
        <div class="panel lobby-card">
          <div class="panel-head"><h3>Sala privada</h3><span class="tiny">Link de convite</span></div>
          <div class="panel-body">
            <p class="tiny" style="margin-top:0;line-height:1.6">Crie uma sala real via WebRTC, copie o link e envie para um amigo. Cada jogador luta no próprio dispositivo — não é simulação local.</p>
            <button class="btn btn-primary btn-block" data-action="create-private" ${state.busy ? 'disabled' : ''}>${icon('link', 15)} Criar sala privada</button>
            <div class="divider"></div>
            <div class="field" style="margin-bottom:8px"><label>Entrar com código</label></div>
            <div class="join-row">
              <input class="input" data-code maxlength="12" placeholder="Ex.: 7KQ2M9" value="${esc(state.code || cleanCode(data.join || ''))}" autocomplete="off" spellcheck="false">
              <button class="btn btn-gold-outline" data-action="join-code" ${state.busy ? 'disabled' : ''}>${icon('arrow', 14)} Entrar</button>
            </div>
            <p class="tiny" style="margin:8px 0 0">Aceita códigos privados e códigos públicos OPEN-0 a OPEN-7.</p>
          </div>
        </div>

        <div class="panel">
          <div class="panel-head"><h3>Partida rápida</h3><span class="tiny">WebRTC</span></div>
          <div class="panel-body">
            <div class="mp-actions">
              <button class="btn btn-sm" data-action="create-public" ${state.busy ? 'disabled' : ''}>${icon('wifi', 14)} Abrir sala pública</button>
              <button class="btn btn-sm btn-primary" data-action="quick-match" ${state.busy ? 'disabled' : ''}>${icon('people', 14)} Procurar adversário</button>
            </div>
            <p class="tiny" style="margin:10px 0 0">Salas públicas ocupam um dos 8 slots globais. Se todos estiverem ocupados, crie uma sala privada.</p>
          </div>
        </div>

        ${state.joining ? `<div class="panel mp-status">
          <div class="spinner"></div>
          <div class="big">Conectando…</div>
          <p class="tiny">${esc(state.status?.label || 'Negociando conexão PeerJS / WebRTC')}</p>
          <button class="btn btn-sm btn-ghost" data-action="cancel">Cancelar</button>
        </div>` : ''}
      </div>

      <div class="stack">
        <div class="panel">
          <div class="panel-head"><h3>Sua identidade</h3><span class="tiny">${state.localInfo.overall} OVR</span></div>
          <div class="panel-body">${identityMarkup()}</div>
        </div>
        <div class="panel">
          <div class="panel-head"><h3>Como funciona</h3></div>
          <div class="panel-body mp-rules">
            <div><b>1.</b> O anfitrião cria a sala e envia o link.</div>
            <div><b>2.</b> O convidado entra no mesmo link/código.</div>
            <div><b>3.</b> Ambos marcam “Pronto”. O anfitrião inicia.</div>
            <div><b>4.</b> O anfitrião simula a luta; entradas e resultados são sincronizados em tempo real.</div>
            <div><b>5.</b> Quedas de conexão pausam a luta e tentam reconectar automaticamente.</div>
          </div>
        </div>
        <div class="notice">${icon('shield', 13)} TG COIN é 100% virtual. Apostas online são apenas em moeda virtual, limitadas e sem conversão para dinheiro real.</div>
      </div>
    </div>`;

  const slotMarkup = (side) => {
    const isHost = side === 'host';
    const info = isHost ? (state.role === 'host' ? state.localInfo : state.remoteInfo) : (state.role === 'guest' ? state.localInfo : state.remoteInfo);
    const ready = isHost ? state.hostReady : state.guestReady;
    const roleLabel = isHost ? 'ANFITRIÃO · P1' : 'CONVIDADO · P2';
    if (!info) return `<div class="player-slot empty">
      <div class="avatar">?</div>
      <b>Aguardando</b>
      <span>${isHost ? 'Host' : 'Compartilhe o link de convite'}</span>
    </div>`;
    return `<div class="player-slot ${ready ? 'ready' : ''}">
      <div class="avatar">${initials(info.name)}</div>
      <span class="tag ${isHost ? 'gold' : 'red'}">${roleLabel}</span>
      <b>${esc(info.name)}</b>
      <span>${recordText(info.record)} · ${divisionName(info.division)} · OVR ${info.overall}</span>
      <span class="tiny">${esc(info.nick || 'Sem apelido')} · ${esc(info.nationality)}</span>
      <span class="chat-status ${ready ? 'ok' : ''}">${ready ? 'PRONTO' : 'NÃO PRONTO'}</span>
    </div>`;
  };

  const wagerMarkup = () => {
    const localWager = state.role === 'host' ? state.hostWager : state.guestWager;
    const remoteWager = state.role === 'host' ? state.guestWager : state.hostWager;
    const maxCoins = state.localCoins ?? 0;
    return `<div class="wager-box">
      <div class="row between"><span class="tiny">Aposta TG COIN (virtual)</span><span class="tiny">Seu saldo: ${fmtNum(maxCoins)}</span></div>
      <div class="wager-row">
        ${WAGERS.map((v) => `<button data-wager="${v}" class="${localWager === v ? 'active' : ''}" ${v > maxCoins ? 'disabled' : ''}>${v === 0 ? 'Sem aposta' : fmtNum(v) + ' TG'}</button>`).join('')}
      </div>
      <div class="tiny" style="margin-top:7px">Aposta efetiva: <b class="gold">${fmtNum(Math.min(state.hostWager || 0, state.guestWager || 0))} TG</b> · mínimo entre os dois · limite 500 · adversário escolheu ${fmtNum(remoteWager || 0)} TG</div>
    </div>`;
  };

  const lobbyMarkup = () => {
    const isHost = state.role === 'host';
    const localReady = isHost ? state.hostReady : state.guestReady;
    const bothReady = state.hostReady && state.guestReady;
    const share = state.public ? '' : `<div class="invite-box">
      <input readonly value="${esc(inviteUrl(state.code))}" data-invite aria-label="Link de convite">
      <button class="btn btn-sm btn-gold-outline" data-action="copy">${icon('copy', 13)} Copiar</button>
    </div>`;
    return `
      <div class="lobby-head">
        <div>
          <div class="kicker">${state.public ? 'Sala pública' : 'Sala privada'}</div>
          <div class="room-code">${esc(state.code || '····')}</div>
          <div class="row" style="justify-content:center;gap:8px">
            ${statusPill()}
            <span class="chip">${icon('wifi', 11)} WebRTC P2P</span>
            <span class="chip">${icon('people', 11)} ${state.remoteInfo ? '2/2' : '1/2'}</span>
          </div>
        </div>
        <button class="btn btn-sm btn-ghost leave-btn" data-action="leave">${icon('close', 13)} Sair da sala</button>
      </div>
      ${share}
      <div class="player-slots">
        ${slotMarkup('host')}
        <div class="vs-small">VS</div>
        ${slotMarkup('guest')}
      </div>
      ${wagerMarkup()}
      ${isHost ? `<div class="host-settings">
        <div class="field"><label>Rounds</label><select class="input" data-rounds>${ROUND_OPTIONS.map((r) => `<option value="${r}" ${state.rounds === r ? 'selected' : ''}>${r} rounds</option>`).join('')}</select></div>
        <div class="field"><label>Arena</label><select class="input" data-arena>${ARENAS.map((a) => `<option value="${a.id}" ${state.arenaId === a.id ? 'selected' : ''}>${a.name} · ${a.city}</option>`).join('')}</select></div>
      </div>` : `<div class="notice" style="margin-bottom:12px">${icon('ring', 13)} Arena: <b>${esc(ARENA_BY_ID[state.arenaId]?.name || 'Arena Nacional')}</b> · ${state.rounds} rounds</div>`}
      <div class="row between" style="gap:10px;flex-wrap:wrap">
        <button class="btn ${localReady ? 'btn-gold-outline' : 'btn-primary'}" data-action="ready">${icon(localReady ? 'check' : 'fist', 15)} ${localReady ? 'Pronto — aguardando' : 'Estou pronto'}</button>
        ${isHost ? `<button class="btn btn-red" data-action="start" ${bothReady && state.remoteInfo ? '' : 'disabled'}>${icon('play', 15)} Iniciar luta</button>` : `<span class="tiny">${bothReady ? 'Aguardando o anfitrião iniciar…' : 'Marque pronto para o anfitrião liberar a luta.'}</span>`}
      </div>
      ${!state.remoteInfo ? `<div class="notice" style="margin-top:12px">${icon('link', 13)} ${state.public ? 'Aguardando um desafiante entrar na sala pública…' : 'Compartilhe o link acima. A luta começa quando o convidado marcar pronto.'}</div>` : ''}
      <div class="chat-panel">
        <div class="panel-head"><h3>Chat da sala</h3><span class="tiny">${state.messages.length} mensagens</span></div>
        <div class="chat-feed" data-chat-feed>${state.messages.map((m) => `<div class="msg ${m.mine ? 'mine' : ''}"><b>${m.mine ? 'Você' : esc(m.from)}:</b> ${esc(m.text)}</div>`).join('') || '<div class="msg">Envie uma mensagem para combinar a luta.</div>'}</div>
        <div class="chat-input-row">
          <input class="input" data-chat-input maxlength="180" placeholder="Mensagem..." value="${esc(state.chatText)}">
          <button class="btn btn-sm" data-action="chat">${icon('arrow', 13)} Enviar</button>
        </div>
      </div>
      <div class="mp-footnote">${icon('shield', 12)} O anfitrião simula a luta e envia snapshots ~15x/s; o convidado envia entradas. Sem servidor de jogo, sem simulação local de dois personagens. TG COIN é virtual.</div>`;
  };

  const bind = () => {
    content.querySelectorAll('[data-action]').forEach((btn) => {
      btn.addEventListener('click', () => action(btn.dataset.action, btn));
    });
    content.querySelectorAll('[data-wager]').forEach((btn) => {
      btn.addEventListener('click', () => setWager(Number(btn.dataset.wager)));
    });
    content.querySelector('[data-code]')?.addEventListener('input', (e) => { state.code = cleanCode(e.target.value); });
    content.querySelector('[data-code]')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') action('join-code'); });
    content.querySelector('[data-chat-input]')?.addEventListener('input', (e) => { state.chatText = e.target.value; });
    content.querySelector('[data-chat-input]')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); action('chat'); }
    });
    content.querySelector('[data-rounds]')?.addEventListener('change', (e) => {
      state.rounds = Number(e.target.value) || 3;
      sendMp(ui, { t: 'settings', rounds: state.rounds, arenaId: state.arenaId });
    });
    content.querySelector('[data-arena]')?.addEventListener('change', (e) => {
      if (ARENA_BY_ID[e.target.value]) state.arenaId = e.target.value;
      sendMp(ui, { t: 'settings', rounds: state.rounds, arenaId: state.arenaId });
    });
  };

  const setWager = (value) => {
    const maxCoins = state.localCoins ?? 0;
    const next = WAGERS.includes(value) && value <= maxCoins ? value : 0;
    if (state.role === 'host') state.hostWager = next;
    else state.guestWager = next;
    // Changing the wager un-readies the player so both sides confirm the new stake.
    if (state.role === 'host') state.hostReady = false;
    else state.guestReady = false;
    sendMp(ui, {
      t: 'ready', ready: false,
      wager: next,
      info: state.localInfo,
    });
    saveStateToMp();
    ui.app.audio.ui();
    paint();
  };

  const action = async (name, btn) => {
    if (name === 'create-private') return createPrivate();
    if (name === 'create-public') return createPublic();
    if (name === 'quick-match') return quickMatch();
    if (name === 'join-code') {
      const input = content.querySelector('[data-code]');
      const code = cleanCode(input?.value || state.code);
      if (!code) { ui.toast('Digite o código da sala.', 'error', 'link'); return; }
      return joinCode(code);
    }
    if (name === 'cancel') return resetToMenu();
    if (name === 'leave') {
      ui.confirm({
        title: 'Sair da sala?', message: 'A conexão com o adversário será encerrada.', danger: true, confirmLabel: 'Sair',
        onConfirm: () => resetToMenu(),
      });
      return;
    }
    if (name === 'copy') return copyInvite();
    if (name === 'ready') return toggleReady();
    if (name === 'start') return hostStart();
    if (name === 'chat') return sendChat();
    if (name === 'retry') return resetToMenu();
    return undefined;
  };

  const beginJoin = (role, label) => {
    state.busy = true;
    state.joining = true;
    state.error = '';
    setStatus('searching', label);
    const mp = createSession(role);
    saveStateToMp();
    paint();
    return mp;
  };

  const createPrivate = async () => {
    if (state.busy) return;
    beginJoin('host', 'Criando sala privada…');
    const mp = ui.mp;
    const code = randomRoomCode(6);
    try {
      await mp.session.hostPrivate({ code, localInfo: state.localInfo });
      state.role = 'host';
      state.code = code;
      state.public = false;
      state.phase = 'lobby';
      state.joining = false;
      state.busy = false;
      setStatus('waiting', 'Aguardando convidado');
      saveStateToMp();
      paint();
    } catch (err) {
      resetToMenu(err?.message || 'Não foi possível criar a sala.');
    }
  };

  const createPublic = async () => {
    if (state.busy) return;
    beginJoin('host', 'Abrindo sala pública…');
    const mp = ui.mp;
    try {
      const res = await mp.session.hostPublic({ localInfo: state.localInfo, slots: 8 });
      state.role = 'host';
      state.code = res.code;
      state.public = true;
      state.phase = 'lobby';
      state.joining = false;
      state.busy = false;
      setStatus('waiting', 'Sala pública aberta · aguardando');
      saveStateToMp();
      paint();
    } catch (err) {
      resetToMenu(err?.message || 'Não foi possível abrir a sala pública.');
    }
  };

  const quickMatch = async () => {
    if (state.busy) return;
    beginJoin('guest', 'Procurando salas públicas…');
    const mp = ui.mp;
    try {
      const res = await mp.session.joinPublic({ localInfo: state.localInfo, slots: 8 });
      state.role = 'guest';
      state.code = res.code;
      state.public = true;
      state.phase = 'lobby';
      state.joining = false;
      state.busy = false;
      setStatus('online', 'Conectado · aguardando anfitrião');
      saveStateToMp();
      paint();
    } catch (err) {
      resetToMenu(err?.message || 'Nenhuma sala pública encontrada.');
    }
  };

  const joinCode = async (code) => {
    if (state.busy) return;
    const clean = cleanCode(code);
    if (!clean) { ui.toast('Código inválido.', 'error', 'link'); return; }
    beginJoin('guest', `Entrando na sala ${clean}…`);
    const mp = ui.mp;
    try {
      await mp.session.joinByCode({ code: clean, localInfo: state.localInfo });
      state.role = 'guest';
      state.code = clean;
      state.public = isPublicCode(clean);
      state.phase = 'lobby';
      state.joining = false;
      state.busy = false;
      setStatus('online', 'Conectado · aguardando anfitrião');
      saveStateToMp();
      paint();
    } catch (err) {
      resetToMenu(err?.message || 'Não foi possível entrar. Confira o código.');
    }
  };

  const toggleReady = () => {
    const isHost = state.role === 'host';
    const next = !(isHost ? state.hostReady : state.guestReady);
    if (isHost) state.hostReady = next;
    else state.guestReady = next;
    sendMp(ui, {
      t: 'ready', ready: next,
      wager: isHost ? state.hostWager : state.guestWager,
      info: state.localInfo,
    });
    saveStateToMp();
    ui.app.audio.ui();
    paint();
    if (isHost && next && state.guestReady) ui.toast('Tudo pronto. Você já pode iniciar a luta.', 'success', 'check');
  };

  const copyInvite = async () => {
    const url = inviteUrl(state.code);
    try {
      await navigator.clipboard.writeText(url);
      ui.toast('Link de convite copiado!', 'success', 'copy');
    } catch {
      const input = content.querySelector('[data-invite]');
      input?.select();
      try { document.execCommand('copy'); ui.toast('Link copiado.', 'success', 'copy'); }
      catch { ui.toast('Copie o link manualmente.', 'info', 'link'); }
    }
  };

  const sendChat = () => {
    const input = content.querySelector('[data-chat-input]');
    const text = (input?.value || state.chatText || '').trim().slice(0, 180);
    if (!text) return;
    if (!sendMp(ui, { t: 'chat', text })) {
      ui.toast('Conexão indisponível.', 'error', 'wifiOff');
      return;
    }
    state.messages.push({ from: 'Você', text, mine: true });
    if (state.messages.length > 40) state.messages.shift();
    state.chatText = '';
    saveStateToMp();
    paint({ keepChat: true });
    content.querySelector('[data-chat-input]')?.focus();
  };

  const hostStart = () => {
    if (state.role !== 'host' || state.starting) return;
    if (!state.hostReady || !state.guestReady || !state.remoteInfo) {
      ui.toast('Os dois jogadores precisam estar prontos.', 'error', 'lock');
      return;
    }
    state.starting = true;
    const mp = ui.mp;
    const match = {
      matchId: 'mp-' + state.code + '-' + Date.now().toString(36),
      code: state.code,
      public: !!state.public,
      rounds: state.rounds,
      roundTime: 55,
      arenaId: state.arenaId,
      division: state.localInfo.division || 'middle',
      wager: Math.max(0, Math.min(500, state.hostWager || 0, state.guestWager || 0)),
      p1: sanitizeFighterInfo(state.localInfo),
      p2: sanitizeFighterInfo(state.remoteInfo),
      createdAt: new Date().toISOString(),
    };
    mp.match = match;
    sendMp(ui, { t: 'match', match });
    ui.app.audio.ui();
    launchFight();
  };

  const launchFight = () => {
    saveStateToMp();
    ui.mpKeep = true;
    ui.navigate('fight', { mode: 'multiplayer' });
  };

  el = h(`<div class="screen mp-screen">
    ${ui.topbar('multiplayer')}
    ${screenHead({
      kicker: 'Multiplayer online real', title: 'Arena online',
      sub: 'Salas privadas por link, partidas públicas, chat, revanche e sincronização P2P em tempo real. Cada jogador controla seu próprio lutador em seu dispositivo.',
      actions: `<span class="chip gold">${icon('wifi', 13)} WebRTC / PeerJS</span><span class="chip">${icon('globe', 13)} Convite por link</span>`,
    })}
    <div data-content></div>
    <div class="mp-disclaimer">${icon('shield', 12)} Conexão peer-to-peer (WebRTC). Redes muito restritivas podem bloquear o P2P. TG COIN e apostas são virtuais, sem valor real e sem conversão em dinheiro.</div>
  </div>`);

  content = el.querySelector('[data-content]');

  ui.onCleanup(() => {
    detach();
    if (!ui.mpKeep) closeMp(ui);
    ui.mpKeep = false;
  });

  if (rejoining) {
    detach = attachMp(ui, onNetEvent);
    if (existing.match && data.rematch) {
      // Returning from a fight: reset readiness so both sides confirm a rematch.
      state.hostReady = false;
      state.guestReady = false;
      state.starting = false;
      if (state.role === 'host') sendMp(ui, { t: 'ready', ready: false, wager: state.hostWager, info: state.localInfo });
    }
    paint();
  } else {
    paint();
    if (data.join) setTimeout(() => { if (state.phase === 'menu') joinCode(cleanCode(data.join)); }, 260);
  }

  return el;
}
