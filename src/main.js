// TG BOXING boot: load persistence, generate the living universe, wire screens and start the loop.
import './ui/styles.css';
import { App } from './app.js';
import { UI, attachBusToasts } from './ui/shell.js';
import { loadSave, loadUniverseRaw, persist, setUniverse, bus } from './core/store.js';
import { ensureOffers } from './core/career.js';
import { createUniverse, seedNews } from './core/universe.js';
import { cleanCode } from './net/net.js';

import { menuScreen } from './ui/screens/menu.js';
import { createScreen } from './ui/screens/create.js';
import { editorScreen } from './ui/screens/editor.js';
import { careerScreen } from './ui/screens/career.js';
import { rankingsScreen } from './ui/screens/rankings.js';
import { newsScreen } from './ui/screens/news.js';
import { shopScreen } from './ui/screens/shop.js';
import { gymScreen } from './ui/screens/gym.js';
import { statsScreen } from './ui/screens/stats.js';
import { settingsScreen } from './ui/screens/settings.js';
import { multiplayerScreen } from './ui/screens/multiplayer.js';
import { fightScreen } from './ui/screens/fight.js';

const bootBar = document.getElementById('boot-bar');
const bootPhase = document.getElementById('boot-phase');
const bootScreen = document.getElementById('boot-screen');

function bootStep(label, pct) {
  if (bootPhase) bootPhase.textContent = label;
  if (bootBar) bootBar.style.width = `${pct}%`;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function boot() {
  bootStep('Acordando o universo', 8);
  await wait(50);

  const canvas = document.getElementById('game-canvas');
  if (!canvas) throw new Error('Canvas 3D não encontrado.');

  bootStep('Carregando arena e iluminação', 24);
  const app = new App(canvas);
  const ui = new UI(app);
  attachBusToasts(ui);

  let save = loadSave();

  bootStep('Gerando 1.100 lutadores', 46);
  await wait(30);
  let universe = loadUniverseRaw();
  if (!universe || !Array.isArray(universe.fighters) || universe.fighters.length < 100 || !universe.champions) {
    universe = createUniverse();
  }
  setUniverse(universe);

  app.boot({ save, universe });
  ui.save = save;
  ui.universe = universe;
  app.navigator = (screen, data) => ui.navigate(screen, data);

  if (save) {
    if (!save.career.news?.length) seedNews(save, universe, 14);
    ensureOffers(save, universe, 3);
    persist(save, true);
  }

  bootStep('Aplicando preferências', 66);
  if (save?.settings) {
    app.audio.setSettings(save.settings);
    if (save.settings.reducedMotion) document.body.classList.add('reduce-motion');
    if (save.settings.highContrast) document.body.classList.add('high-contrast');
    if (save.settings.quality && save.settings.quality !== 'auto') app.setQuality(save.settings.quality);
    document.body.classList.toggle('reduce-motion', !!save.settings.reducedMotion);
  }

  bootStep('Montando o vestiário', 82);
  ui.addScreen('menu', menuScreen);
  ui.addScreen('create', createScreen);
  ui.addScreen('editor', editorScreen);
  ui.addScreen('career', careerScreen);
  ui.addScreen('rankings', rankingsScreen);
  ui.addScreen('news', newsScreen);
  ui.addScreen('shop', shopScreen);
  ui.addScreen('gym', gymScreen);
  ui.addScreen('stats', statsScreen);
  ui.addScreen('settings', settingsScreen);
  ui.addScreen('multiplayer', multiplayerScreen);
  ui.addScreen('fight', fightScreen);

  ui.app.audio.setSettings(save?.settings || {});
  ui.start();

  // Unlock synthesized audio on the first real gesture (browser autoplay rules).
  const unlock = () => {
    app.audio.unlock();
    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('keydown', unlock);
  };
  window.addEventListener('pointerdown', unlock, { passive: true });
  window.addEventListener('keydown', unlock);

  const params = new URLSearchParams(window.location.search);
  const room = cleanCode(params.get('room') || '');
  if (room) {
    setTimeout(() => ui.navigate('multiplayer', { join: room }), 120);
  }

  window.addEventListener('beforeunload', () => {
    if (ui.save) persist(ui.save, true);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && ui.save && ui.save.settings?.autoSave !== false) persist(ui.save, true);
  });

  window.addEventListener('error', (event) => {
    const message = event?.error?.message || event?.message || 'Erro inesperado';
    if (String(message).includes('Script error')) return;
    ui.toast(message, 'error', 'close');
  });
  window.addEventListener('unhandledrejection', (event) => {
    const message = event?.reason?.message || String(event?.reason || 'Falha inesperada');
    ui.toast(message, 'error', 'close');
  });

  // Small debug surface used by automated visual checks and the console.
  window.TG_BOXING = {
    app, ui,
    get save() { return ui.save; },
    get universe() { return ui.universe; },
    navigate: (screen, data) => ui.navigate(screen, data),
    saveNow: () => persist(ui.save, true),
    booted: true,
  };

  bootStep('Pronto para lutar', 100);
  await wait(420);
  bootScreen?.classList.add('hide');
  setTimeout(() => bootScreen?.remove(), 900);
  bus.emit('booted', { app, ui });
  return { app, ui };
}

boot().catch((err) => {
  console.error('Falha ao iniciar TG BOXING', err);
  if (bootPhase) bootPhase.textContent = 'Falha ao iniciar: ' + (err?.message || err);
  if (bootScreen) {
    bootScreen.insertAdjacentHTML('beforeend', `<button class="btn btn-primary" style="margin-top:22px" onclick="location.reload()">Tentar novamente</button>`);
  }
});
