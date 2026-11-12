import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { CampaignFilm } from "@/components/home/CampaignFilm";
import { ScrollEffects } from "@/components/ScrollEffects";
import { Countdown } from "@/components/Countdown";
import { SubscribeForm } from "@/components/SubscribeForm";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { getProducts, totalStock } from "@/lib/products";
import { site } from "@/lib/site";

export const revalidate = 60;

const manifest =
  "Nie projektujemy na dzień. Projektujemy na godziny, w których nikt nie patrzy. Ciężkie tkaniny, czyste cięcia, cień jako materiał.";

const social = [
  { src: "/images/social/sq1.jpg", label: "Nadruk T-shirtu 04" },
  { src: "/images/social/sq2.jpg", label: "Kurtka bomber" },
  { src: "/images/social/sq3.jpg", label: "Dłoń i bransoleta" },
  { src: "/images/social/sq4.jpg", label: "Karabińczyki i łańcuchy" },
  { src: "/images/social/sq5.jpg", label: "Kurtka z futra" },
  { src: "/images/social/sq6.jpg", label: "Buty" },
];

export default async function HomePage() {
  const products = await getProducts();
  const [lead, ...rest] = products;
  const cargo = products.find((p) => p.slug === "spodnie-cargo");

  return (
    <main id="main">
      <ScrollEffects />
      <Hero />

      {/* (02) Manifest */}
      <section id="manifest" className="relative overflow-hidden bg-paper pt-45 pb-50 text-void">
        <div data-speed="0.4" aria-hidden="true" className="absolute inset-x-0 top-10">
          <div className="disp whitespace-nowrap pl-[4vw] text-paper-line" style={{ fontSize: "clamp(6rem, 26vw, 26rem)" }}>
            / Noc
          </div>
        </div>
        <div className="wrap relative grid items-start gap-12 md:grid-cols-4">
          <div className="micro flex flex-col gap-2">
            <span>(02) Manifesto</span>
            <span className="opacity-75">◆ 52.2297° N, 21.0122° E</span>
          </div>
          <p
            data-words
            data-speed="-0.08"
            className="m-0 font-semibold leading-[1.02] tracking-[-0.035em] [font-stretch:85%] [text-wrap:pretty] md:col-span-3"
            style={{ fontSize: "clamp(2rem, 4.6vw, 4.6rem)" }}
          >
            {manifest.split(" ").map((w, i) => (
              <span key={i} className={`wd ${w.startsWith("cień") ? "font-serif font-normal italic" : ""}`}>
                {w}{" "}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* (03) Kolekcja */}
      <section id="kolekcja" className="wrap border-t border-line py-40">
        <div className="mb-18 flex flex-wrap items-end justify-between gap-6">
          <h2 className="disp m-0 max-w-[1000px]" style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}>
            Ciężkie tkaniny. Czyste linie. Nic zbędnego.
          </h2>
          <span className="micro text-ink-muted">(03) Kolekcja · [{String(products.length).padStart(2, "0")}]</span>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-12">
          {lead && (
            <div data-speed="0.06" className="md:col-span-7">
              <ProductCard product={lead} index={0} caption sizes="(min-width: 768px) 58vw, 100vw" />
            </div>
          )}
          <div data-speed="-0.14" className="flex flex-col gap-24 md:col-span-4 md:col-start-9 md:pt-50">
            {rest.slice(0, 2).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i + 1} caption sizes="(min-width: 768px) 33vw, 100vw" />
            ))}
          </div>
        </div>
        <div className="mt-18 flex justify-end">
          <Link href="/katalog" className="label ul">
            Zobacz cały katalog &gt;
          </Link>
        </div>
      </section>

      {/* (04) Lookbook */}
      <section id="lookbook" className="overflow-hidden bg-surface pt-35 pb-45">
        <div className="wrap mb-12 flex justify-between gap-6">
          <span className="label">/ Lookbook — After Dark</span>
          <span className="micro text-ink-muted">(04) / (08)</span>
        </div>
        <div className="wrap flex flex-col">
          <figure data-reveal className="m-0 w-full md:w-[78%]">
            <div className="frame h-[420px] md:h-[620px]">
              <div data-speed="0.22" className="absolute -inset-y-[14%] inset-x-0">
                <Image src="/images/campaign/lb-chains.jpg" alt="Spodnie cargo rozpięte na łańcuchach w dymie" fill sizes="(min-width: 768px) 78vw, 100vw" className="object-cover" />
              </div>
              <div className="scanlines" />
              <div className="local-grain" />
              <div className="vignette" />
              <div className="brackets" />
            </div>
            <figcaption className="micro mt-3 text-ink-muted">Roll 03 / Frame 17</figcaption>
          </figure>
          <div data-speed="0.35" aria-hidden="true" className="relative z-2 -mt-[0.3em] self-end">
            <div className="disp" style={{ fontSize: "clamp(5rem, 22vw, 22rem)" }}>Noc</div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-12">
            <div data-speed="-0.25" aria-hidden="true" className="flex-[1_1_280px]">
              <div className="edit italic leading-[0.9]" style={{ fontSize: "clamp(4.5rem, 15vw, 15rem)" }}>cień</div>
            </div>
            <figure data-reveal className="m-0 max-w-[640px] flex-[1_1_420px]">
              <div className="frame h-[520px] md:h-[660px]">
                <div data-speed="0.22" className="absolute -inset-y-[14%] inset-x-0">
                  <Image src="/images/campaign/lb-look.jpg" alt="Postać w ażurowej masce i czarnej bluzie na tle folii" fill sizes="(min-width: 768px) 640px, 100vw" className="object-cover object-[50%_20%]" />
                </div>
                <div className="scanlines" />
                <div className="local-grain" />
                <div className="vignette" />
                <div className="brackets" />
              </div>
              <figcaption className="micro mt-3 text-ink-muted">Roll 03 / Frame 22 · 46°N 19°E · 02:14 AM</figcaption>
            </figure>
          </div>
          <div data-speed="0.3" aria-hidden="true" className="mt-10">
            <div className="disp text-ink-faint" style={{ fontSize: "clamp(5rem, 22vw, 22rem)" }}>Cisza</div>
          </div>
        </div>
      </section>

      <CampaignFilm />

      {/* (06) Materiał */}
      {cargo && (
        <section className="wrap border-t border-line py-40">
          <div className="grid items-end gap-x-6 gap-y-12 md:grid-cols-12">
            <Link href={`/produkt/${cargo.slug}`} className="card block md:col-span-7">
              <div className="frame aspect-[5/4]">
                <Image src="/images/campaign/material-wide.jpg" alt={`${cargo.name} — widok całości`} fill sizes="(min-width: 768px) 58vw, 100vw" className="img-main object-cover" />
                <div className="scanlines opacity-60" />
                <div className="local-grain" />
                <div className="vignette" />
                <div className="brackets" />
              </div>
            </Link>
            <div data-speed="-0.1" className="flex flex-col gap-10 md:col-span-4 md:col-start-9">
              <div className="flex justify-between gap-4">
                <span className="label">/ Materiał</span>
                <span className="micro text-ink-muted">(06) / (08)</span>
              </div>
              <p className="edit m-0 text-[40px]">
                szyte w limitowanych seriach. kiedy znikną — <span className="italic">nie wrócą</span>
              </p>
              <div className="flex items-baseline gap-2">
                <span className="disp text-8xl">{totalStock(cargo)}</span>
                <span className="label">Szt. zostało</span>
              </div>
              <dl className="label m-0 flex flex-col border-t border-line">
                {[
                  ["Model", cargo.name],
                  ["Skład", cargo.composition ?? "—"],
                  ["Rozmiary", cargo.variants.length ? `${cargo.variants.length} warianty` : "—"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-line py-3.5">
                    <dt className="text-ink-muted">{k}</dt>
                    <dd className="m-0 text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      {/* (07) Drop */}
      <section className="relative overflow-hidden border-t border-line bg-surface pt-35 pb-40">
        <div data-speed="0.4" aria-hidden="true" className="absolute top-5 -right-[4vw]">
          <div className="disp text-surface-raised" style={{ fontSize: "clamp(6rem, 24vw, 24rem)" }}>07</div>
        </div>
        <div className="wrap relative flex flex-col gap-12">
          <div className="flex justify-between gap-6">
            <span className="label">/ {site.drop} · [14] [11] [2026] · 20:00 CET</span>
            <span className="micro text-ink-muted">(07) / (08)</span>
          </div>
          <Countdown target={site.dropAt.toISOString()} />
          <SubscribeForm source="DROP" label="Dostęp do dropu 24 h wcześniej" submitLabel="Zapisz >" variant="flare" />
        </div>
      </section>

      {/* (08) Lista */}
      <section className="wrap py-35">
        <div className="grid items-start gap-x-6 gap-y-12 md:grid-cols-12">
          <div className="flex flex-col gap-6 md:col-span-7">
            <span className="micro text-ink-muted">(08) / (08)</span>
            <h2 className="disp m-0" style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}>Dołącz do listy</h2>
            <p className="edit m-0 text-4xl">
              pierwszy dostęp. bez spamu. <span className="italic">tylko dropy</span>
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:pt-10">
            <SubscribeForm source="NEWSLETTER" label="E-mail" submitLabel="Dołącz >" />
          </div>
        </div>
        <ul className="m-0 mt-24 grid list-none grid-cols-3 gap-2 p-0 md:grid-cols-6">
          {social.map((s) => (
            <li key={s.src} className="card frame aspect-square">
              <Image src={s.src} alt={s.label} fill sizes="(min-width: 768px) 16vw, 33vw" className="img-main object-cover" />
              <div className="scanlines" />
              <div className="local-grain" />
            </li>
          ))}
        </ul>
      </section>

      <Footer bigLogo />
    </main>
  );
}
