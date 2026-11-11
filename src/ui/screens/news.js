// TG News: dynamic articles generated from the living universe and career events.
import { icon } from '../icons.js';
import { esc, h, fmtDate, divisionName, screenHead, orgOf, initials } from '../helpers.js';
import { NEWS_CATS, DIVISION_BY_ID, ORGS, DIVISIONS } from '../../core/data.js';
import { seedNews, simulateBackground, championOf, makeRumorArticle } from '../../core/universe.js';
import { addNews, persist } from '../../core/store.js';

export function newsScreen(ui, data = {}) {
  const save = ui.save;
  if (save && (!save.career.news || save.career.news.length === 0)) {
    seedNews(save, ui.universe, 14);
    persist(save, true);
  }
  let cat = data.cat || 'latest';
  let selectedId = data.id || null;

  const el = h(`<div class="screen">
    ${ui.topbar('news')}
    ${screenHead({
      kicker: 'TG News · cobertura mundial', title: 'Notícias do ringue',
      sub: 'Resultados, contratos, rivalidades e campeões gerados a partir dos dados reais da sua carreira e do universo.',
      actions: `<button class="btn btn-sm" data-action="simulate">${icon('swap', 14)} Atualizar mundo</button>`,
    })}
    <div class="news-filter" data-filters>
      ${NEWS_CATS.map((c) => `<button data-cat="${c.id}" class="${c.id === cat ? 'active' : ''}">${c.name}</button>`).join('')}
    </div>
    <div data-news-layout></div>
  </div>`);

  const layout = el.querySelector('[data-news-layout]');

  const universeArticles = () => {
    if (save) return save.career.news;
    const out = [];
    let seed = 0;
    for (const div of DIVISIONS.slice(0, 6)) {
      for (const org of ORGS) {
        const champ = championOf(ui.universe, div.id, org.id);
        if (!champ) continue;
        out.push({
          id: 'u' + (seed++), date: new Date().toISOString(), cat: 'title', tag: 'CAMPEÃO',
          title: `${champ.name} segue no topo dos ${div.name.toLowerCase()}s pelo ${org.short}`,
          subtitle: `${champ.record.w}-${champ.record.l}-${champ.record.d} · ${champ.record.ko} nocautes · ${champ.belts?.[0]?.defenses || 0} defesas.`,
          body: `${champ.name}, ${champ.age} anos, é o atual campeão ${org.short} dos ${div.name.toLowerCase()}s. Com cartel de ${champ.record.w}-${champ.record.l}-${champ.record.d} e ${champ.record.ko} nocautes, ele é considerado um dos lutadores mais perigosos do circuito.\n\nCrie uma carreira para acompanhar as notícias da sua própria história, contratos e disputas de cinturão.`,
          division: div.id, hero: { name: champ.name, nick: champ.nick, color: div.color }, featured: seed === 1,
        });
      }
    }
    return out;
  };

  const render = () => {
    const all = universeArticles().slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    const filtered = cat === 'latest' ? all : all.filter((a) => a.cat === cat);
    const feature = filtered.find((a) => a.id === selectedId) || filtered.find((a) => a.featured) || filtered[0];
    const rest = filtered.filter((a) => a !== feature);
    if (feature) selectedId = feature.id;
    const divColor = DIVISION_BY_ID[feature?.division]?.color || '#f2c14e';
    layout.innerHTML = feature ? `
      <div class="news-layout">
        <div>
          <div class="news-feature" data-article="${esc(feature.id)}">
            <div class="news-art" style="background:
              radial-gradient(circle at 72% 18%, ${divColor}55, transparent 42%),
              radial-gradient(circle at 22% 70%, rgba(225,29,72,.28), transparent 55%),
              linear-gradient(135deg, #17111a, #0a0a0e 70%)"></div>
            <div class="content">
              <div class="row" style="gap:6px"><span class="tag gold">${esc(feature.tag || 'NOTÍCIA')}</span><span class="tiny">${fmtDate(feature.date)}</span></div>
              <h2>${esc(feature.title)}</h2>
              <p>${esc(feature.subtitle || '')}</p>
              <div class="row" style="margin-top:14px;gap:8px">
                <span class="chip">${icon('globe', 12)} ${divisionName(feature.division)}</span>
                <span class="chip">${icon('news', 12)} Ler matéria completa</span>
              </div>
            </div>
          </div>
          <div class="panel" style="margin-top:16px">
            <div class="panel-head"><h3>Mais notícias</h3><span class="tiny">${filtered.length} matérias</span></div>
            <div class="panel-body" style="padding-top:6px">
              ${rest.length ? rest.map((a) => `<div class="news-item-card" data-article="${esc(a.id)}">
                <div class="thumb" style="background:radial-gradient(circle at 60% 30%, ${(DIVISION_BY_ID[a.division]?.color || '#f2c14e')}66, #13131a 62%)"><span>${initials(a.hero?.name || a.title)}</span></div>
                <div style="flex:1;min-width:0"><div class="t">${esc(a.title)}</div><div class="meta">${fmtDate(a.date)} · ${esc(a.tag || 'NOTÍCIA')} · ${divisionName(a.division)}</div></div>
                ${icon('arrow', 15)}
              </div>`).join('') : `<div class="empty-state" style="padding:30px"><b>Nada nesta categoria</b><p>Tente outra editoria ou atualize o mundo.</p></div>`}
            </div>
          </div>
        </div>
        <div class="stack">
          <div class="panel">
            <div class="panel-head"><h3>Editorias</h3></div>
            <div class="panel-body" style="display:flex;flex-direction:column;gap:2px">
              ${NEWS_CATS.map((c) => `<button class="news-cat-row ${cat === c.id ? 'active' : ''}" data-cat="${c.id}"><span>${c.name}</span><b>${c.id === 'latest' ? all.length : all.filter((a) => a.cat === c.id).length}</b></button>`).join('')}
            </div>
          </div>
          <div class="panel">
            <div class="panel-head"><h3>Radar de campeões</h3></div>
            <div class="panel-body" style="display:flex;flex-direction:column;gap:10px">
              ${ORGS.map((org) => {
                const champ = championOf(ui.universe, save?.profile?.division || 'middle', org.id);
                return `<div class="champ-row"><span class="org-dot" style="background:${org.color}"></span><div style="flex:1"><div class="tiny" style="color:${org.color}">${org.short}</div><b>${esc(champ?.name || 'Vacante')}</b></div><span class="tiny">${champ ? `${champ.record.w}-${champ.record.l}` : '—'}</span></div>`;
              }).join('')}
            </div>
          </div>
          <div class="notice">${icon('news', 13)} As manchetes são geradas a partir de resultados simulados, rankings, contratos e títulos do seu save. Nada é estático.</div>
        </div>
      </div>
    ` : `<div class="empty-state">${icon('news', 40)}<b>Sem notícias nesta editoria</b><p>Atualize o mundo para gerar novos resultados.</p><button class="btn btn-primary" data-action="simulate">Atualizar mundo</button></div>`;

    layout.querySelectorAll('[data-article]').forEach((item) => {
      item.addEventListener('click', () => openArticle(item.dataset.article));
    });
    layout.querySelectorAll('[data-cat]').forEach((btn) => {
      btn.addEventListener('click', () => {
        cat = btn.dataset.cat;
        selectedId = null;
        el.querySelectorAll('[data-cat]').forEach((b) => b.classList.toggle('active', b.dataset.cat === cat));
        render();
      });
    });
  };

  const openArticle = (id) => {
    const article = universeArticles().find((a) => a.id === id);
    if (!article) return;
    const color = DIVISION_BY_ID[article.division]?.color || '#f2c14e';
    ui.modal({
      wide: true,
      title: esc(article.title),
      body: `<div class="article-meta"><span class="tag gold">${esc(article.tag || 'NOTÍCIA')}</span><span class="tiny">${fmtDate(article.date)} · ${divisionName(article.division)}</span></div>
        <div class="article-hero" style="background:radial-gradient(circle at 70% 20%, ${color}66, transparent 50%), linear-gradient(135deg, #18111c, #0a0a0e)"><span>${initials(article.hero?.name || 'TG')}</span></div>
        <p class="article-body">${esc(article.subtitle || '')}

${esc(article.body || '')}</p>`,
      actions: [{ label: 'Fechar', cls: 'btn-ghost' }, { label: 'Voltar às notícias', cls: 'btn-primary' }],
    });
  };

  el.querySelector('[data-action="simulate"]').addEventListener('click', () => {
    if (!save) {
      ui.toast('Crie uma carreira para simular e salvar notícias.', 'error', 'lock');
      return;
    }
    simulateBackground(ui.universe, save, 3);
    if (Math.random() < 0.7) {
      const art = makeRumorArticle(ui.universe, save, save.profile.division);
      if (art) addNews(save, art);
    }
    persist(save, true);
    ui.toast('O universo se movimentou. Novas notícias publicadas.', 'success', 'news');
    render();
  });

  render();
  return el;
}
