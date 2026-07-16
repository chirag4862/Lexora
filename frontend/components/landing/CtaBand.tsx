import Link from "next/link";

export default function CtaBand() {
  return (
    <section className="relative z-10 mx-auto mt-[60px] max-w-[1312px] px-16">
      <div
        className="relative overflow-hidden rounded-[28px] px-16 py-[92px] text-center"
        style={{
          background:
            "linear-gradient(160deg, rgba(28,22,10,0.9), rgba(10,12,20,0.9))",
          border: "1px solid rgba(var(--gold-rgb),0.28)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="pointer-events-none absolute"
          style={{
            top: -120,
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 400,
            background:
              "radial-gradient(ellipse at center, rgba(var(--gold-rgb),0.35), transparent 68%)",
            filter: "blur(24px)",
          }}
        />
        <div className="relative">
          <h2
            className="font-heading mb-[26px] text-[58px] font-semibold tracking-[-0.03em] text-white"
            style={{ lineHeight: 1.02 }}
          >
            Justice shouldn&apos;t need
            <br />
            <span
              className="font-accent italic font-normal"
              style={{
                background:
                  "linear-gradient(110deg, var(--color-gold-light), var(--color-gold))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              a translator.
            </span>
          </h2>
          <Link
            href="/login"
            className="rounded-pill inline-flex items-center gap-[10px] px-[34px] py-4 text-base font-semibold"
            style={{
              background:
                "linear-gradient(145deg, var(--color-gold-light), var(--color-gold-mid))",
              color: "#1a1200",
              boxShadow:
                "0 10px 40px rgba(var(--gold-rgb),0.5), inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            Get Started Free <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
