import * as THREE from '../vendor/three.module.js';
import { Game } from './game.js';
import { CHARACTERS, WEAPONS, SKINS, MAPS, MODES, TIPS, charById, weaponById, mapById, modeById } from './data.js';
import { createCharacter, poseCharacter, renderPortraits } from './characters.js';
import { createSky, createDust } from './world.js';
import { weaponSvg } from './weapons.js';
import { audio } from './audio.js';

const $ = id => document.getElementById(id);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const canvas = $('game-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', alpha: false });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.16;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.6));

const state = {
  mode: 'tdm',
  map: 'cidade',
  char: 'pastel',
  weapon: 'trovao',
  skin: 'ferrugem',
  quality: (matchMedia('(pointer: coarse)').matches || innerWidth < 800) ? 'low' : 'medium',
  audio: true,
  assist: true,
  sensitivity: 1,
  anim: 'idle',
  animT: 0
};
const saved = (() => { try { return JSON.parse(localStorage.getItem('caos-settings-v1') || '{}'); } catch { return {}; } })();
Object.assign(state, {
  char: saved.char || state.char,
  weapon: saved.weapon || state.weapon,
  skin: saved.skin || state.skin,
  map: saved.map || state.map,
  mode: saved.mode || state.mode,
  quality: saved.quality || state.quality,
  audio: saved.audio !== false,
  assist: saved.assist !== false,
  sensitivity: saved.sensitivity || 1
});
function persist() {
  try {
    localStorage.setItem('caos-settings-v1', JSON.stringify({
      char: state.char, weapon: state.weapon, skin: state.skin, map: state.map, mode: state.mode,
      quality: state.quality, audio: state.audio, assist: state.assist, sensitivity: state.sensitivity
    }));
  } catch {}
}

/* =================================================================
   MENU 3D STAGE
================================================================= */
const menuScene = new THREE.Scene();
const menuCamera = new THREE.PerspectiveCamera(43, innerWidth / innerHeight, .1, 900);
menuCamera.position.set(.05, 1.52, 5.5);
const menuLook = new THREE.Vector3(.38, 1.08, 0);
menuCamera.lookAt(menuLook);
menuScene.background = new THREE.Color(0x080f13);
menuScene.fog = new THREE.FogExp2(0x0b1317, .032);
menuScene.add(createSky({ top: '#07141b', bottom: '#4b2e22', sun: '#ffb06a', sunDir: [-.35, .22, .9], fog: '#1b1a18' }));
menuScene.add(new THREE.HemisphereLight(0xc2e7ff, 0x2b241c, 1.25));
const keyLight = new THREE.DirectionalLight(0xffd4a5, 3.4);
keyLight.position.set(4.5, 5.4, 4.2);
keyLight.castShadow = true; keyLight.shadow.mapSize.set(1024, 1024);
keyLight.shadow.camera.left = -6; keyLight.shadow.camera.right = 6; keyLight.shadow.camera.top = 6; keyLight.shadow.camera.bottom = -6;
menuScene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0x48f2d2, 2.6);
rimLight.position.set(-4, 2.9, -2.4);
menuScene.add(rimLight);
const fillLight = new THREE.PointLight(0xff7a3d, 26, 14, 2);
fillLight.position.set(-2.4, 1.6, 3.1);
menuScene.add(fillLight);

// floor and platform
const floorMat = new THREE.MeshStandardMaterial({ color: 0x0b1316, roughness: .44, metalness: .38 });
const floor = new THREE.Mesh(new THREE.CircleGeometry(14, 48), floorMat);
floor.rotation.x = -Math.PI / 2; floor.position.y = -.06; floor.receiveShadow = true;
menuScene.add(floor);
const stage = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.6, .22, 48), new THREE.MeshStandardMaterial({ color: 0x101d21, roughness: .32, metalness: .5 }));
stage.position.set(1.35, -.02, 0); stage.receiveShadow = true; stage.castShadow = true;
menuScene.add(stage);
const stageRing = new THREE.Mesh(new THREE.TorusGeometry(1.36, .035, 8, 64), new THREE.MeshBasicMaterial({ color: 0xd9ff43, transparent: true, opacity: .7 }));
stageRing.rotation.x = Math.PI / 2; stageRing.position.set(1.35, .1, 0); menuScene.add(stageRing);
const stageRing2 = new THREE.Mesh(new THREE.TorusGeometry(1.7, .012, 6, 64), new THREE.MeshBasicMaterial({ color: 0x48f2d2, transparent: true, opacity: .4 }));
stageRing2.rotation.x = Math.PI / 2; stageRing2.position.set(1.35, .1, 0); menuScene.add(stageRing2);

