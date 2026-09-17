"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

// Resol's actual product categories and photography, pulled from
// resolindustries.com's "Our Product Categories" section.
const categories = [
  {
    heading: "Polymers (PVC, PE, PP etc.)",
    paragraph: "Versatile base materials used across a wide range of industries.",
    image: "https://www.resolindustries.com/wp-content/uploads/2026/01/Polymers.jpg",
  },
  {
    heading: "Pet Resin",
    paragraph: "Premium-grade PET resin for packaging and industrial applications.",
    image: "https://www.resolindustries.com/wp-content/uploads/2026/04/pet-resin.jpg",
  },
  {
    heading: "Calcium Carbonate",
    paragraph: "A widely used filler that improves product durability.",
    image: "https://www.resolindustries.com/wp-content/uploads/2026/01/Calcium-Carbonate.jpg",
  },
  {
    heading: "Citric Acid",
    paragraph: "A key ingredient across food and pharmaceutical manufacturing.",
    image: "https://www.resolindustries.com/wp-content/uploads/2026/01/Citric-Acid-2.jpg",
  },
  {
    heading: "Plasticizers",
    paragraph: "Additives that enhance the flexibility and strength of polymers.",
    image: "https://www.resolindustries.com/wp-content/uploads/2026/01/Plasticizers-2.jpg",
  },
  {
    heading: "Melamine",
    paragraph: "A crucial additive that improves polymer performance.",
    image: "https://www.resolindustries.com/wp-content/uploads/2026/01/Melamine-2.jpg",
  },
];

// One typeface for structure, one for reading — Space Grotesk's squared-off
// forms read as technical/industrial, Inter stays quiet underneath it.
const FONT_HEADING = "'Space Grotesk', 'Segoe UI', sans-serif";
const FONT_BODY = "'Inter', 'Segoe UI', sans-serif";

function CategoryCard({ heading, paragraph, image, index }) {
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const timeline = useRef(null);

  useEffect(() => {
    // Starting state: soft-focus image, dimmed, copy resting low with the
    // paragraph tucked away. Built once so hover just plays/reverses it —
    // no re-triggering, no jank if the pointer moves in and out quickly.
    gsap.set(imageRef.current, {
      filter: "blur(16px) brightness(0.6) saturate(0.85)",
      scale: 1.18,
    });
    gsap.set(paragraphRef.current, { y: 12, opacity: 0 });
    gsap.set(overlayRef.current, { opacity: 0.82 });

    timeline.current = gsap
      .timeline({ paused: true, defaults: { ease: "power3.out" } })
      .to(
        imageRef.current,
        { filter: "blur(0px) brightness(0.92) saturate(1.05)", scale: 1.05, duration: 1.1 },
        0
      )
      .to(overlayRef.current, { opacity: 0.32, duration: 0.9 }, 0)
      .to(headingRef.current, { y: -6, duration: 0.7 }, 0)
      .to(paragraphRef.current, { y: 0, opacity: 1, duration: 0.55 }, 0.1);

    return () => timeline.current?.kill();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      onHoverStart={() => timeline.current?.play()}
      onHoverEnd={() => timeline.current?.reverse()}
      className="relative flex h-[22rem] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_-18px_rgba(6,40,25,0.4)]"
    >
      <div
        ref={imageRef}
        style={{ backgroundImage: `url(${image})` }}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
      />

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-emerald-950/10"
      />

      <div className="relative z-10 p-7">
        <h3
          ref={headingRef}
          style={{ fontFamily: FONT_HEADING }}
          className="text-[1.4rem] font-semibold leading-tight tracking-[-0.015em] text-white"
        >
          {heading}
        </h3>
        <p
          ref={paragraphRef}
          style={{ fontFamily: FONT_BODY }}
          className="mt-3 max-w-[32ch] text-[0.95rem] font-normal leading-relaxed text-white/85"
        >
          {paragraph}
        </p>
      </div>
    </motion.div>
  );
}

export default function CategoryGrid() {
  // Loads the two typefaces once. If your app already ships fonts globally
  // (e.g. next/font, an index.html <link>), delete this effect and the
  // FONT_HEADING / FONT_BODY constants above, and wire up real font vars.
  useEffect(() => {
    const id = "category-grid-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <section className="bg-emerald-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-xl"
        >
          <h2
            style={{ fontFamily: FONT_HEADING }}
            className="text-3xl font-semibold tracking-[-0.02em] text-emerald-950 md:text-4xl"
          >
            Our Product Categories
          </h2>
          <p
            style={{ fontFamily: FONT_BODY }}
            className="mt-3 text-[1.05rem] leading-relaxed text-emerald-950/70"
          >
            Explore our wide range of polymer industry products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <CategoryCard key={category.heading} index={i} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}