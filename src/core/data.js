// TG BOXING - static universe data and procedural catalogs.
import { seeded } from './rng.js';

export const GAME_TITLE = 'TG BOXING';
export const GAME_SUBTITLE = 'THE GLORY OF CHAMPIONS';
export const SAVE_KEY = 'tgboxing.save.v1';
export const SAVE_VERSION = 1;

export const DIVISIONS = [
  { id: 'fly', name: 'Peso-Mosca', en: 'Flyweight', min: 48, max: 51, color: '#38bdf8' },
  { id: 'bantam', name: 'Peso-Galo', en: 'Bantamweight', min: 51, max: 54, color: '#22d3ee' },
  { id: 'feather', name: 'Peso-Pena', en: 'Featherweight', min: 54, max: 57, color: '#34d399' },
  { id: 'light', name: 'Peso-Leve', en: 'Lightweight', min: 57, max: 61, color: '#a3e635' },
  { id: 'jwelter', name: 'Peso-Superleve', en: 'Junior Welterweight', min: 61, max: 64, color: '#facc15' },
  { id: 'welter', name: 'Peso-Meio-Médio', en: 'Welterweight', min: 64, max: 67, color: '#fb923c' },
  { id: 'middle', name: 'Peso-Médio', en: 'Middleweight', min: 67, max: 73, color: '#f97316' },
  { id: 'smedian', name: 'Peso-Supermédio', en: 'Super Middleweight', min: 73, max: 76, color: '#ef4444' },
  { id: 'lheavy', name: 'Peso-Meio-Pesado', en: 'Light Heavyweight', min: 76, max: 79, color: '#dc2626' },
  { id: 'cruiser', name: 'Peso-Cruzador', en: 'Cruiserweight', min: 79, max: 91, color: '#e11d48' },
  { id: 'heavy', name: 'Peso-Pesado', en: 'Heavyweight', min: 91, max: 130, color: '#f43f5e' },
];

export const DIVISION_BY_ID = Object.fromEntries(DIVISIONS.map((d) => [d.id, d]));

export const ORGS = [
  { id: 'tgb', name: 'TG Boxing Board', short: 'TGB', color: '#f2c14e', color2: '#8a5a12', motto: 'O conselho supremo do ringue.' },
  { id: 'gbu', name: 'Global Boxing Union', short: 'GBU', color: '#60a5fa', color2: '#1d4ed8', motto: 'Um cinturão. Um mundo.' },
  { id: 'wca', name: 'World Champions Alliance', short: 'WCA', color: '#34d399', color2: '#047857', motto: 'Onde lendas são forjadas.' },
];

export const BELT_TIERS = [
  { id: 'national', name: 'Cinturão Nacional', short: 'NACIONAL', prestige: 1, minRank: 12 },
  { id: 'continental', name: 'Cinturão Continental', short: 'CONTINENTAL', prestige: 2, minRank: 8 },
  { id: 'international', name: 'Cinturão Internacional', short: 'INTERNACIONAL', prestige: 3, minRank: 5 },
  { id: 'interim', name: 'Cinturão Interino', short: 'INTERINO', prestige: 4, minRank: 2 },
  { id: 'world', name: 'Cinturão Mundial', short: 'MUNDIAL', prestige: 5, minRank: 1 },
  { id: 'undisputed', name: 'Cinturão Absoluto', short: 'ABSOLUTO', prestige: 6, minRank: 1 },
  { id: 'supreme', name: 'Campeão dos Campeões', short: 'SUPREMO', prestige: 7, minRank: 1 },
];

export const STYLES = [
  { id: 'aggressive', name: 'Agressivo', desc: 'Pressão constante, combinações curtas e muita trocação.', color: '#ef4444', modifiers: { power: 1.08, speed: 0.96, defense: 0.94, stamina: 0.97, accuracy: 1.0 } },
  { id: 'defensive', name: 'Defensivo', desc: 'Guarda fechada, leitura do adversário e contra-ataques.', color: '#38bdf8', modifiers: { power: 0.96, speed: 0.98, defense: 1.12, stamina: 1.03, accuracy: 1.04 } },
  { id: 'technical', name: 'Técnico', desc: 'Precisão cirúrgica, distância perfeita e jab de mestre.', color: '#f2c14e', modifiers: { power: 1.0, speed: 1.02, defense: 1.05, stamina: 1.0, accuracy: 1.1 } },
  { id: 'counter', name: 'Contra-Atacante', desc: 'Esquiva e castiga o erro. Timing é tudo.', color: '#a78bfa', modifiers: { power: 1.06, speed: 1.0, defense: 1.08, stamina: 1.0, accuracy: 1.02 } },
  { id: 'speed', name: 'Velocista', desc: 'Mãos rápidas, pés mais rápidos ainda. Acerta e sai.', color: '#22d3ee', modifiers: { power: 0.92, speed: 1.16, defense: 1.0, stamina: 1.04, accuracy: 1.02 } },
  { id: 'pressure', name: 'Pressão', desc: 'Avança sem parar e sufoca o oponente nas cordas.', color: '#fb923c', modifiers: { power: 1.05, speed: 1.0, defense: 0.98, stamina: 1.1, accuracy: 0.97 } },
];

export const STYLE_BY_ID = Object.fromEntries(STYLES.map((s) => [s.id, s]));

export const ATTRIBUTES = [
  { id: 'strength', name: 'Força', short: 'FOR', icon: 'fist' },
  { id: 'speed', name: 'Velocidade', short: 'VEL', icon: 'bolt' },
  { id: 'stamina', name: 'Resistência', short: 'RES', icon: 'lungs' },
  { id: 'precision', name: 'Precisão', short: 'PRE', icon: 'target' },
  { id: 'defense', name: 'Defesa', short: 'DEF', icon: 'shield' },
  { id: 'reflexes', name: 'Reflexos', short: 'REF', icon: 'eye' },
  { id: 'mobility', name: 'Mobilidade', short: 'MOB', icon: 'feet' },
  { id: 'recovery', name: 'Recuperação', short: 'REC', icon: 'heart' },
  { id: 'conditioning', name: 'Condicionamento', short: 'CND', icon: 'flame' },
];

export const ATTR_BY_ID = Object.fromEntries(ATTRIBUTES.map((a) => [a.id, a]));

