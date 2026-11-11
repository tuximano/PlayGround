// Full character editor with 100+ options per apparel/hair category and live 3D preview.
import { icon } from '../icons.js';
import { esc, h, countryName, divisionName, overall, debounce } from '../helpers.js';
import {
  CATALOGS, HAIR, BEARDS, BROWS, FACE_SHAPES, EYES, NOSES, MOUTHS, SCARS, SKIN_TONES,
  SHORTS, TOPS, SHOES, ROBES, GLOVES, COLORWAYS, COUNTRIES, DIVISIONS, STYLES,
} from '../../core/data.js';
import { randomAppearance } from '../../core/appearance.js';
import { persist } from '../../core/store.js';

const CATS = [
  { id: 'profile', name: 'Perfil', icon: 'person' },
  { id: 'hair', name: 'Cabelo & Barba', icon: 'spark' },
  { id: 'face', name: 'Rosto', icon: 'eye' },
  { id: 'skin', name: 'Pele', icon: 'globe' },
  { id: 'body', name: 'Corpo', icon: 'people' },
  { id: 'shorts', name: 'Shorts', icon: 'robe' },
  { id: 'top', name: 'Camisa', icon: 'robe' },
  { id: 'glove', name: 'Luvas', icon: 'glove' },
  { id: 'shoe', name: 'Sapatos', icon: 'feet' },
  { id: 'robe', name: 'Roupão', icon: 'robe' },
  { id: 'colorway', name: 'Cores', icon: 'grid' },
];

