import type { MetadataRoute } from "next";
import { products } from "@/data/products";

// TODO (owner): set NEXT_PUBLIC_SITE_URL to the production domain before launch.
const BASE = (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.example.com");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/products", "/about", "/quality", "/contact", "/request-a-quote", "/privacy", "/terms"];
  // Fixed review date keeps the sitemap statically prerenderable.
  const now = new Date("2026-10-13T00:00:00Z");
  return [
    ...routes.map((route) => ({
      url: `${BASE}${route || "/"}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...products.map((p) => ({
      url: `${BASE}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
