"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/lib/site";

export function CampaignFilm() {
  const [playing, setPlaying] = useState(false);
  const video = site.campaignVideo;

  return (
    <section className="bg-void py-30">
      <div className="wrap mb-8 flex justify-between gap-6">
        <span className="label">Film kampanii — FW26</span>
        <span className="micro text-ink-muted">(05) / (08)</span>
      </div>
      <div className="wrap">
        <div className="frame aspect-[2.39/1]">
          {playing && video ? (
            <video src={video} autoPlay controls playsInline className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <>
              <div data-speed="0.18" className="absolute -inset-y-[14%] inset-x-0">
                <Image
                  src="/images/campaign/film.jpg"
                  alt="Kadr z filmu: ubrania kolekcji zawieszone w ciemnym studiu"
                  fill
                  sizes="100vw"
                  className="object-cover brightness-[0.85] blur-[2px] grayscale"
                />
              </div>
              <div className="scanlines" />
              <div className="local-grain" />
              <div className="vignette" />
              <div className="brackets" />
              {video ? (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="label absolute inset-0 z-5 m-auto h-14 w-[180px] cursor-pointer border border-line-strong bg-void/35 backdrop-blur-xl backdrop-saturate-50"
                >
                  [ Play ▸ ]
                </button>
              ) : (
                <span className="label absolute inset-0 z-5 m-auto flex h-14 w-fit items-center border border-line-strong bg-void/35 px-4 backdrop-blur-xl">
                  [ Film — wkrótce ]
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
