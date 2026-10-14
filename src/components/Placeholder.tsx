import type { Placeholder as PlaceholderData } from "../content/site";
import { site } from "../content/site";

const aspect: Record<PlaceholderData["kind"], string | undefined> = {
  screenshot: "16 / 10",
  photo: "4 / 5",
  link: undefined,
};

export function Placeholder({ placeholder }: { placeholder: PlaceholderData }) {
  return (
    <div
      className="placeholder"
      data-kind={placeholder.kind}
      style={{ aspectRatio: aspect[placeholder.kind] }}
    >
      <p>
        {site.placeholderPrefix} {placeholder.note}
      </p>
    </div>
  );
}
