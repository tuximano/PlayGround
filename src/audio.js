// ─────────────────────────────────────────────────────────────────────────────
// Tiny synthesised sound engine. No samples, no loading, instant response.
// All voices are scheduled on the WebAudio clock to avoid main-thread jitter.
// ─────────────────────────────────────────────────────────────────────────────
export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.noise = null;
    this.started = false;
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -18; comp.knee.value = 18; comp.ratio.value = 5;
    comp.attack.value = .003; comp.release.value = .18;
    this.master = this.ctx.createGain();
    this.master.gain.value = .34;
    this.master.connect(comp).connect(this.ctx.destination);

    const len = this.ctx.sampleRate * 1.5;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    this.noise = buf;
    this._ambience();
    this.started = true;
  }

  setMuted(muted) {
    this.muted = muted;
    if (this.master) this.master.gain.setTargetAtTime(muted ? 0 : .34, this.ctx.currentTime, .03);
  }

  _ambience() {
    if (!this.ctx) return;
    // Wind bed.
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise; src.loop = true;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 340; filter.Q.value = .35;
    const gain = this.ctx.createGain(); gain.gain.value = .035;
    src.connect(filter).connect(gain).connect(this.master);
    src.start();
    // Electrical hum.
    const hum = this.ctx.createOscillator();
    hum.type = 'sine'; hum.frequency.value = 54;
    const humGain = this.ctx.createGain(); humGain.gain.value = .012;
    hum.connect(humGain).connect(this.master);
    hum.start();
  }

  _noise({ dur = .1, gain = .2, type = 'bandpass', freq = 1200, q = .8, delay = 0, pitch = 1 } = {}) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime + delay;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    src.playbackRate.value = pitch;
    const f = this.ctx.createBiquadFilter();
    f.type = type; f.frequency.setValueAtTime(freq, t); f.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    src.connect(f).connect(g).connect(this.master);
    src.start(t); src.stop(t + dur + .01);
  }

  _tone({ freq = 220, end = 70, dur = .12, gain = .15, type = 'sine', delay = 0 } = {}) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime + delay;
    const o = this.ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(20, end), t + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g).connect(this.master);
    o.start(t); o.stop(t + dur + .01);
  }

  shot() {
    this._noise({ dur: .11, gain: .58, type: 'bandpass', freq: 1550, q: .55, pitch: .92 });
    this._noise({ dur: .045, gain: .28, type: 'highpass', freq: 3400, q: .5 });
    this._tone({ freq: 145, end: 46, dur: .16, gain: .4, type: 'triangle' });
  }

  impact() { this._noise({ dur: .06, gain: .18, type: 'bandpass', freq: 2100, q: 1.2 }); }

  whiff() { this._noise({ dur: .09, gain: .07, type: 'highpass', freq: 3200, q: .4 }); }

  hit(head) {
    this._tone({ freq: head ? 1450 : 1120, end: head ? 980 : 760, dur: .055, gain: .14, type: 'square' });
    this._noise({ dur: .045, gain: .14, type: 'bandpass', freq: 2800, q: 2 });
  }

  kill(head) {
    this._tone({ freq: head ? 760 : 620, end: 980, dur: .08, gain: .12, type: 'triangle' });
    this._tone({ freq: 370, end: 260, dur: .17, gain: .12, type: 'sine', delay: .035 });
    this._noise({ dur: .22, gain: .18, type: 'lowpass', freq: 700, q: .6 });
  }

  reloadStart() {
    this._noise({ dur: .05, gain: .15, type: 'bandpass', freq: 1800, q: 2 });
    this._tone({ freq: 190, end: 120, dur: .06, gain: .12, type: 'square', delay: .05 });
  }

  reloadEnd() {
    this._noise({ dur: .045, gain: .2, type: 'bandpass', freq: 2300, q: 2 });
    this._tone({ freq: 260, end: 180, dur: .05, gain: .1, type: 'square', delay: .02 });
  }

  dryFire() { this._noise({ dur: .035, gain: .14, type: 'highpass', freq: 4200, q: .6 }); }

  slideStart() {
    this._noise({ dur: .38, gain: .14, type: 'bandpass', freq: 620, q: .5, pitch: .55 });
  }

  jump() {
    this._noise({ dur: .16, gain: .07, type: 'bandpass', freq: 780, q: .7, pitch: .7 });
    this._tone({ freq: 140, end: 90, dur: .1, gain: .05, type: 'sine' });
  }

  land(impact = 10) {
    const k = Math.min(1, impact / 16);
    this._noise({ dur: .11, gain: .16 * k, type: 'lowpass', freq: 420, q: .3 });
    this._tone({ freq: 78, end: 42, dur: .12, gain: .17 * k, type: 'sine' });
  }

  footstep() {
    this._noise({ dur: .055, gain: .075, type: 'bandpass', freq: 820 + Math.random() * 500, q: .7, pitch: .7 });
  }

  mantle() {
    this._noise({ dur: .14, gain: .1, type: 'bandpass', freq: 1050, q: .7, pitch: .8 });
    this._tone({ freq: 110, end: 70, dur: .14, gain: .08, type: 'triangle' });
  }

  mantleEnd() {
    this._noise({ dur: .08, gain: .07, type: 'lowpass', freq: 500, q: .3 });
  }

  respawn(index = 0) {
    this._tone({ freq: 660 + index * 24, end: 840 + index * 28, dur: .12, gain: .025, type: 'sine' });
  }

  uiClick() { this._tone({ freq: 560, end: 720, dur: .05, gain: .04, type: 'square' }); }
}
