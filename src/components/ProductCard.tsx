import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { totalStock, type ProductCardData } from "@/lib/products";

type Props = {
  product: ProductCardData;
  index: number;
  sizes: string;
  caption?: boolean;
  aspect?: string;
  priority?: boolean;
};

export function ProductCard({ product, index, sizes, caption = false, aspect = "aspect-[3/4]", priority }: Props) {
  const [main, alt] = product.images;
  const soldOut = totalStock(product) === 0;

  return (
    <Link href={`/produkt/${product.slug}`} className="card flex flex-col gap-4">
      <div className={`frame ${aspect}`}>
        {main && (
          <Image
            src={main.url}
            alt={main.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="img-main object-cover"
          />
        )}
        {alt && <Image src={alt.url} alt="" fill sizes={sizes} className="img-alt object-cover" />}
        <div className="scanlines" />
        <div className="local-grain" />
        <div className="vignette" />
        <div className="brackets" />
        {caption && (
          <span className="micro absolute bottom-[22px] left-6 z-4 text-ink-muted">
            FW26 / {product.name}
          </span>
        )}
      </div>
      <div className="label flex items-baseline justify-between gap-4">
        <span className="flex items-center gap-2">
          {product.isNew && <span className="live-dot" aria-label="Nowość" />}
          ({String(index + 1).padStart(2, "0")}) {product.name}
        </span>
        <span className="whitespace-nowrap text-ink-muted">{soldOut ? "Wyprzedane" : formatPrice(product.price)}</span>
      </div>
    </Link>
  );
}
