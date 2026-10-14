"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

const FALLBACK = "/images/fallback.svg";

/**
 * next/image wrapper that swaps to a branded local fallback if the remote
 * photograph fails to load — no broken-image icons, ever.
 */
export function SafeImage({ src, alt, ...rest }: ImageProps) {
  const [current, setCurrent] = useState(src);
  return (
    <Image
      src={current}
      alt={alt}
      onError={() => {
        if (current !== FALLBACK) setCurrent(FALLBACK);
      }}
      {...rest}
    />
  );
}
