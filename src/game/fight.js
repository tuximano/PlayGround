// Deterministic, authoritative boxing simulation with stamina, guard, counters, knockdowns and judges.
import { clamp } from '../core/rng.js';
import { STYLE_BY_ID } from '../core/data.js';

export const PUNCHES = {
  jab: { id: 'jab', name: 'Jab', short: 'J', damage: 4.2, stamina: 4.5, dur: 0.30, impactAt: 0.42, range: 0.30, accuracy: 0.10, stun: 0.10, guardBreak: 5, score: 1, hand: 'L' },
  cross: { id: 'cross', name: 'Direto', short: 'K', damage: 8.6, stamina: 9, dur: 0.44, impactAt: 0.44, range: 0.22, accuracy: 0.02, stun: 0.2, guardBreak: 12, score: 2, hand: 'R' },
  hook: { id: 'hook', name: 'Gancho', short: 'L', damage: 10.4, stamina: 11.5, dur: 0.48, impactAt: 0.47, range: 0.12, accuracy: -0.02, stun: 0.26, guardBreak: 16, score: 2, hand: 'R' },
  uppercut: { id: 'uppercut', name: 'Uppercut', short: 'I', damage: 13.2, stamina: 14.5, dur: 0.55, impactAt: 0.5, range: 0.10, accuracy: -0.04, stun: 0.34, guardBreak: 22, score: 3, hand: 'R' },
  body: { id: 'body', name: 'Corpo', short: 'B', damage: 7.2, stamina: 9, dur: 0.42, impactAt: 0.45, range: 0.14, accuracy: 0.04, stun: 0.12, guardBreak: 10, score: 2, hand: 'L' },
};

const RING_LIMIT = 2.58;
const START_DISTANCE = 1.62;

function attr(attrs, key, fallback = 55) {
  return attrs?.[key] ?? fallback;
}

export class FightEngine {
  constructor(config = {}) {
    this.config = {
      rounds: 3,
      roundTime: 60,
      mode: 'career',
      difficulty: 'pro',
      seed: Date.now() % 100000,
      ...config,
    };
    this.phase = 'intro';
    this.phaseTime = 0;
    this.clock = this.config.roundTime;
    this.round = 1;
    this.timeScale = 1;
    this.events = [];
    this.finished = false;
    this.result = null;
    this.heat = 0.25;
    this.tick = 0;
    this.slowmoTimer = 0;
    this.started = false;
    this.fighters = [this.makeFighter(config.p1, 'p1'), this.makeFighter(config.p2, 'p2')];
    this.fighters[0].pos = { x: -0.06, z: START_DISTANCE / 2 };
    this.fighters[1].pos = { x: 0.06, z: -START_DISTANCE / 2 };
    this.fighters[0].facing = Math.PI;
    this.fighters[1].facing = 0;
    this.judges = [
      { name: 'Juiz Almeida', bias: 0.0, scores: [0, 0], rounds: [] },
      { name: 'Juiz Tanaka', bias: 0.04, scores: [0, 0], rounds: [] },
      { name: 'Juiz Carter', bias: -0.04, scores: [0, 0], rounds: [] },
    ];
    this.roundDamage = [0, 0];
    this.punchRequests = { p1: null, p2: null };
    this.remoteInput = null;
    this.ai = { p1: config.ai1 ? new BoxingAI(this, 0, config.difficulty) : null, p2: config.ai2 ? new BoxingAI(this, 1, config.difficulty) : null };
    this.emit('intro');
  }

  makeFighter(def = {}, slot) {
    const attrs = def.attributes || {};
    const h = 100 + Math.round((attr(attrs, 'conditioning') - 50) * 0.35);
    return {
      id: slot,
      def,
      isPlayer: !!def.isPlayer,
      name: def.name || (slot === 'p1' ? 'Lutador 1' : 'Lutador 2'),
      nick: def.nick || '',
      style: def.style || 'technical',
      attributes: attrs,
      appearance: def.appearance || null,
      hp: h, maxHp: h,
      stamina: 100, maxStamina: 100,
      guard: 100,
      pos: { x: 0, z: 0 },
      facing: slot === 'p1' ? Math.PI : 0,
      vx: 0, vz: 0,
      moveX: 0, moveZ: 0,
      blocking: false,
      blockingTime: 0,
      action: null,
      cooldown: 0,
      stun: 0,
      dodge: { active: false, time: 0, dir: 1, cooldown: 0 },
      counterWindow: 0,
      lastCounterAt: -10,
      knockdowns: 0,
      down: null,
      combo: 0,
      lastHitAt: -10,
      stats: { thrown: 0, landed: 0, damage: 0, blocks: 0, dodges: 0, counters: 0, maxCombo: 0, jabs: 0, power: 0, distance: 0 },
      roundDamage: 0,
      scorecards: [],
      hurtFlash: 0,
      expression: 'neutral',
      tauntCd: 4,
      victory: false,
      defeated: false,
      aiCooldown: 0.4 + Math.random() * 0.3,
    };
  }

  start() {
    if (this.started) return;
    this.started = true;
    this.phase = 'fight';
    this.phaseTime = 0;
    this.emit('bell');
    this.emit('roundStart', { round: 1 });
  }

