import { Link, createFileRoute } from "@tanstack/react-router";
import { AgentRun } from "../components/AgentRun";
import { BookingLink } from "../components/BookingLink";
import { Section } from "../components/Section";
import { home } from "../content/home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: home.meta.title },
      { name: "description", content: home.meta.description },
    ],
  }),
  component: Home,
});

function Home() {
  const { hero, pain, breaks, split, approve, proof, about, book } = home;
  return (
    <>
      <header className="hero hero-split">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="core-line">{hero.coreLine}</p>
          <p className="lede">{hero.lede}</p>
          <BookingLink />
        </div>
        <AgentRun />
      </header>

      <Section heading={pain.heading}>
        <ul className="rows rows-large">
          {pain.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section heading={breaks.heading}>
        <p className="lead">{breaks.lead}</p>
        <dl className="cells cells-2">
          {breaks.sides.map((side) => (
            <div key={side.name} className="cell">
              <dt>{side.name}</dt>
              <dd>{side.body}</dd>
            </div>
          ))}
        </dl>
        <p>{breaks.close}</p>
      </Section>

      <Section heading={split.heading}>
        <p>{split.intro}</p>
        <p>{split.tools}</p>
        <div className="cells cells-2">
          {[split.handle, split.keep].map((side) => (
            <div key={side.heading} className="cell">
              <h3>{side.heading}</h3>
              <ul className="rows">
                {side.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section heading={approve.heading}>
        <p className="lead">{approve.body}</p>
      </Section>

      <Section heading={proof.heading}>
        <ul className="rows">
          {proof.entries.map((entry) => (
            <li key={entry.name}>
              <h3>{entry.name}</h3>
              {entry.does ? <p>{entry.does}</p> : null}
            </li>
          ))}
        </ul>
        <Link className="text-link" to={proof.link.to}>
          {proof.link.label}
        </Link>
      </Section>

      <Section heading={about.heading}>
        <p>{about.body}</p>
        <Link className="text-link" to={about.link.to}>
          {about.link.label}
        </Link>
      </Section>

      <Section heading={book.heading}>
        <p>{book.body}</p>
        <BookingLink />
      </Section>
    </>
  );
}
