import type { ComponentProps } from "react";
import { logoSrc, published } from "../content";

type Name = typeof published.name;

// Carlos's original logo in both themes, never recolored.
export function Logo({
  alt = "",
  ...rest
}: { alt?: "" | Name } & Omit<ComponentProps<"img">, "src" | "alt">) {
  const text = alt === "" ? "" : alt.toText();
  return <img src={logoSrc()} alt={text} {...rest} />;
}
