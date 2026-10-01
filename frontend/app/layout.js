export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Karnish Tourism — Travel Agency",
  icons: {
    icon: "/images/karnish-logo.png",
    shortcut: "/images/karnish-logo.png",
    apple: "/images/karnish-logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
