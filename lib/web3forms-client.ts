"use client";

import { inquiryBody, inquirySubject, type InquiryPayload } from "@/lib/inquiry";

export interface DirectResult {
  ok: boolean;
  error?: string;
}

/**
 * Browser → Web3Forms direct submission (their documented free-tier pattern).
 * Runs in the buyer's browser, so provider bot-checks that block datacenter
 * IPs never trigger. The access key is public by design (Web3Forms docs put
 * it in frontend code) and only ever sends to the registered business inbox.
 */
export async function submitDirect(payload: InquiryPayload): Promise<DirectResult> {
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!key) return { ok: false, error: "Direct delivery is not configured yet." };
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: inquirySubject(payload),
        from_name: `${payload.name} (via A To Z Exports website)`,
        email: payload.email,
        message: inquiryBody(payload),
        Company: payload.company ?? "—",
        Country: payload.country,
        Phone: payload.phone ?? "—",
        "Inquiry type": payload.inquiryType ?? payload.kind,
        Product: payload.product ?? "—",
        "Grade / specs": payload.grade ?? "—",
        Quantity: payload.quantity ?? "—",
        Packaging: payload.packaging ?? "—",
        Destination: payload.destination ?? "—",
        "Shipping terms": payload.shippingTerms ?? "—",
        botcheck: "",
      }),
      signal: AbortSignal.timeout(20000),
    });
    const data = (await res.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
    } | null;
    if (res.ok && data?.success) return { ok: true };
    return { ok: false, error: data?.message || `Delivery service responded with ${res.status}.` };
  } catch {
    return { ok: false, error: "Could not reach the delivery service. Try again." };
  }
}
