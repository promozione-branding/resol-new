"use client";

import { motion } from "framer-motion";

const BG_IMAGE =
  "https://bridgelanding.qodeinteractive.com/wp-content/uploads/2024/01/bridge-bg-img-1.jpg";

const cards = [
  {
    heading: "Premium Quality Assurance",
    paragraph:
      "Strict quality control with batch-wise COAs and third-party lab testing ensures top-grade polymers in every single shipment.",
    preview: {
      type: "stacked-photos",
      images: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
        "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&q=80",
      ],
    },
  },
  {
    heading: "Pan-India Delivery Network",
    paragraph:
      "A strong distribution network backed by our state-of-the-art facility at Reliance MET, Jhajjar ensures reliable, on-time delivery across India.",
    preview: {
      type: "panel",
      title: "Welcome to Qode Help Center",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
      badge:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&q=80",
    },
  },
  {
    heading: "20+ Years of Industry Trust",
    paragraph:
      "Serving pipes & fittings, footwear, packaging, coatings and more since 2005 — built on integrity and long-term relationships.",
    preview: {
      type: "device-pair",
      images: [
        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80",
      ],
    },
  },
  // ——— 3 new cards ———
  {
    heading: "Custom Polymer Solutions",
    paragraph:
      "Tailored grades and formulations developed in-house to meet exact application requirements for pipes, packaging, footwear and coatings.",
    preview: {
      type: "stacked-photos",
      images: [
        "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=600&q=80",
      ],
    },
  },
  {
    heading: "State-of-the-Art Manufacturing",
    paragraph:
      "Modern extrusion and compounding lines with continuous process monitoring deliver consistent melt-flow and mechanical properties at scale.",
    preview: {
      type: "panel",
      title: "Production Dashboard",
      image:
        "https://images.unsplash.com/photo-1581092160607-ee22731c9c2c?w=600&q=80",
      badge:
        "https://images.unsplash.com/photo-1581092160607-ee22731c9c2c?w=200&q=80",
    },
  },
  {
    heading: "Sustainable & Responsible Sourcing",
    paragraph:
      "We prioritise responsibly sourced resins and continuously improve energy efficiency and waste reduction across our operations.",
    preview: {
      type: "device-pair",
      images: [
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b4b3?w=600&q=80",
        "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&q=80",
      ],
    },
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function StackedPhotosPreview({ images }) {
  return (
    <div className="relative mt-8 h-44 w-full">
      <div className="absolute left-0 top-1 h-36 w-32 rounded-md border border-dashed border-white/40" />
      <img
        src={images[0]}
        alt=""
        className="absolute left-0 top-1 h-36 w-32 rounded-md object-cover"
      />
      <img
        src={images[1]}
        alt=""
        className="absolute left-24 top-9 h-24 w-20 rounded-md object-cover shadow-lg shadow-black/30"
      />
      <div className="absolute left-[8.75rem] top-[6.25rem] flex h-8 w-8 items-center justify-center rounded-md bg-white/15 backdrop-blur-sm">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-white/80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5-11 11" />
        </svg>
      </div>
    </div>
  );
}

function PanelPreview({ title, image, badge }) {
  return (
    <div className="relative mt-8 h-44 w-full">
      <div className="absolute left-0 top-0 h-40 w-52 overflow-hidden rounded-lg bg-white shadow-xl shadow-black/20">
        <div className="border-b border-stone-200 px-4 py-3">
          <p className="text-[11px] font-semibold text-stone-800">{title}</p>
        </div>
        <div className="space-y-1.5 px-4 py-3">
          <div className="mx-auto h-2 w-20 rounded-full bg-stone-200" />
          <div className="mx-auto mt-2 h-1.5 w-24 rounded-full bg-stone-100" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="mt-2.5 h-1.5 w-full rounded-full bg-stone-100"
            />
          ))}
        </div>
      </div>
      <div className="absolute left-32 top-16 flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-lg shadow-black/25">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500">
          <span className="h-2 w-2 rounded-full bg-white" />
        </span>
        <span className="text-[11px] font-medium leading-tight text-stone-800">
          QODE
          <br />
          Help Center
        </span>
      </div>
    </div>
  );
}

function DevicePairPreview({ images }) {
  return (
    <div className="relative mt-8 flex h-44 w-full items-end gap-3">
      <div className="relative h-40 w-24 overflow-hidden rounded-lg shadow-xl shadow-black/20">
        <img src={images[0]} alt="" className="h-full w-full object-cover" />
        <span className="absolute right-2 top-2 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-medium text-stone-700">
          Featured
        </span>
      </div>
      <div className="relative h-44 w-24 overflow-hidden rounded-lg bg-white shadow-xl shadow-black/20">
        <img src={images[1]} alt="" className="h-24 w-full object-cover" />
        <div className="px-2 py-2">
          <div className="h-1.5 w-14 rounded-full bg-stone-200" />
          <div className="mt-1.5 h-1.5 w-8 rounded-full bg-stone-100" />
        </div>
        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow">
          <svg
            viewBox="0 0 24 24"
            className="h-3 w-3 text-stone-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function PreviewSlot({ preview }) {
  if (preview.type === "stacked-photos")
    return <StackedPhotosPreview images={preview.images} />;
  if (preview.type === "panel")
    return (
      <PanelPreview
        title={preview.title}
        image={preview.image}
        badge={preview.badge}
      />
    );
  if (preview.type === "device-pair")
    return <DevicePairPreview images={preview.images} />;
  return null;
}

function StatCard({ heading, paragraph, preview }) {
  return (
    <motion.div
      variants={item}
      className="rounded-2xl border border-white/15 bg-white/[0.04] p-8 backdrop-blur-sm"
    >
      <h3 className="text-lg font-medium text-white">{heading}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/65">
        {paragraph}
      </p>
      <PreviewSlot preview={preview} />
    </motion.div>
  );
}

export default function WhyChooseUs() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center py-24"
      style={{ backgroundImage: `url(${BG_IMAGE})` }}
    >
      <div className="absolute inset-0 bg-[#3f4f3f]/55" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-5xl font-semibold text-white md:text-6xl">
            Why Choose Us
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/75">
            See why more than 200k users trust Bridge as the core element of
            their business. Pick your favorite demo &amp; customize away.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {cards.map((card, i) => (
            <StatCard key={i} {...card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}