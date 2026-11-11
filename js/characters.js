import * as THREE from '../vendor/three.module.js';

const MATS = new Map();
function mat(color, opts = {}) {
  const key = color + JSON.stringify(opts);
  if (MATS.has(key)) return MATS.get(key);
  const m = new THREE.MeshStandardMaterial({
    color, roughness: opts.roughness ?? .8, metalness: opts.metalness ?? .05,
    emissive: opts.emissive ?? 0x000000, emissiveIntensity: opts.emissiveIntensity ?? 1,
    flatShading: opts.flat ?? true, transparent: opts.transparent || false, opacity: opts.opacity ?? 1,
    side: opts.side || THREE.FrontSide
  });
  MATS.set(key, m);
  return m;
}
function box(w, h, d, color, opts) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color, opts));
  m.castShadow = true; m.receiveShadow = true;
  return m;
}
function sphere(r, color, opts = {}) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, opts.seg || 12, opts.ring || 9), mat(color, opts));
  m.scale.set(opts.sx ?? 1, opts.sy ?? 1, opts.sz ?? 1);
  m.castShadow = true; m.receiveShadow = true;
  return m;
}
function cyl(rt, rb, h, color, opts = {}) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, opts.seg || 10), mat(color, opts));
  m.castShadow = true; m.receiveShadow = true;
  return m;
}
function capsule(r, len, color, opts = {}) {
  const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 4, 8), mat(color, opts));
  m.castShadow = true; m.receiveShadow = true;
  return m;
}
function place(mesh, x, y, z) { mesh.position.set(x, y, z); return mesh; }

function addEyes(head, headR, colors, expression = 'normal') {
  const eyeMatW = mat('#f4f1e4', { flat: false });
  const eyeMatB = mat('#181411');
  for (const side of [-1, 1]) {
    const white = new THREE.Mesh(new THREE.SphereGeometry(headR * .18, 10, 8), eyeMatW);
    white.position.set(side * headR * .34, headR * .17, headR * .83);
    head.add(white);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(headR * .075, 8, 6), eyeMatB);
    pupil.position.set(side * headR * .34 + (side * .012), headR * .16, headR * .98);
    head.add(pupil);
    const brow = box(headR * .34, headR * .065, headR * .1, colors.hair || '#2a2119');
    brow.position.set(side * headR * .34, headR * .38, headR * .9);
    brow.rotation.z = side * (expression === 'angry' ? .25 : -.12);
    head.add(brow);
  }
}

