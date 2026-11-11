import * as THREE from '../vendor/three.module.js';
import { createMap, raycastColliders, moveWithCollision } from './world.js';
import { createCharacter, createBotModel, animateBot, poseCharacter } from './characters.js';
import { createWeaponModel } from './weapons.js';
import { WEAPONS, SECONDARY, SKINS, CHARACTERS, charById, weaponById, modeById, mapById } from './data.js';
import { audio } from './audio.js';

const TEAM_BLUE = '#48b7ff';
const TEAM_ORANGE = '#ff7a3d';
const FFA_COLORS = ['#ff5a5f', '#ffd23c', '#b58cff', '#5affb1', '#ff8ad8', '#7cd7ff', '#ffb15c', '#9cff5a'];
const $ = id => document.getElementById(id);

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function lerp(a, b, t) { return a + (b - a) * t; }
function rand(a, b) { return a + Math.random() * (b - a); }

export class Game {
  constructor({ canvas, renderer, onExit, onMatchEnd }) {
    this.canvas = canvas;
    this.renderer = renderer;
    this.onExit = onExit;
    this.onMatchEnd = onMatchEnd;
    this.active = false;
    this.phase = 'idle';
    this.quality = 'medium';
    this.sensitivity = 1;
    this.isTouch = matchMedia('(pointer: coarse)').matches || innerWidth < 800;
    this.audio = audio;
    this.portraits = {};
    this.clockTime = 0;
    this.keys = {};
    this.lookDrag = null;
    this.pointerLocked = false;
    this.firing = false;
    this.triggerReady = true;
    this.mobileAds = false;
    this.ads = false;
    this.uiTick = 0;
    this.miniTick = 0;
    this.zoneTick = 0;
    this.domTick = 0;
    this.weaponSwitch = 0;
    this.reloadActive = false;
    this.reloadTimer = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.camBob = 0;
    this.swayX = 0; this.swayY = 0;
    this.lookVelX = 0; this.lookVelY = 0;
    this.lastFrameT = performance.now();
    this.dom = this.cacheDom();
    this.setupInput();
    this.isTouch = this.isTouch || 'ontouchstart' in window;
    this.dom.mobileControls?.classList.toggle('hidden', !this.isTouch);
  }

  cacheDom() {
    return {
      matchUI: $('match-ui'), scoreBlue: $('score-blue'), scoreOrange: $('score-orange'),
      barBlue: $('bar-blue'), barOrange: $('bar-orange'), timer: $('hud-timer'),
      mode: $('hud-mode'), limit: $('hud-limit'), health: $('health-value'), armor: $('armor-value'),
      healthBar: $('health-bar'), ammoMag: $('ammo-mag'), ammoReserve: $('ammo-reserve'),
      ammoBar: $('ammo-bar'), weaponName: $('weapon-name'), weaponType: $('weapon-type'),
      slotPrimary: $('slot-primary'), slotSecondary: $('slot-secondary'), reloadHint: $('reload-hint'),
      kills: $('kills'), deaths: $('deaths'), points: $('points'), killfeed: $('killfeed'),
      objective: $('objective'), announce: $('announce'), crosshair: $('crosshair'),
      hitmarker: $('hitmarker'), damageDirs: $('damage-dirs'), minimap: $('minimap'),
      zoneChips: $('zone-chips'), countdown: $('countdown'), countdownMap: $('countdown-map'),
      countdownNum: $('countdown-num'), scoreboard: $('scoreboard'), scoreboardBody: $('scoreboard-body'),
      pause: $('pause-menu'), end: $('end-screen'), endKicker: $('end-kicker'), endTitle: $('end-title'),
      endSub: $('end-sub'), endMvp: $('end-mvp'), endScoreboard: $('end-scoreboard'),
      mobileControls: $('mobile-controls'), joystick: $('joystick'), joystickKnob: $('joystick-knob'),
      lookZone: $('look-zone'), btnFire: $('btn-fire'), btnAds: $('btn-ads'), btnJump: $('btn-jump'),
      btnReload: $('btn-reload'), damageFlash: $('damage-flash'), healFlash: $('heal-flash'),
      blueLabel: document.querySelector('.team-score.blue .team-label'),
      orangeLabel: document.querySelector('.team-score.orange .team-label'),
      scoreStrip: document.querySelector('.score-strip'),
      screenFx: $('screen-fx'),
    };
  }

  setQuality(q) { this.quality = q; }
  setSensitivity(s) { this.sensitivity = s; }

  /* ------------------------------------------------------------------ input */
  setupInput() {
    window.addEventListener('keydown', e => {
      if (!this.active) return;
      audio.init();
      if (['Tab', 'Space', 'ShiftLeft', 'ShiftRight'].includes(e.code)) e.preventDefault();
      this.keys[e.code] = true;
      if (this.phase === 'paused') {
        if (e.code === 'Escape') this.resume();
        return;
      }
      if (this.phase === 'ended') return;
      if (e.code === 'Escape') { this.pause(); return; }
      if (e.code === 'KeyR') this.startReload();
      if (e.code === 'Digit1' || e.code === 'KeyQ') this.switchWeapon('primary');
      if (e.code === 'Digit2') this.switchWeapon('secondary');
      if (e.code === 'Space') this.jump();
      if (e.code === 'Tab' && !e.repeat) this.showScoreboard(!this.dom.scoreboard.classList.contains('hidden'));
    });
    window.addEventListener('keyup', e => { this.keys[e.code] = false; });
    window.addEventListener('blur', () => { this.keys = {}; this.firing = false; });
    document.addEventListener('pointerlockchange', () => {
      this.pointerLocked = document.pointerLockElement === this.canvas;
    });
    window.addEventListener('mousemove', e => {
      if (!this.active || this.phase !== 'combat') return;
      if (this.pointerLocked) {
        this.applyLook(e.movementX * .0022 * this.sensitivity, e.movementY * .0019 * this.sensitivity);
        this.lookVelX = e.movementX * .0007; this.lookVelY = e.movementY * .0005;
      } else if (this.lookDrag && this.lookDrag.pointerType === 'mouse') {
        this.applyLook((e.clientX - this.lookDrag.x) * .004 * this.sensitivity, (e.clientY - this.lookDrag.y) * .0035 * this.sensitivity);
        this.lookDrag.x = e.clientX; this.lookDrag.y = e.clientY;
      }
    });
    this.canvas.addEventListener('mousedown', e => {
      if (!this.active || this.phase !== 'combat') return;
      if (e.button === 0) {
        this.firing = true;
        if (!this.pointerLocked && !this.isTouch) {
          try { this.canvas.requestPointerLock(); } catch {}
          this.lookDrag = { x: e.clientX, y: e.clientY, pointerType: 'mouse' };
        }
      }
      if (e.button === 2) this.ads = true;
    });
    window.addEventListener('mouseup', e => {
      if (e.button === 0) this.firing = false;
      if (e.button === 2) this.ads = false;
    });
    this.canvas.addEventListener('contextmenu', e => e.preventDefault());
    this.canvas.addEventListener('mousemove', e => {
      if (!this.active || this.pointerLocked) return;
      if (this.lookDrag && this.phase === 'combat') {
        this.applyLook((e.clientX - this.lookDrag.x) * .004 * this.sensitivity, (e.clientY - this.lookDrag.y) * .0035 * this.sensitivity);
        this.lookDrag.x = e.clientX; this.lookDrag.y = e.clientY;
      }
    });
    this.canvas.addEventListener('mouseup', () => { if (this.lookDrag?.pointerType === 'mouse') this.lookDrag = null; });
    this.setupTouch();
    window.addEventListener('resize', () => this.resize());
  }

  setupTouch() {
    const joy = this.dom.joystick, knob = this.dom.joystickKnob;
    if (!joy) return;
    this.joy = { active: false, x: 0, y: 0, id: null };
    const joyMove = e => {
      if (!this.joy.active || e.pointerId !== this.joy.id) return;
      const r = joy.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const max = r.width * .32;
      const len = Math.hypot(dx, dy) || 1;
      const cl = Math.min(1, len / max);
      this.joy.x = (dx / len) * cl;
      this.joy.y = (dy / len) * cl;
      knob.style.transform = `translate(${this.joy.x * max}px,${this.joy.y * max}px)`;
    };
    joy.addEventListener('pointerdown', e => {
      e.preventDefault(); audio.init();
      this.joy.active = true; this.joy.id = e.pointerId;
      joy.setPointerCapture(e.pointerId); joyMove(e);
    });
    joy.addEventListener('pointermove', joyMove);
    const joyEnd = e => {
      if (e.pointerId !== this.joy.id) return;
      this.joy.active = false; this.joy.x = this.joy.y = 0; knob.style.transform = '';
    };
    joy.addEventListener('pointerup', joyEnd); joy.addEventListener('pointercancel', joyEnd);

    const zone = this.dom.lookZone;
    if (zone) {
      zone.addEventListener('pointerdown', e => {
        e.preventDefault(); audio.init();
        this.lookDrag = { x: e.clientX, y: e.clientY, pointerType: 'touch', id: e.pointerId };
        zone.setPointerCapture(e.pointerId);
      });
      zone.addEventListener('pointermove', e => {
        if (!this.lookDrag || e.pointerId !== this.lookDrag.id) return;
        this.applyLook((e.clientX - this.lookDrag.x) * .005 * this.sensitivity, (e.clientY - this.lookDrag.y) * .0045 * this.sensitivity);
        this.lookDrag.x = e.clientX; this.lookDrag.y = e.clientY;
      });
      const zEnd = e => { if (this.lookDrag && e.pointerId === this.lookDrag.id) this.lookDrag = null; };
      zone.addEventListener('pointerup', zEnd); zone.addEventListener('pointercancel', zEnd);
    }
    const holdFire = (el, down, up) => {
      if (!el) return;
      el.addEventListener('pointerdown', e => { e.preventDefault(); audio.init(); down(); });
      el.addEventListener('pointerup', e => { e.preventDefault(); up && up(); });
      el.addEventListener('pointercancel', () => up && up());
      el.addEventListener('pointerleave', () => up && up());
    };
    holdFire(this.dom.btnFire, () => { this.firing = true; }, () => { this.firing = false; });
    holdFire(this.dom.btnAds, () => { this.mobileAds = !this.mobileAds; this.dom.btnAds.classList.toggle('active', this.mobileAds); });
    holdFire(this.dom.btnJump, () => this.jump());
    holdFire(this.dom.btnReload, () => this.startReload());
  }

