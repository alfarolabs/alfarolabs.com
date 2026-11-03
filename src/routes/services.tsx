import { createFileRoute } from "@tanstack/react-router";
import { BookingLink } from "../components/BookingLink";
import { Section } from "../components/Section";
import { published } from "../content";

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
  const { hero, career } = published.services;
  const { field } = published.photos;
  return (
    <>
      <header className="hero">
        <h1 className="display">{hero.title.toText()}</h1>
        <p className="lede">{hero.lede.toText()}</p>
        <BookingLink />
      </header>
      <div className="rows">
        <Section heading={career.heading.toText()}>
          <p>{career.body.toText()}</p>
        </Section>
        {field.length > 0 ? (
          <ul className="field-photos">
            {field.map((photo) => (
              <li key={photo.src}>
                <img src={photo.src} alt={photo.alt.toText()} width={photo.width} height={photo.height} loading="lazy" />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
}
