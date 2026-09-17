const categories = [
  {
    heading: "Piping & Fittings",
    paragraph:
      "Durable pipe systems engineered for water, drainage, and industrial flow applications.",
  },
  {
    heading: "Polymers & Films",
    paragraph:
      "High-clarity films and specialty polymer sheets built for packaging and industrial use.",
  },
  {
    heading: "Furniture & Storage",
    paragraph:
      "Molded plastic furniture and storage solutions designed for everyday durability.",
  },
  {
    heading: "Flexible Packaging",
    paragraph:
      "Multi-layer laminates and flexible packaging engineered for shelf life and protection.",
  },
  {
    heading: "Industrial Resins",
    paragraph:
      "Engineering-grade resins formulated for consistency across large-scale production.",
  },
  {
    heading: "Coated Materials",
    paragraph:
      "Precision-coated films and substrates used across electronics and packaging lines.",
  },
];

function CategoryCard({ heading, paragraph }) {
  return (
    <div className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-white/50 bg-white/30 p-9 shadow-[0_8px_30px_rgba(16,60,40,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-white/70 hover:bg-white/45 hover:shadow-[0_12px_40px_rgba(16,60,40,0.12)]">
      {/* Glass shine sweep */}
      <div className="pointer-events-none absolute inset-0 w-[60%] -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-[250%] group-hover:opacity-100" />

      {/* Soft top highlight for glass feel */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

      <div className="relative flex flex-1 flex-col">
        <h3 className="text-xl font-medium text-emerald-950">{heading}</h3>
        <p className="mt-4 text-base leading-relaxed text-emerald-950/70">
          {paragraph}
        </p>
      </div>
    </div>
  );
}

export default function CategoryGrid() {
  return (
    <section className="bg-emerald-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-xl">
          <h2 className="text-3xl font-semibold text-emerald-950 md:text-4xl">
            What we make
          </h2>
          <p className="mt-3 text-emerald-950/70">
            A look at the product categories behind our manufacturing lines.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <CategoryCard key={i} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}