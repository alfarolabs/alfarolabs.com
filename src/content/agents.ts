import type { Faq, Meta, Step } from "./site";
import { site } from "./site";

const steps: Step[] = [
  {
    name: "Free workflow audit",
    body: "30 minutes. We look at how your team works today.",
  },
  {
    name: "Build",
    body: "Fixed scope. A focused fix takes 2 to 3 weeks.",
  },
  {
    name: "Run and improve",
    body: "Agent acceleration. The agent takes on more as it proves itself.",
  },
];

const faqs: Faq[] = [
  {
    q: "Will this replace my people?",
    a: "No. It takes the boring stuff off their plate: chasing emails, rebuilding pull sheets, texting crew. Your people stay in charge and focus on the show and the client.",
  },
  {
    q: "What if the AI messes up?",
    a: "It starts with a human approving everything. The agent drafts, your team clicks approve. It only runs on its own for low-risk tasks once it has proven it gets them right, and Carlos keeps monitoring it.",
  },
  {
    q: "What does it cost?",
    a: "It starts with a free 30-minute check. A deeper pilot audit is $850. Other pricing is shared after the call.",
  },
];

export const agents = {
  meta: {
    title: "Agents | Alfaro Labs",
    description:
      "Carlos sets up AI agents that take the repetitive admin work off a live production business, so people can focus on clients, pricing, and the show.",
  } satisfies Meta,
  hero: {
    title: "Alfaro Labs Agents",
    sub: "AI agents for live production.",
    body: [
      "Carlos sets up AI agents that take the repetitive admin work off a live production business, so people can focus on clients, pricing, and the show.",
      "Agents work in the tools teams already use: email, calendars, spreadsheets, and texts. No new software to learn, and no dependence on special integrations.",
    ],
  },
  busywork: {
    heading: "Busywork agents can take on",
    items: [
      "Client follow-ups",
      "Quotes",
      "Crew scheduling",
      "Vendor confirmations",
      "Invoices",
      "Bookkeeping",
      "Taxes",
      "Insurance",
      "Permits",
    ],
  },
  example: {
    heading: "Worked example. Show confirmations.",
    compare: [
      { name: "Before", body: "Hours of chasing." },
      { name: "With an agent", body: "A quick review." },
    ] satisfies Step[],
    body: "The agent reads the gig details, drafts crew confirmations, call sheets and load-in details for the venue and rental house, and flags anyone who hasn't replied. Your team approves before anything is sent. It runs on the email, calendar, texts and spreadsheets you already use.",
  },
  changes: {
    heading: "What changes",
    items: [
      "Less wasted time.",
      "Vendors confirmed on time.",
      "Better margins.",
      "Happier clients.",
      "Fewer last-minute shop runs.",
      "No double-booked techs.",
    ],
  },
  charge: {
    heading: "You stay in charge",
    items: [
      {
        name: "Agent drafts",
        body: "Quotes, client emails, crew texts, vendor confirmations.",
      },
      {
        name: "Your team approves",
        body: "Nothing goes out without a click.",
      },
      {
        name: "Low-risk tasks run alone",
        body: "Only after they've proven they get it right.",
      },
    ] satisfies Step[],
  },
  how: {
    heading: "How it works",
    sub: "Biggest leak first. We can fix everything.",
    steps,
    pilot: {
      name: "Pilot audit",
      price: "$850",
      body: "A deeper look at the number one pain, with a written fix plan and price.",
    },
    detail: [
      "The call walks one real week from job inquiry to quote, crew booking, gear prep, show day, and invoicing, then picks the one job costing the most.",
      "The proposal is one page, fixed price, with plain \"what done looks like\" tests. Example: \"Crew confirmed 72h before every show without chasing.\"",
      "An optional monthly plan to keep it running is offered at handoff.",
    ],
  },
  faq: {
    heading: "Questions",
    items: faqs,
  },
  notFit: {
    heading: "Not a fit",
    body: "Full ERP replacements, or anyone expecting AI to replace staff overnight.",
  },
  book: {
    heading: site.booking.longLabel,
  },
  custom: {
    heading: "Custom builds",
    intro:
      "The core offer is agents in the tools a team already uses. When a team outgrows that, custom software is the next step.",
    items: [
      {
        name: "Right-sized custom software",
        body: "Instead of picking between a spreadsheet and a bloated suite that does 50 things you don't need, get software with only the features you use.",
      },
      {
        name: "Hosted custom instances",
        body: "Your own deployment of an Alfaro Labs core product (for example crew scheduling), with only your features switched on, your branding, data import, and integrations.",
      },
      {
        name: "Care plans",
        body: "Hosting, monitoring, backups, updates, small changes, agent tuning, and a monthly check-in. Offered at handoff.",
      },
    ] satisfies Step[],
    cta: "Ask about custom builds",
  },
};
