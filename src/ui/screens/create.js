// Career creation: identity, division, style and initial attribute allocation.
import { icon } from '../icons.js';
import { esc, fmtNum, h, countryName } from '../helpers.js';
import { COUNTRIES, DIVISIONS, STYLES, DIVISION_BY_ID } from '../../core/data.js';
import { newCareer, persist, addNews, DEFAULT_APPEARANCE } from '../../core/store.js';
import { randomAppearance } from '../../core/appearance.js';
import { ensureOffers } from '../../core/career.js';

const BASE = 42;
const ATTRS = [
  ['strength', 'Força', 'fist'], ['speed', 'Velocidade', 'bolt'], ['stamina', 'Resistência', 'lungs'],
  ['precision', 'Precisão', 'target'], ['defense', 'Defesa', 'shield'], ['reflexes', 'Reflexos', 'eye'],
  ['mobility', 'Mobilidade', 'feet'], ['recovery', 'Recuperação', 'heart'], ['conditioning', 'Condicionamento', 'flame'],
];
const FIRST = ['Kaito', 'Diego', 'Malik', 'Rafael', 'Kenji', 'Tyson', 'Miguel', 'Dmitri', 'Liam', 'Amari', 'Hiroshi', 'Thiago'];
const LAST = ['Moreira', 'Silva', 'Takahashi', 'Carter', 'Volkov', 'Garcia', 'Okafor', 'Nakamura', 'Costa', 'Brennan'];

function makeDraft() {
  const first = FIRST[Math.floor(Math.random() * FIRST.length)];
  const last = LAST[Math.floor(Math.random() * LAST.length)];
  const seed = first + last + Date.now();
  return {
    name: `${first} ${last}`,
    nickname: '',
    nationality: 'BRA',
    division: 'middle',
    style: 'technical',
    age: 22,
    appearance: randomAppearance(seed),
    attributes: Object.fromEntries(ATTRS.map(([k]) => [k, BASE])),
    points: 12,
    seed,
  };
}

