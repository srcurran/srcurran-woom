# srcurran.com

A static portfolio: an Astro site whose centerpiece is a scroll-driven deck of 16:9 cards.

No UI framework (no React/Vue/Svelte), no Tailwind, no content collections, no i18n. Hand-rolled CSS, plain DOM, TypeScript, GSAP for scroll animation. Don't reach for any of those absent tools — if a task seems to need one, say so first.

## Development

Start the dev server in background mode:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Content and presentation are separate

This is the organizing principle of the repo. Content is typed data; components are dumb renderers.

```
src/data/       Content as data — the deck, nav, logos, contact, site meta
src/lib/        Pure build-time helpers (emphasize.ts)
src/components/ Presentation — typed Props, no copy
src/layouts/    Layout.astro (the HTML shell) + PortfolioPage.astro (the page)
src/pages/      Routes only — one line each
src/scripts/    Behavior — plain DOM + GSAP, one init per module
src/styles/     The whole visual system
```

**`src/data`** holds every string a visitor reads: headings, paragraphs, list items, link labels, `alt` text, credits, ordering, and per-item flags (`theme`, `pin`, `fit`, `background`). Each module exports its interfaces alongside its data. `site.ts` is a re-export barrel; import from the specific module (`../data/slides`) in new code.

`Slide.onIndex` and `Slide.indexOnly` are vestigial — leftovers from a retired home-highlights deck. Nothing reads `onIndex`, and an `indexOnly` slide renders nowhere. Don't put either on a new slide.

**`src/components`** render that data and nothing else. A component declares `interface Props`, destructures `Astro.props` with defaults, and maps over data. The only strings that belong in a component are chrome labels on controls (`aria-label="Close menu"`, the word "Contact" on its button).

**`src/pages`** are routes, not markup. `index.astro` and `work.astro` are one line each, both rendering `layouts/PortfolioPage.astro` — which owns the entire composition. The routes differ only by its `full` flag, which swaps the hero greeting. When they need to diverge again, add a prop to `PortfolioPage`; don't fork the markup back into the pages.

**`src/scripts`** own behavior. `main.ts` calls one `initX()` per module. Scripts find elements through `data-*` hooks (`data-deck`, `data-card`, `data-nav-link`, `data-hero`, `data-lenticular`), never through styling classes — so a class can be renamed without breaking JS.

Consequences worth internalizing:

- Adding, reordering, or rewriting a slide is a `src/data/slides.ts` edit. Nothing else.
- A new slide *kind* is three coordinated changes: a component in `components/cards/`, a branch in `Card.astro`, a `.slide--<kind>` block in `deck.css`.
- `Card.astro` is a dispatcher: it owns the shared shell (`.deck__card`, the `data-*` hooks, the theme class) and hands the body to the per-kind component.

## Use variables and components — never hard values

**Colors, type, space, radius, elevation, motion, layout** all resolve to a token in `src/styles/tokens.css`. A literal color outside that file is a bug, full stop — no hex, no `rgba()`, in a stylesheet, a component, or the data. Anything on a scale (font size, spacing, radius) takes its token too. If the value you need doesn't exist, add a semantic token defined off the raw palette and use that; `tokens.css` is the one file you change to restyle the system.

A bare `px` is fine only for a one-off structural measurement that isn't on any scale — a `1px` hairline, the `18px` hamburger glyph box. If you're reaching for a second one with the same value, it's a token.

**Copy is data, not markup.** If you're typing a sentence inside a `.astro` file, it belongs in `src/data`.

**Reuse before you write.** Check for an existing component, then a typography class (`.h2`, `.body-lg`, `.eyebrow`, `.caption`), then a layout utility (`.stack`, `.flex row`, `.gap-md`) before adding CSS. Repeat markup twice and it should become a component.

**Inline `style=` carries custom-property values only** — `style={`--i: ${i}`}`, `style={`--mark-h: ${logo.h}`}`. Never a real declaration; the stylesheet decides what the variable does.

## No comments

