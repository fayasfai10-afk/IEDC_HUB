import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databasePath = path.join(
  __dirname,
  "../data/projects.json"
);

export async function readProjects() {
  const data = await fs.readFile(
    databasePath,
    "utf-8"
  );

  return JSON.parse(data);
}

export async function writeProjects(projects) {
  await fs.writeFile(
    databasePath,
    JSON.stringify(projects, null, 2)
  );
}
