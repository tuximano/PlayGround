import * as THREE from 'three';
import { CONFIG as C } from './config.js';

const _forward = new THREE.Vector3();
const _wish = new THREE.Vector3();
const _tmp = new THREE.Vector3();

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const damp = (a, b, rate, dt) => a + (b - a) * (1 - Math.exp(-rate * dt));
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// ─────────────────────────────────────────────────────────────────────────────
// PlayerController
// Custom capsule-ish character controller. The world is a compact set of AABB
// colliders, which keeps collision queries branch-light and deterministic.
//
// Core rules:
//  • Ground movement: friction + very high acceleration.
//  • Slide: speed is preserved and steered toward the camera; no duration cap.
//  • Air: Quake-style acceleration adds momentum, never removes it.
//  • Jump: landing while jump is held auto-bhops with full horizontal speed.
//  • Mantle: a short, automatic vault over ledges in front of the player.
// ─────────────────────────────────────────────────────────────────────────────
export class PlayerController {
  constructor(camera, world) {
    this.camera = camera;
    this.world = world;

    this.position = new THREE.Vector3(C.arena.spawn.x, C.arena.spawn.y, C.arena.spawn.z);
    this.velocity = new THREE.Vector3();
    this.yaw = 0;
    this.pitch = 0;

    this.radius = C.player.radius;
    this.standingHeight = C.player.standingHeight;
    this.height = this.standingHeight;
    this.grounded = true;
    this.sliding = false;
    this.crouching = false;
    this.sprinting = false;
    this.mantling = false;
    this.airborne = false;

    this.eyeHeight = C.player.eyeStanding;
    this.eyeTarget = this.eyeHeight;
    this.bobPhase = 0;
    this.bobOffset = 0;
    this.bobX = 0;
    this.landDip = 0;
    this.landSpring = 0;
    this.slideRoll = 0;
    this.strafeRoll = 0;
    this.fov = C.camera.baseFov;
    this.speed = 0;
    this.horizontalSpeed = 0;
    this.airTime = 0;
    this.groundTime = 0;
    this.coyote = 0;
    this.jumpBuffer = 0;
    this.mantleCooldown = 0;
    this.lastGrounded = true;
    this.wasSliding = false;
    this.bhopChain = 0;
    this.slideTime = 0;
    this.events = [];

    this._mantle = null;
    this._wallHit = null;
    this._prevPosition = this.position.clone();
    this._slideDir = new THREE.Vector2(0, -1);
    this._baseYaw = this.yaw;
  }

  reset() {
    this.position.set(C.arena.spawn.x, C.arena.spawn.y, C.arena.spawn.z);
    this.velocity.set(0, 0, 0);
    this.yaw = 0; this.pitch = 0;
    this.grounded = true; this.sliding = false; this.crouching = false;
    this.mantling = false; this.airborne = false; this.speed = 0;
    this.eyeHeight = C.player.eyeStanding;
    this._mantle = null;
  }

  emit(name, data = null) {
    this.events.push({ name, data });
  }

  addLook(dx, dy) {
    this.yaw -= dx * C.camera.mouseSensitivity;
    this.pitch -= dy * C.camera.mouseSensitivity;
    this.pitch = clamp(this.pitch, -C.camera.pitchLimit, C.camera.pitchLimit);
    // Keep yaw bounded to avoid precision loss after very long sessions.
    if (this.yaw > Math.PI) this.yaw -= Math.PI * 2;
    if (this.yaw < -Math.PI) this.yaw += Math.PI * 2;
  }

