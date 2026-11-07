# Generating your images

Every grey placeholder on the site shows a prompt. Each one is made of the project's own prompt plus your `imageStyle` from `content/voice.md`, so all your images feel like one set.

## Steps

1. **Start from real work when you can.** Screenshots and photos from your own projects are the most convincing. Blur client names and sensitive data, and check your NDA.
2. **Generate the rest.** Copy a placeholder's prompt (one click selects the whole prompt) into your image model (ChatGPT, Gemini, Midjourney, Firefly, Ideogram, Flux or similar).
3. **Keep the set consistent.** Use the same model and style sentence for every image. If your tool supports style or reference images, use your mood board.
4. **Match the shape.** Hero images are 16:9, project cards 4:3, blog covers 2:1. Ask for that aspect ratio.
5. **Save and swap.** Put files in `public/images/` (e.g. `public/images/onboarding-hero.jpg`), then in the case study replace
   `coverPrompt: "…"` with `cover: /images/onboarding-hero.jpg`. Gallery items take `src:` the same way. Add `alt:` text that describes the image.
6. **Keep files small.** Export JPG or WebP at about 2000px wide. The site resizes images for each screen.

## Prompt recipe

`[subject] + [setting] + [light] + [camera or composition] + your imageStyle`

> A hand holding a phone showing a clean payment screen, café background, warm window light, shallow depth of field. Style: clean product photography on soft neutral backgrounds, natural daylight, no text, no logos

## Don'ts

- Don't generate fake UI with real company logos, or fake "screenshots" that look like client work you didn't do.
- Avoid text inside generated images. It usually comes out garbled. Add real text in the page instead.
