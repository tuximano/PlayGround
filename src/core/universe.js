// The living boxing universe: 1,100 NPC fighters, rankings, belts, events, news and awards.
import {
  DIVISIONS, DIVISION_BY_ID, ORGS, BELT_TIERS, STYLES, STYLE_BY_ID, FIRST_NAMES, LAST_NAMES, NICKNAMES,
  COUNTRIES, ARENAS, EVENT_NAMES, EVENT_PREFIX, QUOTES, SHOP_ITEMS, formatDate, COACH_LINES, AWARD_TYPES,
} from './data.js';
import { seeded, clamp } from './rng.js';
import { addNews, overallOf, reachCm, heightMeters, createPlayerFighter, fighterLabel, advanceDate } from './store.js';

const ATTRIBUTE_KEYS = ['strength', 'speed', 'stamina', 'precision', 'defense', 'reflexes', 'mobility', 'recovery', 'conditioning'];
const PERSONALITIES = ['Frio', 'Explosivo', 'Confiante', 'Humilde', 'Provocador', 'Calculista', 'Showman', 'Guerreiro', 'Místico', 'Implacável'];

export function createUniverse(seed = Math.floor(Math.random() * 1e9)) {
  const rnd = seeded('universe-' + seed);
  const universe = {
    seed,
    createdAt: new Date().toISOString(),
    fighters: [],
    divisions: {},
    champions: {},
    beltHistory: [],
    lastSim: null,
    season: new Date().getFullYear(),
    awards: [],
  };
  for (const div of DIVISIONS) {
    const list = [];
    for (let i = 0; i < 100; i++) {
      const f = generateFighter(rnd, div, i, universe, seed);
      list.push(f);
      universe.fighters.push(f);
    }
    universe.divisions[div.id] = { fighterIds: list.map((f) => f.id) };
    universe.champions[div.id] = {};
    for (let o = 0; o < ORGS.length; o++) {
      const champ = list[o];
      universe.champions[div.id][ORGS[o].id] = champ.id;
      champ.belts = [{ org: ORGS[o].id, type: 'world', division: div.id, defenses: rnd.int(0, 6), wonAt: randomPastDate(rnd, 400) }];
      champ.points += 400 - o * 60;
    }
    // Continental / international trinkets for ranked contenders.
    for (let i = 3; i < 9; i++) {
      list[i].belts = [{ org: ORGS[i % 3].id, type: i < 5 ? 'continental' : 'international', division: div.id, defenses: rnd.int(0, 3), wonAt: randomPastDate(rnd, 300) }];
    }
    list.sort((a, b) => b.points - a.points);
  }
  universe.fighters.sort((a, b) => b.points - a.points);
  universe.lastSim = new Date().toISOString();
  return universe;
}

function randomPastDate(rnd, days) {
  const d = new Date();
  d.setDate(d.getDate() - rnd.int(20, days));
  return d.toISOString();
}

