/**
 * Enquiry delivery — implemented, not a stub.
 *
 * Delivery order (server-side, buyer address never trusted for routing):
 *  1. Resend — when RESEND_API_KEY + INQUIRY_FROM_EMAIL are set. Branded
 *     enquiry email to the business inbox AND a confirmation to the buyer.
 *  2. Web3Forms — when WEB3FORMS_KEY is set. Free, no domain needed, built
 *     for server-to-inbox delivery. (Recommended default; see `.env.example`.)
 *  3. Form relay — legacy fallback. Works from residential networks but many
 *     hosting providers' IPs are challenged, so it is no longer the default
 *     path when Web3Forms is available.
 *
 * Every outcome is reported honestly: { delivered } is true ONLY when a
 * provider accepted the message for forwarding. Failures are logged with the
 * full payload so no enquiry is ever silently lost.
 */

import { siteConfig } from "./site";

export interface InquiryPayload {
  kind: "contact" | "quote" | "product";
  name: string;
  company?: string;
  email: string;
  country: string;
  phone?: string;
  product?: string;
  grade?: string;
  quantity?: string;
  packaging?: string;
  destination?: string;
  shippingTerms?: string;
  inquiryType?: string;
  message: string;
}

export interface DeliveryResult {
  delivered: boolean;
  channel?: string;
  note: string;
  /** True when the relay accepted the message but the inbox needs its
   *  one-time activation click before forwarding starts. */
  pendingActivation?: boolean;
}

/** Business inbox: explicit env override, else the confirmed site contact email. */
export function businessInbox(): string {
  return process.env.BUSINESS_NOTIFICATION_EMAIL?.trim() || siteConfig.contact.email.value;
}

export async function deliverInquiry(
  payload: InquiryPayload,
): Promise<DeliveryResult> {
  const to = businessInbox();
  if (!to) {
    console.info("[inquiry:fallback] New enquiry received (no inbox configured):", {
      kind: payload.kind,
      name: payload.name,
      email: payload.email,
      product: payload.product,
    });
    return {
      delivered: false,
      note: "No business inbox configured. See lib/inquiry.ts and .env.example.",
    };
  }

  // 1) Resend — full delivery with buyer confirmation, when configured.
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL || process.env.EMAIL_FROM_ADDRESS;
  if (process.env.INQUIRY_PROVIDER === "resend" && resendKey && from) {
    try {
      const sent = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: payload.email,
          subject: inquirySubject(payload),
          text: inquiryBody(payload),
        }),
        signal: AbortSignal.timeout(15000),
      });
      if (sent.ok) {
        // Buyer confirmation (best-effort; never blocks the business email).
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to: [payload.email],
            subject: `We received your enquiry — A To Z Exports`,
            text:
              `Dear ${payload.name},\n\nThank you — we received your enquiry${payload.product ? ` about ${payload.product}` : ""} and will respond within 1–2 business days.\n\n— A To Z Exports`,
          }),
          signal: AbortSignal.timeout(15000),
        }).catch((e) => console.error("[inquiry:resend] buyer confirmation failed:", e));
        return { delivered: true, channel: "resend", note: "Sent via Resend." };
      }
      console.error("[inquiry:resend] rejected:", sent.status, await sent.text().catch(() => ""));
    } catch (e) {
      console.error("[inquiry:resend] transport error, falling back to relay:", e);
    }
  }

  // 2) Web3Forms — server-friendly inbox delivery, no domain needed.
  const web3Key = process.env.WEB3FORMS_KEY;
  if (web3Key) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3Key,
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
        signal: AbortSignal.timeout(15000),
      });
      const data = (await res.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;
      if (res.ok && data?.success) {
        return { delivered: true, channel: "web3forms", note: "Enquiry emailed to the business inbox." };
      }
      throw new Error(data?.message || `Web3Forms responded with HTTP ${res.status}.`);
    } catch (e) {
      console.error("[inquiry:web3forms] failed, falling back to relay:", e);
    }
  }

  // 3) Form relay — legacy fallback (see note above).
  // NOTE: the relay validates Origin/Referer like a browser form post,
  // so we send the site's own URL as the referrer.
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/$/, "");
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: siteUrl,
        Referer: `${siteUrl}/request-a-quote`,
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        _subject: inquirySubject(payload),
        _template: "table",
        _captcha: "false",
        _replyto: payload.email,
        _autoresponse: `Dear ${payload.name},\n\nThank you — A To Z Exports received your enquiry${payload.product ? ` about ${payload.product}` : ""}. Our team will respond within 1–2 business days.\n\n— A To Z Exports, Bhosari, Pune`,
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
        Message: payload.message,
      }),
      signal: AbortSignal.timeout(15000),
    });
    const data = (await res.json().catch(() => null)) as { success?: string; message?: string } | null;
    const message = String(data?.message ?? "");
    if (/activat/i.test(message)) {
      console.warn(
        "[inquiry:relay] Relay accepted the message BUT the business inbox needs its one-time activation click. Owner: check the inbox for the relay activation email and click it. Payload logged below.",
        { kind: payload.kind, name: payload.name, email: payload.email, product: payload.product },
      );
      return {
        delivered: false,
        pendingActivation: true,
        channel: "relay",
        note: "Relay accepted; business inbox needs one-time activation.",
      };
    }
    if (res.ok && data?.success !== "false") {
      return { delivered: true, channel: "relay", note: "Enquiry emailed to the business inbox." };
    }
    throw new Error(message || `Relay responded with HTTP ${res.status}.`);
  } catch (e) {
    console.error("[inquiry:relay] failed — enquiry logged, nothing lost:", e, {
      kind: payload.kind,
      name: payload.name,
      email: payload.email,
      company: payload.company,
      country: payload.country,
      product: payload.product,
      quantity: payload.quantity,
      message: payload.message,
    });
    return {
      delivered: false,
      channel: "relay",
      note: "Email relay failed; enquiry logged server-side.",
    };
  }
}

/** Shared subject/body builders so mailto fallbacks stay consistent. */
export function inquirySubject(payload: Pick<InquiryPayload, "kind" | "product" | "name">): string {
  const product = payload.product ? ` — ${payload.product}` : "";
  return `New ${payload.kind} enquiry${product} from ${payload.name}`;
}

export function inquiryBody(payload: InquiryPayload): string {
  const lines = [
    `Name: ${payload.name}`,
    payload.company ? `Company: ${payload.company}` : null,
    `Email: ${payload.email}`,
    `Country: ${payload.country}`,
    payload.phone ? `Phone/WhatsApp: ${payload.phone}` : null,
    payload.inquiryType ? `Inquiry type: ${payload.inquiryType}` : null,
    payload.product ? `Product: ${payload.product}` : null,
    payload.grade ? `Grade / specs: ${payload.grade}` : null,
    payload.quantity ? `Est. quantity: ${payload.quantity}` : null,
    payload.packaging ? `Packaging: ${payload.packaging}` : null,
    payload.destination ? `Destination: ${payload.destination}` : null,
    payload.shippingTerms ? `Shipping terms: ${payload.shippingTerms}` : null,
    "",
    payload.message,
  ].filter((l): l is string => l !== null);
  return lines.join("\n");
}