  update(dt, inputs = {}) {
    if (!this.started) return;
    this.tick++;
    const scaled = dt * this.timeScale;
    this.phaseTime += scaled;
    for (const f of this.fighters) {
      f.cooldown = Math.max(0, f.cooldown - scaled);
      f.stun = Math.max(0, f.stun - scaled);
      f.dodge.cooldown = Math.max(0, f.dodge.cooldown - scaled);
      f.dodge.time = Math.max(0, f.dodge.time - scaled);
      if (f.dodge.time <= 0) f.dodge.active = false;
      f.counterWindow = Math.max(0, f.counterWindow - scaled);
      f.hurtFlash = Math.max(0, f.hurtFlash - scaled);
      f.tauntCd = Math.max(0, f.tauntCd - scaled);
    }
    if (this.slowmoTimer > 0) {
      this.slowmoTimer -= dt;
      if (this.slowmoTimer <= 0) this.timeScale = 1;
    }

    if (this.phase === 'fight') {
      this.updateFight(scaled, inputs);
    } else if (this.phase === 'knockdown') {
      this.updateKnockdown(scaled, inputs);
    } else if (this.phase === 'roundEnd') {
      if (this.phaseTime > 3.0) this.nextRound();
    } else if (this.phase === 'ko') {
      if (this.phaseTime > 4.2) this.finishKo();
    }
  }

  updateFight(dt, inputs) {
    this.clock -= dt;
    const p1In = this.normalizeInput(inputs.p1, 'p1');
    const p2In = this.normalizeInput(inputs.p2, 'p2');
    // AI overrides its slot.
    const a0 = this.ai.p1 ? this.ai.p1.think(dt) : null;
    const a1 = this.ai.p2 ? this.ai.p2.think(dt) : null;
    const in0 = a0 || p1In;
    const in1 = a1 || p2In;
    this.punchRequests.p1 = in0?.punch || null;
    this.punchRequests.p2 = in1?.punch || null;
    this.stepFighter(this.fighters[0], in0, this.fighters[1], dt);
    this.stepFighter(this.fighters[1], in1, this.fighters[0], dt);
    this.separate();
    this.updateHeat(dt);

    if (this.clock <= 0) {
      this.clock = 0;
      this.endRound();
    }
  }

  normalizeInput(input, slot) {
    const base = { moveX: 0, moveZ: 0, block: false, dodge: false, punch: null };
    if (!input) return base;
    return {
      moveX: clamp(input.moveX || 0, -1, 1),
      moveZ: clamp(input.moveZ || 0, -1, 1),
      block: !!input.block,
      dodge: !!input.dodge,
      punch: input.punch || null,
    };
  }

  setRemoteInput(input) {
    this.remoteInput = input;
    this.remoteInputTime = performance.now();
  }

  stepFighter(f, input, opp, dt) {
    if (!f || !opp) return;
    f.moveX = input.moveX;
    f.moveZ = input.moveZ;
    f.blocking = input.block && !f.action && !f.dodge.active && f.stun <= 0;
    f.expression = f.stun > 0 ? 'hurt' : f.stamina < 25 ? 'tired' : f.action ? 'focused' : 'neutral';

    if (f.stun > 0) {
      f.blocking = false;
      this.applyMovement(f, opp, 0, 0, dt, true);
      return;
    }

    // Dodge
    if (input.dodge && !f.dodge.active && f.dodge.cooldown <= 0 && f.stamina > 8 && !f.action) {
      f.dodge.active = true;
      f.dodge.time = 0.36;
      f.dodge.dir = Math.abs(input.moveX) > 0.1 ? Math.sign(input.moveX) : (Math.random() < 0.5 ? -1 : 1);
      f.dodge.cooldown = 0.9;
      f.stamina = Math.max(0, f.stamina - 9);
      this.emit('dodge', { id: f.id, dir: f.dodge.dir });
    }

    if (f.dodge.active) {
      f.blocking = false;
      this.applyMovement(f, opp, f.dodge.dir * 1.8, 0, dt, true);
      // Grant counter timing in the back half of the dodge.
      if (f.dodge.time > 0.05 && f.dodge.time < 0.3) f.counterWindow = Math.max(f.counterWindow, 0.22);
      return;
    }

    // Start punch
    const req = this.punchRequests[f.id];
    if (req && PUNCHES[req] && !f.action && f.cooldown <= 0 && !f.blocking) {
      this.startPunch(f, opp, req);
    }

    // Advance punch
    if (f.action) {
      const act = f.action;
      act.time += dt;
      if (!act.resolved && act.time >= act.def.impactAt * act.def.dur) {
        act.resolved = true;
        this.resolvePunch(f, opp, act);
      }
      if (act.time >= act.def.dur) {
        f.action = null;
        f.cooldown = 0.08;
      }
      this.applyMovement(f, opp, input.moveX * 0.22, input.moveZ * 0.22, dt, false);
      return;
    }

    // Movement and stamina
    if (!f.blocking) {
      this.applyMovement(f, opp, input.moveX, input.moveZ, dt, false);
    } else {
      this.applyMovement(f, opp, input.moveX * 0.3, input.moveZ * 0.3, dt, false);
      f.blockingTime += dt;
      f.guard = Math.max(0, f.guard - dt * 1.4);
      if (f.guard <= 0) {
        f.stun = Math.max(f.stun, 1.1);
        f.guard = 12;
        f.blocking = false;
        this.emit('guardBreak', { id: f.id });
      }
    }

    // Stamina economy
    const moving = Math.abs(input.moveX) + Math.abs(input.moveZ) > 0.15;
    const cond = attr(f.attributes, 'conditioning', 55);
    const regen = (f.blocking ? 2.2 : moving ? 3.6 : 5.4) * (0.7 + cond / 160);
    if (!f.action) f.stamina = Math.min(f.maxStamina, f.stamina + regen * dt);
    if (!f.blocking) f.guard = Math.min(100, f.guard + dt * 7);
    if (f.stamina <= 0.5) f.expression = 'tired';

    // Reset combo
    if (this.timeSinceHit(f, opp) > 1.6 && f.combo > 0) f.combo = 0;
  }

