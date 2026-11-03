import { createFileRoute } from "@tanstack/react-router";
import { BookingLink } from "../components/BookingLink";
import { Products } from "../components/Products";
import { Section } from "../components/Section";
import { published } from "../content";

export const Route = createFileRoute("/software")({
  head: () => ({
    meta: [
      { title: published.software.meta.title.toText() },
      { name: "description", content: published.software.meta.description.toText() },
    ],
  }),
  component: Software,
});

function Software() {
  const { hero, work } = published.software;
  return (
    <>
      <header className="hero">
        <h1 className="display">{hero.title.toText()}</h1>
        <p className="lede">{hero.lede.toText()}</p>
        <BookingLink />
      </header>
      <div className="rows">
        <Products />
        <Section heading={work.heading.toText()}>
          <p>{work.body.toText()}</p>
        </Section>
      </div>
    </>
  );
}
