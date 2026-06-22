import { Suspense } from "react";
import ReviewForm from "@/components/ReviewForm";
import ReviewsList from "@/components/ReviewsList";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: "Read what our customers say about Mercury Products and share your own experience.",
};

export const revalidate = 60; // re-fetch reviews every 60 seconds

export default function ReviewsPage() {
  return (
    <Reveal>
      <div className="px-6 md:px-10 pt-12 pb-24">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xs font-semibold tracking-widest uppercase text-white/35">★ REVIEWS</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            What our <span className="gradient-text">customers say</span>.
          </h1>
          <p className="text-sm text-white/50 leading-relaxed mb-12 max-w-xl">
            Real experiences from real clients. We take every piece of feedback seriously.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

            {/* Submit form */}
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Share your experience</h2>
              <div className="rounded-3xl p-8" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}>
                <ReviewForm />
              </div>
            </div>

            {/* Reviews list */}
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Customer reviews</h2>
              <Suspense fallback={
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>Loading reviews…</div>
              }>
                <ReviewsList />
              </Suspense>
            </div>

          </div>
        </div>
      </div>
    </Reveal>
  );
}