  get forward() {
    _forward.set(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    return _forward;
  }

  get speedRatio() {
    return clamp((this.horizontalSpeed - 4) / (C.movement.sprintSpeed - 4), 0, 1.35);
  }

  // ── Core step, called at a fixed 120 Hz ─────────────────────────────────────
  update(dt, input) {
    this._prevPosition.copy(this.position);
    this.lastGrounded = this.grounded;
    this.justLanded = false;
    this._jumpHeld = input.jumpHeld;
    this.mantleCooldown = Math.max(0, this.mantleCooldown - dt);
    this.jumpBuffer = Math.max(0, this.jumpBuffer - dt);

    if (this.mantling) {
      this._updateMantle(dt);
      this._updateCamera(dt);
      return;
    }

    if (input.jumpPressed) this.jumpBuffer = C.movement.jumpBufferTime;
    const wish = this._wishDirection(input);
    const wishLen = Math.hypot(wish.x, wish.z);

    // Crouch / slide intent. Entry is automatic while carrying speed.
    this._updateCrouchState(input);

    // ── Jump / bunny hop ─────────────────────────────────────────────────────
    const canJump = this.grounded || this.coyote > 0;
    if ((this.jumpBuffer > 0 || (input.jumpHeld && this.grounded)) && canJump) {
      if (!this._tryMantle(input, true)) {
        this._jump(input);
      }
      this.jumpBuffer = 0;
    }

    if (this.mantling) {
      this._updateCamera(dt);
      return;
    }

    // ── Horizontal locomotion ───────────────────────────────────────────────
    if (this.sliding && this.grounded) {
      this._updateSlide(dt, input);
    } else if (this.grounded) {
      this._updateGround(dt, wish, wishLen, input);
    } else {
      this._updateAir(dt, wish, wishLen);
    }

    // ── Integrate + collide ─────────────────────────────────────────────────
    this._moveHorizontal(this.velocity.x * dt, this.velocity.z * dt);
    this._moveVertical(dt);

    // Mantle can trigger mid-air when the player carries momentum into a ledge.
    if (!this.grounded && !this.mantling && this.mantleCooldown <= 0 && this.airTime > 0.05) {
      const intoLedge = this._wallHit && this.forward.dot(_tmp.set(this.velocity.x, 0, this.velocity.z).normalize()) > 0.3;
      if (intoLedgeGuard(this.velocity, this.forward) || intoLedge) {
        this._tryMantle(input, false);
      }
    }

    this._updateTimers(dt);
    this._updateCamera(dt);

    this.horizontalSpeed = Math.hypot(this.velocity.x, this.velocity.z);
    this.speed = this.horizontalSpeed;
    if (this.horizontalSpeed > C.movement.sprintSpeed + 0.5 && !this.sliding) this.bhopChain = Math.max(this.bhopChain, 1);
  }

  _updateTimers(dt) {
    if (this.grounded) {
      this.airTime = 0;
      this.groundTime += dt;
      this.coyote = C.movement.coyoteTime;
      if (this.sliding) this.slideTime += dt;
    } else {
      this.airTime += dt;
      this.groundTime = 0;
      this.coyote = Math.max(0, this.coyote - dt);
    }
    this.airborne = !this.grounded && !this.mantling;
  }

  _wishDirection(input) {
    const f = this.forward;
    _wish.set(
      f.x * input.moveY - f.z * input.moveX,
      0,
      f.z * input.moveY + f.x * input.moveX
    );
    const len = _wish.length();
    if (len > 1) _wish.multiplyScalar(1 / len);
    return _wish;
  }

  _updateCrouchState(input) {
    const wantsCrouch = input.crouchHeld;
    const speed = Math.hypot(this.velocity.x, this.velocity.z);

    if (wantsCrouch && !this.sliding && this.grounded && speed >= C.slide.minEntrySpeed) {
      this._startSlide(speed);
    }

    if (wantsCrouch && !this.sliding) {
      this.crouching = true;
      this.height = C.player.crouchHeight;
    }

    if (!wantsCrouch && this.sliding) {
      if (this._canStand()) {
        this.sliding = false;
        this.crouching = false;
        this.height = this.standingHeight;
        this.emit('slideEnd');
      }
    }

    if (!wantsCrouch && !this.sliding && this.crouching) {
      if (this._canStand()) {
        this.crouching = false;
        this.height = this.standingHeight;
      }
    }

    if (this.sliding) {
      this.crouching = true;
      this.height = C.player.crouchHeight;
    }
  }

  _startSlide(speed) {
    this.sliding = true;
    this.crouching = true;
    this.height = C.player.crouchHeight;
    this.slideTime = 0;
    this.wasSliding = true;
    const dir = new THREE.Vector2(this.velocity.x, this.velocity.z);
    if (dir.lengthSq() < 0.01) dir.set(-Math.sin(this.yaw), -Math.cos(this.yaw));
    dir.normalize();
    this._slideDir.copy(dir);
    const boosted = Math.min(C.slide.maxSpeed, speed * C.slide.entryBoost);
    this.velocity.x = dir.x * boosted;
    this.velocity.z = dir.y * boosted;
    this.emit('slideStart', boosted);
  }

  _updateSlide(dt, input) {
    const speed = Math.hypot(this.velocity.x, this.velocity.z);
    if (speed < 1.2) {
      this.sliding = false;
      this.crouching = input.crouchHeld;
      this.height = this.crouching ? C.player.crouchHeight : this.standingHeight;
      return;
    }

    // The slide has no duration timer. It only bleeds an almost imperceptible
    // amount of speed so a good line still feels like it stores momentum.
    let newSpeed = Math.min(C.slide.maxSpeed, speed * (1 - C.slide.drag * dt));

    // Steer the velocity vector, not the camera. A 180° look becomes a 180°
    // velocity turn at a fixed angular rate while speed stays constant.
    this._slideDir.set(this.velocity.x / speed, this.velocity.z / speed);
    const f = this.forward;
    const targetAngle = Math.atan2(f.x, f.z) + input.moveX * 0.38;
    const currentAngle = Math.atan2(this._slideDir.x, this._slideDir.y);
    let delta = targetAngle - currentAngle;
    while (delta > Math.PI) delta -= Math.PI * 2;
    while (delta < -Math.PI) delta += Math.PI * 2;
    const turn = clamp(delta, -C.slide.turnRate * dt, C.slide.turnRate * dt);
    const newAngle = currentAngle + turn;
    this._slideDir.set(Math.sin(newAngle), Math.cos(newAngle));

    this.velocity.x = this._slideDir.x * newSpeed;
    this.velocity.z = this._slideDir.y * newSpeed;
    this._slideTurn = turn / Math.max(dt, 0.0001);
  }

  _updateGround(dt, wish, wishLen, input) {
    const speed = Math.hypot(this.velocity.x, this.velocity.z);
    const crouching = this.crouching || this.sliding;
    this.sprinting = !crouching && input.sprintHeld && input.moveY > 0.15;

    // Ground friction: high enough to feel snappy, low enough to preserve a
    // post-slide flow state. While holding a direction we use a lighter drag,
    // otherwise acceleration and friction would settle below sprint speed.
    if (speed > 0) {
      const friction = wishLen > 0.05 ? 3.2 : C.movement.groundFriction;
      const drop = Math.max(speed, C.movement.stopSpeed) * friction * dt;
      const newSpeed = Math.max(0, speed - drop) / speed;
      this.velocity.x *= newSpeed;
      this.velocity.z *= newSpeed;
    }

    const targetSpeed = crouching ? 4.2 : (this.sprinting ? C.movement.sprintSpeed : C.movement.walkSpeed);
    this._accelerate(wish, wishLen, targetSpeed, C.movement.groundAcceleration, dt);
  }

  _updateAir(dt, wish, wishLen) {
    this.crouching = false;
    this.sprinting = false;
    this.height = this.standingHeight;

    // Quake air acceleration. The projection means holding a strafe key can
    // bend the trajectory and even gain a little speed, but never scrubs it.
    if (wishLen > 0.01) {
      const projected = this.velocity.x * wish.x + this.velocity.z * wish.z;
      const add = C.movement.airWishSpeed - projected;
      if (add > 0) {
        const accel = Math.min(C.movement.airAcceleration * dt, add);
        this.velocity.x += wish.x * accel;
        this.velocity.z += wish.z * accel;
      } else {
        // At high speed, nudge the vector toward the input without changing
        // magnitude. This is the "no deceleration" part of the brief.
        const vx = this.velocity.x, vz = this.velocity.z;
        const speed = Math.hypot(vx, vz);
        if (speed > 1) {
          const steer = Math.min(1, dt * C.movement.airSteerRate);
          let nx = vx / speed + wish.x * steer * 0.14;
          let nz = vz / speed + wish.z * steer * 0.14;
          const nl = Math.hypot(nx, nz) || 1;
          nx /= nl; nz /= nl;
          this.velocity.x = nx * speed;
          this.velocity.z = nz * speed;
        }
      }
    }

    // Preserve the boost, but prevent runaway acceleration.
    const hs = Math.hypot(this.velocity.x, this.velocity.z);
    if (hs > C.movement.maxAirSpeed) {
      const s = C.movement.maxAirSpeed / hs;
      this.velocity.x *= s;
      this.velocity.z *= s;
    }
  }

  _accelerate(wish, wishLen, targetSpeed, accel, dt) {
    if (wishLen < 0.01) return;
    const projected = this.velocity.x * wish.x + this.velocity.z * wish.z;
    const add = targetSpeed - projected;
    if (add <= 0) return;
    const amount = Math.min(accel * dt, add);
    this.velocity.x += wish.x * amount;
    this.velocity.z += wish.z * amount;
  }

  _jump(input) {
    const wasSliding = this.sliding;
    const slideSpeed = Math.hypot(this.velocity.x, this.velocity.z);
    this.velocity.y = C.movement.jumpSpeed;
    if (wasSliding && slideSpeed > 0) {
      // Slide-jump keeps almost all momentum and adds a tiny exit boost.
      const s = Math.min(C.slide.maxSpeed, slideSpeed * C.slide.jumpBoost) / slideSpeed;
      this.velocity.x *= s;
      this.velocity.z *= s;
    }
    this.sliding = false;
    this.crouching = false;
    this.height = this.standingHeight;
    this.grounded = false;
    this.coyote = 0;
    this.justLanded = false;
    this.emit(wasSliding ? 'slideJump' : 'jump', slideSpeed);
  }

  _updateVertical(dt) {
    if (this.grounded) {
      // Snap to steps and ramps while staying glued to the floor.
      const support = this._groundHeight(this.position.x, this.position.z, this.position.y + C.player.stepHeight + 0.08);
      if (support > -Infinity && this.position.y - support <= 0.48 && support <= this.position.y + C.player.stepHeight + 0.02) {
        this.position.y = support;
        this.velocity.y = 0;
      } else if (support > -Infinity && this.position.y - support > 0.49) {
        this.grounded = false;
      }
      if (this.grounded) return;
    }

    const oldY = this.position.y;
    this.velocity.y -= C.movement.gravity * dt;
    this.position.y += this.velocity.y * dt;

    const support = this._groundHeight(this.position.x, this.position.z, oldY + 0.04);
    if (this.velocity.y <= 0 && this.position.y <= support) {
      const impact = Math.abs(this.velocity.y);
      this.position.y = support;
      this.velocity.y = 0;
      this.grounded = true;
      this.justLanded = true;
      this.landDip = Math.min(0.13, impact * 0.009);
      this.landSpring = impact;
      this.emit('land', impact);

      // Auto-bhop: hold jump and the next physics step immediately launches.
      if (this.jumpBuffer > 0 || (this.grounded && this._jumpHeld)) {
        this.jumpBuffer = 0;
        this._bhopRequested = true;
      }
    } else {
      this.grounded = false;

      // Ceiling collision. Handles the low container underpass.
      const head = this.position.y + this.height;
      for (const { box } of this.world.colliders) {
        if (!this._circleOverlap(box, this.position.x, this.position.z, this.radius * 0.9)) continue;
        if (box.min.y < head && box.min.y >= oldY + this.height - 0.05) {
          if (this.velocity.y > 0) {
            this.position.y = box.min.y - this.height;
            this.velocity.y = 0;
          }
        }
      }
    }
  }

  _moveVertical(dt) {
    // Jump requests coming from the landing branch or the held-jump bhop.
    if (this._bhopRequested) {
      this._bhopRequested = false;
      if (!this._tryMantle(null, false)) this._jump(null);
    }
    this._updateVertical(dt);
  }

  _moveHorizontal(dx, dz) {
    this._wallHit = null;
    this.position.x += dx;
    this._resolveAxis('x', dx);
    this.position.z += dz;
    this._resolveAxis('z', dz);

    const limit = C.arena.halfSize - 0.7;
    this.position.x = clamp(this.position.x, -limit, limit);
    this.position.z = clamp(this.position.z, -limit, limit);
  }

  _resolveAxis(axis, delta) {
    if (Math.abs(delta) < 0.00001) return;
    const r = this.radius;
    for (const { box } of this.world.colliders) {
      if (!this._blocksPlayer(box)) continue;
      if (!this._circleOverlap(box, this.position.x, this.position.z, r)) continue;

      if (axis === 'x') {
        const center = (box.min.x + box.max.x) * 0.5;
        if (this.position.x > center) this.position.x = box.max.x + r + 0.001;
        else this.position.x = box.min.x - r - 0.001;
        this.velocity.x = 0;
      } else {
        const center = (box.min.z + box.max.z) * 0.5;
        if (this.position.z > center) this.position.z = box.max.z + r + 0.001;
        else this.position.z = box.min.z - r - 0.001;
        this.velocity.z = 0;
      }
      this._wallHit = box;
    }
  }

  _blocksPlayer(box) {
    return box.max.y > this.position.y + C.player.stepHeight + 0.015 &&
      box.min.y < this.position.y + this.height - 0.018;
  }

  _circleOverlap(box, x, z, r) {
    const cx = clamp(x, box.min.x, box.max.x);
    const cz = clamp(z, box.min.z, box.max.z);
    const dx = x - cx, dz = z - cz;
    return dx * dx + dz * dz < r * r;
  }

  _groundHeight(x, z, maxY) {
    let best = 0; // world floor
    for (const { box } of this.world.colliders) {
      if (!this._circleOverlap(box, x, z, this.radius * 0.72)) continue;
      const top = box.max.y;
      if (top <= maxY + 0.001 && top > best) best = top;
    }
    return best;
  }

  _canStand() {
    const target = this.position.y + this.standingHeight - 0.02;
    for (const { box } of this.world.colliders) {
      if (box.min.y >= target) continue;
      if (box.max.y <= this.position.y + C.player.stepHeight) continue;
      if (this._circleOverlap(box, this.position.x, this.position.z, this.radius * 0.8)) return false;
    }
    return true;
  }

  // ── Mantling ────────────────────────────────────────────────────────────────
  _tryMantle(input, fromJump) {
    if (this.mantleCooldown > 0 || this.mantling) return false;
    if (!fromJump && this.airTime < 0.04) return false;
    const ledge = this._findLedge();
    if (!ledge) return false;

    const speed = Math.hypot(this.velocity.x, this.velocity.z);
    this._mantle = {
      t: 0,
      duration: C.mantle.duration,
      start: this.position.clone(),
      end: new THREE.Vector3(ledge.x, ledge.top + 0.01, ledge.z),
      speed,
      dirX: ledge.dirX,
      dirZ: ledge.dirZ,
    };
    this.mantling = true;
    this.grounded = false;
    this.sliding = false;
    this.crouching = false;
    this.height = this.standingHeight;
    this.velocity.set(0, 0, 0);
    this.mantleCooldown = C.mantle.cooldown;
    this.emit('mantle', ledge.top);
    return true;
  }

  _findLedge() {
    const f = this.forward;
    const feet = this.position.y;
    let best = null;
    let bestTop = -Infinity;

    for (const dist of [0.68, 1.0, 1.22]) {
      const px = this.position.x + f.x * dist;
      const pz = this.position.z + f.z * dist;
      for (const { box } of this.world.colliders) {
        const top = box.max.y;
        if (top < feet + C.mantle.minHeight || top > feet + C.mantle.maxHeight) continue;
        if (px < box.min.x - 0.08 || px > box.max.x + 0.08 || pz < box.min.z - 0.08 || pz > box.max.z + 0.08) continue;
        if (top <= bestTop) continue;
        if (!this._hasHeadroom(top, px, pz)) continue;
        bestTop = top;
        best = {
          top,
          x: this.position.x + f.x * (dist + 0.36),
          z: this.position.z + f.z * (dist + 0.36),
          dirX: f.x,
          dirZ: f.z,
        };
      }
    }
    return best;
  }

  _hasHeadroom(top, x, z) {
    const head = top + this.standingHeight - 0.05;
    for (const { box } of this.world.colliders) {
      if (box.max.y <= top + 0.05 || box.min.y >= head) continue;
      if (x > box.min.x - this.radius * 0.7 && x < box.max.x + this.radius * 0.7 &&
          z > box.min.z - this.radius * 0.7 && z < box.max.z + this.radius * 0.7) return false;
    }
    return true;
  }

  _updateMantle(dt) {
    const m = this._mantle;
    if (!m) { this.mantling = false; return; }
    m.t += dt;
    const t = clamp(m.t / m.duration, 0, 1);

    // Up first, then over the lip. Reads as a fast arcade pull-up.
    const up = easeOutCubic(Math.min(1, t / 0.68));
    const over = easeInOutCubic(clamp((t - 0.22) / 0.78, 0, 1));
    this.position.y = m.start.y + (m.end.y - m.start.y) * up;
    this.position.x = m.start.x + (m.end.x - m.start.x) * over;
    this.position.z = m.start.z + (m.end.z - m.start.z) * over;
    this.eyeTarget = C.player.eyeStanding - 0.15 + Math.sin(t * Math.PI) * 0.1;

    if (t >= 1) {
      this.position.copy(m.end);
      this.grounded = true;
      this.mantling = false;
      this._mantle = null;
      const exitSpeed = Math.max(3.2, Math.min(C.movement.sprintSpeed, m.speed * 0.94));
      this.velocity.set(m.dirX * exitSpeed, 0, m.dirZ * exitSpeed);
      this.mantleCooldown = C.mantle.cooldown;
      this.emit('mantleEnd');
    }
  }

  // ── Camera presentation ────────────────────────────────────────────────────
  _updateCamera(dt) {
    const speed = Math.hypot(this.velocity.x, this.velocity.z);
    const targetEye = this.sliding ? C.player.eyeSliding : (this.crouching ? C.player.eyeSliding + 0.12 : C.player.eyeStanding);
    this.eyeTarget = this.mantling ? this.eyeTarget : targetEye;
    this.eyeHeight = damp(this.eyeHeight, this.eyeTarget, 14, dt);

    // Bob frequency is speed-driven, amplitude is subtle so aiming stays crisp.
    if (this.grounded && speed > 0.5) {
      this.bobPhase += dt * (C.camera.bobFrequency + speed * 0.36);
    }
    const moving = this.grounded ? Math.min(1, speed / C.movement.walkSpeed) : 0;
    const bobAmp = C.camera.bobAmount * moving * (this.sliding ? 1.9 : 1);
    this.bobOffset = Math.sin(this.bobPhase * 2) * bobAmp - this.landDip;
    this.bobX = Math.cos(this.bobPhase) * bobAmp * 1.75;

    this.landDip = damp(this.landDip, 0, 8.5, dt);
    this.landSpring = damp(this.landSpring, 0, 12, dt);

    // Turn the camera into the slide direction for juice, not for control.
    const slideTurn = this.sliding ? clamp((this._slideTurn || 0) * -0.012, -0.06, 0.06) : 0;
    const lateralLean = -clamp(this.velocity.dot(new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw))) * 0.0022, -0.022, 0.022);
    this.slideRoll = damp(this.slideRoll, slideTurn, 8, dt);
    this.strafeRoll = damp(this.strafeRoll, lateralLean, 7, dt);