// backdrop skyline
const buildings = [];
for (let i = 0; i < 22; i++) {
  const angle = (i / 22) * Math.PI * 2;
  const r = 12 + Math.random() * 15;
  const x = Math.cos(angle) * r, z = Math.sin(angle) * r - 3;
  if (z > 2) continue;
  const h = 2 + Math.random() * 13;
  const w = 1.4 + Math.random() * 3.2;
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, w * .8), new THREE.MeshStandardMaterial({ color: i % 3 ? 0x111c21 : 0x17242a, roughness: .9, metalness: .1 }));
  m.position.set(x, h / 2 - .1, z); m.castShadow = false; m.receiveShadow = false;
  menuScene.add(m); buildings.push(m);
  for (let j = 0; j < Math.floor(h / 1.8); j++) {
    if (Math.random() > .55) continue;
    const win = new THREE.Mesh(new THREE.BoxGeometry(w * .2, .22, .02), new THREE.MeshBasicMaterial({ color: Math.random() > .5 ? 0xffb05a : 0x54e7db }));
    win.position.set(x + (Math.random() - .5) * w * .55, .8 + j * 1.7, z + w * .401);
    menuScene.add(win);
  }
}
// neon back signs
function neonPanel(text, x, y, z, color, w = 4.4, h = 1.3, rotY = 0) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 160;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 512, 160);
  ctx.font = '900 76px Arial Black, Arial, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.strokeStyle = color; ctx.lineWidth = 5; ctx.strokeRect(8, 8, 496, 144);
  ctx.shadowColor = color; ctx.shadowBlur = 30; ctx.fillStyle = color; ctx.fillText(text, 256, 85);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  mesh.position.set(x, y, z); mesh.rotation.y = rotY; menuScene.add(mesh);
  return mesh;
}
neonPanel('CAOS', -3.2, 3.6, -8.5, '#d9ff43', 4.8, 1.4, .12);
neonPanel('VESPA', 4.8, 2.6, -10.5, '#48f2d2', 4.2, 1.1, -.2);
neonPanel('RAPOSA', -6.4, 2.2, -12, '#ff7a3d', 4.2, 1.1, .2);
// floating particles
const menuDust = createDust(0xffd9a0);
menuDust.material.opacity = .55;
menuScene.add(menuDust);
// orbiting glyphs / debris
const glyphs = new THREE.Group();
for (let i = 0; i < 14; i++) {
  const geo = new THREE.BoxGeometry(.05 + Math.random() * .1, .05 + Math.random() * .28, .05);
  const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: i % 3 ? 0xd9ff43 : 0x48f2d2, transparent: true, opacity: .45 }));
  const a = Math.random() * Math.PI * 2, r = 2.3 + Math.random() * 2.4;
  m.position.set(1.35 + Math.cos(a) * r, .3 + Math.random() * 3.8, Math.sin(a) * r * .5);
  m.userData.spin = Math.random() * 2;
  glyphs.add(m);
}
menuScene.add(glyphs);

// character preview
const charRoot = new THREE.Group();
charRoot.position.set(1.35, 0, 0);
charRoot.rotation.y = .06;
menuScene.add(charRoot);
const charCache = new Map();
let activePreview = null;
function setPreviewCharacter(id, anim = 'idle') {
  if (activePreview) charRoot.remove(activePreview);
  let root = charCache.get(id);
  if (!root) {
    root = createCharacter(charById(id));
    charCache.set(id, root);
  }
  root.position.set(0, 0, 0);
  root.rotation.set(0, 0, 0);
  charRoot.add(root);
  activePreview = root;
  state.anim = anim; state.animT = 0;
  if (anim === 'entry') charRoot.position.x = 3.4;
}

