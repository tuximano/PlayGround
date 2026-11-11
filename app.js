(() => {
  const STORAGE_KEY = 'boxing-legacy-save-v1';
  const MAX_STACK = 100;

  const divisions = [
    { id: 'leve', label: 'Leve', max: 63.5 },
    { id: 'meio-medio', label: 'Meio-médio', max: 66.5 },
    { id: 'medio', label: 'Médio', max: 72.5 },
    { id: 'meio-pesado', label: 'Meio-pesado', max: 79.5 },
    { id: 'pesado', label: 'Pesado', max: 120 }
  ];

  const orgs = [
    { id: 'WBL', name: 'WORLD BOXING LEAGUE', label: 'WBL', champion: 'Dario “Iron” Silva' },
    { id: 'WBC', name: 'WBC CONTENDERS', label: 'WBC', champion: 'Noel “The Wall” Vega' },
    { id: 'WBO', name: 'WBO GLOBAL', label: 'WBO', champion: 'Tomas “Lancer” Duran' }
  ];

  const qualityProfiles = [
    { id: 'low', label: 'Baixo', note: 'Corte de efeitos e detalhes para performance máxima.' },
    { id: 'medium', label: 'Médio', note: 'Perfil equilibrado para Android intermediário.' },
    { id: 'high', label: 'Alto', note: 'Detalhes visuais mais ricos em dispositivos mais fortes.' }
  ];

  const trainingPlans = [
    { id: 'precision', name: 'Jab e precisão', effect: 8, fatigue: 9, desc: 'Pés rápidos e precisão de saída.' },
    { id: 'conditioning', name: 'Cardio pesado', effect: 11, fatigue: 12, desc: 'Resistência e recuperação na ponta do espírito.' },
    { id: 'power', name: 'Potência de soco', effect: 10, fatigue: 10, desc: 'Explosão no golpe e equilíbrio do torso.' },
    { id: 'defense', name: 'Defesa e pivô', effect: 9, fatigue: 8, desc: 'Cutting angles e guarda estável.' }
  ];

  const defaultState = {
    currentPage: 'career',
    selectedOrg: 'WBL',
    selectedDivision: 'Leve',
    player: {
      name: 'Júnior',
      surname: 'Ribeiro',
      country: 'Brasil',
      division: 'Leve',
      style: 'Ortodoxo técnico',
      color: '#d64f3e',
      record: [0, 0, 0],
      cash: 2450,
      condition: 87,
      fatigue: 13,
      streak: 0,
      rank: 38,
      rankPoints: 62,
      popularity: 12,
      day: 1,
      trainingWeek: 1,
      history: []
    },
    settings: {
      quality: 'medium',
      resolution: '80%',
      fps: '60',
      volumeMusic: 45,
      volumeSfx: 75,
      volumeVoice: 80,
      device: 'Helio G85'
    },
    opponent: {
      name: 'Mateo “El Rayo” Cruz',
      record: '8–2–0',
      style: 'Contra-atacador',
      division: 'Leve',
      purse: 1200
    },
    fight: {
      phase: 'idle',
      round: 1,
      totalRounds: 3,
      timer: 180,
      playerHealth: 100,
      opponentHealth: 100,
      playerStamina: 100,
      opponentStamina: 100,
      landed: 0,
      accuracy: 0,
      blocked: 0,
      totalShots: 0,
      playerScore: 0,
      opponentScore: 0,
      playerJudgeScore: 0,
      opponentJudgeScore: 0,
      playerPosition: 38,
      opponentPosition: 62,
      active: false,
      started: false,
      winner: null,
      lastFeedback: 'Calibre a distância. Escolha seu momento.'
    },
    stats: {
      wins: 0,
      losses: 0,
      draws: 0
    }
  };

  const refs = {};
  const keyboard = {};
  const battle = {
    player: { x: 30, y: 0, health: 100, stamina: 100, guard: false, dodge: 0, hitTimer: 0, attackTimer: 0 },
    opponent: { x: 70, y: 0, health: 100, stamina: 100, guard: false, dodge: 0, hitTimer: 0, attackTimer: 0 },
    started: false,
    ended: false,
    lastAiDecision: 0,
    lastTs: 0,
    endFrame: false
  };

  let state = loadState();

  function safeParseLocalStorage() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    } catch (error) {
      return null;
    }
  }

  function deepMerge(base, patch) {
    const result = Array.isArray(base) ? base.slice() : { ...base };
    Object.keys(patch || {}).forEach((key) => {
      const val = patch[key];
      if (val && typeof val === 'object' && !Array.isArray(val) && typeof result[key] === 'object' && result[key] && !Array.isArray(result[key])) {
        result[key] = deepMerge(result[key], val);
      } else {
        result[key] = val;
      }
    });
    return result;
  }

  function loadState() {
    const saved = safeParseLocalStorage();
    return deepMerge(defaultState, saved || {});
  }

  function persistState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      /* no-op */
    }
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function setPage(pageId) {
    state.currentPage = pageId;
    document.querySelectorAll('.page').forEach((page) => {
      page.classList.toggle('active', page.id === `page-${pageId}`);
    });
    document.querySelectorAll('.nav-item').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.page === pageId);
    });

    const labels = {
      career: 'PAINEL DO LUTADOR',
      fight: 'NO RINGUE',
      gym: 'ACADEMIA',
      rankings: 'RANKINGS',
      legacy: 'HALL DA FAMA',
      settings: 'CONFIGURAÇÕES'
    };
    const labelNode = document.getElementById('pageLabel');
    if (labelNode) labelNode.textContent = labels[pageId] || 'CARREIRA';
    persistState();
  }

  function showToast(message) {
    const toast = refs.toast;
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('visible'), 1800);
  }

  function formatCash(number) {
    return `$ ${Math.round(number).toLocaleString('pt-BR')}`;
  }

  function updateProfileSummary() {
    const player = state.player;
    const name = `${player.name || 'Júnior'} ${player.surname || 'Ribeiro'}`.trim();
    const initials = (player.name || 'J').slice(0, 2).toUpperCase() + (player.surname || 'R').slice(0, 1).toUpperCase();

    const fields = [
      ['welcomeName', (player.name || 'JÚNIOR').toUpperCase()],
      ['sideName', name || 'J. Ribeiro'],
      ['sideDivision', player.division || 'Leve'],
      ['hudPlayer', `${player.name || 'J'} ${player.surname || 'RIBEIRO'}`.toUpperCase()],
      ['avatarMini', initials],
      ['cashTop', formatCash(player.cash || 0)],
      ['cashValue', formatCash(player.cash || 0)],
      ['fightPurse', `BOLSA ${formatCash(state.opponent.purse || 1200)}`],
      ['heroOpponent', state.opponent.name || 'Mateo “El Rayo” Cruz'],
      ['heroMeta', `${state.fight.totalRounds * 3} ROUNDS • PESO ${(state.player.division || 'Leve').toUpperCase()} • SÃO PAULO, BR`],
      ['oppName', state.opponent.name || 'Mateo “El Rayo” Cruz'],
      ['oppRecord', `${state.opponent.record || '8–2–0'} · ${state.opponent.style || 'Contra-atacador'}`],
      ['scheduleTitle', 'Noite de novos talentos'],
      ['recordValue', `${state.player.record[0] || 0} – ${state.player.record[1] || 0} – ${state.player.record[2] || 0}`],
      ['rankValue', String(player.rank || 38)],
      ['conditionValue', `${player.condition || 87}%`],
      ['gymCondition', `${player.condition || 87}%`],
      ['streakValue', `${Math.max(0, player.streak || 0)} vitórias`],
      ['trainingStatus', player.fatigue > 70 ? 'Recuperação necessária' : 'Disponível agora'],
      ['trainingWeek', `SEMANA ${String(player.trainingWeek || 1).padStart(2, '0')}`],
      ['fatigueValue', `${player.fatigue || 13}%`],
      ['rankProgressText', `${Math.max(0, 100 - (player.rankPoints || 62))} pts até o próximo nível`],
      ['legacyRank', player.rank > 0 ? `#${player.rank}` : '—'],
      ['sideDivision', (player.division || 'Leve').toUpperCase()],
      ['profileDivision', player.division || 'Leve']
    ];

    fields.forEach(([id, value]) => {
      const node = document.getElementById(id);
      if (!node) return;
      if (node.tagName === 'INPUT' || node.tagName === 'SELECT') {
        node.value = value || '';
      } else {
        node.textContent = value;
      }
    });

    const rankTrack = refs.rankProgress;
    if (rankTrack) {
      const width = clamp((player.rankPoints || 62), 0, 100);
      rankTrack.style.width = `${width}%`;
    }

    const conditionBar = refs.conditionBar;
    if (conditionBar) conditionBar.style.width = `${player.condition || 87}%`;
    const fatigueBar = refs.fatigueBar;
    if (fatigueBar) fatigueBar.style.width = `${player.fatigue || 13}%`;
    const gymConditionBar = refs.gymConditionBar;
    if (gymConditionBar) gymConditionBar.style.width = `${player.condition || 87}%`;

    const selectedDivision = state.selectedDivision || player.division || 'Leve';
    const divisionSelect = refs.divisionSelect;
    if (divisionSelect) divisionSelect.value = selectedDivision;
    const profileDivision = refs.profileDivision;
    if (profileDivision) profileDivision.value = player.division || 'Leve';

    const nameField = refs.nameInput;
    if (nameField) nameField.value = player.name || 'Júnior';
    const surnameField = refs.surnameInput;
    if (surnameField) surnameField.value = player.surname || 'Ribeiro';
    const countryField = refs.countryInput;
    if (countryField) countryField.value = player.country || 'Brasil';
    const styleField = refs.styleInput;
    if (styleField) styleField.value = player.style || 'Ortodoxo técnico';
    const colorField = refs.colorInput;
    if (colorField) colorField.value = player.color || '#d64f3e';

    const volume = refs.musicVolume;
    if (volume) volume.value = state.settings.volumeMusic ?? 45;
    const sfx = refs.sfxVolume;
    if (sfx) sfx.value = state.settings.volumeSfx ?? 75;
    const voice = refs.voiceVolume;
    if (voice) voice.value = state.settings.volumeVoice ?? 80;
  }

  function updateFightHud() {
    const fight = state.fight;
    const player = state.player;

    if (refs.playerHealth) refs.playerHealth.style.width = `${clamp(fight.playerHealth ?? 100, 0, 100)}%`;
    if (refs.opponentHealth) refs.opponentHealth.style.width = `${clamp(fight.opponentHealth ?? 100, 0, 100)}%`;
    if (refs.playerStamina) refs.playerStamina.style.width = `${clamp(fight.playerStamina ?? 100, 0, 100)}%`;
    if (refs.opponentStamina) refs.opponentStamina.style.width = `${clamp(fight.opponentStamina ?? 100, 0, 100)}%`;

    if (refs.roundBadge) refs.roundBadge.textContent = `ROUND ${fight.round || 1} / ${fight.totalRounds || 3}`;
    if (refs.fightTimer) refs.fightTimer.textContent = formatClock(fight.timer || 180);
    if (refs.roundLabel) refs.roundLabel.textContent = `ROUND ${String(fight.round || 1).padStart(2, '0')}`;
    if (refs.clockDisplay) refs.clockDisplay.textContent = formatClock(fight.timer || 180);
    if (refs.roundScore) {
      const playerTotal = fight.playerJudgeScore || 0;
      const opponentTotal = fight.opponentJudgeScore || 0;
      refs.roundScore.textContent = playerTotal || opponentTotal
        ? `${playerTotal} — ${opponentTotal}`
        : '10 — 10';
    }
    if (refs.hudPlayerRecord) refs.hudPlayerRecord.textContent = `${player.record[0] || 0}–${player.record[1] || 0}–${player.record[2] || 0} · ${player.style || 'Ortodoxo'}`;
    if (refs.hudOpponentRecord) refs.hudOpponentRecord.textContent = `${state.opponent.record || '8–2–0'} · ${state.opponent.style || 'Contra-atacador'}`;
    if (refs.hudPlayer) refs.hudPlayer.textContent = `${player.name || 'J'} ${player.surname || 'RIBEIRO'}`.toUpperCase();
    if (refs.hudOpponent) refs.hudOpponent.textContent = (state.opponent.name || 'MATEO CRUZ').toUpperCase();
    if (refs.landedValue) refs.landedValue.textContent = String(fight.landed || 0);
    if (refs.accuracyValue) refs.accuracyValue.textContent = `${Math.round(fight.accuracy || 0)}%`;
    if (refs.blockedValue) refs.blockedValue.textContent = String(fight.blocked || 0);
    if (refs.arenaTip) refs.arenaTip.textContent = 'WASD mover · J jab · K direto · L gancho · Espaço guarda';
    if (refs.arenaMessage) {
      const isIdle = fight.phase === 'idle';
      refs.arenaMessage.innerHTML = isIdle
        ? '<span>ROUND 1</span><b>TOQUE PARA COMEÇAR</b><small>Calibre a distância. Escolha seu momento.</small><button class="primary-btn" id="bellBtn">SOAR O GONGO <span>↗</span></button>'
        : `<span>ROUND ${fight.round || 1}</span><b>${fight.phase === 'finished' ? 'LUTA FINALIZADA' : 'EM ANDAMENTO'}</b><small>${fight.lastFeedback || 'Calibre a distância. Escolha seu momento.'}</small>${fight.phase === 'finished' ? '<button class="primary-btn" id="bellBtn">VER RESULTADO <span>↗</span></button>' : ''}`;
      if (isIdle) {
        const btn = refs.arenaMessage.querySelector('#bellBtn');
        if (btn) btn.addEventListener('click', startFight,
          { once: true });
      }
    }
    if (refs.fightFeedback) refs.fightFeedback.textContent = fight.lastFeedback || 'Calibre a distância. Escolha seu momento.';
  }

  function formatClock(seconds) {
    const total = Math.max(0, Math.ceil(seconds));
    const min = Math.floor(total / 60);
    const sec = total % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }

  function generateOpponent() {
    const division = state.player.division || 'Leve';
    const opponentNames = [
      ['Mateo “El Rayo” Cruz', 'Contra-atacador'],
      ['Rafael “Mármore” Nunes', 'Pressionador'],
      ['Brenno “Pistão” Vale', 'Ortodoxo técnico'],
      ['Iason “Léo” Mello', 'Canhoto agressivo'],
      ['Adriano “Furacão” Sosa', 'Pressionador']
    ];
    const divisionIndex = Math.max(0, divisions.findIndex((entry) => entry.label === division));
    const baseRecord = 8 + (state.player.record[0] || 0);
    const list = opponentNames.map(([name, style], index) => ({
      name,
      style,
      record: `${baseRecord + index}–${2 + index}–${index % 2}`,
      division,
      purse: 1200 + divisionIndex * 180 + index * 100
    }));
    const opponents = list.filter((entry) => entry.division === division);
    const pool = opponents.length ? opponents : list;
    const opponent = pool[Math.floor(Math.random() * pool.length)];
    return { ...opponent, division };
  }

  function ensureFightSetup() {
    state.opponent = state.opponent && state.opponent.name ? state.opponent : generateOpponent();
    state.fight.phase = 'idle';
    state.fight.active = false;
    state.fight.started = false;
    state.fight.winner = null;
    state.fight.finishMethod = null;
    state.fight.timer = 180;
    state.fight.round = 1;
    state.fight.playerScore = 0;
    state.fight.opponentScore = 0;
    state.fight.playerJudgeScore = 0;
    state.fight.opponentJudgeScore = 0;
    state.fight.playerHealth = 100;
    state.fight.opponentHealth = 100;
    state.fight.playerStamina = 100;
    state.fight.opponentStamina = 100;
    state.fight.landed = 0;
    state.fight.totalShots = 0;
    state.fight.blocked = 0;
    state.fight.accuracy = 0;
    state.fight.lastFeedback = 'Calibre a distância. Escolha seu momento.';
    battle.player.x = 30;
    battle.player.health = 100;
    battle.player.stamina = 100;
    battle.player.guard = false;
    battle.player.dodge = 0;
    battle.player.guardTimer = 0;
    battle.player.attackTimer = 0;
    battle.opponent.x = 70;
    battle.opponent.health = 100;
    battle.opponent.stamina = 100;
    battle.opponent.guard = false;
    battle.opponent.guardTimer = 0;
    battle.opponent.dodge = 0;
    battle.started = false;
    battle.ended = false;
    battle.lastAiDecision = 0;
    battle.endFrame = false;
  }

  function startFight() {
    const fight = state.fight;
    if (fight.phase === 'finished') {
      ensureFightSetup();
    }

    fight.phase = 'live';
    fight.active = true;
    fight.started = true;
    fight.lastFeedback = 'Round 1 começando. Mantenha a distância e ataque no momento certo.';
    battle.started = true;
    battle.ended = false;
    battle.endFrame = false;
    battle.lastAiDecision = 0;
    if (refs.arenaMessage) refs.arenaMessage.classList.add('hidden');
    persistState();
    updateFightHud();
  }

  function endFight(result) {
    const fight = state.fight;
    fight.phase = 'finished';
    fight.active = false;
    fight.started = false;
    fight.winner = result;
    battle.started = false;
    battle.ended = true;

    const record = state.player.record.slice();
    if (result === 'win') {
      record[0] += 1;
      state.player.streak = (state.player.streak || 0) + 1;
      state.player.cash += Number(state.opponent.purse || 1200);
      state.player.rank = clamp((state.player.rank || 38) - 3, 1, 99);
      const rankPoints = (state.player.rankPoints || 0) + 18;
      if (rankPoints >= 100) {
        state.player.rankPoints = rankPoints - 100;
        state.player.rank = clamp(state.player.rank - 1, 1, 99);
      } else {
        state.player.rankPoints = rankPoints;
      }
      state.player.popularity = clamp((state.player.popularity || 12) + 3, 0, 100);
      state.player.day = (state.player.day || 1) + 1;
      state.player.condition = clamp((state.player.condition || 87) + 4, 0, 100);
      state.player.fatigue = clamp((state.player.fatigue || 13) + 12, 0, 100);
      fight.lastFeedback = `${fight.finishMethod === 'ko' ? 'Vitória por nocaute!' : 'Vitória por decisão!'} Você ganhou ${formatCash(state.opponent.purse || 1200)} e subiu no ranking.`;
      showToast(fight.finishMethod === 'ko' ? 'Vitória por nocaute!' : 'Vitória confirmada!');
    } else if (result === 'draw') {
      record[2] += 1;
      state.player.cash += 600;
      state.player.streak = 0;
      state.player.day = (state.player.day || 1) + 1;
      fight.lastFeedback = 'Empate técnico. O ringue foi equilibrado até o último segundo.';
      showToast('Empate no ringue');
    } else {
      record[1] += 1;
      state.player.streak = 0;
      state.player.cash += 450;
      state.player.rank = clamp((state.player.rank || 38) + 2, 1, 99);
      state.player.day = (state.player.day || 1) + 1;
      state.player.popularity = clamp((state.player.popularity || 12) - 2, 0, 100);
      state.player.fatigue = clamp((state.player.fatigue || 13) + 18, 0, 100);
      fight.lastFeedback = fight.finishMethod === 'ko'
        ? 'Derrota por nocaute. Recupere-se e volte mais forte.'
        : 'Derrota por pontos. Ajuste a postura e retorne mais forte.';
      showToast(fight.finishMethod === 'ko' ? 'Derrota por nocaute' : 'Derrota por pontos');
    }

    state.player.record = record;
    state.player.history.unshift({
      title: result === 'win' ? 'Vitória' : result === 'draw' ? 'Empate' : 'Derrota',
      detail: `${state.opponent.name} · ${state.player.division}`,
      titleValue: result === 'win' ? 'W' : result === 'draw' ? 'D' : 'L'
    });
    state.player.history = state.player.history.slice(0, 5);
    state.stats.wins = record[0];
    state.stats.losses = record[1];
    state.stats.draws = record[2];

    persistState();
    renderHistory();
    updateProfileSummary();
    updateFightHud();
    if (refs.arenaMessage) {
      refs.arenaMessage.innerHTML = '<span>RESULTADO</span><b>TOQUE PARA PRÓXIMA LUTA</b><small>' + fight.lastFeedback + '</small><button class="primary-btn" id="bellBtn">NOVO DESAFIO <span>↗</span></button>';
      const btn = refs.arenaMessage.querySelector('#bellBtn');
      if (btn) btn.addEventListener('click', () => {
        state.opponent = generateOpponent();
        ensureFightSetup();
        updateFightHud();
        startFight();
      }, { once: true });
    }
  }

  function resolveRoundScore() {
    const fight = state.fight;
    const playerHits = fight.playerScore || 0;
    const opponentHits = fight.opponentScore || 0;
    const playerWonRound = playerHits > opponentHits;
    const opponentWonRound = opponentHits > playerHits;
    const roundPoints = playerWonRound ? [10, 9] : opponentWonRound ? [9, 10] : [10, 10];

    fight.playerJudgeScore = (fight.playerJudgeScore || 0) + roundPoints[0];
    fight.opponentJudgeScore = (fight.opponentJudgeScore || 0) + roundPoints[1];

    if (fight.round >= fight.totalRounds) {
      const playerTotal = fight.playerJudgeScore;
      const opponentTotal = fight.opponentJudgeScore;
      endFight(playerTotal === opponentTotal ? 'draw' : playerTotal > opponentTotal ? 'win' : 'loss');
      return;
    }

    const completedRound = fight.round;
    fight.round += 1;
    fight.timer = 180;
    fight.playerScore = 0;
    fight.opponentScore = 0;
    fight.playerHealth = clamp(fight.playerHealth + 12, 0, 100);
    fight.opponentHealth = clamp(fight.opponentHealth + 12, 0, 100);
    fight.playerStamina = 100;
    fight.opponentStamina = 100;
    battle.player.health = fight.playerHealth;
    battle.opponent.health = fight.opponentHealth;
    battle.player.stamina = 100;
    battle.opponent.stamina = 100;
    fight.lastFeedback = `Round ${completedRound}: ${playerWonRound ? 'você levou 10–9.' : opponentWonRound ? 'o rival levou 10–9.' : 'round equilibrado, 10–10.'} Começou o round ${fight.round}.`;
    updateFightHud();
  }

  function startRoundTransition() {
    const fight = state.fight;
    if (!fight.active || fight.phase === 'finished' || fight.timer > 0) return;
    resolveRoundScore();
  }

  function processPlayerMove(key) {
    const fight = state.fight;
    if (fight.phase !== 'live') return;

    if (key === 'guard') {
      battle.player.guard = true;
      battle.player.guardTimer = 0.7;
      fight.lastFeedback = 'Guarda alta. Espere o golpe e responda.';
      return;
    }

    if (key === 'dodge') {
      if (battle.player.stamina < 5) {
        fight.lastFeedback = 'Sem fôlego para esquivar. Recupere a distância.';
        return;
      }
      battle.player.stamina = Math.max(0, battle.player.stamina - 5);
      battle.player.dodge = 0.6;
      fight.lastFeedback = 'Esquiva rápida. Corte o ângulo de ataque.';
      return;
    }

    if (key === 'clinch') {
      battle.player.guard = true;
      battle.player.guardTimer = 0.9;
      battle.player.stamina = clamp(battle.player.stamina + 12, 0, 100);
      fight.lastFeedback = 'Clinche! Você interrompeu a pressão e recuperou fôlego.';
      return;
    }

    const punchTypes = ['jab', 'cross', 'hook', 'upper', 'body'];
    if (!punchTypes.includes(key)) return;
    if (battle.player.attackTimer > 0) return;
    if (battle.player.stamina < 4) {
      fight.lastFeedback = 'Você está sem fôlego. Movimente-se com calma para recuperar.';
      return;
    }

    const baseDamage = { jab: 7, cross: 10, hook: 13, upper: 11, body: 9 }[key];
    const fatiguePenalty = clamp((state.player.fatigue || 0) / 250, 0, 0.35);
    const conditionBonus = clamp((state.player.condition || 87) / 500, 0.1, 0.2);
    const attackDamage = Math.round(baseDamage * (1 - fatiguePenalty + conditionBonus));
    const staminaCost = { jab: 5, cross: 8, hook: 10, upper: 9, body: 7 }[key];
    battle.player.stamina = Math.max(0, battle.player.stamina - staminaCost);
    battle.player.attackTimer = 0.28;
    const dist = Math.abs(battle.player.x - battle.opponent.x);
    fight.totalShots = (fight.totalShots || 0) + 1;
    if (dist > 27) {
      fight.lastFeedback = 'Seu golpe foi longo. Aproxime-se antes de atacar.';
      fight.accuracy = Math.round((fight.landed / Math.max(1, fight.totalShots)) * 100);
      return;
    }

    const blocked = battle.opponent.guard && Math.random() < 0.65;
    const actualDamage = blocked ? 0 : attackDamage + Math.round(Math.random() * 3);

    if (blocked) {
      fight.blocked = (fight.blocked || 0) + 1;
      fight.lastFeedback = 'O rival bloqueou. Varie os golpes para abrir a guarda.';
    } else {
      fight.landed = (fight.landed || 0) + 1;
      fight.playerScore = (fight.playerScore || 0) + 1;
      battle.opponent.health = Math.max(0, battle.opponent.health - actualDamage);
      state.fight.opponentHealth = battle.opponent.health;
      fight.lastFeedback = `${key.toUpperCase()} conectou! O rival sentiu o impacto.`;
    }

    if (battle.opponent.health <= 0) {
      fight.finishMethod = 'ko';
      endFight('win');
      return;
    }

    fight.accuracy = Math.round((fight.landed / Math.max(1, fight.totalShots)) * 100);
  }

  function aiAttack() {
    const fight = state.fight;
    if (fight.phase !== 'live' || battle.ended) return;
    const dist = Math.abs(battle.player.x - battle.opponent.x);
    const chance = Math.random();

    if (dist > 25) {
      battle.opponent.x = clamp(battle.opponent.x - 1.4, 52, 90);
      fight.lastFeedback = 'O rival avança para fechar a distância.';
      return;
    }

    if (chance > 0.62) {
      battle.opponent.guard = true;
      battle.opponent.guardTimer = 0.85;
      fight.lastFeedback = 'O adversário se protege. Varie os ataques.';
      return;
    }

    if (battle.opponent.stamina < 5) {
      fight.lastFeedback = 'O rival está cansado. Aumente a pressão.';
      return;
    }

    const selected = ['jab', 'cross', 'hook'][Math.floor(Math.random() * 3)];
    const damage = { jab: 5, cross: 8, hook: 12 }[selected];
    const isBlocked = (battle.player.guard || battle.player.dodge > 0) && Math.random() > 0.25;
    const finalDamage = isBlocked ? 0 : damage + Math.round(Math.random() * 3);
    battle.opponent.stamina = Math.max(0, battle.opponent.stamina - 5);
    state.fight.opponentStamina = battle.opponent.stamina;

    if (isBlocked) {
      fight.blocked = (fight.blocked || 0) + 1;
      fight.lastFeedback = 'Você absorveu o golpe e manteve a guarda.';
    } else {
      battle.player.health = Math.max(0, battle.player.health - finalDamage);
      state.fight.playerHealth = battle.player.health;
      fight.opponentScore = (fight.opponentScore || 0) + 1;
      fight.lastFeedback = `Contra-ataque do rival: ${selected.toUpperCase()} conectou.`;
      if (battle.player.health <= 0) {
        fight.finishMethod = 'ko';
        endFight('loss');
        return;
      }
    }

    battle.opponent.guard = false;
  }

  function updateMovement(dt) {
    const moveVector = { x: 0, y: 0 };
    if (keyboard.w || keyboard.ArrowUp) moveVector.y -= 1;
    if (keyboard.s || keyboard.ArrowDown) moveVector.y += 1;
    if (keyboard.a || keyboard.ArrowLeft) moveVector.x -= 1;
    if (keyboard.d || keyboard.ArrowRight) moveVector.x += 1;

    if (moveVector.x !== 0 || moveVector.y !== 0) {
      const speed = 12 * dt;
      battle.player.x += moveVector.x * speed;
      battle.player.x = clamp(battle.player.x, 12, 48);
      battle.player.y += moveVector.y * speed;
      battle.player.y = clamp(battle.player.y, -28, 28);
      state.fight.playerPosition = battle.player.x;
    }

    if (!battle.started) return;
    const dist = Math.abs(battle.player.x - battle.opponent.x);
    if (dist > 16) {
      battle.opponent.x += battle.opponent.x > battle.player.x ? -0.35 : 0.35;
      battle.opponent.x = clamp(battle.opponent.x, 52, 88);
    }

    battle.player.guardTimer = Math.max(0, (battle.player.guardTimer || 0) - dt);
    battle.player.guard = battle.player.guardTimer > 0;
    battle.player.dodge = Math.max(0, battle.player.dodge - dt);
    battle.player.attackTimer = Math.max(0, battle.player.attackTimer - dt);
    battle.opponent.guardTimer = Math.max(0, (battle.opponent.guardTimer || 0) - dt);
    battle.opponent.guard = battle.opponent.guardTimer > 0;

    const isMoving = moveVector.x !== 0 || moveVector.y !== 0;
    const playerRecovery = isMoving ? 7 : 12;
    const opponentRecovery = Math.abs(battle.player.x - battle.opponent.x) > 25 ? 10 : 7;
    battle.player.stamina = clamp(battle.player.stamina + playerRecovery * dt, 0, 100);
    battle.opponent.stamina = clamp(battle.opponent.stamina + opponentRecovery * dt, 0, 100);
    state.fight.playerStamina = battle.player.stamina;
    state.fight.opponentStamina = battle.opponent.stamina;
  }

  function updateFight(dt) {
    const fight = state.fight;
    if (fight.phase !== 'live' || battle.ended) return;
    fight.timer = clamp((fight.timer || 180) - dt, 0, 180);

    if (fight.timer <= 0) {
      resolveRoundScore();
      if (battle.ended) return;
    }

    if (performance.now() - battle.lastAiDecision > 1200) {
      battle.lastAiDecision = performance.now();
      aiAttack();
    }

    updateMovement(dt);

    if (!battle.ended) {
      state.fight.playerHealth = battle.player.health;
      state.fight.opponentHealth = battle.opponent.health;
      state.fight.playerStamina = battle.player.stamina;
      state.fight.opponentStamina = battle.opponent.stamina;
    }

    updateFightHud();
  }

  function renderArena() {
    const canvas = refs.arena;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 900;
    const height = rect.height || 420;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const ringLeft = 24;
    const ringTop = 20;
    const ringWidth = width - 48;
    const ringHeight = height - 55;

    ctx.clearRect(0, 0, width, height);
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#0b1210');
    sky.addColorStop(1, '#1c2a25');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#0c3b2e';
    ctx.fillRect(ringLeft, ringTop, ringWidth, ringHeight);
    ctx.strokeStyle = '#d2b46d';
    ctx.lineWidth = 2;
    ctx.strokeRect(ringLeft + 6, ringTop + 6, ringWidth - 12, ringHeight - 12);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.moveTo(ringLeft + 10, ringTop + 40);
    ctx.lineTo(width - ringLeft - 10, ringTop + 40);
    ctx.moveTo(ringLeft + 10, ringTop + ringHeight - 40);
    ctx.lineTo(width - ringLeft - 10, ringTop + ringHeight - 40);
    ctx.stroke();

    const playerX = ringLeft + (battle.player.x / 100) * (ringWidth - 25);
    const playerY = ringTop + ringHeight * 0.73 + battle.player.y;
    const enemyX = ringLeft + (battle.opponent.x / 100) * (ringWidth - 25);
    const enemyY = ringTop + ringHeight * 0.73 + battle.opponent.y;

    drawFighter(ctx, playerX, playerY, state.player.color || '#d64f3e', battle.player.guard, false);
    drawFighter(ctx, enemyX, enemyY, '#5a8791', battle.opponent.guard, true);

    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(ringLeft + 8, ringTop + 8, ringWidth - 16, 12);
    ctx.fillRect(ringLeft + 8, ringTop + ringHeight - 20, ringWidth - 16, 12);
  }

  function drawFighter(ctx, x, y, color, guard, enemy) {
    const bodyColor = color;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = '#f0d0a6';
    ctx.beginPath();
    ctx.arc(0, -52, 15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = bodyColor;
    ctx.fillRect(-14, -34, 28, 45);

    ctx.strokeStyle = '#d9c68d';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-12, -18);
    ctx.lineTo(-28, 24);
    ctx.moveTo(12, -18);
    ctx.lineTo(26, 24);
    ctx.moveTo(-6, 12);
    ctx.lineTo(-18, 54);
    ctx.moveTo(6, 12);
    ctx.lineTo(16, 54);
    ctx.stroke();

    if (guard) {
      ctx.strokeStyle = '#eaecb8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-20, -12);
      ctx.lineTo(-38, 6);
      ctx.moveTo(20, -12);
      ctx.lineTo(38, 6);
      ctx.stroke();
    }

    if (enemy) {
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(-30, -90, 60, 12);
    }
    ctx.restore();
  }

  function renderTrainings() {
    const list = refs.trainingGrid;
    if (!list) return;
    list.innerHTML = '';
    trainingPlans.forEach((plan) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'training-card';
      card.innerHTML = `<span>${plan.name}</span><small>${plan.desc}</small><b>+${plan.effect}% · $ 80</b>`;
      card.addEventListener('click', () => {
        const player = state.player;
        if ((Number(player.cash) || 0) < 80) {
          showToast('Saldo insuficiente. O treino custa $ 80.');
          return;
        }
        player.condition = clamp(player.condition + plan.effect, 0, 100);
        player.fatigue = clamp(player.fatigue + plan.fatigue, 0, 100);
        player.cash = Number(player.cash) - 80;
        player.trainingWeek += 1;
        player.condition = clamp(player.condition + 4, 0, 100);
        showToast(`${plan.name} concluído`);
        renderAll();
        persistState();
      });
      list.appendChild(card);
    });
  }

  function renderHistory() {
    const history = refs.historyList;
    if (!history) return;
    const entries = state.player.history && state.player.history.length ? state.player.history : [{ title: 'Primeira luta', detail: 'Sua história começa aqui', titleValue: '—' }];
    history.innerHTML = entries.map((item) => `
      <div class="history-item">
        <span class="history-tag">${item.titleValue || '—'}</span>
        <div><b>${item.title}</b><small>${item.detail}</small></div>
      </div>
    `).join('');
  }

  function renderHall() {
    const hallGrid = refs.hallGrid;
    if (!hallGrid) return;
    const legends = [
      { name: 'Ali', era: '1960s • World', title: 'Inesquecível' },
      { name: 'Frazier', era: '1970s • Classic', title: 'Aço no ringue' },
      { name: 'Tyson', era: '1980s • Knockout', title: 'Poder universal' },
      { name: 'Pacquiao', era: '2000s • Speed', title: 'Duplicidade letal' }
    ];
    hallGrid.innerHTML = legends.map((legend, index) => `
      <article class="legacy-card">
        <div class="legacy-badge">${index + 1}</div>
        <h4>${legend.name}</h4>
        <span>${legend.era}</span>
        <b>${legend.title}</b>
      </article>
    `).join('');
  }

  function renderRecords() {
    const recordsGrid = refs.recordsGrid;
    if (!recordsGrid) return;
    recordsGrid.innerHTML = `
      <div class="record-box"><small>VITÓRIAS</small><b>${state.player.record[0] || 0}</b></div>
      <div class="record-box"><small>DERROTAS</small><b>${state.player.record[1] || 0}</b></div>
      <div class="record-box"><small>EMPATES</small><b>${state.player.record[2] || 0}</b></div>
      <div class="record-box"><small>POPULARIDADE</small><b>${state.player.popularity || 12}%</b></div>
    `;
  }

  function renderRankings() {
    const rankRows = refs.rankingRows;
    if (!rankRows) return;
    const selectedDivision = state.selectedDivision || state.player.division || 'Leve';
    const selectedOrg = state.selectedOrg || 'WBL';
    const rows = [
      { name: 'Dario “Iron” Silva', record: '28–1–0', wins: '19 KOs', score: 99 },
      { name: 'Mateo Cruz', record: '21–3–0', wins: '14 KOs', score: 96 },
      { name: 'Rafael Nunes', record: '19–4–0', wins: '12 KOs', score: 93 },
      { name: 'J. Ribeiro', record: state.player.record.join('–'), wins: `${state.player.record[0] || 0} vitórias`, score: 88 }
    ];

    rankRows.innerHTML = rows.map((row, index) => `
      <div class="ranking-row ${row.name.includes('Ribeiro') ? 'you-row' : ''}">
        <span class="rank-pos">${index + 1}</span>
        <div><b>${row.name}</b><small>${row.record}</small></div>
        <div class="record">${row.wins}</div>
        <span class="score">${row.score}</span>
        <span class="rank-chip">${selectedOrg}</span>
      </div>
    `).join('');

    const orgNameNode = refs.orgName;
    if (orgNameNode) {
      const org = orgs.find((entry) => entry.id === selectedOrg) || orgs[0];
      orgNameNode.textContent = org.name;
    }

    const championName = refs.championName;
    if (championName) {
      const org = orgs.find((entry) => entry.id === selectedOrg) || orgs[0];
      championName.textContent = org.champion;
    }
  }

  function renderSettings() {
    const qualityWrap = refs.qualityOptions;
    if (qualityWrap) {
      qualityWrap.innerHTML = qualityProfiles.map((option) => `
        <button type="button" class="quality-option ${state.settings.quality === option.id ? 'active' : ''}" data-quality="${option.id}">
          ${option.label}
        </button>
      `).join('');
    }

    const divisionSelect = refs.profileDivision;
    if (divisionSelect) {
      divisionSelect.innerHTML = divisions.map((item) => `<option value="${item.label}">${item.label}</option>`).join('');
    }

    const deviceNode = refs.deviceNote;
    if (deviceNode) {
      const selected = qualityProfiles.find((item) => item.id === state.settings.quality) || qualityProfiles[1];
      deviceNode.textContent = `${selected.note} Perfil recomendado para ${state.settings.device || 'Helio G85'}.`;
    }
  }

  function renderAll() {
    updateProfileSummary();
    renderHistory();
    renderTrainings();
    renderHall();
    renderRecords();
    renderRankings();
    renderSettings();
    updateFightHud();
    renderArena();
  }

  function bindNav() {
    document.querySelectorAll('[data-page]').forEach((button) => {
      button.addEventListener('click', () => {
        const page = button.dataset.page;
        if (page) setPage(page);
      });
    });
  }

  function bindSettingsEvents() {
    refs.qualityOptions?.addEventListener('click', (event) => {
      const option = event.target.closest('[data-quality]');
      if (!option) return;
      state.settings.quality = option.dataset.quality;
      persistState();
      renderSettings();
      showToast(`Qualidade: ${state.settings.quality}`);
    });

    refs.resolutionSelect?.addEventListener('change', (event) => {
      state.settings.resolution = event.target.value;
      persistState();
    });

    refs.fpsSelect?.addEventListener('change', (event) => {
      state.settings.fps = event.target.value;
      persistState();
    });

    refs.autoDetect?.addEventListener('click', () => {
      state.settings.device = 'Helio G85';
      state.settings.quality = 'medium';
      persistState();
      renderSettings();
      showToast('Dispositivo detectado');
    });

    refs.saveProfile?.addEventListener('click', () => {
      const player = state.player;
      player.name = refs.nameInput.value.trim() || 'Júnior';
      player.surname = refs.surnameInput.value.trim() || 'Ribeiro';
      player.country = refs.countryInput.value || 'Brasil';
      player.division = refs.profileDivision.value || 'Leve';
      player.style = refs.styleInput.value || 'Ortodoxo técnico';
      player.color = refs.colorInput.value || '#d64f3e';
      state.selectedDivision = player.division;
      persistState();
      renderAll();
      showToast('Perfil salvo');
    });

    refs.exportSave?.addEventListener('click', async () => {
      const payload = JSON.stringify(state, null, 2);
      try {
        await navigator.clipboard.writeText(payload);
        showToast('Save exportado');
      } catch (error) {
        showToast('Clique para copiar o save');
      }
    });

    refs.resetSave?.addEventListener('click', () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        /* no-op */
      }
      state = deepMerge(defaultState, {});
      ensureFightSetup();
      renderAll();
      showToast('Carreira reiniciada');
    });

    refs.musicVolume?.addEventListener('input', (event) => {
      state.settings.volumeMusic = Number(event.target.value);
      persistState();
    });
    refs.sfxVolume?.addEventListener('input', (event) => {
      state.settings.volumeSfx = Number(event.target.value);
      persistState();
    });
    refs.voiceVolume?.addEventListener('input', (event) => {
      state.settings.volumeVoice = Number(event.target.value);
      persistState();
    });
  }

  function bindFightControls() {
    const movementKeys = { up: 'ArrowUp', left: 'ArrowLeft', down: 'ArrowDown', right: 'ArrowRight' };
    document.querySelectorAll('[data-move]').forEach((button) => {
      const key = movementKeys[button.dataset.move];
      if (!key) return;
      const release = () => { keyboard[key] = false; };
      button.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        keyboard[key] = true;
      });
      button.addEventListener('pointerup', release);
      button.addEventListener('pointercancel', release);
      button.addEventListener('pointerleave', release);
    });

    document.querySelectorAll('[data-action]').forEach((button) => {
      button.addEventListener('click', () => processPlayerMove(button.dataset.action));
    });

    document.querySelectorAll('[data-punch]').forEach((button) => {
      button.addEventListener('click', () => processPlayerMove(button.dataset.punch));
    });

    refs.bellBtn?.addEventListener('click', () => {
      if (state.fight.phase === 'finished') {
        state.opponent = generateOpponent();
        ensureFightSetup();
      }
      startFight();
    });

    window.addEventListener('keydown', (event) => {
      const key = event.key.toLowerCase();
      keyboard[key] = true;
      keyboard[event.key] = true;
      if (key === 'j') processPlayerMove('jab');
      if (key === 'k') processPlayerMove('cross');
      if (key === 'l') processPlayerMove('hook');
      if (key === 'i') processPlayerMove('upper');
      if (key === 'o') processPlayerMove('body');
      if (event.code === 'Space') {
        event.preventDefault();
        processPlayerMove('guard');
      }
      if (event.key === 'Shift') processPlayerMove('dodge');
      if (key === 'c') processPlayerMove('clinch');
    });

    window.addEventListener('keyup', (event) => {
      const key = event.key.toLowerCase();
      keyboard[key] = false;
      keyboard[event.key] = false;
      if (event.code === 'Space') keyboard.space = false;
      if (event.key === 'Shift') keyboard.shift = false;
    });
  }

  function bindDivisionAndOrgEvents() {
    refs.divisionSelect?.addEventListener('change', (event) => {
      state.selectedDivision = event.target.value;
      state.player.division = event.target.value;
      state.opponent = generateOpponent();
      persistState();
      updateProfileSummary();
      renderRankings();
    });

    refs.orgTabs?.addEventListener('click', (event) => {
      const tab = event.target.closest('[data-org]');
      if (!tab) return;
      state.selectedOrg = tab.dataset.org;
      persistState();
      renderRankings();
    });

    refs.startCareerFight?.addEventListener('click', () => {
      state.opponent = generateOpponent();
      ensureFightSetup();
      setPage('fight');
      startFight();
    });

    refs.openCalendar?.addEventListener('click', () => {
      showToast('Calendário do campeão atualizado');
    });

    refs.restBtn?.addEventListener('click', () => {
      state.player.fatigue = clamp((state.player.fatigue || 0) - 25, 0, 100);
      state.player.condition = clamp((state.player.condition || 87) + 7, 0, 100);
      persistState();
      updateProfileSummary();
      showToast('Descanso concluído');
    });

    refs.saveBtn?.addEventListener('click', () => {
      persistState();
      showToast('Progresso salvo');
    });
  }

  function buildOrgTabs() {
    const orgTabs = refs.orgTabs;
    if (!orgTabs) return;
    orgTabs.innerHTML = orgs.map((org) => `
      <button class="org-tab ${state.selectedOrg === org.id ? 'active' : ''}" data-org="${org.id}">${org.label}</button>
    `).join('');
  }

  function cacheRefs() {
    const ids = [
      'pageLabel', 'cashTop', 'cashValue', 'saveBtn', 'toast', 'playerHealth', 'opponentHealth', 'playerStamina', 'opponentStamina',
      'rankProgress', 'conditionBar', 'gymConditionBar', 'fatigueBar', 'historyList', 'trainingGrid', 'divisionSelect', 'orgTabs',
      'orgName', 'orgEyebrow', 'rankingRows', 'championName', 'championMeta', 'defenseCount', 'qualityOptions', 'resolutionSelect',
      'fpsSelect', 'advancedSettings', 'autoDetect', 'deviceNote', 'nameInput', 'surnameInput', 'countryInput', 'profileDivision',
      'styleInput', 'colorInput', 'saveProfile', 'exportSave', 'resetSave', 'musicVolume', 'sfxVolume', 'voiceVolume',
      'hallGrid', 'recordsGrid', 'arena', 'roundBadge', 'fightTimer', 'roundLabel', 'clockDisplay', 'roundScore', 'hudPlayer',
      'hudPlayerRecord', 'hudOpponent', 'hudOpponentRecord', 'landedValue', 'accuracyValue', 'blockedValue', 'arenaTip', 'arenaMessage',
      'fightFeedback', 'startCareerFight', 'openCalendar', 'restBtn', 'bellBtn', 'trainingWeek', 'sideName', 'sideDivision', 'avatarMini',
      'welcomeName', 'heroOpponent', 'heroMeta', 'oppName', 'oppRecord', 'fightPurse', 'rankValue', 'conditionValue', 'streakValue', 'trainingStatus',
      'scheduleTitle', 'recordValue', 'koValue', 'popValue', 'gymCondition', 'fatigueValue', 'legacyRank', 'rankProgressText', 'sideName', 'sideDivision'
    ];

    ids.forEach((id) => {
      refs[id] = document.getElementById(id);
    });
  }

  function loop(ts) {
    const dt = Math.min(0.05, (ts - (loop.lastTs || ts)) / 1000 || 0.016);
    loop.lastTs = ts;
    if (state.fight.phase === 'live') updateFight(dt);
    renderArena();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  function init() {
    cacheRefs();
    buildOrgTabs();
    bindNav();
    bindFightControls();
    bindDivisionAndOrgEvents();
    bindSettingsEvents();
    if (refs.divisionSelect) {
      refs.divisionSelect.innerHTML = divisions.map((item) => `<option value="${item.label}">${item.label}</option>`).join('');
    }
    state.selectedDivision = state.selectedDivision || state.player.division || 'Leve';
    state.selectedOrg = state.selectedOrg || 'WBL';
    state.opponent = state.opponent && state.opponent.name ? state.opponent : generateOpponent();
    ensureFightSetup();
    renderAll();
    setPage(state.currentPage || 'career');
    updateFightHud();
  }

  init();
})();
