export default function PendingMessage({ status }: { status: "loading" | "error" }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-[9px]">
        <div
          className="font-heading flex h-[22px] w-[22px] items-center justify-center rounded-[7px] text-[13px] font-semibold"
          style={{
            background:
              "linear-gradient(145deg, var(--color-gold-light), var(--color-gold-dark))",
            boxShadow: "0 0 12px rgba(var(--gold-rgb),0.5)",
            color: "#1a1200",
          }}
        >
          §
        </div>
        <span
          className="text-xs font-semibold tracking-[0.04em]"
          style={{ color: "rgba(240,208,137,0.85)" }}
        >
          LEXORA
        </span>
      </div>

      {status === "loading" ? (
        <div className="flex items-center gap-1 px-[10px] py-[6px]">
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
      ) : (
        <p className="m-0 text-[14px]" style={{ color: "rgba(255,150,150,0.85)" }}>
          Couldn&apos;t get an answer — try again.
        </p>
      )}
    </div>
  );
}
