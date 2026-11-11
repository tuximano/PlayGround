// Procedural, rigged and animated 3D boxer. Every body, face and gear option is generated.
import * as THREE from 'three';
import { damp, clamp, lerp, smoothstep } from '../core/rng.js';
import {
  HAIR, BEARDS, BROWS, FACE_SHAPES, EYES, NOSES, MOUTHS, SCARS, SKIN_TONES, SHORTS, TOPS, SHOES,
  ROBES, GLOVES, COLORWAYS, HEADGEAR_NAMES, WRAP_NAMES, MEDAL_NAMES,
} from '../core/data.js';
import { patternTexture, beltPlateTexture } from './textures.js';
import { heightMeters, reachCm, catalogItem } from '../core/store.js';

const GEO = {};
const MAT = new Map();

function mat(color, opts = {}) {
  const key = [color, opts.roughness ?? '', opts.metalness ?? '', opts.emissive || '', opts.emissiveIntensity ?? '', opts.transparent ? 1 : 0, opts.opacity ?? '', opts.side || '', opts.map?.uuid || ''].join('|');
  if (MAT.has(key)) return MAT.get(key);
  const m = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: opts.roughness ?? 0.55,
    metalness: opts.metalness ?? 0.04,
    map: opts.map || null,
    emissive: new THREE.Color(opts.emissive || '#000000'),
    emissiveIntensity: opts.emissiveIntensity ?? 0,
    side: opts.side || THREE.FrontSide,
    transparent: opts.transparent || false,
    opacity: opts.opacity ?? 1,
  });
  MAT.set(key, m);
  return m;
}

function capsule(r, len, cap = 5, radial = 10) {
  const key = `cap-${r}-${len}-${cap}-${radial}`;
  if (!GEO[key]) GEO[key] = new THREE.CapsuleGeometry(r, len, cap, radial);
  return GEO[key];
}
function sphere(seg = 18, rings = 14, arc = Math.PI * 2) {
  const key = `sph-${seg}-${rings}-${arc}`;
  if (!GEO[key]) GEO[key] = new THREE.SphereGeometry(1, seg, rings, 0, arc);
  return GEO[key];
}
function box() {
  if (!GEO.box) GEO.box = new THREE.BoxGeometry(1, 1, 1);
  return GEO.box;
}
function cyl(rt, rb, h, seg = 14, open = false) {
  const key = `cyl-${rt}-${rb}-${h}-${seg}-${open}`;
  if (!GEO[key]) GEO[key] = new THREE.CylinderGeometry(rt, rb, h, seg, 1, open);
  return GEO[key];
}
function torus(r, tube, seg = 10, radial = 16, arc = Math.PI * 2) {
  const key = `tor-${r}-${tube}-${seg}-${radial}-${arc}`;
  if (!GEO[key]) GEO[key] = new THREE.TorusGeometry(r, tube, seg, radial, arc);
  return GEO[key];
}

function mergeColor(material, color) {
  const m = material.clone();
  m.color = new THREE.Color(color);
  return m;
}

export class Boxer {
  constructor(appearance = {}, { robe = false, scale = 1, quality = 'high' } = {}) {
    this.appearance = { ...appearance };
    this.quality = quality;
    this.root = new THREE.Group();
    this.body = new THREE.Group();
    this.root.add(this.body);
    this.robeVisible = robe;
    this.time = Math.random() * 20;
    this.expression = 'neutral';
    this.hitFlash = 0;
    this.pose = {};
    this.target = {};
    this.parts = {};
    this.materials = {};
    this.baseHeight = heightMeters(this.appearance);
    this.scale = (scale * this.baseHeight) / 1.8;
    this.root.scale.setScalar(this.scale);
    this.reach = (reachCm(this.appearance) - 168) / 30; // -1..1 approx
    this.build();
    this.setRobe(robe);
    this.initPose();
  }

