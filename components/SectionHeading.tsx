import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Eyebrow({ children, tone = "gold" }: { children: React.ReactNode; tone?: "gold" | "green" | "light" }) {
  return (
    <p
      className={cn(
        "text-[0.7rem] font-bold uppercase tracking-[0.3em]",
        tone === "gold" && "text-gold-600",
        tone === "green" && "text-agri-600",
        tone === "light" && "text-gold-200",
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "center",
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <Eyebrow tone={tone === "light" ? "light" : "gold"}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-4 font-serif text-3xl leading-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          tone === "light" ? "text-ivory-100" : "text-forest-800",
        )}
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-pretty sm:text-lg",
            tone === "light" ? "text-ivory-100/80" : "text-charcoal-500",
          )}
        >
          {copy}
        </p>
      ) : null}
    </Reveal>
  );
}
