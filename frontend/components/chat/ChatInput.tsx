"use client";

import { useState, type FormEvent } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (disabled) return;
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <div className="flex flex-col items-center gap-[10px] px-4 pb-3 sm:px-8 lg:px-[60px] lg:pb-[22px]">
      <form
        onSubmit={handleSubmit}
        className="rounded-pill flex w-full max-w-[760px] items-center gap-[10px] py-[9px] pr-[10px] pl-[18px]"
        style={{
          background: "rgba(255,255,255,0.045)",
          border: "1px solid rgba(255,255,255,0.11)",
          backdropFilter: "blur(14px)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.07), 0 16px 40px rgba(0,0,0,0.35)",
        }}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask about Indian law…"
          disabled={disabled}
          className="flex-1 border-none bg-transparent text-base text-white outline-none disabled:opacity-50 sm:text-[14.5px]"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={disabled}
          className="lex-gold-btn flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background:
              "linear-gradient(145deg, var(--color-gold-light), var(--color-gold-mid))",
            color: "#1a1200",
            boxShadow:
              "0 0 20px rgba(var(--gold-rgb),0.5), inset 0 1px 0 rgba(255,255,255,0.45)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </button>
      </form>
      <p className="m-0 text-[11px]" style={{ color: "rgba(255,255,255,0.28)" }}>
        Lexora provides legal information, not legal advice.
      </p>
    </div>
  );
}
