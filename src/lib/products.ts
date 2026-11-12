import type { Category, Prisma } from "@prisma/client";
import { prisma } from "./prisma";

const cardInclude = {
  images: { orderBy: { position: "asc" }, take: 2 },
  variants: { select: { stock: true } },
} satisfies Prisma.ProductInclude;

export type ProductCardData = Prisma.ProductGetPayload<{ include: typeof cardInclude }>;

export function getProducts(category?: Category) {
  return prisma.product.findMany({
    where: category ? { category } : undefined,
    orderBy: { sortOrder: "asc" },
    include: cardInclude,
  });
}

export function getProduct(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { position: "asc" } },
      variants: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export type ProductDetail = NonNullable<Awaited<ReturnType<typeof getProduct>>>;

export function totalStock(p: { variants: { stock: number }[] }) {
  return p.variants.reduce((sum, v) => sum + v.stock, 0);
}
