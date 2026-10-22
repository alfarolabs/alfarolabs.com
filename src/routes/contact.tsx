import { createFileRoute } from "@tanstack/react-router";
import { BookingLink } from "../components/BookingLink";
import { Section } from "../components/Section";
import { emailHref, instagramHref, published } from "../content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: published.contact.meta.title.toText() },
      { name: "description", content: published.contact.meta.description.toText() },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { hero, reach } = published.contact;
  return (
    <>
      <header className="hero">
        <p className="eyebrow">{hero.eyebrow.toText()}</p>
        <h1 className="display">{hero.title.toText()}</h1>
        <p className="lede">{hero.body.toText()}</p>
        <BookingLink slot="status" />
      </header>

      <div className="paper">
        <Section heading={reach.heading.toText()}>
          <dl className="steps">
            <div className="step">
              <dt>{reach.emailLabel.toText()}</dt>
              <dd>
                <a className="text-link" href={emailHref()}>
                  {published.email.toText()}
                </a>
              </dd>
            </div>
            <div className="step">
              <dt>{reach.instagramLabel.toText()}</dt>
              <dd>
                <a className="text-link" href={instagramHref()}>
                  {published.instagram.label.toText()}
                </a>
              </dd>
            </div>
          </dl>
        </Section>
      </div>
    </>
  );
}