function generateFighter(rnd, div, index, universe, seed) {
  const first = FIRST_NAMES[rnd.int(0, FIRST_NAMES.length - 1)];
  const last = LAST_NAMES[rnd.int(0, LAST_NAMES.length - 1)];
  let nick = NICKNAMES[rnd.int(0, NICKNAMES.length - 1)];
  if (rnd.chance(0.18)) nick = NICKNAMES[rnd.int(0, NICKNAMES.length - 1)];
  const style = rnd.pick(STYLES).id;
  const tier = index < 3 ? 3 : index < 12 ? 2 : index < 45 ? 1 : 0;
  const base = tier === 3 ? rnd.int(78, 94) : tier === 2 ? rnd.int(68, 88) : tier === 1 ? rnd.int(55, 80) : rnd.int(42, 68);
  const attrs = {};
  for (const key of ATTRIBUTE_KEYS) attrs[key] = clamp(base + rnd.int(-12, 12) + (index < 10 ? 5 : 0), 30, 97);
  const mods = STYLE_BY_ID[style].modifiers;
  attrs.strength = clamp(Math.round(attrs.strength * (mods.power || 1)), 28, 97);
  attrs.speed = clamp(Math.round(attrs.speed * (mods.speed || 1)), 28, 97);
  attrs.defense = clamp(Math.round(attrs.defense * (mods.defense || 1)), 28, 97);
  const wins = tier === 3 ? rnd.int(24, 46) : tier === 2 ? rnd.int(16, 34) : tier === 1 ? rnd.int(7, 24) : rnd.int(1, 14);
  const losses = tier === 3 ? rnd.int(0, 5) : tier === 2 ? rnd.int(1, 9) : tier === 1 ? rnd.int(2, 12) : rnd.int(0, 9);
  const draws = rnd.chance(0.18) ? rnd.int(1, 2) : 0;
  const koRate = tier === 3 ? rnd.range(0.35, 0.78) : rnd.range(0.15, 0.7);
  const reputationBase = 2 + tier * 16 + rnd.int(0, 22);
  const points = Math.round(
    (tier === 3 ? 1750 : tier === 2 ? 950 : tier === 1 ? 420 : 90) +
    rnd.range(-120, 220) + wins * 8 - losses * 3
  );
  const age = tier === 3 ? rnd.int(26, 36) : rnd.int(18, 37);
  const heightT = clamp(0.25 + rnd.range(0, 0.8) + (div.id === 'heavy' ? 0.12 : 0), 0, 1);
  return {
    id: `${div.id}-${String(index).padStart(3, '0')}-${seed % 997}`,
    name: `${first} ${last}`,
    first, last, nick,
    nationality: COUNTRIES[rnd.int(0, COUNTRIES.length - 1)].code,
    age, division: div.id, style,
    personality: rnd.pick(PERSONALITIES),
    attributes: attrs,
    overall: overallOf(attrs),
    height: Math.round(162 + heightT * 44),
    reach: Math.round(165 + heightT * 42 + rnd.int(-4, 8)),
    record: { w: wins, l: losses, d: draws, ko: Math.round(wins * koRate) },
    points,
    streak: tier === 3 ? rnd.int(1, 12) : rnd.int(-3, 6),
    bestStreak: rnd.int(4, 18),
    belts: [],
    rankSeed: index,
    reputation: reputationBase,
    form: rnd.shuffle(['V', 'V', 'V', 'D', 'V', 'E']).slice(0, 5),
    retired: false,
    koRate,
    story: '',
  };
}

export function divisionFighters(universe, divisionId) {
  return universe.fighters.filter((f) => f.division === divisionId && !f.retired);
}

export function rankingsFor(universe, divisionId, player = null, org = null) {
  let list = divisionFighters(universe, divisionId).sort((a, b) => b.points - a.points);
  if (org) {
    const champId = universe.champions?.[divisionId]?.[org];
    const champ = list.find((f) => f.id === champId);
    list = list.filter((f) => f.id !== champId);
    if (champ) list.unshift(champ);
  }
  if (player && player.division === divisionId) {
    const p = { ...player, isPlayer: true, points: player.points || 12 };
    list.push(p);
    list = list.sort((a, b) => b.points - a.points);
  }
  return list.slice(0, 100);
}

export function playerRank(universe, divisionId, playerPoints) {
  if (!universe) return 100;
  const list = divisionFighters(universe, divisionId).sort((a, b) => b.points - a.points);
  const idx = list.findIndex((f) => f.points < playerPoints);
  return idx === -1 ? 100 : idx + 1;
}

export function championOf(universe, divisionId, orgId) {
  const id = universe.champions?.[divisionId]?.[orgId];
  return universe.fighters.find((f) => f.id === id) || null;
}

export function beltsForPlayer(save) {
  return (save?.career?.belts || []).filter((b) => b.division === save.profile.division);
}

export function worldBeltsForPlayer(save) {
  return beltsForPlayer(save).filter((b) => ['world', 'undisputed', 'supreme'].includes(b.tier));
}

