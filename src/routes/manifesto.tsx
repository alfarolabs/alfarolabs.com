import { createFileRoute } from "@tanstack/react-router";
import { BookingLink } from "../components/BookingLink";
import { Section } from "../components/Section";
import { published } from "../content";

export const Route = createFileRoute("/manifesto")({
  head: () => ({
    meta: [
      { title: published.manifesto.meta.title.toText() },
      { name: "description", content: published.manifesto.meta.description.toText() },
    ],
  }),
  component: Manifesto,
});

function Manifesto() {
  const { hero, theses, book } = published.manifesto;
  return (
    <>
      <header className="hero">
        <h1 className="display">{hero.title.toText()}</h1>
        <p className="lede">{hero.lede.toText()}</p>
      </header>

      <div className="paper">
        {theses.map((thesis) => (
          <Section
            key={thesis.heading.toText()}
            heading={thesis.heading.toText()}
            points={thesis.points.map((point) => point.toText())}
          />
        ))}
        <Section heading={book.heading.toText()}>
          <p>{book.body.toText()}</p>
          <BookingLink />
        </Section>
      </div>
    </>
  );
}