function buildHead(g, c, headY, headR, rig) {
  const head = new THREE.Group();
  head.position.set(0, headY, 0);
  g.add(head);
  const skull = sphere(headR, c.colors.skin, { sx: 1.05, sy: 1.12, sz: .95, seg: 14, ring: 10 });
  head.add(skull);
  const jaw = sphere(headR * .72, c.colors.skin, { sx: 1.15, sy: .75, sz: .95, seg: 12, ring: 8 });
  jaw.position.set(0, -headR * .42, headR * .1);
  head.add(jaw);
  // ears
  for (const s of [-1, 1]) {
    const ear = sphere(headR * .22, c.colors.skin, { sx: .65, sy: 1, sz: .8, seg: 8, ring: 6 });
    ear.position.set(s * headR * 1.02, 0, 0);
    head.add(ear);
  }
  addEyes(head, headR, c.colors);
  // nose
  const nose = sphere(headR * .17, c.colors.skin, { sx: .9, sy: 1.1, sz: 1.3, seg: 8, ring: 6 });
  nose.position.set(0, -headR * .08, headR * .96);
  head.add(nose);
  // mouth / expression geometry
  const mouth = box(headR * .38, headR * .07, headR * .07, '#6b322c');
  mouth.position.set(0, -headR * .6, headR * .9);
  head.add(mouth);
  rig.mouth = mouth;
  rig.head = head;
  rig.skull = skull;

  // facial hair / masks per character
  switch (c.face) {
    case 'mustache': {
      for (const s of [-1, 1]) {
        const m = box(headR * .3, headR * .12, headR * .16, c.colors.hair);
        m.position.set(s * headR * .2, -headR * .45, headR * .98);
        m.rotation.z = s * .18;
        head.add(m);
      }
      break;
    }
    case 'cheeks': {
      for (const s of [-1, 1]) {
        const cheek = sphere(headR * .24, '#df8e88', { sx: 1, sy: .7, sz: .35, seg: 8, ring: 6 });
        cheek.position.set(s * headR * .52, -headR * .26, headR * .83);
        head.add(cheek);
      }
      const glasses = box(headR * .62, headR * .13, headR * .1, '#c9b46b', { metalness: .6, roughness: .35 });
      glasses.position.set(0, headR * .17, headR * 1.02);
      head.add(glasses);
      break;
    }
    case 'monocle': {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(headR * .23, headR * .035, 6, 14), mat('#c8aa4e', { metalness: .8, roughness: .28 }));
      ring.position.set(headR * .34, headR * .17, headR * 1.0);
      head.add(ring);
      const chain = box(headR * .04, headR * .5, headR * .04, '#c8aa4e', { metalness: .8, roughness: .3 });
      chain.position.set(headR * .58, -headR * .12, headR * .92); chain.rotation.z = -.35;
      head.add(chain);
      break;
    }
    case 'buck': {
      const tooth = box(headR * .12, headR * .12, headR * .05, '#f2ead8');
      tooth.position.set(0, -headR * .58, headR * .94);
      head.add(tooth);
      break;
    }
    case 'shades': {
      for (const s of [-1, 1]) {
        const lens = box(headR * .42, headR * .23, headR * .06, '#12191b', { roughness: .18, metalness: .6 });
        lens.position.set(s * headR * .27, headR * .17, headR * 1.0);
        head.add(lens);
      }
      const bridge = box(headR * .18, headR * .05, headR * .05, '#12191b');
      bridge.position.set(0, headR * .18, headR * 1.02);
      head.add(bridge);
      break;
    }
    case 'goggles': {
      for (const s of [-1, 1]) {
        const lens = cyl(headR * .23, headR * .23, headR * .12, '#4b6a3a', { seg: 12, emissive: '#a6e660', emissiveIntensity: .45, roughness: .2 });
        lens.rotation.x = Math.PI / 2;
        lens.position.set(s * headR * .32, headR * .2, headR * .99);
        head.add(lens);
      }
      const band = box(headR * 2.05, headR * .16, headR * .12, '#1f2b1d');
      band.position.set(0, headR * .22, 0);
      head.add(band);
      break;
    }
    case 'freckles': {
      for (const s of [-1, 1]) for (let i = 0; i < 3; i++) {
        const f = sphere(headR * .035, '#985d42', { seg: 5, ring: 4 });
        f.position.set(s * (headR * .35 + (i % 2) * headR * .08), -headR * .05 - i * headR * .1, headR * .92);
        head.add(f);
      }
      break;
    }
    case 'gas': {
      const mask = sphere(headR * .8, '#3e3e36', { sx: 1.1, sy: 1.0, sz: .85, seg: 12, ring: 8 });
      mask.position.set(0, -headR * .1, headR * .32);
      head.add(mask);
      for (const s of [-1, 1]) {
        const lens = cyl(headR * .19, headR * .19, headR * .12, '#8f9d6a', { seg: 12, emissive: '#b6d476', emissiveIntensity: .22, roughness: .2 });
        lens.rotation.x = Math.PI / 2;
        lens.position.set(s * headR * .3, headR * .1, headR * .93);
        head.add(lens);
      }
      const filter = cyl(headR * .24, headR * .27, headR * .35, '#243124', { seg: 10, metalness: .3 });
      filter.rotation.x = Math.PI / 2;
      filter.position.set(0, -headR * .38, headR * .98);
      head.add(filter);
      break;
    }
    case 'smile': {
      const smile = new THREE.Mesh(new THREE.TorusGeometry(headR * .2, headR * .025, 5, 14, Math.PI), mat('#5f2d26'));
      smile.rotation.z = Math.PI;
      smile.position.set(0, -headR * .57, headR * .93);
      head.add(smile);
      break;
    }
    case 'beard': {
      const beard = sphere(headR * .72, '#cfc3a6', { sx: 1.08, sy: .72, sz: .8, seg: 10, ring: 7 });
      beard.position.set(0, -headR * .55, headR * .38);
      head.add(beard);
      break;
    }
    case 'goggle': {
      const lens = cyl(headR * .26, headR * .26, headR * .15, '#7c4d3a', { seg: 12, roughness: .25, metalness: .2 });
      lens.rotation.x = Math.PI / 2;
      lens.position.set(0, headR * .18, headR * .98);
      head.add(lens);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(headR * .28, headR * .04, 6, 16), mat('#2b2119', { metalness: .5 }));
      rim.position.set(0, headR * .18, headR * 1.01);
      head.add(rim);
      break;
    }
    case 'robot': {
      const plate = box(headR * .95, headR * .5, headR * .35, '#5c6d78', { metalness: .65, roughness: .3 });
      plate.position.set(-headR * .26, headR * .16, headR * .92);
      head.add(plate);
      const eye = sphere(headR * .17, '#48f2d2', { emissive: '#48f2d2', emissiveIntensity: 3.2, seg: 10, ring: 6 });
      eye.position.set(-headR * .26, headR * .17, headR * 1.1);
      head.add(eye);
      rig.robotEye = eye;
      break;
    }
  }
  return head;
}

