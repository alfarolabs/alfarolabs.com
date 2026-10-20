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
  tagline: "We make useful things.",
  serviceLine: "Alfaro Labs Agents. AI agents for live production.",
  coreLine: "Give humans the best, and let the machines take care of the rest.",
  oneLiner:
    "I build AI agents that take the admin off your plate, so your people can focus on the work that matters. Built by someone who has worked live shows for close to 2 decades.",
  skipLink: "Skip to content",
  navLabel: "Main",
  email: "carlos@alfarolabs.com",
  igLabel: "@alfarolabs on Instagram",
  igDm: "DM AUDIT on Instagram.",
  bookCall: "Book a call",
  bookLong: "Book a free workflow audit.",
  placeholderPrefix: "Placeholder.",
  noteScreenshot: "Screenshot TBD.",
  notePhoto: "Photo of Carlos TBD.",
  noteBooking: "Booking link TBD.",
  navAgents: "Agents",
  navAbout: "About",
  eyebrow: "Alfaro Labs Agents",
  heroTitle: "AI agents for live production.",
  runLabel: "Agent run. Show confirmations.",
  runRead: "Read gig details from the email thread",
  runCrew: "Drafted crew confirmations",
  runSheet: "Drafted call sheet and load-in notes for the venue and rental house",
  runFlagged: "Flagged who has not replied",
  waiting: "Waiting for your approval",
  approveWord: "Approve",
  painHeading: "Sound familiar?",
  painGear: "Gear left at the shop.",
  painTwice: "A tech booked twice.",
  painRental: "A rental order nobody confirmed.",
  painOvertime: "Thousands lost to overtime.",
  painClient: "A client who didn't come back.",
  breaksHeading: "Where it breaks",
  breaksLead: "The information lives everywhere. Over texts, Slack, email and calls.",
  insideName: "Inside",
  insideBody: "Staff and crew.",
  outsideName: "Outside",
  outsideBody: "Clients, vendors, rental houses, venues, freelancers.",
  breaksClose:
    "Missed details become show-day mistakes. Agents gather it in one place and get the right details ready for the right people.",
  splitHeading: "What agents handle. What people keep.",
  splitIntro:
    "Carlos sets up AI agents that take the repetitive admin work off a live production business, so people can focus on clients, pricing, and the show.",
  splitTools:
    "Agents work in the tools teams already use: email, calendars, spreadsheets, and texts. No new software to learn, and no dependence on special integrations.",
  handleHeading: "Work agents handle",
  handleChase: "Chase crew confirmations across shows",
  handleGear: "Build and update the gear list from the email thread",
  handleCalendars: "Put call times and load-in on every calendar",
  handleChanges: "Flag last-minute changes to the right people",
  handleNotes: "Send venue, parking, and load-in notes",
  handleHours: "Log hours so overtime is clear before the invoice",
  keepHeading: "What people keep",
  keepClient: "Talking to the client and winning the next show",
  keepPrice: "Pricing the job and protecting the margin",
  keepCall: "Making the call when something breaks on site",
  approveHeading: "Approve first",
  approveBody: "Agents draft and prepare messages, and your team approves before anything goes out.",
  proofHeading: "Proof",
  proofLink: "See the proof log",
  aboutHeading: "About Carlos",
  career:
    "Carlos has worked as a live-show audio tech for close to 2 decades, with production companies big and small. He has lived the broken workflows firsthand.",
  aboutLink: "More about Carlos",
  auditBody: "Free workflow audit. 30 minutes. We look at how your team works today.",
  aboutMetaTitle: "About Carlos | Alfaro Labs",
  aboutMetaDescription:
    "Carlos has worked as a live-show audio tech for close to 2 decades. Testing agents since Claude Code first shipped.",
  testing:
    "Testing agents since Claude Code first shipped. Building them every day this year, for my own business first, then for yours.",
  proofLogHeading: "Agentify yourself. I did it first.",
  proofGig: "Gig-day briefing",
  proofGigDoes:
    "Checks calendars and booking emails nightly. Sends venue, room, call time and expectations one hour before call.",
  proofSub: "Subscription tracker",
  proofSubDoes:
    "Reads receipts and renewal emails daily. Alerts 7 days before a charge or when a new subscription appears. Never cancels anything.",
  proofSunday: "Sunday one-pager",
  proofSundayDoes: "The week's call times, load-ins, travel, and venue weather on one page.",
  proofPay: "Payment tracking",
  proofPayDoes: "Expected client payments land as all-day events on the calendar.",
  proofMentor: "Daily mentor nugget",
  proofMentorDoes: "A lesson from builders he follows, with one action.",
  proofScore: "Weekly pillar scorecard and AI edge briefing",
  proofPatch: "Patchlist and Gearmind",
  proofPatchDoes: "Built and shipped solo with a coding agent (Patch) using a PR review workflow.",
  proofSite: "This site",
  proofSiteDoes: "Built and run with agents.",
  agentsMetaTitle: "Agents | Alfaro Labs",
  busyHeading: "Busywork agents can take on",
  busyFollow: "Client follow-ups",
  busyQuotes: "Quotes",
  busyCrew: "Crew scheduling",
  busyVendor: "Vendor confirmations",
  busyInvoices: "Invoices",
  busyBooks: "Bookkeeping",
  busyTaxes: "Taxes",
  busyInsurance: "Insurance",
  busyPermits: "Permits",
  exampleHeading: "Worked example. Show confirmations.",
  beforeName: "Before",
  beforeBody: "Hours of chasing.",
  withName: "With an agent",
  withBody: "A quick review.",
  exampleBody:
    "The agent reads the gig details, drafts crew confirmations, call sheets and load-in details for the venue and rental house, and flags anyone who hasn't replied. Your team approves before anything is sent. It runs on the email, calendar, texts and spreadsheets you already use.",
  changesHeading: "What changes",
  changeTime: "Less wasted time.",
  changeVendors: "Vendors confirmed on time.",
  changeMargins: "Better margins.",
  changeClients: "Happier clients.",
  changeRuns: "Fewer last-minute shop runs.",
  changeDouble: "No double-booked techs.",
  chargeHeading: "You stay in charge",
  draftName: "Agent drafts",
  draftBody: "Quotes, client emails, crew texts, vendor confirmations.",
  teamName: "Your team approves",
  teamBody: "Nothing goes out without a click.",
  aloneName: "Low-risk tasks run alone",
  aloneBody: "Only after they've proven they get it right.",
  howHeading: "How it works",
  howSub: "Biggest leak first. We can fix everything.",
  stepOne: "1",
  stepTwo: "2",
  stepThree: "3",
  stepAudit: "Free workflow audit",
  stepAuditBody: "30 minutes. We look at how your team works today.",
  stepBuild: "Build",
  stepBuildBody: "Fixed scope. A focused fix takes 2 to 3 weeks.",
  stepRun: "Run and improve",
  stepRunBody: "Agent acceleration. The agent takes on more as it proves itself.",
  pilotName: "Pilot audit",
  pilotPrice: "$850",
  pilotBody: "A deeper look at the number one pain, with a written fix plan and price.",
  detailWeek:
    "The call walks one real week from job inquiry to quote, crew booking, gear prep, show day, and invoicing, then picks the one job costing the most.",
  detailProposal:
    'The proposal is one page, fixed price, with plain "what done looks like" tests. Example: "Crew confirmed 72h before every show without chasing."',
  detailMonthly: "An optional monthly plan to keep it running is offered at handoff.",
  faqHeading: "Questions",
  faqPeopleQ: "Will this replace my people?",
  faqPeopleA:
    "No. It takes the boring stuff off their plate: chasing emails, rebuilding pull sheets, texting crew. Your people stay in charge and focus on the show and the client.",
  faqMessQ: "What if the AI messes up?",
  faqMessA:
    "It starts with a human approving everything. The agent drafts, your team clicks approve. It only runs on its own for low-risk tasks once it has proven it gets them right, and Carlos keeps monitoring it.",
  faqCostQ: "What does it cost?",
  faqCostA: "It starts with a free 30-minute check. A deeper pilot audit is $850. Other pricing is shared after the call.",
  notFitHeading: "Not a fit",
  notFitBody: "Full ERP replacements, or anyone expecting AI to replace staff overnight.",
  customHeading: "Custom builds",
  customIntro:
    "The core offer is agents in the tools a team already uses. When a team outgrows that, custom software is the next step.",
  customRight: "Right-sized custom software",
  customRightBody:
    "Instead of picking between a spreadsheet and a bloated suite that does 50 things you don't need, get software with only the features you use.",
  customHost: "Hosted custom instances",
  customHostBody:
    "Your own deployment of an Alfaro Labs core product (for example crew scheduling), with only your features switched on, your branding, data import, and integrations.",
  customCare: "Care plans",
  customCareBody:
    "Hosting, monitoring, backups, updates, small changes, agent tuning, and a monthly check-in. Offered at handoff.",
  customCta: "Ask about custom builds",
  contactMetaTitle: "Book a call | Alfaro Labs",
  reachHeading: "Or reach Carlos directly",
  emailLabel: "Email",
  igReachLabel: "Instagram",
});

