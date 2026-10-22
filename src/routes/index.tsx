import { Link, createFileRoute } from "@tanstack/react-router";
import { BookingLink } from "../components/BookingLink";
import { Products } from "../components/Products";
import { Section } from "../components/Section";
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
  const { hero, theses, work, book } = published.home;
  const [software, atThe, frontier] = hero.title;
  return (
    <>
      <header className="hero hero-home">
        <ul className="chips">
          <li>
            <Link className="chip" to={hero.chips.services.to}>
              {hero.chips.services.label.toText()}
            </Link>
          </li>
          <li>
            <a className="chip" href={hero.chips.patchlist.href.toHref()}>
              {hero.chips.patchlist.label.toText()}
            </a>
          </li>
        </ul>
        <h1 className="display">
          <span>{software.toText()}</span> <em>{atThe.toText()}</em> <span>{frontier.toText()}</span>
        </h1>
        <p className="lede">{hero.lede.toText()}</p>
        <BookingLink />
      </header>

      <div className="paper">
        {theses.map((thesis) => (
          <Section
            key={thesis.heading.toText()}
            heading={thesis.heading.toText()}
            points={thesis.points.map((point) => point.toText())}
          />
        ))}
        <Section heading={work.heading.toText()}>
          <Products />
        </Section>
        <Section heading={book.heading.toText()}>
          <p>{book.body.toText()}</p>
          <BookingLink />
        </Section>
      </div>
    </>
  );
}
