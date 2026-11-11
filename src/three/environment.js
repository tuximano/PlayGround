// Arenas, crowd, rings, gym and studio environments.
import * as THREE from 'three';
import {
  ringCanvasTexture, apronTexture, bannerTexture, screenTexture, radialGlowTexture, crowdBillboardTexture, logoTexture,
} from './textures.js';
import { makeStaff } from './boxer.js';

const UP = new THREE.Vector3(0, 1, 0);

function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: opts.roughness ?? 0.7,
    metalness: opts.metalness ?? 0.05,
    emissive: new THREE.Color(opts.emissive || '#000000'),
    emissiveIntensity: opts.emissiveIntensity ?? 0,
    map: opts.map || null,
    transparent: opts.transparent || false,
    opacity: opts.opacity ?? 1,
    side: opts.side || THREE.FrontSide,
    depthWrite: opts.depthWrite ?? true,
  });
}

function addBox(parent, w, h, d, material, x, y, z, cast = false, receive = true) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  m.castShadow = cast;
  m.receiveShadow = receive;
  parent.add(m);
  return m;
}

function addCyl(parent, rt, rb, h, material, x, y, z, seg = 16, cast = false) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), material);
  m.position.set(x, y, z);
  m.castShadow = cast;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

function plane(parent, w, h, material, x, y, z, rx = 0, ry = 0, rz = 0) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz);
  parent.add(m);
  return m;
}

