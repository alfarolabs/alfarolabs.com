import { createFileRoute } from "@tanstack/react-router";
import { published } from "../content";

export const Route = createFileRoute("/show")({
  head: () => ({
    meta: [
      { title: published.show.meta.title.toText() },
      { name: "description", content: published.show.meta.description.toText() },
    ],
  }),
  component: Show,
});

function Show() {
  const { hero, link } = published.show;
  return (
    <header className="hero">
      <p className="eyebrow">{hero.eyebrow.toText()}</p>
      <h1 className="display">{hero.title.toText()}</h1>
      <p className="lede">{hero.lede.toText()}</p>
      <a className="button" href={link.href.toHref()}>{link.label.toText()}</a>
    </header>
  );
}
