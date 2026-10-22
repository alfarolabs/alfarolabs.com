import { createFileRoute } from "@tanstack/react-router";
import { BookingLink } from "../components/BookingLink";
import { Section } from "../components/Section";
import { published } from "../content";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: published.services.meta.title.toText() },
      { name: "description", content: published.services.meta.description.toText() },
    ],
  }),
  component: Services,
});

function Services() {
  const { hero, areas, how, notFit, book } = published.services;
  return (
    <>
      <header className="hero">
        <p className="eyebrow">{hero.eyebrow.toText()}</p>
        <h1 className="display">{hero.title.toText()}</h1>
        <p className="lede">{hero.lede.toText()}</p>
        <p className="lede">{hero.sub.toText()}</p>
        <BookingLink />
      </header>

      <div className="rows">
        {areas.map((area) => (
          <Section
            key={area.heading.toText()}
            heading={area.heading.toText()}
            points={area.points.map((point) => point.toText())}
          />
        ))}
        <Section heading={how.heading.toText()}>
          <dl className="steps">
            {how.steps.map((step) => (
              <div key={step.name.toText()} className="step">
                <dt>{step.name.toText()}</dt>
                <dd>{step.body.toText()}</dd>
              </div>
            ))}
          </dl>
        </Section>
        <Section heading={notFit.heading.toText()}>
          <p>{notFit.body.toText()}</p>
        </Section>
        <Section heading={book.heading.toText()}>
          <p>{book.body.toText()}</p>
          <BookingLink />
        </Section>
      </div>
    </>
  );
}
