import { createFileRoute } from "@tanstack/react-router";
import { BookingLink } from "../components/BookingLink";
import { Section } from "../components/Section";
import { published } from "../content";

export const Route = createFileRoute("/violet-audio")({
  head: () => ({
    meta: [
      { title: published.violet.meta.title.toText() },
      { name: "description", content: published.violet.meta.description.toText() },
    ],
  }),
  component: VioletAudio,
});

function VioletAudio() {
  const { hero, link, contact } = published.violet;
  return (
    <>
      <header className="hero">
        <p className="eyebrow">{hero.eyebrow.toText()}</p>
        <h1 className="display">{hero.title.toText()}</h1>
        <p className="lede">{hero.lede.toText()}</p>
        <a className="text-link" href={link.href.toHref()}>{link.label.toText()}</a>
      </header>
      <div className="rows">
        <Section heading={contact.heading.toText()}>
          <p>{contact.body.toText()}</p>
          <BookingLink />
        </Section>
      </div>
    </>
  );
}