export const COUNTRIES = [
  { code: 'BRA', name: 'Brasil' }, { code: 'USA', name: 'Estados Unidos' }, { code: 'JPN', name: 'Japão' },
  { code: 'MEX', name: 'México' }, { code: 'PHI', name: 'Filipinas' }, { code: 'GBR', name: 'Reino Unido' },
  { code: 'ARG', name: 'Argentina' }, { code: 'RUS', name: 'Rússia' }, { code: 'NGA', name: 'Nigéria' },
  { code: 'ZAF', name: 'África do Sul' }, { code: 'AUS', name: 'Austrália' }, { code: 'FRA', name: 'França' },
  { code: 'ITA', name: 'Itália' }, { code: 'ESP', name: 'Espanha' }, { code: 'TUR', name: 'Turquia' },
  { code: 'KOR', name: 'Coreia do Sul' }, { code: 'THA', name: 'Tailândia' }, { code: 'CAN', name: 'Canadá' },
  { code: 'CUB', name: 'Cuba' }, { code: 'UKR', name: 'Ucrânia' }, { code: 'POL', name: 'Polônia' },
  { code: 'IRL', name: 'Irlanda' }, { code: 'GHA', name: 'Gana' }, { code: 'IDN', name: 'Indonésia' },
  { code: 'COL', name: 'Colômbia' }, { code: 'PRI', name: 'Porto Rico' }, { code: 'KAZ', name: 'Cazaquistão' },
  { code: 'MAR', name: 'Marrocos' }, { code: 'SWE', name: 'Suécia' }, { code: 'GER', name: 'Alemanha' },
];

export const COUNTRY_BY_CODE = Object.fromEntries(COUNTRIES.map((c) => [c.code, c]));

export const FIRST_NAMES = [
  'Diego', 'Marcus', 'Kenji', 'Rafael', 'Victor', 'Andre', 'Lucas', 'Mateus', 'Gabriel', 'Thiago',
  'Bruno', 'Caio', 'Eduardo', 'Felipe', 'Gustavo', 'Henrique', 'Igor', 'João', 'Kauã', 'Leandro',
  'Murilo', 'Nicolas', 'Otávio', 'Paulo', 'Renan', 'Samuel', 'Tales', 'Vinicius', 'Wesley', 'Yuri',
  'Tyson', 'Malik', 'Darius', 'Jamal', 'Xavier', 'Isaiah', 'Ezekiel', 'Amari', 'Kofi', 'Kwame',
  'Hiroshi', 'Takumi', 'Ryo', 'Sota', 'Haruto', 'Kaito', 'Daiki', 'Yuto', 'Sora', 'Ren',
  'Miguel', 'Alejandro', 'Javier', 'Carlos', 'Luis', 'Emilio', 'Santiago', 'Matias', 'Joaquin', 'Ramon',
  'Dmitri', 'Sergei', 'Ivan', 'Nikolai', 'Oleksandr', 'Viktor', 'Pavel', 'Andrei', 'Mikhail', 'Bogdan',
  'Liam', 'Conor', 'Declan', 'Sean', 'Owen', 'Callum', 'Rhys', 'Aiden', 'Kieran', 'Finn',
  'Omar', 'Karim', 'Yusuf', 'Tariq', 'Amir', 'Rashid', 'Idris', 'Hamza', 'Zane', 'Malachai',
  'Jin', 'Minho', 'Taeyang', 'Sunwoo', 'Jihoon', 'Arjun', 'Rohan', 'Vikram', 'Aditya', 'Rahul',
  'Kwesi', 'Chidi', 'Tunde', 'Kelechi', 'Mosi', 'Thabo', 'Sipho', 'Jomo', 'Kito', 'Ayo',
];

export const LAST_NAMES = [
  'Moreira', 'Carter', 'Takahashi', 'Santos', 'Williams', 'Silva', 'Costa', 'Almeida', 'Ferreira', 'Pereira',
  'Oliveira', 'Rocha', 'Ribeiro', 'Martins', 'Barbosa', 'Carvalho', 'Gomes', 'Araújo', 'Lima', 'Melo',
  'Thompson', 'Jackson', 'Harris', 'Robinson', 'Walker', 'Young', 'King', 'Wright', 'Banks', 'Foster',
  'Nakamura', 'Watanabe', 'Yamamoto', 'Kobayashi', 'Sato', 'Ito', 'Tanaka', 'Mori', 'Fujita', 'Ogawa',
  'Garcia', 'Lopez', 'Martinez', 'Rodriguez', 'Hernandez', 'Gonzalez', 'Vargas', 'Cruz', 'Ramirez', 'Flores',
  'Volkov', 'Petrov', 'Sokolov', 'Ivanov', 'Kovalenko', 'Bondarenko', 'Shevchenko', 'Morozov', 'Kuznetsov', 'Lebedev',
  'O\'Brien', 'MacGregor', 'Byrne', 'Doyle', 'Murphy', 'Gallagher', 'Nolan', 'Fitzgerald', 'Kelly', 'Brennan',
  'Hassan', 'Rahman', 'Khalid', 'Farouk', 'Nasser', 'Haddad', 'Saleh', 'Zahir', 'Rashid', 'Aziz',
  'Kim', 'Park', 'Lee', 'Choi', 'Jung', 'Kang', 'Shin', 'Yoon', 'Baek', 'Hwang',
  'Okafor', 'Mensah', 'Adeyemi', 'Ndlovu', 'Mbatha', 'Dlamini', 'Osei', 'Achebe', 'Diallo', 'Kamara',
];

export const NICKNAMES = [
  'The Beast', 'Iron Fist', 'The Storm', 'El Toro', 'Nightmare', 'A Fera', 'Mão de Pedra', 'O Furacão',
  'The Hammer', 'O Fantasma', 'The Cobra', 'Trovão', 'Blackout', 'O Predador', 'The Surgeon', 'Lâmina',
  'The Tank', 'O Muro', 'Lightning', 'Relâmpago', 'The Reaper', 'O Ceifador', 'Golden Boy', 'Menino de Ouro',
  'The Professor', 'O Professor', 'The Ghost', 'O Ciclone', 'Sandman', 'O Rei', 'The Butcher', 'O Carrasco',
  'El Diablo', 'The Rocket', 'Foguete', 'Iron Jaw', 'Mandíbula de Aço', 'The Viper', 'A Víbora', 'The Titan',
  'O Titã', 'Sugar', 'Açúcar', 'The Machine', 'A Máquina', 'Dynamite', 'Dinamite', 'The Wolf', 'O Lobo',
  'The Prince', 'O Príncipe', 'King', 'O Monarca', 'The Assassin', 'O Assassino', 'The Blade', 'A Navalha',
  'The Bull', 'O Touro', 'The Eagle', 'A Águia', 'The Shark', 'O Tubarão', 'The Phoenix', 'A Fênix',
  'The Samurai', 'O Samurai', 'The Dragon', 'O Dragão', 'The Panther', 'A Pantera', 'The Giant', 'O Gigante',
  'The Executioner', 'O Executor', 'The Silent', 'O Silencioso', 'The Showman', 'O Showman', 'The Wall', 'A Muralha',
  'The Kid', 'O Garoto', 'The Veteran', 'O Veterano', 'The Professor', 'The Saint', 'O Santo', 'The Outlaw',
  'O Fora da Lei', 'The Emperor', 'O Imperador', 'The Hurricane', 'The Tsunami', 'O Tsunami', 'The Volcano', 'O Vulcão',
  'The Diamond', 'O Diamante', 'The Sniper', 'O Sniper', 'The Monster', 'O Monstro', 'The Legend', 'A Lenda',
  'El Rayo', 'El Matador', 'El Cóndor', 'The Tiger', 'O Tigre', 'The Raging Bull', 'The Iceman', 'O Homem de Gelo',
];

