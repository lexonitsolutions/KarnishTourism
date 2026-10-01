"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { adminApi } from "@admin/services/api";

export default function LoginPage() {
  const router=useRouter(); const search=useSearchParams(); const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
  async function submit(event){event.preventDefault();setBusy(true);setError("");const form=new FormData(event.currentTarget);try{await adminApi("/auth/login",{method:"POST",body:JSON.stringify(Object.fromEntries(form))});router.replace(search.get("next")||"/admin");router.refresh();}catch(err){setError(err.message)}finally{setBusy(false)}}
  return <main className="admin-login"><section className="login-card"><div className="login-brand"><Image src="/images/karnish-logo.png" width={62} height={62} alt="Karnish Tourism"/><h1>Admin Console</h1><p>Sign in with your authorized staff account</p></div><form onSubmit={submit}>{error&&<div className="login-error">{error}</div>}<label>Email address<input name="email" type="email" autoComplete="username" required placeholder="admin@karnishtourism.com"/></label><label>Password<input name="password" type="password" autoComplete="current-password" required placeholder="Enter your password"/></label><button disabled={busy}>{busy?"Signing in…":"Sign in securely"}</button></form><p className="login-help">Access is restricted and activity is recorded.</p></section></main>;
}
