import { Link, createFileRoute } from "@tanstack/react-router";
import { BookingLink } from "../components/BookingLink";
import { Section } from "../components/Section";
import { Shot } from "../components/Shot";
import { published } from "../content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: published.home.meta.title.toText() },
      { name: "description", content: published.home.meta.description.toText() },
    ],
  }),
  component: Home,
});

function Home() {
  const { hero, rows } = published.home;
  const { headshot } = published.photos;
  return (
    <>
      <header className="hero">
        <div className="hero-text">
          <h1 className="display">{hero.title.toText()}</h1>
          <p className="lede">{hero.lede.toText()}</p>
          <BookingLink />
        </div>
        {headshot ? (
          <img className="portrait" src={headshot.src} alt={headshot.alt.toText()} width={headshot.width} height={headshot.height} />
        ) : null}
      </header>
      <div className="rows">
        {rows.map((row) => (
          <Section key={row.to} heading={<Link to={row.to}>{row.name.toText()}</Link>}>
            <p>{row.body.toText()}</p>
            {"shots" in row ? (
              <div className="shots">
                {row.shots.map((shot) => (
                  <Shot key={shot.light} shot={shot} />
                ))}
              </div>
            ) : null}
            {"photo" in row ? (
              <img className="product-hero" src={row.photo.src} alt={row.photo.alt.toText()} width={row.photo.width} height={row.photo.height} loading="lazy" />
            ) : null}
          </Section>
        ))}
      </div>
    </>
  );
}
