"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { setToken } from "@/lib/auth";
import WireframeSphere from "@/components/auth/WireframeSphere";
import FloatingChips from "@/components/auth/FloatingChips";

type Mode = "login" | "signup";

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

const activeTabStyle: CSSProperties = {
  background: "linear-gradient(145deg, var(--color-gold-light), var(--color-gold-mid))",
  color: "#1a1200",
  boxShadow:
    "0 4px 18px rgba(var(--gold-rgb),0.4), inset 0 1px 0 rgba(255,255,255,0.45)",
};

const idleTabStyle: CSSProperties = {
  background: "transparent",
  color: "rgba(255,255,255,0.55)",
};

const inputStyle: CSSProperties = {
  background: "rgba(4,7,14,0.55)",
  border: "1px solid rgba(255,255,255,0.11)",
  color: "#fff",
};

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleModeChange(next: Mode) {
    setMode(next);
    setError(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        await apiFetch("/auth/signup", {
          method: "POST",
          body: { email, password },
        });
      }
      const data = await apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: { email, password },
      });
      setToken(data.access_token);
      router.push("/chat");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-bg"
      style={{ color: "rgba(255,255,255,0.92)" }}
    >
      <WireframeSphere />

      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 50% 50%, transparent 45%, rgba(3,5,10,0.9) 100%)",
        }}
      />

      <FloatingChips />

      {/* auth card */}
      <div className="relative z-10 w-[calc(100vw-40px)] max-w-[420px]">
        <div
          className="pointer-events-none absolute"
          style={{
            bottom: -40,
            left: "50%",
            transform: "translateX(-50%)",
            width: 340,
            height: 120,
            background:
              "radial-gradient(ellipse at center, rgba(var(--gold-rgb),0.4), transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        <div
          className="relative rounded-[24px] px-6 pt-10 pb-8 sm:px-9"
          style={{
            background:
              "linear-gradient(170deg, rgba(16,21,34,0.82), rgba(9,12,21,0.88))",
            border: "1px solid rgba(255,255,255,0.11)",
            backdropFilter: "blur(18px)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.1), 0 40px 90px rgba(0,0,0,0.55)",
          }}
        >
          <Link
            href="/"
            className="absolute inline-flex items-center gap-1.5 text-[12.5px]"
            style={{ top: 18, left: 20, color: "rgba(255,255,255,0.42)" }}
          >
            ← Back to site
          </Link>

          {/* wordmark */}
          <div className="mb-[30px] flex flex-col items-center gap-[14px]">
            <div
              className="font-heading flex h-11 w-11 items-center justify-center rounded-xl text-[22px] font-bold"
              style={{
                background:
                  "linear-gradient(145deg, var(--color-gold-light), var(--color-gold-dark))",
                boxShadow:
                  "0 0 28px rgba(var(--gold-rgb),0.6), inset 0 1px 0 rgba(255,255,255,0.5)",
                color: "#1a1200",
              }}
            >
              L
            </div>
            <div className="flex flex-col items-center gap-[5px]">
              <span className="font-heading text-2xl font-bold tracking-[-0.02em] text-white">
                Lexora
              </span>
              <span className="text-[13.5px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                Your rights, explained.
              </span>
            </div>
          </div>

          {/* tab toggle */}
          <div
            className="rounded-pill mb-[26px] flex p-1"
            style={{
              background: "rgba(4,7,14,0.6)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <button
              type="button"
              onClick={() => handleModeChange("login")}
              className="rounded-pill flex-1 py-[10px] text-sm font-semibold transition-all"
              style={mode === "login" ? activeTabStyle : idleTabStyle}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("signup")}
              className="rounded-pill flex-1 py-[10px] text-sm font-semibold transition-all"
              style={mode === "signup" ? activeTabStyle : idleTabStyle}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">
            <div className="flex flex-col gap-[7px]">
              <label
                htmlFor="email"
                className="text-[12.5px] font-medium"
                style={{ color: "var(--color-body-text)" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="lex-input w-full rounded-xl px-4 py-[13px] text-base sm:text-sm"
                style={inputStyle}
              />
            </div>

            <div className="flex flex-col gap-[7px]">
              <label
                htmlFor="password"
                className="text-[12.5px] font-medium"
                style={{ color: "var(--color-body-text)" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="lex-input w-full rounded-xl py-[13px] pr-[46px] pl-4 text-base sm:text-sm"
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password visibility"
                  className="absolute top-1/2 right-1.5 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg sm:right-2 sm:h-[34px] sm:w-[34px]"
                  style={{
                    color: showPassword
                      ? "var(--color-gold-light)"
                      : "rgba(255,255,255,0.45)",
                  }}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div className="flex flex-col gap-[7px]">
                <label
                  htmlFor="confirmPassword"
                  className="text-[12.5px] font-medium"
                  style={{ color: "var(--color-body-text)" }}
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="lex-input w-full rounded-xl px-4 py-[13px] text-base sm:text-sm"
                  style={inputStyle}
                />
              </div>
            )}

            {error && (
              <p className="text-[12.5px]" style={{ color: "#f2a4a4" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="rounded-pill mt-2 w-full py-[14px] text-[15px] font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                background:
                  "linear-gradient(145deg, var(--color-gold-light), var(--color-gold-mid))",
                color: "#1a1200",
                boxShadow:
                  "0 8px 30px rgba(var(--gold-rgb),0.45), inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              {loading
                ? mode === "signup"
                  ? "Creating account…"
                  : "Logging in…"
                : mode === "signup"
                  ? "Create account"
                  : "Log in"}
            </button>

            {mode === "login" && (
              <div className="mt-1 text-center">
                <a href="#" className="text-[13px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Forgot password?
                </a>
              </div>
            )}
          </form>

          <p
            className="mt-[26px] text-center text-[11.5px] leading-[1.5]"
            style={{ color: "rgba(255,255,255,0.32)" }}
          >
            Lexora provides legal information, not legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}
