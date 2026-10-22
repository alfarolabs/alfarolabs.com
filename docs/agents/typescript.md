---
globs:
  - "**/*.ts"
  - "**/*.tsx"
---

# TypeScript and React

- Follow strict `tsconfig.json`: do not add `any`, suppression comments, or casts
  to bypass the content/link contracts. Use existing component prop types.
- Prefer small function components, named exports, and `import type` for types.
- Keep published copy in `src/content/index.ts`, including accessible names and
  metadata. Use semantic HTML, keyboard-operable links, and stable list keys.
- No formatter/linter is configured. Match the file rather than reformatting
  unrelated code. Build regenerates `src/routeTree.gen.ts`.
