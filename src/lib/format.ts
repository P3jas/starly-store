const number = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 2 });

/** 249000 (grosze) → "2 490 PLN" */
export function formatPrice(grosze: number) {
  return `${number.format(grosze / 100)} PLN`;
}

//dodaje zero na początek liczby jeśli jest mniejsza niż 10
export const pad2 = (n: number) => String(n).padStart(2, "0");
