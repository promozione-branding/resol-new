"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  CheckCircle2,
  Package,
  Truck,
  ShieldCheck,
  FileDown,
  ArrowRight,
  Boxes,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function Breadcrumb({ product }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1.5 text-xs text-paper/50"
    >
      <Link href="/" className="transition-colors hover:text-[#C79A5C]">
        Home
      </Link>
      <ChevronRight size={12} className="shrink-0" />
      <Link href="/products" className="transition-colors hover:text-[#C79A5C]">
        Products
      </Link>
      <ChevronRight size={12} className="shrink-0" />
      <span className="text-paper/50">{product.category}</span>
      <ChevronRight size={12} className="shrink-0" />
      <span className="text-paper/80">{product.name}</span>
    </nav>
  );
}

function Gallery({ product }) {
  const images = product.gallery?.length ? product.gallery : [product.heroImage];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
        <img
          key={images[active]}
          src={images[active]}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-medium tracking-wide text-paper/90 backdrop-blur-md">
          {product.category}
        </span>
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${product.name}`}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition-colors sm:h-20 sm:w-20 ${
                active === i
                  ? "border-[#C79A5C]"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SpecTable({ specifications }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="w-full text-left text-sm">
        <tbody>
          {specifications.map((row, i) => (
            <tr
              key={row.label}
              className={i % 2 === 0 ? "bg-white/[0.03]" : "bg-transparent"}
            >
              <th className="w-1/2 px-5 py-3.5 font-medium text-paper/60">
                {row.label}
              </th>
              <td className="px-5 py-3.5 text-paper/90">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RelatedProducts({ products }) {
  if (!products?.length) return null;

  return (
    <section className="border-t border-hairline bg-white/[0.02] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="text-[11px] tracking-wide text-[#C79A5C]">
              You may also need
            </span>
            <h2 className="mt-2 text-2xl font-semibold text-paper sm:text-3xl">
              Related products
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden items-center gap-1.5 text-sm font-medium text-paper/70 transition-colors hover:text-[#C79A5C] sm:flex"
          >
            View all products
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <motion.div
              key={p.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={`/products/${p.slug}`}
                className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-[#C79A5C]/50"
              >
                <div className="h-44 w-full overflow-hidden">
                  <img
                    src={p.heroImage}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[11px] tracking-wide text-[#C79A5C]">
                    {p.category}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-paper">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-paper/60">
                    {p.tagline}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-paper/80 transition-colors group-hover:text-[#C79A5C]">
                    View details
                    <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ProductDetail({ product, related = [] }) {
  return (
    <main className="bg-ink pt-28 text-paper sm:pt-32">
      {/* ===================== Header / Gallery / Buy box ===================== */}
      <section className="mx-auto max-w-6xl px-6 pb-16 sm:pb-20">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Breadcrumb product={product} />
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:mt-8 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.05 }}
          >
            <Gallery product={product} />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.12 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#C79A5C]">
              {product.category}
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-paper sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-1.5 text-sm text-paper/50">{product.grade}</p>
            <p className="mt-4 max-w-prose text-[1.05rem] leading-relaxed text-paper/70">
              {product.tagline}
            </p>

            {/* Key spec pills */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {product.keySpecs?.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <p className="text-[11px] uppercase tracking-wide text-paper/45">
                    {spec.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-paper">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Badges */}
            {product.badges?.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {product.badges.map((badge) => (
                  <li
                    key={badge}
                    className="flex items-center gap-1.5 text-sm text-paper/70"
                  >
                    <CheckCircle2 size={15} className="text-[#C79A5C]" />
                    {badge}
                  </li>
                ))}
              </ul>
            )}

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/contact?product=${encodeURIComponent(product.name)}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C79A5C] px-6 py-3.5 text-sm font-bold text-[#1a1409] transition-colors hover:bg-[#d9ab6c]"
              >
                Request a quote
                <ArrowRight size={16} />
              </Link>
              <a
                href="#specifications"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-[#C79A5C] hover:text-[#C79A5C]"
              >
                <FileDown size={16} />
                View spec sheet
              </a>
            </div>

            {/* Quick trust row */}
            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-hairline pt-6 sm:grid-cols-3">
              <div className="flex items-start gap-2.5">
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#C79A5C]" />
                <div>
                  <p className="text-sm font-medium text-paper">Quality checked</p>
                  <p className="text-xs text-paper/50">On every incoming batch</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Truck size={18} className="mt-0.5 shrink-0 text-[#C79A5C]" />
                <div>
                  <p className="text-sm font-medium text-paper">Pan-India delivery</p>
                  <p className="text-xs text-paper/50">From 4 regional offices</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Package size={18} className="mt-0.5 shrink-0 text-[#C79A5C]" />
                <div>
                  <p className="text-sm font-medium text-paper">
                    {product.packaging?.[0]?.value || "Flexible packaging"}
                  </p>
                  <p className="text-xs text-paper/50">Bulk options available</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== Description ===================== */}
      <section className="border-t border-hairline py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-[1.1fr,0.9fr] lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <span className="text-[11px] tracking-wide text-[#C79A5C]">
              Overview
            </span>
            <h2 className="mt-2 text-2xl font-semibold text-paper sm:text-3xl">
              About this material
            </h2>
            <div className="mt-5 space-y-4">
              {product.description?.map((para, i) => (
                <p
                  key={i}
                  className="max-w-prose text-[1.02rem] leading-relaxed text-paper/70"
                >
                  {para}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Applications */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: 0.08 }}
          >
            <div className="mb-4 flex items-center gap-2 text-paper/80">
              <Boxes size={18} className="text-[#C79A5C]" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                Applications
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {product.applications?.map((app) => (
                <div
                  key={app.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="text-sm font-semibold text-paper">
                    {app.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-paper/55">
                    {app.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== Specifications + Packaging ===================== */}
      <section
        id="specifications"
        className="border-t border-hairline py-16 sm:py-20"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <span className="text-[11px] tracking-wide text-[#C79A5C]">
              Technical data
            </span>
            <h2 className="mt-2 mb-5 text-2xl font-semibold text-paper sm:text-3xl">
              Specifications
            </h2>
            <SpecTable specifications={product.specifications} />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: 0.08 }}
          >
            <span className="text-[11px] tracking-wide text-[#C79A5C]">
              Logistics
            </span>
            <h2 className="mt-2 mb-5 text-2xl font-semibold text-paper sm:text-3xl">
              Packaging &amp; availability
            </h2>
            <SpecTable specifications={product.packaging} />

            <div className="mt-6 rounded-2xl border border-[#C79A5C]/30 bg-[#C79A5C]/[0.06] p-5">
              <p className="text-sm leading-relaxed text-paper/80">
                Need a custom grade, packaging format, or delivery schedule?
                Our team quotes against your exact specification.
              </p>
              <Link
                href={`/contact?product=${encodeURIComponent(product.name)}`}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C79A5C] transition-colors hover:text-[#d9ab6c]"
              >
                Talk to our sales team
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <RelatedProducts products={related} />
    </main>
  );
}