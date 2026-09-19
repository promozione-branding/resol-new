import Link from "next/link";
import { ChevronRight } from "lucide-react";
import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllProducts } from "@/lib/products";

export const metadata = {
  title: "Products | Resol Industries",
  description:
    "Browse Resol Industries' full range of polymers, fillers, additives, and specialty chemicals.",
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <main>
      <TopBar />
      <Nav />

      <section className="bg-[#a59f9f] pb-20 pt-28 text-paper sm:pt-32">
        <div className="mx-auto max-w-6xl px-6 mt-4">
          <span className="text-[11px] text-black">
            Full catalog
          </span>
          <h1 className="mt-2 text-4xl font-semibold leading-tight sm:text-5xl text-ink">
            Products
          </h1>
          <p className="mt-3 max-w-prose text-[1.05rem] leading-relaxed text-ink">
            Industrial materials sourced and quality-checked for consistent,
            pan-India supply.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-[#C79A5C]/50"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={p.heroImage}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[11px] tracking-wide text-ink">
                    {p.category}
                  </span>
                  <h2 className="mt-1 text-lg font-semibold text-ink">
                    {p.name}
                  </h2>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink">
                    {p.tagline}
                  </p>
                  <span className="bg-ink mt-3 inline-flex items-center gap-1 text-sm font-medium text-white transition-colors group-hover:text-[#C79A5C] p-2">
                    View details
                    <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}