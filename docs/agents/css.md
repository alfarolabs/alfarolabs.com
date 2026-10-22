---
globs:
  - "**/*.css"
---

# CSS

- Preserve the current visual system unless a redesign is requested. Indigo
  night and champagne, set like a book: each page opens on the full-bleed
  lighthouse photograph tinted indigo under a gold star chart (`art/sky.svg`;
  from 1024px the beam continues as a gold orbit, `art/orbit.svg`), with copy
  low and left; the body is ivory paper with Newsreader text, centered chapters
  opened by italic roman numerals, gold-ruled service cards topped with
  engraved celestial diagrams over a faint chart, and a framed photo booking
  panel. The footer is an indigo colophon. Buttons are square and letterspaced: champagne
  outline on midnight, solid midnight on ivory. Colors, fonts, and easings live
  in `:root` custom properties. Fonts are local; don't add a third-party font
  dependency.
- Motion is CSS only and must leave content visible without it: keyframes
  animate *from* a hidden state, and `prefers-reduced-motion` turns it off.
- Extend existing layout classes and the 768/1024/1280px breakpoints before adding
  new layout systems. Keep `min-width: 0`, wrapping, focus-visible outlines, and
  minimum link target sizes where used.
- Inspect rendered desktop and mobile states, including long content and focus;
  a successful build does not validate appearance. Do not change brand SVGs to
  solve a layout issue.
