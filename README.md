# Starly — After Dark FW26

Sklep-landing dla marki odzieżowej w mrocznym, edytorskim stylu: ziarno filmowe, rozmycie, wysoki kontrast i paralaksa przy przewijaniu. Projekt portfolio: frontend z animacjami + prawdziwy backend na PostgreSQL.

## Stack

| Warstwa | Technologia |
|---|---|
| Framework | Next.js 15 (App Router, Server Components, Server Actions), TypeScript |
| Style | Tailwind CSS 4 z tokenami design systemu Starly (`src/app/globals.css`) |
| Animacje | GSAP + ScrollTrigger (paralaksa, odsłanianie), Lenis (płynny scroll) |
| Baza | PostgreSQL + Prisma 6 (tryb bez silnika w Rust, sterownik `pg`) |
| Stan koszyka | Zustand z zapisem w `localStorage` |
| Walidacja | Zod (formularze i zamówienia, po stronie serwera) |
| Fonty | Archivo (oś szerokości), Instrument Serif, JetBrains Mono — hostowane lokalnie |

## Funkcje

- **Strona główna**: hero z efektem „latarki” (ostre koło wokół kursora), manifest odsłaniany słowo po słowie, asymetryczna kolekcja, lookbook z paralaksą, odliczanie do dropu.
- **Katalog** (`/katalog`) z filtrem kategorii w adresie URL (`?kategoria=dol`).
- **Strona produktu** (`/produkt/[slug]`): galeria, wybór rozmiaru, wyprzedane rozmiary, „zostało N szt.”, dane strukturalne `Product` (JSON-LD).
- **Koszyk** w wysuwanym panelu, z limitem ilości wg stanu magazynowego.
- **Zamówienie demo**: transakcja w bazie, atomowe zmniejszenie stanu (`UPDATE … WHERE stock >= qty`), ceny liczone z bazy (nie z przeglądarki), strona potwierdzenia.
- **Zapisy e-mail** (newsletter i lista dropu) do tabeli `Subscriber`.
- **Dostępność**: obsługa klawiatury, widoczny focus, `prefers-reduced-motion` wyłącza animacje, alt-texty, link „Przejdź do treści”.
- **Wydajność**: strony produktów generowane statycznie (ISR, odświeżanie co 60 s i po każdym zamówieniu), `next/image` (AVIF/WebP).

## Uruchomienie

Wymagania: Node.js 20+, PostgreSQL 14+ (np. w Dockerze).

```bash
npm install
cp .env.example .env              # wpisz swój DATABASE_URL
npx prisma migrate deploy         # tworzy tabele
npm run db:seed                   # 3 produkty startowe
npm run dev                       # http://localhost:3000
```

Jeśli w Postgresie nie ma jeszcze bazy `starly`:

```bash
docker exec -it <nazwa-kontenera> createdb -U postgres starly
```

Nie masz Postgresa? `docker compose up -d` uruchomi go z pliku `docker-compose.yml` (port 5432, użytkownik i hasło `postgres`).

### Skrypty

| Skrypt | Co robi |
|---|---|
| `npm run dev` | serwer deweloperski |
| `npm run build` | `prisma generate` + build produkcyjny (wymaga działającej bazy — generuje strony produktów) |
| `npm run db:migrate` | nowa migracja po zmianie `schema.prisma` |
| `npm run db:seed` | dane startowe |
| `npm run db:studio` | podgląd bazy w przeglądarce (Prisma Studio) |

## Struktura

```
prisma/
  schema.prisma          Product, ProductImage, Variant, Subscriber, Order, OrderItem
  migrations/            migracje SQL
  seed.ts                produkty startowe (ceny przykładowe)
src/
  app/
    page.tsx             strona główna
    katalog/             katalog z filtrem
    produkt/[slug]/      strona produktu + AddToCart
    zamowienie/[id]/     potwierdzenie zamówienia
    actions.ts           Server Actions: subscribe, createOrder
    globals.css          tokeny Starly + komponenty CSS
  components/            Header, CartDrawer, ProductCard, SmoothScroll, ScrollEffects, …
  lib/                   prisma, koszyk (Zustand), zapytania o produkty, formatowanie
```

### Paralaksa

Każdy element z atrybutem `data-speed` dostaje paralaksę (`ScrollEffects.tsx`): wartość dodatnia przesuwa się wolniej niż scroll, ujemna szybciej. `data-reveal` odsłania zdjęcie od dołu, `data-words` wyostrza słowa z rozmycia.

## Deploy (Vercel)

1. Załóż bazę w chmurze (np. Neon lub Supabase, darmowy plan) i ustaw `DATABASE_URL` w Vercel → Settings → Environment Variables.
2. Uruchom `npx prisma migrate deploy` i `npm run db:seed` na tej bazie.
3. Zaimportuj repozytorium w Vercel. Opcjonalnie ustaw `NEXT_PUBLIC_SITE_URL` (dla linków Open Graph).

## Do zrobienia

- [ ] Prawdziwe ceny i opisy produktów w `prisma/seed.ts`
- [ ] Plik wideo kampanii (`site.campaignVideo` w `src/lib/site.ts`)
- [ ] Wersja EN
- [ ] Testy e2e (Playwright) i GitHub Actions
- [ ] Panel admina
