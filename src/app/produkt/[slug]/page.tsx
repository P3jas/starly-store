import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "./AddToCart";
import { Footer } from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { getProduct } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: product.images[0] ? [product.images[0].url] : [] },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((i) => i.url),
    brand: { "@type": "Brand", name: "Starly" },
    offers: {
      "@type": "Offer",
      priceCurrency: "PLN",
      price: (product.price / 100).toFixed(2),
      availability: product.variants.some((v) => v.stock > 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
    },
  };

  return (
    <>
      <main id="main" className="wrap pt-36 pb-30">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Link href="/katalog" className="label ul mb-10 inline-flex min-h-11 items-center">
          &lt; Katalog
        </Link>

        <div className="grid items-start gap-x-6 gap-y-12 md:grid-cols-12">
          <div className="flex flex-col gap-2 md:col-span-7">
            {product.images.map((img, i) => (
              <div key={img.id} className="frame aspect-[3/4]">
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover"
                />
                <div className="local-grain" />
                <div className="brackets" />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-8 md:sticky md:top-36 md:col-span-4 md:col-start-9">
            <div className="flex flex-col gap-4">
              <span className="micro text-ink-muted">FW26 / {product.category === "TOP" ? "Góra" : product.category === "BOTTOM" ? "Dół" : "Akcesoria"}</span>
              <h1 className="disp m-0 text-6xl md:text-7xl">{product.name}</h1>
              <p className="label m-0">{formatPrice(product.price)}</p>
            </div>
            <p className="m-0 max-w-[420px] text-ink-muted">{product.description}</p>
            <AddToCart
              product={{
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0]?.url ?? "",
              }}
              variants={product.variants.map((v) => ({ id: v.id, size: v.size, stock: v.stock }))}
            />
            <dl className="label m-0 flex flex-col border-t border-line">
              {[
                ["Skład", product.composition ?? "—"],
                ["Wysyłka", "UE · 2–4 dni robocze"],
                ["Zwroty", "30 dni"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-line py-3.5">
                  <dt className="text-ink-muted">{k}</dt>
                  <dd className="m-0 text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
