import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Zamówienie", robots: { index: false } };

type Props = { params: Promise<{ id: string }> };

export default async function OrderPage({ params }: Props) {
  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });
  if (!order) notFound();

  return (
    <main id="main" className="wrap flex min-h-screen flex-col justify-center gap-10 pt-40 pb-30">
      <span className="micro text-ink-muted">Zamówienie · {order.id}</span>
      <h1 className="disp m-0" style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}>
        Przyjęte
      </h1>
      <p className="edit m-0 text-5xl">
        dziękujemy, {order.name.split(" ")[0]?.toLowerCase()}. <span className="italic">do zobaczenia nocą</span>
      </p>
      <ul className="label m-0 flex max-w-[640px] list-none flex-col border-t border-line p-0">
        {order.items.map((i) => (
          <li key={i.id} className="flex justify-between gap-4 border-b border-line py-3.5">
            <span>
              {i.productName} · {i.size} × {i.quantity}
            </span>
            <span>{formatPrice(i.unitPrice * i.quantity)}</span>
          </li>
        ))}
        <li className="flex justify-between gap-4 py-3.5">
          <span className="text-ink-muted">Suma</span>
          <span>{formatPrice(order.total)}</span>
        </li>
      </ul>
      <p className="micro m-0 text-ink-muted">Wersja demo — płatność nie została pobrana. Potwierdzenie: {order.email}</p>
      <Link href="/katalog" className="label ul self-start">
        &lt; Wróć do katalogu
      </Link>
    </main>
  );
}
