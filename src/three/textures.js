// Procedural canvas textures. Everything is generated in-browser: no external art assets.
import * as THREE from 'three';

const cache = new Map();

function canvas(w = 512, h = 512) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function texture(c, key, { repeat = null, srgb = true } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat[0], repeat[1]);
  }
  t.needsUpdate = true;
  if (key) cache.set(key, t);
  return t;
}

export function patternTexture(colors, pattern = 'solid', key = null) {
  const ck = key || `pat-${colors.join('')}-${pattern}`;
  if (cache.has(ck)) return cache.get(ck);
  const c = canvas(512, 512);
  const ctx = c.getContext('2d');
  const [a, b, d] = colors;
  ctx.fillStyle = a;
  ctx.fillRect(0, 0, 512, 512);
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, 'rgba(255,255,255,.16)');
  grad.addColorStop(0.45, 'rgba(255,255,255,0)');
  grad.addColorStop(1, 'rgba(0,0,0,.32)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  ctx.fillStyle = b;
  const stripe = (x, w, color = b) => { ctx.fillStyle = color; ctx.fillRect(x, 0, w, 512); };
  switch (pattern) {
    case 'stripe':
      ctx.fillStyle = b; ctx.fillRect(40, 0, 44, 512); ctx.fillRect(428, 0, 44, 512);
      ctx.fillStyle = d; ctx.fillRect(94, 0, 12, 512); ctx.fillRect(406, 0, 12, 512);
      break;
    case 'dual':
      ctx.fillStyle = b; ctx.fillRect(0, 210, 512, 92);
      ctx.fillStyle = d; ctx.fillRect(0, 226, 512, 10);
      break;
    case 'gradient': {
      const g = ctx.createLinearGradient(0, 0, 0, 512);
      g.addColorStop(0, a); g.addColorStop(1, b);
      ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 512);
      ctx.fillStyle = d; ctx.fillRect(0, 470, 512, 16);
      break;
    }
    case 'checker': {
      ctx.fillStyle = b;
      for (let y = 0; y < 512; y += 64) for (let x = 0; x < 512; x += 64) {
        if ((x / 64 + y / 64) % 2 === 0) ctx.fillRect(x, y, 64, 64);
      }
      break;
    }
    case 'stars': {
      ctx.fillStyle = d;
      for (let i = 0; i < 26; i++) {
        const x = (i * 137) % 512, y = (i * 79) % 512, s = 4 + (i % 4) * 2;
        ctx.beginPath();
        for (let k = 0; k < 10; k++) {
          const ang = (Math.PI / 5) * k - Math.PI / 2;
          const r = k % 2 === 0 ? s * 2.2 : s;
          ctx.lineTo(x + Math.cos(ang) * r, y + Math.sin(ang) * r);
        }
        ctx.closePath(); ctx.fill();
      }
      ctx.fillStyle = b; ctx.fillRect(0, 470, 512, 30);
      break;
    }
    case 'diagonal': {
      ctx.fillStyle = b;
      for (let i = -512; i < 1024; i += 128) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + 52, 0); ctx.lineTo(i + 564, 512); ctx.lineTo(i + 512, 512); ctx.closePath(); ctx.fill();
      }
      break;
    }
    case 'vsplit': {
      ctx.fillStyle = b;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(256, 0); ctx.lineTo(256, 512); ctx.lineTo(0, 512); ctx.closePath(); ctx.fill();
      ctx.fillStyle = d; ctx.fillRect(250, 0, 12, 512);
      break;
    }
    case 'rings': {
      ctx.strokeStyle = b; ctx.lineWidth = 26;
      for (let r = 50; r < 440; r += 80) { ctx.beginPath(); ctx.arc(256, 256, r, 0, Math.PI * 2); ctx.stroke(); }
      break;
    }
    case 'flame': {
      ctx.fillStyle = b;
      for (let i = 0; i < 9; i++) {
        const x = i * 60 - 20;
        ctx.beginPath(); ctx.moveTo(x, 512); ctx.quadraticCurveTo(x + 20, 380, x + 42, 320); ctx.quadraticCurveTo(x + 60, 400, x + 80, 512); ctx.closePath(); ctx.fill();
      }
      ctx.fillStyle = d;
      for (let i = 0; i < 9; i++) {
        const x = i * 60 + 2;
        ctx.beginPath(); ctx.moveTo(x, 512); ctx.quadraticCurveTo(x + 12, 430, x + 32, 400); ctx.quadraticCurveTo(x + 40, 450, x + 50, 512); ctx.closePath(); ctx.fill();
      }
      break;
    }
    case 'geo': {
      ctx.fillStyle = b;
      for (let i = 0; i < 7; i++) {
        ctx.save(); ctx.translate((i % 3) * 180 + 60, Math.floor(i / 3) * 180 + 80); ctx.rotate(i * 0.5);
        ctx.fillRect(-55, -55, 110, 110); ctx.restore();
      }
      break;
    }
    case 'wave': {
      ctx.strokeStyle = b; ctx.lineWidth = 34;
      for (let y = -40; y < 560; y += 90) {
        ctx.beginPath();
        for (let x = 0; x <= 512; x += 8) ctx.lineTo(x, y + Math.sin(x / 55 + y) * 22);
        ctx.stroke();
      }
      break;
    }
    case 'solid':
    default:
      ctx.fillStyle = b; ctx.fillRect(0, 460, 512, 22);
      ctx.fillStyle = d; ctx.fillRect(0, 482, 512, 8);
  }
  // Fabric grain
  const img = ctx.getImageData(0, 0, 512, 512);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 14;
    img.data[i] = Math.max(0, Math.min(255, img.data[i] + n));
    img.data[i + 1] = Math.max(0, Math.min(255, img.data[i + 1] + n));
    img.data[i + 2] = Math.max(0, Math.min(255, img.data[i + 2] + n));
  }
  ctx.putImageData(img, 0, 0);
  return texture(c, ck);
}