function buildHelmet(head, c, headR, rig) {
  switch (c.helmet) {
    case 'huge': {
      const helm = new THREE.Mesh(new THREE.SphereGeometry(headR * 1.35, 16, 10, 0, Math.PI * 2, 0, Math.PI * .62), mat(c.colors.secondary, { roughness: .7, metalness: .15 }));
      helm.position.y = headR * .15;
      helm.castShadow = true;
      head.add(helm);
      const brim = cyl(headR * 1.45, headR * 1.42, headR * .13, c.colors.secondary, { seg: 16 });
      brim.position.y = headR * .35;
      head.add(brim);
      const band = cyl(headR * 1.37, headR * 1.37, headR * .12, c.colors.accent, { seg: 18, emissive: c.colors.accent, emissiveIntensity: .18 });
      band.position.y = headR * .1;
      head.add(band);
      break;
    }
    case 'headset': {
      const band = new THREE.Mesh(new THREE.TorusGeometry(headR * 1.03, headR * .06, 6, 16, Math.PI), mat('#2d2723'));
      band.rotation.z = 0; band.position.y = headR * .1;
      head.add(band);
      for (const s of [-1, 1]) {
        const cup = cyl(headR * .27, headR * .27, headR * .2, c.colors.accent, { seg: 12, roughness: .55 });
        cup.rotation.z = Math.PI / 2;
        cup.position.set(s * headR * 1.05, 0, 0);
        head.add(cup);
        const pad = cyl(headR * .18, headR * .2, headR * .08, '#31251f', { seg: 10 });
        pad.rotation.z = Math.PI / 2;
        pad.position.set(s * headR * 1.18, 0, 0);
        head.add(pad);
      }
      const bun = sphere(headR * .38, c.colors.hair, { seg: 9, ring: 7 });
      bun.position.set(0, headR * .75, -headR * .45);
      head.add(bun);
      break;
    }
    case 'beret': {
      const beret = cyl(headR * .6, headR * 1.1, headR * .28, c.colors.secondary, { seg: 14 });
      beret.position.set(headR * .18, headR * .72, 0);
      beret.rotation.z = -.18;
      head.add(beret);
      const badge = sphere(headR * .16, c.colors.accent, { emissive: c.colors.accent, emissiveIntensity: .2, seg: 8, ring: 6 });
      badge.position.set(headR * .12, headR * .72, headR * .85);
      head.add(badge);
      break;
    }
    case 'mohawk': {
      for (let i = 0; i < 6; i++) {
        const spike = cyl(0, headR * .18, headR * (.55 + i * .03), c.colors.hair, { seg: 5 });
        spike.position.set(0, headR * (1.0 + i * .06), headR * (.4 - i * .16));
        spike.rotation.x = .2;
        head.add(spike);
      }
      const band = cyl(headR * 1.02, headR * 1.02, headR * .18, c.colors.accent, { seg: 14, emissive: c.colors.accent, emissiveIntensity: .2 });
      band.position.y = headR * .42;
      head.add(band);
      break;
    }
    case 'bucket': {
      const bucket = cyl(headR * .72, headR * 1.1, headR * 1.05, c.colors.secondary, { seg: 12, metalness: .3, roughness: .65 });
      bucket.position.y = headR * .65;
      head.add(bucket);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(headR * 1.1, headR * .05, 5, 16), mat('#2a2a26'));
      rim.rotation.x = Math.PI / 2; rim.position.y = headR * .14;
      head.add(rim);
      break;
    }
    case 'hazmat': {
      const hood = sphere(headR * 1.16, '#c1b258', { sx: 1.05, sy: 1.05, sz: 1, transparent: true, opacity: .92, roughness: .8, seg: 12, ring: 8 });
      hood.position.y = headR * .12;
      head.add(hood);
      const mask = sphere(headR * .7, '#3d4635', { sx: 1.1, sy: .9, sz: .8, seg: 10, ring: 7 });
      mask.position.set(0, -headR * .1, headR * .42);
      head.add(mask);
      const filter = cyl(headR * .2, headR * .24, headR * .3, '#202820', { seg: 9 });
      filter.rotation.x = Math.PI / 2;
      filter.position.set(0, -headR * .3, headR * .98);
      head.add(filter);
      break;
    }
    case 'cap': {
      const cap = new THREE.Mesh(new THREE.SphereGeometry(headR * 1.05, 12, 8, 0, Math.PI * 2, 0, Math.PI * .52), mat(c.colors.secondary));
      cap.position.y = headR * .12; head.add(cap);
      const brim = box(headR * 1.4, headR * .08, headR * .75, c.colors.secondary);
      brim.position.set(0, headR * .38, headR * .78); brim.rotation.x = -.1; head.add(brim);
      const patch = box(headR * .28, headR * .22, headR * .04, c.colors.accent);
      patch.position.set(0, headR * .5, headR * .82); head.add(patch);
      break;
    }
    case 'gashelm': {
      const helm = new THREE.Mesh(new THREE.SphereGeometry(headR * 1.2, 14, 9, 0, Math.PI * 2, 0, Math.PI * .65), mat(c.colors.secondary, { roughness: .55, metalness: .35 }));
      helm.position.y = headR * .1; head.add(helm);
      const antenna = cyl(.02, .04, headR * 1.4, '#3b3128', { seg: 5 });
      antenna.position.set(headR * .65, headR * 1.1, 0); antenna.rotation.z = -.25; head.add(antenna);
      const knob = sphere(headR * .09, c.colors.accent, { emissive: c.colors.accent, emissiveIntensity: 1.6 });
      knob.position.set(headR * .82, headR * 1.74, 0); head.add(knob);
      break;
    }
    case 'pineapple': {
      const fruit = sphere(headR * 1.25, '#c5a83d', { sx: 1.05, sy: 1.25, sz: 1.05, seg: 12, ring: 9 });
      fruit.position.y = headR * .48; head.add(fruit);
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        const leaf = cyl(0, headR * .12, headR * .9, '#3f6d37', { seg: 4 });
        leaf.position.set(Math.cos(a) * headR * .35, headR * 1.55, Math.sin(a) * headR * .35);
        leaf.rotation.z = Math.cos(a) * .5; leaf.rotation.x = Math.sin(a) * -.5;
        head.add(leaf);
      }
      for (let i = 0; i < 8; i++) {
        const stripe = box(headR * .04, headR * .55, headR * .04, '#7d6826');
        const a = (i / 8) * Math.PI * 2;
        stripe.position.set(Math.cos(a) * headR * 1.08, headR * .42, Math.sin(a) * headR * 1.08);
        stripe.rotation.z = .2; stripe.rotation.x = a;
        head.add(stripe);
      }
      break;
    }
    case 'straw': {
      const brim = cyl(headR * 1.75, headR * 1.75, headR * .09, '#b99b59', { seg: 18, roughness: 1 });
      brim.position.y = headR * .65; head.add(brim);
      const dome = cyl(headR * .62, headR * 1.0, headR * .6, '#c7a968', { seg: 12, roughness: 1 });
      dome.position.y = headR * .92; head.add(dome);
      const band = cyl(headR * .98, headR * 1.02, headR * .13, '#7d5c32', { seg: 14 });
      band.position.y = headR * .7; head.add(band);
      break;
    }
    case 'lollipop': {
      const stick = cyl(.025, .025, headR * 1.1, '#e6d7bd', { seg: 6 });
      stick.position.y = headR * 1.18; head.add(stick);
      const ball = sphere(headR * .82, '#d95b76', { sx: 1, sy: 1, sz: .32, seg: 18, ring: 12 });
      ball.position.y = headR * 1.82; head.add(ball);
      const spiral = new THREE.Mesh(new THREE.TorusGeometry(headR * .55, headR * .05, 5, 24), mat('#f7e9d2'));
      spiral.position.set(0, headR * 1.82, headR * .32); head.add(spiral);
      const spiral2 = new THREE.Mesh(new THREE.TorusGeometry(headR * .3, headR * .045, 5, 18), mat('#f7e9d2'));
      spiral2.position.set(0, headR * 1.82, headR * .33); head.add(spiral2);
      break;
    }
    case 'cyborg': {
      const plate = new THREE.Mesh(new THREE.SphereGeometry(headR * 1.17, 14, 9, 0, Math.PI * 2, 0, Math.PI * .6), mat('#394a54', { metalness: .72, roughness: .3 }));
      plate.position.y = headR * .12; head.add(plate);
      const stripe = box(headR * .12, headR * .9, headR * 1.2, c.colors.accent, { emissive: c.colors.accent, emissiveIntensity: .4 });
      stripe.position.set(headR * .95, headR * .5, 0); head.add(stripe);
      const antenna = cyl(.015, .03, headR * 1.2, '#44525a', { seg: 5 });
      antenna.position.set(-headR * .6, headR * 1.1, 0); antenna.rotation.z = .3; head.add(antenna);
      break;
    }
  }
}

