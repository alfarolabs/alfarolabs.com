import { Link, createFileRoute } from "@tanstack/react-router";
import { BookingLink } from "../components/BookingLink";
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
  const { hero, offers, show, book } = published.home;
  return (
    <>
      <header className="hero hero-home">
        <p className="eyebrow">{hero.eyebrow.toText()}</p>
        <h1 className="display display-words">
          {hero.title.toText()}
        </h1>
        <div className="hero-aside">
          <p className="lede">{hero.lede.toText()}</p>
          <BookingLink />
        </div>
      </header>

      <section className="band">
        <header className="band-head">
          <h2>{offers.heading.toText()}</h2>
        </header>
        <ul className="offers">
          {offers.items.map((item) => (
            <li key={item.name.toText()} className="offer">
              <h3><Link to={item.to}>{item.name.toText()}</Link></h3>
              <p>{item.body.toText()}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="band">
        <header className="band-head">
          <h2>{show.heading.toText()}</h2>
        </header>
        <p>{show.body.toText()}</p>
        <Link className="text-link" to={show.link.to}>
          {show.link.label.toText()}
        </Link>
      </section>

      <section className="band band-book">
        <h2>{book.heading.toText()}</h2>
        <p>{book.body.toText()}</p>
        <BookingLink />
      </section>
    </>
  );
}
