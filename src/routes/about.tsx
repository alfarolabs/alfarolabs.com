import { createFileRoute } from "@tanstack/react-router";
import { BookingLink } from "../components/BookingLink";
import { Placeholder } from "../components/Placeholder";
import { Products } from "../components/Products";
import { Section } from "../components/Section";
import { published } from "../content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: published.about.meta.title.toText() },
      { name: "description", content: published.about.meta.description.toText() },
    ],
  }),
  component: About,
});

function About() {
  const { hero, work, book } = published.about;
  return (
    <>
      <header className="hero hero-split">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow.toText()}</p>
          <h1 className="display">{hero.title.toText()}</h1>
          {hero.story.map((paragraph) => (
            <p key={paragraph.toText()} className="lede">
              {paragraph.toText()}
            </p>
          ))}
        </div>
        <Placeholder kind="photo" />
      </header>

      <div className="rows">
        <Section heading={work.heading.toText()}>
          <Products />
        </Section>
        <Section heading={book.heading.toText()}>
          <p>{book.body.toText()}</p>
          <BookingLink />
        </Section>
      </div>
    </>
  );
}
