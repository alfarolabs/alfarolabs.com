import { emailHref, published } from "../content";

type Copy = typeof published.booking.label;

export function BookingLink({
  label = published.booking.label,
}: {
  label?: Copy;
}) {
  return (
    <a className="button" href={emailHref()}>
      {label.toText()}
    </a>
  );
}
