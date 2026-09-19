"use client";

import { useEffect, useRef } from "react";
import { Ballpit } from "@/components/Ballpit";

const sections = [
  {
    id: 1,
    label: "Our Origin",
    heading: "Built on a single question",
    body: "We started in a rented studio with mismatched chairs and one shared monitor. The question on the whiteboard that day — 'what would this look like if it actually worked?' — never left. That question still drives every project we take on.",
    textSide: "left",
    accent: "#2f6fed",
    accentDeep: "#173a8a",
    tint: "#00c4b5",
    colors: [0xffffff, 0xb3e5fc, 0x0288d1],
  },
  {
    id: 2,
    label: "Our Craft",
    heading: "Precision at the boundary of possibility",
    body: "Every system we build is the result of obsessive refinement. We don't ship until the interaction feels inevitable — until the gap between intention and outcome collapses. This is what craft means to us: not polish for its own sake, but clarity for the people who matter.",
    textSide: "right",
    accent: "#c1752f",
    accentDeep: "#7a441a",
    tint: "#0284c7",
    colors: [0xfff5e6, 0xf0c27a, 0xb87333],
  },
  {
    id: 3,
    label: "Our People",
    heading: "Diverse minds, singular focus",
    body: "We hire for curiosity first. Our team spans disciplines — engineers who sketch, designers who ship, researchers who argue. What holds us together is a shared intolerance for the good-enough and a belief that the best ideas arrive at the intersection of unlike things.",
    textSide: "left",
    accent: "#1f9d83",
    accentDeep: "#0d4238",
    tint: "#ff7a59",
    colors: [0xffffff, 0xffc1b3, 0xd4503c],
  },
  {
    id: 4,
    label: "Our Future",
    heading: "Toward something we haven't named yet",
    body: "We're not optimizing toward a roadmap; we're moving toward a feeling. The work ahead is harder, stranger, and more consequential than anything we've done. We're building the team and the tools to meet it — and we're looking for people who find that prospect exciting rather than frightening.",
    textSide: "right",
    accent: "#6c5ce7",
    accentDeep: "#2f2470",
    tint: "#6c5ce7",
    colors: [0x6c5ce7, 0x9d8ff2, 0x2f2470],
  },
];

function AboutSection({ section }) {
  const textRef = useRef(null);
  const isLeft = section.textSide === "left";

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = `translateX(${isLeft ? -60 : 60}px)`;
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateX(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isLeft]);

  return (
    <section
      className="border-t transition-colors duration-700"
      style={{
        backgroundColor: section.tint,
        borderColor: "rgba(255,255,255,0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: isLeft ? "50%" : 0,
          right: isLeft ? 0 : "50%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Ballpit
          className="w-full h-full"
          count={90}
          gravity={0}
          friction={0.9975}
          wallBounce={0.99}
          followCursor={false}
          colors={section.colors}
        />
      </div>

      <div
        className="relative max-w-7xl mx-auto py-28 px-10"
        style={{ zIndex: 10 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: isLeft ? "flex-start" : "flex-end",
          }}
        >
          <div
            ref={textRef}
            className="flex flex-col gap-5"
            style={{
              width: "50%",
              paddingRight: isLeft ? "3rem" : 0,
              paddingLeft: isLeft ? 0 : "3rem",
            }}
          >
            <span
              className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#ffffff" }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: section.accent }}
                aria-hidden="true"
              />
              {section.label}
            </span>

            <h3
              className="font-bold leading-snug tracking-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
                color: "#ffffff",
                background: "none",
                backgroundImage: "none",
                WebkitBackgroundClip: "initial",
                backgroundClip: "initial",
                WebkitTextFillColor: "#ffffff",
              }}
            >
              {section.heading}
            </h3>

            <p
              className="font-light leading-loose"
              style={{
                fontSize: "1.05rem",
                maxWidth: "42ch",
                color: "#ffffff",
              }}
            >
              {section.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div id="about">
      {sections.map((section) => (
        <AboutSection key={section.id} section={section} />
      ))}
    </div>
  );
}