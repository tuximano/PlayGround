// Career dashboard: profile, contracts, training status, titles and live news.
import { icon } from '../icons.js';
import {
  esc, h, fmtNum, fmtMoney, fmtDate, initials, recordText, overall, divisionName, countryName,
  statTile, screenHead, orgOf, beltTierName,
} from '../helpers.js';
import { DIVISION_BY_ID, STYLE_BY_ID, ORGS } from '../../core/data.js';
import {
  ensureOffers, acceptOffer, cancelOffer, declineOffer, restDays, playerRankNow, divisionTop,
} from '../../core/career.js';
import { negotiateOffer, championOf } from '../../core/universe.js';
import { persist } from '../../core/store.js';

export function careerScreen(ui) {
  const save = ui.save;
  if (!save) {
    return h(`<div class="screen plain">${ui.topbar('career')}<div class="empty-state">${icon('crown', 46)}<b>Nenhuma carreira ativa</b><p>Crie seu lutador para começar a jornada rumo ao cinturão mundial.</p><button class="btn btn-primary" data-nav="create">Criar carreira</button></div></div>`);
  }
  const c = save.career;
  const p = save.profile;
  ensureOffers(save, ui.universe, 3);
  const rank = playerRankNow(save, ui.universe);
  const div = DIVISION_BY_ID[p.division] || DIVISION_BY_ID.middle;
  const champions = ORGS.map((org) => {
    const playerBelt = c.belts.find((b) => b.org === org.id && b.division === p.division);
    return { org, fighter: championOf(ui.universe, p.division, org.id), playerBelt };
  });
  const active = c.activeOffer;
  const news = c.news.slice(0, 5);
  const overallValue = overall(p.attributes);
  const winRate = c.record.w + c.record.l + c.record.d > 0 ? Math.round((c.record.w / (c.record.w + c.record.l + c.record.d)) * 100) : 0;

  const el = h(`<div class="screen">
    ${ui.topbar('career', `<button class="btn btn-sm btn-gold-outline" data-action="rest">${icon('clock', 14)} Descansar 7 dias</button>`)}
    ${screenHead({
      kicker: 'Modo carreira', title: 'O caminho do campeão',
      sub: `Temporada ${c.season.year} · ${divisionName(p.division)} · ${fmtDate(c.date)}`,
      actions: `<button class="btn btn-sm" data-nav="gym">${icon('gym', 15)} Academia</button>
        <button class="btn btn-sm" data-nav="rankings">${icon('chart', 15)} Rankings</button>
        <button class="btn btn-sm btn-gold-outline" data-action="edit">${icon('person', 15)} Editar Lutador</button>`,
    })}

    <div class="career-top">
      <div class="career-hero">
        <div class="avatar-lg" style="width:96px;height:96px;font-size:38px">${initials(p.name)}</div>
        <div style="flex:1;min-width:0">
          <div class="fighter-card">
            <div>
              <div class="name">${esc(p.name)}</div>
              <div class="nick">${esc(p.nickname || 'Sem apelido')} · ${countryName(p.nationality)}</div>
              <div class="row" style="margin-top:8px;gap:6px">
                <span class="chip gold">${icon('crown', 12)} RANKING #${rank}</span>
                <span class="chip">${icon('star', 12)} OVERALL ${overallValue}</span>
                <span class="chip">${STYLE_BY_ID[p.style]?.name || 'Técnico'}</span>
              </div>
            </div>
          </div>
          <div class="profile-stats">
            <div><b>${recordText(c.record)}</b><span>Cartel</span></div>
            <div><b>${c.record.ko}</b><span>Nocautes</span></div>
            <div><b>${c.reputation}</b><span>Reputação</span></div>
            <div><b>${winRate}%</b><span>Vitórias</span></div>
            <div><b>${c.belts.length}</b><span>Cinturões</span></div>
          </div>
        </div>
      </div>
      <div class="career-side">
        ${active ? `
          <div class="next-fight-card">
            <div class="kicker">Contrato assinado · ${esc(active.eventName)}</div>
            <h3>${esc(p.name)} <span class="muted" style="font-family:var(--font-cond);font-size:14px">VS</span> ${esc(active.opponent.name)}</h3>
            <div class="meta">${icon('calendar', 11)} ${fmtDate(active.date)} · ${esc(active.arenaName)}, ${esc(active.city)} · ${active.rounds} rounds</div>
            <div class="row between" style="margin-top:12px">
              <div class="row" style="gap:6px">
                <span class="chip gold">${icon('coin', 12)} C$ ${fmtNum(active.purse)}</span>
                <span class="chip">${icon('coin', 12)} ${active.coinReward} TG</span>
                ${active.title ? `<span class="chip red">${icon('belt', 12)} TÍTULO</span>` : ''}
              </div>
              <button class="btn btn-primary btn-sm" data-action="fight">${icon('play', 14)} Iniciar Luta</button>
            </div>
          </div>
        ` : `
          <div class="next-fight-card">
            <div class="kicker">Próximo passo</div>
            <h3>Assine um contrato</h3>
            <div class="meta">Escolha uma das ofertas abaixo e prepare o campo de treino.</div>
            <div class="row" style="margin-top:12px;gap:6px">
              <span class="chip">${icon('calendar', 11)} ${c.offers.length} ofertas</span>
              <span class="chip gold">${icon('coin', 11)} C$ ${fmtNum(c.money)}</span>
            </div>
          </div>
        `}
        <div class="stat-tile accent"><div class="label">TG COIN</div><div class="value">${fmtNum(c.coins)}</div><div class="sub">Moeda virtual</div></div>
        <div class="stat-tile"><div class="label">Sessões de treino</div><div class="value">${c.training.sessionsLeft}<span style="font-size:14px;color:var(--muted)">/4</span></div><div class="sub">Fadiga ${c.training.fatigue}%</div></div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="stack">
        <div class="panel">
          <div class="panel-head"><h3>${active ? 'Contrato ativo' : 'Ofertas de luta'}</h3><span class="tiny">${active ? '1 contrato' : `${c.offers.length} disponíveis`}</span></div>
          <div class="panel-body">
            ${active ? activeContract(active) : offerList(c.offers, p.division)}
            ${!active ? `<div class="notice" style="margin-top:12px">${icon('shield', 13)} Negocie a bolsa uma vez por oferta. Contratos de título exigem ranking e histórico.</div>` : ''}
          </div>
        </div>

        <div class="panel">
          <div class="panel-head"><h3>Treino & preparação</h3><button class="btn btn-sm btn-ghost" data-nav="gym">Abrir academia ${icon('arrow', 13)}</button></div>
          <div class="panel-body">
            <div class="row between" style="margin-bottom:6px"><span class="tiny">Fadiga</span><span class="tiny">${c.training.fatigue}%</span></div>
            <div class="progress" style="margin-bottom:14px"><i style="width:${c.training.fatigue}%;background:linear-gradient(90deg,#34d399,#f2c14e,#e11d48)"></i></div>
            <div class="training-row"><div class="ico">${icon('gym', 17)}</div><div style="flex:1"><b>${c.training.sessionsLeft} sessões restantes</b><span>Total de ${c.training.totalSessions} sessões concluídas</span></div><span class="chip ${c.training.sessionsLeft > 0 ? 'green' : ''}">${c.training.sessionsLeft > 0 ? 'Pronto' : 'Descansar'}</span></div>
            <div class="training-row"><div class="ico">${icon('coach', 17)}</div><div style="flex:1"><b>${esc(c.gym.coach === 'Basico' ? 'Coach Básico' : c.gym.coach)}</b><span>${c.gym.equipment.length} equipamentos comprados</span></div><span class="chip">Nível ${c.gym.level}</span></div>
            <div class="training-row"><div class="ico">${icon('sponsor', 17)}</div><div style="flex:1"><b>${c.sponsor ? 'Patrocínio ativo' : 'Sem patrocínio'}</b><span>${c.sponsor ? 'Bônus por vitória garantido' : 'Visite a Loja TG para fechar um contrato'}</span></div><button class="btn btn-sm btn-ghost" data-nav="shop">Loja</button></div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-head"><h3>Galeria de cinturões</h3><span class="tiny">${c.belts.length} títulos</span></div>
          <div class="panel-body">
            ${c.belts.length ? `<div class="belts-strip">${c.belts.map((b) => `<div class="belt-card">${beltIcon(b)}<div><b>${beltTierName(b.tier)}</b><span>${orgOf(b.org).short} · ${divisionName(b.division)}</span><div class="tiny">${b.defenses || 0} defesas · conquistado em ${fmtDate(b.wonAt)}</div></div></div>`).join('')}</div>` : `<div class="empty-state" style="padding:24px">${icon('belt', 32)}<b>Nenhum cinturão ainda</b><p>Vença lutas, suba no ranking e dispute um título mundial.</p></div>`}
          </div>
        </div>
      </div>

      <div class="stack">
        <div class="panel">
          <div class="panel-head"><h3>Campeões da divisão</h3><span class="tiny">${div.name}</span></div>
          <div class="panel-body" style="display:flex;flex-direction:column;gap:10px">
            ${champions.map(({ org, fighter, playerBelt }) => `
              <div class="champ-row">
                <span class="org-dot" style="background:${org.color}"></span>
                <div style="flex:1;min-width:0">
                  <div class="tiny" style="color:${org.color}">${org.short}</div>
                  <b>${playerBelt ? esc(p.name) : esc(fighter?.name || 'Vacante')}</b>
                </div>
                ${playerBelt ? '<span class="tag gold">VOCÊ</span>' : `<span class="tiny">${fighter ? recordText(fighter.record) : '—'}</span>`}
              </div>`).join('')}
          </div>
        </div>

        <div class="panel">
          <div class="panel-head"><h3>TG News</h3><button class="btn btn-sm btn-ghost" data-nav="news">Ver tudo ${icon('arrow', 13)}</button></div>
          <div class="panel-body news-mini">
            ${news.map((n) => `<div class="item" data-news="${esc(n.id)}"><span class="dot"></span><div style="flex:1"><div class="t">${esc(n.title)}</div><div class="d">${fmtDate(n.date)} · ${esc(n.tag || 'NOTÍCIA')}</div></div></div>`).join('') || `<p class="tiny">Nenhuma notícia ainda. Simule uma semana para movimentar o mundo.</p>`}
          </div>
        </div>

        <div class="panel">
          <div class="panel-head"><h3>Metas da temporada</h3><span class="tiny">${c.season.wins}/${c.season.fights} vitórias</span></div>
          <div class="panel-body">
            <div class="bars">
              <div class="bar-row"><span>Top 10</span><span class="bar-track"><i class="bar-fill" style="width:${Math.max(4, 100 - Math.min(100, rank))}%"></i></span><span class="attr-value">#${rank}</span></div>
              <div class="bar-row"><span>Reputação</span><span class="bar-track"><i class="bar-fill" style="width:${c.reputation}%"></i></span><span class="attr-value">${c.reputation}</span></div>
              <div class="bar-row"><span>Nocautes</span><span class="bar-track"><i class="bar-fill red" style="width:${Math.min(100, c.record.ko * 10)}%"></i></span><span class="attr-value">${c.record.ko}</span></div>
              <div class="bar-row"><span>Defesas</span><span class="bar-track"><i class="bar-fill green" style="width:${Math.min(100, c.season.defenses * 25)}%"></i></span><span class="attr-value">${c.season.defenses}</span></div>
            </div>
            <div class="divider" style="margin:14px 0"></div>
            <div class="row between"><span class="tiny">Bolsas acumuladas</span><b class="gold">${fmtMoney(c.totalPurse)}</b></div>
            <div class="row between" style="margin-top:6px"><span class="tiny">Melhor vitória</span><b style="font-size:12px">${esc(c.season.bestWin || '—')}</b></div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-head"><h3>Próximos eventos</h3></div>
          <div class="panel-body" style="display:flex;flex-direction:column;gap:8px">
            ${(c.offers || []).slice(0, 3).map((o) => `<div class="quick-row" data-news-offer="${esc(o.id)}"><span class="dot" style="background:${DIVISION_BY_ID[o.opponent.division || p.division]?.color || '#f2c14e'}"></span><div><b>${esc(o.eventName)}</b><div class="tiny">${fmtDate(o.date)} · ${esc(o.arenaName)}</div></div><span class="tiny">${o.rounds}R</span></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`);

  // Offer actions
  el.querySelectorAll('[data-offer]').forEach((row) => {
    row.addEventListener('click', (e) => {
      if (e.target.closest('[data-offer-action]')) return;
      el.querySelectorAll('[data-offer]').forEach((r) => r.classList.toggle('selected', r === row));
      el.querySelectorAll('[data-offer-actions]').forEach((a) => { a.style.display = 'none'; });
      row.querySelector('[data-offer-actions]').style.display = 'flex';
    });
  });
  el.querySelectorAll('[data-offer-action]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const offer = c.offers.find((o) => o.id === btn.dataset.offerId);
      if (!offer) return;
      const action = btn.dataset.offerAction;
      if (action === 'accept') {
        ui.confirm({
          title: 'Assinar contrato?',
          message: `Você enfrentará <b>${esc(offer.opponent.name)}</b> em ${fmtDate(offer.date)} na ${esc(offer.arenaName)}. Bolsa: <b>C$ ${fmtNum(offer.purse)}</b> + ${offer.coinReward} TG COIN.${offer.title ? '<br><br><b class="gold">Esta luta vale o ' + beltTierName(offer.title.tier) + '!</b>' : ''}`,
          confirmLabel: 'Assinar e preparar',
          onConfirm: () => {
            const res = acceptOffer(save, offer);
            if (!res.ok) { ui.toast(res.message, 'error', 'lock'); return; }
            persist(save, true);
            ui.toast('Contrato assinado! Prepare-se na academia.', 'success', 'check');
            ui.refresh({ scroll: 'keep' });
          },
        });
      } else if (action === 'negotiate') {
        const res = negotiateOffer(offer);
        ui.toast(res.message, res.ok ? 'success' : 'error', res.ok ? 'coin' : 'lock');
        if (res.ok) persist(save, true);
        ui.refresh({ scroll: 'keep' });
      } else if (action === 'decline') {
        ui.confirm({
          title: 'Recusar oferta?', message: `A oferta contra ${esc(offer.opponent.name)} será removida.`, danger: true,
          confirmLabel: 'Recusar', onConfirm: () => {
            declineOffer(save, ui.universe, offer.id);
            persist(save, true);
            ui.refresh({ scroll: 'keep' });
          },
        });
      }
    });
  });

  el.querySelector('[data-action="fight"]')?.addEventListener('click', () => {
    ui.navigate('fight', {
      mode: 'career', offer: c.activeOffer, arenaId: c.activeOffer.arenaId,
      rounds: c.activeOffer.rounds, division: p.division,
    });
  });
  el.querySelector('[data-action="cancel-contract"]')?.addEventListener('click', () => {
    ui.confirm({
      title: 'Cancelar contrato?', message: 'Cancelar pode reduzir sua reputação e gerar uma notícia negativa.', danger: true,
      confirmLabel: 'Cancelar luta', onConfirm: () => {
        cancelOffer(save);
        c.reputation = Math.max(0, c.reputation - 2);
        persist(save, true);
        ui.refresh({ scroll: 'keep' });
      },
    });
  });
  el.querySelector('[data-action="edit"]')?.addEventListener('click', () => ui.navigate('editor', { mode: 'edit' }));
  el.querySelector('[data-action="rest"]')?.addEventListener('click', () => {
    restDays(save, ui.universe, 7);
    persist(save, true);
    ui.toast('Uma semana se passou. Sessões restauradas e rankings movimentados.', 'success', 'clock');
    ui.refresh({ scroll: 'keep' });
  });
  el.querySelectorAll('[data-news]').forEach((item) => item.addEventListener('click', () => ui.navigate('news', { id: item.dataset.news })));
  el.querySelectorAll('[data-news-offer]').forEach((item) => item.addEventListener('click', () => {
    const row = el.querySelector(`[data-offer="${item.dataset.newsOffer}"]`);
    row?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    row?.click();
  }));

  return el;
}

function offerList(offers, division) {
  if (!offers?.length) return `<p class="tiny">Nenhuma oferta no momento. Descanse alguns dias para receber novas propostas.</p>`;
  return `<div class="offer-list">${offers.map((o) => `
    <div class="offer-card" data-offer="${esc(o.id)}">
      <div class="avatar-lg" style="width:46px;height:46px;font-size:16px">${initials(o.opponent.name)}</div>
      <div class="opp">
        <b>${esc(o.opponent.name)}</b>
        <span>${esc(o.opponent.nick || '')} ${o.opponent.nick ? '·' : ''} ${recordText(o.opponent.record)} · Overall ${o.opponent.overall} · ${esc(o.styleName || '')}</span>
        <div class="row" style="gap:5px;margin-top:5px">
          ${o.title ? `<span class="tag gold">${esc(beltTierName(o.title.tier))}</span>` : ''}
          <span class="tag ${o.hype > 70 ? 'red' : 'blue'}">HYPE ${o.hype}</span>
          <span class="tag">${o.rounds} ROUNDS</span>
          ${o.negotiated ? '<span class="tag green">NEGOCIADO</span>' : ''}
        </div>
      </div>
      <div class="purse"><b>${fmtNum(o.purse)}</b><span>C$ · ${o.coinReward} TG</span><span>${fmtDate(o.date)}</span></div>
      <div class="offer-actions" data-offer-actions style="display:none">
        <button class="btn btn-sm btn-primary" data-offer-action="accept" data-offer-id="${esc(o.id)}">Aceitar</button>
        <button class="btn btn-sm" data-offer-action="negotiate" data-offer-id="${esc(o.id)}" ${o.negotiated ? 'disabled' : ''}>Negociar</button>
        <button class="btn btn-sm btn-ghost" data-offer-action="decline" data-offer-id="${esc(o.id)}">Recusar</button>
      </div>
    </div>`).join('')}</div>`;
}

function activeContract(offer) {
  return `<div class="active-contract">
    <div class="row between" style="align-items:flex-start">
      <div>
        <div class="kicker">${esc(offer.eventName)}</div>
        <h2 style="font-family:var(--font-display);font-size:38px;margin:2px 0 0;line-height:0.9">${esc(offer.opponent.name)}</h2>
        <div class="tiny" style="margin-top:6px">${recordText(offer.opponent.record)} · Overall ${offer.opponent.overall} · ${esc(offer.styleName)} · ${offer.opponent.age} anos</div>
        <div class="row" style="gap:6px;margin-top:10px">
          <span class="chip gold">${icon('calendar', 11)} ${fmtDate(offer.date)}</span>
          <span class="chip">${icon('flag', 11)} ${esc(offer.arenaName)}</span>
          <span class="chip">${icon('coin', 11)} ${fmtNum(offer.purse)} C$ + ${offer.coinReward} TG</span>
          ${offer.title ? `<span class="chip red">${icon('belt', 11)} ${esc(beltTierName(offer.title.tier))}</span>` : ''}
        </div>
        <p class="tiny" style="margin-top:12px;max-width:520px">"${esc(offer.callout || STYLE_BY_ID[offer.opponent.style]?.desc || 'Vamos ver quem é o melhor.')}"</p>
      </div>
      <div style="text-align:center;flex:none">
        <div class="avatar-lg" style="width:76px;height:76px;font-size:26px">${initials(offer.opponent.name)}</div>
        <div class="tiny" style="margin-top:4px">${esc(offer.opponent.nationality || '')}</div>
      </div>
    </div>
    <div class="row" style="margin-top:16px;gap:8px">
      <button class="btn btn-primary" data-action="fight">${icon('play', 15)} Iniciar Luta</button>
      <button class="btn btn-ghost" data-action="cancel-contract">Cancelar contrato</button>
    </div>
  </div>`;
}

function beltIcon(belt) {
  const org = orgOf(belt.org);
  return `<div class="belt-art" style="background:radial-gradient(circle at 40% 35%, #fff3c4, ${org.color} 48%, #3a2405)">${org.short}</div>`;
}
