import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TechToJob",
    short_name: "TechToJob",
    description: "Comunidad de desarrolladores y empresas tech en español.",
    start_url: "/",
    display: "standalone",
    background_color: "#2f3436",
    theme_color: "#2f3436",
    icons: [
      { src: "/images/brand-mark-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/brand-mark-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