// ---------------------------------------------------------------------------
// Offers, matchmaking and purse negotiation
// ---------------------------------------------------------------------------
export function generateOffers(save, universe, count = 3) {
  const player = createPlayerFighter(save);
  const div = save.profile.division;
  const list = rankingsFor(universe, div);
  const currentRank = playerRank(universe, div, player.points);
  const offers = [];
  const used = new Set();
  const rnd = Math.random;
  const playerWorldBelts = worldBeltsForPlayer(save);
  const playerBelts = beltsForPlayer(save);

  // Title unification / super fight logic.
  if (playerWorldBelts.length > 0) {
    const heldOrgs = new Set(playerWorldBelts.map((b) => b.org));
    const challengeOrg = ORGS.find((o) => !heldOrgs.has(o.id));
    if (challengeOrg) {
      const champ = championOf(universe, div, challengeOrg.id);
      if (champ && !used.has(champ.id)) {
        used.add(champ.id);
        const tier = heldOrgs.size >= 2 ? 'supreme' : 'undisputed';
        offers.push(buildOffer(save, universe, champ, {
          title: { org: challengeOrg.id, tier, name: tier === 'supreme' ? 'Campeão dos Campeões' : 'Cinturão Absoluto' },
          purse: 95000 + heldOrgs.size * 40000, coins: 1800, rounds: 6, arenaId: 'champions', hype: 100,
          eventName: 'TG UNIFICATION: ' + challengeOrg.short + ' x TGB', rnd,
        }));
      }
    }
  }

  // World title shot for top contender.
  if (offers.length < 1 && currentRank <= 2) {
    for (const org of ORGS) {
      if (playerWorldBelts.some((b) => b.org === org.id)) continue;
      const champ = championOf(universe, div, org.id);
      if (champ && !used.has(champ.id)) {
        used.add(champ.id);
        offers.push(buildOffer(save, universe, champ, {
          title: { org: org.id, tier: 'world', name: 'Cinturão Mundial ' + org.short },
          purse: 70000, coins: 1200, rounds: 6, arenaId: 'champions', hype: 95,
          eventName: 'TG WORLD CHAMPIONSHIP', rnd,
        }));
        break;
      }
    }
  }

  // Normal opponents around the player's ranking.
  const candidates = list.filter((f) => !f.isPlayer && !used.has(f.id));
  const startIdx = Math.min(candidates.length - 1, Math.max(0, currentRank - 4));
  const pool = candidates.slice(Math.max(0, startIdx - 3), Math.min(candidates.length, startIdx + 16));
  const shuffled = pool.sort(() => rnd() - 0.5);
  for (const opp of shuffled) {
    if (offers.length >= count) break;
    if (used.has(opp.id)) continue;
    used.add(opp.id);
    const rank = list.findIndex((f) => f.id === opp.id) + 1;
    const step = clamp(Math.abs(currentRank - rank), 1, 50);
    const purse = Math.round((1600 + step * 420 + save.career.reputation * 120) / 50) * 50;
    let title = null;
    if (playerBelts.length && rank <= 6 && currentRank <= 8) {
      const org = ORGS[Math.floor(rnd() * ORGS.length)];
      const tier = rank <= 2 ? 'interim' : (currentRank < rank ? 'national' : 'international');
      title = { org: org.id, tier, name: BELT_TIERS.find((t) => t.id === tier)?.name || 'Cinturão' };
    }
    offers.push(buildOffer(save, universe, opp, {
      title, purse: Math.max(1200, purse), coins: Math.round(purse / 45), rounds: purse > 12000 ? 6 : purse > 5000 ? 4 : 3,
      arenaId: pickArenaForRank(currentRank, rnd),
      hype: clamp(30 + (100 - currentRank) * 0.6 + rnd() * 15, 20, 100),
      rnd,
    }));
  }
  // Guarantee three offers with lower-ranked fillers.
  while (offers.length < count) {
    const filler = list.filter((f) => !f.isPlayer && !used.has(f.id)).slice(-1)[0] || list.find((f) => !f.isPlayer);
    if (!filler || used.has(filler.id)) break;
    used.add(filler.id);
    const purse = Math.max(800, Math.round((1200 + save.career.reputation * 100) / 50) * 50);
    offers.push(buildOffer(save, universe, filler, { purse, coins: Math.round(purse / 50), rounds: 3, arenaId: 'neighborhood', hype: 25, rnd }));
  }
  offers.forEach((o, i) => { o.id = 'offer' + Date.now().toString(36) + i; });
  return offers;
}

