#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const ROOT = resolve(args.find((a) => !a.startsWith("--")) ?? ".");
const holes = [];

function has(p) { return existsSync(join(ROOT, p)); }
function read(p) { try { return readFileSync(join(ROOT, p), "utf8"); } catch { return ""; } }

if (has("package.json")) {
  try {
    const pkg = JSON.parse(read("package.json"));
    const scripts = pkg.scripts ?? {};
    if (!scripts.test) holes.push({ kind: "test", why: "package.json has no test script" });
    else if (/^echo\b/.test(String(scripts.test))) holes.push({ kind: "test", why: "test script is an echo stub" });
    if (!scripts.build && !scripts["typecheck"] && !scripts.lint) {
      holes.push({ kind: "build", why: "no build, typecheck, or lint script" });
    }
  } catch {
    holes.push({ kind: "package", why: "package.json is not valid JSON" });
  }
}

const ci = [
  ".github/workflows",
  ".gitlab-ci.yml",
  "Jenkinsfile",
  ".circleci/config.yml",
].some((p) => has(p));
if (!ci) holes.push({ kind: "ci", why: "no CI config found" });

if (jsonMode) process.stdout.write(JSON.stringify({ holes }, null, 2) + "\n");
else {
  console.log("## Merge receipts (structural)");
  console.log(`- Status: ${holes.length ? "HOLES" : "OK"}`);
  for (const h of holes) console.log(`- [${h.kind}] ${h.why}`);
  if (!holes.length) console.log("- No structural holes. Still run test + build on this change.");
}
process.exit(holes.length ? 1 : 0);
