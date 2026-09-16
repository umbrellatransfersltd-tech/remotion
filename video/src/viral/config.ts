// Edit timings derived from the source clip.
//
// Audio was analysed by rendering the source to WAV and autocorrelating the
// onset-strength envelope. Tempo came out at 124.5 BPM with the first downbeat
// at 0.148s, so every cut below lands on a real beat rather than an eyeballed
// one.
//
// Visually the take has three parts:
//   frames   0-213  two friends on a jungle path, one holding a speaker up
//   frames 214-251  a whip pan up to the sky
//   frames 252-334  the sky, with a crescent moon
// The whip pan is used as the transition into the payoff.

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_IN_FRAMES = 333;

export const BPM = 124.5;
export const FRAMES_PER_BEAT = (60 / BPM) * FPS;
export const FIRST_BEAT_FRAME = 0.148 * FPS;

export const beat = (n: number) => FIRST_BEAT_FRAME + n * FRAMES_PER_BEAT;

/**
 * A framing of the single continuous take. The video never skips or repeats
 * source frames, so picture and music stay locked together; each "cut" is an
 * instant change of framing on the same take.
 *
 * `x` and `y` are the point of interest in the source frame, normalised 0-1.
 * `scale` is how far to punch in, and `drift` is added across the shot for a
 * slow push.
 */
export type Shot = {
  readonly name: string;
  readonly from: number;
  readonly x: number;
  readonly y: number;
  readonly scale: number;
  readonly drift: number;
};

export const SHOTS: readonly Shot[] = [
  // Hook: straight in tight on the friend celebrating down the path.
  { name: "Hook on friend", from: 0, x: 0.34, y: 0.62, scale: 1.35, drift: -0.05 },
  // Snap wide on the beat to show where we actually are.
  { name: "Reveal wide", from: beat(2), x: 0.5, y: 0.5, scale: 1.0, drift: 0.04 },
  { name: "Push on friend", from: beat(4), x: 0.38, y: 0.63, scale: 1.28, drift: 0.04 },
  { name: "Wide", from: beat(6), x: 0.5, y: 0.5, scale: 1.0, drift: 0.03 },
  // The speaker swings across the lens around here.
  { name: "Speaker", from: beat(8), x: 0.5, y: 0.45, scale: 1.25, drift: 0.05 },
  { name: "Faces", from: beat(10), x: 0.7, y: 0.78, scale: 1.2, drift: 0.04 },
  // Loudest part of the track: sit wide and let it play.
  { name: "Wide peak", from: beat(12), x: 0.5, y: 0.5, scale: 1.0, drift: 0.05 },
  { name: "Punch before pan", from: beat(14), x: 0.5, y: 0.72, scale: 1.3, drift: 0.03 },
  // Whip pan: no punch, let the camera move carry it.
  { name: "Whip pan", from: beat(15), x: 0.5, y: 0.5, scale: 1.0, drift: 0.02 },
  // Payoff: slow push toward the moon.
  { name: "Moon", from: beat(17), x: 0.52, y: 0.46, scale: 1.02, drift: 0.26 },
];

/** Frames where a short white flash punctuates a cut. */
export const FLASHES: readonly number[] = [beat(8), beat(15)];