export function createCharacter(c, opts = {}) {
  const root = new THREE.Group();
  const inner = new THREE.Group();
  root.add(inner);
  const rig = { body: inner };
  const s = c.body.height;
  const hipY = .78 * s;
  const torsoY = hipY + .4 * s;
  const torsoR = .46 * s;
  const headR = .3 * s * c.body.head;
  const headY = torsoY + .42 * s + headR * .7;

  // legs
  for (const side of [-1, 1]) {
    const legGroup = new THREE.Group();
    legGroup.position.set(side * .2 * s, hipY, 0);
    inner.add(legGroup);
    const leg = capsule(.12 * s, .44 * s, c.colors.secondary, { roughness: .9 });
    leg.position.y = -.33 * s;
    legGroup.add(leg);
    const knee = box(.25 * s, .12 * s, .26 * s, c.colors.primary);
    knee.position.y = -.38 * s; legGroup.add(knee);
    const boot = box(.25 * s, .17 * s, .42 * s, '#2b2721');
    boot.position.set(0, -.69 * s, .07 * s); legGroup.add(boot);
    const sole = box(.26 * s, .055 * s, .45 * s, '#111312');
    sole.position.set(0, -.78 * s, .07 * s); legGroup.add(sole);
    rig[side < 0 ? 'leftLeg' : 'rightLeg'] = legGroup;
  }

  // torso
  const torso = new THREE.Group();
  torso.position.y = torsoY;
  inner.add(torso);
  rig.torso = torso;
  const belly = sphere(torsoR * 1.2, c.colors.primary, { sx: c.body.belly, sy: .98, sz: .82, seg: 14, ring: 10 });
  torso.add(belly);
  const chest = box(torsoR * 1.7, .5 * s, torsoR * 1.1, c.colors.secondary);
  chest.position.set(0, .12 * s, .02); torso.add(chest);
  // straps
  for (const side of [-1, 1]) {
    const strap = box(.09 * s, .82 * s, .04 * s, '#25251f');
    strap.position.set(side * .22 * s, -.05 * s, torsoR * .88);
    strap.rotation.z = side * .12;
    torso.add(strap);
  }
  // belt
  const belt = cyl(torsoR * 1.12 * c.body.belly, torsoR * 1.08 * c.body.belly, .11 * s, '#29261f', { seg: 14 });
  belt.position.y = -.32 * s; torso.add(belt);
  const buckle = box(.18 * s, .12 * s, .05 * s, '#b7984a', { metalness: .6, roughness: .4 });
  buckle.position.set(0, -.32 * s, torsoR * .82); torso.add(buckle);
  // shoulder pads
  for (const side of [-1, 1]) {
    const pad = sphere(torsoR * .4, c.colors.secondary, { sx: 1, sy: .6, sz: 1, seg: 8, ring: 6 });
    pad.position.set(side * torsoR * 1.1, .34 * s, 0);
    torso.add(pad);
  }
  // neck
  const neck = cyl(.11 * s, .13 * s, .16 * s, c.colors.skin, { seg: 8 });
  neck.position.y = .43 * s; torso.add(neck);

  // arms
  for (const side of [-1, 1]) {
    const armGroup = new THREE.Group();
    armGroup.position.set(side * torsoR * 1.22, .3 * s, 0);
    torso.add(armGroup);
    const upper = capsule(.105 * s * c.body.arms, .4 * s, c.colors.secondary, { roughness: .9 });
    upper.position.y = -.24 * s;
    armGroup.add(upper);
    const pad = sphere(.16 * s, c.colors.primary, { sx: 1.1, sy: .8, sz: 1, seg: 8, ring: 6 });
    pad.position.y = -.02 * s; armGroup.add(pad);
    const hand = sphere(.115 * s, c.colors.skin, { seg: 9, ring: 7 });
    hand.position.y = -.51 * s; armGroup.add(hand);
    if (c.helmet === 'cyborg' && side > 0) {
      upper.material = mat('#5c6d78', { metalness: .7, roughness: .3 });
      const plate = box(.18 * s, .3 * s, .16 * s, '#394a54', { metalness: .7, roughness: .3 });
      plate.position.y = -.25 * s; armGroup.add(plate);
      const glow = sphere(.06 * s, '#48f2d2', { emissive: '#48f2d2', emissiveIntensity: 3 });
      glow.position.set(.08 * s, -.24 * s, .1 * s); armGroup.add(glow);
    }
    rig[side < 0 ? 'leftArm' : 'rightArm'] = armGroup;
    armGroup.rotation.z = side * .16;
  }

  // head
  const head = buildHead(inner, c, headY, headR, rig);
  head.rotation.y = .05;
  buildHelmet(head, c, headR, rig);

  // accessories
  const acc = c.accessory;
  if (acc === 'flag') {
    const badge = new THREE.Group();
    const bg = box(.23 * s, .17 * s, .03 * s, '#2f6d39'); bg.position.set(-torsoR * 1.02, .22 * s, torsoR * .58); badge.add(bg);
    const diamond = new THREE.Mesh(new THREE.CircleGeometry(.065 * s, 4), mat('#e8cf4a'));
    diamond.position.set(-torsoR * 1.02, .22 * s, torsoR * .61); diamond.rotation.z = 0; badge.add(diamond);
    torso.add(badge);
    const bandolier = box(.14 * s, .95 * s, .06 * s, '#51472e');
    bandolier.position.set(.24 * s, -.03 * s, torsoR * .93); bandolier.rotation.z = -.6; torso.add(bandolier);
    for (let i = -2; i <= 2; i++) {
      const bullet = cyl(.025 * s, .025 * s, .13 * s, '#c8a451', { seg: 6, metalness: .6 });
      bullet.position.set(.24 * s + i * .09 * s, -.03 * s + i * .11 * s, torsoR * .98);
      bullet.rotation.z = -.6; torso.add(bullet);
    }
  }
  if (acc === 'scarf') {
    const scarf = new THREE.Mesh(new THREE.TorusGeometry(torsoR * .55, .08 * s, 6, 16), mat(c.colors.accent, { roughness: .95 }));
    scarf.rotation.x = Math.PI / 2; scarf.position.y = .4 * s; torso.add(scarf);
    const tail = box(.14 * s, .5 * s, .05 * s, c.colors.accent);
    tail.position.set(.25 * s, .14 * s, -torsoR * .78); tail.rotation.z = -.2; torso.add(tail);
  }
  if (acc === 'medals') {
    for (let i = 0; i < 3; i++) {
      const medal = cyl(.055 * s, .055 * s, .025 * s, ['#d7b24a', '#c7c7c7', '#b87333'][i], { seg: 10, metalness: .75, roughness: .3 });
      medal.rotation.x = Math.PI / 2;
      medal.position.set(-.16 * s + i * .14 * s, .23 * s, torsoR * .98);
      torso.add(medal);
    }
    const ribbon = box(.12 * s, .38 * s, .04 * s, c.colors.accent);
    ribbon.position.set(-.16 * s, .42 * s, torsoR * .95); ribbon.rotation.z = .2; torso.add(ribbon);
  }
  if (acc === 'radio') {
    const radio = box(.16 * s, .22 * s, .08 * s, '#222a23');
    radio.position.set(torsoR * 1.02, .3 * s, torsoR * .25); torso.add(radio);
    const antenna = cyl(.012 * s, .02 * s, .38 * s, '#1a1e1a', { seg: 5 });
    antenna.position.set(torsoR * 1.04, .6 * s, torsoR * .25); torso.add(antenna);
    const led = sphere(.025 * s, '#ff5a42', { emissive: '#ff5a42', emissiveIntensity: 2 });
    led.position.set(torsoR * 1.05, .34 * s, torsoR * .3); torso.add(led);
  }
  if (acc === 'sandwich') {
    const bread1 = box(.16 * s, .06 * s, .16 * s, '#d7b06a'); bread1.position.set(-torsoR * 1.02, .18 * s, torsoR * .35); torso.add(bread1);
    const cheese = box(.17 * s, .025 * s, .17 * s, '#e6c849'); cheese.position.set(-torsoR * 1.02, .22 * s, torsoR * .35); torso.add(cheese);
    const bread2 = box(.16 * s, .05 * s, .16 * s, '#c99a52'); bread2.position.set(-torsoR * 1.02, .25 * s, torsoR * .35); torso.add(bread2);
  }
  if (acc === 'dynamite') {
    for (let i = 0; i < 4; i++) {
      const stick = cyl(.04 * s, .04 * s, .3 * s, i % 2 ? '#b9342f' : '#d04936', { seg: 7 });
      stick.position.set(-.28 * s + i * .085 * s, .15 * s, torsoR * .93); torso.add(stick);
      const cap = cyl(.043 * s, .043 * s, .04 * s, '#232323', { seg: 7 });
      cap.position.set(-.28 * s + i * .085 * s, .11 * s, torsoR * .93); torso.add(cap);
    }
  }
  if (acc === 'backpack') {
    const pack = box(.5 * s, .55 * s, .26 * s, '#45513d');
    pack.position.set(0, .05 * s, -torsoR * .9); torso.add(pack);
    const roll = cyl(.1 * s, .1 * s, .48 * s, '#7c6243', { seg: 8 });
    roll.rotation.z = Math.PI / 2; roll.position.set(0, .35 * s, -torsoR * .98); torso.add(roll);
    const ruler = box(.03 * s, .4 * s, .03 * s, '#d9c46a');
    ruler.position.set(.2 * s, .1 * s, -torsoR * 1.04); ruler.rotation.z = .4; torso.add(ruler);
  }
  if (acc === 'tank') {
    const tank = cyl(.18 * s, .18 * s, .8 * s, '#555c3d', { seg: 12, metalness: .3 });
    tank.position.set(0, .1 * s, -torsoR * 1.05); torso.add(tank);
    for (const side of [-1, 1]) {
      const strap = box(.07 * s, .85 * s, .04 * s, '#2e3024');
      strap.position.set(side * .23 * s, .06 * s, -torsoR * .77); torso.add(strap);
    }
  }
  if (acc === 'shirt') {
    for (let i = 0; i < 5; i++) {
      const flower = sphere(.055 * s, ['#f1cf53', '#ef7c9d', '#f4eee1'][i % 3], { sx: 1, sy: 1, sz: .2, seg: 6, ring: 4 });
      flower.position.set(-.4 * s + i * .2 * s, -.12 * s + (i % 2) * .1 * s, torsoR * .92);
      torso.add(flower);
    }
  }
  if (acc === 'pouch') {
    for (const side of [-1, 1]) {
      const pouch = box(.18 * s, .18 * s, .1 * s, '#6e5a35');
      pouch.position.set(side * .28 * s, -.25 * s, torsoR * .78); torso.add(pouch);
    }
    const rope = new THREE.Mesh(new THREE.TorusGeometry(.05 * s, .012 * s, 4, 10), mat('#b0985d'));
    rope.position.set(torsoR * .5, -.05 * s, torsoR * .6); torso.add(rope);
  }
  if (acc === 'epaulettes') {
    for (const side of [-1, 1]) {
      const ep = box(.32 * s, .08 * s, .24 * s, '#c3a44e', { metalness: .6, roughness: .35 });
      ep.position.set(side * torsoR * 1.05, .38 * s, 0); torso.add(ep);
      for (let i = -1; i <= 1; i++) {
        const fringe = cyl(.015 * s, .015 * s, .14 * s, '#c3a44e', { seg: 4, metalness: .6 });
        fringe.position.set(side * torsoR * 1.05 + i * .08 * s, .31 * s, .12 * s); torso.add(fringe);
      }
    }
  }

  // weapon prop (low poly, held at hip)
  const gun = new THREE.Group();
  gun.position.set(.28 * s, hipY + .18 * s, .3 * s);
  gun.rotation.set(.08, -.12, -.04);
  const gunMetal = mat('#2a2d2c', { metalness: .55, roughness: .4 });
  const gunAccent = mat(c.colors.accent, { metalness: .35, roughness: .5, emissive: c.colors.accent, emissiveIntensity: .08 });
  const bodyG = new THREE.Mesh(new THREE.BoxGeometry(.13 * s, .16 * s, .62 * s), gunMetal); gun.add(bodyG);
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(.035 * s, .04 * s, .36 * s, 8), gunMetal);
  barrel.rotation.x = Math.PI / 2; barrel.position.set(0, .04 * s, .42 * s); gun.add(barrel);
  const mag = new THREE.Mesh(new THREE.BoxGeometry(.09 * s, .24 * s, .12 * s), gunAccent);
  mag.position.set(0, -.14 * s, -.04 * s); mag.rotation.x = .2; gun.add(mag);
  const stock = new THREE.Mesh(new THREE.BoxGeometry(.1 * s, .12 * s, .25 * s), gunMetal);
  stock.position.set(0, 0, -.4 * s); gun.add(stock);
  const sight = new THREE.Mesh(new THREE.BoxGeometry(.05 * s, .06 * s, .14 * s), gunAccent);
  sight.position.set(0, .11 * s, .1 * s); gun.add(sight);
  gun.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  inner.add(gun);
  rig.gun = gun;

  inner.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  root.userData.rig = rig;
  root.userData.character = c;
  root.userData.isCharacter = true;
  root.userData.animState = opts.anim || 'idle';
  root.userData.animStart = 0;
  return root;
}