  build() {
    const a = this.appearance;
    const skinTone = SKIN_TONES.find((s) => s.id === a.skin) || SKIN_TONES[5];
    const skinColor = skinTone.color;
    const width = 0.86 + (a.width ?? 0.5) * 0.34;
    const muscle = 0.82 + (a.muscle ?? 0.5) * 0.42;
    const skin = mat(skinColor, { roughness: 0.6 }).clone();
    this.materials.skin = skin;
    const skinShine = mat(skinColor, { roughness: 0.36 }).clone();
    this.materials.skinShine = skinShine;
    const hairDef = HAIR.find((h) => h.id === a.hair) || HAIR[0];
    const hairMat = mat(hairDef.color, { roughness: 0.82 });
    const browDef = BROWS.find((b) => b.id === a.brow) || BROWS[0];
    const eyesDef = EYES.find((e) => e.id === a.eyes) || EYES[0];
    const mouthDef = MOUTHS.find((m) => m.id === a.mouth) || MOUTHS[0];
    const noseDef = NOSES.find((n) => n.id === a.nose) || NOSES[0];
    const faceDef = FACE_SHAPES.find((f) => f.id === a.face) || FACE_SHAPES[0];
    const beardDef = BEARDS.find((b) => b.id === a.beard) || BEARDS[0];
    const scarDef = SCARS.find((s) => s.id === a.scar) || SCARS[0];
    const shortsDef = SHORTS.find((s) => s.id === a.shorts) || SHORTS[0];
    const gloveDef = GLOVES.find((g) => g.id === a.glove) || GLOVES[0];
    const shoeDef = SHOES.find((s) => s.id === a.shoe) || SHOES[0];
    const robeDef = ROBES.find((r) => r.id === a.robe) || ROBES[0];
    const topDef = TOPS.find((t) => t.id === a.top) || null;
    const cw = COLORWAYS.find((c) => c.id === a.colorway) || COLORWAYS[0];
    const accent = cw?.colors?.[1] || '#f2c14e';
    const trim = cw?.colors?.[2] || '#f5f5f4';

    this.shortsDef = shortsDef;
    this.gloveDef = gloveDef;
    this.shoeDef = shoeDef;
    this.robeDef = robeDef;
    this.trimColor = trim;
    this.accentColor = accent;

    const body = this.body;
    body.position.y = 0.915;

    // ---------------- Torso ----------------
    const torso = new THREE.Group();
    torso.position.y = 0;
    body.add(torso);
    this.parts.torso = torso;

    const chest = new THREE.Mesh(sphere(20, 16), skin);
    chest.scale.set(0.315 * width * muscle, 0.275, 0.20 * width);
    chest.position.y = 0.315;
    torso.add(chest);
    this.parts.chest = chest;

    const waist = new THREE.Mesh(sphere(16, 12), skin);
    waist.scale.set(0.225 * width, 0.20, 0.155 * width);
    waist.position.y = 0.06;
    torso.add(waist);

    // Pectorals
    for (const side of [-1, 1]) {
      const pec = new THREE.Mesh(sphere(14, 10), skinShine);
      pec.scale.set(0.135 * width * muscle, 0.10 * muscle, 0.065);
      pec.position.set(side * 0.115 * width, 0.345, 0.155 + 0.02 * muscle);
      torso.add(pec);
    }
    // Abs
    for (let i = 0; i < 3; i++) {
      for (const side of [-1, 1]) {
        const ab = new THREE.Mesh(sphere(10, 8), skinShine);
        ab.scale.set(0.052 * weightScale(muscle), 0.045, 0.028);
        ab.position.set(side * 0.062, 0.19 - i * 0.075, 0.16);
        torso.add(ab);
      }
    }
    // Obliques
    for (const side of [-1, 1]) {
      const ob = new THREE.Mesh(sphere(12, 8), skin);
      ob.scale.set(0.06, 0.14, 0.05);
      ob.position.set(side * 0.205 * width, 0.10, 0.10);
      torso.add(ob);
    }
    // Lats
    for (const side of [-1, 1]) {
      const lat = new THREE.Mesh(sphere(12, 10), skin);
      lat.scale.set(0.09, 0.17, 0.10);
      lat.position.set(side * 0.255 * width, 0.25, -0.01);
      torso.add(lat);
    }
    // Neck
    const neck = new THREE.Mesh(cyl(0.072, 0.083, 0.14, 10), skin);
    neck.position.y = 0.53;
    torso.add(neck);

    // ---------------- Head ----------------
    const headGroup = new THREE.Group();
    headGroup.position.y = 0.615;
    torso.add(headGroup);
    this.parts.head = headGroup;

    const face = faceDef.id;
    const headScale = { oval: [1, 1.12, 1], square: [1.05, 1.06, 0.98], round: [1.08, 1.0, 1.02], long: [0.92, 1.2, 0.95], diamond: [1.0, 1.12, 0.94], angular: [1.02, 1.08, 1.0], heart: [1.06, 1.1, 0.98], wide: [1.12, 1.03, 0.98], narrow: [0.9, 1.13, 0.94], sculpted: [1.02, 1.1, 1.0] }[face] || [1, 1.1, 1];
    const skull = new THREE.Mesh(sphere(20, 16), skin);
    skull.scale.set(0.132 * headScale[0], 0.15 * headScale[1], 0.128 * headScale[2]);
    skull.position.y = 0.10;
    headGroup.add(skull);
    const jaw = new THREE.Mesh(sphere(16, 12), skin);
    jaw.scale.set(0.112 * headScale[0], 0.085, 0.108 * headScale[2]);
    jaw.position.set(0, 0.022, 0.018);
    headGroup.add(jaw);
    for (const side of [-1, 1]) {
      const ear = new THREE.Mesh(sphere(10, 8), skin);
      ear.scale.set(0.022, 0.037, 0.018);
      ear.position.set(side * 0.132 * headScale[0], 0.075, 0);
      headGroup.add(ear);
    }
    // Nose
    const nose = new THREE.Mesh(sphere(10, 8), skin);
    const wideNose = noseDef.id === 'n1' || noseDef.id === 'n4' || noseDef.id === 'n7';
    nose.scale.set((wideNose ? 0.028 : 0.020) * (noseDef.id === 'n3' ? 1.1 : 1), noseDef.id === 'n6' ? 0.055 : 0.040, noseDef.id === 'n3' ? 0.05 : 0.034);
    nose.position.set(0, 0.075, 0.125 * headScale[2]);
    if (noseDef.id === 'n8' || noseDef.id === 'n9') nose.rotation.x = -0.3;
    headGroup.add(nose);
    // Eyes
    const eyeColor = { e0: '#5a3b23', e1: '#25170f', e2: '#5b8fbf', e3: '#4e7d54', e4: '#d1a75e', e5: '#7c8a8c', e6: '#c98b33', e7: '#90713f', e8: '#a8d8e0', e9: '#c0502a', e10: '#1e1713', e11: '#9ac4cc', e12: '#8fbf6a', e13: '#3d2d22' }[eyesDef.id] || '#3a2618';
    this.eyeMat = mat(eyeColor, { roughness: 0.3 });
    this.eyeWhiteMat = mat('#f2efe8', { roughness: 0.35 });
    const eyeScaleX = eyesDef.id === 'e13' ? 0.9 : 1;
    for (const side of [-1, 1]) {
      const white = new THREE.Mesh(sphere(10, 8), this.eyeWhiteMat);
      white.scale.set(0.024 * eyeScaleX, 0.019, 0.012);
      white.position.set(side * 0.055, 0.105, 0.117 * headScale[2]);
      headGroup.add(white);
      const pupil = new THREE.Mesh(sphere(8, 6), this.eyeMat);
      pupil.scale.set(0.012, 0.012, 0.008);
      pupil.position.set(side * 0.055, 0.105, 0.128 * headScale[2]);
      headGroup.add(pupil);
      const shine = new THREE.Mesh(sphere(6, 5), mat('#ffffff', { roughness: 0.1 }));
      shine.scale.setScalar(0.0035);
      shine.position.set(side * 0.057, 0.109, 0.135 * headScale[2]);
      headGroup.add(shine);
    }
    // Brows
    this.browParts = [];
    for (const side of [-1, 1]) {
      const brow = new THREE.Mesh(box(), hairMat);
      const thick = browDef.id === 'b1' || browDef.id === 'b13' ? 0.018 : 0.011;
      brow.scale.set(0.052, thick, 0.018);
      brow.position.set(side * 0.057, 0.133, 0.122 * headScale[2]);
      brow.rotation.z = side * (browDef.id === 'b3' ? -0.28 : browDef.id === 'b2' ? -0.16 : 0.1);
      headGroup.add(brow);
      this.browParts.push(brow);
    }
    // Mouth
    const mouth = new THREE.Mesh(sphere(12, 8), mat('#5c2d2b', { roughness: 0.5 }));
    mouth.scale.set(0.042, 0.009, 0.012);
    mouth.position.set(0, 0.005, 0.118 * headScale[2]);
    if (mouthDef.id === 'm2' || mouthDef.id === 'm12') mouth.scale.y = 0.02;
    if (mouthDef.id === 'm4' || mouthDef.id === 'm10') mouth.scale.x = 0.05;
    headGroup.add(mouth);
    this.parts.mouth = mouth;
    const lips = new THREE.Mesh(sphere(10, 6), mat('#9b5b51', { roughness: 0.55 }));
    lips.scale.set(0.044, 0.008, 0.008);
    lips.position.set(0, 0.014, 0.124 * headScale[2]);
    headGroup.add(lips);
    this.parts.lips = lips;

    // Hair
    this.hairParts = [];
    this.buildHair(headGroup, hairDef, hairMat);
    // Beard
    this.buildBeard(headGroup, beardDef, hairMat, skin, headScale);
    // Scars
    if (scarDef.id !== 's0') this.buildScar(headGroup, scarDef, headScale);
    // Headgear (training / optional cosmetic)
    if (a.headgear && a.headgear !== 'none') this.buildHeadgear(headGroup, skin, a.headgear);

    // ---------------- Arms ----------------
    const armLen = 1 + this.reach * 0.075;
    this.parts.arms = {};
    for (const side of [-1, 1]) {
      const tag = side < 0 ? 'L' : 'R';
      const shoulder = new THREE.Group();
      shoulder.position.set(side * 0.29 * width, 0.465, 0);
      torso.add(shoulder);
      const delt = new THREE.Mesh(sphere(12, 10), skinShine);
      delt.scale.set(0.095 * muscle, 0.095 * muscle, 0.09);
      shoulder.add(delt);
      const upper = new THREE.Mesh(capsule(0.072 * muscle, 0.18 * armLen, 4, 10), skin);
      upper.position.y = -0.155 * armLen;
      shoulder.add(upper);
      const elbow = new THREE.Group();
      elbow.position.y = -0.30 * armLen;
      shoulder.add(elbow);
      const fore = new THREE.Mesh(capsule(0.059 * muscle, 0.18 * armLen, 4, 10), skin);
      fore.position.y = -0.15 * armLen;
      elbow.add(fore);
      const wrist = new THREE.Group();
      wrist.position.y = -0.30 * armLen;
      elbow.add(wrist);
      const wrapMat = mat('#efe7d6', { roughness: 0.8 });
      if (a.wrap && a.wrap !== 'none') {
        const wrap = new THREE.Mesh(cyl(0.063, 0.058, 0.09, 10), a.wrap === 'bandagem-ouro' ? mat('#d4af37', { roughness: 0.5 }) : wrapMat);
        wrap.position.y = -0.015;
        wrist.add(wrap);
        for (let i = 0; i < 3; i++) {
          const band = new THREE.Mesh(torus(0.061, 0.006, 6, 12), wrapMat);
          band.rotation.x = Math.PI / 2;
          band.position.y = -0.03 + i * 0.028;
          wrist.add(band);
        }
      }
      const glove = this.buildGlove(side, gloveDef, cw);
      glove.position.y = -0.10;
      wrist.add(glove);
      this.parts.arms[tag] = { shoulder, elbow, wrist, glove };
    }

    // ---------------- Shorts & legs ----------------
    this.buildShorts(body, shortsDef, accent, trim);
    this.parts.legs = {};
    for (const side of [-1, 1]) {
      const tag = side < 0 ? 'L' : 'R';
      const hip = new THREE.Group();
      hip.position.set(side * 0.12 * width, -0.005, 0);
      body.add(hip);
      const thigh = new THREE.Mesh(capsule(0.082, 0.30, 4, 10), skin);
      thigh.position.y = -0.20;
      hip.add(thigh);
      const knee = new THREE.Group();
      knee.position.y = -0.40;
      hip.add(knee);
      const shin = new THREE.Mesh(capsule(0.058, 0.30, 4, 10), skin);
      shin.position.y = -0.20;
      knee.add(shin);
      const foot = new THREE.Group();
      foot.position.y = -0.40;
      knee.add(foot);
      this.buildShoe(foot, shoeDef, cw);
      this.parts.legs[tag] = { hip, knee, foot };
    }

    // ---------------- Robe / top / accessories ----------------
    this.buildTop(torso, topDef, cw, width, muscle, skin);
    this.buildRobe(body, robeDef, cw);
    this.buildMedal(torso);
    this.buildTattoos(torso, a);

    // Gold champion chain effect
    this.root.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    this.parts.headGroup = headGroup;
  }

