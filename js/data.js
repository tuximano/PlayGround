export const CHARACTERS = [
  {
    id: 'pastel', num: 1, name: 'SARGENTO PASTEL', role: 'ESPECIALISTA EM CONFUSÃO', short: 'PASTEL',
    bio: 'Herói de três guerras e zero banhos. Dizem que seu colete à prova de balas é feito de pastel. Ninguém teve coragem de testar.',
    perk: '+10 COLETE', stats: { res: 80, caos: 95, hig: 18 },
    colors: { primary: '#7a6a37', secondary: '#414c2e', skin: '#c58d63', accent: '#d9ff43', hair: '#3b2a1c' },
    body: { height: 1.02, belly: 1.38, head: .82, arms: 1.05 },
    helmet: 'huge', face: 'mustache', accessory: 'flag'
  },
  {
    id: 'bochecha', num: 2, name: 'DONA BOCHECHA', role: 'AVÓ DE GUERRA', short: 'BOCHE',
    bio: 'A avó mais temida do batalhão. Já fez um general pedir desculpas e um tanque entrar na fila do café. Carrega balas de canela.',
    perk: '+8% VELOCIDADE', stats: { res: 62, caos: 88, hig: 72 },
    colors: { primary: '#a95777', secondary: '#5e3550', skin: '#e0aa86', accent: '#ffd36b', hair: '#c9c9c9' },
    body: { height: .82, belly: 1.52, head: 1.05, arms: .8 },
    helmet: 'headset', face: 'cheeks', accessory: 'scarf'
  },
  {
    id: 'trambique', num: 3, name: 'TENENTE TRAMBIQUE', role: 'OFICIAL SUSPEITO', short: 'TRAMB',
    bio: 'Nunca perdeu uma batalha. Nunca ganhou uma aposta. Usa um monóculo que encontrou no lixo e jura que é equipamento tático importado.',
    perk: 'RECARGA +10%', stats: { res: 58, caos: 77, hig: 55 },
    colors: { primary: '#405a72', secondary: '#26333f', skin: '#d9a57e', accent: '#e2c261', hair: '#1f1a16' },
    body: { height: 1.25, belly: .7, head: .8, arms: 1.22 },
    helmet: 'beret', face: 'monocle', accessory: 'medals'
  },
  {
    id: 'cebolinha', num: 4, name: 'CABO CEBOLINHA', role: 'ESPECIALISTA EM GRITAR', short: 'CEBOLA',
    bio: 'Fala "elma" e atira em tudo que se move. Foi promovido por acidente e agora ninguém consegue rebaixá-lo sem um formulário.',
    perk: 'CADÊNCIA +5%', stats: { res: 66, caos: 100, hig: 30 },
    colors: { primary: '#4e6a38', secondary: '#2f4023', skin: '#c88f66', accent: '#d9ff43', hair: '#4f8a35' },
    body: { height: .98, belly: .82, head: .92, arms: 1.02 },
    helmet: 'mohawk', face: 'buck', accessory: 'radio'
  },
  {
    id: 'manteiga', num: 5, name: 'MAJOR MANTEIGA', role: 'ESCORREGADIO CERTIFICADO', short: 'MANTEIGA',
    bio: 'Escorregou para dentro do exército e nunca saiu. Seu charme derrete qualquer interrogatório. Sua mira, infelizmente, também.',
    perk: '+15 VITALIDADE', stats: { res: 90, caos: 60, hig: 41 },
    colors: { primary: '#b4a044', secondary: '#746527', skin: '#e8bd8f', accent: '#fff1a6', hair: '#5e4a23' },
    body: { height: 1.05, belly: 1.25, head: .95, arms: .95 },
    helmet: 'bucket', face: 'shades', accessory: 'sandwich'
  },
  {
    id: 'dinamite', num: 6, name: 'DOUTOR DINAMITE', role: 'CIENTISTA NÃO LICENCIADO', short: 'DINAMITE',
    bio: 'Cientista que confunde bombas com cafeteiras. Sua tese "Explosivos e Você" foi aprovada com louvor e três laboratórios interditados.',
    perk: 'EXPLOSÕES MAIORES', stats: { res: 54, caos: 92, hig: 35 },
    colors: { primary: '#7a3c34', secondary: '#3b2522', skin: '#d5a17b', accent: '#ff7a3d', hair: '#e5ded0' },
    body: { height: 1.14, belly: .92, head: .85, arms: 1.12 },
    helmet: 'hazmat', face: 'goggles', accessory: 'dynamite'
  },
  {
    id: 'rabisco', num: 7, name: 'RECRUTA RABISCO', role: 'CARTÓGRAFO DUVIDOSO', short: 'RABISCO',
    bio: 'Desenha mapas que não existem e encontra atalhos que dão em paredes. Tem 19 anos, 45 mochilas e nenhum plano de aposentadoria.',
    perk: '+15% MUNIÇÃO', stats: { res: 60, caos: 85, hig: 24 },
    colors: { primary: '#4d5d90', secondary: '#2d3554', skin: '#b9825c', accent: '#48f2d2', hair: '#2a1e17' },
    body: { height: .88, belly: .78, head: 1.06, arms: .9 },
    helmet: 'cap', face: 'freckles', accessory: 'backpack'
  },
  {
    id: 'cupim', num: 8, name: 'CAPITÃO CUPIM', role: 'ESPECIALISTA EM MASCARAS', short: 'CUPIM',
    bio: 'Mascou a própria máscara de gás por acidente e agora vive dentro dela. Fala com sotaque de rádio quebrado. Ninguém entende, todos obedecem.',
    perk: '-10% DANO RECEBIDO', stats: { res: 96, caos: 70, hig: 9 },
    colors: { primary: '#5d4a37', secondary: '#35291d', skin: '#a87754', accent: '#c7a04a', hair: '#2a1c12' },
    body: { height: 1.0, belly: 1.2, head: .9, arms: 1.0 },
    helmet: 'gashelm', face: 'gas', accessory: 'tank'
  },
  {
    id: 'abacaxi', num: 9, name: 'AGENTE ABACAXI', role: 'ESPECIALISTA TROPICAL', short: 'ABACAXI',
    bio: 'Ninguém sabe de onde veio. Ninguém sabe para onde vai. Sabe-se apenas que o capacete é fruta de verdade e atrai muitas abelhas.',
    perk: '+5% VELOCIDADE E VIDA', stats: { res: 70, caos: 88, hig: 64 },
    colors: { primary: '#3f7752', secondary: '#254733', skin: '#b97b50', accent: '#e6d34a', hair: '#2c1d12' },
    body: { height: 1.18, belly: .88, head: .9, arms: 1.08 },
    helmet: 'pineapple', face: 'smile', accessory: 'shirt'
  },
  {
    id: 'mandioca', num: 10, name: 'MESTRE MANDIOCA', role: 'RAIZ DO ESQUADRÃO', short: 'MANDIOCA',
    bio: 'A raiz do esquadrão, no sentido literal. Dizem que sobreviveu a um cerco comendo o próprio capacete. O capacete era de palha.',
    perk: '+10 COLETE', stats: { res: 88, caos: 65, hig: 20 },
    colors: { primary: '#8b7a4c', secondary: '#594b2a', skin: '#c78a5b', accent: '#b9c26a', hair: '#d6c8a9' },
    body: { height: .96, belly: 1.32, head: .98, arms: .86 },
    helmet: 'straw', face: 'beard', accessory: 'pouch'
  },
  {
    id: 'pirulito', num: 11, name: 'PILOTO PIRULITO', role: 'AVIADOR DOCE', short: 'PIRULITO',
    bio: 'Voa baixo, voa doce e voa sem licença. Seu capacete é um pirulito gigante que ele mesmo fez. A torre tenta não fazer perguntas.',
    perk: 'MIRA +15% RÁPIDA', stats: { res: 56, caos: 82, hig: 51 },
    colors: { primary: '#a8495f', secondary: '#68303d', skin: '#db9f73', accent: '#ffcf5e', hair: '#1f1712' },
    body: { height: 1.08, belly: .82, head: .92, arms: 1.0 },
    helmet: 'lollipop', face: 'goggle', accessory: 'scarf'
  },
  {
    id: 'gizmo', num: 12, name: 'GENERAL GIZMO', role: '70% HUMANO, 30% SUCATA', short: 'GIZMO',
    bio: 'Setenta por cento humano, trinta por cento sucata e cem por cento hierarquia. Seu braço robótico já pediu aumento duas vezes.',
    perk: 'RECARGA +10%', stats: { res: 78, caos: 75, hig: 27 },
    colors: { primary: '#3d4f5e', secondary: '#222d36', skin: '#bd8561', accent: '#48f2d2', hair: '#3d3d3d' },
    body: { height: 1.1, belly: 1.0, head: .9, arms: 1.05 },
    helmet: 'cyborg', face: 'robot', accessory: 'epaulettes'
  }
];