export const TATTOO_NAMES = ['Nenhuma', 'Dragão', 'Coroa', 'Chama', 'Cobra', 'Asas', 'Estrela', 'Cruz', 'Leão', 'Tribal'];
export const HEADGEAR_NAMES = ['Nenhum', 'Clássico Preto', 'Vermelho Competição', 'Azul Amador', 'Dourado Elite', 'Branco Minimal'];
export const WRAP_NAMES = ['Nenhuma', 'Bandagem Tradicional', 'Bandagem de Competição', 'Bandagem Preta', 'Bandagem Ouro', 'Bandagem Vermelha'];
export const MEDAL_NAMES = ['Nenhuma', 'Medalha de Ouro', 'Medalha de Prata', 'Medalha de Bronze', 'Troféu Mini', 'Corrente de Campeão'];

const PALETTE_LIST = [
  ['#c1121f', '#f2c14e', '#f6f1e7'], ['#0f172a', '#f2c14e', '#e5e7eb'], ['#1d4ed8', '#e2e8f0', '#c1121f'],
  ['#047857', '#f2c14e', '#ecfdf5'], ['#7c3aed', '#f0abfc', '#111827'], ['#ea580c', '#111827', '#fef3c7'],
  ['#be123c', '#111827', '#fda4af'], ['#0e7490', '#f8fafc', '#22d3ee'], ['#f5f5f4', '#111827', '#dc2626'],
  ['#111827', '#dc2626', '#f5f5f4'], ['#b91c1c', '#fbbf24', '#450a0a'], ['#1e3a8a', '#facc15', '#f8fafc'],
  ['#312e81', '#a5b4fc', '#e0e7ff'], ['#166534', '#86efac', '#052e16'], ['#78350f', '#fcd34d', '#fffbeb'],
  ['#9d174d', '#f9a8d4', '#fff1f2'], ['#334155', '#94a3b8', '#f1f5f9'], ['#7f1d1d', '#fca5a5', '#1c1917'],
  ['#164e63', '#67e8f9', '#ecfeff'], ['#4c1d95', '#c4b5fd', '#f5f3ff'],
];
const PALETTE_NAMES = ['Sangue & Ouro', 'Meia-Noite', 'Azul Aço', 'Esmeralda', 'Neblina', 'Cobre', 'Rubi', 'Oceano', 'Marfim', 'Sombra', 'Fúria', 'Azul Real', 'Índigo', 'Mata', 'Âmbar', 'Rosa Choque', 'Grafite', 'Vinho', 'Gelo', 'Violeta'];
const DESIGN_NAMES = ['Clássico', 'Fita Dupla', 'Lateral', 'Corte V', 'Degradê', 'Xadrez', 'Estrelas', 'Diagonal', 'Onda', 'Camuflado', 'Anéis', 'Faixa', 'Pinstripe', 'Blocos', 'Chama', 'Geométrico', 'Coroa', 'Tricolor', 'Faísca', 'Retrô', 'Neon', 'Atlas', 'Campeão', 'Aço', 'Lenda', 'Monograma', 'Tribal', 'Brilho', 'Fusão', 'Titã', 'Prisma', 'Relâmpago', 'Mármore', 'Estádio', 'Global', 'Fogo', 'Gelo', 'Cósmico', 'Realeza', 'Destino'];
const COLOR_NAMES = ['Vermelho', 'Azul', 'Verde', 'Roxo', 'Laranja', 'Rosa', 'Ciano', 'Preto', 'Branco', 'Dourado', 'Prata', 'Bronze', 'Grafite', 'Marinho', 'Vinho', 'Turquesa', 'Limão', 'Coral', 'Lavanda', 'Areia'];

function makeColorways() {
  const out = [];
  for (let i = 0; i < 100; i++) {
    const pal = PALETTE_LIST[i % PALETTE_LIST.length];
    const variant = Math.floor(i / 20);
    const shift = variant % 3;
    const colors = [pal[shift], pal[(shift + 1) % 3], pal[(shift + 2) % 3]];
    out.push({
      id: `cw${i}`,
      name: `${PALETTE_NAMES[i % 20]} ${['I', 'II', 'III', 'IV', 'V'][variant]}`,
      colors,
      primary: colors[0],
      secondary: colors[1],
      accent: colors[2],
    });
  }
  return out;
}
export const COLORWAYS = makeColorways();
export const COLORWAY_BY_ID = Object.fromEntries(COLORWAYS.map((c) => [c.id, c]));

const HAIR_BASE = [
  { name: 'Buzz', shape: 'buzz' }, { name: 'Fade', shape: 'fade' }, { name: 'Afro', shape: 'afro' },
  { name: 'Cachos', shape: 'curls' }, { name: 'Longo', shape: 'long' }, { name: 'Moicano', shape: 'mohawk' },
  { name: 'Ponytail', shape: 'ponytail' }, { name: 'Tranças', shape: 'braids' }, { name: 'Slick Back', shape: 'slick' },
  { name: 'Espetado', shape: 'spiky' }, { name: 'Coque', shape: 'topknot' }, { name: 'Undercut', shape: 'undercut' },
  { name: 'Flat Top', shape: 'flat' }, { name: 'Dreads', shape: 'dreads' }, { name: 'Ondulado', shape: 'wavy' },
  { name: 'Raspado', shape: 'bald' }, { name: 'Lateral Longo', shape: 'sidepart' }, { name: 'Nuvem', shape: 'cloud' },
  { name: 'Samurai', shape: 'samurai' }, { name: 'Boxer Clássico', shape: 'classic' },
];
const HAIR_COLORS = ['#141014', '#2b1a12', '#4a2c1c', '#704a2e', '#a9713f', '#d8a86a', '#e8d3a8', '#b8b8b8', '#e8e8e8', '#8b1e1e', '#d4af37', '#4b2e83', '#1f6f5c', '#244a7a', '#b35c1e', '#7a2740', '#5c6b73', '#e6b7c8', '#2f4858', '#c9a0dc'];
const HAIR_VARIANTS = ['Clássico', 'Volume Máximo', 'Texturizado', 'Risco Lateral', 'Lâminas'];
const HAIR_NAMES = ['Corte'];
function makeHair() {
  const out = [];
  for (let i = 0; i < 100; i++) {
    const base = HAIR_BASE[i % 20];
    const variant = Math.floor(i / 20);
    const color = HAIR_COLORS[(i * 7 + variant) % HAIR_COLORS.length];
    out.push({
      id: `hair${i}`, name: `${base.name} ${HAIR_VARIANTS[variant]}`, short: base.name,
      shape: base.shape, color, variant,
      volume: 0.85 + variant * 0.14,
      shine: variant === 4,
    });
  }
  return out;
}
export const HAIR = makeHair();
export const HAIR_BY_ID = Object.fromEntries(HAIR.map((h) => [h.id, h]));

