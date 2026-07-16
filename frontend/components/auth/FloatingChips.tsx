function Chip({
  top,
  left,
  right,
  opacity,
  animation,
  children,
}: {
  top: number;
  left?: number;
  right?: number;
  opacity: number;
  animation: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="pointer-events-none absolute z-[2]"
      style={{ top, left, right, opacity, animation }}
    >
      <div
        className="flex items-center gap-2 rounded-xl px-4 py-[10px]"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid var(--color-border)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Dot() {
  return (
    <span
      className="h-[5px] w-[5px] rounded-full"
      style={{
        background: "var(--color-gold-light)",
        boxShadow: "0 0 8px var(--color-gold-light)",
      }}
    />
  );
}

export default function FloatingChips() {
  return (
    <>
      <Chip top={170} left={180} opacity={0.55} animation="lexDrift 9s ease-in-out infinite">
        <Dot />
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
          Section 103 · BNS
        </span>
      </Chip>

      <Chip
        top={560}
        left={244}
        opacity={0.4}
        animation="lexDriftSlow 11s ease-in-out -3s infinite"
      >
        <span
          className="text-[11px] tracking-[0.12em] uppercase"
          style={{ color: "rgba(var(--gold-light-rgb),0.8)" }}
        >
          BNS · BNSS · BSA
        </span>
      </Chip>

      <Chip
        top={236}
        right={196}
        opacity={0.5}
        animation="lexDriftSlow 10s ease-in-out -5s infinite"
      >
        <Dot />
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
          every answer cited
        </span>
      </Chip>

      <Chip
        top={610}
        right={230}
        opacity={0.38}
        animation="lexDrift 12s ease-in-out -6s infinite"
      >
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
          §318 <span style={{ color: "rgba(255,255,255,0.35)" }}>was §420</span>
        </span>
      </Chip>
    </>
  );
}
