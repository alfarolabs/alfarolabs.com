import { createFileRoute } from "@tanstack/react-router";
import { page } from "../content/page";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <article className="page">
      <header className="hero">
        <img
          className="wordmark"
          src={page.logos.wordmark}
          alt="Alfaro Labs"
          width={2150}
          height={2109}
        />
        <h1>{page.tagline}</h1>
        <p className="agents">{page.agentsLine}</p>
        <p className="lede">{page.oneLiner}</p>
        <a className="cta" href={page.cta.href}>
          {page.cta.label}
        </a>
      </header>

      <section className="section">
        <h2>Pain points</h2>
        <ul>
          {page.pain.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>What agents handle</h2>
        <ul>
          {page.handles.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>Results</h2>
        <ul>
          {page.results.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>How it works</h2>
        <ol className="steps">
          {page.steps.map((step) => (
            <li key={step.name}>
              <h3>{step.name}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section">
        <h2>About</h2>
        {page.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="section">
        <h2>Things we make</h2>
        <ul>
          {page.makes.map((item) => (
            <li key={item.name}>
              {item.name}. {item.status}.
            </li>
          ))}
        </ul>
        <p>{page.distribution}</p>
      </section>

      <footer className="section footer">
        <img
          className="icon"
          src={page.logos.icon}
          alt=""
          width={1774}
          height={1793}
        />
        <p>
          <a href={page.instagram.href}>Instagram {page.instagram.label}</a>
        </p>
        <p>
          <a href={`mailto:${page.email}`}>{page.email}</a>
        </p>
      </footer>
    </article>
  );
}