export const BEARDS = [
  { id: 'none', name: 'Nenhuma', shape: 'none' }, { id: 'stubble', name: 'Barba por Fazer', shape: 'stubble' },
  { id: 'goatee', name: 'Cavanhaque', shape: 'goatee' }, { id: 'mustache', name: 'Bigode', shape: 'mustache' },
  { id: 'full', name: 'Barba Cheia', shape: 'full' }, { id: 'chinstrap', name: 'Chinstrap', shape: 'chinstrap' },
  { id: 'chin', name: 'Barba de Queixo', shape: 'chin' }, { id: 'horseshoe', name: 'Ferradura', shape: 'horseshoe' },
  { id: 'walrus', name: 'Morsa', shape: 'walrus' }, { id: 'vandyke', name: 'Van Dyke', shape: 'vandyke' },
  { id: 'long', name: 'Barba Longa', shape: 'long' }, { id: 'mutton', name: 'Costeletas', shape: 'mutton' },
  { id: 'anchor', name: 'Âncora', shape: 'anchor' }, { id: 'bandholz', name: 'Bandholz', shape: 'bandholz' },
  { id: 'soul', name: 'Soul Patch', shape: 'soul' }, { id: 'circle', name: 'Barba Círculo', shape: 'circle' },
  { id: 'ducktail', name: 'Ducktail', shape: 'ducktail' }, { id: 'extended', name: 'Bigode Longo', shape: 'extended' },
  { id: 'balbo', name: 'Balbo', shape: 'balbo' }, { id: 'garibaldi', name: 'Garibaldi', shape: 'garibaldi' },
  { id: 'wizard', name: 'Mago', shape: 'wizard' }, { id: 'shortbox', name: 'Boxer Curta', shape: 'shortbox' },
  { id: 'imperial', name: 'Imperial', shape: 'imperial' }, { id: 'english', name: 'Inglês', shape: 'english' },
  { id: 'friendly', name: 'Friendly Mutton', shape: 'friendly' }, { id: 'hollywood', name: 'Hollywood', shape: 'hollywood' },
];

export const BROWS = [
  { id: 'b0', name: 'Natural' }, { id: 'b1', name: 'Grosso' }, { id: 'b2', name: 'Arqueado' }, { id: 'b3', name: 'Agressivo' },
  { id: 'b4', name: 'Fino' }, { id: 'b5', name: 'Cicatriz' }, { id: 'b6', name: 'Reto' }, { id: 'b7', name: 'Curto' },
  { id: 'b8', name: 'Falhado' }, { id: 'b9', name: 'Expressivo' }, { id: 'b10', name: 'Marcante' }, { id: 'b11', name: 'Suave' },
  { id: 'b12', name: 'Lâmina' }, { id: 'b13', name: 'Largo' }, { id: 'b14', name: 'Elevado' }, { id: 'b15', name: 'Caído' },
  { id: 'b16', name: 'Duplo' }, { id: 'b17', name: 'Desenhado' }, { id: 'b18', name: 'Selvagem' }, { id: 'b19', name: 'Campeão' },
];

export const FACE_SHAPES = [
  { id: 'oval', name: 'Oval' }, { id: 'square', name: 'Quadrado' }, { id: 'round', name: 'Redondo' },
  { id: 'long', name: 'Longo' }, { id: 'diamond', name: 'Diamante' }, { id: 'angular', name: 'Angular' },
  { id: 'heart', name: 'Coração' }, { id: 'wide', name: 'Largo' }, { id: 'narrow', name: 'Estreito' }, { id: 'sculpted', name: 'Esculpido' },
];

export const EYES = [
  { id: 'e0', name: 'Castanhos' }, { id: 'e1', name: 'Pretos' }, { id: 'e2', name: 'Azuis' }, { id: 'e3', name: 'Verdes' },
  { id: 'e4', name: 'Mel' }, { id: 'e5', name: 'Cinza' }, { id: 'e6', name: 'Âmbar' }, { id: 'e7', name: 'Avelã' },
  { id: 'e8', name: 'Gelo' }, { id: 'e9', name: 'Fogo' }, { id: 'e10', name: 'Escuros' }, { id: 'e11', name: 'Cristal' },
  { id: 'e12', name: 'Felino' }, { id: 'e13', name: 'Focados' },
];
export const NOSES = [
  { id: 'n0', name: 'Clássico' }, { id: 'n1', name: 'Largo' }, { id: 'n2', name: 'Fino' }, { id: 'n3', name: 'Adunco' },
  { id: 'n4', name: 'Quebrado' }, { id: 'n5', name: 'Curto' }, { id: 'n6', name: 'Longo' }, { id: 'n7', name: 'Achatado' },
  { id: 'n8', name: 'Grego' }, { id: 'n9', name: 'Romano' }, { id: 'n10', name: 'Lutador' }, { id: 'n11', name: 'Suave' },
];
export const MOUTHS = [
  { id: 'm0', name: 'Neutra' }, { id: 'm1', name: 'Séria' }, { id: 'm2', name: 'Sorridente' }, { id: 'm3', name: 'Firme' },
  { id: 'm4', name: 'Agressiva' }, { id: 'm5', name: 'Larga' }, { id: 'm6', name: 'Fina' }, { id: 'm7', name: 'Confiante' },
  { id: 'm8', name: 'Cansada' }, { id: 'm9', name: 'Determinada' }, { id: 'm10', name: 'Provocadora' }, { id: 'm11', name: 'Calma' },
  { id: 'm12', name: 'Grito' }, { id: 'm13', name: 'Sutil' },
];
export const SCARS = [
  { id: 's0', name: 'Nenhuma' }, { id: 's1', name: 'Sobrancelha' }, { id: 's2', name: 'Bochecha' }, { id: 's3', name: 'Queixo' },
  { id: 's4', name: 'Testa' }, { id: 's5', name: 'Nariz' }, { id: 's6', name: 'Guerreiro' }, { id: 's7', name: 'Dupla' },
  { id: 's8', name: 'Lábio' }, { id: 's9', name: 'Têmpora' }, { id: 's10', name: 'Olho' }, { id: 's11', name: 'Veterano' },
];

