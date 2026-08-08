"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";

export default function Nav() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read localStorage only after mount to avoid SSR hydration mismatch
    setIsAuthed(!!getToken());
  }, []);

  return (
    <>
      <nav className="relative z-20 mx-auto flex max-w-[1312px] items-center justify-between px-5 py-4 sm:px-8 lg:px-16 lg:py-[30px]">
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
          className="hidden items-center gap-[38px] text-[14.5px] font-medium lg:flex"
          style={{ color: "var(--color-body-text)" }}
        >
          <a href="#features" style={{ color: "var(--color-body-text)" }}>
            How it works
          </a>
          <a href="#coverage" style={{ color: "var(--color-body-text)" }}>
            Coverage
          </a>
        </div>

        <div className="hidden items-center gap-[22px] lg:flex">
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

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="lex-icon-btn flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div
          className="relative z-20 mx-5 mb-4 flex flex-col gap-4 rounded-2xl px-5 py-5 sm:mx-8 lg:hidden"
          style={{
            background: "rgba(9,12,21,0.92)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(14px)",
          }}
        >
          <a
            href="#features"
            onClick={() => setMenuOpen(false)}
            className="text-[14.5px] font-medium"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            How it works
          </a>
          <a
            href="#coverage"
            onClick={() => setMenuOpen(false)}
            className="text-[14.5px] font-medium"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Coverage
          </a>
          <div className="h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          {isAuthed ? (
            <Link
              href="/chat"
              onClick={() => setMenuOpen(false)}
              className="rounded-pill inline-flex items-center justify-center px-5 py-[12px] text-sm font-semibold"
              style={{
                background:
                  "linear-gradient(145deg, var(--color-gold-light), var(--color-gold-mid))",
                color: "#1a1200",
              }}
            >
              Open Lexora
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-[14.5px] font-medium"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                Log in
              </Link>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-pill inline-flex items-center justify-center px-5 py-[12px] text-sm font-semibold"
                style={{
                  background:
                    "linear-gradient(145deg, var(--color-gold-light), var(--color-gold-mid))",
                  color: "#1a1200",
                }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}
