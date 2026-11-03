import type { ReactNode } from "react";

export function Section({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  return (
    <section className="row">
      <h2>{heading}</h2>
      <div className="row-body">{children}</div>
    </section>
  );
}
