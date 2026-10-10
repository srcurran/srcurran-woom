# Writing a blog post

The index is at `/blog/`. Nothing links to it from the portfolio. These URLs are public when deployed; being unlinked is not access control.

Create a Markdown file anywhere under `src/content/blog/`, using `YYYY-MM-DD-HHmm--Post-Title.md`:

```text
src/content/blog/my-first-post/
  2020-09-21-1421--Foo-Bar.md
  media/
    photo.jpg
    demo.mp4
    captions.vtt
```

The filename supplies the title (`Foo Bar`), publication date, ordering (newest first), and URL (`/blog/2020-09-21-1421--foo-bar/`). Times are treated as UTC for consistent sorting. Changing the filename changes the URL. Keep filenames unique even across folders. Future dates are not scheduled publication: any non-draft post is included in the next build.

Frontmatter is optional. Override the displayed title, add a description, or keep a post out of production:

```markdown
---
title: A custom title
description: A short summary of the post.
draft: true
---

Start writing here. The page supplies the main heading; use ## for sections.
```

`draft: true` posts appear in `npm run dev`, but are excluded from production routes and lists. Set it to `false` or remove it to publish. Media files are public even for drafts; do not put private files in this directory. The included example is a draft, so the production blog starts empty.

Standard Markdown supports headings, paragraphs, lists, links, blockquotes, tables, task lists, inline code, and fenced code blocks with syntax highlighting.

## Images and videos

Images use normal Markdown with paths relative to the Markdown file. Astro optimizes local Markdown images:

```markdown
![Describe the image](./media/photo.jpg)
```

Videos use HTML in the Markdown file. Relative `src` and `poster` paths are resolved from the Markdown file, including nested folders:

```html
<video controls playsinline preload="metadata" poster="./media/photo.jpg">
  <source src="./media/demo.mp4" type="video/mp4" />
  <track kind="captions" src="./media/captions.vtt" srclang="en" label="English" />
  Your browser does not support this video.
</video>
```

Supported local media: png, jpg, jpeg, gif, webp, avif, svg, mp4, webm, mov, ogg, and vtt. Prefer MP4 or WebM for browser playback. Root-relative and external URLs are left unchanged. Raw HTML images also support relative `src` paths. Use lowercase file extensions.

Run `npm run build` to verify posts and generate the site. Deployment follows the existing site workflow. Every post repeats the full post list at the bottom.
