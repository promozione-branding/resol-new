"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Section Data ─────────────────────────────────────────────────────────────
// Each section carries its own accent so the page reads as a considered
// palette (steel blue → copper → teal → indigo) rather than one repeated hue.

const sections = [
  {
    id: 1,
    label: "Our Origin",
    heading: "Built on a single question",
    body: "We started in a rented studio with mismatched chairs and one shared monitor. The question on the whiteboard that day — 'what would this look like if it actually worked?' — never left. That question still drives every project we take on.",
    textSide: "left",
    accent: "#2f6fed",       // steel blue
    accentDeep: "#173a8a",
    tint: "#eef3fc",
  },
  {
    id: 2,
    label: "Our Craft",
    heading: "Precision at the boundary of possibility",
    body: "Every system we build is the result of obsessive refinement. We don't ship until the interaction feels inevitable — until the gap between intention and outcome collapses. This is what craft means to us: not polish for its own sake, but clarity for the people who matter.",
    textSide: "right",
    accent: "#c1752f",       // copper / industrial amber
    accentDeep: "#7a441a",
    tint: "#faf1e6",
  },
  {
    id: 3,
    label: "Our People",
    heading: "Diverse minds, singular focus",
    body: "We hire for curiosity first. Our team spans disciplines — engineers who sketch, designers who ship, researchers who argue. What holds us together is a shared intolerance for the good-enough and a belief that the best ideas arrive at the intersection of unlike things.",
    textSide: "left",
    accent: "#1f9d83",       // teal / lab green
    accentDeep: "#0d4238",
    tint: "#eaf6f2",
  },
  {
    id: 4,
    label: "Our Future",
    heading: "Toward something we haven't named yet",
    body: "We're not optimizing toward a roadmap; we're moving toward a feeling. The work ahead is harder, stranger, and more consequential than anything we've done. We're building the team and the tools to meet it — and we're looking for people who find that prospect exciting rather than frightening.",
    textSide: "right",
    accent: "#6c5ce7",       // indigo
    accentDeep: "#2f2470",
    tint: "#f1eefc",
  },
];

// ─── Three.js Hook ────────────────────────────────────────────────────────────
// colorTargetRef lets the parent tell the scene which section's accent to
// drift toward, so the object's color changes as you scroll between sections.

function useGlobalThree(canvasRef, colorTargetRef) {
  useEffect(() => {
    let animId;

    const init = async () => {
      const THREE = (await import("three")).default ?? (await import("three"));
      const canvas = canvasRef.current;
      if (!canvas) return;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.z = 5.2;

      const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(0.95, 0.30, 160, 24, 2, 3),
        new THREE.MeshStandardMaterial({
          color: 0x2f6fed,
          emissive: 0x173a8a,
          metalness: 0.85,
          roughness: 0.1,
        })
      );
      scene.add(knot);

      const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(2.0, 0.022, 8, 120),
        new THREE.MeshBasicMaterial({ color: 0x6c5ce7, transparent: true, opacity: 0.5 })
      );
      ring1.rotation.x = Math.PI / 3;
      scene.add(ring1);

      const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(2.5, 0.013, 8, 120),
        new THREE.MeshBasicMaterial({ color: 0x1f9d83, transparent: true, opacity: 0.28 })
      );
      ring2.rotation.x = -Math.PI / 5;
      ring2.rotation.z = Math.PI / 6;
      scene.add(ring2);

      const pCount = 500;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        const r     = 1.8 + Math.random() * 1.5;
        pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = r * Math.cos(phi);
        // particles cycle across the whole palette's hue range, not just blue
        const c = new THREE.Color().setHSL(Math.random(), 0.55, 0.62);
        pCol[i * 3] = c.r; pCol[i * 3 + 1] = c.g; pCol[i * 3 + 2] = c.b;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute("color",    new THREE.BufferAttribute(pCol, 3));
      const particles = new THREE.Points(
        pGeo,
        new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.7 })
      );
      scene.add(particles);

      const light1 = new THREE.PointLight(0x2f6fed, 7, 14);
      light1.position.set(3, 2, 3);
      scene.add(light1);

      const light2 = new THREE.PointLight(0x6c5ce7, 4, 10);
      light2.position.set(-3, -2, 2);
      scene.add(light2);

      scene.add(new THREE.AmbientLight(0x8eaaff, 1.0));

      const tmpColor = new THREE.Color();
      const tmpEmissive = new THREE.Color();

      let tick = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        tick += 0.006;
        knot.rotation.x += 0.004;
        knot.rotation.y += 0.007;
        ring1.rotation.y += 0.003;
        ring2.rotation.x += 0.002;
        particles.rotation.y += 0.001;
        light1.position.x = Math.sin(tick) * 3;
        light1.position.y = Math.cos(tick * 0.7) * 2;

        // Smoothly drift the knot + key light toward the active section's accent
        const target = colorTargetRef.current;
        if (target) {
          tmpColor.set(target.accent);
          tmpEmissive.set(target.accentDeep);
          knot.material.color.lerp(tmpColor, 0.04);
          knot.material.emissive.lerp(tmpEmissive, 0.04);
          light1.color.lerp(tmpColor, 0.04);
        }

        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (canvas.width !== w || canvas.height !== h) {
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        }
        renderer.render(scene, camera);
      };
      animate();
    };

    init();
    return () => { if (animId) cancelAnimationFrame(animId); };
  }, [colorTargetRef]);
}

