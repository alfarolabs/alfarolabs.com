import { readFile } from "node:fs/promises";

const pages = {
  "dist/client/index.html": [
    "AI agents for live production.",
    "Give humans the best, and let the machines take care of the rest.",
    "Sound familiar?",
    "Waiting for your approval",
    "your team approves before anything goes out.",
  ],
  "dist/client/agents/index.html": [
    "Alfaro Labs Agents",
    "Show confirmations.",
    "Biggest leak first. We can fix everything.",
    "$850",
    "Not a fit",
    "Ask about custom builds",
  ],
  "dist/client/about/index.html": [
    "close to 2 decades",
    "Testing agents since Claude Code first shipped.",
    "Agentify yourself. I did it first.",
    "Patchlist and Gearmind",
    "Placeholder. Screenshot TBD.",
  ],
  "dist/client/contact/index.html": [
    "Book a free workflow audit.",
    "Placeholder. Booking link TBD.",
    "carlos@alfarolabs.com",
    "@alfarolabs on Instagram",
    "DM AUDIT",
  ],
};
const everyPage = ["Alfaro Labs. We make useful things.", "Book a call"];
const logos = new Set(["/brand/icon-on-black.svg", "/brand/wordmark-white.svg"]);
const hype = /\b(unlock|elevate|seamless|game-changer|revolutionize|supercharge|cutting-edge)\b/gi;
const oncePhrases = ["Agentify yourself", "We can fix everything", "Agent acceleration"];

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

for (const [file, required] of Object.entries(pages)) {
  const html = await readFile(file, "utf8");
  const text = readableText(html);
  const fail = (why) => failures.push(`${file}: ${why}`);

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
  for (const phrase of oncePhrases) {
    phraseCounts[phrase] += text.split(phrase).length - 1;
  }
  const brandSrcs = [...html.matchAll(/src="(\/brand\/[^"]+)"/g)].map((m) => m[1]);
  if (brandSrcs.length === 0) fail("no logo");
  for (const src of brandSrcs) if (!logos.has(src)) fail(`logo "${src}"`);
}

for (const [phrase, count] of Object.entries(phraseCounts)) {
  if (count > 1) failures.push(`"${phrase}" appears ${count} times`);
}

if (failures.length > 0) {
  console.error("smoke failed");
  for (const failure of failures) console.error(failure);
  process.exit(1);
}

console.log(`smoke ok ${Object.keys(pages).length} pages`);
for (const line of found) console.log(`found: ${line}`);
