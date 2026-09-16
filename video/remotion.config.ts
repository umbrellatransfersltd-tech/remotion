/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideBundlerConfig(enableTailwind);

// Remotion normally downloads its own Chrome Headless Shell on first render.
// In sandboxes where that download is blocked by the network policy, reuse a
// headless shell that is already on the machine instead.
const findLocalHeadlessShell = () => {
  if (process.env.REMOTION_BROWSER_EXECUTABLE) {
    return process.env.REMOTION_BROWSER_EXECUTABLE;
  }

  const browsersDir = process.env.PLAYWRIGHT_BROWSERS_PATH ?? "/opt/pw-browsers";
  if (!existsSync(browsersDir)) {
    return null;
  }

  for (const entry of readdirSync(browsersDir)) {
    if (!entry.startsWith("chromium_headless_shell")) {
      continue;
    }

    const candidate = join(browsersDir, entry, "chrome-linux", "headless_shell");
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
};

const localHeadlessShell = findLocalHeadlessShell();
if (localHeadlessShell) {
  Config.setBrowserExecutable(localHeadlessShell);
}
