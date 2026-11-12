export const site = {
  name: "Starly",
  city: "Warszawa",
  collection: "FW26",
  drop: "Drop 07",
  /** Premiera dropu: 14.11.2026, 20:00 czasu warszawskiego */
  dropAt: new Date("2026-11-14T20:00:00+01:00"),
  /** Plik wideo kampanii, np. "/video/campaign.mp4". Null = sam kadr. */
  campaignVideo: null as string | null,
};

export const categories = [
  { slug: "gora", label: "Góra", value: "TOP" },
  { slug: "dol", label: "Dół", value: "BOTTOM" },
  { slug: "akcesoria", label: "Akcesoria", value: "ACCESSORY" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
