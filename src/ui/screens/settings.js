// Settings: audio, quality, accessibility, touch controls and save management.
import { icon } from '../icons.js';
import { esc, h, screenHead } from '../helpers.js';
import { DIFFICULTIES } from '../../core/data.js';
import { persist, saveGame, clearAll } from '../../core/store.js';

export function settingsScreen(ui) {
  const save = ui.save;
  const s = save?.settings || {};
  let section = 'audio';

  const navBtn = (id, name, ic) => `<button data-section="${id}" class="${id === section ? 'active' : ''}">${icon(ic, 15)} ${name}</button>`;

  const el = h(`<div class="screen">
    ${ui.topbar('settings')}
    ${screenHead({
      kicker: 'Preferências', title: 'Configurações',
      sub: 'Áudio, gráficos, acessibilidade, controles touch e gerenciamento do save.',
      actions: save ? `<button class="btn btn-sm btn-primary" data-action="save-now">${icon('check', 14)} Salvar agora</button>` : '',
    })}
    <div class="settings-layout">
      <div class="settings-nav" data-navlist>
        ${navBtn('audio', 'Áudio', 'volume')}
        ${navBtn('game', 'Jogo & gráficos', 'settings')}
        ${navBtn('controls', 'Controles touch', 'grid')}
        ${navBtn('access', 'Acessibilidade', 'eye')}
        ${navBtn('data', 'Dados & save', 'download')}
        ${navBtn('about', 'Sobre o jogo', 'book')}
      </div>
      <div data-panel></div>
    </div>
  </div>`);

  const panel = el.querySelector('[data-panel]');

  const render = () => {
    el.querySelectorAll('[data-navlist] button').forEach((b) => b.classList.toggle('active', b.dataset.section === section));
    if (section === 'audio') panel.innerHTML = audioPanel();
    else if (section === 'game') panel.innerHTML = gamePanel();
    else if (section === 'controls') panel.innerHTML = controlsPanel();
    else if (section === 'access') panel.innerHTML = accessPanel();
    else if (section === 'data') panel.innerHTML = dataPanel();
    else panel.innerHTML = aboutPanel();
    bind();
  };

  const audioPanel = () => `<div class="panel"><div class="panel-head"><h3>Mixagem de áudio</h3><span class="tiny">Procedural · WebAudio</span></div><div class="panel-body">
    ${slider('sfx', 'Efeitos', s.sfx ?? 0.85)}
    ${slider('music', 'Música', s.music ?? 0.4)}
    ${slider('crowd', 'Torcida', s.crowd ?? 0.75)}
    <div class="divider"></div>
    <label class="toggle">Silenciar tudo <input type="checkbox" data-setting="muted" ${s.muted ? 'checked' : ''}></label>
    <div class="notice" style="margin-top:12px">${icon('music', 13)} Todo o áudio é sintetizado em tempo real no navegador. Nenhum arquivo de áudio externo é usado.</div>
  </div></div>`;

  const gamePanel = () => `<div class="panel"><div class="panel-head"><h3>Experiência de jogo</h3></div><div class="panel-body">
    <div class="field"><label>Dificuldade da IA</label><select class="input" data-setting="difficulty">${DIFFICULTIES.map((d) => `<option value="${d.id}" ${(s.difficulty || 'pro') === d.id ? 'selected' : ''}>${d.name} — ${d.desc}</option>`).join('')}</select></div>
    <div class="field"><label>Qualidade gráfica</label><select class="input" data-setting="quality">${[['auto', 'Automática'], ['high', 'Alta'], ['medium', 'Média'], ['low', 'Baixa (60 FPS)']].map(([v, n]) => `<option value="${v}" ${(s.quality || 'auto') === v ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
    <label class="toggle">Salvamento automático <input type="checkbox" data-setting="autoSave" ${s.autoSave !== false ? 'checked' : ''}></label>
    <label class="toggle">Tremor de câmera nos impactos <input type="checkbox" data-setting="cameraShake" ${s.cameraShake !== false ? 'checked' : ''}></label>
    <div class="notice" style="margin-top:12px">${icon('bolt', 13)} Em dispositivos móveis a qualidade é reduzida automaticamente para buscar 60 FPS. A resolução máxima também é limitada pelo devicePixelRatio.</div>
  </div></div>`;

  const controlsPanel = () => `<div class="panel"><div class="panel-head"><h3>Controles touch</h3><span class="tiny">Tamanho, opacidade e posição</span></div><div class="panel-body">
    ${slider('joystick', 'Joystick (px)', s.controls?.joystick ?? 128, 80, 190, 1)}
    ${slider('buttons', 'Botões (px)', s.controls?.buttons ?? 132, 100, 180, 1)}
    ${slider('opacity', 'Opacidade', s.controls?.opacity ?? 0.8, 0.3, 1, 0.05)}
    <div class="field"><label>Lado do controle direcional</label><div class="wager-row"><button data-side="left" class="${(s.controls?.side || 'right') === 'left' ? 'active' : ''}">Esquerda</button><button data-side="right" class="${(s.controls?.side || 'right') === 'right' ? 'active' : ''}">Direita</button></div></div>
    <label class="toggle">Vibração (haptic) <input type="checkbox" data-control="haptic" ${s.controls?.haptic !== false ? 'checked' : ''}></label>
    <div class="control-customizer" data-preview>
      <div class="cc-stick" data-stick style="width:${(s.controls?.joystick ?? 128) * 0.6}px;height:${(s.controls?.joystick ?? 128) * 0.6}px;left:${(s.controls?.side || 'right') === 'left' ? '18px' : 'auto'};right:${(s.controls?.side || 'right') === 'right' ? '18px' : 'auto'};bottom:18px">JOY</div>
      <div class="cc-btn" data-btn style="width:${(s.controls?.buttons ?? 132) * 0.42}px;height:${(s.controls?.buttons ?? 132) * 0.42}px;left:${(s.controls?.side || 'right') === 'right' ? '18px' : 'auto'};right:${(s.controls?.side || 'right') === 'left' ? '18px' : 'auto'};bottom:26px">JAB</div>
      <div class="cc-btn" style="width:${(s.controls?.buttons ?? 132) * 0.42}px;height:${(s.controls?.buttons ?? 132) * 0.42}px;right:68px;bottom:70px">DIR</div>
    </div>
    <div class="notice" style="margin-top:12px">${icon('grid', 13)} Os controles touch aparecem automaticamente em dispositivos com tela sensível ao toque. No desktop use teclado e mouse.</div>
  </div></div>`;

  const accessPanel = () => `<div class="panel"><div class="panel-head"><h3>Acessibilidade</h3></div><div class="panel-body">
    <label class="toggle">Reduzir movimento e animações <input type="checkbox" data-setting="reducedMotion" ${s.reducedMotion ? 'checked' : ''}></label>
    <label class="toggle">Mostrar dicas de teclado durante a luta <input type="checkbox" data-setting="showHints" ${s.showHints !== false ? 'checked' : ''}></label>
    <label class="toggle">Alto contraste nos medidores de vida <input type="checkbox" data-setting="highContrast" ${s.highContrast ? 'checked' : ''}></label>
    <div class="divider"></div>
    <div class="notice">${icon('eye', 13)} O jogo usa legendas e feedback visual para todos os eventos importantes (nocautes, rounds, decisões). A interface é em português do Brasil.</div>
  </div></div>`;

  const dataPanel = () => `<div class="stack">
    <div class="panel"><div class="panel-head"><h3>Backup do save</h3><span class="tiny">${save ? 'Carreira ativa' : 'Sem carreira'}</span></div><div class="panel-body">
      <p class="tiny">Exporte um arquivo JSON com carreira e universo (1.100 lutadores). O multiplayer online não depende do save, mas o progresso sim.</p>
      <div class="row" style="margin-top:12px;gap:8px">
        <button class="btn btn-sm" data-action="export" ${!save ? 'disabled' : ''}>${icon('download', 14)} Exportar save</button>
        <button class="btn btn-sm" data-action="import">${icon('upload', 14)} Importar save</button>
        <input type="file" accept="application/json" data-file hidden>
      </div>
    </div></div>
    <div class="panel panel-red"><div class="panel-head"><h3>Zona de risco</h3></div><div class="panel-body">
      <p class="tiny">Apagar o save remove carreira, cinturões e o universo. Não pode ser desfeito.</p>
      <div class="row" style="margin-top:12px;gap:8px">
        <button class="btn btn-sm btn-red" data-action="reset">${icon('trash', 14)} Apagar carreira</button>
        <button class="btn btn-sm btn-ghost" data-action="clear">${icon('trash', 14)} Limpar tudo</button>
      </div>
    </div></div>
  </div>`;

  const aboutPanel = () => `<div class="panel"><div class="panel-head"><h3>TG BOXING — The Glory of Champions</h3><span class="tiny">v1.0</span></div><div class="panel-body">
    <p>Um jogo de boxe 3D com carreira completa, universo vivo de 1.100 lutadores, rankings TOP 100 em 11 divisões, três organizações e sete níveis de cinturão.</p>
    <div class="divider"></div>
    <div class="row between"><span class="tiny">Engine 3D</span><b>Three.js · procedural</b></div>
    <div class="row between" style="margin-top:7px"><span class="tiny">Multiplayer</span><b>WebRTC · PeerJS</b></div>
    <div class="row between" style="margin-top:7px"><span class="tiny">Áudio</span><b>WebAudio sintetizado</b></div>
    <div class="row between" style="margin-top:7px"><span class="tiny">Persistência</span><b>localStorage</b></div>
    <div class="row between" style="margin-top:7px"><span class="tiny">Idioma</span><b>Português (BR)</b></div>
    <div class="divider"></div>
    <div class="notice">${icon('shield', 13)} TG COIN é uma moeda exclusivamente virtual, sem valor monetário real e sem conversão para dinheiro. Itens de treino e boosters são fictícios. Personagens, organizações, arenas e marcas são originais e fictícios.</div>
  </div></div>`;

  const slider = (key, label, value, min = 0, max = 1, step = 0.05) => `
    <div class="slider-row"><span>${label}</span><input type="range" min="${min}" max="${max}" step="${step}" value="${value}" data-setting="${key}"><b data-val="${key}">${step < 1 ? Math.round(value * 100) + '%' : Math.round(value)}</b></div>`;

  const bind = () => {
    panel.querySelectorAll('input[type="range"][data-setting]').forEach((input) => {
      input.addEventListener('input', () => {
        const key = input.dataset.setting;
        const val = Number(input.value);
        if (key === 'joystick' || key === 'buttons' || key === 'opacity') {
          s.controls = { ...(s.controls || {}), [key]: val };
          const label = panel.querySelector(`[data-val="${key}"]`);
          if (label) label.textContent = key === 'opacity' ? Math.round(val * 100) + '%' : Math.round(val);
          const stick = panel.querySelector('[data-stick]');
          const btn = panel.querySelector('[data-btn]');
          if (stick) { stick.style.width = `${(s.controls.joystick ?? 128) * 0.6}px`; stick.style.height = `${(s.controls.joystick ?? 128) * 0.6}px`; }
          if (btn) { btn.style.width = `${(s.controls.buttons ?? 132) * 0.42}px`; btn.style.height = `${(s.controls.buttons ?? 132) * 0.42}px`; }
        } else {
          s[key] = val;
          const label = panel.querySelector(`[data-val="${key}"]`);
          if (label) label.textContent = Math.round(val * 100) + '%';
          applyAudio();
        }
        saveSettings();
      });
    });
    panel.querySelectorAll('input[type="checkbox"][data-setting]').forEach((input) => {
      input.addEventListener('change', () => {
        s[input.dataset.setting] = input.checked;
        if (input.dataset.setting === 'reducedMotion') document.body.classList.toggle('reduce-motion', input.checked);
        if (input.dataset.setting === 'highContrast') document.body.classList.toggle('high-contrast', input.checked);
        if (input.dataset.setting === 'muted') applyAudio();
        saveSettings();
      });
    });
    panel.querySelectorAll('select[data-setting]').forEach((select) => {
      select.addEventListener('change', () => {
        s[select.dataset.setting] = select.value;
        if (select.dataset.setting === 'quality') ui.app.setQuality(select.value);
        saveSettings();
      });
    });
    panel.querySelectorAll('[data-side]').forEach((btn) => {
      btn.addEventListener('click', () => {
        s.controls = { ...(s.controls || {}), side: btn.dataset.side };
        panel.querySelectorAll('[data-side]').forEach((b) => b.classList.toggle('active', b === btn));
        const stick = panel.querySelector('[data-stick]');
        const previewBtn = panel.querySelector('[data-btn]');
        if (stick) {
          stick.style.left = btn.dataset.side === 'left' ? '18px' : 'auto';
          stick.style.right = btn.dataset.side === 'right' ? '18px' : 'auto';
        }
        if (previewBtn) {
          previewBtn.style.left = btn.dataset.side === 'right' ? '18px' : 'auto';
          previewBtn.style.right = btn.dataset.side === 'left' ? '18px' : 'auto';
        }
        saveSettings();
      });
    });
    panel.querySelector('[data-action="export"]')?.addEventListener('click', exportSave);
    panel.querySelector('[data-action="import"]')?.addEventListener('click', () => panel.querySelector('[data-file]')?.click());
    panel.querySelector('[data-file]')?.addEventListener('change', importSave);
    panel.querySelector('[data-action="reset"]')?.addEventListener('click', () => {
      ui.confirm({ title: 'Apagar carreira?', message: 'Todo o progresso, cinturões, TG COIN e histórico serão apagados. Esta ação é permanente.', danger: true, confirmLabel: 'Apagar tudo', onConfirm: () => { clearAll(); location.reload(); } });
    });
    panel.querySelector('[data-action="clear"]')?.addEventListener('click', () => {
      ui.confirm({ title: 'Limpar todos os dados?', message: 'Carreira, universo, configurações e preferências serão removidos.', danger: true, confirmLabel: 'Limpar tudo', onConfirm: () => { clearAll(); localStorage.clear(); location.reload(); } });
    });
  };

  const saveSettings = () => {
    if (!save) return;
    persist(save, false);
  };
  const applyAudio = () => {
    if (!save) return;
    ui.app.audio.setSettings({ ...save.settings });
    if (ui.app.audio.master) ui.app.audio.master.gain.value = save.settings.muted ? 0 : 0.9;
    ui.app.audio.ui();
  };

  const exportSave = () => {
    const payload = { game: 'TG BOXING', version: 1, exportedAt: new Date().toISOString(), save: ui.save, universe: ui.universe };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `tgboxing-save-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    ui.toast('Save exportado.', 'success', 'download');
  };

  const importSave = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data.save?.profile) throw new Error('Arquivo inválido');
        saveGame(data.save, { universe: data.universe });
        ui.toast('Save importado. Recarregando...', 'success', 'upload');
        setTimeout(() => location.reload(), 700);
      } catch (err) {
        ui.toast('Falha ao importar: ' + err.message, 'error', 'close');
      }
    };
    reader.readAsText(file);
  };

  if (save?.settings?.reducedMotion) document.body.classList.add('reduce-motion');
  if (save?.settings?.highContrast) document.body.classList.add('high-contrast');

  el.querySelectorAll('[data-navlist] button').forEach((btn) => btn.addEventListener('click', () => { section = btn.dataset.section; render(); }));
  el.querySelector('[data-action="save-now"]')?.addEventListener('click', () => ui.saveNow());

  render();
  return el;
}
