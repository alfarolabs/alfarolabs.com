export type Path = "/" | "/agents" | "/about" | "/contact";

export type NavItem = { to: Exclude<Path, "/">; label: string };

export type Meta = { title: string; description: string };

export type Placeholder = {
  kind: "screenshot" | "photo" | "link";
  note: string;
};

export type Step = { name: string; body: string };

export type Faq = { q: string; a: string };

export type ProofEntry = {
  name: string;
  does?: string;
  placeholder: Placeholder;
};

export type InternalLink = { to: Path; label: string };

export type Booking = {
  href: string | null;
  label: string;
  longLabel: string;
  placeholder: Placeholder;
};

const booking: Booking = {
  href: null,
  label: "Book a call",
  longLabel: "Book a free workflow audit.",
  placeholder: { kind: "link", note: "Booking link TBD." },
};

const nav: NavItem[] = [
  { to: "/agents", label: "Agents" },
  { to: "/about", label: "About" },
  { to: "/contact", label: booking.label },
];

export const site = {
  name: "Alfaro Labs",
  tagline: "We make useful things.",
  serviceLine: "Alfaro Labs Agents. AI agents for live production.",
  coreLine:
    "Give humans the best, and let the machines take care of the rest.",
  oneLiner:
    "I build AI agents that take the admin off your plate, so your people can focus on the work that matters. Built by someone who has worked live shows for close to 2 decades.",
  skipLink: "Skip to content",
  navLabel: "Main",
  email: "carlos@alfarolabs.com",
  instagram: {
    handle: "@alfarolabs",
    label: "@alfarolabs on Instagram",
    href: "https://instagram.com/alfarolabs",
    dm: "DM AUDIT on Instagram.",
  },
  booking,
  nav,
  logos: {
    icon: "/brand/icon-on-black.svg",
    wordmark: "/brand/wordmark-white.svg",
  },
  placeholderPrefix: "Placeholder.",
};
