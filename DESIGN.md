# Design system: pixel game

The site is styled as a small pixel-art game. A pixel version of Hien walks down the page, and each career chapter is a "level" with its own outfit. The direction came from the UI/UX Pro Max skill's `pixel-art` style and its "Arcade & Retro Game" palette, then was tuned for readability.

## Principles
- **Game feel, recruiter-readable.** Pixel fonts go on headings, labels and buttons only. Story text stays in a normal sans font.
- **Story over CV.** Each level holds 2–3 sentences and one "reward" metric. The PDF CV holds the detail.
- **Crisp pixels.** Art has no anti-aliasing (`shapeRendering="crispEdges"` / `image-rendering: pixelated`). Animations move in steps.

## Tokens (`app/globals.css`)
Light mode is **day** and dark mode is **night**, with a faint star grid. Use the semantic utilities, never raw colours.

| Utility | Day | Night | Use |
|---|---|---|---|
| `bg-canvas` | #fbf6e9 | #0f172a | page |
| `bg-card` | #ffffff | #172036 | cards, bubbles, slots |
| `text-fg` | #1c1b2e | #f1f5f9 | headings, primary text |
| `text-muted` | #3f3d56 | #cbd5e1 | body copy |
| `text-subtle` | #5e5b78 | #94a3b8 | meta, labels |
| `text-accent` / `bg-accent` | #c8281e | #f87171 | kickers, primary buttons (from the avatar's red) |
| `text-score` | #15803d | #4ade80 | "★ REWARD" metrics |
| `--pixel` | #1c1b2e | #a5b4cf | pixel border colour |

Each level also has its own colour in `content/journey.ts`. It colours the path, the level node and the outfit-swap effect. These colours are decorative only, never used for text.

## Pixel utilities
- `pixel-border`: a 4px border with notched corners, drawn with box-shadows. Leave about 4px of space around it (`gap-3`).
- `pixel-card`: `pixel-border` plus an 8px hard drop shadow.
- `pixel-btn`: a game-menu button with an inner bevel that presses down 2px when clicked. Combine it with a background, e.g. `bg-accent text-on-accent`.

## Typography
| Utility | Font | Use |
|---|---|---|
| `font-pixel` | Press Start 2P | titles, kickers, buttons, nav. It's very wide, so keep it at 8–24px |
| `font-term` | VT323 | short labels: dates, places, chips, speech bubbles. Use 18px or more |
| `font-sans` | Inter | story and description paragraphs |
| `font-mono` | JetBrains Mono | the Journal only (not preloaded) |

## Character
- Code-drawn sprites live in `components/pixel/characterArt.ts`: 16×20 grids, 7 outfits, and idle/walkA/walkB frames. `components/pixel/Character.tsx` renders them.
- To swap in AI-made art, set `outfit.sheet` in `content/journey.ts`. See `docs/character-art.md`.

## Scenery
- Each level has a faint landscape silhouette: a lab, an office, a skyline, Birmingham, wind turbines, a park. The art lives in `components/pixel/sceneArt.ts` as 96×36 rect lists, and `components/pixel/Scenery.tsx` renders it at 8px per art pixel (768×288).
- Kept deliberately quiet:
  - one colour (`text-line`), so day and night need no separate art and the story text stays readable over it
  - fixed along the bottom of the screen, pinned to the screen's right edge; the ground line runs the full width
  - one scene at a time, crossfading in 4 steps
  - shown only while the journey reaches the bottom of the screen, so the next section never scrolls over it
  - desktop only (`md` and up)
- Scenes stay static. Don't add parallax, colour, or animated scenery; the character and outfit change are the moving parts.

## Inventory (skills)
- Each skill category is a bag. `PixelTabs` (`components/PixelTabs.tsx`) switches bags, and each bag is a grid of square slots padded with empty slots to fill its last row.
- Hovering, focusing or clicking a slot shows its item card: name, bag, a one-line note, and the levels where it was used ("FOUND IN").
- Slots show the tool's logo from `react-icons/si`, or a short pixel-font label when there's no logo (AWS, RAG, SQL…).
- Data lives in `content/skills.ts`. Keep the notes to what the CV backs up.

## Journal
- The main page has a Journal section ("LOGBOOK") with one `PixelTabs` tab per area. Every panel stays mounted (hidden when inactive), so the Supabase study preview loads once.
- **Study** comes from Supabase but shows progress only (entries logged, topics, last entry date), never the DSA entries themselves. The full journal (search, categories, the owner's editor) is on `/journal/study`.
- **Travel** and **Game & Sports** are files in the repo, not Supabase:
  - `content/travel.ts`: trips with pixel flag stamps (`components/travel/FlagStamp.tsx`), a story, and photos that open in a dialog. Photos live in `public/images/travel/<trip>/`, 1600px wide with location metadata stripped.
  - `content/play.ts`: signature games and sports as inventory-style cards, plus highlight clips. Clips live in `public/videos/` as H.264 MP4s under about 5MB, with `preload="none"` so nothing downloads until play.
  - Cards hide any story, photos or clips that are missing.
- `/journal` shares the site's navbar, footer and tokens: the `--jn-*` variables in `app/journal/journal.css` map onto the site tokens, corners are square, and entries are pixel cards.

## Motion
- Outfit swap: a stepped pop plus a dashed "poof" ring in the level colour.
- Walking: the frame toggles every 150ms while scrolling.
- Other effects: the title-screen character bobs, "SCROLL TO PLAY" blinks, and blocks reveal on scroll in 4 steps.
- Under `prefers-reduced-motion` everything is static: no walk cycle, pops, bobbing or blinking. The scroll is never hijacked.

## Checklist
- Touch targets are at least 44px. Focus is shown as a dashed accent outline.
- Text contrast is at least 4.5:1 in both modes. Level colours are never used for text.
- No horizontal scroll at 375px. On mobile the character shrinks to 3px per art pixel and the speech bubble is hidden.
