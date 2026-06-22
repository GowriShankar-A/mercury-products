"use client";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { sendQuoteEmail } from "@/app/actions";

const QUOTE_GRADIENT = "linear-gradient(90deg, #22D8FF 0%, #6D6EFF 38%, #D94EFF 70%, #FF9A28 100%)";


const perks = [
  "Free design review",
  "Eco paper options",
  "Free delivery pan-India",
  "Studio visits welcome",
];

// Per-field focus accent colors
const FOCUS_COLORS: Record<string, { border: string; glow: string }> = {
  name:      { border: "rgba(109,110,255,0.55)", glow: "0 0 18px rgba(109,110,255,0.18)" },
  email:     { border: "rgba(109,110,255,0.55)", glow: "0 0 18px rgba(109,110,255,0.18)" },
  phone:     { border: "rgba(109,110,255,0.55)", glow: "0 0 18px rgba(109,110,255,0.18)" },
  details:   { border: "rgba(109,110,255,0.4)",  glow: "none" },
};

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <path
        d="M10 2v3M10 15v3M2 10h3M15 10h3M4.22 4.22l2.12 2.12M13.66 13.66l2.12 2.12M4.22 15.78l2.12-2.12M13.66 6.34l2.12-2.12"
        stroke="#E58CFF" strokeWidth="1.8" strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <polyline points="3,10 8,15 17,5" stroke="#2EE7A8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const result = await sendQuoteEmail(form);
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || "Failed to send quote request. Please check configuration.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const set = (k: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const fieldStyle = (name: string): React.CSSProperties => {
    const isFocused = focused === name;
    const accent = FOCUS_COLORS[name];
    return {
      background: "rgba(255,255,255,0.05)",
      border: `1px solid ${isFocused ? accent.border : "rgba(255,255,255,0.07)"}`,
      borderRadius: "18px",
      color: "#ffffff",
      outline: "none",
      width: "100%",
      height: "56px",
      padding: "0 18px",
      fontSize: "15px",
      transition: "border-color 0.25s ease, box-shadow 0.25s ease",
      boxShadow: isFocused ? accent.glow : "none",
      appearance: "none" as const,
    };
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.58)",
    marginBottom: "8px",
  };

  return (
    <Reveal>
    <div
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        paddingLeft: "clamp(16px, 3vw, 40px)",
        paddingRight: "clamp(16px, 3vw, 40px)",
        paddingBottom: "80px",
      }}
    >
      {/* ── Outer premium card ── */}
      <div
        style={{
          position: "relative",
          borderRadius: "40px",
          padding: "clamp(40px, 6vw, 80px)",
          background: "linear-gradient(135deg, #2A093A 0%, #150A2B 40%, #091320 100%)",
          overflow: "hidden",
          display: "flex",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Ambient glows */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: "55%", height: "60%",
            background: "radial-gradient(circle at 80% 20%, rgba(200,80,255,0.22), transparent 45%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "50%", height: "55%",
            background: "radial-gradient(circle at 20% 90%, rgba(0,180,255,0.16), transparent 40%)" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "40%", height: "40%",
            background: "radial-gradient(circle at 90% 95%, rgba(0,255,160,0.08), transparent 35%)" }} />
        </div>

        {/* ── LEFT — Sales content ── */}
        <div
          style={{
            flex: "1 1 360px",
            maxWidth: "480px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Section label */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "32px" }}>
            <SparkleIcon />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#E58CFF",
                lineHeight: 1,
              }}
            >
              GET A QUOTE
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(44px, 6vw, 72px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#ffffff",
              margin: "0 0 24px 0",
            }}
          >
            Let&apos;s print{" "}
            <span
              style={{
                background: QUOTE_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              something unforgettable.
            </span>
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.65,
              margin: "0 0 40px 0",
              maxWidth: "420px",
            }}
          >
            Tell us about your project. We respond within 24 hours with paper
            samples, pricing, and ideas you didn&apos;t ask for (but will love).
          </p>

          {/* Feature bullets */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {perks.map((p) => (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <CheckIcon />
                <span style={{ fontSize: "17px", color: "rgba(255,255,255,0.82)", fontWeight: 500 }}>
                  {p}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Glass form ── */}
        <div
          style={{
            flex: "1 1 480px",
            maxWidth: "620px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            borderRadius: "32px",
            padding: "clamp(24px, 4vw, 36px)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {submitted ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "480px",
                textAlign: "center",
                padding: "48px 24px",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(46,231,168,0.2), rgba(34,216,255,0.2))",
                  border: "1px solid rgba(46,231,168,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2EE7A8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#ffffff", marginBottom: "10px", letterSpacing: "-0.02em" }}>
                Quote request sent!
              </h3>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: "300px", margin: 0 }}>
                We&apos;ll review your project and get back within 24 hours with pricing and paper suggestions.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Row: Name */}
              <div>
                <label style={labelStyle}>Your Name</label>
                <input
                  placeholder="Alex Morgan"
                  required
                  value={form.name}
                  onChange={set("name")}
                  style={fieldStyle("name")}
                  onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                />
              </div>
              {/* Row: Phone */}
              <div>
                <label style={labelStyle}>Phone</label>
                <input
                  placeholder="+91 98765 43210"
                  required
                  value={form.phone}
                  onChange={set("phone")}
                  style={fieldStyle("phone")}
                  onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                />
              </div>
              {/* Row: Email (optional) */}
              <div>
                <label style={labelStyle}>Email (optional)</label>
                <input
                  type="email"
                  placeholder="alex@studio.com"
                  value={form.email}
                  onChange={set("email")}
                  style={fieldStyle("email")}
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                />
              </div>
              {/* Row: Message */}
              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  placeholder="Tell us about your project..."
                  rows={4}
                  value={form.message}
                  onChange={set("message")}
                  style={{ ...fieldStyle("details"), height: "auto", minHeight: "120px", padding: "16px 18px", resize: "vertical" }}
                  onFocus={() => setFocused("details")} onBlur={() => setFocused(null)}
                />
              </div>
              {error && (
                <div style={{
                  color: "#FF4F79",
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "12px 16px",
                  background: "rgba(255, 79, 121, 0.08)",
                  borderRadius: "14px",
                  border: "1px solid rgba(255, 79, 121, 0.2)",
                  lineHeight: 1.5
                }}>
                  {error}
                </div>
              )}
              {/* Footer: terms + CTA */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", marginTop: "4px" }}>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", margin: 0 }}>
                  By submitting you agree to our friendly terms.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  onMouseEnter={() => setHoveredBtn(true)}
                  onMouseLeave={() => setHoveredBtn(false)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "15px 32px",
                    borderRadius: "9999px",
                    background: submitting ? "rgba(255,255,255,0.1)" : "linear-gradient(90deg, #FF4FD8, #FF5AA5)",
                    color: submitting ? "rgba(255,255,255,0.4)" : "#ffffff",
                    fontWeight: 700,
                    fontSize: "15px",
                    letterSpacing: "0.01em",
                    border: "none",
                    cursor: submitting ? "default" : "pointer",
                    whiteSpace: "nowrap",
                    transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease",
                    transform: hoveredBtn && !submitting ? "translateY(-2px) scale(1.03)" : "none",
                    boxShadow: submitting ? "none" : (hoveredBtn ? "0 0 40px rgba(255,90,180,0.65), 0 8px 20px rgba(0,0,0,0.3)" : "0 0 24px rgba(255,90,180,0.38)"),
                  }}
                >
                  {submitting ? "Sending..." : "Send request →"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
    </Reveal>
  );
}