  buildHair(headGroup, def, material) {
    const shape = def.shape;
    const volume = def.volume || 1;
    const add = (mesh, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) => {
      mesh.position.set(x, y, z);
      mesh.rotation.set(rx, ry, rz);
      headGroup.add(mesh);
      this.hairParts.push(mesh);
      return mesh;
    };
    if (shape === 'bald') {
      // tiny stubble cap
      const stubble = new THREE.Mesh(sphere(18, 12), mat('#2a1d16', { roughness: 0.95, transparent: true, opacity: 0.35 }));
      stubble.scale.set(0.134, 0.09, 0.13);
      add(stubble, 0, 0.145, -0.005);
      return;
    }
    const capGeo = new THREE.SphereGeometry(1, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.64);
    const cap = new THREE.Mesh(capGeo, material);
    const capScale = {
      buzz: [0.137, 0.09, 0.13], fade: [0.14, 0.11, 0.133], afro: [0.195, 0.17, 0.19], curls: [0.165, 0.145, 0.16],
      long: [0.15, 0.12, 0.145], mohawk: [0.10, 0.08, 0.115], ponytail: [0.14, 0.11, 0.137], braids: [0.142, 0.105, 0.138],
      slick: [0.14, 0.108, 0.133], spiky: [0.145, 0.10, 0.138], topknot: [0.138, 0.10, 0.132], undercut: [0.135, 0.09, 0.128],
      flat: [0.145, 0.10, 0.138], dreads: [0.145, 0.11, 0.14], wavy: [0.155, 0.125, 0.15], sidepart: [0.142, 0.115, 0.138],
      cloud: [0.175, 0.14, 0.17], samurai: [0.14, 0.11, 0.135], classic: [0.142, 0.115, 0.138],
    }[shape] || [0.142, 0.10, 0.137];
    cap.scale.set(capScale[0] * volume, capScale[1] * volume, capScale[2] * volume);
    add(cap, 0, 0.148, -0.005);
    const clumpMat = material;
    switch (shape) {
      case 'afro': {
        for (let i = 0; i < 8; i++) {
          const s = new THREE.Mesh(sphere(10, 8), clumpMat);
          const ang = (i / 8) * Math.PI * 2;
          s.scale.setScalar(0.07 * volume + Math.random() * 0.02);
          add(s, Math.cos(ang) * 0.115, 0.19 + Math.sin(i) * 0.025, Math.sin(ang) * 0.11 - 0.01);
        }
        break;
      }
      case 'curls': {
        for (let i = 0; i < 14; i++) {
          const s = new THREE.Mesh(sphere(8, 6), clumpMat);
          const ang = (i / 14) * Math.PI * 2;
          s.scale.setScalar(0.038 + (i % 3) * 0.01);
          add(s, Math.cos(ang) * (0.08 + (i % 3) * 0.022), 0.215 + (i % 4) * 0.018, Math.sin(ang) * 0.085 - 0.01);
        }
        break;
      }
      case 'long': {
        const back = new THREE.Mesh(capsule(0.095, 0.17, 4, 10), clumpMat);
        back.scale.set(1.3, 1.5, 0.6);
        add(back, 0, 0.045, -0.105, 0.12);
        for (const side of [-1, 1]) {
          const lock = new THREE.Mesh(capsule(0.035, 0.12, 4, 8), clumpMat);
          add(lock, side * 0.115, 0.015, -0.03, 0.05, 0, side * 0.08);
        }
        break;
      }
      case 'mohawk': {
        for (let i = 0; i < 7; i++) {
          const cone = new THREE.Mesh(new THREE.ConeGeometry(0.033, 0.10, 5), clumpMat);
          add(cone, 0, 0.24, 0.09 - i * 0.028, 0.3 * Math.sin(i));
        }
        break;
      }
      case 'ponytail': {
        const knot = new THREE.Mesh(sphere(8, 6), clumpMat);
        knot.scale.setScalar(0.05);
        add(knot, 0, 0.21, -0.12);
        const tail = new THREE.Mesh(capsule(0.035, 0.12, 4, 8), clumpMat);
        tail.scale.set(1, 1.4, 1);
        add(tail, 0, 0.10, -0.16, 0.45);
        break;
      }
      case 'braids': {
        for (let i = 0; i < 6; i++) {
          const braid = new THREE.Mesh(capsule(0.013, 0.16 + (i % 3) * 0.03, 3, 6), clumpMat);
          add(braid, -0.12 + i * 0.048, -0.01, -0.12, 0.15, 0, (i - 2.5) * 0.03);
        }
        break;
      }
      case 'spiky': {
        for (let i = 0; i < 8; i++) {
          const cone = new THREE.Mesh(new THREE.ConeGeometry(0.028, 0.075, 5), clumpMat);
          const ang = (i / 8) * Math.PI * 2;
          add(cone, Math.cos(ang) * 0.075, 0.24 + (i % 3) * 0.008, Math.sin(ang) * 0.075, Math.sin(ang) * 0.4, 0, -Math.cos(ang) * 0.4);
        }
        break;
      }
      case 'topknot': {
        const bun = new THREE.Mesh(sphere(10, 8), clumpMat);
        bun.scale.set(0.062, 0.05, 0.062);
        add(bun, 0, 0.26, -0.02);
        break;
      }
      case 'undercut': {
        const under = new THREE.Mesh(sphere(14, 8), clumpMat);
        under.scale.set(0.148, 0.045, 0.14);
        add(under, 0, 0.17, -0.01);
        break;
      }
      case 'flat': {
        const flat = new THREE.Mesh(box(), clumpMat);
        flat.scale.set(0.22, 0.075, 0.19);
        add(flat, 0, 0.255, -0.005);
        break;
      }
      case 'dreads': {
        for (let i = 0; i < 9; i++) {
          const d = new THREE.Mesh(capsule(0.018, 0.18 + (i % 4) * 0.04, 3, 6), clumpMat);
          add(d, -0.15 + (i % 5) * 0.07, -0.03, -0.12 - (i % 3) * 0.015, 0.1 + (i % 3) * 0.08);
        }
        break;
      }
      case 'wavy': {
        for (let i = 0; i < 5; i++) {
          const wave = new THREE.Mesh(sphere(10, 8), clumpMat);
          wave.scale.set(0.075, 0.05, 0.05);
          add(wave, -0.10 + i * 0.05, 0.235, 0.03 * Math.sin(i), 0, 0, 0.3);
        }
        break;
      }
      case 'sidepart': {
        const part = new THREE.Mesh(box(), clumpMat);
        part.scale.set(0.11, 0.055, 0.07);
        add(part, 0.06, 0.235, 0.04, 0.1, 0, -0.18);
        const sweep = new THREE.Mesh(sphere(10, 8), clumpMat);
        sweep.scale.set(0.15, 0.05, 0.10);
        add(sweep, -0.01, 0.23, 0.06, 0, 0, 0.12);
        break;
      }
      case 'cloud': {
        for (let i = 0; i < 5; i++) {
          const c = new THREE.Mesh(sphere(10, 8), clumpMat);
          c.scale.set(0.08, 0.065, 0.075);
          add(c, -0.10 + i * 0.05, 0.24, 0.015 * Math.cos(i), 0, 0, 0.2);
        }
        break;
      }
      case 'samurai': {
        const bun = new THREE.Mesh(sphere(8, 8), clumpMat);
        bun.scale.setScalar(0.045);
        add(bun, 0, 0.245, -0.10);
        const band = new THREE.Mesh(cyl(0.145, 0.145, 0.035, 16, true), mat('#f5f5f4', { roughness: 0.8 }));
        add(band, 0, 0.205, -0.005);
        break;
      }
      case 'classic': {
        const side = new THREE.Mesh(sphere(10, 8), clumpMat);
        side.scale.set(0.06, 0.045, 0.08);
        add(side, -0.11, 0.19, 0.02, 0, 0, 0.3);
        break;
      }
      case 'slick': {
        for (let i = 0; i < 4; i++) {
          const line = new THREE.Mesh(box(), clumpMat);
          line.scale.set(0.02, 0.004, 0.15);
          add(line, -0.08 + i * 0.05, 0.245, 0.02, -0.1);
        }
        break;
      }
      case 'fade': {
        const fade = new THREE.Mesh(cyl(0.14, 0.135, 0.055, 18, true), clumpMat);
        add(fade, 0, 0.155, -0.005);
        break;
      }
      default:
        break;
    }
  }

