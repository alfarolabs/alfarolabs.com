import type { published } from "../content";

type Shot = (typeof published.software.products)[0]["shot"];

export function Shot({ shot }: { shot: Shot }) {
  return (
    <picture>
      <source srcSet={shot.dark} media="(prefers-color-scheme: dark)" />
      <img
        className="shot"
        src={shot.light}
        alt={shot.alt.toText()}
        width={shot.width}
        height={shot.height}
        loading="lazy"
      />
    </picture>
  );
}