  applyLook(dx, dy) {
    this.player.yaw -= dx;
    this.player.pitch = clamp(this.player.pitch - dy, -1.42, 1.42);
  }

  jump() {
    if (!this.active || this.phase !== 'combat' || !this.player.alive) return;
    if (this.player.onGround) {
      this.player.vy = 6.2;
      this.player.onGround = false;
      audio.step();
    }
  }

  /* ------------------------------------------------------------------ start / stop */
  start(config) {
    this.stop(true);
    this.config = { ...config };
    const mode = modeById(config.mode);
    this.mode = mode;
    this.scoreLimit = config.scoreLimit || mode.limit;
    this.matchTime = mode.timer;
    this.teamScores = { blue: 0, orange: 0 };
    this.clockTime = 0;
    this.phase = 'countdown';
    this.countdown = 3.35;
    this.countdownStage = 4;
    this.playerChar = charById(config.charId);
    this.primaryWeapon = weaponById(config.weaponId);
    this.secondaryWeapon = SECONDARY;
    this.skin = SKINS.find(s => s.id === config.skinId) || SKINS[0];
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(72, innerWidth / innerHeight, .045, 900);
    this.camera.rotation.order = 'YXZ';
    this.camera.fov = 72;
    this.camera.updateProjectionMatrix();
    this.scene.add(this.camera);
    this.map = createMap(config.mapId, this.scene, this.quality);
    this.setupPlayer();
    this.setupBots();
    this.setupZones();
    this.setupFx();
    this.renderer.toneMappingExposure = 1.02;
    this.active = true;
    this.lastFrameT = performance.now();
    this.showMatchUI();
    this.resetHud();
    this.audio.startMusic(true);
    this.audio.setIntense(true);
    this.dom.countdown.classList.remove('hidden');
    this.dom.countdownMap.textContent = this.map.info.name;
    this.dom.countdownNum.textContent = '3';
    this.dom.end.classList.add('hidden');
    this.dom.pause.classList.add('hidden');
    this.dom.scoreboard.classList.add('hidden');
    this.dom.matchUI.classList.remove('hidden');
    this.dom.mobileControls.classList.toggle('hidden', !this.isTouch);
    this.dom.countdown.classList.remove('hidden');
    if (this.isTouch) this.canvas.style.touchAction = 'none';
    this.resize();
    this.announce(mode.team ? 'PREPARE-SE' : 'TODOS CONTRA TODOS', 'A BATALHA COMEÇA EM INSTANTES', false, 1.8);
  }

  showMatchUI() {
    this.dom.matchUI.classList.remove('hidden');
    this.dom.blueLabel.textContent = this.mode.team ? 'VESPA' : 'VOCÊ';
    this.dom.orangeLabel.textContent = this.mode.team ? 'RAPOSA' : 'LÍDER';
    this.dom.mode.textContent = this.mode.name;
    this.dom.limit.textContent = this.mode.id === 'dom' ? `PRIMEIRO A ${this.scoreLimit}` : this.mode.team ? `PRIMEIRO A ${this.scoreLimit}` : `${this.scoreLimit} ABATES`;
  }

  resetHud() {
    this.dom.killfeed.innerHTML = '';
    this.dom.objective.classList.remove('show');
    this.dom.announce.classList.remove('show');
    this.dom.damageDirs.innerHTML = '';
    this.dom.crosshair.classList.remove('hidden-x');
    this.dom.hitmarker.classList.remove('show', 'kill');
    this.dom.scoreboard.classList.add('hidden');
    this.dom.pause.classList.add('hidden');
    this.dom.end.classList.add('hidden');
    this.updateScoreHud();
    this.updateWeaponHud();
  }

  stop(silent = false) {
    this.active = false;
    this.phase = 'idle';
    this.firing = false;
    this.reloadActive = false;
    this.ads = false;
    this.mobileAds = false;
    if (this.pointerLocked) document.exitPointerLock?.();
    if (!silent) this.audio.stopMusic();
    if (this.scene) {
      this.disposeScene(this.scene);
      this.scene = null;
    }
    this.bots = [];
    this.allEntities = [];
    this.zoneStates = [];
    this.hitMeshes = [];
    this.enemyHitMeshes = [];
    if (!silent) {
      this.dom.matchUI.classList.add('hidden');
      this.dom.mobileControls.classList.add('hidden');
    }
  }

  disposeScene(scene) {
    scene.traverse(o => {
      if (o.geometry) o.geometry.dispose?.();
      if (o.material) {
        if (Array.isArray(o.material)) o.material.forEach(m => { m.map?.dispose?.(); m.dispose?.(); });
        else { o.material.map?.dispose?.(); o.material.dispose?.(); }
      }
    });
    scene.clear();
  }

  /* ------------------------------------------------------------------ player and bots */
  setupPlayer() {
    const c = this.playerChar;
    const perks = {
      maxHp: 100, maxArmor: 50, speed: 1, reload: 1, fireRate: 1, damageTaken: 1, ammo: 1, ads: 1
    };
    if (c.id === 'pastel' || c.id === 'mandioca') perks.maxArmor += 10;
    if (c.id === 'bochecha') perks.speed *= 1.08;
    if (c.id === 'trambique' || c.id === 'gizmo') perks.reload *= .9;
    if (c.id === 'cebolinha') perks.fireRate *= 1.05;
    if (c.id === 'manteiga') perks.maxHp += 15;
    if (c.id === 'rabisco') perks.ammo *= 1.15;
    if (c.id === 'cupim') perks.damageTaken *= .9;
    if (c.id === 'abacaxi') { perks.speed *= 1.05; perks.maxHp += 5; }
    if (c.id === 'pirulito') perks.ads *= 1.15;
    this.perks = perks;
    const spawn = this.pickSpawn('blue', true);
    this.player = {
      isPlayer: true, char: c, charId: c.id, name: c.name, team: 'blue',
      pos: new THREE.Vector3(spawn.x, 0, spawn.z), yaw: spawn.yaw, pitch: 0, vy: 0, onGround: true,
      hp: perks.maxHp, maxHp: perks.maxHp, armor: perks.maxArmor, maxArmor: perks.maxArmor,
      alive: true, respawn: 0, kills: 0, deaths: 0, points: 0, teamScore: 0,
      protectedUntil: this.clockTime + 2, lastDamage: -99, lastShot: -99, speed: 0,
      weapon: 'primary', active: true
    };
    this.allEntities = [this.player];
    // viewmodels
    this.weaponModels = {
      primary: createWeaponModel(this.primaryWeapon, this.skin, c, false),
      secondary: createWeaponModel(this.secondaryWeapon, this.skin, c, true)
    };
    for (const k of ['primary', 'secondary']) {
      const m = this.weaponModels[k];
      m.group.visible = false;
      m.group.scale.setScalar(.55);
      this.camera.add(m.group);
    }
    this.weaponModels.primary.group.visible = true;
    this.weaponBase = new THREE.Vector3(.4, -.4, -1.32);
    this.weaponAdsBase = new THREE.Vector3(0, -.13, -1.1);
    for (const k of ['primary', 'secondary']) {
      this.weaponModels[k].group.position.copy(this.weaponBase);
    }
    this.ammo = {
      primary: { mag: this.primaryWeapon.mag, reserve: Math.round(this.primaryWeapon.reserve * perks.ammo) },
      secondary: { mag: this.secondaryWeapon.mag, reserve: Math.round(this.secondaryWeapon.reserve * perks.ammo) }
    };
    this.player.weapon = 'primary';
    this.ads = false;
    this.reloadActive = false;
    this.firing = false;
    this.weaponSwitch = 0;
  }

