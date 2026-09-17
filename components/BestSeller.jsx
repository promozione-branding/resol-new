"use client"

import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    name: "Melamine",
    category: "Resin",
    description:
      "A fine, high-purity powder that strengthens laminates, adhesives, and moulded surfaces.",
    image:
      "https://www.resolindustries.com/wp-content/uploads/2026/01/Melamine-3.jpg",
  },
  {
    name: "Polyethylene",
    category: "Plastic",
    description:
      "Versatile thermoplastic pellets used across films, containers, and industrial moulding.",
    image:
      "https://www.resolindustries.com/wp-content/uploads/2026/01/Polyethylene.jpg",
  },
  {
    name: "Plasticizers",
    category: "Polythene",
    description:
      "Additives that improve flexibility and workability across plastic and rubber compounds.",
    image:
      "https://www.resolindustries.com/wp-content/uploads/2026/01/Plasticizers-1.jpg",
  },
  {
    name: "Paste Resin",
    category: "Resin",
    description:
      "Smooth PVC paste resin formulated for coatings, flooring, and synthetic leather.",
    image:
      "https://www.resolindustries.com/wp-content/uploads/2026/01/Paste-Resin-1.jpg",
  },
  {
    name: "PVC Stabilizers",
    category: "Additive",
    description:
      "Heat and light stabilizers that extend the working life of PVC compounds.",
    // placeholder image — swap in a dedicated product photo
    image:
      "https://www.resolindustries.com/wp-content/uploads/2026/01/Plasticizers-1.jpg",
  },
  {
    name: "Emulsion Resin",
    category: "Resin",
    description:
      "Fine emulsion-grade resin suited to coatings, adhesives, and textile finishing.",
    // placeholder image — swap in a dedicated product photo
    image:
      "https://www.resolindustries.com/wp-content/uploads/2026/01/Melamine-3.jpg",
  },
];

// Shortest signed distance from `index` to `current` on a circular track of
// length `total` — this is what lets the deck loop endlessly in both
// directions instead of snapping back at the ends.
function circularOffset(index, current, total) {
  let diff = index - current;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

function Card({ product, offset, onFocus }) {
  const distance = Math.abs(offset);
  const isCenter = offset === 0;
  const hidden = distance > 2;

  // Straight stack: cards shift sideways and shrink with distance, but
  // never tilt or rotate.
  const translateX = offset * 232;
  const translateY = isCenter ? 0 : distance === 1 ? 16 : 30;
  const scale = isCenter ? 1 : distance === 1 ? 0.86 : 0.72;
  const opacity = hidden ? 0 : isCenter ? 1 : distance === 1 ? 0.9 : 0.55;
  const zIndex = 20 - distance;

  return (
    <div
      className="absolute left-1/2 top-0 w-80 select-none"
      style={{
        transform: `translateX(-50%) translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
        opacity,
        zIndex,
        pointerEvents: hidden ? "none" : "auto",
        transition:
          "transform 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 550ms ease, z-index 0s",
      }}
    >
      <div
        onClick={() => !isCenter && onFocus()}
        role={isCenter ? undefined : "button"}
        tabIndex={isCenter ? -1 : 0}
        aria-hidden={hidden}
        className={`group relative flex flex-col overflow-hidden rounded-[1.75rem] border bg-white/10 backdrop-blur-xl ${
          isCenter
            ? "border-white/40 shadow-[0_32px_70px_-16px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.08)_inset]"
            : "border-white/15 shadow-[0_20px_45px_-18px_rgba(0,0,0,0.5)] cursor-pointer"
        }`}
      >
        {/* glass sheen */}
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-[1.75rem]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 22%, rgba(255,255,255,0) 45%)",
          }}
        />
        <div
          className="pointer-events-none absolute -inset-px z-10 rounded-[1.75rem]"
          style={{
            boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.5)",
          }}
        />

        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />
        </div>

        <div className="relative flex flex-1 flex-col gap-2 px-6 py-5">
          <span className="text-[11px] tracking-wide text-[#C79A5C]">
            {product.category}
          </span>
          <h3 className="text-xl font-semibold leading-snug text-white">
            {product.name}
          </h3>
          <p className="text-sm leading-relaxed text-white/70">
            {product.description}
          </p>
          <button
            className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/30 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:border-[#C79A5C] hover:text-[#C79A5C]"
            tabIndex={isCenter ? 0 : -1}
          >
            Read more
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductCoverflow() {
  const [current, setCurrent] = useState(0);
  const total = products.length;

  const goTo = useCallback(
    (i) => setCurrent(((i % total) + total) % total),
    [total]
  );
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // keyboard support
  const containerRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    const node = containerRef.current;
    node?.addEventListener("keydown", handler);
    return () => node?.removeEventListener("keydown", handler);
  }, [next, prev]);

  return (
    <section className="overflow-x-hidden bg-[#2A241A] py-20">
      <div
        ref={containerRef}
        tabIndex={0}
        className="mx-auto max-w-7xl px-6 outline-none"
      >
        <div className="mb-16 text-center">
          <span className="text-[11px] tracking-wide text-[#C79A5C]">
            Material catalog
          </span>
          <h2 className="mt-2 text-3xl font-semibold text-[#F4F1EA] md:text-4xl">
            Built from what we make
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="relative h-[410px]">
            {products.map((product, i) => (
              <Card
                key={product.name}
                product={product}
                offset={circularOffset(i, current, total)}
                onFocus={() => goTo(i)}
              />
            ))}
          </div>

          <button
            onClick={prev}
            aria-label="Previous product"
            className="absolute left-2 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#2A241A]/70 text-[#F4F1EA] backdrop-blur-md transition-colors hover:border-[#C79A5C] hover:text-[#C79A5C] md:left-6"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={next}
            aria-label="Next product"
            className="absolute right-2 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#2A241A]/70 text-[#F4F1EA] backdrop-blur-md transition-colors hover:border-[#C79A5C] hover:text-[#C79A5C] md:right-6"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2">
          {products.map((p, i) => (
            <button
              key={p.name}
              onClick={() => goTo(i)}
              aria-label={`Go to ${p.name}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === current ? 22 : 7,
                backgroundColor: i === current ? "#C79A5C" : "#4A4030",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}