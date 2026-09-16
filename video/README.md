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
