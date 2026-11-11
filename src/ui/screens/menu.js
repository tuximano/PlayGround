// Main menu: cinematic entry point with live ticker and career shortcut.
import { icon } from '../icons.js';
import { esc, fmtNum, initials, recordText, overall, divisionName } from '../helpers.js';
import { playerRankNow } from '../../core/career.js';

export function menuScreen(ui) {
  const save = ui.save;
  const universe = ui.universe;
  const career = save?.career;
  const profile = save?.profile;
  const rank = save && universe ? playerRankNow(save, universe) : null;
  const latest = career?.news?.[0];
  const ticker = latest?.title || 'TG BOXING — a nova temporada mundial começa agora. 15 arenas. 11 divisões. Um trono.';
  const ovr = profile ? overall(profile.attributes) : null;
  const firstFight = career?.activeOffer;

  const items = [
    {
      id: save ? 'career' : 'create', label: save ? 'Continuar Carreira' : 'Criar Carreira', icon: 'play',
      sub: save ? `${recordText(career.record)} · ${divisionName(profile.division)}${rank ? ` · #${rank}` : ''}` : 'Escolha seu nome, estilo e visual', primary: true,
    },
    { id: save ? 'editor' : 'create', label: 'Editor de Lutador', icon: 'person', sub: 'Rosto, cabelo, roupas e corpo' },
    { id: 'rankings', label: 'Rankings & Cinturões', icon: 'chart', sub: 'TOP 100 · 3 organizações' },
    { id: 'news', label: 'TG News', icon: 'news', sub: 'Notícias geradas pelo universo' },
    { id: 'shop', label: 'Loja TG', icon: 'shop', sub: 'Equipamentos, coaches e cosméticos' },
    { id: 'gym', label: 'Academia', icon: 'gym', sub: 'Treinos, sparring e recuperação', locked: !save },
    { id: 'multiplayer', label: 'Multiplayer Online', icon: 'wifi', sub: 'Convide um amigo · sala real via WebRTC' },
    { id: 'stats', label: 'Estatísticas & Prêmios', icon: 'stats', sub: 'Recordes, histórico, troféus', locked: !save },
    { id: 'settings', label: 'Configurações', icon: 'settings', sub: 'Áudio, controles e acessibilidade' },
  ];

  const el = document.createElement('div');
  el.className = 'main-menu';
  el.innerHTML = `
    <div class="menu-left">
      <div class="logo-block">
        <div class="logo-eyebrow"><span class="line"></span><span>The Glory of Champions</span></div>
        <div class="main-logo"><span class="tg">TG</span><span class="box">BOXING</span></div>
        <div class="logo-sub">Boxe 3D · Carreira · Online</div>
      </div>
      <div class="menu-list">
        ${items.map((item, i) => `
          <button class="menu-btn ${item.primary ? 'primary' : ''} ${item.locked ? 'locked' : ''}" data-menu="${item.id}">
            <span class="idx">${String(i + 1).padStart(2, '0')}</span>
            ${icon(item.icon, 20)}
            <b>${item.label}</b>
            <small>${item.sub}</small>
            ${icon('arrow', 14, 'go')}
          </button>
        `).join('')}
      </div>
      <div class="menu-bottom">
        <span class="chip gold">${icon('coin', 13)} TG COIN é virtual</span>
        <span class="chip green">${icon('wifi', 13)} MULTIPLAYER ONLINE</span>
        <span class="chip">${icon('globe', 13)} 1.100 lutadores</span>
      </div>
    </div>
    <div class="menu-corner">
      ${save ? `<span class="chip gold">${icon('coin', 13)} ${fmtNum(career.coins)} TG</span>
      <span class="chip">${icon('coin', 13)} C$ ${fmtNum(career.money)}</span>` : `<span class="chip">${icon('flag', 13)} Nova carreira</span>`}
    </div>
    <div class="menu-ticker">
      <span class="ticker-label">TG NEWS</span>
      <div class="ticker-track"><span>${esc(ticker)} &nbsp;·&nbsp; ${esc(career?.activeOffer ? `PRÓXIMA LUTA: ${profile.name} vs ${career.activeOffer.opponent.name} em ${career.activeOffer.arenaName}` : 'Escolha uma oferta na carreira e escreva sua história.')}</span></div>
    </div>
    <div class="hero-badge">
      ${save ? `<div class="name">${esc(profile.name)}</div><div class="meta">${recordText(career.record)} · OVERALL ${ovr} ${rank ? `· RANKING #${rank}` : ''}</div>` : `<div class="name">Sua história começa aqui</div><div class="meta">Crie um lutador e conquiste o mundo</div>`}
    </div>
    <div class="version-stamp">v1.0 · TG BOXING · ${new Date().getFullYear()}</div>
  `;

  const enter = (id, locked) => {
    if (locked) {
      ui.toast('Crie sua carreira para acessar esta área.', 'error', 'lock');
      return;
    }
    if (id === 'editor' && !save) {
      ui.navigate('create');
      return;
    }
    if (id === 'create') {
      ui.draft = null;
      ui.navigate('create');
      return;
    }
    ui.navigate(id);
  };

  el.querySelectorAll('[data-menu]').forEach((btn) => {
    btn.addEventListener('click', () => {
      ui.app.audio.unlock();
      ui.app.audio.ui();
      const item = items.find((i) => i.id === btn.dataset.menu);
      enter(btn.dataset.menu, item?.locked && !save);
    });
  });
  if (save && !firstFight) {
    const primary = el.querySelector('[data-menu="career"]');
    primary?.addEventListener('mouseenter', () => ui.app.audio.ui());
  }
  return el;
}
