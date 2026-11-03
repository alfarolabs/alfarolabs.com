import type { published } from "../content";

type Shot = (typeof published.software.products)[0]["shot"];

export function Shot({ shot }: { shot: Shot }) {
  return (
    <img
      className="shot"
      src={shot.src}
      alt={shot.alt.toText()}
      width={shot.width}
      height={shot.height}
      loading="lazy"
    />
  );
}
