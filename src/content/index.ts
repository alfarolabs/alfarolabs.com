const logoPaths = {
  icon: "/brand/alfaro-labs-icon-white.svg",
  wordmark: "/brand/alfaro-labs-logo-white.svg",
} as const;

export type LogoSrc = (typeof logoPaths)[keyof typeof logoPaths];
export type LogoMark = keyof typeof logoPaths;

export function logoSrc(mark: LogoMark): LogoSrc {
  return logoPaths[mark];
}

const patchlistShot = { src: "/art/patchlist-project-home.webp", width: 1600, height: 1000 } as const;

export function iconLinks() {
  return [
    { rel: "icon", sizes: "32x32", type: "image/png", href: "/brand/favicon-32.png" },
    { rel: "icon", type: "image/svg+xml", href: "/brand/favicon.svg" },
    { rel: "apple-touch-icon", href: "/brand/apple-touch-icon-180.png" },
  ];
}

class Line {
  readonly #text: string;
  private constructor(text: string) {
    this.#text = text;
  }
  toText(): string {
    return this.#text;
  }
  static mint(text: string): Line {
    const line = new Line(text);
    owned.push(line);
    return line;
  }
}

class ExternalHref {
  readonly #value: string;
  private constructor(value: string) {
    this.#value = value;
  }
  toHref(): string {
    return this.#value;
  }
  static mint(value: string): ExternalHref {
    return new ExternalHref(value);
  }
}

const owned: Line[] = [];

type Values<T> = T[keyof T];
type NoDupes<T extends Record<string, string>> = {
  [K in keyof T]: T[K] extends Values<Omit<T, K>> ? never : T[K];
};

function mintAll<const T extends Record<string, string>>(raw: T & NoDupes<T>) {
  const out = {} as { [K in keyof T]: Line };
  for (const key of Object.keys(raw) as (keyof T & string)[]) {
    out[key] = Line.mint(raw[key]);
  }
  return out;
}

const lines = mintAll({
  name: "Alfaro Labs",
  skipLink: "Skip to content",
  navLabel: "Main",
  email: "carlos@alfarolabs.com",
  igLabel: "@alfarolabs on Instagram",
  cta: "Get in touch",
  navServices: "Services",
  navSoftware: "Software",
  navHardware: "Hardware",
  navShow: "Show",
  homeMetaTitle: "Alfaro Labs | Carlos Alfaro",
  homeMetaDescription: "I mix live shows, build software for live production, and sell hardware as an official dealer.",
  homeTitle: "I mix live shows and build the software I wish I had",
  homeLede: "I'm Carlos Alfaro. Alfaro Labs is where my work in technology meets live production.",
  homeServices: "Consulting and hands-on work as a live sound technician.",
  homeSoftware: "I build Patchlist and Verbo for the crews behind live production.",
  homeHardware: "I'm an official dealer for live production hardware.",
  servicesMetaTitle: "Services | Alfaro Labs",
  servicesTitle: "Live sound consulting and tech work",
  servicesLede: "I work as a live sound consultant and technician for live shows.",
  careerHeading: "Built in the field",
  careerBody: "Alfaro Labs is the studio of Carlos Alfaro. Carlos spent close to 2 decades as a live-show audio tech, working with production companies big and small.",
  softwareMetaTitle: "Software | Alfaro Labs",
  softwareTitle: "Software for live production",
  softwareLede: "Tools I build for the people who run shows.",
  patchlistName: "Patchlist",
  patchlistBody: "The production OS for live sound. Patch the show once, export the network preset, and send your crew a link. They don't need an account.",
  patchlistShotAlt: "Patchlist project home for a show, with the patch, comms plan, cable counts, and inventory",
  patchlistLink: "patchlist.app",
  verboName: "Verbo",
  verboStatus: "In development",
  verboBody: "Live Spanish-to-English sermon translation, heard through earphones with captions on phones.",
  workHeading: "How I work",
  workAgents: "I build and run my software and day-to-day work with AI agents.",
  hardwareMetaTitle: "Hardware | Alfaro Labs",
  hardwareLede: "Brands I'm an official dealer for.",
  violetName: "Violet Audio dMix 128",
  violetBody: "I'm an official dealer of the Violet Audio dMix 128 digital mixer, which Violet Audio builds for studios, live venues, and broadcast.",
  violetLink: "View the dMix 128",
  violetContact: "Ask me about the dMix 128",
  showMetaTitle: "Show | Alfaro Labs",
  showBody: "Watch on the Alfaro Labs YouTube channel.",
  showLink: "Watch on YouTube",
});

const seen = new Set<string>();
for (const line of owned) {
  const text = line.toText();
  if (seen.has(text)) throw new Error(`duplicate ledger line: ${text}`);
  seen.add(text);
}