export function createScreen(ui) {
  if (!ui.draft) ui.draft = makeDraft();
  const draft = ui.draft;
  if (!draft.appearance) draft.appearance = randomAppearance('create-' + Date.now());
  if (!draft.attributes) draft.attributes = Object.fromEntries(ATTRS.map(([k]) => [k, BASE]));

  const el = h(`<div class="screen create-screen plain">
    <div class="create-shell">
      <div class="create-card panel">
        <div class="panel-body">
          <div class="kicker">Nova carreira</div>
          <h1 class="screen-title" style="font-size:46px;margin:4px 0 2px">Crie sua lenda</h1>
          <p class="screen-sub" style="margin-bottom:18px">Escolha identidade, divisão e estilo. Você tem <b class="gold" data-points>${draft.points}</b> pontos para distribuir.</p>

          <div class="form-grid two">
            <div class="field"><label>Nome completo</label><input class="input" data-field="name" maxlength="26" value="${esc(draft.name)}"></div>
            <div class="field"><label>Apelido</label><input class="input" data-field="nickname" maxlength="24" placeholder="The Rising Sun" value="${esc(draft.nickname)}"></div>
          </div>
          <div class="form-grid two">
            <div class="field"><label>Nacionalidade</label><select class="input" data-field="nationality">${COUNTRIES.map((c) => `<option value="${c.code}" ${draft.nationality === c.code ? 'selected' : ''}>${c.name} (${c.code})</option>`).join('')}</select></div>
            <div class="field"><label>Idade <b data-age>${draft.age}</b></label><input type="range" min="18" max="36" value="${draft.age}" data-field="age"></div>
          </div>
          <div class="field"><label>Divisão de peso</label><select class="input" data-field="division">${DIVISIONS.map((d) => `<option value="${d.id}" ${draft.division === d.id ? 'selected' : ''}>${d.name} — ${d.min}–${d.max} kg</option>`).join('')}</select></div>

          <div class="field"><label>Estilo de luta</label><div class="style-grid">${STYLES.map((s) => `<button class="style-pill ${draft.style === s.id ? 'active' : ''}" data-style="${s.id}" style="--sc:${s.color}"><b>${s.name}</b><span>${s.desc}</span></button>`).join('')}</div></div>

          <div class="section-title" style="margin-top:18px"><h2 style="font-size:20px">Atributos iniciais</h2><span class="tiny">Mín. ${BASE} · máx. 99</span></div>
          <div class="alloc-grid" data-allocation>${renderAlloc(draft)}</div>

          <div class="row between" style="margin-top:20px">
            <div class="row">
              <button class="btn btn-sm" data-action="randomize">${icon('swap', 15)} Aleatório</button>
              <button class="btn btn-sm btn-gold-outline" data-action="appearance">${icon('person', 15)} Aparência</button>
            </div>
            <div class="row">
              <button class="btn btn-ghost" data-nav="menu">Voltar</button>
              <button class="btn btn-primary" data-action="start">${icon('crown', 16)} Iniciar Carreira</button>
            </div>
          </div>
        </div>
      </div>
      <div class="create-preview-note">
        <span class="kicker">Prévia 3D</span>
        <p>Arraste para girar. Personalize mais de 700 opções no editor.</p>
      </div>
    </div>
  </div>`);

  const refreshAlloc = () => {
    el.querySelector('[data-allocation]').innerHTML = renderAlloc(draft);
    el.querySelector('[data-points]').textContent = draft.points;
    bindAlloc();
  };

  const bindAlloc = () => {
    el.querySelectorAll('[data-attr]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.attr;
        const dir = Number(btn.dataset.dir);
        if (dir > 0 && draft.points <= 0) return;
        if (dir < 0 && draft.attributes[key] <= BASE) return;
        draft.attributes[key] += dir;
        draft.points -= dir;
        ui.app.audio.ui();
        refreshAlloc();
      });
    });
  };
  bindAlloc();

  el.querySelectorAll('[data-field]').forEach((input) => {
    const key = input.dataset.field;
    const handler = () => {
      if (key === 'age') {
        draft.age = Number(input.value);
        el.querySelector('[data-age]').textContent = draft.age;
      } else {
        draft[key] = input.value;
      }
    };
    input.addEventListener(key === 'age' ? 'input' : 'input', handler);
    input.addEventListener('change', handler);
  });

  el.querySelectorAll('[data-style]').forEach((btn) => {
    btn.addEventListener('click', () => {
      draft.style = btn.dataset.style;
      el.querySelectorAll('[data-style]').forEach((b) => b.classList.toggle('active', b === btn));
      ui.app.audio.ui();
    });
  });

  el.querySelector('[data-action="randomize"]').addEventListener('click', () => {
    const first = FIRST[Math.floor(Math.random() * FIRST.length)];
    const last = LAST[Math.floor(Math.random() * LAST.length)];
    draft.name = `${first} ${last}`;
    draft.nickname = '';
    draft.appearance = randomAppearance(first + last + Date.now());
    draft.nationality = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)].code;
    draft.style = STYLES[Math.floor(Math.random() * STYLES.length)].id;
    draft.division = DIVISIONS[Math.floor(Math.random() * DIVISIONS.length)].id;
    if (draft.points > 0) {
      let guard = 200;
      while (draft.points > 0 && guard-- > 0) {
        const key = ATTRS[Math.floor(Math.random() * ATTRS.length)][0];
        if (draft.attributes[key] < 72) { draft.attributes[key] += 1; draft.points -= 1; }
      }
    }
    ui.navigate('create');
  });

  el.querySelector('[data-action="appearance"]').addEventListener('click', () => {
    ui.draft = draft;
    ui.navigate('editor', { mode: 'create' });
  });

  el.querySelector('[data-action="start"]').addEventListener('click', () => {
    const name = (draft.name || '').trim();
    if (name.length < 3) {
      ui.toast('Digite um nome com pelo menos 3 letras.', 'error', 'person');
      return;
    }
    if (draft.points > 0) {
      ui.toast(`Distribua os ${draft.points} pontos restantes antes de começar.`, 'error', 'star');
      return;
    }
    const save = newCareer({
      name,
      nickname: (draft.nickname || '').trim() || 'The Rising Sun',
      nationality: draft.nationality,
      division: draft.division,
      style: draft.style,
      appearance: { ...DEFAULT_APPEARANCE, ...draft.appearance },
      attributes: { ...draft.attributes },
      age: draft.age,
    });
    const div = DIVISION_BY_ID[save.profile.division];
    addNews(save, {
      cat: 'upcoming', tag: 'NOVO CONTRATO',
      title: `${save.profile.name} assina contrato profissional e mira o topo dos ${div.name.toLowerCase()}s`,
      subtitle: `Novo rosto na divisão. ${save.profile.age} anos, estilo ${STYLES.find((s) => s.id === save.profile.style)?.name.toLowerCase()}.`,
      body: `A TG BOXING anunciou a contratação de ${save.profile.name}, conhecido como "${save.profile.nickname}". O lutador de ${countryName(save.profile.nationality)} inicia a carreira profissional com cartel 0-0-0 e muita ambição. "Não vim para participar. Vim para dominar", declarou em sua primeira entrevista.\n\nA promoter já prepara três ofertas para as próximas semanas. O sonho do cinturão mundial começa agora.`,
      division: save.profile.division,
      hero: { name: save.profile.name, nick: save.profile.nickname, nationality: save.profile.nationality },
      imageSeed: 4, featured: true,
    });
    ensureOffers(save, ui.universe, 3);
    ui.save = save;
    ui.app.save = save;
    ui.app.audio.setSettings(save.settings);
    persist(save, true);
    ui.draft = null;
    ui.toast('Carreira criada. Bem-vindo ao TG BOXING!', 'success', 'crown');
    ui.navigate('career');
  });

  setTimeout(() => {
    const boxer = ui.app.background?.boxer;
    if (boxer) {
      boxer.root.position.x = window.innerWidth > 900 ? 0.75 : 0;
      boxer.root.position.y = 0.14;
    }
  }, 60);
  return el;
}

function renderAlloc(draft) {
  return ATTRS.map(([key, label, iconName]) => `
    <div class="alloc-pill">
      <span class="ic">${icon(iconName, 14)}</span>
      <span class="lbl">${label}</span>
      <b>${draft.attributes[key]}</b>
      <span class="alloc-btns">
        <button data-attr="${key}" data-dir="-1" ${draft.attributes[key] <= BASE ? 'disabled' : ''}>−</button>
        <button data-attr="${key}" data-dir="1" ${draft.points <= 0 || draft.attributes[key] >= 99 ? 'disabled' : ''}>+</button>
      </span>
    </div>`).join('');
}
