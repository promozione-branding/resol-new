
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


const CARD_PALETTES = [
  {
    cardBg:    "bg-[#E8F5F1]",
    cardBorder:"border-[#C2E4D8]",
    chipBg:    "bg-[#C2E4D8]",
    chipText:  "text-[#0F6E56]",
    accent:    "#0F6E56",
    imageBg:   "#C2E4D8",
    iconColor: "#0F6E56",
  },
  {
    cardBg:    "bg-[#FDF3E7]",
    cardBorder:"border-[#F0D9B0]",
    chipBg:    "bg-[#F0D9B0]",
    chipText:  "text-[#854F0B]",
    accent:    "#854F0B",
    imageBg:   "#F0D9B0",
    iconColor: "#854F0B",
  },
  {
    cardBg:    "bg-[#EEEAFA]",
    cardBorder:"border-[#D4C9F0]",
    chipBg:    "bg-[#D4C9F0]",
    chipText:  "text-[#534AB7]",
    accent:    "#534AB7",
    imageBg:   "#D4C9F0",
    iconColor: "#534AB7",
  },
  {
    cardBg:    "bg-[#E7F2FB]",
    cardBorder:"border-[#BDD8F2]",
    chipBg:    "bg-[#BDD8F2]",
    chipText:  "text-[#185FA5]",
    accent:    "#185FA5",
    imageBg:   "#BDD8F2",
    iconColor: "#185FA5",
  },
  {
    cardBg:    "bg-[#FBE9ED]",
    cardBorder:"border-[#F0C4CF]",
    chipBg:    "bg-[#F0C4CF]",
    chipText:  "text-[#993556]",
    accent:    "#993556",
    imageBg:   "#F0C4CF",
    iconColor: "#993556",
  },
  {
    cardBg:    "bg-[#EBF4EA]",
    cardBorder:"border-[#C5DEC3]",
    chipBg:    "bg-[#C5DEC3]",
    chipText:  "text-[#3B6D11]",
    accent:    "#3B6D11",
    imageBg:   "#C5DEC3",
    iconColor: "#3B6D11",
  },
];

const STATS = [
  { num: "200+",      label: "Product variants"   },
  { num: "Pan-India", label: "Distribution"        },
  { num: "ISO",       label: "Certified quality"   },
];

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <main className="bg-[#F5F2ED] min-h-screen">
      <TopBar />
      <Nav />

      <section className="bg-[#EEE9E0] border-b border-[#E0D9CE] px-6 pt-32 pb-14">
        <div className="mx-auto max-w-6xl flex items-end justify-between gap-10 flex-wrap">

          <div className="animate-[fadeUp_0.45s_ease_both]">
          

            <h1 className="text-4xl sm:text-5xl font-medium text-[#2C2416] leading-[1.18] mt-6">
              Industrial materials,
              <br />
              <span className="text-[#A0845C]">quality assured</span>
            </h1>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#7A6E5F]">
              Polymers, fillers, additives, and specialty chemicals — sourced
              and quality-checked for consistent pan-India supply.
            </p>
          </div>

          <div
            className="flex divide-x divide-[#DDD6C8] border border-[#DDD6C8]
                        rounded-xl bg-white overflow-hidden self-end
                        animate-[fadeUp_0.5s_0.1s_ease_both]"
          >
            {STATS.map((s) => (
              <div key={s.label} className="px-6 py-4">
                <div className="text-xl font-medium text-[#2C2416]">{s.num}</div>
                <div className="text-[11px] text-[#A09080] mt-0.5 tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 pb-24">

        <div className="flex gap-2 flex-wrap mb-8 animate-[fadeUp_0.45s_0.2s_ease_both]">
          {["All products", "Polymers", "Fillers", "Additives", "Specialty"].map(
            (label, i) => (
              <button
                key={label}
                data-active={i === 0}
                className="px-4 py-1.5 rounded-full border border-[#DDD6C8] bg-white
                           text-xs text-[#7A6E5F] transition-colors duration-200
                           hover:border-[#A0845C] hover:text-[#A0845C]
                           data-[active=true]:bg-[#A0845C]
                           data-[active=true]:text-white
                           data-[active=true]:border-[#A0845C]
                           cursor-pointer font-medium"
              >
                {label}
              </button>
            )
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const pal = CARD_PALETTES[index % CARD_PALETTES.length];

            const delay = `${index * 0.06}s`;

            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                style={{ animationDelay: delay }}
                className={`
                  group flex flex-col overflow-hidden rounded-2xl border
                  ${pal.cardBg} ${pal.cardBorder}
                  animate-[cardIn_0.5s_ease_both]
                  transition-transform duration-300
                  hover:-translate-y-1
                `}
              >
                <div className="relative h-40 overflow-hidden">
                  {product.heroImage ? (
                    <img
                      src={product.heroImage}
                      alt={product.name}
                      className="h-full w-full object-cover
                                 transition-transform duration-500 ease-out
                                 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="h-full w-full flex items-center justify-center"
                      style={{ backgroundColor: pal.imageBg }}
                    >
                      <span
                        className="text-5xl opacity-30"
                        style={{ color: pal.iconColor }}
                      >
                        ◈
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-1 p-5">

                  <span
                    className={`
                      self-start rounded-full px-2.5 py-0.5 mb-2
                      text-[10px] font-medium tracking-widest uppercase
                      ${pal.chipBg} ${pal.chipText}
                    `}
                  >
                    {product.category}
                  </span>

                  <h2 className="text-[15px] font-medium text-[#1e1a12] leading-snug">
                    {product.name}
                  </h2>

                  <p className="mt-1.5 text-xs leading-relaxed text-[#6a5e50] line-clamp-2 flex-1">
                    {product.tagline}
                  </p>

                  <div className="mt-4 flex items-center justify-between">

                    <span
                      className="flex items-center gap-1 text-xs font-medium"
                      style={{ color: pal.accent }}
                    >
                      View details
                      <ChevronRight size={12} />
                    </span>
                    <span
                      className="
                        flex h-7 w-7 items-center justify-center rounded-full border
                        transition-all duration-200
                        group-hover:text-white
                      "
                      style={{
                        color:            pal.accent,
                        borderColor:      pal.accent,
                      }}
                    >
                      <ChevronRight size={13} />
                    </span>

                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