function pickArenaForRank(rank, rnd) {
  if (rank <= 3) return rnd() > 0.4 ? 'champions' : 'vegas';
  if (rank <= 10) return ['national', 'tokyo', 'vegas', 'london', 'newyork', 'dubai'][Math.floor(rnd() * 6)];
  if (rank <= 30) return ['municipal', 'national', 'manila', 'berlin', 'seoul'][Math.floor(rnd() * 5)];
  if (rank <= 60) return ['neighborhood', 'municipal', 'underground'][Math.floor(rnd() * 3)];
  return ['neighborhood', 'municipal'][Math.floor(rnd() * 2)];
}

function buildOffer(save, universe, opponent, { title = null, purse = 2000, coins = 50, rounds = 3, arenaId = 'neighborhood', hype = 40, eventName = null, rnd = Math.random }) {
  const arena = ARENAS.find((a) => a.id === arenaId) || ARENAS[0];
  const date = new Date(save.career.date);
  date.setDate(date.getDate() + 14 + Math.floor(rnd() * 18));
  const style = STYLE_BY_ID[opponent.style] || STYLES[2];
  return {
    id: 'offer' + Math.random().toString(36).slice(2, 8),
    opponentId: opponent.id,
    opponent: {
      id: opponent.id, name: opponent.name, nick: opponent.nick, nationality: opponent.nationality,
      record: { ...opponent.record }, style: opponent.style, overall: opponent.overall,
      attributes: { ...opponent.attributes }, age: opponent.age, height: opponent.height,
      reach: opponent.reach, points: opponent.points,
    },
    title,
    purse,
    coinReward: Math.max(40, Math.round(purse / 40)),
    rounds,
    arenaId: arena.id,
    arenaName: arena.name,
    city: arena.city,
    date: date.toISOString(),
    eventName: eventName || `${EVENT_PREFIX[Math.floor(rnd() * EVENT_PREFIX.length)]}: ${EVENT_NAMES[Math.floor(rnd() * EVENT_NAMES.length)]}`,
    hype: Math.round(hype),
    difficulty: purse > 30000 ? 'elite' : purse > 10000 ? 'pro' : 'pro',
    styleName: style.name,
    accepted: false,
    negotiated: false,
    purseBoost: 0,
    callout: QUOTES.callout[Math.floor(rnd() * QUOTES.callout.length)],
  };
}

export function negotiateOffer(offer) {
  if (offer.negotiated) return { ok: false, message: 'A melhor oferta já foi feita.' };
  offer.negotiated = true;
  const boost = 0.12 + Math.random() * 0.15;
  offer.purseBoost = Math.round(offer.purse * boost);
  offer.purse += offer.purseBoost;
  offer.coinReward += Math.round(offer.coinReward * boost);
  return { ok: true, amount: offer.purseBoost, message: `Bônus de negociação: +${offer.purseBoost} moedas e +${Math.round(offer.coinReward * boost)} TG.` };
}

// ---------------------------------------------------------------------------
// Simulation of results, rankings and news
// ---------------------------------------------------------------------------
export function simulateFight(a, b, rnd = Math.random) {
  const ratingA = a.overall + (a.isPlayer ? 0 : 0);
  const ratingB = b.overall;
  const chanceA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 32));
  const winnerA = rnd() < chanceA;
  const winner = winnerA ? a : b;
  const loser = winnerA ? b : a;
  const koChance = clamp(0.18 + Math.abs(ratingA - ratingB) / 140 + (winner.koRate || 0.3) * 0.35, 0.12, 0.72);
  const method = rnd() < koChance ? 'KO' : rnd() < 0.08 ? 'TKO' : rnd() < 0.07 ? 'DRAW' : 'DEC';
  if (method === 'DRAW') return { winner: null, loser: null, method: 'DRAW', round: null };
  const round = method === 'DEC' ? null : 1 + Math.floor(rnd() * 8);
  return { winner, loser, method, round, winnerA };
}

