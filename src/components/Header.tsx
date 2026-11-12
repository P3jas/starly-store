
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Clock } from "./Clock";
import { useCart, cartCount } from "@/lib/cart";
import { useMounted } from "@/lib/use-mounted";
import { site } from "@/lib/site";

const links = [
  { href: "/katalog", label: "(01) Katalog" },
  { href: "/#lookbook", label: "(02) Lookbook" },
  { href: "/#manifest", label: "(03) Manifest" },
  { href: "/#archiwum", label: "(04) Archiwum" },
];

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useCart((s) => s.items);
  const setCartOpen = useCart((s) => s.setOpen);
  const mounted = useMounted();
  const count = mounted ? cartCount(items) : 0;

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-60 text-ink ${
          onHome ? "mix-blend-difference" : "border-b border-line bg-void/70 backdrop-blur-xl backdrop-saturate-50"
        }`}
      >
        {/* sekcja nad menu z zegarem i informacja o kolekcji i dropie */}
        <div className="wrap micro flex items-center justify-between gap-4 border-b border-ink/15 py-3">
          <div className="flex items-center gap-2">
            <span className="live-dot" aria-hidden="true" />
            <Clock variant="stamp" />
          </div>
          <span className="hidden sm:inline">
            Signal · {site.collection} / {site.drop}
          </span>
        </div>
        {/* menu desktop i koszyk */}
        <nav aria-label="Główna" className="wrap flex items-center justify-between gap-6 py-3">
          <Link href="/" aria-label="Starly — strona główna" className="flex min-h-11 items-center">
            <Image src="/images/logo-white.png" alt="Starly" width={1340} height={590} className="h-8 w-auto" priority />
          </Link>
          <div className="label hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="ul"
                aria-current={pathname === l.href ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </div>
          {/* koszyk i przycisk menu mobilnego */}
          <div className="label flex items-center gap-6">
            <button type="button" className="ul min-h-11 cursor-pointer" onClick={() => setCartOpen(true)}>
              Koszyk[ {count} ]
            </button>
            
            <button
              type="button"
              className="min-h-11 cursor-pointer md:hidden"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              onClick={() => setMenuOpen(true)}
            >
              Menu +
            </button>
          </div>
        </nav>
      </header>
      {/* menu mobilne */}
      {menuOpen && (
        <div
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="wrap fixed inset-0 z-80 flex flex-col justify-center gap-2 bg-void"
        >
          <button
            type="button"
            className="label absolute top-6 right-[clamp(16px,4.5vw,64px)] min-h-11 cursor-pointer"
            onClick={() => setMenuOpen(false)}
            autoFocus
          >
            Zamknij ×
          </button>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="disp text-[12vw]" onClick={() => setMenuOpen(false)}>
              {l.label.replace(/^\(\d+\)\s/, "")}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
