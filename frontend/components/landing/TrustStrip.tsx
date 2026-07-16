const ACTS = ["BNS 2023", "BNSS 2023", "BSA 2023", "IPC", "CrPC", "IEA"];

export default function TrustStrip() {
  return (
    <section
      id="coverage"
      className="relative z-10 mx-auto max-w-[1180px] px-16 pt-[60px] pb-10 text-center"
    >
      <p
        className="mb-[26px] text-[12.5px] tracking-[0.22em] uppercase"
        style={{ color: "var(--color-muted)" }}
      >
        Grounded in official legislation
      </p>
      <div className="flex flex-wrap items-center justify-center gap-[14px]">
        {ACTS.map((act) => (
          <span
            key={act}
            className="rounded-[10px] px-5 py-[10px] text-[13.5px] font-medium"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.02)",
              color: "rgba(255,255,255,0.62)",
            }}
          >
            {act}
          </span>
        ))}
      </div>
    </section>
  );
}
