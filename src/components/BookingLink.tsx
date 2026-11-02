import { Link } from "@tanstack/react-router";
import { published } from "../content";

type Copy = typeof published.booking.label;

export function BookingLink({
  label = published.booking.label,
}: {
  label?: Copy;
}) {
  return (
    <Link className="button" to="/contact">
      {label.toText()}
    </Link>
  );
}
