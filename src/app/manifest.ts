import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
   return {
      name: "Open Fashion",
      short_name: "OpenFashion",
      description: "A Progressive Web App built with Next.js",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#000000",
      icons: [
         {
            src: "/favicon.ico/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
         },
         {
            src: "/favicon.ico/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
         },
      ],
   }
}
