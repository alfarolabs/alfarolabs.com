// Carlos's original logo, used unchanged in both themes.
const logoPath = "/brand/alfaro-labs-logo.svg";

export type LogoSrc = typeof logoPath;

export function logoSrc(): LogoSrc {
  return logoPath;
}

const patchlistShot = {
  light: "/art/patchlist-project-home-light.webp",
  dark: "/art/patchlist-project-home-dark.webp",
  width: 1600,
  height: 1000,
} as const;

const gearmindShot = {
  light: "/art/gearmind-project-light.webp",
  dark: "/art/gearmind-project-dark.webp",
  width: 1600,
  height: 1000,
} as const;

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
  homeSoftware: "I build Patchlist, Gearmind, and Verbo for the crews behind live production.",
  homeHardware: "I'm an official dealer for live production hardware.",
  servicesMetaTitle: "Services | Alfaro Labs",
  servicesTitle: "Live sound consulting and tech work",
  servicesLede: "I work as a live sound consultant and technician for live shows.",
  careerHeading: "Built in the field",
  careerBody: "Alfaro Labs is my studio. I've spent close to two decades as a live-show audio tech, working with production companies big and small.",
  softwareMetaTitle: "Software | Alfaro Labs",
  softwareTitle: "Software for live production",
  softwareLede: "Tools I build for the people who run shows.",
  patchlistName: "Patchlist",
  patchlistBody: "The production OS for live sound. Patch the show once, export the network preset, and send your crew a link. They don't need an account.",
  patchlistShotAlt: "Patchlist project home for a show, with the patch, comms plan, cable counts, and inventory",
  patchlistLink: "patchlist.app",
  gearmindName: "Gearmind",
  gearmindBody: "Crew scheduling and communication for live production. Schedulers build and staff shows, and crew confirm their calls from their phones.",
  gearmindShotAlt: "Gearmind project for a three-day festival, with crew calls by position and who has confirmed, is pending, or declined",
  gearmindLink: "gearmind.app",
  verboName: "Verbo",
  verboStatus: "In development",
  verboBody: "Live sermon translation in many languages, heard through earphones with captions on phones.",
  workHeading: "How I work",
  workAgents: "I build and run my software and day-to-day work with AI agents.",
  hardwareMetaTitle: "Hardware | Alfaro Labs",
  hardwareLede: "Brands I'm an official dealer for.",
  violetName: "Violet Audio",
  violetBody: "I'm an official Gold Dealer for Violet Audio, which builds the dMix 128 digital mixer for studios, live venues, and broadcast.",
  violetLink: "View the dMix 128",
  violetContact: "Ask me about Violet Audio",
  violetDmixAlt: "Violet Audio dMix 128 digital mixer, front panel with its XLR inputs and outputs",
  violetIo44Name: "IO44 audio splitter",
  violetIo44Alt: "Two Violet Audio IO44 4-channel passive splitters",
  violetDx16bName: "DX16B audio splitter",
  violetDx16bAlt: "Violet Audio DX16B 16-channel, 3-way passive splitters in 2RU rack chassis",
  violetDx08bName: "DX08B audio splitter",
  violetDx08bAlt: "Violet Audio DX08B 8-channel, 2-way passive splitters in 1RU rack chassis",
  violetAdp61Name: "ADP61 studio preamp",
  violetAdp61Alt: "Violet Audio ADP61 studio preamp and decoder",
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
const gearmind = ExternalHref.mint("https://gearmind.app/");
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

const shots = [
  { ...patchlistShot, alt: lines.patchlistShotAlt },
  { ...gearmindShot, alt: lines.gearmindShotAlt },
] as const;

const products = [
  { name: lines.patchlistName, body: lines.patchlistBody, shot: shots[0], link: { href: patchlist, label: lines.patchlistLink } },
  { name: lines.gearmindName, body: lines.gearmindBody, shot: shots[1], link: { href: gearmind, label: lines.gearmindLink } },
  { name: lines.verboName, body: lines.verboBody, status: lines.verboStatus },
] as const;

// Product photos from violetaudio.com, used as Carlos is a Violet Audio Gold Dealer.
const violetHero = { src: "/art/violet-dmix-128.webp", alt: lines.violetDmixAlt, width: 1686, height: 1128 } as const;
const violetLineup = [
  { name: lines.violetIo44Name, src: "/art/violet-io44.webp", alt: lines.violetIo44Alt, width: 1920, height: 1000 },
  { name: lines.violetDx16bName, src: "/art/violet-dx16b.webp", alt: lines.violetDx16bAlt, width: 1920, height: 1000 },
  { name: lines.violetDx08bName, src: "/art/violet-dx08b.webp", alt: lines.violetDx08bAlt, width: 1920, height: 1000 },
  { name: lines.violetAdp61Name, src: "/art/violet-adp61.webp", alt: lines.violetAdp61Alt, width: 1536, height: 1024 },
] as const;

// Brands Carlos is an official dealer for. Add an entry per brand.
const dealers = [
  { name: lines.violetName, body: lines.violetBody, link: { href: violet, label: lines.violetLink }, contact: lines.violetContact, hero: violetHero, lineup: violetLineup },
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
      { name: lines.navSoftware, body: lines.homeSoftware, to: "/software" as const, shots },
      { name: lines.navHardware, body: lines.homeHardware, to: "/hardware" as const, photo: violetHero },
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
      "/software": [lines.softwareTitle.toText(), lines.patchlistBody.toText(), lines.gearmindName.toText(), lines.gearmindBody.toText(), lines.gearmindLink.toText(), lines.verboName.toText(), lines.verboStatus.toText(), lines.verboBody.toText(), lines.workAgents.toText(), lines.cta.toText()],
      "/hardware": [lines.navHardware.toText(), lines.hardwareLede.toText(), lines.violetName.toText(), lines.violetBody.toText(), lines.violetLink.toText(), lines.violetContact.toText(), lines.violetIo44Name.toText(), lines.violetDx16bName.toText(), lines.violetDx08bName.toText(), lines.violetAdp61Name.toText(), lines.cta.toText()],
      "/show": [lines.navShow.toText(), lines.showBody.toText(), lines.showLink.toText()],
    },
    everyPage: [lines.email.toText()],
    logos: new Set([logoSrc()]),
    oncePhrases: ["Agentify yourself", "We can fix everything", "Agent acceleration"],
  };
}
