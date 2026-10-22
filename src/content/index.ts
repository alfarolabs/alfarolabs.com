type RejectWideString<T> = string extends T ? never : T;

export type BookingHref = RejectWideString<null>;

null satisfies BookingHref;

const logoPaths = {
  icon: "/brand/icon-on-black.svg",
  wordmark: "/brand/wordmark-white.svg",
} as const;

export type LogoSrc = (typeof logoPaths)[keyof typeof logoPaths];
export type LogoMark = keyof typeof logoPaths;

export function logoSrc(mark: LogoMark): LogoSrc {
  return logoPaths[mark];
}

export function iconLink(): { rel: "icon"; type: "image/svg+xml"; href: LogoSrc } {
  return { rel: "icon", type: "image/svg+xml", href: logoSrc("icon") };
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
  tagline: "Technology consulting for AI, agents, and custom software.",
  oneLiner:
    "Alfaro Labs offers technology consulting focused on AI, agents, and custom software at the frontier.",
  homeMetaTitle: "Alfaro Labs. Software at the frontier.",
  closing: "Stay at the frontier.",
  skipLink: "Skip to content",
  navLabel: "Main",
  email: "carlos@alfarolabs.com",
  igLabel: "@alfarolabs on Instagram",
  bookCall: "Book a call",
  bookLong: "Start with a 30 minute call.",
  placeholderPrefix: "Placeholder.",
  notePhoto: "Photo of Carlos TBD.",
  noteBooking: "Booking link TBD.",
  noteProduct: "Link and description TBD.",
  navServices: "Services",
  navAbout: "About",
  navManifesto: "Manifesto",
  heroEyebrow: "Technology consulting",
  heroSoftware: "Software",
  heroAtThe: "at the",
  heroFrontier: "Frontier",
  servicesMore: "See how an engagement works",
  beliefHeading: "What we believe.",
  beliefBody: "Eight short statements on where software is going, and why we work the way we do.",
  manifestoLink: "Read the manifesto",
  manifestoMetaTitle: "Manifesto | Alfaro Labs",
  manifestoTitle: "The manifesto.",
  manifestoLede: "What we believe about software at the frontier, and how it shapes the work.",

  t1Heading: "The ground has moved.",
  t1a: "Models now write working code, read whole documents, and carry out multi-step tasks on their own.",
  t1b: "Most businesses are still deciding whether to start.",
  t1c: "Waiting for things to settle is a decision too. It is usually the expensive one.",
  t2Heading: "The models get better faster than anyone plans for.",
  t2a: "Whatever you scoped six months ago is already too small.",
  t2b: "Build for the next model, not the last one.",
  t2c: "Every few months, hand the agents more of the work. Otherwise you stay stuck on a low point of the curve.",
  t3Heading: "Agents do the work. They do not just suggest it.",
  t3a: "The chat sidebar was the first step, not the destination.",
  t3b: "Agents run in the background, across your tools, whether or not someone is watching.",
  t3c: "The unit of work becomes the delegated task, not the line of code.",
  t4Heading: "Code is no longer the scarce part.",
  t4a: "Writing valid code is cheap now.",
  t4b: "Judgment is not: what to build, in what order, and what to leave out.",
  t4c: "Review moves from lines of code to decisions.",
  t5Heading: "Custom software becomes the sensible default.",
  t5a: "Buying a suite that does 50 things to use 5 of them made sense when code was scarce.",
  t5b: "Now the right-sized tool, built for how your team actually works, can cost less than the license.",
  t5c: "Your data, permissions, relationships, and know-how are the moat. The software around them can be rebuilt.",
  t6Heading: "The winners reorganize around the models.",
  t6a: "Fitting AI into old processes wastes most of it.",
  t6b: "A small team with strong judgment and many agents will outrun a large team doing things the old way.",
  t6c: "The goal is not to add AI to the old way of working. It is to find the new way.",
  t7Heading: "Every serious business needs a camp at the frontier.",
  t7a: "You cannot learn this by committee or by slide deck.",
  t7b: "You need people who use these tools every day, on real systems, with real consequences.",
  t7c: "That is the work of Alfaro Labs.",
  t8Heading: "Therefore.",
  t8a: "We build for a world where intelligence is abundant, continuous, and cheap.",
  t8b: "We ship working systems, not strategy documents.",
  t8c: "We prove it on our own products first, then bring it to yours.",
  t8d: "We stay at the frontier, because that is where the useful answers are.",

  workHeading: "Made at Alfaro Labs.",
  workIntro: "Products we build and run with agents. The same methods go to work for clients.",
  patchlistName: "Patchlist",
  patchlistBody:
    "The production OS for live sound. Build a patch once, export a network preset, and share it with the whole crew.",
  patchlistLink: "patchlist.app",
  gearmindName: "Gearmind",
  verboName: "Verbo",

  homeBookHeading: "Work with Alfaro Labs.",
  homeBookBody:
    "We look at where AI and agents can do real work in your business today, and what to build first.",

  servicesMetaTitle: "Services | Alfaro Labs",
  servicesTitle: "What we do.",
  servicesLede: "We advise, then we build. Every engagement ends with something that runs.",
  s1Heading: "AI strategy, grounded in working systems.",
  s1a: "We map where models can take real work off your team today, and where they cannot yet.",
  s1b: "Every recommendation comes with a working prototype.",
  s1c: "We plan for the models you will have next quarter, not only the ones you have now.",
  s2Heading: "Agents that do the work.",
  s2a: "Agents that run across the tools you already use: email, calendars, spreadsheets, and internal systems.",
  s2b: "People approve first. Agents earn more autonomy as they prove they get it right.",
  s2c: "We monitor them, tune them, and hand them more of the work over time.",
  s3Heading: "Custom software, right sized.",
  s3a: "Software with only the features you use, built around how your team works.",
  s3b: "Built with agents, so it ships in weeks instead of quarters.",
  s3c: "Your data, your deployment, your branding.",
  s4Heading: "A camp at the frontier for your team.",
  s4a: "Hands-on sessions where your people build with agents on your own systems.",
  s4b: "The output is not only software, but people and practices that keep up.",
  howHeading: "How an engagement works.",
  stepCall: "Call",
  stepCallBody: "30 minutes. We look at how your team works today and where the leverage is.",
  stepPilot: "Pilot",
  stepPilotBody: "A fixed-scope build on one real problem, with plain tests for what done looks like.",
  stepRun: "Run and expand",
  stepRunBody: "We keep it running, measure it, and take on the next problem.",
  notFitHeading: "Not a fit.",
  notFitBody: "Teams that want a slide deck instead of a working system, or expect AI to replace staff overnight.",

  aboutMetaTitle: "About | Alfaro Labs",
  aboutMetaDescription:
    "Alfaro Labs is the studio of Carlos Alfaro: close to 2 decades in live production, and building with agents every day.",
  aboutTitle: "Built in the field.",
  storyCareer:
    "Alfaro Labs is the studio of Carlos Alfaro. Carlos spent close to 2 decades as a live-show audio tech, working with production companies big and small.",
  storyAgents:
    "He has tested agents since Claude Code first shipped and builds with them every day, on his own products first and then for clients.",

  contactMetaTitle: "Book a call | Alfaro Labs",
  contactBody:
    "Tell us what you are trying to build. We will tell you what is possible now, what is close, and what to do first.",
  reachHeading: "Or reach Carlos directly.",
  emailLabel: "Email",
  igReachLabel: "Instagram",
});