  setupBots() {
    const used = new Set([this.playerChar.id]);
    const otherChars = CHARACTERS.filter(c => !used.has(c.id));
    const shuffle = arr => arr.sort(() => Math.random() - .5);
    shuffle(otherChars);
    this.bots = [];
    const teamMode = this.mode.team;
    if (teamMode) {
      const squad = clamp(this.config.botCount || 5, 3, 9);
      for (let i = 0; i < squad - 1; i++) {
        const c = otherChars[i % otherChars.length];
        this.spawnBot(c, 'blue', TEAM_BLUE);
      }
      for (let i = 0; i < squad; i++) {
        const c = otherChars[(i + squad) % otherChars.length];
        this.spawnBot(c, 'orange', TEAM_ORANGE, i + 5);
      }
    } else {
      const count = clamp((this.config.botCount || 5) * 2 - 2, 3, 9);
      for (let i = 0; i < count; i++) {
        const c = otherChars[i % otherChars.length];
        this.spawnBot(c, 'ffa' + i, FFA_COLORS[i % FFA_COLORS.length]);
      }
    }
    // make sure all hit meshes ready
    this.refreshHitMeshes();
  }

  spawnBot(char, team, color, spawnIndex) {
    const spawn = this.pickSpawn(team, false, spawnIndex);
    const weapon = WEAPONS[Math.floor(Math.random() * WEAPONS.length)];
    const root = createBotModel(char, color, char.short || char.name);
    const baseY = 0;
    root.userData.baseY = baseY;
    root.position.set(spawn.x, 0, spawn.z);
    root.rotation.y = spawn.yaw;
    this.scene.add(root);
    const bot = {
      isPlayer: false, char, charId: char.id, name: char.short || char.name,
      team, teamColor: color, model: root, pos: new THREE.Vector3(spawn.x, 0, spawn.z),
      yaw: spawn.yaw, hp: 100, maxHp: 100, armor: 0, alive: true, respawn: 0,
      kills: 0, deaths: 0, points: 0, teamScore: 0, protectedUntil: this.clockTime + 2,
      lastDamage: -99, lastShot: -99, weapon, speed: 0, target: null, nav: null, navTimer: rand(0, 2),
      fireCooldown: rand(.4, 1.2), reaction: rand(0, .5), aiTick: rand(0, .3), strafe: Math.random() > .5 ? 1 : -1,
      stuckTime: 0, lastPos: new THREE.Vector3(spawn.x, 0, spawn.z), hunting: false, spawnIndex: spawnIndex ?? null
    };
    // hit meshes
    const hits = [];
    root.traverse(o => { if (o.isMesh && o.userData.hit) { o.userData.hit.bot = bot; hits.push(o); } });
    bot.hitMeshes = hits;
    this.bots.push(bot);
    this.allEntities.push(bot);
    return bot;
  }

  refreshHitMeshes() {
    this.hitMeshes = [];
    this.enemyHitMeshes = [];
    for (const bot of this.bots) {
      for (const m of bot.hitMeshes || []) {
        this.hitMeshes.push(m);
        if (bot.team !== this.player.team || this.mode.id === 'ffa') this.enemyHitMeshes.push(m);
      }
    }
  }

  pickSpawn(team, forPlayer = false, preferred = null) {
    const spawns = this.map.spawns;
    let pool;
    if (this.mode.id === 'ffa') pool = spawns.slice();
    else if (team === 'blue') pool = spawns.slice(0, 5);
    else pool = spawns.slice(5, 10).length ? spawns.slice(5, 10) : spawns.slice();
    if (preferred != null) {
      const p = spawns[preferred % spawns.length];
      pool.sort((a, b) => Math.hypot(a.x - p.x, a.z - p.z) - Math.hypot(b.x - p.x, b.z - p.z));
    }
    let best = pool[0], bestScore = -1;
    for (const s of pool) {
      let score = Math.random() * 2;
      for (const e of this.allEntities) {
        if (!e.alive) continue;
        const d = Math.hypot(e.pos.x - s.x, e.pos.z - s.z);
        score -= d < 6 ? 20 : d < 12 ? 8 : d < 20 ? 2 : 0;
      }
      if (score > bestScore) { bestScore = score; best = s; }
    }
    return { x: best.x + rand(-.8, .8), z: best.z + rand(-.8, .8), yaw: best.yaw };
  }

  respawnEntity(e) {
    const spawn = this.pickSpawn(e.team, e.isPlayer, e.isPlayer ? null : e.spawnIndex);
    e.pos.set(spawn.x, 0, spawn.z);
    e.yaw = spawn.yaw;
    e.hp = e.isPlayer ? this.perks.maxHp : 100;
    e.armor = e.isPlayer ? Math.round(this.perks.maxArmor * .55) : 0;
    e.alive = true;
    e.respawn = 0;
    e.protectedUntil = this.clockTime + 2;
    e.lastDamage = -99;
    e.pitch = 0;
    if (e.isPlayer) {
      this.player.pitch = 0;
      this.weaponModels.primary.group.visible = e.weapon === 'primary';
      this.weaponModels.secondary.group.visible = e.weapon === 'secondary';
      this.reloadActive = false;
      this.ammo.primary.mag = Math.min(this.ammo.primary.mag, this.primaryWeapon.mag);
      this.dom.crosshair.classList.remove('hidden-x');
      this.dom.damageFlash.classList.remove('hit');
      this.spawnProtectionNotice();
    } else {
      e.model.visible = true;
      e.model.rotation.z = 0;
      e.model.rotation.x = 0;
      e.model.position.set(spawn.x, 0, spawn.z);
      e.model.rotation.y = spawn.yaw;
      e.model.userData.rig.label.visible = true;
      e.model.userData.rig.ring.visible = true;
      e.model.userData.rig.gun.visible = true;
    }
    if (e === this.player) {
      this.dom.healFlash.classList.add('hit');
      setTimeout(() => this.dom.healFlash.classList.remove('hit'), 220);
    }
  }

  spawnProtectionNotice() {
    this.showObjective('<b>PROTEÇÃO DE SPAWN</b> · 2 SEGUNDOS', 1.5);
  }

  /* ------------------------------------------------------------------ zones */
  setupZones() {
    this.zoneStates = (this.map.zones || []).map(z => ({
      ...z, owner: null, progress: 0, contested: false, group: null
    }));
    for (const z of this.zoneStates) {
      const g = new THREE.Group();
      const ring = new THREE.Mesh(new THREE.RingGeometry(z.r * .78, z.r, 56), new THREE.MeshBasicMaterial({ color: 0xd9ff43, transparent: true, opacity: .2, side: THREE.DoubleSide, depthWrite: false }));
      ring.rotation.x = -Math.PI / 2; ring.position.y = .06; g.add(ring);
      const disc = new THREE.Mesh(new THREE.CircleGeometry(z.r * .78, 48), new THREE.MeshBasicMaterial({ color: 0xd9ff43, transparent: true, opacity: .035, side: THREE.DoubleSide, depthWrite: false }));
      disc.rotation.x = -Math.PI / 2; disc.position.y = .055; g.add(disc);
      const inner = new THREE.Mesh(new THREE.RingGeometry(z.r * .28, z.r * .34, 40), new THREE.MeshBasicMaterial({ color: 0xd9ff43, transparent: true, opacity: .3, side: THREE.DoubleSide, depthWrite: false }));
      inner.rotation.x = -Math.PI / 2; inner.position.y = .065; g.add(inner);
      g.position.set(z.x, 0, z.z);
      g.visible = this.mode.id === 'dom';
      g.userData.ring = ring; g.userData.disc = disc; g.userData.inner = inner;
      this.scene.add(g);
      z.group = g;
    }
    this.renderZoneChips();
  }

  updateZones(dt) {
    if (this.mode.id !== 'dom') return;
    let changed = false;
    for (const z of this.zoneStates) {
      let blue = 0, orange = 0;
      for (const e of this.allEntities) {
        if (!e.alive) continue;
        if (e.isPlayer && !this.player.alive) continue;
        if (Math.hypot(e.pos.x - z.x, e.pos.z - z.z) < z.r) {
          if (e.team === 'blue') blue++;
          else if (e.team === 'orange') orange++;
        }
      }
      const was = z.owner, wasProgress = z.progress;
      z.contested = blue > 0 && orange > 0;
      if (!z.contested) {
        if (blue > 0) z.progress = clamp(z.progress + dt * .38, -1, 1);
        else if (orange > 0) z.progress = clamp(z.progress - dt * .38, -1, 1);
      }
      if (z.progress >= 1) z.owner = 'blue';
      else if (z.progress <= -1) z.owner = 'orange';
      if (was !== z.owner || Math.abs(wasProgress - z.progress) > .5) changed = true;
      if (was !== z.owner) {
        if (z.owner) {
          this.announce(`ZONA ${z.id} CONTROLADA`, z.owner === 'blue' ? 'ESQUADRÃO VESPA' : 'ESQUADRÃO RAPOSA', z.owner !== 'blue', 2);
          audio.spawn();
        }
        changed = true;
      }
      const col = z.owner === 'blue' ? 0x48b7ff : z.owner === 'orange' ? 0xff7a3d : z.contested ? 0xd9ff43 : 0x8a988f;
      for (const part of [z.group.userData.ring, z.group.userData.inner, z.group.userData.disc]) {
        part.material.color.setHex(col);
        part.material.opacity = part === z.group.userData.disc ? .035 : z.contested ? .4 : .26;
      }
      z.group.userData.ring.scale.setScalar(z.contested ? 1 + Math.sin(this.clockTime * 6) * .03 : 1);
    }
    // scoring
    this.domTick += dt;
    if (this.domTick >= 1.25) {
      this.domTick = 0;
      let blueZones = 0, orangeZones = 0;
      for (const z of this.zoneStates) {
        if (z.owner === 'blue') blueZones++;
        else if (z.owner === 'orange') orangeZones++;
      }
      if (blueZones) { this.teamScores.blue += blueZones; changed = true; }
      if (orangeZones) { this.teamScores.orange += orangeZones; changed = true; }
    }
    if (changed) this.renderZoneChips();
  }