// ---------------------------------------------------------------------------
// Crowd
// ---------------------------------------------------------------------------
class Crowd {
  constructor(scene, config, quality = 'high', accent = '#f2c14e') {
    this.scene = scene;
    this.config = config;
    const mobile = quality === 'low';
    const density = config.crowd ?? 0.8;
    const count = Math.floor((mobile ? 220 : 560) * (0.35 + density * 0.65));
    this.count = count;
    this.base = [];
    const bodyGeo = new THREE.CapsuleGeometry(0.11, 0.24, 2, 6);
    const headGeo = new THREE.SphereGeometry(0.085, 6, 5);
    const bodyMat = new THREE.MeshStandardMaterial({ roughness: 0.9, vertexColors: true });
    const headMat = new THREE.MeshStandardMaterial({ roughness: 0.9 });
    this.bodies = new THREE.InstancedMesh(bodyGeo, bodyMat, count);
    this.heads = new THREE.InstancedMesh(headGeo, headMat, count);
    this.bodies.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.heads.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.bodies.receiveShadow = false;
    this.heads.receiveShadow = false;
    this.bodies.castShadow = false;
    this.heads.castShadow = false;
    const colors = [accent, '#f5f5f4', '#c1121f', '#1d4ed8', '#111111', '#f97316', '#a855f7', '#22c55e'];
    const rnd = mulberry32Local(90210);
    let i = 0;
    let guard = 0;
    while (i < count && guard++ < count * 8) {
      const tier = i % 3;
      const radius = 5.8 + tier * 1.9 + (i % 7) * 0.15;
      // Leave a gap in the front arc for the broadcast camera.
      const angle = (rnd() * Math.PI * 2);
      const frontness = Math.cos(angle);
      if (frontness > 0.66) continue;
      const row = Math.floor(rnd() * 3);
      const x = Math.sin(angle) * (radius + row * 0.5);
      const z = Math.cos(angle) * (radius + row * 0.5) - 0.4;
      const y = -0.72 + tier * 0.62 + row * 0.08;
      const scale = 0.82 + rnd() * 0.35;
      this.base.push({ x, y, z, phase: rnd() * Math.PI * 2, speed: 0.7 + rnd() * 1.2, amp: 0.02 + rnd() * 0.035, angle, scale });
      const color = new THREE.Color(colors[Math.floor(rnd() * colors.length)]);
      color.offsetHSL(0, 0, (rnd() - 0.5) * 0.18);
      this.bodies.setColorAt(i, color);
      this.heads.setColorAt(i, new THREE.Color().setHSL(0.07 + rnd() * 0.02, 0.35, 0.35 + rnd() * 0.35));
      i++;
    }
    this.bodies.count = i;
    this.heads.count = i;
    scene.add(this.bodies);
    scene.add(this.heads);
    this.time = 0;
    this.cheer = 0.3;
    // Phone lights
    const phoneCount = Math.floor(i * 0.35);
    const pos = new Float32Array(phoneCount * 3);
    for (let p = 0; p < phoneCount; p++) {
      const b = this.base[Math.floor(rnd() * i)];
      pos[p * 3] = b.x + (rnd() - 0.5) * 0.12;
      pos[p * 3 + 1] = b.y + 0.5 + rnd() * 0.15;
      pos[p * 3 + 2] = b.z + (rnd() - 0.5) * 0.12;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.phones = new THREE.Points(g, new THREE.PointsMaterial({ color: '#fff3c4', size: 0.045, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }));
    scene.add(this.phones);
    this.update(0, 0.3);
  }

  update(dt, cheer = 0.3) {
    this.time += dt;
    this.cheer = cheer;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    const pos = new THREE.Vector3();
    const t = this.time;
    for (let i = 0; i < this.bodies.count; i++) {
      const b = this.base[i];
      const bob = Math.sin(t * b.speed * 2 + b.phase) * b.amp * (1 + cheer * 1.6);
      const sway = Math.sin(t * 0.8 + b.phase) * 0.012;
      const armUp = cheer > 0.6 && Math.sin(t * 3 + b.phase) > 0.6 ? 0.09 : 0;
      pos.set(b.x + sway, b.y + 0.22 + bob + armUp, b.z);
      scale.set(b.scale, b.scale * (1 + cheer * 0.05), b.scale);
      q.setFromAxisAngle(UP, Math.sin(t * 0.4 + b.phase) * 0.12);
      m.compose(pos, q, scale);
      this.bodies.setMatrixAt(i, m);
      pos.y = b.y + 0.53 + bob + armUp * 1.3;
      m.compose(pos, q, scale);
      this.heads.setMatrixAt(i, m);
    }
    this.bodies.instanceMatrix.needsUpdate = true;
    this.heads.instanceMatrix.needsUpdate = true;
    if (this.phones) {
      this.phones.material.opacity = 0.55 + Math.sin(this.time * 5) * 0.15 + cheer * 0.2;
    }
  }

  dispose() {
    this.scene.remove(this.bodies, this.heads, this.phones);
    this.bodies.geometry.dispose();
    this.heads.geometry.dispose();
    this.bodies.material.dispose();
    this.heads.material.dispose();
    if (this.phones) this.phones.geometry.dispose();
  }
}

function mulberry32Local(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// Championship ring
// ---------------------------------------------------------------------------
export function buildRing({ accent = '#f2c14e', accent2 = '#111827', matColor = '#1a1a20', ropes = ['#dc2626', '#f5f5f4', '#2563eb'], arenaId = 'default' } = {}) {
  const group = new THREE.Group();
  const ring = new THREE.Group();
  const size = 6.4;
  // Canvas top
  const canvasMat = new THREE.MeshStandardMaterial({ map: ringCanvasTexture({ id: arenaId, accent, mat: matColor }), roughness: 0.85, metalness: 0.02 });
  const top = addBox(ring, size, 0.12, size, canvasMat, 0, -0.06, 0, false, true);
  // Apron
  const apronMat = new THREE.MeshStandardMaterial({ map: apronTexture({ id: arenaId, accent, accent2 }), roughness: 0.8 });
  addBox(ring, size + 0.02, 0.78, size + 0.02, mat(accent2, { roughness: 0.9 }), 0, -0.51, 0, false, true);
  for (const [x, z, ry] of [[0, size / 2 + 0.012, 0], [0, -size / 2 - 0.012, Math.PI], [size / 2 + 0.012, 0, Math.PI / 2], [-size / 2 - 0.012, 0, -Math.PI / 2]]) {
    plane(ring, size, 0.62, apronMat, x, -0.45, z, 0, ry, 0);
  }
  // Floor skirt
  addBox(ring, size + 0.3, 0.06, size + 0.3, mat('#0c0c12', { roughness: 0.65 }), 0, -0.92, 0, false, true);
  // Posts
  const postMat = mat('#17171d', { roughness: 0.4, metalness: 0.5 });
  const padColors = [ropes[0], ropes[2], ropes[0], ropes[2]];
  const corners = [[-size / 2, -size / 2], [size / 2, -size / 2], [-size / 2, size / 2], [size / 2, size / 2]];
  corners.forEach(([x, z], i) => {
    addCyl(ring, 0.085, 0.085, 1.55, postMat, x, 0.72, z, 12, true);
    addCyl(ring, 0.11, 0.11, 0.55, mat(padColors[i], { roughness: 0.55 }), x, 1.18, z, 12, true);
    addCyl(ring, 0.13, 0.13, 0.17, mat(ropes[1], { roughness: 0.7 }), x, 0.9, z, 12);
    // turnbuckle
    const tb = addCyl(ring, 0.09, 0.09, 0.2, mat(ropes[1], { roughness: 0.5 }), x, 0.43, z, 10);
    tb.rotation.z = Math.PI / 2;
  });
  // Ropes
  for (let level = 0; level < 3; level++) {
    const y = 0.38 + level * 0.36;
    const ropeMat = mat(ropes[level] || '#f5f5f4', { roughness: 0.35 });
    for (const side of [-1, 1]) {
      addCyl(ring, 0.018, 0.018, size, ropeMat, 0, y, side * size / 2, 8).rotation.z = Math.PI / 2;
      addCyl(ring, 0.018, 0.018, size, ropeMat, side * size / 2, y, 0, 8).rotation.x = Math.PI / 2;
    }
  }
  // Corner stools and buckets
  const stoolMat = mat('#8b1e1e', { roughness: 0.6 });
  addCyl(ring, 0.22, 0.2, 0.09, stoolMat, -size / 2 + 0.55, 0.42, size / 2 - 0.5, 10);
  addCyl(ring, 0.04, 0.055, 0.4, mat('#222'), -size / 2 + 0.55, 0.65, size / 2 - 0.5, 8);
  addCyl(ring, 0.16, 0.13, 0.22, mat('#e5e7eb', { metalness: 0.5, roughness: 0.4 }), size / 2 - 0.5, 0.55, size / 2 - 0.55, 12);
  // Corner team mats
  addBox(ring, 1.1, 0.015, 0.75, mat(accent, { roughness: 0.8 }), -size / 2 + 0.65, 0.012, size / 2 + 0.55, false);
  addBox(ring, 1.1, 0.015, 0.75, mat('#f5f5f4', { roughness: 0.8 }), size / 2 - 0.65, 0.012, size / 2 + 0.55, false);
  // Ring-side sponsor boards
  for (let i = 0; i < 4; i++) {
    const m = plane(ring, 2.6, 0.32, new THREE.MeshStandardMaterial({ map: crowdBillboardTexture(), roughness: 0.6, emissive: new THREE.Color(accent), emissiveIntensity: 0.06 }), 0, 0.2, size / 2 + 1.4, 0, 0, 0);
    m.rotation.y = 0;
  }
  group.add(ring);
  return { group, ring, size };
}

// ---------------------------------------------------------------------------
// Full arena
// ---------------------------------------------------------------------------
export function buildArena(config, { quality = 'high', crowd = true, staff = true } = {}) {
  const scene = new THREE.Scene();
  const accent = config.accent || '#f2c14e';
  const accent2 = config.accent2 || '#111827';
  const bg = new THREE.Color(config.fog || '#07070a');
  scene.background = bg;
  scene.fog = new THREE.FogExp2(bg, config.roof === 'stadium' ? 0.018 : 0.026);
  const root = new THREE.Group();
  scene.add(root);

  // Floor
  const floorMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(bg).multiplyScalar(1.4), roughness: 0.35, metalness: 0.25 });
  const floor = new THREE.Mesh(new THREE.CircleGeometry(26, 48), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.86;
  floor.receiveShadow = true;
  root.add(floor);

  // Glow rings on floor
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(7 + i * 2.2, 7.06 + i * 2.2, 64), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.08 - i * 0.02, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.85;
    root.add(ring);
  }

