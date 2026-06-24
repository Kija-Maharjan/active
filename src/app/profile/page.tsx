"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type ProfileRow = {
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: string | null;
};

function getInitials(name: string | null, email?: string | null) {
  const source = name || email || "User";
  const parts = source.split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createClient();
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("Please sign in to view your profile.");
        setLoading(false);
        return;
      }

      setUser(user);
      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, email, phone, role")
        .eq("id", user.id)
        .single();

      if (profileError) {
        setError(profileError.message);
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    loadProfile();
  }, []);

  if (loading) {
    return <div className="profile-page"><p className="profile-loading">Loading profile…</p></div>;
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h1>Your Profile</h1>
          <p className="profile-error">{error}</p>
          <Link href="/login" className="btn-primary">
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const initials = getInitials(profile?.full_name ?? null, profile?.email ?? null);

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar profile-avatar--initials">{initials}</div>
          <div>
            <p className="profile-role">{profile?.role?.toUpperCase() ?? "MEMBER"}</p>
            <h1>{profile?.full_name || user?.email || "Active Fitness Member"}</h1>
            <p className="profile-subtitle">Welcome to your personal Active Fitness profile.</p>
          </div>
        </div>

        <div className="profile-bio">
          <h2>Bio</h2>
          <p>
            This is your member profile page. Update your contact details, review your membership status, and keep your account information current.
          </p>
        </div>

        <div className="profile-details">
          <div>
            <h3>Full name</h3>
            <p>{profile?.full_name || "Not set"}</p>
          </div>
          <div>
            <h3>Email</h3>
            <p>{profile?.email || user?.email || "Not set"}</p>
          </div>
          <div>
            <h3>Phone</h3>
            <p>{profile?.phone || "Not set"}</p>
          </div>
        </div>

        <div className="profile-actions">
          <Link href="/" className="btn-outline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
