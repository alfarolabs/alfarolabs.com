import { emailHref, instagramHref, published } from "../content";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Logo mark="wordmark" alt={published.name} className="footer-mark" width={1212} height={1211} />
      <div className="footer-copy">
        <p className="footer-tagline">{published.footerTagline.toText()}</p>
        <p>{published.coreLine.toText()}</p>
        <ul className="footer-links">
          <li>
            <a href={emailHref()}>{published.email.toText()}</a>
          </li>
          <li>
            <a href={instagramHref()}>{published.instagram.label.toText()}</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
