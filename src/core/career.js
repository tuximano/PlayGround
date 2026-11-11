// Career operations: contracts, training, fight consequences, titles, news and awards.
import {
  DIVISION_BY_ID, ORGS, BELT_TIERS, AWARD_TYPES, SHOP_ITEMS, ARENA_BY_ID, STYLE_BY_ID, formatDate,
} from './data.js';
import {
  addNews, addCoins, addMoney, advanceDate, unlockAchievement, createPlayerFighter, gearBoost, overallOf,
} from './store.js';
import {
  generateOffers, playerRank, simulateBackground, makeResultArticle, makeTitleArticle, computeAwards, rankingsFor, championOf,
} from './universe.js';
import { clamp } from './rng.js';

export const DRILLS = [
  { id: 'power', name: 'Trabalho de Potência', icon: 'fist', attrs: ['strength', 'conditioning'], cost: 1, desc: 'Saco pesado, pliometria e explosão. Aumenta Força.' },
  { id: 'speed', name: 'Mãos Rápidas', icon: 'bolt', attrs: ['speed', 'precision'], cost: 1, desc: 'Velocidade de reação e combinações no mitt. Aumenta Velocidade.' },
  { id: 'stamina', name: 'Base Aeróbica', icon: 'lungs', attrs: ['stamina', 'conditioning'], cost: 1, desc: 'Corrida, corda e rounds infinitos. Aumenta Resistência.' },
  { id: 'defense', name: 'Guarda e Esquiva', icon: 'shield', attrs: ['defense', 'reflexes'], cost: 1, desc: 'Sparring defensivo e leitura de golpes. Aumenta Defesa.' },
  { id: 'footwork', name: 'Pés de Dançarino', icon: 'feet', attrs: ['mobility', 'speed'], cost: 1, desc: 'Escada de agilidade e ângulos. Aumenta Mobilidade.' },
  { id: 'recovery', name: 'Recuperação e Respiração', icon: 'heart', attrs: ['recovery', 'stamina'], cost: 1, desc: 'Controle de respiração e descanso ativo. Aumenta Recuperação.' },
];

export function ensureOffers(save, universe, count = 3) {
  if (!save || !universe) return [];
  if (!save.career.offers || save.career.offers.length === 0) {
    save.career.offers = generateOffers(save, universe, count);
  }
  return save.career.offers;
}

export function acceptOffer(save, offer) {
  if (!offer) return { ok: false, message: 'Oferta inválida.' };
  if (save.career.activeOffer) return { ok: false, message: 'Você já tem um contrato assinado. Cumpra ou cancele antes.' };
  offer.accepted = true;
  save.career.activeOffer = offer;
  save.career.nextEvent = {
    name: offer.eventName, date: offer.date, arena: offer.arenaName, city: offer.city, purse: offer.purse,
  };
  save.career.daysUntilFight = Math.max(1, Math.ceil((new Date(offer.date) - new Date(save.career.date)) / 86400000));
  addNews(save, {
    cat: 'upcoming', tag: 'CONTRATO',
    title: `${save.profile.name} aceita desafio contra ${offer.opponent.name}`,
    subtitle: `${offer.eventName} · ${offer.arenaName}, ${offer.city} · Bolsa de C$ ${offer.purse.toLocaleString('pt-BR')}.`,
    body: `${save.profile.name} assinou o contrato para enfrentar ${offer.opponent.name} (${offer.opponent.record.w}-${offer.opponent.record.l}-${offer.opponent.record.d}) em ${formatDate(offer.date)}. O confronto será realizado na ${offer.arenaName}, em ${offer.city}. A bolsa acertada é de C$ ${offer.purse.toLocaleString('pt-BR')}, com ${offer.coinReward} TG COIN de bônus.`,
    division: save.profile.division,
    hero: { name: save.profile.name, nick: save.profile.nickname, nationality: save.profile.nationality },
    imageSeed: 7, featured: true,
  });
  return { ok: true };
}

export function cancelOffer(save) {
  if (!save.career.activeOffer) return;
  const offer = save.career.activeOffer;
  offer.accepted = false;
  save.career.activeOffer = null;
  save.career.nextEvent = null;
  save.career.daysUntilFight = null;
  addNews(save, {
    cat: 'transfers', tag: 'CONTRATO',
    title: `${save.profile.name} cancela luta contra ${offer.opponent.name}`,
    subtitle: 'A promoter busca um novo adversário para a data.',
    body: `A equipe de ${save.profile.name} informou que a luta contra ${offer.opponent.name} foi cancelada por motivos contratuais. A comissão deve anunciar um substituto em breve.`,
    division: save.profile.division, hero: { name: save.profile.name, nick: save.profile.nickname },
    imageSeed: 9,
  });
}

