"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";

type Props = {
  product: { slug: string; name: string; price: number; image: string };
  variants: { id: string; size: string; stock: number }[];
};

export function AddToCart({ product, variants }: Props) {
  const firstAvailable = variants.find((v) => v.stock > 0);
  const [selected, setSelected] = useState<string | undefined>(firstAvailable?.id);
  const add = useCart((s) => s.add);
  const variant = variants.find((v) => v.id === selected);

  return (
    <div className="flex flex-col gap-4">
      <fieldset className="m-0 border-0 p-0">
        <legend className="micro mb-3 text-ink-muted">Rozmiar</legend>
        <div className="flex flex-wrap gap-2">
          {variants.map((v) => {
            const soldOut = v.stock === 0;
            const active = v.id === selected;
            return (
              <button
                key={v.id}
                type="button"
                disabled={soldOut}
                aria-pressed={active}
                aria-label={soldOut ? `${v.size} — wyprzedane` : `Rozmiar ${v.size}`}
                onClick={() => setSelected(v.id)}
                className={`label h-11 min-w-14 cursor-pointer border px-3 transition-colors ${
                  active
                    ? "border-flare bg-flare text-on-flare shadow-glow"
                    : "border-line-strong hover:border-ink"
                } disabled:cursor-not-allowed disabled:border-line disabled:text-ink-faint disabled:line-through`}
              >
                {v.size}
              </button>
            );
          })}
        </div>
      </fieldset>

      <p className="micro m-0 min-h-4 text-ink-muted" aria-live="polite">
        {!firstAvailable
          ? "Wyprzedane — nie wróci."
          : variant && variant.stock <= 5
            ? `Zostało ${variant.stock} szt.`
            : ""}
      </p>

      <button
        type="button"
        className="flare label w-full"
        disabled={!variant}
        onClick={() =>
          variant &&
          add({
            variantId: variant.id,
            slug: product.slug,
            name: product.name,
            size: variant.size,
            price: product.price,
            image: product.image,
            maxQuantity: variant.stock,
          })
        }
      >
        {firstAvailable ? "+ Dodaj do koszyka +" : "[ Wyprzedane ]"}
      </button>
    </div>
  );
}
