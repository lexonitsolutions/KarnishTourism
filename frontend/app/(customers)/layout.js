import "./globals.css";
import { Suspense } from "react";
import CustomerExperience from "./components/CustomerExperience";
import Navbar from "./components/Navbar";

export default function CustomerLayout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700&family=Barlow+Semi+Condensed:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/css/plugins.css" />
      <link rel="stylesheet" href="/css/style.css" />
      <link rel="stylesheet" href="/css/activities.css" />
      <script src="/js/gsap.min.js" defer />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var p=new URLSearchParams(window.location.search);if(p.get('auth')==='signin'||p.get('auth')==='signup'||window.location.pathname==='/signin'||window.location.pathname==='/signup'){document.documentElement.classList.add('karnish-intro-done');document.documentElement.classList.remove('karnish-intro-active','karnish-intro-revealing');return}var force=p.get('intro')==='1'||p.get('intro')==='true'||p.get('replay')==='1';var played=sessionStorage.getItem('karnishIntroPlayed')==='true';if(!played||force){if(force){try{sessionStorage.removeItem('karnishIntroPlayed')}catch(_){}}document.documentElement.classList.add('karnish-intro-active');document.documentElement.classList.remove('karnish-intro-done','karnish-intro-completed')}else{document.documentElement.classList.add('karnish-intro-done');document.documentElement.classList.remove('karnish-intro-active','karnish-intro-revealing')}if(sessionStorage.getItem('karnishPageTransition')==='true'){document.documentElement.classList.add('karnish-route-transitioning');}}catch(e){document.documentElement.classList.add('karnish-intro-done')}})();`,
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .cursor,.cursor-active,.services .cursor,.services .cursor-active{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;width:0!important;height:0!important}
            html.karnish-intro-active #karnish-preloader,html.karnish-intro-active .loader-wrap{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important}
            html.karnish-route-transitioning .loader-wrap{display:flex!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;z-index:99999999999999!important}
            html.karnish-intro-done #karnish-intro-overlay,html.karnish-intro-done .karnish-intro-overlay,html.karnish-intro-completed #karnish-intro-overlay,html.karnish-intro-completed .karnish-intro-overlay{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important}
            #karnish-intro-overlay,.karnish-intro-overlay{position:fixed;inset:0;width:100vw;height:100dvh;z-index:2147483647}html.karnish-intro-revealing #karnish-intro-overlay{background:transparent!important}
            @keyframes ktLogoReveal{0%{opacity:0;transform:translateY(18px) scale(.88)}100%{opacity:1;transform:translateY(0) scale(1)}}
            @keyframes ktTitleReveal{0%{opacity:0;transform:translateY(22px);letter-spacing:.10em}100%{opacity:1;transform:translateY(0);letter-spacing:.18em}}
            @keyframes ktDividerReveal{0%{opacity:0;transform:scaleX(0)}100%{opacity:1;transform:scaleX(1)}}
            @keyframes ktTaglineReveal{0%{opacity:0;transform:translateY(16px)}100%{opacity:1;transform:translateY(0)}}
            .karnish-intro-logo-anim{animation:ktLogoReveal .85s cubic-bezier(.16,1,.3,1) .1s backwards;will-change:transform,opacity}
            .karnish-intro-title-anim{animation:ktTitleReveal .9s cubic-bezier(.16,1,.3,1) .28s backwards;will-change:transform,opacity}
            .karnish-intro-divider-anim{animation:ktDividerReveal .7s cubic-bezier(.16,1,.3,1) .48s backwards;will-change:transform,opacity}
            .karnish-intro-tagline-anim{animation:ktTaglineReveal .85s cubic-bezier(.16,1,.3,1) .6s backwards;will-change:transform,opacity}
          `,
        }}
      />
      <Suspense fallback={null}>
        <CustomerExperience />
      </Suspense>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      {children}
    </>
  );
}
