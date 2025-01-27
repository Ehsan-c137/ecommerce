/** @type {import('next').NextConfig} */
const nextConfig = {
   eslint: {
      ignoreDuringBuilds: true,
   },
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "ibb.co",
            port: "",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "i.ibb.co",
            port: "",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "placehold.co",
            port: "",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "image.hm.com",
            port: "",
            pathname: "/**",
         },
      ],
   },
   webpack: (config) => {
      config.optimization.splitChunks.cacheGroups = {
         common: {
            name: "common",
            chunks: "all",
         },
      }

      return config
   },
   async headers() {
      return [
         {
            source: "/(.*)",
            headers: [
               {
                  key: "X-Content-Type-Options",
                  value: "nosniff",
               },
               {
                  key: "X-Frame-Options",
                  value: "DENY",
               },
               {
                  key: "Referrer-Policy",
                  value: "strict-origin-when-cross-origin",
               },
            ],
         },
         {
            source: "/sw.js",
            headers: [
               {
                  key: "Content-Type",
                  value: "application/javascript; charset=utf-8",
               },
               {
                  key: "Cache-Control",
                  value: "no-cache, no-store, must-revalidate",
               },
               {
                  key: "Content-Security-Policy",
                  value: "default-src 'self'; script-src 'self'",
               },
            ],
         },
      ]
   },
}

export default nextConfig
