import * as THREE from '../vendor/three.module.js';

function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color, roughness: opts.roughness ?? .55, metalness: opts.metalness ?? .35,
    emissive: opts.emissive ?? 0x000000, emissiveIntensity: opts.emissiveIntensity ?? 1,
    flatShading: opts.flat !== false
  });
}
function mesh(geo, color, opts) {
  const m = new THREE.Mesh(geo, mat(color, opts));
  m.castShadow = false; m.receiveShadow = false;
  m.frustumCulled = false;
  return m;
}
function box(g, w, h, d, x, y, z, color, opts) {
  const m = mesh(new THREE.BoxGeometry(w, h, d), color, opts);
  m.position.set(x, y, z); g.add(m); return m;
}
function cyl(g, r1, r2, h, x, y, z, color, opts = {}) {
  const m = mesh(new THREE.CylinderGeometry(r1, r2, h, opts.seg || 10), color, opts);
  m.rotation.x = Math.PI / 2; m.position.set(x, y, z); g.add(m); return m;
}
function flashTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 3, 64, 64, 62);
  g.addColorStop(0, 'rgba(255,255,235,1)');
  g.addColorStop(.2, 'rgba(255,230,130,.98)');
  g.addColorStop(.5, 'rgba(255,120,35,.7)');
  g.addColorStop(1, 'rgba(255,80,10,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = 'rgba(255,245,190,.9)'; ctx.lineWidth = 4;
  for (let i = 0; i < 8; i++) {
    ctx.beginPath(); ctx.moveTo(64, 64);
    ctx.lineTo(64 + Math.cos(i * Math.PI / 4) * 60, 64 + Math.sin(i * Math.PI / 4) * 60);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
const FLASH_TEX = flashTexture();

function addHands(g, skinTone, sleeveColor, leftPos, rightPos) {
  const skin = mat(skinTone, { roughness: .85, metalness: 0 });
  const sleeve = mat('#2b2f28', { roughness: .95, metalness: 0 });
  // right hand on grip
  const rh = new THREE.Mesh(new THREE.BoxGeometry(.13, .16, .17), skin);
  rh.position.copy(rightPos); g.add(rh);
  const rfinger = new THREE.Mesh(new THREE.BoxGeometry(.13, .045, .06), skin);
  rfinger.position.copy(rightPos).add(new THREE.Vector3(0, .01, -.09)); g.add(rfinger);
  const rarm = new THREE.Mesh(new THREE.BoxGeometry(.15, .15, .46), sleeve);
  rarm.position.copy(rightPos).add(new THREE.Vector3(.12, -.14, .28)); rarm.rotation.x = .18; g.add(rarm);
  // left hand on handguard
  const lh = new THREE.Mesh(new THREE.BoxGeometry(.15, .14, .18), skin);
  lh.position.copy(leftPos); g.add(lh);
  for (let i = 0; i < 3; i++) {
    const f = new THREE.Mesh(new THREE.BoxGeometry(.15, .045, .055), skin);
    f.position.copy(leftPos).add(new THREE.Vector3(0, .03 - i * .05, -.07)); g.add(f);
  }
  const larm = new THREE.Mesh(new THREE.BoxGeometry(.14, .14, .48), sleeve);
  larm.position.copy(leftPos).add(new THREE.Vector3(-.1, -.18, .3)); larm.rotation.x = .32; g.add(larm);
}

export function createWeaponModel(weapon, skin, character, secondary = false) {
  const g = new THREE.Group();
  const metal = skin?.metal || '#4b5254';
  const accent = skin?.accent || '#d9ff43';
  const dark = skin?.dark || '#1b1f20';
  const steel = '#8a9495';
  const wood = '#6e4a2d';
  const muzzle = new THREE.Group();
  const magParts = [];
  const accentOpts = { metalness: .55, roughness: .38, emissive: accent, emissiveIntensity: .13 };
  const metalOpts = { metalness: .72, roughness: .35 };
  const darkOpts = { metalness: .35, roughness: .68 };

  if (secondary) {
    box(g, .16, .18, .48, 0, 0, -.16, metal, metalOpts);
    box(g, .14, .12, .16, 0, .14, -.36, dark, darkOpts);
    cyl(g, .04, .045, .22, 0, .03, -.55, steel, metalOpts);
    cyl(g, .052, .052, .05, 0, .03, -.66, dark, darkOpts);
    const grip = box(g, .13, .32, .19, 0, -.22, -.02, dark, darkOpts); grip.rotation.x = .18;
    const mag = box(g, .11, .25, .14, 0, -.24, -.17, metal, metalOpts); mag.rotation.x = .12; magParts.push(mag);
    box(g, .17, .035, .35, 0, .07, -.12, accent, accentOpts);
    box(g, .025, .05, .05, 0, .12, -.46, accent, { ...accentOpts, emissiveIntensity: 1.4 });
    muzzle.position.set(0, .03, -.69); g.add(muzzle);
    addHands(g, character?.colors?.skin || '#c58d63', character?.colors?.secondary || '#414c2e', new THREE.Vector3(-.04, -.12, -.3), new THREE.Vector3(.02, -.2, -.02));
  } else if (weapon.id === 'trovao') {
    // receiver
    box(g, .17, .19, .62, 0, 0, -.15, metal, metalOpts);
    box(g, .15, .14, .5, 0, .035, -.6, dark, darkOpts);
    cyl(g, .042, .048, .52, 0, .045, -.95, steel, metalOpts);
    cyl(g, .06, .06, .09, 0, .045, -1.19, dark, darkOpts);
    cyl(g, .065, .065, .04, 0, .045, -1.24, '#151515');
    // stock
    box(g, .12, .16, .4, 0, -.03, .36, dark, darkOpts);
    box(g, .16, .22, .18, 0, -.01, .6, metal, metalOpts);
    // mag
    const mag = box(g, .12, .34, .2, 0, -.27, -.16, metal, metalOpts);
    mag.rotation.x = -.12; magParts.push(mag);
    // grip
    const grip = box(g, .11, .27, .16, 0, -.24, .09, dark, darkOpts); grip.rotation.x = .25;
    // handguard / cover
    box(g, .14, .12, .33, 0, -.01, -.58, metal, metalOpts);
    for (let i = 0; i < 4; i++) box(g, .15, .02, .03, 0, -.06, -.46 - i * .07, dark, darkOpts);
    // rail and sight
    for (let i = 0; i < 7; i++) box(g, .03, .022, .03, 0, .11, -.4 + i * .07, dark, darkOpts);
    box(g, .075, .12, .05, 0, .18, -.21, dark, darkOpts);
    box(g, .04, .04, .012, 0, .18, -.24, accent, { ...accentOpts, emissiveIntensity: 1.8 });
    // accent panels
    box(g, .175, .04, .36, 0, .03, -.2, accent, accentOpts);
    box(g, .12, .02, .12, 0, -.075, .17, accent, { ...accentOpts, emissiveIntensity: .7 });
    // laser
    box(g, .025, .025, .09, .1, -.03, -.7, dark, darkOpts);
    muzzle.position.set(0, .045, -1.27); g.add(muzzle);
    addHands(g, character?.colors?.skin || '#c58d63', character?.colors?.secondary || '#414c2e', new THREE.Vector3(-.01, -.07, -.63), new THREE.Vector3(.02, -.2, .06));
  } else if (weapon.id === 'vespa') {
    box(g, .16, .17, .36, 0, 0, -.1, metal, metalOpts);
    box(g, .14, .12, .22, 0, .03, -.38, dark, darkOpts);
    cyl(g, .035, .038, .22, 0, .04, -.56, steel, metalOpts);
    cyl(g, .055, .055, .06, 0, .04, -.69, dark, darkOpts);
    // folding stock
    box(g, .08, .1, .3, 0, -.02, .2, metal, metalOpts);
    box(g, .13, .14, .08, 0, -.02, .37, dark, darkOpts);
    const mag = box(g, .1, .33, .16, 0, -.26, -.05, metal, metalOpts); mag.rotation.x = -.17; magParts.push(mag);
    const grip = box(g, .1, .24, .14, 0, -.22, .1, dark, darkOpts); grip.rotation.x = .24;
    for (let i = 0; i < 5; i++) box(g, .145, .02, .05, 0, -.06, -.3 + i * .05, dark, darkOpts);
    box(g, .16, .035, .42, 0, .08, -.12, accent, accentOpts);
    box(g, .06, .08, .04, 0, .14, -.21, dark, darkOpts);
    box(g, .035, .035, .012, 0, .14, -.235, accent, { ...accentOpts, emissiveIntensity: 1.8 });
    muzzle.position.set(0, .04, -.72); g.add(muzzle);
    addHands(g, character?.colors?.skin || '#c58d63', character?.colors?.secondary || '#414c2e', new THREE.Vector3(-.01, -.04, -.33), new THREE.Vector3(.02, -.2, .08));
  } else if (weapon.id === 'bocarra') {
    box(g, .21, .2, .42, 0, 0, -.05, metal, metalOpts);
    box(g, .17, .14, .38, 0, .02, -.45, wood, { roughness: .8, metalness: .1 });
    cyl(g, .06, .065, .45, 0, .05, -.76, steel, metalOpts);
    cyl(g, .085, .09, .1, 0, .05, -.98, dark, darkOpts);
    // pump
    box(g, .18, .13, .32, 0, -.1, -.62, dark, darkOpts);
    for (let i = 0; i < 3; i++) box(g, .19, .02, .04, 0, -.13, -.52 - i * .1, metal, metalOpts);
    box(g, .13, .14, .26, 0, -.05, .3, wood, { roughness: .8, metalness: .1 });
    const grip = box(g, .1, .22, .14, 0, -.2, .12, wood, { roughness: .8, metalness: .1 }); grip.rotation.x = .2;
    for (let i = 0; i < 3; i++) box(g, .075, .075, .08, 0, -.03, -.4 - i * .09, accent, accentOpts);
    box(g, .05, .04, .012, 0, .13, -.2, accent, { ...accentOpts, emissiveIntensity: 1.8 });
    muzzle.position.set(0, .05, -1.04); g.add(muzzle);
    addHands(g, character?.colors?.skin || '#c58d63', character?.colors?.secondary || '#414c2e', new THREE.Vector3(-.01, -.14, -.58), new THREE.Vector3(.02, -.18, .1));
  } else {
    // CUSPE-X sniper
    box(g, .16, .18, .7, 0, 0, -.2, metal, metalOpts);
    cyl(g, .045, .05, 1.0, 0, .04, -1.0, steel, metalOpts);
    cyl(g, .075, .075, .16, 0, .04, -1.5, dark, darkOpts);
    box(g, .14, .16, .4, 0, -.03, .42, dark, darkOpts);
    box(g, .17, .22, .18, 0, -.02, .64, metal, metalOpts);
    const mag = box(g, .1, .24, .17, 0, -.22, -.12, dark, darkOpts); magParts.push(mag);
    const grip = box(g, .1, .24, .14, 0, -.2, .08, dark, darkOpts); grip.rotation.x = .24;
    // scope
    cyl(g, .085, .085, .48, 0, .22, -.3, dark, darkOpts);
    cyl(g, .105, .095, .08, 0, .22, -.55, steel, metalOpts);
    box(g, .06, .06, .08, 0, .17, -.3, dark, darkOpts);
    box(g, .035, .035, .012, 0, .22, -.56, accent, { ...accentOpts, emissiveIntensity: 1.8 });
    box(g, .165, .035, .5, 0, .03, -.25, accent, accentOpts);
    // bipod
    box(g, .025, .26, .025, -.08, -.16, -.9, dark, darkOpts).rotation.z = .3;
    box(g, .025, .26, .025, .08, -.16, -.9, dark, darkOpts).rotation.z = -.3;
    muzzle.position.set(0, .04, -1.58); g.add(muzzle);
    addHands(g, character?.colors?.skin || '#c58d63', character?.colors?.secondary || '#414c2e', new THREE.Vector3(-.01, -.08, -.52), new THREE.Vector3(.02, -.18, .07));
  }

  // orientation: model points toward -Z
  g.traverse(o => { if (o.isMesh) o.frustumCulled = false; });

  const flash = new THREE.Sprite(new THREE.SpriteMaterial({ map: FLASH_TEX, color: 0xffd58a, transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending }));
  flash.scale.set(.55, .55, .55);
  flash.visible = false;
  muzzle.add(flash);
  const flashLight = new THREE.PointLight(0xffb15c, 0, 4, 2);
  flashLight.position.copy(muzzle.position);
  g.add(flashLight);

  return { group: g, muzzle, flash, flashLight, magParts, weapon };
}

export function weaponSvg(weapon) {
  return weapon.svg || '<svg viewBox="0 0 160 56"><path fill="currentColor" d="M12 26h38l8-7h44l8 6h35v10h-30l-8 5H55l-8 8H35l-4-8H12z"/></svg>';
}
