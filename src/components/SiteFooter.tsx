import { site } from "../content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <img
        className="footer-mark"
        src={site.logos.wordmark}
        alt={site.name}
        width={1212}
        height={1211}
      />
      <div className="footer-copy">
        <p className="footer-tagline">
          {site.name}. {site.tagline}
        </p>
        <p>{site.coreLine}</p>
        <ul className="footer-links">
          <li>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li>
            <a href={site.instagram.href}>{site.instagram.label}</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