  applyMovement(f, opp, x, z, dt, locked) {
    const dx = opp.pos.x - f.pos.x;
    const dz = opp.pos.z - f.pos.z;
    const dist = Math.max(0.001, Math.hypot(dx, dz));
    const dirx = dx / dist, dirz = dz / dist;
    const px = -dirz, pz = dirx;
    const mobility = attr(f.attributes, 'mobility', 55);
    const style = STYLE_BY_ID[f.style]?.modifiers || {};
    const fatigue = f.stamina < 25 ? 0.72 : 1;
    let speed = (1.45 + mobility / 100 * 1.0) * (style.speed || 1) * fatigue;
    if (locked) speed *= 1.3;
    if (f.blocking) speed *= 0.4;
    if (f.stun > 0) speed *= 0.2;
    f.vx = (dirx * z + px * x) * speed;
    f.vz = (dirz * z + pz * x) * speed;
    f.pos.x = clamp(f.pos.x + f.vx * dt, -RING_LIMIT, RING_LIMIT);
    f.pos.z = clamp(f.pos.z + f.vz * dt, -RING_LIMIT, RING_LIMIT);
    f.stats.distance += Math.hypot(f.vx * dt, f.vz * dt);
    const ndx = opp.pos.x - f.pos.x;
    const ndz = opp.pos.z - f.pos.z;
    f.facing = Math.atan2(ndx, ndz);
    f.distance = Math.hypot(ndx, ndz);
  }

  separate() {
    const [a, b] = this.fighters;
    const dx = b.pos.x - a.pos.x;
    const dz = b.pos.z - a.pos.z;
    const dist = Math.max(0.0001, Math.hypot(dx, dz));
    const min = 0.78;
    if (dist < min) {
      const push = (min - dist) / 2;
      const nx = dx / dist, nz = dz / dist;
      a.pos.x = clamp(a.pos.x - nx * push, -RING_LIMIT, RING_LIMIT);
      a.pos.z = clamp(a.pos.z - nz * push, -RING_LIMIT, RING_LIMIT);
      b.pos.x = clamp(b.pos.x + nx * push, -RING_LIMIT, RING_LIMIT);
      b.pos.z = clamp(b.pos.z + nz * push, -RING_LIMIT, RING_LIMIT);
    }
    a.facing = Math.atan2(b.pos.x - a.pos.x, b.pos.z - a.pos.z);
    b.facing = Math.atan2(a.pos.x - b.pos.x, a.pos.z - b.pos.z);
  }

  startPunch(f, opp, type) {
    const def = PUNCHES[type];
    if (!def || f.stamina < def.stamina * 0.6) return false;
    f.action = { type, def, time: 0, resolved: false, counter: f.counterWindow > 0 };
    f.stamina = Math.max(0, f.stamina - def.stamina);
    f.stats.thrown++;
    if (def.hand === 'L') f.stats.jabs++;
    else f.stats.power++;
    f.counterWindow = 0;
    this.emit('punch', { id: f.id, type, counter: f.action.counter });
    return true;
  }

