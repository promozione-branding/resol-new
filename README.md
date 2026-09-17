# Coil — Next.js + Tailwind + three.js

A full homepage with the scroll-reactive metallic coil animation as the hero
background.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
app/
  layout.jsx       → fonts (Space Grotesk + IBM Plex Sans), metadata, HTML shell
  page.jsx          → assembles the homepage from components/
  globals.css       → Tailwind layers + base styles
components/
  SpringCanvas.jsx  → the animation itself (three.js, client component)
  Nav.jsx           → fixed top nav
  Hero.jsx          → headline + CTA, hosts <SpringCanvas />
  Capabilities.jsx  → services list
  Process.jsx       → four-step engagement process
  CtaBand.jsx       → closing call-to-action
  Footer.jsx        → footer
```

Plain JavaScript/JSX throughout — no TypeScript. The `@/` import alias
(used e.g. in `app/page.jsx`) is configured in `jsconfig.json`, the JS
equivalent of a `tsconfig.json` path alias.

## Tuning the animation

Everything's in `components/SpringCanvas.jsx`, with inline comments. The
knobs most worth adjusting first:

- `COILS`, `RADIUS`, `LENGTH`, `FLATTEN` — shape of the coil
- `SCROLL_ROTATION_SENSITIVITY`, `SCROLL_DRIFT_SENSITIVITY` — how strongly
  scrolling affects rotation/position
- the three `THREE.PointLight` colors — the warm/cool highlight split on the
  metal

## Using the coil elsewhere on the site

`SpringCanvas` is self-contained and already `position: fixed; inset: 0`, so
you can drop `<SpringCanvas />` into any other page/section and it'll take
over the full viewport as a background layer. If you only want it behind one
section rather than the whole page, wrap it in a `relative` container and
change the canvas's `fixed` class to `absolute` in `SpringCanvas.jsx`.

## Design tokens

Defined in `tailwind.config.ts`:

- `ink` (#030303) — background
- `paper` (#EDEAE2) — primary text
- `muted` — secondary text
- `hairline` — dividers/borders
- `ice` (#8FCFE0) — single accent color

## Content

The copy (studio name "Coil," services, process steps) is placeholder —
written to demonstrate layout and tone, not a real business. Swap it for your
own in `components/Hero.jsx`, `Capabilities.jsx`, `Process.jsx`, and
`CtaBand.jsx`.
