import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// The font files are committed to public/fonts, so rendering needs no network
// access and the result is identical on every machine.
export const ANTON = "Anton";
export const INTER = "Inter";

loadFont({
  family: ANTON,
  url: staticFile("fonts/Anton-Regular.woff2"),
  weight: "400",
});

loadFont({
  family: INTER,
  url: staticFile("fonts/Inter-Variable.woff2"),
  weight: "500 700",
});
