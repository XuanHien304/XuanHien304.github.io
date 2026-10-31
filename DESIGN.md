# Design system

Generated with the UI/UX Pro Max skill (`.claude/skills/ui-ux-pro-max`, query "portfolio machine learning engineer professional minimal", dials variance 3 / motion 3 / density 3), then adapted to this site's existing identity.

## Direction
- **Style:** Minimalism & Swiss. Clean, spacious and grid-based, with a clear type hierarchy and low visual chrome.
- **Pattern:** a storytelling portfolio. The sections run Hero → About → Experience → Selected work → Skills → Education → Contact.
- **Tone:** a professional engineer's portfolio, not a SaaS landing page. Metrics carry the emphasis, not decoration.

## Tokens (`app/globals.css`)
Use the semantic utilities. Never use raw `black/60` or `white/60` opacity classes.

| Utility | Light | Dark | Use |
|---|---|---|---|
| `bg-canvas` | #fafaf8 | #0b0c0e | page background |
| `bg-card` | #ffffff | #121316 | cards, stat tiles |
| `text-fg` | #1a1a18 | #f2f1ec | headings, primary text |
| `text-muted` | #4f4f49 | #b4b4ac | body copy |
| `text-subtle` | #6b6b65 | #8a8a83 | meta, dates, labels |
| `border-line` | #e4e2da | #26272b | dividers, card borders |
| `text-accent` / `bg-accent-soft` | #2f5d5a / #edf2f1 | #7fb5ae / #15211f | the single accent: links, metrics, section numbers |

The Journal keeps its own `--jn-*` variables (`app/journal/journal.css`), with a matching dark palette under `.dark .journal-root`.

## Typography
- **Inter** (`font-sans`) handles all UI and body text. **JetBrains Mono** (`font-mono`) handles dates, labels, metrics and tech chips.
- Both load through `next/font/google` in `app/layout.tsx`, so they are self-hosted with no request to Google.
- Scale: hero h1 is `text-4xl` / `sm:text-5xl` / `md:text-6xl`, section h2 is `text-2xl` / `sm:text-3xl`, and body text is 15–18px with `leading-relaxed`.

## Layout
- The content column is `max-w-5xl px-6`.
- Every section goes through `components/Section.tsx`, which provides the top rule, the numbered mono label and the heading.
- On `md` and up, rows use a 12-column grid with meta in 3 columns and content in 9. The layout collapses to a single column on mobile.

## Motion
- `components/Reveal.tsx` adds `data-reveal`. CSS scroll timelines (`animation-timeline: view()`) then fade it up 12px.
- No JS is involved, so content is never hidden before hydration. The effect is skipped under `prefers-reduced-motion` and in browsers without scroll timelines.
- Hover transitions run 200ms, on colour and opacity only.

## Checklist (from the skill)
- No emoji icons: use `react-icons` (Feather/FontAwesome).
- Touch targets are at least 44px (`min-h-11`, `h-11 w-11`).
- Focus is visible (a global `:focus-visible` ring in the accent colour).
- Text contrast is at least 4.5:1 in both themes.
- No horizontal scroll at 375 / 768 / 1024 / 1440px.