  // Ring
  const ring = buildRing({ accent, accent2, matColor: config.mat, ropes: config.ropes, arenaId: config.id });
  root.add(ring.group);
  const ringSize = ring.size;

  // Crowd
  let crowdObj = null;
  if (crowd && config.tier > 0 && config.id !== 'underground') {
    crowdObj = new Crowd(root, config, quality, accent);
  }

  // Broadcast truss
  const trussMat = mat('#2a2b33', { roughness: 0.4, metalness: 0.8 });
  const trussY = config.roof === 'hall' ? 5.6 : 7.2;
  for (const [w, d, x, z] of [[11, 0.12, 0, 0], [0.12, 11, 0, 0]]) {
    const t = new THREE.Mesh(new THREE.BoxGeometry(w || 0.16, 0.16, d || 0.16), trussMat);
    t.position.set(x, trussY, z);
    root.add(t);
  }
  const trussRing = new THREE.Mesh(new THREE.TorusGeometry(5.4, 0.07, 6, 40), trussMat);
  trussRing.rotation.x = Math.PI / 2;
  trussRing.position.y = trussY;
  root.add(trussRing);
  // Light cans
  const canMat = mat('#101014', { roughness: 0.3, metalness: 0.8 });
  const spotColors = [accent, '#f5f5f4', accent, '#f5f5f4'];
  for (let i = 0; i < 8; i++) {
    const ang = (i / 8) * Math.PI * 2;
    const can = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.36, 12), canMat);
    can.position.set(Math.cos(ang) * 4.2, trussY - 0.3, Math.sin(ang) * 4.2);
    can.rotation.z = Math.cos(ang) * 0.35;
    can.rotation.x = Math.sin(ang) * 0.35;
    root.add(can);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: radialGlowTexture(spotColors[i % 4], 128), color: spotColors[i % 4], transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
    glow.scale.setScalar(0.65);
    glow.position.set(can.position.x, can.position.y - 0.2, can.position.z);
    root.add(glow);
  }
  // Volumetric beam cones
  for (let i = 0; i < 4; i++) {
    const ang = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const beamMat = new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.035, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
    const beam = new THREE.Mesh(new THREE.ConeGeometry(1.5, trussY, 20, 1, true), beamMat);
    beam.position.set(Math.cos(ang) * 3.2, trussY / 2, Math.sin(ang) * 3.2);
    beam.rotation.z = Math.cos(ang) * 0.14;
    beam.rotation.x = Math.sin(ang) * 0.14;
    root.add(beam);
    beam.userData.beam = true;
  }

  // Lighting
  const hemi = new THREE.HemisphereLight(config.light || '#ffffff', accent2, config.roof === 'hall' ? 0.55 : 0.4);
  scene.add(hemi);
  const key = new THREE.SpotLight('#fff6e8', config.roof === 'hall' ? 190 : 260, 26, Math.PI / 4.4, 0.5, 1.4);
  key.position.set(1.6, trussY, 3.5);
  key.target.position.set(0, 0, 0);
  key.castShadow = true;
  key.shadow.mapSize.set(quality === 'low' ? 512 : 1024, quality === 'low' ? 512 : 1024);
  key.shadow.bias = -0.0004;
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 22;
  scene.add(key, key.target);
  const fill = new THREE.PointLight(accent, 70, 22, 2);
  fill.position.set(-4, 3.2, -3.5);
  scene.add(fill);
  const rim = new THREE.PointLight('#7fb5ff', 45, 18, 2);
  rim.position.set(3.5, 2.5, -4);
  scene.add(rim);
  const ringLight = new THREE.PointLight(config.light || '#fff0d0', 45, 9, 2);
  ringLight.position.set(0, 3.5, 0);
  scene.add(ringLight);
  if (config.roof === 'stadium') {
    const sun = new THREE.DirectionalLight('#cfd8ff', 0.7);
    sun.position.set(8, 12, 6);
    scene.add(sun);
  }

  // Jumbotron
  const screenMat = new THREE.MeshStandardMaterial({ map: screenTexture('TG BOXING', config.name.toUpperCase(), accent), emissive: new THREE.Color('#ffffff'), emissiveIntensity: 0.35, roughness: 0.5 });
  const screenBox = new THREE.Group();
  const cube = addBox(screenBox, 4.6, 2.6, 0.4, screenMat, 0, 0, 0);
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(4.7, 2.7, 0.45)), new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.6 }));
  screenBox.add(edges);
  screenBox.position.set(0, trussY + 2.2, -9);
  screenBox.rotation.y = 0.15;
  root.add(screenBox);

  // Banners
  for (let i = 0; i < 4; i++) {
    const ang = Math.PI * 0.45 + i * Math.PI * 0.38;
    const x = Math.cos(ang) * 11;
    const z = Math.sin(ang) * 11;
    const banner = plane(root, 3.0, 3.4, new THREE.MeshStandardMaterial({ map: bannerTexture(config, i % 2 ? 'CHAMPIONS' : 'TG BOXING'), roughness: 0.8, emissive: new THREE.Color(accent), emissiveIntensity: 0.06, side: THREE.DoubleSide }), x, 2.4, z, 0, -ang + Math.PI / 2, 0);
    banner.userData.banner = true;
  }

  // Arena-specific dressing
  addArenaProps(root, config, accent, accent2, trussY);

  // Corner teams (referee + trainers)
  let ref = null;
  const staffList = [];
  if (staff) {
    ref = makeStaff('referee');
    ref.root.position.set(-1.3, 0.02, 0.4);
    ref.root.scale.setScalar(0.92);
    root.add(ref.root);
    staffList.push(ref);
    for (const [side, z] of [[-1, ringSize / 2 + 1.1], [1, ringSize / 2 + 1.1]]) {
      for (let i = 0; i < 2; i++) {
        const trainer = makeStaff('trainer');
        trainer.root.position.set(side * (1.15 + i * 0.5), -0.86, z + i * 0.25);
        trainer.root.scale.setScalar(0.94);
        trainer.root.rotation.y = side * 0.3 + Math.PI;
        trainer.setRobe(false);
        // Tank top
        const shirt = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.24, 0.42, 12, 1, true), mat(side < 0 ? '#f5f5f4' : accent, { roughness: 0.8 }));
        shirt.position.y = 0.28;
        shirt.scale.z = 0.8;
        trainer.parts.torso.add(shirt);
        root.add(trainer.root);
        staffList.push(trainer);
      }
    }
  }

  // Confetti / dust particles
  const dustCount = 160;
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 16;
    dustPos[i * 3 + 1] = Math.random() * 6;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 16;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: accent, size: 0.025, transparent: true, opacity: 0.4, depthWrite: false, blending: THREE.AdditiveBlending }));
  scene.add(dust);

  // Camera flash sprites
  const flashes = [];
  for (let i = 0; i < 8; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: radialGlowTexture('#ffffff'), color: '#ffffff', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    s.scale.setScalar(0.5);
    root.add(s);
    flashes.push({ sprite: s, x: (Math.random() - 0.5) * 10, y: 1 + Math.random() * 2.2, z: -4 - Math.random() * 5, life: 0 });
  }

  let time = 0;
  let heat = 0.2;
  const update = (dt, intensity = 0.3) => {
    time += dt;
    heat = intensity;
    crowdObj?.update(dt, 0.25 + intensity * 0.7);
    dust.rotation.y += dt * 0.01;
    dust.position.y = Math.sin(time * 0.2) * 0.1;
    for (const f of flashes) {
      f.life = Math.max(0, f.life - dt);
      if (f.life <= 0 && Math.random() < dt * (0.35 + intensity * 0.9)) {
        f.life = 0.1 + Math.random() * 0.16;
        if (!f.sprite.parent) root.add(f.sprite);
        f.sprite.position.set(f.x, f.y, f.z);
        f.sprite.material.opacity = 0.9;
      } else if (f.life > 0) {
        f.sprite.material.opacity = Math.max(0, f.life * 4);
      } else {
        f.sprite.material.opacity = 0;
      }
    }
    // Light sweep
    fill.intensity = 60 + Math.sin(time * 1.3) * 10 + intensity * 20;
    if (dJumbo) {
      dJumbo.rotation.y = Math.sin(time * 0.15) * 0.1 + 0.15;
    }
  };
  const dJumbo = screenBox;

  return {
    scene, root, update, ringSize, referee: ref, staff: staffList, crowd: crowdObj,
    dispose: () => {
      crowdObj?.dispose();
      scene.traverse((o) => {
        if (o.isMesh) {
          if (o.geometry && !o.userData.shared) o.geometry.dispose?.();
          if (o.material) {
            if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose?.());
            else { if (o.material.map) o.material.map = null; o.material.dispose?.(); }
          }
        }
      });
      scene.clear();
    },
  };
}

