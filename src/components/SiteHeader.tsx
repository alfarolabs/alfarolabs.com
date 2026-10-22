import { Link } from "@tanstack/react-router";
import { published } from "../content";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip" href="#main">
        {published.skipLink.toText()}
      </a>
      <Link className="brand" to="/">
        <Logo mark="wordmark" alt={published.name} width={744} height={146} />
      </Link>
      <nav aria-label={published.navLabel.toText()}>
        <ul className="nav">
          {published.nav.map((item) => (
            <li key={item.to}>
              <Link className={item.to === "/contact" ? "button button-sm" : undefined} to={item.to}>
                {item.label.toText()}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