/* =================================================================
   MAP THUMBNAILS
================================================================= */
function makeMapThumb(map) {
  const c = document.createElement('canvas'); c.width = 360; c.height = 230;
  const ctx = c.getContext('2d');
  const [c1, c2, accent] = map.theme;
  const g = ctx.createLinearGradient(0, 0, 360, 230);
  g.addColorStop(0, c1); g.addColorStop(1, c2);
  ctx.fillStyle = g; ctx.fillRect(0, 0, 360, 230);
  const R = (x, y, w, h, col, alpha = 1) => { ctx.globalAlpha = alpha; ctx.fillStyle = col; ctx.fillRect(x, y, w, h); ctx.globalAlpha = 1; };
  const C = (x, y, r, col, alpha = 1) => { ctx.globalAlpha = alpha; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; };
  if (map.id === 'cidade') {
    R(0, 100, 360, 32, '#2d3333', .7); R(164, 0, 32, 230, '#2d3333', .7);
    R(10, 8, 110, 78, '#59605e'); R(210, 12, 130, 72, '#4a3f38'); R(20, 160, 120, 58, '#6a5b4a'); R(220, 155, 120, 62, '#4b5552');
    for (let i = 0; i < 16; i++) { R(18 + (i % 5) * 16, 16 + Math.floor(i / 5) * 16, 7, 7, '#ffcf6a', .55); }
    R(24, 120, 22, 9, '#a23a34'); R(70, 121, 18, 8, '#32649c'); R(260, 118, 19, 9, '#b69433'); R(310, 130, 18, 8, '#447d66');
    C(180, 116, 15, '#4f5b57');
  } else if (map.id === 'fabrica') {
    R(0, 0, 360, 230, '#27271f', .7);
    for (let i = 0; i < 6; i++) R(18 + i * 57, 20, 38, 190, '#4b4c42', .65);
    R(0, 114, 360, 8, '#a68d32', .65); R(0, 140, 360, 8, '#a68d32', .65);
    for (let i = 0; i < 5; i++) C(45 + i * 68, 80, 17, '#6b7468', .6);
    for (let i = 0; i < 4; i++) C(55 + i * 80, 180, 14, i % 2 ? '#55ff66' : '#399cff', .55);
    R(160, 105, 42, 18, '#ff7a3d', .35);
  } else if (map.id === 'shopping') {
    R(0, 0, 360, 230, '#231e29', .7);
    R(4, 4, 352, 222, '#64596b', .45);
    C(180, 115, 72, '#37323f', .8);
    C(180, 115, 50, '#a1843f', .16);
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2;
      R(180 + Math.cos(a) * 110 - 22, 115 + Math.sin(a) * 78 - 13, 44, 26, i % 2 ? '#7b5068' : '#4c4468', .8);
    }
    for (let i = 0; i < 4; i++) R(40 + i * 80, 208, 35, 6, i % 2 ? '#ff3c9a' : '#48f2d2', .6);
  } else if (map.id === 'base') {
    R(0, 0, 360, 230, '#53503f', .8);
    R(0, 84, 360, 62, '#77735e', .65);
    for (let i = 0; i < 10; i++) R(18 + i * 35, 100, 18, 30, '#d9d1b0', .25);
    const cols = ['#80382d', '#37556f', '#3b5b37', '#a65a2b'];
    for (let i = 0; i < 8; i++) R(16 + (i % 4) * 84, 16 + Math.floor(i / 4) * 40, 62, 24, cols[i % 4], .8);
    for (const [x, y] of [[46, 190], [302, 184], [310, 26], [38, 34]]) { C(x, y, 15, '#8c7a51', .75); C(x, y, 7, '#3b3830', .8); }
    R(0, 74, 360, 4, '#d9d1b0', .3);
  } else {
    R(0, 0, 360, 230, '#4a4234', .8);
    R(150, 0, 42, 230, '#313736', .8); R(0, 100, 360, 38, '#313736', .8);
    const cols = ['#a95266', '#b39a35', '#37556f', '#3b5b37', '#a65a2b', '#7c5c97'];
    for (let i = 0; i < 12; i++) {
      const x = 12 + (i % 4) * 88, y = 10 + Math.floor(i / 4) * 72;
      if (Math.abs(x + 30 - 180) < 52 && Math.abs(y + 22 - 120) < 40) continue;
      R(x, y, 54, 38, cols[i % cols.length], .85); R(x + 6, y - 6, 42, 8, '#3a2c25', .85);
    }
    R(176, 108, 76, 54, '#4b5c34', .85); R(212, 108, 2, 54, '#d7d2b4', .5); R(176, 134, 76, 2, '#d7d2b4', .5);
  }
  // scan lines and vignette
  ctx.globalAlpha = .12;
  for (let y = 0; y < 230; y += 4) R(0, y, 360, 1, '#000');
  ctx.globalAlpha = 1;
  const v = ctx.createRadialGradient(180, 115, 35, 180, 115, 220);
  v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.62)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 360, 230);
  // corner marks
  ctx.strokeStyle = accent; ctx.globalAlpha = .9; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(8, 26); ctx.lineTo(8, 8); ctx.lineTo(28, 8); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(332, 222); ctx.lineTo(352, 222); ctx.lineTo(352, 202); ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.font = '900 12px Arial'; ctx.fillStyle = accent; ctx.textAlign = 'left';
  ctx.fillText(map.code, 12, 219);
  return c.toDataURL('image/jpeg', .82);
}
const mapThumbs = {};
for (const m of MAPS) mapThumbs[m.id] = makeMapThumb(m);

