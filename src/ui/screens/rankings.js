// Rankings: 11 divisions, 3 organizations, TOP 100, champions and fighter dossiers.
import { icon } from '../icons.js';
import {
  esc, h, fmtNum, recordText, initials, countryName, divisionName, statTile, screenHead, attrBars, overall, orgOf, beltTierName,
} from '../helpers.js';
import { DIVISIONS, ORGS, STYLE_BY_ID, BELT_TIERS } from '../../core/data.js';
import { rankingsFor, championOf, playerRank } from '../../core/universe.js';
import { createPlayerFighter } from '../../core/store.js';
import { playerRankNow } from '../../core/career.js';

export function rankingsScreen(ui, data = {}) {
  const save = ui.save;
  let division = data.division || save?.profile?.division || 'middle';
  let org = data.org || null;
  if (!DIVISIONS.find((d) => d.id === division)) division = 'middle';

  const el = h(`<div class="screen">
    ${ui.topbar('rankings')}
    ${screenHead({
      kicker: 'Organizações & cinturões', title: 'Rankings mundiais',
      sub: '100 lutadores por divisão. Três organizações. Sete níveis de cinturão. O topo não é para todos.',
      actions: save ? `<span class="chip gold">${icon('crown', 13)} Você: #${playerRankNow(save, ui.universe)}</span>` : '',
    })}
    <div class="division-tabs" data-divisions>
      ${DIVISIONS.map((d) => `<button data-div="${d.id}" class="${d.id === division ? 'active' : ''}" style="--dc:${d.color}"><span style="color:${d.color}">●</span> ${d.name}</button>`).join('')}
    </div>
    <div class="row between" style="margin-bottom:14px">
      <div class="org-tabs" data-orgs>
        <button data-org="" class="${!org ? 'active' : ''}">GERAL</button>
        ${ORGS.map((o) => `<button data-org="${o.id}" class="${org === o.id ? 'active' : ''}">${o.short}</button>`).join('')}
      </div>
      <span class="tiny" data-count></span>
    </div>
    <div class="rank-layout">
      <div class="panel"><div class="rank-list" data-ranklist></div></div>
      <div class="stack" data-side></div>
    </div>
  </div>`);

  const listEl = el.querySelector('[data-ranklist]');
  const sideEl = el.querySelector('[data-side]');
  const countEl = el.querySelector('[data-count]');

  const render = () => {
    const player = save ? createPlayerFighter(save) : null;
    const list = rankingsFor(ui.universe, division, player, org);
    countEl.textContent = `${list.length} lutadores · ${divisionName(division)}${org ? ' · ' + orgOf(org).short : ''}`;
    listEl.innerHTML = list.map((f, i) => {
      const rank = i + 1;
      const isPlayer = f.isPlayer || f.id === 'player';
      const belts = f.belts || [];
      return `<div class="rank-row ${isPlayer ? 'me' : ''}" data-fighter="${esc(f.id)}" data-player="${isPlayer ? '1' : ''}">
        <div class="num ${rank <= 3 ? 'top' : ''}">${rank}</div>
        <div class="who">
          <b>${esc(f.name)} ${belts.length ? `<span class="gold">${icon('belt', 12)}</span>` : ''} ${isPlayer ? '<span class="tag gold">VOCÊ</span>' : ''}</b>
          <span>${esc(f.nick || 'Sem apelido')} · ${countryName(f.nationality)} · ${STYLE_BY_ID[f.style]?.name || 'Estilo'} · ${f.age || '—'} anos</span>
        </div>
        <div class="rec">${recordText(f.record)}<br><span class="tiny">${(f.belts || []).length ? (f.belts || []).map((b) => orgOf(b.org).short).join(' ') : '&nbsp;'}</span></div>
        <div class="pts">${fmtNum(f.points || 0)}<br><span class="tiny" style="font-family:var(--font-cond);font-size:8px;color:var(--muted2)">PTS</span></div>
      </div>`;
    }).join('') || `<div class="empty-state"><b>Ranking vazio</b><p>Simule o universo para gerar resultados.</p></div>`;

    // Champion / player side
    const playerRanking = player ? playerRank(ui.universe, division, player.points) : null;
    const playerBelt = save?.career?.belts?.find((b) => b.division === division && (!org || b.org === org));
    const champ = org ? championOf(ui.universe, division, org) : list[0];
    const champBelts = champ?.belts || [];
    const top = list.slice(0, 3);
    const playerInDiv = save?.profile?.division === division;
    sideEl.innerHTML = `
      <div class="champ-card">
        <div class="belt-ico">${icon('belt', 36)}</div>
        <div class="nick">${org ? 'CAMPEÃO ' + orgOf(org).short : 'LÍDER DA DIVISÃO'}</div>
        <div class="name">${playerBelt && save ? esc(save.profile.name) : esc(champ?.name || 'Vacante')}</div>
        <div class="nick">${playerBelt && save ? 'SEU CINTURÃO' : esc(champ?.nick || 'Aguardando novo campeão')}</div>
        <div class="row" style="margin-top:10px;gap:6px">
          <span class="chip gold">${recordText(playerBelt && save ? save.career.record : champ?.record)}</span>
          <span class="chip">${champBelts.length} cinturões</span>
          <span class="chip">${divisionName(division)}</span>
        </div>
        ${champ ? `<button class="btn btn-sm btn-block" style="margin-top:12px" data-fighter="${esc(playerBelt && save ? 'player' : champ.id)}">${icon('eye', 14)} Ver dossiê</button>` : ''}
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Top 3 da divisão</h3></div>
        <div class="panel-body" style="display:flex;flex-direction:column;gap:9px">
          ${top.map((f, i) => `<div class="top3-row"><span class="num">${i + 1}</span><div style="flex:1;min-width:0"><b>${esc(f.name)}</b><div class="tiny">${recordText(f.record)} · ${countryName(f.nationality)}</div></div><span class="gold tiny">${fmtNum(f.points)} pts</span></div>`).join('')}
        </div>
      </div>
      ${save ? `<div class="panel">
        <div class="panel-head"><h3>Sua posição</h3></div>
        <div class="panel-body">
          <div class="row between"><div><div class="tiny">Ranking ${divisionName(division)}</div><div class="rank-big">#${playerInDiv ? playerRanking : '—'}</div></div><div style="text-align:right"><div class="tiny">Pontos</div><div class="rank-big">${fmtNum(save.career.points)}</div></div></div>
          <div class="divider" style="margin:14px 0"></div>
          <div class="row between"><span class="tiny">Cinturões na divisão</span><b>${save.career.belts.filter((b) => b.division === division).length}</b></div>
          <div class="row between" style="margin-top:7px"><span class="tiny">Recorde</span><b>${recordText(save.career.record)}</b></div>
          <div class="row between" style="margin-top:7px"><span class="tiny">Reputação</span><b>${save.career.reputation}</b></div>
          ${playerInDiv && playerRanking <= 2 && !playerBelt ? `<div class="notice" style="margin-top:12px">${icon('crown', 13)} Você está no TOP 2. Uma vitória pode valer uma disputa mundial.</div>` : ''}
        </div>
      </div>` : ''}
      <div class="panel">
        <div class="panel-head"><h3>Cinturões em jogo</h3><span class="tiny">${org ? orgOf(org).short : 'TODAS'}</span></div>
        <div class="panel-body" style="display:flex;flex-direction:column;gap:8px">
          ${BELT_TIERS.map((t) => `<div class="row between"><span class="tiny">${t.name}</span><span class="tag ${t.prestige >= 5 ? 'gold' : ''}">${t.short}</span></div>`).join('')}
        </div>
      </div>
    `;
    bindFighterButtons();
  };

  const bindFighterButtons = () => {
    el.querySelectorAll('[data-fighter]').forEach((row) => {
      row.addEventListener('click', () => openFighter(row.dataset.fighter));
    });
  };

  const openFighter = (id) => {
    let fighter = ui.universe?.fighters.find((f) => f.id === id);
    let isPlayer = id === 'player';
    if (isPlayer && save) {
      fighter = createPlayerFighter(save);
      fighter.belts = save.career.belts;
      fighter.points = save.career.points;
      fighter.isPlayer = true;
    }
    if (!fighter) return;
    const belts = fighter.belts || [];
    const attr = fighter.attributes || {};
    ui.modal({
      wide: true,
      title: esc(fighter.name),
      body: `<div class="dossier">
        <div class="dossier-head">
          <div class="avatar-lg">${initials(fighter.name)}</div>
          <div style="flex:1">
            <div class="kicker">${esc(fighter.nick || 'Sem apelido')}</div>
            <div class="row" style="gap:6px;margin-top:6px;flex-wrap:wrap">
              <span class="chip">${countryName(fighter.nationality)}</span>
              <span class="chip">${STYLE_BY_ID[fighter.style]?.name || 'Estilo'}</span>
              <span class="chip gold">${recordText(fighter.record)}</span>
              <span class="chip">${fighter.age || '—'} anos</span>
              <span class="chip">Overall ${fighter.overall || overall(attr)}</span>
            </div>
          </div>
        </div>
        <div class="dossier-body">
          <div>${attrBars(attr)}</div>
          <div>
            <div class="tiny" style="margin-bottom:6px">CINTURÕES</div>
            ${belts.length ? belts.map((b) => `<div class="mini-belt"><span>${icon('belt', 16)}</span><div><b>${beltTierName(b.tier)}</b><div class="tiny">${orgOf(b.org).short} · ${divisionName(b.division || division)} · ${b.defenses || 0} defesas</div></div></div>`).join('') : '<p class="tiny">Nenhum cinturão conquistado.</p>'}
            <div class="divider" style="margin:12px 0"></div>
            <div class="row between"><span class="tiny">Pontos de ranking</span><b class="gold">${fmtNum(fighter.points || 0)}</b></div>
            <div class="row between" style="margin-top:6px"><span class="tiny">Nacionalidade</span><b>${countryName(fighter.nationality)}</b></div>
            <div class="row between" style="margin-top:6px"><span class="tiny">Divisão</span><b>${divisionName(fighter.division || division)}</b></div>
          </div>
        </div>
      </div>`,
      actions: [
        { label: 'Fechar', cls: 'btn-ghost' },
        {
          label: isPlayer ? 'Ir para carreira' : 'Ver ranking', cls: 'btn-primary',
          onClick: () => { if (isPlayer) ui.navigate('career'); },
        },
      ],
    });
  };

  el.querySelectorAll('[data-div]').forEach((btn) => {
    btn.addEventListener('click', () => {
      division = btn.dataset.div;
      el.querySelectorAll('[data-div]').forEach((b) => b.classList.toggle('active', b === btn));
      render();
    });
  });
  el.querySelectorAll('[data-org]').forEach((btn) => {
    btn.addEventListener('click', () => {
      org = btn.dataset.org || null;
      el.querySelectorAll('[data-org]').forEach((b) => b.classList.toggle('active', b === btn));
      render();
    });
  });

  render();
  return el;
}
