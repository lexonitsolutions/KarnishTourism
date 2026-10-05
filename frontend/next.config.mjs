/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep Next.js' development status badge from covering the admin UI while
  // client-side route transitions are being rendered. Compile/runtime errors
  // still appear normally in the development overlay.
  devIndicators: false,
  async redirects() {
    return [
      { source: "/signin", destination: "/?auth=signin", permanent: false },
      { source: "/signup", destination: "/?auth=signup", permanent: false },
      { source: "/sign-in", destination: "/?auth=signin", permanent: false },
      { source: "/sign-in/:path*", destination: "/?auth=signin", permanent: false },
      { source: "/sign-up", destination: "/?auth=signup", permanent: false },
      { source: "/sign-up/:path*", destination: "/?auth=signup", permanent: false },
      { source: "/admin/login", destination: "/?auth=signin", permanent: false },
    ];
  },
};

export default nextConfig;