function addArenaProps(root, config, accent, accent2, trussY) {
  const id = config.id;
  if (id === 'tokyo') {
    // Rising sun banner
    const sun = new THREE.Mesh(new THREE.CircleGeometry(2.2, 40), new THREE.MeshBasicMaterial({ color: '#c1121f', transparent: true, opacity: 0.55 }));
    sun.position.set(0, 3.3, -12.5);
    root.add(sun);
    for (let i = 0; i < 6; i++) {
      const pole = addCyl(root, 0.04, 0.04, 4.6, mat('#171717'), -7 + i * 2.8, 1.45, -7.5, 8);
      const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.26, 10, 8), new THREE.MeshStandardMaterial({ color: '#f5f5f4', emissive: '#ff8a8a', emissiveIntensity: 0.6 }));
      lantern.scale.y = 1.4;
      lantern.position.set(-7 + i * 2.8, 3.65, -7.5);
      root.add(lantern);
    }
  } else if (id === 'vegas') {
    for (let i = 0; i < 6; i++) {
      const strip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 3.8, 0.06), new THREE.MeshBasicMaterial({ color: i % 2 ? '#22d3ee' : '#a855f7' }));
      strip.position.set(-9 + i * 3.6, 2, -11.5);
      root.add(strip);
    }
    const neon = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.035, 6, 64), new THREE.MeshBasicMaterial({ color: '#a855f7' }));
    neon.position.set(0, trussY - 0.1, -8.4);
    root.add(neon);
  } else if (id === 'mexico') {
    // Papel picado flags
    for (let i = 0; i < 16; i++) {
      const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.3), new THREE.MeshStandardMaterial({ color: ['#22c55e', '#f5f5f4', '#dc2626', '#facc15'][i % 4], side: THREE.DoubleSide, roughness: 0.8 }));
      flag.position.set(-10 + i * 1.35, 3.8 + Math.sin(i) * 0.2, -9);
      flag.rotation.z = Math.sin(i) * 0.2;
      root.add(flag);
    }
  } else if (id === 'underground') {
    const cageMat = mat('#2a2a2a', { roughness: 0.5, metalness: 0.7 });
    for (let i = 0; i < 14; i++) {
      const bar = addCyl(root, 0.03, 0.03, 5.5, cageMat, -9 + i * 1.35, 1.9, -8.8, 6);
    }
    const chain = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.04, 6, 48), new THREE.MeshBasicMaterial({ color: '#f43f5e' }));
    chain.position.set(0, 4.6, -7);
    chain.rotation.x = 0.2;
    root.add(chain);
    sceneSmoke(root, '#f43f5e', accent2);
  } else if (id === 'dubai' || id === 'champions') {
    for (let i = 0; i < 4; i++) {
      const arch = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.12, 8, 36, Math.PI), mat(accent, { metalness: 0.7, roughness: 0.3 }));
      arch.position.set(0, 1.4, -10 - i * 1.6);
      root.add(arch);
    }
    sceneSmoke(root, accent, accent2);
  } else if (id === 'seoul') {
    for (let i = 0; i < 5; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(3.5 + i * 0.6, 0.02, 6, 64), new THREE.MeshBasicMaterial({ color: i % 2 ? '#22d3ee' : '#a855f7', transparent: true, opacity: 0.6 }));
      ring.position.set(0, 2.2 + i * 0.7, -9);
      root.add(ring);
    }
  } else if (id === 'newyork') {
    for (let i = 0; i < 5; i++) {
      const light = new THREE.PointLight('#f97316', 12, 10, 2);
      light.position.set(-8 + i * 4, 2.2, 6.4);
      root.add(light);
    }
  } else if (id === 'london') {
    const crest = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.07, 8, 40), mat(accent, { metalness: 0.8, roughness: 0.3 }));
    crest.position.set(0, 3.1, -11);
    root.add(crest);
    const crown = new THREE.Mesh(new THREE.ConeGeometry(1.1, 1.1, 5, 1, true), mat(accent, { metalness: 0.8, roughness: 0.3, side: THREE.DoubleSide }));
    crown.position.set(0, 3.1, -10.9);
    root.add(crown);
  } else if (id === 'national') {
    for (let i = 0; i < 3; i++) {
      const strip = new THREE.Mesh(new THREE.BoxGeometry(6, 0.2, 0.08), new THREE.MeshBasicMaterial({ color: ['#22c55e', '#facc15', '#1d4ed8'][i] }));
      strip.position.set(0, 1.6 + i * 0.35, -10);
      root.add(strip);
    }
  } else if (id === 'moscow') {
    for (let i = 0; i < 3; i++) {
      const star = new THREE.Mesh(new THREE.CircleGeometry(0.55, 5), new THREE.MeshBasicMaterial({ color: '#ef4444' }));
      star.position.set(-3 + i * 3, 3.4, -10.5);
      root.add(star);
    }
  } else if (id === 'manila') {
    for (let i = 0; i < 12; i++) {
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), new THREE.MeshBasicMaterial({ color: '#facc15' }));
      lamp.position.set(-8 + i * 1.5, 3.2 + (i % 3) * 0.3, -8.5);
      root.add(lamp);
    }
  } else if (id === 'berlin') {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(8, 2.2, 0.2), mat('#334155', { roughness: 0.8 }));
    wall.position.set(0, 1.1, -11.5);
    root.add(wall);
    for (let i = 0; i < 8; i++) {
      const seg = new THREE.Mesh(new THREE.BoxGeometry(0.9, 2.1, 0.22), mat(i % 2 ? '#475569' : '#334155', { roughness: 0.8 }));
      seg.position.set(-3.8 + i * 1.1, 1.1, -9.5);
      root.add(seg);
    }
  }
}