  buildBeard(headGroup, def, hairMat, skin, headScale) {
    this.beardParts = [];
    const add = (mesh, x, y, z, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) => {
      mesh.position.set(x, y, z);
      mesh.rotation.set(rx, ry, rz);
      mesh.scale.set(sx, sy, sz);
      headGroup.add(mesh);
      this.beardParts.push(mesh);
      return mesh;
    };
    if (def.shape === 'none') return;
    const bm = def.shape === 'stubble' ? mat('#2a1c14', { roughness: 0.95, transparent: true, opacity: 0.45 }) : hairMat;
    switch (def.shape) {
      case 'mustache': {
        const m = new THREE.Mesh(box(), bm);
        add(m, 0, 0.045, 0.123, 0, 0, 0, 0.075, 0.014, 0.014);
        break;
      }
      case 'goatee': {
        const m = new THREE.Mesh(box(), bm);
        add(m, 0, 0.048, 0.124, 0, 0, 0, 0.06, 0.012, 0.012);
        const chin = new THREE.Mesh(sphere(8, 6), bm);
        add(chin, 0, -0.045, 0.105, 0, 0, 0, 0.036, 0.05, 0.03);
        break;
      }
      case 'soul': {
        const m = new THREE.Mesh(sphere(8, 6), bm);
        add(m, 0, -0.03, 0.12, 0, 0, 0, 0.025, 0.03, 0.012);
        break;
      }
      case 'chin': {
        const m = new THREE.Mesh(sphere(10, 8), bm);
        add(m, 0, -0.035, 0.095, 0, 0, 0, 0.066, 0.07, 0.045);
        break;
      }
      case 'chinstrap': {
        const m = new THREE.Mesh(torus(0.112, 0.014, 6, 18, Math.PI), bm);
        add(m, 0, -0.02, 0.01, 0.1, 0, 0, 1, 1.1, 1);
        break;
      }
      case 'horseshoe':
      case 'walrus':
      case 'imperial':
      case 'english': {
        const m = new THREE.Mesh(box(), bm);
        add(m, 0, 0.044, 0.126, 0, 0, 0, def.shape === 'walrus' ? 0.10 : 0.08, 0.018, 0.016);
        if (def.shape === 'horseshoe') {
          for (const side of [-1, 1]) {
            const d = new THREE.Mesh(box(), bm);
            add(d, side * 0.055, 0.005, 0.122, 0, 0, 0, 0.02, 0.07, 0.012);
          }
        }
        break;
      }
      case 'long':
      case 'bandholz':
      case 'garibaldi':
      case 'wizard': {
        const m = new THREE.Mesh(sphere(12, 10), bm);
        add(m, 0, -0.02, 0.075, 0.1, 0, 0, 0.125, 0.15, 0.085);
        const tip = new THREE.Mesh(capsule(0.045, 0.06, 3, 6), bm);
        add(tip, 0, -0.14, 0.07, 0.2);
        const mus = new THREE.Mesh(box(), bm);
        add(mus, 0, 0.047, 0.126, 0, 0, 0, 0.09, 0.016, 0.014);
        break;
      }
      case 'mutton':
      case 'friendly': {
        for (const side of [-1, 1]) {
          const m = new THREE.Mesh(sphere(10, 8), bm);
          add(m, side * 0.105, 0.02, 0.055, 0, 0, 0, 0.045, 0.09, 0.035);
        }
        const chin = new THREE.Mesh(sphere(10, 8), bm);
        add(chin, 0, -0.04, 0.09, 0, 0, 0, 0.08, 0.06, 0.04);
        break;
      }
      case 'vandyke':
      case 'anchor':
      case 'balbo':
      case 'ducktail': {
        const m = new THREE.Mesh(sphere(10, 8), bm);
        add(m, 0, -0.035, 0.105, 0, 0, 0, 0.045, 0.055, 0.03);
        const mus = new THREE.Mesh(box(), bm);
        add(mus, 0, 0.05, 0.124, 0, 0, 0, 0.07, 0.013, 0.012);
        if (def.shape === 'anchor' || def.shape === 'ducktail') {
          for (const side of [-1, 1]) {
            const line = new THREE.Mesh(box(), bm);
            add(line, side * 0.07, 0.035, 0.114, 0, 0, side * 0.4, 0.012, 0.07, 0.01);
          }
        }
        break;
      }
      case 'extended': {
        const m = new THREE.Mesh(box(), bm);
        add(m, 0, 0.044, 0.128, 0, 0, 0, 0.13, 0.015, 0.02);
        break;
      }
      case 'shortbox':
      case 'hollywood':
      case 'circle': {
        const m = new THREE.Mesh(sphere(10, 8), bm);
        add(m, 0, -0.01, 0.095, 0, 0, 0, def.shape === 'circle' ? 0.105 : 0.09, 0.1, 0.06);
        if (def.shape === 'shortbox') {
          const mus = new THREE.Mesh(box(), bm);
          add(mus, 0, 0.047, 0.126, 0, 0, 0, 0.075, 0.014, 0.012);
        }
        break;
      }
      case 'stubble': {
        const m = new THREE.Mesh(sphere(14, 10), bm);
        add(m, 0, -0.01, 0.07, 0, 0, 0, 0.118, 0.12, 0.085);
        break;
      }
      case 'full':
      default: {
        const m = new THREE.Mesh(sphere(14, 10), bm);
        add(m, 0, -0.02, 0.07, 0, 0, 0, 0.115, 0.115, 0.08);
        const mus = new THREE.Mesh(box(), bm);
        add(mus, 0, 0.047, 0.126, 0, 0, 0, 0.09, 0.015, 0.013);
      }
    }
  }

