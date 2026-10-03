import "./globals.css";
import { Suspense } from "react";
import CustomerExperience from "./components/CustomerExperience";
import Navbar from "./components/Navbar";

export default function CustomerLayout({ children }) {
  return (
    <>
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
