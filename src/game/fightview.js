// Cinematic fight rendering: camera direction, animation states, impacts, sweat, replay.
import * as THREE from 'three';
import { buildArena } from '../three/environment.js';
import { Boxer, makeChampionshipBelt } from '../three/boxer.js';
import { appearanceForFighter } from '../core/appearance.js';
import { sparkTexture } from '../three/textures.js';
import { clamp, lerp, damp } from '../core/rng.js';

const VISUAL_SCALE = 0.68;

export class FightView {
  constructor({ renderer, engine, arenaConfig, quality = 'high', appearances = {}, mobile = false }) {
    this.renderer = renderer;
    this.engine = engine;
    this.quality = quality;
    this.mobile = mobile;
    this.arena = buildArena(arenaConfig, { quality, crowd: true, staff: true });
    this.scene = this.arena.scene;
    this.camera = new THREE.PerspectiveCamera(mobile ? 54 : 46, 1, 0.1, 80);
    this.camera.position.set(3.4, 2.2, 5.5);
    this.camera.lookAt(0, 1.2, 0);
    this.cameraTarget = new THREE.Vector3(0, 1.15, 0);
    this.camPos = this.camera.position.clone();
    this.camLook = new THREE.Vector3(0, 1.15, 0);
    this.time = 0;
    this.entrance = null;
    this.replay = null;
    this.frames = [];
    this.recordTimer = 0;
    this.shake = 0;
    this.flash = 0;
    this.heat = 0.25;
    this.beltGroup = null;
    this.confetti = null;
    this.hitstop = 0;
    this.koCamera = false;
    this.lastPhase = 'intro';
    this.resultShownAt = 0;
    this.flashSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: sparkTexture(), color: '#fff7d0', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.flashSprite.scale.setScalar(3);
    this.flashSprite.position.set(0, 1.2, 0);
    this.scene.add(this.flashSprite);

    // Boxers
    const p1App = appearances.p1 || appearanceForFighter(engine.fighters[0].def, engine.fighters[0].def.division);
    const p2App = appearances.p2 || appearanceForFighter(engine.fighters[1].def, engine.fighters[1].def.division);
    this.boxers = [
      new Boxer(p1App, { robe: true, quality }),
      new Boxer(p2App, { robe: true, quality }),
    ];
    for (const b of this.boxers) {
      b.setRobe(true);
      this.arena.root.add(b.root);
      b.root.position.set(0, 0, 0);
      // Soft contact shadow
      const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.38, 20), new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.32, depthWrite: false }));
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = 0.012;
      b.root.add(shadow);
      b.shadow = shadow;
    }
    this.syncFighters(1);
    this.boxers[0].root.rotation.y = Math.PI;
    this.boxers[1].root.rotation.y = 0;
    // Place boxers in their corners for the entrance.
    this.entrancePos = [
      new THREE.Vector3(2.0, 0, 2.2),
      new THREE.Vector3(-2.0, 0, -2.2),
    ];

    this.setupEffects();
    this.updateCamera(0.016, true);
  }

  setArenaShadow(on) {
    // toggles staff/ref shadows only for performance
    for (const s of this.arena.staff) s.root.traverse((o) => { if (o.isMesh) o.castShadow = on; });
  }

  setupEffects() {
    this.sparks = [];
    for (let i = 0; i < 10; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: sparkTexture(), color: '#ffd27a', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
      s.scale.setScalar(0.5);
      this.scene.add(s);
      this.sparks.push({ sprite: s, life: 0, max: 0, size: 0.5, color: '#ffd27a' });
    }
    // Sweat particle pool
    this.sweatCount = 140;
    const pos = new Float32Array(this.sweatCount * 3);
    const vel = new Float32Array(this.sweatCount * 3);
    const life = new Float32Array(this.sweatCount);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.sweat = { pos, vel, life, cursor: 0, geo };
    const sweatMat = new THREE.PointsMaterial({ color: '#fff5d4', size: 0.028, transparent: true, opacity: 0.8, depthWrite: false, blending: THREE.AdditiveBlending });
    this.sweatPoints = new THREE.Points(geo, sweatMat);
    this.sweatPoints.frustumCulled = false;
    this.scene.add(this.sweatPoints);
    // Contact flash ring
    this.impactRing = new THREE.Mesh(new THREE.RingGeometry(0.12, 0.18, 24), new THREE.MeshBasicMaterial({ color: '#fff0b0', transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.scene.add(this.impactRing);
    this.impactRingLife = 0;
  }

  handleEvent(ev) {
    if (!ev) return;
    switch (ev.type) {
      case 'hit':
      case 'critical': {
        const defender = ev.defender === 'p1' ? this.boxers[0] : this.boxers[1];
        const attacker = ev.attacker === 'p1' ? this.boxers[0] : this.boxers[1];
        const glove = attacker.getGloveWorld(ev.type === 'jab' ? 'L' : 'R');
        const head = defender.getHeadWorld();
        const pos = new THREE.Vector3().lerpVectors(glove, head, 0.48);
        pos.y = ev.target === 'body' ? Math.min(pos.y, 1.15) : pos.y;
        this.spawnImpact(pos, ev.damage, ev.crit, ev.defender);
        defender.flash(ev.crit ? '#ffd36e' : '#ff7a5c');
        this.shake = Math.min(0.8, this.shake + 0.08 + (ev.damage || 0) / 130);
        if (ev.crit) this.flash = Math.max(this.flash, 0.45);
        if ((ev.damage || 0) > 10) this.hitstop = 0.055;
        this.spawnSweat(head, ev.crit ? 16 : 8, ev.attacker === 'p1' ? 1 : -1);
        break;
      }
      case 'block': {
        const defender = ev.defender === 'p1' ? this.boxers[0] : this.boxers[1];
        const glove = defender.getGloveWorld('R');
        this.spawnImpact(glove, 2, false, ev.defender, '#bfe6ff');
        this.shake = Math.min(0.5, this.shake + 0.035);
        break;
      }
      case 'knockdown':
      case 'ko':
        this.shake = 0.9;
        this.flash = 1;
        this.koCamera = true;
        break;
      case 'guardBreak':
        this.flash = Math.max(this.flash, 0.25);
        break;
      case 'getUp':
        this.flashSprite.material.color.set('#a8ffcf');
        break;
      default:
        break;
    }
  }

  spawnImpact(pos, damage = 4, crit = false, defenderId = 'p2', color = null) {
    const spark = this.sparks.find((s) => s.life <= 0) || this.sparks[0];
    spark.life = 0.28;
    spark.max = 0.28;
    spark.size = clamp(0.35 + damage / 26, 0.35, 1.25) * (crit ? 1.4 : 1);
    spark.sprite.position.copy(pos);
    spark.sprite.material.color.set(color || (crit ? '#ffe9a3' : '#ffc27a'));
    spark.sprite.material.opacity = 1;
    spark.sprite.scale.setScalar(spark.size * 0.6);
    spark.crit = crit;
    this.impactRing.position.copy(pos);
    this.impactRing.position.z += 0.01;
    this.impactRing.material.color.set(color || '#fff0b0');
    this.impactRing.material.opacity = 0.9;
    this.impactRingLife = 0.2;
    this.impactRing.scale.setScalar(1);
    // opponent flinch offset
    const b = defenderId === 'p1' ? this.boxers[0] : this.boxers[1];
    b.flinch = (Math.random() < 0.5 ? -1 : 1) * 0.12;
  }

  spawnSweat(origin, count = 8, dir = 1) {
    if (!this.sweat) return;
    for (let i = 0; i < count; i++) {
      const idx = this.sweat.cursor;
      this.sweat.cursor = (this.sweat.cursor + 1) % this.sweatCount;
      this.sweat.pos[idx * 3] = origin.x + (Math.random() - 0.5) * 0.2;
      this.sweat.pos[idx * 3 + 1] = origin.y + (Math.random() - 0.5) * 0.2;
      this.sweat.pos[idx * 3 + 2] = origin.z + (Math.random() - 0.5) * 0.2;
      this.sweat.vel[idx * 3] = (Math.random() - 0.5) * 1.8 + dir * 0.4;
      this.sweat.vel[idx * 3 + 1] = 0.8 + Math.random() * 1.8;
      this.sweat.vel[idx * 3 + 2] = (Math.random() - 0.5) * 1.8;
      this.sweat.life[idx] = 0.45 + Math.random() * 0.4;
    }
    this.sweatPoints.visible = true;
  }

  startEntrance() {
    this.entrance = { t: 0, dur: 3.1 };
    for (const b of this.boxers) b.setRobe(true);
    this.boxers[0].root.position.copy(this.entrancePos[0]);
    this.boxers[1].root.position.copy(this.entrancePos[1]);
    this.boxers[0].root.rotation.y = Math.PI * 0.8;
    this.boxers[1].root.rotation.y = -Math.PI * 0.2;
    this.boxers[0].update(0.016, { entrance: true, robe: true });
    this.boxers[1].update(0.016, { entrance: true, robe: true });
  }

  endEntrance() {
    this.entrance = null;
    for (const b of this.boxers) b.setRobe(false);
    this.syncFighters(1);
  }

  update(dt, { paused = false } = {}) {
    if (this.hitstop > 0) {
      this.hitstop = Math.max(0, this.hitstop - dt);
      dt *= 0.15;
    }
    this.time += dt;
    this.heat = damp(this.heat, this.engine.heat || 0.25, 1.2, dt);
    this.shake = Math.max(0, this.shake - dt * 2.4);
    this.flash = Math.max(0, this.flash - dt * 3.2);

    if (this.replay) {
      this.updateReplay(dt);
      this.updateParticles(dt);
      this.updateConfetti(dt);
      this.arena.update(dt, this.heat);
      return;
    }

    if (this.entrance) {
      this.entrance.t += dt;
      const p = clamp(this.entrance.t / this.entrance.dur, 0, 1);
      const ease = p * p * (3 - 2 * p);
      const start0 = new THREE.Vector3(-0.06 * VISUAL_SCALE, 0, (1.62 / 2) * VISUAL_SCALE);
      const start1 = new THREE.Vector3(0.06 * VISUAL_SCALE, 0, -(1.62 / 2) * VISUAL_SCALE);
      this.boxers[0].root.position.lerpVectors(this.entrancePos[0], start0, ease);
      this.boxers[1].root.position.lerpVectors(this.entrancePos[1], start1, ease);
      this.boxers[0].root.rotation.y = lerp(Math.PI * 0.8, Math.PI, ease);
      this.boxers[1].root.rotation.y = lerp(-Math.PI * 0.2, 0, ease);
      for (const [i, b] of this.boxers.entries()) {
        b.update(dt, { entrance: p < 0.9, robe: true, moveZ: 1, moveX: 0, stamina: 100 });
      }
      this.updateStaff(dt);
      this.updateCamera(dt, false, true);
      this.arena.update(dt, 0.6);
      this.updateParticles(dt);
      if (p >= 1 && !this._entranceDone) {
        this._entranceDone = true;
        this.onEntranceDone?.();
      }
      return;
    }

    this.syncFighters(dt);
    this.updateStaff(dt);
    this.updateCamera(dt);
    this.arena.update(dt, Math.min(1, this.heat + (this.engine.phase === 'knockdown' ? 0.35 : 0)));
    this.updateParticles(dt);
    this.updateConfetti(dt);
    this.recordFrame(dt);
    if (this.engine.result && this.engine.phase === 'end' && !this.resultAt) this.resultAt = this.time;
    if (this.engine.result && !this.beltGroup) this.maybeCelebrate();
  }

  syncFighters(dt) {
    const [f1, f2] = this.engine.fighters;
    const fighting = this.engine.phase !== 'intro';
    for (const [i, f] of [f1, f2].entries()) {
      const b = this.boxers[i];
      if (!f || !b) continue;
      const x = f.pos.x * VISUAL_SCALE;
      const z = f.pos.z * VISUAL_SCALE;
      b.root.position.x = damp(b.root.position.x, x, 20, dt);
      b.root.position.z = damp(b.root.position.z, z, 20, dt);
      b.root.position.y = 0.012;
      b.root.rotation.y = f.facing;
      const down = this.engine.phase === 'knockdown' && this.engine.down?.fighter?.id === f.id;
      const downKo = (this.engine.phase === 'ko' || this.engine.phase === 'end') && this.engine.result?.loserId === f.id && ['KO', 'TKO'].includes(this.engine.result.method);
      const state = {
        moveX: f.moveX || 0,
        moveZ: f.moveZ || 0,
        blocking: f.blocking,
        dodging: f.dodge.active,
        dodgeDir: f.dodge.dir,
        action: f.action?.type || null,
        actionTime: f.action?.time || 0,
        actionDur: f.action?.def?.dur || 0,
        stun: f.stun,
        stamina: f.stamina,
        hp: f.hp,
        knockedDown: down || downKo,
        fallProgress: down ? this.engine.down?.fallProgress || 1 : downKo ? 1 : 0,
        victory: !!(this.engine.result && this.engine.result.winnerId === f.id && this.engine.phase === 'end'),
        defeated: downKo || !!(this.engine.result && this.engine.result.loserId === f.id && this.engine.phase === 'end' && !['KO', 'TKO'].includes(this.engine.result.method)),
        robe: false,
      };
      const wasBlocking = b._blocking;
      b.update(dt, state);
      b._blocking = f.blocking;
      if (b.shadow) {
        b.shadow.material.opacity = down || downKo ? 0.2 : 0.32;
      }
      if (this.engine.result && this.engine.phase === 'end' && this.engine.result.winnerId === f.id) {
        b.setExpression('happy');
      } else if (f.stun > 0.1) b.setExpression('hurt');
      else if (f.stamina < 24) b.setExpression('tired');
      else if (f.action) b.setExpression('focused');
      else b.setExpression('neutral');
    }
  }

  updateStaff(dt) {
    const ref = this.arena.referee;
    if (!ref) return;
    const e = this.engine;
    let targetX = 0.0, targetZ = -2.3;
    let rotation = 0;
    if (e.phase === 'knockdown' && e.down) {
      const f = e.fighters.find((x) => x.id === e.down.fighter.id);
      if (f) {
        targetX = f.pos.x * VISUAL_SCALE + 0.65;
        targetZ = f.pos.z * VISUAL_SCALE + 0.55;
        rotation = Math.atan2(-(f.pos.x * VISUAL_SCALE - targetX), -(f.pos.z * VISUAL_SCALE - targetZ));
        // wave down
        ref.setExpression('focused');
      }
    } else if (e.phase === 'end' && e.result?.winnerId) {
      const w = e.fighters.find((f) => f.id === e.result.winnerId);
      if (w) {
        targetX = w.pos.x * VISUAL_SCALE + 0.65;
        targetZ = w.pos.z * VISUAL_SCALE + 0.35;
        rotation = Math.atan2(-(w.pos.x * VISUAL_SCALE - targetX), -(w.pos.z * VISUAL_SCALE - targetZ));
        ref.setExpression('happy');
      }
    } else {
      targetX = Math.sin(this.time * 0.2) * 0.6;
      targetZ = -2.35;
      rotation = 0;
    }
    ref.root.position.x = damp(ref.root.position.x, targetX, 2.2, dt);
    ref.root.position.z = damp(ref.root.position.z, targetZ, 2.2, dt);
    ref.root.rotation.y = damp(ref.root.rotation.y, rotation, 3, dt);
    const knee = e.phase === 'knockdown' ? 0.9 : 0.15;
    ref.update(dt, { stamina: 90, stance: knee, blocking: false });
    for (const s of this.arena.staff) {
      if (s === ref) continue;
      s.update(dt, { stamina: 95, idle: true });
    }
  }

  updateCamera(dt, forced = false, entrance = false) {
    const e = this.engine;
    const aspect = this.camera.aspect;
    const mobileFactor = aspect < 1 ? 1.26 : 1;
    const [f1, f2] = e.fighters;
    const mid = new THREE.Vector3(
      ((f1.pos.x + f2.pos.x) / 2) * VISUAL_SCALE,
      1.08,
      ((f1.pos.z + f2.pos.z) / 2) * VISUAL_SCALE,
    );
    let desiredPos;
    let desiredLook;
    if (entrance) {
      const p = clamp((this.entrance?.t || 0) / (this.entrance?.dur || 3), 0, 1);
      const ease = p * p * (3 - 2 * p);
      desiredPos = new THREE.Vector3(lerp(-3.6, 3.1, ease), lerp(0.65, 2.0, ease), lerp(6.0, 5.0, ease));
      desiredLook = new THREE.Vector3(lerp(1.6, 0, ease), lerp(0.75, 1.1, ease), 0.2);
    } else if (e.phase === 'knockdown' && e.down) {
      const f = e.fighters.find((x) => x.id === e.down.fighter.id) || f1;
      const x = f.pos.x * VISUAL_SCALE;
      const z = f.pos.z * VISUAL_SCALE;
      desiredPos = new THREE.Vector3(x + 1.55 * mobileFactor, 0.82, z + 1.85 * mobileFactor);
      desiredLook = new THREE.Vector3(x, 0.5, z);
    } else if (e.phase === 'ko' && e.result) {
      const loser = e.fighters.find((f) => f.id === e.result.loserId) || f2;
      const winner = e.fighters.find((f) => f.id === e.result.winnerId) || f1;
      const x = loser.pos.x * VISUAL_SCALE;
      const z = loser.pos.z * VISUAL_SCALE;
      const t = clamp((e.phaseTime || 0) / 4, 0, 1);
      desiredPos = new THREE.Vector3(x + 2.0 * mobileFactor, 0.8 + t * 0.4, z + 1.9 * mobileFactor);
      desiredLook = new THREE.Vector3(x, 0.42, z);
      desiredPos.y += Math.sin(this.time * 0.8) * 0.03;
    } else if (e.phase === 'end' && e.result?.winnerId) {
      const w = e.fighters.find((f) => f.id === e.result.winnerId) || f1;
      const x = w.pos.x * VISUAL_SCALE;
      const z = w.pos.z * VISUAL_SCALE;
      desiredPos = new THREE.Vector3(x + 1.55 * mobileFactor, 1.5, z + 2.15 * mobileFactor);
      desiredLook = new THREE.Vector3(x, 1.15, z);
      if (this.beltGroup) {
        desiredLook.set(0, 1.2, 0);
        desiredPos.set(1.1, 1.8, 3.4);
      }
    } else {
      const dist = Math.abs(f1.pos.z - f2.pos.z) + Math.abs(f1.pos.x - f2.pos.x);
      const zoom = clamp(dist * 0.16, 0, 0.45);
      desiredPos = new THREE.Vector3(
        mid.x + (2.85 + zoom) * mobileFactor,
        1.95 + (mobileFactor - 1) * 0.8,
        mid.z + (4.6 + zoom * 2.2) * mobileFactor,
      );
      desiredLook = new THREE.Vector3(mid.x, 1.05, mid.z);
      // subtle orbit with the action
      desiredPos.x += Math.sin(this.time * 0.22) * 0.12;
      desiredPos.y += Math.sin(this.time * 0.35) * 0.04;
    }
    const lambda = entrance ? 2.4 : forced ? 100 : (e.phase === 'knockdown' || e.phase === 'ko' ? 2.0 : 3.4);
    this.camera.position.x = damp(this.camera.position.x, desiredPos.x, lambda, dt);
    this.camera.position.y = damp(this.camera.position.y, desiredPos.y, lambda, dt);
    this.camera.position.z = damp(this.camera.position.z, desiredPos.z, lambda, dt);
    this.cameraTarget.x = damp(this.cameraTarget.x, desiredLook.x, lambda, dt);
    this.cameraTarget.y = damp(this.cameraTarget.y, desiredLook.y, lambda, dt);
    this.cameraTarget.z = damp(this.cameraTarget.z, desiredLook.z, lambda, dt);
    if (this.shake > 0.01) {
      const s = this.shake * 0.12;
      this.camera.position.x += (Math.random() - 0.5) * s;
      this.camera.position.y += (Math.random() - 0.5) * s;
      this.camera.position.z += (Math.random() - 0.5) * s * 0.5;
    }
    this.camera.lookAt(this.cameraTarget);
  }

  renderCamera(dt) {
    if (this.replay) {
      // camera handled by replay frames
      return;
    }
    if (this.shake > 0.01) { /* handled in updateCamera */ }
    this.camera.lookAt(this.cameraTarget);
  }

  updateParticles(dt) {
    for (const spark of this.sparks) {
      if (spark.life <= 0) { spark.sprite.material.opacity = 0; continue; }
      spark.life -= dt;
      const p = 1 - spark.life / spark.max;
      spark.sprite.material.opacity = Math.max(0, 1 - p) * 0.95;
      const s = spark.size * (0.55 + p * 1.3);
      spark.sprite.scale.setScalar(s);
    }
    if (this.impactRingLife > 0) {
      this.impactRingLife -= dt;
      const p = 1 - this.impactRingLife / 0.2;
      this.impactRing.material.opacity = Math.max(0, 1 - p);
      this.impactRing.scale.setScalar(1 + p * 3.5);
    } else {
      this.impactRing.material.opacity = 0;
    }
    // Sweat
    const { pos, vel, life } = this.sweat;
    for (let i = 0; i < this.sweatCount; i++) {
      if (life[i] <= 0) {
        if (pos[i * 3 + 1] > -5) pos[i * 3 + 1] = -10;
        continue;
      }
      life[i] -= dt;
      vel[i * 3 + 1] -= 5.5 * dt;
      pos[i * 3] += vel[i * 3] * dt;
      pos[i * 3 + 1] += vel[i * 3 + 1] * dt;
      pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
      if (pos[i * 3 + 1] < 0.03) { pos[i * 3 + 1] = 0.03; vel[i * 3 + 1] *= -0.2; vel[i * 3] *= 0.5; }
    }
    this.sweat.geo.attributes.position.needsUpdate = true;
    this.flashSprite.material.opacity = this.flash * 0.65;
    this.flashSprite.scale.setScalar(2 + this.flash * 2);
    this.flashSprite.material.color.set(this.flash > 0.5 ? '#ffd27a' : '#ff7a4a');
    if (this.flinchTimer > 0) this.flinchTimer -= dt;
  }

  recordFrame(dt) {
    if (this.engine.phase === 'intro' || this.engine.phase === 'roundEnd') return;
    this.recordTimer += dt;
    if (this.recordTimer < 0.045) return;
    this.recordTimer = 0;
    const frame = {
      t: this.time,
      cam: { pos: this.camera.position.toArray(), look: this.cameraTarget.toArray() },
      boxers: this.boxers.map((b) => ({
        pos: b.root.position.toArray(),
        ry: b.root.rotation.y,
        state: b.getRenderState(),
      })),
      heat: this.heat,
      phase: this.engine.phase,
    };
    this.frames.push(frame);
    if (this.frames.length > 170) this.frames.shift();
  }

  startReplay(seconds = 4, speed = 0.42, onDone = null) {
    if (this.frames.length < 4) { onDone?.(); return false; }
    const cutoff = this.time - seconds;
    const frames = this.frames.filter((f) => f.t >= cutoff);
    if (frames.length < 4) { onDone?.(); return false; }
    this.replay = { frames, index: 0, elapsed: 0, speed, onDone, duration: seconds };
    this._entranceDone = false;
    return true;
  }

  updateReplay(dt) {
    const r = this.replay;
    if (!r) return;
    r.elapsed += dt;
    const frames = r.frames;
    const tStart = frames[0].t;
    const targetT = tStart + r.elapsed * r.speed;
    let i = r.index;
    while (i < frames.length - 1 && frames[i + 1].t <= targetT) i++;
    r.index = i;
    const f = frames[i];
    const next = frames[Math.min(frames.length - 1, i + 1)];
    const p = next.t > f.t ? clamp((targetT - f.t) / (next.t - f.t), 0, 1) : 0;
    for (const [bi, b] of this.boxers.entries()) {
      const a = f.boxers[bi], c = next.boxers[bi];
      if (!a) continue;
      b.root.position.set(lerp(a.pos[0], c.pos[0], p), lerp(a.pos[1], c.pos[1], p), lerp(a.pos[2], c.pos[2], p));
      b.root.rotation.y = lerp(a.ry, c.ry, p);
      const pose = {};
      for (const k of Object.keys(a.state.pose)) pose[k] = lerp(a.state.pose[k], c.state?.pose?.[k] ?? a.state.pose[k], p);
      b.applyRenderState({ ...a.state, pose });
    }
    this.camera.position.set(
      lerp(f.cam.pos[0], next.cam.pos[0], p),
      lerp(f.cam.pos[1], next.cam.pos[1], p),
      lerp(f.cam.pos[2], next.cam.pos[2], p),
    );
    const look = new THREE.Vector3(
      lerp(f.cam.look[0], next.cam.look[0], p),
      lerp(f.cam.look[1], next.cam.look[1], p),
      lerp(f.cam.look[2], next.cam.look[2], p),
    );
    this.camera.lookAt(look);
    this.cameraTarget.copy(look);
    this.heat = f.heat;
    if (r.elapsed * r.speed >= (frames[frames.length - 1].t - tStart) || r.elapsed > 18) {
      const cb = r.onDone;
      this.replay = null;
      this.syncFighters(1);
      cb?.();
    }
  }

  maybeCelebrate() {
    const result = this.engine.result;
    if (!result || this.engine.phase !== 'end') return;
    if (!['KO', 'TKO', 'DEC', 'QUIT'].includes(result.method)) return;
    // Confetti burst
    if (!this.confetti) this.spawnConfetti();
    // Belt appears if a career belt was attached
    if (this.pendingBelt && !this.beltGroup) {
      const belt = makeChampionshipBelt(this.pendingBelt);
      belt.position.set(0, 1.65, 0.1);
      belt.rotation.set(0.15, 0, 0);
      this.scene.add(belt);
      this.beltGroup = belt;
      this.beltSpin = 0;
    }
  }

  showBelt(belt) {
    this.pendingBelt = belt;
    this.maybeCelebrate();
  }

  spawnConfetti() {
    const count = 240;
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [[0.95, 0.76, 0.3], [0.76, 0.1, 0.16], [0.96, 0.96, 0.94], [0.2, 0.7, 0.9]];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = 3 + Math.random() * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      const c = palette[i % palette.length];
      colors[i * 3] = c[0]; colors[i * 3 + 1] = c[1]; colors[i * 3 + 2] = c[2];
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({ size: 0.06, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false });
    const points = new THREE.Points(geo, mat);
    this.scene.add(points);
    this.confetti = { points, pos, vel: Array.from({ length: count }, () => [Math.random() * 0.4, 1 + Math.random() * 1.2, Math.random() * 0.4]), count };
  }

  updateConfetti(dt) {
    if (!this.confetti) return;
    const { pos, vel, count } = this.confetti;
    for (let i = 0; i < count; i++) {
      pos[i * 3] += Math.sin(this.time + i) * dt * 0.35 + vel[i][0] * dt;
      pos[i * 3 + 1] -= vel[i][1] * dt;
      pos[i * 3 + 2] += Math.cos(this.time * 0.7 + i) * dt * 0.2;
      if (pos[i * 3 + 1] < 0.02) pos[i * 3 + 1] = 3 + Math.random() * 3;
    }
    this.confetti.points.geometry.attributes.position.needsUpdate = true;
    if (this.beltGroup) {
      this.beltSpin += dt * 0.7;
      this.beltGroup.rotation.y = Math.sin(this.time * 0.5) * 0.5;
      this.beltGroup.rotation.z = Math.sin(this.time * 0.8) * 0.04;
      this.beltGroup.position.y = 1.65 + Math.sin(this.time * 1.6) * 0.04;
      this.beltGroup.visible = true;
    }
  }

  resize(width, height) {
    this.camera.aspect = width / height;
    this.camera.fov = width / height < 1 ? 56 : 46;
    this.camera.updateProjectionMatrix();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.frames = [];
    this.replay = null;
    for (const b of this.boxers) b.dispose();
    this.arena.dispose();
    this.scene.clear();
  }
}
