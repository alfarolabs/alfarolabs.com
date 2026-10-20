import { Link, createFileRoute } from "@tanstack/react-router";
import { AgentRun } from "../components/AgentRun";
import { BookingLink } from "../components/BookingLink";
import { Section } from "../components/Section";
import { published } from "../content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: published.home.meta.title.toText() },
      { name: "description", content: published.home.meta.description.toText() },
    ],
  }),
  component: Home,
});

function Home() {
  const { hero, pain, breaks, split, approve, proof, about, book } = published.home;
  return (
    <>
      <header className="hero hero-split">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow.toText()}</p>
          <h1>{hero.title.toText()}</h1>
          <p className="core-line">{hero.core.toText()}</p>
          <p className="lede">{hero.lede.toText()}</p>
          <BookingLink />
        </div>
        <AgentRun />
      </header>

      <Section heading={pain.heading.toText()}>
        <ul className="rows rows-large">
          {pain.items.map((item) => (
            <li key={item.toText()}>{item.toText()}</li>
          ))}
        </ul>
      </Section>

      <Section heading={breaks.heading.toText()}>
        <p className="lead">{breaks.lead.toText()}</p>
        <dl className="cells cells-2">
          {breaks.sides.map((side) => (
            <div key={side.name.toText()} className="cell">
              <dt>{side.name.toText()}</dt>
              <dd>{side.body.toText()}</dd>
            </div>
          ))}
        </dl>
        <p>{breaks.close.toText()}</p>
      </Section>

      <Section heading={split.heading.toText()}>
        <p>{split.intro.toText()}</p>
        <p>{split.tools.toText()}</p>
        <div className="cells cells-2">
          {[split.handle, split.keep].map((side) => (
            <div key={side.heading.toText()} className="cell">
              <h3>{side.heading.toText()}</h3>
              <ul className="rows">
                {side.items.map((item) => (
                  <li key={item.toText()}>{item.toText()}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section heading={approve.heading.toText()}>
        <p className="lead">{approve.body.toText()}</p>
      </Section>

      <Section heading={proof.heading.toText()}>
        <ul className="rows">
          {proof.entries.map((entry) => (
            <li key={entry.name.toText()}>
              <h3>{entry.name.toText()}</h3>
              {"does" in entry ? <p>{entry.does.toText()}</p> : null}
            </li>
          ))}
        </ul>
        <Link className="text-link" to={proof.link.to}>
          {proof.link.label.toText()}
        </Link>
      </Section>

      <Section heading={about.heading.toText()}>
        <p>{about.body.toText()}</p>
        <Link className="text-link" to={about.link.to}>
          {about.link.label.toText()}
        </Link>
      </Section>

      <Section heading={book.heading.toText()}>
        <p>{book.body.toText()}</p>
        <BookingLink />
      </Section>
    </>
  );
}
