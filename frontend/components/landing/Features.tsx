function CardShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-card px-[28px] pt-[30px] pb-7"
      style={{
        background:
          "linear-gradient(165deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
        border: "1px solid var(--color-border)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 60px rgba(0,0,0,0.35)",
        backdropFilter: "blur(12px)",
      }}
    >
      <h3 className="font-heading mb-2 text-[21px] font-semibold tracking-[-0.02em] text-white">
        {title}
      </h3>
      <p
        className="mb-[22px] text-sm leading-[1.55]"
        style={{ color: "rgba(255,255,255,0.55)" }}
      >
        {description}
      </p>
      <div
        className="overflow-hidden rounded-[14px] p-4"
        style={{
          background: "rgba(4,7,14,0.72)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function CitationBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-[5px] rounded-[7px] px-[10px] py-[5px] text-[11px]"
      style={{
        background: "rgba(var(--gold-rgb),0.14)",
        border: "1px solid rgba(var(--gold-rgb),0.35)",
        color: "var(--color-gold-light)",
      }}
    >
      {children}
    </span>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      className="relative z-10 mx-auto max-w-[1312px] px-16 pt-[60px] pb-10"
    >
      <div className="grid grid-cols-3 gap-6">
        {/* Card 1: Always cited */}
        <CardShell
          title="Always cited"
          description="Every answer links back to the exact section it came from."
        >
          <p
            className="mb-3 text-[12.5px] leading-[1.6]"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            Theft is punishable with imprisonment up to three years, a fine,
            or both.
          </p>
          <div className="flex flex-wrap gap-[7px]">
            <CitationBadge>§303 BNS</CitationBadge>
            <CitationBadge>§378 IPC</CitationBadge>
          </div>
        </CardShell>

        {/* Card 2: Follow-ups */}
        <CardShell
          title="Understands follow-ups"
          description="Ask naturally. Lexora keeps the thread of your case in context."
        >
          <div className="flex flex-col gap-[9px]">
            <div
              className="self-end max-w-[78%] rounded-[12px_12px_3px_12px] px-3 py-2 text-xs leading-[1.4]"
              style={{
                background:
                  "linear-gradient(145deg, var(--color-gold-soft), var(--color-gold-mid))",
                color: "#1a1200",
              }}
            >
              Is it different for a first offence?
            </div>
            <div
              className="self-start max-w-[82%] rounded-[12px_12px_12px_3px] px-3 py-2 text-xs leading-[1.4]"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.78)",
              }}
            >
              Yes — courts may consider it in sentencing. Here&apos;s how…
            </div>
            <div className="self-start flex gap-1 px-[10px] py-[6px]">
              {[0, 0.2, 0.4].map((delay) => (
                <span
                  key={delay}
                  className="h-[5px] w-[5px] rounded-full"
                  style={{
                    background: "rgba(var(--gold-light-rgb),0.8)",
                    animation: `lexPulse 1.2s ease-in-out ${delay}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </CardShell>

        {/* Card 3: Current vs old */}
        <CardShell
          title="Current law, old law context"
          description="See how the new codes map onto the sections they replaced."
        >
          <div
            className="mb-[14px] flex rounded-[9px] p-[3px]"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <span
              className="flex-1 rounded-[7px] py-[7px] text-center text-[11.5px] font-semibold"
              style={{
                background:
                  "linear-gradient(145deg, var(--color-gold-soft), var(--color-gold-mid))",
                color: "#1a1200",
              }}
            >
              BNS 2023
            </span>
            <span
              className="flex-1 py-[7px] text-center text-[11.5px] font-medium"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              IPC 1860
            </span>
          </div>
          <div className="flex items-center gap-[10px] text-xs">
            <span
              className="font-semibold"
              style={{ color: "var(--color-gold-light)" }}
            >
              §303
            </span>
            <span
              className="h-px flex-1"
              style={{
                background:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.25) 0 4px, transparent 4px 8px)",
              }}
            />
            <span style={{ color: "rgba(255,255,255,0.45)" }}>was §378</span>
          </div>
          <div className="mt-[10px] flex items-center gap-[10px] text-xs">
            <span
              className="font-semibold"
              style={{ color: "var(--color-gold-light)" }}
            >
              §318
            </span>
            <span
              className="h-px flex-1"
              style={{
                background:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.25) 0 4px, transparent 4px 8px)",
              }}
            />
            <span style={{ color: "rgba(255,255,255,0.45)" }}>was §420</span>
          </div>
        </CardShell>
      </div>
    </section>
  );
}
