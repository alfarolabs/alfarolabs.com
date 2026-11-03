const logoPaths = {
  icon: "/brand/alfaro-labs-icon-white.svg",
  wordmark: "/brand/alfaro-labs-logo-white.svg",
} as const;

export type LogoSrc = (typeof logoPaths)[keyof typeof logoPaths];
export type LogoMark = keyof typeof logoPaths;

export function logoSrc(mark: LogoMark): LogoSrc {
  return logoPaths[mark];
}

const pillarIcons = {
  sound: "/art/pillar-sound.svg",
  software: "/art/pillar-software.svg",
  console: "/art/pillar-console.svg",
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
  tagline: "Live sound services, live production software, and Violet Audio dMix 128 sales.",
  skipLink: "Skip to content",
  navLabel: "Main",
  email: "carlos@alfarolabs.com",
  igLabel: "@alfarolabs on Instagram",
  contactLabel: "Contact Carlos",
  contactTitle: "Talk to Carlos.",
  contactBody: "For live sound services, software, or Violet Audio, get in touch.",
  reachHeading: "Reach Carlos directly.",
  navServices: "Services",
  navSoftware: "Software",
  navViolet: "Violet Audio",
  navShow: "Show",
  homeMetaTitle: "Alfaro Labs. Live sound and software.",
  homeTitle: "Live sound, software, and Violet Audio.",
  pillarsHeading: "Live sound, software, and consoles.",
  pillarsIntro: "Where technology meets live production.",
  servicesPillar: "Live Sound Services",
  softwarePillar: "Live Production SaaS",
  violetPillar: "Violet Audio Dealer",
  servicesMetaTitle: "Services | Alfaro Labs",
  servicesTitle: "Live sound services.",
  servicesBody: "Carlos Alfaro works as a live sound consultant and technician, with close to two decades working live shows.",
  careerHeading: "Built in the field.",
  careerBody: "Alfaro Labs is the studio of Carlos Alfaro. Carlos spent close to 2 decades as a live-show audio tech, working with production companies big and small.",
  softwareMetaTitle: "Software | Alfaro Labs",
  softwareTitle: "Software for live production.",
  softwareBody: "Live production SaaS, built from work in the field.",
  workHeading: "Made at Alfaro Labs.",
  workIntro: "Tools for the people behind live production.",
  workAgents: "Carlos builds and runs his software and day-to-day work with AI agents.",
  patchlistName: "Patchlist",
  patchlistBody: "The production OS for live sound. Build a patch once, export a network preset, and share it with the whole crew.",
  patchlistLink: "patchlist.app",
  verboName: "Verbo",
  verboStatus: "In development",
  verboBody: "Live Spanish-to-English sermon translation, heard through earphones with captions on phones.",
  violetMetaTitle: "Violet Audio | Alfaro Labs",
  violetTitle: "Violet Audio dMix 128.",
  violetBody: "Carlos Alfaro is an official dealer of the Violet Audio dMix 128 console.",
  violetLink: "View the dMix 128",
  violetContact: "Contact Carlos about the Violet Audio dMix 128.",
  showMetaTitle: "Show | Alfaro Labs",
  showBody: "Watch on the Alfaro Labs YouTube channel.",
  showLink: "Watch on YouTube",
  homeContactBody: "Tell Carlos about your next show or the tools you need.",
});

const footerTagline = Line.mint(`${lines.name.toText()}. ${lines.tagline.toText()}`);
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

const products = [
  { name: lines.patchlistName, body: lines.patchlistBody, link: { href: patchlist, label: lines.patchlistLink } },
  { name: lines.verboName, body: lines.verboBody, status: lines.verboStatus },
] as const;

