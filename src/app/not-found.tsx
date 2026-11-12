import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="wrap flex min-h-screen flex-col justify-center gap-8">
      <span className="micro text-ink-muted">(404) Signal lost</span>
      <h1 className="disp m-0" style={{ fontSize: "clamp(4rem, 18vw, 18rem)" }}>
        Pustka
      </h1>
      <p className="edit m-0 text-5xl">
        niektóre światła <span className="italic">gasną</span>
      </p>
      <Link href="/" className="label ul self-start">
        &lt; Strona główna
      </Link>
    </main>
  );
}
