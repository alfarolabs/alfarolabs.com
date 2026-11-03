import { createFileRoute } from "@tanstack/react-router";
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
        <p className="eyebrow">{hero.eyebrow.toText()}</p>
        <h1 className="display">{hero.title.toText()}</h1>
        <p className="lede">{hero.lede.toText()}</p>
      </header>
      <div className="rows">
        <Section heading={dealers.heading.toText()}>
          <ul className="products">
            {dealers.items.map((dealer) => (
              <li key={dealer.name.toText()} className="product">
                <h3>{dealer.name.toText()}</h3>
                <p>{dealer.body.toText()}</p>
                <a className="text-link" href={dealer.link.href.toHref()}>{dealer.link.label.toText()}</a>
                <a className="text-link" href={emailHref()}>{dealer.contact.toText()}</a>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </>
  );
}