/* =================================================================
   UI BUILD
================================================================= */
const portraits = {};
const rosterCardImgs = new Map();
const rosterGrid = $('roster-grid');
function buildRoster() {
  rosterGrid.innerHTML = '';
  for (const c of CHARACTERS) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'char-card' + (c.id === state.char ? ' selected' : '');
    btn.dataset.char = c.id;
    const ph = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
    btn.innerHTML = `<span class="char-num">#${String(c.num).padStart(2, '0')}</span><img alt="${c.name}" src="${portraits[c.id] || ph}" style="${portraits[c.id] ? '' : 'background:linear-gradient(160deg,' + c.colors.primary + ',' + c.colors.secondary + ');'}"><b>${c.name}</b><span>${c.role}</span>`;
    btn.addEventListener('click', () => selectCharacter(c.id));
    rosterGrid.appendChild(btn);
    rosterCardImgs.set(c.id, btn.querySelector('img'));
  }
}
function selectCharacter(id, anim = 'idle') {
  state.char = id; persist();
  setPreviewCharacter(id, anim);
  renderOperatorMeta();
  document.querySelectorAll('.char-card').forEach(el => el.classList.toggle('selected', el.dataset.char === id));
  const profile = $('profile-avatar');
  if (profile) profile.textContent = charById(id).name.replace('SARGENTO ', '').charAt(0);
}
function renderOperatorMeta() {
  const c = charById(state.char);
  $('char-name').textContent = c.name;
  $('char-role').textContent = c.role;
  $('char-bio').textContent = c.bio;
  $('char-id').textContent = '#' + String(c.num).padStart(2, '0');
  $('char-stats').innerHTML = `
    <div class="stat"><span>RESISTÊNCIA</span><i><b style="width:${c.stats.res}%"></b></i></div>
    <div class="stat"><span>CAOS</span><i><b style="width:${c.stats.caos}%"></b></i></div>
    <div class="stat"><span>HIGIENE</span><i><b style="width:${c.stats.hig}%"></b></i></div>`;
  // dots
  const dots = $('operator-dots');
  if (dots) {
    dots.innerHTML = CHARACTERS.map(ch => `<i data-dot="${ch.id}" class="${ch.id === state.char ? 'active' : ''}"></i>`).join('');
    dots.querySelectorAll('i').forEach(d => d.addEventListener('click', () => selectCharacter(d.dataset.dot)));
  }
}