const placeholderLines = {
  screenshot: Line.mint(`${lines.placeholderPrefix.toText()} ${lines.noteScreenshot.toText()}`),
  photo: Line.mint(`${lines.placeholderPrefix.toText()} ${lines.notePhoto.toText()}`),
  link: Line.mint(`${lines.placeholderPrefix.toText()} ${lines.noteBooking.toText()}`),
} as const;

const footerTagline = Line.mint(`${lines.name.toText()}. ${lines.tagline.toText()}`);
const contactDescription = Line.mint(`${lines.bookLong.toText()} ${lines.stepAuditBody.toText()}`);

const seen = new Set<string>();
for (const line of owned) {
  const text = line.toText();
  if (seen.has(text)) throw new Error(`duplicate ledger line: ${text}`);
  seen.add(text);
}

const mail = ExternalHref.mint(`mailto:${lines.email.toText()}`);
const instagram = ExternalHref.mint("https://instagram.com/alfarolabs");

export type PlaceholderKind = keyof typeof placeholderLines;

export function emailHref(): string {
  return mail.toHref();
}

export function instagramHref(): string {
  return instagram.toHref();
}

const proofEntries = [
  { name: lines.proofGig, does: lines.proofGigDoes },
  { name: lines.proofSub, does: lines.proofSubDoes },
  { name: lines.proofSunday, does: lines.proofSundayDoes },
  { name: lines.proofPay, does: lines.proofPayDoes },
  { name: lines.proofMentor, does: lines.proofMentorDoes },
  { name: lines.proofScore },
  { name: lines.proofPatch, does: lines.proofPatchDoes },
  { name: lines.proofSite, does: lines.proofSiteDoes },
] as const;

