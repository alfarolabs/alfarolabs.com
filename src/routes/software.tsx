import { createFileRoute } from "@tanstack/react-router";
import { Products } from "../components/Products";
import { Section } from "../components/Section";
import { published } from "../content";

export const Route = createFileRoute("/software")({
  head: () => ({
    meta: [
      { title: published.software.meta.title.toText() },
      { name: "description", content: published.software.meta.description.toText() },
    ],
  }),
  component: Software,
});

function Software() {
  const { hero, work } = published.software;
  return (
    <>
      <header className="hero">
        <p className="eyebrow">{hero.eyebrow.toText()}</p>
        <h1 className="display">{hero.title.toText()}</h1>
        <p className="lede">{hero.lede.toText()}</p>
      </header>
      <div className="rows">
        <Section heading={work.heading.toText()}><Products /></Section>
      </div>
    </>
  );
}
