"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState, useTransition } from "react";
import { createOrder } from "@/app/actions";
import { cartTotal, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useMounted } from "@/lib/use-mounted";

export function CartDrawer() {
  const { items, open, setOpen, setQuantity, remove, clear } = useCart();
  const mounted = useMounted();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const nameId = useId();
  const emailId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.classList.add("lenis-stopped");
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("lenis-stopped");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  if (!mounted || !open) return null;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const res = await createOrder({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
      });
      if (res.ok) {
        clear();
        setOpen(false);
        router.push(`/zamowienie/${res.orderId}`);
      } else {
        setError(res.message);
      }
    });
  }

  return (
    <div className="fixed inset-0 z-90" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <button
        type="button"
        aria-label="Zamknij koszyk"
        className="absolute inset-0 cursor-default bg-void/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <aside
        data-lenis-prevent
        className="absolute top-0 right-0 flex h-full w-full max-w-[460px] flex-col overflow-y-auto border-l border-line bg-surface"
      >
        <div className="flex items-center justify-between border-b border-line p-6">
          <h2 id="cart-title" className="label m-0">
            Koszyk[ {items.reduce((n, i) => n + i.quantity, 0)} ]
          </h2>
          <button type="button" className="label ul min-h-11 cursor-pointer" onClick={() => setOpen(false)} autoFocus>
            Zamknij ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-6 p-6">
            <p className="edit m-0 text-4xl">
              koszyk jest <span className="italic">pusty</span>
            </p>
            <Link href="/katalog" className="label ul" onClick={() => setOpen(false)}>
              Katalog &gt;
            </Link>
          </div>
        ) : (
          <>
            <ul className="m-0 flex list-none flex-col p-0">
              {items.map((i) => (
                <li key={i.variantId} className="flex gap-4 border-b border-line p-6">
                  <div className="frame relative aspect-[3/4] w-20 flex-none">
                    <Image src={i.image} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="label flex justify-between gap-4">
                      <Link href={`/produkt/${i.slug}`} className="ul" onClick={() => setOpen(false)}>
                        {i.name}
                      </Link>
                      <span>{formatPrice(i.price * i.quantity)}</span>
                    </div>
                    <span className="micro text-ink-muted">Rozmiar {i.size}</span>
                    <div className="label mt-auto flex items-center gap-4">
                      <div className="flex items-center border border-line-strong">
                        <button
                          type="button"
                          aria-label={`Zmniejsz ilość: ${i.name}`}
                          className="h-11 w-11 cursor-pointer"
                          onClick={() => setQuantity(i.variantId, i.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="w-8 text-center" aria-live="polite">
                          {i.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Zwiększ ilość: ${i.name}`}
                          className="h-11 w-11 cursor-pointer disabled:opacity-30"
                          disabled={i.quantity >= i.maxQuantity}
                          onClick={() => setQuantity(i.variantId, i.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button type="button" className="ul cursor-pointer text-ink-muted" onClick={() => remove(i.variantId)}>
                        Usuń
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <form onSubmit={onSubmit} className="mt-auto flex flex-col gap-4 p-6">
              <div className="label flex justify-between">
                <span className="text-ink-muted">Suma</span>
                <span>{formatPrice(cartTotal(items))}</span>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor={nameId} className="micro text-ink-muted">
                  Imię i nazwisko
                </label>
                <div className="field">
                  <input id={nameId} name="name" required minLength={2} autoComplete="name" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor={emailId} className="micro text-ink-muted">
                  E-mail
                </label>
                <div className="field">
                  <input id={emailId} name="email" type="email" required autoComplete="email" />
                </div>
              </div>
              {error && (
                <p role="alert" className="label m-0 text-ink">
                  [ {error} ]
                </p>
              )}
              <button type="submit" className="flare label mt-2 w-full" disabled={pending}>
                {pending ? "[ Przetwarzanie … ]" : "+ Złóż zamówienie +"}
              </button>
              <p className="micro m-0 text-ink-muted">Wersja demo — płatność nie jest pobierana.</p>
            </form>
          </>
        )}
      </aside>
    </div>
  );
}
