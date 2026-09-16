import { FRAMES_PER_BEAT, FIRST_BEAT_FRAME, SHOTS, type Shot } from "./config";

/**
 * Translation that brings the point (x, y) of the source frame to the centre of
 * the canvas at the given scale, clamped so the frame always covers the canvas.
 *
 * A crop window centred on a point near the edge would hang off the source, so
 * the offset is limited to what the scale actually allows. Subjects near an
 * edge end up off-centre rather than exposing a blank strip.
 */
export const framingOffset = ({
  x,
  y,
  scale,
  width,
  height,
}: {
  x: number;
  y: number;
  scale: number;
  width: number;
  height: number;
}) => {
  const maxOffset = (scale - 1) / (2 * scale);
  const clampedX = Math.min(Math.max(x - 0.5, -maxOffset), maxOffset);
  const clampedY = Math.min(Math.max(y - 0.5, -maxOffset), maxOffset);

  return {
    translateX: -clampedX * width * scale,
    translateY: -clampedY * height * scale,
  };
};

export const shotAt = (frame: number): { shot: Shot; progress: number } => {
  let index = 0;
  for (let i = 0; i < SHOTS.length; i++) {
    if (frame >= SHOTS[i].from) {
      index = i;
    }
  }

  const shot = SHOTS[index];
  const next = SHOTS[index + 1];
  const end = next ? next.from : shot.from + 90;
  const progress = Math.min(Math.max((frame - shot.from) / (end - shot.from), 0), 1);

  return { shot, progress };
};

/**
 * A short scale bump on every beat. Decays over five frames so it reads as a
 * pulse rather than a bounce.
 */
export const beatPulse = (frame: number) => {
  const sinceFirst = frame - FIRST_BEAT_FRAME;
  if (sinceFirst < 0) {
    return 0;
  }

  const sinceBeat = sinceFirst % FRAMES_PER_BEAT;
  const decay = Math.max(0, 1 - sinceBeat / 5);

  return decay * decay;
};