function sceneSmoke(root, color, color2) {
  for (let i = 0; i < 6; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: radialGlowTexture(color), color, transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false }));
    s.scale.set(3 + i, 1.8 + i * 0.2, 1);
    s.position.set(-6 + i * 2.4, -0.4 + (i % 2) * 0.2, -5.5);
    root.add(s);
  }
}

// ---------------------------------------------------------------------------
// Gym
// ---------------------------------------------------------------------------
export function buildGym() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0a0908');
  scene.fog = new THREE.FogExp2('#0a0908', 0.045);
  const root = new THREE.Group();
  scene.add(root);
  const accent = '#f59e0b';
  const floorMat = new THREE.MeshStandardMaterial({ color: '#1a1512', roughness: 0.62, metalness: 0.05 });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(18, 18), floorMat);
  floor.rotation.x = -Math.PI / 2;
  root.add(floor);
  // Walls
  addBox(root, 18, 5, 0.3, mat('#191512', { roughness: 0.9 }), 0, 2.5, -9);
  addBox(root, 0.3, 5, 18, mat('#14110f', { roughness: 0.9 }), -9, 2.5, 0);
  // Windows with warm light
  for (let i = 0; i < 3; i++) {
    const win = plane(root, 3, 2.2, new THREE.MeshBasicMaterial({ color: '#f6c578' }), -4 + i * 4, 2.6, -8.82);
    const frame = addBox(root, 3.2, 2.4, 0.1, mat('#2b2119'), -4 + i * 4, 2.6, -8.83);
  }
  // Training ring
  const ring = buildRing({ accent: '#dc2626', accent2: '#3b1d1d', matColor: '#221a1a', ropes: ['#dc2626', '#f5f5f4', '#1d4ed8'], arenaId: 'gym' });
  ring.group.scale.setScalar(0.72);
  ring.group.position.set(2.4, 0, -3.0);
  backgroundRing(ring.group);
  root.add(ring.group);
  // Heavy bags
  for (let i = 0; i < 3; i++) {
    const x = -5.3 + i * 1.6;
    addCyl(root, 0.34, 0.38, 1.5, mat('#5b2a1c', { roughness: 0.7 }), x, 2.2, -2.5, 14, true);
    addCyl(root, 0.33, 0.33, 0.16, mat('#e5e7eb', { roughness: 0.8 }), x, 2.85, -2.5, 14);
    const chain = addCyl(root, 0.018, 0.018, 1.0, mat('#888'), x, 3.5, -2.5, 6);
    // bag shadow-ish warm light
  }
  // Speed bag platform
  addBox(root, 1.1, 0.6, 1.1, mat('#3f2a1d'), -4.4, 2.3, 1.5);
  addCyl(root, 0.04, 0.04, 0.9, mat('#999'), -4.4, 1.7, 1.5, 6);
  const speedBag = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 8), mat('#7c2d12', { roughness: 0.4 }));
  speedBag.scale.y = 1.2;
  speedBag.position.set(-4.4, 1.3, 1.5);
  root.add(speedBag);
  // Coach
  const coach = makeStaff('trainer');
  coach.root.position.set(-0.7, 0, 1.7);
  coach.root.rotation.y = 0.6;
  const shirt = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.25, 0.44, 12, 1, true), mat('#b45309', { roughness: 0.8 }));
  shirt.position.y = 0.28;
  shirt.scale.z = 0.8;
  coach.parts.torso.add(shirt);
  root.add(coach.root);
  // Posters
  for (let i = 0; i < 3; i++) {
    const p = plane(root, 1.8, 2.6, new THREE.MeshStandardMaterial({ map: bannerTexture({ id: 'gym' + i, accent: ['#dc2626', '#eab308', '#38bdf8'][i], accent2: '#1a1a1a' }, ['GLORY', 'PAIN', 'LEGACY'][i]), roughness: 0.85 }), -7.5 + i * 2.2, 2.6, -8.7);
  }
  // Bench
  addBox(root, 2.2, 0.18, 0.7, mat('#1d1d1d'), 3.8, 0.65, 3.2);
  addBox(root, 0.15, 0.6, 0.6, mat('#2a2a2a'), 3, 0.3, 3.2);
  addBox(root, 0.15, 0.6, 0.6, mat('#2a2a2a'), 4.6, 0.3, 3.2);
  // Lights
  scene.add(new THREE.HemisphereLight('#ffedd5', '#1c1917', 0.55));
  const key = new THREE.SpotLight('#ffd7a0', 130, 20, Math.PI / 3.5, 0.5, 1.2);
  key.position.set(3.5, 7, 4);
  key.target.position.set(0, 1.1, 0);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key, key.target);
  const warm = new THREE.PointLight('#f59e0b', 30, 12, 2);
  warm.position.set(-4, 2.4, 2);
  scene.add(warm);
  let time = 0;
  const update = (dt) => {
    time += dt;
    speedBag.rotation.z = Math.sin(time * 7) * 0.25;
    speedBag.position.x = -4.4 + Math.sin(time * 7) * 0.06;
  };
  return { scene, root, coach, update, ring, dispose: () => scene.clear() };
}

