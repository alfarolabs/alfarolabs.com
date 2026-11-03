import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import { ownedLines, requiredLines } from "../src/content/index.ts";

const { pages, everyPage, logos, oncePhrases } = requiredLines();
const pageFiles = {
  "dist/client/index.html": "/",
  "dist/client/services.html": "/services",
  "dist/client/software.html": "/software",
  "dist/client/hardware.html": "/hardware",
  "dist/client/show.html": "/show",
};

const retiredBrandPaths = [
  "/brand/icon-on-black.svg",
  "/brand/icon-black.svg",
  "/brand/wordmark-white.svg",
  "/brand/wordmark-black.svg",
  "/brand/alfaro-labs-logo-white.svg",
  "/brand/alfaro-labs-logo-dark.svg",
  "/brand/alfaro-labs-icon-white.svg",
];

// Stock card icons, retired for plain type and Carlos's own images.
const retiredArtPaths = [
  "/art/offer-plan.svg",
  "/art/offer-workflow.svg",
  "/art/offer-software.svg",
  "/art/pillar-sound.svg",
  "/art/pillar-software.svg",
  "/art/pillar-console.svg",
];

const productLinks = {
  "/services": ["mailto:carlos@alfarolabs.com"],
  "/software": ["https://patchlist.app/", "https://gearmind.app/"],
  "/hardware": ["https://violetaudio.com/dmix-128", "mailto:carlos@alfarolabs.com"],
  "/show": ["https://www.youtube.com/@alfarolabs"],
};

const { values } = parseArgs({ options: { url: { type: "string" } } });
const origin = values.url ? new URL(values.url) : null;
if (origin && (
  !/^https?:$/.test(origin.protocol) || origin.username || origin.password ||
  origin.pathname !== "/" || origin.search || origin.hash
)) {
  throw new Error("--url must be an HTTP(S) origin without credentials, path, query, or fragment");
}

async function get(path) {
  const response = await fetch(new URL(path, origin), { redirect: "manual", signal: AbortSignal.timeout(10_000) });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response;
}

const hype = /\b(unlock|elevate|seamless|game-changer|revolutionize|supercharge|cutting-edge)\b/gi;
const owned = [...ownedLines()].sort((a, b) => b.length - a.length);

const entities = { amp: "&", lt: "<", gt: ">", quot: '"', nbsp: " " };
const decode = (text) =>
  text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (match, name) => entities[name] ?? match);

function readableText(html) {
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  const body = html
    .replace(/<head>[\s\S]*?<\/head>/, " ")
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ");
  return decode(`${title} ${description} ${body}`).replace(/\s+/g, " ");
}

const failures = [];
const found = [];
const phraseCounts = Object.fromEntries(oncePhrases.map((p) => [p, 0]));
const assets = new Set();
const siteCounts = { "meets live production": 0, "with AI agents": 0 };