/* Animation for detailed menu characters */
export function poseCharacter(root, t, anim = 'idle') {
  const rig = root.userData.rig;
  if (!rig) return;
  const idle = anim === 'idle';
  const breathe = Math.sin(t * 1.9) * .012;
  rig.body.position.y = idle ? breathe : rig.body.position.y * .94;
  rig.torso.rotation.x = idle ? Math.sin(t * 1.9) * .018 : 0;
  rig.torso.rotation.z = idle ? Math.sin(t * .7) * .02 : 0;
  rig.head.rotation.y = idle ? .05 + Math.sin(t * .8) * .06 : 0;
  rig.head.rotation.x = idle ? Math.sin(t * 1.1) * .02 : 0;
  rig.leftArm.rotation.z = .16 + Math.sin(t * 1.5) * .02;
  rig.rightArm.rotation.z = -.16 - Math.sin(t * 1.5 + 1) * .02;
  rig.leftArm.rotation.x = Math.sin(t * 1.5) * .02;
  rig.rightArm.rotation.x = -Math.sin(t * 1.5 + 1) * .02;
  rig.mouth.scale.y = 1;

  if (anim === 'win') {
    const k = Math.sin(t * 6);
    rig.body.position.y = Math.abs(Math.sin(t * 5)) * .09;
    rig.leftArm.rotation.z = 1.9 + Math.sin(t * 6) * .25;
    rig.rightArm.rotation.z = -1.9 - Math.sin(t * 6 + 1) * .25;
    rig.leftArm.rotation.x = .2; rig.rightArm.rotation.x = .2;
    rig.head.rotation.x = -.15;
    rig.mouth.scale.y = 1.6;
  } else if (anim === 'lose') {
    rig.body.position.y = -.09;
    rig.torso.rotation.x = .2;
    rig.head.rotation.x = .55;
    rig.leftArm.rotation.z = -.06; rig.rightArm.rotation.z = .06;
    rig.leftArm.rotation.x = .1; rig.rightArm.rotation.x = .1;
  } else if (anim === 'entry') {
    const step = Math.sin(t * 7);
    rig.leftLeg.rotation.x = step * .6;
    rig.rightLeg.rotation.x = -step * .6;
    rig.leftArm.rotation.x = -step * .5;
    rig.rightArm.rotation.x = step * .5;
    rig.body.position.y = Math.abs(Math.sin(t * 7)) * .035;
    rig.torso.rotation.y = Math.sin(t * 3.5) * .08;
  } else {
    rig.leftLeg.rotation.x = 0; rig.rightLeg.rotation.x = 0;
  }
}

