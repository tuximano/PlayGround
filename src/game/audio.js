// Procedural WebAudio soundtrack, crowd, punches and bells. No audio files.
export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.ready = false;
    this.settings = { sfx: 0.85, music: 0.4, crowd: 0.75 };
    this.musicNodes = null;
    this.crowdGain = null;
    this.heat = 0.2;
    this.scene = 'menu';
  }

  init() {
    if (this.ready) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.9;
      this.master.connect(this.ctx.destination);
      this.sfx = this.ctx.createGain();
      this.sfx.gain.value = this.settings.sfx;
      this.sfx.connect(this.master);
      this.music = this.ctx.createGain();
      this.music.gain.value = this.settings.music * 0.5;
      this.music.connect(this.master);
      this.crowd = this.ctx.createGain();
      this.crowd.gain.value = 0;
      this.crowd.connect(this.master);
      this.ready = true;
      this.buildCrowd();
      this.buildMusic();
    } catch (err) {
      console.warn('Audio init failed', err);
    }
  }

  unlock() {
    this.init();
    if (this.ctx?.state === 'suspended') this.ctx.resume();
    this.setScene(this.scene);
  }

  setSettings(settings) {
    this.settings = { ...this.settings, ...settings };
    if (!this.ready) return;
    this.sfx.gain.value = this.settings.sfx;
    this.music.gain.value = this.settings.music * 0.5;
    if (this.crowdGain) this.crowdGain.gain.value = this.settings.crowd;
  }

  setScene(scene) {
    this.scene = scene;
    if (!this.ready) return;
    const t = this.ctx.currentTime;
    const menuMusic = scene === 'menu' || scene === 'gym' || scene === 'editor';
    this.music.gain.cancelScheduledValues(t);
    this.music.gain.linearRampToValueAtTime(this.settings.music * (menuMusic ? 0.42 : 0.28), t + 0.8);
    if (!menuMusic && this.crowdGain) {
      this.crowdGain.gain.cancelScheduledValues(t);
      this.crowdGain.gain.linearRampToValueAtTime(this.settings.crowd * 0.7, t + 1.5);
    } else if (this.crowdGain) {
      this.crowdGain.gain.cancelScheduledValues(t);
      this.crowdGain.gain.linearRampToValueAtTime(0, t + 1.0);
    }
  }

  buildCrowd() {
    const ctx = this.ctx;
    const len = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      let last = 0;
      for (let i = 0; i < len; i++) {
        const white = Math.random() * 2 - 1;
        last = last * 0.96 + white * 0.04;
        data[i] = last * 3.2;
      }
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 700;
    filter.Q.value = 0.55;
    this.crowdGain = ctx.createGain();
    this.crowdGain.gain.value = 0;
    src.connect(filter).connect(this.crowdGain).connect(this.crowd);
    src.start();
    this.crowdSource = src;
    this.crowdFilter = filter;
  }

  buildMusic() {
    const ctx = this.ctx;
    const bpm = 92;
    const beat = 60 / bpm;
    const bars = 8;
    const length = beat * 4 * bars;
    const sr = ctx.sampleRate;
    const buffer = ctx.createBuffer(2, Math.floor(length * sr), sr);
    const dataL = buffer.getChannelData(0);
    const dataR = buffer.getChannelData(1);
    const kick = (t) => {
      const i0 = Math.floor(t * sr);
      for (let i = 0; i < sr * 0.35; i++) {
        const time = i / sr;
        const env = Math.exp(-time * 18);
        const freq = 42 + 90 * Math.exp(-time * 30);
        const val = Math.sin(2 * Math.PI * freq * time) * env * 0.55;
        if (i0 + i < dataL.length) { dataL[i0 + i] += val; dataR[i0 + i] += val; }
      }
    };
    const snare = (t) => {
      const i0 = Math.floor(t * sr);
      for (let i = 0; i < sr * 0.18; i++) {
        const time = i / sr;
        const env = Math.exp(-time * 28);
        const val = (Math.random() * 2 - 1) * env * 0.22;
        if (i0 + i < dataL.length) { dataL[i0 + i] += val * 0.9; dataR[i0 + i] += val * 0.7; }
      }
    };
    const hat = (t) => {
      const i0 = Math.floor(t * sr);
      for (let i = 0; i < sr * 0.06; i++) {
        const time = i / sr;
        const env = Math.exp(-time * 90);
        const val = (Math.random() * 2 - 1) * env * 0.06;
        if (i0 + i < dataL.length) { dataL[i0 + i] += val; dataR[i0 + i] += val * 0.6; }
      }
    };
    const bassNotes = [36.7, 36.7, 43.65, 36.7, 32.7, 32.7, 36.7, 29.1];
    for (let bar = 0; bar < bars; bar++) {
      const bt = bar * beat * 4;
      for (let b = 0; b < 4; b++) {
        kick(bt + b * beat);
        if (b === 1 || b === 3) snare(bt + b * beat);
        hat(bt + b * beat + beat / 2);
        hat(bt + b * beat + beat * 0.75);
      }
      const note = bassNotes[bar % bassNotes.length];
      const i0 = Math.floor(bt * sr);
      const dur = beat * 4;
      for (let i = 0; i < dur * sr; i++) {
        const time = i / sr;
        if (i0 + i >= dataL.length) break;
        const env = Math.min(1, time * 8) * Math.exp(-time * 0.9);
        const val = (Math.sin(2 * Math.PI * note * time) + Math.sin(2 * Math.PI * note * 2 * time) * 0.2) * 0.07 * env;
        dataL[i0 + i] += val;
        dataR[i0 + i] += val;
      }
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1700;
    const gain = ctx.createGain();
    gain.gain.value = 0.9;
    src.connect(lp).connect(gain).connect(this.music);
    src.start();
    this.musicSource = src;
  }

  update(dt) {
    if (!this.ready || !this.crowdGain) return;
    const target = this.scene === 'fight' ? (0.25 + this.heat * 0.75) * this.settings.crowd * 0.8 : 0;
    this.crowdGain.gain.value += (target - this.crowdGain.gain.value) * Math.min(1, dt * 0.5);
    if (this.crowdFilter) this.crowdFilter.frequency.value = 600 + this.heat * 900;
  }

  setHeat(h) { this.heat = h; }

  noiseBurst({ duration = 0.12, freq = 1200, gain = 0.4, type = 'lowpass', sweep = 0 } = {}) {
    if (!this.ready || this.ctx.state !== 'running') return;
    const ctx = this.ctx;
    const len = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = freq;
    if (sweep) filter.frequency.linearRampToValueAtTime(freq + sweep, ctx.currentTime + duration);
    const g = ctx.createGain();
    g.gain.value = gain;
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    src.connect(filter).connect(g).connect(this.sfx);
    src.start();
  }

  tone({ freq = 220, duration = 0.2, gain = 0.2, type = 'sine', slide = 0 } = {}) {
    if (!this.ready || this.ctx.state !== 'running') return;
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    if (slide) o.frequency.linearRampToValueAtTime(freq + slide, ctx.currentTime + duration);
    const g = ctx.createGain();
    g.gain.value = gain;
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    o.connect(g).connect(this.sfx);
    o.start();
    o.stop(ctx.currentTime + duration + 0.02);
  }

  punch(power = 1) {
    this.noiseBurst({ duration: 0.09, freq: 800, gain: 0.28 * power, sweep: -400 });
    this.tone({ freq: 90, duration: 0.12, gain: 0.16 * power, slide: -40 });
  }
  block() {
    this.noiseBurst({ duration: 0.06, freq: 2500, gain: 0.12, type: 'highpass' });
    this.tone({ freq: 420, duration: 0.08, gain: 0.06, type: 'square' });
  }
  whoosh() {
    this.noiseBurst({ duration: 0.18, freq: 400, gain: 0.1, type: 'bandpass', sweep: 600 });
  }
  bell(times = 3) {
    if (!this.ready || this.ctx.state !== 'running') return;
    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        this.tone({ freq: 880, duration: 1.1, gain: 0.22, type: 'sine', slide: 0 });
        this.tone({ freq: 1320, duration: 0.9, gain: 0.1, type: 'sine' });
        this.tone({ freq: 440, duration: 1.3, gain: 0.12, type: 'triangle' });
      }, i * 240);
    }
  }
  count(n) {
    this.tone({ freq: 520, duration: 0.12, gain: 0.12, type: 'square' });
  }
  ko() {
    this.tone({ freq: 70, duration: 1.8, gain: 0.4, type: 'sine', slide: -30 });
    this.noiseBurst({ duration: 0.7, freq: 300, gain: 0.3, sweep: -200 });
    if (this.crowdGain) this.crowdGain.gain.value += 0.2;
  }
  cheer() {
    if (!this.ready) return;
    this.noiseBurst({ duration: 1.2, freq: 900, gain: 0.14, type: 'bandpass', sweep: 400 });
  }
  ui() {
    this.tone({ freq: 620, duration: 0.055, gain: 0.045, type: 'triangle', slide: 120 });
  }
  coin() {
    this.tone({ freq: 880, duration: 0.12, gain: 0.08, type: 'triangle' });
    setTimeout(() => this.tone({ freq: 1320, duration: 0.22, gain: 0.07, type: 'triangle' }), 70);
  }
  achievement() {
    [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => this.tone({ freq: f, duration: 0.4, gain: 0.09, type: 'triangle' }), i * 110));
  }

  handleEvents(events) {
    for (const ev of events) {
      switch (ev.type) {
        case 'punch': this.whoosh(); break;
        case 'hit': this.punch(1 + (ev.damage || 0) / 18); break;
        case 'critical': this.punch(1.6); this.cheer(); break;
        case 'block': this.block(); break;
        case 'whiff': this.whoosh(); break;
        case 'dodgeSuccess': this.whoosh(); break;
        case 'knockdown': this.punch(2); this.ko(); break;
        case 'ko': this.ko(); this.bell(1); break;
        case 'bell': this.bell(3); break;
        case 'count': this.count(ev.count); break;
        case 'guardBreak': this.tone({ freq: 140, duration: 0.3, gain: 0.2, type: 'sawtooth', slide: -60 }); break;
        case 'roundStart': this.bell(2); break;
        case 'roundEnd': this.bell(3); break;
        case 'result': this.cheer(); break;
        default: break;
      }
    }
  }
}
