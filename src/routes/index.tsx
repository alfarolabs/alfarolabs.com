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
        <div className="hero-center">
          <h1 className="display display-words">
            <span className="word">{software.toText()}</span> <em className="word">{atThe.toText()}</em>{" "}
            <span className="word">{frontier.toText()}</span>
          </h1>
          <p className="lede">{hero.lede.toText()}</p>
          <BookingLink />
        </div>
        <ul className="chips">
          <li>
            <Link className="chip" to={hero.chips.services.to}>
              <span className="chip-label">{hero.chips.services.label.toText()}</span>
            </Link>
          </li>
          <li>
            <a className="chip" href={hero.chips.patchlist.href.toHref()}>
              <span className="chip-label">{hero.chips.patchlist.label.toText()}</span>
              <span className="chip-sub">{hero.chips.patchlist.sub.toText()}</span>
            </a>
          </li>
        </ul>
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
