import Link from "next/link";

function ScaleHanger({
  left,
  swayDuration,
  swayDelay,
  panGradient,
}: {
  left: number;
  swayDuration: string;
  swayDelay: string;
  panGradient: string;
}) {
  return (
    <div
      className="absolute z-[5]"
      style={{
        top: 158,
        left,
        width: 200,
        height: 200,
        animation: `lexSway ${swayDuration} ease-in-out ${swayDelay} infinite`,
      }}
    >
      <div
        className="absolute rounded-full"
        style={{
          top: -6,
          left: 95,
          width: 10,
          height: 10,
          background: "rgba(var(--gold-light-rgb),0.9)",
          boxShadow: "0 0 10px rgba(var(--gold-light-rgb),0.8)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: 2,
          left: 99,
          width: 1.5,
          height: 122,
          background:
            "linear-gradient(180deg, rgba(var(--gold-light-rgb),0.85), rgba(var(--gold-light-rgb),0.25))",
          transform: "rotate(32deg)",
          transformOrigin: "top center",
        }}
      />
      <div
        className="absolute"
        style={{
          top: 2,
          left: 99,
          width: 1.5,
          height: 122,
          background:
            "linear-gradient(180deg, rgba(var(--gold-light-rgb),0.85), rgba(var(--gold-light-rgb),0.25))",
          transform: "rotate(-32deg)",
          transformOrigin: "top center",
        }}
      />
      <div
        className="absolute z-[3] rounded-full"
        style={{
          top: 100,
          left: 20,
          width: 160,
          height: 16,
          border: "1px solid rgba(var(--gold-light-rgb),0.75)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.04))",
          boxShadow: "0 0 16px rgba(var(--gold-rgb),0.3)",
        }}
      />
      <div
        className="absolute z-[2]"
        style={{
          top: 109,
          left: 20,
          width: 160,
          height: 56,
          borderRadius: "0 0 80px 80px / 0 0 50px 50px",
          background: panGradient,
          border: "1px solid rgba(var(--gold-light-rgb),0.55)",
          borderTop: "none",
          backdropFilter: "blur(8px)",
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.4), inset 0 6px 16px rgba(255,255,255,0.16), 0 0 36px rgba(var(--gold-rgb),0.25)",
        }}
      />
      <div
        className="absolute z-[3] rounded-full"
        style={{
          top: 116,
          left: 38,
          width: 58,
          height: 16,
          background: "linear-gradient(90deg, rgba(255,255,255,0.45), transparent)",
          filter: "blur(4px)",
        }}
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative z-10" style={{ height: 960 }}>
      {/* centerpiece: glass scales composition */}
      <div
        className="absolute z-[5]"
        style={{
          top: 96,
          left: "50%",
          transform: "translateX(-50%)",
          width: 720,
          height: 700,
        }}
      >
        {/* core glow */}
        <div
          className="absolute"
          style={{
            top: 120,
            left: "50%",
            transform: "translateX(-50%)",
            width: 520,
            height: 520,
            background:
              "radial-gradient(circle at 50% 45%, rgba(var(--gold-light-rgb),0.45), rgba(var(--gold-rgb),0.18) 38%, transparent 66%)",
            filter: "blur(28px)",
            animation: "lexPulse 6s ease-in-out infinite",
          }}
        />

        {/* whole scale floats gently as one */}
        <div
          className="absolute inset-0"
          style={{ animation: "lexFloatSlow 11s ease-in-out infinite" }}
        >
          {/* finial + pivot orb */}
          <div
            className="absolute z-[7] rounded-full"
            style={{
              top: 92,
              left: 332,
              width: 56,
              height: 56,
              background:
                "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.95), rgba(var(--gold-light-rgb),0.55) 42%, rgba(120,85,20,0.3) 100%)",
              boxShadow:
                "0 0 44px rgba(var(--gold-light-rgb),0.7), inset 0 0 18px rgba(255,255,255,0.45)",
            }}
          />

          {/* beam */}
          <div
            className="absolute z-[6] rounded-full"
            style={{
              top: 154,
              left: 140,
              width: 440,
              height: 8,
              background:
                "linear-gradient(90deg, rgba(var(--gold-light-rgb),0.55), rgba(var(--gold-light-rgb),0.95) 50%, rgba(var(--gold-light-rgb),0.55))",
              boxShadow:
                "0 0 26px rgba(var(--gold-light-rgb),0.55), 0 1px 0 rgba(255,255,255,0.35) inset",
            }}
          />
          {/* beam end caps */}
          <div
            className="absolute z-[7] rounded-full"
            style={{
              top: 151,
              left: 133,
              width: 14,
              height: 14,
              background:
                "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(var(--gold-light-rgb),0.6) 55%, rgba(120,85,20,0.4))",
              boxShadow: "0 0 14px rgba(var(--gold-light-rgb),0.7)",
            }}
          />
          <div
            className="absolute z-[7] rounded-full"
            style={{
              top: 151,
              left: 573,
              width: 14,
              height: 14,
              background:
                "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(var(--gold-light-rgb),0.6) 55%, rgba(120,85,20,0.4))",
              boxShadow: "0 0 14px rgba(var(--gold-light-rgb),0.7)",
            }}
          />

          {/* column */}
          <div
            className="absolute z-[4] rounded-full"
            style={{
              top: 146,
              left: 356,
              width: 8,
              height: 324,
              background:
                "linear-gradient(180deg, rgba(var(--gold-light-rgb),0.9), rgba(var(--gold-rgb),0.3))",
              boxShadow: "0 0 22px rgba(var(--gold-light-rgb),0.35)",
            }}
          />
          {/* pedestal */}
          <div
            className="absolute z-[4] rounded-full"
            style={{
              top: 466,
              left: 300,
              width: 120,
              height: 10,
              background:
                "linear-gradient(90deg, rgba(var(--gold-light-rgb),0.25), rgba(var(--gold-light-rgb),0.8), rgba(var(--gold-light-rgb),0.25))",
              boxShadow: "0 0 18px rgba(var(--gold-light-rgb),0.4)",
            }}
          />
          <div
            className="absolute z-[4] rounded-full"
            style={{
              top: 478,
              left: 268,
              width: 184,
              height: 12,
              background:
                "linear-gradient(90deg, rgba(var(--gold-rgb),0.1), rgba(var(--gold-rgb),0.55), rgba(var(--gold-rgb),0.1))",
              boxShadow: "0 0 22px rgba(var(--gold-rgb),0.35)",
            }}
          />
          <div
            className="absolute z-[3] rounded-full"
            style={{
              top: 492,
              left: 250,
              width: 220,
              height: 22,
              background:
                "radial-gradient(ellipse at center, rgba(var(--gold-light-rgb),0.4), transparent 70%)",
              filter: "blur(4px)",
            }}
          />

          <ScaleHanger
            left={40}
            swayDuration="6s"
            swayDelay="0s"
            panGradient="linear-gradient(165deg, rgba(255,255,255,0.13), rgba(var(--gold-rgb),0.12) 45%, rgba(90,120,180,0.10))"
          />
          <ScaleHanger
            left={480}
            swayDuration="7.5s"
            swayDelay="-2.5s"
            panGradient="linear-gradient(165deg, rgba(255,255,255,0.13), rgba(90,120,180,0.10) 45%, rgba(var(--gold-rgb),0.12))"
          />
        </div>

        {/* iridescent floating shards */}
        <div
          className="absolute rounded-full"
          style={{
            top: 60,
            left: 40,
            width: 120,
            height: 120,
            background:
              "radial-gradient(circle at 40% 35%, rgba(120,150,220,0.28), transparent 65%)",
            filter: "blur(12px)",
            animation: "lexFloatSlow 9s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: 380,
            left: 540,
            width: 150,
            height: 150,
            background:
              "radial-gradient(circle at 40% 35%, rgba(var(--gold-light-rgb),0.22), transparent 65%)",
            filter: "blur(14px)",
            animation: "lexFloat 10s ease-in-out infinite",
          }}
        />
      </div>

      {/* headline overlapping visual */}
      <div className="relative z-[12] mx-auto h-full max-w-[1312px] px-16">
        <h1
          className="font-heading m-0 font-bold text-white"
          style={{
            letterSpacing: "-0.035em",
            lineHeight: 0.92,
            pointerEvents: "none",
          }}
        >
          <span
            className="block font-medium"
            style={{ fontSize: 116, paddingTop: 118 }}
          >
            Know your
          </span>
          <span
            className="font-accent block font-normal italic"
            style={{
              fontSize: 190,
              letterSpacing: "-0.02em",
              lineHeight: 0.8,
              marginTop: 6,
              marginLeft: -6,
              background:
                "linear-gradient(110deg, var(--color-gold-light), var(--color-gold) 55%, var(--color-gold-dark))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 60px rgba(var(--gold-rgb),0.35)",
            }}
          >
            rights.
          </span>
          <span
            className="block text-right font-semibold"
            style={{ fontSize: 128, marginTop: 190, letterSpacing: "-0.04em" }}
          >
            Instantly.
          </span>
        </h1>
      </div>

      {/* floating stat labels with connectors */}
      <div
        className="pointer-events-none absolute z-[14]"
        style={{ top: 404, left: "calc(50% + 300px)" }}
      >
        <div className="flex items-center gap-[10px]">
          <span
            className="h-[5px] w-[5px] rounded-full"
            style={{
              background: "var(--color-gold-light)",
              boxShadow: "0 0 8px var(--color-gold-light)",
            }}
          />
          <span
            className="h-px w-[46px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(var(--gold-light-rgb),0.7), transparent)",
            }}
          />
          <span
            className="font-body text-[11.5px] tracking-[0.14em] whitespace-nowrap uppercase"
            style={{ color: "rgba(255,255,255,0.68)" }}
          >
            every answer cited
          </span>
        </div>
      </div>
      <div
        className="pointer-events-none absolute z-[14]"
        style={{ top: 528, left: "calc(50% - 432px)" }}
      >
        <div className="flex items-center gap-[10px]">
          <span
            className="font-body text-[11.5px] tracking-[0.16em] whitespace-nowrap"
            style={{ color: "rgba(var(--gold-light-rgb),0.85)" }}
          >
            BNS · BNSS · BSA
          </span>
          <span
            className="h-px w-[46px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(var(--gold-light-rgb),0.7), transparent)",
            }}
          />
          <span
            className="h-[5px] w-[5px] rounded-full"
            style={{
              background: "var(--color-gold-light)",
              boxShadow: "0 0 8px var(--color-gold-light)",
            }}
          />
        </div>
      </div>

      {/* subline + CTA row */}
      <div
        className="absolute z-[16] flex flex-col items-center gap-[30px]"
        style={{ bottom: 92, left: "50%", transform: "translateX(-50%)" }}
      >
        <p
          className="m-0 max-w-[460px] text-center text-[17px] leading-[1.5]"
          style={{ color: "rgba(255,255,255,0.62)" }}
        >
          AI answers grounded in the actual text of Indian law.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="rounded-pill inline-flex items-center gap-[9px] px-[30px] py-[15px] text-[15.5px] font-semibold"
            style={{
              background:
                "linear-gradient(145deg, var(--color-gold-light), var(--color-gold-mid))",
              color: "#1a1200",
              boxShadow:
                "0 8px 34px rgba(var(--gold-rgb),0.42), inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            Get Started Free <span className="text-[17px]">→</span>
          </Link>
          <a
            href="#"
            className="rounded-pill inline-flex items-center gap-[9px] px-[28px] py-[15px] text-[15.5px] font-medium"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.86)",
              backdropFilter: "blur(8px)",
            }}
          >
            See how it works
          </a>
        </div>
      </div>
    </section>
  );
}
