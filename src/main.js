import * as THREE from 'three';
import { CONFIG, isTouchDevice } from './config.js';
import { Input } from './input.js';
import { HUD } from './hud.js';
import { AudioEngine } from './audio.js';
import { buildWorld } from './world.js';
import { PlayerController } from './player.js';
import { Weapon } from './weapon.js';
import { Combat } from './combat.js';

// ─────────────────────────────────────────────────────────────────────────────
// COMBAT//SHIFT — arena de movimento
// Fixed 120 Hz simulation, render-rate-independent animation, instant input.
// ─────────────────────────────────────────────────────────────────────────────
const STEP = 1 / 120;

class Game {
  constructor() {
    this.canvas = document.getElementById('game');
    this.started = false;
    this.startTime = 0;
    this.gameTime = 0;
    this.accumulator = 0;
    this.clock = new THREE.Clock();
    this.stepDistance = 0;
    this.muted = false;
    this.introTime = 0;

    this._initRenderer();
    this._initScene();
    this._initInput();
    this._initGame();
    this._bindUI();
    this._bindResize();

    this.hud.hideLoading();
    this.renderer.setAnimationLoop(() => this._frame());
    this._exposeDebug();
  }

  _initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      alpha: false,
    });
    const gl = this.renderer.getContext();
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const gpuName = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : '';
    // Software rasterisers (CI, SwiftShader, remote browsers) get a lower
    // internal resolution. Real GPUs keep the crisp 1.35–1.6x buffer.
    this.softwareRenderer = /swiftshader|llvmpipe|software|softpipe/i.test(gpuName);
    this.renderer.setPixelRatio(this._pixelRatio());
    this.renderer.setSize(innerWidth, innerHeight, false);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.16;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  _pixelRatio() {
    if (this.softwareRenderer) return .74;
    return Math.min(devicePixelRatio || 1, isTouchDevice() ? 1.35 : 1.6);
  }

  _initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xb99a76, .0066);
    this.scene.background = new THREE.Color(0xb99a76);
    this.camera = new THREE.PerspectiveCamera(79, innerWidth / innerHeight, .022, 240);
    this.camera.rotation.order = 'YXZ';
    this.scene.add(this.camera);

    this.world = buildWorld(this.scene, this.renderer);
    this.player = new PlayerController(this.camera, this.world);
    this.audio = new AudioEngine();
    this.hud = new HUD();
    this.weapon = new Weapon(this.camera, this.renderer);
    this.weapon.hide();

    this.combat = new Combat({
      scene: this.scene,
      camera: this.camera,
      world: this.world,
      player: this.player,
      weapon: this.weapon,
      audio: this.audio,
      hud: this.hud,
      onEvent: (name, data) => this._onCombatEvent(name, data),
    });
    this.combat.enabled = false;
  }

  _initInput() {
    this.input = new Input(this.canvas);
    this.input.onLockChange = (locked) => {
      this.hud.setLocked(locked);
      if (locked) document.body.classList.add('locked');
      else document.body.classList.remove('locked');
    };
  }

  _initGame() {
    // Intro camera: a slow, low crane shot behind the start screen.
    this._introCam = { pos: new THREE.Vector3(5.4, 2.1, 20.5), look: new THREE.Vector3(-4, 1.9, -5) };
    this.camera.position.copy(this._introCam.pos);
    this.camera.fov = 64;
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(this._introCam.look);
  }

  _bindUI() {
    const btn = document.getElementById('startButton');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      this.start();
    });

    // Mobile buttons live outside the canvas, so prevent the page from panning.
    for (const el of document.querySelectorAll('.touch-btn, .stick-base')) {
      el.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
    }

    addEventListener('keydown', (e) => {
      if (e.code === 'KeyM') {
        this.muted = !this.muted;
        this.audio.setMuted(this.muted);
        this.hud.toast(this.muted ? 'ÁUDIO <b>OFF</b>' : 'ÁUDIO <b>ON</b>', 700);
      }
    });
  }

  start() {
    if (this.started) return;
    this.started = true;
    this.startTime = performance.now() / 1000;
    this.audio.init();
    this.audio.uiClick();
    this.input.enabled = true;
    this.combat.enabled = true;
    this.weapon.show();
    this.hud.start(this.input.touch);
    this.hud.setLocked(false);
    document.body.classList.add('playing');
    if (!this.input.touch) this.input.requestLock();
    this.player.reset();
    this.player.pitch = 0;
    this.player.yaw = 0;
    this.camera.fov = CONFIG.camera.baseFov;
    this.hud.pushEvent('DRILL ATIVO', 'MOVA-SE SEM PARAR');
    this._updateCameraImmediate();
  }

  _bindResize() {
    const resize = () => {
      this.camera.aspect = innerWidth / innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setPixelRatio(this._pixelRatio());
      this.renderer.setSize(innerWidth, innerHeight, false);
    };
    addEventListener('resize', resize);
    addEventListener('orientationchange', () => setTimeout(resize, 120));
  }

  // ── Main loop ──────────────────────────────────────────────────────────────
  _frame() {
    const rawDt = this.clock.getDelta();
    const dt = Math.min(rawDt, .1);

    if (this.started) {
      // Mouse look is applied once per rendered frame; physics may step twice.
      if (this.input.lookX || this.input.lookY) {
        this.player.addLook(this.input.lookX, this.input.lookY);
        this.input.lookX = 0; this.input.lookY = 0;
      }

      this.accumulator += dt;
      let steps = 0;
      // Catch up to wall-clock time even on slow software renderers. Six steps
      // was not enough below 20 fps; sixteen covers a 100 ms frame.
      while (this.accumulator >= STEP && steps < 16) {
        this.player.update(STEP, this.input);
        this.combat.update(STEP, this.input);
        this.accumulator -= STEP;
        steps++;
        this._drainPlayerEvents();
      }
      if (steps === 0) this._drainPlayerEvents();
      if (steps === 16) this.accumulator = 0;

      this.gameTime = performance.now() / 1000 - this.startTime;
      this.player._firing = (this.input.fireHeld || this.input.firePressed) && !this.combat.reloading;
      this.weapon.update(dt, this.player, this.player._firing);
      this.hud.update(this.player, dt);
      this.hud.setScore(this.combat.score, this.combat.kills, this.gameTime);
      this.world.update(dt, this.gameTime);
      this._updateFootsteps(dt);
    } else {
      // Live world behind the menu, but no player simulation.
      this.introTime += dt;
      this.camera.position.x = this._introCam.pos.x + Math.sin(this.introTime * .09) * .22;
      this.camera.position.y = this._introCam.pos.y + Math.sin(this.introTime * .13) * .035;
      this.camera.lookAt(
        this._introCam.look.x,
        this._introCam.look.y + Math.sin(this.introTime * .1) * .05,
        this._introCam.look.z
      );
      this.world.update(dt, this.introTime);
    }

    this.renderer.render(this.scene, this.camera);
    this.input.endFrame();
  }

  _drainPlayerEvents() {
    if (!this.player.events.length) return;
    for (const ev of this.player.events) {
      switch (ev.name) {
        case 'jump':
          this.audio.jump();
          break;
        case 'slideStart':
          this.audio.slideStart();
          this.hud.pushEvent('SLIDE INFINITO', `${ev.data.toFixed(1)} M/S`);
          break;
        case 'slideJump':
          this.audio.jump();
          this.hud.pushEvent('SLIDE JUMP', 'MOMENTO PRESERVADO');
          break;
        case 'land':
          if (ev.data > 7) this.audio.land(ev.data);
          if (ev.data > 6 && this.player.horizontalSpeed > 13) {
            this.hud.pushEvent('BHOP', `${this.player.horizontalSpeed.toFixed(1)} M/S`);
          }
          break;
        case 'mantle':
          this.audio.mantle();
          this.hud.pushEvent('AUTO MANTLE', 'VAULT RÁPIDO');
          break;
        case 'mantleEnd':
          this.audio.mantleEnd();
          break;
        default:
          break;
      }
    }
    this.player.events.length = 0;
  }

  _updateFootsteps(dt) {
    if (!this.player.grounded || this.player.sliding || this.player.horizontalSpeed < 1.2) {
      this.stepDistance = 0;
      return;
    }
    this.stepDistance += this.player.horizontalSpeed * dt;
    const stride = 2.35 + Math.min(1, this.player.horizontalSpeed / 20) * 1.0;
    const speed = this.player.horizontalSpeed;
    if (this.stepDistance > stride) {
      this.stepDistance = 0;
      this.audio.footstep();
      if (speed > 12.5) this.hud.pushEvent('FLOW STATE', `${speed.toFixed(1)} M/S`);
    }
  }

  _onCombatEvent(name) {
    if (name === 'kill') {
      // Already surfaced through HUD; kept as a hook for future game modes.
    }
  }

  _updateCameraImmediate() {
    this.camera.position.set(this.player.position.x, this.player.position.y + this.player.eyeHeight, this.player.position.z);
    this.camera.rotation.set(this.player.pitch, this.player.yaw, 0);
    this.camera.fov = this.player.fov;
    this.camera.updateProjectionMatrix();
  }

  // A tiny test surface for automated checks and curious players.
  _exposeDebug() {
    const game = this;
    window.COMBAT_SHIFT = {
      game,
      get state() {
        return {
          started: game.started,
          position: game.player.position.toArray(),
          velocity: game.player.velocity.toArray(),
          speed: game.player.horizontalSpeed,
          grounded: game.player.grounded,
          sliding: game.player.sliding,
          sprinting: game.player.sprinting,
          airborne: game.player.airborne,
          mantling: game.player.mantling,
          fov: game.camera.fov,
          yaw: game.player.yaw,
          score: game.combat.score,
          kills: game.combat.kills,
          ammo: game.combat.ammo,
          targets: game.combat.targets.length,
        };
      },
      teleport(x, z, y = 0) {
        game.player.position.set(x, y, z);
        game.player.velocity.set(0, 0, 0);
        game.player.grounded = true;
      },
      look(yaw, pitch = 0) {
        game.player.yaw = yaw;
        game.player.pitch = pitch;
      },
      press(code, ms = 200) {
        const down = new KeyboardEvent('keydown', { code, bubbles: true });
        const up = new KeyboardEvent('keyup', { code, bubbles: true });
        window.dispatchEvent(down);
        setTimeout(() => window.dispatchEvent(up), ms);
      },
      fire(ms = 80) {
        game.input.fireHeld = true;
        game.input.firePressed = true;
        setTimeout(() => { game.input.fireHeld = false; }, ms);
      },
    };
  }
}

// Wait for the display face before building canvas labels, then start.
async function boot() {
  try {
    if (document.fonts?.ready) await document.fonts.ready;
    new Game();
  } catch (error) {
    console.error(error);
    const loading = document.getElementById('loading');
    if (loading) {
      loading.innerHTML = `<div class="loading-mark" style="font-size:30px">ERRO DE RENDERIZAÇÃO</div><span>${error.message}</span>`;
    }
  }
}

boot();
