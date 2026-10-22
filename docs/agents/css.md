---
globs:
  - "**/*.css"
---

# CSS

- Preserve the current visual system unless a redesign is requested. Midnight
  and champagne: each page opens on a dark midnight hero field with soft
  champagne and blue glows, grain, and the lighthouse art tinted in; the body is
  ivory paper with near-black ink, hairline section borders, and dotted rails
  outside the content edge with short ticks beside headings. Instrument Serif
  display type with same-color italic accents, system sans body, mono uppercase
  labels, and champagne buttons with dark text. The book band is a dark midnight
  call to action. The palette is the `:root` variables; glows take RGB triplets.
  Colors, fonts, and easings live in `:root` custom properties. Fonts are local;
  don't add a third-party font dependency.
- Motion is CSS only and must leave content visible without it: keyframes
  animate *from* a hidden state, and `prefers-reduced-motion` turns it off.
- Extend existing layout classes and the 768/1024/1280px breakpoints before adding
  new layout systems. Keep `min-width: 0`, wrapping, focus-visible outlines, and
  minimum link target sizes where used.
- Inspect rendered desktop and mobile states, including long content and focus;
  a successful build does not validate appearance. Do not change brand SVGs to
  solve a layout issue.