export const SKIN_TONES = [
  { id: 'sk0', name: 'Marfim', color: '#f5d6c2' }, { id: 'sk1', name: 'Porcelana', color: '#f1c9b0' },
  { id: 'sk2', name: 'Areia', color: '#e8bb98' }, { id: 'sk3', name: 'Mel', color: '#d99f72' },
  { id: 'sk4', name: 'Âmbar', color: '#c28558' }, { id: 'sk5', name: 'Bronze', color: '#a96b41' },
  { id: 'sk6', name: 'Cobre', color: '#92542f' }, { id: 'sk7', name: 'Castanha', color: '#7a4226' },
  { id: 'sk8', name: 'Mogno', color: '#62341e' }, { id: 'sk9', name: 'Ébano', color: '#4a2617' },
  { id: 'sk10', name: 'Noite', color: '#3a1d12' }, { id: 'sk11', name: 'Obsidiana', color: '#2b1510' },
  { id: 'sk12', name: 'Oliva', color: '#d6b27e' }, { id: 'sk13', name: 'Canela', color: '#b07a4d' },
  { id: 'sk14', name: 'Cacau', color: '#6c3d26' }, { id: 'sk15', name: 'Terracota', color: '#b96846' },
  { id: 'sk16', name: 'Dourado', color: '#c99a5f' }, { id: 'sk17', name: 'Gelo', color: '#f7e3d4' },
  { id: 'sk18', name: 'Rubro', color: '#8e4a33' }, { id: 'sk19', name: 'Escuro', color: '#33190f' },
];

function makeApparel(kind, count, models, patterns) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const model = models[i % models.length];
    const variant = Math.floor(i / models.length);
    const cw = COLORWAYS[(i * 11 + variant * 3) % COLORWAYS.length];
    const design = patterns[(i * 3 + variant) % patterns.length];
    out.push({
      id: `${kind}${i}`,
      name: `${model.name} ${['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][variant] || variant + 1}`,
      model: model.id,
      modelName: model.name,
      pattern: design,
      colors: cw.colors,
      colorway: cw.id,
      variant,
      detail: model.detail || 0,
    });
  }
  return out;
}

const SHORT_MODELS = [
  { id: 'classic', name: 'Clássico', detail: 0 }, { id: 'long', name: 'Longo', detail: 1 },
  { id: 'short', name: 'Curto', detail: 2 }, { id: 'high', name: 'Cintura Alta', detail: 3 },
  { id: 'split', name: 'Fenda Lateral', detail: 4 }, { id: 'satin', name: 'Cetim', detail: 5 },
  { id: 'taped', name: 'Fita de Campeão', detail: 6 }, { id: 'boxer', name: 'Boxer', detail: 7 },
  { id: 'muay', name: 'Competição', detail: 8 }, { id: 'retro', name: 'Retrô', detail: 9 },
  { id: 'pro', name: 'Pro Elite', detail: 10 }, { id: 'heritage', name: 'Heritage', detail: 11 },
];
const TOP_MODELS = [
  { id: 'tank', name: 'Regata' }, { id: 'sleeveless', name: 'Sem Manga' }, { id: 'compression', name: 'Compressão' },
  { id: 'loose', name: 'Solto' }, { id: 'crop', name: 'Crop' }, { id: 'hoodie', name: 'Moletom Sem Manga' },
  { id: 'jersey', name: 'Jersey' }, { id: 'tech', name: 'Tech' }, { id: 'vintage', name: 'Vintage' }, { id: 'mesh', name: 'Mesh' },
];
const SHOE_MODELS = [
  { id: 'boxing', name: 'Boxing Boot' }, { id: 'low', name: 'Low Top' }, { id: 'high', name: 'High Top' },
  { id: 'speed', name: 'Speed Lace' }, { id: 'classic', name: 'Classic Leather' }, { id: 'mesh', name: 'Mesh Pro' },
  { id: 'gold', name: 'Gold Edition' }, { id: 'retro', name: 'Retro 74' }, { id: 'mat', name: 'Mat Elite' }, { id: 'champ', name: 'Champion' },
];
const ROBE_MODELS = [
  { id: 'classic', name: 'Clássico' }, { id: 'hood', name: 'Capuz' }, { id: 'royal', name: 'Royal' },
  { id: 'satin', name: 'Cetim' }, { id: 'lux', name: 'Luxo' }, { id: 'warrior', name: 'Guerreiro' },
  { id: 'samurai', name: 'Samurai' }, { id: 'champ', name: 'Campeão' }, { id: 'minimal', name: 'Minimal' }, { id: 'legacy', name: 'Legacy' },
];
const GLOVE_MODELS = [
  { id: 'classic', name: 'Clássica' }, { id: 'pro', name: 'Pro Fight' }, { id: 'laced', name: 'Laced' },
  { id: 'velcro', name: 'Velcro' }, { id: 'compact', name: 'Compacta' }, { id: 'power', name: 'Power' },
  { id: 'speed', name: 'Speed' }, { id: 'heritage', name: 'Heritage' }, { id: 'elite', name: 'Elite' }, { id: 'custom', name: 'Custom' },
];
const PATTERNS = ['solid', 'stripe', 'dual', 'gradient', 'checker', 'stars', 'diagonal', 'vsplit', 'rings', 'flame', 'geo', 'wave'];

export const SHORTS = makeApparel('shorts', 100, SHORT_MODELS, PATTERNS);
export const TOPS = makeApparel('top', 100, TOP_MODELS, PATTERNS);
export const SHOES = makeApparel('shoe', 100, SHOE_MODELS, PATTERNS);
export const ROBES = makeApparel('robe', 100, ROBE_MODELS, PATTERNS);
export const GLOVES = makeApparel('glove', 100, GLOVE_MODELS, PATTERNS);

