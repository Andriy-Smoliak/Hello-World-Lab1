import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const buildDirectory = join(projectRoot, "build");
const posixLauncher = join(buildDirectory, "hello");
const windowsLauncher = join(buildDirectory, "hello.cmd");

mkdirSync(buildDirectory, { recursive: true });

const posixLauncherContent = [
  "#!/usr/bin/env node",
  'import("./index.js").catch((error) => {',
  "  console.error(error);",
  "  process.exitCode = 1;",
  "});",
  ""
].join("\n");

const windowsLauncherContent = [
  "@echo off",
  'node "%~dp0index.js" %*',
  "exit /b %errorlevel%",
  ""
].join("\r\n");

writeFileSync(posixLauncher, posixLauncherContent, "utf8");
writeFileSync(windowsLauncher, windowsLauncherContent, "utf8");

if (process.platform !== "win32") {
  chmodSync(posixLauncher, 0o755);
}
