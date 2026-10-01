/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/signin", destination: "/?auth=signin", permanent: false },
      { source: "/signup", destination: "/?auth=signup", permanent: false },
      { source: "/admin/login", destination: "/?auth=signin", permanent: false },
      { source: "/account/login", destination: "/?auth=signin", permanent: false },
      { source: "/account/signup", destination: "/?auth=signup", permanent: false },
      { source: "/account", destination: "/dashboard", permanent: false },
      { source: "/account/profile", destination: "/profile", permanent: false },
      { source: "/account/bookings", destination: "/bookings", permanent: false },
      { source: "/account/wishlist", destination: "/wishlist", permanent: false },
      { source: "/account/payments", destination: "/payments", permanent: false },
      { source: "/account/:path*", destination: "/dashboard", permanent: false },
    ];
  },
};

export default nextConfig;
