export type WorkStatus = "live" | "beta" | "private" | "oss";

type WorkBase = {
  slug: string;
  name: string;
  oneLiner: string;
  role: "builder";
  stack: string[];
  problem: string;
  shipped: string;
  proof: string;
};

export type Work =
  | (WorkBase & { status: "live" | "beta"; href: string })
  | (WorkBase & { status: "private" | "oss" });

export type Offer = {
  kind: "contract" | "lead";
  title: string;
  forWhom: string;
  youGet: string[];
};

export const person = {
  name: "Carlos Alfaro",
  studio: "Alfaro Labs",
  location: "Las Vegas",
  email: "carlos@alfarolabs.com",
  github: "https://github.com/alfarolabs",
  x: "https://x.com/alfarolabs",
  sentence: "I ship tools and products. Agentic engineering is how I run the work.",
} as const;

export const works: Work[] = [
  {
    slug: "patchlist",
    name: "Patchlist",
    oneLiner: "Production OS for live sound.",
    role: "builder",
    status: "live",
    href: "https://patchlist.app",
    stack: ["Rails 8", "Hotwire", "SQLite", "Hatchbox"],
    problem: "Crew rebuilds the patch in consoles, spreadsheets, and chat.",
    shipped:
      "A planning app where the input list is the source of truth. Soft-patch once, export a network preset, and share a link with crew who do not need an account.",
    proof: "Live at patchlist.app. Private beta.",
  },
  {
    slug: "gearmind",
    name: "Gearmind",
    oneLiner: "Quote to invoice for live production companies.",
    role: "builder",
    status: "private",
    stack: ["Rails 8", "Hotwire", "SQLite"],
    problem: "The show lifecycle is split across quotes, inventory, trucks, crew, and invoices.",
    shipped:
      "A vanilla Rails app on the show lifecycle. Quote, prep, load-in, show, load-out, invoice.",
    proof: "Private. The domain model and the tests live in the repo.",
  },
  {
    slug: "crewbook",
    name: "Crewbook",
    oneLiner: "Crew scheduling for live production teams.",
    role: "builder",
    status: "private",
    stack: ["Rails 8", "Hotwire", "SQLite"],
    problem: "Scheduling and comms for a show live in texts and sheets.",
    shipped: "A scheduling and communications app for live production crews.",
    proof: "Private.",
  },
  {
    slug: "dial",
    name: "Dial",
    oneLiner: "Household espresso dialing on this same stack.",
    role: "builder",
    status: "live",
    href: "https://dial.carlos-0f0.workers.dev",
    stack: ["vinext", "Tailwind", "Cloudflare Workers", "D1"],
    problem: "Two people, one machine, a grind that drifts.",
    shipped: "A phone PWA that names the next Opus setting from taste.",
    proof: "Live Worker. This site uses the same vinext and Workers stack.",
  },
];

export const offers: Offer[] = [
  {
    kind: "contract",
    title: "Contract",
    forWhom: "A founder or a company that needs a tool or a product shipped.",
    youGet: [
      "A working product with tests and a deploy.",
      "A domain model you can keep running after I leave.",
    ],
  },
  {
    kind: "lead",
    title: "Technical lead",
    forWhom: "A team that needs the same bar plus someone to run the engineering system.",
    youGet: [
      "Architecture and delivery owned in-house.",
      "Agentic engineering as the way the team ships, with proof on the real app.",
    ],
  },
];

export const mailto = `mailto:${person.email}`;

export function workBySlug(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug);
}

export function workHref(work: Work): string | undefined {
  if (work.status === "live" || work.status === "beta") return work.href;
  return undefined;
}
