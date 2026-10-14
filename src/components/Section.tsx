import type { ReactNode } from "react";

export function Section({
  heading,
  sub,
  children,
}: {
  heading: string;
  sub?: string;
  children: ReactNode;
}) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{heading}</h2>
        {sub ? <p className="section-sub">{sub}</p> : null}
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}