export function simulateBackground(universe, save, count = 2) {
  if (!universe) return [];
  const news = [];
  const rnd = Math.random;
  for (let i = 0; i < count; i++) {
    const div = DIVISIONS[Math.floor(rnd() * DIVISIONS.length)];
    const pool = divisionFighters(universe, div.id).slice(0, 40);
    if (pool.length < 4) continue;
    const a = pool[Math.floor(rnd() * pool.length)];
    let b = pool[Math.floor(rnd() * pool.length)];
    let guard = 0;
    while (b.id === a.id && guard++ < 10) b = pool[Math.floor(rnd() * pool.length)];
    if (a.id === b.id) continue;
    const res = simulateFight(a, b, rnd);
    if (!res.winner) continue;
    applyUniverseResult(universe, res, { title: false });
    if (rnd() < 0.55) {
      const art = makeResultArticle(universe, res, div.id, false, false);
      if (art) { save && addNews(save, art); news.push(art); }
    }
    if (rnd() < 0.35 && save) {
      const art = makeRumorArticle(universe, save, div.id);
      if (art) { addNews(save, art); news.push(art); }
    }
  }
  universe.lastSim = new Date().toISOString();
  return news;
}

export function applyUniverseResult(universe, result, { title = false, divisionId = null } = {}) {
  const { winner, loser, method } = result;
  if (!winner || !loser) return;
  winner.record.w++;
  loser.record.l++;
  if (method === 'KO' || method === 'TKO') winner.record.ko++;
  winner.streak = Math.max(1, winner.streak + 1);
  loser.streak = Math.min(-1, loser.streak - 1);
  if (winner.streak > winner.bestStreak) winner.bestStreak = winner.streak;
  winner.form = [method === 'DEC' ? 'V' : 'V', ...winner.form].slice(0, 5);
  loser.form = ['D', ...loser.form].slice(0, 5);
  const weight = clamp(1 + (100 - (loser.rankSeed || 50)) / 90, 0.4, 2.2);
  const gain = Math.round((method === 'DEC' ? 45 : 70) * weight);
  winner.points += gain;
  loser.points = Math.max(10, loser.points - Math.round(gain * 0.6));
  winner.reputation = clamp(winner.reputation + 2, 0, 100);
  loser.reputation = clamp(loser.reputation - 1, 0, 100);
  if (title) {
    winner.belts = winner.belts || [];
    winner.belts.push({ org: result.org, type: result.tier || 'world', division: divisionId, wonAt: new Date().toISOString(), defenses: 0 });
  }
}

export function makeResultArticle(universe, result, divisionId, isPlayer = false, title = false) {
  if (!result?.winner) return null;
  const div = DIVISION_BY_ID[divisionId] || DIVISIONS[6];
  const w = result.winner;
  const l = result.loser;
  const method = result.method === 'DEC' ? 'decisão unânime' : result.method === 'KO' ? `nocaute no round ${result.round}` : `nocaute técnico no round ${result.round}`;
  const headlines = [
    `${w.name} vence ${l.name} e sobe no ranking dos ${div.name.toLowerCase()}s`,
    `Noite de ${w.nick || 'glória'}: ${w.name} domina e vence por ${method}`,
    `${w.name} confirma favoritismo e bate ${l.name}`,
    `Impacto: ${w.name} nocauteia ${l.name} e pede title shot`,
    `${w.name} mostra por que é um nome a se temer na divisão`,
  ];
  const headline = isPlayer
    ? `${w.name} brilha e vence ${l.name} por ${method}`
    : headlines[Math.floor(Math.random() * headlines.length)];
  return {
    cat: title ? 'title' : 'results',
    title: headline,
    subtitle: `${w.name} (${w.record.w}-${w.record.l}-${w.record.d}) derrota ${l.name} (${l.record.w}-${l.record.l}-${l.record.d}) em ${method}.`,
    body: `A divisão dos ${div.name.toLowerCase()}s ganhou mais um capítulo nesta noite. ${w.name}, ${w.age} anos, ${w.personality.toLowerCase()}, impôs seu ritmo desde o primeiro round. ${w.nick ? `Conhecido como "${w.nick}", ` : ''}o lutador usou ${STYLE_BY_ID[w.style]?.name.toLowerCase()} para neutralizar ${l.name}.\n\nCom o resultado, ${w.name} chega a ${w.record.w} vitórias e ${w.record.ko} nocautes. ${result.method === 'DEC' ? 'Os juízes não tiveram dúvidas.' : 'O árbitro não teve alternativa senão interromper a luta.'} O próximo passo pode ser uma disputa de cinturão.`,
    tag: title ? 'TÍTULO' : 'RESULTADO',
    division: divisionId,
    fighterIds: [w.id, l.id],
    hero: { name: w.name, nick: w.nick, nationality: w.nationality, color: div.color },
    imageSeed: Math.floor(Math.random() * 1000),
    featured: title,
  };
}

