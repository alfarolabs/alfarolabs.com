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
];

const html = await readFile("dist/client/index.html", "utf8");
const missing = required.filter((line) => !html.includes(line));
if (missing.length > 0) {
  console.error("smoke failed");
  console.error(`missing: ${missing.join(" | ")}`);
  process.exit(1);
}

console.log("smoke ok dist/client/index.html");
for (const line of required) {
  console.log(`found: ${line}`);
}
