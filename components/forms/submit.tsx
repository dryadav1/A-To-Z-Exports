"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Mail, MessageCircle } from "lucide-react";
import { getBusinessGmailHref, getBusinessOutlookHref, getEmailHref, getWhatsAppHref } from "@/lib/site";
import { inquiryBody, inquirySubject, type InquiryPayload } from "@/lib/inquiry";

export type SubmitState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "error"; message: string }
  | { status: "sent"; delivered: boolean; pendingActivation?: boolean; note?: string };

export function useInquirySubmit() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const [lastPayload, setLastPayload] = useState<InquiryPayload | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  async function submit(payload: InquiryPayload) {
    setState({ status: "sending" });
    setLastPayload(payload);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok: boolean;
        delivered?: boolean;
        pendingActivation?: boolean;
        note?: string;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setState({ status: "error", message: data.error ?? "Submission failed. Please try again." });
      } else {
        setState({
          status: "sent",
          delivered: Boolean(data.delivered),
          pendingActivation: Boolean(data.pendingActivation),
          note: data.note,
        });
      }
    } catch {
      setState({
        status: "error",
        message: "Network error — please check your connection and try again.",
      });
    } finally {
      // Move screen-reader + keyboard focus to the result.
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  function reset() {
    setState({ status: "idle" });
  }

  return { state, lastPayload, statusRef, submit, reset };
}

/** Honest result panel: never claims delivery when only the fallback ran. */
export function SubmissionStatus({
  state,
  payload,
  statusRef,
  onReset,
}: {
  state: Extract<SubmitState, { status: "sent" } | { status: "error" }>;
  payload: InquiryPayload | null;
  statusRef: React.RefObject<HTMLDivElement | null>;
  onReset: () => void;
}) {
  if (state.status === "error") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="alert"
        aria-live="assertive"
        className="rounded-2xl border border-red-800/25 bg-red-50 p-6 sm:p-8"
      >
        <h3 className="font-serif text-2xl text-red-900">Something went wrong</h3>
        <p className="mt-2 text-sm leading-relaxed text-red-900/80">{state.message}</p>
        <p className="mt-2 text-sm leading-relaxed text-red-900/80">
          Nothing was lost on your side — you can retry, or reach us directly
          with one click below.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onReset}
            className="rounded-full bg-red-900 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red-800"
          >
            Try again
          </button>
          <ForwardButtons payload={payload} />
        </div>
      </div>
    );
  }

  const showForward = (!state.delivered || state.pendingActivation) && payload;

  return (
    <div
      ref={statusRef}
      tabIndex={-1}
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-forest-800/15 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(23,61,43,0.5)] sm:p-8"
    >
      <div className="flex items-start gap-4">
        <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-agri-500/12 text-agri-600">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <div>
          <h3 className="font-serif text-2xl text-forest-800">
            Thank you{payload ? `, ${payload.name.split(" ")[0]}` : ""} — enquiry recorded.
          </h3>
          {state.delivered ? (
            <p className="mt-2 text-sm leading-relaxed text-charcoal-500">
              Your enquiry has been sent to our team. We aim to respond within
              1–2 business days.
            </p>
          ) : state.pendingActivation ? (
            <p className="mt-2 text-sm leading-relaxed text-charcoal-500">
              Your enquiry has been recorded. Our inbox is finishing a one-time
              email activation, so to be certain it reaches us without delay,
              please also forward it with one click below — it takes seconds.
            </p>
          ) : (
            <p className="mt-2 text-sm leading-relaxed text-charcoal-500">
              Your enquiry has been validated and recorded on this device. Our
              automatic email integration is still being configured, so it has{" "}
              <strong>not been emailed yet</strong> — please forward it with one
              click below so our team receives it without delay.
            </p>
          )}
        </div>
      </div>

      {showForward ? (
        <div className="mt-6 rounded-xl bg-ivory-100 p-5">
          <ForwardButtons payload={payload} />
        </div>
      ) : null}

      <button
        type="button"
        onClick={onReset}
        className="link-underline mt-5 text-xs font-bold uppercase tracking-[0.16em] text-forest-800"
      >
        Submit another enquiry
      </button>
    </div>
  );
}

/** One-click email-app / WhatsApp forwarding for an enquiry. */
function ForwardButtons({ payload }: { payload: InquiryPayload | null }) {
  if (!payload) return null;
  const subject = inquirySubject(payload);
  const body = inquiryBody(payload);
  const gmail = getBusinessGmailHref(subject, body);
  const outlook = getBusinessOutlookHref(subject, body);
  const mailto = getEmailHref(subject, body);
  const whatsapp = getWhatsAppHref(`${subject}\n\n${body}`);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        {gmail ? (
          <a
            href={gmail}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-forest-800 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-ivory-100 transition-colors hover:bg-forest-700"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Send via Gmail
          </a>
        ) : null}
        {outlook ? (
          <a
            href={outlook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-forest-800/25 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-forest-800 transition-colors hover:bg-forest-800 hover:text-ivory-100"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Send via Outlook
          </a>
        ) : null}
        {!gmail && !outlook && mailto ? (
          <a
            href={mailto}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-forest-800 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-ivory-100 transition-colors hover:bg-forest-700"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Send via email app
          </a>
        ) : null}
        {!gmail && !outlook && !mailto ? (
          <p className="flex-1 rounded-xl border border-dashed border-forest-800/25 p-3 text-xs leading-relaxed text-charcoal-500">
            Business email is being confirmed — copy your enquiry reference{" "}
            <strong>{subject}</strong> and contact us once details are published.
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {whatsapp ? (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-forest-800/25 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-forest-800 transition-colors hover:bg-forest-800 hover:text-ivory-100"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Send via WhatsApp
          </a>
        ) : null}
        {mailto ? (
          <a href={mailto} className="link-underline shrink-0 text-center text-[0.7rem] font-bold uppercase tracking-[0.14em] text-forest-800 sm:text-left">
            Use another email app
          </a>
        ) : null}
      </div>
    </div>
  );
}
