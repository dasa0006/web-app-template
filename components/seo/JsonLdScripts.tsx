import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/seo";

export function JsonLdScripts() {
  return (
    <>
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrganizationSchema()),
        }}
      />
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildWebsiteSchema()),
        }}
      />
    </>
  );
}
