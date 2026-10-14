"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PackageSearch, Search } from "lucide-react";
import { categories, products } from "@/data/products";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export function Catalogue() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";
  const [category, setCategory] = useState(
    categories.some((c) => c.slug === initialCategory) ? initialCategory : "all",
  );
  const [query, setQuery] = useState("");
  const [availability, setAvailability] = useState("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (availability !== "all" && p.availability !== availability) return false;
      if (!q) return true;
      const cat = categories.find((c) => c.slug === p.category)?.name ?? "";
      return `${p.name} ${cat} ${p.shortDescription}`.toLowerCase().includes(q);
    });
  }, [category, query, availability]);

  return (
    <div>
      {/* Controls */}
      <div className="rounded-2xl border border-forest-800/10 bg-white p-5 shadow-[0_14px_40px_-26px_rgba(23,61,43,0.4)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search products</span>
            <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search rice, turmeric, sesame…"
              className="w-full rounded-full border border-forest-800/15 bg-ivory-100 py-3 pl-11 pr-4 text-sm text-charcoal-800 placeholder:text-charcoal-400/70 focus:border-forest-700"
            />
          </label>
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-forest-800">
            Availability
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="rounded-full border border-forest-800/15 bg-ivory-100 px-4 py-2.5 text-xs font-semibold normal-case tracking-normal text-charcoal-800"
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="on-request">On request</option>
              <option value="to-be-confirmed">To be confirmed</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {[{ slug: "all", name: "All products" }, ...categories].map((c) => {
            const active = category === c.slug;
            const count = c.slug === "all" ? products.length : products.filter((p) => p.category === c.slug).length;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => setCategory(c.slug)}
                aria-pressed={active}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors",
                  active
                    ? "border-forest-800 bg-forest-800 text-ivory-100"
                    : "border-forest-800/20 bg-transparent text-forest-800 hover:border-forest-800 hover:bg-forest-800/5",
                )}
              >
                {c.name}
                <span aria-hidden="true" className={cn("ml-2", active ? "text-gold-300" : "text-gold-600")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result count */}
      <p aria-live="polite" className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-charcoal-400">
        Showing {results.length} of {products.length} products
      </p>

      {/* Grid / empty state */}
      {results.length > 0 ? (
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i, 5) * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-5 flex flex-col items-center rounded-2xl border border-dashed border-forest-800/25 bg-white px-6 py-20 text-center">
          <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-800/[0.06] text-forest-800">
            <PackageSearch className="h-6 w-6" />
          </span>
          <h2 className="mt-5 font-serif text-2xl text-forest-800">No products match your search</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-charcoal-500">
            Try a different keyword or category — or send us your specification and
            we will source to it.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => { setQuery(""); setCategory("all"); setAvailability("all"); }}
              className="rounded-full border border-forest-800/25 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-forest-800 transition-colors hover:bg-forest-800 hover:text-ivory-100"
            >
              Clear filters
            </button>
            <a
              href="/request-a-quote"
              className="rounded-full bg-forest-800 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ivory-100 transition-colors hover:bg-forest-700"
            >
              Request a custom quote
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
