"use client";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/products";
import { COMPANY_NAME, COMPANY_EMAIL, COMPANY_PHONE, COMPANY_PHONE_ALT, COMPANY_PHONE_ALT2, COMPANY_ADDRESS, COMPANY_INSTAGRAM, COMPANY_FACEBOOK } from "@/lib/products";

const productLinks = products.slice(0, 7).map((p) => ({ label: p.name.split(" — ")[0], href: `/products/${p.slug}` }));

const serviceLinks = [
  { label: "UV Direct Printing", href: "/services" },
  { label: "Flex & Banners", href: "/services" },
  { label: "Vinyl Stickers", href: "/services" },
  { label: "Display Stands", href: "/services" },
  { label: "Industrial Packaging", href: "/services" },
  { label: "Custom Solutions", href: "/services" },
];

// const resourceLinks = [
//   { label: "Blog & Guides", href: "/blog" },
//   { label: "FAQ", href: "/faq" },
//   { label: "Testimonials", href: "/testimonials" },
//   { label: "Shapes", href: "/shapes" },
//   { label: "Thickness Guide", href: "/thickness" },
// ];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
  { label: "Get a Quote", href: "/quote" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleNewsletter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubscribed(true);
  }

  return (
    <footer style={{ padding: "0 clamp(16px,3vw,40px) 32px" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", borderRadius: "28px", overflow: "hidden", background: "#111118", border: "1px solid rgba(255,255,255,0.07)" }}>

        {/* Top CTA band */}
        <div style={{ padding: "clamp(40px,5vw,56px) clamp(32px,4vw,56px)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(135deg,rgba(236,72,153,0.06),rgba(249,115,22,0.04))" }}>
          <div>
            <h3 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.025em", margin: "0 0 8px 0" }}>
              Ready to start printing?
            </h3>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }}>
              Custom sizes, materials, and quantities — quoted within 24 hours.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/quote" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "13px 24px", borderRadius: "9999px", background: "linear-gradient(135deg,#ec4899,#f97316)", color: "#ffffff", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
              Get a Free Quote →
            </Link>
            <Link href="/catalog" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "13px 22px", borderRadius: "9999px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
              Browse Products
            </Link>
          </div>
        </div>

        {/* Main footer grid */}
        <div style={{ padding: "clamp(40px,5vw,56px) clamp(32px,4vw,56px)", display: "grid", gridTemplateColumns: "1.6fr 1.2fr 1fr", gap: "40px" }} className="footer-grid">

          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <img
                src="/logo.png"
                alt="Mercury Products Logo"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 0 10px rgba(0, 194, 255, 0.2)",
                  objectFit: "cover"
                }}
              />
              <span style={{ fontFamily: "'Times New Roman', Times, Georgia, serif", fontWeight: 700, fontSize: "16px", color: "#ffffff", letterSpacing: "0.01em" }}>{COMPANY_NAME}</span>
            </div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.42)", lineHeight: 1.7, margin: "0 0 20px 0", maxWidth: "220px" }}>
              Premium UV printing since 1990. Custom signage, display, stickers, and industrial packaging.
            </p>

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <a href={`tel:${COMPANY_PHONE}`} style={{ fontSize: "13px", color: "rgba(255,255,255,0.42)", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.42)")}>
                  Ph: {COMPANY_PHONE}
                </a>
                <a href={`tel:${COMPANY_PHONE_ALT}`} style={{ fontSize: "13px", color: "rgba(255,255,255,0.42)", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.42)")}>
                  Ph: {COMPANY_PHONE_ALT}
                </a>
                <a href={`tel:${COMPANY_PHONE_ALT2}`} style={{ fontSize: "13px", color: "rgba(255,255,255,0.42)", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.42)")}>
                  Ph: {COMPANY_PHONE_ALT2}
                </a>
              </div>
              <a href={`mailto:${COMPANY_EMAIL}`} style={{ fontSize: "13px", color: "rgba(255,255,255,0.42)", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.42)")}>
                {COMPANY_EMAIL}
              </a>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.42)" }}>{COMPANY_ADDRESS}</span>

              {/* Social links */}
              <div style={{ display: "flex", gap: "14px", marginTop: "12px" }}>
                <a href={COMPANY_INSTAGRAM} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "rgba(255,255,255,0.42)", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.42)")}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  Instagram
                </a>
                <a href={COMPANY_FACEBOOK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "rgba(255,255,255,0.42)", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.42)")}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Products & Services */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "16px", transition: "color 0.3s ease" }}>Products & Services</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "9px" }}>
              {[...productLinks.slice(0, 4), ...serviceLinks.slice(0, 4)].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link" style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.15s" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/catalog" style={{ fontSize: "13px", color: "#f472b6", textDecoration: "none", marginTop: "4px", display: "inline-block" }}>View all Catalog →</Link>
              </li>
            </ul>
          </div>

          {/* Resources — commented out for now */}
          {/* <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "16px", transition: "color 0.3s ease" }}>Resources</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "9px" }}>
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link" style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.15s" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Company */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "16px", transition: "color 0.3s ease" }}>Company</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "9px" }}>
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link" style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.15s" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div style={{ padding: "24px clamp(32px,4vw,56px)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", margin: "0 0 3px 0" }}>Print knowledge, delivered</p>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.38)", margin: 0 }}>New guides and material tips. Unsubscribe anytime.</p>
          </div>
          {subscribed ? (
            <p style={{ fontSize: "14px", color: "#4ade80", fontWeight: 600 }}>✓ You&apos;re subscribed!</p>
          ) : (
            <form onSubmit={handleNewsletter} style={{ display: "flex", gap: "8px" }}>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
                style={{ padding: "10px 16px", borderRadius: "9999px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", fontSize: "13px", outline: "none", fontFamily: "inherit", minWidth: "200px" }} />
              <button type="submit" style={{ padding: "10px 18px", borderRadius: "9999px", background: "#ffffff", color: "#000000", fontWeight: 700, fontSize: "13px", border: "none", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Bottom bar */}
        <div style={{ padding: "20px clamp(32px,4vw,56px)", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", margin: 0 }}>© 2026 {COMPANY_NAME}. All rights reserved.</p>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/privacy" style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>Privacy</Link>
            <Link href="/terms" style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>Terms</Link>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.18)" }}>UV Direct · Flex · Stickers · Display</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
