import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { blogPosts } from "@/lib/blog";
import { SITE_URL, COMPANY_NAME } from "@/lib/products";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ${COMPANY_NAME}`,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      images: [{ url: post.img, width: 1200, height: 630, alt: post.title }],
    },
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "clamp(40px,6vw,80px) 24px 120px" }}>
      {/* Back button & Category */}
      <Reveal>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
          <Link
            href="/blog"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-muted)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "color 0.2s ease",
            }}
            className="nav-text-hover"
          >
            ← Back to Knowledge Base
          </Link>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-dim)",
            }}
          >
            {post.category}
          </span>
        </div>
      </Reveal>

      {/* Main Title */}
      <Reveal delayMs={40}>
        <h1
          style={{
            fontSize: "clamp(32px,5vw,52px)",
            fontWeight: 800,
            color: "var(--text-primary)",
            letterSpacing: "-0.025em",
            lineHeight: 1.15,
            margin: "0 0 24px 0",
            transition: "color 0.4s var(--ease-premium)",
          }}
        >
          {post.title}
        </h1>
      </Reveal>

      {/* Post Meta Info */}
      <Reveal delayMs={80}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "13px",
            color: "var(--text-muted)",
            marginBottom: "40px",
            paddingBottom: "24px",
            borderBottom: "1px solid var(--card-border)",
            transition: "color 0.4s ease, border-color 0.4s ease",
          }}
        >
          <span>{formatDate(post.date)}</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>{post.readTime}</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <div style={{ display: "flex", gap: "6px" }}>
            {post.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  padding: "2px 8px",
                  borderRadius: "9999px",
                  background: "var(--thickness-bg)",
                  color: "var(--text-primary)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Featured Image */}
      <Reveal delayMs={120}>
        <div style={{ borderRadius: "24px", overflow: "hidden", aspectRatio: "16/9", marginBottom: "48px", boxShadow: "0 12px 40px rgba(0,0,0,0.15)" }}>
          <img
            src={post.img}
            alt={post.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </Reveal>

      {/* Main Content */}
      <Reveal delayMs={160}>
        <article
          style={{
            fontSize: "16px",
            lineHeight: 1.8,
            color: "var(--text-muted)",
            transition: "color 0.4s ease",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "32px", lineHeight: 1.6 }}>
            {post.excerpt}
          </p>

          <p style={{ marginBottom: "24px" }}>
            UV printing represents a massive leap forward from conventional solvent or water-based digital printing.
            By deploying specialized ultraviolet lamps directly behind the ink heads, the ink is cured and solidified
            instantaneously. This eliminates evaporation, dry-time delays, and allows printing on rigid surfaces
            such as acrylic, wood, sunpack, glass, and metal composite sheets with zero distortion.
          </p>

          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", margin: "40px 0 20px 0" }}>
            Instant Cure, Endless Substrates
          </h2>
          <p style={{ marginBottom: "24px" }}>
            Because the inks cure via a photochemical reaction rather than heat or evaporation, the process remains extremely
            cool. This means delicate or heat-sensitive substrates can be branded safely. Instant curing also traps the pigment,
            preventing bleeding or absorption into porous boards—producing ultra-crisp microtext and high-definition details.
          </p>

          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", margin: "40px 0 20px 0" }}>
            The Environmental Edge
          </h2>
          <p style={{ marginBottom: "32px" }}>
            Traditional solvent prints emit heavy VOCs (Volatile Organic Compounds) during dry times. UV printing is virtually
            VOC-free and does not emit hazardous chemicals, making it exceptionally safe for indoor signs, commercial fixtures,
            and healthcare displays.
          </p>

          {/* Call to Action */}
          <div
            style={{
              marginTop: "56px",
              padding: "36px",
              borderRadius: "24px",
              background: "linear-gradient(135deg, rgba(236,72,153,0.06), rgba(249,115,22,0.06))",
              border: "1px solid var(--card-border)",
              textAlign: "center",
              transition: "border-color 0.4s ease",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 12px 0" }}>
              Have a UV printing project in mind?
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "24px", lineHeight: 1.5 }}>
              Our expert fabrication team handles custom sizing, shape routing, and multi-layer spot UV varnish.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
              <Link
                href="/quote"
                style={{
                  padding: "10px 22px",
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg,#ec4899,#f97316)",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "13px",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(236,72,153,0.3)",
                }}
              >
                Get a Custom Quote
              </Link>
              <Link
                href="/catalog"
                style={{
                  padding: "10px 22px",
                  borderRadius: "9999px",
                  background: "var(--thickness-bg)",
                  color: "var(--text-primary)",
                  fontWeight: 600,
                  fontSize: "13px",
                  textDecoration: "none",
                  border: "1px solid var(--card-border)",
                }}
              >
                View Catalog
              </Link>
            </div>
          </div>
        </article>
      </Reveal>
    </div>
  );
}