export const published = {
  name: lines.name,
  skipLink: lines.skipLink,
  navLabel: lines.navLabel,
  email: lines.email,
  coreLine: lines.coreLine,
  footerTagline,
  instagram: {
    label: lines.igLabel,
    dm: lines.igDm,
  },
  booking: {
    label: lines.bookCall,
    longLabel: lines.bookLong,
  },
  nav: [
    { to: "/agents" as const, label: lines.navAgents },
    { to: "/about" as const, label: lines.navAbout },
    { to: "/contact" as const, label: lines.bookCall },
  ],
  placeholder: placeholderLines,
  home: {
    meta: { title: lines.serviceLine, description: lines.oneLiner },
    hero: {
      eyebrow: lines.eyebrow,
      title: lines.heroTitle,
      core: lines.coreLine,
      lede: lines.oneLiner,
    },
    run: {
      label: lines.runLabel,
      done: [lines.runRead, lines.runCrew, lines.runSheet, lines.runFlagged],
      waiting: lines.waiting,
      approve: lines.approveWord,
    },
    pain: {
      heading: lines.painHeading,
      items: [lines.painGear, lines.painTwice, lines.painRental, lines.painOvertime, lines.painClient],
    },
    breaks: {
      heading: lines.breaksHeading,
      lead: lines.breaksLead,
      sides: [
        { name: lines.insideName, body: lines.insideBody },
        { name: lines.outsideName, body: lines.outsideBody },
      ],
      close: lines.breaksClose,
    },
    split: {
      heading: lines.splitHeading,
      intro: lines.splitIntro,
      tools: lines.splitTools,
      handle: {
        heading: lines.handleHeading,
        items: [
          lines.handleChase,
          lines.handleGear,
          lines.handleCalendars,
          lines.handleChanges,
          lines.handleNotes,
          lines.handleHours,
        ],
      },
      keep: {
        heading: lines.keepHeading,
        items: [lines.keepClient, lines.keepPrice, lines.keepCall],
      },
    },
    approve: { heading: lines.approveHeading, body: lines.approveBody },
    proof: {
      heading: lines.proofHeading,
      entries: proofEntries.slice(0, 3),
      link: { to: "/about" as const, label: lines.proofLink },
    },
    about: {
      heading: lines.aboutHeading,
      body: lines.career,
      link: { to: "/about" as const, label: lines.aboutLink },
    },
    book: { heading: lines.bookLong, body: lines.auditBody },
  },
  about: {
    meta: { title: lines.aboutMetaTitle, description: lines.aboutMetaDescription },
    hero: {
      title: lines.aboutHeading,
      story: [lines.career, lines.testing],
    },
    proof: {
      heading: lines.proofLogHeading,
      entries: proofEntries,
    },
    book: { heading: lines.bookLong },
  },
  agents: {
    meta: { title: lines.agentsMetaTitle, description: lines.splitIntro },
    hero: {
      title: lines.eyebrow,
      sub: lines.heroTitle,
      body: [lines.splitIntro, lines.splitTools],
    },
    busywork: {
      heading: lines.busyHeading,
      items: [
        lines.busyFollow,
        lines.busyQuotes,
        lines.busyCrew,
        lines.busyVendor,
        lines.busyInvoices,
        lines.busyBooks,
        lines.busyTaxes,
        lines.busyInsurance,
        lines.busyPermits,
      ],
    },
    example: {
      heading: lines.exampleHeading,
      compare: [
        { name: lines.beforeName, body: lines.beforeBody },
        { name: lines.withName, body: lines.withBody },
      ],
      body: lines.exampleBody,
    },
    changes: {
      heading: lines.changesHeading,
      items: [
        lines.changeTime,
        lines.changeVendors,
        lines.changeMargins,
        lines.changeClients,
        lines.changeRuns,
        lines.changeDouble,
      ],
    },
    charge: {
      heading: lines.chargeHeading,
      items: [
        { name: lines.draftName, body: lines.draftBody },
        { name: lines.teamName, body: lines.teamBody },
        { name: lines.aloneName, body: lines.aloneBody },
      ],
    },
    how: {
      heading: lines.howHeading,
      sub: lines.howSub,
      steps: [
        { index: lines.stepOne, name: lines.stepAudit, body: lines.stepAuditBody },
        { index: lines.stepTwo, name: lines.stepBuild, body: lines.stepBuildBody },
        { index: lines.stepThree, name: lines.stepRun, body: lines.stepRunBody },
      ],
      pilot: { name: lines.pilotName, price: lines.pilotPrice, body: lines.pilotBody },
      detail: [lines.detailWeek, lines.detailProposal, lines.detailMonthly],
    },
    faq: {
      heading: lines.faqHeading,
      items: [
        { q: lines.faqPeopleQ, a: lines.faqPeopleA },
        { q: lines.faqMessQ, a: lines.faqMessA },
        { q: lines.faqCostQ, a: lines.faqCostA },
      ],
    },
    notFit: { heading: lines.notFitHeading, body: lines.notFitBody },
    book: { heading: lines.bookLong },
    custom: {
      heading: lines.customHeading,
      intro: lines.customIntro,
      items: [
        { name: lines.customRight, body: lines.customRightBody },
        { name: lines.customHost, body: lines.customHostBody },
        { name: lines.customCare, body: lines.customCareBody },
      ],
      cta: lines.customCta,
    },
  },
  contact: {
    meta: { title: lines.contactMetaTitle, description: contactDescription },
    hero: {
      eyebrow: lines.bookCall,
      title: lines.bookLong,
      body: lines.auditBody,
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
  pages: { [P in "/" | "/agents" | "/about" | "/contact"]: readonly string[] };
  everyPage: readonly string[];
  logos: ReadonlySet<LogoSrc>;
  oncePhrases: readonly ["Agentify yourself", "We can fix everything", "Agent acceleration"];
} {
  return {
    pages: {
      "/": [
        published.home.hero.title.toText(),
        published.home.hero.core.toText(),
        published.home.pain.heading.toText(),
        published.home.run.waiting.toText(),
        published.home.approve.body.toText(),
      ],
      "/agents": [
        published.agents.hero.title.toText(),
        published.agents.example.heading.toText(),
        published.agents.how.sub.toText(),
        published.agents.how.pilot.price.toText(),
        published.agents.notFit.heading.toText(),
        published.agents.custom.cta.toText(),
      ],
      "/about": [
        published.about.hero.story[0].toText(),
        published.about.hero.story[1].toText(),
        published.about.proof.heading.toText(),
        published.about.proof.entries[6].name.toText(),
        published.placeholder.screenshot.toText(),
      ],
      "/contact": [
        published.contact.hero.title.toText(),
        published.placeholder.link.toText(),
        published.email.toText(),
        published.instagram.label.toText(),
        published.instagram.dm.toText(),
      ],
    },
    everyPage: [published.footerTagline.toText(), published.booking.label.toText()],
    logos: new Set([logoSrc("icon"), logoSrc("wordmark")]),
    oncePhrases: ["Agentify yourself", "We can fix everything", "Agent acceleration"],
  };
}
