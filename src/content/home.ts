import type { InternalLink, Meta } from "./site";
import { about } from "./about";
import { site } from "./site";

export const home = {
  meta: {
    title: site.serviceLine,
    description: site.oneLiner,
  } satisfies Meta,
  hero: {
    eyebrow: "Alfaro Labs Agents",
    title: "AI agents for live production.",
    coreLine: site.coreLine,
    lede: site.oneLiner,
  },
  run: {
    label: "Agent run. Show confirmations.",
    done: [
      "Read gig details from the email thread",
      "Drafted crew confirmations",
      "Drafted call sheet and load-in notes for the venue and rental house",
      "Flagged who has not replied",
    ],
    waiting: "Waiting for your approval",
    approve: "Approve",
  },
  pain: {
    heading: "Sound familiar?",
    items: [
      "Gear left at the shop.",
      "A tech booked twice.",
      "A rental order nobody confirmed.",
      "Thousands lost to overtime.",
      "A client who didn't come back.",
    ],
  },
  breaks: {
    heading: "Where it breaks",
    lead: "The information lives everywhere. Over texts, Slack, email and calls.",
    sides: [
      { name: "Inside", body: "Staff and crew." },
      {
        name: "Outside",
        body: "Clients, vendors, rental houses, venues, freelancers.",
      },
    ],
    close:
      "Missed details become show-day mistakes. Agents gather it in one place and get the right details ready for the right people.",
  },
  split: {
    heading: "What agents handle. What people keep.",
    intro:
      "Carlos sets up AI agents that take the repetitive admin work off a live production business, so people can focus on clients, pricing, and the show.",
    tools:
      "Agents work in the tools teams already use: email, calendars, spreadsheets, and texts. No new software to learn, and no dependence on special integrations.",
    handle: {
      heading: "Work agents handle",
      items: [
        "Chase crew confirmations across shows",
        "Build and update the gear list from the email thread",
        "Put call times and load-in on every calendar",
        "Flag last-minute changes to the right people",
        "Send venue, parking, and load-in notes",
        "Log hours so overtime is clear before the invoice",
      ],
    },
    keep: {
      heading: "What people keep",
      items: [
        "Talking to the client and winning the next show",
        "Pricing the job and protecting the margin",
        "Making the call when something breaks on site",
      ],
    },
  },
  approve: {
    heading: "Approve first",
    body: "Agents draft and prepare messages, and your team approves before anything goes out.",
  },
  proof: {
    heading: "Proof",
    entries: about.proof.entries.slice(0, 3),
    link: { to: "/about", label: "See the proof log" } satisfies InternalLink,
  },
  about: {
    heading: "About Carlos",
    body: "Carlos has worked as a live-show audio tech for close to 2 decades, with production companies big and small. He has lived the broken workflows firsthand.",
    link: { to: "/about", label: "More about Carlos" } satisfies InternalLink,
  },
  book: {
    heading: site.booking.longLabel,
    body: "Free workflow audit. 30 minutes. We look at how your team works today.",
  },
};