export const WEAPONS = [
  {
    id: 'trovao', name: 'TROVÃO-47', type: 'FUZIL DE ASSALTO', category: 'FUSIL',
    damage: 28, rpm: 600, mag: 30, reserve: 150, spread: .016, recoil: .011, range: 85, reload: 2.1, pellets: 1, auto: true,
    mobility: 64, adsFov: 55, zoom: 1.3, desc: 'Equilíbrio absurdo entre dano, alcance e barulho. A arma oficial de quem não sabe escolher.',
    svg: '<svg viewBox="0 0 160 56"><path fill="currentColor" d="M8 25h24l6-8h45l8 5h26v10h-18l-5 5h-28l-9 8H38l-5-8H8z"/><path fill="currentColor" d="M70 32h10v14H70zM48 22h24v4H48zM104 27h25v3h-25z"/><rect x="122" y="23" width="14" height="7" fill="currentColor"/></svg>'
  },
  {
    id: 'vespa', name: 'VESPA-9', type: 'SUBMETRALHADORA', category: 'SMG',
    damage: 18, rpm: 920, mag: 36, reserve: 180, spread: .025, recoil: .008, range: 55, reload: 1.6, pellets: 1, auto: true,
    mobility: 82, adsFov: 62, zoom: 1.18, desc: 'Pequena, rápida e extremamente mal-educada. Cospe chumbo mais rápido do que pede desculpas.',
    svg: '<svg viewBox="0 0 160 56"><path fill="currentColor" d="M24 26h18l7-8h38l7 6h22v9h-18l-4 7H62l-8 9H37l-4-9H24z"/><path fill="currentColor" d="M77 31h11v16H77zM98 28h26v3H98z"/><rect x="123" y="24" width="10" height="6" fill="currentColor"/></svg>'
  },
  {
    id: 'bocarra', name: 'BOCARRA-12', type: 'ESPINGARDA', category: 'SHOTGUN',
    damage: 13, rpm: 95, mag: 6, reserve: 42, spread: .072, recoil: .028, range: 28, reload: 2.5, pellets: 8, auto: false,
    mobility: 58, adsFov: 65, zoom: 1.12, desc: 'Oito motivos para entrar em um cômodo primeiro. A distância ideal é "aqui".',
    svg: '<svg viewBox="0 0 160 56"><path fill="currentColor" d="M6 25h25l5-6h44l9 5h33v12h-31l-7 5H59l-7 9H38l-4-9H6z"/><path fill="currentColor" d="M58 30h14v18H58zM85 26h38v4H85z"/><rect x="121" y="25" width="17" height="8" fill="currentColor"/></svg>'
  },
  {
    id: 'cuspe', name: 'CUSPE-X', type: 'FUZIL DE PRECISÃO', category: 'SNIPER',
    damage: 96, rpm: 46, mag: 5, reserve: 30, spread: .0025, recoil: .04, range: 200, reload: 3.0, pellets: 1, auto: false,
    mobility: 42, adsFov: 28, zoom: 3.4, desc: 'Feita para resolver discussões a longa distância. O som chega depois da solução.',
    svg: '<svg viewBox="0 0 160 56"><path fill="currentColor" d="M5 27h30l4-6h39l6 5h38v8h-24l-6 6H63l-7 9H42l-4-9H5z"/><path fill="currentColor" d="M71 30h10v17H71zM101 22h18v10h-18zM109 17h8v5h-8z"/><rect x="123" y="25" width="24" height="6" fill="currentColor"/></svg>'
  }
];

