"use client";

import { motion } from "framer-motion";

const BG_IMAGE =
  "https://bridgelanding.qodeinteractive.com/wp-content/uploads/2024/01/bridge-bg-img-1.jpg";

const cards = [
  {
    heading: "Polymers (PVC, PE, PP etc.)",
    paragraph:
      "Versatile base materials used across a wide range of industries.",
    image:
      "https://www.resolindustries.com/wp-content/uploads/2026/01/Polymers.jpg",
  },
  {
    heading: "Pet Resin",
    paragraph:
      "Premium-grade PET resin for packaging and industrial applications.",
    image:
      "https://www.resolindustries.com/wp-content/uploads/2026/04/pet-resin.jpg",
  },
  {
    heading: "Calcium Carbonate",
    paragraph:
      "A widely used filler that improves product durability.",
    image:
      "https://www.resolindustries.com/wp-content/uploads/2026/01/Calcium-Carbonate.jpg",
  },
  {
    heading: "Citric Acid",
    paragraph:
      "A key ingredient across food and pharmaceutical manufacturing.",
    image:
      "https://www.resolindustries.com/wp-content/uploads/2026/01/Citric-Acid-2.jpg",
  },
  {
    heading: "Plasticizers",
    paragraph:
      "Additives that enhance the flexibility and strength of polymers.",
    image:
      "https://www.resolindustries.com/wp-content/uploads/2026/01/Plasticizers-2.jpg",
  },
  {
    heading: "Melamine",
    paragraph:
      "A crucial additive that improves polymer performance.",
    image:
      "https://www.resolindustries.com/wp-content/uploads/2026/01/Melamine-2.jpg",
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

function StackedPhotosPreview({ image }) {
  return (
    <div className="relative mt-8 h-44 w-full">
      <div className="absolute left-0 top-1 h-42 w-full rounded-md border border-dashed border-white/40" />
      <img
        src={image}
        alt=""
        className="absolute left-0 top-1 h-42 w-full  object-cover"
      />
    </div>
  );
}

function StatCard({ heading, paragraph, image }) {
  return (
    <motion.div
      variants={item}
      whileHover="shine"
      className="group relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0_8px_30px_-10px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.07]"
    >
      {/* soft top sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent" />

      {/* animated light sweep */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
        variants={{
          rest: { x: "-20%" },
          shine: { x: "260%", transition: { duration: 1.1, ease: "easeInOut" } },
        }}
        initial="rest"
      />

      <div className="relative">
        <h3 className="text-lg font-medium text-white">{heading}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          {paragraph}
        </p>
        <StackedPhotosPreview image={image} />
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center py-24"
      style={{ backgroundImage: `url(${BG_IMAGE})` }}
    >


      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-5xl font-semibold text-white md:text-6xl">
            Categories
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/75">
             Explore our wide range of polymer industry products.
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