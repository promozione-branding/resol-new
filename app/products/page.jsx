import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product not found | Resol" };

  return {
    title: `${product.name} | Resol Industries`,
    description: product.tagline,
  };
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(params.slug, 3);

  return (
    <main>
      <TopBar />
      <Nav />
      <ProductDetail product={product} related={related} />
      <Footer />
    </main>
  );
}