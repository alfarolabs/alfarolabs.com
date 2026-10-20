import { createFileRoute } from "@tanstack/react-router";
import { BookingLink } from "../components/BookingLink";
import { Placeholder } from "../components/Placeholder";
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
  const { hero, proof, book } = published.about;
  return (
    <>
      <header className="hero hero-split">
        <div className="hero-copy">
          <h1>{hero.title.toText()}</h1>
          {hero.story.map((paragraph) => (
            <p key={paragraph.toText()} className="lede">
              {paragraph.toText()}
            </p>
          ))}
        </div>
        <Placeholder kind="photo" />
      </header>

      <Section heading={proof.heading.toText()}>
        <ul className="cells cells-2">
          {proof.entries.map((entry) => (
            <li key={entry.name.toText()} className="cell proof">
              <h3>{entry.name.toText()}</h3>
              {"does" in entry ? <p>{entry.does.toText()}</p> : null}
              <Placeholder kind="screenshot" />
            </li>
          ))}
        </ul>
      </Section>

      <Section heading={book.heading.toText()}>
        <BookingLink />
      </Section>
    </>
  );
}