  resolvePunch(attacker, defender, act) {
    const def = act.def;
    const dist = attacker.distance || Math.hypot(defender.pos.x - attacker.pos.x, defender.pos.z - attacker.pos.z);
    const reachBonus = (attr(attacker.attributes, 'mobility', 50) - 50) * 0.001;
    const maxRange = 1.48 + def.range + reachBonus + (attacker.attributes && attacker.attributes.reach ? 0 : 0);
    const stats = attacker.stats;
    const style = STYLE_BY_ID[attacker.style]?.modifiers || {};
    if (dist > maxRange) {
      this.emit('whiff', { id: attacker.id, type: act.type });
      return;
    }
    // Defensive states
    if (defender.dodge.active) {
      defender.stats.dodges++;
      defender.counterWindow = Math.max(defender.counterWindow, 0.65);
      attacker.stun = Math.max(attacker.stun, 0.22);
      attacker.combo = 0;
      this.emit('dodgeSuccess', { id: defender.id, attacker: attacker.id, type: act.type });
      return;
    }
    const precision = attr(attacker.attributes, 'precision', 55);
    const reflexes = attr(defender.attributes, 'reflexes', 55);
    const staminaPenalty = attacker.stamina < 20 ? 0.18 : 0;
    let hitChance = 0.70 + def.accuracy + (precision - reflexes) / 240 - staminaPenalty + (act.counter ? 0.16 : 0) + (defender.stun > 0 ? 0.2 : 0);
    if (defender.blocking) hitChance += 0.16;
    if (Math.random() > clamp(hitChance, 0.28, 0.97)) {
      attacker.combo = 0;
      this.emit('whiff', { id: attacker.id, type: act.type });
      return;
    }
    const strength = attr(attacker.attributes, 'strength', 55);
    const staminaFactor = clamp(0.55 + attacker.stamina / 110, 0.55, 1.15);
    let damage = def.damage * (0.72 + strength / 100 * 0.65) * staminaFactor * (0.9 + Math.random() * 0.2);
    damage *= style.power || 1;
    if (act.counter) damage *= 1.28;
    if (attacker.combo > 0) damage *= 1 + Math.min(0.24, attacker.combo * 0.035);
    if (defender.stun > 0) damage *= 1.2;
    const defense = attr(defender.attributes, 'defense', 55);
    damage *= 1 - clamp(defense / 100 * 0.34, 0, 0.38);

    const crit = Math.random() < 0.055 + precision / 1400;
    if (crit) damage *= 1.35;

    const target = Math.random() < 0.68 ? 'head' : 'body';
    defender.hurtFlash = 0.25;
    defender.combo = 0;
    attacker.lastHitAt = this.phaseTime;

    if (defender.blocking) {
      defender.stats.blocks++;
      const guardDmg = def.guardBreak * (0.72 + strength / 160);
      defender.guard = Math.max(0, defender.guard - guardDmg);
      const chip = damage * 0.17;
      defender.hp = Math.max(0, defender.hp - chip);
      defender.hurtFlash = 0.12;
      this.emit('block', { attacker: attacker.id, defender: defender.id, type: act.type, guard: defender.guard, damage: chip });
      if (defender.guard <= 0) {
        defender.stun = Math.max(defender.stun, 1.2);
        defender.blocking = false;
        defender.guard = 15;
        this.emit('guardBreak', { id: defender.id });
      }
      return;
    }

    damage = Math.max(1, Math.round(damage * 10) / 10);
    defender.hp = Math.max(0, defender.hp - damage);
    defender.stun = Math.max(defender.stun, def.stun * (0.8 + strength / 220));
    defender.stats.damage += damage;
    attacker.stats.landed++;
    attacker.stats.damage += damage;
    attacker.combo++;
    attacker.stats.maxCombo = Math.max(attacker.stats.maxCombo, attacker.combo);
    this.roundDamage[attacker.id === 'p1' ? 0 : 1] += damage;
    defender.roundDamage += damage;
    if (act.counter) attacker.stats.counters++;
    this.heat = Math.min(1, this.heat + 0.08 + damage / 80);
    this.emit(crit ? 'critical' : 'hit', {
      attacker: attacker.id, defender: defender.id, type: act.type, damage, crit,
      hp: defender.hp, stamina: defender.stamina, target,
    });
    if (defender.hp <= 0) {
      this.knockdown(defender, attacker);
    }
  }

  timeSinceHit(a, b) {
    return this.phaseTime - (a.lastHitAt || 0);
  }

  knockdown(fighter, opponent) {
    if (this.phase !== 'fight') return;
    fighter.knockdowns++;
    fighter.action = null;
    fighter.blocking = false;
    fighter.dodge.active = false;
    fighter.combo = 0;
    this.phase = 'knockdown';
    this.phaseTime = 0;
    this.down = {
      fighter, opponent, time: 0, count: 0, resolved: false, recovered: false,
      fallProgress: 0, taps: 0, playerCanTap: fighter.isPlayer || this.config.mode === 'multiplayer' && fighter.id === 'p2',
      maxKnockdowns: fighter.knockdowns >= 3,
    };
    opponent.stats.knockdowns = (opponent.stats.knockdowns || 0) + 1;
    this.emit('knockdown', { id: fighter.id, opponent: opponent.id, knockdowns: fighter.knockdowns, tko: this.down.maxKnockdowns });
    this.timeScale = this.down.maxKnockdowns ? 0.5 : 0.62;
    this.slowmoTimer = 1.4;
  }

