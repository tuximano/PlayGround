// Gym: timing-based training drills, fatigue, equipment and recovery.
import { icon } from '../icons.js';
import { esc, h, fmtNum, attrBars, screenHead, overall, recordText } from '../helpers.js';
import { SHOP_ITEMS, COACH_LINES } from '../../core/data.js';
import { DRILLS, trainDrill, restDays, trainingBoostersAvailable } from '../../core/career.js';
import { persist, bus } from '../../core/store.js';

export function gymScreen(ui) {
  const save = ui.save;
  if (!save) {
    return h(`<div class="screen plain">${ui.topbar('gym')}${screenHead({ kicker: 'Preparação', title: 'Academia', sub: 'Crie uma carreira para treinar.' })}<div class="empty-state">${icon('gym', 40)}<b>Academia fechada</b><p>Seu lutador ainda não existe. Crie uma carreira para começar o treinamento.</p><button class="btn btn-primary" data-nav="create">Criar carreira</button></div></div>`);
  }
  const c = save.career;
  const p = save.profile;
  const t = c.training;
  let selected = t.lastDrill || 'power';
  let running = true;
  let pos = 0.5;
  let dir = 1;
  let stopped = false;
  const coachName = c.gym.coach === 'Basico' ? 'Coach Básico' : c.gym.coach;
  const coachLine = COACH_LINES.idle[Math.floor(Math.random() * COACH_LINES.idle.length)];
  const boosters = trainingBoostersAvailable(save);

  const el = h(`<div class="screen gym-screen">
    ${ui.topbar('gym')}
    ${screenHead({
      kicker: 'Campo de treino', title: 'Academia TG',
      sub: `${esc(p.name)} · ${recordText(c.record)} · Overall ${overall(p.attributes)}. Cada sessão gasta 1 dia e aumenta a fadiga.`,
      actions: `<span class="chip ${t.sessionsLeft ? 'green' : 'red'}">${icon('bolt', 13)} ${t.sessionsLeft}/4 sessões</span>
        <span class="chip">${icon('heart', 13)} Fadiga ${t.fatigue}%</span>
        <button class="btn btn-sm btn-gold-outline" data-action="rest">${icon('clock', 14)} Descansar 7 dias</button>`,
    })}
    <div class="gym-layout">
      <div class="stack">
        <div class="gym-hero panel" style="border:none;background:linear-gradient(0deg,rgba(6,6,8,.92),rgba(6,6,8,.2))">
          <div>
            <div class="kicker">${esc(coachName)}</div>
            <h2>Pronto para suar?</h2>
            <p>"${esc(coachLine)}"</p>
            <div class="row" style="gap:6px">
              <span class="chip gold">Nível da academia ${c.gym.level}</span>
              <span class="chip">${c.gym.equipment.length} equipamentos</span>
              ${boosters.length ? `<span class="chip green">${boosters.reduce((a, b) => a + b.count, 0)} boosters</span>` : ''}
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-head"><h3>Escolha o treino</h3><span class="tiny">Clique em um drill e acerte o tempo</span></div>
          <div class="panel-body">
            <div class="drill-grid" data-drills>
              ${DRILLS.map((d) => `<div class="drill-card ${selected === d.id ? 'active' : ''}" data-drill="${d.id}">
                <div class="row" style="gap:8px"><span class="ico">${icon(d.icon, 18)}</span><div><b>${d.name}</b><div class="tiny">${d.attrs.map((a) => a[0].toUpperCase() + a.slice(1)).join(' + ')}</div></div></div>
                <p class="tiny" style="margin:7px 0 0;line-height:1.4">${d.desc}</p>
              </div>`).join('')}
            </div>

            <div class="timing-panel" data-timing>
              <div class="row between"><span class="tiny">Janela de impacto</span><span class="tiny" data-preview>${DRILLS.find((d) => d.id === selected)?.name}</span></div>
              <div class="timing-game">
                <div class="timing-zone" style="left:36%;width:28%"></div>
                <div class="timing-marker" data-marker style="left:50%"></div>
              </div>
              <div class="row between">
                <span class="tiny">${t.sessionsLeft > 0 ? 'Acerte o centro para ganho máximo.' : 'Sem sessões. Descanse para recuperar.'}</span>
                <button class="btn btn-primary" data-action="train" ${t.sessionsLeft <= 0 ? 'disabled' : ''}>${icon('fist', 15)} Golpear!</button>
              </div>
              <div class="timing-result" data-result></div>
            </div>
          </div>
        </div>
      </div>

      <div class="stack">
        <div class="panel">
          <div class="panel-head"><h3>Atributos</h3><span class="tiny">Overall ${overall(p.attributes)}</span></div>
          <div class="panel-body">${attrBars(p.attributes)}
            <div class="divider" style="margin:12px 0"></div>
            <div class="row between"><span class="tiny">Fadiga atual</span><b>${t.fatigue}%</b></div>
            <div class="progress" style="margin-top:6px"><i style="width:${t.fatigue}%;background:linear-gradient(90deg,#34d399,#f2c14e,#e11d48)"></i></div>
            <div class="row between" style="margin-top:12px"><span class="tiny">Sessões totais</span><b>${t.totalSessions}</b></div>
            <div class="row between" style="margin-top:6px"><span class="tiny">Último treino</span><b>${esc(DRILLS.find((d) => d.id === t.lastDrill)?.name || '—')}</b></div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-head"><h3>Equipamentos</h3><button class="btn btn-sm btn-ghost" data-nav="shop">Loja ${icon('arrow', 12)}</button></div>
          <div class="panel-body">
            ${c.gym.equipment.length ? c.gym.equipment.map((id) => {
              const item = SHOP_ITEMS.find((s) => s.id === id);
              if (!item) return '';
              return `<div class="training-row"><div class="ico">${icon(item.icon, 16)}</div><div style="flex:1"><b>${esc(item.name)}</b><span>${esc(item.desc)}</span></div><span class="tag green">ATIVO</span></div>`;
            }).join('') : `<div class="empty-state" style="padding:20px">${icon('bag', 30)}<b>Academia vazia</b><p>Compre saco de pancada, ringue e kits para acelerar o treino.</p><button class="btn btn-sm btn-primary" data-nav="shop">Abrir loja</button></div>`}
          </div>
        </div>

        <div class="panel">
          <div class="panel-head"><h3>Boosters fictícios</h3></div>
          <div class="panel-body">
            ${boosters.length ? boosters.map(({ item, count }) => `<div class="row between" style="padding:7px 0;border-bottom:1px solid var(--line)"><div><b style="font-family:var(--font-cond);font-size:13px">${esc(item.name)}</b><div class="tiny">${esc(item.desc)}</div></div><span class="chip gold">x${count}</span></div>`).join('') : `<p class="tiny">Nenhum booster. Eles são itens de treino fictícios e não representam substâncias reais.</p>`}
            <div class="notice" style="margin-top:12px">${icon('shield', 13)} Boosters são consumidos automaticamente no próximo treino e buffam o ganho em +8%.</div>
          </div>
        </div>

        ${c.activeOffer ? `<div class="next-fight-card"><div class="kicker">Luta marcada</div><h3>${esc(c.activeOffer.opponent.name)}</h3><div class="meta">${esc(c.activeOffer.eventName)} · ${esc(c.activeOffer.arenaName)}</div><button class="btn btn-primary btn-sm btn-block" style="margin-top:10px" data-action="fight">${icon('play', 13)} Iniciar luta</button></div>` : ''}
      </div>
    </div>
  </div>`);

  const marker = el.querySelector('[data-marker]');
  const preview = el.querySelector('[data-preview]');
  const resultEl = el.querySelector('[data-result]');

  const updateMarker = () => { marker.style.left = `${pos * 100}%`; };
  const off = bus.on('frame', (dt) => {
    if (!running || stopped) return;
    pos += dir * dt * 0.78;
    if (pos > 1) { pos = 1; dir = -1; }
    if (pos < 0) { pos = 0; dir = 1; }
    updateMarker();
  });
  ui.onCleanup(off);

  el.querySelectorAll('[data-drill]').forEach((card) => {
    card.addEventListener('click', () => {
      selected = card.dataset.drill;
      el.querySelectorAll('[data-drill]').forEach((c2) => c2.classList.toggle('active', c2 === card));
      preview.textContent = DRILLS.find((d) => d.id === selected)?.name;
      stopped = false;
      running = true;
      pos = 0.5;
      resultEl.innerHTML = '';
      ui.app.audio.ui();
    });
  });

  const strike = () => {
    if (stopped || t.sessionsLeft <= 0) return;
    stopped = true;
    running = false;
    const distance = Math.abs(pos - 0.5);
    const timing = Math.max(0, Math.min(1, 1 - distance / 0.5));
    const quality = distance < 0.07 ? 'PERFEITO' : distance < 0.16 ? 'ÓTIMO' : distance < 0.28 ? 'BOM' : 'FRACO';
    resultEl.innerHTML = `<div class="timing-hit" style="left:50%;transform:translate(-50%,-50%);color:${distance < 0.16 ? 'var(--green)' : distance < 0.3 ? 'var(--gold)' : '#ff7c91'}">${quality}</div>`;
    const res = trainDrill(save, ui.universe, selected, timing);
    if (!res.ok) {
      ui.toast(res.message, 'error', 'bolt');
      running = true;
      stopped = false;
      return;
    }
    const gainsText = Object.entries(res.gains).map(([k, v]) => `+${v} ${k[0].toUpperCase() + k.slice(1)}`).join(' · ');
    persist(save, true);
    ui.app.audio.punch(0.7);
    resultEl.innerHTML = `<div class="training-gain"><span class="tag ${distance < 0.16 ? 'green' : 'gold'}">${quality}</span> ${esc(gainsText)} <span class="tiny">Fadiga ${res.fatigue}%</span></div>`;
    ui.toast(`Treino concluído: ${gainsText}`, 'success', 'gym');
    setTimeout(() => ui.refresh({ scroll: 'keep' }), 1100);
  };

  el.querySelector('[data-action="train"]').addEventListener('click', strike);
  el.querySelector('[data-action="rest"]').addEventListener('click', () => {
    restDays(save, ui.universe, 7);
    persist(save, true);
    ui.toast('Descanso concluído: sessões restauradas e fadiga reduzida.', 'success', 'heart');
    ui.refresh({ scroll: 'keep' });
  });
  el.querySelector('[data-action="fight"]')?.addEventListener('click', () => ui.navigate('fight', {
    mode: 'career', offer: c.activeOffer, arenaId: c.activeOffer.arenaId, rounds: c.activeOffer.rounds, division: p.division,
  }));

  const keyHandler = (e) => {
    if (e.code === 'Space' && !e.repeat && !e.target.closest('input,select,textarea,button')) {
      e.preventDefault();
      strike();
    }
  };
  window.addEventListener('keydown', keyHandler);
  ui.onCleanup(() => window.removeEventListener('keydown', keyHandler));

  return el;
}