const placeholderLines = {
  photo: Line.mint(`${lines.placeholderPrefix.toText()} ${lines.notePhoto.toText()}`),
  link: Line.mint(`${lines.placeholderPrefix.toText()} ${lines.noteBooking.toText()}`),
  product: Line.mint(`${lines.placeholderPrefix.toText()} ${lines.noteProduct.toText()}`),
} as const;

const footerTagline = Line.mint(`${lines.name.toText()}. ${lines.tagline.toText()}`);
const contactDescription = Line.mint(`${lines.bookLong.toText()} ${lines.contactBody.toText()}`);

const seen = new Set<string>();
for (const line of owned) {
  const text = line.toText();
  if (seen.has(text)) throw new Error(`duplicate ledger line: ${text}`);
  seen.add(text);
}

const mail = ExternalHref.mint(`mailto:${lines.email.toText()}`);
const instagram = ExternalHref.mint("https://instagram.com/alfarolabs");
const patchlist = ExternalHref.mint("https://patchlist.app/");

export type PlaceholderKind = keyof typeof placeholderLines;

export function emailHref(): string {
  return mail.toHref();
}

export function instagramHref(): string {
  return instagram.toHref();
}

const products = [
  {
    name: lines.patchlistName,
    body: lines.patchlistBody,
    link: { href: patchlist, label: lines.patchlistLink },
  },
  { name: lines.gearmindName },
  { name: lines.verboName },
] as const;

const work = { heading: lines.workHeading, intro: lines.workIntro, products };

