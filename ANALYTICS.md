# Google Analytics Event Tracking

This document describes the Google Analytics events tracked in woom.

## Configuration

Google Analytics ID: `G-RDJ51M99TB`

The analytics script is initialized in `src/layouts/Layout.astro` and event tracking is handled by `src/scripts/analytics.ts`.

## Tracked Events

### `page_view`
Fired when the page loads.

**Parameters:**
- `page_path`: The page path (e.g., "/" or "/work")
- `page_title`: The page title (e.g., "home" or "work")

### `card_view`
Fired when a project card comes into view (25% visible in viewport).

**Parameters:**
- `card`: The project/card identifier (section name or card kind)

**Use case:** Understand which projects users actually see when scrolling through your portfolio.

### `scroll_depth`
Fired at 25%, 50%, 75%, and 100% scroll depth on the page.

**Parameters:**
- `depth_percent`: The scroll depth threshold (25, 50, 75, or 100)

**Use case:** Understand how far users scroll and find content that's below the fold.

### `project_view`
Fired when a project section is in focus for 1+ second.

**Parameters:**
- `project`: The project/section identifier
- `is_visible`: Boolean indicating if the section was visible when fired

**Use case:** Track how long users actually spend looking at specific projects.

### `contact_click`
Fired when a user clicks on a contact link (email, phone, social media).

**Parameters:**
- `channel`: The type of contact channel (email, phone, linkedin, github, are.na, other)
- `location`: Where the click occurred (nav, footer)

**Use case:** Understand which contact methods users prefer and where they're most discoverable.

### `page_engagement`
Fired when the user leaves the page.

**Parameters:**
- `time_on_page_seconds`: Total time spent on the page in seconds

**Use case:** Understand overall engagement with your portfolio.

## Example Queries in Google Analytics

### Find which projects have the best scroll-to-view ratio
1. Go to Reports > Engagement > Events
2. Filter by `event_name` = "card_view"
3. Group by `card` parameter
4. Compare with scroll_depth events to see conversion

### Identify below-the-fold content
1. Go to Reports > Engagement > Events
2. Compare `card_view` counts for cards at different positions
3. If a card has significantly fewer views, it may be off-screen for most users

### Track contact channel preference
1. Go to Reports > Engagement > Events
2. Filter by `event_name` = "contact_click"
3. Group by `channel` parameter
4. See which contact methods get the most clicks

## Development Notes

- Analytics tracking is initialized in `initAnalytics()` in `src/scripts/main.ts`
- Card visibility tracking uses the Intersection Observer API
- Scroll depth tracking is throttled with `requestAnimationFrame` to avoid performance issues
- All tracking functions are SSR-safe (check for `window` availability)
