import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { availabilityLabel, getCategory, type Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { SafeImage } from "./SafeImage";

export function AvailabilityBadge({ value }: { value: Product["availability"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em]",
        value === "available" && "border-agri-500/40 bg-agri-500/10 text-agri-700",
        value === "on-request" && "border-gold-500/50 bg-gold-100/60 text-gold-700",
        value === "to-be-confirmed" && "border-charcoal-400/30 bg-charcoal-800/5 text-charcoal-500",
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {availabilityLabel[value]}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-forest-800/10 bg-white shadow-[0_10px_40px_-24px_rgba(23,61,43,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-400/60 hover:shadow-[0_28px_60px_-24px_rgba(150,112,60,0.45)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <SafeImage
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-950/35 via-transparent to-transparent opacity-80" />
        <div className="absolute left-4 top-4">
          <AvailabilityBadge value={product.availability} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        {category ? (
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-agri-600">
            {category.name}
          </p>
        ) : null}
        <h3 className="mt-2 font-serif text-[1.45rem] leading-snug text-forest-800">
          <Link
            href={`/products/${product.slug}`}
            className="transition-colors group-hover:text-forest-600"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-500">
          {product.shortDescription}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-forest-800/10 pt-4">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-forest-800 transition-colors hover:text-agri-600"
          >
            View details
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
          <Link
            href={`/request-a-quote?product=${product.slug}`}
            className="inline-flex items-center gap-1.5 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-gold-600 transition-colors hover:text-gold-700"
          >
            Enquire
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
