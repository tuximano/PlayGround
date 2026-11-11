import * as THREE from 'three';
import { CONFIG as C } from './config.js';
import { mergeByMaterial, collectOpaqueMeshes } from './merge.js';

// ─────────────────────────────────────────────────────────────────────────────
// The arena is assembled procedurally: no external models or textures.
// That keeps the build tiny and lets every surface share a consistent,
// sun-bleached industrial look.
// ─────────────────────────────────────────────────────────────────────────────

const rng = (seed) => () => {
  seed |= 0; seed = seed + 0x6D2B79F5 | 0;
  let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
  t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
};

function texture(size, draw, renderer, repeatX = 1, repeatY = 1) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  return tex;
}

function concreteTexture(renderer, seed = 3, base = '#8f887b') {
  return texture(512, (ctx, s) => {
    const rand = rng(seed);
    ctx.fillStyle = base; ctx.fillRect(0, 0, s, s);
    // Aggregate / dust speckle.
    for (let i = 0; i < 18000; i++) {
      const v = (rand() * 42 - 21) | 0;
      ctx.fillStyle = `rgba(${v > 0 ? 255 : 0},${v > 0 ? 250 : 0},${v > 0 ? 236 : 0},${rand() * .11})`;
      const r = rand() * 2.1;
      ctx.fillRect(rand() * s, rand() * s, r, r);
    }
    // Damp patches.
    for (let i = 0; i < 8; i++) {
      const x = rand() * s, y = rand() * s, r = 25 + rand() * 90;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
      grd.addColorStop(0, `rgba(54,48,40,${.03 + rand() * .08})`);
      grd.addColorStop(1, 'rgba(54,48,40,0)');
      ctx.fillStyle = grd; ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    // Hairline cracks.
    ctx.lineCap = 'round';
    for (let i = 0; i < 9; i++) {
      ctx.beginPath();
      let x = rand() * s, y = rand() * s;
      ctx.moveTo(x, y);
      for (let j = 0; j < 7; j++) {
        x += rand() * 34 - 17; y += rand() * 34 - 17;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(43,39,34,${.08 + rand() * .18})`;
      ctx.lineWidth = .6 + rand();
      ctx.stroke();
    }
    // Chipped paint / stains.
    for (let i = 0; i < 95; i++) {
      ctx.fillStyle = `rgba(${rand() > .55 ? '239,232,218' : '47,42,36'},${rand() * .08})`;
      ctx.beginPath(); ctx.ellipse(rand() * s, rand() * s, 1 + rand() * 9, 1 + rand() * 5, rand() * 3, 0, 6.3); ctx.fill();
    }
  }, renderer, 3, 3);
}

function asphaltTexture(renderer) {
  return texture(512, (ctx, s) => {
    const rand = rng(11);
    ctx.fillStyle = '#777065'; ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 26000; i++) {
      const light = rand() > .48;
      ctx.fillStyle = light ? `rgba(221,210,190,${rand() * .13})` : `rgba(26,23,20,${rand() * .16})`;
      ctx.fillRect(rand() * s, rand() * s, 1 + rand() * 2.4, 1 + rand() * 2.4);
    }
    // Faint tyre burn and oil.
    for (let i = 0; i < 6; i++) {
      const x = rand() * s, y = rand() * s;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, 30 + rand() * 90);
      grd.addColorStop(0, 'rgba(25,22,19,.2)');
      grd.addColorStop(1, 'rgba(25,22,19,0)');
      ctx.fillStyle = grd; ctx.fillRect(0, 0, s, s);
    }
    ctx.strokeStyle = 'rgba(40,36,31,.3)'; ctx.lineWidth = 1.1;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath(); let x = rand() * s, y = rand() * s; ctx.moveTo(x, y);
      for (let j = 0; j < 5; j++) { x += rand() * 40 - 20; y += rand() * 40 - 20; ctx.lineTo(x, y); }
      ctx.stroke();
    }
  }, renderer, 10, 10);
}

function containerTexture(renderer, base, seed) {
  return texture(512, (ctx, s) => {
    const rand = rng(seed);
    ctx.fillStyle = base; ctx.fillRect(0, 0, s, s);
    // Corrugation.
    for (let x = 0; x < s; x += 26) {
      const grd = ctx.createLinearGradient(x, 0, x + 26, 0);
      grd.addColorStop(0, 'rgba(255,255,255,.09)');
      grd.addColorStop(.42, 'rgba(255,255,255,.015)');
      grd.addColorStop(.58, 'rgba(0,0,0,.12)');
      grd.addColorStop(1, 'rgba(0,0,0,.03)');
      ctx.fillStyle = grd; ctx.fillRect(x, 0, 26, s);
    }
    // Rust blooms.
    for (let i = 0; i < 36; i++) {
      const x = rand() * s, y = rand() * s, r = 4 + rand() * 30;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
      grd.addColorStop(0, `rgba(63,39,25,${.14 + rand() * .3})`);
      grd.addColorStop(.55, `rgba(108,60,31,${.1 + rand() * .14})`);
      grd.addColorStop(1, 'rgba(108,60,31,0)');
      ctx.fillStyle = grd; ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    // Scuffs and drips.
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(238,231,216,${rand() * .045})`;
      ctx.fillRect(rand() * s, rand() * s, 1 + rand() * 12, .5 + rand() * 1.2);
    }
    // Horizontal rails.
    ctx.fillStyle = 'rgba(0,0,0,.17)'; ctx.fillRect(0, 4, s, 8); ctx.fillRect(0, s - 12, s, 8);
  }, renderer, 2, 1);
}

function woodTexture(renderer) {
  return texture(256, (ctx, s) => {
    const rand = rng(21);
    ctx.fillStyle = '#9b7547'; ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 80; i++) {
      ctx.strokeStyle = `rgba(${rand() > .5 ? '53,37,22' : '232,190,133'},${.03 + rand() * .11})`;
      ctx.lineWidth = .5 + rand() * 2;
      ctx.beginPath();
      const y = rand() * s;
      ctx.moveTo(0, y);
      for (let x = 0; x < s; x += 14) ctx.lineTo(x, y + Math.sin(x * .07 + i) * 2);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(48,35,23,.35)'; ctx.lineWidth = 5;
    for (let x = 0; x < s; x += 64) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, s); ctx.stroke(); }
    for (let i = 0; i < 8; i++) {
      const x = rand() * s, y = rand() * s;
      ctx.fillStyle = 'rgba(45,32,20,.5)'; ctx.beginPath(); ctx.arc(x, y, 2, 0, 6.3); ctx.fill();
    }
  }, renderer, 2, 2);
}

