# Video

A [Remotion](https://remotion.dev) project for editing videos in this repo.

It lives outside the monorepo's `packages/**` workspace glob, so it has its own
`node_modules` and uses Remotion from npm rather than the local source.

## Setup

```bash
cd video
npm install
```

## Preview

```bash
npm run dev
```

Opens Remotion Studio at http://localhost:3000. Requires a browser, so it is
only useful when you can reach that port.

## Render

```bash
npm run render
```

Writes `out/video.mp4`. To render a different composition or output path:

```bash
npx remotion render <composition-id> out/<name>.mp4
```

Renders are gitignored (`out/`).

### Chrome in sandboxes

Remotion normally downloads its own Chrome Headless Shell on first render. Where
that download is blocked by a network egress policy, `remotion.config.ts`
falls back to a headless shell already present on the machine (it checks
`REMOTION_BROWSER_EXECUTABLE`, then `PLAYWRIGHT_BROWSERS_PATH`, then
`/opt/pw-browsers`). On a normal machine nothing is detected and Remotion
downloads Chrome as usual.

## Editing

The skills in `packages/skills` drive this project:

- `/remotion-create` to add a composition
- `/remotion-markup` for animation, layout and typography
- `/remotion-render` to export
- `/remotion-docs` to look up APIs

Compositions are registered in `src/Root.tsx`.

## The `ViralEdit` composition

A short-form cut of `public/source.mov` (a vertical 11.2s take: two friends on a
jungle path with a speaker, a whip pan, then a crescent moon).

`npm run render` exports it to `out/viral.mp4` at 1080x1920.

### How the timings were chosen

The source audio was rendered to WAV and its onset-strength envelope
autocorrelated, which put the track at **124.5 BPM** with the first downbeat at
0.148s. Every cut in `src/viral/config.ts` is placed on a beat from that grid
rather than by eye.

The take is one continuous shot, so the edit never skips or repeats source
frames. Picture and music stay locked together and each "cut" is an instant
change of framing on the same take (`SHOTS` in `config.ts`). This is why the
original audio survives untouched.

### Editing it

- `src/viral/config.ts` holds the beat grid, the shot list and the flash frames.
  Change `scale`, `x`, `y` and `drift` on a shot to re-frame it.
- `src/viral/camera.ts` converts a point of interest into a transform, clamped
  so the frame always covers the canvas.
- `src/viral/ViralEdit.tsx` holds the captions, vignette and grade. Delete the
  four `<Sequence>` blocks to get a clean cut with no text.

Fonts are committed to `public/fonts`, so rendering needs no network access.