for (const [list, key] of [[SHORTS, 'shorts'], [TOPS, 'top'], [SHOES, 'shoe'], [ROBES, 'robe'], [GLOVES, 'glove']]) {
  list.forEach((item, i) => {
    item.name = `${item.modelName} ${COLOR_NAMES[(i * 5) % COLOR_NAMES.length]} ${['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][Math.floor(i / 10) % 10]}`;
    item.slot = key;
  });
}

export const CATALOGS = {
  hair: HAIR, beard: BEARDS, brow: BROWS, face: FACE_SHAPES, eyes: EYES, nose: NOSES, mouth: MOUTHS,
  scar: SCARS, skin: SKIN_TONES, shorts: SHORTS, top: TOPS, shoe: SHOES, robe: ROBES, glove: GLOVES, colorway: COLORWAYS,
};
export const byId = (list, id) => list.find((x) => x.id === id) || list[0];

export const ARENAS = [
  { id: 'neighborhood', name: 'Academia do Bairro', city: 'São Paulo, BRA', capacity: 320, tier: 1, accent: '#f59e0b', accent2: '#7c2d12', crowd: 0.28, roof: 'hall', mat: '#1a1a20', ropes: ['#dc2626', '#f5f5f4', '#2563eb'], fog: '#0b0a09', light: '#ffd9a0', intro: 'Onde todo campeão dá o primeiro passo.' },
  { id: 'municipal', name: 'Ginásio Municipal', city: 'Curitiba, BRA', capacity: 1800, tier: 1, accent: '#38bdf8', accent2: '#0c4a6e', crowd: 0.55, roof: 'hall', mat: '#172033', ropes: ['#2563eb', '#f5f5f4', '#dc2626'], fog: '#080c14', light: '#bfe3ff', intro: 'Arquibancadas lotadas, sonhos em jogo.' },
  { id: 'national', name: 'Arena Nacional', city: 'Rio de Janeiro, BRA', capacity: 12000, tier: 2, accent: '#22c55e', accent2: '#14532d', crowd: 0.75, roof: 'arena', mat: '#14251c', ropes: ['#facc15', '#16a34a', '#f5f5f4'], fog: '#07110b', light: '#d8ffe8', intro: 'A casa do boxe brasileiro.' },
  { id: 'tokyo', name: 'Ginásio Korakuen', city: 'Tóquio, JPN', capacity: 15000, tier: 3, accent: '#ef4444', accent2: '#450a0a', crowd: 0.82, roof: 'arena', mat: '#1d0f12', ropes: ['#dc2626', '#f5f5f4', '#dc2626'], fog: '#120608', light: '#ffe0d6', intro: 'Tradição, disciplina e trovões no ringue.' },
  { id: 'vegas', name: 'Neon Grand Arena', city: 'Las Vegas, USA', capacity: 20000, tier: 3, accent: '#a855f7', accent2: '#312e81', crowd: 0.9, roof: 'arena', mat: '#16102a', ropes: ['#a855f7', '#f2c14e', '#22d3ee'], fog: '#0a0714', light: '#e8d5ff', intro: 'As luzes mais brilhantes do mundo.' },
  { id: 'newyork', name: 'Empire Square Garden', city: 'Nova York, USA', capacity: 19500, tier: 3, accent: '#f97316', accent2: '#431407', crowd: 0.88, roof: 'arena', mat: '#1c100a', ropes: ['#f97316', '#f5f5f4', '#1d4ed8'], fog: '#100a06', light: '#ffe2c4', intro: 'O palco que transforma lutadores em lendas.' },
  { id: 'london', name: 'Royal Crown Hall', city: 'Londres, GBR', capacity: 17000, tier: 3, accent: '#eab308', accent2: '#422006', crowd: 0.84, roof: 'arena', mat: '#1c1608', ropes: ['#eab308', '#7f1d1d', '#f5f5f4'], fog: '#0d0a03', light: '#fff0c2', intro: 'Elegância, história e socos de aço.' },
  { id: 'mexico', name: 'Coliseo Azteca', city: 'Cidade do México, MEX', capacity: 22000, tier: 3, accent: '#22c55e', accent2: '#052e16', crowd: 0.93, roof: 'stadium', mat: '#0c2116', ropes: ['#16a34a', '#f5f5f4', '#dc2626'], fog: '#04120a', light: '#eafff0', intro: 'Um mar de gente. Um oceano de ruído.' },
  { id: 'manila', name: 'Thunder Dome Manila', city: 'Manila, PHI', capacity: 16000, tier: 2, accent: '#facc15', accent2: '#422006', crowd: 0.86, roof: 'arena', mat: '#241c06', ropes: ['#facc15', '#1d4ed8', '#f5f5f4'], fog: '#120d03', light: '#fff4c9', intro: 'Paixão tropical em cada assento.' },
  { id: 'berlin', name: 'Stahl Arena', city: 'Berlim, GER', capacity: 14000, tier: 2, accent: '#94a3b8', accent2: '#0f172a', crowd: 0.78, roof: 'hall', mat: '#121820', ropes: ['#64748b', '#dc2626', '#f5f5f4'], fog: '#070a0e', light: '#dfe9ff', intro: 'Engenharia, precisão e força bruta.' },
  { id: 'moscow', name: 'Iron Bear Coliseum', city: 'Moscou, RUS', capacity: 18000, tier: 3, accent: '#ef4444', accent2: '#1c1917', crowd: 0.85, roof: 'arena', mat: '#1a0e0e', ropes: ['#dc2626', '#f5f5f4', '#facc15'], fog: '#0d0505', light: '#ffdada', intro: 'Frio lá fora. Fogo aqui dentro.' },
  { id: 'dubai', name: 'Golden Sands Arena', city: 'Dubai, UAE', capacity: 25000, tier: 4, accent: '#f2c14e', accent2: '#78350f', crowd: 0.9, roof: 'stadium', mat: '#231a08', ropes: ['#f2c14e', '#f5f5f4', '#0f172a'], fog: '#120e04', light: '#fff1c1', intro: 'Ouro, suor e o topo do mundo.' },
  { id: 'underground', name: 'The Underground', city: 'Local sigiloso', capacity: 900, tier: 2, accent: '#f43f5e', accent2: '#1e1b4b', crowd: 0.6, roof: 'underground', mat: '#0b0a12', ropes: ['#f43f5e', '#312e81', '#f5f5f4'], fog: '#05040a', light: '#ff9eb0', intro: 'Sem regras para os fracos. Só para os fortes.' },
  { id: 'seoul', name: 'Seoul Cyber Dome', city: 'Seul, KOR', capacity: 21000, tier: 4, accent: '#22d3ee', accent2: '#164e63', crowd: 0.92, roof: 'arena', mat: '#06181c', ropes: ['#22d3ee', '#a855f7', '#f5f5f4'], fog: '#030d10', light: '#c8fbff', intro: 'O futuro do espetáculo em 360 graus.' },
  { id: 'champions', name: 'TG Coliseum of Champions', city: 'TG City', capacity: 40000, tier: 5, accent: '#f2c14e', accent2: '#7f1d1d', crowd: 1, roof: 'stadium', mat: '#160d0d', ropes: ['#f2c14e', '#c1121f', '#f5f5f4'], fog: '#0c0505', light: '#fff2cd', intro: 'O templo máximo. Onde a glória é eterna.' },
];
export const ARENA_BY_ID = Object.fromEntries(ARENAS.map((a) => [a.id, a]));

