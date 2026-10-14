import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Brand lockup — emblem artwork served from `/brand` (see public/brand/README.md). */
export function Logo({
  variant = "dark",
  compact = false,
  className,
}: {
  variant?: "dark" | "light";
  compact?: boolean;
  className?: string;
}) {
  const text = variant === "light" ? "text-ivory-100" : "text-forest-800";
  const sub = variant === "light" ? "text-gold-200" : "text-agri-600";
  return (
    <Link
      href="/"
      aria-label="A To Z Exports — home"
      className={cn("group flex items-center gap-3", className)}
    >
      <span
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 group-hover:rotate-6"
      >
        <Image
          src="/brand/a-to-z-mark.svg"
          alt=""
          width={compact ? 34 : 40}
          height={compact ? 34 : 40}
          className={compact ? "h-[34px] w-[34px]" : "h-10 w-10"}
          priority={false}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[1.35rem] tracking-wide",
            text,
            compact && "text-[1.1rem]",
          )}
        >
          A TO Z EXPORTS
        </span>
        <span
          className={cn(
            "mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em]",
            sub,
          )}
        >
          Indian Agriculture · Global Reach
        </span>
      </span>
    </Link>
  );
}
