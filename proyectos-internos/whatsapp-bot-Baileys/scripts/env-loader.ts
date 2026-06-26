// Side-effect only — debe ser el PRIMER import en start-bot.ts
// Los ES modules hoistean todos los imports, así que este módulo separado
// garantiza que process.env esté poblado antes de que cualquier otro módulo
// lea las variables de entorno en su top-level.
import path from "node:path";
import fs from "node:fs";

function loadEnvFile(envPath: string) {
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, "utf-8");
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

// .env primero, .env.local sobreescribe (mismo orden que Next.js)
loadEnvFile(path.resolve(process.cwd(), ".env"));
loadEnvFile(path.resolve(process.cwd(), ".env.local"));
