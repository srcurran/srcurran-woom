# Sean Curran — Portfolio

A portfolio site built with [Astro](https://astro.build). HTML-first, hand-rolled
CSS (no framework), with [GSAP](https://gsap.com) for the scroll-driven deck and
the first-load intro.

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm run dev`     | Dev server at `localhost:4321`               |
| `npm run build`   | Build the static site to `./dist/`           |
| `npm run preview` | Preview the production build locally         |

## Project structure

```
src/
├── data/                     # Content as data
│   ├── site.ts               # Barrel — re-exports the modules below
│   ├── meta.ts               # Site identity + the About hero copy
│   ├── navigation.ts         # Side-nav sections (also the deep-link ids)
│   ├── logos.ts              # The "where I've worked" strip
│   ├── slides.ts             # The deck: slide types + every slide
│   └── contact.ts            # Footer + contact links
├── lib/emphasize.ts          # Inline **bold** / _italic_ / __highlight__ for card copy
├── layouts/
│   ├── Layout.astro          # HTML shell — head, fonts, analytics, boots scripts
│   └── PortfolioPage.astro   # The page both routes render
├── components/
│   ├── TopNav.astro          # Fixed header: brand, Contact popover, section menu
│   ├── SideNav.astro         # Fixed scroll-spy rail
│   ├── Hero.astro            # The About opening
│   ├── LogoStrip.astro       # Endlessly looping logo row
│   ├── Deck.astro            # The deck — maps slides to cards
│   ├── Card.astro            # Card shell; dispatches by slide kind
│   ├── cards/                # One component per kind: bio, intro, mockup, results
│   └── Contact.astro         # Full-height contact closer
├── pages/
│   ├── index.astro           # /      → PortfolioPage
│   └── work.astro            # /work  → PortfolioPage full
├── scripts/
│   ├── main.ts               # Client entry — calls each init
│   ├── header.ts             # Header tint on scroll
│   ├── intro.ts              # First-load intro timeline (GSAP)
│   ├── deck.ts               # Deck transforms, scroll-spy, side-nav state (GSAP)
│   ├── lenticular.ts         # The contact photo effect
│   └── analytics.ts          # Umami + Clarity events
└── styles/
    ├── global.css            # Imports the rest, in cascade order
    ├── tokens.css            # Design tokens (the single source of truth)
    ├── reset.css             # Modern reset
    ├── base.css              # Bare-element defaults
    ├── typography.css        # Named text styles (.h2, .body-lg, .eyebrow…)
    ├── utilities.css         # Layout primitives (.stack, .flex, .gap-md…)
    ├── components.css        # Chrome: nav, menus, logo strip, buttons
    ├── deck.css              # The hero, the deck, and the cards
    └── responsive.css        # Desktop-first → max-width overrides
```

## Content and presentation

Everything a visitor reads lives in `src/data` as typed data. Components take
typed props and render it; they carry no copy of their own. Adding or reordering
a slide is a `data/slides.ts` edit and nothing else.

`/` and `/work` render the same `PortfolioPage`, differing only by its `full`
flag, which swaps the hero greeting.

## CSS conventions

Three layers, composed together on an element:

1. **Tokens** (`tokens.css`) — every color, font, size, space, shadow, and
   motion value is a CSS variable. Change the system from this one file. A
   literal color or size anywhere else is a bug.
2. **Utilities** (`utilities.css`) — generic layout primitives:
   `<div class="flex row gap-md items-center">`. Flex-first; grid where it earns
   it. Structure rhythm comes from `gap`, not margin soup.
3. **Components** (`components.css`, `deck.css`) — named blocks that own their
   look, extended with modifier classes: `<a class="button small warning">`.

Named typography (`.body-lg`, `.h2`, `.eyebrow`) bridges the two halves. Deck
cards are container-query contexts, so card content sizes in `cqw` and scales
with the card.

`responsive.css` is desktop-first. The breakpoints are 1024 / 960 / 760 / 600;
960 is the significant one — above it the deck animates and snaps, at or below it
the deck is a plain static list.

## Animation

CSS-first: hover, focus, and popover transitions are pure CSS. GSAP is confined
to `src/scripts` — `intro.ts` (the first-load timeline), `deck.ts` (ScrollTrigger
card transforms), and `lenticular.ts`.

All of it respects `prefers-reduced-motion`, and the page renders complete with
JS off — intro targets are hidden only under a class the inline script in
`Layout.astro` sets before paint, on the first load of a session.
