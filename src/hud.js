// ─────────────────────────────────────────────────────────────────────────────
// Thin DOM HUD. It only touches text nodes when values actually change, so the
// hot loop costs a handful of comparisons in the common case.
// ─────────────────────────────────────────────────────────────────────────────
export class HUD {
  constructor() {
    this.el = {
      start: document.getElementById('startScreen'),
      hud: document.getElementById('hud'),
      touch: document.getElementById('touchControls'),
      loading: document.getElementById('loading'),
      speed: document.getElementById('speed'),
      speedFill: document.getElementById('speedFill'),
      score: document.getElementById('score'),
      timer: document.getElementById('timer'),
      targetCount: document.getElementById('targetCount'),
      chipSprint: document.getElementById('chipSprint'),
      chipSlide: document.getElementById('chipSlide'),
      chipAir: document.getElementById('chipAir'),
      chipBhop: document.getElementById('chipBhop'),
      chipMantle: document.getElementById('chipMantle'),
      ammo: document.getElementById('ammo'),
      ammoFill: document.getElementById('ammoFill'),
      reload: document.getElementById('reloadLabel'),
      hitmarker: document.getElementById('hitmarker'),
      reticle: document.getElementById('reticleState'),
      compass: document.getElementById('compassDir'),
      mini: document.getElementById('miniPlayer'),
      feed: document.getElementById('eventFeed'),
      toast: document.getElementById('toast'),
      focus: document.getElementById('focusHint'),
    };
    this.last = {};
    this._toastTimer = 0;
    this._feed = 0;
    this.reloadIdle = (matchMedia('(max-width: 900px)').matches || matchMedia('(pointer: coarse)').matches)
      ? 'RECARGA AUTOMÁTICA'
      : 'R — RECARREGAR';
    this._buildTicker();
  }

  _buildTicker() {
    const ticks = document.createElement('div');
    ticks.className = 'compass-ticks';
    this.el.compass.parentElement?.appendChild(ticks);
  }

  hideLoading() {
    this.el.loading.classList.add('is-out');
  }

  start(touch) {
    this.el.start.classList.add('is-out');
    this.el.hud.classList.remove('is-hidden');
    if (touch) this.el.touch.classList.remove('is-hidden');
    else this.el.touch.classList.add('is-hidden');
    document.body.classList.add('playing');
  }

  setLocked(locked) {
    this.el.focus.classList.toggle('hide', locked);
  }

  // ── Per-frame readout ──────────────────────────────────────────────────────
  update(player, dt) {
    const speed = player.horizontalSpeed;
    const speedText = speed.toFixed(1).padStart(4, '0');
    if (speedText !== this.last.speed) {
      this.el.speed.textContent = speedText;
      this.last.speed = speedText;
    }
    this.el.speedFill.style.width = `${Math.min(100, speed / 22.5 * 100)}%`;

    bodyState('is-fast', speed > 12.2);
    bodyState('is-sliding', player.sliding);
    bodyState('is-firing', player._firing || false);

    this.el.chipSprint.classList.toggle('on', player.sprinting);
    this.el.chipSlide.classList.toggle('on', player.sliding);
    this.el.chipAir.classList.toggle('on', player.airborne);
    this.el.chipBhop.classList.toggle('on', player.grounded && speed > 13.2);
    this.el.chipMantle.classList.toggle('on', player.mantling);

    let state = 'PRONTO';
    if (player.mantling) state = 'MANTLE';
    else if (player.sliding) state = 'SLIDE INFINITO';
    else if (player.airborne) state = speed > 12 ? 'AIR STRAFE' : 'NO AR';
    else if (player.sprinting) state = 'SPRINT';
    else if (speed > 1) state = 'EM MOVIMENTO';
    if (state !== this.last.state) { this.el.reticle.textContent = state; this.last.state = state; }

    const heading = ((-player.yaw * 180 / Math.PI) % 360 + 360) % 360;
    const dirs = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'];
    const dir = dirs[Math.round(heading / 45) % 8];
    if (dir !== this.last.dir) { this.el.compass.textContent = dir; this.last.dir = dir; }
    this.el.mini.style.transform = `translate(-50%,-50%) rotate(${-player.yaw}rad)`;

    // Speed-reactive lens: not a filter, just a CSS overlay.
    const lens = document.querySelector('.speedlines');
    if (lens) lens.style.opacity = speed > 13.5 ? `${Math.min(.75, (speed - 13.5) / 7 + .2)}` : '0';
  }

