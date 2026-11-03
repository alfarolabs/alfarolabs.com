import { emailHref, instagramHref, published } from "../content";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Logo alt={published.name} className="footer-mark" width={2166} height={2125} />
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
