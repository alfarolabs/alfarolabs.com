import { createFileRoute } from "@tanstack/react-router";
import { BookingLink } from "../components/BookingLink";
import { Placeholder } from "../components/Placeholder";
import { Section } from "../components/Section";
import { contact } from "../content/contact";
import { site } from "../content/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: contact.meta.title },
      { name: "description", content: contact.meta.description },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { hero, reach } = contact;
  return (
    <>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="lede">{hero.body}</p>
          {site.booking.href ? (
            <BookingLink />
          ) : (
            <Placeholder placeholder={site.booking.placeholder} />
          )}
        </div>
      </header>

      <Section heading={reach.heading}>
        <dl className="cells cells-2">
          <div className="cell">
            <dt>{reach.emailLabel}</dt>
            <dd>
              <a className="text-link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </dd>
          </div>
          <div className="cell">
            <dt>{reach.instagramLabel}</dt>
            <dd>
              <a className="text-link" href={site.instagram.href}>
                {site.instagram.label}
              </a>
              <p>{site.instagram.dm}</p>
            </dd>
          </div>
        </dl>
      </Section>
    </>
  );
}
