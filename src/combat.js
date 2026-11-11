import * as THREE from 'three';
import { CONFIG as C } from './config.js';
import { mergeByMaterial } from './merge.js';

const _v = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _m3 = new THREE.Matrix3();
const rand = (a = 0, b = 1) => a + Math.random() * (b - a);
const damp = (a, b, rate, dt) => a + (b - a) * (1 - Math.exp(-rate * dt));

// ─────────────────────────────────────────────────────────────────────────────
// Combat layer: target dummies, hitscan, tracers, impacts and ammo.
// Kept separate from movement so the movement tuning can be tested in isolation.
// ─────────────────────────────────────────────────────────────────────────────
export class Combat {
  constructor({ scene, camera, world, player, weapon, audio, hud, onEvent }) {
    this.scene = scene;
    this.camera = camera;
    this.world = world;
    this.player = player;
    this.weapon = weapon;
    this.audio = audio;
    this.hud = hud;
    this.onEvent = onEvent || (() => {});

    this.ammo = C.weapon.magazine;
    this.cooldown = 0;
    this.reloading = false;
    this.reloadTimer = 0;
    this.score = 0;
    this.kills = 0;
    this.shots = 0;
    this.hits = 0;
    this.recoilRecover = 0;
    this.enabled = false;
    this.time = 0;

    this.effects = new THREE.Group();
    scene.add(this.effects);
    this.tracers = [];
    this.sparks = [];
    this.decalPool = [];
    this.decalIndex = 0;

    this.raycaster = new THREE.Raycaster();
    this.raycaster.far = 110;

    this.targets = [];
    this.hitboxes = [];
    this._createTargets();
    this._createDecalPool();
    this._createSparkTexture();
  }

  reset() {
    this.ammo = C.weapon.magazine;
    this.cooldown = 0;
    this.reloading = false;
    this.reloadTimer = 0;
    this.score = 0;
    this.kills = 0;
    this.shots = 0;
    this.hits = 0;
    this.time = 0;
  }

  // ── Target dummies ─────────────────────────────────────────────────────────
  _createTargets() {
    const anchors = [
      { x: -1.1, y: 0, z: 10.8, range: 1.35, phase: 1.7 },
      { x: -1.6, y: 0, z: -14.2, range: 1.9, phase: 0.2 },
      { x: -10.8, y: 0, z: -14.6, range: 2.2, phase: 2.1 },
      { x: 6.0, y: 0, z: -12.9, range: 1.5, phase: 4.4 },
      { x: 12.7, y: 0, z: -10.6, range: 1.2, phase: 1.1 },
      { x: -20.8, y: 0, z: 8.0, range: 1.0, phase: 3.2 },
      { x: 18.2, y: 0, z: 7.8, range: 1.4, phase: 5.0 },
      { x: 12.4, y: 1.27, z: -20.9, range: 0.8, phase: 2.8 },
      { x: -16.5, y: 2.08, z: -10.5, range: 1.3, phase: 0.8 },
    ];
    anchors.forEach((a, i) => this.targets.push(new TargetDummy(this.scene, a, i, this.audio)));
  }