function hazardTexture(renderer) {
  return texture(256, (ctx, s) => {
    ctx.fillStyle = '#d6a72e'; ctx.fillRect(0, 0, s, s);
    ctx.fillStyle = '#171412';
    for (let i = -s; i < s * 2; i += 56) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + 30, 0); ctx.lineTo(i + 30 - s, s); ctx.lineTo(i - s, s); ctx.fill();
    }
    const rand = rng(9);
    for (let i = 0; i < 2200; i++) {
      ctx.fillStyle = `rgba(240,230,210,${rand() * .09})`;
      ctx.fillRect(rand() * s, rand() * s, 1, 1);
    }
  }, renderer, 3, 1);
}

function labelTexture(renderer, title, sub, fg = '#efe7d9', bg = null, accent = '#ff5b1a') {
  return texture(1024, (ctx, s) => {
    if (bg) { ctx.fillStyle = bg; ctx.fillRect(0, 0, s, s); }
    else ctx.clearRect(0, 0, s, s);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (sub) {
      ctx.font = '600 44px "IBM Plex Mono", monospace';
      ctx.fillStyle = accent; ctx.fillText(sub, s / 2, s * .29);
    }
    ctx.font = '900 176px "Barlow Condensed", sans-serif';
    ctx.fillStyle = fg; ctx.fillText(title, s / 2, s * .55);
    // Distress.
    const rand = rng(title.length * 19 + 4);
    ctx.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 160; i++) {
      ctx.fillStyle = `rgba(0,0,0,${rand() * .45})`;
      ctx.fillRect(rand() * s, rand() * s, 1 + rand() * 10, 1 + rand() * 4);
    }
  }, renderer, 1, 1);
}

function floorDecalTexture(renderer, text, color = '#d9c9b0') {
  return texture(512, (ctx, s) => {
    ctx.clearRect(0, 0, s, s);
    ctx.save();
    ctx.translate(s / 2, s / 2); ctx.rotate(-Math.PI / 2);
    ctx.font = '900 300px "Barlow Condensed", sans-serif';
    ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, 0, 0); ctx.restore();
    const rand = rng(text.length + 14);
    ctx.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 600; i++) {
      ctx.fillStyle = `rgba(0,0,0,${rand() * .5})`;
      ctx.fillRect(rand() * s, rand() * s, 1 + rand() * 8, 1 + rand() * 4);
    }
  }, renderer, 1, 1);
}