export const SECONDARY = { id: 'pirulito9', name: 'PIRULITO-9', type: 'PISTOLA', damage: 24, rpm: 320, mag: 12, reserve: 72, spread: .012, recoil: .014, range: 45, reload: 1.4, pellets: 1, auto: false, mobility: 95, adsFov: 60, zoom: 1.2 };

export const SKINS = [
  { id: 'ferrugem', name: 'FERRUGEM', metal: '#6b4b35', accent: '#c37b45', dark: '#2a1d15', swatch: 'linear-gradient(135deg,#5b3e2c,#b46e3d 55%,#2a1d15)' },
  { id: 'neon', name: 'NEON', metal: '#162124', accent: '#48f2d2', dark: '#081011', swatch: 'linear-gradient(135deg,#0b1a1b,#48f2d2 55%,#0b1a1b)' },
  { id: 'acido', name: 'ÁCIDO', metal: '#202815', accent: '#d9ff43', dark: '#0d1208', swatch: 'linear-gradient(135deg,#161d0e,#d9ff43 55%,#161d0e)' },
  { id: 'sangue', name: 'SANGUE', metal: '#2a0f13', accent: '#ff3b4f', dark: '#0f0507', swatch: 'linear-gradient(135deg,#1b0a0d,#ff3b4f 55%,#1b0a0d)' },
  { id: 'ouro', name: 'OURO', metal: '#3b2f14', accent: '#e4bd58', dark: '#171207', swatch: 'linear-gradient(135deg,#2a210e,#e4bd58 55%,#171207)' }
];