function buildModes() {
  document.querySelectorAll('.mode-card').forEach(b => {
    b.classList.toggle('selected', b.dataset.mode === state.mode);
    b.addEventListener('click', () => {
      state.mode = b.dataset.mode; persist();
      document.querySelectorAll('.mode-card').forEach(x => x.classList.toggle('selected', x === b));
      updatePlayMeta();
    });
  });
}
function buildMapStrip() {
  const strip = $('map-strip');
  strip.innerHTML = '';
  for (const m of MAPS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'map-card' + (m.id === state.map ? ' selected' : '');
    b.dataset.map = m.id;
    b.innerHTML = `<img alt="${m.name}" src="${mapThumbs[m.id]}"><span>${m.name}</span>`;
    b.addEventListener('click', () => {
      state.map = m.id; persist();
      document.querySelectorAll('.map-card').forEach(x => x.classList.toggle('selected', x.dataset.map === m.id));
      updatePlayMeta();
    });
    strip.appendChild(b);
  }
}
function updatePlayMeta() {
  const mode = modeById(state.mode), map = mapById(state.map);
  $('play-sub').textContent = `${mode.name} · ${map.name}`;
  $('play-count').textContent = state.mode === 'ffa' ? '8' : state.mode === 'dom' ? '3 ZONAS' : '5v5';
}
function buildWeaponUI() {
  const grid = $('weapon-grid');
  grid.innerHTML = '';
  for (const w of WEAPONS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'weapon-card' + (w.id === state.weapon ? ' selected' : '');
    b.dataset.weapon = w.id;
    b.innerHTML = `${weaponSvg(w)}<div><b>${w.name}</b><span>${w.type}</span><span style="color:#d9ff43;margin-top:4px">DANO ${w.damage} · ${w.rpm} RPM</span></div>${w.id === state.weapon ? '<i>EQUIPADA</i>' : ''}`;
    b.addEventListener('click', () => { state.weapon = w.id; persist(); buildWeaponUI(); updateLoadout(); });
    grid.appendChild(b);
  }
  const sw = $('skin-swatches');
  sw.innerHTML = '';
  for (const s of SKINS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'skin-swatch' + (s.id === state.skin ? ' selected' : '');
    b.style.background = s.swatch;
    b.title = s.name;
    b.addEventListener('click', () => { state.skin = s.id; persist(); updateLoadout(); buildWeaponUI(); });
    sw.appendChild(b);
  }
  updateLoadout();
}
function weaponStatBar(label, value) {
  return `<div class="stat"><span>${label}</span><i><b style="width:${clamp(value, 4, 100)}%"></b></i></div>`;
}
function updateLoadout() {
  const w = weaponById(state.weapon), skin = SKINS.find(s => s.id === state.skin) || SKINS[0];
  $('loadout-name').textContent = w.name;
  $('loadout-skin').textContent = `${w.type} · PELE: ${skin.name}`;
  $('loadout-dmg').textContent = Math.round(w.damage * w.pellets);
  $('loadout-rpm').textContent = w.rpm;
  $('loadout-mob').textContent = w.mobility;
  $('weapon-silhouette').innerHTML = `<span style="color:${skin.accent};display:block;width:100%">${weaponSvg(w)}</span>`;
  $('weapon-silhouette').querySelector('svg').style.width = '100%';
  $('weapon-silhouette').querySelector('svg').style.height = '100%';
  $('gun-big').innerHTML = `<span style="color:${skin.accent};display:block">${weaponSvg(w)}</span>`;
  $('skin-name').textContent = skin.name;
  $('weapon-stats').innerHTML = [
    weaponStatBar('DANO', w.damage * w.pellets * 1.6),
    weaponStatBar('ALCANCE', w.range * 1.08),
    weaponStatBar('CADÊNCIA', w.rpm / 10),
    weaponStatBar('MOBILIDADE', w.mobility),
    weaponStatBar('PRECISÃO', 100 - w.spread * 1100)
  ].join('');
}
function buildCustomMaps() {
  const wrap = $('custom-maps');
  if (!wrap) return;
  wrap.innerHTML = '';
  for (const m of MAPS) {
    const b = document.createElement('button');
    b.type = 'button'; b.dataset.cmap = m.id; b.textContent = m.short;
    b.className = m.id === state.map ? 'active' : '';
    b.addEventListener('click', () => {
      state.map = m.id;
      wrap.querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
      updateCustomSummary();
    });
    wrap.appendChild(b);
  }
}
function updateCustomSummary() {
  const w = $('bot-range').value, s = $('score-range').value;
  const mode = modeById(document.querySelector('#custom-modes button.active')?.dataset.cmode || state.mode);
  $('bot-count').textContent = mode.team ? `${w} vs ${w}` : `${Math.min(9, w * 2 - 2) * 1 + 1}`;
  $('score-limit').textContent = s;
  const map = mapById(state.map);
  $('custom-title').textContent = mode.name;
  $('custom-desc').textContent = `${map.name} · ${mode.team ? `${w} vs ${w}` : `${Math.min(9, w * 2 - 2) + 1} operadores`}`;
}
function buildMapDetails() {
  const grid = $('map-detail-grid');
  if (!grid) return;
  grid.innerHTML = '';
  for (const m of MAPS) {
    const div = document.createElement('div');
    div.className = 'map-detail';
    div.innerHTML = `<img src="${mapThumbs[m.id]}" alt="${m.name}"><b>${m.name}</b><p>${m.desc}</p><span>${m.tag} · ${m.size}</span>`;
    div.addEventListener('click', () => {
      state.map = m.id; persist();
      document.querySelectorAll('.map-card').forEach(x => x.classList.toggle('selected', x.dataset.map === m.id));
      updatePlayMeta(); closeModals(); toast(`${m.name} selecionado`);
    });
    grid.appendChild(div);
  }
}

