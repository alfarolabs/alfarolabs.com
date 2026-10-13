import { readFile } from "node:fs/promises";

const required = [
  "Alfaro Labs. We make useful things.",
  "Alfaro Labs Agents: AI agents for live production.",
  "mailto:carlos@alfarolabs.com",
  "Patchlist",
  "Gearmind",
  "Agentify yourself",
  "we can fix everything",
  "Agent acceleration",
  "Distribution",
  "close to 2 decades",
  "Testing agents since Claude Code first shipped.",
  "Building them every day this year.",
  "/brand/wordmark-white.svg",
  "/brand/icon-on-black.svg",
];
const absent = ["/brand/logo-wordmark.png", "/brand/logo-icon.png"];

const html = await readFile("dist/client/index.html", "utf8");
const missing = required.filter((line) => !html.includes(line));
const present = absent.filter((line) => html.includes(line));
if (missing.length > 0 || present.length > 0) {
  console.error("smoke failed");
  if (missing.length > 0) {
    console.error(`missing: ${missing.join(" | ")}`);
  }
  if (present.length > 0) {
    console.error(`still present: ${present.join(" | ")}`);
  }
  process.exit(1);
}

console.log("smoke ok dist/client/index.html");
for (const line of required) {
  console.log(`found: ${line}`);
}
