import * as THREE from '../vendor/three.module.js';
import { mergeGeometries } from '../vendor/BufferGeometryUtils.js';

/* ------------------------------------------------------------------
   Procedural textures — all generated locally, zero network cost
------------------------------------------------------------------- */
function canvasTexture(size, draw, repeat = 1) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  draw(ctx, size);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  t.repeat.set(repeat, repeat);
  return t;
}
function noise(ctx, size, count, colors, alpha = 0.3, max = 3) {
  for (let i = 0; i < count; i++) {
    ctx.globalAlpha = Math.random() * alpha;
    ctx.fillStyle = colors[(Math.random() * colors.length) | 0];
    const s = Math.random() * max + 1;
    ctx.fillRect(Math.random() * size, Math.random() * size, s, s);
  }
  ctx.globalAlpha = 1;
}
function blotches(ctx, size, count, color, alpha = 0.12, r = 30) {
  for (let i = 0; i < count; i++) {
    const g = ctx.createRadialGradient(Math.random() * size, Math.random() * size, 2, Math.random() * size, Math.random() * size, r * (0.3 + Math.random()));
    g.addColorStop(0, color);
    g.addColorStop(1, 'transparent');
    ctx.globalAlpha = alpha;
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  ctx.globalAlpha = 1;
}
function makeTextures() {
  const T = {};
  T.asphalt = canvasTexture(256, (ctx, s) => {
    ctx.fillStyle = '#262b2c'; ctx.fillRect(0, 0, s, s);
    noise(ctx, s, 2400, ['#343a3a', '#1c2021', '#404645', '#121617'], .6, 2.4);
    blotches(ctx, s, 10, '#0d1112', .28, 35);
    for (let i = 0; i < 7; i++) {
      ctx.strokeStyle = 'rgba(10,12,12,.45)'; ctx.lineWidth = 1 + Math.random();
      ctx.beginPath(); let x = Math.random() * s, y = Math.random() * s;
      ctx.moveTo(x, y);
      for (let j = 0; j < 5; j++) { x += (Math.random() - .5) * 30; y += Math.random() * 20; ctx.lineTo(x, y); }
      ctx.stroke();
    }
  });
  T.concrete = canvasTexture(256, (ctx, s) => {
    ctx.fillStyle = '#626865'; ctx.fillRect(0, 0, s, s);
    noise(ctx, s, 1600, ['#737a76', '#555b58', '#4a4f4c', '#858b87'], .45, 3);
    blotches(ctx, s, 15, '#373c3a', .18, 38);
    ctx.strokeStyle = 'rgba(38,42,40,.45)'; ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(0, Math.random() * s); ctx.lineTo(s, Math.random() * s); ctx.stroke(); }
  });
  T.tile = canvasTexture(256, (ctx, s) => {
    ctx.fillStyle = '#adad9f'; ctx.fillRect(0, 0, s, s);
    const n = 4, q = s / n;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      ctx.fillStyle = (x + y) % 2 ? '#99998d' : '#bfbdae';
      ctx.fillRect(x * q + 1, y * q + 1, q - 2, q - 2);
      ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(x * q + 2, y * q + 2, q - 4, 3);
    }
    noise(ctx, s, 700, ['#7c7c72', '#d6d2c2'], .24, 2);
    blotches(ctx, s, 8, '#5b5a51', .12, 24);
  });
  T.grass = canvasTexture(256, (ctx, s) => {
    ctx.fillStyle = '#4b5c34'; ctx.fillRect(0, 0, s, s);
    noise(ctx, s, 3800, ['#5d7140', '#3b4a2a', '#6b7c49', '#2f3d24'], .55, 3);
    blotches(ctx, s, 12, '#2a3520', .2, 42);
  });
  T.dirt = canvasTexture(256, (ctx, s) => {
    ctx.fillStyle = '#6b5d45'; ctx.fillRect(0, 0, s, s);
    noise(ctx, s, 2600, ['#7e6e52', '#584b37', '#8a7a5d', '#4a3e2e'], .55, 3);
    blotches(ctx, s, 10, '#3a3124', .16, 38);
  });
  T.metal = canvasTexture(256, (ctx, s) => {
    ctx.fillStyle = '#5b6264'; ctx.fillRect(0, 0, s, s);
    for (let y = 0; y < s; y += 2) { ctx.fillStyle = `rgba(255,255,255,${Math.random() * .06})`; ctx.fillRect(0, y, s, 1); }
    noise(ctx, s, 900, ['#6d7678', '#454c4e', '#7d8788'], .32, 2);
    blotches(ctx, s, 7, '#382d25', .18, 26);
  });
  T.rust = canvasTexture(256, (ctx, s) => {
    ctx.fillStyle = '#7c4a32'; ctx.fillRect(0, 0, s, s);
    noise(ctx, s, 2400, ['#945a39', '#5e3524', '#ad6c42', '#45271c'], .55, 4);
    blotches(ctx, s, 18, '#3b2318', .3, 30);
  });
  T.brick = canvasTexture(256, (ctx, s) => {
    ctx.fillStyle = '#8d5a4a'; ctx.fillRect(0, 0, s, s);
    const w = 64, h = 26;
    for (let y = 0, row = 0; y < s; y += h, row++) {
      for (let x = -w; x < s; x += w) {
        const off = row % 2 ? w / 2 : 0;
        ctx.fillStyle = ['#9c6553', '#825141', '#a8705a', '#754a3c'][(Math.random() * 4) | 0];
        ctx.fillRect(x + off + 2, y + 2, w - 4, h - 4);
      }
    }
    ctx.fillStyle = 'rgba(40,30,25,.35)';
    for (let y = 0; y < s; y += h) ctx.fillRect(0, y, s, 2);
    noise(ctx, s, 700, ['#5a3a2e', '#b27c65'], .25, 2);
  });
  T.wood = canvasTexture(256, (ctx, s) => {
    ctx.fillStyle = '#8b6b45'; ctx.fillRect(0, 0, s, s);
    for (let x = 0; x < s; x += 32) {
      ctx.fillStyle = Math.random() > .5 ? 'rgba(60,40,25,.22)' : 'rgba(255,230,180,.08)';
      ctx.fillRect(x, 0, 2, s);
    }
    noise(ctx, s, 900, ['#6e5235', '#a78458', '#5a4028'], .4, 2);
  });
  T.fabric = canvasTexture(128, (ctx, s) => {
    ctx.fillStyle = '#55614c'; ctx.fillRect(0, 0, s, s);
    for (let x = 0; x < s; x += 4) { ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(x, 0, 1, s); }
    for (let y = 0; y < s; y += 4) { ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(0, y, s, 1); }
  });
  const windowTexture = (glow, frame, pane) => canvasTexture(128, (ctx, s) => {
    ctx.fillStyle = frame; ctx.fillRect(0, 0, s, s);
    const q = s / 2;
    for (let y = 0; y < 2; y++) for (let x = 0; x < 2; x++) {
      const g = ctx.createLinearGradient(x * q, y * q, x * q + q, y * q + q);
      g.addColorStop(0, pane); g.addColorStop(1, glow);
      ctx.fillStyle = g; ctx.fillRect(x * q + 4, y * q + 4, q - 8, q - 8);
      ctx.fillStyle = 'rgba(255,255,255,.16)'; ctx.fillRect(x * q + 7, y * q + 7, q - 14, 4);
    }
    ctx.fillStyle = frame; ctx.fillRect(q - 3, 0, 6, s); ctx.fillRect(0, q - 3, s, 6);
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(0, s - 10, s, 10);
  });
  T.window = windowTexture('#263c48', '#2a2f30', '#3f5966');
  T.windowLit = windowTexture('#ffe1a1', '#3a3328', '#d9b168');
  T.windowCyan = windowTexture('#9ffcf2', '#1f3534', '#3fbdb4');
  return T;
}
const TEX = makeTextures();

