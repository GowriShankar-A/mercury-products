import { getApprovedReviews } from "@/lib/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ fontSize: "15px", color: s <= rating ? "#FBBF24" : "rgba(255,255,255,0.12)" }}>★</span>
      ))}
    </div>
  );
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

export default async function ReviewsList() {
  let reviews = [];
  try {
    reviews = await getApprovedReviews();
  } catch {
    // Redis not configured yet — show empty state
  }

  if (reviews.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "32px 0" }}>
        <div style={{ fontSize: "36px", marginBottom: "10px" }}>✍️</div>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "14px" }}>
          No reviews yet — be the first to share your experience!
        </p>
      </div>
    );
  }

  const avg = (reviews.reduce((s, r) => s + Number(r.rating), 0) / reviews.length).toFixed(1);

  return (
    <div>
      {/* Summary bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px", padding: "16px 20px", borderRadius: "16px", background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)" }}>
        <span style={{ fontSize: "36px", fontWeight: 900, color: "#FBBF24", lineHeight: 1 }}>{avg}</span>
        <div>
          <Stars rating={Math.round(Number(avg))} />
          <p style={{ margin: "4px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
            Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {reviews.map((r) => (
          <div key={r.id} style={{ padding: "22px", borderRadius: "18px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
              {/* Avatar + Name */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg,#22d3ee,#818cf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                  {r.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#fff" }}>{r.name}</p>
                  <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{timeAgo(r.createdAt)}</p>
                </div>
              </div>
              <Stars rating={Number(r.rating)} />
            </div>
            <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>
              &ldquo;{r.message}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