export const published = {
  name: lines.name,
  skipLink: lines.skipLink,
  navLabel: lines.navLabel,
  email: lines.email,
  footerTagline,
  instagram: { label: lines.igLabel },
  booking: { label: lines.contactLabel },
  nav: [
    { to: "/services" as const, label: lines.navServices },
    { to: "/software" as const, label: lines.navSoftware },
    { to: "/violet-audio" as const, label: lines.navViolet },
    { to: "/show" as const, label: lines.navShow },
  ],
  home: {
    meta: { title: lines.homeMetaTitle, description: lines.tagline },
    hero: { eyebrow: lines.name, title: lines.homeTitle, lede: lines.tagline },
    offers: {
      heading: lines.pillarsHeading,
      intro: lines.pillarsIntro,
      items: [
        { name: lines.servicesPillar, body: lines.servicesBody, to: "/services" as const, icon: pillarIcons.sound },
        { name: lines.softwarePillar, body: lines.softwareBody, to: "/software" as const, icon: pillarIcons.software },
        { name: lines.violetPillar, body: lines.violetBody, to: "/violet-audio" as const, icon: pillarIcons.console },
      ],
    },
    show: { heading: lines.navShow, body: lines.showBody, link: { to: "/show" as const, label: lines.navShow } },
    book: { heading: lines.contactTitle, body: lines.homeContactBody },
  },
  services: {
    meta: { title: lines.servicesMetaTitle, description: lines.servicesBody },
    hero: { eyebrow: lines.navServices, title: lines.servicesTitle, lede: lines.servicesBody },
    career: { heading: lines.careerHeading, body: lines.careerBody },
    contact: { heading: lines.reachHeading, body: lines.contactBody },
  },
  software: {
    meta: { title: lines.softwareMetaTitle, description: lines.softwareBody },
    hero: { eyebrow: lines.navSoftware, title: lines.softwareTitle, lede: lines.softwareBody },
    work: { heading: lines.workHeading, intro: lines.workIntro, agents: lines.workAgents, products },
  },
  violet: {
    meta: { title: lines.violetMetaTitle, description: lines.violetBody },
    hero: { eyebrow: lines.navViolet, title: lines.violetTitle, lede: lines.violetBody },
    link: { href: violet, label: lines.violetLink },
    contact: { heading: lines.contactTitle, body: lines.violetContact },
  },
  show: {
    meta: { title: lines.showMetaTitle, description: lines.showBody },
    hero: { eyebrow: lines.name, title: lines.navShow, lede: lines.showBody },
    link: { href: youtube, label: lines.showLink },
  },
};

export function ownedLines(): readonly string[] {
  return owned.map((line) => line.toText());
}

export function requiredLines(): {
  pages: { [P in "/" | "/services" | "/software" | "/violet-audio" | "/show"]: readonly string[] };
  everyPage: readonly string[];
  logos: ReadonlySet<LogoSrc>;
  oncePhrases: readonly ["Agentify yourself", "We can fix everything", "Agent acceleration"];
} {
  return {
    pages: {
      "/": [lines.homeTitle.toText(), lines.tagline.toText(), lines.servicesPillar.toText(), lines.softwarePillar.toText(), lines.violetPillar.toText(), lines.pillarsIntro.toText(), lines.showBody.toText()],
      "/services": [lines.servicesTitle.toText(), lines.servicesBody.toText(), lines.careerBody.toText(), lines.contactBody.toText(), lines.email.toText()],
      "/software": [lines.softwareTitle.toText(), lines.patchlistBody.toText(), lines.verboName.toText(), lines.verboStatus.toText(), lines.verboBody.toText(), lines.workAgents.toText()],
      "/violet-audio": [lines.violetTitle.toText(), lines.violetBody.toText(), lines.violetLink.toText(), lines.violetContact.toText()],
      "/show": [lines.navShow.toText(), lines.showBody.toText(), lines.showLink.toText()],
    },
    everyPage: [footerTagline.toText()],
    logos: new Set([logoSrc("icon"), logoSrc("wordmark")]),
    oncePhrases: ["Agentify yourself", "We can fix everything", "Agent acceleration"],
  };
}
