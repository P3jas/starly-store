"use client";

import { useActionState, useId } from "react";
import { subscribe, type FormState } from "@/app/actions";

type Props = {
  source: "NEWSLETTER" | "DROP";
  label: string;
  submitLabel: string;
  variant?: "flare" | "text";
};

export function SubscribeForm({ source, label, submitLabel, variant = "text" }: Props) {
  const [state, action, pending] = useActionState<FormState, FormData>(subscribe, null);
  const id = useId();

  return (
    <form action={action} className="flex max-w-[560px] flex-col gap-4">
      <label htmlFor={id} className="label text-ink-muted">
        {label}
      </label>
      <input type="hidden" name="source" value={source} />
      <div className="field">
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="adres@email.com"
          aria-describedby={`${id}-status`}
        />
        <button
          type="submit"
          disabled={pending}
          className={variant === "flare" ? "flare label" : "ul label min-h-11 cursor-pointer"}
        >
          {pending ? "[ … ]" : submitLabel}
        </button>
      </div>
      <p id={`${id}-status`} role="status" className={`label min-h-4 ${state?.ok ? "text-ink" : "text-ink-muted"}`}>
        {state ? (state.ok ? `[ ${state.message} ]` : state.message) : ""}
      </p>
    </form>
  );
}
