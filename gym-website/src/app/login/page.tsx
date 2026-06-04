"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link href="/" style={{ textDecoration: "none" }}>
          <div className="logo">
            Active<span>Fitness</span>
          </div>
        </Link>
        <h2>Member Login</h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="auth-btn">
            Sign In
          </button>
        </form>

        <div className="auth-link">
          Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
        </div>
        <div className="auth-link" style={{ marginTop: 8 }}>
          <Link href="/admin/login">Admin Login</Link>
        </div>
      </div>
    </div>
  );
}
