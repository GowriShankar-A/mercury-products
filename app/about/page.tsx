import Link from "next/link";
import Reveal from "@/components/Reveal";

const team = [
  { name: "Murali S", role: "Founder", img: "/founder.jpeg" },
];

const values = [
  { icon: "⊙", title: "Color obsession", desc: "We calibrate our Komori presses daily and maintain the industry's widest Pantone coverage — 99% of all solid colors." },
  { icon: "✦", title: "Paper first", desc: "Before any job runs, we test the paper's coating, grain direction, and moisture content. Stock quality is non-negotiable." },
  { icon: "↗", title: "Radical transparency", desc: "Every quote includes a full breakdown of materials and labor. No hidden die charges, no bait-and-switch paper swaps." },
  { icon: "♻", title: "FSC & ISO 9001", desc: "All our papers are FSC-certified. Our facility runs on 100% renewable energy and recycles 98% of press waste." },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <Reveal>
        <section className="px-6 md:px-10 pt-12 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold tracking-widest uppercase text-white/35">✦ ABOUT MERCURY</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                  A press built by <span className="gradient-text-3">designers</span>, for designers.
                </h1>
                <p className="text-base text-white/50 leading-relaxed mb-8">
                  We are pleased to introduce ourselves as a trusted name in the printing industry, with over three decades of experience since 1990. Mercury Products was a monopoly at Coimbatore in the 90's in the printing field. We specialize in delivering high-quality printing solutions tailored to meet our clients’ specific design requirements, all at competitive and affordable prices.
                </p>
                <p className="text-base text-white/50 leading-relaxed mb-8">
                  Our commitment to quality, customization, and timely delivery has helped us build strong relationships with clients across Tamilnadu. We take pride in our ability to meet strict deadlines without compromising on standards.
                </p>
                <p className="text-base text-white/50 leading-relaxed mb-8">
                  Over the years, we have had the privilege of working with leading corporate giants such as Airtel, Vodafone, Jio, Aircel, Suguna Chicken, and Blackberry. Our extensive experience across diverse industries enables us to understand and fulfill varied business needs effectively.
                </p>
                <p className="text-base text-white/50 leading-relaxed mb-8">
                  We would welcome the opportunity to collaborate with your esteemed organization and support your printing requirements with reliable and cost-effective solutions.
                </p>
                <p className="text-base text-white/50 leading-relaxed mb-8">
                  Warm regards,<br />Mercury Products
                </p>
                <div className="flex flex-wrap gap-6">
                  {[{ v: "1990", l: "FOUNDED" }, { v: "30+", l: "CRAFTERS" }, { v: "1 Head City", l: "STUDIOS" }, { v: "1M+", l: "PIECES PRESSED" }].map((s) => (
                    <div key={s.l}>
                      <p className="text-3xl font-bold gradient-text">{s.v}</p>
                      <p className="text-xs tracking-widest uppercase text-white/35 mt-1">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Certification badge */}
              <div className="shrink-0 px-6 py-4 rounded-2xl self-start"
                style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Values */}
      <Reveal delayMs={120}>
        <section className="px-6 md:px-10 mb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-10">
              What we <span className="gradient-text">stand for</span>.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.map((v) => (
                <div key={v.title} className="card p-7">
                  <span className="text-2xl mb-4 block gradient-text">{v.icon}</span>
                  <h3 className="font-bold text-white text-lg mb-2">{v.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Team */}
      <Reveal delayMs={160}>
        <section className="px-6 md:px-10 mb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center">
              The founder <span className="gradient-text-2">behind the press</span>.
            </h2>
            <div className="flex justify-center gap-6">
              {team.map((t) => (
                <div key={t.name} className="group max-w-xs text-center">
                  <div className="rounded-2xl overflow-hidden mb-3 border border-white/10" style={{ aspectRatio: "4/5" }}>
                    <img src={t.img} alt={t.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <p className="font-semibold text-white text-base">{t.name}</p>
                  <p className="text-xs text-white/40 mt-1">{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal delayMs={200}>
        <section className="px-6 md:px-10 mb-24">
          <div className="max-w-6xl mx-auto rounded-3xl p-10 md:p-16 text-center"
            style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Ready to press something <span className="gradient-text">unforgettable</span>?
            </h2>
            <p className="text-sm text-white/45 mb-8 max-w-md mx-auto leading-relaxed">
              Studio visits welcome Mon–Sat. Come see the presses in person — bring your files, leave with a plan.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/quote"
                className="gradient-btn flex items-center gap-2 text-sm font-semibold px-8 py-3.5 rounded-full text-white">
                Start a Project →
              </Link>
              <Link href="/contact"
                className="flex items-center gap-2 text-sm font-medium px-8 py-3.5 rounded-full text-white/70 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
