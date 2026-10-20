#!/usr/bin/env node
// Drive the alfarolabs.com preview in headless Chromium and record evidence.
//
//   drive.mjs <journey> [--url <origin>] [--out <dir>] [--headed]
//   drive.mjs --steps <file.json> [--url ...]   ad-hoc step list (same step shapes as below)
//   drive.mjs --list                             print journey names
//
// --url defaults to the URL written by launch.sh for this checkout.
// Evidence goes to /tmp/verify-alfarolabs/runs/<timestamp>-<journey>/ :
//   log.jsonl (every step with result), summary.json, NN-<name>.png, NN-<name>.aria.txt,
//   console.jsonl (browser console + page errors + failed requests).
// Exit code 0 only if every step passed.
//
// Playwright is not a project dependency. It is resolved from, in order:
//   $PLAYWRIGHT_MODULE (path to a playwright package dir),
//   `mise where npm:playwright`/node_modules/playwright (how ~/.local/bin/playwright installs it),
//   a plain `import("playwright")`.
// Set $VERIFY_CHROMIUM=/usr/bin/chromium to use the system browser instead of Playwright's cache.

import { execFileSync } from "node:child_process";
import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { emailHref, instagramHref, logoSrc, published, requiredLines } from "../../../../src/content/index.ts";

