// ─────────────────────────────────────────────────────────────────────────────
// Tuning lives in one place. Values are in metres / seconds / radians.
// The movement model is deliberately "arcade first": friction is low, input
// acceleration is high, and every aerial system preserves horizontal momentum.
// ─────────────────────────────────────────────────────────────────────────────
export const CONFIG = {
  arena: {
    halfSize: 28,
    spawn: { x: -1.5, y: 0, z: 21.5 },
  },

  player: {
    radius: 0.36,
    standingHeight: 1.82,
    crouchHeight: 1.12,
    eyeStanding: 1.65,
    eyeSliding: 1.03,
    stepHeight: 0.43,
  },

  movement: {
    walkSpeed: 8.2,
    sprintSpeed: 13.4,
    groundAcceleration: 78,
    groundFriction: 9.2,
    stopSpeed: 2.6,
    jumpSpeed: 8.9,
    gravity: 25.0,
    coyoteTime: 0.09,
    jumpBufferTime: 0.13,

    // Air control uses a Quake-style projection. It can add speed but never
    // subtracts the player's existing momentum.
    airAcceleration: 62,
    airWishSpeed: 4.2,
    maxAirSpeed: 21.5,
    airSteerRate: 1.15,
  },

  slide: {
    minEntrySpeed: 8.4,
    entryBoost: 1.035,
    maxSpeed: 22.5,
    turnRate: 8.8,
    drag: 0.055, // effectively infinite: a full second costs ~5% speed
    jumpBoost: 1.055,
  },

  mantle: {
    minHeight: 0.55,
    maxHeight: 2.25,
    reach: 1.25,
    duration: 0.29,
    cooldown: 0.18,
  },

  camera: {
    baseFov: 79,
    sprintFov: 14,
    slideFov: 5,
    airFov: 3,
    fovLerp: 7.5,
    mouseSensitivity: 0.00185,
    pitchLimit: 1.43,
    bobFrequency: 8.4,
    bobAmount: 0.022,
  },

  weapon: {
    magazine: 30,
    fireInterval: 0.088, // ~680 RPM
    reloadTime: 1.45,
    damageBody: 34,
    damageHead: 100,
    spreadStill: 0.0018,
    spreadMoving: 0.011,
    spreadAir: 0.022,
    recoilPitch: 0.014,
    recoilYaw: 0.005,
  },
};

export const isTouchDevice = () =>
  matchMedia('(pointer: coarse)').matches ||
  navigator.maxTouchPoints > 0 ||
  matchMedia('(max-width: 900px)').matches;