    // Dynamic FOV: speed does the talking, sprint and slide add a little drama.
    let fovTarget = C.camera.baseFov + this.speedRatio * C.camera.sprintFov;
    if (this.sprinting) fovTarget += 2.2;
    if (this.sliding) fovTarget += C.camera.slideFov;
    if (this.airborne && speed > 9) fovTarget += C.camera.airFov;
    this.fov = damp(this.fov, clamp(fovTarget, C.camera.baseFov, 104), C.camera.fovLerp, dt);

    const roll = this.slideRoll + this.strafeRoll;
    this.camera.position.set(
      this.position.x + this.bobX,
      this.position.y + this.eyeHeight + this.bobOffset,
      this.position.z
    );
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.set(this.pitch, this.yaw, roll);
    this.camera.fov = this.fov;
    this.camera.updateProjectionMatrix();
  }

  // Used by the HUD, weapon and audio layers.
  getState() {
    return {
      speed: this.horizontalSpeed,
      grounded: this.grounded,
      sliding: this.sliding,
      crouching: this.crouching,
      sprinting: this.sprinting,
      airborne: this.airborne,
      mantling: this.mantling,
      bhop: this.grounded && this.jumpBuffer > 0,
      airTime: this.airTime,
      slideTime: this.slideTime,
      yaw: this.yaw,
    };
  }
}

// Small guard keeps the mid-air ledge check from calling normalize() on zero.
function intoLedgeGuard(velocity, forward) {
  const speed = Math.hypot(velocity.x, velocity.z);
  if (speed < 1) return false;
  return (velocity.x * forward.x + velocity.z * forward.z) / speed > 0.55;
}