  renderZoneChips() {
    if (!this.dom.zoneChips) return;
    this.dom.zoneChips.innerHTML = '';
    for (const z of this.zoneStates) {
      const d = document.createElement('div');
      d.className = 'zone-chip ' + (z.owner || '') + (z.contested ? ' contested' : '');
      d.textContent = z.owner === 'blue' ? `${z.id} VESPA` : z.owner === 'orange' ? `${z.id} RAPOSA` : z.contested ? `${z.id} DISPUTA` : `${z.id} LIVRE`;
      this.dom.zoneChips.appendChild(d);
    }
  }

  /* ------------------------------------------------------------------ FX systems */
  setupFx() {
    // tracer pool
    this.tracers = [];
    const tg = new THREE.BufferGeometry();
    tg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    for (let i = 0; i < 26; i++) {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
      const m = new THREE.LineBasicMaterial({ color: 0xffd58a, transparent: true, opacity: .9, blending: THREE.AdditiveBlending, depthWrite: false });
      const line = new THREE.Line(g, m);
      line.visible = false; line.frustumCulled = false;
      this.scene.add(line);
      this.tracers.push({ line, life: 0 });
    }
    // sparks
    const N = 220;
    const pos = new Float32Array(N * 3); pos.fill(-999);
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0xffc45c, size: .08, transparent: true, opacity: .95, blending: THREE.AdditiveBlending, depthWrite: false });
    this.sparks = new THREE.Points(geo, mat); this.sparks.frustumCulled = false;
    this.scene.add(this.sparks);
    this.sparkData = Array.from({ length: N }, () => ({ life: 0, vx: 0, vy: 0, vz: 0, x: -999, y: -999, z: -999 }));
    this.sparkIdx = 0;
    // blood/hit puff sprite
    this.hitPuffs = [];
  }

  spawnTracer(start, end, color = 0xffd58a) {
    let t = this.tracers.find(t => t.life <= 0);
    if (!t) t = this.tracers[0];
    const arr = t.line.geometry.attributes.position.array;
    arr[0] = start.x; arr[1] = start.y; arr[2] = start.z;
    arr[3] = end.x; arr[4] = end.y; arr[5] = end.z;
    t.line.geometry.attributes.position.needsUpdate = true;
    t.line.material.color.setHex(color);
    t.line.material.opacity = .9;
    t.line.visible = true;
    t.life = .055;
  }

  spawnSparks(point, normal, count = 7) {
    for (let i = 0; i < count; i++) {
      const d = this.sparkData[this.sparkIdx];
      const idx = this.sparkIdx++;
      this.sparkIdx %= this.sparkData.length;
      d.x = point.x + (normal?.x || 0) * .05; d.y = point.y + (normal?.y || 0) * .05; d.z = point.z + (normal?.z || 0) * .05;
      const a = Math.random() * Math.PI * 2, p = Math.random() * Math.PI * .5;
      d.vx = Math.cos(a) * Math.cos(p) * rand(1, 5) + (normal?.x || 0) * 2;
      d.vy = Math.sin(p) * rand(1, 5) + (normal?.y || 0) * 2 + 1.4;
      d.vz = Math.sin(a) * Math.cos(p) * rand(1, 5) + (normal?.z || 0) * 2;
      d.life = rand(.25, .55);
    }
  }

  updateFx(dt) {
    for (const t of this.tracers) {
      if (t.life > 0) {
        t.life -= dt;
        t.line.material.opacity = Math.max(0, t.life / .055) * .9;
        if (t.life <= 0) t.line.visible = false;
      }
    }
    const arr = this.sparks.geometry.attributes.position.array;
    for (let i = 0; i < this.sparkData.length; i++) {
      const d = this.sparkData[i];
      if (d.life > 0) {
        d.life -= dt;
        d.vy -= 11 * dt;
        d.x += d.vx * dt; d.y += d.vy * dt; d.z += d.vz * dt;
        arr[i * 3] = d.x; arr[i * 3 + 1] = d.y; arr[i * 3 + 2] = d.z;
      } else {
        arr[i * 3 + 1] = -999;
      }
    }
    this.sparks.geometry.attributes.position.needsUpdate = true;
    // muzzle flash decay
    const wm = this.weaponModels?.[this.player.weapon];
    if (wm) {
      if (wm.flashTimer > 0) {
        wm.flashTimer -= dt;
        wm.flash.visible = wm.flashTimer > 0;
        wm.flashLight.intensity = Math.max(0, wm.flashTimer / .05) * 4;
      } else {
        wm.flash.visible = false;
        wm.flashLight.intensity = 0;
      }
    }
  }

  /* ------------------------------------------------------------------ main update */
  update(dt) {
    if (!this.active) return;
    this.clockTime += dt;
    if (this.phase === 'paused' || this.phase === 'ended') return;
    if (this.phase === 'countdown') {
      const prev = Math.ceil(this.countdown);
      this.countdown -= dt;
      const n = Math.ceil(this.countdown);
      if (n !== prev) {
        if (n > 0 && n <= 3) { this.dom.countdownNum.textContent = String(n); this.audio.countdown(false); }
        if (n <= 0) {
          this.phase = 'combat';
          this.dom.countdown.classList.add('hidden');
          this.dom.countdownNum.style.animation = '';
          this.announce('COMBATE!', '', false, 1.1);
          this.audio.countdown(true);
          this.audio.setIntense(true);
        }
      }
      this.updateCamera(dt, false);
      this.updateHud(dt);
      this.updateFx(dt);
      return;
    }
    if (this.phase !== 'combat') return;
    this.matchTime -= dt;
    if (this.matchTime <= 0) { this.matchTime = 0; this.endMatch('time'); return; }
    this.updatePlayer(dt);
    for (const b of this.bots) this.updateBot(b, dt);
    this.updateZones(dt);
    this.updateFx(dt);
    this.updateCamera(dt, true);
    this.updateHud(dt);
    this.checkEndByScore();
  }

  /* ------------------------------------------------------------------ player update */
  updatePlayer(dt) {
    const p = this.player;
    if (!p.alive) {
      p.respawn -= dt;
      if (p.respawn <= 0) this.respawnEntity(p);
      return;
    }
    let mx = 0, mz = 0;
    if (this.keys.KeyW || this.keys.ArrowUp) mz -= 1;
    if (this.keys.KeyS || this.keys.ArrowDown) mz += 1;
    if (this.keys.KeyA || this.keys.ArrowLeft) mx -= 1;
    if (this.keys.KeyD || this.keys.ArrowRight) mx += 1;
    if (this.joy && this.joy.active) { mx += this.joy.x; mz += this.joy.y; }
    const moveLen = Math.hypot(mx, mz);
    if (moveLen > 1) { mx /= moveLen; mz /= moveLen; }
    const sprint = (this.keys.ShiftLeft || this.keys.ShiftRight || (this.isTouch && this.joy.active && Math.hypot(this.joy.x, this.joy.y) > .92)) && mz < -.2;
    const ads = this.ads || this.mobileAds;
    const speed = (sprint ? 7.3 : 4.9) * this.perks.speed * (ads ? .52 : 1);
    const fwdX = -Math.sin(p.yaw), fwdZ = -Math.cos(p.yaw);
    const rightX = Math.cos(p.yaw), rightZ = -Math.sin(p.yaw);
    const vx = (fwdX * -mz + rightX * mx) * speed;
    const vz = (fwdZ * -mz + rightZ * mx) * speed;
    if (moveLen > .05) {
      moveWithCollision(p.pos, vx * dt, vz * dt, .34, this.map.colliders, this.map.bounds);
      p.speed = speed;
      this.camBob += dt * speed * 1.6;
      if (p.onGround && this.clockTime - (this.lastStep || 0) > (sprint ? .28 : .39)) {
        this.lastStep = this.clockTime; audio.step();
      }
    } else { p.speed = 0; }
    // jump physics
    if (!p.onGround || p.vy > 0) {
      p.vy -= 20 * dt;
      p.pos.y += p.vy * dt;
      if (p.pos.y <= 0) { p.pos.y = 0; p.vy = 0; p.onGround = true; }
    }
    // stamina-less sprint fov
    this.sprinting = sprint;
    this.ads = (this.ads || this.mobileAds) && !sprint;
    // weapon logic
    this.weaponSwitch = Math.max(0, this.weaponSwitch - dt);
    if (this.reloadActive) {
      this.reloadTimer -= dt;
      this.animateReload(dt);
      if (this.reloadTimer <= 0) this.finishReload();
    } else if (this.weaponSwitch <= 0) {
      if (this.firing) this.tryFire();
    }
    // health regen
    if (this.clockTime - p.lastDamage > 6.5 && p.hp < p.maxHp) {
      p.hp = Math.min(p.maxHp, p.hp + dt * 7);
    }
    // last shot & auto reload
    if (this.ammo[p.weapon].mag === 0 && !this.reloadActive && this.ammo[p.weapon].reserve > 0) this.startReload();
    // recoil recovery
    this.recoilPitch = lerp(this.recoilPitch, 0, dt * 12);
    this.recoilYaw = lerp(this.recoilYaw, 0, dt * 10);
    this.lookVelX = lerp(this.lookVelX, 0, dt * 12);
    this.lookVelY = lerp(this.lookVelY, 0, dt * 12);
    // protection flash
    if (p.protectedUntil && this.clockTime > p.protectedUntil) p.protectedUntil = 0;
  }

  /* ------------------------------------------------------------------ camera & weapon visual */
  updateCamera(dt, canBob = true) {
    const p = this.player;
    const ads = this.ads || this.mobileAds;
    const targetFov = ads ? this.currentWeapon().adsFov : (this.sprinting ? 76 : 72);
    this.camera.fov = lerp(this.camera.fov, targetFov, dt * 11);
    this.camera.updateProjectionMatrix();
    const bobAmp = ads ? .006 : this.sprinting ? .035 : .018;
    const bobY = canBob && p.speed > 0 ? Math.sin(this.camBob * 2) * bobAmp : 0;
    const bobX = canBob && p.speed > 0 ? Math.cos(this.camBob) * bobAmp * .55 : 0;
    const eye = 1.68;
    const dead = p.alive ? 0 : -0.6;
    this.camera.position.set(p.pos.x + bobX, p.pos.y + eye + bobY + dead, p.pos.z);
    this.camera.rotation.set(p.pitch + this.recoilPitch, p.yaw + this.recoilYaw, Math.sin(this.camBob) * .003 * (p.speed > 0 ? 1 : 0), 'YXZ');
    // weapon model
    const wm = this.weaponModels?.[p.weapon];
    if (!wm) return;
    const base = ads ? this.weaponAdsBase : this.weaponBase;
    if (this.reloadActive) {
      // animated in animateReload
    } else if (!p.alive) {
      wm.group.position.lerp(new THREE.Vector3(.35, -.65, -.65), dt * 5);
    } else {
      const swayY = -this.lookVelY * .7;
      const swayX = -this.lookVelX * .8;
      const target = new THREE.Vector3(
        base.x + (canBob && p.speed > 0 ? Math.sin(this.camBob) * .008 : 0) + swayX,
        base.y + (canBob && p.speed > 0 ? Math.abs(Math.cos(this.camBob * 2)) * .009 : 0) + swayY,
        base.z + (this.sprinting ? .06 : 0)
      );
      wm.group.position.lerp(target, dt * (ads ? 16 : 11));
      const trot = ads ? 0 : (this.sprinting ? -.18 : -.035);
      wm.group.rotation.x = lerp(wm.group.rotation.x, trot + this.recoilPitch * .18, dt * 10);
      wm.group.rotation.y = lerp(wm.group.rotation.y, ads ? 0 : .13 + this.recoilYaw * .25, dt * 10);
      wm.group.rotation.z = lerp(wm.group.rotation.z, ads ? 0 : this.sprinting ? .22 : 0, dt * 8);
    }
  }

  /* ------------------------------------------------------------------ shooting */
  currentWeapon() { return this.player.weapon === 'primary' ? this.primaryWeapon : this.secondaryWeapon; }

  tryFire() {
    if (!this.player.alive || this.phase !== 'combat' || this.weaponSwitch > 0) return;
    const w = this.currentWeapon();
    const state = this.ammo[this.player.weapon];
    if (this.reloadActive) return;
    if (this.clockTime < (this.nextFire || 0)) return;
    if (state.mag <= 0) {
      if (!this.triggerReady) return;
      this.triggerReady = false;
      audio.empty();
      this.startReload();
      return;
    }
    this.triggerReady = true;
    this.nextFire = this.clockTime + (60 / (w.rpm * this.perks.fireRate));
    state.mag--;
    this.player.lastShot = this.clockTime;
    const wm = this.weaponModels[this.player.weapon];
    wm.flashTimer = .05;
    wm.flash.visible = true;
    wm.flash.material.rotation = Math.random() * Math.PI;
    wm.flash.scale.setScalar(rand(.4, .62));
    wm.flashLight.intensity = 4;
    // recoil
    const ads = this.ads || this.mobileAds;
    const recoilMul = ads ? .55 : 1;
    this.recoilPitch += w.recoil * (this.sprinting ? 1.6 : 1) * recoilMul;
    this.recoilYaw += rand(-1, 1) * w.recoil * .45 * recoilMul;
    this.player.pitch = clamp(this.player.pitch + w.recoil * .18, -1.42, 1.42);
    audio.gun(w.id);
    this.spawnMuzzleSmoke(wm);
    const origin = this.camera.getWorldPosition(new THREE.Vector3());
    const baseDir = this.camera.getWorldDirection(new THREE.Vector3());
    const right = new THREE.Vector3().crossVectors(baseDir, this.camera.up).normalize();
    const up = new THREE.Vector3().crossVectors(right, baseDir).normalize();
    const moving = this.player.speed > .1;
    const spread = w.spread * (ads ? .32 : 1) * (moving ? 1.55 : 1) * (this.player.onGround ? 1 : 2.3);
    for (let i = 0; i < w.pellets; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * spread;
      const dir = baseDir.clone().add(right.clone().multiplyScalar(Math.cos(a) * r)).add(up.clone().multiplyScalar(Math.sin(a) * r)).normalize();
      this.fireRay(origin, dir, w, i === 0);
    }
    this.updateWeaponHud();
  }

  fireRay(origin, dir, weapon, mainRay) {
    this.raycaster = this.raycaster || new THREE.Raycaster();
    this.raycaster.set(origin, dir);
    this.raycaster.far = weapon.range;
    const hits = this.raycaster.intersectObjects(this.enemyHitMeshes, false);
    let botHit = null;
    for (const h of hits) {
      if (h.object.userData.hit?.bot?.alive) { botHit = h; break; }
    }
    const worldHit = raycastColliders(origin, dir, weapon.range, this.map.colliders);
    const worldDist = worldHit?.distance ?? Infinity;
    const botDist = botHit?.distance ?? Infinity;
    const endPoint = new THREE.Vector3();
    const impactNormal = new THREE.Vector3(0, 1, 0);
    if (botHit && botDist < worldDist) {
      endPoint.copy(botHit.point);
      const bot = botHit.object.userData.hit.bot;
      const part = botHit.object.userData.hit.part;
      let dmg = weapon.damage;
      const falloff = clamp(1 - (botDist / weapon.range) * .45, .45, 1);
      dmg *= falloff;
      if (part === 'head') dmg *= 2.25;
      this.applyDamage(bot, dmg, this.player, part === 'head', weapon.name);
      if (mainRay || this.triggerReady) {
        this.showHitmarker(bot.hp <= 0 ? 'kill' : 'hit');
        audio.hit(bot.hp <= 0);
      }
      this.spawnSparks(endPoint, dir.clone().negate(), 8);
    } else if (worldHit) {
      endPoint.copy(worldHit.point);
      impactNormal.copy(worldHit.normal || impactNormal);
      this.spawnSparks(endPoint, impactNormal, mainRay ? 5 : 2);
    } else {
      endPoint.copy(origin).addScaledVector(dir, weapon.range);
    }
    const tracerStart = origin.clone().addScaledVector(dir, .3);
    this.spawnTracer(tracerStart, endPoint, 0xffd58a);
  }

  spawnMuzzleSmoke(wm) {
    // tiny additive sprite is enough for the low-end target
  }

  showHitmarker(kind = 'hit') {
    const hm = this.dom.hitmarker;
    hm.classList.remove('show', 'kill');
    void hm.offsetWidth;
    hm.classList.add('show');
    if (kind === 'kill') hm.classList.add('kill');
    clearTimeout(this.hitmarkerTimer);
    this.hitmarkerTimer = setTimeout(() => hm.classList.remove('show', 'kill'), kind === 'kill' ? 180 : 95);
  }

  startReload() {
    if (!this.player.alive || this.phase !== 'combat') return;
    const w = this.currentWeapon();
    const state = this.ammo[this.player.weapon];
    if (this.reloadActive || state.mag >= w.mag || state.reserve <= 0) return;
    this.reloadActive = true;
    this.reloadTimer = w.reload * this.perks.reload;
    this.reloadTotal = this.reloadTimer;
    this.reloadMagStart = state.mag;
    this.ads = false;
    this.dom.reloadHint.classList.add('show');
    audio.reload();
  }

  animateReload(dt) {
    const wm = this.weaponModels[this.player.weapon];
    if (!wm) return;
    const prog = 1 - (this.reloadTimer / this.reloadTotal);
    const dip = Math.sin(clamp(prog, 0, 1) * Math.PI);
    wm.group.rotation.z = dip * .5;
    wm.group.position.y = this.weaponBase.y - dip * .16;
    wm.group.position.x = this.weaponBase.x + dip * .04;
    wm.group.rotation.x = dip * .35;
    for (const m of wm.magParts) {
      m.position.y = Math.min(0, -prog * .12);
    }
  }

  finishReload() {
    const w = this.currentWeapon();
    const state = this.ammo[this.player.weapon];
    const need = w.mag - state.mag;
    const take = Math.min(need, state.reserve);
    state.mag += take;
    state.reserve -= take;
    this.reloadActive = false;
    this.reloadTimer = 0;
    this.dom.reloadHint.classList.remove('show');
    const wm = this.weaponModels[this.player.weapon];
    if (wm) {
      wm.group.position.set(this.weaponBase.x, this.weaponBase.y, this.weaponBase.z);
      wm.group.rotation.set(0, 0, 0);
      for (const m of wm.magParts) m.position.y = 0;
    }
    this.updateWeaponHud();
  }

  switchWeapon(slot) {
    if (!this.player.alive || this.phase !== 'combat' || this.player.weapon === slot) return;
    this.player.weapon = slot;
    this.reloadActive = false;
    this.reloadTimer = 0;
    this.dom.reloadHint.classList.remove('show');
    this.weaponSwitch = .32;
    this.weaponModels.primary.group.visible = slot === 'primary';
    this.weaponModels.secondary.group.visible = slot === 'secondary';
    this.ads = false;
    this.mobileAds = false;
    this.dom.btnAds?.classList.remove('active');
    this.updateWeaponHud();
    audio.reload();
  }

  /* ------------------------------------------------------------------ damage / kills */
  applyDamage(target, amount, attacker, headshot = false, weaponName = '') {
    if (!target.alive) return;
    if (target.protectedUntil && this.clockTime < target.protectedUntil) return;
    if (target.isPlayer) {
      amount *= this.perks.damageTaken;
      if (this.player.armor > 0) {
        const absorbed = Math.min(this.player.armor, amount * .62);
        this.player.armor -= absorbed;
        amount -= absorbed;
      }
      this.player.hp -= amount;
      this.player.lastDamage = this.clockTime;
      this.dom.damageFlash.classList.add('hit');
      clearTimeout(this.damageFlashTimer);
      this.damageFlashTimer = setTimeout(() => this.dom.damageFlash.classList.remove('hit'), 65);
      audio.damage();
      this.addDamageIndicator(attacker);
      if (this.player.hp <= 0) {
        this.player.hp = 0;
        this.killEntity(this.player, attacker, weaponName, headshot);
      }
    } else {
      target.hp -= amount;
      target.lastDamage = this.clockTime;
      target.lastAttacker = attacker;
      if (target.hp <= 0) {
        target.hp = 0;
        this.killEntity(target, attacker, weaponName, headshot);
      } else {
        // small stagger / flash ring
        target.model.userData.rig.ring.material.opacity = .9;
      }
    }
  }

  addDamageIndicator(attacker) {
    if (!attacker) return;
    const p = this.player;
    const dx = attacker.pos.x - p.pos.x, dz = attacker.pos.z - p.pos.z;
    const worldAng = Math.atan2(dx, dz);
    const forwardAng = Math.atan2(-Math.sin(p.yaw), -Math.cos(p.yaw));
    let rel = worldAng - forwardAng;
    while (rel > Math.PI) rel -= Math.PI * 2;
    while (rel < -Math.PI) rel += Math.PI * 2;
    const el = document.createElement('i');
    el.className = 'dmg-dir';
    el.style.transform = `rotate(${rel * 180 / Math.PI}deg)`;
    this.dom.damageDirs.appendChild(el);
    setTimeout(() => el.remove(), 700);
  }

  killEntity(victim, attacker, weaponName, headshot) {
    if (!victim.alive) return;
    victim.alive = false;
    victim.deaths++;
    victim.respawn = victim.isPlayer ? 4.2 : rand(3.4, 5.2);
    victim.kills = victim.kills || 0;
    const killerName = attacker ? (attacker.isPlayer ? this.player.name : attacker.name) : 'O CAOS';
    this.addKillfeed(killerName, victim.isPlayer ? this.player.name : victim.name, weaponName, headshot, attacker?.isPlayer);
    if (attacker && attacker !== victim) {
      attacker.kills++;
      attacker.points = (attacker.points || 0) + 1;
      if (attacker.team === 'blue' && (victim.team === 'orange' || this.mode.id === 'ffa')) this.teamScores.blue++;
      else if (attacker.team === 'orange' && victim.team === 'blue') this.teamScores.orange++;
      else if (attacker.team === 'blue' && victim.team === 'ffa') this.teamScores.blue++;
      if (attacker.isPlayer && this.mode.id === 'ffa') this.teamScores.blue = this.player.points;
    }
    if (victim === this.player) {
      this.firing = false;
      this.ads = false;
      this.dom.crosshair.classList.add('hidden-x');
      this.dom.reloadHint.classList.remove('show');
      this.showObjective(`<b>ELIMINADO POR ${killerName}</b> · RENASCENDO EM 4s`, 2.6);
      this.announce('VOCÊ CAIU', `${killerName} levou a melhor. Respire e volte.`, true, 2.4);
      this.weaponModels[this.player.weapon].group.visible = true;
    } else {
      const rig = victim.model.userData.rig;
      victim.model.rotation.z = rand(-1.5, 1.5);
      victim.model.rotation.x = -1.3;
      victim.model.position.y = .24;
      rig.label.visible = false;
      rig.ring.visible = false;
      rig.gun.visible = false;
      victim.model.visible = true;
      this.spawnSparks(victim.pos.clone().add(new THREE.Vector3(0, 1.2, 0)), new THREE.Vector3(0, 1, 0), 9);
      if (attacker?.isPlayer) {
        this.showObjective(`<b>${victim.name}</b> ELIMINADO`, 1.1);
      }
    }
    this.updateScoreHud();
    if (attacker?.isPlayer) this.dom.kills.textContent = this.player.kills;
    this.dom.deaths.textContent = this.player.deaths;
    this.dom.points.textContent = this.player.points;
  }

  addKillfeed(killer, victim, weapon, headshot, you) {
    const item = document.createElement('div');
    item.className = 'kill-item' + (you ? ' you' : '');
    item.innerHTML = `<span class="killer">${killer}</span><span class="k-weap">[${weapon || 'CAOS'}${headshot ? ' · <span class="k-head">☠</span>' : ''}]</span><span class="victim">${victim}</span>`;
    this.dom.killfeed.prepend(item);
    while (this.dom.killfeed.children.length > 5) this.dom.killfeed.lastChild.remove();
    setTimeout(() => item.remove(), 5500);
  }

  /* ------------------------------------------------------------------ bots AI */
  updateBot(bot, dt) {
    if (!bot.alive) {
      bot.respawn -= dt;
      if (bot.respawn <= 0) this.respawnEntity(bot);
      return;
    }
    if (this.phase !== 'combat') return;
    bot.aiTick -= dt;
    const enemies = this.allEntities.filter(e => e !== bot && e.alive && (this.mode.id === 'ffa' || e.team !== bot.team));
    if (bot.aiTick <= 0) {
      bot.aiTick = .32 + Math.random() * .25;
      let best = null, bestScore = Infinity;
      for (const e of enemies) {
        const d = bot.pos.distanceTo(e.pos);
        if (d > 44) continue;
        const los = this.hasLOS(bot.pos, e.pos);
        const score = d - (los ? 10 : 0) - (e === bot.target ? 4 : 0);
        if (score < bestScore) { bestScore = score; best = e; }
      }
      bot.target = best;
      if (!best && this.mode.id === 'dom') {
        // go capture a zone
        const z = this.zoneStates.filter(z => z.owner !== bot.team)[0] || this.zoneStates[0];
        if (z) bot.nav = { x: z.x + rand(-2, 2), z: z.z + rand(-2, 2) };
      }
    }
    let moveTarget = null;
    let speed = 3.5 * (bot.char.id === 'bochecha' ? 1.08 : 1);
    if (bot.target && bot.target.alive) {
      const t = bot.target;
      const dx = t.pos.x - bot.pos.x, dz = t.pos.z - bot.pos.z;
      const dist = Math.hypot(dx, dz);
      bot.yaw = Math.atan2(dx, dz);
      const los = this.hasLOS(bot.pos, t.pos);
      const ideal = bot.weapon.id === 'bocarra' ? 7 : bot.weapon.id === 'cuspe' ? 26 : 13;
      if (dist > ideal + 4) moveTarget = { x: t.pos.x, z: t.pos.z };
      else if (dist < ideal - 3) moveTarget = { x: bot.pos.x - dx * .8, z: bot.pos.z - dz * .8 };
      else {
        const sx = -dz / (dist || 1) * bot.strafe, sz = dx / (dist || 1) * bot.strafe;
        moveTarget = { x: bot.pos.x + sx * 4, z: bot.pos.z + sz * 4 };
        speed = 2.4;
      }
      bot.fireCooldown -= dt;
      if (los && dist < bot.weapon.range * .9 && bot.fireCooldown <= 0) {
        this.botFire(bot, t, dist);
        bot.fireCooldown = (60 / bot.weapon.rpm) * rand(1.8, 3.4) + .12;
      }
    } else {
      if (!bot.nav || Math.hypot(bot.nav.x - bot.pos.x, bot.nav.z - bot.pos.z) < 1.5 || bot.navTimer <= 0) {
        bot.nav = this.pickNav(bot);
        bot.navTimer = rand(3, 7);
      }
      bot.navTimer -= dt;
      moveTarget = bot.nav;
      speed = 3.1;
    }
    if (moveTarget) {
      const dx = moveTarget.x - bot.pos.x, dz = moveTarget.z - bot.pos.z;
      const d = Math.hypot(dx, dz);
      if (d > .4) {
        const beforeX = bot.pos.x, beforeZ = bot.pos.z;
        moveWithCollision(bot.pos, (dx / d) * speed * dt, (dz / d) * speed * dt, .35, this.map.colliders, this.map.bounds);
        bot.speed = speed;
        if (Math.hypot(bot.pos.x - beforeX, bot.pos.z - beforeZ) < .002) {
          bot.stuckTime += dt;
          if (bot.stuckTime > .5) {
            bot.strafe *= -1;
            bot.nav = this.pickNav(bot);
            bot.stuckTime = 0;
          }
        } else bot.stuckTime = 0;
        if (!bot.target) bot.yaw = lerp(bot.yaw, Math.atan2(dx, dz), dt * 5);
      } else bot.speed = 0;
    } else bot.speed = 0;
    bot.model.position.set(bot.pos.x, bot.model.position.y || 0, bot.pos.z);
    // smoothly face
    let dy = bot.yaw - bot.model.rotation.y;
    while (dy > Math.PI) dy -= Math.PI * 2;
    while (dy < -Math.PI) dy += Math.PI * 2;
    bot.model.rotation.y += dy * Math.min(1, dt * 9);
    animateBot(bot.model, this.clockTime + bot.reaction, bot.speed > .2, bot.speed);
    const label = bot.model.userData.rig.label;
    if (label) label.visible = true;
  }

  pickNav(bot) {
    if (this.mode.id === 'dom' && Math.random() < .55) {
      const z = this.zoneStates[Math.floor(Math.random() * this.zoneStates.length)];
      if (z) return { x: z.x + rand(-3, 3), z: z.z + rand(-3, 3) };
    }
    const nav = this.map.navPoints;
    for (let i = 0; i < 8; i++) {
      const p = nav[Math.floor(Math.random() * nav.length)];
      if (Math.hypot(p.x - bot.pos.x, p.z - bot.pos.z) > 8) return { x: p.x + rand(-1.5, 1.5), z: p.z + rand(-1.5, 1.5) };
    }
    const p = nav[Math.floor(Math.random() * nav.length)];
    return { x: p.x, z: p.z };
  }

  botFire(bot, target, dist) {
    bot.lastShot = this.clockTime;
    const start = bot.pos.clone().add(new THREE.Vector3(0, 1.35, 0));
    const tpos = target.pos.clone().add(new THREE.Vector3(0, 1.15, 0));
    const spread = .12 + dist * .008;
    const miss = new THREE.Vector3(rand(-spread, spread), rand(-spread, spread) * .6, rand(-spread, spread)).multiplyScalar(dist);
    const end = tpos.clone().add(miss);
    this.spawnTracer(start, end, bot.team === 'blue' ? 0x8fe3ff : 0xff9a62);
    if (dist < 32) this.audio.gun(bot.weapon.id);
    const accuracy = clamp(.68 - dist * .012 - (target.isPlayer ? .04 : 0), .12, .64);
    if (Math.random() < accuracy) {
      const head = Math.random() < .07;
      let dmg = bot.weapon.damage * (head ? .62 : .34);
      if (target.isPlayer) dmg *= .78;
      this.applyDamage(target, dmg, bot, head, bot.weapon.name);
      if (target.isPlayer) {
        this.dom.damageFlash.classList.add('hit');
        clearTimeout(this.damageFlashTimer);
        this.damageFlashTimer = setTimeout(() => this.dom.damageFlash.classList.remove('hit'), 65);
      }
    }
  }

  hasLOS(a, b) {
    const origin = new THREE.Vector3(a.x || a.pos?.x, 1.3, a.z || a.pos?.z);
    const target = new THREE.Vector3(b.x || b.pos?.x, 1.2, b.z || b.pos?.z);
    const dir = target.clone().sub(origin);
    const dist = dir.length();
    if (dist < .001) return true;
    dir.normalize();
    const hit = raycastColliders(origin, dir, dist, this.map.colliders);
    return !hit || hit.distance >= dist - .4;
  }

  /* ------------------------------------------------------------------ HUD */
  updateHud(dt) {
    this.uiTick += dt;
    const p = this.player;
    this.dom.health.textContent = Math.max(0, Math.round(p.hp));
    this.dom.armor.textContent = Math.max(0, Math.round(p.armor));
    this.dom.healthBar.style.width = `${clamp(p.hp / p.maxHp * 100, 0, 100)}%`;
    this.dom.healthBar.style.background = p.hp < p.maxHp * .3 ? 'linear-gradient(90deg,#ff3b4f,#ff7a3d)' : 'linear-gradient(90deg,#ff3b4f,#d9ff43)';
    this.dom.kills.textContent = p.kills;
    this.dom.deaths.textContent = p.deaths;
    this.dom.points.textContent = p.points;
    this.dom.timer.textContent = this.formatTime(this.matchTime);
    const w = this.currentWeapon();
    this.dom.weaponName.textContent = w.name;
    this.dom.weaponType.textContent = w.type;
    this.dom.ammoMag.textContent = this.ammo[p.weapon].mag;
    this.dom.ammoReserve.textContent = this.ammo[p.weapon].reserve;
    this.dom.ammoBar.style.width = `${clamp(this.ammo[p.weapon].mag / w.mag * 100, 0, 100)}%`;
    this.dom.ammoBar.style.background = this.ammo[p.weapon].mag <= w.mag * .25 ? 'var(--orange)' : 'var(--acid)';
    // crosshair spread
    const ads = this.ads || this.mobileAds;
    const spread = (ads ? 2 : 7) + (p.speed > .2 ? 4 : 0) + Math.min(9, Math.abs(this.recoilPitch) * 180);
    const c = this.dom.crosshair.children;
    c[0].style.transform = `translateY(${-spread}px)`;
    c[2].style.transform = `translateY(${spread}px)`;
    c[3].style.transform = `translateX(${spread}px)`;
    c[1].style.transform = `translateX(${-spread}px)`;
    this.dom.crosshair.style.opacity = ads ? .6 : .95;
    // mobile sprint/jump visual
    if (this.dom.btnAds) this.dom.btnAds.classList.toggle('active', this.mobileAds);
    if (this.uiTick > .2) {
      this.uiTick = 0;
      this.updateScoreHud();
    }
    this.miniTick += dt;
    if (this.miniTick > .08) { this.miniTick = 0; this.drawMinimap(); }
  }

  updateWeaponHud() {
    if (!this.player) return;
    const w = this.currentWeapon();
    this.dom.weaponName.textContent = w.name;
    this.dom.weaponType.textContent = w.type;
    this.dom.ammoMag.textContent = this.ammo[this.player.weapon].mag;
    this.dom.ammoReserve.textContent = this.ammo[this.player.weapon].reserve;
    this.dom.ammoBar.style.width = `${clamp(this.ammo[this.player.weapon].mag / w.mag * 100, 0, 100)}%`;
    this.dom.slotPrimary.classList.toggle('active', this.player.weapon === 'primary');
    this.dom.slotSecondary.classList.toggle('active', this.player.weapon === 'secondary');
  }

  updateScoreHud() {
    if (!this.teamScores) return;
    if (this.mode.id === 'ffa') {
      const top = Math.max(...this.allEntities.filter(e => e !== this.player).map(e => e.points || 0), 0);
      this.dom.scoreBlue.textContent = this.player.points;
      this.dom.scoreOrange.textContent = top;
      this.dom.barBlue.style.width = `${clamp(this.player.points / this.scoreLimit * 100, 0, 100)}%`;
      this.dom.barOrange.style.width = `${clamp(top / this.scoreLimit * 100, 0, 100)}%`;
    } else {
      this.dom.scoreBlue.textContent = this.teamScores.blue;
      this.dom.scoreOrange.textContent = this.teamScores.orange;
      this.dom.barBlue.style.width = `${clamp(this.teamScores.blue / this.scoreLimit * 100, 0, 100)}%`;
      this.dom.barOrange.style.width = `${clamp(this.teamScores.orange / this.scoreLimit * 100, 0, 100)}%`;
    }
  }

  drawMinimap() {
    const ctx = this.dom.minimap?.getContext('2d');
    if (!ctx || !this.map) return;
    const W = 220, H = 220;
    ctx.clearRect(0, 0, W, H);
    const b = this.map.bounds;
    const sx = W / (b.maxX - b.minX), sz = H / (b.maxZ - b.minZ);
    const s = Math.min(sx, sz);
    const ox = (W - (b.maxX - b.minX) * s) / 2, oz = (H - (b.maxZ - b.minZ) * s) / 2;
    const mapX = x => ox + (x - b.minX) * s;
    const mapZ = z => oz + (z - b.minZ) * s;
    ctx.fillStyle = 'rgba(4,12,14,.88)'; ctx.fillRect(0, 0, W, H);
    // floor subtle
    ctx.fillStyle = 'rgba(70,90,78,.12)'; ctx.fillRect(ox, oz, (b.maxX - b.minX) * s, (b.maxZ - b.minZ) * s);
    for (const c of this.map.colliders) {
      const x = mapX(c.minX), z = mapZ(c.minZ), w = (c.maxX - c.minX) * s, h = (c.maxZ - c.minZ) * s;
      ctx.fillStyle = c.tag === 'car' ? 'rgba(220,150,80,.36)' : c.tag === 'container' ? 'rgba(120,160,180,.3)' : 'rgba(160,185,170,.26)';
      ctx.fillRect(x, z, Math.max(1, w), Math.max(1, h));
    }
    // zones
    if (this.mode.id === 'dom') {
      for (const z of this.zoneStates) {
        ctx.beginPath();
        ctx.arc(mapX(z.x), mapZ(z.z), z.r * s, 0, Math.PI * 2);
        ctx.fillStyle = z.owner === 'blue' ? 'rgba(72,183,255,.24)' : z.owner === 'orange' ? 'rgba(255,122,61,.24)' : 'rgba(217,255,67,.1)';
        ctx.fill();
        ctx.strokeStyle = z.owner === 'blue' ? '#48b7ff' : z.owner === 'orange' ? '#ff7a3d' : z.contested ? '#d9ff43' : 'rgba(180,200,190,.3)';
        ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#d9ff43'; ctx.font = '900 10px Arial'; ctx.textAlign = 'center'; ctx.fillText(z.id, mapX(z.x), mapZ(z.z) + 3);
      }
    }
    // bots
    for (const bot of this.bots) {
      if (!bot.alive) continue;
      const isAlly = bot.team === this.player.team && this.mode.id !== 'ffa';
      if (!isAlly && this.clockTime - (bot.lastShot || -99) > 3.5 && bot.pos.distanceTo(this.player.pos) > 22) continue;
      ctx.beginPath();
      ctx.arc(mapX(bot.pos.x), mapZ(bot.pos.z), isAlly ? 3.4 : 3, 0, Math.PI * 2);
      ctx.fillStyle = isAlly ? '#48f2d2' : bot.teamColor || '#ff7a3d';
      ctx.fill();
      if (isAlly) { ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 1; ctx.stroke(); }
    }
    // player arrow
    const px = mapX(this.player.pos.x), pz = mapZ(this.player.pos.z);
    ctx.save(); ctx.translate(px, pz); ctx.rotate(-this.player.yaw);
    ctx.beginPath(); ctx.moveTo(0, -8); ctx.lineTo(5.5, 6); ctx.lineTo(0, 3); ctx.lineTo(-5.5, 6); ctx.closePath();
    ctx.fillStyle = '#d9ff43'; ctx.shadowColor = '#d9ff43'; ctx.shadowBlur = 7; ctx.fill(); ctx.restore();
    // view cone
    ctx.beginPath(); ctx.moveTo(px, pz);
    ctx.arc(px, pz, 22, -this.player.yaw - Math.PI / 2 - .4, -this.player.yaw - Math.PI / 2 + .4);
    ctx.closePath(); ctx.fillStyle = 'rgba(217,255,67,.055)'; ctx.fill();
  }

  formatTime(t) {
    t = Math.max(0, Math.ceil(t));
    return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
  }

  showObjective(html, seconds = 2) {
    this.dom.objective.innerHTML = html;
    this.dom.objective.classList.add('show');
    clearTimeout(this.objectiveTimer);
    this.objectiveTimer = setTimeout(() => this.dom.objective.classList.remove('show'), seconds * 1000);
  }

  announce(text, sub = '', danger = false, seconds = 1.8) {
    const el = this.dom.announce;
    el.innerHTML = `${text}${sub ? `<small>${sub}</small>` : ''}`;
    el.classList.toggle('danger', danger);
    el.classList.add('show');
    clearTimeout(this.announceTimer);
    this.announceTimer = setTimeout(() => el.classList.remove('show'), seconds * 1000);
  }

  /* ------------------------------------------------------------------ score / end */
  checkEndByScore() {
    if (this.phase !== 'combat') return;
    if (this.mode.id === 'ffa') {
      if (this.player.points >= this.scoreLimit) return this.endMatch('score');
      const leader = this.allEntities.find(e => e !== this.player && e.points >= this.scoreLimit);
      if (leader) return this.endMatch('score', leader);
    } else {
      if (this.teamScores.blue >= this.scoreLimit) return this.endMatch('score', 'blue');
      if (this.teamScores.orange >= this.scoreLimit) return this.endMatch('score', 'orange');
    }
  }

  endMatch(reason = 'score', winnerOverride = null) {
    if (this.phase === 'ended') return;
    this.phase = 'ended';
    this.firing = false;
    this.ads = false;
    this.dom.countdown.classList.add('hidden');
    this.dom.pause.classList.add('hidden');
    this.dom.reloadHint.classList.remove('show');
    this.dom.crosshair.classList.add('hidden-x');
    if (this.pointerLocked) document.exitPointerLock?.();
    let victory = false;
    let winner = winnerOverride;
    if (this.mode.id === 'ffa') {
      const top = this.allEntities.slice().sort((a, b) => (b.points - a.points) || (b.kills - a.kills))[0];
      winner = winner || top;
      victory = top === this.player;
    } else {
      if (!winner) winner = this.teamScores.blue >= this.teamScores.orange ? 'blue' : 'orange';
      victory = winner === 'blue';
    }
    const title = this.mode.id === 'ffa' ? (victory ? 'VITÓRIA' : 'DERROTA') : victory ? 'VITÓRIA' : 'DERROTA';
    this.dom.end.classList.remove('hidden');
    this.dom.end.classList.toggle('defeat', !victory);
    this.dom.endKicker.textContent = victory ? 'OPERAÇÃO CONCLUÍDA' : 'OPERAÇÃO FRACASSADA';
    this.dom.endTitle.textContent = title;
    this.dom.endSub.textContent = this.mode.id === 'ffa'
      ? `${victory ? 'Você' : winner?.name || 'Outro operador'} dominou o caos. ${this.player.kills} abates, ${this.player.deaths} mortes.`
      : victory
        ? `O Esquadrão Vespa venceu por ${this.teamScores.blue} a ${this.teamScores.orange}. O caos foi devidamente organizado.`
        : `O Esquadrão Raposa venceu por ${this.teamScores.orange} a ${this.teamScores.blue}. Culpa do estagiário.`;
    this.renderEndScreen(victory);
    this.audio.setIntense(false);
    if (victory) { this.audio.victory(); } else { this.audio.defeat(); }
    if (this.onMatchEnd) this.onMatchEnd({ victory, winner, reason });
  }

  renderEndScreen(victory) {
    const list = this.allEntities.slice().sort((a, b) => (b.points - a.points) || (b.kills - a.kills));
    const mvp = list[0];
    const portrait = this.portraits[mvp.charId];
    this.dom.endMvp.innerHTML = `${portrait ? `<img src="${portrait}" alt="">` : '<div style="width:52px;height:52px;background:#162326;display:grid;place-items:center;color:#d9ff43;font-weight:900">MVP</div>'}<div><b>${mvp.name}</b><span>MVP · ${mvp.points || 0} PONTOS · ${mvp.kills} ABATES</span></div>`;
    this.dom.endScoreboard.innerHTML = `<div class="sb-row head"><span>OPERADOR</span><span>ABATES</span><span>MORTES</span><span>PONTOS</span></div>` + list.map(e => {
      const cls = this.mode.id === 'ffa' ? '' : e.team === 'blue' ? 'blue' : 'orange';
      return `<div class="sb-row ${cls} ${e === this.player ? 'you' : ''}"><b>${e.name}</b><span>${e.kills}</span><span>${e.deaths}</span><span class="sb-score">${e.points || 0}</span></div>`;
    }).join('');
  }

  renderScoreboard() {
    const list = this.allEntities.slice().sort((a, b) => (b.points - a.points) || (b.kills - a.kills));
    const rows = list.map(e => {
      const cls = this.mode.id === 'ffa' ? '' : e.team === 'blue' ? 'blue' : 'orange';
      return `<div class="sb-row ${cls} ${e === this.player ? 'you' : ''}"><b>${e.name}</b><span>${e.kills}</span><span>${e.deaths}</span><span class="sb-score">${e.points || 0}</span></div>`;
    }).join('');
    this.dom.scoreboardBody.innerHTML = `<div class="sb-row head"><span>OPERADOR</span><span>ABATES</span><span>MORTES</span><span>PONTOS</span></div>` + rows;
  }

  showScoreboard(show) {
    if (show) this.renderScoreboard();
    this.dom.scoreboard.classList.toggle('hidden', !show);
  }

  /* ------------------------------------------------------------------ pause / resize / render */
  pause() {
    if (!this.active || this.phase === 'ended' || this.phase === 'paused') return;
    this.phase = 'paused';
    this.firing = false;
    this.dom.pause.classList.remove('hidden');
    this.dom.mobileControls.classList.add('hidden');
    this.audio.setIntense(false);
    if (this.pointerLocked) document.exitPointerLock?.();
  }

  resume() {
    if (this.phase !== 'paused') return;
    this.phase = this.countdown > 0 ? 'countdown' : 'combat';
    this.dom.pause.classList.add('hidden');
    if (this.isTouch) this.dom.mobileControls.classList.remove('hidden');
    this.audio.setIntense(true);
  }

  resize() {
    if (!this.camera) return;
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  render() {
    if (!this.scene || !this.camera) return;
    this.renderer.render(this.scene, this.camera);
  }
}
