import { Link, createFileRoute } from "@tanstack/react-router";
import { BookingLink } from "../components/BookingLink";
import { Products } from "../components/Products";
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
  const { hero, offers, work, belief, book } = published.home;
  const [software, atThe, frontier] = hero.title;
  return (
    <>
      <header className="hero hero-home">
        <p className="eyebrow">{hero.eyebrow.toText()}</p>
        <h1 className="display display-words">
          <span className="word">{software.toText()}</span> <em className="word">{atThe.toText()}</em>{" "}
          <span className="word">{frontier.toText()}</span>
        </h1>
        <p className="lede">{hero.lede.toText()}</p>
        <BookingLink />
      </header>

      <section className="band">
        <h2>{offers.heading.toText()}</h2>
        <ul className="offers">
          {offers.items.map((item) => (
            <li key={item.name.toText()} className="offer">
              <h3>{item.name.toText()}</h3>
              <p>{item.body.toText()}</p>
            </li>
          ))}
        </ul>
        <Link className="text-link" to={offers.link.to}>
          {offers.link.label.toText()}
        </Link>
      </section>

      <section className="band">
        <h2>{work.heading.toText()}</h2>
        <Products />
      </section>

      <section className="band">
        <h2>{belief.heading.toText()}</h2>
        <p>{belief.body.toText()}</p>
        <Link className="text-link" to={belief.link.to}>
          {belief.link.label.toText()}
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
