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
            <img className="product-hero" src={dealer.hero.src} alt={dealer.hero.alt.toText()} width={dealer.hero.width} height={dealer.hero.height} />
            <ul className="lineup">
              {dealer.lineup.map((product) => (
                <li key={product.src}>
                  <figure>
                    <img className="shot" src={product.src} alt={product.alt.toText()} width={product.width} height={product.height} loading="lazy" />
                    <figcaption>{product.name.toText()}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Section>
        ))}
      </div>
    </>
  );
}
