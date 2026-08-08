import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 mx-auto max-w-[1312px] px-5 pt-12 pb-10 sm:px-8 lg:px-16 lg:pt-[70px] lg:pb-[50px]">
      <div
        className="flex flex-col gap-4 pb-[34px] sm:flex-row sm:items-center sm:justify-between"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-[11px]">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-[6px]"
            style={{
              background:
                "linear-gradient(145deg, var(--color-gold-light), var(--color-gold-dark))",
              boxShadow: "0 0 14px rgba(var(--gold-rgb),0.45)",
            }}
          >
            <div
              className="h-2 w-2 rotate-45 rounded-[2px]"
              style={{ border: "1.5px solid #1a1200" }}
            />
          </div>
          <span className="font-heading text-lg font-bold text-white">
            Lexora
          </span>
        </div>

        <div className="flex items-center gap-6 text-[13px]">
          <Link href="/privacy" style={{ color: "var(--color-body-text)" }}>
            Privacy
          </Link>
          <Link href="/terms" style={{ color: "var(--color-body-text)" }}>
            Terms
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-[26px] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12.5px]" style={{ color: "var(--color-muted)" }}>
          Lexora provides legal information, not legal advice.
        </p>
        <p className="text-[12.5px]" style={{ color: "rgba(255,255,255,0.35)" }}>
          © 2026 Lexora
        </p>
      </div>
    </footer>
  );
}