// ─── Floating Canvas ──────────────────────────────────────────────────────────

function FloatingCanvas({ slotRefs }) {
  const canvasRef = useRef(null);
  const colorTargetRef = useRef({ accent: "#2f6fed", accentDeep: "#173a8a" });
  useGlobalThree(canvasRef, colorTargetRef);
  const posRef   = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const OVERSIZE = 1.4;

    const firstSlot = slotRefs.current[0];
    if (firstSlot) {
      const r = firstSlot.getBoundingClientRect();
      const w = r.width * OVERSIZE;
      const h = r.height * OVERSIZE;
      const x = r.left - (w - r.width) / 2;
      const y = r.top  - (h - r.height) / 2;
      posRef.current = { x, y, w, h };
      canvas.style.left   = `${x}px`;
      canvas.style.top    = `${y}px`;
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
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
        canvas.style.left    = `${nx}px`;
        canvas.style.top     = `${ny}px`;
        canvas.style.width   = `${nw}px`;
        canvas.style.height  = `${nh}px`;
        canvas.style.opacity = opacity;

        // Hand the nearest-to-center section's palette to the 3D scene
        const activeSection = sections[bestIndex];
        if (activeSection) {
          colorTargetRef.current = {
            accent: activeSection.accent,
            accentDeep: activeSection.accentDeep,
          };
        }
      }

      frameRef.current = requestAnimationFrame(update);
    };

    frameRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameRef.current);
  }, [slotRefs]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        width:         400,
        height:        400,
        pointerEvents: "none",
        zIndex:        10,
        opacity:       0,
        background:    "transparent",
      }}
    />
  );
}

// ─── About Hero ───────────────────────────────────────────────────────────────

function AboutHero() {
  return (
    <div className="bg-[#f4f1ea] border-b border-black/[0.06] py-24 px-6 text-center">
      <p className="text-[#2f6fed] text-xs font-semibold tracking-[0.22em] uppercase mb-5">
        Who we are
      </p>

<h2 
  className="font-bold leading-none tracking-tight mb-6 mx-auto" 
  style={{ 
    fontFamily: "'Playfair Display', Georgia, serif", 
    fontSize: "clamp(3rem, 8vw, 6rem)", 
    // Rich gold and black gradient for a premium look
    background: "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #000000 100%)", 
    WebkitBackgroundClip: "text", 
    WebkitTextFillColor: "transparent", 
    backgroundClip: "text", 
    maxWidth: "20ch", 
  }} 
> 
  About Us 
</h2>

      <p
        className="text-[#5a6478] font-light leading-relaxed mx-auto max-w-md"
        style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)" }}
      >
        A studio that builds at the edge of what's possible —<br />
        and finds that the edge keeps moving.
      </p>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

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

  // Background tint now follows each section's own accent family instead of
  // a flat cream/beige alternation, so the color shift reads as intentional.
  const bgColor = section.tint;

  const textBlock = (
    <div ref={textRef} className="flex flex-col gap-5 max-w-md">
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
    <div className="bg-[#f4f1ea]" id="about">
      <FloatingCanvas slotRefs={slotRefs} />
      <AboutHero />
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