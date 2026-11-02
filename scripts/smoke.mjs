import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import { ownedLines, requiredLines } from "../src/content/index.ts";

const { pages, everyPage, logos, oncePhrases } = requiredLines();
const pageFiles = {
  "dist/client/index.html": "/",
  "dist/client/services.html": "/services",
  "dist/client/software.html": "/software",
  "dist/client/violet-audio.html": "/violet-audio",
  "dist/client/show.html": "/show",
  "dist/client/contact.html": "/contact",
};

const productLinks = {
  "/software": ["https://patchlist.app/"],
  "/violet-audio": ["https://violetaudio.com/dmix-128", "/contact"],
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

for (const [file, route] of Object.entries(pageFiles)) {
  const required = pages[route];
  const response = origin ? await get(route) : null;
  const html = response ? await response.text() : await readFile(file, "utf8");
  const text = readableText(html);
  const fail = (why) => failures.push(`${file}: ${why}`);

  if (response && !response.headers.get("content-type")?.includes("text/html")) fail("not HTML");
  if (response && response.status !== 200) fail(`expected HTTP 200, got ${response.status}`);
  if (/Placeholder|\bTBD\b|Gearmind/.test(text)) fail("retired placeholder or hidden product");
  if (/\bcommission\b|\bpricing\b|\$\d/i.test(text)) fail("commission or pricing copy");
  const nav = html.match(/<nav\b[^>]*>[\s\S]*?<\/nav>/)?.[0] ?? "";
  const navLinks = [...nav.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)]
    .map(([, href, label]) => [href, decode(label.replace(/<[^>]*>/g, "")).trim()]);
  const expectedNav = [["/services", "Services"], ["/software", "Software"], ["/violet-audio", "Violet Audio"], ["/show", "Show"]];
  if (JSON.stringify(navLinks) !== JSON.stringify(expectedNav)) fail("navigation labels, order, or destinations changed");
  if (!text.includes("Alfaro Labs. Technology consulting for AI, agents, and custom software.")) fail("tagline changed");
  if (route === "/services" && !text.includes("live sound consultant and technician, with close to two decades working live shows")) fail("missing live sound experience");
  if (route === "/violet-audio" && !text.includes("official dealer of the Violet Audio dMix 128 console")) fail("missing dealer statement");
  if (route === "/software") {
    for (const line of ["Verbo", "In development", "Live Spanish-to-English sermon translation, heard through earphones with captions on phones."]) {
      if (!text.includes(line)) fail(`missing product copy "${line}"`);
    }
  }
  if (!html.includes('rel="icon" sizes="32x32" type="image/png" href="/brand/favicon-32.png"')) fail("missing 32px PNG favicon");
  if (!html.includes('rel="icon" type="image/svg+xml" href="/brand/favicon.svg"')) fail("missing adaptive SVG favicon");
  if (!html.includes('rel="apple-touch-icon" href="/brand/apple-touch-icon-180.png"')) fail("missing Apple touch icon");
  if (!html.includes('src="/brand/alfaro-labs-logo-white.svg"')) fail("missing original vector wordmark");
  if (/\/brand\/(?:icon-on-black|icon-black|wordmark-white|wordmark-black)\.svg/.test(html)) fail("retired slanted logo");
  for (const match of html.matchAll(/(?:src|href)="(\/[^"\s]+\.(?:js|css|svg|png|woff2)(?:\?[^"\s]*)?)"/g)) {
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
  const brandSrcs = [...html.matchAll(/src="(\/brand\/[^"]+)"/g)].map((m) => m[1]);
  if (brandSrcs.length === 0) fail("no logo");
  for (const src of brandSrcs) if (!logos.has(src)) fail(`logo "${src}"`);
}

for (const [phrase, count] of Object.entries(phraseCounts)) {
  if (count > 1) failures.push(`"${phrase}" appears ${count} times`);
}

for (const asset of [...assets].filter((path) => path.endsWith(".css"))) {
  const css = origin ? await (await get(asset)).text() : await readFile(`dist/client${asset}`, "utf8");
  if (/instrument[- ]serif|newsreader|jetbrains/i.test(css)) failures.push(`${asset}: retired font reference`);
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

if (origin) {
  for (const path of ["/agents", "/about", "/manifesto", "/agents/", "/about/", "/manifesto/"]) {
    const response = await fetch(new URL(path, origin), { redirect: "manual", signal: AbortSignal.timeout(10_000) });
    const location = response.headers.get("location");
    if (response.status !== 301 || !location || new URL(location, origin).pathname !== "/services") {
      failures.push(`${path}: expected 301 to /services, got ${response.status} to ${location}`);
    }
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
  "public/brand/alfaro-labs-icon-white.svg": "8ab88a385fd4928ac0793173121be6aa2811879ecde9f8466eb60fe6786c0396",
  "public/brand/alfaro-labs-icon.svg": "c6d8df9967d202fd0f79b0a27d9347045bea66259cac1f49c5c2d917398ee1b9",
  "public/brand/alfaro-labs-logo-white.svg": "126f8b289c4cbc4f85a717b6ee3e97e41fb756bf2f466838bfbe2a8f44e5a7b0",
  "public/brand/alfaro-labs-logo.svg": "d39e3ff5b54869838e1fd36ef61715ac64ac29a806a8fc975ba6445fd4bb1453",
  "public/brand/favicon.svg": "e8a1d1186fa8cb2c19f83edff9e0571bc61460ca99739516c93beadf75f6b91f",
  "public/brand/apple-touch-icon-180.png": "8c3f4b158c70723895a3f089dfae779f0cff73c994218153752b42ff81061508",
  "public/brand/favicon-32.png": "e18a605ca6c2bd7addca5ed1f902813b2a74333c3655a73c08e1da0b76276daa",
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

console.log(`smoke ok ${Object.keys(pageFiles).length} pages (${origin ? `HTTP 200, 6 permanent redirects, ${assets.size} assets, missing route 404` : "static HTML"})`);
for (const line of found) console.log(`found: ${line}`);