export const DIFFICULTIES = [
  { id: 'rookie', name: 'Estreante', desc: 'IA mais lenta e tolerante.', mult: 0.78, reward: 0.8 },
  { id: 'pro', name: 'Profissional', desc: 'Leitura de luta equilibrada.', mult: 1, reward: 1 },
  { id: 'elite', name: 'Elite', desc: 'Reflexos rápidos e punição implacável.', mult: 1.18, reward: 1.25 },
  { id: 'legend', name: 'Lenda', desc: 'A experiência de um campeão mundial.', mult: 1.38, reward: 1.6 },
];

export const SHOP_ITEMS = [
  { id: 'gear_bag', type: 'gym', slot: 'heavybag', name: 'Saco de Pancada Reforçado', price: 1200, desc: 'Treino de potência +4% de ganho.', boost: { strength: 0.04 }, icon: 'bag' },
  { id: 'gear_ring', type: 'gym', slot: 'ring', name: 'Ringue Profissional', price: 3500, desc: 'Sparring de elite +4% em todos os treinos.', boost: { all: 0.04 }, icon: 'ring' },
  { id: 'gear_speed', type: 'gym', slot: 'speed', name: 'Kit de Velocidade TG', price: 1800, desc: 'Treino de velocidade +5%.', boost: { speed: 0.05 }, icon: 'bolt' },
  { id: 'gear_recovery', type: 'gym', slot: 'recovery', name: 'Câmara de Recuperação', price: 2400, desc: 'Recuperação +5% entre rounds.', boost: { recovery: 0.05 }, icon: 'heart' },
  { id: 'gear_sparring', type: 'gym', slot: 'sparring', name: 'Sparring Partners', price: 2000, desc: 'Reflexos +4% no treino.', boost: { reflexes: 0.04 }, icon: 'people' },
  { id: 'boost_tape', type: 'training', name: 'Bandagem de Foco (fictícia)', price: 350, desc: 'Item de treino fictício: +8% de ganho em uma sessão.', consumable: true, icon: 'wrap' },
  { id: 'boost_recovery', type: 'training', name: 'Banho de Gelo TG (fictício)', price: 420, desc: 'Recupera energia e +6% de treino físico.', consumable: true, icon: 'ice' },
  { id: 'boost_mind', type: 'training', name: 'Treino Mental Elite (fictício)', price: 500, desc: 'Melhora leitura de luta por uma sessão.', consumable: true, icon: 'brain' },
  { id: 'cosmetic_gold', type: 'cosmetic', slot: 'glove', name: 'Luvas Ouro Absoluto', price: 800, coins: 200, desc: 'Visual lendário dourado.', cosmetic: true, icon: 'glove' },
  { id: 'cosmetic_medal', type: 'cosmetic', slot: 'medal', name: 'Medalha de Campeão', price: 600, coins: 120, desc: 'Sua história no peito.', cosmetic: true, icon: 'medal' },
  { id: 'robe_champ', type: 'cosmetic', slot: 'robe', name: 'Roupão dos Campeões', price: 1400, desc: 'Entrada de respeito.', cosmetic: true, icon: 'robe' },
  { id: 'coach_legend', type: 'staff', name: 'Coach "Mestre" Okada', price: 6000, desc: 'Treinador lendário: +7% em todos os atributos de treino.', boost: { all: 0.07 }, icon: 'coach' },
  { id: 'coach_speed', type: 'staff', name: 'Coach Ana "Relâmpago"', price: 3200, desc: 'Treinador de velocidade: +8% em velocidade e mobilidade.', boost: { speed: 0.08, mobility: 0.08 }, icon: 'coach' },
  { id: 'sponsor_local', type: 'sponsor', name: 'Patrocínio Academia Local', price: 2000, desc: 'Renda extra de 200 moedas por vitória.', icon: 'sponsor' },
  { id: 'sponsor_global', type: 'sponsor', name: 'Patrocínio TG Global', price: 9000, desc: 'Renda extra de 900 moedas e 20 TG por vitória.', icon: 'sponsor' },
  { id: 'belt_case', type: 'cosmetic', slot: 'gallery', name: 'Vitrine de Cinturões', price: 1800, desc: 'Sua galeria de troféus.', cosmetic: true, icon: 'belt' },
];

export const COACH_LINES = {
  idle: [
    'A base está firme. Agora quero ver a mão voltar mais rápido.',
    'Não é sobre bater forte. É sobre bater certo.',
    'O ringue é um espelho. Ele mostra quem você realmente é.',
    'Energia é seu bem mais valioso. Não desperdice nos primeiros rounds.',
    'Eu já vi campeões nascerem aqui. Estou vendo um agora?',
    'A guarda alta é o seu seguro de vida.',
  ],
  good: [
    'Isso! Foi limpo. De novo, mais rápido.',
    'Agora sim parece um lutador.',
    'Boa leitura. Você está começando a entender o jogo.',
    'O adversário sentiu essa. Mantenha a pressão.',
  ],
  bad: [
    'De novo. E dessa vez sem abaixar a guarda.',
    'Você está cansado ou com medo? Porque os dois perdem lutas.',
    'Foco. O ringue não perdoa distração.',
    'Mais uma vez. Devagar não ganha cinturão.',
  ],
  corner: [
    'Respire. Ele está cansado. Use o jab e não entre de cabeça.',
    'A mão dele cai depois do cruzado. É aí que você ataca.',
    'Guarda alta, queixo baixo. Ele está procurando o uppercut.',
    'Você venceu o round. Agora não devolva de graça.',
    'Ele está com a guarda aberta. Trabalhe o corpo e suba.',
  ],
};