/* =================================================================
   MODALS / UI ACTIONS
================================================================= */
function openModal(id) {
  $('modal-layer').classList.remove('hidden');
  document.querySelectorAll('.modal-panel').forEach(p => p.classList.add('hidden'));
  $(id).classList.remove('hidden');
  audio.ui();
}
function closeModals() {
  $('modal-layer').classList.add('hidden');
  document.querySelectorAll('.modal-panel').forEach(p => p.classList.add('hidden'));
}
function toast(msg) {
  const t = $('toast');
  t.textContent = msg; t.classList.remove('hidden'); t.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => { t.classList.remove('show'); t.classList.add('hidden'); }, 2200);
}
function bindUI() {
  document.querySelectorAll('.close-modal').forEach(b => b.addEventListener('click', closeModals));
  $('modal-backdrop').addEventListener('click', closeModals);
  $('roster-btn').addEventListener('click', () => openModal('roster-panel'));
  $('roster-toggle')?.addEventListener('click', () => openModal('roster-panel'));
  $('arsenal-btn').addEventListener('click', () => openModal('arsenal-panel'));
  $('loadout-btn').addEventListener('click', () => openModal('arsenal-panel'));
  $('maps-btn').addEventListener('click', () => openModal('map-panel'));
  $('map-info-btn').addEventListener('click', () => openModal('map-panel'));
  $('settings-btn').addEventListener('click', () => openModal('settings-panel'));
  $('how-btn').addEventListener('click', () => openModal('how-panel'));
  $('custom-btn').addEventListener('click', () => openModal('custom-panel'));
  $('pause-settings-btn').addEventListener('click', () => { game.pause(); $('pause-menu').classList.add('hidden'); openModal('settings-panel'); });
  $('char-prev').addEventListener('click', () => {
    const i = CHARACTERS.findIndex(c => c.id === state.char);
    selectCharacter(CHARACTERS[(i - 1 + CHARACTERS.length) % CHARACTERS.length].id, 'entry');
  });
  $('char-next').addEventListener('click', () => {
    const i = CHARACTERS.findIndex(c => c.id === state.char);
    selectCharacter(CHARACTERS[(i + 1) % CHARACTERS.length].id, 'entry');
  });
  document.querySelectorAll('.anim-buttons button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.anim-buttons button').forEach(x => x.classList.toggle('active', x === b));
    state.anim = b.dataset.anim; state.animT = 0;
    if (state.anim === 'entry') charRoot.position.x = 3.4;
    audio.ui();
  }));
  $('play-btn').addEventListener('click', () => {
    audio.init(); audio.resume();
    startMatch({ mode: state.mode, mapId: state.map, charId: state.char, weaponId: state.weapon, skinId: state.skin, botCount: 5 });
  });
  $('custom-start').addEventListener('click', () => {
    audio.init(); audio.resume();
    const mode = document.querySelector('#custom-modes button.active')?.dataset.cmode || state.mode;
    const bots = Number($('bot-range').value) || 5;
    const limit = Number($('score-range').value) || modeById(mode).limit;
    state.mode = mode; persist();
    document.querySelectorAll('.mode-card').forEach(x => x.classList.toggle('selected', x.dataset.mode === mode));
    updatePlayMeta();
    closeModals();
    startMatch({ mode, mapId: state.map, charId: state.char, weaponId: state.weapon, skinId: state.skin, botCount: bots, scoreLimit: limit });
  });
  document.querySelectorAll('#custom-modes button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('#custom-modes button').forEach(x => x.classList.toggle('active', x === b));
    updateCustomSummary();
  }));
  $('bot-range').addEventListener('input', updateCustomSummary);
  $('score-range').addEventListener('input', updateCustomSummary);
  // pause / end
  $('pause-btn').addEventListener('click', () => game.pause());
  $('resume-btn').addEventListener('click', () => game.resume());
  $('quit-btn').addEventListener('click', () => exitToMenu());
  $('scoreboard-close').addEventListener('click', () => game.showScoreboard(false));
  $('rematch-btn').addEventListener('click', () => {
    const cfg = game.config;
    $('end-screen').classList.add('hidden');
    startMatch({ mode: cfg.mode, mapId: cfg.mapId, charId: cfg.charId, weaponId: cfg.weaponId, skinId: cfg.skinId, botCount: cfg.botCount, scoreLimit: cfg.scoreLimit });
  });
  $('menu-btn').addEventListener('click', exitToMenu);
  // settings
  $('sens-slider').value = state.sensitivity * 100;
  $('sens-value').textContent = Math.round(state.sensitivity * 100) + '%';
  $('sens-slider').addEventListener('input', e => {
    state.sensitivity = Number(e.target.value) / 100;
    $('sens-value').textContent = e.target.value + '%';
    game.setSensitivity(state.sensitivity); persist();
  });
  document.querySelectorAll('#quality-seg button').forEach(b => {
    b.classList.toggle('active', b.dataset.q === state.quality);
    b.addEventListener('click', () => {
      state.quality = b.dataset.q; persist();
      document.querySelectorAll('#quality-seg button').forEach(x => x.classList.toggle('active', x === b));
      applyQuality();
    });
  });
  document.querySelectorAll('#audio-seg button').forEach(b => {
    b.classList.toggle('active', (b.dataset.a === 'on') === state.audio);
    b.addEventListener('click', () => {
      state.audio = b.dataset.a === 'on'; persist();
      audio.setMuted(!state.audio);
      document.querySelectorAll('#audio-seg button').forEach(x => x.classList.toggle('active', x === b));
    });
  });
  document.querySelectorAll('#assist-seg button').forEach(b => {
    b.classList.toggle('active', (b.dataset.as === 'on') === state.assist);
    b.addEventListener('click', () => {
      state.assist = b.dataset.as === 'on'; persist();
      game.aimAssist = state.assist;
      document.querySelectorAll('#assist-seg button').forEach(x => x.classList.toggle('active', x === b));
    });
  });
  $('reset-settings').addEventListener('click', () => {
    state.sensitivity = 1; state.quality = 'medium'; state.audio = true; state.assist = true;
    persist(); applyQuality(); game.setSensitivity(1); audio.setMuted(false);
    $('sens-slider').value = 100; $('sens-value').textContent = '100%';
    document.querySelectorAll('#quality-seg button').forEach(x => x.classList.toggle('active', x.dataset.q === 'medium'));
    document.querySelectorAll('#audio-seg button').forEach(x => x.classList.toggle('active', x.dataset.a === 'on'));
    document.querySelectorAll('#assist-seg button').forEach(x => x.classList.toggle('active', x.dataset.as === 'on'));
  });
}
function applyQuality() {
  const pr = state.quality === 'high' ? 2 : state.quality === 'medium' ? 1.5 : 1;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, pr));
  renderer.shadowMap.enabled = state.quality !== 'low';
  renderer.setSize(innerWidth, innerHeight);
  if (game) game.setQuality(state.quality);
}

