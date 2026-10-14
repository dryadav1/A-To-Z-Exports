import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, CircleDashed } from "lucide-react";
import { getCategory, getProduct, getRelated, products } from "@/data/products";
import { ProductGallery } from "@/components/ProductGallery";
import { AvailabilityBadge, ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: { title: `${product.name} · A To Z Exports`, description: product.shortDescription },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const related = getRelated(product);

  return (
    <>
      <section aria-labelledby="product-title" className="bg-ivory-100">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-forest-800">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/products" className="hover:text-forest-800">Products</Link></li>
              {category ? (
                <>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href={`/products?category=${category.slug}`} className="hover:text-forest-800">
                      {category.name}
                    </Link>
                  </li>
                </>
              ) : null}
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-forest-800">{product.name}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <ProductGallery images={product.gallery} />
            </Reveal>
            <Reveal delay={0.1}>
              {category ? (
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-agri-600">
                  {category.name}
                </p>
              ) : null}
              <h1 id="product-title" className="mt-3 font-serif text-4xl leading-tight text-forest-800 sm:text-5xl">
                {product.name}
              </h1>
              <div className="mt-4">
                <AvailabilityBadge value={product.availability} />
              </div>
              <p className="mt-5 text-base leading-relaxed text-charcoal-500 sm:text-lg">
                {product.overview}
              </p>

              {/* Grades */}
              <h2 className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-forest-800">
                Grades &amp; specifications
              </h2>
              <ul className="mt-3 divide-y divide-forest-800/10 rounded-2xl border border-forest-800/10 bg-white">
                {product.grades.map((g) => (
                  <li key={g.label} className="flex items-start gap-3 px-5 py-3.5 text-sm">
                    {g.confirmed ? (
                      <CheckCircle2 aria-label="Confirmed specification" className="mt-0.5 h-4 w-4 shrink-0 text-agri-600" />
                    ) : (
                      <CircleDashed aria-label="To be confirmed" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                    )}
                    <span className="text-charcoal-600">{g.label}</span>
                    {!g.confirmed ? (
                      <span className="ml-auto shrink-0 rounded-full bg-gold-100/70 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-gold-700">
                        To be confirmed
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>

              {/* Packaging + MOQ */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-forest-800/10 bg-white p-5">
                  <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-forest-800">Packaging</h2>
                  <ul className="mt-2 space-y-1.5 text-sm text-charcoal-600">
                    {product.packaging.map((p) => (
                      <li key={p.label}>
                        {p.label}
                        {!p.confirmed ? <span className="text-gold-700"> *</span> : null}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-forest-800/10 bg-white p-5">
                  <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-forest-800">Min. order</h2>
                  <p className="mt-2 text-sm text-charcoal-600">
                    {product.moq ? product.moq.label : "To be confirmed"}
                    {product.moq && !product.moq.confirmed ? <span className="text-gold-700"> *</span> : null}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-charcoal-400">
                * Placeholder details for layout demonstration — final grades, packaging
                and order quantities are confirmed with you before supply is committed.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/request-a-quote?product=${product.slug}`}
                  className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-forest-800 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-ivory-100 transition-colors hover:bg-forest-700"
                >
                  Enquire about {product.name}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-forest-800/25 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-forest-800 transition-colors hover:bg-forest-800 hover:text-ivory-100"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  All products
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section aria-labelledby="product-enquiry" className="border-t border-forest-800/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
          <Reveal>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-gold-600">Product inquiry</p>
            <h2 id="product-enquiry" className="mt-4 font-serif text-3xl leading-tight text-forest-800 sm:text-4xl">
              Ask About {product.name}.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal-500">
              Tell us your target specification, quantity and destination — we will
              respond with feasibility and next steps within 1–2 business days.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm defaultProduct={product.name} />
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section aria-labelledby="related-heading" className="bg-ivory-100">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <h2 id="related-heading" className="font-serif text-3xl text-forest-800">
            Related Products
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
