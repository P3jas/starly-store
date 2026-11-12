"use client";

import { useEffect, useState } from "react";

/** true dopiero po hydracji — dla danych z localStorage i zegara. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
