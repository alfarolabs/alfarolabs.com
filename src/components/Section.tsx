import type { ReactNode } from "react";

export function Section({
  heading,
  points,
  children,
}: {
  heading: string;
  points?: readonly string[];
  children?: ReactNode;
}) {
  return (
    <section className="thesis">
      <h2>{heading}</h2>
      {points ? (
        <ol className="points">
          {points.map((point) => (
            <li key={point}>
              <span>{point}</span>
            </li>
          ))}
        </ol>
      ) : null}
      {children ? <div className="thesis-body">{children}</div> : null}
    </section>
  );
}