const ledger = requiredLines();
const text = (line) => line.toText();
const homeTitle = text(published.home.meta.title);
if (ledger.pages["/"][0] !== text(published.home.hero.title)) {
  throw new Error("home hero title is not the first required line");
}

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = execFileSync("git", ["-C", here, "rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();
const verifyRoot = process.env.VERIFY_ROOT ?? "/tmp/verify-alfarolabs";
const checkoutId = createHash("sha1").update(repoRoot).digest("hex").slice(0, 10);
const instanceEnv = join(verifyRoot, "state", checkoutId, "instance.env");

async function loadPlaywright() {
  const candidates = [];
  if (process.env.PLAYWRIGHT_MODULE) candidates.push(process.env.PLAYWRIGHT_MODULE);
  try {
    const where = execFileSync("mise", ["where", "npm:playwright"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    candidates.push(join(where, "node_modules", "playwright"));
  } catch {}
  for (const dir of candidates) {
    const entry = join(dir, "index.mjs");
    if (existsSync(entry)) return { pw: await import(pathToFileURL(entry).href), from: dir };
  }
  try {
    return { pw: await import("playwright"), from: "playwright (node resolution)" };
  } catch {
    throw new Error("playwright not found: run `playwright --version` once (installs via mise) or set PLAYWRIGHT_MODULE");
  }
}

// ---- journeys: one per feature file in ../features -------------------------
// Locator spec: { within?: "header"|"nav"|"main"|"footer"|<css>, role, name, exact?, nth? } or { css, nth? }.
const NAV = "nav";
const journeys = {
  home: [
    { do: "goto", path: "/" },
    { do: "expectTitle", text: homeTitle },
    { do: "expectVisible", target: { role: "heading", level: 1, name: ledger.pages["/"][0] } },
    { do: "expectCount", target: { css: ".run .run-step[data-state=done]" }, count: 4 },
    { do: "expectText", target: { css: ".run .run-label" }, text: text(published.home.run.label) },
    { do: "expectText", target: { css: ".run-step[data-state=waiting]" }, text: text(published.home.run.waiting) },
    { do: "expectText", target: { css: ".run-step[data-state=waiting] .run-approve" }, text: text(published.home.run.approve) },
    { do: "expectAttr", target: { css: ".run-approve" }, attr: "aria-hidden", value: "true" },
    { do: "shot", name: "home-hero", target: { css: ".hero" } },
    { do: "aria", name: "home-hero", target: { css: ".hero" } },
    { do: "expectVisible", target: { role: "heading", level: 2, name: text(published.home.approve.heading) } },
    { do: "expectVisible", target: { role: "heading", level: 2, name: text(published.home.pain.heading) } },
    { do: "mark" },
    { do: "click", target: { within: "main", role: "link", name: text(published.home.proof.link.label) } },
    { do: "expectUrl", path: "/about/" },
    { do: "expectVisible", target: { role: "heading", level: 1, name: text(published.about.hero.title) } },
    { do: "expectMark", note: "proof link navigated client-side" },
    { do: "goto", path: "/" },
    { do: "click", target: { css: ".hero-copy a.button" } },
    { do: "expectUrl", path: "/contact/" },
    { do: "expectVisible", target: { role: "heading", level: 1, name: text(published.booking.longLabel) } },
    { do: "shot", name: "home-booking-landed" },
  ],
  agents: [
    { do: "goto", path: "/" },
    { do: "mark" },
    { do: "click", target: { within: NAV, role: "link", name: text(published.nav[0].label) } },
    { do: "expectUrl", path: "/agents/" },
    { do: "expectMark", note: "header nav navigated client-side" },
    { do: "expectTitle", text: text(published.agents.meta.title) },
    { do: "expectVisible", target: { role: "heading", level: 1, name: text(published.agents.hero.title) } },
    { do: "expectText", target: { css: ".pilot .price" }, text: text(published.agents.how.pilot.price) },
    { do: "expectText", target: { css: ".pilot h3" }, text: text(published.agents.how.pilot.name) },
    { do: "expectVisible", target: { role: "heading", level: 3, name: text(published.agents.faq.items[0].q) } },
    { do: "expectVisible", target: { role: "heading", level: 3, name: text(published.agents.faq.items[1].q) } },
    { do: "expectVisible", target: { role: "heading", level: 3, name: text(published.agents.faq.items[2].q) } },
    { do: "expectVisible", target: { role: "heading", level: 2, name: text(published.agents.notFit.heading) } },
    { do: "shot", name: "agents-pricing", target: { css: ".pilot" } },
    { do: "shot", name: "agents-full", fullPage: true },
    { do: "aria", name: "agents-main", target: { css: "main" } },
    { do: "click", target: { within: "main", role: "link", name: text(published.agents.custom.cta) } },
    { do: "expectUrl", path: "/contact/" },
    { do: "expectVisible", target: { role: "heading", level: 1, name: text(published.booking.longLabel) } },
  ],
  about: [
    { do: "goto", path: "/" },
    { do: "click", target: { within: NAV, role: "link", name: text(published.nav[1].label) } },
    { do: "expectUrl", path: "/about/" },
    { do: "expectTitle", text: text(published.about.meta.title) },
    { do: "expectVisible", target: { role: "heading", level: 1, name: text(published.about.hero.title) } },
    { do: "expectVisible", target: { role: "heading", level: 2, name: text(published.about.proof.heading) } },
    { do: "expectCount", target: { css: ".cell.proof" }, count: 8 },
    { do: "expectCount", target: { css: ".placeholder[data-kind=screenshot]" }, count: 8 },
    { do: "expectText", target: { css: ".placeholder[data-kind=photo]" }, text: text(published.placeholder.photo) },
    { do: "expectVisible", target: { role: "heading", level: 3, name: text(published.about.proof.entries[6].name) } },
    { do: "shot", name: "about-full", fullPage: true },
    { do: "aria", name: "about-main", target: { css: "main" } },
    { do: "click", target: { within: "main", role: "link", name: text(published.booking.label) } },
    { do: "expectUrl", path: "/contact/" },
  ],
  contact: [
    { do: "goto", path: "/" },
    { do: "mark" },
    { do: "click", target: { within: "main", role: "link", name: text(published.booking.label), nth: 0 } },
    { do: "expectUrl", path: "/contact/" },
    { do: "expectMark", note: "hero Book a call navigated client-side" },
    { do: "expectTitle", text: text(published.contact.meta.title) },
    { do: "expectVisible", target: { role: "heading", level: 1, name: text(published.booking.longLabel) } },
    { do: "expectText", target: { css: ".hero .eyebrow" }, text: text(published.booking.label) },
    { do: "expectText", target: { css: ".hero .placeholder[data-kind=link]" }, text: text(published.placeholder.link) },
    { do: "expectAttr", target: { within: "main", role: "link", name: text(published.email) }, attr: "href", value: emailHref() },
    { do: "expectAttr", target: { within: "main", role: "link", name: text(published.instagram.label) }, attr: "href", value: instagramHref() },
    { do: "expectText", target: { css: "main" }, text: text(published.instagram.dm) },
    { do: "shot", name: "contact" , fullPage: true },
    { do: "aria", name: "contact-main", target: { css: "main" } },
    { do: "goto", path: "/agents/" },
    { do: "click", target: { within: NAV, role: "link", name: text(published.booking.label) } },
    { do: "expectUrl", path: "/contact/" },
  ],
  nav: [
    { do: "goto", path: "/" },
    { do: "aria", name: "header", target: { css: ".site-header" } },
    { do: "expectCount", target: { within: NAV, role: "link" }, count: 3 },
    { do: "mark" },
    { do: "click", target: { within: NAV, role: "link", name: text(published.nav[0].label) } },
    { do: "expectUrl", path: "/agents/" },
    { do: "click", target: { within: NAV, role: "link", name: text(published.nav[1].label) } },
    { do: "expectUrl", path: "/about/" },
    { do: "click", target: { within: NAV, role: "link", name: text(published.booking.label) } },
    { do: "expectUrl", path: "/contact/" },
    { do: "click", target: { within: "header", role: "link", name: text(published.name) } },
    { do: "expectUrl", path: "/" },
    { do: "expectMark", note: "full header loop stayed client-side" },
    { do: "goto", path: "/" },
    { do: "press", key: "Tab" },
    { do: "expectFocused", target: { role: "link", name: text(published.skipLink) } },
    { do: "shot", name: "skip-link-focused", target: { css: ".site-header" } },
    { do: "expectText", target: { css: "footer .footer-tagline" }, text: ledger.everyPage[0] },
    { do: "expectAttr", target: { within: "footer", role: "link", name: text(published.email) }, attr: "href", value: emailHref() },
    { do: "expectAttr", target: { within: "footer", role: "img", name: text(published.name) }, attr: "src", value: logoSrc("wordmark") },
    { do: "shot", name: "footer", target: { css: "footer" } },
    { do: "goto", path: "/__verify_missing_route__", status: 404 },
    { do: "expectText", target: { css: "main" }, text: "Not Found" },
    { do: "expectVisible", target: { within: NAV, role: "link", name: text(published.nav[0].label) } },
    { do: "shot", name: "not-found", fullPage: true },
    { do: "aria", name: "not-found", target: { css: "body" } },
  ],
};

// ---- runner ----------------------------------------------------------------
const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    url: { type: "string" },
    out: { type: "string" },
    steps: { type: "string" },
    headed: { type: "boolean" },
    list: { type: "boolean" },
  },
});
if (values.list) {
  for (const name of Object.keys(journeys)) console.log(name);
  process.exit(0);
}
const journeyName = values.steps ? "steps" : positionals[0];
const steps = values.steps ? JSON.parse(readFileSync(values.steps, "utf8")) : journeys[journeyName];
if (!steps) {
  console.error(`unknown journey "${journeyName}". Journeys: ${Object.keys(journeys).join(", ")}`);
  process.exit(2);
}

let origin = values.url;
if (!origin && existsSync(instanceEnv)) {
  origin = readFileSync(instanceEnv, "utf8").match(/^URL=(.*)$/m)?.[1];
}
if (!origin) {
  console.error(`no --url and no launched instance (${instanceEnv}); run launch.sh first`);
  process.exit(2);
}

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const outDir = resolve(values.out ?? join(verifyRoot, "runs", `${stamp}-${journeyName}`));
mkdirSync(outDir, { recursive: true });
const logFile = join(outDir, "log.jsonl");
const consoleFile = join(outDir, "console.jsonl");
const log = (entry) => appendFileSync(logFile, JSON.stringify({ t: new Date().toISOString(), ...entry }) + "\n");
const logConsole = (entry) => appendFileSync(consoleFile, JSON.stringify({ t: new Date().toISOString(), ...entry }) + "\n");

// Pick a Chromium binary. Playwright's own build is preferred; when the cache holds an
// older build than this Playwright expects (seen: 1.64.1 wants 1248, cache has 1243),
// fall back to the newest cached headless shell, then the system Chromium.
function pickExecutable(pw) {
  if (process.env.VERIFY_CHROMIUM) return process.env.VERIFY_CHROMIUM;
  if (existsSync(pw.chromium.executablePath())) return undefined;
  const cache = process.env.PLAYWRIGHT_BROWSERS_PATH ?? join(process.env.HOME, ".cache", "ms-playwright");
  const shells = existsSync(cache)
    ? readdirSync(cache).filter((d) => d.startsWith("chromium_headless_shell-")).sort((a, b) => Number(b.split("-")[1]) - Number(a.split("-")[1]))
    : [];
  for (const d of shells) {
    const bin = join(cache, d, "chrome-headless-shell-linux64", "chrome-headless-shell");
    if (existsSync(bin)) return bin;
  }
  if (existsSync("/usr/bin/chromium")) return "/usr/bin/chromium";
  throw new Error(`no Chromium: ${pw.chromium.executablePath()} missing; run \`playwright install chromium-headless-shell\` or set VERIFY_CHROMIUM`);
}

const { pw, from } = await loadPlaywright();
const executablePath = pickExecutable(pw);
const browser = await pw.chromium.launch({ headless: !values.headed, ...(executablePath ? { executablePath } : {}) });
const viewport = { width: 1440, height: 900 };
const context = await browser.newContext({ viewport });
const page = await context.newPage();
page.setDefaultTimeout(8000);
const pageErrors = [];
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") logConsole({ kind: "console", type: m.type(), text: m.text() }); });
page.on("pageerror", (e) => { pageErrors.push(String(e)); logConsole({ kind: "pageerror", text: String(e) }); });
page.on("requestfailed", (r) => logConsole({ kind: "requestfailed", url: r.url(), error: r.failure()?.errorText }));
page.on("response", (r) => { if (r.status() >= 400 && !r.url().includes("__verify_missing")) logConsole({ kind: "http", status: r.status(), url: r.url() }); });

const scopes = { header: ".site-header", nav: "nav[aria-label='Main']", main: "main", footer: "footer" };
function locate(t) {
  let root = page;
  if (t.within) root = page.locator(scopes[t.within] ?? t.within);
  let loc = t.css
    ? root.locator(t.css)
    : root.getByRole(t.role, { ...(t.name ? { name: t.name, exact: t.exact ?? true } : {}), ...(t.level ? { level: t.level } : {}) });
  if (t.nth !== undefined) loc = loc.nth(t.nth);
  return loc;
}
const describe = (t) => (t ? (t.css ? `${t.within ? t.within + " " : ""}${t.css}` : `${t.within ? t.within + " " : ""}${t.role}${t.level ? `[h${t.level}]` : ""} "${t.name ?? ""}"`) : "page");
let shotIndex = 0;
const artifact = (name, ext) => join(outDir, `${String(++shotIndex).padStart(2, "0")}-${name}.${ext}`);
// Client-side nav lands on /agents; a hard load 307s to /agents/. Treat both as the same route.
const norm = (p) => (p.length > 1 ? p.replace(/\/+$/, "") : p);
const pathOf = () => new URL(page.url()).pathname;
const assert = (cond, msg) => { if (!cond) throw new Error(msg); };

const actions = {
  async goto(s) {
    const res = await page.goto(new URL(s.path, origin).href, { waitUntil: "networkidle" });
    const status = res?.status();
    assert(status === (s.status ?? 200), `GET ${s.path}: expected HTTP ${s.status ?? 200}, got ${status}`);
    return `HTTP ${status} at ${pathOf()}`;
  },
  async click(s) {
    const loc = locate(s.target);
    assert((await loc.count()) >= 1, `no element for ${describe(s.target)}`);
    const target = (await loc.count()) > 1 && s.target.nth === undefined ? loc.first() : loc;
    const href = await target.getAttribute("href");
    await target.click();
    await page.waitForLoadState("networkidle");
    return `clicked ${describe(s.target)} (href=${href}) -> ${pathOf()}`;
  },
  async press(s) { await page.keyboard.press(s.key); return `pressed ${s.key}`; },
  async expectUrl(s) {
    await page.waitForURL((u) => norm(u.pathname) === norm(s.path), { timeout: 5000 }).catch(() => {});
    assert(norm(pathOf()) === norm(s.path), `expected path ${s.path}, at ${pathOf()}`);
    return pathOf();
  },
  async expectTitle(s) {
    // The router updates <title> a beat after client-side navigation; poll instead of reading once.
    await page.waitForFunction((t) => document.title === t, s.text, { timeout: 5000 }).catch(() => {});
    const title = await page.title();
    assert(title === s.text, `title "${title}" != "${s.text}"`);
    return title;
  },
  async expectVisible(s) { await locate(s.target).first().waitFor({ state: "visible" }); return `visible ${describe(s.target)}`; },
  async expectCount(s) {
    const n = await locate(s.target).count();
    assert(n === s.count, `${describe(s.target)}: expected ${s.count}, found ${n}`);
    return `${n} x ${describe(s.target)}`;
  },
  async expectText(s) {
    const loc = locate(s.target).first();
    await loc.waitFor({ state: "attached" });
    // textContent, not innerText: CSS text-transform (e.g. the uppercase .run-label) must not affect copy checks.
    const text = (await loc.textContent()).replace(/\s+/g, " ").trim();
    assert(text.includes(s.text), `${describe(s.target)} text "${text.slice(0, 120)}" lacks "${s.text}"`);
    return `"${s.text}" in ${describe(s.target)}`;
  },
  async expectAttr(s) {
    const v = await locate(s.target).first().getAttribute(s.attr);
    assert(v === s.value, `${describe(s.target)} ${s.attr}="${v}" != "${s.value}"`);
    return `${s.attr}="${v}"`;
  },
  async expectFocused(s) {
    const focused = await locate(s.target).first().evaluate((el) => el === document.activeElement);
    assert(focused, `${describe(s.target)} is not focused`);
    return `focused ${describe(s.target)}`;
  },
  // mark/expectMark prove a click was client-side router navigation (no full reload).
  async mark() { await page.evaluate(() => { window.__verifyMark = "set"; }); return "window marker set"; },
  async expectMark(s) {
    const v = await page.evaluate(() => window.__verifyMark);
    assert(v === "set", `window marker lost: full page reload happened (${s.note ?? ""})`);
    return s.note ?? "marker kept";
  },
  async shot(s) {
    const file = artifact(s.name, "png");
    if (s.target) await locate(s.target).first().screenshot({ path: file });
    else await page.screenshot({ path: file, fullPage: !!s.fullPage });
    return file;
  },
  async aria(s) {
    const file = artifact(s.name, "aria.txt");
    writeFileSync(file, await locate(s.target ?? { css: "body" }).first().ariaSnapshot());
    return file;
  },
};

await page.goto(new URL("/", origin).href, { waitUntil: "networkidle" });
const column = await page.evaluate(() => ({
  frame: Math.round(document.querySelector(".frame").getBoundingClientRect().width),
  main: Math.round(document.querySelector("main").getBoundingClientRect().width),
}));
log({
  event: "start",
  journey: journeyName,
  origin,
  outDir,
  viewport,
  column,
  playwright: from,
  executable: executablePath ?? pw.chromium.executablePath(),
  browser: browser.version(),
});
console.log(`drive: ${journeyName} against ${origin}\ndrive: evidence -> ${outDir}`);
let failed = null;
const results = [];
for (const [i, step] of steps.entries()) {
  const fn = actions[step.do];
  try {
    if (!fn) throw new Error(`unknown action "${step.do}"`);
    const detail = await fn(step);
    results.push({ i, ...step, ok: true, detail });
    log({ i, step, ok: true, detail, url: page.url() });
    console.log(`  ok   ${String(i).padStart(2)} ${step.do} ${detail}`);
  } catch (err) {
    failed = { i, step, error: err.message.split("\n")[0] };
    log({ i, step, ok: false, error: failed.error, url: page.url() });
    console.log(`  FAIL ${String(i).padStart(2)} ${step.do} ${failed.error}`);
    await page.screenshot({ path: artifact("failure", "png"), fullPage: true }).catch(() => {});
    break;
  }
}
if (!failed && pageErrors.length) failed = { error: `page errors: ${pageErrors.join(" | ")}` };
const summary = { journey: journeyName, origin, ok: !failed, passed: results.length, total: steps.length, failed, viewport, column, outDir, finishedAt: new Date().toISOString() };
writeFileSync(join(outDir, "summary.json"), JSON.stringify(summary, null, 2));
await browser.close();
console.log(`drive: ${summary.ok ? "PASS" : "FAIL"} ${summary.passed}/${summary.total} steps; summary ${join(outDir, "summary.json")}`);
process.exit(summary.ok ? 0 : 1);
