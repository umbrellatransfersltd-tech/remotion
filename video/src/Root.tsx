import "./index.css";
import { MyComposition } from "./Composition";
import { ProbeComposition } from "./Probe";
import { ViralEditComposition } from "./viral/ViralEdit";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <ViralEditComposition />
      <ProbeComposition />
    </>
  );
};