export function makeTitleArticle(universe, winner, loser, divisionId, orgId, tier, save) {
  const div = DIVISION_BY_ID[divisionId];
  const org = ORGS.find((o) => o.id === orgId) || ORGS[0];
  const tierName = BELT_TIERS.find((t) => t.id === tier)?.name || 'Cinturão Mundial';
  const title = `${winner.name} conquista o ${tierName} ${org.short} dos ${div.name.toLowerCase()}s`;
  return {
    cat: 'title',
    title,
    subtitle: winner.id === 'player'
      ? `${save.profile.name} vence ${loser.name} e escreve seu nome na história.`
      : `${winner.name} supera ${loser.name} e é o novo campeão ${org.short}.`,
    body: `O ${tierName} ${org.short} tem um novo dono. ${winner.name} venceu ${loser.name} em uma luta que parou a arena e agora carrega o cinturão dos ${div.name.toLowerCase()}s.\n\n${QUOTES.win[Math.floor(Math.random() * QUOTES.win.length)]}\n\nA organização já prepara a primeira defesa obrigatória. O ranking da divisão será atualizado nesta semana.`,
    tag: 'CAMPEONATO',
    division: divisionId,
    fighterIds: [winner.id, loser.id],
    hero: { name: winner.name, nick: winner.nick, nationality: winner.nationality, color: org.color },
    imageSeed: Math.floor(Math.random() * 1000),
    featured: true,
  };
}

