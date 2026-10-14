"use client";

import { useEffect, useState } from "react";

/** Hairline gold reading-progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600 transition-[width] duration-100"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
