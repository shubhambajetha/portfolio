import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const task = process.argv[2] ?? "dev";
const projects = ["web", "server"];
const children = [];
let stopping = false;

function stopAll(signal = "SIGTERM") {
    if (stopping) return;
    stopping = true;
    for (const child of children) {
        if (child.exitCode === null) child.kill(signal);
    }
}

for (const project of projects) {
    const child = spawn("npm", ["run", task], {
        cwd: resolve(root, project),
        stdio: "inherit",
        shell: process.platform === "win32",
    });
    children.push(child);

    child.on("error", (error) => {
        console.error(`Could not start ${project}:`, error.message);
        process.exitCode = 1;
        stopAll();
    });

    child.on("exit", (code) => {
        if (stopping) return;
        if (code !== 0) {
            console.error(`${project} exited with code ${code ?? "unknown"}.`);
            process.exitCode = code ?? 1;
        }
        stopAll();
    });
}

process.on("SIGINT", () => stopAll("SIGINT"));
process.on("SIGTERM", () => stopAll("SIGTERM"));
