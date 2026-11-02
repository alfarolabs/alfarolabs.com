import { createFileRoute } from "@tanstack/react-router";
import { BookingLink } from "../components/BookingLink";
import { Section } from "../components/Section";
import { emailHref, published } from "../content";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: published.services.meta.title.toText() },
      { name: "description", content: published.services.meta.description.toText() },
    ],
  }),
  component: Services,
});

function Services() {
  const { hero, career, contact } = published.services;
  return (
    <>
      <header className="hero">
        <p className="eyebrow">{hero.eyebrow.toText()}</p>
        <h1 className="display">{hero.title.toText()}</h1>
        <p className="lede">{hero.lede.toText()}</p>
        <BookingLink />
      </header>
      <div className="rows">
        <Section heading={career.heading.toText()}>
          <p>{career.body.toText()}</p>
        </Section>
        <Section heading={contact.heading.toText()}>
          <p>{contact.body.toText()}</p>
          <a className="text-link" href={emailHref()}>{published.email.toText()}</a>
        </Section>
      </div>
    </>
  );
}
