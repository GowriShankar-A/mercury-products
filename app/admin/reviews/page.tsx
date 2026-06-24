"use client";
import { useState, useEffect } from "react";
import type { Review } from "@/lib/reviews";

async function fetchPending(secret: string): Promise<Review[]> {
  const res = await fetch(`/api/admin/reviews?secret=${encodeURIComponent(secret)}`);
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

async function act(endpoint: string, id: string, secret: string) {
  const res = await fetch("/api/admin/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: endpoint, id, secret }),
  });
  return res.json();
}

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: "#FBBF24", fontSize: "13px" }}>
      {"★".repeat(Number(rating))}{"☆".repeat(5 - Number(rating))}
    </span>
  );
}

export default function AdminReviewsPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function login() {
    setLoading(true);
    try {
      const data = await fetchPending(secret);
      setReviews(data);
      setAuthed(true);
    } catch {
      setMsg("❌ Wrong password.");
    }
    setLoading(false);
  }

  async function handle(action: string, id: string) {
    await act(action, id, secret);
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setMsg(action === "approve" ? "✅ Approved!" : "🗑️ Deleted.");
    setTimeout(() => setMsg(""), 2500);
  }

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.6)",
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: "10px",
    color: "white",
    padding: "11px 14px",
    fontSize: "14px",
    outline: "none",
    width: "260px",
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
        <h1 style={{ color: "white", fontSize: "22px", fontWeight: 800 }}>Admin — Review Moderation</h1>
        <input type="password" placeholder="Admin password" value={secret} onChange={(e) => setSecret(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && login()} style={inputStyle} />
        <button onClick={login} disabled={loading}
          style={{ background: "linear-gradient(135deg,#22d3ee,#818cf8)", color: "#ffffff", border: "none", borderRadius: "9999px", padding: "11px 28px", fontWeight: 700, cursor: "pointer", fontSize: "14px" }}>
          {loading ? "Checking…" : "Login"}
        </button>
        {msg && <p style={{ color: "#FF4F79", fontSize: "13px" }}>{msg}</p>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ color: "white", fontSize: "26px", fontWeight: 800, marginBottom: "8px" }}>Pending Reviews</h1>
      <p style={{ color: "rgba(10,22,40,0.4)", fontSize: "13px", marginBottom: "32px" }}>
        Approve reviews to make them public. Delete spam.
      </p>
      {msg && <p style={{ color: "#22d3ee", fontSize: "13px", marginBottom: "16px" }}>{msg}</p>}
      {reviews.length === 0 ? (
        <p style={{ color: "rgba(10,22,40,0.35)", fontSize: "14px" }}>No pending reviews 🎉</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {reviews.map((r) => (
            <div key={r.id} style={{ padding: "20px 22px", borderRadius: "16px", background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.08)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <div>
                  <span style={{ color: "white", fontWeight: 700, fontSize: "15px" }}>{r.name}</span>
                  <span style={{ marginLeft: "10px" }}><Stars rating={r.rating} /></span>
                  <span style={{ marginLeft: "10px", color: "rgba(10,22,40,0.3)", fontSize: "11px" }}>{new Date(r.createdAt).toLocaleString("en-IN")}</span>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => handle("approve", r.id)}
                    style={{ background: "rgba(34,211,102,0.15)", border: "1px solid rgba(34,211,102,0.3)", color: "#4ade80", borderRadius: "8px", padding: "6px 14px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                    ✓ Approve
                  </button>
                  <button onClick={() => handle("delete", r.id)}
                    style={{ background: "rgba(255,79,121,0.12)", border: "1px solid rgba(255,79,121,0.25)", color: "#FF4F79", borderRadius: "8px", padding: "6px 14px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                    ✕ Delete
                  </button>
                </div>
              </div>
              <p style={{ margin: 0, color: "rgba(10,22,40,0.55)", fontSize: "13px", lineHeight: 1.65 }}>&ldquo;{r.message}&rdquo;</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
