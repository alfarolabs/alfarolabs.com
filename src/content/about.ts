import type { Meta, Placeholder, ProofEntry } from "./site";
import { site } from "./site";

const screenshot: Placeholder = { kind: "screenshot", note: "Screenshot TBD." };

const entries: ProofEntry[] = [
  {
    name: "Gig-day briefing",
    does: "Checks calendars and booking emails nightly. Sends venue, room, call time and expectations one hour before call.",
    placeholder: screenshot,
  },
  {
    name: "Subscription tracker",
    does: "Reads receipts and renewal emails daily. Alerts 7 days before a charge or when a new subscription appears. Never cancels anything.",
    placeholder: screenshot,
  },
  {
    name: "Sunday one-pager",
    does: "The week's call times, load-ins, travel, and venue weather on one page.",
    placeholder: screenshot,
  },
  {
    name: "Payment tracking",
    does: "Expected client payments land as all-day events on the calendar.",
    placeholder: screenshot,
  },
  {
    name: "Daily mentor nugget",
    does: "A lesson from builders he follows, with one action.",
    placeholder: screenshot,
  },
  {
    name: "Weekly pillar scorecard and AI edge briefing",
    placeholder: screenshot,
  },
  {
    name: "Patchlist and Gearmind",
    does: "Built and shipped solo with a coding agent (Patch) using a PR review workflow.",
    placeholder: screenshot,
  },
  {
    name: "This site",
    does: "Built and run with agents.",
    placeholder: screenshot,
  },
];

export const about = {
  meta: {
    title: "About Carlos | Alfaro Labs",
    description:
      "Carlos has worked as a live-show audio tech for close to 2 decades. Testing agents since Claude Code first shipped.",
  } satisfies Meta,
  hero: {
    title: "About Carlos",
    story: [
      "Carlos has worked as a live-show audio tech for close to 2 decades, with production companies big and small. He has lived the broken workflows firsthand.",
      "Testing agents since Claude Code first shipped. Building them every day this year, for my own business first, then for yours.",
    ],
    photo: { kind: "photo", note: "Photo of Carlos TBD." } satisfies Placeholder,
  },
  proof: {
    heading: "Agentify yourself. I did it first.",
    entries,
  },
  book: {
    heading: site.booking.longLabel,
  },
};