for (const [file, route] of Object.entries(pageFiles)) {
  const required = pages[route];
  const response = origin ? await get(route) : null;
  const html = response ? await response.text() : await readFile(file, "utf8");
  const text = readableText(html);
  const fail = (why) => failures.push(`${file}: ${why}`);

  if (response && !response.headers.get("content-type")?.includes("text/html")) fail("not HTML");
  if (response && response.status !== 200) fail(`expected HTTP 200, got ${response.status}`);
  if (/Placeholder|\bTBD\b/.test(text)) fail("retired placeholder");
  if (/\bcommission\b|\bpricing\b|\$\d/i.test(text)) fail("commission or pricing copy");
  if (/\bfrontier\b|AI consulting|technology consulting|AI strategy/i.test(text)) fail("retired generic-AI framing");
  const nav = html.match(/<nav\b[^>]*>[\s\S]*?<\/nav>/)?.[0] ?? "";
  const navLinks = [...nav.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)]
    .map(([, href, label]) => [href, decode(label.replace(/<[^>]*>/g, "")).trim()]);
  const expectedNav = [["/services", "Services"], ["/software", "Software"], ["/hardware", "Hardware"], ["/show", "Show"]];
  if (JSON.stringify(navLinks) !== JSON.stringify(expectedNav)) fail("navigation labels, order, or destinations changed");
  if (route !== "/hardware" && /violet|dmix/i.test(html)) fail("Violet Audio outside the Hardware brand list");
  if (/saas/i.test(text)) fail('"SaaS" copy');
  if (/contact carlos/i.test(text)) fail('"Contact Carlos" copy');
  if (/(?:^|\s)(?:i|ii|iii|iv|I|II|III|IV)\.(?=\s)|(?:^|\s)(?:ii|iii|iv|II|III|IV)(?=\s)/.test(text)) fail("roman numeral");
  for (const [, heading] of html.matchAll(/<h[1-3]\b[^>]*>([\s\S]*?)<\/h[1-3]>/g)) {
    const words = decode(heading.replace(/<[^>]*>/g, "")).trim();
    if (words.endsWith(".")) fail(`headline ends with a period: "${words}"`);
  }
  if (retiredArtPaths.some((path) => html.includes(path))) fail("retired stock icon");
  const bodyText = readableText(html.replace(/<head>[\s\S]*?<\/head>/, ""));
  for (const line of owned.filter((l) => l.length > 30)) {
    if (bodyText.split(line).length > 2) fail(`repeated line "${line}"`);
  }
  for (const phrase of Object.keys(siteCounts)) siteCounts[phrase] += text.split(phrase).length - 1;
  if (route !== "/show" && !/<a\b[^>]*href="mailto:carlos@alfarolabs.com"[^>]*>Get in touch<\/a>/.test(html)) fail('missing "Get in touch" email button');
  if (route === "/") {
    if (!text.includes("I mix live shows and build the software I wish I had")) fail("missing first-person headline");
    if (!text.includes("where my work in technology meets live production.")) fail("missing technology-meets-live-production line");
  }
  if (route === "/services" && !text.includes("Alfaro Labs is my studio. I've spent close to two decades as a live-show audio tech, working with production companies big and small.")) fail("career line changed");
  if (route === "/hardware" && !text.includes("I'm an official dealer of the Violet Audio dMix 128 digital mixer")) fail("missing dealer statement");
  if (route === "/software") {
    for (const line of [
      "The production OS for live sound. Patch the show once, export the network preset, and send your crew a link. They don't need an account.",
      "Gearmind",
      "Crew scheduling and communication for live production. Schedulers build and staff shows, and crew confirm their calls from their phones.",
      "Verbo",
      "In development",
      "Live Spanish-to-English sermon translation, heard through earphones with captions on phones.",
      "I build and run my software and day-to-day work with AI agents.",
    ]) {
      if (!text.includes(line)) fail(`missing product copy "${line}"`);
    }
    if (!/srcset="\/art\/patchlist-project-home-dark\.webp" media="\(prefers-color-scheme: dark\)"/i.test(html) || !html.includes('src="/art/patchlist-project-home-light.webp"')) fail("missing light and dark Patchlist screenshots");
  }
  if (route === "/show") {
    const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/)?.[0] ?? "";
    const links = [...main.matchAll(/href="([^"]+)"/g)].map(([, href]) => href);
    if (JSON.stringify(links) !== JSON.stringify(["https://www.youtube.com/@alfarolabs"])) fail("Show must only link the YouTube channel");
    if (/<(?:video|audio|iframe)\b|podcast|rss/i.test(main)) fail("unconfirmed Show media or feed");
  }
  if (!html.includes('rel="icon" sizes="32x32" type="image/png" href="/brand/favicon-32.png"')) fail("missing 32px PNG favicon");
  if (!html.includes('rel="icon" type="image/svg+xml" href="/brand/favicon.svg"')) fail("missing adaptive SVG favicon");
  if (!html.includes('rel="apple-touch-icon" href="/brand/apple-touch-icon-180.png"')) fail("missing Apple touch icon");
  if (!html.includes('src="/brand/alfaro-labs-logo.svg"')) fail("missing original logo");
  if (/\/brand\/(?:icon-on-black|icon-black|wordmark-white|wordmark-black)\.svg/.test(html)) fail("retired slanted logo");
  for (const match of html.matchAll(/(?:src|srcset|href)="(\/[^"\s]+\.(?:js|css|svg|png|webp|woff2)(?:\?[^"\s]*)?)"/gi)) {
    if (!match[1].startsWith("//")) assets.add(match[1]);
  }
  for (const line of [...required, ...everyPage]) {
    if (text.includes(line)) found.push(`${file} ${line}`);
    else fail(`missing "${line}"`);
  }
  for (const dash of text.match(/[\u2013\u2014]/g) ?? []) {
    fail(`dash U+${dash.codePointAt(0).toString(16).toUpperCase()}`);
  }
  for (const word of text.match(hype) ?? []) fail(`hype word "${word}"`);
  for (const brand of text.match(/alfaro labs/gi) ?? []) {
    if (brand !== "Alfaro Labs") fail(`brand "${brand}"`);
  }
  if (/\p{Extended_Pictographic}/u.test(text)) fail("emoji");
  for (const href of productLinks[route] ?? []) {
    if (!html.includes(`href="${href}"`)) fail(`missing product link ${href}`);
  }
  for (const phrase of oncePhrases) {
    phraseCounts[phrase] += text.split(phrase).length - 1;
  }
  let uncovered = text;
  for (const line of owned) uncovered = uncovered.split(line).join(" ");
  uncovered = uncovered.replace(/\s+/g, " ").trim();
  if (uncovered) fail(`uncovered copy "${uncovered}"`);
  const brandSrcs = [...html.matchAll(/(?:src|srcset)="(\/brand\/[^"]+)"/gi)].map((m) => m[1]);
  if (brandSrcs.length === 0) fail("no logo");
  for (const src of brandSrcs) if (!logos.has(src)) fail(`logo "${src}"`);
}