/* ------------------------------------------------------------------
   Sky, dust, lights
------------------------------------------------------------------- */
export function createSky(colors) {
  const geo = new THREE.SphereGeometry(420, 32, 16);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      top: { value: new THREE.Color(colors.top) },
      bottom: { value: new THREE.Color(colors.bottom) },
      sun: { value: new THREE.Color(colors.sun || '#ffd9a0') },
      sunDir: { value: new THREE.Vector3(colors.sunDir?.[0] ?? 0.5, colors.sunDir?.[1] ?? 0.55, colors.sunDir?.[2] ?? -0.4).normalize() }
    },
    vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 top; uniform vec3 bottom; uniform vec3 sun; uniform vec3 sunDir; varying vec3 vDir;
      float hash(vec3 p){ return fract(sin(dot(p,vec3(12.9898,78.233,45.164)))*43758.5453); }
      void main(){
        float h = clamp(vDir.y,0.0,1.0);
        vec3 col = mix(bottom, top, smoothstep(0.0,0.92,h));
        float d = max(dot(normalize(vDir),sunDir),0.0);
        col += sun * pow(d,900.0)*1.3;
        col += sun * pow(d,48.0)*0.12;
        if(h<0.02) col = mix(col, bottom*0.72, smoothstep(0.02,0.0,h));
        gl_FragColor = vec4(col,1.0);
      }`
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.renderOrder = -10;
  return mesh;
}

export function createDust(color = 0xd9ff96) {
  const count = 260;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - .5) * 70;
    pos[i * 3 + 1] = Math.random() * 15 + .4;
    pos[i * 3 + 2] = (Math.random() - .5) * 70;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const m = new THREE.PointsMaterial({ color, size: .085, transparent: true, opacity: .42, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
  const p = new THREE.Points(g, m);
  p.userData.dust = true;
  return p;
}

export function addEnvironment(scene, info, quality = 'medium') {
  scene.background = new THREE.Color(info.sky.bottom);
  scene.fog = new THREE.FogExp2(info.sky.fog || info.sky.bottom, info.sky.fogDensity ?? 0.012);
  scene.add(createSky(info.sky));
  scene.add(createDust(info.sky.dust || 0xd9ff96));
  scene.add(new THREE.HemisphereLight(info.sky.hemiSky || 0xcde7ff, info.sky.hemiGround || 0x3c4030, info.sky.hemi ?? 1.15));
  const sun = new THREE.DirectionalLight(info.sky.sun || 0xffe0b0, info.sky.light ?? 2.25);
  sun.position.set(...(info.sky.lightPos || [24, 38, 16]));
  const shadowSize = quality === 'low' ? 1024 : quality === 'medium' ? 1536 : 2048;
  sun.castShadow = quality !== 'low';
  sun.shadow.mapSize.set(shadowSize, shadowSize);
  sun.shadow.camera.left = -44; sun.shadow.camera.right = 44;
  sun.shadow.camera.top = 44; sun.shadow.camera.bottom = -44;
  sun.shadow.camera.near = 1; sun.shadow.camera.far = 140;
  sun.shadow.bias = -0.0005;
  sun.shadow.normalBias = 0.03;
  scene.add(sun);
  scene.add(sun.target);
  scene.userData.sun = sun;
  const amb = new THREE.AmbientLight(0xffffff, info.sky.ambient ?? 0.2);
  scene.add(amb);
  // soft camera-side fill so shadowed facades stay readable
  const fill = new THREE.DirectionalLight(0xffd9b8, 0.55);
  fill.position.set(0, 22, 48);
  scene.add(fill);
  return sun;
}

/* ------------------------------------------------------------------
   World builder — merges thousands of boxes into a few draw calls
------------------------------------------------------------------- */
const BASE_MATS = {
  asphalt: { map: TEX.asphalt, color: 0xffffff, roughness: .97, metalness: 0, tile: 6 },
  concrete: { map: TEX.concrete, color: 0xffffff, roughness: .94, tile: 4 },
  tile: { map: TEX.tile, color: 0xffffff, roughness: .6, tile: 3 },
  grass: { map: TEX.grass, color: 0xffffff, roughness: 1, tile: 5 },
  dirt: { map: TEX.dirt, color: 0xffffff, roughness: 1, tile: 5 },
  metal: { map: TEX.metal, color: 0xffffff, roughness: .52, metalness: .55, tile: 3 },
  rust: { map: TEX.rust, color: 0xffffff, roughness: .84, metalness: .28, tile: 3 },
  brick: { map: TEX.brick, color: 0xffffff, roughness: .93, tile: 3 },
  wood: { map: TEX.wood, color: 0xffffff, roughness: .88, tile: 2.5 },
  fabric: { map: TEX.fabric, color: 0xffffff, roughness: 1, tile: 2 },
  dark: { color: 0x11181a, roughness: .7, metalness: .25 },
  black: { color: 0x080b0c, roughness: .85 },
  white: { color: 0xd8dcd3, roughness: .8 },
  cream: { color: 0xd6cdb5, roughness: .9 },
  blue: { color: 0x37556f, roughness: .8, metalness: .1 },
  cyan: { color: 0x1f6f70, roughness: .6, metalness: .2 },
  red: { color: 0x80382d, roughness: .84 },
  orange: { color: 0xa65a2b, roughness: .8 },
  yellow: { color: 0xb39a35, roughness: .8 },
  green: { color: 0x3b5b37, roughness: .9 },
  pink: { color: 0xa95266, roughness: .82 },
  purple: { color: 0x4d3c68, roughness: .82 },
  teal: { color: 0x2c6b68, roughness: .8 },
  window: { map: TEX.window, color: 0xffffff, roughness: .22, metalness: .55 },
  windowLit: { map: TEX.windowLit, emissiveMap: TEX.windowLit, emissive: 0xffffff, emissiveIntensity: .42, roughness: .3 },
  windowCyan: { map: TEX.windowCyan, emissiveMap: TEX.windowCyan, emissive: 0xffffff, emissiveIntensity: .5, roughness: .26 },
  neonCyan: { color: 0x08201e, emissive: 0x40ffe0, emissiveIntensity: 2.2, roughness: .4 },
  neonPink: { color: 0x260b16, emissive: 0xff3c9a, emissiveIntensity: 2.1, roughness: .4 },
  neonOrange: { color: 0x2a1307, emissive: 0xff7a28, emissiveIntensity: 2.0, roughness: .4 },
  neonYellow: { color: 0x2a2708, emissive: 0xd9ff43, emissiveIntensity: 1.7, roughness: .4 },
  glass: { color: 0x9acacb, roughness: .08, metalness: .15, transparent: true, opacity: .32, depthWrite: false },
  sand: { color: 0x8a7a5a, roughness: 1 },
  sandbag: { map: TEX.fabric, color: 0xa08f68, roughness: 1, tile: 1.4 },
  hazard: { color: 0x181a19, roughness: .8 },
  hazard2: { color: 0xd4b52e, roughness: .7 },
  carRed: { color: 0x9c2d2e, roughness: .32, metalness: .62 },
  carBlue: { color: 0x275a8c, roughness: .32, metalness: .62 },
  carYellow: { color: 0xbd9a2c, roughness: .35, metalness: .55 },
  carGreen: { color: 0x2f6e5a, roughness: .35, metalness: .55 },
  carWhite: { color: 0xc3c8bd, roughness: .35, metalness: .45 },
  rubber: { color: 0x141718, roughness: .95 },
  water: { color: 0x1e5d63, roughness: .12, metalness: .5, transparent: true, opacity: .82 },
  glowRed: { color: 0x3a0a0d, emissive: 0xff2938, emissiveIntensity: 2.4 },
  glowGreen: { color: 0x09250e, emissive: 0x55ff66, emissiveIntensity: 2.0 },
  glowBlue: { color: 0x08203a, emissive: 0x399cff, emissiveIntensity: 2.3 },
  gold: { color: 0xa98436, roughness: .35, metalness: .78 },
  clothRed: { map: TEX.fabric, color: 0x9e4235, roughness: 1, tile: 2 },
  clothBlue: { map: TEX.fabric, color: 0x375d86, roughness: 1, tile: 2 },
  clothYellow: { map: TEX.fabric, color: 0xb8963c, roughness: 1, tile: 2 },
  clothPink: { map: TEX.fabric, color: 0xa85670, roughness: 1, tile: 2 },
  clothGreen: { map: TEX.fabric, color: 0x47754a, roughness: 1, tile: 2 },
  clothPurple: { map: TEX.fabric, color: 0x5c447a, roughness: 1, tile: 2 },
};

class Builder {
  constructor() {
    this.materials = new Map();
    this.batches = new Map();
    this.colliders = [];
    this.mini = [];
    this.signs = [];
    this.lights = [];
    this.extra = [];
  }
  material(key, defOverride) {
    const key2 = defOverride ? key + ':' + JSON.stringify(defOverride) : key;
    if (this.materials.has(key2)) return this.materials.get(key2);
    const def = defOverride || BASE_MATS[key] || BASE_MATS.concrete;
    const m = new THREE.MeshStandardMaterial({
      color: def.color ?? 0xffffff,
      roughness: def.roughness ?? .85,
      metalness: def.metalness ?? .05,
      map: def.map || null,
      emissive: def.emissive || 0x000000,
      emissiveIntensity: def.emissiveIntensity ?? 1,
      transparent: def.transparent || false,
      opacity: def.opacity ?? 1,
      depthWrite: def.depthWrite !== false,
      side: def.side || THREE.FrontSide,
    });
    if (def.map) m.map.repeat.set(1, 1);
    m.name = key2;
    this.materials.set(key2, m);
    return m;
  }
  batch(geo, mat) {
    if (!this.batches.has(mat)) this.batches.set(mat, []);
    this.batches.get(mat).push(geo);
  }
  box(x, y, z, w, h, d, matKey, opts = {}) {
    const geo = new THREE.BoxGeometry(w, h, d);
    if (opts.uv !== false) this.scaleUV(geo, w, h, d, opts.tile || BASE_MATS[matKey]?.tile || 3);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(opts.rotX || 0, opts.rotY || 0, opts.rotZ || 0));
    m.compose(new THREE.Vector3(x, y, z), q, new THREE.Vector3(1, 1, 1));
    geo.applyMatrix4(m);
    this.batch(geo, this.material(matKey, opts.mat));
    if (opts.collide) this.addCollider(x, z, w, d, opts);
    if (opts.mini !== false) this.mini.push({ x, z, w, d, h, color: opts.miniColor || matKey });
    return this;
  }
  scaleUV(geo, w, h, d, tile) {
    const uv = geo.attributes.uv;
    const faces = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
    for (let f = 0; f < 6; f++) {
      for (let i = 0; i < 4; i++) {
        const idx = f * 4 + i;
        uv.setXY(idx, uv.getX(idx) * faces[f][0] / tile, uv.getY(idx) * faces[f][1] / tile);
      }
    }
    uv.needsUpdate = true;
  }
  cylinder(x, y, z, rTop, rBottom, h, matKey, opts = {}) {
    const geo = new THREE.CylinderGeometry(rTop, rBottom, h, opts.segments || 10, 1, !!opts.open);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(opts.rotX || 0, opts.rotY || 0, opts.rotZ || 0));
    m.compose(new THREE.Vector3(x, y, z), q, new THREE.Vector3(1, 1, 1));
    geo.applyMatrix4(m);
    this.batch(geo, this.material(matKey, opts.mat));
    if (opts.collide) this.addCollider(x, z, Math.max(rTop, rBottom) * 2, Math.max(rTop, rBottom) * 2, opts);
    if (opts.mini !== false) this.mini.push({ x, z, w: Math.max(rTop, rBottom) * 2, d: Math.max(rTop, rBottom) * 2, h, color: opts.miniColor || matKey, round: true });
    return this;
  }
  sphere(x, y, z, r, matKey, opts = {}) {
    const geo = new THREE.SphereGeometry(r, opts.segments || 10, opts.rings || 8);
    const m = new THREE.Matrix4();
    m.compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(opts.rotX || 0, opts.rotY || 0, opts.rotZ || 0)), new THREE.Vector3(opts.sx || 1, opts.sy || 1, opts.sz || 1));
    geo.applyMatrix4(m);
    this.batch(geo, this.material(matKey, opts.mat));
    if (opts.collide) this.addCollider(x, z, r * 2, r * 2, opts);
    return this;
  }
  addCollider(x, z, w, d, opts = {}) {
    this.colliders.push({
      minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2,
      h: opts.h ?? 3, tag: opts.tag || 'wall'
    });
  }
  addSign(text, x, y, z, w, h, rotY, colors = {}) {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 128;
    const ctx = c.getContext('2d');
    ctx.fillStyle = colors.bg || '#0b1013'; ctx.fillRect(0, 0, 512, 128);
    ctx.strokeStyle = colors.fg || '#d9ff43'; ctx.lineWidth = 6; ctx.strokeRect(8, 8, 496, 112);
    ctx.font = '900 54px Arial Black, Arial, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = colors.fg || '#d9ff43';
    ctx.shadowColor = colors.fg || '#d9ff43'; ctx.shadowBlur = 18;
    ctx.fillText(text, 256, 68);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: false });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    mesh.position.set(x, y, z); mesh.rotation.y = rotY || 0;
    this.signs.push(mesh);
    return this;
  }
  addLight(color, intensity, distance, x, y, z) {
    const l = new THREE.PointLight(color, intensity, distance, 2);
    l.position.set(x, y, z);
    this.lights.push(l);
    return this;
  }
  addExtra(obj) { this.extra.push(obj); return this; }
  finish(scene, info) {
    const group = new THREE.Group();
    for (const [mat, geos] of this.batches) {
      if (!geos.length) continue;
      const merged = mergeGeometries(geos, false);
      geos.forEach(g => g.dispose());
      const mesh = new THREE.Mesh(merged, mat);
      mesh.castShadow = !mat.transparent;
      mesh.receiveShadow = true;
      mesh.matrixAutoUpdate = false;
      group.add(mesh);
    }
    this.signs.forEach(s => group.add(s));
    this.extras = new THREE.Group();
    this.extra.forEach(o => group.add(o));
    this.lights.forEach(l => group.add(l));
    scene.add(group);
    return group;
  }
}

function addBuilding(b, x, z, w, d, h, color, opts = {}) {
  b.box(x, h / 2, z, w, h, d, color, { collide: true, tile: 4, miniColor: color });
  // cornice
  b.box(x, h + .25, z, w + .5, .5, d + .5, 'concrete', { mini: false, uv: true });
  // roof
  b.box(x, h + .12, z, w - .4, .18, d - .4, 'dark', { mini: false });
  // windows
  const cols = Math.max(1, Math.floor(w / 3.4));
  const rows = Math.max(1, Math.floor(h / 3));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wg = (c - (cols - 1) / 2) * (w / cols);
      const wy = 2.2 + r * (h / rows);
      if (wy > h - 1) continue;
      const face = opts.faces || ['front'];
      if (face.includes('front')) b.box(x + wg, wy, z + d / 2 + .04, Math.min(1.6, w / cols * .55), 1.1, .08, Math.random() > .45 ? 'windowLit' : 'window', { uv: false, mini: false });
      if (face.includes('back')) b.box(x + wg, wy, z - d / 2 - .04, Math.min(1.6, w / cols * .55), 1.1, .08, Math.random() > .55 ? 'window' : 'windowLit', { uv: false, mini: false });
      if (face.includes('left')) b.box(x - w / 2 - .04, wy, z + wg, .08, 1.1, Math.min(1.6, d / cols * .55), Math.random() > .55 ? 'window' : 'windowCyan', { uv: false, mini: false });
      if (face.includes('right')) b.box(x + w / 2 + .04, wy, z + wg, .08, 1.1, Math.min(1.6, d / cols * .55), Math.random() > .55 ? 'windowLit' : 'window', { uv: false, mini: false });
    }
  }
  if (opts.ac) {
    b.box(x + w * .22, h + .6, z - d * .18, 1.5, .8, 1.1, 'metal', { mini: false });
    b.box(x - w * .18, h + .6, z + d * .12, 1.1, .6, 1.1, 'metal', { mini: false });
  }
  if (opts.tank) {
    b.cylinder(x - w * .27, h + 1.4, z, .9, .9, 1.9, 'rust', { mini: false });
  }
}

function addCar(b, x, z, rotY, color, opts = {}) {
  const cs = Math.cos(rotY), sn = Math.sin(rotY);
  const put = (lx, ly, lz, w, h, d, mat, o = {}) => b.box(x + lx * cs + lz * sn, ly, z - lx * sn + lz * cs, w, h, d, mat, { ...o, rotY, mini: false });
  put(0, .62, 0, 1.8, .55, 4.1, color, { collide: true, miniColor: color });
  put(0, 1.03, .1, 1.6, .45, 2.1, 'window', {});
  put(0, .55, 1.65, 1.7, .25, .75, color, {});
  put(0, .55, -1.7, 1.7, .23, .65, color, {});
  for (const [wx, wz] of [[-.9, 1.3], [.9, 1.3], [-.9, -1.3], [.9, -1.3]]) {
    b.cylinder(x + wx * cs + wz * sn, .38, z - wx * sn + wz * cs, .32, .32, .25, 'rubber', { rotZ: Math.PI / 2, segments: 8, mini: false });
  }
  b.box(x, .72, 2.5, 1.6, .18, .1, 'white', { mini: false });
  if (opts.glow) b.box(x, .72, -2.09, 1.5, .16, .08, 'glowRed', { uv: false, mini: false });
  b.addCollider(x, z, Math.abs(1.8 * cs) + Math.abs(4.1 * sn) + .2, Math.abs(1.8 * sn) + Math.abs(4.1 * cs) + .2, { tag: 'car' });
}

function addCrate(b, x, z, size = 1.1, rotY = 0, mat = 'wood') {
  b.box(x, size / 2, z, size, size, size, mat, { collide: true, rotY, tile: 1.4, miniColor: mat });
  b.box(x, size * .72, z, size * 1.01, .07, size * 1.01, 'dark', { rotY, mini: false, uv: false });
}
function addBarrel(b, x, z, color = 'rust') {
  b.cylinder(x, .55, z, .34, .34, 1.1, color, { collide: true, segments: 10, miniColor: color });
  b.cylinder(x, .88, z, .36, .36, .06, 'dark', { segments: 10, mini: false });
}
function addLamp(b, x, z, height = 5.4, lightColor = 0xffd27a) {
  b.cylinder(x, height / 2, z, .08, .12, height, 'dark', { segments: 6, collide: true, mini: false });
  b.box(x + .55, height - .05, z, 1.3, .1, .12, 'dark', { mini: false });
  b.box(x + 1.15, height - .13, z, .34, .16, .3, 'neonYellow', { uv: false, mini: false });
  if (Math.random() > .45) b.addLight(lightColor, 16, 12, x + 1.15, height - .4, z);
}
function addTree(b, x, z, scale = 1) {
  b.cylinder(x, 1.35 * scale, z, .13 * scale, .22 * scale, 2.7 * scale, 'wood', { mini: false, collide: true, segments: 7 });
  b.sphere(x, 3.1 * scale, z, 1.25 * scale, 'green', { segments: 8, rings: 6, mini: false });
  b.sphere(x + .7 * scale, 2.75 * scale, z + .2 * scale, .85 * scale, 'green', { segments: 7, rings: 5, mini: false });
  b.sphere(x - .55 * scale, 2.85 * scale, z - .3 * scale, .75 * scale, 'green', { segments: 7, rings: 5, mini: false });
}
function addPalm(b, x, z, h = 5.4) {
  b.cylinder(x, h / 2, z, .14, .28, h, 'wood', { segments: 7, collide: true, mini: false });
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2;
    b.box(x + Math.cos(a) * 1.25, h + .1, z + Math.sin(a) * 1.25, 2.3, .08, .42, 'green', { rotY: -a, rotZ: .18, mini: false, uv: false });
  }
  b.sphere(x, h, z, .45, 'green', { segments: 7, rings: 5, mini: false });
}
function addContainer(b, x, z, rotY, color) {
  b.box(x, 1.3, z, 2.5, 2.6, 6.1, color, { collide: true, rotY, tile: 3, miniColor: color });
  for (let i = -2.4; i < 2.5; i += .55) b.box(x + Math.sin(rotY) * i, 1.3, z + Math.cos(rotY) * i, 2.54, 2.4, .1, 'dark', { rotY, mini: false, uv: false });
  b.box(x, 2.66, z, 2.6, .1, 6.2, 'dark', { rotY, mini: false, uv: false });
  b.addCollider(x, z, Math.abs(2.5 * Math.cos(rotY)) + Math.abs(6.1 * Math.sin(rotY)), Math.abs(2.5 * Math.sin(rotY)) + Math.abs(6.1 * Math.cos(rotY)), { tag: 'container' });
}
function addHazardStripe(b, x, z, w, d, rotY = 0) {
  const n = Math.max(2, Math.floor(w / 1.2));
  for (let i = 0; i < n; i++) {
    b.box(x - w / 2 + (i + .5) * w / n, .012, z, w / n * .6, .03, d, i % 2 ? 'hazard2' : 'hazard', { rotY, mini: false, uv: false });
  }
}
function addFence(b, x1, z1, x2, z2, h = 2.2, color = 'metal') {
  const dx = x2 - x1, dz = z2 - z1, len = Math.hypot(dx, dz);
  const rot = Math.atan2(dx, dz);
  const cx = (x1 + x2) / 2, cz = (z1 + z2) / 2;
  for (let i = 0; i <= len; i += 2.2) {
    const t = i / len;
    b.cylinder(x1 + dx * t, h / 2, z1 + dz * t, .06, .07, h, color, { segments: 5, mini: false });
  }
  b.box(cx, h - .08, cz, .09, .09, len, color, { rotY: rot, mini: false });
  b.box(cx, h * .55, cz, .06, .06, len, color, { rotY: rot, mini: false });
  b.addCollider(cx, cz, Math.abs(dx) + .25, Math.abs(dz) + .25, { h });
}

/* ------------------------------------------------------------------
   MAP 1 — CIDADE ABANDONADA
------------------------------------------------------------------- */
function buildCidade() {
  const b = new Builder();
  const info = {
    id: 'cidade', name: 'CIDADE ABANDONADA', sub: 'SETOR 07 · ZONA MORTA',
    desc: 'Ruas rachadas, prédios vazios e carros que não vão a lugar nenhum. Perfeito para um tiroteio sem testemunhas.',
    features: ['Becos estreitos', 'Telhados e rotas laterais', 'Muito cover'],
    sky: { top: '#1a3a4a', bottom: '#d1a06e', sun: '#ffd9a3', fog: '#a98a6c', fogDensity: .012, sunDir: [-.5, .38, .6], hemi: 1.48, light: 2.65, lightPos: [-30, 42, 26], ambient: .4, dust: 0xffe0b0 },
    ground: 'asphalt'
  };
  b.box(0, -.25, 0, 94, .5, 94, 'asphalt', { tile: 7, mini: false });
  // sidewalks / blocks
  const blocks = [
    { x: -27, z: -24, w: 22, d: 18, h: 13, c: 'concrete' },
    { x: 25, z: -25, w: 20, d: 16, h: 18, c: 'brick' },
    { x: -28, z: 23, w: 18, d: 20, h: 11, c: 'blue' },
    { x: 27, z: 24, w: 22, d: 18, h: 15, c: 'concrete' },
    { x: 0, z: -38, w: 30, d: 10, h: 20, c: 'dark' },
    { x: -41, z: 0, w: 10, d: 26, h: 16, c: 'brick' },
    { x: 41, z: -2, w: 10, d: 24, h: 12, c: 'concrete' },
    { x: 4, z: 39, w: 28, d: 10, h: 14, c: 'brick' },
  ];
  for (const bl of blocks) addBuilding(b, bl.x, bl.z, bl.w, bl.d, bl.h, bl.c, { ac: true, tank: true, faces: ['front', 'back', 'left', 'right'] });
  // inset shopfronts
  b.box(-27, 2, -14.9, 20, 4, .2, 'dark', { mini: false });
  b.box(-20, 1.8, -14.82, 8, 2.8, .08, 'windowLit', { uv: false, mini: false });
  b.addSign('PASTEL 24H', -21, 4.4, -14.6, 7, 1.4, 0, { fg: '#ff9d3c' });
  b.addSign('CAOS', 28, 5.2, 15.9, 4.4, 1.3, Math.PI, { fg: '#48f2d2' });
  b.addSign('MOTEL', -37, 4.2, 10, 5, 1.5, Math.PI / 2, { fg: '#ff3c9a' });
  // central plaza / fountain
  b.box(0, .02, 3, 18, .06, 18, 'concrete', { tile: 3, mini: false });
  b.cylinder(0, .36, 3, 2.1, 2.4, .72, 'concrete', { segments: 12, collide: true });
  b.cylinder(0, .8, 3, 1.7, 1.7, .16, 'water', { segments: 14, mini: false });
  b.cylinder(0, 1.8, 3, .32, .46, 2.2, 'concrete', { segments: 8, collide: true });
  b.sphere(0, 3.05, 3, .55, 'rust', { segments: 8, rings: 6 });
  // road markings
  for (let i = -40; i < 40; i += 7) {
    b.box(i, .006, 0, 3.2, .02, .2, 'white', { mini: false, uv: false });
    b.box(0, .006, i, .2, .02, 3.2, 'white', { mini: false, uv: false });
  }
  for (let i = -38; i < 40; i += 12) b.box(i, .008, 10.5, 4, .02, .14, 'yellow', { mini: false, uv: false });
  // cars
  addCar(b, -9, -11, Math.PI / 2, 'carRed', { glow: true });
  addCar(b, 12, -12, Math.PI / 2, 'carBlue');
  addCar(b, -14, 14, Math.PI / 2, 'carYellow', { glow: true });
  addCar(b, 15, 16, .2, 'carGreen');
  addCar(b, -33, 4, 0, 'carWhite', { glow: true });
  addCar(b, 8, 27, Math.PI / 2 + .1, 'carRed');
  // props
  addCrate(b, -21, -10, 1.4, .2);
  addCrate(b, -22.4, -9.4, 1, -.4, 'metal');
  addCrate(b, 18, 10, 1.2, .4);
  addCrate(b, 19.4, 10.6, .9, .1, 'metal');
  addBarrel(b, 24, 8, 'rust');
  addBarrel(b, 23.2, 9.2, 'blue');
  addBarrel(b, -18, 17, 'rust');
  addBarrel(b, 30, -8, 'yellow');
  addLamp(b, -8, 3, 6.2, 0xffc470);
  addLamp(b, 9, -4, 6.2, 0x8fe5ff);
  addLamp(b, -35, -9, 5.4, 0xffc470);
  addLamp(b, 33, 14, 5.4, 0xffc470);
  // dumpsters
  for (const [x, z, c] of [[-34, 16, 'green'], [20, -30, 'teal'], [35, 6, 'blue']]) {
    b.box(x, .75, z, 3, 1.5, 1.5, c, { collide: true, miniColor: c });
    b.box(x, 1.58, z, 3.1, .18, 1.6, 'dark', { mini: false });
    b.box(x - .8, .7, z + .76, .5, .12, .05, 'white', { mini: false, uv: false });
  }
  // bus
  b.box(-4, 1.55, 32, 4.4, 2.8, 9.5, 'carYellow', { collide: true, tile: 2.8, miniColor: 'carYellow' });
  b.box(-4, 2.2, 32, 4.45, 1, 7.5, 'window', { uv: false, mini: false });
  for (let i = 0; i < 4; i++) b.cylinder(-6.1, .5, 28.5 + i * 2.2, .44, .44, .25, 'rubber', { rotZ: Math.PI / 2, segments: 8, mini: false });
  b.addCollider(-4, 32, 4.4, 9.5, { tag: 'bus' });
  // alley details: AC, pipes, graffiti
  for (const [x, z] of [[-16, -18], [18, -18], [-18, 13], [18, 14]]) {
    b.box(x, 3.4, z, .25, 6.5, .25, 'rust', { mini: false });
    b.box(x + .6, 4.4, z, 1.2, .15, .15, 'dark', { mini: false });
  }
  b.addSign('NADA', 16.5, 2.5, 14.6, 4, 1.2, 0, { bg: '#171b16', fg: '#d9ff43' });
  // barriers
  for (const [x, z, r] of [[-6, -8, 0], [6, 8, .3], [-15, 7, 1.2]]) {
    b.box(x, .65, z, 2.2, 1.1, .5, 'hazard2', { collide: true, rotY: r, uv: false, miniColor: 'hazard2' });
    b.box(x, .65, z, 2.2, 1.1, .5, 'hazard', { collide: false, rotY: r, mini: false, uv: false });
  }
  const colliders = b.colliders;
  const spawns = [
    { x: -7, z: 26, yaw: 0 }, { x: -13, z: 29, yaw: 0 }, { x: 0, z: 30, yaw: 0 }, { x: 7, z: 22, yaw: 0 }, { x: 13, z: 30, yaw: 0 },
    { x: -7, z: -25, yaw: Math.PI }, { x: 7, z: -25, yaw: Math.PI }, { x: 0, z: -29, yaw: Math.PI }, { x: -14, z: -22, yaw: Math.PI }, { x: 14, z: -22, yaw: Math.PI },
    { x: -34, z: 0, yaw: Math.PI / 2 }, { x: 34, z: 0, yaw: -Math.PI / 2 }
  ];
  const navPoints = [
    { x: 0, z: 3 }, { x: -7, z: -9 }, { x: 7, z: -9 }, { x: -16, z: 8 }, { x: 18, z: 8 }, { x: -10, z: 17 }, { x: 10, z: 17 },
    { x: 0, z: -17 }, { x: -20, z: -6 }, { x: 20, z: -6 }, { x: -28, z: 7 }, { x: 29, z: 9 }, { x: -32, z: 27 }, { x: 32, z: 27 },
    { x: 0, z: 28 }, { x: 0, z: -26 }, { x: -23, z: -16 }, { x: 23, z: -16 }, { x: -23, z: 16 }, { x: 23, z: 16 }
  ];
  const zones = [{ id: 'A', x: -18, z: 4, r: 5.6 }, { id: 'B', x: 0, z: 3, r: 6.4 }, { id: 'C', x: 19, z: 9, r: 5.6 }];
  return { builder: b, info, colliders, spawns, navPoints, zones, bounds: { minX: -44, maxX: 44, minZ: -44, maxZ: 44 } };
}

/* ------------------------------------------------------------------
   MAP 2 — FÁBRICA MALUCA
------------------------------------------------------------------- */
function buildFabrica() {
  const b = new Builder();
  const info = {
    id: 'fabrica', name: 'FÁBRICA MALUCA', sub: 'COMPLEXO INDUSTRIAL 12',
    desc: 'Uma fábrica que produz coisas que ninguém pediu. Cuidado com os tanques, os canos e o supervisor.',
    features: ['Corredores de máquinas', 'Tanques explosivos', 'Iluminação industrial'],
    sky: { top: '#1c2a2b', bottom: '#9aa277', sun: '#ffd48a', fog: '#697064', fogDensity: .016, sunDir: [.3, .55, -.5], hemi: .85, light: 1.9, lightPos: [28, 46, 20], ambient: .24, dust: 0xc9d7a0 },
    ground: 'concrete'
  };
  b.box(0, -.3, 0, 88, .6, 88, 'concrete', { tile: 6, mini: false });
  addHazardStripe(b, 0, 0, 70, 1.2, 0);
  addHazardStripe(b, 0, -14, 70, 1, 0);
  // outer walls
  b.box(0, 5, -43, 88, 10, 1.2, 'concrete', { collide: true, tile: 4, miniColor: 'concrete' });
  b.box(0, 5, 43, 88, 10, 1.2, 'concrete', { collide: true, tile: 4, miniColor: 'concrete' });
  b.box(-43, 5, 0, 1.2, 10, 88, 'concrete', { collide: true, tile: 4, miniColor: 'concrete' });
  b.box(43, 5, 0, 1.2, 10, 88, 'concrete', { collide: true, tile: 4, miniColor: 'concrete' });
  for (let i = -40; i < 41; i += 8) {
    b.box(i, 7.2, -42.35, 4, 2.2, .14, 'windowCyan', { uv: false, mini: false });
    b.box(i, 7.2, 42.35, 4, 2.2, .14, 'windowLit', { uv: false, mini: false });
    b.box(-42.35, 7.2, i, .14, 2.2, 4, 'windowLit', { uv: false, mini: false });
    b.box(42.35, 7.2, i, .14, 2.2, 4, 'windowCyan', { uv: false, mini: false });
  }
  // central machine hall structures
  const machine = (x, z, w, d, h, color) => {
    b.box(x, h / 2, z, w, h, d, 'metal', { collide: true, tile: 2.6, miniColor: color });
    b.box(x, h + .2, z, w * .82, .4, d * .82, color, { mini: false, uv: false });
    for (let i = -.3; i <= .3; i += .3) b.box(x + w * i, h * .55, z + d / 2 + .06, .1, h * .7, .1, 'dark', { mini: false, uv: false });
    b.box(x, h * .7, z + d / 2 + .08, w * .5, .5, .1, 'neonOrange', { uv: false, mini: false });
  };
  machine(-20, -13, 7, 5, 3.4, 'orange');
  machine(-27, 2, 6, 8, 4.2, 'blue');
  machine(18, -16, 8, 5, 3.8, 'red');
  machine(26, 5, 5, 7, 3.1, 'yellow');
  machine(-14, 20, 6, 5, 3.2, 'teal');
  machine(14, 21, 7, 5, 2.6, 'green');
  // pipes network
  for (const [x, z, h] of [[-34, -25, 5], [-34, 13, 5], [34, -20, 5], [34, 18, 5]]) {
    b.cylinder(x, h / 2, z, .25, .3, h, 'rust', { segments: 8, collide: true, miniColor: 'rust' });
    b.cylinder(x, h, z, .18, .18, 12, 'metal', { rotZ: Math.PI / 2, segments: 8, mini: false });
  }
  for (let i = 0; i < 5; i++) {
    b.cylinder(-34 + i * 17, 4.7, -30, .22, .22, 17, 'rust', { rotZ: Math.PI / 2, segments: 8, mini: false });
    b.cylinder(-34 + i * 17, 3, 30, .18, .18, 17, 'metal', { rotZ: Math.PI / 2, segments: 8, mini: false });
  }
  // glowing vats
  for (const [x, z, c] of [[-8, -26, 'glowGreen'], [9, 28, 'glowBlue'], [30, -8, 'glowRed'], [-31, -19, 'glowGreen']]) {
    b.cylinder(x, 1.5, z, 1.5, 1.7, 3, 'metal', { segments: 12, collide: true, miniColor: 'metal' });
    b.cylinder(x, 3.06, z, 1.3, 1.3, .12, c, { segments: 14, mini: false });
    b.cylinder(x, 3.7, z, .1, .1, 3.2, 'metal', { segments: 6, mini: false });
    b.addLight(c === 'glowGreen' ? 0x55ff66 : c === 'glowBlue' ? 0x399cff : 0xff2938, 12, 10, x, 4.5, z);
  }
  // conveyor
  b.box(-4, 1.1, 8, 14, .55, 2.4, 'dark', { collide: true, tile: 2, miniColor: 'dark' });
  for (let i = -6; i <= 6; i += 1.2) b.cylinder(-4 + i, 1.3, 8, .3, .3, 2.2, 'metal', { rotX: Math.PI / 2, segments: 8, mini: false });
  for (let i = -6; i <= 6; i += 2.4) b.box(-4 + i, .55, 8, .12, 1.1, 2, 'rust', { mini: false });
  // catwalk / platforms (visual)
  b.box(-24, 4.7, 14, 16, .3, 2.2, 'metal', { mini: false });
  b.box(-24, 5.6, 14.9, 16, 1, .08, 'metal', { mini: false });
  for (let i = -31; i <= -17; i += 3.5) b.box(i, 2.5, 15, .12, 4.4, .12, 'metal', { mini: false });
  b.box(24, 5.2, -9, 14, .3, 2.2, 'metal', { mini: false });
  // crates / barrels
  for (const [x, z, s] of [[-8, 14, 1.2], [-6.6, 15, .9], [8, 13, 1.3], [9.4, 13.8, .8], [-25, -6, 1.2], [20, 9, 1.1], [23, -4, 1.3], [5, -8, 1.1]]) addCrate(b, x, z, s, Math.random() * 1.2, Math.random() > .5 ? 'metal' : 'wood');
  for (const [x, z, c] of [[-12, -4, 'rust'], [-10.8, -3.2, 'blue'], [12, 11, 'yellow'], [28, -28, 'rust'], [-29, 27, 'green'], [39, 2, 'red']]) addBarrel(b, x, z, c);
  // hanging lamps
  for (const [x, z] of [[-12, -13], [0, 0], [12, 13], [-18, 9], [18, -6]]) {
    b.cylinder(x, 8.2, z, .03, .03, 2.2, 'dark', { segments: 4, mini: false });
    b.cylinder(x, 7.1, z, .55, .18, .28, 'metal', { segments: 10, mini: false });
    b.cylinder(x, 6.95, z, .4, .4, .06, 'neonYellow', { segments: 12, mini: false });
    b.addLight(0xffd27a, 18, 15, x, 6.6, z);
  }
  // hazard signage
  b.addSign('PERIGO', -25, 3.4, 13.6, 5, 1.2, 0, { fg: '#ff7a3d', bg: '#14100b' });
  b.addSign('SAÍDA', 34, 3.5, 15.6, 4.4, 1.2, Math.PI, { fg: '#55ff66', bg: '#0b140d' });
  b.addSign('PROIBIDO', 20, 3.2, -13.4, 5.5, 1.2, 0, { fg: '#ff2938', bg: '#140b0c' });
  const colliders = b.colliders;
  const spawns = [
    { x: -34, z: 34, yaw: Math.PI / 4 }, { x: -26, z: 35, yaw: Math.PI / 4 }, { x: -19, z: 37, yaw: Math.PI / 4 }, { x: -34, z: 27, yaw: Math.PI / 4 }, { x: -27, z: 27, yaw: Math.PI / 4 },
    { x: 33, z: -35, yaw: -3 * Math.PI / 4 }, { x: 25, z: -36, yaw: -3 * Math.PI / 4 }, { x: 18, z: -35, yaw: -3 * Math.PI / 4 }, { x: 34, z: -27, yaw: -3 * Math.PI / 4 }, { x: 26, z: -27, yaw: -3 * Math.PI / 4 },
    { x: 38, z: 34, yaw: -Math.PI / 4 }, { x: -37, z: -34, yaw: 3 * Math.PI / 4 }
  ];
  const navPoints = [
    { x: -34, z: 24 }, { x: -24, z: 26 }, { x: -12, z: 25 }, { x: 0, z: 26 }, { x: 12, z: 26 }, { x: 27, z: 26 }, { x: 36, z: 24 },
    { x: -35, z: 8 }, { x: -23, z: 7 }, { x: -12, z: 7 }, { x: 0, z: 7 }, { x: 12, z: 7 }, { x: 25, z: 7 }, { x: 36, z: 8 },
    { x: -36, z: -10 }, { x: -24, z: -9 }, { x: -12, z: -8 }, { x: 0, z: -8 }, { x: 12, z: -8 }, { x: 25, z: -9 }, { x: 36, z: -10 },
    { x: -34, z: -28 }, { x: -20, z: -27 }, { x: -7, z: -28 }, { x: 7, z: -28 }, { x: 21, z: -27 }, { x: 34, z: -28 }
  ];
  const zones = [{ id: 'A', x: -22, z: 2, r: 5.6 }, { id: 'B', x: 0, z: 8, r: 6 }, { id: 'C', x: 22, z: 3, r: 5.6 }];
  return { builder: b, info, colliders, spawns, navPoints, zones, bounds: { minX: -40, maxX: 40, minZ: -40, maxZ: 40 } };
}

/* ------------------------------------------------------------------
   MAP 3 — SHOPPING DESTRUÍDO
------------------------------------------------------------------- */
function buildShopping() {
  const b = new Builder();
  const info = {
    id: 'shopping', name: 'SHOPPING DESTRUÍDO', sub: 'CENTRO COMERCIAL FALIDO',
    desc: 'Lojas vazias, escadas quebradas e um cinema que só passa filmes de terror. O food court continua aberto.',
    features: ['Átrio central', 'Lojas e corredores', 'Neon e vidro'],
    sky: { top: '#141d2e', bottom: '#6b5a72', sun: '#ffd2a8', fog: '#4c4457', fogDensity: .014, sunDir: [-.2, .5, -.6], hemi: 1.08, light: 1.85, lightPos: [18, 40, 22], ambient: .42, dust: 0xffd8f0 },
    ground: 'tile'
  };
  b.box(0, -.25, 0, 78, .5, 78, 'tile', { tile: 4, mini: false });
  // outer walls
  b.box(0, 5, -38, 78, 10, 1, 'concrete', { collide: true, tile: 5, miniColor: 'concrete' });
  b.box(0, 5, 38, 78, 10, 1, 'concrete', { collide: true, tile: 5, miniColor: 'concrete' });
  b.box(-38, 5, 0, 1, 10, 78, 'concrete', { collide: true, tile: 5, miniColor: 'concrete' });
  b.box(38, 5, 0, 1, 10, 78, 'concrete', { collide: true, tile: 5, miniColor: 'concrete' });
  // storefront blocks with neon
  const shops = [
    { x: -28, z: -28, w: 15, d: 10, h: 6, c: 'cream', sign: 'CINEMA', fg: '#ff3c9a' },
    { x: 28, z: -28, w: 15, d: 10, h: 7, c: 'pink', sign: 'MODA', fg: '#ff7a3d' },
    { x: -29, z: 27, w: 14, d: 11, h: 6, c: 'blue', sign: 'GAMES', fg: '#48f2d2' },
    { x: 28, z: 27, w: 15, d: 10, h: 6, c: 'green', sign: 'AÇAÍ', fg: '#d9ff43' },
    { x: -30, z: 0, w: 12, d: 13, h: 5, c: 'purple', sign: 'LIVROS', fg: '#b69bff' },
    { x: 30, z: 0, w: 12, d: 13, h: 5, c: 'yellow', sign: 'MOTO', fg: '#ffd23c' },
    { x: 0, z: -30, w: 16, d: 10, h: 8, c: 'brick', sign: 'ÂNCORA', fg: '#48b7ff' },
  ];
  for (const s of shops) {
    addBuilding(b, s.x, s.z, s.w, s.d, s.h, s.c, { faces: ['front', 'left', 'right'], ac: true });
    const side = s.z < -20 ? 1 : s.z > 20 ? -1 : 0;
    if (side) b.box(s.x, 1.8, s.z + (s.d / 2 + .06) * side, s.w * .75, 2.8, .1, 'window', { uv: false, mini: false });
    b.addSign(s.sign, s.x, s.h - .8, s.z + (s.z < -20 ? s.d / 2 + .12 : s.z > 20 ? -s.d / 2 - .12 : 0), 6, 1.4, s.z > 20 ? Math.PI : 0, { fg: s.fg, bg: '#0b1013' });
  }
  // central atrium glass roof (partial)
  b.box(0, 9.4, 0, 34, .2, 28, 'glass', { mini: false, uv: false });
  for (let i = -16; i <= 16; i += 8) b.box(i, 9.5, 0, .25, .25, 28, 'dark', { mini: false });
  for (let i = -13; i <= 13; i += 7) b.box(0, 9.5, i, 34, .25, .25, 'dark', { mini: false });
  // broken hole: skip glass? covered; add shard piles
  for (const [x, z] of [[-8, 2], [8, -3], [3, 8]]) {
    b.box(x, .05, z, 2.2, .06, 2.2, 'glass', { rotY: Math.random(), mini: false, uv: false });
  }
  // pillars
  for (const [x, z] of [[-12, -10], [12, -10], [-12, 10], [12, 10]]) {
    b.cylinder(x, 4.5, z, 1.25, 1.45, 9, 'cream', { segments: 8, collide: true, miniColor: 'cream' });
    b.box(x, 1.2, z, 3.1, 2.4, 3.1, 'dark', { collide: true, mini: false });
    b.box(x, 7.6, z, 3, .3, 3, 'concrete', { mini: false });
  }
  // kiosks, benches, planters
  for (const [x, z, c] of [[-5, -5, 'orange'], [6, 7, 'teal'], [-7, 8, 'pink']]) {
    b.box(x, .6, z, 2.8, 1.2, 2.2, c, { collide: true, miniColor: c });
    b.box(x, 1.3, z, 3.1, .15, 2.5, 'white', { mini: false });
    b.addSign('CAOS', x, 1.9, z + 1.15, 2.2, .55, 0, { fg: '#d9ff43', bg: '#0b1013' });
  }
  for (const [x, z, r] of [[-18, -18, 0], [18, -18, Math.PI], [-18, 18, 0], [18, 18, 0], [0, 14, .3]]) {
    b.box(x, .45, z, 4.2, .15, 1.2, 'wood', { rotY: r, collide: true, miniColor: 'wood' });
    b.box(x, .2, z, 4.2, .4, 1, 'dark', { rotY: r, mini: false });
    b.addCollider(x, z, 4.2, 1.2, { tag: 'bench' });
  }
  for (const [x, z] of [[-22, -8], [22, 8], [-8, 22], [8, -22]]) {
    b.cylinder(x, .5, z, 1.3, 1.5, 1, 'concrete', { segments: 8, collide: true, miniColor: 'concrete' });
    b.sphere(x, 1.5, z, .8, 'green', { segments: 7, rings: 5, mini: false });
    b.cylinder(x, 1, z, .12, .12, 1.8, 'wood', { segments: 5, mini: false });
  }
  // escalator / stairs
  b.box(-20, 1.1, 5, 3, .8, 11, 'metal', { rotX: -.18, collide: true, miniColor: 'metal' });
  for (let i = 0; i < 14; i++) b.box(-20, .1 + i * .14, 9.8 - i * .68, 3, .12, .8, 'dark', { mini: false });
  b.box(20, 1.1, -5, 3, .8, 11, 'metal', { rotX: .18, collide: true, miniColor: 'metal' });
  // food court tables
  for (let i = 0; i < 5; i++) {
    const x = -4 + (i % 3) * 5, z = 19 + Math.floor(i / 3) * 5;
    b.cylinder(x, .72, z, 1.1, 1.1, .12, 'white', { segments: 10, collide: true, mini: false });
    b.cylinder(x, .36, z, .15, .2, .72, 'dark', { segments: 6, mini: false });
    for (let j = 0; j < 3; j++) {
      const a = j * 2.1;
      b.box(x + Math.cos(a) * 1.6, .45, z + Math.sin(a) * 1.6, .8, .1, .8, 'pink', { mini: false });
    }
  }
  // rubble
  for (let i = 0; i < 8; i++) {
    const x = (Math.random() - .5) * 50, z = (Math.random() - .5) * 50;
    b.box(x, .1, z, .5 + Math.random(), .2, .4 + Math.random(), 'concrete', { uv: false, mini: false });
  }
  // lifts / vending
  b.box(-10, 1.2, -22, 2.4, 2.4, 1.2, 'red', { collide: true, miniColor: 'red' });
  b.box(-10, 1.4, -21.35, 2.1, 1.7, .05, 'windowCyan', { uv: false, mini: false });
  b.box(11, 1.2, 22, 2.4, 2.4, 1.2, 'blue', { collide: true, miniColor: 'blue' });
  b.box(11, 1.4, 21.35, 2.1, 1.7, .05, 'windowLit', { uv: false, mini: false });
  const colliders = b.colliders;
  const spawns = [
    { x: -25, z: 16, yaw: 0 }, { x: -18, z: 20, yaw: 0 }, { x: -10, z: 24, yaw: 0 }, { x: 10, z: 24, yaw: 0 }, { x: 18, z: 20, yaw: 0 },
    { x: 25, z: -16, yaw: Math.PI }, { x: 18, z: -20, yaw: Math.PI }, { x: 10, z: -24, yaw: Math.PI }, { x: -10, z: -24, yaw: Math.PI }, { x: -18, z: -20, yaw: Math.PI },
    { x: 0, z: 32, yaw: 0 }, { x: 0, z: -19, yaw: Math.PI }
  ];
  const navPoints = [
    { x: 0, z: 0 }, { x: -9, z: -8 }, { x: 9, z: -8 }, { x: -9, z: 8 }, { x: 9, z: 8 }, { x: -21, z: 4 }, { x: 21, z: -4 }, { x: -17, z: 17 }, { x: 17, z: 17 },
    { x: -17, z: -17 }, { x: 17, z: -17 }, { x: 0, z: 22 }, { x: 0, z: -22 }, { x: -28, z: -12 }, { x: 28, z: 12 }, { x: -28, z: 12 }, { x: 28, z: -12 }, { x: 0, z: 30 }, { x: 0, z: -30 }, { x: -21, z: -12 }, { x: 21, z: 12 }
  ];
  const zones = [{ id: 'A', x: -20, z: 7, r: 5.4 }, { id: 'B', x: 0, z: 0, r: 6.4 }, { id: 'C', x: 20, z: -7, r: 5.4 }];
  return { builder: b, info, colliders, spawns, navPoints, zones, bounds: { minX: -36, maxX: 36, minZ: -36, maxZ: 36 } };
}

/* ------------------------------------------------------------------
   MAP 4 — BASE MILITAR
------------------------------------------------------------------- */
function buildBase() {
  const b = new Builder();
  const info = {
    id: 'base', name: 'BASE MILITAR', sub: 'FORTE BAIXADA · ÁREA RESTRITA',
    desc: 'A última linha de defesa contra o bom senso. Contêineres, torres e um radar que aponta para o lugar errado.',
    features: ['Contêineres coloridos', 'Torres de observação', 'Pista e hangar'],
    sky: { top: '#1e3245', bottom: '#c5a26b', sun: '#ffd59a', fog: '#8b8069', fogDensity: .011, sunDir: [.2, .42, .7], hemi: 1.15, light: 2.5, lightPos: [22, 44, 30], ambient: .17, dust: 0xffe3b0 },
    ground: 'dirt'
  };
  b.box(0, -.3, 0, 100, .6, 100, 'dirt', { tile: 8, mini: false });
  b.box(0, .01, 0, 70, .05, 70, 'grass', { tile: 6, mini: false });
  b.box(0, .03, 0, 14, .06, 90, 'concrete', { tile: 4, mini: false });
  for (let z = -40; z < 40; z += 8) b.box(0, .07, z, .35, .03, 3.4, 'white', { mini: false, uv: false });
  // fence perimeter
  addFence(b, -48, -48, 48, -48, 2.6, 'metal');
  addFence(b, 48, -48, 48, 48, 2.6, 'metal');
  addFence(b, -48, 48, 48, 48, 2.6, 'metal');
  addFence(b, -48, -48, -48, 48, 2.6, 'metal');
  // hangar
  b.box(-23, 4, -25, 26, 8, 18, 'dark', { collide: true, tile: 3, miniColor: 'dark' });
  b.box(-23, 4, -16.2, 26.4, 8, .5, 'dark', { mini: false });
  b.box(-23, 8.2, -25, 27, .5, 19, 'metal', { mini: false });
  b.box(-23, 2.8, -15.9, 18, 5.5, .12, 'window', { uv: false, mini: false });
  b.addSign('HANGAR 7', -23, 7.2, -15.5, 8, 1.6, 0, { fg: '#ff7a3d', bg: '#0d1113' });
  // watchtowers
  for (const [x, z] of [[33, -31], [-35, 32]]) {
    for (const [dx, dz] of [[-1.4, -1.4], [1.4, -1.4], [-1.4, 1.4], [1.4, 1.4]]) b.cylinder(x + dx, 3, z + dz, .16, .2, 6, 'wood', { segments: 6, mini: false });
    b.box(x, 6.2, z, 4.2, .3, 4.2, 'wood', { mini: false });
    b.box(x, 6.9, z, 3.6, 1.2, .18, 'wood', { mini: false });
    b.box(x - 1.8, 6.9, z, .18, 1.2, 3.6, 'wood', { mini: false });
    b.box(x + 1.8, 6.9, z, .18, 1.2, 3.6, 'wood', { mini: false });
    b.box(x, 7.7, z, 4.4, .25, 4.4, 'rust', { mini: false });
    b.addCollider(x, z, 4.4, 4.4, { tag: 'tower' });
    b.addLight(0xffd181, 12, 10, x, 7, z);
  }
  // containers
  const containers = [
    [-8, -13, 0, 'red'], [8, -14, 0, 'blue'], [24, -8, Math.PI / 2, 'green'], [28, 10, Math.PI / 2, 'orange'],
    [-30, -6, 0, 'teal'], [-34, 10, 0, 'yellow'], [-10, 23, 0, 'blue'], [12, 26, 0, 'red'], [35, 26, Math.PI / 2, 'green'],
    [22, 16, 0, 'blue'], [-22, 12, Math.PI / 2, 'orange'], [36, -19, 0, 'red']
  ];
  for (const [x, z, r, c] of containers) addContainer(b, x, z, r, c);
  // sandbag walls
  for (const [x, z, r] of [[0, -6, 0], [-15, -6, 0], [15, -7, 0], [-20, 6, .4], [20, 6, -.4], [0, 18, 0], [-6, 18, 0]]) {
    b.box(x, .45, z, 4.4, .9, 1, 'sandbag', { rotY: r, collide: true, tile: 1.3, miniColor: 'sandbag' });
    b.box(x, 1.1, z, 3.6, .5, .8, 'sandbag', { rotY: r, mini: false, tile: 1.3 });
  }
  // crates / barrels
  for (const [x, z, s] of [[-3, -2, 1.2], [2, -3, .9], [14, 3, 1.2], [-13, 3, 1.3], [29, -28, 1.1], [-25, 22, 1.2], [4, 8, 1], [-4, 9, .8]]) addCrate(b, x, z, s, Math.random(), Math.random() > .5 ? 'metal' : 'wood');
  for (const [x, z, c] of [[-17, 16, 'rust'], [-15, 17, 'yellow'], [25, 21, 'red'], [30, 19, 'rust'], [7, -22, 'blue']]) addBarrel(b, x, z, c);
  // jeeps
  addCar(b, -16, -2, .2, 'carGreen');
  addCar(b, 17, -3, Math.PI - .1, 'carGreen');
  addCar(b, 0, 32, Math.PI, 'carYellow');
  // radar dish
  b.cylinder(30, 1.8, 32, 1.5, 1.8, 3.6, 'concrete', { segments: 10, collide: true, miniColor: 'concrete' });
  b.cylinder(30, 3.7, 32, .35, .45, .5, 'metal', { segments: 8, mini: false });
  b.sphere(30, 5.6, 32, 2.2, 'white', { sy: .3, sx: 1, sz: 1, rotX: -.5, segments: 14, rings: 8, mini: false });
  // antennas / lights
  b.cylinder(-42, 5, -42, .16, .22, 10, 'dark', { segments: 6, mini: false });
  b.cylinder(-42, 10, -42, .15, .15, .25, 'glowRed', { segments: 8, mini: false });
  b.addLight(0xff2938, 8, 10, -42, 10, -42);
  // flags
  for (const [x, z] of [[-2, 36], [2, 36]]) {
    b.cylinder(x, 3.5, z, .06, .09, 7, 'metal', { segments: 6, mini: false });
    b.box(x + .8, 6.3, z, 1.6, 1, .05, x < 0 ? 'clothBlue' : 'clothYellow', { mini: false });
  }
  // hills backdrop
  for (const [x, z, r, h] of [[-80, -80, 36, 18], [80, -70, 44, 22], [75, 80, 38, 16], [-70, 85, 42, 20]]) {
    b.sphere(x, -r + h, z, r, 'sand', { sy: .38, segments: 12, rings: 8, mini: false });
  }
  const colliders = b.colliders;
  const spawns = [
    { x: -24, z: 36, yaw: 0 }, { x: -17, z: 39, yaw: 0 }, { x: -10, z: 36, yaw: 0 }, { x: -3, z: 39, yaw: 0 }, { x: 4, z: 36, yaw: 0 },
    { x: 26, z: -36, yaw: Math.PI }, { x: 19, z: -39, yaw: Math.PI }, { x: 12, z: -36, yaw: Math.PI }, { x: 5, z: -39, yaw: Math.PI }, { x: -2, z: -36, yaw: Math.PI },
    { x: -40, z: 20, yaw: Math.PI / 2 }, { x: 40, z: -20, yaw: -Math.PI / 2 }
  ];
  const navPoints = [
    { x: 0, z: 28 }, { x: -10, z: 30 }, { x: 10, z: 30 }, { x: -35, z: 25 }, { x: 35, z: 25 }, { x: -38, z: 0 }, { x: 38, z: 0 }, { x: -34, z: -22 }, { x: 34, z: -22 },
    { x: 0, z: 10 }, { x: -15, z: 10 }, { x: 15, z: 10 }, { x: -15, z: -6 }, { x: 15, z: -6 }, { x: 0, z: -18 }, { x: -25, z: -18 }, { x: 25, z: -18 }, { x: -10, z: 18 }, { x: 10, z: 18 }, { x: -23, z: 3 }, { x: 23, z: 3 }, { x: 0, z: 0 }
  ];
  const zones = [{ id: 'A', x: -24, z: 2, r: 5.6 }, { id: 'B', x: 0, z: 0, r: 6.4 }, { id: 'C', x: 24, z: 2, r: 5.6 }];
  return { builder: b, info, colliders, spawns, navPoints, zones, bounds: { minX: -46, maxX: 46, minZ: -46, maxZ: 46 } };
}

/* ------------------------------------------------------------------
   MAP 5 — BAIRRO BRASILEIRO
------------------------------------------------------------------- */
function buildBairro() {
  const b = new Builder();
  const info = {
    id: 'bairro', name: 'BAIRRO BRASILEIRO', sub: 'VILA DO CAOS · ZONA NORTE',
    desc: 'Casas coloridas, muros baixos e uma quadra onde todo mundo jura que só estava passando. O churrasco virou campo de batalha.',
    features: ['Casas coloridas', 'Quadra de futebol', 'Vielas e muros'],
    sky: { top: '#27445c', bottom: '#f0a05d', sun: '#ffd18a', fog: '#c18b67', fogDensity: .012, sunDir: [-.55, .33, .5], hemi: 1.42, light: 2.75, lightPos: [-28, 40, 26], ambient: .34, dust: 0xffd9a0 },
    ground: 'asphalt'
  };
  b.box(0, -.3, 0, 92, .6, 92, 'asphalt', { tile: 7, mini: false });
  // street + sidewalks
  b.box(0, .02, 0, 16, .06, 92, 'concrete', { tile: 4, mini: false });
  b.box(0, .04, 0, 92, .07, 14, 'concrete', { tile: 4, mini: false });
  for (let i = -42; i < 42; i += 8) b.box(0, .09, i, .18, .03, 2.4, 'white', { mini: false, uv: false });
  // colorful houses quadrants
  const houses = [
    [-30, -30, 14, 12, 5, 'clothPink', 'teal'], [-30, -13, 11, 10, 6.5, 'clothYellow', 'blue'],
    [-28, 20, 13, 12, 5.5, 'clothBlue', 'yellow'], [-29, 34, 10, 8, 4.5, 'clothGreen', 'pink'],
    [30, -32, 13, 11, 6, 'clothPurple', 'orange'], [31, -16, 10, 10, 5, 'clothGreen', 'red'],
    [29, 20, 13, 12, 5.6, 'clothPink', 'cyan'], [30, 35, 11, 8, 4.8, 'clothYellow', 'blue'],
    [-8, -34, 9, 8, 4.5, 'clothBlue', 'pink'], [10, -34, 10, 8, 5.2, 'clothPink', 'yellow'],
    [-10, 35, 9, 8, 5, 'clothGreen', 'purple'], [9, 35, 10, 8, 4.6, 'clothPurple', 'red'],
  ];
  for (const [x, z, w, d, h, c, roof] of houses) {
    b.box(x, h / 2, z, w, h, d, c, { collide: true, tile: 2.6, miniColor: c });
    b.box(x, h + .2, z, w + .6, .4, d + .6, roof, { mini: false, tile: 2.5 });
    // tiled roof ridge
    b.box(x, h + 1.1, z, w * .75, .35, d * .55, 'rust', { mini: false, uv: false });
    // door + windows
    const side = z < 0 ? 1 : -1;
    b.box(x, 1.1, z + side * (d / 2 + .05), 1.15, 2.2, .1, 'wood', { uv: false, mini: false });
    for (let i = -1; i <= 1; i += 2) b.box(x + i * w * .26, 2.2, z + side * (d / 2 + .06), 1.2, 1.1, .08, 'windowLit', { uv: false, mini: false });
    // wall/fence front
    const wallZ = z + side * (d / 2 + 2.6);
    b.box(x, .8, wallZ, w + 1.5, 1.6, .35, c, { collide: true, tile: 2, miniColor: c });
    b.box(x, 1.62, wallZ, w + 1.5, .08, .45, 'concrete', { mini: false });
  }
  // football court
  b.box(0, .06, 18, 26, .08, 18, 'grass', { tile: 4, mini: false });
  for (let i = -11; i <= 11; i += 22) b.box(i, .11, 18, .16, .03, 16, 'white', { mini: false, uv: false });
  b.box(0, .11, 9.2, 22, .03, .16, 'white', { mini: false, uv: false });
  b.box(0, .11, 26.8, 22, .03, .16, 'white', { mini: false, uv: false });
  b.cylinder(0, .12, 18, 2.2, 2.2, .03, 'white', { segments: 22, mini: false });
  // goals
  for (const z of [9.4, 26.6]) {
    for (const x of [-3.5, 3.5]) b.cylinder(x, 1.1, z, .08, .08, 2.2, 'white', { segments: 6, mini: false });
    b.box(0, 2.2, z, 7, .12, .12, 'white', { mini: false });
    b.box(0, 1.1, z + (z < 15 ? .35 : -.35), 7, .06, .04, 'white', { mini: false, uv: false });
  }
  // palm trees
  addPalm(b, -16, 12, 6.2); addPalm(b, 16, 12, 5.4); addPalm(b, -16, 24, 5.8); addPalm(b, 16, 24, 6.4);
  addPalm(b, -40, 5, 5.2); addPalm(b, 40, -5, 5.6); addPalm(b, -40, 36, 5); addPalm(b, 40, 38, 5.4);
  addTree(b, -14, -6, .8); addTree(b, 14, -6, .9); addTree(b, -6, 30, .7); addTree(b, 7, 30, .8);
  // walls / alleys
  for (const [x, z, w, d, h, c] of [[-18, -22, 10, .5, 1.8, 'clothBlue'], [18, -22, 10, .5, 1.8, 'clothPink'], [-18, 20, .5, 9, 2, 'clothYellow'], [18, 0, .5, 8, 2.2, 'clothPurple'], [-6, -12, 8, .5, 1.8, 'clothGreen'], [6, 6, .5, 7, 1.8, 'clothPink']]) {
    b.box(x, h / 2, z, w, h, d, c, { collide: true, tile: 1.8, miniColor: c });
    b.box(x, h + .05, z, w + .1, .12, d + .1, 'concrete', { mini: false });
  }
  // graffiti walls
  b.addSign('VILA DO CAOS', -18, 1.4, -21.65, 7, 1.4, 0, { bg: '#1b1b1b', fg: '#ff3c9a' });
  b.addSign('CHURRASCO', 18, 1.4, -21.65, 6, 1.3, 0, { bg: '#1b1b1b', fg: '#d9ff43' });
  b.addSign('FUTEBOL', 0, 2.2, 9.8, 6, 1.2, 0, { bg: '#0d1611', fg: '#48f2d2' });
  // food cart + moto
  b.box(-7, .8, 12, 3, 1.4, 1.6, 'clothYellow', { collide: true, miniColor: 'clothYellow' });
  b.box(-7, 1.7, 12, 3.4, .15, 2, 'white', { mini: false });
  b.cylinder(-8.2, .35, 12, .3, .3, .2, 'rubber', { rotZ: Math.PI / 2, segments: 8, mini: false });
  b.cylinder(-5.8, .35, 12, .3, .3, .2, 'rubber', { rotZ: Math.PI / 2, segments: 8, mini: false });
  b.addSign('AÇAÍ', -7, 2.3, 13.1, 2.2, .6, 0, { fg: '#d9ff43', bg: '#0d1113' });
  // moto
  b.box(6, .55, -12, .35, .35, 1.8, 'carRed', { collide: true, miniColor: 'carRed' });
  for (const z of [-11.3, -12.7]) b.cylinder(6, .38, z, .38, .38, .18, 'rubber', { rotZ: Math.PI / 2, segments: 8, mini: false });
  b.box(6, .95, -12.35, .55, .2, .6, 'dark', { mini: false });
  // laundry lines
  for (const [x, z] of [[-11, 15], [11, 15]]) {
    b.cylinder(x, 1.8, z, .05, .07, 3.6, 'wood', { segments: 5, mini: false });
    b.box(x, 3.4, z, .04, .04, 5, 'dark', { mini: false });
  }
  for (let i = 0; i < 5; i++) b.box(-10.5 + i * .8, 3.05, 15, .55, .7, .03, i % 2 ? 'clothPink' : 'clothYellow', { mini: false });
  // simple stacked crates and barrels around
  for (const [x, z] of [[-21, -8], [21, 8], [-12, -27], [24, 28], [-30, 8], [36, 5]]) addCrate(b, x, z, 1.1, Math.random(), 'wood');
  for (const [x, z, c] of [[-22, 10, 'rust'], [22, -10, 'blue'], [-36, -32, 'green'], [38, 30, 'red']]) addBarrel(b, x, z, c);
  addLamp(b, -8, -8, 5.4, 0xffc470); addLamp(b, 8, 30, 5.4, 0xffd27a);
  // distant houses silhouette
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    const r = 60 + Math.random() * 12;
    b.box(Math.cos(a) * r, 2 + Math.random() * 3, Math.sin(a) * r, 7 + Math.random() * 7, 4 + Math.random() * 7, 7, Math.random() > .5 ? 'clothPink' : 'clothBlue', { mini: false, tile: 3 });
  }
  const colliders = b.colliders;
  const spawns = [
    { x: -18, z: 41, yaw: 0 }, { x: 0, z: 39, yaw: 0 }, { x: 18, z: 41, yaw: 0 }, { x: -22, z: 36, yaw: 0 }, { x: 22, z: 36, yaw: 0 },
    { x: -18, z: -41, yaw: Math.PI }, { x: 0, z: -39, yaw: Math.PI }, { x: 18, z: -41, yaw: Math.PI }, { x: -22, z: -36, yaw: Math.PI }, { x: 22, z: -36, yaw: Math.PI },
    { x: -42, z: 0, yaw: Math.PI / 2 }, { x: 42, z: 0, yaw: -Math.PI / 2 }
  ];
  const navPoints = [
    { x: 0, z: 18 }, { x: -8, z: 16 }, { x: 8, z: 16 }, { x: -8, z: 26 }, { x: 8, z: 26 }, { x: -18, z: 18 }, { x: 18, z: 18 },
    { x: 0, z: 4 }, { x: -8, z: 2 }, { x: 8, z: 2 }, { x: -20, z: 5 }, { x: 20, z: 5 }, { x: 0, z: -8 }, { x: -10, z: -8 }, { x: 10, z: -8 },
    { x: -22, z: -8 }, { x: 22, z: -8 }, { x: -34, z: 4 }, { x: 34, z: 4 }, { x: -34, z: -25 }, { x: 34, z: -25 }, { x: 0, z: -30 }, { x: -20, z: 35 }, { x: 20, z: 35 }
  ];
  const zones = [{ id: 'A', x: -18, z: 0, r: 5.4 }, { id: 'B', x: 0, z: 18, r: 6.2 }, { id: 'C', x: 18, z: 0, r: 5.4 }];
  return { builder: b, info, colliders, spawns, navPoints, zones, bounds: { minX: -46, maxX: 46, minZ: -46, maxZ: 46 } };
}

const BUILDERS = { cidade: buildCidade, fabrica: buildFabrica, shopping: buildShopping, base: buildBase, bairro: buildBairro };

export const MAP_IDS = Object.keys(BUILDERS);

export function createMap(id, scene, quality = 'medium') {
  const data = (BUILDERS[id] || buildCidade)();
  data.builder.finish(scene, data.info);
  addEnvironment(scene, data.info, quality);
  data.scene = scene;
  data.info = { ...data.info, ...data.builder.info };
  return data;
}

/* ------------------------------------------------------------------
   Collision helpers
------------------------------------------------------------------- */
export function raycastColliders(origin, dir, maxDist, colliders) {
  let best = maxDist, bestPoint = null, bestNormal = null;
  const invX = Math.abs(dir.x) < 1e-6 ? 1e9 : 1 / dir.x;
  const invY = Math.abs(dir.y) < 1e-6 ? 1e9 : 1 / dir.y;
  const invZ = Math.abs(dir.z) < 1e-6 ? 1e9 : 1 / dir.z;
  for (const c of colliders) {
    let tmin = 0, tmax = best;
    let nx = 0, nz = 0;
    // x slab
    let t1 = (c.minX - origin.x) * invX, t2 = (c.maxX - origin.x) * invX;
    if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
    if (t1 > tmin) { tmin = t1; nx = invX > 0 ? -1 : 1; nz = 0; }
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) continue;
    // y slab
    t1 = (0 - origin.y) * invY; t2 = ((c.h || 4) - origin.y) * invY;
    if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
    if (t1 > tmin) { tmin = t1; nx = 0; nz = 0; }
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) continue;
    // z slab
    t1 = (c.minZ - origin.z) * invZ; t2 = (c.maxZ - origin.z) * invZ;
    if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
    if (t1 > tmin) { tmin = t1; nx = 0; nz = invZ > 0 ? -1 : 1; }
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) continue;
    if (tmin > 0.02 && tmin < best) {
      best = tmin;
      bestPoint = new THREE.Vector3(origin.x + dir.x * tmin, origin.y + dir.y * tmin, origin.z + dir.z * tmin);
      bestNormal = new THREE.Vector3(nx, 0, nz);
    }
  }
  return bestPoint ? { distance: best, point: bestPoint, normal: bestNormal } : null;
}

export function circleCollides(x, z, r, colliders) {
  for (const c of colliders) {
    const cx = Math.max(c.minX, Math.min(x, c.maxX));
    const cz = Math.max(c.minZ, Math.min(z, c.maxZ));
    const dx = x - cx, dz = z - cz;
    if (dx * dx + dz * dz < r * r) return c;
  }
  return null;
}

export function moveWithCollision(pos, dx, dz, radius, colliders, bounds) {
  let nx = pos.x + dx, nz = pos.z + dz;
  if (nx - radius < bounds.minX) nx = bounds.minX + radius;
  if (nx + radius > bounds.maxX) nx = bounds.maxX - radius;
  if (nz - radius < bounds.minZ) nz = bounds.minZ + radius;
  if (nz + radius > bounds.maxZ) nz = bounds.maxZ - radius;
  if (!circleCollides(nx, pos.z, radius, colliders)) pos.x = nx;
  if (!circleCollides(pos.x, nz, radius, colliders)) pos.z = nz;
}