function backgroundRing(ring) {
  ring.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = true; } });
}

// ---------------------------------------------------------------------------
// Showcase / studio
// ---------------------------------------------------------------------------
export function buildShowcase() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#060608');
  scene.fog = new THREE.FogExp2('#060608', 0.05);
  const root = new THREE.Group();
  scene.add(root);
  // Floor
  const floorMat = new THREE.MeshStandardMaterial({ color: '#0d0b0c', roughness: 0.22, metalness: 0.55 });
  const floor = new THREE.Mesh(new THREE.CircleGeometry(12, 64), floorMat);
  floor.rotation.x = -Math.PI / 2;
  root.add(floor);
  // Podium
  const podium = addCyl(root, 1.15, 1.35, 0.26, mat('#181818', { roughness: 0.35, metalness: 0.6 }), 0, 0.13, 0, 48, true);
  const ringLight = new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.025, 8, 64), new THREE.MeshBasicMaterial({ color: '#f2c14e' }));
  ringLight.rotation.x = Math.PI / 2;
  ringLight.position.y = 0.265;
  root.add(ringLight);
  // Backdrop arc + logo
  const backMat = new THREE.MeshStandardMaterial({ color: '#12090c', roughness: 0.8 });
  const back = new THREE.Mesh(new THREE.CylinderGeometry(7.5, 7.5, 8, 48, 1, true, Math.PI * 0.7, Math.PI * 1.6), backMat);
  back.position.y = 4;
  back.material.side = THREE.BackSide;
  root.add(back);
  const logo = new THREE.Mesh(new THREE.PlaneGeometry(5.4, 2.7), new THREE.MeshBasicMaterial({ map: logoTexture(), transparent: true, opacity: 0.42, depthWrite: false }));
  logo.position.set(0, 4.25, -9.2);
  root.add(logo);
  // Ring ropes silhouettes
  for (let i = 0; i < 3; i++) {
    const rope = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.018, 6, 64, Math.PI), new THREE.MeshBasicMaterial({ color: i === 1 ? '#f2c14e' : '#3a2a2a', transparent: true, opacity: 0.5 }));
    rope.position.set(0, 0.5 + i * 0.3, -1);
    rope.rotation.x = Math.PI;
    root.add(rope);
  }
  // Spotlights
  scene.add(new THREE.HemisphereLight('#97a6c4', '#1a0b0b', 0.35));
  const key = new THREE.SpotLight('#fff0d6', 340, 30, Math.PI / 5, 0.4, 1.2);
  key.position.set(3.2, 7.5, 5);
  key.target.position.set(0, 1.2, 0);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key, key.target);
  const rim = new THREE.PointLight('#e11d48', 120, 16, 2);
  rim.position.set(-4, 3.2, -4);
  scene.add(rim);
  const rim2 = new THREE.PointLight('#f2c14e', 75, 14, 2);
  rim2.position.set(4.2, 1.5, -2.5);
  scene.add(rim2);
  const beam = new THREE.Mesh(new THREE.ConeGeometry(2.4, 8, 24, 1, true), new THREE.MeshBasicMaterial({ color: '#f2c14e', transparent: true, opacity: 0.035, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
  beam.position.set(0.6, 4, 2.2);
  root.add(beam);
  // floating particles
  const count = 120;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 14;
    pos[i * 3 + 1] = Math.random() * 7;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(g, new THREE.PointsMaterial({ color: '#f2c14e', size: 0.02, transparent: true, opacity: 0.4, depthWrite: false, blending: THREE.AdditiveBlending }));
  scene.add(dust);
  let t = 0;
  return {
    scene, root,
    update: (dt) => {
      t += dt;
      dust.rotation.y += dt * 0.03;
      rim.intensity = 110 + Math.sin(t * 0.9) * 20;
      ringLight.material.color.setHSL(0.11, 0.8, 0.55 + Math.sin(t * 1.2) * 0.05);
    },
    dispose: () => scene.clear(),
  };
}

export function buildStudio() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0b0b0f');
  scene.fog = new THREE.FogExp2('#0b0b0f', 0.03);
  const root = new THREE.Group();
  scene.add(root);
  // Seamless cyclorama
  const cycMat = new THREE.MeshStandardMaterial({ color: '#16161d', roughness: 0.55, metalness: 0.1, side: THREE.BackSide });
  const cyc = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, 9, 48, 1, true), cycMat);
  cyc.position.y = 4.5;
  root.add(cyc);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(9, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), cycMat);
  dome.position.y = 9;
  root.add(dome);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(9, 64), new THREE.MeshStandardMaterial({ color: '#141419', roughness: 0.4, metalness: 0.3 }));
  floor.rotation.x = -Math.PI / 2;
  root.add(floor);
  const platform = addCyl(root, 1.0, 1.15, 0.14, mat('#1c1c24', { roughness: 0.32, metalness: 0.5 }), 0, 0.07, 0, 48, true);
  const ringLight = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.018, 6, 64), new THREE.MeshBasicMaterial({ color: '#f2c14e' }));
  ringLight.rotation.x = Math.PI / 2;
  ringLight.position.y = 0.145;
  root.add(ringLight);
  // Floor grid lines
  for (let i = -4; i <= 4; i++) {
    const line = plane(root, 18, 0.012, new THREE.MeshBasicMaterial({ color: '#2a2a35', transparent: true, opacity: 0.5 }), 0, 0.002, i * 1.8, -Math.PI / 2, 0, 0);
    line.rotation.z = Math.PI / 2;
  }
  scene.add(new THREE.HemisphereLight('#7b90c0', '#1b0d0d', 0.4));
  const key = new THREE.SpotLight('#fff1db', 260, 20, Math.PI / 4.2, 0.5, 1.3);
  key.position.set(2.8, 5.4, 4.8);
  key.target.position.set(0, 1.1, 0);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = -0.0005;
  scene.add(key, key.target);
  const fill = new THREE.PointLight('#7cb8ff', 60, 14, 2);
  fill.position.set(-3.7, 2.4, 2.6);
  scene.add(fill);
  const rim = new THREE.PointLight('#f2c14e', 80, 14, 2);
  rim.position.set(2.6, 2.8, -3.4);
  scene.add(rim);
  const back = new THREE.PointLight('#e11d48', 35, 10, 2);
  back.position.set(-1.4, 1.6, -3.8);
  scene.add(back);
  return {
    scene, root,
    update: (dt) => { fill.intensity = 55 + Math.sin(performance.now() * 0.001) * 8; },
    dispose: () => scene.clear(),
  };
}

export function addRingBackdrop(scene) {
  // Optional additional broadcast backdrop behind the ring.
  const group = new THREE.Group();
  scene.add(group);
  return group;
}
