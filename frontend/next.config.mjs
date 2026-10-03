/** @type {import('next').NextConfig} */
const nextConfig = {
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
