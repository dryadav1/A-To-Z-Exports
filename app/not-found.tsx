import Link from "next/link";
import { ArrowLeft, ArrowRight, Sprout } from "lucide-react";

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="flex flex-1 items-center bg-ivory-100">
      <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
        <span aria-hidden="true" className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-800 text-gold-300">
          <Sprout className="h-7 w-7" strokeWidth={1.5} />
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-gold-600">Error 404</p>
        <h1 id="not-found-title" className="mt-3 font-serif text-4xl text-forest-800 sm:text-5xl">
          This field is empty.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-charcoal-500">
          The page you&apos;re looking for doesn&apos;t exist or was moved. Let&apos;s
          get you back to fertile ground.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ivory-100 transition-colors hover:bg-forest-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full border border-forest-800/25 px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-forest-800 transition-colors hover:bg-forest-800 hover:text-ivory-100"
          >
            Browse products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