  updateKnockdown(dt, inputs) {
    const d = this.down;
    if (!d) return;
    d.time += dt;
    d.fallProgress = Math.min(1, d.time / 0.9);
    if (d.playerCanTap && inputs) {
      const inBox = d.fighter.id === 'p1' ? inputs.p1 : inputs.p2;
      if (inBox?.getUp) d.taps++;
      if (this.remoteInput?.getUp && d.fighter.id === 'p2') d.taps++;
    }
    const count = Math.min(10, Math.floor(d.time / 0.55) + 1);
    if (count !== d.count) {
      d.count = count;
      this.emit('count', { count, id: d.fighter.id });
      if (count === 8 && !d.resolved) {
        d.resolved = true;
        const recovery = attr(d.fighter.attributes, 'recovery', 55);
        let chance = 0.36 + recovery / 240 - d.fighter.knockdowns * 0.11;
        chance += Math.min(0.28, d.taps * 0.06);
        if (d.maxKnockdowns) chance = 0;
        d.recovered = Math.random() < clamp(chance, 0, 0.78);
        if (d.recovered) {
          d.fighter.hp = Math.round(d.fighter.maxHp * 0.30);
          d.fighter.stamina = Math.max(30, d.fighter.stamina);
          d.fighter.stun = 0.8;
          d.fighter.guard = 45;
          d.opponent.stamina = Math.max(0, d.opponent.stamina - 6);
          this.emit('getUp', { id: d.fighter.id, taps: d.taps });
        }
      }
    }
    if ((d.resolved && !d.recovered && count >= 9) || count >= 10) {
      const isTko = d.fighter.knockdowns >= 3 || d.opponent.stats.landed - d.opponent.stats.blocks > 0 && d.maxKnockdowns;
      this.endFight({
        winnerId: d.opponent.id,
        loserId: d.fighter.id,
        method: isTko ? 'TKO' : 'KO',
        round: this.round,
        time: Math.max(0, this.clock),
      });
      this.phase = 'ko';
      this.phaseTime = 0;
      this.timeScale = 0.5;
      this.emit('ko', { winner: d.opponent.id, loser: d.fighter.id, method: isTko ? 'TKO' : 'KO' });
      return;
    }
    if (d.recovered && d.time > 6.0) {
      this.phase = 'fight';
      this.phaseTime = 0;
      this.clock = Math.max(6, this.clock);
      this.timeScale = 1;
      this.down = null;
      this.emit('bell');
      this.emit('resume', {});
    }
  }

  endRound() {
    if (this.phase !== 'fight') return;
    this.phase = 'roundEnd';
    this.phaseTime = 0;
    this.emit('bell');
    // Judges score the round
    const [a, b] = this.fighters;
    const dmgA = this.roundDamage[0] + a.knockdowns * 8;
    const dmgB = this.roundDamage[1] + b.knockdowns * 8;
    for (const j of this.judges) {
      let winner = dmgA === dmgB ? 0 : dmgA > dmgB ? 1 : -1;
      if (winner !== 0 && Math.random() < Math.abs(j.bias)) winner *= -1;
      let scoreA = 10, scoreB = 10;
      if (winner === 1) scoreB = 9;
      if (winner === -1) scoreA = 9;
      if (winner !== 0 && Math.random() < 0.04) { scoreA = 10; scoreB = 10; winner = 0; }
      const knocked = winner === 1 ? (b.knockdowns > 0) : (a.knockdowns > 0);
      if (knocked && winner !== 0) scoreB = winner === 1 ? 8 : scoreB;
      if (knocked && winner === -1) scoreA = 8;
      j.scores[0] += scoreA;
      j.scores[1] += scoreB;
      j.rounds.push({ round: this.round, a: scoreA, b: scoreB, winner });
    }
    a.scorecards.push({ round: this.round, dmg: dmgA });
    b.scorecards.push({ round: this.round, dmg: dmgB });
    this.emit('roundEnd', { round: this.round, damage: [...this.roundDamage], scores: this.judges.map((j) => [...j.scores]) });
    // Recovery between rounds
    for (const f of this.fighters) {
      const rec = attr(f.attributes, 'recovery', 55);
      f.hp = Math.min(f.maxHp, f.hp + 5 + rec * 0.075);
      f.stamina = Math.min(f.maxStamina, f.stamina + 18 + rec * 0.24);
      f.guard = Math.min(100, f.guard + 35);
      f.stun = 0;
      f.combo = 0;
      f.knockdowns = Math.max(0, f.knockdowns);
    }
    this.roundDamage = [0, 0];
  }

  nextRound() {
    if (this.round >= this.config.rounds) {
      this.decision();
      return;
    }
    this.round++;
    this.phase = 'fight';
    this.phaseTime = 0;
    this.clock = this.config.roundTime;
    this.timeScale = 1;
    this.emit('roundStart', { round: this.round });
    this.emit('bell');
  }

  decision() {
    const [a, b] = this.fighters;
    const totals = this.judges.map((j) => ({ a: j.scores[0], b: j.scores[1] }));
    let aWins = 0, bWins = 0, draws = 0;
    for (const t of totals) {
      if (t.a > t.b) aWins++;
      else if (t.b > t.a) bWins++;
      else draws++;
    }
    let winnerId = null;
    let method = 'DEC';
    if (aWins > bWins) winnerId = 'p1';
    else if (bWins > aWins) winnerId = 'p2';
    else {
      // Tiebreak by damage + knockdowns
      const scoreA = a.stats.damage + a.knockdowns * 12 + a.stats.landed * 0.5;
      const scoreB = b.stats.damage + b.knockdowns * 12 + b.stats.landed * 0.5;
      if (Math.abs(scoreA - scoreB) < 2) method = 'DRAW';
      else winnerId = scoreA > scoreB ? 'p1' : 'p2';
    }
    const unanimous = method === 'DEC' && (aWins === 3 || bWins === 3);
    this.endFight({
      winnerId,
      loserId: winnerId ? (winnerId === 'p1' ? 'p2' : 'p1') : null,
      method: method === 'DRAW' ? 'DRAW' : 'DEC',
      decisionType: unanimous ? 'UNÂNIME' : 'DIVISÃO',
      round: this.config.rounds,
      time: 0,
      scorecards: totals,
    });
    this.emit('decision', { result: this.result });
  }

