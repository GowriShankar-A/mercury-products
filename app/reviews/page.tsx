import { Suspense } from "react";
import Image from "next/image";
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
            <span className="text-xs font-semibold tracking-widest uppercase text-[#0a1628]/35">★ REVIEWS</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            What our <span className="gradient-text">customers say</span>.
          </h1>
          <p className="text-sm text-[#0a1628]/50 leading-relaxed mb-10 max-w-xl">
            Real experiences from real clients. We take every piece of feedback seriously.
          </p>

          {/* Google Review QR Banner */}
          <div
            className="mb-14 rounded-3xl overflow-hidden flex flex-col sm:flex-row items-center gap-8 p-8 sm:p-10"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(220, 255, 255, 0.75) 100%)",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
            }}
          >
            {/* QR Code */}
            <div
              className="shrink-0 rounded-2xl overflow-hidden"
              style={{
                background: "#ffffff",
                padding: "14px",
                boxShadow: "0 0 0 4px rgba(66,133,244,0.15), 0 8px 32px rgba(0,0,0,0.08)",
              }}
            >
              <Image
                src="/qr1.png"
                alt="Google Review QR Code for Mercury Products"
                width={160}
                height={160}
                className="block"
                style={{ borderRadius: "6px" }}
              />
            </div>

            {/* Text content */}
            <div className="flex flex-col gap-3 text-center sm:text-left">
              {/* Google logo text */}
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
                  <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
                  <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
                  <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
                </svg>
                <span className="font-bold text-[#0a1628] text-lg tracking-tight">Google Reviews</span>
              </div>

              <p className="text-2xl font-bold text-[#0a1628] leading-snug">
                Loved our service?<br />
                <span style={{ color: "#4285F4" }}>Leave us a review!</span>
              </p>
              <p className="text-sm text-[#0a1628]/50 max-w-xs">
                Scan the QR code with your phone camera to write a review for Mercury Products on Google — it only takes 30 seconds.
              </p>

              {/* Rating stars decoration */}
              <div className="flex items-center gap-1 justify-center sm:justify-start mt-1">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="#FBBC05">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
                <span className="text-xs text-[#0a1628]/40 ml-2">Mercury Products</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

            {/* Submit form */}
            <div>
              <h2 className="text-xl font-bold text-[#0a1628] mb-6">Share your experience</h2>
              <div className="rounded-3xl p-8" style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)" }}>
                <ReviewForm />
              </div>
            </div>

            {/* Reviews list */}
            <div>
              <h2 className="text-xl font-bold text-[#0a1628] mb-6">Customer reviews</h2>
              <Suspense fallback={
                <div style={{ color: "rgba(10,22,40,0.3)", fontSize: "14px" }}>Loading reviews…</div>
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