const mail = ExternalHref.mint(`mailto:${lines.email.toText()}`);
const instagram = ExternalHref.mint("https://instagram.com/alfarolabs");
const patchlist = ExternalHref.mint("https://patchlist.app/");
const violet = ExternalHref.mint("https://violetaudio.com/dmix-128");
const youtube = ExternalHref.mint("https://www.youtube.com/@alfarolabs");

export function emailHref(): string {
  return mail.toHref();
}

export function instagramHref(): string {
  return instagram.toHref();
}

// Photos Carlos owns. Slots render only when filled; until he sends a headshot
// and field photos, the site shows no frame or placeholder for them.
type Photo = { src: `/photos/${string}`; alt: Line; width: number; height: number };
const photos: { headshot: Photo | null; field: readonly Photo[] } = { headshot: null, field: [] };

const shot = { ...patchlistShot, alt: lines.patchlistShotAlt };

const products = [
  { name: lines.patchlistName, body: lines.patchlistBody, shot, link: { href: patchlist, label: lines.patchlistLink } },
  { name: lines.verboName, body: lines.verboBody, status: lines.verboStatus },
] as const;

// Brands Carlos is an official dealer for. Add an entry per brand.
const dealers = [
  { name: lines.violetName, body: lines.violetBody, link: { href: violet, label: lines.violetLink }, contact: lines.violetContact },
] as const;

export const published = {
  name: lines.name,
  skipLink: lines.skipLink,
  navLabel: lines.navLabel,
  email: lines.email,
  instagram: { label: lines.igLabel },
  cta: lines.cta,
  photos,
  nav: [
    { to: "/services" as const, label: lines.navServices },
    { to: "/software" as const, label: lines.navSoftware },
    { to: "/hardware" as const, label: lines.navHardware },
    { to: "/show" as const, label: lines.navShow },
  ],
  home: {
    meta: { title: lines.homeMetaTitle, description: lines.homeMetaDescription },
    hero: { title: lines.homeTitle, lede: lines.homeLede },
    rows: [
      { name: lines.navServices, body: lines.homeServices, to: "/services" as const },
      { name: lines.navSoftware, body: lines.homeSoftware, to: "/software" as const, shot },
      { name: lines.navHardware, body: lines.homeHardware, to: "/hardware" as const },
    ] as const,
  },
  services: {
    meta: { title: lines.servicesMetaTitle, description: lines.servicesLede },
    hero: { title: lines.servicesTitle, lede: lines.servicesLede },
    career: { heading: lines.careerHeading, body: lines.careerBody },
  },
  software: {
    meta: { title: lines.softwareMetaTitle, description: lines.softwareLede },
    hero: { title: lines.softwareTitle, lede: lines.softwareLede },
    products,
    work: { heading: lines.workHeading, body: lines.workAgents },
  },
  hardware: {
    meta: { title: lines.hardwareMetaTitle, description: lines.homeHardware },
    hero: { title: lines.navHardware, lede: lines.hardwareLede },
    dealers,
  },
  show: {
    meta: { title: lines.showMetaTitle, description: lines.showBody },
    hero: { title: lines.navShow, lede: lines.showBody },
    link: { href: youtube, label: lines.showLink },
  },
};

export function ownedLines(): readonly string[] {
  return owned.map((line) => line.toText());
}

export function requiredLines(): {
  pages: { [P in "/" | "/services" | "/software" | "/hardware" | "/show"]: readonly string[] };
  everyPage: readonly string[];
  logos: ReadonlySet<LogoSrc>;
  oncePhrases: readonly ["Agentify yourself", "We can fix everything", "Agent acceleration"];
} {
  return {
    pages: {
      "/": [lines.homeTitle.toText(), lines.homeLede.toText(), lines.homeServices.toText(), lines.homeSoftware.toText(), lines.homeHardware.toText(), lines.cta.toText()],
      "/services": [lines.servicesTitle.toText(), lines.servicesLede.toText(), lines.careerBody.toText(), lines.cta.toText()],
      "/software": [lines.softwareTitle.toText(), lines.patchlistBody.toText(), lines.verboName.toText(), lines.verboStatus.toText(), lines.verboBody.toText(), lines.workAgents.toText(), lines.cta.toText()],
      "/hardware": [lines.navHardware.toText(), lines.hardwareLede.toText(), lines.violetName.toText(), lines.violetBody.toText(), lines.violetLink.toText(), lines.violetContact.toText(), lines.cta.toText()],
      "/show": [lines.navShow.toText(), lines.showBody.toText(), lines.showLink.toText()],
    },
    everyPage: [lines.email.toText()],
    logos: new Set([logoSrc("icon"), logoSrc("wordmark")]),
    oncePhrases: ["Agentify yourself", "We can fix everything", "Agent acceleration"],
  };
}
