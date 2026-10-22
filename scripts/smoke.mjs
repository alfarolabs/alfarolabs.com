import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import { ownedLines, requiredLines } from "../src/content/index.ts";

const { pages, everyPage, logos, oncePhrases } = requiredLines();
const pageFiles = {
  "dist/client/index.html": "/",
  "dist/client/agents/index.html": "/agents",
  "dist/client/about/index.html": "/about",
  "dist/client/contact/index.html": "/contact",
};

const productLinks = {
  "/": ["https://patchlist.app/"],
  "/about": ["https://patchlist.app/"],
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
  const response = await fetch(new URL(path, origin), { signal: AbortSignal.timeout(10_000) });
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
  const path = file.replace("dist/client", "").replace(/index\.html$/, "");
  const response = origin ? await get(path) : null;
  const html = response ? await response.text() : await readFile(file, "utf8");
  const text = readableText(html);
  const fail = (why) => failures.push(`${file}: ${why}`);

  if (response && !response.headers.get("content-type")?.includes("text/html")) fail("not HTML");
  for (const match of html.matchAll(/(?:src|href)="(\/[^"\s]+\.(?:js|css|svg|woff2)(?:\?[^"\s]*)?)"/g)) {
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
  for (const amount of text.match(/\$\d[\d,]*(\.\d+)?/g) ?? []) {
    if (amount !== "$850") fail(`price "${amount}"`);
  }
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

if (origin) {
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
  "public/brand/icon-on-black.svg": "b8f437c6283861a49aa0efecb2dd51db8520b6d86ab3aa8a001457fea91eaa78",
  "public/brand/wordmark-white.svg": "da803916a5c7b1ad5fc713f23262f50b0093daa6962a9fe495a49ce42a1ba2b3",
  "public/brand/icon-black.svg": "5e7e20132e27b1c39669704ae17c99238824acc4cad4ecd8afe8c09ac6dc4473",
  "public/brand/wordmark-black.svg": "585dc19baab55e6a064cb1778231ad509e9146c32f2e0cf45972764eec408409",
};
for (const [file, sha256] of Object.entries(brandBytes)) {
  try {
    const digest = createHash("sha256").update(await readFile(file)).digest("hex");
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

console.log(`smoke ok ${Object.keys(pageFiles).length} pages (${origin ? `HTTP, ${assets.size} assets, missing route 404` : "static HTML"})`);
for (const line of found) console.log(`found: ${line}`);
