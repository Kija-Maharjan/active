"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

type Plan = {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string | null;
  features: string[];
  admission_fee: number;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

const emptyForm: Omit<Plan, "id" | "created_at" | "updated_at"> = {
  name: "",
  price: 0,
  period: "mo",
  description: "",
  features: [],
  admission_fee: 0,
  is_featured: false,
  is_active: true,
  sort_order: 0,
};

export default function AdminPlans() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [featuresInput, setFeaturesInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        router.push("/admin/login");
        return;
      }
      setUser(user);
      const res = await fetch("/api/admin/plans");
      if (res.ok) {
        setPlans(await res.json());
      }
      setLoading(false);
    });
  }, [router, supabase]);

  const openAdd = () => {
    setForm(emptyForm);
    setFeaturesInput("");
    setEditingId(null);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const openEdit = (plan: Plan) => {
    setForm({
      name: plan.name,
      price: plan.price,
      period: plan.period,
      description: plan.description ?? "",
      features: plan.features,
      admission_fee: plan.admission_fee,
      is_featured: plan.is_featured,
      is_active: plan.is_active,
      sort_order: plan.sort_order,
    });
    setFeaturesInput(plan.features.join("\n"));
    setEditingId(plan.id);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");
    setSaving(true);

    const features = featuresInput
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = { ...form, features };

    const url = editingId
      ? `/api/admin/plans/${editingId}`
      : "/api/admin/plans";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to save plan");
      return;
    }

    setSuccess(editingId ? "Plan updated successfully." : "Plan created successfully.");
    setShowForm(false);
    await fetchPlans();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this plan? This cannot be undone.")) return;

    const res = await fetch(`/api/admin/plans/${id}`, { method: "DELETE" });

    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to delete plan");
      return;
    }

    await fetchPlans();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="admin-body">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", color: "var(--muted)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "3px", textTransform: "uppercase" }}>
          Loading...
        </div>
      </div>
    );
  }

  const periodLabels: Record<string, string> = { mo: "Monthly", "3mo": "Quarterly", yr: "Annual" };

  return (
    <div className="admin-body">
      <div className="admin-nav">
        <div className="admin-brand">
          Active<span>Fitness</span>{" "}
          <span style={{ color: "var(--muted)", fontSize: "0.75rem", letterSpacing: "3px" }}>ADMIN</span>
        </div>
        <div className="admin-user">
          <a href="/admin/dashboard" className="admin-link" style={{ marginRight: 12, color: "var(--red)", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "2px", textTransform: "uppercase" }}>
            Dashboard
          </a>
          <span>{user?.email}</span>
          <button className="admin-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="admin-dash">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1>Membership Plans</h1>
            <p className="admin-sub">Manage pricing, features, and plan visibility.</p>
          </div>
          <button className="admin-btn" onClick={openAdd}>+ Add Plan</button>
        </div>

        {error && <div className="admin-error">{error}</div>}
        {success && <div className="admin-success">{success}</div>}

        {showForm && (
          <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginBottom: 20 }}>{editingId ? "Edit Plan" : "Add Plan"}</h2>
              <div className="admin-form">
                <div className="admin-field">
                  <label>Plan Name</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Monthly" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div className="admin-field">
                    <label>Price (Rs)</label>
                    <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} min={0} />
                  </div>
                  <div className="admin-field">
                    <label>Period</label>
                    <select value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })}>
                      <option value="mo">Monthly</option>
                      <option value="3mo">Quarterly</option>
                      <option value="yr">Annual</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div className="admin-field">
                    <label>Admission Fee (Rs)</label>
                    <input type="number" value={form.admission_fee} onChange={(e) => setForm({ ...form, admission_fee: Number(e.target.value) })} min={0} />
                  </div>
                  <div className="admin-field">
                    <label>Sort Order</label>
                    <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} min={0} />
                  </div>
                </div>
                <div className="admin-field">
                  <label>Description (optional)</label>
                  <input type="text" value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description of this plan" />
                </div>
                <div className="admin-field">
                  <label>Features (one per line)</label>
                  <textarea rows={5} value={featuresInput} onChange={(e) => setFeaturesInput(e.target.value)} placeholder="Full gym access&#10;All equipment included&#10;7 days a week" />
                </div>
                <div className="admin-checkboxes">
                  <label className="admin-checkbox">
                    <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} />
                    <span>Featured (Most Popular badge)</span>
                  </label>
                  <label className="admin-checkbox">
                    <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
                    <span>Active (visible on site)</span>
                  </label>
                </div>
                <div className="admin-form-actions">
                  <button className="admin-btn admin-btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                  <button className="admin-btn" onClick={handleSave} disabled={saving || !form.name}>
                    {saving ? "Saving..." : editingId ? "Update Plan" : "Create Plan"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {plans.length === 0 ? (
          <div className="admin-section">
            <p style={{ color: "var(--muted)" }}>No plans created yet. Click &quot;+ Add Plan&quot; to get started.</p>
          </div>
        ) : (
          <div className="admin-section" style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Period</th>
                  <th>Admission</th>
                  <th>Features</th>
                  <th>Featured</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.id}>
                    <td>{plan.sort_order}</td>
                    <td><strong>{plan.name}</strong></td>
                    <td>Rs {plan.price.toLocaleString()}</td>
                    <td>{periodLabels[plan.period] ?? plan.period}</td>
                    <td>{plan.admission_fee > 0 ? `Rs ${plan.admission_fee.toLocaleString()}` : "—"}</td>
                    <td style={{ maxWidth: 200 }}>{plan.features.length} items</td>
                    <td>{plan.is_featured ? "⭐" : "—"}</td>
                    <td>{plan.is_active ? "✓" : "✗"}</td>
                    <td>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button className="admin-btn-small" onClick={() => openEdit(plan)}>Edit</button>
                        <button className="admin-btn-small admin-btn-danger" onClick={() => handleDelete(plan.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
