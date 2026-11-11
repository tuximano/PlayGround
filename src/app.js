// Application shell: renderer, scene backgrounds, single animation loop and navigation.
import * as THREE from 'three';
import { SoundEngine } from './game/audio.js';
import { buildShowcase, buildStudio, buildGym } from './three/environment.js';
import { Boxer } from './three/boxer.js';
import { DEFAULT_APPEARANCE, persist, bus } from './core/store.js';
import { appearanceForFighter } from './core/appearance.js';
import { DIVISIONS } from './core/data.js';

export class App {
  constructor(canvas) {
    this.canvas = canvas;
    const coarse = typeof matchMedia !== 'undefined' && matchMedia('(pointer:coarse)').matches;
    this.mobile = coarse || (typeof innerWidth !== 'undefined' && innerWidth < 860);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: !this.mobile, alpha: false, powerPreference: 'high-performance', stencil: false });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.quality = this.mobile ? 'medium' : 'high';
    this.applyQuality();
    this.audio = new SoundEngine();
    this.clock = new THREE.Clock();
    this.background = null;
    this.frameHook = null;
    this.navigator = () => {};
    this.save = null;
    this.universe = null;
    this.transition = 0;
    this.menuNews = [];
    this.resize = this.resize.bind(this);
    window.addEventListener('resize', this.resize);
    this.resize();
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
    this.lastFps = 60;
    this.fpsAccum = 0;
    this.fpsFrames = 0;
  }

  applyQuality() {
    const dpr = window.devicePixelRatio || 1;
    const cap = this.quality === 'low' ? 1 : this.quality === 'medium' ? 1.35 : 1.8;
    this.renderer.setPixelRatio(Math.min(dpr, cap));
    this.renderer.shadowMap.enabled = this.quality !== 'low';
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
  }

  setQuality(q) {
    this.quality = q;
    this.applyQuality();
    this.resize();
  }

  boot({ save, universe }) {
    this.save = save;
    this.universe = universe;
    if (save) this.audio.setSettings(save.settings || {});
  }

  navigate(screen, data = {}) {
    this.navigator(screen, data);
  }

  setFrame(fn) {
    this.frameHook = fn;
  }

  clearBackground() {
    if (this.background?.dispose) this.background.dispose();
    if (this.background?.scene) {
      this.background.scene.traverse?.((o) => {
        if (o.isMesh) {
          o.geometry?.dispose?.();
          if (o.material?.map) o.material.map = null;
          o.material?.dispose?.();
        }
      });
    }
    this.background = null;
    this.setFrame(null);
  }

  defaultAppearance() {
    if (this.save?.profile?.appearance) return this.save.profile.appearance;
    return appearanceForFighter({ id: 'hero-default', name: 'Kaito', division: 'middle' });
  }

  showMenu() {
    this.clearBackground();
    const env = buildShowcase();
    const app = this.save?.profile?.appearance || this.defaultAppearance();
    const hero = new Boxer(app, { robe: false, quality: this.quality });
    const mobile = this.mobile;
    hero.root.position.set(mobile ? 0 : 0.55, 0.26, 0.1);
    hero.root.rotation.y = -0.12;
    env.scene.add(hero.root);
    hero.setExpression('focused');
    const camera = new THREE.PerspectiveCamera(mobile ? 46 : 35, window.innerWidth / window.innerHeight, 0.1, 60);
    const setCam = () => {
      if (window.innerWidth / window.innerHeight < 1) {
        camera.position.set(1.35, 1.62, 5.9);
        camera.lookAt(0.0, 1.22, 0);
      } else {
        camera.position.set(3.0, 1.72, 6.35);
        camera.lookAt(0.4, 1.12, 0);
      }
    };
    setCam();
    let t = 0;
    this.background = {
      kind: 'showcase', scene: env.scene, camera, boxer: hero,
      update: (dt) => {
        t += dt;
        hero.update(dt, { stamina: 100, idle: true });
        hero.root.rotation.y = -0.12 + Math.sin(t * 0.22) * 0.18;
        env.update(dt);
        camera.position.x += Math.sin(t * 0.18) * 0.0006;
        camera.lookAt(mobile ? 0 : 0.4, 1.12, 0);
      },
      resize: () => { camera.aspect = window.innerWidth / window.innerHeight; camera.fov = window.innerWidth / window.innerHeight < 1 ? 46 : 35; camera.updateProjectionMatrix(); setCam(); },
      render: () => this.renderer.render(env.scene, camera),
      dispose: () => { hero.dispose(); env.dispose(); },
    };
  }

  showEditor(appearance) {
    this.clearBackground();
    const env = buildStudio();
    const boxer = new Boxer(appearance, { robe: false, quality: this.quality });
    boxer.root.position.set(0, 0.14, 0);
    boxer.setExpression('focused');
    env.scene.add(boxer.root);
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 60);
    const place = () => {
      const portrait = window.innerWidth / window.innerHeight < 0.9;
      camera.position.set(0, portrait ? 1.65 : 1.5, portrait ? 5.2 : 4.5);
      camera.lookAt(0, portrait ? 1.1 : 1.05, 0);
    };
    place();
    let t = 0;
    let rot = 0;
    this.background = {
      kind: 'studio', scene: env.scene, camera, boxer,
      update: (dt) => {
        t += dt;
        if (!this.editorDragging) boxer.root.rotation.y = Math.sin(t * 0.3) * 0.22;
        else boxer.root.rotation.y = rot;
        boxer.update(dt, { stamina: 100, idle: true });
        env.update(dt);
      },
      setRotation: (r) => { rot = r; this.editorDragging = true; setTimeout(() => { this.editorDragging = false; }, 1600); },
      resize: () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); place(); },
      render: () => this.renderer.render(env.scene, camera),
      dispose: () => { boxer.dispose(); env.dispose(); },
    };
    return boxer;
  }

  showGym() {
    this.clearBackground();
    const env = buildGym();
    const appearance = this.save?.profile?.appearance || this.defaultAppearance();
    const player = new Boxer(appearance, { robe: false, quality: this.quality });
    player.root.position.set(2.2, 0.02, -5.2);
    player.root.rotation.y = Math.PI * 0.92;
    env.scene.add(player.root);
    const camera = new THREE.PerspectiveCamera(44, window.innerWidth / window.innerHeight, 0.1, 60);
    const place = () => {
      const portrait = window.innerWidth / window.innerHeight < 0.9;
      camera.position.set(portrait ? 3.2 : 4.5, 1.8, portrait ? 4.6 : 5.4);
      camera.lookAt(0, 1.05, -1.4);
    };
    place();
    let t = 0;
    this.background = {
      kind: 'gym', scene: env.scene, camera, coach: env.coach, player,
      update: (dt) => {
        t += dt;
        env.update(dt);
        const cycle = t % 2.1;
        const punch = cycle < 0.2 ? 'jab' : null;
        player.update(dt, {
          stamina: 82, action: punch, actionTime: cycle % 0.3, actionDur: 0.3,
          moveZ: 0, expression: 'focused',
        });
        env.coach.update(dt, { stamina: 95, idle: true });
      },
      resize: () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); place(); },
      render: () => this.renderer.render(env.scene, camera),
      dispose: () => { player.dispose(); env.dispose(); },
    };
  }

  showFight(view) {
    this.clearBackground();
    this.background = {
      kind: 'fight', scene: view.scene, camera: view.camera, view,
      update: (dt) => view.update(dt),
      render: () => view.render(),
      resize: () => view.resize(window.innerWidth, window.innerHeight),
      dispose: () => view.dispose(),
    };
    view.resize(window.innerWidth, window.innerHeight);
  }

  recreateMenu() {
    if (this.background?.kind === 'showcase') this.showMenu();
  }

  saveNow() {
    persist(this.save, true);
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.applyQuality();
    if (this.background?.resize) this.background.resize();
  }

  loop() {
    requestAnimationFrame(this.loop);
    const dt = Math.min(0.05, this.clock.getDelta());
    this.fpsAccum += dt;
    this.fpsFrames++;
    if (this.fpsAccum > 1) {
      this.lastFps = Math.round(this.fpsFrames / this.fpsAccum);
      this.fpsAccum = 0;
      this.fpsFrames = 0;
    }
    this.audio.update(dt);
    try {
      if (this.background?.update) this.background.update(dt);
      if (this.frameHook) this.frameHook(dt);
      if (this.background?.render) this.background.render();
    } catch (err) {
      console.error('Frame error', err);
    }
    bus.emit('frame', dt);
  }
}