The codebase has none. Don't reintroduce them — no headers, no section dividers, no explanatory paragraphs above a function. Name things well enough that the code reads on its own and put the reasoning in the PR description, where it can be discussed.

The one exception is a `/** */` one-liner on an *interface field* whose name can't carry its meaning — the content schema in `src/data`, and a component prop like `full?`. Those document a contract and surface as editor tooltips while you're authoring content. Everything else is prose, and prose belongs here.

## Things the code can't tell you

The four facts below were load-bearing comments before the codebase was stripped. Each one explains why something is the way it is, where the obvious reading is that it's a mistake. Check here before "fixing" any of them.

**Analytics sends no consent signal, deliberately.** Clarity restricts itself in the EEA/UK/CH when it receives none, so those visitors aren't recorded and the site needs no cookie banner. Adding a consent call would start recording them and create the obligation.

**`history.scrollRestoration` is forced to `manual`** in `Layout.astro`. The deck deep-links to the hash's section on load (`deck.ts`). Left on the browser's default `auto`, the native restore races that deep-link and both get clobbered to the top, landing on the first card in its off-screen enter state. `manual` makes the deep-link the sole authority.

**The logo strip has no per-mark sizing, on purpose.** Every asset is exported from the `logo-normalized` frames in the site-logos Figma file, optically normalised by hand inside a shared 40px-tall box — the padding baked into each SVG *is* the correction. So the strip renders every mark at one height and lets width follow from the asset's aspect. A 7:1 wordmark and a 1:1 square can't be equalised by a number, which is why the `h` escape hatch should stay unused: fix the Figma frame instead.

**The alternation order in `lib/emphasize.ts` is load-bearing.** Double-character forms come first so `__x__` can't be read as two italics, and the single `_` needs word boundaries so `snake_case_name` survives. It's one pass, so a replacement's own markup is never rescanned — which matters because the highlight's class name (`slide__em`) contains the very underscores the italic rule looks for.

**`emphasize.ts` runs the compound pass before the emphasis pass, also deliberately.** A short hyphenated compound reads as one word, so a line shouldn't break inside it ("successful 0-" / "to-1 launch"); CSS has no lever for that, since `line-break` and `word-break` address CJK and long unbroken strings, so the compound is wrapped in `.nobr`. Compounds over 16 characters are left breakable rather than risk overflowing a narrow card. `COMPOUND`'s bounds exclude letters, digits and hyphens but allow the emphasis markers, so a compound still matches inside `__…__` — and the `<span class="nobr">` it injects contains no `_` or `*` for the emphasis pass to trip over.

## CSS

Three composed layers, imported in cascade order by `global.css`:

1. **Tokens** — every value.
2. **Utilities** (`utilities.css`) — generic layout primitives. Flex-first; rhythm from `gap`, not margins.
3. **Components** (`components.css` for chrome, `deck.css` for the deck and hero) — named blocks that own their look, extended with modifier classes.

Naming is BEM-ish: `.slide__heading`, `.deck__card`, `.side-nav.is-collapsed`. State classes are `is-*`.

Deck cards are container-query contexts, so card content sizes in `cqw` (1cqw ≈ 19.2 Figma px against the 1920px source) and scales with the card.

`responsive.css` is desktop-first: base rules are the wide layout, overrides go in `max-width` blocks. Breakpoints in use are 1024 / 960 / 760 / 600. **960 is the important one** — above it the deck animates and snaps, at or below it the deck is a static list (`deck.ts` gates on `min-width: 961px`), so JS and CSS have to agree there.

## Motion

CSS-first. Hover, focus, and popover transitions are pure CSS. GSAP appears only in `src/scripts` (`intro.ts` for the first-load timeline, `deck.ts` for ScrollTrigger, `lenticular.ts`).

Every animation checks `prefers-reduced-motion`, and the page must render complete with JS off — reveal targets are hidden only under a class the inline script in `Layout.astro` sets before paint.

## Git

Branch from `main`, PR into `main`. Don't push to `main`. `dev` is stale — ignore it.
