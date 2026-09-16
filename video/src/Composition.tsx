import {
  AbsoluteFill,
  Composition,
  Interactive,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const MyComposition = () => {
  return (
    <Composition
      id="MyComp"
      component={MyComponent}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

export const MyComponent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const subtitleOpacity = interpolate(frame, [15, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0b0d17",
        justifyContent: "center",
        alignItems: "center",
        gap: 32,
      }}
    >
      <Interactive.Div
        name="Title"
        style={{
          fontFamily: "sans-serif",
          fontSize: 140,
          fontWeight: 700,
          color: "white",
          letterSpacing: -4,
          transform: `scale(${enter})`,
        }}
      >
        Hello Remotion
      </Interactive.Div>
      <Interactive.Div
        name="Subtitle"
        style={{
          fontFamily: "sans-serif",
          fontSize: 48,
          color: "#8a8fa3",
          opacity: subtitleOpacity,
        }}
      >
        Edit this video from chat
      </Interactive.Div>
    </AbsoluteFill>
  );
};