  buildScar(headGroup, def, headScale) {
    const scarMat = mat('#a7574c', { roughness: 0.7 });
    const make = (x, y, z, rz = 0, len = 0.05) => {
      const m = new THREE.Mesh(box(), scarMat);
      m.scale.set(0.005, len, 0.004);
      m.position.set(x, y, z);
      m.rotation.z = rz;
      headGroup.add(m);
    };
    if (def.id === 's1' || def.id === 's7') make(-0.065, 0.13, 0.13, 0.4, 0.06);
    if (def.id === 's2' || def.id === 's7') make(0.075, 0.03, 0.118, -0.4, 0.055);
    if (def.id === 's3') make(0, -0.04, 0.12, 0.1, 0.045);
    if (def.id === 's4') make(-0.04, 0.17, 0.115, -0.2, 0.04);
    if (def.id === 's5') make(0.02, 0.085, 0.142, 0.05, 0.035);
    if (def.id === 's6') { make(-0.07, 0.11, 0.128, 0.5, 0.07); make(0.06, 0.04, 0.125, -0.3, 0.06); }
    if (def.id === 's8') make(0.035, 0.005, 0.125, 0.2, 0.03);
    if (def.id === 's9') make(-0.11, 0.09, 0.055, 0.4, 0.045);
    if (def.id === 's10') make(-0.05, 0.115, 0.131, 0.1, 0.028);
    if (def.id === 's11') { make(0.09, 0.14, 0.1, -0.3, 0.07); make(-0.08, -0.01, 0.11, 0.5, 0.045); }
  }

  buildHeadgear(headGroup, skin, headgear) {
    const colors = { 'clássico-preto': '#171717', 'vermelho-competição': '#7f1d1d', 'azul-amador': '#1e3a8a', 'dourado-elite': '#a16207', 'branco-minimal': '#e5e7eb' };
    const key = Object.keys(colors).find((k) => headgear.includes(k.split('-')[0])) || 'clássico-preto';
    const m = mat(colors[key], { roughness: 0.5 });
    const top = new THREE.Mesh(torus(0.115, 0.022, 8, 20, Math.PI * 1.65), m);
    top.position.set(0, 0.13, 0.01);
    top.rotation.set(0, 0, Math.PI * 0.18);
    headGroup.add(top);
    for (const side of [-1, 1]) {
      const cheek = new THREE.Mesh(sphere(10, 8), m);
      cheek.scale.set(0.055, 0.09, 0.03);
      cheek.position.set(side * 0.11, 0.04, 0.055);
      headGroup.add(cheek);
    }
  }

  buildGlove(side, def, cw) {
    const group = new THREE.Group();
    const mainColor = def.colors[0];
    const cuffColor = def.colors[1] || '#111111';
    const accent = def.colors[2] || '#f5f5f4';
    const main = mat(mainColor, { roughness: 0.36 });
    const cuffM = mat(cuffColor, { roughness: 0.5 });
    const accentM = mat(accent, { roughness: 0.4 });
    const shape = def.model;
    const cuff = new THREE.Mesh(cyl(0.07, 0.078, 0.10, 12), cuffM);
    cuff.position.y = 0.01;
    group.add(cuff);
    const stripe = new THREE.Mesh(torus(0.071, 0.007, 6, 14), accentM);
    stripe.rotation.x = Math.PI / 2;
    stripe.position.y = 0.03;
    group.add(stripe);
    const glove = new THREE.Mesh(sphere(18, 14), main);
    const big = shape === 'power' || shape === 'classic' || shape === 'elite' ? 1.1 : shape === 'compact' || shape === 'speed' ? 0.9 : 1;
    glove.scale.set(0.098 * big, 0.135 * big, 0.105 * big);
    glove.position.set(0, -0.115, 0.012);
    group.add(glove);
    const thumb = new THREE.Mesh(sphere(10, 8), main);
    thumb.scale.set(0.042, 0.06, 0.045);
    thumb.position.set(side * 0.058, -0.10, 0.06);
    group.add(thumb);
    const wristStripe = new THREE.Mesh(torus(0.075, 0.008, 6, 14), accentM);
    wristStripe.rotation.x = Math.PI / 2;
    wristStripe.position.y = -0.02;
    group.add(wristStripe);
    if (def.model === 'laced' || def.model === 'heritage') {
      const lace = new THREE.Mesh(box(), accentM);
      lace.scale.set(0.012, 0.1, 0.01);
      lace.position.set(0, -0.12, 0.108);
      group.add(lace);
    }
    group.userData.mainColor = mainColor;
    return group;
  }

  buildShorts(body, def, accent, trim) {
    const cw = def.colors;
    const tex = patternTexture(cw, def.pattern, `shorts-${def.id}`);
    const m = mat('#ffffff', { roughness: 0.57, map: tex });
    const trimM = mat(trim, { roughness: 0.5 });
    const accentM = mat(accent, { roughness: 0.45 });
    const length = { classic: 0.34, long: 0.42, short: 0.28, high: 0.36, split: 0.35, satin: 0.34, taped: 0.32, boxer: 0.36, muay: 0.30, retro: 0.32, pro: 0.35, heritage: 0.34 }[def.model] || 0.34;
    const g = new THREE.Group();
    g.position.y = -0.02;
    body.add(g);
    const main = new THREE.Mesh(cyl(0.245, 0.30, length, 18, true), m);
    main.scale.z = 0.86;
    main.position.y = 0.09 - length / 2;
    g.add(main);
    const waistband = new THREE.Mesh(cyl(0.253, 0.253, 0.075, 18), trimM);
    waistband.scale.z = 0.86;
    waistband.position.y = 0.105;
    g.add(waistband);
    const bandAccent = new THREE.Mesh(cyl(0.256, 0.256, 0.018, 18, true), accentM);
    bandAccent.scale.z = 0.86;
    bandAccent.position.y = 0.084;
    g.add(bandAccent);
    // leg openings
    for (const side of [-1, 1]) {
      const leg = new THREE.Mesh(cyl(0.135, 0.145, length * 0.5, 12, true), m);
      leg.position.set(side * 0.115, 0.09 - length * 0.75, 0);
      leg.scale.z = 0.94;
      g.add(leg);
      const trimRing = new THREE.Mesh(torus(0.138, 0.008, 6, 14), accentM);
      trimRing.rotation.x = Math.PI / 2;
      trimRing.position.set(side * 0.115, 0.09 - length, 0);
      trimRing.scale.z = 0.94;
      g.add(trimRing);
    }
    // side stripes for certain models
    if (['split', 'taped', 'pro', 'muay'].includes(def.model)) {
      for (const side of [-1, 1]) {
        const stripe = new THREE.Mesh(box(), accentM);
        stripe.scale.set(0.014, length * 0.85, 0.02);
        stripe.position.set(side * 0.29, 0.09 - length * 0.5, 0.0);
        g.add(stripe);
      }
    }
    this.shortsGroup = g;
  }

