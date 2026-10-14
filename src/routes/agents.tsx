import { createFileRoute } from "@tanstack/react-router";
import { BookingLink } from "../components/BookingLink";
import { Section } from "../components/Section";
import { agents } from "../content/agents";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: agents.meta.title },
      { name: "description", content: agents.meta.description },
    ],
  }),
  component: Agents,
});

function Agents() {
  const { hero, busywork, example, changes, charge, how, faq, notFit, book, custom } =
    agents;
  return (
    <>
      <header className="hero">
        <div className="hero-copy">
          <h1>{hero.title}</h1>
          <p className="core-line">{hero.sub}</p>
          {hero.body.map((paragraph) => (
            <p key={paragraph} className="lede">
              {paragraph}
            </p>
          ))}
          <BookingLink />
        </div>
      </header>

      <Section heading={busywork.heading}>
        <ul className="rows rows-grid">
          {busywork.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section heading={example.heading}>
        <dl className="cells cells-2">
          {example.compare.map((side) => (
            <div key={side.name} className="cell">
              <dt>{side.name}</dt>
              <dd className="big">{side.body}</dd>
            </div>
          ))}
        </dl>
        <p>{example.body}</p>
      </Section>

      <Section heading={changes.heading}>
        <ul className="rows rows-grid">
          {changes.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section heading={charge.heading}>
        <div className="cells cells-3">
          {charge.items.map((item) => (
            <div key={item.name} className="cell">
              <h3>{item.name}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section heading={how.heading} sub={how.sub}>
        <ol className="cells cells-3">
          {how.steps.map((step, index) => (
            <li key={step.name} className="cell">
              <p className="step-index">{index + 1}</p>
              <h3>{step.name}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="pilot">
          <h3>{how.pilot.name}</h3>
          <p className="price">{how.pilot.price}</p>
          <p>{how.pilot.body}</p>
        </div>
        {how.detail.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Section>

      <Section heading={faq.heading}>
        <ul className="rows">
          {faq.items.map((item) => (
            <li key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section heading={notFit.heading}>
        <p>{notFit.body}</p>
      </Section>

      <Section heading={book.heading}>
        <BookingLink />
      </Section>

      <Section heading={custom.heading}>
        <p>{custom.intro}</p>
        <div className="cells cells-3">
          {custom.items.map((item) => (
            <div key={item.name} className="cell">
              <h3>{item.name}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
        <BookingLink label={custom.cta} />
      </Section>
    </>
  );
}
