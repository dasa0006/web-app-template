import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {
  buildOrganizationSchema,
  buildWebsiteSchema,
} from "../lib/seo/schemas";

const PROXY_PATH = path.join(process.cwd(), "proxy.ts");

// Compute SHA-256 hashes (base64 encoded, matching browser CSP format)
function getCspHash(json: unknown): string {
  const jsonString = JSON.stringify(json);
  const hash = crypto.createHash("sha256").update(jsonString).digest("base64");
  return `sha256-${hash}`;
}

const orgHash = getCspHash(buildOrganizationSchema());
const webHash = getCspHash(buildWebsiteSchema());

console.log("✅ Generated CSP Hashes:");
console.log(`   Organization: ${orgHash}`);
console.log(`   Website:      ${webHash}`);

// Auto-update proxy.ts
let proxyContent = fs.readFileSync(PROXY_PATH, "utf-8");
proxyContent = proxyContent.replace(
  /sha256-REPLACE_WITH_YOUR_ORG_HASH/,
  orgHash
);
proxyContent = proxyContent.replace(
  /sha256-REPLACE_WITH_YOUR_WEBSITE_HASH/,
  webHash
);

fs.writeFileSync(PROXY_PATH, proxyContent);
console.log("📝 Updated proxy.ts with new hashes.");
