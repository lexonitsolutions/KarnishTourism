import "./globals.css";
import Script from "next/script";
import RouteTransitionHandler from "./components/RouteTransitionHandler";

export const metadata = {
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700&family=Barlow+Semi+Condensed:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/plugins.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/activities.css" />
        <Script
          id="karnish-intro-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var pathname = window.location.pathname || '';
                  var isHome = pathname === '/' || pathname === '';
                  // If on any page other than home, never activate intro
                  if (!isHome) {
                    document.documentElement.classList.add('karnish-intro-done');
                    document.documentElement.classList.remove('karnish-intro-active');
                    return;
                  }
                  var p = new URLSearchParams(window.location.search);
                  var force = p.get('intro') === '1' || p.get('intro') === 'true' || p.get('replay') === '1';
                  var played = sessionStorage.getItem('karnishIntroPlayed');
                  if (force || !played) {
                    document.documentElement.classList.add('karnish-intro-active');
                    document.documentElement.classList.remove('karnish-intro-done');
                  } else {
                    document.documentElement.classList.add('karnish-intro-done');
                    document.documentElement.classList.remove('karnish-intro-active');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              #smooth-wrapper {
                visibility: visible !important;
                opacity: 1 !important;
              }
              /* Permanently hide custom cursor dot under pointer */
              .cursor, .cursor-active, .services .cursor, .services .cursor-active {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
                width: 0 !important;
                height: 0 !important;
              }
              html.karnish-intro-done #karnish-intro-overlay {
                display: none !important;
              }
              html.karnish-intro-revealing #karnish-intro-overlay {
                background: transparent !important;
              }
              #karnish-intro-overlay {
                position: fixed;
                inset: 0;
                width: 100vw;
                height: 100dvh;
                z-index: 2147483647;
                background: transparent;
              }
              @keyframes ktLogoReveal {
                0% {
                  opacity: 0;
                  transform: translateY(18px) scale(0.88);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
              @keyframes ktTitleReveal {
                0% {
                  opacity: 0;
                  transform: translateY(22px);
                  letter-spacing: 0.10em;
                }
                100% {
                  opacity: 1;
                  transform: translateY(0);
                  letter-spacing: 0.18em;
                }
              }
              @keyframes ktDividerReveal {
                0% {
                  opacity: 0;
                  transform: scaleX(0);
                }
                100% {
                  opacity: 1;
                  transform: scaleX(1);
                }
              }
              @keyframes ktTaglineReveal {
                0% {
                  opacity: 0;
                  transform: translateY(16px);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              .karnish-intro-logo-anim {
                animation: ktLogoReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.1s backwards;
                will-change: transform, opacity;
              }
              .karnish-intro-title-anim {
                animation: ktTitleReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.28s backwards;
                will-change: transform, opacity;
              }
              .karnish-intro-divider-anim {
                animation: ktDividerReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.48s backwards;
                will-change: transform, opacity;
              }
              .karnish-intro-tagline-anim {
                animation: ktTaglineReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.6s backwards;
                will-change: transform, opacity;
              }
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <RouteTransitionHandler />
        {children}
      </body>
    </html>
  );
}
