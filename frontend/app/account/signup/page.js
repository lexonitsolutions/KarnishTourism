"use client";

import Navbar from "../../components/Navbar";
import AuthCard from "../../components/AuthCard";

export default function SignupPage() {
  return (
    <>
      {/* Shared Navbar */}
      <Navbar />

      <main className="kt-pro-page-wrapper">
        <div className="container d-flex justify-content-center align-items-center">
          <AuthCard initialMode="signup" isModal={false} />
        </div>
      </main>
    </>
  );
}
