"use client";

import { useEffect, useRef, useCallback, useState } from "react";
// Installed via: npx shadcn@latest add @react-bits/Ballpit-JS-CSS
// Adjust this import path if your CLI resolved it somewhere else.
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
    colors: [0xffffff, 0xb3e5fc, 0x0288d1], // keeping – working
  },
{
    id: 2,
    label: "Our Craft",
    heading: "Precision at the boundary of possibility",
    body: "Every system we build is the result of obsessive refinement. We don't ship until the interaction feels inevitable — until the gap between intention and outcome collapses. This is what craft means to us: not polish for its own sake, but clarity for the people who matter.",
    textSide: "right",
    accent: "#c1752f",
    accentDeep: "#7a441a",
    tint: "#0284c7",          // keep your current light navy
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
    tint: "#ff7a59",          // keep your current baby pink / light red
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
    tint: "#f1eefc",
    colors: [0x6c5ce7, 0x9d8ff2, 0x2f2470], // keeping – working
  },
];


function FloatingBallpit({ slotRefs }) {
  const wrapRef  = useRef(null);
  const posRef   = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const frameRef = useRef(null);
  const [colors, setColors] = useState(sections[0].colors);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const OVERSIZE = 1.4;

    const firstSlot = slotRefs.current[0];
    if (firstSlot) {
      const r = firstSlot.getBoundingClientRect();
      const w = r.width * OVERSIZE;
      const h = r.height * OVERSIZE;
      const x = r.left - (w - r.width) / 2;
      const y = r.top  - (h - r.height) / 2;
      posRef.current = { x, y, w, h };
      wrap.style.left   = `${x}px`;
      wrap.style.top    = `${y}px`;
      wrap.style.width  = `${w}px`;
      wrap.style.height = `${h}px`;
    }

    const update = () => {
      const vh = window.innerHeight;
      let bestScore = -Infinity;
      let target = null;
      let bestIndex = 0;

      slotRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect   = el.getBoundingClientRect();
        const slotCY = rect.top + rect.height / 2;
        const score  = -Math.abs(slotCY - vh / 2);
        if (score > bestScore) { bestScore = score; target = rect; bestIndex = i; }
      });

      if (target) {
        const prev = posRef.current;
        const k    = 0.085;

        const tw = target.width  * OVERSIZE;
        const th = target.height * OVERSIZE;
        const tx = target.left - (tw - target.width) / 2;
        const ty = target.top  - (th - target.height) / 2;

        const nx = prev.x + (tx - prev.x) * k;
        const ny = prev.y + (ty - prev.y) * k;
        const nw = prev.w + (tw - prev.w) * k;
        const nh = prev.h + (th - prev.h) * k;

        const slotCY  = target.top + target.height / 2;
        const dist    = Math.abs(slotCY - vh / 2);
        const opacity = Math.max(0, 1 - dist / (vh * 0.75));

        posRef.current = { x: nx, y: ny, w: nw, h: nh };
        wrap.style.left    = `${nx}px`;
        wrap.style.top     = `${ny}px`;
        wrap.style.width   = `${nw}px`;
        wrap.style.height  = `${nh}px`;
        wrap.style.opacity = opacity;

        // Only push a new `colors` prop when the active section actually
        // changes, so Ballpit isn't re-rendered every frame.
        if (bestIndex !== activeIndexRef.current) {
          activeIndexRef.current = bestIndex;
          setColors(sections[bestIndex].colors);
        }
      }

      frameRef.current = requestAnimationFrame(update);
    };

    frameRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameRef.current);
  }, [slotRefs]);

  return (
    <div
      ref={wrapRef}
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        width:         400,
        height:        400,
        pointerEvents: "none",
        zIndex:        10,
        opacity:       0,
      }}
    >
     <Ballpit
  className="w-full h-full"
  count={90}
  gravity={0}                 // ← key change: no settling
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
  const isLeft  = section.textSide === "left";

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.opacity    = "0";
    el.style.transform  = `translateX(${isLeft ? -60 : 60}px)`;
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity   = "1";
          el.style.transform = "translateX(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isLeft]);

  const bgColor = section.tint;

  const textBlock = (
    <div ref={textRef} className="flex flex-col gap-5 max-w-md ml-8">
      <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: section.accentDeep }}>
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
          background: `linear-gradient(100deg, #1a1a1a 0%, #1a1a1a 55%, ${section.accent} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {section.heading}
      </h3>
      <p
        className="text-[#5a6478] font-light leading-loose"
        style={{ fontSize: "1.05rem", maxWidth: "42ch" }}
      >
        {section.body}
      </p>
    </div>
  );

  const placeholder = (
    <div
      ref={slotRef}
      className="w-full"
      style={{ minHeight: 420, background: "transparent" }}
      aria-hidden="true"
    />
  );

  return (
    <section
      className="border-t border-black/[0.06] py-28 px-10 transition-colors duration-700"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {isLeft ? (
          <>
            {textBlock}
            {placeholder}
          </>
        ) : (
          <>
            {placeholder}
            <div className="md:justify-self-end">{textBlock}</div>
          </>
        )}
      </div>
    </section>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export default function About() {
  const slotRefs   = useRef([]);
  const setSlotRef = useCallback((el, i) => {
    slotRefs.current[i] = el;
  }, []);

  return (
    <div className="bg-[#00c4b5]" id="about">
      <FloatingBallpit slotRefs={slotRefs} />
      {sections.map((section, i) => (
        <AboutSection
          key={section.id}
          section={section}
          slotRef={(el) => setSlotRef(el, i)}
        />
      ))}
    </div>
  );
}