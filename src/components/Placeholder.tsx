import type { Placeholder as PlaceholderData } from "../content/site";
import { site } from "../content/site";

export function Placeholder({ placeholder }: { placeholder: PlaceholderData }) {
  return (
    <div className="placeholder" data-kind={placeholder.kind}>
      <p>
        {site.placeholderPrefix} {placeholder.note}
      </p>
    </div>
  );
}
