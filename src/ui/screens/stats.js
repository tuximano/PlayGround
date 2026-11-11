// Statistics, record books, awards, achievements and career history.
import { icon } from '../icons.js';
import {
  esc, h, fmtNum, recordText, fmtDate, screenHead, statTile, attrBars, overall, divisionName, orgOf, beltTierName, initials,
} from '../helpers.js';
import { ACHIEVEMENTS, DIVISION_BY_ID, ORGS } from '../../core/data.js';
import { recordBooks, playerRank } from '../../core/universe.js';
import { awards as careerAwards } from '../../core/career.js';
import { createPlayerFighter, getAchievement, persist } from '../../core/store.js';

const TABS = [
  { id: 'overview', name: 'Visão geral' },
  { id: 'history', name: 'Histórico de lutas' },
  { id: 'belts', name: 'Cinturões & troféus' },
  { id: 'records', name: 'Livro de recordes' },
  { id: 'awards', name: 'Prêmios' },
  { id: 'achievements', name: 'Conquistas' },
];

export function statsScreen(ui, data = {}) {
  const save = ui.save;
  if (!save) {
    return h(`<div class="screen plain">${ui.topbar('stats')}${screenHead({ kicker: 'Legado', title: 'Estatísticas', sub: 'Crie uma carreira para acompanhar seu legado.' })}<div class="empty-state">${icon('stats', 40)}<b>Sem dados</b><p>Seu legado começa com a primeira luta.</p><button class="btn btn-primary" data-nav="create">Criar carreira</button></div></div>`);
  }
  const c = save.career;
  const p = save.profile;
  const player = createPlayerFighter(save);
  const rank = playerRank(ui.universe, p.division, c.points);
  let tab = data.tab || 'overview';
  const winRate = c.record.w + c.record.l + c.record.d ? Math.round((c.record.w / (c.record.w + c.record.l + c.record.d)) * 100) : 0;
  const belts = c.belts || [];

  const el = h(`<div class="screen">
    ${ui.topbar('stats')}
    ${screenHead({
      kicker: 'Legado & história', title: 'Estatísticas & Prêmios',
      sub: `${esc(p.name)} · ${divisionName(p.division)} · Temporada ${c.season.year} · Ranking #${rank}`,
      actions: `<span class="chip gold">${icon('crown', 13)} Overall ${overall(p.attributes)}</span><span class="chip">${icon('belt', 13)} ${belts.length} títulos</span>`,
    })}
    <div class="tabs" data-tabs>${TABS.map((t) => `<button data-tab="${t.id}" class="${t.id === tab ? 'active' : ''}">${t.name}</button>`).join('')}</div>
    <div data-body></div>
  </div>`);

  const body = el.querySelector('[data-body]');

  const render = () => {
    if (tab === 'overview') body.innerHTML = renderOverview();
    else if (tab === 'history') body.innerHTML = renderHistory();
    else if (tab === 'belts') body.innerHTML = renderBelts();
    else if (tab === 'records') body.innerHTML = renderRecords();
    else if (tab === 'awards') body.innerHTML = renderAwards();
    else body.innerHTML = renderAchievements();
    bind();
  };

  const renderOverview = () => {
    const recent = c.history.slice(0, 5);
    const rankHistory = [...c.rankHistory];
    if (!rankHistory.length || rankHistory[rankHistory.length - 1].rank !== rank) rankHistory.push({ date: c.date, rank });
    const points = rankHistory.slice(-30).map((x) => x.rank);
    const spark = sparkline(points);
    return `
      <div class="grid grid-4" style="margin-bottom:16px">
        ${statTile('Cartel', recordText(c.record), `${c.record.ko} nocautes`, true)}
        ${statTile('Taxa de vitória', `${winRate}%`, `${c.record.w}V · ${c.record.l}D · ${c.record.d}E`)}
        ${statTile('Ranking', `#${rank}`, divisionName(p.division))}
        ${statTile('Bolsas', `C$ ${fmtNum(c.totalPurse)}`, `${c.history.length} lutas registradas`)}
      </div>
      <div class="dashboard-grid">
        <div class="stack">
          <div class="panel"><div class="panel-head"><h3>Atributos atuais</h3><span class="tiny">Overall ${overall(p.attributes)} / 99</span></div><div class="panel-body">${attrBars(p.attributes)}</div></div>
          <div class="panel"><div class="panel-head"><h3>Últimas lutas</h3><button class="btn btn-sm btn-ghost" data-action="tab-history">Ver histórico ${icon('arrow', 12)}</button></div><div class="panel-body">${recent.length ? recent.map((f) => historyRow(f)).join('') : '<p class="tiny">Nenhuma luta disputada ainda.</p>'}</div></div>
        </div>
        <div class="stack">
          <div class="panel"><div class="panel-head"><h3>Evolução no ranking</h3><span class="tiny">Últimas ${points.length} atualizações</span></div><div class="panel-body">
            <div class="rank-spark">${spark}</div>
            <div class="row between" style="margin-top:8px"><span class="tiny">#100</span><span class="tiny">Posição atual: #${rank}</span><span class="tiny">#1</span></div>
          </div></div>
          <div class="panel"><div class="panel-head"><h3>Resumo da carreira</h3></div><div class="panel-body">
            <div class="row between"><span class="tiny">Reputação</span><b>${c.reputation}/100</b></div>
            <div class="progress" style="margin:6px 0 12px"><i style="width:${c.reputation}%"></i></div>
            <div class="row between"><span class="tiny">Melhor sequência</span><b>${c.bestStreak} vitórias</b></div>
            <div class="row between" style="margin-top:7px"><span class="tiny">Arenas visitadas</span><b>${new Set(c.foughtArenas).size}/15</b></div>
            <div class="row between" style="margin-top:7px"><span class="tiny">Títulos mundiais</span><b>${belts.filter((b) => ['world', 'undisputed', 'supreme'].includes(b.tier)).length}</b></div>
            <div class="row between" style="margin-top:7px"><span class="tiny">TG COIN</span><b class="gold">${fmtNum(c.coins)}</b></div>
            <div class="row between" style="margin-top:7px"><span class="tiny">Carteira</span><b>C$ ${fmtNum(c.money)}</b></div>
          </div></div>
          <div class="panel"><div class="panel-head"><h3>Temporada ${c.season.year}</h3></div><div class="panel-body">
            <div class="row between"><span class="tiny">Lutas</span><b>${c.season.fights}</b></div>
            <div class="row between" style="margin-top:7px"><span class="tiny">Vitórias</span><b>${c.season.wins}</b></div>
            <div class="row between" style="margin-top:7px"><span class="tiny">Nocautes</span><b>${c.season.kos}</b></div>
            <div class="row between" style="margin-top:7px"><span class="tiny">Defesas de título</span><b>${c.season.defenses}</b></div>
          </div></div>
        </div>
      </div>`;
  };

  const historyRow = (f) => `<div class="history-row" data-history="${esc(f.id)}">
    <span class="result-badge ${f.result === 'V' ? 'win' : f.result === 'D' ? 'loss' : 'draw'}">${f.result}</span>
    <div style="flex:1;min-width:0"><b>${esc(f.opponentName)}</b><div class="tiny">${fmtDate(f.date)} · ${esc(f.arena)} · ${esc(f.method)}${f.round ? ' R' + f.round : ''}</div></div>
    <div style="text-align:right"><b class="gold" style="font-family:var(--font-display);font-size:16px">C$ ${fmtNum(f.purse)}</b><div class="tiny">${f.coins || 0} TG</div></div>
  </div>`;

  const renderHistory = () => `<div class="grid grid-2">
    <div class="panel"><div class="panel-head"><h3>Todas as lutas</h3><span class="tiny">${c.history.length} registros</span></div><div class="panel-body">${c.history.length ? c.history.map((f) => historyRow(f)).join('') : '<p class="tiny">Nenhuma luta registrada.</p>'}</div></div>
    <div class="stack">
      <div class="panel"><div class="panel-head"><h3>Resumo</h3></div><div class="panel-body">
        <div class="grid grid-2">
          ${statTile('Vitórias', c.record.w, 'por decisão e nocaute')}
          ${statTile('Nocautes', c.record.ko, 'vitórias antes do limite')}
          ${statTile('Derrotas', c.record.l, 'lições da carreira')}
          ${statTile('Empates', c.record.d, 'decisões divididas')}
        </div>
      </div></div>
      <div class="panel"><div class="panel-head"><h3>Métodos de vitória</h3></div><div class="panel-body">
        ${methodBars(c.history)}
      </div></div>
    </div>
  </div>`;

  const methodBars = (history) => {
    const counts = {};
    for (const f of history.filter((x) => x.result === 'V')) counts[f.method] = (counts[f.method] || 0) + 1;
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    if (!entries.length) return '<p class="tiny">Sem vitórias ainda.</p>';
    return entries.map(([m, n]) => `<div class="bar-row" style="grid-template-columns:70px 1fr 30px"><span>${esc(m)}</span><span class="bar-track"><i class="bar-fill" style="width:${(n / c.record.w) * 100}%"></i></span><span class="attr-value">${n}</span></div>`).join('');
  };

  const renderBelts = () => `
    <div class="stack">
      <div class="panel"><div class="panel-head"><h3>Cinturões conquistados</h3><span class="tiny">${belts.length} títulos</span></div><div class="panel-body">
        ${belts.length ? `<div class="trophy-grid">${belts.map((b) => `<div class="trophy" style="border-color:rgba(242,193,78,.35)"><div class="gold-ic">${icon('belt', 34)}</div><b>${esc(beltTierName(b.tier))}</b><small>${orgOf(b.org).short} · ${divisionName(b.division)}</small><small>${b.defenses || 0} defesas</small><small>${fmtDate(b.wonAt)}</small></div>`).join('')}</div>` : '<div class="empty-state">' + icon('belt', 36) + '<b>Nenhum cinturão</b><p>Chegue ao TOP 2 da sua divisão e vença uma disputa de título.</p></div>'}
      </div></div>
      <div class="panel"><div class="panel-head"><h3>Trofeus & marcos</h3><span class="tiny">${c.trophies.length} itens</span></div><div class="panel-body">
        ${c.trophies.length ? `<div class="trophy-grid">${c.trophies.map((tr) => `<div class="trophy"><div class="gold-ic">${icon('trophy', 30)}</div><b>${esc(tr.name)}</b><small>${orgOf(tr.org).short} · ${fmtDate(tr.date)}</small></div>`).join('')}</div>` : '<p class="tiny">Troféus são adicionados ao conquistar cinturões e prêmios.</p>'}
      </div></div>
      <div class="panel"><div class="panel-head"><h3>Linha do tempo dos cinturões</h3></div><div class="panel-body">
        ${c.beltHistory.length ? `<div class="timeline">${c.beltHistory.slice().reverse().map((b) => `<div class="timeline-item"><span class="dot ${b.event === 'lost' ? 'red' : ''}"></span><div><b>${b.event === 'lost' ? 'Perdeu' : 'Conquistou'} ${esc(beltTierName(b.tier))}</b><div class="tiny">${orgOf(b.org).short} · ${divisionName(b.division)} · ${fmtDate(b.date)}${b.opponent ? ' · vs ' + esc(b.opponent) : ''}</div></div></div>`).join('')}</div>` : '<p class="tiny">A história dos seus cinturões aparecerá aqui.</p>'}
      </div></div>
    </div>`;

  const renderRecords = () => {
    const rb = recordBooks(ui.universe, save);
    const groups = [
      ['mostWins', 'Mais vitórias'], ['mostKos', 'Mais nocautes'], ['longestStreak', 'Maior sequência'],
      ['mostDefenses', 'Mais defesas'], ['mostTitles', 'Mais cinturões'],
    ];
    return `<div class="records-grid">${groups.map(([key, label]) => `<div class="panel"><div class="panel-head"><h3>${label}</h3></div><div class="panel-body" style="padding-top:6px"><div class="record-list">${(rb[key] || []).map((f, i) => `<div class="record-row ${f.isPlayer ? 'me' : ''}"><span class="pos">${i + 1}</span><b style="flex:1;font-weight:${f.isPlayer ? 600 : 400};color:${f.isPlayer ? 'var(--gold)' : 'inherit'}">${esc(f.name)}${f.isPlayer ? ' (você)' : ''}</b><span class="val">${key === 'mostKos' ? f.record.ko : key === 'longestStreak' ? f.bestStreak || f.streak : key === 'mostDefenses' ? (f.belts || []).reduce((s, b) => s + (b.defenses || 0), 0) : key === 'mostTitles' ? (f.belts || []).length : f.record.w}</span></div>`).join('')}</div></div></div>`).join('')}</div>`;
  };

  const renderAwards = () => {
    const list = careerAwards(save, ui.universe);
    return `<div class="stack">
      <div class="notice">${icon('star', 13)} Prêmios calculados com os dados atuais do universo e da sua carreira. A temporada ${c.season.year} está em andamento.</div>
      <div class="grid grid-auto">${list.map((a) => `<div class="award-card ${a.winner?.isPlayer ? 'mine' : ''}">
        <div class="ic">${icon(a.icon, 30)}</div>
        <b>${esc(a.name)}</b>
        <span>${esc(a.winner?.name || '—')}</span>
        <small>${esc(a.winner?.nick || '')} ${a.winner?.isPlayer ? '· VOCÊ' : ''}</small>
      </div>`).join('')}</div>
      <div class="panel"><div class="panel-head"><h3>Histórico de premiações</h3></div><div class="panel-body">${c.awards.length ? c.awards.map((a) => `<div class="row between" style="padding:8px 0;border-bottom:1px solid var(--line)"><span>${esc(a.name)} · ${a.year}</span><b class="gold">${esc(a.winner?.name || '—')}</b></div>`).join('') : '<p class="tiny">As premiações anuais serão registradas aqui ao final de cada temporada.</p>'}</div></div>
    </div>`;
  };

  const renderAchievements = () => {
    const unlocked = new Set(c.achievements || []);
    return `<div class="grid grid-auto">${ACHIEVEMENTS.map((a) => {
      const has = unlocked.has(a.id);
      return `<div class="achievement-card ${has ? 'unlocked' : ''}">
        <div class="ic">${icon(has ? a.icon : 'lock', 30)}</div>
        <div style="flex:1"><b>${esc(a.name)}</b><p class="tiny">${esc(a.desc)}</p><span class="chip ${has ? 'green' : ''}">${has ? 'DESBLOQUEADA' : '+' + a.coins + ' TG'}</span></div>
      </div>`;
    }).join('')}</div>`;
  };

  const bind = () => {
    body.querySelectorAll('[data-history]').forEach((row) => {
      row.addEventListener('click', () => {
        const f = c.history.find((x) => x.id === row.dataset.history);
        if (f) openHistory(f);
      });
    });
    body.querySelector('[data-action="tab-history"]')?.addEventListener('click', () => {
      tab = 'history';
      el.querySelectorAll('[data-tab]').forEach((b) => b.classList.toggle('active', b.dataset.tab === tab));
      render();
    });
  };

  const openHistory = (f) => {
    const stats = f.stats || {};
    const p1 = stats.p1 || {};
    const p2 = stats.p2 || {};
    ui.modal({
      wide: true,
      title: `${f.result === 'V' ? 'Vitória' : f.result === 'D' ? 'Derrota' : 'Empate'} contra ${esc(f.opponentName)}`,
      body: `<div class="row" style="gap:8px;margin-bottom:14px"><span class="result-badge ${f.result === 'V' ? 'win' : f.result === 'D' ? 'loss' : 'draw'}">${f.result}</span><span class="chip">${esc(f.method)}${f.round ? ' · Round ' + f.round : ''}</span><span class="chip">${fmtDate(f.date)}</span><span class="chip">${esc(f.arena)}</span></div>
        <div class="result-stats" style="margin-bottom:14px">
          <div class="result-side"><div class="result-stat"><span>Golpes</span><b>${p1.thrown || 0}</b></div><div class="result-stat"><span>Acertos</span><b>${p1.landed || 0}</b></div><div class="result-stat"><span>Dano</span><b>${Math.round(p1.damage || 0)}</b></div><div class="result-stat"><span>Combos</span><b>${p1.maxCombo || 0}</b></div></div>
          <div class="vs-small">VS</div>
          <div class="result-side right"><div class="result-stat"><span>Golpes</span><b>${p2.thrown || 0}</b></div><div class="result-stat"><span>Acertos</span><b>${p2.landed || 0}</b></div><div class="result-stat"><span>Dano</span><b>${Math.round(p2.damage || 0)}</b></div><div class="result-stat"><span>Combos</span><b>${p2.maxCombo || 0}</b></div></div>
        </div>
        ${f.scorecards?.length ? `<div class="scorecards">${f.scorecards.map((s) => `<div class="scorecard">${esc(s.judge)}<b>${s.p1} — ${s.p2}</b></div>`).join('')}</div>` : ''}
        <div class="result-purse">Bolsa recebida <b>C$ ${fmtNum(f.purse)}</b> · ${f.coins || 0} TG COIN</div>`,
      actions: [{ label: 'Fechar', cls: 'btn-ghost' }],
    });
  };

  el.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      tab = btn.dataset.tab;
      el.querySelectorAll('[data-tab]').forEach((b) => b.classList.toggle('active', b === btn));
      render();
    });
  });

  render();
  return el;
}

function sparkline(values) {
  if (!values.length) values = [100];
  const w = 300, h = 90;
  const pts = values.map((v, i) => {
    const x = values.length === 1 ? w / 2 : (i / (values.length - 1)) * w;
    const y = ((v - 1) / 99) * (h - 10) + 5;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="spark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2c14e" stop-opacity=".35"/><stop offset="1" stop-color="#f2c14e" stop-opacity="0"/></linearGradient></defs>
    <polyline points="${pts}" fill="none" stroke="#f2c14e" stroke-width="2" stroke-linejoin="round"/>
    <polygon points="0,${h} ${pts} ${w},${h}" fill="url(#spark)"/>
  </svg>`;
}
