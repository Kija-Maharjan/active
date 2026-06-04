"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    // Check if user has admin role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      await supabase.auth.signOut();
      setError("Access denied. Admin privileges required.");
      return;
    }

    router.push("/admin/dashboard");
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
        <h2>Admin Login</h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="field">
            <label htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@activefitness.com"
            />
          </div>
          <div className="field">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="auth-btn">
            Admin Sign In
          </button>
        </form>

        <div className="auth-link">
          <Link href="/login">Member Login</Link>
        </div>
        <div className="auth-link" style={{ marginTop: 8 }}>
          <Link href="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