export const NEWS_CATS = [
  { id: 'latest', name: 'Últimas' }, { id: 'results', name: 'Resultados' }, { id: 'transfers', name: 'Contratos' },
  { id: 'upcoming', name: 'Próximas Lutas' }, { id: 'title', name: 'Campeonatos' }, { id: 'rankings', name: 'Rankings' },
  { id: 'rivalries', name: 'Rivalidades' }, { id: 'records', name: 'Recordes' }, { id: 'interviews', name: 'Entrevistas' },
];

export const AWARD_TYPES = [
  { id: 'fighter', name: 'Lutador do Ano', icon: 'star' },
  { id: 'ko', name: 'Nocaute do Ano', icon: 'fist' },
  { id: 'fight', name: 'Melhor Luta do Ano', icon: 'fire' },
  { id: 'prospect', name: 'Revelação do Ano', icon: 'spark' },
  { id: 'champ', name: 'Melhor Campeão', icon: 'belt' },
  { id: 'streak', name: 'Melhor Sequência Invicta', icon: 'bolt' },
  { id: 'return', name: 'Melhor Retorno', icon: 'return' },
  { id: 'defense', name: 'Melhor Defesa de Cinturão', icon: 'shield' },
  { id: 'rivalry', name: 'Maior Rivalidade', icon: 'clash' },
  { id: 'coach', name: 'Melhor Treinador', icon: 'coach' },
];

export const ACHIEVEMENTS = [
  { id: 'first_win', name: 'Primeira Vitória', desc: 'Vença sua primeira luta.', icon: 'fist', coins: 100 },
  { id: 'first_ko', name: 'Nocauteador', desc: 'Vença por nocaute.', icon: 'ko', coins: 150 },
  { id: 'streak5', name: 'Imparável', desc: 'Alcance 5 vitórias seguidas.', icon: 'fire', coins: 250 },
  { id: 'title', name: 'Cinturão de Ouro', desc: 'Conquiste um cinturão.', icon: 'belt', coins: 500 },
  { id: 'world', name: 'Campeão Mundial', desc: 'Conquiste um cinturão mundial.', icon: 'globe', coins: 1000 },
  { id: 'top1', name: 'O Homem no Topo', desc: 'Alcance o topo do ranking.', icon: 'crown', coins: 800 },
  { id: 'ko10', name: 'Mãos de Trovão', desc: 'Alcance 10 nocautes na carreira.', icon: 'bolt', coins: 400 },
  { id: 'defend3', name: 'Dinastia', desc: 'Defenda um cinturão 3 vezes.', icon: 'shield', coins: 600 },
  { id: 'rich', name: 'Magnata', desc: 'Acumule 25.000 moedas.', icon: 'coin', coins: 300 },
  { id: 'traveler', name: 'Cidadão do Mundo', desc: 'Lute em 5 arenas diferentes.', icon: 'plane', coins: 300 },
  { id: 'undisputed', name: 'Absoluto', desc: 'Conquiste 3 cinturões mundiais.', icon: 'trophy', coins: 1500 },
  { id: 'legend', name: 'Lenda Viva', desc: 'Alcance reputação 100.', icon: 'legend', coins: 2000 },
];

export const QUOTES = {
  callout: [
    'Ele diz que é o melhor? Eu vou provar que é só conversa.',
    'Não vou deixar a luta chegar aos juízes. Acaba antes.',
    'Eu vi medo nos olhos dele. Isso já é meio caminho.',
    'Quando a campainha tocar, ele vai lembrar do meu nome para sempre.',
    'Ele pode correr, mas não pode se esconder do meu direto.',
    'Eu não vim para participar. Eu vim para dominar.',
  ],
  respectful: [
    'Respeito o adversário. Mas o cinturão vai para casa comigo.',
    'Será uma guerra. Estou pronto para cada segundo.',
    'Ele é duro. Eu também. Que vença o melhor.',
    'Não subestimo ninguém. Só não aceito perder.',
  ],
  win: [
    'O trabalho não acabou. Isso foi só o começo.',
    'Dedico essa vitória a todos que acreditaram em mim.',
    'Eu avisei. Ninguém acreditou. Agora sabem.',
    'Cada round foi uma declaração. E eu ainda estou escrevendo.',
  ],
  loss: [
    'Doeu. Mas eu vou voltar mais forte. Podem anotar.',
    'Não há desculpas. Ele foi melhor. Na próxima, serei eu.',
    'A derrota me ensinou mais do que qualquer vitória.',
    'Ainda não acabou. Eu vou buscar essa revanche.',
  ],
  coach: [
    'Esse garoto tem algo especial. Ele não recua diante da dor.',
    'Ainda precisa polir a defesa, mas o coração é de campeão.',
    'Eu treino campeões há 30 anos. Esse aqui me lembra por quê.',
    'Ele já venceu a luta mais difícil: a que acontece dentro da cabeça.',
  ],
};

export const ANNOUNCE_INTRO = [
  'Senhoras e senhores... o momento que todos esperavam!',
  'Uma noite de boxe. Um ringue. Dois guerreiros.',
  'Preparados... para o espetáculo?',
];

export const BROADCAST_NAMES = [
  { play: 'Rafael "Voz" Mendes', color: '#f2c14e' },
  { play: 'Sofia "Soco" Duarte', color: '#38bdf8' },
  { play: 'Kenji Mori', color: '#f97316' },
  { play: 'Andre "A Lenda" Barros', color: '#ef4444' },
];

export const CONTROL_DEFAULTS = {
  joystick: 128,
  opacity: 0.8,
  side: 'right',
  haptic: true,
  buttons: 132,
};

export const EVENT_NAMES = [
  'Noite de Glória', 'Fúria no Ringue', 'Choque de Titãs', 'Destino de Campeões', 'Sangue e Aço',
  'Trovão no Ringue', 'A Noite dos Gigantes', 'Arena em Chamas', 'Coração de Guerreiro', 'Último Round',
  'Rei da Noite', 'Impacto Mundial', 'Guerra Total', 'Além do Limite', 'O Rugido do Leão',
];

export const EVENT_PREFIX = ['TG FIGHT NIGHT', 'TG GOLDEN GLOVES', 'TG CHAMPIONS', 'TG WORLD SERIES', 'TG LEGACY'];

export function pickRandom(arr, rnd = Math.random) {
  return arr[Math.floor(rnd() * arr.length)];
}

export function generateName(rnd) {
  const first = FIRST_NAMES[Math.floor(rnd * FIRST_NAMES.length)];
  const last = LAST_NAMES[Math.floor(rnd * LAST_NAMES.length)];
  const nick = NICKNAMES[Math.floor(rnd * NICKNAMES.length)];
  return { first, last, nick };
}

export function formatMoney(n) {
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(Math.round(n || 0));
}

export function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '');
}