for (const [phrase, count] of Object.entries(siteCounts)) {
  if (count !== 1) failures.push(`"${phrase}" appears ${count} times; say it once`);
}

for (const [phrase, count] of Object.entries(phraseCounts)) {
  if (count > 1) failures.push(`"${phrase}" appears ${count} times`);
}

for (const asset of [...assets].filter((path) => path.endsWith(".css"))) {
  const css = origin ? await (await get(asset)).text() : await readFile(`dist/client${asset}`, "utf8");
  if (/instrument[- ]serif|newsreader|jetbrains/i.test(css)) failures.push(`${asset}: retired font reference`);
  if (!/@media \(prefers-color-scheme: ?dark\)/.test(css)) failures.push(`${asset}: no dark theme`);
  if (/(?:upper|lower)-roman/.test(css)) failures.push(`${asset}: roman numeral counters`);
  for (const family of ["Geist Sans", "Geist Mono"]) {
    if (!css.includes(family)) failures.push(`${asset}: missing ${family}`);
  }
  for (const match of css.matchAll(/url\(["']?(\/[^\s"')]+)["']?\)/g)) {
    const path = match[1];
    if (/^\/art\/(sky|orbit|chart-paper|offer-star|offer-orbit|offer-solid)\.svg$/.test(path)) {
      failures.push(`${asset}: retired celestial artwork ${path}`);
    }
    assets.add(path);
  }
}

for (const path of [...retiredBrandPaths, ...retiredArtPaths]) {
  if (existsSync(`public${path}`)) failures.push(`${path}: retired file remains in public/`);
}

