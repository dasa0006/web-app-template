import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {
  buildOrganizationSchema,
  buildWebsiteSchema,
} from "../lib/seo/schemas";

const OUTPUT_PATH = path.join(process.cwd(), "security", "csp.hashes.ts");

/**
 * Computes a SHA-256 hash for a JSON payload, formatted for CSP headers.
 */
function getCspHash(json: unknown): string {
  const jsonString = JSON.stringify(json);
  const hash = crypto.createHash("sha256").update(jsonString).digest("base64");
  return `sha256-${hash}`;
}

try {
  console.log("🔍 Calculating CSP hashes...");

  const orgHash = getCspHash(buildOrganizationSchema());
  const webHash = getCspHash(buildWebsiteSchema());

  console.log("✅ Generated CSP Hashes:");
  console.log(`  Organization: ${orgHash}`);
  console.log(`  Website:      ${webHash}`);

  // Generate a type-safe, standalone TypeScript module
  const fileContent = `// ⚠️ AUTO-GENERATED. DO NOT EDIT MANUALLY.
// Run \`npm run update:hashes\` to regenerate.
export const CSP_HASHES = {
  ORGANIZATION: "${orgHash}",
  WEBSITE: "${webHash}",
} as const;
`;

  fs.writeFileSync(OUTPUT_PATH, fileContent, "utf-8");
  console.log(`📝 Successfully wrote hashes to ${path.relative(process.cwd(), OUTPUT_PATH)}`);
} catch (error) {
  console.error("❌ Failed to generate CSP hashes:");
  if (error instanceof Error) {
    console.error(`  ${error.message}`);
  } else {
    console.error(`  ${String(error)}`);
  }
  process.exit(1);
}