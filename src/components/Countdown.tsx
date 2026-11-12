"use client";

import { useEffect, useState } from "react";
import { pad2 } from "@/lib/format";

export function Countdown({ target }: { target: string }) {
  const end = new Date(target).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  let s = now === null ? 0 : Math.max(0, Math.floor((end - now) / 1000));
  const d = Math.floor(s / 86400);
  s -= d * 86400;
  const h = Math.floor(s / 3600);
  s -= h * 3600;
  const m = Math.floor(s / 60);
  s -= m * 60;

  const text = now === null ? "--D : --H : --M : --S" : `${pad2(d)}D : ${pad2(h)}H : ${pad2(m)}M : ${pad2(s)}S`;

  return (
    <p
      role="timer"
      aria-label="Czas do premiery dropu"
      className="m-0 whitespace-nowrap font-mono font-medium leading-none tracking-[-0.04em] [text-shadow:0_0_24px_rgb(255_255_255/0.28)]"
      style={{ fontSize: "clamp(2.2rem, 8.4vw, 9rem)" }}
    >
      {text}
    </p>
  );
}
