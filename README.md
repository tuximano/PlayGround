# PlayGround

<!-- omgithub:readme:start -->
## 🚀 Build, play, and remix with OMGithub

**Created using [OMGithub.com](https://go.ondev.store/).**

[![OMGithub](https://img.shields.io/badge/OMGithub-Open%20project-orange?style=for-the-badge)](https://go.ondev.store/tuximano/PlayGround)
[![GitHub](https://img.shields.io/badge/GitHub-Source-181717?logo=github&style=for-the-badge)](https://github.com/tuximano/PlayGround)

- 🎮 [Open the project](https://go.ondev.store/tuximano/PlayGround).
- ✨ [Remix this project](https://go.ondev.store/tuximano/PlayGround?remix=1).
- 💻 [Explore the source](https://github.com/tuximano/PlayGround).
- 🛠️ [Check build runs](https://github.com/tuximano/PlayGround/actions).
- 🐛 [Report an issue](https://github.com/tuximano/PlayGround/issues).
- 👤 [Explore the creator's projects](https://go.ondev.store/tuximano).
- 🌍 [Create with OMGithub](https://go.ondev.store/).
<!-- omgithub:readme:end -->

## COMBAT//SHIFT

A small, dependency-free first-person movement arena built with a locally vendored Three.js. The UI and branding are in Brazilian Portuguese, and everything is procedural: no external textures, models, or audio files.

Serve the folder with any static file server (the project has no build step) and open `index.html`:

```bash
python3 -m http.server 3000
```

### Controls

| Input | Action |
| --- | --- |
| `WASD` | Move / air-strafe |
| `Shift` | Sprint + dynamic FOV |
| `Ctrl` / `C` | Infinite slide (steers toward the camera) |
| `Space` | Jump / bunny hop (hold on landing to chain) |
| Mouse 1 | Fire the VK-9 |
| `R` | Reload |
| `M` | Mute |
| Edge / obstacle | Automatic mantle |

On phones and tablets the same actions are available through the on-screen stick and action buttons, with tap-to-look dragging on the canvas.

### Notes

- Fixed 120 Hz simulation with render-rate-independent animations.
- Slide and jump preserve horizontal momentum; a 180-degree look turns the slide direction without scrubbing speed.
- Static geometry is batched per material to keep draw calls low, and software WebGL renderers automatically use a lighter pixel ratio.
- Synthesized WebAudio effects require one user gesture (the `START` button).
- Optional test hook: `window.COMBAT_SHIFT` exposes state, teleport/look helpers, and `fire()`.

Screenshots of the finished build are in `screenshots/`.

