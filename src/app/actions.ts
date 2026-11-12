"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export type FormState = { ok: boolean; message: string } | null;

const subscribeSchema = z.object({
  email: z.string().trim().toLowerCase().email("Podaj poprawny adres e-mail."),
  source: z.enum(["NEWSLETTER", "DROP"]),
});

export async function subscribe(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = subscribeSchema.safeParse({
    email: formData.get("email"),
    source: formData.get("source"),
  });
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Niepoprawne dane." };
  }
  const { email, source } = parsed.data;
  await prisma.subscriber.upsert({
    where: { email_source: { email, source } },
    update: {},
    create: { email, source },
  });
  return {
    ok: true,
    message: source === "DROP" ? "Zapisano. Dostęp do dropu dostaniesz 24 h wcześniej." : "Jesteś na liście.",
  };
}

const orderSchema = z.object({
  name: z.string().trim().min(2, "Podaj imię i nazwisko.").max(120),
  email: z.string().trim().toLowerCase().email("Podaj poprawny adres e-mail."),
  items: z
    .array(z.object({ variantId: z.string().min(1), quantity: z.number().int().min(1).max(20) }))
    .min(1, "Koszyk jest pusty."),
});

export type OrderResult = { ok: true; orderId: string } | { ok: false; message: string };

class StockError extends Error {}

export async function createOrder(input: z.infer<typeof orderSchema>): Promise<OrderResult> {
  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Niepoprawne dane." };
  }
  const { name, email, items } = parsed.data;

  try {
    const order = await prisma.$transaction(async (tx) => {
      const variants = await tx.variant.findMany({
        where: { id: { in: items.map((i) => i.variantId) } },
        include: { product: { select: { name: true, price: true, slug: true } } },
      });

      const lines = items.map((item) => {
        const v = variants.find((x) => x.id === item.variantId);
        if (!v) throw new StockError("Jeden z produktów nie jest już dostępny.");
        return { item, v };
      });

      // Atomowe zmniejszenie stanu: aktualizuje tylko gdy stan wystarcza.
      for (const { item, v } of lines) {
        const res = await tx.variant.updateMany({
          where: { id: v.id, stock: { gte: item.quantity } },
          data: { stock: { decrement: item.quantity } },
        });
        if (res.count === 0) {
          throw new StockError(`${v.product.name} (${v.size}) — za mało sztuk w magazynie.`);
        }
      }

      // Ceny zawsze z bazy, nigdy z przeglądarki.
      const total = lines.reduce((sum, { item, v }) => sum + v.product.price * item.quantity, 0);

      return tx.order.create({
        data: {
          name,
          email,
          total,
          items: {
            create: lines.map(({ item, v }) => ({
              variantId: v.id,
              productName: v.product.name,
              size: v.size,
              unitPrice: v.product.price,
              quantity: item.quantity,
            })),
          },
        },
        include: { items: { include: { variant: { include: { product: { select: { slug: true } } } } } } },
      });
    });

    revalidatePath("/");
    revalidatePath("/katalog");
    for (const slug of new Set(order.items.map((i) => i.variant.product.slug))) {
      revalidatePath(`/produkt/${slug}`);
    }
    return { ok: true, orderId: order.id };
  } catch (e) {
    if (e instanceof StockError) return { ok: false, message: e.message };
    console.error(e);
    return { ok: false, message: "Nie udało się złożyć zamówienia. Spróbuj ponownie." };
  }
}
