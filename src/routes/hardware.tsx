import { createFileRoute } from "@tanstack/react-router";
import { BookingLink } from "../components/BookingLink";
import { Section } from "../components/Section";
import { emailHref, published } from "../content";

export const Route = createFileRoute("/hardware")({
  head: () => ({
    meta: [
      { title: published.hardware.meta.title.toText() },
      { name: "description", content: published.hardware.meta.description.toText() },
    ],
  }),
  component: Hardware,
});

function Hardware() {
  const { hero, dealers } = published.hardware;
  return (
    <>
      <header className="hero">
        <h1 className="display">{hero.title.toText()}</h1>
        <p className="lede">{hero.lede.toText()}</p>
        <BookingLink />
      </header>
      <div className="rows">
        {dealers.map((dealer) => (
          <Section key={dealer.name.toText()} heading={dealer.name.toText()}>
            <p>{dealer.body.toText()}</p>
            <ul className="row-links">
              <li><a className="text-link" href={dealer.link.href.toHref()}>{dealer.link.label.toText()}</a></li>
              <li><a className="text-link" href={emailHref()}>{dealer.contact.toText()}</a></li>
            </ul>
          </Section>
        ))}
      </div>
    </>
  );
}
