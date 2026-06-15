"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/admin/login");
        return;
      }
      setUser(user);
      setLoading(false);
    });
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="admin-body">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            color: "var(--muted)",
            fontFamily: "'Barlow Condensed', sans-serif",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="admin-body">
      <div className="admin-nav">
        <div className="admin-brand">
          Active<span>Fitness</span> <span style={{ color: "var(--muted)", fontSize: "0.75rem", letterSpacing: "3px" }}>ADMIN</span>
        </div>
        <div className="admin-user">
          <span>{user?.email}</span>
          <button className="admin-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="admin-dash">
        <h1>Dashboard</h1>
        <p className="admin-sub">Welcome back, Admin</p>

        <div className="admin-stats">
          <div className="admin-stat">
            <div className="admin-stat-num">156</div>
            <div className="admin-stat-label">Total Members</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-num">12</div>
            <div className="admin-stat-label">New This Month</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-num">84%</div>
            <div className="admin-stat-label">Retention Rate</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-num">7</div>
            <div className="admin-stat-label">Staff</div>
          </div>
        </div>

        <div className="admin-section">
          <h2>Workout Plans</h2>
          <p>
            Manage workout plans displayed on the website. Click below to add or
            update plans.
          </p>
          <div style={{ marginTop: 16 }}>
            <div className="placeholder-input">
              + Add / Edit Workout Plans
            </div>
          </div>
        </div>

        <div className="admin-section">
          <h2>Membership Management</h2>
          <p>
            View and manage member registrations, plan upgrades, and access
            status.
          </p>
        </div>

        <div className="admin-section">
          <h2>Recent Activity</h2>
          <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
            No recent activity to display.
          </p>
        </div>
      </div>
    </div>
  );
}