export const MODES = {
  tdm: { id: 'tdm', name: 'MATA-MATA', short: '5v5', desc: 'Primeira equipe a atingir 25 abates vence.', limit: 25, team: true, timer: 300 },
  ffa: { id: 'ffa', name: 'TODOS CONTRA TODOS', short: '8', desc: 'Oito operadores. Um vencedor. Zero amizades.', limit: 15, team: false, timer: 300 },
  dom: { id: 'dom', name: 'DOMINAÇÃO', short: '3 ZONAS', desc: 'Capture e mantenha A, B e C. Cada zona gera pontos.', limit: 150, team: true, timer: 360 }
};

export const MAPS = [
  { id: 'cidade', name: 'CIDADE ABANDONADA', short: 'CIDADE', code: 'SETOR 07', theme: ['#4a3c30', '#b38256', '#d9ff43'], desc: 'Ruas rachadas, prédios vazios e carros esquecidos. Becos estreitos e rotas laterais para sumir do mapa.', size: 'MÉDIO', tag: 'URBANO' },
  { id: 'fabrica', name: 'FÁBRICA MALUCA', short: 'FÁBRICA', code: 'COMPLEXO 12', theme: ['#2a2921', '#8e774a', '#ff7a3d'], desc: 'Máquinas gigantes, tubulações quentes e tanques brilhantes. Cuidado com o que está borbulhando.', size: 'MÉDIO', tag: 'INDUSTRIAL' },
  { id: 'shopping', name: 'SHOPPING DESTRUÍDO', short: 'SHOPPING', code: 'CENTRO FALIDO', theme: ['#27212e', '#8a5f7e', '#ff3c9a'], desc: 'Lojas vazias, praça de alimentação intacta e um cinema que só passa filmes de terror. Neon por todo lado.', size: 'GRANDE', tag: 'INTERIOR' },
  { id: 'base', name: 'BASE MILITAR', short: 'BASE', code: 'FORTE BAIXADA', theme: ['#34382d', '#8c7a51', '#48b7ff'], desc: 'Contêineres coloridos, torres de observação e uma pista longa demais. O radar aponta para o lugar errado.', size: 'GRANDE', tag: 'MILITAR' },
  { id: 'bairro', name: 'BAIRRO BRASILEIRO', short: 'BAIRRO', code: 'VILA DO CAOS', theme: ['#3b3a2b', '#b06a4c', '#ffd23c'], desc: 'Casas coloridas, muros baixos e uma quadra onde todo mundo jura que só estava passando. Churrasco incluso.', size: 'MÉDIO', tag: 'TROPICAL' }
];

export function charById(id) { return CHARACTERS.find(c => c.id === id) || CHARACTERS[0]; }
export function weaponById(id) { return WEAPONS.find(w => w.id === id) || WEAPONS[0]; }
export function mapById(id) { return MAPS.find(m => m.id === id) || MAPS[0]; }
export function modeById(id) { return MODES[id] || MODES.tdm; }

export const TIPS = [
  'DICA: recarregar atrás de uma parede aumenta suas chances de continuar vivo.',
  'DICA: no ADS a mira fica mais precisa, mas você anda mais devagar.',
  'DICA: domine as três zonas para vencer no modo Dominação.',
  'DICA: um tiro na cabeça causa muito mais dano. Mire alto.',
  'DICA: o minimapa mostra inimigos que estão atirando.',
  'DICA: cada operador tem um pequeno bônus de combate. Teste todos.',
  'DICA: pular não te deixa mais rápido. Mas te faz parecer ocupado.',
  'DICA: a Bocarra-12 resolve qualquer discussão em ambientes fechados.'
];
