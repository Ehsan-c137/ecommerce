import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
   return {
      name: "Open Fashion",
      short_name: "OpenFashion",
      description: "a place for find your style",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#000000",
      icons: [
         {
            src: "/android-chrome-144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "maskable",
         },
         {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
         },
         {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
         },
      ],
      screenshots: [
         {
            src: "/screenshot_mobile.webp",
            sizes: "373x651",
            type: "image/gif",
         },
      ],
   }
}
