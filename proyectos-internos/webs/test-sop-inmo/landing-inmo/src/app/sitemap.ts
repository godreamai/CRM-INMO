import { PROPERTIES } from "@/content/data";
import type { MetadataRoute } from "next";

const BASE = "https://piedrayzafa.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/propiedades`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/vender-mi-propiedad`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const propertyPages: MetadataRoute.Sitemap = PROPERTIES.map((p) => ({
    url: `${BASE}/propiedad/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...propertyPages];
}