export function declineOffer(save, universe, offerId) {
  save.career.offers = (save.career.offers || []).filter((o) => o.id !== offerId);
  if (universe && save.career.offers.length < 3) {
    const extra = generateOffers(save, universe, 3 - save.career.offers.length);
    const known = new Set(save.career.offers.map((o) => o.opponentId));
    save.career.offers.push(...extra.filter((o) => !known.has(o.opponentId)).slice(0, 3 - save.career.offers.length));
  }
}

export function restDays(save, universe, days = 7) {
  advanceDate(save, days);
  save.career.training.sessionsLeft = 4;
  save.career.training.fatigue = Math.max(0, (save.career.training.fatigue || 0) - 55);
  save.career.date = save.career.date;
  simulateBackground(universe, save, 2);
  return save.career.training;
}

export function trainDrill(save, universe, drillId, timing = 0.72) {
  const drill = DRILLS.find((d) => d.id === drillId);
  if (!drill) return { ok: false, message: 'Treino inválido.' };
  if (save.career.training.sessionsLeft <= 0) return { ok: false, message: 'Sem sessões hoje. Descanse para recuperar a energia.' };
  const fatigue = save.career.training.fatigue || 0;
  const readiness = clamp(1 - fatigue / 180, 0.55, 1.05);
  const quality = clamp(0.72 + timing * 0.72, 0.72, 1.42);
  const gains = {};
  const boosterEntry = Object.entries(save.career.boosters || {}).find(([, count]) => count > 0);
  const boosterActive = !!boosterEntry;
  for (const attr of drill.attrs) {
    const gear = gearBoost(save, attr);
    const booster = boosterActive ? 1.08 : 1;
    const raw = (1.15 + Math.random() * 1.55) * readiness * quality * (1 + gear) * booster;
    const gain = Math.max(1, Math.round(raw));
    const old = save.profile.attributes[attr] || 42;
    save.profile.attributes[attr] = Math.min(99, old + gain);
    gains[attr] = save.profile.attributes[attr] - old;
  }
  if (boosterEntry) {
    save.career.boosters[boosterEntry[0]] = Math.max(0, boosterEntry[1] - 1);
  }
  save.career.training.sessionsLeft--;
  save.career.training.totalSessions++;
  save.career.training.fatigue = clamp(fatigue + 13, 0, 100);
  save.career.training.lastDrill = drillId;
  save.career.points += 1;
  advanceDate(save, 1);
  if (Math.random() < 0.3) simulateBackground(universe, save, 1);
  return { ok: true, gains, drill, fatigue: save.career.training.fatigue };
}

function updateRankHistory(save, rank) {
  const last = save.career.rankHistory[save.career.rankHistory.length - 1];
  if (!last || last.rank !== rank) {
    save.career.rankHistory.push({ date: save.career.date, rank, points: save.career.points });
    if (save.career.rankHistory.length > 120) save.career.rankHistory.shift();
  }
}

function checkAchievements(save, universe, context) {
  const c = save.career;
  const rank = playerRank(universe, save.profile.division, c.points);
  updateRankHistory(save, rank);
  if (c.record.w >= 1) unlockAchievement(save, 'first_win');
  if (c.record.ko >= 1) unlockAchievement(save, 'first_ko');
  if (c.streak >= 5) unlockAchievement(save, 'streak5');
  if (c.belts.length >= 1) unlockAchievement(save, 'title');
  if (c.belts.some((b) => ['world', 'undisputed', 'supreme'].includes(b.tier))) unlockAchievement(save, 'world');
  if (rank === 1) unlockAchievement(save, 'top1');
  if (c.record.ko >= 10) unlockAchievement(save, 'ko10');
  if (c.belts.some((b) => (b.defenses || 0) >= 3)) unlockAchievement(save, 'defend3');
  if (c.money >= 25000) unlockAchievement(save, 'rich');
  if (new Set(c.foughtArenas).size >= 5) unlockAchievement(save, 'traveler');
  if (c.belts.filter((b) => ['world', 'undisputed', 'supreme'].includes(b.tier)).length >= 3) unlockAchievement(save, 'undisputed');
  if (c.reputation >= 100) unlockAchievement(save, 'legend');
  return rank;
}

function beltPrestige(tier) {
  return BELT_TIERS.find((t) => t.id === tier)?.prestige || 1;
}

