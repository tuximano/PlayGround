import { isTouchDevice } from './config.js';

// ─────────────────────────────────────────────────────────────────────────────
// Input is polled, never event-driven in the simulation. A short-lived
// `pressed` set gives us one-shot actions (jump, reload) without losing inputs
// between fixed physics steps.
// ─────────────────────────────────────────────────────────────────────────────
export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.keys = new Set();
    this.pressed = new Set();
    this.lookX = 0;
    this.lookY = 0;
    this.fireHeld = false;
    this.firePressed = false;
    this.locked = false;
    this.enabled = false;
    this.touch = isTouchDevice();
    this.stick = { x: 0, y: 0 };
    this.touchActions = { sprint: false, slide: false, jump: false, fire: false };
    this.onLockChange = null;
    this.onFirstInteraction = null;

    this._bindKeyboard();
    this._bindMouse();
    if (this.touch) this._bindTouch();
  }

  _bindKeyboard() {
    addEventListener('keydown', (e) => {
      if (['Space', 'ShiftLeft', 'ControlLeft', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'Tab'].includes(e.code)) {
        e.preventDefault();
      }
      if (!e.repeat) {
        this.pressed.add(e.code);
        if (this.onFirstInteraction) this.onFirstInteraction();
      }
      this.keys.add(e.code);
    }, { passive: false });

    addEventListener('keyup', (e) => this.keys.delete(e.code));

    addEventListener('blur', () => {
      this.keys.clear();
      this.fireHeld = false;
      this.lookX = this.lookY = 0;
    });
  }

  _bindMouse() {
    this.canvas.addEventListener('mousedown', (e) => {
      if (!this.enabled) return;
      if (e.button === 0) {
        this.fireHeld = true;
        this.firePressed = true;
        if (!this.locked && !this.touch) this.requestLock();
      }
      if (this.onFirstInteraction) this.onFirstInteraction();
    });

    addEventListener('mouseup', (e) => {
      if (e.button === 0) this.fireHeld = false;
    });

    addEventListener('contextmenu', (e) => e.preventDefault());

    addEventListener('mousemove', (e) => {
      if (!this.locked || !this.enabled) return;
      // Clamp insane high-DPI spikes so one frame can never snap the camera.
      this.lookX += Math.max(-160, Math.min(160, e.movementX));
      this.lookY += Math.max(-160, Math.min(160, e.movementY));
    });

    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === this.canvas;
      if (this.onLockChange) this.onLockChange(this.locked);
    });
  }

  _bindTouch() {
    const stickBase = document.getElementById('stickBase');
    const stickKnob = document.getElementById('stickKnob');
    const bindHold = (id, key) => {
      const el = document.getElementById(id);
      if (!el) return;
      const down = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.touchActions[key] = true;
        if (key === 'jump') this.pressed.add('Space');
        if (key === 'fire') { this.firePressed = true; this.fireHeld = true; }
        el.classList.add('is-down');
        el.setPointerCapture?.(e.pointerId);
        this.onFirstInteraction?.();
      };
      const up = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.touchActions[key] = false;
        if (key === 'fire') this.fireHeld = false;
        el.classList.remove('is-down');
      };
      el.addEventListener('pointerdown', down);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
      el.addEventListener('lostpointercapture', up);
    };

    bindHold('touchSprint', 'sprint');
    bindHold('touchSlide', 'slide');
    bindHold('touchJump', 'jump');
    bindHold('touchFire', 'fire');

    // Touch stick: a fixed base is more reliable than a floating joystick.
    let stickPointer = null;
    const moveStick = (e) => {
      const rect = stickBase.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const max = rect.width * 0.34;
      let dx = e.clientX - cx;
      let dy = e.clientY - cy;
      const len = Math.hypot(dx, dy) || 1;
      const scale = Math.min(1, max / len);
      dx *= scale; dy *= scale;
      this.stick.x = dx / max;
      this.stick.y = -dy / max;
      stickKnob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    };
    const endStick = (e) => {
      if (stickPointer !== e.pointerId) return;
      stickPointer = null;
      this.stick.x = this.stick.y = 0;
      stickKnob.style.transform = 'translate(-50%,-50%)';
    };
    stickBase.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      stickPointer = e.pointerId;
      stickBase.setPointerCapture?.(e.pointerId);
      moveStick(e);
      this.onFirstInteraction?.();
    });
    stickBase.addEventListener('pointermove', (e) => {
      if (e.pointerId === stickPointer) { e.preventDefault(); moveStick(e); }
    });
    stickBase.addEventListener('pointerup', endStick);
    stickBase.addEventListener('pointercancel', endStick);

    // Look drag on the canvas. It ignores controls because they stopPropagation.
    let lookPointer = null;
    let lastX = 0, lastY = 0;
    this.canvas.addEventListener('pointerdown', (e) => {
      if (!this.enabled) return;
      lookPointer = e.pointerId;
      lastX = e.clientX; lastY = e.clientY;
      this.canvas.setPointerCapture?.(e.pointerId);
    });
    this.canvas.addEventListener('pointermove', (e) => {
      if (e.pointerId !== lookPointer || !this.enabled) return;
      this.lookX += (e.clientX - lastX) * 1.5;
      this.lookY += (e.clientY - lastY) * 1.5;
      lastX = e.clientX; lastY = e.clientY;
    });
    const endLook = (e) => { if (e.pointerId === lookPointer) lookPointer = null; };
    this.canvas.addEventListener('pointerup', endLook);
    this.canvas.addEventListener('pointercancel', endLook);
  }

  requestLock() {
    if (this.touch || !this.enabled) return;
    try {
      const promise = this.canvas.requestPointerLock({ unadjustedMovement: true });
      promise?.catch?.(() => this.canvas.requestPointerLock());
    } catch {
      this.canvas.requestPointerLock?.();
    }
  }

  get moveX() {
    let x = 0;
    if (this.keys.has('KeyD')) x += 1;
    if (this.keys.has('KeyA')) x -= 1;
    if (this.touch) x += this.stick.x;
    return Math.max(-1, Math.min(1, x));
  }

  get moveY() {
    let y = 0;
    if (this.keys.has('KeyW')) y += 1;
    if (this.keys.has('KeyS')) y -= 1;
    if (this.touch) y += this.stick.y;
    return Math.max(-1, Math.min(1, y));
  }

  get sprintHeld() {
    return this.keys.has('ShiftLeft') || this.keys.has('ShiftRight') || this.touchActions.sprint ||
      (this.touch && this.stick.y > 0.86);
  }

  get crouchHeld() {
    return this.keys.has('ControlLeft') || this.keys.has('ControlRight') ||
      this.keys.has('KeyC') || this.touchActions.slide;
  }

  get jumpHeld() {
    return this.keys.has('Space') || this.touchActions.jump;
  }

  get reloadPressed() { return this.pressed.has('KeyR'); }
  get jumpPressed() { return this.pressed.has('Space'); }

  consumeLook(out) {
    out.x = this.lookX;
    out.y = this.lookY;
    this.lookX = 0;
    this.lookY = 0;
    return out;
  }

  endFrame() {
    this.pressed.clear();
    this.firePressed = false;
  }
}
