import { createFileRoute } from "@tanstack/react-router";
import { BookingLink } from "../components/BookingLink";
import { Section } from "../components/Section";
import { published } from "../content";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: published.agents.meta.title.toText() },
      { name: "description", content: published.agents.meta.description.toText() },
    ],
  }),
  component: Agents,
});

function Agents() {
  const { hero, busywork, example, changes, charge, how, faq, notFit, book, custom } = published.agents;
  return (
    <>
      <header className="hero">
        <div className="hero-copy">
          <h1>{hero.title.toText()}</h1>
          <p className="core-line">{hero.sub.toText()}</p>
          {hero.body.map((paragraph) => (
            <p key={paragraph.toText()} className="lede">
              {paragraph.toText()}
            </p>
          ))}
          <BookingLink />
        </div>
      </header>

      <Section heading={busywork.heading.toText()}>
        <ul className="rows rows-grid">
          {busywork.items.map((item) => (
            <li key={item.toText()}>{item.toText()}</li>
          ))}
        </ul>
      </Section>

      <Section heading={example.heading.toText()}>
        <dl className="cells cells-2">
          {example.compare.map((side) => (
            <div key={side.name.toText()} className="cell">
              <dt>{side.name.toText()}</dt>
              <dd className="big">{side.body.toText()}</dd>
            </div>
          ))}
        </dl>
        <p>{example.body.toText()}</p>
      </Section>

      <Section heading={changes.heading.toText()}>
        <ul className="rows rows-grid">
          {changes.items.map((item) => (
            <li key={item.toText()}>{item.toText()}</li>
          ))}
        </ul>
      </Section>

      <Section heading={charge.heading.toText()}>
        <div className="cells cells-3">
          {charge.items.map((item) => (
            <div key={item.name.toText()} className="cell">
              <h3>{item.name.toText()}</h3>
              <p>{item.body.toText()}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section heading={how.heading.toText()} sub={how.sub.toText()}>
        <ol className="cells cells-3">
          {how.steps.map((step) => (
            <li key={step.name.toText()} className="cell">
              <p className="step-index">{step.index.toText()}</p>
              <h3>{step.name.toText()}</h3>
              <p>{step.body.toText()}</p>
            </li>
          ))}
        </ol>
        <div className="pilot">
          <h3>{how.pilot.name.toText()}</h3>
          <p className="price">{how.pilot.price.toText()}</p>
          <p>{how.pilot.body.toText()}</p>
        </div>
        {how.detail.map((paragraph) => (
          <p key={paragraph.toText()}>{paragraph.toText()}</p>
        ))}
      </Section>

      <Section heading={faq.heading.toText()}>
        <ul className="rows">
          {faq.items.map((item) => (
            <li key={item.q.toText()}>
              <h3>{item.q.toText()}</h3>
              <p>{item.a.toText()}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section heading={notFit.heading.toText()}>
        <p>{notFit.body.toText()}</p>
      </Section>

      <Section heading={book.heading.toText()}>
        <BookingLink />
      </Section>

      <Section heading={custom.heading.toText()}>
        <p>{custom.intro.toText()}</p>
        <div className="cells cells-3">
          {custom.items.map((item) => (
            <div key={item.name.toText()} className="cell">
              <h3>{item.name.toText()}</h3>
              <p>{item.body.toText()}</p>
            </div>
          ))}
        </div>
        <BookingLink label={custom.cta} />
      </Section>
    </>
  );
}
