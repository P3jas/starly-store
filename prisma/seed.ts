import "dotenv/config";
import { PrismaClient, Category } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

// Ceny i stany magazynowe są przykładowe — podmień na prawdziwe.
const products = [
  {
    slug: "bluza-oversize",
    name: "Bluza oversize",
    description:
      "Ciężka bluza z kapturem o luźnym, opuszczonym kroju. Gruba dzianina pętelkowa, ściągacze przy mankietach i dole.",
    composition: "100% bawełna",
    price: 44900,
    category: Category.TOP,
    isNew: true,
    images: [
      { url: "/images/products/look.jpg", alt: "Model w czarnej bluzie oversize z kapturem i szerokich, przecieranych jeansach" },
      { url: "/images/products/look-detail.jpg", alt: "Zbliżenie: kaptur bluzy i łańcuch" },
    ],
    variants: [
      { size: "S", stock: 6 },
      { size: "M", stock: 12 },
      { size: "L", stock: 9 },
      { size: "XL", stock: 0 },
    ],
  },
  {
    slug: "t-shirt-04",
    name: "T-shirt 04",
    description:
      "Koszulka z surowo wykończonymi krawędziami i fotograficznym nadrukiem. Numer 04 z serii nocnych zdjęć.",
    composition: "100% bawełna",
    price: 19900,
    category: Category.TOP,
    isNew: true,
    images: [
      { url: "/images/products/tee.jpg", alt: "Czarny T-shirt z fotograficznym nadrukiem i numerem 04, zawieszony na łańcuchach" },
      { url: "/images/products/tee-detail.jpg", alt: "Zbliżenie nadruku na T-shircie 04" },
    ],
    variants: [
      { size: "S", stock: 15 },
      { size: "M", stock: 20 },
      { size: "L", stock: 14 },
      { size: "XL", stock: 4 },
    ],
  },
  {
    slug: "spodnie-cargo",
    name: "Spodnie cargo",
    description:
      "Proste spodnie cargo z kieszeniami bocznymi i przetarciami. Metalowe oczka w pasie i przy nogawkach.",
    composition: "100% bawełna",
    price: 38900,
    category: Category.BOTTOM,
    isNew: false,
    images: [
      { url: "/images/products/cargo.jpg", alt: "Czarne spodnie cargo z kieszeniami bocznymi, zawieszone na łańcuchach" },
      { url: "/images/products/cargo-detail.jpg", alt: "Zbliżenie kieszeni cargo" },
    ],
    variants: [
      { size: "30", stock: 3 },
      { size: "32", stock: 8 },
      { size: "34", stock: 0 },
      { size: "36", stock: 5 },
    ],
  },
];

async function main() {
  for (const [i, p] of products.entries()) {
    const { images, variants, ...data } = p;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...data,
        sortOrder: i,
        images: { create: images.map((img, position) => ({ ...img, position })) },
        variants: { create: variants.map((v, sortOrder) => ({ ...v, sortOrder })) },
      },
    });
  }
  console.log(`Seed: ${products.length} produkty`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
