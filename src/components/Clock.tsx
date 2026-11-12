"use client";

import { useEffect, useState } from "react";

function parts(d: Date) {
  const out: Record<string, string> = {};
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Warsaw",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .formatToParts(d)
    .forEach((p) => (out[p.type] = p.value));
  return out;
}

/** Czas warszawski na żywo. variant "stamp" = [DD] [MM] [RRRR] CE · GG:MM:SS */
export function Clock({ variant = "time" }: { variant?: "time" | "stamp" }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!now) return <span aria-hidden="true">&nbsp;</span>;
  const p = parts(now);
  const text =
    variant === "stamp"
      ? `[${p.day}] [${p.month}] [${p.year}] CE · ${p.hour}:${p.minute}:${p.second}`
      : `${p.hour}:${p.minute}`;
  return <time dateTime={now.toISOString()}>{text}</time>;
}
