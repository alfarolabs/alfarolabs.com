import { createFileRoute } from "@tanstack/react-router";
import { BookingLink } from "../components/BookingLink";
import { Placeholder } from "../components/Placeholder";
import { Section } from "../components/Section";
import { about } from "../content/about";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: about.meta.title },
      { name: "description", content: about.meta.description },
    ],
  }),
  component: About,
});

function About() {
  const { hero, proof, book } = about;
  return (
    <>
      <header className="hero hero-split">
        <div className="hero-copy">
          <h1>{hero.title}</h1>
          {hero.story.map((paragraph) => (
            <p key={paragraph} className="lede">
              {paragraph}
            </p>
          ))}
        </div>
        <Placeholder placeholder={hero.photo} />
      </header>

      <Section heading={proof.heading}>
        <ul className="cells cells-2">
          {proof.entries.map((entry) => (
            <li key={entry.name} className="cell proof">
              <h3>{entry.name}</h3>
              {entry.does ? <p>{entry.does}</p> : null}
              <Placeholder placeholder={entry.placeholder} />
            </li>
          ))}
        </ul>
      </Section>

      <Section heading={book.heading}>
        <BookingLink />
      </Section>
    </>
  );
}