  finishKo() {
    if (this.result) {
      this.phase = 'end';
      this.timeScale = 1;
      this.finished = true;
      this.emit('end', this.result);
    }
  }

  endFight(result) {
    if (this.result) return;
    const winner = this.fighters.find((f) => f.id === result.winnerId);
    const loser = this.fighters.find((f) => f.id === result.loserId);
    const totalA = this.judges.reduce((s, j) => s + j.scores[0], 0);
    const totalB = this.judges.reduce((s, j) => s + j.scores[1], 0);
    this.result = {
      ...result,
      rounds: this.config.rounds,
      stats: {
        p1: { ...this.fighters[0].stats, hp: this.fighters[0].hp, maxHp: this.fighters[0].maxHp },
        p2: { ...this.fighters[1].stats, hp: this.fighters[1].hp, maxHp: this.fighters[1].maxHp },
      },
      totals: { p1: totalA, p2: totalB },
      scorecards: this.judges.map((j) => ({ judge: j.name, p1: j.scores[0], p2: j.scores[1], rounds: j.rounds })),
      winnerName: winner?.name || null,
      loserName: loser?.name || null,
      winnerId: result.winnerId,
      loserId: result.loserId,
      method: result.method,
      division: this.config.division,
      date: new Date().toISOString(),
      matchId: this.config.matchId || ('m' + Date.now().toString(36)),
    };
    if (winner) winner.victory = true;
    if (loser) loser.defeated = true;
    this.timeScale = 1;
    this.phase = this.phase === 'ko' ? 'ko' : 'end';
    if (this.phase === 'end') this.finished = true;
    this.emit('result', this.result);
    if (this.phase === 'end') this.emit('end', this.result);
  }

  quit(fighterId = 'p1') {
    if (this.result) return;
    const other = fighterId === 'p1' ? 'p2' : 'p1';
    this.endFight({ winnerId: other, loserId: fighterId, method: 'QUIT', round: this.round, time: Math.max(0, this.clock) });
    this.phase = 'end';
    this.finished = true;
    this.emit('end', this.result);
  }

  joinGetUp() {
    if (this.phase === 'knockdown' && this.down) this.down.taps += 1;
  }

  updateHeat(dt) {
    const [a, b] = this.fighters;
    const activity = (a.combo + b.combo) * 0.05 + (100 - Math.min(a.hp, b.hp)) / 300;
    this.heat = clamp(this.heat + (activity - this.heat) * dt * 0.6, 0.15, 1);
    this.timeScale = this.timeScale < 1 && this.slowmoTimer <= 0 ? 1 : this.timeScale;
  }

  emit(type, data = {}) {
    const ev = { type, time: this.phaseTime, round: this.round, ...data };
    this.events.push(ev);
    if (this.onEvent) this.onEvent(ev);
    if (this.events.length > 300) this.events.shift();
  }

  drainEvents() {
    const e = this.events;
    this.events = [];
    return e;
  }

  getSnapshot() {
    return {
      t: this.tick,
      phase: this.phase,
      started: this.started,
      clock: this.clock,
      round: this.round,
      rounds: this.config.rounds,
      timeScale: this.timeScale,
      heat: this.heat,
      result: this.result,
      fighters: this.fighters.map((f) => ({
        id: f.id, pos: { ...f.pos }, facing: f.facing, hp: f.hp, maxHp: f.maxHp, stamina: f.stamina,
        guard: f.guard, blocking: f.blocking, action: f.action ? { type: f.action.type, time: f.action.time, dur: f.action.def.dur } : null,
        stun: f.stun, dodge: { ...f.dodge }, knockdowns: f.knockdowns, combo: f.combo, expression: f.expression,
        victory: f.victory, defeated: f.defeated, hurtFlash: f.hurtFlash,
        down: this.down && this.down.fighter.id === f.id ? { fallProgress: this.down.fallProgress, count: this.down.count } : null,
      })),
      down: this.down ? { id: this.down.fighter.id, count: this.down.count, fallProgress: this.down.fallProgress, time: this.down.time } : null,
      judges: this.judges.map((j) => ({ scores: [...j.scores] })),
      stats: this.fighters.map((f) => ({ ...f.stats })),
    };
  }

