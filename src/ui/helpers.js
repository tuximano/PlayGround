// Small DOM + formatting helpers shared by every screen.
import { COUNTRY_BY_CODE, DIVISION_BY_ID, ORGS, BELT_TIERS } from '../core/data.js';

const escMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => escMap[c]);
}

export function h(html) {
  const template = document.createElement('template');
  template.innerHTML = String(html).trim();
  return template.content.firstElementChild;
}

export function frag(html) {
  const template = document.createElement('template');
  template.innerHTML = String(html).trim();
  return template.content;
}

export function fmtNum(n) {
  return new Intl.NumberFormat('pt-BR').format(Math.round(Number(n) || 0));
}

export function fmtMoney(n) {
  return `C$ ${fmtNum(n)}`;
}

export function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '');
}

export function fmtDateShort(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

export function initials(name = '') {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase() || 'TG';
}

export function recordText(record) {
  return `${record?.w || 0}-${record?.l || 0}-${record?.d || 0}`;
}

export function countryName(code) {
  return COUNTRY_BY_CODE[code]?.name || code || '—';
}

export function divisionName(id) {
  return DIVISION_BY_ID[id]?.name || 'Peso-Médio';
}

export function orgOf(id) {
  return ORGS.find((o) => o.id === id) || ORGS[0];
}

export function beltTierName(id) {
  return BELT_TIERS.find((t) => t.id === id)?.name || 'Cinturão';
}

export function pct(value, max = 100) {
  return `${Math.max(0, Math.min(100, (Number(value) / max) * 100))}%`;
}

export function attrBars(attributes, compact = false) {
  const rows = [
    ['strength', 'Força'], ['speed', 'Velocidade'], ['stamina', 'Resistência'], ['precision', 'Precisão'],
    ['defense', 'Defesa'], ['reflexes', 'Reflexos'], ['mobility', 'Mobilidade'], ['recovery', 'Recuperação'],
    ['conditioning', 'Condicionamento'],
  ];
  return `<div class="bars">${rows.map(([key, label]) => `
    <div class="bar-row"><span>${label}</span><span class="bar-track"><i class="bar-fill" style="width:${pct(attributes?.[key] || 0)}"></i></span><span class="attr-value">${Math.round(attributes?.[key] || 0)}</span></div>
  `).join('')}</div>${compact ? '' : ''}`;
}

export function overall(attributes) {
  const vals = Object.values(attributes || {});
  if (!vals.length) return 0;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

export function screenHead({ kicker, title, sub, actions = '' }) {
  return `<div class="screen-head">
    <div>
      ${kicker ? `<div class="kicker">${esc(kicker)}</div>` : ''}
      <h1 class="screen-title">${title}</h1>
      ${sub ? `<p class="screen-sub">${sub}</p>` : ''}
    </div>
    ${actions ? `<div class="head-actions">${actions}</div>` : ''}
  </div>`;
}

export function statTile(label, value, sub = '', accent = false) {
  return `<div class="stat-tile ${accent ? 'accent' : ''}"><div class="label">${label}</div><div class="value">${value}</div>${sub ? `<div class="sub">${sub}</div>` : ''}</div>`;
}

export function emptyState(iconName, title, text, action = '') {
  return `<div class="empty-state">${iconName}<b>${title}</b><p>${text}</p>${action}</div>`;
}

export function debounce(fn, ms = 60) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => { timer = null; fn(...args); }, ms);
  };
}

export function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

export function ordinal(n) {
  return `${n}º`;
}
