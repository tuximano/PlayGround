(() => {
  'use strict';
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const stage = document.getElementById('stage');
  const overlay = document.getElementById('overlay');
  const $ = id => document.getElementById(id);
  const ui = { score: $('score'), shards: $('shards'), hearts: $('hearts'), best: $('best'), dash: $('dashProgress'), dashBtn: $('dashBtn'), title: $('title'), eyebrow: $('eyebrow'), intro: $('intro'), start: $('startBtn'), panel: $('panel'), pause: $('pauseBtn'), sound: $('soundBtn'), soundIcon: $('soundIcon') };
  const W = 960;
  let H = 640, scale = 1, dpr = 1;
  let state = 'ready', lastTime = 0, elapsed = 0, score = 0, shardCount = 0, lives = 3, best = Number(localStorage.getItem('starfall-best') || 0);
  let player, rocks = [], shards = [], particles = [], stars = [], keys = new Set(), pointer = null;
  let rockTimer = 0, shardTimer = 1.3, shake = 0, soundOn = true, audio = null;
  ui.best.textContent = String(best).padStart(5, '0');

  function resize() {
    const rect = stage.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    scale = canvas.width / W;
    H = canvas.height / scale;
    if (player) { player.x = clamp(player.x, 25, W - 25); player.y = clamp(player.y, 36, H - 25); }
    stars = Array.from({ length: Math.round((W * H) / 4200) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.35 + .25, a: Math.random() * .65 + .16, tw: Math.random() * 5 + 1, phase: Math.random() * 6.28, speed: Math.random() * 12 + 3 }));
    draw();
  }
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const rand = (a, b) => a + Math.random() * (b - a);
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  function shipReset() { player = { x: W / 2, y: H * .72, vx: 0, vy: 0, r: 14, invuln: 0, dash: 0, cooldown: 0, angle: -Math.PI / 2, trail: 0 }; }
  function setHearts() { ui.hearts.innerHTML = Array.from({ length: 3 }, (_, i) => `<span class="heart ${i >= lives ? 'off' : ''}">♥</span>`).join(''); }
  function updateHud() {
    ui.score.textContent = String(Math.floor(score)).padStart(5, '0');
    ui.shards.textContent = `◇ ${String(shardCount).padStart(2, '0')}`;
    ui.dash.style.width = `${player ? (1 - player.cooldown / 2.8) * 100 : 100}%`;
    ui.dashBtn.textContent = player && player.cooldown > 0 ? `${player.cooldown.toFixed(1)}s` : 'SPACE / READY';
    ui.dashBtn.disabled = state !== 'playing' || (player && player.cooldown > 0);
    setHearts();
  }
  function startGame() {
    initAudio(); state = 'playing'; elapsed = 0; score = 0; shardCount = 0; lives = 3;
    rocks = []; shards = []; particles = []; rockTimer = .65; shardTimer = 1.1; shake = 0; shipReset();
    overlay.classList.add('hidden'); ui.pause.setAttribute('aria-label', 'Pause game'); updateHud(); lastTime = performance.now();
  }
  function showOverlay(kind) {
    overlay.classList.remove('hidden');
    if (kind === 'pause') {
      ui.eyebrow.textContent = 'Autopilot engaged'; ui.title.innerHTML = 'RUN<br><em>PAUSED</em>';
      ui.intro.textContent = 'Catch your breath, pilot. The asteroid field can wait.';
      ui.start.textContent = 'Resume flight'; ui.start.onclick = resumeGame;
      ui.panel.querySelector('.key-hints').innerHTML = '<span><kbd>ESC</kbd> / <kbd>P</kbd> resume</span>';
    } else if (kind === 'over') {
      ui.eyebrow.textContent = 'Signal lost // flight ended'; ui.title.innerHTML = 'NICE<br><em>FLIGHT</em>';
      ui.intro.innerHTML = `You scored <strong style="color:#67f5e1">${Math.floor(score).toLocaleString()}</strong> and recovered <strong style="color:#67f5e1">${shardCount}</strong> energy shards.`;
      ui.start.textContent = 'Fly again'; ui.start.onclick = startGame;
      ui.panel.querySelector('.key-hints').innerHTML = `<span>BEST FLIGHT <strong style="color:#67f5e1">${String(best).padStart(5, '0')}</strong></span>`;
    }
  }
  function resumeGame() { state = 'playing'; overlay.classList.add('hidden'); lastTime = performance.now(); }
  function pauseGame() { if (state !== 'playing') return; state = 'paused'; showOverlay('pause'); }
  function endGame() {
    state = 'over';
    if (score > best) { best = Math.floor(score); localStorage.setItem('starfall-best', best); ui.best.textContent = String(best).padStart(5, '0'); }
    ui.pause.setAttribute('aria-label', 'Pause game'); showOverlay('over'); tone(130, .25, 'sawtooth', .08);
  }
  function initAudio() { if (!audio) { try { audio = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) {} } if (audio?.state === 'suspended') audio.resume(); }
  function tone(freq, duration = .08, type = 'sine', volume = .035) {
    if (!soundOn || !audio) return;
    try { const osc = audio.createOscillator(), gain = audio.createGain(); osc.type = type; osc.frequency.value = freq; gain.gain.setValueAtTime(volume, audio.currentTime); gain.gain.exponentialRampToValueAtTime(.001, audio.currentTime + duration); osc.connect(gain); gain.connect(audio.destination); osc.start(); osc.stop(audio.currentTime + duration); } catch (_) {}
  }
  function burst(x, y, color, count = 12, force = 150) {
    for (let i = 0; i < count; i++) { const a = Math.random() * Math.PI * 2, v = rand(force * .25, force); particles.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: rand(.28, .8), max: .8, size: rand(1.3, 3.2), color }); }
  }
  function spawnRock() {
    const r = rand(15, 34) * (1 + Math.min(elapsed / 90, .25));
    const x = rand(r + 8, W - r - 8);
    const points = Array.from({ length: 9 }, (_, i) => ({ a: i / 9 * Math.PI * 2, r: r * rand(.72, 1.18) }));
    rocks.push({ x, y: -r - 5, r, vx: rand(-34, 34), vy: rand(110, 178) + Math.min(elapsed * 1.15, 110), rot: rand(0, 6.28), spin: rand(-1.35, 1.35), points, tint: Math.random() < .18 });
  }
  function spawnShard() { shards.push({ x: rand(30, W - 30), y: -20, r: 10, vy: rand(100, 145) + Math.min(elapsed * .45, 50), phase: rand(0, 6.28), spin: rand(-2, 2) }); }
  function dash() { if (state !== 'playing' || player.cooldown > 0) return; player.dash = .22; player.cooldown = 2.8; player.invuln = Math.max(player.invuln, .4); const mag = Math.hypot(player.vx, player.vy); if (mag > 10) { player.vx = player.vx / mag * 690; player.vy = player.vy / mag * 690; } else { player.vy = -690; } burst(player.x, player.y, '#67f5e1', 17, 200); tone(470, .15, 'triangle', .05); }

  function update(dt) {
    elapsed += dt; score += dt * (10 + Math.min(elapsed * .08, 12));
    const accel = 760, maxSpeed = 335;
    if (pointer) {
      const dx = pointer.x - player.x, dy = pointer.y - player.y;
      player.vx += clamp(dx * 7, -accel, accel) * dt; player.vy += clamp(dy * 7, -accel, accel) * dt;
    } else {
      let ix = (keys.has('ArrowRight') || keys.has('d') ? 1 : 0) - (keys.has('ArrowLeft') || keys.has('a') ? 1 : 0);
      let iy = (keys.has('ArrowDown') || keys.has('s') ? 1 : 0) - (keys.has('ArrowUp') || keys.has('w') ? 1 : 0);
      if (ix && iy) { ix *= .707; iy *= .707; }
      player.vx += ix * accel * dt; player.vy += iy * accel * dt;
    }
    const friction = Math.pow(pointer ? .08 : .045, dt);
    player.vx *= friction; player.vy *= friction;
    const speed = Math.hypot(player.vx, player.vy);
    if (speed > maxSpeed && player.dash <= 0) { player.vx *= maxSpeed / speed; player.vy *= maxSpeed / speed; }
    player.x = clamp(player.x + player.vx * dt, 25, W - 25); player.y = clamp(player.y + player.vy * dt, 38, H - 25);
    if (speed > 20) player.angle = Math.atan2(player.vy, player.vx) + Math.PI / 2;
    player.invuln = Math.max(0, player.invuln - dt); player.dash = Math.max(0, player.dash - dt); player.cooldown = Math.max(0, player.cooldown - dt);
    player.trail += dt;
    if (player.trail > .035) { player.trail = 0; particles.push({ x: player.x + rand(-3, 3), y: player.y + 16, vx: rand(-17, 17), vy: rand(60, 110), life: .32, max: .32, size: rand(1.5, 3), color: '#67f5e1' }); }
    rockTimer -= dt; if (rockTimer <= 0) { spawnRock(); rockTimer = rand(.48, .82) * Math.max(.48, 1 - elapsed / 150); }
    shardTimer -= dt; if (shardTimer <= 0) { spawnShard(); shardTimer = rand(1.55, 2.4); }
    for (const rock of rocks) { rock.x += rock.vx * dt; rock.y += rock.vy * dt; rock.rot += rock.spin * dt; }
    rocks = rocks.filter(r => r.y < H + r.r + 10);
    for (const shard of shards) { shard.y += shard.vy * dt; shard.phase += dt * 3; shard.spin += dt * 1.2; }
    shards = shards.filter(s => s.y < H + 30);
    if (player.invuln <= 0) {
      const rock = rocks.find(r => distance(player, r) < player.r + r.r * .76);
      if (rock) {
        rocks.splice(rocks.indexOf(rock), 1); lives--; player.invuln = 1.35; shake = .27; burst(player.x, player.y, '#ff6ba7', 22, 210); tone(95, .19, 'sawtooth', .09); setHearts();
        if (lives <= 0) endGame();
      }
    }
    for (let i = shards.length - 1; i >= 0; i--) if (distance(player, shards[i]) < player.r + shards[i].r + 4) {
      const shard = shards.splice(i, 1)[0]; shardCount++; score += 100; burst(shard.x, shard.y, '#b7ff99', 15, 140); tone(630 + Math.min(shardCount * 8, 240), .11, 'sine', .055);
    }
    for (const p of particles) { p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= Math.pow(.35, dt); p.vy *= Math.pow(.35, dt); p.life -= dt; }
    particles = particles.filter(p => p.life > 0); shake = Math.max(0, shake - dt); updateHud();
  }

  function draw() {
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#0a1024'); bg.addColorStop(.55, '#080d1b'); bg.addColorStop(1, '#10102a'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    const neb = ctx.createRadialGradient(W * .52, H * .38, 15, W * .52, H * .38, W * .68); neb.addColorStop(0, 'rgba(38,59,107,.18)'); neb.addColorStop(.65, 'rgba(25,36,82,.07)'); neb.addColorStop(1, 'rgba(5,8,19,0)'); ctx.fillStyle = neb; ctx.fillRect(0, 0, W, H);
    for (const s of stars) { const twinkle = .62 + Math.sin(elapsed * s.tw + s.phase) * .32; ctx.globalAlpha = s.a * twinkle; ctx.fillStyle = '#dce8ff'; ctx.beginPath(); ctx.arc(s.x, (s.y + elapsed * s.speed) % H, s.r, 0, Math.PI * 2); ctx.fill(); }
    ctx.globalAlpha = 1;
    ctx.save();
    if (shake > 0) ctx.translate(rand(-6, 6) * shake * 3, rand(-5, 5) * shake * 3);
    for (const shard of shards) drawShard(shard);
    for (const rock of rocks) drawRock(rock);
    for (const p of particles) { ctx.globalAlpha = Math.max(0, p.life / p.max); ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 9; ctx.beginPath(); ctx.arc(p.x, p.y, p.size * Math.max(.35, p.life / p.max), 0, Math.PI * 2); ctx.fill(); }
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    if (player) drawShip();
    ctx.restore();
    const vignette = ctx.createRadialGradient(W / 2, H / 2, H * .2, W / 2, H / 2, H * .76); vignette.addColorStop(.55, 'rgba(2,5,16,0)'); vignette.addColorStop(1, 'rgba(2,5,16,.48)'); ctx.fillStyle = vignette; ctx.fillRect(0, 0, W, H);
    if (state === 'playing' && elapsed < 4) { ctx.globalAlpha = clamp((4 - elapsed) / 2, 0, .7); ctx.fillStyle = '#becbe8'; ctx.font = '12px "DM Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('STAY LIGHT ON YOUR THRUSTERS', W / 2, 35); ctx.globalAlpha = 1; }
  }
  function drawShip() {
    if (player.invuln > 0 && Math.floor(player.invuln * 14) % 2 === 0) return;
    ctx.save(); ctx.translate(player.x, player.y); ctx.rotate(player.angle);
    if (player.dash > 0 || player.invuln > .1) { ctx.strokeStyle = player.dash > 0 ? 'rgba(103,245,225,.9)' : 'rgba(103,245,225,.35)'; ctx.lineWidth = 2; ctx.shadowColor = '#67f5e1'; ctx.shadowBlur = 18; ctx.beginPath(); ctx.ellipse(0, 0, 23 + Math.sin(elapsed * 22) * 2, 29 + Math.cos(elapsed * 18) * 2, 0, 0, Math.PI * 2); ctx.stroke(); ctx.shadowBlur = 0; }
    ctx.fillStyle = 'rgba(103,245,225,.48)'; ctx.beginPath(); ctx.moveTo(-5, 12); ctx.lineTo(0, rand(21, 32)); ctx.lineTo(5, 12); ctx.closePath(); ctx.fill();
    ctx.shadowColor = '#67f5e1'; ctx.shadowBlur = 16; ctx.fillStyle = '#c9fff5'; ctx.strokeStyle = '#67f5e1'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, -19); ctx.lineTo(13, 13); ctx.lineTo(5, 10); ctx.lineTo(0, 15); ctx.lineTo(-5, 10); ctx.lineTo(-13, 13); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.shadowBlur = 0; ctx.fillStyle = '#457f9c'; ctx.beginPath(); ctx.moveTo(0, -8); ctx.lineTo(4, 5); ctx.lineTo(-4, 5); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  function drawRock(r) {
    ctx.save(); ctx.translate(r.x, r.y); ctx.rotate(r.rot); ctx.shadowColor = r.tint ? 'rgba(255,107,167,.22)' : 'rgba(126,149,190,.18)'; ctx.shadowBlur = 15;
    const grad = ctx.createLinearGradient(-r.r, -r.r, r.r, r.r); grad.addColorStop(0, r.tint ? '#535064' : '#414b63'); grad.addColorStop(1, '#202a40');
    ctx.beginPath(); r.points.forEach((p, i) => { const x = Math.cos(p.a) * p.r, y = Math.sin(p.a) * p.r; if (!i) ctx.moveTo(x, y); else ctx.lineTo(x, y); }); ctx.closePath(); ctx.fillStyle = grad; ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = r.tint ? 'rgba(255,151,192,.39)' : 'rgba(164,184,220,.34)'; ctx.lineWidth = 1.4; ctx.stroke();
    ctx.fillStyle = 'rgba(9,14,30,.4)'; ctx.beginPath(); ctx.ellipse(-r.r * .2, -r.r * .16, r.r * .2, r.r * .13, -.4, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(r.r * .28, r.r * .22, r.r * .12, r.r * .09, .3, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  }
  function drawShard(s) {
    const pulse = 1 + Math.sin(s.phase) * .12; ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.spin); ctx.scale(pulse, pulse); ctx.shadowColor = '#b7ff99'; ctx.shadowBlur = 18; ctx.fillStyle = '#b7ff99'; ctx.strokeStyle = '#e6ffd2'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, -11); ctx.lineTo(8, -3); ctx.lineTo(6, 7); ctx.lineTo(0, 11); ctx.lineTo(-6, 7); ctx.lineTo(-8, -3); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(13,50,43,.5)'; ctx.beginPath(); ctx.moveTo(0, -6); ctx.lineTo(3, -1); ctx.lineTo(0, 6); ctx.lineTo(-3, -1); ctx.closePath(); ctx.fill(); ctx.restore();
  }

  function frame(now) { const dt = Math.min((now - lastTime) / 1000 || 0, .035); lastTime = now; if (state === 'playing') update(dt); else { elapsed += state === 'ready' ? dt * .12 : 0; for (const p of particles) { p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt; } particles = particles.filter(p => p.life > 0); } draw(); requestAnimationFrame(frame); }
  function pointerPosition(event) { const rect = canvas.getBoundingClientRect(); return { x: clamp((event.clientX - rect.left) / rect.width * W, 20, W - 20), y: clamp((event.clientY - rect.top) / rect.height * H, 25, H - 20) }; }
  canvas.addEventListener('pointerdown', e => { if (state !== 'playing') return; pointer = pointerPosition(e); canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', e => { if (pointer && state === 'playing') pointer = pointerPosition(e); });
  const stopPointer = () => { pointer = null; };
  canvas.addEventListener('pointerup', stopPointer); canvas.addEventListener('pointercancel', stopPointer); canvas.addEventListener('lostpointercapture', stopPointer);
  window.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) e.preventDefault();
    if (key === ' ' && !e.repeat) dash();
    if ((key === 'escape' || key === 'p') && !e.repeat) { if (state === 'playing') pauseGame(); else if (state === 'paused') resumeGame(); }
    keys.add(key);
  });
  window.addEventListener('keyup', e => keys.delete(e.key.toLowerCase()));
  window.addEventListener('blur', () => { keys.clear(); pointer = null; if (state === 'playing') pauseGame(); });
  ui.start.onclick = startGame;
  ui.pause.addEventListener('click', () => { if (state === 'playing') pauseGame(); else if (state === 'paused') resumeGame(); });
  ui.dashBtn.addEventListener('click', dash);
  ui.sound.addEventListener('click', () => { soundOn = !soundOn; ui.sound.setAttribute('aria-label', soundOn ? 'Mute sound' : 'Enable sound'); ui.soundIcon.innerHTML = soundOn ? '<path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>' : '<path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="m17 9 5 6m0-6-5 6"/>'; if (soundOn) { initAudio(); tone(520); } });
  window.addEventListener('resize', resize);
  shipReset(); setHearts(); resize(); requestAnimationFrame(frame);
})();
