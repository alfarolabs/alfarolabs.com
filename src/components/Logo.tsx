import type { ComponentProps } from "react";
import { logoSrc, published, type LogoMark } from "../content";

type Name = typeof published.name;

export function Logo({
  mark,
  alt = "",
  ...rest
}: { mark: LogoMark; alt?: "" | Name } & Omit<ComponentProps<"img">, "src" | "alt">) {
  const text = alt === "" ? "" : alt.toText();
  return <img src={logoSrc(mark)} alt={text} {...rest} />;
}