  buildShoe(foot, def, cw) {
    const g = new THREE.Group();
    const bodyColor = def.colors[0];
    const soleColor = '#121212';
    const accent = def.colors[1] || '#f5f5f4';
    const shoeM = mat(bodyColor, { roughness: 0.48 });
    const soleM = mat(soleColor, { roughness: 0.8 });
    const accentM = mat(accent, { roughness: 0.4 });
    const isHigh = def.model === 'high' || def.model === 'boxing' || def.model === 'champ';
    const base = new THREE.Mesh(box(), shoeM);
    base.scale.set(0.115, 0.075, 0.235);
    base.position.set(0, -0.02, 0.055);
    base.geometry = GEO.box;
    g.add(base);
    const toe = new THREE.Mesh(sphere(12, 8), shoeM);
    toe.scale.set(0.058, 0.045, 0.075);
    toe.position.set(0, -0.015, 0.155);
    g.add(toe);
    const sole = new THREE.Mesh(box(), soleM);
    sole.scale.set(0.12, 0.022, 0.25);
    sole.position.set(0, -0.055, 0.055);
    g.add(sole);
    if (isHigh) {
      const ankle = new THREE.Mesh(cyl(0.062, 0.055, 0.09, 10, true), shoeM);
      ankle.position.set(0, 0.03, -0.015);
      g.add(ankle);
    }
    const stripe = new THREE.Mesh(box(), accentM);
    stripe.scale.set(0.12, 0.015, 0.02);
    stripe.position.set(0, 0.0, 0.06);
    g.add(stripe);
    const laceM = mat('#f5f5f4', { roughness: 0.8 });
    for (let i = 0; i < 3; i++) {
      const lace = new THREE.Mesh(box(), laceM);
      lace.scale.set(0.06, 0.007, 0.008);
      lace.position.set(0, 0.014, 0.02 + i * 0.035);
      g.add(lace);
    }
    this.shoeGroup = g;
  }

  buildTop(torso, def, cw, width, muscle, skin) {
    if (!def || def.id === 'none') return;
    const tex = patternTexture(def.colors, def.pattern, `top-${def.id}`);
    const m = mat('#ffffff', { roughness: 0.68, map: tex });
    const g = new THREE.Group();
    const shell = new THREE.Mesh(cyl(0.33 * width, 0.25 * width, 0.5, 16, true), m);
    shell.position.y = 0.28;
    shell.scale.z = 0.78;
    g.add(shell);
    if (def.model === 'compression') shell.scale.set(0.98, 1, 0.76);
    if (def.model === 'loose') shell.scale.set(1.08, 1.05, 0.84);
    if (def.model === 'crop') shell.scale.y = 0.62;
    torso.add(g);
    this.topGroup = g;
  }

  buildRobe(body, def, cw) {
    const tex = patternTexture(def.colors, def.pattern, `robe-${def.id}`);
    const m = mat('#ffffff', { roughness: 0.34, map: tex });
    const trimM = mat(def.colors[1] || '#f2c14e', { roughness: 0.35 });
    const g = new THREE.Group();
    const robe = new THREE.Mesh(cyl(0.34, 0.46, 1.0, 18, true), m);
    robe.position.y = 0.34;
    robe.scale.z = 0.8;
    g.add(robe);
    const collar = new THREE.Mesh(cyl(0.36, 0.50, 0.08, 18, true), trimM);
    collar.position.y = 0.82;
    g.add(collar);
    const belt = new THREE.Mesh(cyl(0.35, 0.35, 0.075, 18), trimM);
    belt.position.y = 0.35;
    belt.scale.z = 0.8;
    g.add(belt);
    // Sleeves
    for (const side of [-1, 1]) {
      const sleeve = new THREE.Mesh(cyl(0.11, 0.14, 0.45, 12, true), m);
      sleeve.position.set(side * 0.40, 0.45, 0);
      sleeve.rotation.z = side * 0.12;
      g.add(sleeve);
    }
    if (def.model === 'hood' || def.model === 'royal') {
      const hood = new THREE.Mesh(cyl(0.19, 0.24, 0.24, 14, true), m);
      hood.position.set(0, 0.78, -0.08);
      g.add(hood);
    }
    g.visible = false;
    body.add(g);
    this.robeGroup = g;
  }

  buildMedal(torso) {
    if (!this.appearance.medal || this.appearance.medal === 'none') return;
    const name = MEDAL_NAMES.find((m) => m === this.appearance.medal);
    if (!name) return;
    const color = name.includes('Ouro') ? '#f2c14e' : name.includes('Prata') ? '#cbd5e1' : name.includes('Bronze') ? '#b45309' : '#f2c14e';
    const chainMat = mat('#d4af37', { roughness: 0.25, metalness: 0.8 });
    const chain = new THREE.Mesh(torus(0.12, 0.006, 4, 20), chainMat);
    chain.position.set(0, 0.40, 0.15);
    chain.rotation.x = Math.PI * 0.12;
    torso.add(chain);
    const medal = new THREE.Mesh(cyl(0.04, 0.04, 0.012, 16), mat(color, { roughness: 0.25, metalness: 0.7 }));
    medal.rotation.x = Math.PI / 2;
    medal.position.set(0, 0.28, 0.19);
    torso.add(medal);
  }

  buildTattoos(torso, a) {
    if (!a.tattoo || a.tattoo === 'Nenhuma') return;
    const ink = mat('#1b1b1f', { roughness: 0.85 });
    if (['Dragão', 'Cobra', 'Asas', 'Leão'].includes(a.tattoo)) {
      const t = new THREE.Mesh(sphere(12, 8), ink);
      t.scale.set(0.09, 0.12, 0.012);
      t.position.set(0.17, 0.33, 0.135);
      torso.add(t);
      const t2 = new THREE.Mesh(torus(0.05, 0.012, 4, 12, Math.PI), ink);
      t2.position.set(0.17, 0.37, 0.15);
      t2.rotation.z = 0.4;
      torso.add(t2);
    } else {
      const t = new THREE.Mesh(torus(0.09, 0.008, 4, 14, Math.PI * 1.2), ink);
      t.position.set(-0.16, 0.30, 0.145);
      t.rotation.z = 0.3;
      torso.add(t);
    }
  }

  setRobe(visible) {
    this.robeVisible = visible;
    if (this.robeGroup) this.robeGroup.visible = visible;
  }

  setExpression(name) {
    if (this.expression === name) return;
    this.expression = name;
    const browAngry = name === 'angry' || name === 'shout' || name === 'focused';
    const browHurt = name === 'hurt' || name === 'tired';
    for (const [i, brow] of (this.browParts || []).entries()) {
      const side = i === 0 ? -1 : 1;
      brow.rotation.z = browAngry ? side * 0.28 : browHurt ? side * -0.2 : side * 0.1;
      brow.position.y = browAngry ? 0.128 : browHurt ? 0.138 : 0.133;
    }
    if (this.parts.mouth) {
      const m = this.parts.mouth;
      m.scale.set(name === 'shout' ? 0.055 : name === 'hurt' ? 0.05 : 0.042, name === 'shout' || name === 'hurt' ? 0.028 : name === 'happy' ? 0.012 : 0.009, 0.012);
      m.position.y = name === 'happy' ? 0.006 : 0.005;
    }
    for (const eye of []) { /* eyes are static */ }
    this.expressionType = name;
  }

