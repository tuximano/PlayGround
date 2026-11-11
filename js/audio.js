/* Tiny synthesized audio engine — no external files, works offline. */
export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.music = null;
    this.started = false;
    this.noiseBuffer = null;
  }
  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : .5;
    this.master.connect(this.ctx.destination);
    const len = this.ctx.sampleRate * 1.2;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    this.noiseBuffer = buf;
    this.started = true;
  }
  resume() { if (this.ctx?.state === 'suspended') this.ctx.resume(); }
  setMuted(m) {
    this.muted = m;
    if (this.master) this.master.gain.setTargetAtTime(m ? 0 : .5, this.ctx.currentTime, .03);
  }
  noise(duration = .2, freq = 1200, q = 1, gain = .5, type = 'bandpass', delay = 0) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + delay;
    const src = this.ctx.createBufferSource(); src.buffer = this.noiseBuffer;
    const f = this.ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + .004);
    g.gain.exponentialRampToValueAtTime(.0001, t + duration);
    src.connect(f); f.connect(g); g.connect(this.master);
    src.start(t); src.stop(t + duration + .03);
  }
  tone(freq, duration, type = 'sine', gain = .2, delay = 0, slideTo = null) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + delay;
    const o = this.ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + duration);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + .006);
    g.gain.exponentialRampToValueAtTime(.0001, t + duration);
    o.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + duration + .02);
  }
  gun(id = 'trovao') {
    this.init(); this.resume();
    const cfg = {
      trovao: { f: 900, d: .09, g: .32, low: 120 },
      vespa: { f: 1400, d: .06, g: .22, low: 160 },
      bocarra: { f: 650, d: .16, g: .42, low: 80 },
      cuspe: { f: 500, d: .22, g: .46, low: 70 },
      pirulito9: { f: 1200, d: .07, g: .2, low: 170 }
    }[id] || { f: 1000, d: .08, g: .28, low: 120 };
    this.noise(cfg.d, cfg.f, .7, cfg.g, 'bandpass');
    this.noise(cfg.d * .7, 240, .8, cfg.g * .5, 'lowpass');
    this.tone(cfg.low, cfg.d * 1.3, 'triangle', cfg.g * .55, 0, cfg.low * .4);
  }
  hit(kill = false) {
    this.init();
    this.tone(kill ? 660 : 920, .055, 'square', .12, 0, kill ? 990 : 780);
    if (kill) this.tone(1320, .12, 'triangle', .08, .045);
  }
  reload() {
    this.init();
    this.noise(.035, 2800, 2, .13, 'bandpass');
    this.tone(320, .04, 'square', .04);
    this.noise(.05, 900, 1.2, .1, 'bandpass', .13);
    this.tone(250, .05, 'square', .05, .22);
  }
  empty() { this.init(); this.tone(210, .035, 'square', .06); this.tone(160, .03, 'square', .04, .05); }
  damage() {
    this.init();
    this.noise(.18, 220, .8, .3, 'lowpass');
    this.tone(90, .22, 'sine', .22, 0, 46);
  }
  explosion() {
    this.init();
    this.noise(.8, 180, .6, .55, 'lowpass');
    this.noise(.4, 900, .7, .3, 'bandpass');
    this.tone(55, .8, 'sine', .35, 0, 24);
  }
  step() { this.init(); this.noise(.045, 380, 1.4, .06, 'lowpass'); }
  ui() { this.init(); this.tone(760, .035, 'square', .035); }
  spawn() { this.init(); this.tone(300, .4, 'sine', .1, 0, 620); this.tone(620, .25, 'triangle', .06, .12); }
  countdown(high = false) { this.init(); this.tone(high ? 880 : 440, high ? .2 : .09, 'square', .08); }
  victory() {
    this.init();
    const notes = [392, 523, 659, 784, 1046];
    notes.forEach((n, i) => this.tone(n, .32, 'triangle', .12, i * .12));
  }
  defeat() {
    this.init();
    const notes = [392, 330, 262, 196];
    notes.forEach((n, i) => this.tone(n, .38, 'triangle', .11, i * .16));
  }
  startMusic(intense = false) {
    this.init(); this.resume();
    if (!this.ctx || this.music) return;
    const ctx = this.ctx;
    const bus = ctx.createGain();
    bus.gain.value = intense ? .12 : .075;
    bus.connect(this.master);
    const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = intense ? 900 : 500; filter.Q.value = .6;
    filter.connect(bus);
    const oscs = [];
    const freqs = intense ? [55, 82.4, 110, 164.8] : [55, 65.4, 98, 130.8];
    freqs.forEach((f, i) => {
      const o = ctx.createOscillator(); o.type = i % 2 ? 'triangle' : 'sine';
      o.frequency.value = f; o.detune.value = (i - 1.5) * 5;
      const g = ctx.createGain(); g.gain.value = i === 0 ? .35 : .18;
      o.connect(g); g.connect(filter); o.start(); oscs.push({ o, g });
    });
    // slow pulse
    const lfo = ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = .11;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = .035;
    lfo.connect(lfoGain); lfoGain.connect(bus.gain); lfo.start();
    // airy loop
    const src = ctx.createBufferSource(); src.buffer = this.noiseBuffer; src.loop = true;
    const nf = ctx.createBiquadFilter(); nf.type = 'bandpass'; nf.frequency.value = 320; nf.Q.value = .4;
    const ng = ctx.createGain(); ng.gain.value = .012;
    src.connect(nf); nf.connect(ng); ng.connect(bus); src.start();
    this.music = { bus, oscs, lfo, src, filter };
  }
  setIntense(intense) {
    if (!this.music || !this.ctx) return;
    this.music.filter.frequency.setTargetAtTime(intense ? 1000 : 500, this.ctx.currentTime, .4);
    this.music.bus.gain.setTargetAtTime(intense ? .12 : .075, this.ctx.currentTime, .5);
  }
  stopMusic() {
    if (!this.music || !this.ctx) return;
    const m = this.music;
    try {
      m.oscs.forEach(({ o }) => o.stop());
      m.lfo.stop(); m.src.stop();
      m.bus.disconnect();
    } catch {}
    this.music = null;
  }
}

export const audio = new AudioEngine();
