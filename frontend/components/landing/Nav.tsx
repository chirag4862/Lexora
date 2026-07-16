"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";

export default function Nav() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read localStorage only after mount to avoid SSR hydration mismatch
    setIsAuthed(!!getToken());
  }, []);

  return (
    <nav className="relative z-20 mx-auto flex max-w-[1312px] items-center justify-between px-16 py-[30px]">
      <div className="flex items-center gap-[11px]">
        <div
          className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px]"
          style={{
            background:
              "linear-gradient(145deg, var(--color-gold-light), var(--color-gold-dark))",
            boxShadow: "0 0 18px rgba(var(--gold-rgb),0.55)",
          }}
        >
          <div
            className="h-[9px] w-[9px] rotate-45 rounded-[2px]"
            style={{ border: "1.5px solid #1a1200" }}
          />
        </div>
        <span className="font-heading text-xl font-bold tracking-[-0.02em] text-white">
          Lexora
        </span>
      </div>

      <div
        className="flex items-center gap-[38px] text-[14.5px] font-medium"
        style={{ color: "var(--color-body-text)" }}
      >
        <a href="#features" style={{ color: "var(--color-body-text)" }}>
          How it works
        </a>
        <a href="#coverage" style={{ color: "var(--color-body-text)" }}>
          Coverage
        </a>
      </div>

      <div className="flex items-center gap-[22px]">
        {isAuthed ? (
          <Link
            href="/chat"
            className="rounded-pill inline-flex items-center px-5 py-[10px] text-sm font-semibold"
            style={{
              background:
                "linear-gradient(145deg, var(--color-gold-light), var(--color-gold-mid))",
              color: "#1a1200",
              boxShadow:
                "0 4px 22px rgba(var(--gold-rgb),0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}
          >
            Open Lexora
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="text-[14.5px] font-medium"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              Log in
            </Link>
            <Link
              href="/login"
              className="rounded-pill inline-flex items-center px-5 py-[10px] text-sm font-semibold"
              style={{
                background:
                  "linear-gradient(145deg, var(--color-gold-light), var(--color-gold-mid))",
                color: "#1a1200",
                boxShadow:
                  "0 4px 22px rgba(var(--gold-rgb),0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
