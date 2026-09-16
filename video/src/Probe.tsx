import { AbsoluteFill, Composition, OffthreadVideo, staticFile } from "remotion";

export const ProbeComposition = () => {
  return (
    <Composition
      id="Probe"
      component={Probe}
      durationInFrames={335}
      fps={30}
      width={576}
      height={1024}
    />
  );
};

const Probe: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <OffthreadVideo src={staticFile("source.mov")} />
    </AbsoluteFill>
  );
};