/* =================================================================
   START / EXIT / LOOP
================================================================= */
let game = null;
let transitioning = false;
function showLoading(config) {
  $('loading-screen').classList.remove('hidden');
  $('loading-map').textContent = mapById(config.mapId).name;
  $('loading-mode').textContent = modeById(config.mode).name;
  $('loading-status').textContent = 'MOBILIZANDO OPERADORES...';
  $('loading-tip').textContent = TIPS[Math.floor(Math.random() * TIPS.length)];
  $('loading-fill').style.width = '4%';
  $('vs-blue-name').textContent = charById(config.charId).name;
  const enemy = CHARACTERS[(CHARACTERS.findIndex(c => c.id === config.charId) + 4) % CHARACTERS.length];
  document.querySelector('.vs-orange h2').textContent = enemy.name;
  document.querySelector('.vs-blue p').textContent = modeById(config.mode).team ? 'Você + especialistas' : 'Você contra todos';
  document.querySelector('.vs-orange p').textContent = modeById(config.mode).team ? 'Esquadrão inimigo' : '7 operadores rivais';
  $('menu').classList.add('hidden');
  closeModals();
  $('end-screen').classList.add('hidden');
  setTimeout(() => { $('loading-fill').style.width = '42%'; $('loading-status').textContent = 'CARREGANDO SETOR DE OPERAÇÃO...'; }, 120);
  setTimeout(() => { $('loading-fill').style.width = '76%'; $('loading-status').textContent = 'SINCRONIZANDO ARSENAL...'; }, 300);
}
function startMatch(config) {
  if (transitioning) return;
  transitioning = true;
  showLoading(config);
  setTimeout(() => {
    $('loading-fill').style.width = '100%';
    $('loading-status').textContent = 'CAOS PRONTO.';
    game.portraits = portraits;
    game.aimAssist = state.assist;
    game.setSensitivity(state.sensitivity);
    game.start(config);
    setTimeout(() => {
      $('loading-screen').classList.add('hidden');
      $('match-ui').classList.remove('hidden');
      transitioning = false;
    }, 120);
  }, 300);
}
function exitToMenu() {
  if (game) game.stop();
  $('match-ui').classList.add('hidden');
  $('loading-screen').classList.add('hidden');
  $('end-screen').classList.add('hidden');
  $('pause-menu').classList.add('hidden');
  $('menu').classList.remove('hidden');
  transitioning = false;
  audio.setIntense(false);
  if (state.audio) audio.startMusic(false);
  setPreviewCharacter(state.char, 'idle');
  charRoot.position.x = 1.35;
}
function loop(now) {
  const dt = Math.min(.05, (now - (loop.last || now)) / 1000);
  loop.last = now;
  if (game && game.active) {
    game.update(dt);
    game.render();
  } else {
    const t = now / 1000;
    if (activePreview) {
      state.animT += dt;
      if (state.anim === 'entry' && state.animT < .9) {
        charRoot.position.x += (1.35 - charRoot.position.x) * Math.min(1, dt * 7);
      }
      poseCharacter(activePreview, t, state.anim);
    }
    stageRing.rotation.z = t * .32;
    stageRing2.rotation.z = -t * .18;
    glyphs.rotation.y = t * .06;
    for (const g of glyphs.children) {
      g.rotation.x = t * g.userData.spin; g.rotation.y = t * g.userData.spin * .7;
    }
    menuDust.rotation.y = t * .012;
    // subtle parallax
    const px = (menuPointer.x - .5) * .22, py = (menuPointer.y - .5) * .12;
    menuCamera.position.x = .05 + px;
    menuCamera.position.y = 1.52 - py;
    menuCamera.lookAt(menuLook);
    renderer.render(menuScene, menuCamera);
  }
  requestAnimationFrame(loop);
}
const menuPointer = { x: .5, y: .5 };
window.addEventListener('pointermove', e => {
  menuPointer.x = e.clientX / innerWidth;
  menuPointer.y = e.clientY / innerHeight;
});

