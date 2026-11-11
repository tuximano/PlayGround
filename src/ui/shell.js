// UI shell: screen routing, persistent top bar, toasts, modals and lifecycle.
import { icon } from './icons.js';
import { esc, fmtNum, initials, recordText, h, divisionName } from './helpers.js';
import { persist, bus } from '../core/store.js';

const NAV = [
  { id: 'career', label: 'Carreira', icon: 'crown' },
  { id: 'rankings', label: 'Rankings', icon: 'chart' },
  { id: 'news', label: 'Notícias', icon: 'news' },
  { id: 'shop', label: 'Loja TG', icon: 'shop' },
  { id: 'gym', label: 'Academia', icon: 'gym' },
  { id: 'multiplayer', label: 'Online', icon: 'wifi' },
  { id: 'stats', label: 'Estatísticas', icon: 'stats' },
];

export class UI {
  constructor(app) {
    this.app = app;
    this.save = app.save;
    this.universe = app.universe;
    this.screens = {};
    this.current = { name: 'menu', data: {} };
    this.cleanups = [];
    this.root = document.getElementById('ui-root');
    this.toastStack = document.getElementById('toast-stack');
    this.modalEl = null;
    this.draft = null;
    this.locked = false;
    this.lastBackground = null;
    this.onResize = null;
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalEl) this.closeModal();
    });
  }

  addScreen(name, fn) {
    this.screens[name] = fn;
    return this;
  }

  onCleanup(fn) {
    if (typeof fn === 'function') this.cleanups.push(fn);
  }

  runCleanups() {
    for (const fn of this.cleanups.splice(0)) {
      try { fn(); } catch (err) { console.warn('cleanup', err); }
    }
  }

  start() {
    this.navigate('menu');
  }

  goMenu() {
    this.navigate('menu');
  }

  ensureBackground(name) {
    const app = this.app;
    if (name === 'fight') return;
    if (name === 'editor' || name === 'create') {
      app.showEditor(this.draft?.appearance || app.save?.profile?.appearance || app.defaultAppearance());
      this.lastBackground = 'studio';
      return;
    }
    if (name === 'gym') {
      app.showGym();
      this.lastBackground = 'gym';
      return;
    }
    if (this.lastBackground !== 'showcase') {
      app.showMenu();
      this.lastBackground = 'showcase';
    }
  }

  navigate(name, data = {}) {
    const screen = this.screens[name];
    if (!screen) {
      console.warn('Unknown screen', name);
      return;
    }
    this.runCleanups();
    this.closeModal();
    this.current = { name, data };
    this.locked = false;
    if (document.activeElement?.blur) document.activeElement.blur();
    this.ensureBackground(name);
    this.root.innerHTML = '';
    this.app.audio.setScene(name === 'menu' || name === 'career' || name === 'rankings' || name === 'news' || name === 'shop' || name === 'stats' ? 'menu' : name === 'gym' ? 'gym' : name === 'editor' ? 'editor' : 'menu');
    let el;
    try {
      el = screen(this, data);
    } catch (err) {
      console.error('Screen render failed', name, err);
      el = h(`<div class="screen plain"><div class="empty-state"><b>Erro ao abrir a tela</b><p>${esc(err?.message || err)}</p><button class="btn btn-primary" data-nav="menu">Voltar ao menu</button></div></div>`);
    }
    if (el) this.root.appendChild(el);
    this.bindTopbar();
    this.root.querySelectorAll('[data-nav]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = btn.dataset.nav;
        if (target && target !== this.current.name) this.navigate(target);
      });
    });
    if (this.current.name === name) this.app.save = this.save;
  }

  refresh({ scroll = 'reset' } = {}) {
    const top = scroll === 'reset' ? 0 : this.root.querySelector('.screen')?.scrollTop || 0;
    this.navigate(this.current.name, this.current.data);
    if (scroll === 'keep') requestAnimationFrame(() => {
      const el = this.root.querySelector('.screen');
      if (el) el.scrollTop = top;
    });
  }

  topbar(active, extra = '') {
    const save = this.save;
    const profile = save?.profile;
    const career = save?.career;
    const name = profile?.name || 'Visitante';
    const division = profile?.division ? divisionName(profile.division) : 'Sem carreira';
    return `<header class="topbar">
      <button class="brand-mini" data-nav="menu" aria-label="Menu principal">
        <span class="brand-mark">TG</span>
        <span class="brand-text"><b>TG BOXING</b><span>The Glory of Champions</span></span>
      </button>
      <nav class="topnav" aria-label="Navegação principal">
        ${NAV.map((n) => `<button data-nav="${n.id}" class="${active === n.id ? 'active' : ''}">${icon(n.icon, 15)} ${n.label}</button>`).join('')}
      </nav>
      <div class="userbar">
        ${career ? `<div class="wallet">
          <span class="chip gold" title="TG COIN (moeda virtual)">${icon('coin', 14)} ${fmtNum(career.coins)}</span>
          <span class="chip" title="Carteira da carreira">${icon('coin', 13)} C$ ${fmtNum(career.money)}</span>
        </div>` : ''}
        ${extra}
        <button class="sound-toggle" data-action="toggle-sound" title="Som">${icon(this.audioMuted ? 'volume' : 'volume', 17)}</button>
        <button class="profile-pill" data-nav="${save ? 'career' : 'create'}">
          <span class="avatar">${initials(name)}</span>
          <span><b>${esc(name)}</b><small>${save ? `${recordText(career.record)} · ${esc(division)}` : 'Crie seu lutador'}</small></span>
        </button>
      </div>
    </header>`;
  }

  bindTopbar(root = this.root) {
    const sound = root.querySelector('[data-action="toggle-sound"]');
    if (sound) {
      sound.addEventListener('click', () => {
        this.audioMuted = !this.audioMuted;
        if (this.app.audio.master) this.app.audio.master.gain.value = this.audioMuted ? 0 : 0.9;
        this.toast(this.audioMuted ? 'Som silenciado' : 'Som ativado', 'info', this.audioMuted ? 'volume' : 'music');
      });
    }
  }

  saveNow() {
    persist(this.save, true);
    this.toast('Jogo salvo', 'success', 'check');
  }

  toast(textOrObj, type = 'info', iconName = '') {
    if (!this.toastStack) return;
    const payload = typeof textOrObj === 'string' ? { text: textOrObj, type, icon: iconName } : (textOrObj || {});
    const el = document.createElement('div');
    el.className = `toast ${payload.type || ''}`;
    el.innerHTML = `${payload.icon ? icon(payload.icon, 17) : ''}<span>${esc(payload.text || '')}</span>`;
    this.toastStack.appendChild(el);
    setTimeout(() => {
      el.classList.add('out');
      setTimeout(() => el.remove(), 320);
    }, payload.type === 'achievement' ? 4200 : 2600);
  }

  modal({ title = '', body = '', actions = [], wide = false, onClose = null, className = '' } = {}) {
    this.closeModal();
    const back = document.createElement('div');
    back.className = 'modal-backdrop';
    back.innerHTML = `<div class="modal ${wide ? 'wide' : ''} ${className}">
      <h2>${title}</h2>
      <div class="modal-body">${body}</div>
      <div class="modal-actions">${actions.map((a, i) => `<button class="btn ${a.cls || ''}" data-i="${i}">${a.label}</button>`).join('')}</div>
    </div>`;
    back.addEventListener('click', (e) => {
      if (e.target === back) this.closeModal(onClose);
    });
    back.querySelectorAll('.modal-actions [data-i]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = actions[Number(btn.dataset.i)];
        if (!action) return;
        if (action.keepOpen) {
          action.onClick?.(back);
          return;
        }
        this.closeModal();
        action.onClick?.(back);
      });
    });
    this.root.appendChild(back);
    this.modalEl = { back, onClose };
    return back;
  }

  closeModal(onClose = null) {
    if (!this.modalEl) return;
    const cb = onClose || this.modalEl.onClose;
    this.modalEl.back.remove();
    this.modalEl = null;
    if (cb) {
      try { cb(); } catch (err) { console.warn(err); }
    }
  }

  confirm({ title = 'Confirmar', message = '', confirmLabel = 'Confirmar', danger = false, onConfirm = null, cancelLabel = 'Cancelar' } = {}) {
    return this.modal({
      title,
      body: `<p>${message}</p>`,
      actions: [
        { label: cancelLabel, cls: 'btn-ghost' },
        { label: confirmLabel, cls: danger ? 'btn-red' : 'btn-primary', onClick: onConfirm },
      ],
    });
  }

  notify(text, type = 'info', iconName = '') {
    this.toast({ text, type, icon: iconName });
  }

  get hasCareer() {
    return !!this.save?.profile?.created;
  }
}

export function attachBusToasts(ui) {
  bus.on('toast', (payload) => ui.toast(payload));
  bus.on('achievement', (ach) => {
    if (ach) ui.toast({ text: `Conquista desbloqueada: ${ach.name}`, type: 'achievement', icon: ach.icon });
  });
}