/* Simplified but recognizable in-game bot with hit meshes */
const BOT_GEO = {
  box: new THREE.BoxGeometry(1, 1, 1),
  sphere: new THREE.SphereGeometry(1, 10, 8),
  capsule: new THREE.CapsuleGeometry(1, 1, 3, 7)
};

export function createBotModel(c, teamColor, name) {
  const root = new THREE.Group();
  const rig = { root };
  const s = c.body.height;
  const torsoR = .42 * s;
  const hipY = .82 * s;
  const torsoY = hipY + .42 * s;
  const headR = .3 * s * c.body.head;
  const headY = torsoY + .48 * s;
  const vestColor = teamColor;
  const bodyMat = mat(c.colors.primary, { roughness: .9 });
  const teamMat = mat(vestColor, { roughness: .7, emissive: vestColor, emissiveIntensity: .06 });
  const skinMat = mat(c.colors.skin);
  const darkMat = mat('#20241f', { roughness: .9 });

  // legs
  for (const side of [-1, 1]) {
    const leg = new THREE.Group();
    leg.position.set(side * .2 * s, hipY, 0);
    root.add(leg);
    const limb = new THREE.Mesh(BOT_GEO.box, darkMat);
    limb.scale.set(.22 * s, .7 * s, .25 * s); limb.position.y = -.38 * s;
    limb.castShadow = true; leg.add(limb);
    const boot = new THREE.Mesh(BOT_GEO.box, mat('#171a17'));
    boot.scale.set(.25 * s, .16 * s, .38 * s); boot.position.set(0, -.76 * s, .06 * s);
    boot.castShadow = true; leg.add(boot);
    rig[side < 0 ? 'leftLeg' : 'rightLeg'] = leg;
  }
  // torso group
  const torso = new THREE.Group();
  torso.position.y = torsoY;
  root.add(torso);
  const belly = new THREE.Mesh(BOT_GEO.sphere, bodyMat);
  belly.scale.set(torsoR * 1.22 * c.body.belly, .59 * s, torsoR * .9);
  belly.castShadow = true; belly.userData.hit = { part: 'body' }; torso.add(belly);
  const vest = new THREE.Mesh(BOT_GEO.box, teamMat);
  vest.scale.set(torsoR * 1.75, .45 * s, torsoR * 1.08); vest.position.y = .14 * s;
  vest.castShadow = true; vest.userData.hit = { part: 'body' }; torso.add(vest);
  const belt = new THREE.Mesh(BOT_GEO.box, darkMat);
  belt.scale.set(torsoR * 2.1, .1 * s, torsoR * 1.1); belt.position.y = -.25 * s; torso.add(belt);
  // arms
  for (const side of [-1, 1]) {
    const arm = new THREE.Group();
    arm.position.set(side * torsoR * 1.35, .32 * s, 0);
    torso.add(arm);
    const limb = new THREE.Mesh(BOT_GEO.box, side < 0 ? bodyMat : skinMat);
    limb.scale.set(.17 * s, .55 * s, .19 * s); limb.position.y = -.26 * s;
    limb.castShadow = true; limb.userData.hit = { part: 'body' }; arm.add(limb);
    const hand = new THREE.Mesh(BOT_GEO.sphere, skinMat);
    hand.scale.setScalar(.1 * s); hand.position.y = -.55 * s; arm.add(hand);
    rig[side < 0 ? 'leftArm' : 'rightArm'] = arm;
    arm.rotation.z = side * .1;
  }
  // head
  const head = new THREE.Group();
  head.position.y = headY;
  torso.add(head);
  const skull = new THREE.Mesh(BOT_GEO.sphere, skinMat);
  skull.scale.set(headR * 1.08, headR * 1.15, headR);
  skull.castShadow = true; skull.userData.hit = { part: 'head' }; head.add(skull);
  // face eyes (readable)
  const eyeMat = mat('#f6f0dc', { flat: false });
  const pupil = mat('#131313');
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(BOT_GEO.sphere, eyeMat);
    eye.scale.setScalar(headR * .18); eye.position.set(side * headR * .34, headR * .12, headR * .9); head.add(eye);
    const p = new THREE.Mesh(BOT_GEO.sphere, pupil);
    p.scale.setScalar(headR * .068); p.position.set(side * headR * .34, headR * .11, headR * 1.03); head.add(p);
  }
  // helmet / hat
  const helmMat = mat(c.colors.secondary, { roughness: .65, metalness: .2 });
  switch (c.helmet) {
    case 'mohawk':
      for (let i = 0; i < 5; i++) {
        const spike = new THREE.Mesh(new THREE.ConeGeometry(headR * .14, headR * (.45 + i * .06), 5), mat(c.colors.hair));
        spike.position.set(0, headR * (.85 + i * .02), headR * (.35 - i * .16)); spike.rotation.x = .2; head.add(spike);
      }
      break;
    case 'beret': {
      const hat = new THREE.Mesh(new THREE.CylinderGeometry(headR * .65, headR * 1.05, headR * .25, 10), helmMat);
      hat.position.set(headR * .15, headR * .73, 0); hat.rotation.z = -.18; head.add(hat); break;
    }
    case 'straw': {
      const brim = new THREE.Mesh(new THREE.CylinderGeometry(headR * 1.55, headR * 1.55, headR * .08, 12), mat('#b99b59'));
      brim.position.y = headR * .68; head.add(brim);
      const dome = new THREE.Mesh(new THREE.CylinderGeometry(headR * .55, headR * .85, headR * .45, 10), mat('#c7a968'));
      dome.position.y = headR * .9; head.add(dome); break;
    }
    case 'lollipop': {
      const ball = new THREE.Mesh(BOT_GEO.sphere, mat('#d95b76'));
      ball.scale.set(headR * .75, headR * .75, headR * .3); ball.position.y = headR * 1.7; head.add(ball);
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(.018, .018, headR * 1.1, 5), mat('#f0e2c6'));
      stick.position.y = headR * 1.1; head.add(stick); break;
    }
    case 'pineapple': {
      const fruit = new THREE.Mesh(BOT_GEO.sphere, mat('#c5a83d'));
      fruit.scale.set(headR * 1.2, headR * 1.35, headR * 1.2); fruit.position.y = headR * .45; head.add(fruit);
      for (let i = 0; i < 5; i++) {
        const leaf = new THREE.Mesh(new THREE.ConeGeometry(headR * .13, headR * .8, 4), mat('#3f6d37'));
        leaf.position.set(Math.cos(i * 1.3) * headR * .3, headR * 1.65, Math.sin(i * 1.3) * headR * .3);
        leaf.rotation.z = Math.cos(i * 1.3) * .4; head.add(leaf);
      }
      break;
    }
    case 'cyborg': {
      const plate = new THREE.Mesh(new THREE.SphereGeometry(headR * 1.1, 10, 7, 0, Math.PI * 2, 0, Math.PI * .62), mat('#394a54', { metalness: .7, roughness: .3 }));
      plate.position.y = headR * .1; head.add(plate);
      const eye = new THREE.Mesh(BOT_GEO.sphere, mat('#48f2d2', { emissive: '#48f2d2', emissiveIntensity: 3 }));
      eye.scale.setScalar(headR * .13); eye.position.set(-headR * .25, headR * .15, headR * 1.02); head.add(eye);
      break;
    }
    default: {
      const helm = new THREE.Mesh(new THREE.SphereGeometry(headR * 1.15, 12, 8, 0, Math.PI * 2, 0, Math.PI * .62), helmMat);
      helm.position.y = headR * .13; helm.castShadow = true; head.add(helm);
      const brim = new THREE.Mesh(new THREE.CylinderGeometry(headR * 1.28, headR * 1.24, headR * .09, 12), helmMat);
      brim.position.y = headR * .33; head.add(brim);
      const stripe = new THREE.Mesh(new THREE.CylinderGeometry(headR * 1.17, headR * 1.17, headR * .09, 14), teamMat);
      stripe.position.y = headR * .12; head.add(stripe);
    }
  }
  // team light ring on chest and armband
  const band = new THREE.Mesh(BOT_GEO.box, teamMat);
  band.scale.set(.19 * s, .09 * s, .21 * s); band.position.set(-torsoR * 1.35, .2 * s, 0); torso.add(band);
  // gun
  const gun = new THREE.Group();
  gun.position.set(torsoR * .95, -.02 * s, .35 * s);
  gun.rotation.y = -.1;
  const gmat = mat('#242826', { metalness: .5, roughness: .4 });
  const gbody = new THREE.Mesh(BOT_GEO.box, gmat); gbody.scale.set(.1 * s, .13 * s, .52 * s); gun.add(gbody);
  const gbarrel = new THREE.Mesh(new THREE.CylinderGeometry(.03 * s, .034 * s, .3 * s, 6), gmat);
  gbarrel.rotation.x = Math.PI / 2; gbarrel.position.z = .35 * s; gun.add(gbarrel);
  const gmag = new THREE.Mesh(BOT_GEO.box, teamMat); gmag.scale.set(.07 * s, .2 * s, .1 * s); gmag.position.set(0, -.13 * s, 0); gun.add(gmag);
  torso.add(gun);
  rig.gun = gun;
  // name sprite
  const label = makeNameSprite(name, teamColor);
  label.position.y = headY + headR * 2.4;
  root.add(label);
  rig.label = label;
  // ground ring
  const ring = new THREE.Mesh(new THREE.RingGeometry(.32 * s, .46 * s, 18), new THREE.MeshBasicMaterial({ color: teamColor, transparent: true, opacity: .34, side: THREE.DoubleSide, depthWrite: false }));
  ring.rotation.x = -Math.PI / 2; ring.position.y = .03; root.add(ring);
  rig.ring = ring;
  root.traverse(o => { if (o.isMesh) o.userData.botRoot = root; });
  root.userData.rig = rig;
  root.userData.character = c;
  root.userData.isBot = true;
  return root;
}

