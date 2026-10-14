import type { Meta } from "./site";
import { site } from "./site";

export const contact = {
  meta: {
    title: "Book a call | Alfaro Labs",
    description:
      "Book a free workflow audit. 30 minutes. We look at how your team works today.",
  } satisfies Meta,
  hero: {
    eyebrow: site.booking.label,
    title: site.booking.longLabel,
    body: "Free workflow audit. 30 minutes. We look at how your team works today.",
  },
  reach: {
    heading: "Or reach Carlos directly",
    emailLabel: "Email",
    instagramLabel: "Instagram",
  },
};
