import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { getProducts } from "@/lib/products";
import { categories } from "@/lib/site";

export const metadata: Metadata = {
  title: "Katalog",
  description: "Wszystkie produkty kolekcji FW26.",
};

export const revalidate = 60;

type Props = { searchParams: Promise<{ kategoria?: string }> };

export default async function CatalogPage({ searchParams }: Props) {
  const { kategoria } = await searchParams;
  const active = categories.find((c) => c.slug === kategoria);
  const products = await getProducts(active?.value);

  const tabs = [{ slug: undefined, label: "Wszystko" }, ...categories];

  return (
    <>
      <main id="main" className="wrap pt-40 pb-30">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
          <h1 className="disp m-0" style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}>
            Katalog
          </h1>
          <span className="micro text-ink-muted">
            FW26 · [{String(products.length).padStart(2, "0")}] {products.length === 1 ? "produkt" : "produkty"}
          </span>
        </div>

        <nav aria-label="Kategorie" className="label mb-12 flex flex-wrap gap-7 pt-2">
          {tabs.map((t) => {
            const current = (t.slug ?? undefined) === active?.slug;
            return (
              <Link
                key={t.label}
                href={t.slug ? `/katalog?kategoria=${t.slug}` : "/katalog"}
                aria-current={current ? "page" : undefined}
                className={`ul flex min-h-11 items-center ${current ? "text-ink" : "text-ink-muted hover:text-ink"}`}
                scroll={false}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>

        {products.length === 0 ? (
          <p className="edit m-0 py-20 text-5xl">
            nic tu jeszcze <span className="italic">nie ma</span>
          </p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(280px,100%),1fr))] gap-x-6 gap-y-14">
            {products.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                priority={i < 4}
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