/* =================================================================
   BOOT
================================================================= */
function resize() {
  renderer.setSize(innerWidth, innerHeight);
  menuCamera.aspect = innerWidth / innerHeight;
  menuCamera.updateProjectionMatrix();
  if (game) game.resize();
  if (innerWidth < 760) {
    menuCamera.fov = 52;
    menuCamera.position.set(.9, 1.8, 7.4);
    menuLook.set(1.05, 1.98, 0);
  } else {
    menuCamera.fov = 43;
    menuCamera.position.set(.05, 1.52, 5.5);
    menuLook.set(.38, 1.08, 0);
  }
  menuCamera.updateProjectionMatrix();
  menuCamera.lookAt(menuLook);
}
window.addEventListener('resize', resize);

function boot() {
  buildRoster();
  buildModes();
  buildMapStrip();
  buildWeaponUI();
  buildCustomMaps();
  buildMapDetails();
  bindUI();
  renderOperatorMeta();
  updatePlayMeta();
  updateLoadout();
  updateCustomSummary();
  resize();
  setPreviewCharacter(state.char, 'idle');
  applyQuality();
  audio.setMuted(!state.audio);
  if (state.audio) setTimeout(() => audio.startMusic(false), 1000);
  game = new Game({
    canvas, renderer,
    onExit: () => exitToMenu(),
    onMatchEnd: (result) => {
      if (result.victory) toast('VITÓRIA! O caos está organizado.');
    }
  });
  game.portraits = portraits;
  game.setQuality(state.quality);
  game.aimAssist = state.assist;
  game.setSensitivity(state.sensitivity);
  // generate portraits after first paint so the menu appears instantly
  setTimeout(() => {
    try {
      const p = renderPortraits(CHARACTERS);
      Object.assign(portraits, p);
      for (const [id, img] of rosterCardImgs) if (p[id]) { img.src = p[id]; img.style.background = 'transparent'; }
      game.portraits = portraits;
    } catch (error) { console.warn('Portrait render skipped', error); }
  }, 180);
  requestAnimationFrame(loop);
  // debug hook for automated verification
  window.__CAOS__ = {
    game,
    state,
    startMatch,
    exitToMenu,
    selectCharacter,
    get active() { return game?.active; }
  };
}

boot();
