import { Link } from "@tanstack/react-router";
import { site } from "../content/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip" href="#main">
        {site.skipLink}
      </a>
      <Link className="brand" to="/">
        <img src={site.logos.icon} alt="" width={32} height={32} />
        <span>{site.name}</span>
      </Link>
      <nav aria-label={site.navLabel}>
        <ul className="nav">
          {site.nav.map((item) => (
            <li key={item.to}>
              <Link to={item.to}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