  flash(color = '#ff6b4a') {
    this.hitFlash = 0.24;
    this.flashColor = color;
  }

  initPose() {
    const base = {
      bodyX: 0.02, bodyY: 0, bodyZ: 0, bob: 0,
      torsoX: 0.06, torsoY: 0.12, torsoZ: 0,
      headX: 0.04, headY: 0, headZ: 0,
      shLX: -1.02, shLY: -0.24, shLZ: 0.15, elL: -1.62,
      shRX: -1.08, shRY: 0.24, shRZ: -0.15, elR: -1.68,
      hipLX: -0.14, hipLZ: 0.03, kneeL: 0.22,
      hipRX: 0.12, hipRZ: -0.03, kneeR: 0.18,
      rootX: 0, rootY: 0, rootZ: 0, rootRotX: 0,
    };
    this.basePose = { ...base };
    this.pose = { ...base };
    this.target = { ...base };
  }

  /**
   * state: { moveX, moveZ, speed, blocking, dodging, dodgeDir, action, actionTime, actionDur, stun, hp, stamina,
   *          knockedDown, victory, defeated, time, expectedExpression, guard, robe }
   */
  update(dt, state = {}) {
    this.time += dt;
    const t = this.time;
    const target = { ...this.basePose };
    const stamina = state.stamina ?? 100;
    const moving = Math.min(1, (Math.abs(state.moveX || 0) + Math.abs(state.moveZ || 0)));
    const tired = stamina < 28;
    const breath = tired ? 1.7 : 1;
    target.bob = Math.sin(t * 2.2 * breath) * (tired ? 0.012 : 0.007);
    target.bodyY = Math.sin(t * 1.3) * 0.015;
    target.rootX = Math.sin(t * 1.1) * 0.008;
    target.torsoX = 0.06 + (tired ? 0.06 : 0);
    target.headX = 0.04 + Math.sin(t * 1.7) * 0.018;
    target.headY = Math.sin(t * 0.8) * 0.035;
    target.shLX = -1.02 + Math.sin(t * 2.1) * 0.02;
    target.shRX = -1.08 + Math.sin(t * 2.1 + 0.4) * 0.02;
    if (tired) {
      target.shLX += 0.22;
      target.shRX += 0.25;
      target.elL += 0.15;
      target.elR += 0.15;
    }
    // Legs: fighting stance and movement
    const stride = Math.sin(t * 9) * 0.25 * moving;
    target.hipLX = -0.14 - stride * (state.moveZ || 0) * 0.7 + Math.abs(state.moveX || 0) * 0.05;
    target.hipRX = 0.12 - stride * (state.moveZ || 0) * 0.7 - Math.abs(state.moveX || 0) * 0.05;
    target.kneeL = 0.22 + Math.abs(stride) * 0.16;
    target.kneeR = 0.18 + Math.abs(stride) * 0.16;
    target.rootX += (state.moveX || 0) * 0.04;
    target.rootY += Math.abs(Math.sin(t * 9)) * 0.012 * moving;
    target.torsoZ = (state.moveX || 0) * -0.05;

    // Blocking
    if (state.blocking) {
      target.shLX = -1.42; target.shRX = -1.48;
      target.shLY = 0.42; target.shRY = -0.42;
      target.elL = -2.12; target.elR = -2.16;
      target.torsoX = 0.12;
      target.headX = 0.11;
      target.hipLX = -0.08; target.hipRX = 0.08;
      target.kneeL = 0.28; target.kneeR = 0.26;
    }

    // Dodge lean
    if (state.dodging) {
      const dir = state.dodgeDir || 1;
      target.bodyZ = dir * 0.38;
      target.torsoZ = dir * 0.18;
      target.headZ = dir * 0.12;
      target.torsoX = -0.04;
      target.rootX += dir * 0.09;
      target.hipLX -= dir * 0.1;
      target.hipRX -= dir * 0.1;
    }

    // Punching actions
    if (state.action && state.action !== 'idle' && state.actionDur) {
      const p = clamp((state.actionTime || 0) / state.actionDur, 0, 1);
      const impact = punchCurve(p);
      const windup = clamp(p / 0.28, 0, 1) * (1 - clamp((p - 0.25) / 0.2, 0, 1));
      this.applyPunchPose(target, state.action, impact, windup, tired);
      if (state.action === 'jab' || state.action === 'cross') target.torsoX += impact * 0.08;
    }

    // Stun / hurt
    if (state.stun > 0) {
      const s = clamp(state.stun, 0, 1);
      target.headX = -0.2 * s - 0.05;
      target.torsoX = -0.1 * s;
      target.bodyZ = Math.sin(t * 22) * 0.08 * s;
      target.shLX += 0.3 * s;
      target.shRX += 0.34 * s;
    }

    // KO fall
    if (state.knockedDown) {
      const fall = clamp(state.fallProgress ?? 1, 0, 1);
      target.rootRotX = -Math.PI / 2 * smoothstep(fall);
      target.rootY = -0.60 * smoothstep(fall);
      target.torsoX = 0.05;
      target.headX = 0.1;
      target.shLX = -2.0; target.shRX = -1.7;
      target.elL = -0.2; target.elR = -0.3;
      target.shLY = 0.5; target.shRY = -0.5;
      target.hipLX = -0.35; target.hipRX = 0.25;
      target.kneeL = 0.6; target.kneeR = 0.4;
      target.bodyZ = 0.1;
    }

    // Victory
    if (state.victory) {
      const jump = Math.abs(Math.sin(t * 3.2));
      target.shLX = -2.85; target.shRX = -2.75;
      target.elL = -0.25; target.elR = -0.3;
      target.shLY = -0.25; target.shRY = 0.25;
      target.headX = -0.12;
      target.torsoX = -0.02;
      target.rootY = jump * 0.04;
      target.hipLX = -0.05; target.hipRX = 0.05;
      target.kneeL = 0.08; target.kneeR = 0.08;
    }
    if (state.defeated) {
      target.torsoX = 0.16;
      target.headX = 0.22;
      target.shLX += 0.4; target.shRX += 0.4;
      target.rootY = 0;
    }
    if (state.entrance) {
      target.rootX = Math.sin(t * 4) * 0.03;
      target.shRX = -2.6 + Math.sin(t * 4) * 0.2;
      target.torsoY = Math.sin(t * 4) * 0.05;
      target.hipLX = -0.1 - Math.sin(t * 6) * 0.25;
      target.hipRX = 0.1 + Math.sin(t * 6) * 0.25;
      target.rootY = Math.abs(Math.sin(t * 6)) * 0.015;
    }

    // Smooth all values (fast for punches, slower for idle)
    const speed = state.action && state.action !== 'idle' ? 32 : state.knockedDown ? 12 : 16;
    for (const key of Object.keys(target)) {
      if (typeof target[key] !== 'number') continue;
      this.pose[key] = damp(this.pose[key] ?? target[key], target[key], speed, dt);
    }
    this.applyPose();

    // hit flash
    if (this.hitFlash > 0) {
      this.hitFlash = Math.max(0, this.hitFlash - dt);
      const intensity = this.hitFlash / 0.24;
      const col = new THREE.Color(this.flashColor || '#ff6b4a');
      this.materials.skin.emissive = col;
      this.materials.skin.emissiveIntensity = intensity * 0.45;
      this.materials.skinShine.emissive = col;
      this.materials.skinShine.emissiveIntensity = intensity * 0.5;
    } else if (this.materials.skin.emissiveIntensity !== 0) {
      this.materials.skin.emissiveIntensity = 0;
      this.materials.skinShine.emissiveIntensity = 0;
    }
  }

