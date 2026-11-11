import * as THREE from 'three';
import { CONFIG as C } from './config.js';
import { mergeByMaterial } from './merge.js';

// ─────────────────────────────────────────────────────────────────────────────
// First-person view model. Everything is built from primitives so it shares the
// same material/lighting language as the arena, while the animation layer runs
// independently from the physics for a 1-frame response.
// ─────────────────────────────────────────────────────────────────────────────
export class Weapon {
  constructor(camera, renderer) {
    this.camera = camera;
    this.renderer = renderer;
    this.root = new THREE.Group();
    this.rig = new THREE.Group();
    this.recoilGroup = new THREE.Group();
    this.root.add(this.rig);
    this.rig.add(this.recoilGroup);
    camera.add(this.root);

    this.recoil = 0;
    this.recoilYaw = 0;
    this.flashTime = 0;
    this.reloadTime = 0;
    this.reloading = false;
    this.base = new THREE.Vector3(0.39, -0.33, -1.06);
    this.root.position.copy(this.base);
    this.root.rotation.set(0.02, -0.035, 0.015);
    this.root.scale.setScalar(0.64);

    this._build();

    // A soft fill placed in front-left of the view model keeps the rifle legible
    // when the player faces away from the sun. Its falloff is short, so it barely
    // touches the arena itself.
    const kicker = new THREE.PointLight(0xffd9b3, 1.4, 2.6, 2);
    kicker.position.set(-0.55, 0.28, -0.72);
    camera.add(kicker);
  }

