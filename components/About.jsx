"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Section Data ─────────────────────────────────────────────────────────────

const sections = [
  {
    id: 1,
    label: "Our Origin",
    heading: "Built on a single question",
    body: "We started in a rented studio with mismatched chairs and one shared monitor. The question on the whiteboard that day — 'what would this look like if it actually worked?' — never left. That question still drives every project we take on.",
    textSide: "left",
  },
  {
    id: 2,
    label: "Our Craft",
    heading: "Precision at the boundary of possibility",
    body: "Every system we build is the result of obsessive refinement. We don't ship until the interaction feels inevitable — until the gap between intention and outcome collapses. This is what craft means to us: not polish for its own sake, but clarity for the people who matter.",
    textSide: "right",
  },
  {
    id: 3,
    label: "Our People",
    heading: "Diverse minds, singular focus",
    body: "We hire for curiosity first. Our team spans disciplines — engineers who sketch, designers who ship, researchers who argue. What holds us together is a shared intolerance for the good-enough and a belief that the best ideas arrive at the intersection of unlike things.",
    textSide: "left",
  },
  {
    id: 4,
    label: "Our Future",
    heading: "Toward something we haven't named yet",
    body: "We're not optimizing toward a roadmap; we're moving toward a feeling. The work ahead is harder, stranger, and more consequential than anything we've done. We're building the team and the tools to meet it — and we're looking for people who find that prospect exciting rather than frightening.",
    textSide: "right",
  },
];

// ─── Three.js Hook ────────────────────────────────────────────────────────────

function useGlobalThree(canvasRef) {
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
      // Slightly further back so the rings don't get clipped
      camera.position.z = 5.2;

      const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(0.95, 0.30, 160, 24, 2, 3),
        new THREE.MeshStandardMaterial({
          color: 0x3a7bd5,
          emissive: 0x1a3a80,
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
        new THREE.MeshBasicMaterial({ color: 0x3a7bd5, transparent: true, opacity: 0.28 })
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
        const c = new THREE.Color().setHSL(0.6 + Math.random() * 0.1, 0.8, 0.65);
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

      const light1 = new THREE.PointLight(0x3a7bd5, 7, 14);
      light1.position.set(3, 2, 3);
      scene.add(light1);

      const light2 = new THREE.PointLight(0x6c5ce7, 4, 10);
      light2.position.set(-3, -2, 2);
      scene.add(light2);

      scene.add(new THREE.AmbientLight(0x8eaaff, 1.0));

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
  }, []);
}

// ─── Floating Canvas ──────────────────────────────────────────────────────────

function FloatingCanvas({ slotRefs }) {
  const canvasRef = useRef(null);
  useGlobalThree(canvasRef);
  const posRef   = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // How much larger than the slot the canvas should be (prevents top/bottom crop)
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

      slotRefs.current.forEach((el) => {
        if (!el) return;
        const rect   = el.getBoundingClientRect();
        const slotCY = rect.top + rect.height / 2;
        const score  = -Math.abs(slotCY - vh / 2);
        if (score > bestScore) { bestScore = score; target = rect; }
      });

      if (target) {
        const prev = posRef.current;
        const k    = 0.085;

        // Target size is larger than the slot so geometry has room
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
        zIndex:        10,          // below navbar (z-20)
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
      <p className="text-[#3a7bd5] text-xs font-semibold tracking-[0.22em] uppercase mb-5">
        Who we are
      </p>

      <h2
        className="font-bold leading-none tracking-tight mb-6 mx-auto"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(3rem, 8vw, 6rem)",
          background: "linear-gradient(135deg, #1a1a1a 0%, #3a7bd5 50%, #6c5ce7 100%)",
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

  // Soft alternating light tones (not pure white)
  const bgColor = section.id % 2 !== 0 ? "#f4f1ea" : "#efebe3";

  const textBlock = (
    <div ref={textRef} className="flex flex-col gap-5 max-w-md">
      <span className="text-[#6c5ce7] text-xs font-semibold tracking-[0.2em] uppercase">
        {section.label}
      </span>
      <h3
        className="font-bold leading-snug tracking-tight text-[#1a1a1a]"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
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
      className="border-t border-black/[0.06] py-28 px-10"
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