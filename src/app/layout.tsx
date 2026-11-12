import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Starly — After Dark FW26", template: "%s — Starly" },
  description: "Kolekcja FW26. Dla tych, którzy wychodzą, gdy miasto gaśnie.",
  openGraph: {
    title: "Starly — After Dark FW26",
    description: "Kolekcja FW26. Dla tych, którzy wychodzą, gdy miasto gaśnie.",
    images: ["/images/campaign/hero.jpg"],
    locale: "pl_PL",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#050505" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <a href="#main" className="label sr-only z-200 bg-flare p-3 text-on-flare focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
          Przejdź do treści
        </a>
        <SmoothScroll />
        <Header />
        {children}
        <CartDrawer />
        <div className="film-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
