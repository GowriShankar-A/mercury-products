"use client";
import { useState, useRef } from "react";
import { submitReviewAction } from "@/app/reviews/actions";

const ACCENT = "#22d3ee";

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: "6px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "28px",
            color: star <= (hover || value) ? "#FBBF24" : "rgba(255,255,255,0.15)",
            transition: "color 0.15s, transform 0.15s",
            transform: star <= (hover || value) ? "scale(1.2)" : "scale(1)",
            padding: "0 2px",
            lineHeight: 1,
          }}
          aria-label={`${star} star`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === 0) { setErrorMsg("Please select a star rating."); return; }
    setStatus("submitting");
    setErrorMsg("");
    const fd = new FormData(e.currentTarget);
    fd.set("rating", String(rating));
    const res = await submitReviewAction(fd);
    if (res.success) {
      setStatus("done");
      formRef.current?.reset();
      setRating(0);
    } else {
      setErrorMsg(res.error || "Something went wrong.");
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.55)",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "12px",
    color: "#0a1628",
    outline: "none",
    width: "100%",
    padding: "13px 16px",
    fontSize: "14px",
    boxSizing: "border-box",
  };

  if (status === "done") {
    return (
      <div style={{ textAlign: "center", padding: "32px 0" }}>
        <div style={{ fontSize: "42px", marginBottom: "12px" }}>🎉</div>
        <h3 style={{ color: "#0a1628", fontWeight: 700, marginBottom: "8px" }}>Thank you for your review!</h3>
        <p style={{ color: "rgba(10,22,40,0.45)", fontSize: "14px" }}>
          Your review is under moderation and will appear here shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          style={{ marginTop: "16px", background: "none", border: "1px solid rgba(0,0,0,0.15)", color: "rgba(10,22,40,0.6)", borderRadius: "9999px", padding: "8px 20px", cursor: "pointer", fontSize: "13px" }}
        >
          Write another
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div>
        <label style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(10,22,40,0.35)", display: "block", marginBottom: "8px" }}>
          Your Rating *
        </label>
        <StarPicker value={rating} onChange={setRating} />
      </div>

      <div>
        <label style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(10,22,40,0.35)", display: "block", marginBottom: "6px" }}>
          Your Name *
        </label>
        <input name="name" type="text" required placeholder="e.g. Rahul K." style={inputStyle} maxLength={60} />
      </div>

      <div>
        <label style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(10,22,40,0.35)", display: "block", marginBottom: "6px" }}>
          Your Review *
        </label>
        <textarea name="message" required placeholder="Tell us about your experience..." rows={4}
          style={{ ...inputStyle, resize: "vertical" }} maxLength={500} />
      </div>

      {(status === "error" || errorMsg) && (
        <p style={{ color: "#FF4F79", fontSize: "13px", background: "rgba(255,79,121,0.08)", padding: "10px 14px", borderRadius: "10px", border: "1px solid rgba(255,79,121,0.2)", margin: 0 }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        style={{
          background: `linear-gradient(135deg, ${ACCENT}, #818cf8)`,
          color: "white",
          border: "none",
          borderRadius: "9999px",
          padding: "13px 28px",
          fontWeight: 700,
          fontSize: "14px",
          cursor: status === "submitting" ? "not-allowed" : "pointer",
          opacity: status === "submitting" ? 0.6 : 1,
          transition: "opacity 0.2s",
        }}
      >
        {status === "submitting" ? "Submitting…" : "Submit Review →"}
      </button>
    </form>
  );
}
