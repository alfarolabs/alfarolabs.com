import { emailHref, published } from "../content";

export function BookingLink() {
  return (
    <a className="button" href={emailHref()}>
      {published.cta.toText()}
    </a>
  );
}
