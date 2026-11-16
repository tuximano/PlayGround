# LASTLIGHT — Field Operations

LASTLIGHT is an offline, browser-based first-person shooter prototype built with Canvas 2D, vanilla JavaScript, and CSS. It is designed to run on desktop and mobile browsers without a build step.

## Run locally

From the project directory, start a static web server:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000> in a modern browser. For mobile testing, open the same server on a device connected to the same network. The browser may need to allow pointer lock for desktop mouse-look.

## Play

- **Ranked 4v4:** round-based local matches with bot teammates and opponents, a loadout purchase screen, four selectable map themes, and locally saved ranked progression.
- **Field Survival:** a 25-operator offline survival match on a larger map, with a shrinking safe zone, loot, and separate survival rank progression.
- **Firing Range:** a practice session.
- **Arsenal:** a catalog of 34 weapon profiles. Ranked loadouts expose a selection of purchasable weapons.
- **Settings/profile:** sensitivity, field of view, volume value, graphics preference, map selection, gyroscope preference, and a local service record. Preferences and progression use browser local storage.

### Controls

**Desktop:** WASD to move, mouse to look, left mouse button to fire, `R` to reload, `Q` to switch weapon, `C` to crouch, `Space` to jump, and `Esc` to pause. Aim using the on-screen button when available.

**Touch:** use the left joystick to move, drag the right side to look, and use the action buttons to aim, fire, crouch, jump, reload, and switch weapons.

## Scope and limitations

This is a playable **2D raycast-style browser prototype**, not a production 3D FPS. Its visuals and bot behavior are lightweight procedural approximations. It does not include online multiplayer, matchmaking, real-world weapon simulation, authored 3D assets, voice/audio playback, a fully configurable HUD, or a native Android application/APK. The settings currently save preference values; volume, graphics quality, gyroscope input, and HUD customization are not fully wired to gameplay. Local browser storage is device/browser-specific and is not cloud-synced.

The project has no dependency-install or compilation step. To check JavaScript syntax:

```sh
node --check game.js
```