// ─────────────────────────────────────────────────────────────────────────────
export function buildWorld(scene, renderer) {
  const colliders = [];
  const hitMeshes = [];
  const tickers = [];
  const bubbles = [];
  const root = new THREE.Group();
  scene.add(root);

  const rand = rng(782);
  const maxAniso = renderer.capabilities.getMaxAnisotropy();

  // ── Materials ─────────────────────────────────────────────────────────────
  const concrete = new THREE.MeshStandardMaterial({ map: concreteTexture(renderer, 3, '#8c8578'), roughness: .94, metalness: .02 });
  const concreteDark = new THREE.MeshStandardMaterial({ map: concreteTexture(renderer, 8, '#625d54'), roughness: .97, metalness: .02 });
  const floorMat = new THREE.MeshStandardMaterial({ map: asphaltTexture(renderer), roughness: .97, metalness: .02, color: 0xd2c6b0 });
  const containerOrange = new THREE.MeshStandardMaterial({ map: containerTexture(renderer, '#b65127', 2), roughness: .7, metalness: .42, color: 0xffd6bb });
  const containerBlue = new THREE.MeshStandardMaterial({ map: containerTexture(renderer, '#405e69', 9), roughness: .72, metalness: .4, color: 0xc7dde0 });
  const containerGreen = new THREE.MeshStandardMaterial({ map: containerTexture(renderer, '#5a6949', 5), roughness: .8, metalness: .3, color: 0xc9d0b9 });
  const wood = new THREE.MeshStandardMaterial({ map: woodTexture(renderer), roughness: .88, metalness: 0 });
  const woodDark = new THREE.MeshStandardMaterial({ color: 0x4e341f, roughness: .9, metalness: .02 });
  const hazard = new THREE.MeshStandardMaterial({ map: hazardTexture(renderer), roughness: .8, metalness: .1 });
  const burlap = new THREE.MeshStandardMaterial({ color: 0x8d7951, roughness: 1, metalness: 0 });
  const crateStencil = new THREE.MeshBasicMaterial({
    map: floorDecalTexture(renderer, '07', 'rgba(237,227,208,.7)'),
    transparent: true, opacity: .72, depthWrite: false, side: THREE.DoubleSide,
    polygonOffset: true, polygonOffsetFactor: -2,
  });
  const metal = new THREE.MeshStandardMaterial({ color: 0x3e4140, roughness: .5, metalness: .8 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x1e201f, roughness: .58, metalness: .7 });
  const orangePaint = new THREE.MeshStandardMaterial({ color: 0xe65b1f, roughness: .65, metalness: .2 });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x181a19, roughness: .84 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x3c5960, roughness: .18, metalness: .65, emissive: 0x0b151a, emissiveIntensity: 1 });

  // ── Helpers ───────────────────────────────────────────────────────────────
  const addCollider = (x, y, z, w, h, d, type = 'hard') => {
    const box = new THREE.Box3(
      new THREE.Vector3(x - w / 2, y, z - d / 2),
      new THREE.Vector3(x + w / 2, y + h, z + d / 2)
    );
    colliders.push({ box, type });
    return box;
  };

  const box = (x, y, z, w, h, d, mat, { collide = true, rotY = 0, shadow = true, hit = true, type = 'hard' } = {}) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y + h / 2, z);
    mesh.rotation.y = rotY;
    mesh.castShadow = shadow;
    mesh.receiveShadow = true;
    root.add(mesh);
    if (hit) hitMeshes.push(mesh);
    if (collide) {
      if (rotY) {
        const c = Math.abs(Math.cos(rotY)), s = Math.abs(Math.sin(rotY));
        addCollider(x, y, z, w * c + d * s, h, w * s + d * c, type);
      } else addCollider(x, y, z, w, h, d, type);
    }
    return mesh;
  };

  const cyl = (x, y, z, rt, rb, h, mat, segments = 12, collide = false) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, segments), mat);
    mesh.position.set(x, y + h / 2, z);
    mesh.castShadow = true; mesh.receiveShadow = true;
    root.add(mesh); hitMeshes.push(mesh);
    if (collide) addCollider(x, y, z, rt * 2, h, rt * 2);
    return mesh;
  };

  const plane = (x, y, z, w, h, mat, rotX = -Math.PI / 2, rotY = 0, receive = true) => {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    mesh.position.set(x, y, z);
    mesh.rotation.set(rotX, rotY, 0);
    mesh.receiveShadow = receive;
    root.add(mesh);
    return mesh;
  };

  const label = (text, sub, x, y, z, w, h, rotY = 0, bg = null) => {
    const tex = labelTexture(renderer, text, sub, '#efe7d9', bg, '#ff5b1a');
    // Unlit so paint and stencils stay legible in deep shade and backlight.
    const mat = new THREE.MeshBasicMaterial({
      map: tex, transparent: true, depthWrite: false, toneMapped: false,
      polygonOffset: true, polygonOffsetFactor: -2, side: THREE.DoubleSide,
    });
    const mesh = plane(x, y, z, w, h, mat, 0, rotY, false);
    mesh.castShadow = false;
    return mesh;
  };

  // ── Sky ───────────────────────────────────────────────────────────────────
  const sunDir = new THREE.Vector3(-0.54, 0.26, -0.80).normalize();
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(210, 40, 20),
    new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false, fog: false,
      uniforms: {
        top: { value: new THREE.Color('#324f6b') },
        mid: { value: new THREE.Color('#abb6b4') },
        horizon: { value: new THREE.Color('#f2c894') },
        ground: { value: new THREE.Color('#a57850') },
        sunDir: { value: sunDir },
      },
      vertexShader: `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vDir;
        uniform vec3 top, mid, horizon, ground, sunDir;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
        float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
          return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
        void main() {
          vec3 d = normalize(vDir);
          float h = max(d.y, 0.0);
          vec3 col = mix(horizon, mid, smoothstep(0.0, 0.22, h));
          col = mix(col, top, smoothstep(0.16, 0.72, h));
          col = mix(col, ground, smoothstep(0.0, -0.2, d.y));
          float sun = max(dot(d, sunDir), 0.0);
          col += vec3(1.0, .68, .35) * pow(sun, 42.0) * .28;
          col += vec3(1.0, .80, .54) * pow(sun, 620.0) * 1.15;
          col += vec3(1.0, .55, .22) * pow(max(0.0, 1.0 - abs(d.y)), 8.0) * .05;
          // Thin drifting cloud bands.
          vec2 p = d.xz / max(d.y + 0.18, 0.08) * 1.4;
          float n = noise(p * 1.5 + 3.2) * .56 + noise(p * 3.7) * .28 + noise(p * 7.9) * .16;
          float cloud = smoothstep(.55, .84, n) * smoothstep(-.01, .1, d.y) * .24;
          col = mix(col, vec3(.79,.74,.69), cloud);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    })
  );
  sky.renderOrder = -10;
  scene.add(sky);

  // Sun light + warm bounce.
  const sun = new THREE.DirectionalLight(0xffd2a1, 3.25);
  sun.position.copy(sunDir).multiplyScalar(55);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -40; sun.shadow.camera.right = 40;
  sun.shadow.camera.top = 40; sun.shadow.camera.bottom = -40;
  sun.shadow.camera.near = 1; sun.shadow.camera.far = 120;
  sun.shadow.bias = -0.00045;
  sun.shadow.normalBias = 0.038;
  scene.add(sun); scene.add(sun.target);

  // The arena faces into the sun, so a strong sky/bounce pass keeps shadowed
  // cover readable and preserves the warm concrete palette.
  const hemi = new THREE.HemisphereLight(0xc6d9e2, 0x8b6a4a, 2.25);
  scene.add(hemi);
  const fill = new THREE.DirectionalLight(0x9fb9cc, 1.05);
  fill.position.set(28, 18, 30);
  scene.add(fill);
  const bounce = new THREE.DirectionalLight(0xffb680, .5);
  bounce.position.set(-14, 6, 34);
  scene.add(bounce);

  // ── Ground ────────────────────────────────────────────────────────────────
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(88, 88), floorMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  root.add(ground);
  hitMeshes.push(ground);

  // Dirt / dust patches break up the tiling.
  const dirtMat = new THREE.MeshBasicMaterial({
    color: 0x7c5a39, transparent: true, opacity: .11, depthWrite: false,
    polygonOffset: true, polygonOffsetFactor: -1,
  });
  for (let i = 0; i < 24; i++) {
    const m = new THREE.Mesh(new THREE.CircleGeometry(1.2 + rand() * 4.8, 12), dirtMat);
    m.rotation.x = -Math.PI / 2;
    m.position.set((rand() - .5) * 50, .004, (rand() - .5) * 50);
    m.renderOrder = 1;
    root.add(m);
  }

  // Painted lane and hazard markings.
  const paint = new THREE.MeshStandardMaterial({ color: 0xd6c7aa, roughness: .88, transparent: true, opacity: .68 });
  const paintOrange = new THREE.MeshStandardMaterial({ color: 0xd65a1d, roughness: .9, transparent: true, opacity: .8 });
  for (const x of [-6.8, -1.4, 4.0]) {
    plane(x, .012, -6, .18, 50, paint);
  }
  plane(1.4, .014, 14.2, 9, .42, paintOrange);
  plane(1.4, .014, -13.4, 14, .16, paintOrange);
  const arrowTex = floorDecalTexture(renderer, '07', '#e8dcca');
  const arrowMat = new THREE.MeshBasicMaterial({ map: arrowTex, transparent: true, opacity: .5, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
  plane(-4.6, .018, 10.5, 3.3, 3.3, arrowMat, -Math.PI / 2, 0, false);
  plane(8.1, .018, -11.5, 2.4, 2.4, arrowMat, -Math.PI / 2, 0, false);

  // ── Perimeter ─────────────────────────────────────────────────────────────
  const per = C.arena.halfSize;
  const wallH = 3.1;
  box(0, 0, -per - .4, per * 2 + 3.4, wallH, 1.1, concreteDark);
  box(0, 0, per + .4, per * 2 + 3.4, wallH, 1.1, concrete);
  box(-per - .4, 0, 0, 1.1, wallH, per * 2 + 3.4, concrete);
  box(per + .4, 0, 0, 1.1, wallH, per * 2 + 3.4, concreteDark);

  // Wall caps + buttresses.
  for (let i = -3; i <= 3; i++) {
    box(i * 8.5, wallH, -per - .4, .42, .42, 1.35, concreteDark, { hit: false });
    box(i * 8.5 + 2.2, wallH, per + .4, .42, .42, 1.35, concrete, { hit: false });
  }

  // Rotting billboards / paint on the back wall.
  label('COMBAT//SHIFT', 'SECTOR 07 · KILLHOUSE', 0, 4.15, -per + .16, 16, 3.0, 0);
  label('MOVE OR DIE', 'NO CAMPING', -16, 3.6, -per + .15, 7.4, 2.0, 0);
  label('07', 'DOCA DE CARGA', 16.5, 3.75, -per + .16, 5.2, 2.2, 0);

  // Graffiti panels on the side walls.
  label('FAST', 'IS SMOOTH', -per + .18, 2.25, 10, 5.2, 2.1, Math.PI / 2);
  label('AIR', 'CONTROL', per - .16, 2.2, -4, 4.5, 1.8, -Math.PI / 2);

  // Wall orange stripe.
  plane(0, .9, -per + .16, per * 2, .09, paintOrange, 0, 0, false);

  // ── Elevated container (the infinite-slide underpass) ─────────────────────
  const cX = 10.2, cZ = 1.6, cW = 8.3, cD = 3.1, cBottom = 1.48, cH = 2.62;
  // Feet / rails.
  for (const sx of [-cW / 2 + .55, cW / 2 - .55]) {
    for (const sz of [-cD / 2 + .4, cD / 2 - .4]) {
      box(cX + sx, 0, cZ + sz, .4, cBottom, .4, metal, { shadow: true });
    }
  }
  box(cX, cBottom, cZ, cW, cH, cD, containerOrange);
  // Door details on the end.
  const door = box(cX - cW / 2 - .025, cBottom + .12, cZ, .06, cH - .24, cD - .2, containerOrange, { hit: false });
  door.material = containerOrange;
  for (const zz of [-.72, -.2, .32, .84]) {
    box(cX - cW / 2 - .07, cBottom + .16, cZ + zz, .05, cH - .32, .07, darkMetal, { hit: false, shadow: false });
  }
  box(cX - cW / 2 - .06, cBottom + 1.28, cZ + .55, .045, .1, .26, metal, { hit: false });
  // Hazard stripe around the underpass.
  const stripeMat = hazard;
  for (const sz of [-1, 1]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(cW - .55, .28), stripeMat);
    m.position.set(cX, cBottom - .12, cZ + sz * (cD / 2 + .012));
    m.rotation.y = sz > 0 ? 0 : Math.PI;
    root.add(m);
  }
  label('SLIDE', 'CLEARANCE 1.4M', cX - cW / 2 - .08, cBottom + 1.1, cZ, 2.6, 1.6, -Math.PI / 2, '#1b1612');
  // Climb crates next to the container.
  box(cX + cW / 2 + .85, 0, cZ + .7, 1.5, .8, 1.5, wood);
  box(cX + cW / 2 + .85, .8, cZ + .7, 1.5, .8, 1.5, wood);
  box(cX + cW / 2 + .85, 1.6, cZ + .7, 1.5, .8, 1.5, wood);

  // ── Left-side industrial block ─────────────────────────────────────────────
  const bx = -16.3, bz = 1.5;
  box(bx, 0, bz, 9.8, 4.2, 7.8, concreteDark);
  // Roof lip.
  box(bx, 4.2, bz, 10.2, .32, 8.2, concrete);
  // Windows.
  for (let i = 0; i < 3; i++) {
    box(bx - 2.7 + i * 2.7, 2.45, bz + 3.96, 1.3, .95, .05, glassMat, { hit: false, collide: false, shadow: false });
    box(bx - 2.7 + i * 2.7, 2.41, bz + 4.01, 1.36, .07, .08, darkMetal, { hit: false, collide: false, shadow: false });
  }
  // Door and canopy.
  box(bx + 1.0, 0, bz + 4.01, 1.35, 2.3, .08, darkMetal, { hit: false, collide: false });
  box(bx + 1.0, 2.55, bz + 4.2, 2.0, .14, .7, orangePaint, { hit: false, collide: false });
  label('BAY 04', 'MANUTENÇÃO', bx - 2.9, 3.45, bz + 3.99, 2.3, 1.0, 0);
  // Rooftop AC + antenna.
  box(bx - 2.8, 4.52, bz - 1.0, 1.4, .75, 1.1, metal);
  box(bx - 2.8, 5.27, bz - 1.0, 1.7, .1, 1.35, darkMetal, { hit: false });
  cyl(bx + 2.7, 4.52, bz - 1.2, .04, .06, 3.5, darkMetal, 6);
  box(bx + 2.7, 7.9, bz - 1.2, .55, .05, .18, orangePaint, { hit: false, collide: false });

  // ── Far-left training platform + steps ────────────────────────────────────
  const plX = -16.5, plZ = -10.5;
  box(plX, 0, plZ, 8.2, 1.9, 6.2, concrete);
  box(plX, 1.9, plZ, 8.5, .18, 6.5, concreteDark);
  // Steps (0.38 rise is within stepHeight).
  for (let i = 0; i < 5; i++) {
    box(plX, 0, plZ + 3.6 + i * .55, 3.8, .38 * (5 - i), .6, concreteDark);
  }
  // Railings.
  for (const xo of [-3.8, 3.8]) {
    for (let i = 0; i < 4; i++) {
      box(plX + xo, 2.08, plZ - 2.8 + i * 1.8, .07, 1.1, .07, metal, { hit: false, collide: false });
    }
    box(plX + xo, 3.08, plZ - .2, .08, .08, 5.6, metal, { hit: false, collide: false });
  }
  // Crates on the platform: mantle chain.
  box(plX + 2.3, 2.08, plZ - 1.9, 1.4, .9, 1.4, wood);
  box(plX + 2.3, 2.98, plZ - 1.9, 1.2, .75, 1.2, wood);
  label('TRAINING', 'PLATAFORMA 02', plX - 2.3, 2.95, plZ + 3.12, 3.0, 1.1, Math.PI);

  // ── Central cover / mantle playground ─────────────────────────────────────
  // Low concrete walls, deliberately 1.0–1.4m for instant mantles.
  box(-6.8, 0, 12.2, 6.2, 1.05, .58, concrete);
  box(-6.8, 1.05, 12.5, 1.1, .35, 1.0, concrete, { hit: false });
  box(4.3, 0, 7.1, 5.2, 1.28, .52, concreteDark);
  box(4.3, 1.28, 7.1, 5.25, .1, .6, hazard, { hit: false });

  // Jersey barriers, arranged like a slalom.
  const barrier = (x, z, rot) => {
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.3, .42, .68), concrete);
    base.position.y = .21;
    const top = new THREE.Mesh(new THREE.BoxGeometry(2.3, .68, .3), concrete);
    top.position.y = .76;
    const stripes = new THREE.Mesh(new THREE.PlaneGeometry(2.1, .13), hazard);
    stripes.position.set(0, .88, .155);
    stripes.rotation.x = 0;
    g.add(base, top, stripes);
    g.position.set(x, 0, z); g.rotation.y = rot;
    g.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; hitMeshes.push(o); } });
    root.add(g);
    // Conservative AABB for the rotated barrier.
    const s = Math.abs(Math.sin(rot)), c = Math.abs(Math.cos(rot));
    addCollider(x, 0, z, 2.3 * c + .68 * s, 1.1, 2.3 * s + .68 * c);
  };
  barrier(3.9, 13.0, .18);
  barrier(-3.2, 1.0, -.32);
  barrier(7.6, -6.0, .7);
  barrier(-9.6, -2.1, .12);

  // Central crate stack / route to the catwalk.
  const crate = (x, y, z, s = 1.55, rot = 0) => {
    const c = box(x, y, z, s, s, s, wood, { rotY: rot });
    // Two dark bands + a stencil break up the large flat faces.
    box(x, y + s * .16, z, s * 1.012, s * .055, s * 1.012, woodDark, { rotY: rot, collide: false, hit: false, shadow: false });
    box(x, y + s * .82, z, s * 1.012, s * .055, s * 1.012, woodDark, { rotY: rot, collide: false, hit: false, shadow: false });
    const decal = new THREE.Mesh(new THREE.PlaneGeometry(s * .38, s * .38), crateStencil);
    decal.position.set(x + Math.sin(rot) * (s / 2 + .008), y + s * .49, z + Math.cos(rot) * (s / 2 + .008));
    decal.rotation.y = rot;
    root.add(decal);
    return c;
  };
  crate(4.9, 0, 17.2, 1.7, .08);
  crate(5.2, 1.7, 17.2, 1.35, -.12);
  crate(6.7, 0, 18.0, 1.25, .03);
  crate(-3.6, 0, 16.5, 1.3, .22);
  crate(-5.0, 0, 5.1, 1.6, -.07);
  crate(-5.0, 1.6, 5.1, 1.25, .17);
  crate(12.8, 0, 10.5, 1.4, -.14);
  crate(13.7, 0, 9.4, 1.1, .31);

  // ── Sandbag nest + lane dressing ──────────────────────────────────────────
  const sandbag = (x, y, z, rot = 0) => {
    const m = new THREE.Mesh(new THREE.CapsuleGeometry(.17, .28, 3, 8), burlap);
    m.rotation.set(0, rot, Math.PI / 2);
    m.scale.set(1, 1, .72);
    m.position.set(x, y + .16, z);
    m.castShadow = true; m.receiveShadow = true;
    root.add(m);
  };
  const nestX = -9.2, nestZ = 6.2;
  for (let row = 0; row < 3; row++) {
    const n = 6 - row;
    for (let i = 0; i < n; i++) {
      sandbag(nestX - 1.3 + i * .5, .02 + row * .29, nestZ + (row % 2) * .06, (i % 2 ? .07 : -.04));
    }
  }
  for (let i = 0; i < 4; i++) sandbag(nestX + 1.15 + i * .42, .75, nestZ - .2 + i * .33, .4);
  addCollider(nestX, 0, nestZ, 3.2, .95, .95);

  // Traffic cones.
  const coneMat = new THREE.MeshStandardMaterial({ color: 0xe15a1c, roughness: .82 });
  const coneReflector = new THREE.MeshBasicMaterial({ color: 0xe8ddc6 });
  for (const [x, z] of [[-4.6, 18.4], [4.4, 6.3], [11.7, 6.6], [-14, -2.1], [15.8, -3.6]]) {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(.21, .62, 10), coneMat);
    cone.position.set(x, .31, z); cone.castShadow = true; root.add(cone);
    const base = new THREE.Mesh(new THREE.BoxGeometry(.43, .05, .43), rubber);
    base.position.set(x, .025, z); root.add(base);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(.11, .15, .1, 10), coneReflector);
    band.position.set(x, .35, z); root.add(band);
  }

  // Scattered debris: shell boxes, planks, paper.
  const debrisMat = new THREE.MeshStandardMaterial({ color: 0x5f574a, roughness: .95 });
  for (let i = 0; i < 14; i++) {
    const d = new THREE.Mesh(new THREE.BoxGeometry(.1 + rand() * .28, .03 + rand() * .08, .08 + rand() * .2), debrisMat);
    d.position.set((rand() - .5) * 48, .02, (rand() - .5) * 48);
    d.rotation.y = rand() * 6.28; d.receiveShadow = true; root.add(d);
  }

  // ── Overhead gantry frames the main lane ──────────────────────────────────
  const gantryZ = 4.4;
  for (const x of [-22.6, 22.6]) {
    box(x, 0, gantryZ, .34, 5.4, .34, metal);
    box(x, 0, gantryZ, 1.1, .16, 1.1, concreteDark, { hit: false, collide: false });
  }
  box(0, 5.1, gantryZ, 45.5, .34, .34, metal, { collide: false });
  box(0, 4.8, gantryZ, 45.5, .035, .48, darkMetal, { collide: false, hit: false });
  for (let x = -19; x <= 19; x += 6.3) {
    box(x, 5.0, gantryZ, .08, .5, .08, metal, { hit: false, collide: false, shadow: false });
  }
  label('SECTOR 07', 'MOVE FAST · STAY LOW', 0, 4.55, gantryZ + .18, 6.3, 1.15, 0);
  label('DRILL', 'NO CAMPING', -14.2, 4.5, gantryZ + .18, 2.8, .85, 0);
  label('06', 'CLEARANCE', 14.2, 4.5, gantryZ + .18, 2.4, .8, 0);

  // ── Slide gate / low wall across a side lane ──────────────────────────────
  box(-14.6, 0, 15.1, .45, 2.0, 3.1, concrete); // jamb
  box(-9.2, 0, 15.1, .45, 2.0, 3.1, concrete);
  box(-11.9, 1.42, 15.1, 5.9, .48, .38, concreteDark); // lintel: 1.42 clearance
  box(-11.9, 1.9, 15.1, 5.9, .1, .42, hazard, { hit: false });
  label('DUCK', '1.3M', -11.9, 1.7, 14.9, 1.8, .55, Math.PI);

  // ── Back lane containers ──────────────────────────────────────────────────
  box(17.4, 0, -15.2, 8.6, 2.6, 3.0, containerBlue, { rotY: Math.PI / 2 });
  box(-2.2, 0, -17.8, 9.4, 2.6, 3.0, containerGreen);
  box(-2.2, 2.6, -17.8, 9.4, 2.6, 3.0, containerOrange);
  // Small climb stack beside container.
  crate(-8.2, 0, -15.2, 1.2);
  crate(-8.2, 1.2, -15.2, 1.1);
  crate(-8.2, 2.3, -15.2, 1.0);
  // Loading dock.
  box(12, 0, -22.2, 17, 1.15, 3.4, concreteDark);
  box(12, 1.15, -22.2, 17.2, .12, 3.6, concrete);
  for (let i = 0; i < 3; i++) {
    box(5.2 + i * 7.2, 1.27, -22.2, 2.8, .05, 2.7, darkMetal, { hit: false, collide: false });
  }
  label('LOADING', 'DOCA 02', 12, 2.65, -24.0, 6.2, 1.7, 0);

  // ── Scaffold / catwalk around the central lane ────────────────────────────
  const scafMat = metal;
  for (const x of [-10.8, -4.4]) {
    for (const z of [-5.9, -1.8, 2.3]) {
      box(x, 0, z, .13, 3.35, .13, scafMat, { hit: false, collide: false });
    }
    box(x, 3.25, -1.8, .16, .16, 8.1, scafMat, { hit: false, collide: false });
  }
  // Catwalk deck at 3.3, reachable from the rooftop of the central block? Decor.
  box(-7.6, 3.18, -1.8, 6.5, .23, 1.1, darkMetal, { collide: false, hit: false });
  for (let i = 0; i < 9; i++) {
    box(-10.4 + i * .7, 3.43, -1.8, .05, .1, 1.2, metal, { hit: false, collide: false, shadow: false });
  }
  // Wooden pallet + tarp lean-to at the side.
  box(18.9, 0, 15.8, 2.6, .2, 2.6, wood, { rotY: .1 });
  box(18.9, .2, 15.8, 2.4, 1.5, 1.8, wood, { rotY: -.1 });

  // ── Barrels, lamps, cables ────────────────────────────────────────────────
  const barrelMat = new THREE.MeshStandardMaterial({ color: 0x7f3d1d, roughness: .74, metalness: .4 });
  const barrelBlue = new THREE.MeshStandardMaterial({ color: 0x324a51, roughness: .7, metalness: .45 });
  for (const [x, z, m] of [[-12.9, 7.2, barrelMat], [-13.7, 7.5, barrelBlue], [8.8, 12.2, barrelBlue], [20.8, 5.2, barrelMat], [-4.9, -12.9, barrelMat]]) {
    const b = cyl(x, 0, z, .36, .36, .9, m, 14, true);
    b.castShadow = true;
    for (const ry of [.2, .68]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(.365, .025, 5, 16), darkMetal);
      ring.position.set(x, ry, z); ring.rotation.x = Math.PI / 2; root.add(ring);
    }
  }

  // Bollards and lamp posts.
  const lampLights = [];
  for (const [x, z, ry] of [[-21, 20, .4], [20.8, 18.5, -.8], [22.5, -7.5, 2.1]]) {
    cyl(x, 0, z, .09, .13, 4.8, metal, 8, true);
    const head = box(x + Math.sin(ry) * .55, 4.65, z + Math.cos(ry) * .55, .62, .2, .34, darkMetal, { hit: false, collide: false });
    const bulb = new THREE.Mesh(new THREE.BoxGeometry(.48, .035, .25), new THREE.MeshBasicMaterial({ color: 0xffd9a0 }));
    bulb.position.copy(head.position).add(new THREE.Vector3(0, -.11, 0)); root.add(bulb);
    const light = new THREE.PointLight(0xffc883, 7, 11, 2);
    light.position.copy(head.position).add(new THREE.Vector3(0, -.45, 0));
    scene.add(light); lampLights.push(light);
  }

  // Cables overhead.
  const cableMat = new THREE.MeshBasicMaterial({ color: 0x171513 });
  for (let i = 0; i < 4; i++) {
    const y = 4.1 + i * .22;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-per + 1, y, 18 - i * 7),
      new THREE.Vector3(-8, y - .7 - rand() * .5, 17 - i * 7),
      new THREE.Vector3(4, y - .25, 16 - i * 7),
      new THREE.Vector3(per - 1, y - .8, 15 - i * 7),
    ]);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 18, .018, 4, false), cableMat);
    tube.castShadow = false; root.add(tube);
  }

  // Hanging banners.
  const bannerMat = new THREE.MeshStandardMaterial({ color: 0xd84f19, roughness: .9, side: THREE.DoubleSide });
  for (const [x, z, w] of [[-10.6, 8.2, 1.35], [-7.0, 8.2, 1.35], [16.4, -7.5, 1.4]]) {
    const banner = new THREE.Mesh(new THREE.PlaneGeometry(w, 2.2, 4, 8), bannerMat);
    banner.position.set(x, 3.25, z);
    banner.rotation.y = Math.PI / 2;
    banner.castShadow = true;
    // A little cloth ripple.
    const pos = banner.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i), py = pos.getY(i);
      pos.setZ(i, Math.sin(px * 2.4 + py * 1.8) * .07);
    }
    pos.needsUpdate = true;
    root.add(banner);
    label('07', 'COMBAT', x + .015, 3.25, z, 1.15, .8, Math.PI / 2).rotation.z = Math.PI;
  }

  // A small fire barrel for a warm pool of light.
  const fireX = 19.2, fireZ = -2.2;
  cyl(fireX, 0, fireZ, .43, .4, .95, barrelMat, 14, true);
  const ember = new THREE.Mesh(new THREE.CircleGeometry(.34, 12), new THREE.MeshBasicMaterial({ color: 0xff7b24 }));
  ember.rotation.x = -Math.PI / 2; ember.position.set(fireX, .96, fireZ); root.add(ember);
  const fireLight = new THREE.PointLight(0xff6f29, 13, 10, 2);
  fireLight.position.set(fireX, 1.45, fireZ);
  scene.add(fireLight);
  fireLight.userData.base = 13;

  // ── Distant skyline ───────────────────────────────────────────────────────
  const skylineMat = new THREE.MeshBasicMaterial({ color: 0x6a5949, fog: true });
  const skylineMat2 = new THREE.MeshBasicMaterial({ color: 0x4b4238, fog: true });
  for (let i = 0; i < 34; i++) {
    const angle = (i / 34) * Math.PI * 2 + rand() * .08;
    const radius = 75 + rand() * 35;
    const w = 5 + rand() * 12, h = 3 + rand() * 20;
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, w * .7), rand() > .5 ? skylineMat : skylineMat2);
    m.position.set(Math.cos(angle) * radius, h / 2 + rand() * 2, Math.sin(angle) * radius);
    root.add(m);
  }
  // Distant crane silhouette.
  const crane = new THREE.Group();
  const craneMat = new THREE.MeshBasicMaterial({ color: 0x403830, fog: true });
  const craneParts = [[0, 10, 0, .5, 20, .5], [5, 19.5, 0, 11, .35, .35], [-6, 16.8, 0, .35, 5.5, .35]];
  for (const [x, y, z, w, h, d] of craneParts) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), craneMat);
    m.position.set(x, y, z); crane.add(m);
  }
  crane.position.set(-54, 0, -58); root.add(crane);

  // ── Dust motes ────────────────────────────────────────────────────────────
  const dustCount = 520;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  const dustSeed = new Float32Array(dustCount);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (rand() - .5) * 54;
    dustPos[i * 3 + 1] = .3 + rand() * 8;
    dustPos[i * 3 + 2] = (rand() - .5) * 54;
    dustSeed[i] = rand() * 6.28;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({
    color: 0xffd8a5, size: .035, transparent: true, opacity: .42,
    depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  // Slow, cheap drift. No per-particle objects.
  tickers.push((t) => {
    const arr = dustGeo.attributes.position.array;
    for (let i = 0; i < dustCount; i++) {
      arr[i * 3 + 1] += Math.sin(t * .18 + dustSeed[i]) * .0006;
      arr[i * 3] += .0012;
      if (arr[i * 3] > 27) arr[i * 3] = -27;
    }
    dustGeo.attributes.position.needsUpdate = true;
    fireLight.intensity = fireLight.userData.base + Math.sin(t * 17) * 2 + Math.sin(t * 31) * 1.2;
  });

  // ── Draw-call batching ────────────────────────────────────────────────────
  // Hundreds of individually authored props become a few material batches.
  // Collision is untouched; hitscan is rebuilt from the merged mesh set.
  mergeByMaterial(root, { includeTransparent: true });
  const shootable = collectOpaqueMeshes(root);

  function update(dt, elapsed) {
    for (const fn of tickers) fn(elapsed, dt);
  }

  return {
    root, colliders, hitMeshes: shootable, spawn: C.arena.spawn,
    update, sunDir, lamps: lampLights,
    materials: { concrete, concreteDark, metal, darkMetal, wood, orangePaint, hazard },
    addCollider, box, hitMeshesAll: hitMeshes,
    fogColor: new THREE.Color(0xc8a47c),
  };
}
