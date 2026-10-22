---
globs:
  - "**/*.css"
---

# CSS

- Preserve the current visual system unless a redesign is requested: a fixed
  painted royal-purple scene, Instrument Serif display type with gold italic
  accents, mono uppercase labels, gold buttons, and a cream numbered "paper"
  panel set in Newsreader. Colors, fonts, and easings live in `:root` custom
  properties. Fonts are local; don't add a third-party font dependency.
- Motion is CSS only and must leave content visible without it: keyframes
  animate *from* a hidden state, and `prefers-reduced-motion` turns it off.
- Extend existing layout classes and the 768/1024/1280px breakpoints before adding
  new layout systems. Keep `min-width: 0`, wrapping, focus-visible outlines, and
  minimum link target sizes where used.
- Inspect rendered desktop and mobile states, including long content and focus;
  a successful build does not validate appearance. Do not change brand SVGs to
  solve a layout issue.
