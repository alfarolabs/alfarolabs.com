import { Link } from "@tanstack/react-router";
import { site } from "../content/site";

export function BookingLink({ label = site.booking.label }: { label?: string }) {
  if (site.booking.href) {
    return (
      <a className="button" href={site.booking.href}>
        {label}
      </a>
    );
  }
  return (
    <Link className="button" to="/contact">
      {label}
    </Link>
  );
}