  applySnapshot(s) {
    if (!s) return;
    this.phase = s.phase;
    this.started = s.started;
    this.clock = s.clock;
    this.round = s.round;
    this.timeScale = s.timeScale;
    this.heat = s.heat;
    this.tick = s.t;
    if (s.result && !this.result) {
      this.result = s.result;
      this.fighters.forEach((f, i) => {
        f.victory = !!s.fighters[i]?.victory;
        f.defeated = !!s.fighters[i]?.defeated;
      });
      this.emit('result', this.result);
    }
    if (this.fighters && s.fighters) {
      s.fighters.forEach((sf, i) => {
        const f = this.fighters[i];
        if (!f) return;
        Object.assign(f, {
          hp: sf.hp, maxHp: sf.maxHp, stamina: sf.stamina, guard: sf.guard, blocking: sf.blocking,
          stun: sf.stun, knockdowns: sf.knockdowns, combo: sf.combo, expression: sf.expression,
          victory: sf.victory, defeated: sf.defeated, hurtFlash: sf.hurtFlash, facing: sf.facing,
        });
        f.pos = { ...sf.pos };
        f.dodge = { ...sf.dodge };
        f.action = sf.action ? { type: sf.action.type, time: sf.action.time, def: PUNCHES[sf.action.type], resolved: true } : null;
        f.down = sf.down;
        f.netPos = { ...sf.pos };
      });
    }
    if (s.down) {
      const fighter = this.fighters.find((f) => f.id === s.down.id);
      this.down = { fighter, time: s.down.time, count: s.down.count, fallProgress: s.down.fallProgress, resolved: true, recovered: false };
    } else {
      this.down = null;
    }
    if (s.judges) s.judges.forEach((j, i) => { if (this.judges[i]) this.judges[i].scores = [...j.scores]; });
    if (s.stats) s.stats.forEach((st, i) => { if (this.fighters[i]) this.fighters[i].stats = { ...st }; });
    if (s.phase === 'end') this.finished = true;
  }
}

// ---------------------------------------------------------------------------
// AI
// ---------------------------------------------------------------------------
export class BoxingAI {
  constructor(engine, slot, difficulty = 'pro') {
    this.engine = engine;
    this.slot = slot;
    this.id = slot === 0 ? 'p1' : 'p2';
    this.me = () => engine.fighters[slot];
    this.opp = () => engine.fighters[1 - slot];
    const table = { rookie: 0.55, pro: 0.75, elite: 0.9, legend: 1.0 };
    this.skill = table[difficulty] ?? 0.78;
    this.input = { moveX: 0, moveZ: 0, block: false, dodge: false, punch: null, getUp: false };
    this.timer = 0.5 + Math.random() * 0.5;
    this.punchPlan = [];
    this.blockTimer = 0;
    this.dodgeTimer = 0;
    this.style = this.me().style;
    this.aggression = { aggressive: 0.92, defensive: 0.42, technical: 0.6, counter: 0.5, speed: 0.68, pressure: 0.95 }[this.style] ?? 0.65;
    this.personality = Math.random();
  }