export function applyFightResult({ save, universe, result, offer, division, arenaId }) {
  if (!save || !result) return { ok: false, message: 'Resultado inválido.' };
  const matchId = result.matchId || ('m' + Date.now().toString(36));
  if (!save.career.appliedMatches) save.career.appliedMatches = [];
  if (save.career.appliedMatches.includes(matchId)) {
    return { ok: false, message: 'Este resultado já foi registrado.' };
  }
  const c = save.career;
  const op = offer?.opponent || {};
  const won = result.winnerId === 'p1';
  const draw = !result.winnerId;
  const method = result.method || 'DEC';
  const ko = won && (method === 'KO' || method === 'TKO');
  const div = division || save.profile.division;
  const divInfo = DIVISION_BY_ID[div] || DIVISION_BY_ID.middle;

  // Record
  c.record.w += won ? 1 : 0;
  c.record.l += (!won && !draw) ? 1 : 0;
  c.record.d += draw ? 1 : 0;
  c.record.ko += ko ? 1 : 0;
  c.streak = won ? Math.max(1, c.streak + 1) : draw ? 0 : Math.min(-1, c.streak - 1);
  c.bestStreak = Math.max(c.bestStreak, c.streak);
  c.totalPurse += offer?.purse || 0;
  c.season.fights++;
  c.season.wins += won ? 1 : 0;
  c.season.kos += ko ? 1 : 0;
  if (new Date(c.date).getFullYear() !== c.season.year) {
    c.season = { year: new Date(c.date).getFullYear(), fights: 0, wins: 0, kos: 0, defenses: 0, bestWin: null };
  }
  const repDelta = won ? 6 : draw ? 1 : -4;
  c.reputation = clamp(c.reputation + repDelta, 0, 100);
  const basePoints = won ? (ko ? 190 : 145) : draw ? 35 : -25;
  const hypeBonus = Math.round((offer?.hype || 40) * 0.55);
  const titleBonus = offer?.title ? 80 : 0;
  const oldPoints = c.points;
  c.points = Math.max(0, c.points + basePoints + (won ? hypeBonus + titleBonus : 0));

  // Purse and TG COIN
  const purseRate = won ? 1 : draw ? 0.72 : 0.58;
  const purse = Math.round((offer?.purse || 2000) * purseRate);
  const sponsor = c.sponsor ? SHOP_ITEMS.find((i) => i.id === c.sponsor) : null;
  const sponsorMoney = won && sponsor ? (c.sponsor === 'sponsor_global' ? 900 : 200) : 0;
  const sponsorCoins = won && sponsor ? (c.sponsor === 'sponsor_global' ? 20 : 0) : 0;
  const coinRate = won ? 1 : draw ? 0.4 : 0.22;
  const coins = Math.round((offer?.coinReward || 50) * coinRate) + sponsorCoins;
  addMoney(save, purse + sponsorMoney);
  addCoins(save, coins, 'Bolsa de luta');

  // Titles
  let titleWon = null;
  let titleLost = null;
  if (offer?.title && won) {
    const existing = c.belts.find((b) => b.org === offer.title.org && b.division === div);
    if (existing) {
      existing.defenses = (existing.defenses || 0) + 1;
      existing.lastDefendedAt = new Date().toISOString();
      if (beltPrestige(offer.title.tier) >= beltPrestige(existing.tier)) existing.tier = offer.title.tier;
      existing.level = offer.title.tier;
      c.season.defenses++;
      titleWon = { ...existing, defense: true };
    } else {
      const belt = {
        org: offer.title.org, tier: offer.title.tier, division: div,
        defenses: 0, wonAt: new Date().toISOString(), opponent: op.name || 'Desafiante',
        name: offer.title.name,
      };
      c.belts.push(belt);
      c.beltHistory.push({ ...belt, event: 'won' });
      titleWon = belt;
    }
    c.trophies.push({ id: 'trophy-' + Date.now().toString(36), name: offer.title.name, org: offer.title.org, date: new Date().toISOString(), division: div });
  }
  if (offer?.title && !won) {
    const idx = c.belts.findIndex((b) => b.org === offer.title.org && b.division === div);
    if (idx >= 0) {
      titleLost = c.belts.splice(idx, 1)[0];
      c.beltHistory.push({ ...titleLost, event: 'lost', date: new Date().toISOString(), opponent: op.name });
    }
  }

  // Opponent + universe movement
  const npc = universe?.fighters.find((f) => f.id === op.id);
  if (npc) {
    if (won) {
      npc.record.l++;
      npc.points = Math.max(10, npc.points - 48);
      npc.streak = Math.min(-1, npc.streak - 1);
      npc.form = ['D', ...(npc.form || [])].slice(0, 5);
    } else if (!draw) {
      npc.record.w++;
      if (ko) npc.record.ko++;
      npc.points += 52;
      npc.streak = Math.max(1, npc.streak + 1);
      npc.form = ['V', ...(npc.form || [])].slice(0, 5);
    }
    if (offer?.title && !won && ['world', 'undisputed', 'supreme'].includes(offer.title.tier) && universe.champions?.[div]) {
      universe.champions[div][offer.title.org] = npc.id;
    }
  }

  // History
  const historyEntry = {
    id: 'fight-' + Date.now().toString(36),
    matchId,
    date: new Date().toISOString(),
    opponentId: op.id || null,
    opponentName: op.name || 'Desafiante',
    opponentRecord: op.record || null,
    method: draw ? 'DRAW' : method,
    round: result.round || null,
    result: won ? 'V' : draw ? 'E' : 'D',
    purse, coins,
    title: offer?.title || null,
    arena: ARENA_BY_ID[arenaId || offer?.arenaId]?.name || offer?.arenaName || 'Arena',
    division: div,
    scorecards: result.scorecards || [],
    stats: result.stats || null,
    pointsBefore: oldPoints,
    pointsAfter: c.points,
  };
  c.history.unshift(historyEntry);
  if (c.history.length > 100) c.history.length = 100;
  if (!c.foughtArenas.includes(arenaId || offer?.arenaId)) c.foughtArenas.push(arenaId || offer?.arenaId);
  if (won) c.season.bestWin = op.name || c.season.bestWin;

  // News
  const heroPseudo = {
    id: 'player', name: save.profile.name, nick: save.profile.nickname, nationality: save.profile.nationality,
    record: { ...c.record }, age: save.profile.age, style: save.profile.style,
    personality: STYLE_BY_ID[save.profile.style]?.name || 'Determinado',
    belts: c.belts,
  };
  const resultArticle = makeResultArticle(
    universe,
    { winner: won ? heroPseudo : npc, loser: won ? npc : heroPseudo, method, round: result.round },
    div, true, !!offer?.title,
  );
  if (resultArticle) addNews(save, resultArticle);
  if (titleWon) {
    const art = makeTitleArticle(universe, heroPseudo, npc || { name: op.name || 'Desafiante', nationality: op.nationality }, div, offer.title.org, offer.title.tier, save);
    addNews(save, art);
  }
  if (titleLost) {
    addNews(save, {
      cat: 'title', tag: 'TÍTULO',
      title: `${save.profile.name} perde o ${BELT_TIERS.find((t) => t.id === titleLost.tier)?.name || 'cinturão'} para ${op.name || 'o desafiante'}`,
      subtitle: 'Uma noite amarga para o até então campeão.',
      body: `O reinado de ${save.profile.name} chegou ao fim. ${op.name || 'O desafiante'} venceu por ${method} e levou o cinturão dos ${divInfo.name.toLowerCase()}s. A revanche já é especulada nos bastidores.`,
      division: div, hero: { name: save.profile.name, nick: save.profile.nickname }, imageSeed: 3, featured: true,
    });
  }

  // Calendar and world
  const offerDate = offer?.date ? new Date(offer.date).getTime() : Date.now();
  const nextDate = new Date(Math.max(Date.now(), offerDate + 86400000));
  c.date = nextDate.toISOString();
  c.activeOffer = null;
  c.nextEvent = null;
  c.daysUntilFight = null;
  c.offers = generateOffers(save, universe, 3);
  simulateBackground(universe, save, 2);
  const rank = checkAchievements(save, universe, { won, titleWon });
  c.appliedMatches.push(matchId);
  if (c.appliedMatches.length > 60) c.appliedMatches.shift();

  return {
    ok: true, won, draw, method, ko, purse, sponsorMoney, coins, repDelta,
    pointsDelta: c.points - oldPoints, rank, titleWon, titleLost,
    historyEntry, resultArticle,
    record: { ...c.record }, reputation: c.reputation, money: c.money, tgCoins: c.coins,
  };
}

export function awards(save, universe) {
  if (!universe) return [];
  return computeAwards(save, universe);
}

export function divisionChampions(universe, divisionId) {
  return ORGS.map((org) => ({ org, fighter: championOf(universe, divisionId, org.id) }));
}

export function playerRankNow(save, universe) {
  return playerRank(universe, save.profile.division, save.career.points);
}

export function divisionTop(universe, divisionId, save = null) {
  const player = save ? createPlayerFighter(save) : null;
  return rankingsFor(universe, divisionId, player);
}

export function trainingBoostersAvailable(save) {
  const out = [];
  for (const item of SHOP_ITEMS.filter((i) => i.type === 'training')) {
    const count = save.career.boosters?.[item.id] || 0;
    if (count) out.push({ item, count });
  }
  return out;
}

export function playerOverall(save) {
  return overallOf(save.profile.attributes);
}
