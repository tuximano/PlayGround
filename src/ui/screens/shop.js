// TG Shop: gym gear, staff, sponsors, fictitious training boosters and cosmetics.
import { icon } from '../icons.js';
import { esc, h, fmtNum, screenHead } from '../helpers.js';
import { SHOP_ITEMS, MEDAL_NAMES } from '../../core/data.js';
import { addCoins, addMoney, persist } from '../../core/store.js';

const CATS = [
  { id: 'all', name: 'Todos' },
  { id: 'gym', name: 'Academia' },
  { id: 'training', name: 'Treino' },
  { id: 'staff', name: 'Treinadores' },
  { id: 'sponsor', name: 'Patrocínio' },
  { id: 'cosmetic', name: 'Cosméticos' },
];

export function shopScreen(ui) {
  const save = ui.save;
  if (!save) {
    return h(`<div class="screen plain">${ui.topbar('shop')}${screenHead({ kicker: 'Economia', title: 'Loja TG', sub: 'Crie uma carreira para comprar equipamentos.' })}<div class="empty-state">${icon('shop', 40)}<b>Loja bloqueada</b><p>Você precisa de uma carreira ativa para gastar TG COIN.</p><button class="btn btn-primary" data-nav="create">Criar carreira</button></div></div>`);
  }
  const c = save.career;
  let cat = 'all';
  const el = h(`<div class="screen">
    ${ui.topbar('shop')}
    ${screenHead({
      kicker: 'Economia virtual', title: 'Loja TG',
      sub: 'Equipamentos reais da academia, treinadores, patrocínios e itens cosméticos. TG COIN é uma moeda 100% virtual, sem valor em dinheiro real.',
      actions: `<span class="chip gold">${icon('coin', 13)} ${fmtNum(c.coins)} TG</span>
        <span class="chip">${icon('coin', 13)} C$ ${fmtNum(c.money)}</span>
        <button class="btn btn-sm btn-gold-outline" data-action="daily">${icon('calendar', 14)} Bônus diário</button>`,
    })}
    <div class="row between" style="margin-bottom:14px">
      <div class="tabs" style="margin:0;border:none">${CATS.map((x) => `<button data-cat="${x.id}" class="${x.id === cat ? 'active' : ''}">${x.name}</button>`).join('')}</div>
      <span class="tiny" data-count></span>
    </div>
    <div class="grid grid-auto" data-grid></div>
    <div class="divider"></div>
    <div class="grid grid-2">
      <div class="notice">${icon('shield', 14)} <b>Proteção de economia:</b> compras são validadas no seu save local, TG COIN não pode ser convertido em dinheiro real e não há compra de moeda com dinheiro real. Itens de treino são fictícios e não representam substâncias reais.</div>
      <div class="notice green">${icon('coin', 14)} <b>Ganhe TG:</b> vitórias, títulos, contratos, conquistas, patrocínios e o bônus diário. Cada luta rende TG COIN de acordo com a bolsa e o hype.</div>
    </div>
  </div>`);

  const grid = el.querySelector('[data-grid]');
  const count = el.querySelector('[data-count]');

  const owned = (item) => (c.gym.equipment || []).includes(item.id) || (item.type === 'sponsor' && c.sponsor === item.id);

  const render = () => {
    const items = SHOP_ITEMS.filter((i) => cat === 'all' || i.type === cat);
    count.textContent = `${items.length} itens`;
    grid.innerHTML = items.map((item) => {
      const has = owned(item);
      const boosterCount = item.type === 'training' ? (c.boosters?.[item.id] || 0) : 0;
      return `<div class="shop-card ${has ? 'owned' : ''}">
        <div class="ico-big">${icon(item.icon, 34)}</div>
        <div class="row between"><span class="tag ${item.type === 'cosmetic' ? 'blue' : item.type === 'sponsor' ? 'green' : 'gold'}">${labelFor(item.type)}</span>${has ? `<span class="tag green">${icon('check', 10)} COMPRADO</span>` : ''}</div>
        <h4>${esc(item.name)}</h4>
        <p>${esc(item.desc)}</p>
        ${item.type === 'training' ? `<span class="tiny">Estoque: ${boosterCount} · uso único por sessão</span>` : ''}
        <div class="price-row">
          <div class="price">${fmtNum(item.price)} <small>C$</small>${item.coins ? `<span class="tiny gold"> + ${item.coins} TG</span>` : ''}</div>
          <button class="btn btn-sm ${has && item.type !== 'training' ? '' : 'btn-primary'}" data-buy="${item.id}" ${has && item.type !== 'training' ? 'disabled' : ''}>
            ${item.type === 'training' ? (boosterCount ? 'Comprar outro' : 'Comprar') : has ? 'Adquirido' : 'Comprar'}
          </button>
        </div>
      </div>`;
    }).join('');
    grid.querySelectorAll('[data-buy]').forEach((btn) => btn.addEventListener('click', () => buy(btn.dataset.buy)));
  };

  const buy = (id) => {
    const item = SHOP_ITEMS.find((i) => i.id === id);
    if (!item) return;
    if (owned(item) && item.type !== 'training') { ui.toast('Você já possui este item.', 'error', 'check'); return; }
    if (c.money < item.price) { ui.toast('Carteira insuficiente. Vença lutas para ganhar C$.', 'error', 'coin'); return; }
    if (item.coins && c.coins < item.coins) { ui.toast(`TG COIN insuficiente. Faltam ${item.coins - c.coins} TG.`, 'error', 'coin'); return; }
    if (item.type === 'sponsor' && c.sponsor && c.sponsor !== item.id) {
      const current = SHOP_ITEMS.find((i) => i.id === c.sponsor);
      ui.confirm({
        title: 'Trocar patrocínio?', message: `Seu patrocínio atual é <b>${esc(current?.name || 'outro')}</b>. Deseja substituí-lo por <b>${esc(item.name)}</b>?`,
        confirmLabel: 'Trocar', onConfirm: () => executePurchase(item),
      });
      return;
    }
    executePurchase(item);
  };

  const executePurchase = (item) => {
    addMoney(save, -item.price);
    if (item.coins) addCoins(save, -item.coins, 'Compra na loja');
    if (item.type === 'training') {
      c.boosters[item.id] = (c.boosters[item.id] || 0) + 1;
    } else {
      if (!c.gym.equipment.includes(item.id)) c.gym.equipment.push(item.id);
      if (item.type === 'staff') c.gym.coach = item.name;
      if (item.type === 'sponsor') c.sponsor = item.id;
      if (item.id === 'cosmetic_gold') save.profile.appearance.glove = 'glove96';
      if (item.id === 'cosmetic_medal') save.profile.appearance.medal = MEDAL_NAMES[1];
      if (item.id === 'robe_champ') save.profile.appearance.robe = 'robe95';
      const gymItems = c.gym.equipment.filter((x) => SHOP_ITEMS.find((s) => s.id === x)?.type === 'gym').length;
      c.gym.level = Math.min(10, 1 + Math.floor(gymItems * 0.75));
    }
    persist(save, true);
    ui.app.audio.coin();
    ui.toast(`${item.name} adquirido!`, 'success', item.icon);
    ui.refresh({ scroll: 'keep' });
  };

  el.querySelectorAll('[data-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      cat = btn.dataset.cat;
      el.querySelectorAll('[data-cat]').forEach((b) => b.classList.toggle('active', b === btn));
      render();
    });
  });

  el.querySelector('[data-action="daily"]').addEventListener('click', () => {
    const today = new Date().toISOString().slice(0, 10);
    if (c.lastDaily === today) { ui.toast('Bônus diário já resgatado hoje. Volte amanhã!', 'error', 'calendar'); return; }
    c.lastDaily = today;
    addCoins(save, 75, 'Bônus diário');
    persist(save, true);
    ui.app.audio.coin();
    ui.toast('+75 TG COIN de bônus diário!', 'success', 'coin');
    ui.refresh({ scroll: 'keep' });
  });

  render();
  return el;
}

function labelFor(type) {
  return { gym: 'ACADEMIA', training: 'TREINO FICTÍCIO', staff: 'EQUIPE', sponsor: 'PATROCÍNIO', cosmetic: 'COSMÉTICO' }[type] || 'ITEM';
}