  think(dt) {
    const me = this.me();
    const opp = this.opp();
    const input = this.input;
    input.punch = null;
    input.dodge = false;
    input.getUp = false;
    if (this.engine.phase === 'knockdown' && this.engine.down?.fighter === me) {
      input.getUp = Math.random() < this.skill * 0.7;
      return null;
    }
    if (this.engine.phase !== 'fight') return null;
    this.timer -= dt;
    this.blockTimer = Math.max(0, this.blockTimer - dt);
    this.dodgeTimer = Math.max(0, this.dodgeTimer - dt);
    const dist = me.distance || Math.hypot(opp.pos.x - me.pos.x, opp.pos.z - me.pos.z);
    const oppAttacking = !!opp.action;
    const myStamina = me.stamina;
    const oppHp = opp.hp / opp.maxHp;
    const myHp = me.hp / me.maxHp;

    // Reactive defence (reaction speed increases with difficulty/reflexes).
    const reaction = this.skill * (0.5 + (me.attributes.reflexes || 50) / 180);
    if (oppAttacking && Math.random() < reaction * 0.5 * dt * 18 && this.dodgeTimer <= 0) {
      const styleDodge = this.style === 'counter' || this.style === 'defensive' || this.style === 'speed';
      if (Math.random() < (styleDodge ? 0.55 : 0.3) && me.dodge.cooldown <= 0 && myStamina > 18) {
        input.dodge = true;
        this.dodgeTimer = 0.5;
        input.moveX = Math.random() < 0.5 ? -1 : 1;
        return null;
      }
      if (Math.random() < (styleDodge ? 0.5 : 0.66) && myStamina > 10) {
        this.blockTimer = 0.22 + Math.random() * 0.3;
      }
    }
    input.block = this.blockTimer > 0 && myStamina > 4;
    input.moveX = 0;
    input.moveZ = 0;

    if (myStamina < 16 && !input.block) {
      // Rest: circle away and guard.
      input.moveZ = -0.55;
      input.moveX = Math.sin(this.engine.phaseTime * 0.7) * 0.7;
      if (dist < 1.6) input.block = Math.random() < 0.5;
      if (dist > 2.3) input.moveZ = 0;
      return input;
    }

    // Range management based on style.
    const preferred = this.style === 'technical' ? 1.75 : this.style === 'counter' ? 1.8 : this.style === 'speed' ? 1.5 : this.style === 'defensive' ? 1.95 : 1.45;
    if (dist > preferred + 0.15) {
      input.moveZ = 0.55 + this.aggression * 0.45;
      input.moveX = Math.sin(this.engine.phaseTime * 0.9 + this.personality) * 0.3;
    } else if (dist < preferred - 0.22) {
      input.moveZ = -0.35 - (this.style === 'aggressive' ? -0.1 : 0.2);
      input.moveX = Math.sin(this.engine.phaseTime * 1.1) * 0.4;
    } else {
      input.moveX = Math.sin(this.engine.phaseTime * 0.55 + this.personality * 6) * 0.45;
    }

    // Combo plan
    if (this.punchPlan.length && this.timer <= 0) {
      input.punch = this.punchPlan.shift();
      this.timer = 0.16 + Math.random() * 0.2 + (1 - this.skill) * 0.2;
      return input;
    }

    if (this.timer <= 0) {
      const hurtOpp = oppHp < 0.35;
      const aggression = this.aggression * (0.8 + this.skill * 0.35) * (hurtOpp ? 1.3 : 1) * (myHp < 0.3 ? 0.8 : 1);
      this.timer = 0.3 + Math.random() * (0.6 - aggression * 0.3);
      if (dist < 2.1 && myStamina > 18 && Math.random() < aggression) {
        const roll = Math.random();
        let punch;
        if (dist > 1.85) punch = roll < 0.7 ? 'jab' : 'cross';
        else if (dist > 1.5) punch = roll < 0.4 ? 'jab' : roll < 0.7 ? 'cross' : 'hook';
        else punch = roll < 0.25 ? 'jab' : roll < 0.5 ? 'hook' : roll < 0.8 ? 'uppercut' : 'body';
        if (opp.blocking && Math.random() < 0.45) punch = 'body';
        if (opp.stun > 0) punch = 'uppercut';
        input.punch = punch;
        // Follow-up plan
        const chance = this.skill * (this.style === 'aggressive' || this.style === 'pressure' ? 0.7 : 0.45);
        if (Math.random() < chance) {
          this.punchPlan = [Math.random() < 0.5 ? 'cross' : 'hook'];
          if (this.style === 'pressure' && Math.random() < 0.4) this.punchPlan.push('body');
        }
        this.timer = 0.18 + Math.random() * 0.3;
      } else if (dist < 1.6 && myStamina > 25 && Math.random() < 0.3) {
        input.punch = 'uppercut';
        this.timer = 0.4;
      } else if (Math.random() < 0.25) {
        // reset / feint
        input.dodge = Math.random() < 0.2 && myStamina > 20;
      }
    }
    // Cornered escape
    if (Math.abs(me.pos.x) > 2.15 || Math.abs(me.pos.z) > 2.15) {
      input.moveX = -Math.sign(me.pos.x || 1) * 0.9;
      input.moveZ = -Math.sign(me.pos.z || 1) * 0.5;
    }
    return input;
  }
}

export function simulateQuickFight(p1, p2, { rounds = 3, seed = Date.now() } = {}) {
  // Used by "simular luta" and quick background fights. Deterministic-ish, no rendering.
  let hp1 = 100, hp2 = 100, st1 = 100, st2 = 100;
  let dmg1 = 0, dmg2 = 0;
  let kd1 = 0, kd2 = 0;
  let round = 1;
  let winner = null;
  let method = null;
  const rating1 = (p1.overall || 60) + (p1.style === 'aggressive' ? 1 : 0);
  const rating2 = (p2.overall || 60);
  const rnd = mulberry32Local(seed);
  for (round = 1; round <= rounds; round++) {
    let r = 0;
    while (r < 16) {
      r++;
      const aHits = rnd() < 0.52 + (rating1 - rating2) / 300;
      if (aHits) {
        const dmg = (3 + rnd() * 10) * (rating1 / rating2);
        hp2 -= dmg;
        dmg1 += dmg;
        st1 -= 3;
      } else {
        const dmg = (3 + rnd() * 10) * (rating2 / rating1);
        hp1 -= dmg;
        dmg2 += dmg;
        st2 -= 3;
      }
      if (hp2 <= 0) { hp2 = 0; winner = 'p1'; method = 'KO'; break; }
      if (hp1 <= 0) { hp1 = 0; winner = 'p2'; method = 'KO'; break; }
    }
    if (winner) break;
    // between-rounds recovery
    hp1 = Math.min(100, hp1 + 6 + (p1.attributes?.recovery || 50) * 0.05);
    hp2 = Math.min(100, hp2 + 6 + (p2.attributes?.recovery || 50) * 0.05);
    st1 = Math.min(100, st1 + 20);
    st2 = Math.min(100, st2 + 20);
  }
  if (!winner) {
    const score1 = dmg1 + (100 - hp1) * 0.3 + (rating1 - 60);
    const score2 = dmg2 + (100 - hp2) * 0.3 + (rating2 - 60);
    if (Math.abs(score1 - score2) < 4) { method = 'DRAW'; winner = null; }
    else { winner = score1 > score2 ? 'p1' : 'p2'; method = 'DEC'; round = rounds; }
  }
  return { winner, method, round, hp1, hp2, dmg1, dmg2, score1: dmg1, score2: dmg2 };
}

function mulberry32Local(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