  _build() {
    const body = new THREE.MeshStandardMaterial({ color: 0x333c36, roughness: .44, metalness: .5 });
    const bodyDark = new THREE.MeshStandardMaterial({ color: 0x1a1f1d, roughness: .52, metalness: .45 });
    const tan = new THREE.MeshStandardMaterial({ color: 0xa08d72, roughness: .7, metalness: .08 });
    const rubber = new THREE.MeshStandardMaterial({ color: 0x131514, roughness: .93, metalness: .02 });
    const glow = new THREE.MeshBasicMaterial({ color: 0xff3b1d });
    const metal = new THREE.MeshStandardMaterial({ color: 0x626a66, roughness: .32, metalness: .9 });
    const glove = new THREE.MeshStandardMaterial({ color: 0x242621, roughness: .92, metalness: .02 });
    const sleeve = new THREE.MeshStandardMaterial({ color: 0x3d3e34, roughness: .98 });
    const add = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z); m.rotation.set(rx, ry, rz);
      this.recoilGroup.add(m);
      return m;
    };

    // Receiver + handguard.
    add(new THREE.BoxGeometry(.18, .19, .55), body, 0, 0, -.12);
    add(new THREE.BoxGeometry(.155, .16, .56), tan, 0, -.01, -.62);
    add(new THREE.BoxGeometry(.16, .035, .52), bodyDark, 0, .093, -.48);
    // Rail teeth.
    for (let i = 0; i < 9; i++) add(new THREE.BoxGeometry(.135, .022, .035), bodyDark, 0, .12, -.25 - i * .055);

    // Barrel + muzzle brake.
    const barrel = add(new THREE.CylinderGeometry(.025, .028, .55, 10), metal, 0, .02, -.98, Math.PI / 2, 0, 0);
    add(new THREE.CylinderGeometry(.045, .045, .14, 10), bodyDark, 0, .02, -1.25, Math.PI / 2, 0, 0);
    for (let i = 0; i < 3; i++) add(new THREE.BoxGeometry(.095, .015, .018), bodyDark, 0, .02, -1.19 - i * .036);
    // Gas block / front sight.
    add(new THREE.BoxGeometry(.06, .1, .06), bodyDark, 0, .105, -.94);
    add(new THREE.BoxGeometry(.04, .065, .032), bodyDark, 0, .15, -.94);
    add(new THREE.BoxGeometry(.013, .045, .013), metal, 0, .158, -.935);

    // Stock.
    add(new THREE.BoxGeometry(.09, .12, .28), body, 0, -.01, .26);
    add(new THREE.BoxGeometry(.14, .17, .10), bodyDark, 0, -.02, .40);
    add(new THREE.BoxGeometry(.145, .185, .025), rubber, 0, -.02, .458);
    add(new THREE.BoxGeometry(.075, .028, .14), bodyDark, 0, .075, .27);

    // Pistol grip + magazine.
    add(new THREE.BoxGeometry(.105, .25, .13), rubber, 0, -.21, .06, .23, 0, 0);
    add(new THREE.BoxGeometry(.11, .26, .19), bodyDark, 0, -.2, -.21, -.12, 0, 0);
    add(new THREE.BoxGeometry(.12, .025, .2), tan, 0, -.07, -.21, -.12, 0, 0);
    // Trigger guard.
    add(new THREE.TorusGeometry(.062, .01, 4, 10, Math.PI * 1.4), body, 0, -.12, -.03, 0, 0, Math.PI);

    // Holo sight.
    const sightY = .17;
    add(new THREE.BoxGeometry(.13, .045, .16), bodyDark, 0, sightY, -.2);
    add(new THREE.BoxGeometry(.085, .105, .02), bodyDark, 0, sightY + .075, -.26);
    add(new THREE.BoxGeometry(.085, .105, .02), bodyDark, 0, sightY + .075, -.14);
    add(new THREE.BoxGeometry(.085, .022, .14), bodyDark, 0, sightY + .126, -.2);
    const lens = add(new THREE.BoxGeometry(.067, .082, .006), new THREE.MeshBasicMaterial({ color: 0x18352f, transparent: true, opacity: .55 }), 0, sightY + .073, -.249);
    lens.material.depthWrite = false;
    const dot = add(new THREE.CircleGeometry(.007, 10), glow, 0, sightY + .073, -.243);
    dot.material.depthTest = false;
    dot.renderOrder = 12;
    // Laser unit.
    add(new THREE.BoxGeometry(.055, .06, .11), bodyDark, -.075, .03, -.88);
    add(new THREE.CircleGeometry(.013, 10), glow, -.106, .03, -.86, 0, -Math.PI / 2, 0);

    // Gloved support hand on the handguard.
    const hand = add(new THREE.BoxGeometry(.13, .115, .19), glove, -.02, -.12, -.57, 0, 0, -.12);
    hand.geometry.translate(0, 0, 0);
    add(new THREE.BoxGeometry(.1, .065, .12), glove, .035, -.16, -.49, .1, 0, 0);
    add(new THREE.BoxGeometry(.09, .09, .22), glove, .012, -.14, -.72, -.08, 0, 0);
    add(new THREE.BoxGeometry(.11, .105, .24), sleeve, -.07, -.23, -.3, .18, 0, .05);
    // Firing hand. The forearm stays short so it never crowds the near plane.
    add(new THREE.BoxGeometry(.115, .13, .17), glove, .005, -.235, .045, .2, 0, -.03);
    add(new THREE.BoxGeometry(.095, .09, .22), glove, .04, -.31, .10, .35, 0, 0);
    add(new THREE.BoxGeometry(.10, .10, .17), sleeve, .07, -.35, .005, .55, 0, -.02);

    // Collapse the static gun/arm geometry to one draw call per material.
    mergeByMaterial(this.recoilGroup);

    // Muzzle anchor + flash.
    this.muzzle = new THREE.Object3D();
    this.muzzle.position.set(0, .02, -1.33);
    this.recoilGroup.add(this.muzzle);

    const flashCanvas = document.createElement('canvas');
    flashCanvas.width = flashCanvas.height = 128;
    const ctx = flashCanvas.getContext('2d');
    const grd = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, 'rgba(255,255,235,1)');
    grd.addColorStop(.15, 'rgba(255,226,148,1)');
    grd.addColorStop(.38, 'rgba(255,125,34,.9)');
    grd.addColorStop(1, 'rgba(255,80,20,0)');
    ctx.fillStyle = grd; ctx.fillRect(0, 0, 128, 128);
    ctx.strokeStyle = 'rgba(255,205,120,.85)'; ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      ctx.beginPath(); ctx.moveTo(64, 64);
      const a = i / 8 * Math.PI * 2 + .2;
      const len = 22 + (i % 3) * 10;
      ctx.lineTo(64 + Math.cos(a) * len, 64 + Math.sin(a) * len); ctx.stroke();
    }
    const flashTex = new THREE.CanvasTexture(flashCanvas);
    flashTex.colorSpace = THREE.SRGBColorSpace;
    const flashMat = new THREE.MeshBasicMaterial({ map: flashTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false });
    this.flash = new THREE.Group();
    for (let i = 0; i < 2; i++) {
      const p = new THREE.Mesh(new THREE.PlaneGeometry(.34, .34), flashMat);
      p.rotation.z = i * Math.PI / 2;
      p.rotation.y = Math.PI / 2;
      this.flash.add(p);
    }
    this.flash.position.copy(this.muzzle.position);
    this.flash.visible = false;
    this.recoilGroup.add(this.flash);

    this.lens = lens;
  }

  show() { this.root.visible = true; }
  hide() { this.root.visible = false; }

  fire() {
    this.recoil = Math.min(1, this.recoil + .55);
    this.recoilYaw = (Math.random() - .5) * .35;
    this.flashTime = .045;
    this.flash.rotation.z = Math.random() * Math.PI;
    this.flash.visible = true;
  }

  startReload() {
    this.reloading = true;
    this.reloadTime = 0;
  }

  finishReload() {
    this.reloading = false;
    this.reloadTime = 0;
  }

  getMuzzleWorld(target = new THREE.Vector3()) {
    this.muzzle.getWorldPosition(target);
    return target;
  }

  update(dt, player, firing = false) {
    const speed = player.horizontalSpeed;
    const moving = player.grounded ? Math.min(1, speed / 8.2) : .1;
    const slide = player.sliding ? 1 : 0;

    // Portrait screens have a much narrower horizontal FOV. Pull the view model
    // inward and shrink it slightly so the muzzle is not cropped off-screen.
    const portrait = THREE.MathUtils.clamp((1.25 - this.camera.aspect) / .8, 0, 1);
    const baseX = this.base.x - .23 * portrait;
    const baseY = this.base.y - .012 * portrait;
    const baseZ = this.base.z - .06 * portrait;
    this.root.scale.setScalar(.64 - .04 * portrait);

    // Spring recoil.
    this.recoil = Math.max(0, this.recoil - dt * 9.5);
    this.recoilYaw *= Math.exp(-dt * 12);
    const kick = this.recoil * this.recoil * .065;

    // Sprint pose drops the gun; slide cants it. Both are fast, readable.
    const sprint = player.sprinting ? 1 : 0;
    const sprintDrop = sprint * (0.055 + Math.sin(player.bobPhase * 2) * .008);
    const slideDrop = slide * .07;

    const bobX = Math.cos(player.bobPhase) * .012 * moving;
    const bobY = Math.sin(player.bobPhase * 2) * .008 * moving;
    const air = player.airborne ? 1 : 0;
    const airLift = Math.sin(player.airTime * 5.5) * .008 * air;

    const reloadEase = this.reloading ? this.reloadTime / C.weapon.reloadTime : 0;
    const reloadArc = this.reloading ? Math.sin(Math.min(1, reloadEase) * Math.PI) : 0;

    this.root.position.set(
      baseX + bobX + slide * .04,
      baseY + bobY - sprintDrop - slideDrop + airLift - reloadArc * .12,
      baseZ + this.recoil * .06 + reloadArc * .03
    );
    this.root.rotation.set(
      .015 + this.recoil * .07 + reloadArc * .2 - sprint * .11,
      -.025 + this.recoilYaw * .13 + sprint * .1,
      .008 + slide * .11 + Math.sin(player.bobPhase) * .005 * moving - sprint * .13
    );

    this.recoilGroup.position.z = kick * 1.75;
    this.recoilGroup.rotation.x = this.recoil * .075;

    if (this.reloading) {
      this.reloadTime += dt;
      if (this.reloadTime >= C.weapon.reloadTime) this.finishReload();
    }

    if (this.flashTime > 0) {
      this.flashTime -= dt;
      this.flash.visible = true;
      this.flash.scale.setScalar(.8 + Math.random() * .55);
      if (this.flashTime <= 0) this.flash.visible = false;
    }

    // Holo dot pulses very slightly while firing.
    if (firing) this.lens.material.opacity = .72;
    else this.lens.material.opacity = .55;
  }
}
