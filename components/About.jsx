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
    // Deep indigo night sky — warm gold/amber balls pop beautifully against it
    accent: "#e8a020",
    accentDeep: "#f5c842",
    tint: "#0d1b3e",           // deep midnight indigo background
    headingGradientStart: "#f0e6c8",
    headingGradientEnd: "#e8a020",
    labelColor: "#f5c842",
    bodyColor: "#fff",
    colors: [0xf5c842, 0xe8a020, 0xfff2c0, 0xc87b20], // gold / amber / cream / bronze
  },
  {
    id: 2,
    label: "Our Craft",
    heading: "Precision at the boundary of possibility",
    body: "Every system we build is the result of obsessive refinement. We don't ship until the interaction feels inevitable — until the gap between intention and outcome collapses. This is what craft means to us: not polish for its own sake, but clarity for the people who matter.",
    textSide: "right",
    // Dark forest — sage, mint, chartreuse balls feel alive and botanical
    accent: "#5ecf8a",
    accentDeep: "#a8e6c2",
    tint: "#081c12",           // deep forest green background
    headingGradientStart: "#d4f5e2",
    headingGradientEnd: "#5ecf8a",
    labelColor: "#a8e6c2",
    bodyColor: "#fff",
    colors: [0x5ecf8a, 0xc8f5d8, 0x2a7a4f, 0xe8faf0], // sage / mint / emerald / near-white
  },
  {
    id: 3,
    label: "Our People",
    heading: "Diverse minds, singular focus",
    body: "We hire for curiosity first. Our team spans disciplines — engineers who sketch, designers who ship, researchers who argue. What holds us together is a shared intolerance for the good-enough and a belief that the best ideas arrive at the intersection of unlike things.",
    textSide: "left",
    // Deep burgundy — rose, blush, coral feel warm and human
    accent: "#e8607a",
    accentDeep: "#f5a0b0",
    tint: "#1a0812",           // deep burgundy/plum background
    headingGradientStart: "#fce8ec",
    headingGradientEnd: "#e8607a",
    labelColor: "#f5a0b0",
    bodyColor: "#fff",
    colors: [0xe8607a, 0xf5b8c4, 0xfce8ec, 0xb83050], // rose / blush / petal / crimson
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
    headingGradientStart: "#1a1a1a",
    headingGradientEnd: "#6c5ce7",
    labelColor: "#6c5ce7",
    bodyColor: "#5a6478",
    colors: [0x6c5ce7, 0x9d8ff2, 0x2f2470],
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

    const OVERSIZE = 1.0; // No oversize needed — overflow:visible handles ball spillage

    const firstSlot = slotRefs.current[0];
    if (firstSlot) {
      const r = firstSlot.getBoundingClientRect();
      const w = r.width;
      const h = r.height;
      const x = r.left;
      const y = r.top;
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

        const tw = target.width;
        const th = target.height;
        const tx = target.left;
        const ty = target.top;

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
        // KEY FIX: allow balls to render outside the container bounds
        overflow:      "visible",
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
  const isLeft  = section.textSide === "left";

  // Detect dark background sections for text color logic
  const isDark = ["#0d1b3e", "#081c12", "#1a0812"].includes(section.tint);

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

  const textBlock = (
    <div
      ref={textRef}
      className="flex flex-col gap-5 max-w-md ml-8"
      style={{
        // KEY FIX: text sits above the ballpit layer (z-index 10)
        position: "relative",
        zIndex: 20,
      }}
    >
      <span
        className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase"
        style={{ color: section.labelColor }}
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
          background: `linear-gradient(100deg, ${section.headingGradientStart} 0%, ${section.headingGradientStart} 55%, ${section.headingGradientEnd} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {section.heading}
      </h3>
      <p
        className="font-light leading-loose"
        style={{
          fontSize: "1.05rem",
          maxWidth: "42ch",
          color: section.bodyColor,
        }}
      >
        {section.body}
      </p>
    </div>
  );

  // Placeholder occupies the ballpit column — add a gap buffer on the inner edge
  // so the ballpit never bleeds into the text column
  const placeholder = (
    <div
      ref={slotRef}
      className="w-full"
      style={{
        minHeight: 420,
        background: "transparent",
        position: "relative",
        zIndex: 5,
        // Inset the slot slightly from the text side so balls don't crowd the copy
        ...(isLeft
          ? { paddingLeft: "24px" }   // slot is on right, pad away from text on left
          : { paddingRight: "24px" }  // slot is on left, pad away from text on right
        ),
      }}
      aria-hidden="true"
    />
  );

  return (
    <section
      className="border-t py-28 px-10 transition-colors duration-700"
      style={{
        backgroundColor: section.tint,
        borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
      }}
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
    <div id="about">
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