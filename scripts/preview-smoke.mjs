// Serves the built Worker with `vite preview` (workerd) on a free local port and
// runs the HTTP smoke against it. Requires `npm run build` first.
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";

const probe = createServer().listen(0, "127.0.0.1");
await once(probe, "listening");
const { port } = probe.address();
probe.close();
const origin = `http://127.0.0.1:${port}`;

// Own process group so workerd children stop with the preview.
const preview = spawn(
  process.execPath,
  ["node_modules/vite/bin/vite.js", "preview", "--host", "127.0.0.1", "--port", String(port), "--strictPort"],
  { detached: true, stdio: ["ignore", "inherit", "inherit"] },
);
let exited = false;
preview.on("exit", () => { exited = true; });
const stop = () => { if (!exited) process.kill(-preview.pid, "SIGTERM"); };

let code = 1;
try {
  const deadline = Date.now() + 30_000;
  for (;;) {
    if (exited) throw new Error("vite preview exited before serving");
    if (Date.now() > deadline) throw new Error(`vite preview did not serve ${origin}/ within 30s`);
    const ok = await fetch(`${origin}/`, { signal: AbortSignal.timeout(2_000) }).then((r) => r.ok, () => false);
    if (ok) break;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  const smoke = spawn(process.execPath, ["scripts/smoke.mjs", "--url", origin], { stdio: "inherit" });
  [code] = await once(smoke, "exit");
} catch (error) {
  console.error(`preview smoke failed: ${error.message}`);
} finally {
  stop();
}
process.exit(code ?? 1);