try {
  const response = origin ? await get("/favicon.ico") : null;
  if (response?.headers.get("content-type")?.includes("text/html")) failures.push("/favicon.ico: returned HTML");
  const ico = response ? Buffer.from(await response.arrayBuffer()) : await readFile("dist/client/favicon.ico");
  const sizes = ico.readUInt16LE(0) === 0 && ico.readUInt16LE(2) === 1
    ? Array.from({ length: ico.readUInt16LE(4) }, (_, i) => ico[6 + i * 16] || 256)
    : [];
  if (JSON.stringify(sizes) !== "[16,32,48]") failures.push(`/favicon.ico: expected ICO with 16, 32, 48 px, got ${JSON.stringify(sizes)}`);
} catch (error) {
  failures.push(`/favicon.ico: ${error.message}`);
}

if (origin) {
  const redirects = { "/agents": "/services", "/about": "/services", "/manifesto": "/services", "/contact": "/services", "/violet-audio": "/hardware" };
  for (const [from, to] of Object.entries(redirects)) {
    for (const path of [from, `${from}/`]) {
      const response = await fetch(new URL(path, origin), { redirect: "manual", signal: AbortSignal.timeout(10_000) });
      const location = response.headers.get("location");
      if (response.status !== 301 || !location || new URL(location, origin).pathname !== to) {
        failures.push(`${path}: expected 301 to ${to}, got ${response.status} to ${location}`);
      }
    }
  }
  for (const path of [...retiredBrandPaths, ...retiredArtPaths]) {
    const response = await fetch(new URL(path, origin), { redirect: "manual", signal: AbortSignal.timeout(10_000) });
    if (response.status !== 404) failures.push(`${path}: expected retired file 404, got ${response.status}`);
  }
  for (const asset of assets) {
    const response = await get(asset);
    if (response.headers.get("content-type")?.includes("text/html")) {
      failures.push(`${asset}: returned HTML instead of an asset`);
    }
    await response.arrayBuffer();
  }
  const missing = await fetch(new URL("/__smoke_missing_route__", origin), { signal: AbortSignal.timeout(10_000) });
  if (missing.status !== 404) failures.push(`missing route: expected 404, got ${missing.status}`);
}

const brandBytes = {
  "public/brand/alfaro-labs-icon.svg": "c6d8df9967d202fd0f79b0a27d9347045bea66259cac1f49c5c2d917398ee1b9",
  "public/brand/alfaro-labs-logo.svg": "d39e3ff5b54869838e1fd36ef61715ac64ac29a806a8fc975ba6445fd4bb1453",
  "public/brand/favicon.svg": "c6d8df9967d202fd0f79b0a27d9347045bea66259cac1f49c5c2d917398ee1b9",
  "public/brand/apple-touch-icon-180.png": "4dc65d70227e424a7e574ed3a4acaf5efbcb37e90b2b3721fffe86574d30b630",
  "public/brand/favicon-32.png": "e18a605ca6c2bd7addca5ed1f902813b2a74333c3655a73c08e1da0b76276daa",
  "public/favicon.ico": "baf96f7e106a59e9f87deeece932b689d6cca74d1dedbfe7566199275846c0ac",
};
for (const [file, sha256] of Object.entries(brandBytes)) {
  try {
    const bytes = origin ? Buffer.from(await (await get(file.replace("public", ""))).arrayBuffer()) : await readFile(file);
    const digest = createHash("sha256").update(bytes).digest("hex");
    if (digest !== sha256) failures.push(`${file}: sha256 ${digest}`);
  } catch {
    failures.push(`${file}: missing brand file`);
  }
}

if (failures.length > 0) {
  console.error("smoke failed");
  for (const failure of failures) console.error(failure);
  process.exit(1);
}

console.log(`smoke ok ${Object.keys(pageFiles).length} pages (${origin ? `HTTP 200, 10 permanent redirects, ${retiredBrandPaths.length + retiredArtPaths.length} retired file 404s, /favicon.ico 200, ${assets.size} assets, missing route 404` : "static HTML, favicon.ico"})`);
for (const line of found) console.log(`found: ${line}`);
