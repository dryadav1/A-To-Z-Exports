"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SafeImage } from "./SafeImage";

export function ProductGallery({ images }: { images: { src: string; alt: string }[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  if (!current) return null;

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_30px_60px_-35px_rgba(23,61,43,0.6)]">
        <SafeImage
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 ? (
        <div className="mt-3 grid grid-cols-3 gap-3" role="group" aria-label="Product images">
          {images.map((image, i) => (
            <button
              key={image.src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              aria-label={`View image ${i + 1}: ${image.alt}`}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition-all",
                active === i ? "border-gold-400" : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <SafeImage src={image.src} alt="" fill sizes="20vw" loading="lazy" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