export function ringCanvasTexture(arena = {}) {
  const key = `ring-${arena.id || 'default'}-${arena.mat || ''}`;
  if (cache.has(key)) return cache.get(key);
  const c = canvas(1024, 1024);
  const ctx = c.getContext('2d');
  const mat = arena.mat || '#1a1a20';
  ctx.fillStyle = mat;
  ctx.fillRect(0, 0, 1024, 1024);
  const g = ctx.createRadialGradient(512, 512, 80, 512, 512, 720);
  g.addColorStop(0, 'rgba(255,255,255,.12)');
  g.addColorStop(1, 'rgba(0,0,0,.45)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 1024, 1024);
  // Center emblem
  ctx.save();
  ctx.translate(512, 512);
  ctx.globalAlpha = 0.32;
  const accent = arena.accent || '#f2c14e';
  ctx.strokeStyle = accent;
  ctx.lineWidth = 12;
  ctx.beginPath(); ctx.arc(0, 0, 250, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, 205, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = accent;
  ctx.font = 'bold 120px Bebas Neue, Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('TG', 0, 15);
  ctx.font = 'bold 34px Barlow Condensed, sans-serif';
  ctx.fillText('BOXING', 0, 70);
  ctx.font = '600 20px Barlow Condensed, sans-serif';
  ctx.fillText('THE GLORY OF CHAMPIONS', 0, 118);
  ctx.restore();
  // Sponsors on canvas edges
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = '#f5f5f4';
  ctx.font = '700 30px Barlow Condensed, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('TG COIN  •  CHAMPIONS SERIES  •  TG BOXING NEWS', 512, 950);
  // Wear marks
  ctx.globalAlpha = 0.12;
  for (let i = 0; i < 80; i++) {
    ctx.fillStyle = i % 2 ? '#000' : '#fff';
    ctx.fillRect(Math.random() * 1024, Math.random() * 1024, Math.random() * 14 + 2, 1.5);
  }
  ctx.globalAlpha = 1;
  return texture(c, key);
}

export function apronTexture(arena = {}) {
  const key = `apron-${arena.id || 'default'}`;
  if (cache.has(key)) return cache.get(key);
  const c = canvas(1024, 256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = arena.accent2 || '#111827';
  ctx.fillRect(0, 0, 1024, 256);
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, 'rgba(255,255,255,.16)');
  g.addColorStop(1, 'rgba(0,0,0,.5)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 1024, 256);
  ctx.strokeStyle = arena.accent || '#f2c14e';
  ctx.lineWidth = 6;
  ctx.strokeRect(14, 14, 996, 228);
  ctx.fillStyle = '#f5f5f4';
  ctx.textAlign = 'center';
  ctx.font = 'bold 82px Bebas Neue, Impact, sans-serif';
  ctx.fillText('TG BOXING', 512, 132);
  ctx.font = '600 28px Barlow Condensed, sans-serif';
  ctx.fillStyle = arena.accent || '#f2c14e';
  ctx.fillText('THE GLORY OF CHAMPIONS', 512, 178);
  return texture(c, key);
}

export function bannerTexture(arena, title = 'TG BOXING') {
  const key = `banner-${arena.id}-${title}`;
  if (cache.has(key)) return cache.get(key);
  const c = canvas(512, 1024);
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 1024);
  g.addColorStop(0, arena.accent2 || '#111827');
  g.addColorStop(1, '#07070a');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 1024);
  ctx.strokeStyle = arena.accent;
  ctx.lineWidth = 10;
  ctx.strokeRect(24, 24, 464, 976);
  ctx.fillStyle = arena.accent;
  ctx.font = 'bold 150px Bebas Neue, Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.save();
  ctx.translate(256, 400);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(title, 0, 0);
  ctx.restore();
  ctx.font = 'bold 52px Barlow Condensed, sans-serif';
  ctx.fillStyle = '#f5f5f4';
  ctx.save();
  ctx.translate(256, 512);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('FIGHT NIGHT', 200, -18);
  ctx.restore();
  return texture(c, key);
}

export function screenTexture(text = 'TG BOXING', sub = 'THE GLORY OF CHAMPIONS', accent = '#f2c14e') {
  const key = `screen-${text}-${sub}-${accent}`;
  if (cache.has(key)) return cache.get(key);
  const c = canvas(1024, 576);
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 1024, 576);
  g.addColorStop(0, '#09090d');
  g.addColorStop(0.5, '#15101a');
  g.addColorStop(1, '#050507');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 1024, 576);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 6;
  ctx.strokeRect(20, 20, 984, 536);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f5f5f4';
  ctx.font = 'bold 126px Bebas Neue, Impact, sans-serif';
  ctx.fillText(text, 512, 260);
  ctx.fillStyle = accent;
  ctx.font = '600 34px Barlow Condensed, sans-serif';
  ctx.fillText(sub, 512, 320);
  ctx.fillStyle = 'rgba(245,245,244,.55)';
  ctx.font = '500 24px Barlow Condensed, sans-serif';
  ctx.fillText('T G   B O X I N G   •   L I V E', 512, 450);
  return texture(c, key);
}