  applyPunchPose(target, action, impact, windup, tired) {
    const wobble = tired ? 0.1 : 0;
    switch (action) {
      case 'jab':
        target.shLX = lerp(-1.02, -1.58, impact) + windup * 0.18 + wobble;
        target.shLY = lerp(-0.24, 0.02, impact);
        target.shLZ = lerp(0.15, 0.02, impact);
        target.elL = lerp(-1.62, -0.12, impact);
        target.torsoY = 0.12 + impact * 0.14;
        target.headX += impact * 0.04;
        break;
      case 'cross':
        target.shRX = lerp(-1.08, -1.65, impact) + windup * 0.2 + wobble;
        target.shRY = lerp(0.24, -0.04, impact);
        target.shRZ = lerp(-0.15, -0.02, impact);
        target.elR = lerp(-1.68, -0.1, impact);
        target.torsoY = 0.12 - impact * 0.24;
        target.shLX += impact * -0.05;
        target.elL += impact * 0.2;
        break;
      case 'hook':
        target.shRX = lerp(-1.08, -1.38, impact);
        target.shRY = lerp(0.24, -1.0, impact);
        target.shRZ = lerp(-0.15, -0.45, impact);
        target.elR = lerp(-1.68, -1.55, impact);
        target.torsoY = 0.12 + impact * 0.36;
        target.bodyZ = -impact * 0.08;
        target.shLX += impact * 0.18;
        break;
      case 'uppercut':
        target.shRX = lerp(-1.08, -0.55, impact);
        target.shRY = lerp(0.24, 0.1, impact);
        target.shRZ = lerp(-0.15, 0.02, impact);
        target.elR = lerp(-1.68, -2.45, impact);
        target.torsoX = 0.06 + (impact * 0.22);
        target.torsoY = 0.12 - impact * 0.2;
        target.headX += impact * 0.12;
        target.kneeL += impact * 0.12;
        target.kneeR += impact * 0.1;
        break;
      case 'body':
        target.shRX = lerp(-1.08, -1.1, impact);
        target.elR = lerp(-1.68, -1.9, impact);
        target.torsoX = 0.06 + impact * 0.22;
        target.headX += impact * 0.1;
        break;
      default:
        break;
    }
  }

  applyPose() {
    const p = this.pose;
    this.body.position.set(p.rootX, 0.915 + (p.rootY || 0), p.rootZ || 0);
    this.body.rotation.set(p.rootRotX || 0, p.bodyY || 0, p.bodyZ || 0);
    this.parts.torso.rotation.set(p.torsoX, p.torsoY, p.torsoZ);
    this.parts.torso.position.y = p.bob || 0;
    this.parts.head.rotation.set(p.headX, p.headY, p.headZ);
    const L = this.parts.arms.L, R = this.parts.arms.R;
    L.shoulder.rotation.set(p.shLX, p.shLY, p.shLZ);
    R.shoulder.rotation.set(p.shRX, p.shRY, p.shRZ);
    L.elbow.rotation.x = p.elL;
    R.elbow.rotation.x = p.elR;
    const LL = this.parts.legs.L, RL = this.parts.legs.R;
    LL.hip.rotation.set(p.hipLX, 0, p.hipLZ);
    RL.hip.rotation.set(p.hipRX, 0, p.hipRZ);
    LL.knee.rotation.x = p.kneeL;
    RL.knee.rotation.x = p.kneeR;
    if (this.robeGroup?.visible) {
      this.robeGroup.rotation.set(p.rootRotX || 0, p.bodyY || 0, p.bodyZ || 0);
    }
  }

  getGloveWorld(side = 'R') {
    const g = this.parts.arms[side].glove;
    g.updateWorldMatrix(true, false);
    return new THREE.Vector3().setFromMatrixPosition(g.matrixWorld);
  }

  getHeadWorld() {
    this.parts.head.updateWorldMatrix(true, false);
    return new THREE.Vector3().setFromMatrixPosition(this.parts.head.matrixWorld).add(new THREE.Vector3(0, 0.1 * this.scale, 0));
  }

  getRenderState() {
    return { pose: { ...this.pose }, expression: this.expression, robe: this.robeGroup?.visible, visible: this.root.visible };
  }

  applyRenderState(s) {
    if (!s) return;
    this.pose = { ...s.pose };
    this.setExpression(s.expression);
    if (this.robeGroup) this.robeGroup.visible = !!s.robe;
    this.root.visible = s.visible !== false;
    this.applyPose();
  }

  dispose() {
    this.root.traverse((o) => {
      if (o.isMesh) {
        // Geometries and materials are shared/cached; do not dispose them here.
      }
    });
    this.root.removeFromParent();
  }
}

function weightScale(muscle) {
  return 0.7 + muscle * 0.5;
}

function punchCurve(p) {
  if (p < 0.22) return smoothstep(p / 0.22) * 0.55;
  if (p < 0.42) return 0.55 + smoothstep((p - 0.22) / 0.2) * 0.45;
  if (p < 0.62) return 1;
  return 1 - smoothstep((p - 0.62) / 0.38);
}

// Simple referee / coach NPC using the same rig (shirt added by caller).
export function makeStaff(kind = 'referee') {
  const ref = new Boxer({
    skin: 'sk5', hair: 'hair44', beard: 'none', brow: 'b0', face: 'square', eyes: 'e0', nose: 'n0',
    mouth: 'm1', scar: 's0', height: 0.46, reach: 0.5, muscle: 0.35, width: 0.5,
    shorts: 'shorts68', top: 'none', shoe: 'shoe40', robe: 'robe0', glove: 'glove0', colorway: 'cw28',
    wrap: 'none', headgear: 'none', medal: 'none',
  }, { robe: false });
  if (kind === 'referee') {
    // Striped shirt
    const stripes = document.createElement('canvas');
    stripes.width = 256; stripes.height = 256;
    const ctx = stripes.getContext('2d');
    ctx.fillStyle = '#f5f5f4'; ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = '#111';
    for (let i = 0; i < 8; i++) ctx.fillRect(i * 32, 0, 16, 256);
    const tex = new THREE.CanvasTexture(stripes);
    tex.colorSpace = THREE.SRGBColorSpace;
    const shirtMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8 });
    const shirt = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.27, 0.52, 16, 1, true), shirtMat);
    shirt.position.y = 0.28;
    shirt.scale.z = 0.8;
    ref.parts.torso.add(shirt);
    ref.parts.arms.L.glove.visible = false;
    ref.parts.arms.R.glove.visible = false;
  }
  return ref;
}

export function makeChampionshipBelt(belt) {
  const g = new THREE.Group();
  const strap = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.06, 8, 40, Math.PI * 1.55), new THREE.MeshStandardMaterial({ color: '#2a1212', roughness: 0.7 }));
  strap.rotation.z = Math.PI * 0.72;
  g.add(strap);
  const plateMat = new THREE.MeshStandardMaterial({ map: beltPlateTexture(belt), color: '#ffffff', metalness: 0.75, roughness: 0.28 });
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.37, 0.37, 0.045, 32), plateMat);
  plate.rotation.x = Math.PI / 2;
  plate.position.set(0, 0.03, 0.02);
  g.add(plate);
  for (const side of [-1, 1]) {
    const sidePlate = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.035, 24), plateMat);
    sidePlate.rotation.x = Math.PI / 2;
    sidePlate.position.set(side * 0.62, -0.02, 0.0);
    g.add(sidePlate);
  }
  g.scale.setScalar(0.9);
  return g;
}
