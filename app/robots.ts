import type { MetadataRoute } from "next";

// TODO (owner): set NEXT_PUBLIC_SITE_URL to the production domain before launch.
const BASE = (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.example.com");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
