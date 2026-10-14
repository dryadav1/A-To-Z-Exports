import { NextResponse } from "next/server";
import { deliverInquiry, type InquiryPayload } from "@/lib/inquiry";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-().]{5,21}$/;

// Lightweight per-IP rate limit so the email relay can't be abused.
// (Single-instance; move to shared store if ever deployed multi-instance.)
const hits = new Map<string, { count: number; resetAt: number }>();
const RATE_MAX = 5;
const RATE_WINDOW_MS = 5 * 60 * 1000;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX;
}

function invalid(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries from this address. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }
  let body: Partial<InquiryPayload>;
  try {
    body = await request.json();
  } catch {
    return invalid("The request body must be valid JSON.");
  }

  const name = body.name?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const country = body.country?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const product = body.product?.trim() ?? "";
  const shippingTerms = body.shippingTerms?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (name.length < 2) return invalid("Please provide your full name.");
  if (company.length < 2) return invalid("Please provide your company name.");
  if (!EMAIL_RE.test(email)) return invalid("Please provide a valid email address.");
  if (!PHONE_RE.test(phone) || phone.replace(/\D/g, "").length < 6) {
    return invalid("Please provide a valid phone / WhatsApp number.");
  }
  if (!country) return invalid("Please provide your country.");
  if (!product) return invalid("Please select a product of interest.");
  if (!shippingTerms) return invalid("Please select the shipping terms.");
  if (body.kind === "quote" && !(body.quantity ?? "").trim()) {
    return invalid("Please provide an estimated order quantity.");
  }
  if (message.length < 10) {
    return invalid("Please describe your requirement in a little more detail (min. 10 characters).");
  }

  const payload: InquiryPayload = {
    kind: body.kind === "quote" || body.kind === "product" ? body.kind : "contact",
    name,
    company: company || undefined,
    email,
    country,
    phone: phone || undefined,
    product: product || undefined,
    grade: body.grade?.trim() || undefined,
    quantity: body.quantity?.trim() || undefined,
    packaging: body.packaging?.trim() || undefined,
    destination: body.destination?.trim() || undefined,
    shippingTerms: shippingTerms || undefined,
    inquiryType: body.inquiryType?.trim() || undefined,
    message,
  };

  try {
    const result = await deliverInquiry(payload);
    return NextResponse.json({
      ok: true,
      delivered: result.delivered,
      pendingActivation: result.pendingActivation ?? false,
      attempted: result.attempted ?? [],
      note: result.note,
    });
  } catch (error) {
    console.error("[inquiry] Delivery failed:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong while recording your enquiry. Please try again or contact us directly." },
      { status: 500 },
    );
  }
}
