"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const SRC = "/images/campaign/hero.jpg";

/** Hero z efektem latarki: ostre koło wokół kursora, reszta lekko rozmyta. */
export function Hero() {
  const sharp = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    sharp.current?.style.setProperty("--x", `${e.clientX - r.left}px`);
    sharp.current?.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  return (
    <section onMouseMove={onMove} className="relative min-h-[920px] overflow-hidden bg-void">
      <div aria-hidden="true" className="hero-blur absolute -inset-[4%] blur-[4px] brightness-[0.88]">
        <div data-speed="0.18" className="absolute inset-0">
          <Image src={SRC} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>
      <div ref={sharp} aria-hidden="true" className="hero-sharp absolute -inset-[4%] contrast-[1.15] brightness-[1.08]">
        <div data-speed="0.18" className="absolute inset-0">
          <Image src={SRC} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>
      <div className="scanlines opacity-50" />
      <div className="vignette" />
      {/* Na telefonie przyciemnienie, żeby tekst nie walczył z logo na zdjęciu */}
      <div aria-hidden="true" className="absolute inset-0 bg-void/72 md:hidden" />

      <div
        data-speed="-0.12"
        className="wrap relative z-4 flex flex-wrap items-start justify-between gap-6 pt-[150px]"
      >
        <div className="label flex flex-col gap-2">
          <span>[FW26] Collection — Drop 07</span>
          <span className="text-ink-muted">Dostępna od [14] [11] [2026] · 20:00 CET</span>
        </div>
        <span className="micro text-ink-muted">(01) / (08)</span>
      </div>

      <div data-speed="-0.06" className="wrap relative z-4 mt-[150px] flex max-w-[520px] flex-col gap-8">
        <p className="edit m-0 text-[36px] max-md:[filter:none] md:text-[44px]">
          dla tych, którzy wychodzą, gdy miasto <span className="italic">gaśnie</span>
        </p>
        <p className="m-0 max-w-[400px] text-[22px] leading-7 tracking-[-0.01em]">
          Kolekcja FW26. <span className="text-ink-muted">Ciężkie tkaniny, czyste cięcia, cień jako materiał.</span>
        </p>
        <Link href="/katalog" className="flare label self-start">
          + Odkryj kolekcję +
        </Link>
      </div>

      <div className="micro absolute right-[clamp(16px,4.5vw,64px)] bottom-[320px] z-4 hidden flex-col items-center gap-3 md:flex">
        <span className="[writing-mode:vertical-rl]">Scroll</span>
        <span className="scroll-line" aria-hidden="true" />
      </div>

      <div data-speed="0.5" aria-hidden="true" className="absolute inset-x-0 bottom-0 z-2">
        <div
          className="disp whitespace-nowrap pl-[clamp(8px,2vw,32px)] text-ink-faint blur-[6px]"
          style={{ fontSize: "clamp(4rem, 18vw, 20rem)", transform: "translate(2%, -22%)" }}
        >
          After Dark
        </div>
      </div>
      <div data-speed="0.32" className="absolute inset-x-0 bottom-0 z-3">
        <h1
          className="disp m-0 overflow-hidden whitespace-nowrap pt-[0.04em] pl-[clamp(8px,2vw,32px)] text-ink"
          style={{ fontSize: "clamp(4rem, 18vw, 20rem)", transform: "translateY(14%)" }}
        >
          <span className="rise">After</span> <span className="rise [animation-delay:0.12s]">Dark</span>
        </h1>
      </div>
    </section>
  );
}