export function editorScreen(ui, data = {}) {
  const creating = data.mode === 'create' || !ui.save;
  if (creating && !ui.draft) {
    const fallback = h('<div class="screen plain"><div class="empty-state"><b>Crie seu lutador primeiro</b><p>Use a tela de criação para começar.</p><button class="btn btn-primary" data-nav="create">Criar carreira</button></div></div>');
    return fallback;
  }
  const profile = creating ? null : ui.save.profile;
  const appearance = creating ? ui.draft.appearance : { ...profile.appearance };
  const meta = creating ? {
    name: ui.draft.name, nickname: ui.draft.nickname, nationality: ui.draft.nationality,
    division: ui.draft.division, style: ui.draft.style, age: ui.draft.age,
    height: appearance.height, reach: appearance.reach,
  } : { ...profile, height: appearance.height, reach: appearance.reach };
  let active = ['hair', 'face', 'skin', 'body', 'shorts', 'glove', 'colorway'].includes(data.cat) ? data.cat : 'profile';
  let search = '';

  const el = h(`<div class="editor">
    <div class="editor-left">
      <button class="cat-btn" data-nav="${creating ? 'create' : 'career'}">${icon('back', 16)} <span class="lbl">Voltar</span></button>
      ${CATS.map((c) => `<button class="cat-btn ${c.id === active ? 'active' : ''}" data-cat="${c.id}">${icon(c.icon, 16)} <span class="lbl">${c.name}</span></button>`).join('')}
      <button class="cat-btn done" data-action="save">${icon('check', 16)} <span class="lbl">${creating ? 'Confirmar' : 'Salvar'}</span></button>
    </div>
    <div class="editor-center">
      <div class="hint">Arraste para girar · ${creating ? 'prévia de criação' : 'editor do lutador'}</div>
      <div class="editor-stats">
        <div class="editor-stat"><b data-stat-height>${Math.round(162 + appearance.height * 42)}</b><span>Altura cm</span></div>
        <div class="editor-stat"><b data-stat-reach>${Math.round(168 + appearance.reach * 30)}</b><span>Alcance cm</span></div>
        <div class="editor-stat"><b data-stat-overall>${creating ? overall(ui.draft.attributes) : overall(profile.attributes)}</b><span>Overall</span></div>
        <div class="editor-stat"><b>${appearanceCount()}</b><span>Opções</span></div>
      </div>
    </div>
    <div class="editor-right">
      <div class="editor-head">
        <h2 data-head-title>${CATS.find((c) => c.id === active)?.name || 'Perfil'}</h2>
        <div class="sub">${creating ? 'CRIAÇÃO DE LUTADOR' : 'PERSONALIZAÇÃO'}</div>
      </div>
      <div class="editor-scroll" data-editor-scroll></div>
      <div class="editor-footer">
        <button class="btn btn-sm" data-action="random">${icon('swap', 14)} Aleatório</button>
        <span class="spacer"></span>
        <button class="btn btn-sm btn-primary" data-action="save">${creating ? 'Confirmar' : 'Salvar'}</button>
      </div>
    </div>
  </div>`);

  const scroll = el.querySelector('[data-editor-scroll]');
  const headTitle = el.querySelector('[data-head-title]');

  const previewNow = debounce(() => {
    if (ui.app.background?.kind === 'studio' && ui.app.background.boxer) {
      ui.app.showEditor(appearance);
      positionBoxer();
    }
  }, 90);
  ui.onCleanup(() => previewNow.cancel?.());

  const positionBoxer = () => {
    const boxer = ui.app.background?.boxer;
    if (boxer) {
      boxer.root.position.x = window.innerWidth > 980 ? -0.15 : 0;
      boxer.root.position.y = 0.14;
    }
  };
  setTimeout(positionBoxer, 60);

  const updateStats = () => {
    el.querySelector('[data-stat-height]').textContent = Math.round(162 + appearance.height * 42);
    el.querySelector('[data-stat-reach]').textContent = Math.round(168 + appearance.reach * 30);
  };

  const setApp = (key, val) => {
    appearance[key] = val;
    if (creating) {
      ui.draft.appearance = appearance;
    }
    previewNow();
    updateStats();
  };

  const render = () => {
    headTitle.textContent = CATS.find((c) => c.id === active)?.name || 'Perfil';
    el.querySelectorAll('[data-cat]').forEach((b) => b.classList.toggle('active', b.dataset.cat === active));
    if (active === 'profile') scroll.innerHTML = renderProfile();
    else if (active === 'body') scroll.innerHTML = renderBody();
    else scroll.innerHTML = renderOptions();
    bind();
  };

  const renderProfile = () => {
    if (creating) {
      return `<div class="editor-group">
        <h3>Identidade</h3>
        <div class="field"><label>Nome</label><input class="input" data-meta="name" maxlength="26" value="${esc(meta.name)}"></div>
        <div class="field"><label>Apelido</label><input class="input" data-meta="nickname" maxlength="24" value="${esc(meta.nickname || '')}"></div>
        <div class="field"><label>Nacionalidade</label><select class="input" data-meta="nationality">${COUNTRIES.map((c) => `<option value="${c.code}" ${meta.nationality === c.code ? 'selected' : ''}>${c.name}</option>`).join('')}</select></div>
        <div class="field"><label>Divisão</label><select class="input" data-meta="division">${DIVISIONS.map((d) => `<option value="${d.id}" ${meta.division === d.id ? 'selected' : ''}>${d.name}</option>`).join('')}</select></div>
      </div>
      <div class="notice">As roupas, cabelos e cores ficam salvos no seu perfil. Use as categorias à esquerda para explorar mais de 700 combinações.</div>
      <button class="btn btn-block" style="margin-top:12px" data-action="back-create">${icon('back', 15)} Voltar à criação (atributos)</button>`;
    }
    return `<div class="editor-group">
      <h3>Identidade</h3>
      <div class="field"><label>Nome</label><input class="input" data-meta="name" maxlength="26" value="${esc(meta.name)}"></div>
      <div class="field"><label>Apelido</label><input class="input" data-meta="nickname" maxlength="24" value="${esc(meta.nickname || '')}"></div>
      <div class="field"><label>Nacionalidade</label><select class="input" data-meta="nationality">${COUNTRIES.map((c) => `<option value="${c.code}" ${meta.nationality === c.code ? 'selected' : ''}>${c.name}</option>`).join('')}</select></div>
      <div class="field"><label>Divisão</label><input class="input" value="${divisionName(meta.division)}" disabled></div>
      <div class="field"><label>Estilo</label><input class="input" value="${STYLES.find((s) => s.id === meta.style)?.name || '—'}" disabled></div>
    </div>
    <div class="editor-group"><h3>Carreira</h3>
      <div class="row" style="gap:7px;flex-wrap:wrap">
        <span class="chip">${divisionName(meta.division)}</span><span class="chip">${countryName(meta.nationality)}</span><span class="chip">Overall ${overall(profile.attributes)}</span>
      </div>
      <p class="tiny" style="margin-top:10px">A divisão não pode ser alterada durante a carreira. Atributos evoluem na Academia.</p>
    </div>`;
  };

  const renderBody = () => `<div class="editor-group">
    <h3>Estrutura <span>afeta a prévia 3D</span></h3>
    ${slider('height', 'Altura', appearance.height)}
    ${slider('reach', 'Alcance', appearance.reach)}
    ${slider('muscle', 'Massa muscular', appearance.muscle)}
    ${slider('width', 'Largura de ombros', appearance.width)}
  </div>
  <div class="notice">A estrutura é visual e não altera seus atributos de combate. O alcance exibido é estimado.</div>`;

  const slider = (key, label, value) => `<div class="slider-row"><span>${label}</span><input type="range" min="0" max="1" step="0.01" value="${value}" data-body="${key}"><b data-body-val="${key}">${Math.round(value * 100)}</b></div>`;

  const renderOptions = () => {
    if (active === 'hair') {
      return optionGroup('Cabelo — 100 cortes', HAIR, 'hair', (item) => `
        <div class="option ${appearance.hair === item.id ? 'active' : ''}" data-slot="hair" data-id="${item.id}" title="${esc(item.name)}">
          <span class="swatch" style="background:radial-gradient(circle at 40% 35%, ${item.color}, #141014 80%)"></span><span class="lbl">${esc(item.short)}</span>
        </div>`) +
        optionGroup('Barba — 26 estilos', BEARDS, 'beard', textOption('beard'));
    }
    if (active === 'face') {
      return optionGroup('Formato do rosto', FACE_SHAPES, 'face', textOption('face')) +
        optionGroup('Olhos', EYES, 'eyes', textOption('eyes')) +
        optionGroup('Sobrancelhas', BROWS, 'brow', textOption('brow')) +
        optionGroup('Nariz', NOSES, 'nose', textOption('nose')) +
        optionGroup('Boca', MOUTHS, 'mouth', textOption('mouth')) +
        optionGroup('Cicatrizes', SCARS, 'scar', textOption('scar'));
    }
    if (active === 'skin') {
      return optionGroup(`Tom de pele — ${SKIN_TONES.length} opções`, SKIN_TONES, 'skin', (item) => `
        <div class="option color-only ${appearance.skin === item.id ? 'active' : ''}" data-slot="skin" data-id="${item.id}" title="${esc(item.name)}">
          <span class="swatch" style="background:${item.color}"></span><span class="lbl">${esc(item.name)}</span>
        </div>`);
    }
    const lists = { shorts: SHORTS, top: TOPS, glove: GLOVES, shoe: SHOES, robe: ROBES, colorway: COLORWAYS };
    const labels = {
      shorts: 'Shorts — 100 modelos', top: 'Camisas — 100 modelos', glove: 'Luvas — 100 modelos',
      shoe: 'Sapatos — 100 modelos', robe: 'Roupões — 100 modelos', colorway: 'Paletas de cores — 100',
    };
    const list = lists[active] || [];
    const slot = active === 'colorway' ? 'colorway' : active;
    const filtered = search ? list.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())) : list;
    const swatch = active === 'colorway'
      ? (item) => `<span class="swatch" style="background:linear-gradient(135deg, ${item.colors[0]} 0 38%, ${item.colors[1]} 38% 68%, ${item.colors[2]} 68% 100%)"></span>`
      : (item) => `<span class="swatch" style="background:linear-gradient(135deg, ${item.colors[0]} 0 52%, ${item.colors[1]} 52% 78%, ${item.colors[2]} 78% 100%)"></span>`;
    return `<div class="ed-search-row"><input class="input" data-search placeholder="Buscar ${list.length} opções..." value="${esc(search)}"><span class="tiny">${filtered.length}/${list.length}</span></div>
      <div class="option-grid" data-option-grid>${filtered.map((item) => `
        <div class="option ${appearance[slot] === item.id ? 'active' : ''}" data-slot="${slot}" data-id="${item.id}" title="${esc(item.name)}">
          ${swatch(item)}<span class="lbl">${esc(item.name.replace(/^[A-Za-zÀ-ú]+ /, ''))}</span>
        </div>`).join('')}</div>`;
  };

  const optionGroup = (title, list, slot, renderer) => `<div class="editor-group"><h3>${title} <span>${list.length}</span></h3><div class="option-grid">${list.map(renderer).join('')}</div></div>`;
  const textOption = (slot) => (item) => `<div class="option ${appearance[slot] === item.id ? 'active' : ''}" data-slot="${slot}" data-id="${item.id}" title="${esc(item.name)}"><span class="lbl">${esc(item.name)}</span></div>`;

  const bind = () => {
    scroll.querySelectorAll('[data-slot]').forEach((btn) => {
      btn.addEventListener('click', () => {
        setApp(btn.dataset.slot, btn.dataset.id);
        if (btn.dataset.slot === 'hair') {
          const item = HAIR.find((x) => x.id === btn.dataset.id);
          if (item?.color) setApp('hairColor', item.color);
        }
        scroll.querySelectorAll(`[data-slot="${btn.dataset.slot}"]`).forEach((b) => b.classList.toggle('active', b === btn));
        ui.app.audio.ui();
      });
    });
    scroll.querySelectorAll('[data-body]').forEach((input) => {
      input.addEventListener('input', () => {
        setApp(input.dataset.body, Number(input.value));
        const label = scroll.querySelector(`[data-body-val="${input.dataset.body}"]`);
        if (label) label.textContent = Math.round(Number(input.value) * 100);
      });
    });
    scroll.querySelectorAll('[data-meta]').forEach((input) => {
      input.addEventListener('input', () => {
        const key = input.dataset.meta;
        if (creating) ui.draft[key] = input.value;
        else if (key === 'name' || key === 'nickname' || key === 'nationality') ui.save.profile[key] = input.value;
      });
      input.addEventListener('change', () => {
        const key = input.dataset.meta;
        if (creating) ui.draft[key] = input.value;
      });
    });
    const searchInput = scroll.querySelector('[data-search]');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        search = searchInput.value;
        const grid = scroll.querySelector('[data-option-grid]');
        if (!grid) return;
        const lists = { shorts: SHORTS, top: TOPS, glove: GLOVES, shoe: SHOES, robe: ROBES, colorway: COLORWAYS };
        const list = lists[active] || [];
        const filtered = search ? list.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())) : list;
        grid.innerHTML = filtered.map((item) => `<div class="option ${appearance[active] === item.id ? 'active' : ''}" data-slot="${active}" data-id="${item.id}" title="${esc(item.name)}"><span class="swatch" style="background:linear-gradient(135deg, ${item.colors[0]} 0 52%, ${item.colors[1]} 52% 78%, ${item.colors[2]} 78% 100%)"></span><span class="lbl">${esc(item.name.replace(/^[A-Za-zÀ-ú]+ /, ''))}</span></div>`).join('');
        bind();
      });
    }
  };

  el.querySelectorAll('[data-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      active = btn.dataset.cat;
      search = '';
      render();
      ui.app.audio.ui();
    });
  });

  const save = () => {
    if (creating) {
      ui.navigate('create');
      return;
    }
    const name = (ui.save.profile.name || '').trim();
    if (name.length < 3) { ui.toast('Nome muito curto.', 'error', 'person'); return; }
    ui.save.profile.appearance = { ...appearance };
    persist(ui.save, true);
    ui.toast('Aparência salva.', 'success', 'check');
    ui.lastBackground = null;
    ui.navigate('career');
  };

  const random = () => {
    const rand = randomAppearance((creating ? ui.draft.name : ui.save.profile.name) + Date.now());
    Object.assign(appearance, rand);
    if (creating) ui.draft.appearance = appearance;
    render();
    previewNow();
    ui.toast('Novo visual gerado.', 'info', 'swap');
  };

  el.querySelectorAll('[data-action="save"]').forEach((b) => b.addEventListener('click', save));
  el.querySelector('[data-action="random"]').addEventListener('click', random);
  el.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="back-create"]')) ui.navigate('create');
  });

  // Drag to rotate the 3D preview.
  let dragging = false;
  let lastX = 0;
  let rotation = 0;
  const center = el.querySelector('.editor-center');
  center.addEventListener('pointerdown', (e) => {
    dragging = true;
    lastX = e.clientX;
    e.preventDefault();
  });
  window.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    rotation += (e.clientX - lastX) * 0.012;
    lastX = e.clientX;
    ui.app.background?.setRotation?.(rotation);
  });
  const stop = () => { dragging = false; };
  window.addEventListener('pointerup', stop);
  ui.onCleanup(() => window.removeEventListener('pointerup', stop));

  render();
  return el;
}

function appearanceCount() {
  return 100 + 100 + 100 + 100 + 100 + 100 + 100 + 100;
}