export function makeRumorArticle(universe, save, divisionId) {
  const div = DIVISION_BY_ID[divisionId] || DIVISIONS[Math.floor(Math.random() * DIVISIONS.length)];
  const list = divisionFighters(universe, div.id);
  if (!list.length) return null;
  const a = list[Math.floor(Math.random() * Math.min(30, list.length))];
  const b = list[Math.floor(Math.random() * Math.min(50, list.length))];
  const templates = [
    {
      cat: 'rivalries', tag: 'RIVALIDADE',
      title: `Clima tenso: ${a.name} provoca ${b.name} antes de possível confronto`,
      subtitle: `"${QUOTES.callout[Math.floor(Math.random() * QUOTES.callout.length)]}"`,
      body: `Fontes próximas à organização afirmam que a rivalidade entre ${a.name} e ${b.name} pode render uma luta explosiva. Os dois já se provocaram em entrevistas e a federação estuda uma eliminatória.`,
    },
    {
      cat: 'transfers', tag: 'CONTRATO',
      title: `${a.name} assina novo contrato e promete título`,
      subtitle: 'Acordo inclui bônus por nocaute e uma futura disputa de cinturão.',
      body: `${a.name} renovou com sua promotora por mais três lutas. O lutador, de ${a.age} anos, disse que recusou propostas para permanecer na divisão dos ${div.name.toLowerCase()}s e buscar o título ${ORGS[Math.floor(Math.random() * 3)].short}.`,
    },
    {
      cat: 'rankings', tag: 'RANKING',
      title: `Movimentação no ranking: ${a.name} entra no TOP 10`,
      subtitle: 'Sequência de vitórias coloca o lutador na disputa por uma chance pelo título.',
      body: `A atualização semanal do ranking dos ${div.name.toLowerCase()}s trouxe mudanças importantes. ${a.name} subiu posições após sua última vitória e agora aparece entre os dez melhores. ${b.name}, por outro lado, caiu após resultado negativo.`,
    },
    {
      cat: 'records', tag: 'RECORDE',
      title: `${a.name} alcança ${a.record.w} vitórias e entra para a história da divisão`,
      subtitle: 'Lutador segue em busca de uma oportunidade pelo cinturão mundial.',
      body: `Com a carreira consolidada, ${a.name} alcançou ${a.record.w} vitórias, sendo ${a.record.ko} por nocaute. O cartel impressiona e coloca o nome do atleta entre os mais respeitados dos ${div.name.toLowerCase()}s.`,
    },
    {
      cat: 'interviews', tag: 'ENTREVISTA',
      title: `"${a.nick || 'O campeão'}": ${a.name} abre o jogo sobre o próximo passo`,
      subtitle: 'Lutador fala de treinos, rivalidade e o sonho do cinturão.',
      body: `${a.name} concedeu entrevista coletiva e não fugiu de perguntas. "${QUOTES.respectful[Math.floor(Math.random() * QUOTES.respectful.length)]}", declarou. O treinador completou: "${QUOTES.coach[Math.floor(Math.random() * QUOTES.coach.length)]}".`,
    },
  ];
  const t = templates[Math.floor(Math.random() * templates.length)];
  return {
    ...t,
    division: div.id,
    fighterIds: [a.id, b.id],
    hero: { name: a.name, nick: a.nick, nationality: a.nationality, color: div.color },
    imageSeed: Math.floor(Math.random() * 1000),
  };
}

export function seedNews(save, universe, count = 14) {
  const rnd = Math.random;
  const divisions = DIVISIONS.slice();
  for (let i = 0; i < count; i++) {
    const div = divisions[Math.floor(rnd() * divisions.length)];
    const champs = ORGS.map((o) => championOf(universe, div.id, o.id)).filter(Boolean);
    const champ = champs[Math.floor(rnd() * champs.length)];
    if (champ && i < 5) {
      addNews(save, {
        cat: 'title', tag: 'CAMPEÃO',
        title: `${champ.name} segue no topo dos ${div.name.toLowerCase()}s`,
        subtitle: `Campeão ${ORGS.find((o) => o.id === champ.belts?.[0]?.org)?.short || 'TGB'} defende invicto há ${champ.belts?.[0]?.defenses ?? 2} lutas.`,
        body: `${champ.name}, ${champ.age} anos, é o atual campeão dos ${div.name.toLowerCase()}s. Com cartel de ${champ.record.w}-${champ.record.l}-${champ.record.d} e ${champ.record.ko} nocautes, ele é considerado um dos lutadores mais perigosos do circuito. Seu estilo ${STYLE_BY_ID[champ.style]?.name.toLowerCase()} impõe respeito a qualquer desafiante.`,
        division: div.id, hero: { name: champ.name, nick: champ.nick, nationality: champ.nationality, color: div.color },
        imageSeed: Math.floor(rnd() * 1000), featured: i === 0,
      });
    } else {
      const art = makeRumorArticle(universe, save, div.id);
      if (art) addNews(save, art);
    }
  }
  addNews(save, {
    cat: 'upcoming', tag: 'PRÓXIMA LUTA',
    title: 'TG BOXING anuncia nova temporada de eventos mundiais',
    subtitle: 'Calendário terá etapas no Brasil, Japão, EUA e Oriente Médio.',
    body: 'A TG BOXING confirmou o calendário internacional da temporada. A promessa é de eventos em 15 arenas, eliminatórias continentais e uma noite final no TG Coliseum of Champions. Fique de olho nas próximas lutas.',
    division: 'middle', hero: { name: 'TG BOXING', nick: 'The Glory of Champions', nationality: 'TGB', color: '#f2c14e' },
    imageSeed: 1, featured: true,
  });
  return save.career.news;
}

