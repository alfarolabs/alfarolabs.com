import type { ComponentProps } from "react";
import { logoSrc, published } from "../content";

type Name = typeof published.name;

// Light theme shows Carlos's original logo; dark theme shows the same mark with
// a white ring and wordmark so the black disc reads on black.
export function Logo({
  alt = "",
  ...rest
}: { alt?: "" | Name } & Omit<ComponentProps<"img">, "src" | "alt">) {
  const text = alt === "" ? "" : alt.toText();
  return (
    <picture>
      <source srcSet={logoSrc("dark")} media="(prefers-color-scheme: dark)" />
      <img src={logoSrc("light")} alt={text} {...rest} />
    </picture>
  );
}
