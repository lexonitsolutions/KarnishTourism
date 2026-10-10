import "../(customers)/globals.css";
import "./account.css";
import { Suspense } from "react";
import CustomerExperience from "../(customers)/components/CustomerExperience";

export default function AccountLayout({ children }) {
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
      <Suspense fallback={null}>
        <CustomerExperience />
      </Suspense>
      {children}
    </>
  );
}
