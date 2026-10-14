"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, ShieldCheck, X } from "lucide-react";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-ivory-100/95 backdrop-blur transition-shadow",
        scrolled ? "border-forest-800/10 shadow-[0_8px_30px_-18px_rgba(23,61,43,0.45)]" : "border-transparent",
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-forest-800 focus:px-4 focus:py-2 focus:text-sm focus:text-ivory-100"
      >
        Skip to content
      </a>
      {/* Announcement bar — trade credentials */}
      <div className="bg-forest-950 text-ivory-100">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-5 py-2 text-center sm:px-8">
          <p className="inline-flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-gold-300">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            IEC · APEDA · GST Registered Exporter
          </p>
          <Link
            href="/quality#licences-heading"
            className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-ivory-100/70 underline decoration-gold-400/60 underline-offset-4 transition-colors hover:text-ivory-100"
          >
            India → World
          </Link>
        </div>
      </div>
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-[0.83rem] font-semibold uppercase tracking-[0.14em] transition-colors",
                  active ? "text-forest-800" : "text-charcoal-500 hover:text-forest-800",
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-2 left-0 h-[2px] w-full origin-left bg-gold-400 transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/request-a-quote"
            className="btn-shine group inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3 text-[0.83rem] font-bold uppercase tracking-[0.12em] text-ivory-100 shadow-[0_14px_30px_-14px_rgba(23,61,43,0.7)] transition-all hover:bg-forest-700 hover:shadow-[0_18px_36px_-14px_rgba(23,61,43,0.75)]"
          >
            Request a Quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest-800/15 text-forest-800 lg:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-forest-800/10 bg-ivory-50 transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="space-y-1 px-5 py-5" onClick={() => setOpen(false)}>
          {navLinks.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-[0.14em]",
                  active
                    ? "bg-forest-800 text-ivory-100"
                    : "text-charcoal-600 hover:bg-forest-800/5 hover:text-forest-800",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/request-a-quote"
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-forest-800 px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-ivory-100"
          >
            Request a Quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
