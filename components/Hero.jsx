"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0 -> 1

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollDistance = section.offsetHeight - window.innerHeight;

      const scrolled = -rect.top;
      const raw = scrolled / scrollDistance;
      const clamped = Math.min(Math.max(raw, 0), 1);

      setProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Circle grows from a small peephole to fully cover the screen
  const startRadius = 18;
  const endRadius = 75;
  const radius = startRadius + (endRadius - startRadius) * progress;

  const videoScale = 1.1 - progress * 0.1;

  // --- Text 1 (intro copy): visible early, fades out by ~35% scroll ---
  const text1Range = [0, 0.35];
  const text1Raw =
    1 - (progress - text1Range[0]) / (text1Range[1] - text1Range[0]);
  const text1Opacity = Math.min(Math.max(text1Raw, 0), 1);
  const text1TranslateY = (1 - text1Opacity) * -30; // drifts up as it fades

  // --- Text 2 (new copy over full-bleed video): fades/slides in from ~55% -> 85% ---
  const text2Range = [0.55, 0.85];
  const text2Raw =
    (progress - text2Range[0]) / (text2Range[1] - text2Range[0]);
  const text2Opacity = Math.min(Math.max(text2Raw, 0), 1);
  const text2TranslateY = (1 - text2Opacity) * 40; // rises into place

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative mt-10"
      style={{ height: "280vh" }}
    >
      <div className="sticky top-10 flex h-[calc(100vh-2.5rem)] items-center overflow-hidden bg-black">
        {/* Video, masked by an expanding circle */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `circle(${radius}% at 50% 50%)`,
            WebkitClipPath: `circle(${radius}% at 50% 50%)`,
          }}
        >
          <video
            className="h-full w-full object-cover"
            src="/Hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-poster.jpg"
            style={{ transform: `scale(${videoScale})` }}
          />
          <div
            className="absolute inset-0 bg-black/40"
            style={{ opacity: 0.4 - progress * 0.15 }}
          />
        </div>

        {/* Text 1: intro copy, left-aligned, fades out early */}
        <div
          className="relative z-10 max-w-xl px-6 text-left md:px-16"
          style={{
            opacity: text1Opacity,
            transform: `translateY(${text1TranslateY}px)`,
            pointerEvents: text1Opacity > 0.05 ? "auto" : "none",
          }}
        >
          <h1 className="font-display text-5xl font-medium leading-[1.02] tracking-tight md:text-7xl">
            CALCIUM CARBONATE
          </h1>
          <p className="mb-6 max-w-md text-lg text-muted pt-4">
            At Resol Industries, we are committed to providing reliable
            industrial materials through quality-focused sourcing, consistent
            product standards, dependable service and strong business
            relationships.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <a
              href="#contact"
              className="rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-85"
            >
              Book a call
            </a>
            <a
              href="#capabilities"
              className="text-sm text-muted transition-colors hover:text-paper"
            >
              See what we do
            </a>
          </div>
        </div>

        {/* Text 2: appears over the full-bleed video, left-aligned */}
        <div
          className="absolute inset-0 z-10 flex items-center"
          style={{ pointerEvents: text2Opacity > 0.05 ? "auto" : "none" }}
        >
          <div
            className="max-w-xl px-6 text-left md:px-16"
            style={{
              opacity: text2Opacity,
              transform: `translateY(${text2TranslateY}px)`,
            }}
          >
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-paper md:text-6xl">
              PRECISION AT EVERY STAGE
            </h2>
            <p className="mb-6 max-w-md text-lg text-muted pt-4">
              From sourcing to delivery, every batch is tested, tracked and
              tailored to the specifications your industry demands.
            </p>
            <div className="mt-10 flex items-center gap-6">
              <a
                href="#capabilities"
                className="rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-85"
              >
                Explore capabilities
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}