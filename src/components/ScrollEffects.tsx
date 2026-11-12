"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Efekty przewijania strony głównej:
 *  [data-speed]  — paralaksa (dodatnia = wolniej niż scroll, ujemna = szybciej)
 *  [data-reveal] — zdjęcie odsłaniane od dołu
 *  [data-words]  — słowa wyostrzające się z rozmycia
 */
export function ScrollEffects() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = parseFloat(el.dataset.speed ?? "0");
        const distance = speed * 400;
        gsap.fromTo(
          el,
          { y: -distance / 2 },
          {
            y: distance / 2,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 95%", end: "top 45%", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll(".wd"),
          { opacity: 0.1, filter: "blur(10px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 55%", scrub: true },
          },
        );
      });

      ScrollTrigger.refresh();
    });

    return () => mm.revert();
  }, []);

  return null;
}
