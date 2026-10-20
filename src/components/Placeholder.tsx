import { published, type PlaceholderKind } from "../content";

export function Placeholder({ kind }: { kind: PlaceholderKind }) {
  return (
    <div className="placeholder" data-kind={kind}>
      <p>{published.placeholder[kind].toText()}</p>
    </div>
  );
}
