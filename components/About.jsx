
"use client";

import { useEffect, useRef, useCallback, useState } from "react";
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

function FloatingBallpit({ slotRefs }) {
  const wrapRef = useRef(null);
  const posRef = useRef({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  });

  const frameRef = useRef(null);

  const [colors, setColors] = useState(sections[0].colors);

  const activeIndexRef = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;

    if (!wrap) return;

    const firstSlot = slotRefs.current[0];

    if (firstSlot) {
      const r = firstSlot.getBoundingClientRect();

      const w = r.width;
      const h = r.height;
      const x = r.left;
      const y = r.top;

      posRef.current = {
        x,
        y,
        w,
        h,
      };

      wrap.style.left = `${x}px`;
      wrap.style.top = `${y}px`;
      wrap.style.width = `${w}px`;
      wrap.style.height = `${h}px`;
    }

    const update = () => {
      const vh = window.innerHeight;

      let bestScore = -Infinity;
      let target = null;
      let bestIndex = 0;

      slotRefs.current.forEach((el, i) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();

        const slotCY = rect.top + rect.height / 2;

        const score = -Math.abs(slotCY - vh / 2);

        if (score > bestScore) {
          bestScore = score;
          target = rect;
          bestIndex = i;
        }
      });

      if (target) {
        const prev = posRef.current;

        const k = 0.085;

        const tw = target.width;
        const th = target.height;
        const tx = target.left;
        const ty = target.top;

        const nx = prev.x + (tx - prev.x) * k;
        const ny = prev.y + (ty - prev.y) * k;
        const nw = prev.w + (tw - prev.w) * k;
        const nh = prev.h + (th - prev.h) * k;

        const slotCY = target.top + target.height / 2;

        const dist = Math.abs(slotCY - vh / 2);

        const opacity = Math.max(
          0,
          1 - dist / (vh * 0.75)
        );

        posRef.current = {
          x: nx,
          y: ny,
          w: nw,
          h: nh,
        };

        wrap.style.left = `${nx}px`;
        wrap.style.top = `${ny}px`;
        wrap.style.width = `${nw}px`;
        wrap.style.height = `${nh}px`;
        wrap.style.opacity = opacity;

        if (bestIndex !== activeIndexRef.current) {
          activeIndexRef.current = bestIndex;

          setColors(sections[bestIndex].colors);
        }
      }

      frameRef.current = requestAnimationFrame(update);
    };

    frameRef.current = requestAnimationFrame(update);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [slotRefs]);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "fixed",

        top: 0,
        left: 0,

        width: 400,
        height: 400,

        pointerEvents: "none",

        zIndex: 10,

        opacity: 0,

        // Allows balls to render outside the container
        overflow: "visible",
      }}
    >
      <Ballpit
        className="w-full h-full"
        count={90}
        gravity={0}
        friction={0.9975}
        wallBounce={0.99}
        followCursor={false}
        colors={colors}
      />
    </div>
  );
}

function AboutSection({ section, slotRef }) {
  const textRef = useRef(null);

  const isLeft = section.textSide === "left";

  useEffect(() => {
    const el = textRef.current;

    if (!el) return;

    // Initial animation state
    el.style.opacity = "0";

    el.style.transform = `translateX(${
      isLeft ? -60 : 60
    }px)`;

    el.style.transition =
      "opacity 0.8s ease, transform 0.8s ease";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";

          el.style.transform = "translateX(0)";

          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [isLeft]);

  const textBlock = (
    <div
      ref={textRef}
      className="flex flex-col gap-5 max-w-md ml-8"
      style={{
        // Keep text above Ballpit
        position: "relative",
        zIndex: 20,
      }}
    >
      {/* Section Label */}
      <span
        className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase"
        style={{
          color: "#ffffff",
        }}
      >
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: section.accent,
          }}
          aria-hidden="true"
        />

        {section.label}
      </span>

      {/* Heading */}
      <h3
        className="font-bold leading-snug tracking-tight"
        style={{
          fontFamily:
            "'Playfair Display', Georgia, serif",

          fontSize:
            "clamp(1.75rem, 3.2vw, 2.5rem)",

          // SOLID WHITE TEXT
          color: "#ffffff",

          // Prevent gradient/background from affecting text
          background: "none",
          backgroundImage: "none",

          WebkitBackgroundClip: "initial",
          backgroundClip: "initial",

          WebkitTextFillColor: "#ffffff",
        }}
      >
        {section.heading}
      </h3>

      {/* Body */}
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
  );

  // Placeholder occupies the Ballpit column
  const placeholder = (
    <div
      ref={slotRef}
      className="w-full"
      style={{
        minHeight: 420,

        background: "transparent",

        position: "relative",

        zIndex: 5,

        // Keep balls away from text
        ...(isLeft
          ? {
              paddingLeft: "24px",
            }
          : {
              paddingRight: "24px",
            }),
      }}
      aria-hidden="true"
    />
  );

  return (
    <section
      className="border-t py-28 px-10 transition-colors duration-700"
      style={{
        backgroundColor: section.tint,

        borderColor:
          "rgba(255,255,255,0.15)",
      }}
    >
      <div
        className="
          max-w-5xl
          mx-auto
          grid
          grid-cols-1
          md:grid-cols-2
          gap-16
          items-center
        "
      >
        {isLeft ? (
          <>
            {textBlock}
            {placeholder}
          </>
        ) : (
          <>
            {placeholder}

            <div className="md:justify-self-end">
              {textBlock}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Root Export
// ─────────────────────────────────────────────

export default function About() {
  const slotRefs = useRef([]);

  const setSlotRef = useCallback((el, i) => {
    slotRefs.current[i] = el;
  }, []);

  return (
    <div id="about">
      {/* Floating Ballpit */}
      <FloatingBallpit
        slotRefs={slotRefs}
      />

      {/* About Sections */}
      {sections.map((section, i) => (
        <AboutSection
          key={section.id}
          section={section}
          slotRef={(el) =>
            setSlotRef(el, i)
          }
        />
      ))}
    </div>
  );
}
