---
globs:
  - "**/*.css"
---

# CSS

- Preserve the current visual system unless a redesign is requested: dark
  royal-purple hero art, a cream numbered "paper" panel, monospace display type,
  and serif body text. Colors live in `:root` custom properties. Fonts are local
  or system stacks; don't add a third-party font dependency.
- Extend existing layout classes and the 768/1024/1280px breakpoints before adding
  new layout systems. Keep `min-width: 0`, wrapping, focus-visible outlines, and
  minimum link target sizes where used.
- Inspect rendered desktop and mobile states, including long content and focus;
  a successful build does not validate appearance. Do not change brand SVGs to
  solve a layout issue.
