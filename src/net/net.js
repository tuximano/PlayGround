// Real peer-to-peer multiplayer over WebRTC (PeerJS signaling + data channels).
// Host is authoritative: it simulates the fight and broadcasts snapshots; the guest sends inputs.
import Peer from 'peerjs';

const PREFIX = 'tgboxing-v1';
const OPEN_PREFIX = 'tgboxing-v1-open';
const ICE = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:global.stun.twilio.com:3478' },
  ],
};

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function randomRoomCode(length = 6) {
  let out = '';
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  for (const b of bytes) out += CODE_ALPHABET[b % CODE_ALPHABET.length];
  return out;
}

export function cleanCode(code = '') {
  return String(code).toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 12);
}

export function isPublicCode(code = '') {
  return /^OPEN-\d+$/.test(cleanCode(code));
}

export function inviteUrl(code) {
  const url = new URL(location.href);
  url.search = '';
  url.searchParams.set('room', code);
  return url.toString();
}

export function simpleHash(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

export function matchReceipt({ matchId, p1, p2, wager, result }) {
  const base = `${matchId}|${p1}|${p2}|${wager}|${result?.winnerId}|${result?.method}|${result?.round}`;
  return simpleHash(base);
}

export class NetSession {
  constructor({ onEvent } = {}) {
    this.onEvent = onEvent || (() => {});
    this.role = null;
    this.peer = null;
    this.conn = null;
    this.code = null;
    this.hostPeerId = null;
    this.connected = false;
    this.destroyed = false;
    this.localInfo = null;
    this.remoteInfo = null;
    this.public = false;
    this.reconnectAttempts = 0;
    this.lastMessageAt = 0;
    this.heartbeat = null;
    this.everConnected = false;
    this.reconnectTimer = null;
  }

  emit(type, data = {}) {
    try { this.onEvent(type, data); } catch (err) { console.warn('net event', type, err); }
  }

  _peerOptions() {
    return { debug: 0, config: ICE };
  }

  async hostPrivate({ code, localInfo }) {
    this.role = 'host';
    this.public = false;
    this.code = cleanCode(code);
    this.localInfo = localInfo;
    return this._hostWithId(`${PREFIX}-p-${this.code}`);
  }

  async hostPublic({ localInfo, slots = 8 }) {
    this.role = 'host';
    this.public = true;
    this.localInfo = localInfo;
    const order = Array.from({ length: slots }, (_, i) => i).sort(() => Math.random() - 0.5);
    for (const slot of order) {
      try {
        const peerId = `${OPEN_PREFIX}-${slot}`;
        await this._hostWithId(peerId);
        this.code = `OPEN-${slot}`;
        this.public = true;
        this.emit('room', { code: this.code, public: true, peerId });
        return { code: this.code, public: true };
      } catch (err) {
        if (this.destroyed) throw err;
        // Slot busy: try another one.
      }
    }
    throw new Error('Não há salas públicas livres agora. Crie uma sala privada.');
  }

  _hostWithId(peerId) {
    return new Promise((resolve, reject) => {
      if (this.peer) { try { this.peer.destroy(); } catch {} }
      const peer = new Peer(peerId, this._peerOptions());
      this.peer = peer;
      let settled = false;
      const fail = (err) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        try { peer.destroy(); } catch {}
        reject(err instanceof Error ? err : new Error(err?.message || 'Falha ao criar sala'));
      };
      const timer = setTimeout(() => fail(new Error('Tempo esgotado ao conectar ao servidor de salas.')), 15000);
      peer.on('open', (id) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        this.hostPeerId = id;
        this.emit('room', { code: this.code, public: this.public, peerId: id });
        resolve(id);
      });
      peer.on('connection', (conn) => this._bindConnection(conn));
      peer.on('error', (err) => {
        if (!settled) fail(err);
        else this._handlePeerError(err);
      });
      peer.on('disconnected', () => {
        if (this.destroyed) return;
        this.emit('status', { state: 'reconnecting', label: 'Reconectando ao servidor...' });
        setTimeout(() => {
          if (this.destroyed) return;
          try { this.peer?.reconnect(); } catch {}
        }, 1400);
      });
      peer.on('close', () => this.emit('closed', {}));
    });
  }

  async joinPrivate({ code, localInfo }) {
    this.role = 'guest';
    this.public = false;
    this.code = cleanCode(code);
    this.localInfo = localInfo;
    this.hostPeerId = `${PREFIX}-p-${this.code}`;
    await this._createGuestPeer();
    await this._connectToHost(10000);
    this.emit('room', { code: this.code, public: false, hostPeerId: this.hostPeerId });
    return { code: this.code };
  }

  async joinPublicSlot({ code, localInfo }) {
    const cleaned = cleanCode(code);
    const match = /^OPEN-(\d+)$/.exec(cleaned);
    if (!match) throw new Error('Código de sala pública inválido.');
    const slot = Number(match[1]);
    this.role = 'guest';
    this.public = true;
    this.localInfo = localInfo;
    this.emit('status', { state: 'searching', label: `Entrando na sala pública ${cleaned}...` });
    const winner = await this._probePublicSlot(slot);
    this.peer = winner.peer;
    this.code = cleaned;
    this.hostPeerId = `${OPEN_PREFIX}-${slot}`;
    this._attachPeerEvents();
    this._bindConnection(winner.conn);
    this.emit('room', { code: this.code, public: true, hostPeerId: this.hostPeerId });
    return { code: this.code, slot };
  }

  async joinByCode({ code, localInfo }) {
    return isPublicCode(code)
      ? this.joinPublicSlot({ code, localInfo })
      : this.joinPrivate({ code, localInfo });
  }

  async joinPublic({ localInfo, slots = 8 }) {
    this.role = 'guest';
    this.public = true;
    this.localInfo = localInfo;
    this.emit('status', { state: 'searching', label: 'Procurando salas públicas...' });
    const attempts = [];
    for (let slot = 0; slot < slots; slot++) attempts.push(this._probePublicSlot(slot));
    const winner = await new Promise((resolve, reject) => {
      let remaining = attempts.length;
      let settled = false;
      attempts.forEach((p) => p.then((res) => {
        if (settled) { try { res.peer.destroy(); } catch {} return; }
        settled = true;
        resolve(res);
      }).catch(() => {
        remaining--;
        if (remaining === 0 && !settled) reject(new Error('Nenhuma sala pública encontrada. Crie uma sala e convide um amigo.'));
      }));
    });
    this.peer = winner.peer;
    this.code = `OPEN-${winner.slot}`;
    this.hostPeerId = `${OPEN_PREFIX}-${winner.slot}`;
    this._attachPeerEvents();
    this._bindConnection(winner.conn);
    this.emit('room', { code: this.code, public: true, hostPeerId: this.hostPeerId });
    return { code: this.code, slot: winner.slot };
  }

  _probePublicSlot(slot) {
    return new Promise((resolve, reject) => {
      const peer = new Peer(this._peerOptions());
      let settled = false;
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        try { peer.destroy(); } catch {}
        reject(new Error('timeout'));
      }, 3400);
      peer.on('open', () => {
        if (settled) return;
        const conn = peer.connect(`${OPEN_PREFIX}-${slot}`, { reliable: true, serialization: 'json' });
        conn.on('open', () => {
          if (settled) { try { conn.close(); peer.destroy(); } catch {} return; }
          settled = true;
          clearTimeout(timer);
          resolve({ peer, conn, slot });
        });
        conn.on('error', () => {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          try { peer.destroy(); } catch {}
          reject(new Error('slot busy'));
        });
      });
      peer.on('error', () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        try { peer.destroy(); } catch {}
        reject(new Error('slot unavailable'));
      });
    });
  }

  async _createGuestPeer() {
    return new Promise((resolve, reject) => {
      const peer = new Peer(this._peerOptions());
      this.peer = peer;
      this._attachPeerEvents();
      let settled = false;
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        try { peer.destroy(); } catch {}
        reject(new Error('Tempo esgotado ao conectar ao servidor de salas.'));
      }, 15000);
      peer.on('open', () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(peer);
      });
      peer.on('error', (err) => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          reject(err instanceof Error ? err : new Error(err?.type || 'Falha de conexão'));
        } else this._handlePeerError(err);
      });
    });
  }

  _attachPeerEvents() {
    if (!this.peer) return;
    this.peer.on('disconnected', () => {
      if (this.destroyed) return;
      this.emit('status', { state: 'reconnecting', label: 'Reconectando...' });
      setTimeout(() => {
        if (this.destroyed) return;
        try { this.peer?.reconnect(); } catch {}
        if (this.role === 'guest') this._scheduleReconnect();
      }, 1200);
    });
    this.peer.on('error', (err) => this._handlePeerError(err));
    this.peer.on('close', () => this.emit('closed', {}));
  }

  _connectToHost(timeout = 8000) {
    return new Promise((resolve, reject) => {
      if (!this.peer) return reject(new Error('Sem conexão de sinalização.'));
      let settled = false;
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        reject(new Error('O anfitrião não respondeu. Verifique o código e tente novamente.'));
      }, timeout);
      const conn = this.peer.connect(this.hostPeerId, { reliable: true, serialization: 'json' });
      conn.on('open', () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        this._bindConnection(conn);
        resolve(conn);
      });
      conn.on('error', (err) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        reject(new Error('Não foi possível entrar na sala. O código expirou?'));
      });
    });
  }

  _bindConnection(conn) {
    if (this.conn && this.conn !== conn) {
      if (this.role === 'host') {
        // Keep the active guest. If the previous channel is dead, accept a reconnection.
        if (this.connected) {
          try { conn.close(); } catch {}
          this.emit('notice', { message: 'Uma segunda conexão tentou entrar. Sala já ocupada.' });
          return;
        }
        try { this.conn.close(); } catch {}
      }
    }
    this.conn = conn;
    const onOpen = () => {
      if (this.conn !== conn) return;
      const resumed = this.everConnected;
      this.connected = true;
      this.everConnected = true;
      this.lastMessageAt = Date.now();
      this.reconnectAttempts = 0;
      if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); this.reconnectTimer = null; }
      this._startHeartbeat();
      this.emit('connected', { role: this.role, resumed });
      if (this.role === 'guest' && this.localInfo) {
        this.send({ t: 'hello', ...this.localInfo, resume: resumed });
      }
    };
    conn.on('open', onOpen);
    // PeerJS may have opened the channel before this handler was attached.
    if (conn.open) queueMicrotask(onOpen);
    conn.on('data', (data) => this._onData(data));
    conn.on('close', () => {
      if (this.conn !== conn) return;
      this.connected = false;
      this._stopHeartbeat();
      this.emit('disconnected', { role: this.role });
      if (this.role === 'guest' && !this.destroyed) this._scheduleReconnect();
    });
    conn.on('error', () => {
      this.emit('status', { state: 'error', label: 'Erro na conexão P2P.' });
    });
  }

  _scheduleReconnect() {
    if (this.destroyed || this.role !== 'guest' || this.reconnectTimer) return;
    if (this.reconnectAttempts >= 6) {
      this.emit('status', { state: 'offline', label: 'Conexão perdida. Volte ao lobby.' });
      return;
    }
    this.reconnectAttempts++;
    const attempt = this.reconnectAttempts;
    this.emit('status', { state: 'reconnecting', label: `Reconectando... tentativa ${attempt}/6` });
    this.reconnectTimer = setTimeout(async () => {
      this.reconnectTimer = null;
      if (this.destroyed || this.connected) return;
      try {
        if (this.peer?.disconnected) this.peer.reconnect();
        await this._connectToHost(6000);
        this.emit('reconnected', { attempts: attempt });
      } catch (err) {
        this._scheduleReconnect();
      }
    }, 900 + attempt * 500);
  }

  _onData(data) {
    if (!data || typeof data !== 'object') return;
    this.lastMessageAt = Date.now();
    if (data.t === 'hello' && this.role === 'host') {
      this.remoteInfo = data;
      this.emit('hello', data);
      return;
    }
    if (data.t === 'welcome' && this.role === 'guest') {
      this.remoteInfo = data.host || data;
      this.emit('welcome', data);
      return;
    }
    this.emit('message', data);
    if (data.t) this.emit(data.t, data);
  }

  send(message) {
    if (!this.conn?.open) return false;
    try {
      this.conn.send(message);
      return true;
    } catch (err) {
      console.warn('send failed', err);
      return false;
    }
  }

  _startHeartbeat() {
    this._stopHeartbeat();
    this.heartbeat = setInterval(() => {
      if (!this.connected) return;
      if (this.role === 'guest') {
        this.send({ t: 'ping', ts: Date.now() });
        if (Date.now() - this.lastMessageAt > 12000) {
          this.emit('status', { state: 'reconnecting', label: 'Conexão instável...' });
        }
      } else {
        this.send({ t: 'ping', ts: Date.now(), host: true });
      }
    }, 2500);
  }

  _stopHeartbeat() {
    if (this.heartbeat) clearInterval(this.heartbeat);
    this.heartbeat = null;
  }

  _handlePeerError(err) {
    const type = err?.type || '';
    let message = err?.message || 'Erro de conexão.';
    if (type === 'unavailable-id') message = 'Este código de sala já está em uso. Gere outro.';
    else if (type === 'peer-unavailable') message = 'Sala não encontrada. Confira o código ou o link.';
    else if (type === 'network') message = 'Falha de rede no servidor de salas. Verifique sua internet.';
    else if (type === 'server-error') message = 'Servidor de sinalização indisponível. Tente novamente.';
    else if (type === 'browser-incompatible') message = 'Seu navegador não suporta WebRTC.';
    this.emit('error', { type, message });
  }

  destroy() {
    this.destroyed = true;
    this._stopHeartbeat();
    try { this.conn?.close(); } catch {}
    try { this.peer?.destroy(); } catch {}
    this.conn = null;
    this.peer = null;
    this.connected = false;
  }
}
