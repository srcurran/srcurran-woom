# Sean Curran — Portfolio

A portfolio site built with [Astro](https://astro.build). HTML-first, hand-rolled
CSS (no framework), with [Motion](https://motion.dev) for scroll-driven animation.

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm run dev`     | Dev server at `localhost:4321`               |
| `npm run build`   | Build the static site to `./dist/`           |
| `npm run preview` | Preview the production build locally         |

## Project structure

```
src/
├── data/site.ts          # Brand, nav items, projects, footer links (content as data)
├── layouts/Layout.astro  # HTML shell — imports global.css, boots scripts
├── components/
│   ├── TopNav.astro      # Sticky header: brand + Contact
│   ├── SideNav.astro     # Sticky scroll-spy table of contents
│   ├── Section.astro     # <section> + optional eyebrow/title
│   └── Card.astro        # Project card: media / text / video variants
├── pages/index.astro     # The page — composes everything
├── scripts/
│   ├── nav.ts            # Header scroll state + scroll-spy (plain DOM, no deps)
│   └── reveal.ts         # Reveal-on-scroll — the ONLY file touching Motion
└── styles/
    ├── global.css        # Imports the rest, in cascade order
    ├── tokens.css        # Design tokens (the single source of truth)
    ├── reset.css         # Modern reset
    ├── base.css          # Bare-element defaults
    ├── typography.css    # Named text styles (.display, .h2, .body-lg, .eyebrow…)
    ├── utilities.css     # Layout primitives (.flex .row .gap-md .stack …)
    ├── components.css     # Component classes (.card, .button, .nav-link …)
    └── responsive.css    # Desktop-first → max-width overrides
```

## CSS conventions

Three layers, composed together on an element:

1. **Tokens** (`tokens.css`) — every color, font, size, space, shadow, and
   motion value is a CSS variable. Change the system from this one file.
2. **Utilities** (`utilities.css`) — generic, reusable layout primitives:
   `<div class="flex row gap-md items-center">`. Flex-first; grid where it earns it.
   Structure rhythm comes from `gap`, not margin soup.
3. **Components** (`components.css`) — specific named blocks that own their look
   (`.card` = bg + border + radius + shadow). Extend with modifier classes:
   `<a class="button small warning">`.

Named typography (`.body-lg`, `.h2`, `.eyebrow`) bridges the two halves.

## Animation

CSS-first. Hover/focus transitions and the active-nav marker are pure CSS.
JS-driven reveal-on-scroll lives only in `scripts/reveal.ts` (Motion) — swap that
one file to change engines. Opt an element in with `data-reveal`
(optional `data-reveal-delay="0.1"`). All of it respects `prefers-reduced-motion`,
and reveals only hide when JS is present, so a no-JS page still shows everything.
