import Image from "next/image";
import Link from "next/link";
import { Clock } from "./Clock";

const columns = [
  {
    title: "(01) Sklep",
    links: [
      { href: "/katalog", label: "Katalog" },
      { href: "/#lookbook", label: "Lookbook" },
      { href: "/#manifest", label: "Manifest" },
    ],
  },
  {
    title: "(02) Pomoc",
    links: [
      { href: "/#archiwum", label: "Wysyłka" },
      { href: "/#archiwum", label: "Zwroty" },
      { href: "/#archiwum", label: "Rozmiary" },
    ],
  },
  { title: "(03) Kontakt", links: [{ href: "mailto:kontakt@example.com", label: "[E-mail]" }] },
  { title: "(04) Social", links: [{ href: "https://instagram.com", label: "Instagram" }] },
];

export function Footer({ bigLogo = false }: { bigLogo?: boolean }) {
  return (
    <footer id="archiwum" className="overflow-hidden border-t border-line pt-20">
      <div className="wrap flex flex-col gap-14">
        <div className="label grid grid-cols-2 gap-6 md:grid-cols-4">
          {columns.map((c) => (
            <div key={c.title} className="flex flex-col items-start gap-3">
              <span className="text-ink-muted">{c.title}</span>
              {c.links.map((l) => (
                <Link key={l.label} href={l.href} className="ul">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="micro flex flex-wrap justify-between gap-x-8 gap-y-4 border-t border-line pt-6 pb-8">
          <span>© 2026 Starly® — Warszawa</span>
          <span className="text-ink-muted">Wysyłka UE ◆ Zwroty 30 dni ◆ Płatności</span>
          <span>
            Warsaw · <Clock />
          </span>
        </div>
      </div>
      {bigLogo && (
        <div data-speed="0.25" aria-hidden="true" className="wrap -mb-[4vw] flex justify-center">
          <Image
            src="/images/logo-white.png"
            alt=""
            width={1340}
            height={590}
            sizes="(min-width: 1300px) 1200px, 92vw"
            className="h-auto w-full max-w-[1200px] drop-shadow-[0_0_32px_rgb(255_255_255/0.35)]"
          />
        </div>
      )}
    </footer>
  );
}
