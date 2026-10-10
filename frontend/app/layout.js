import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=new URLSearchParams(window.location.search);if(p.get('auth')==='signin'||p.get('auth')==='signup'||window.location.pathname==='/signin'||window.location.pathname==='/signup'||window.location.pathname.startsWith('/admin')||window.location.pathname.startsWith('/partner')){window.__karnishIntroShouldRun=false;document.documentElement.classList.add('karnish-intro-done');document.documentElement.classList.remove('karnish-intro-active','karnish-intro-revealing');return;}var force=p.get('intro')==='1'||p.get('intro')==='true'||p.get('replay')==='1'||p.get('force')==='1';if(force){try{sessionStorage.removeItem('karnish_intro_seen');}catch(_){}}var introSeen=sessionStorage.getItem('karnish_intro_seen')==='true';if(!introSeen||force){window.__karnishIntroShouldRun=true;document.documentElement.classList.add('karnish-intro-active');document.documentElement.classList.remove('karnish-intro-done','karnish-intro-completed');}else{window.__karnishIntroShouldRun=false;document.documentElement.classList.add('karnish-intro-done');document.documentElement.classList.remove('karnish-intro-active','karnish-intro-revealing');}if(sessionStorage.getItem('karnishPageTransition')==='true'){document.documentElement.classList.add('karnish-route-transitioning');}}catch(e){window.__karnishIntroShouldRun=false;document.documentElement.classList.add('karnish-intro-done');}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700&family=Barlow+Semi+Condensed:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/plugins.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/activities.css" />
        <Script src="/js/gsap.min.js" strategy="afterInteractive" />
      </head>
      <body suppressHydrationWarning>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