function makeNameSprite(name, color) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 64;
  const ctx = c.getContext('2d');
  ctx.font = '900 23px Arial Black, Arial, sans-serif'; ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(4,9,11,.72)'; ctx.fillRect(0, 12, 256, 38);
  ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.strokeRect(2, 14, 252, 34);
  ctx.fillStyle = color; ctx.fillText(name, 128, 39);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: true, depthWrite: false }));
  sp.scale.set(1.9, .48, 1);
  return sp;
}

export function animateBot(root, t, moving = false, speed = 1) {
  const rig = root.userData.rig;
  if (!rig) return;
  const walk = moving ? Math.sin(t * (4.5 + speed * .25)) : 0;
  rig.leftLeg.rotation.x = walk * .55;
  rig.rightLeg.rotation.x = -walk * .55;
  rig.leftArm.rotation.x = -walk * .4;
  rig.rightArm.rotation.x = walk * .4;
  if (rig.gun) rig.gun.rotation.x = -walk * .05;
  const bob = moving ? Math.abs(Math.sin(t * 8)) * .025 : Math.sin(t * 2) * .006;
  root.position.y = (root.userData.baseY || 0) + bob;
  if (rig.label) rig.label.position.y = rig.label.userData.baseY || rig.label.position.y;
  if (rig.ring) rig.ring.material.opacity = .26 + Math.sin(t * 3) * .06;
}

