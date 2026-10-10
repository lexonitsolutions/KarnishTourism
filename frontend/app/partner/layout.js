import "../(customers)/globals.css";

export const metadata = {
  title: "Partner Hub — Karnish Tourism B2B Portal",
  description: "B2B Collaborator and travel partner operational console.",
};

export default function PartnerLayout({ children }) {
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
      {children}
    </>
  );
}
