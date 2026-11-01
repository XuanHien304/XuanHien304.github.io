# Making the character art with AI

The site already works with a code-drawn placeholder sprite. This guide covers replacing it with your own pixel art, made with AI and cleaned up by hand.

## Status: made with the PixelLab MCP (2026-11-01)

Base character "C" was generated from a text description of the avatar (v3, 64px). Each outfit was made in three steps:
1. `edit_image_pixen` on C's south view: "Change only his clothes: …, keep the same face, hair, skin, pose, size and position" (1 generation).
2. `create_character` (v3, `reference_image_url` = the edited image, 4 directions) (1 generation).
3. `animate_character` with the `walk` template, south only (1 generation, 6 frames).

The frames are aligned onto an 80×80 canvas (feet 2px above the bottom edge) and stitched into `public/images/journey/<file>.png`. They are registered in `components/pixel/sheets.ts`.

| Outfit | PixelLab character id | Sheet | Status |
|---|---|---|---|
| tee (base C) | af8a4849-11a2-4af9-b8a1-67449324e082 | base.png | ✅ |
| labCoat | 65bb77e7-b9c0-41f2-a4ec-f148303981ec | student.png | ✅ |
| hoodie | 4cf4ae85-88be-4528-9791-83716e1cac5a | fpt.png | ✅ |
| shirtTie | a8e09830-dca8-4d17-bc2c-a007cf1a8c63 | datanest.png | ✅ |
| gown (graduation, replaced coat & scarf) | b55fdfc9-40c6-4ead-95fa-73d7644b5f6b | birmingham.png | ✅ |
| hardHat | 2236652a-e1bc-4806-b195-5b49a8a2800b | gevernova.png | ✅ |
| training | 6dfa6385-acc2-42a7-9114-fb40a48b8ce2 | offline.png | ✅ |

All levels use PixelLab art. The code-drawn sprites in `characterArt.ts` remain as a fallback for any outfit without a sheet.

## What you need to make

There are **7 sprite sheets**: the base look plus one per level.

| File (`public/images/journey/`) | Outfit | Level |
|---|---|---|
| `base.png` | grey t-shirt, dark trousers (your avatar) | title screen |
| `student.png` | white lab coat over a blue shirt | 1 · Biomedical student |
| `fpt.png` | orange hoodie, jeans, white sneakers | 2 · FPT Software |
| `datanest.png` | light blue shirt, red tie | 3 · Data Nest |
| `birmingham.png` | black graduation gown, mortarboard with gold tassel | 4 · Birmingham MSc |
| `gevernova.png` | yellow hard hat, orange hi-vis vest | 5 · GE Vernova |
| `offline.png` | green tank top, red headband, shorts | Bonus · off the clock |

### Sheet format (what the code expects)
- **3 frames side by side**: `idle | walk A | walk B`.
- **Frame size**: keep the 4:5 ratio, e.g. **32×40 px** per frame, which makes a **96×40 px** sheet. (The placeholder is 16×20.)
- **Background**: transparent PNG.
- **Real pixels**: hard edges with no blur, anti-aliasing or gradients.
- **Same position everywhere**: the character is centred, feet on the bottom row, in every frame of every outfit. Otherwise he "jumps" when the outfit changes.
- **Same palette**: about 16 colours. Use the same hair and skin colours in every sheet.

Once a sheet is ready, point the level at it in `content/journey.ts`:

```ts
outfit: { id: "labCoat", label: "Lab coat", says: "...", sheet: "/images/journey/student.png" },
```

Levels without a `sheet` keep using the code-drawn sprite, so you can replace them one at a time.

## Workflow

### 1. Make the base character from your avatar
Upload `public/images/site/ava.png` as a reference image. Good tools for this:
- **Built for pixel art** (recommended): **PixelLab** and **Retro Diffusion**. They output real pixel grids, and PixelLab can also generate walk animations from one character.
- **General image models**: ChatGPT or Gemini image editing. They're good at keeping the same character across edits, but the result is only "pixel-style" (not on a true grid), so step 4 is required.

Prompt:
> Turn this avatar into a full-body pixel art game sprite. Chibi proportions (big head, small body), front-facing, standing still. 32×40 pixel grid, hard pixel edges, no anti-aliasing, no gradients, flat colours, 1px dark outline, limited 16-colour palette, transparent background. Keep his messy black hair, tan skin and big black eyes exactly. Grey t-shirt, dark trousers.

Generate a few, pick the one that looks most like you, and keep it as your **master reference**.

### 2. Make each outfit by editing the master, not regenerating it
Editing keeps the face and body consistent. Generating from scratch each time gives a slightly different person.

> Same character, same pose, same size and position, same hair, face and colours. Change only his clothes to: **a white lab coat over a blue shirt**. Keep the pixel art style and transparent background.

Repeat with each outfit from the table. Avoid real company logos on the clothes.

### 3. Make the two walk frames
> Same sprite, walking toward the viewer: **left foot stepping forward**, right foot back. Keep everything else identical.

Then the same prompt with the **right foot** forward. In PixelLab you can generate a walk animation directly and pick 2 frames. If walk frames are too hard, copy the idle frame 3 times. The character will still swap outfits; it just won't step.

### 4. Clean up (the step that makes it look professional)
Use **Aseprite** (paid, the standard tool), or the free **LibreSprite** or **Piskel**:
1. **Snap to the grid**: resize to exactly 32×40 with *nearest neighbour* scaling, never smooth scaling.
2. **Reduce the palette** to about 16 colours, and copy the hair and skin colours from the master into every outfit.
3. **Remove the background** and any stray semi-transparent pixels.
4. **Line up the feet** on the bottom row and the body in the centre, the same in every frame.
5. **Assemble the sheet**: put idle, walk A and walk B side by side (96×40) and export as PNG.

### 5. Try it
Put the PNG in `public/images/journey/`, add `sheet` in `content/journey.ts`, run `npm run dev`, and scroll through the journey in both day and night mode.

## Tips
- Consistency matters more than detail. A simple sprite that is identical across outfits looks better than detailed ones that drift.
- Check all outfits side by side before cleaning up. Regenerate any that drift (different face, size or pose).
- Keep your master prompt and settings, so later outfits (new job, new hobby) match.
- Claude Design is not needed for the character. It's useful only if you want to explore page layouts visually.
