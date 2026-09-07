import type { MetadataRoute } from "next";
import { SITE_ORIGIN, routes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: new URL(path, SITE_ORIGIN).toString(),
  }));
}
