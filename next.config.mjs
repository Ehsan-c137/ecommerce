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
}

export default nextConfig