export function radialGlowTexture(color = '#ffffff', size = 128) {
  const key = `glow-${color}-${size}`;
  if (cache.has(key)) return cache.get(key);
  const c = canvas(size, size);
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, color);
  g.addColorStop(0.25, color);
  g.addColorStop(0.6, 'rgba(255,255,255,.18)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return texture(c, key);
}

export function sparkTexture() {
  if (cache.has('spark')) return cache.get('spark');
  const c = canvas(256, 256);
  const ctx = c.getContext('2d');
  ctx.translate(128, 128);
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 120);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.16, 'rgba(255,241,190,.95)');
  g.addColorStop(0.45, 'rgba(255,140,60,.35)');
  g.addColorStop(1, 'rgba(255,100,40,0)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(0, 0, 120, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.9)';
  ctx.lineWidth = 3;
  for (let i = 0; i < 12; i++) {
    const a = (Math.PI * 2 * i) / 12;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * 20, Math.sin(a) * 20);
    ctx.lineTo(Math.cos(a) * (60 + Math.random() * 55), Math.sin(a) * (60 + Math.random() * 55));
    ctx.stroke();
  }
  return texture(c, 'spark');
}

export function logoTexture() {
  if (cache.has('logo')) return cache.get('logo');
  const c = canvas(1024, 512);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 1024, 512);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f2c14e';
  ctx.font = 'bold 220px Bebas Neue, Impact, sans-serif';
  ctx.fillText('TG BOXING', 512, 280);
  ctx.fillStyle = '#f5f5f4';
  ctx.font = '600 52px Barlow Condensed, sans-serif';
  ctx.fillText('THE GLORY OF CHAMPIONS', 512, 360);
  return texture(c, 'logo');
}

export function beltPlateTexture(belt = {}) {
  const key = `belt-${belt.org || 'tgb'}-${belt.tier || 'world'}-${belt.name || ''}-${belt.holder || ''}`;
  if (cache.has(key)) return cache.get(key);
  const orgColors = { tgb: '#f2c14e', gbu: '#93c5fd', wca: '#6ee7b7' };
  const accent = orgColors[belt.org] || '#f2c14e';
  const c = canvas(512, 512);
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(256, 256, 20, 256, 256, 250);
  g.addColorStop(0, '#fff7cf');
  g.addColorStop(0.4, accent);
  g.addColorStop(1, '#5b3a08');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(256, 256, 240, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#3a2405';
  ctx.lineWidth = 14;
  ctx.beginPath(); ctx.arc(256, 256, 228, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#1b1307';
  ctx.textAlign = 'center';
  ctx.font = 'bold 100px Bebas Neue, Impact, sans-serif';
  ctx.fillText((belt.org || 'TGB').toUpperCase(), 256, 250);
  ctx.font = '600 36px Barlow Condensed, sans-serif';
  ctx.fillText((belt.tier || 'WORLD').toUpperCase(), 256, 310);
  ctx.font = '500 24px Barlow Condensed, sans-serif';
  ctx.fillText('CHAMPION', 256, 350);
  return texture(c, key);
}

export function crowdBillboardTexture() {
  if (cache.has('crowd-billboard')) return cache.get('crowd-billboard');
  const c = canvas(1024, 256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#09090d';
  ctx.fillRect(0, 0, 1024, 256);
  ctx.fillStyle = '#f2c14e';
  ctx.fillRect(0, 0, 1024, 8);
  ctx.fillRect(0, 248, 1024, 8);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f5f5f4';
  ctx.font = 'bold 96px Bebas Neue, Impact, sans-serif';
  ctx.fillText('TG BOXING  •  CHAMPIONS SERIES', 512, 150);
  ctx.fillStyle = '#c1121f';
  ctx.font = '600 32px Barlow Condensed, sans-serif';
  ctx.fillText('THE GLORY OF CHAMPIONS', 512, 200);
  return texture(c, 'crowd-billboard');
}

export function disposeTextureCache() {
  for (const t of cache.values()) t.dispose?.();
  cache.clear();
}