  setAmmo(ammo, reloadProgress) {
    if (ammo !== this.last.ammo) {
      this.el.ammo.textContent = String(ammo).padStart(2, '0');
      this.el.ammoFill.style.width = `${Math.max(0, ammo / 30 * 100)}%`;
      this.el.ammoFill.style.background = ammo <= 7 ? 'var(--orange)' : 'var(--paper)';
      this.last.ammo = ammo;
    }
    if (reloadProgress >= 0) {
      const pct = Math.round(reloadProgress * 100);
      const txt = `RECARREGANDO ${String(pct).padStart(2, '0')}%`;
      if (txt !== this.last.reload) { this.el.reload.textContent = txt; this.last.reload = txt; }
      this.el.reload.classList.add('is-reloading');
    } else {
      if (this.last.reload !== 'idle') {
        this.el.reload.textContent = this.reloadIdle;
        this.el.reload.classList.remove('is-reloading');
        this.last.reload = 'idle';
      }
    }
  }

  setReload(active) {
    if (!active) this.el.reload.classList.remove('is-reloading');
  }

  setScore(score, kills, seconds) {
    const ss = String(score).padStart(4, '0');
    if (ss !== this.last.score) { this.el.score.textContent = ss; this.last.score = ss; }
    const kk = String(kills).padStart(2, '0');
    if (kk !== this.last.kills) { this.el.targetCount.textContent = kk; this.last.kills = kk; }
    const t = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
    if (t !== this.last.timer) { this.el.timer.textContent = t; this.last.timer = t; }
  }

  hit(head, kill) {
    const h = this.el.hitmarker;
    h.classList.remove('show', 'kill');
    // Force a reflow so consecutive shots retrigger the CSS animation.
    void h.offsetWidth;
    if (kill) h.classList.add('kill');
    h.classList.add('show');
    if (kill) this.toast(head ? 'HEADSHOT <b>+250</b>' : 'ALVO NEUTRALIZADO <b>+100</b>', 900);
    else if (head) this.toast('HEADSHOT', 500);
  }

  kill(head, points, total) {
    this.pushEvent(head ? 'HEADSHOT' : 'ALVO NEUTRALIZADO', `+${points}`, total);
    if (total === 9) {
      setTimeout(() => this.toast('DRILL COMPLETO <b>// 09 ALVOS</b>', 2600), 700);
    }
  }

  pushEvent(label, value = '', n = null) {
    const div = document.createElement('div');
    div.className = 'event';
    div.innerHTML = `${n !== null ? `<i>#${String(n).padStart(2, '0')}</i>` : ''}<span>${label}</span>${value ? `<b>${value}</b>` : ''}`;
    this.el.feed.appendChild(div);
    while (this.el.feed.children.length > 5) this.el.feed.firstChild.remove();
    this._feed++;
    setTimeout(() => { div.style.opacity = '0'; div.style.transition = 'opacity .3s'; setTimeout(() => div.remove(), 320); }, 2800);
  }

  toast(html, ms = 900) {
    const t = this.el.toast;
    t.innerHTML = html;
    t.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => t.classList.remove('show'), ms);
  }

  flashDamage() {
    // Reserved for future enemies; kept here so the HUD remains self-contained.
    document.body.animate?.(
      [{ boxShadow: 'inset 0 0 0 rgba(255,40,20,0)' }, { boxShadow: 'inset 0 0 120px rgba(255,40,20,.55)' }, { boxShadow: 'inset 0 0 0 rgba(255,40,20,0)' }],
      { duration: 280, easing: 'ease-out' }
    );
  }
}

function bodyState(cls, on) {
  if (document.body.classList.contains(cls) !== on) document.body.classList.toggle(cls, on);
}
