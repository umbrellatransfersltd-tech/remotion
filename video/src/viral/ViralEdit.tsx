import {
  AbsoluteFill,
  Composition,
  Interactive,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { beatPulse, framingOffset, shotAt } from "./camera";
import { ANTON, INTER } from "./fonts";
import {
  beat,
  DURATION_IN_FRAMES,
  FLASHES,
  FPS,
  HEIGHT,
  WIDTH,
} from "./config";

export const ViralEditComposition = () => {
  return (
    <Composition
      id="ViralEdit"
      component={ViralEdit}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};

const Camera: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const { shot, progress } = shotAt(frame);
  const scale = shot.scale + shot.drift * progress + beatPulse(frame) * 0.018;
  const { translateX, translateY } = framingOffset({
    x: shot.x,
    y: shot.y,
    scale,
    width,
    height,
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "black" }}>
      <AbsoluteFill
        style={{
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
          filter: "saturate(1.12) contrast(1.05)",
        }}
      >
        <OffthreadVideo
          src={staticFile("source.mov")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Flash: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = FLASHES.reduce((acc, at) => {
    const since = frame - at;
    if (since < 0 || since > 4) {
      return acc;
    }
    return Math.max(acc, interpolate(since, [0, 4], [0.34, 0]));
  }, 0);

  if (opacity === 0) {
    return null;
  }

  return <AbsoluteFill style={{ backgroundColor: "white", opacity }} />;
};

const Vignette: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.34) 100%)",
      }}
    />
  );
};

const Caption: React.FC<{
  readonly text: string;
  readonly top: string;
  readonly fontFamily: string;
  readonly fontSize: number;
  readonly letterSpacing: number;
  readonly textTransform: "uppercase" | "none";
}> = ({ text, top, fontFamily, fontSize, letterSpacing, textTransform }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14, mass: 0.5 } });
  const scale = interpolate(enter, [0, 1], [0.82, 1]);
  const y = interpolate(enter, [0, 1], [26, 0]);

  return (
    <AbsoluteFill style={{ top, alignItems: "center", height: "auto" }}>
      <Interactive.Div
        name="Caption"
        style={{
          fontFamily,
          fontSize,
          letterSpacing,
          textTransform,
          color: "white",
          textAlign: "center",
          lineHeight: 1.05,
          maxWidth: 920,
          paddingLeft: 60,
          paddingRight: 60,
          textShadow: "0 6px 34px rgba(0,0,0,0.75), 0 2px 8px rgba(0,0,0,0.6)",
          transform: `translateY(${y}px) scale(${scale})`,
          opacity: enter,
        }}
      >
        {text}
      </Interactive.Div>
    </AbsoluteFill>
  );
};

const hook = {
  fontFamily: ANTON,
  fontSize: 128,
  letterSpacing: 2,
  textTransform: "uppercase",
} as const;

export const ViralEdit: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Camera />
      <Vignette />
      <Flash />

      <Sequence
        name="No club"
        from={Math.round(beat(0))}
        durationInFrames={Math.round(beat(2) - beat(0))}
      >
        <Caption text="No club" top="12%" {...hook} />
      </Sequence>

      <Sequence
        name="No DJ"
        from={Math.round(beat(2))}
        durationInFrames={Math.round(beat(4) - beat(2))}
      >
        <Caption text="No DJ" top="12%" {...hook} />
      </Sequence>

      <Sequence
        name="Just this"
        from={Math.round(beat(4))}
        durationInFrames={Math.round(beat(7) - beat(4))}
      >
        <Caption text="Just this" top="12%" {...hook} />
      </Sequence>

      <Sequence
        name="Payoff"
        from={Math.round(beat(18))}
        durationInFrames={DURATION_IN_FRAMES - Math.round(beat(18))}
      >
        <Caption
          text="then the moon showed up"
          top="83%"
          fontFamily={INTER}
          fontSize={56}
          letterSpacing={-1}
          textTransform="none"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