export function setBotTeamColor(root, color) { /* reserved for respawn tint tweaks */ }

/* Render roster portraits with an isolated offscreen renderer */
export function renderPortraits(characters, width = 190, height = 210) {
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(width, height, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, width / height, .1, 30);
  camera.position.set(0, 1.38, 4.4);
  camera.lookAt(0, 1.15, 0);
  scene.add(new THREE.HemisphereLight(0xd8ecff, 0x26221c, 1.5));
  const key = new THREE.DirectionalLight(0xffd9ae, 3.0); key.position.set(2.4, 4.2, 3.2); scene.add(key);
  const rim = new THREE.DirectionalLight(0x48f2d2, 2.0); rim.position.set(-3, 2, -2.5); scene.add(rim);
  const fill = new THREE.PointLight(0xff7a3d, 10, 8); fill.position.set(-2, 1.5, 2); scene.add(fill);
  const platform = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.35, .16, 32), new THREE.MeshStandardMaterial({ color: 0x0b1518, roughness: .45, metalness: .4 }));
  platform.position.y = -.1; scene.add(platform);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.18, .025, 6, 40), new THREE.MeshBasicMaterial({ color: 0xd9ff43, transparent: true, opacity: .5 }));
  ring.rotation.x = Math.PI / 2; ring.position.y = .01; scene.add(ring);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(2.3, 32), new THREE.MeshBasicMaterial({ color: 0x081114 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -.18; scene.add(floor);

  const out = {};
  for (const c of characters) {
    const root = createCharacter(c);
    root.rotation.y = -.06;
    scene.add(root);
    poseCharacter(root, 0, 'idle');
    renderer.render(scene, camera);
    out[c.id] = canvas.toDataURL('image/jpeg', .83);
    scene.remove(root);
  }
  renderer.dispose();
  return out;
}