  _createDecalPool() {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d');
    const grd = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
    grd.addColorStop(0, 'rgba(8,7,6,.92)');
    grd.addColorStop(.25, 'rgba(16,14,12,.85)');
    grd.addColorStop(.55, 'rgba(42,38,33,.45)');
    grd.addColorStop(1, 'rgba(30,27,23,0)');
    ctx.fillStyle = grd; ctx.fillRect(0, 0, 64, 64);
    // Cracks.
    ctx.strokeStyle = 'rgba(20,18,15,.6)'; ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath(); ctx.moveTo(32, 32);
      const a = Math.random() * Math.PI * 2;
      ctx.lineTo(32 + Math.cos(a) * rand(10, 28), 32 + Math.sin(a) * rand(10, 28)); ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshBasicMaterial({
      map: tex, transparent: true, depthWrite: false, opacity: .95,
      polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4, side: THREE.DoubleSide,
    });
    for (let i = 0; i < 36; i++) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(.16, .16), mat);
      m.visible = false; m.renderOrder = 4;
      this.effects.add(m); this.decalPool.push(m);
    }
  }

  _createSparkTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 32;
    const ctx = c.getContext('2d');
    const grd = ctx.createRadialGradient(16, 16, 0, 16, 16, 15);
    grd.addColorStop(0, 'rgba(255,248,210,1)');
    grd.addColorStop(.3, 'rgba(255,186,82,.95)');
    grd.addColorStop(1, 'rgba(255,95,25,0)');
    ctx.fillStyle = grd; ctx.fillRect(0, 0, 32, 32);
    this.sparkTexture = new THREE.CanvasTexture(c);
    this.sparkTexture.colorSpace = THREE.SRGBColorSpace;
  }

  // ── Frame update ───────────────────────────────────────────────────────────
  update(dt, input) {
    this.time += dt;
    this.cooldown = Math.max(0, this.cooldown - dt);

    if (this.recoilRecover > 0) {
      const recover = Math.min(this.recoilRecover, dt * 1.3);
      this.player.pitch = Math.min(1.45, this.player.pitch - recover);
      this.recoilRecover -= recover;
    }

    for (const t of this.targets) t.update(dt, this.player.position, this.time);

    // Consume the one-shot flag on the first fixed step. Holding the button
    // still drives automatic fire through `fireHeld`, but a quick click cannot
    // leak into several catch-up steps when the renderer is running slowly.
    const pressed = input.firePressed;
    if (pressed) input.firePressed = false;

    // Weapon state. Reload can be cancelled by swapping focus; keep it simple.
    if (this.reloading) {
      this.reloadTimer += dt;
      if (this.reloadTimer >= C.weapon.reloadTime) {
        this.ammo = C.weapon.magazine;
        this.reloading = false;
        this.weapon.finishReload();
        this.audio.reloadEnd();
        this.hud?.setReload(false);
      }
    } else if (input.reloadPressed && this.ammo < C.weapon.magazine) {
      this._startReload();
    }

    const wantsFire = input.fireHeld || pressed;
    if (this.enabled && wantsFire && !this.reloading && this.ammo > 0 && this.cooldown <= 0) {
      this._shoot();
    }

    // Empty click / auto-reload hint once.
    if (this.enabled && pressed && this.ammo <= 0 && !this.reloading) {
      this._startReload();
      this.audio.dryFire();
    }

    this._updateEffects(dt);
    this.hud?.setAmmo(this.ammo, this.reloading ? this.reloadTimer / C.weapon.reloadTime : -1);
  }

  _startReload() {
    if (this.reloading) return;
    this.reloading = true;
    this.reloadTimer = 0;
    this.weapon.startReload();
    this.audio.reloadStart();
    this.hud?.setReload(true);
  }

  _shoot() {
    this.cooldown = C.weapon.fireInterval;
    this.ammo--;
    this.shots++;
    this.weapon.fire();
    this.audio.shot();

    // Running dry starts the reload immediately; the empty-click path below
    // still covers players who spend the magazine down to zero via debug or UI.
    if (this.ammo === 0) this._startReload();

    // Spread reflects player state. Arcade, but movement still matters.
    const speed = this.player.horizontalSpeed;
    const spread = C.weapon.spreadStill +
      Math.min(1, speed / C.movement.sprintSpeed) * C.weapon.spreadMoving +
      (this.player.airborne ? C.weapon.spreadAir : 0);
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    if (spread > 0) {
      dir.x += rand(-spread, spread);
      dir.y += rand(-spread, spread);
      dir.z += rand(-spread, spread) * .45;
      dir.normalize();
    }

    const origin = this.camera.getWorldPosition(new THREE.Vector3());
    this.raycaster.set(origin, dir);

    const liveHitboxes = [];
    for (const t of this.targets) if (!t.down) liveHitboxes.push(...t.hitboxes);
    const candidates = liveHitboxes.concat(this.world.hitMeshes);
    const intersections = this.raycaster.intersectObjects(candidates, false);
    const hit = intersections[0];

    // Muzzle endpoint, plus a tracer. The visual tracer starts at the barrel,
    // the gameplay ray starts at the camera: standard FPS convention.
    const muzzlePos = this.weapon.getMuzzleWorld(new THREE.Vector3());
    const end = hit ? hit.point.clone() : origin.clone().addScaledVector(dir, 90);
    this._spawnTracer(muzzlePos, end);

    if (hit) {
      if (hit.object.userData.target) {
        this.hits++;
        const target = hit.object.userData.target;
        const zone = hit.object.userData.zone;
        const damage = zone === 'head' ? C.weapon.damageHead : C.weapon.damageBody;
        const killed = target.hit(damage, zone);
        this._spawnSparks(hit.point, hit.face?.normal || new THREE.Vector3(0, 1, 0), '#ff4b28', 15);
        this._spawnImpactDecal(hit, true);
        this.audio.hit(zone === 'head');
        this.hud?.hit(zone === 'head', killed);
        if (killed) this._onKill(target, zone);
      } else {
        this._spawnSparks(hit.point, hit.face?.normal || new THREE.Vector3(0, 1, 0), '#ffd09a', 9);
        this._spawnImpactDecal(hit, false);
        this.audio.impact();
      }
    } else {
      this.audio.whiff();
    }

    // Camera kick (recovered over the next few frames).
    const pitchKick = C.weapon.recoilPitch * rand(.75, 1.35);
    this.player.pitch = Math.min(1.45, this.player.pitch + pitchKick);
    this.recoilRecover += pitchKick * .82;
    this.player.yaw += rand(-.5, .5) * C.weapon.recoilYaw;
    this.hud?.setAmmo(this.ammo, -1);
    this.onEvent('shot', { ammo: this.ammo });
  }

  _onKill(target, zone) {
    this.kills++;
    const points = zone === 'head' ? 250 : 100;
    this.score += points;
    this.audio.kill(zone === 'head');
    this._spawnSparks(target.root.position.clone().add(new THREE.Vector3(0, 1.2, 0)), new THREE.Vector3(0, 1, 0), '#ff7a2a', 28);
    this.hud?.kill(zone === 'head', points, this.kills);
    this.onEvent('kill', { points, headshot: zone === 'head', kills: this.kills, target });
  }

  // ── Effects ────────────────────────────────────────────────────────────────
  _spawnTracer(from, to) {
    const geo = new THREE.BufferGeometry().setFromPoints([from, to]);
    const mat = new THREE.LineBasicMaterial({
      color: 0xffd7a0, transparent: true, opacity: .85,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const line = new THREE.Line(geo, mat);
    line.renderOrder = 5;
    this.effects.add(line);
    this.tracers.push({ line, life: .075, max: .075 });
  }

  _spawnSparks(point, normal, color, count = 12) {
    const positions = new Float32Array(count * 3);
    const velocities = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = point.x + rand(-.04, .04);
      positions[i * 3 + 1] = point.y + rand(-.04, .04);
      positions[i * 3 + 2] = point.z + rand(-.04, .04);
      const dir = normal.clone().multiplyScalar(rand(.8, 2.8));
      dir.x += rand(-2.4, 2.4); dir.y += rand(-.4, 2.7); dir.z += rand(-2.4, 2.4);
      velocities.push(dir);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: new THREE.Color(color), map: this.sparkTexture, size: .085,
      transparent: true, opacity: 1, depthWrite: false,
      blending: THREE.AdditiveBlending, sizeAttenuation: true,
    });
    const points = new THREE.Points(geo, mat);
    this.effects.add(points);
    this.sparks.push({ points, velocities, life: .42, max: .42 });
  }

  _spawnImpactDecal(hit, target) {
    const m = this.decalPool[this.decalIndex++ % this.decalPool.length];
    const normal = hit.face?.normal
      ? hit.face.normal.clone().applyMatrix3(_m3.getNormalMatrix(hit.object.matrixWorld)).normalize()
      : new THREE.Vector3(0, 1, 0);
    m.visible = true;
    m.position.copy(hit.point).addScaledVector(normal, .012);
    m.lookAt(_v.copy(m.position).add(normal));
    m.rotateZ(Math.random() * Math.PI * 2);
    const scale = target ? rand(.55, .95) : rand(.7, 1.3);
    m.scale.setScalar(scale);
    m.material = this.decalPool[0].material;
  }

  _updateEffects(dt) {
    for (let i = this.tracers.length - 1; i >= 0; i--) {
      const t = this.tracers[i];
      t.life -= dt;
      t.line.material.opacity = Math.max(0, t.life / t.max) * .85;
      if (t.life <= 0) {
        this.effects.remove(t.line);
        t.line.geometry.dispose(); t.line.material.dispose();
        this.tracers.splice(i, 1);
      }
    }

    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const s = this.sparks[i];
      s.life -= dt;
      const arr = s.points.geometry.attributes.position.array;
      for (let j = 0; j < s.velocities.length; j++) {
        const v = s.velocities[j];
        arr[j * 3] += v.x * dt;
        arr[j * 3 + 1] += v.y * dt;
        arr[j * 3 + 2] += v.z * dt;
        v.y -= 8.8 * dt;
        v.multiplyScalar(1 - 1.9 * dt);
      }
      s.points.geometry.attributes.position.needsUpdate = true;
      s.points.material.opacity = Math.max(0, s.life / s.max);
      if (s.life <= 0) {
        this.effects.remove(s.points);
        s.points.geometry.dispose(); s.points.material.dispose();
        this.sparks.splice(i, 1);
      }
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Angled, low-poly OPFOR dummy. Three body shots or one headshot neutralise it.
// It slides laterally on a rail and respawns, giving the arena a living rhythm.
// ─────────────────────────────────────────────────────────────────────────────
class TargetDummy {
  constructor(scene, anchor, index, audio) {
    this.scene = scene;
    this.anchor = anchor;
    this.index = index;
    this.audio = audio;
    this.hp = 100;
    this.down = false;
    this.downTimer = 0;
    this.hitFlash = 0;
    this.phase = anchor.phase;
    this.scaleIn = 1;
    this.hitboxes = [];
    this.materials = [];

    this.root = new THREE.Group();
    this.root.position.set(anchor.x, anchor.y, anchor.z);
    scene.add(this.root);

    const suit = new THREE.MeshStandardMaterial({ color: 0x2b2d28, roughness: .87, metalness: .08 });
    const armor = new THREE.MeshStandardMaterial({ color: 0x41453b, roughness: .62, metalness: .25 });
    const plate = new THREE.MeshStandardMaterial({ color: 0xb6481c, roughness: .58, metalness: .2, emissive: 0x2a0800, emissiveIntensity: 1 });
    const black = new THREE.MeshStandardMaterial({ color: 0x111310, roughness: .72, metalness: .3 });
    const visor = new THREE.MeshBasicMaterial({ color: 0xff421f });
    this.materials.push(suit, armor, plate, black);

    const add = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z); m.rotation.set(rx, ry, rz);
      m.castShadow = true; m.receiveShadow = true;
      this.root.add(m); return m;
    };

    // Legs + boots.
    add(new THREE.BoxGeometry(.19, .74, .22), suit, -.16, .46, 0, 0, 0, .025);
    add(new THREE.BoxGeometry(.19, .74, .22), suit, .16, .46, 0, 0, 0, -.025);
    add(new THREE.BoxGeometry(.23, .12, .36), black, -.16, .06, -.03);
    add(new THREE.BoxGeometry(.23, .12, .36), black, .16, .06, -.03);
    add(new THREE.BoxGeometry(.22, .25, .25), armor, -.17, .77, 0);
    add(new THREE.BoxGeometry(.22, .25, .25), armor, .17, .77, 0);
    // Hips / belt.
    add(new THREE.BoxGeometry(.46, .2, .28), black, 0, .94, 0);
    add(new THREE.BoxGeometry(.5, .08, .3), plate, 0, .99, 0);
    // Torso.
    add(new THREE.BoxGeometry(.58, .62, .34), suit, 0, 1.26, 0);
    add(new THREE.BoxGeometry(.47, .37, .06), plate, 0, 1.3, .185);
    add(new THREE.BoxGeometry(.53, .12, .3), armor, 0, 1.5, 0);
    // Arms, slightly bent.
    add(new THREE.BoxGeometry(.17, .55, .2), suit, -.39, 1.22, 0, 0, 0, -.1);
    add(new THREE.BoxGeometry(.17, .2, .25), black, -.43, .98, .06, -.2, 0, -.1);
    add(new THREE.BoxGeometry(.17, .55, .2), suit, .39, 1.22, 0, 0, 0, .1);
    add(new THREE.BoxGeometry(.17, .2, .25), black, .43, .98, .06, -.2, 0, .1);
    // Neck / head / visor.
    add(new THREE.CylinderGeometry(.09, .1, .12, 8), black, 0, 1.63, 0);
    const head = add(new THREE.SphereGeometry(.18, 10, 8), armor, 0, 1.79, 0);
    head.scale.set(1, 1.05, .96);
    add(new THREE.BoxGeometry(.23, .07, .08), visor, 0, 1.82, .155);
    add(new THREE.BoxGeometry(.25, .05, .2), black, 0, 1.71, .01);
    // Chest lamp.
    add(new THREE.CircleGeometry(.035, 8), visor, 0, 1.36, .218);

    // 30 primitive parts become five draw calls per dummy.
    mergeByMaterial(this.root);

    // A floating identity tick for readability against busy backgrounds.
    const tick = new THREE.Mesh(new THREE.PlaneGeometry(.34, .04), new THREE.MeshBasicMaterial({ color: 0xff5b1a, transparent: true, opacity: .75, side: THREE.DoubleSide }));
    tick.position.set(0, 2.11, 0); this.root.add(tick);
    this.tick = tick;

    // Hitboxes are invisible but raycastable. Head is a sphere; body a box.
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const bodyHit = new THREE.Mesh(new THREE.BoxGeometry(.62, 1.26, .46), hitMat);
    bodyHit.position.set(0, 1.07, 0);
    bodyHit.userData = { target: this, zone: 'body' };
    const headHit = new THREE.Mesh(new THREE.SphereGeometry(.23, 8, 6), hitMat);
    headHit.position.set(0, 1.8, 0);
    headHit.userData = { target: this, zone: 'head' };
    this.root.add(bodyHit, headHit);
    this.hitboxes.push(bodyHit, headHit);
    this.bodyHit = bodyHit;
    this.headHit = headHit;

    this.baseX = anchor.x;
    this.baseZ = anchor.z;
    this.root.rotation.y = Math.PI;
  }

  update(dt, playerPos, time) {
    if (this.down) {
      this.downTimer -= dt;
      this.root.rotation.z = damp(this.root.rotation.z, 1.45, 6, dt);
      this.root.position.y = damp(this.root.position.y, this.anchor.y - .2, 5, dt);
      if (this.downTimer <= 0) this.respawn();
      return;
    }

    this.scaleIn = damp(this.scaleIn, 1, 9, dt);
    this.root.scale.setScalar(Math.max(.01, this.scaleIn));
    this.root.rotation.z = damp(this.root.rotation.z, 0, 8, dt);

    // Lateral rail movement.
    const x = this.baseX + Math.sin(time * .62 + this.phase) * this.anchor.range;
    this.root.position.x = damp(this.root.position.x, x, 3.5, dt);
    this.root.position.y = this.anchor.y;
    // Face the player, with a tiny mechanical sway.
    const dx = playerPos.x - this.root.position.x;
    const dz = playerPos.z - this.root.position.z;
    const face = Math.atan2(dx, dz);
    let diff = face - this.root.rotation.y;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    this.root.rotation.y += diff * Math.min(1, dt * 2.2);
    this.root.rotation.z = Math.sin(time * 1.4 + this.phase) * .012;

    if (this.hitFlash > 0) {
      this.hitFlash -= dt;
      const k = Math.max(0, this.hitFlash / .12);
      for (const m of this.materials) {
        if (!m.emissive) continue;
        m.emissive.setRGB(k * .8, k * .15, k * .04);
        m.emissiveIntensity = 1 + k * 3;
      }
    } else {
      for (const m of this.materials) {
        if (!m.emissive) continue;
        m.emissiveIntensity = 1;
        m.emissive.setHex(m === this.materials[2] ? 0x2a0800 : 0x000000);
      }
    }

    const pulse = .7 + Math.sin(time * 3.2 + this.phase) * .18;
    this.tick.material.opacity = pulse;
    this.tick.lookAt(playerPos.x, this.tick.getWorldPosition(_v).y, playerPos.z);
  }

  hit(damage, zone) {
    if (this.down) return false;
    this.hp -= damage;
    this.hitFlash = .12;
    if (this.hp <= 0) {
      this.down = true;
      this.downTimer = 2.6;
      this.scaleIn = 1;
      return true;
    }
    return false;
  }

  respawn() {
    this.down = false;
    this.hp = 100;
    this.root.rotation.set(0, this.root.rotation.y, 0);
    this.root.position.y = this.anchor.y;
    this.scaleIn = .05;
    this.hitFlash = 0;
    this.bodyHit.visible = true;
    this.headHit.visible = true;
    this.audio?.respawn(this.index);
  }
}