// ---------------------------------------------------------------------------
// Record books and awards
// ---------------------------------------------------------------------------
export function recordBooks(universe, save) {
  const list = universe ? universe.fighters.slice() : [];
  const player = save ? createPlayerFighter(save) : null;
  if (player) {
    list.push({
      ...player,
      koRate: player.record.w ? player.record.ko / player.record.w : 0,
      bestStreak: save.career.bestStreak,
      reputation: save.career.reputation,
      belts: save.career.belts,
      form: [],
    });
  }
  const active = list.filter((f) => !f.retired);
  const by = (fn) => active.slice().sort(fn).slice(0, 10);
  return {
    mostWins: by((a, b) => b.record.w - a.record.w),
    mostKos: by((a, b) => b.record.ko - a.record.ko),
    longestStreak: by((a, b) => (b.bestStreak || 0) - (a.bestStreak || 0)),
    mostDefenses: by((a, b) => {
      const da = (a.belts || []).reduce((s, x) => s + (x.defenses || 0), 0);
      const db = (b.belts || []).reduce((s, x) => s + (x.defenses || 0), 0);
      return db - da;
    }),
    mostTitles: by((a, b) => (b.belts || []).length - (a.belts || []).length),
  };
}

export function computeAwards(save, universe) {
  const list = universe ? universe.fighters.filter((f) => !f.retired) : [];
  const player = createPlayerFighter(save);
  const playerScore = player ? player.record.w * 4 + player.record.ko * 3 + save.career.reputation * 2 + save.career.belts.length * 40 : 0;
  const best = list.slice().sort((a, b) => (b.record.w * 4 + b.record.ko * 3 + (b.belts?.length || 0) * 40) - (a.record.w * 4 + a.record.ko * 3 + (a.belts?.length || 0) * 40))[0];
  const bestFighter = playerScore > (best ? best.record.w * 4 + best.record.ko * 3 + (best.belts?.length || 0) * 40 : 0) ? player : best;
  const awards = AWARD_TYPES.map((type) => {
    let winner = bestFighter;
    if (type.id === 'ko') winner = (player && player.record.ko >= (best?.record.ko || 0)) ? player : best;
    if (type.id === 'prospect') winner = (player && save.career.record.w <= 12) ? player : list.filter((f) => f.age <= 24).sort((a, b) => b.record.w - a.record.w)[0];
    if (type.id === 'rivalry') winner = player && save.career.rivalries.length ? player : list[0];
    if (type.id === 'coach') winner = { name: save.profile.name + '\'s corner', nick: 'Treinador do ano', isCoach: true };
    return {
      ...type,
      year: save.career.season.year,
      winner: winner ? { name: winner.name, nick: winner.nick, id: winner.id, isPlayer: winner.isPlayer } : { name: 'TG Boxing', nick: '' },
    };
  });
  return awards;
}

export function venueFor(divisionId, rank, seedDate = Date.now()) {
  const rnd = seeded(String(seedDate) + divisionId + rank);
  if (rank <= 3) return rnd.pick(['champions', 'vegas', 'tokyo', 'dubai']);
  if (rank <= 10) return rnd.pick(['national', 'vegas', 'london', 'newyork', 'seoul']);
  if (rank <= 30) return rnd.pick(['municipal', 'manila', 'berlin', 'mexico']);
  return rnd.pick(['neighborhood', 'municipal', 'underground']);
}

export function upcomingEvent(save) {
  const offer = save?.career?.offers?.[0];
  if (!offer) return null;
  return {
    name: offer.eventName,
    date: offer.date,
    arena: offer.arenaName,
    city: offer.city,
    purse: offer.purse,
  };
}

export function formatOfferDate(offer) {
  return formatDate(offer.date);
}

export function divisionLabel(id) {
  return DIVISION_BY_ID[id]?.name || 'Peso-Médio';
}

export function rankForDisplay(universe, save) {
  const p = createPlayerFighter(save);
  return playerRank(universe, save.profile.division, p.points);
}

export function bestFighterInDivision(universe, id) {
  return divisionFighters(universe, id).sort((a, b) => b.points - a.points)[0] || null;
}
