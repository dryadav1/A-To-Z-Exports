"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

/** Copyright line with the year resolved on the client (keeps pages statically prerenderable). */
export function CopyrightYear() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    // Intentional deferred client-only read: keeps the page statically
    // prerenderable while showing the current year after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear());
  }, []);
  return (
    <p>
      © {year ?? "2026"} {siteConfig.name}. All rights reserved.
    </p>
  );
}
