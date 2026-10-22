import { emailHref, instagramHref, published } from "../content";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Logo mark="wordmarkInk" alt={published.name} className="footer-mark" width={744} height={146} />
        <p className="footer-tagline">{published.footerTagline.toText()}</p>
      </div>
      <p className="footer-closing">{published.closing.toText()}</p>
      <ul className="footer-links">
        <li>
          <a href={emailHref()}>{published.email.toText()}</a>
        </li>
        <li>
          <a href={instagramHref()}>{published.instagram.label.toText()}</a>
        </li>
      </ul>
    </footer>
  );
}