export const published = {
  name: lines.name,
  skipLink: lines.skipLink,
  navLabel: lines.navLabel,
  email: lines.email,
  closing: lines.closing,
  footerTagline,
  instagram: { label: lines.igLabel },
  booking: {
    label: lines.bookCall,
    longLabel: lines.bookLong,
  },
  nav: [
    { to: "/agents" as const, label: lines.navServices },
    { to: "/manifesto" as const, label: lines.navManifesto },
    { to: "/about" as const, label: lines.navAbout },
    { to: "/contact" as const, label: lines.bookCall },
  ],
  placeholder: placeholderLines,
  home: {
    meta: { title: lines.homeMetaTitle, description: lines.oneLiner },
    hero: {
      eyebrow: lines.heroEyebrow,
      title: [lines.heroSoftware, lines.heroAtThe, lines.heroFrontier] as const,
      lede: lines.oneLiner,
    },
    offers: {
      heading: lines.servicesTitle,
      items: [
        { name: lines.s1Heading, body: lines.s1a },
        { name: lines.s2Heading, body: lines.s2a },
        { name: lines.s3Heading, body: lines.s3a },
      ],
      link: { to: "/agents" as const, label: lines.servicesMore },
    },
    work,
    belief: {
      heading: lines.beliefHeading,
      body: lines.beliefBody,
      link: { to: "/manifesto" as const, label: lines.manifestoLink },
    },
    book: { heading: lines.homeBookHeading, body: lines.homeBookBody },
  },
  manifesto: {
    meta: { title: lines.manifestoMetaTitle, description: lines.manifestoLede },
    hero: { title: lines.manifestoTitle, lede: lines.manifestoLede },
    theses: [
      { heading: lines.t1Heading, points: [lines.t1a, lines.t1b, lines.t1c] },
      { heading: lines.t2Heading, points: [lines.t2a, lines.t2b, lines.t2c] },
      { heading: lines.t3Heading, points: [lines.t3a, lines.t3b, lines.t3c] },
      { heading: lines.t4Heading, points: [lines.t4a, lines.t4b, lines.t4c] },
      { heading: lines.t5Heading, points: [lines.t5a, lines.t5b, lines.t5c] },
      { heading: lines.t6Heading, points: [lines.t6a, lines.t6b, lines.t6c] },
      { heading: lines.t7Heading, points: [lines.t7a, lines.t7b, lines.t7c] },
      { heading: lines.t8Heading, points: [lines.t8a, lines.t8b, lines.t8c, lines.t8d] },
    ],
    book: { heading: lines.homeBookHeading, body: lines.homeBookBody },
  },
  services: {
    meta: { title: lines.servicesMetaTitle, description: lines.oneLiner },
    hero: { title: lines.servicesTitle, lede: lines.oneLiner, sub: lines.servicesLede },
    areas: [
      { heading: lines.s1Heading, points: [lines.s1a, lines.s1b, lines.s1c] },
      { heading: lines.s2Heading, points: [lines.s2a, lines.s2b, lines.s2c] },
      { heading: lines.s3Heading, points: [lines.s3a, lines.s3b, lines.s3c] },
      { heading: lines.s4Heading, points: [lines.s4a, lines.s4b] },
    ],
    how: {
      heading: lines.howHeading,
      steps: [
        { name: lines.stepCall, body: lines.stepCallBody },
        { name: lines.stepPilot, body: lines.stepPilotBody },
        { name: lines.stepRun, body: lines.stepRunBody },
      ],
    },
    notFit: { heading: lines.notFitHeading, body: lines.notFitBody },
    book: { heading: lines.bookLong, body: lines.stepCallBody },
  },
  about: {
    meta: { title: lines.aboutMetaTitle, description: lines.aboutMetaDescription },
    hero: { title: lines.aboutTitle, story: [lines.storyCareer, lines.storyAgents] },
    work,
    book: { heading: lines.bookLong, body: lines.contactBody },
  },
  contact: {
    meta: { title: lines.contactMetaTitle, description: contactDescription },
    hero: {
      eyebrow: lines.bookCall,
      title: lines.bookLong,
      body: lines.contactBody,
    },
    reach: {
      heading: lines.reachHeading,
      emailLabel: lines.emailLabel,
      instagramLabel: lines.igReachLabel,
    },
  },
};

export function ownedLines(): readonly string[] {
  return owned.map((line) => line.toText());
}

export function requiredLines(): {
  pages: { [P in "/" | "/manifesto" | "/agents" | "/about" | "/contact"]: readonly string[] };
  everyPage: readonly string[];
  logos: ReadonlySet<LogoSrc>;
  oncePhrases: readonly ["Agentify yourself", "We can fix everything", "Agent acceleration"];
} {
  const { home, manifesto, services, about, contact } = published;
  return {
    pages: {
      "/": [
        home.hero.lede.toText(),
        home.offers.items[0].name.toText(),
        home.offers.items[2].body.toText(),
        home.belief.link.label.toText(),
        home.work.heading.toText(),
        home.work.products[0].link.label.toText(),
        home.work.products[2].name.toText(),
        published.placeholder.product.toText(),
      ],
      "/manifesto": [
        manifesto.hero.title.toText(),
        manifesto.theses[0].heading.toText(),
        manifesto.theses[7].points[3].toText(),
      ],
      "/agents": [
        services.hero.title.toText(),
        services.areas[0].heading.toText(),
        services.areas[3].points[1].toText(),
        services.how.steps[2].body.toText(),
        services.notFit.heading.toText(),
      ],
      "/about": [
        about.hero.story[0].toText(),
        about.hero.story[1].toText(),
        about.work.products[0].body.toText(),
        about.work.products[1].name.toText(),
        published.placeholder.photo.toText(),
      ],
      "/contact": [
        contact.hero.title.toText(),
        contact.hero.body.toText(),
        published.placeholder.link.toText(),
        published.email.toText(),
        published.instagram.label.toText(),
      ],
    },
    everyPage: [published.footerTagline.toText(), published.booking.label.toText(), published.closing.toText()],
    logos: new Set([logoSrc("icon"), logoSrc("wordmark")]),
    oncePhrases: ["Agentify yourself", "We can fix everything", "Agent acceleration"],
  };
}
