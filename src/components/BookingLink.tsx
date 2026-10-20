import { Link } from "@tanstack/react-router";
import { published } from "../content";
import { Placeholder } from "./Placeholder";

type Copy = typeof published.booking.label;

export function BookingLink({
  slot = "button",
  label = published.booking.label,
}: {
  slot?: "button" | "status";
  label?: Copy;
}) {
  if (slot === "status") return <Placeholder kind="link" />;
  return (
    <Link className="button" to="/contact">
      {label.toText()}
    </Link>
  );
}
