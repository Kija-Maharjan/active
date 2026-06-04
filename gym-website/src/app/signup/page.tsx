"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: "member" },
      },
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    router.push("/login?check_email=true");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link href="/" style={{ textDecoration: "none" }}>
          <div className="logo">
            Active<span>Fitness</span>
          </div>
        </Link>
        <h2>Create Account</h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSignup}>
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
              placeholder="Min. 6 characters"
              minLength={6}
            />
          </div>
          <button type="submit" className="auth-btn">
            Sign Up
          </button>
        </form>

        <div className="auth-link">
          Already a member? <Link href="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
