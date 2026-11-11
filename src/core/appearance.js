// Deterministic procedural appearance for any NPC fighter.
import { seeded, clamp } from './rng.js';
import { HAIR, BEARDS, BROWS, FACE_SHAPES, EYES, NOSES, MOUTHS, SCARS, SKIN_TONES, SHORTS, TOPS, SHOES, ROBES, GLOVES, COLORWAYS } from './data.js';

const TATTOOS = ['Nenhuma', 'Dragão', 'Coroa', 'Chama', 'Cobra', 'Asas', 'Estrela', 'Cruz', 'Leão', 'Tribal'];

export function appearanceForFighter(fighter, divisionId = 'middle') {
  if (!fighter) return randomAppearance('default');
  const rnd = seeded('look-' + fighter.id + (fighter.name || ''));
  const heavy = ['cruiser', 'heavy', 'lheavy'].includes(fighter.division || divisionId);
  const light = ['fly', 'bantam', 'feather'].includes(fighter.division || divisionId);
  const muscle = heavy ? rnd.range(0.55, 0.96) : light ? rnd.range(0.28, 0.7) : rnd.range(0.4, 0.88);
  const width = heavy ? rnd.range(0.58, 0.85) : light ? rnd.range(0.3, 0.58) : rnd.range(0.42, 0.7);
  const heightT = fighter.height ? clamp((fighter.height - 162) / 44, 0, 1) : rnd.range(0.2, 0.9);
  const reachT = fighter.reach ? clamp((fighter.reach - 168) / 30, 0, 1) : rnd.range(0.25, 0.85);
  const theme = rnd.int(0, COLORWAYS.length - 1);
  const shorts = SHORTS[rnd.int(0, SHORTS.length - 1)];
  const glove = GLOVES[rnd.int(0, GLOVES.length - 1)];
  return {
    skin: SKIN_TONES[rnd.int(0, SKIN_TONES.length - 1)].id,
    hair: HAIR[rnd.int(0, HAIR.length - 1)].id,
    beard: rnd.chance(0.55) ? BEARDS[rnd.int(0, BEARDS.length - 1)].id : 'none',
    brow: BROWS[rnd.int(0, BROWS.length - 1)].id,
    face: FACE_SHAPES[rnd.int(0, FACE_SHAPES.length - 1)].id,
    eyes: EYES[rnd.int(0, EYES.length - 1)].id,
    nose: NOSES[rnd.int(0, NOSES.length - 1)].id,
    mouth: MOUTHS[rnd.int(0, MOUTHS.length - 1)].id,
    scar: rnd.chance(0.45) ? SCARS[rnd.int(1, SCARS.length - 1)].id : 's0',
    height: heightT,
    reach: reachT,
    muscle,
    width,
    shorts: shorts.id,
    top: rnd.chance(0.14) ? TOPS[rnd.int(0, TOPS.length - 1)].id : 'none',
    shoe: SHOES[rnd.int(0, SHOES.length - 1)].id,
    robe: ROBES[rnd.int(0, ROBES.length - 1)].id,
    glove: glove.id,
    colorway: COLORWAYS[theme].id,
    wrap: rnd.chance(0.45) ? 'bandagem-tradicional' : 'none',
    headgear: 'none',
    medal: 'none',
    tattoo: TATTOOS[rnd.int(0, TATTOOS.length - 1)],
  };
}

export function randomAppearance(seed = 'default', divisionId = 'middle') {
  const rnd = seeded('random-look-' + seed);
  const muscle = rnd.range(0.35, 0.9);
  return {
    skin: SKIN_TONES[rnd.int(0, SKIN_TONES.length - 1)].id,
    hair: HAIR[rnd.int(0, HAIR.length - 1)].id,
    beard: rnd.chance(0.4) ? BEARDS[rnd.int(0, BEARDS.length - 1)].id : 'none',
    brow: BROWS[rnd.int(0, BROWS.length - 1)].id,
    face: FACE_SHAPES[rnd.int(0, FACE_SHAPES.length - 1)].id,
    eyes: EYES[rnd.int(0, EYES.length - 1)].id,
    nose: NOSES[rnd.int(0, NOSES.length - 1)].id,
    mouth: MOUTHS[rnd.int(0, MOUTHS.length - 1)].id,
    scar: SCARS[rnd.int(0, SCARS.length - 1)].id,
    height: rnd.range(0.2, 0.85),
    reach: rnd.range(0.25, 0.85),
    muscle,
    width: rnd.range(0.35, 0.75),
    shorts: SHORTS[rnd.int(0, SHORTS.length - 1)].id,
    top: 'none',
    shoe: SHOES[rnd.int(0, SHOES.length - 1)].id,
    robe: ROBES[rnd.int(0, ROBES.length - 1)].id,
    glove: GLOVES[rnd.int(0, GLOVES.length - 1)].id,
    colorway: COLORWAYS[rnd.int(0, COLORWAYS.length - 1)].id,
    wrap: rnd.chance(0.4) ? 'bandagem-tradicional' : 'none',
    headgear: 'none',
    medal: 'none',
    tattoo: TATTOOS[rnd.int(0, TATTOOS.length - 1)],
  };
}

export function appearanceForPlayer(save) {
  if (!save?.profile?.appearance) return randomAppearance('player');
  return { ...save.profile.appearance };
}
