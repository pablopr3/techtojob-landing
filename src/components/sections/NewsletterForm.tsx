"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "success" | "error" | "pending";

type NewsletterFormProps = {
  /** URL that accepts a POST with { email }. Empty while the list is not live. */
  endpoint: string;
  labels: {
    email: string;
    placeholder: string;
    submit: string;
    privacy: string;
    pending: string;
    success: string;
    error: string;
  };
};

export function NewsletterForm({ endpoint, labels }: NewsletterFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const inputId = useId();
  const messageId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email");

    if (!endpoint) {
      setStatus("pending");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const message =
    status === "pending"
      ? labels.pending
      : status === "success"
        ? labels.success
        : status === "error"
          ? labels.error
          : null;

  return (
    <form
      onSubmit={handleSubmit}
      className="sketch -rotate-1 bg-white p-6 shadow-[8px_10px_0_0_rgba(47,52,54,0.15)] sm:p-8"
    >
      <label htmlFor={inputId} className="block text-sm font-semibold text-ink">
        {labels.email}
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={labels.placeholder}
          aria-describedby={messageId}
          className="h-12 flex-1 rounded-full border-2 border-ink/70 px-5 text-base text-ink placeholder:text-muted/70 focus:border-ink"
        />
        <Button type="submit" size="lg" disabled={status === "sending"} className="sm:shrink-0">
          {labels.submit}
        </Button>
      </div>
      <p id={messageId} aria-live="polite" className="mt-3 text-sm text-muted">
        {message ?? labels.privacy}
      </p>
    </form>
  );
}
