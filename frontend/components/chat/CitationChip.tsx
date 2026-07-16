import type { Citation } from "./types";

export default function CitationChip({ citation }: { citation: Citation }) {
  const sectionLabel = citation.section.replace(/^section\s+/i, "");

  return (
    <div
      className="lex-citation-chip inline-flex items-center gap-2 rounded-[9px] px-[13px] py-[7px]"
      style={{
        background: "rgba(var(--gold-rgb),0.09)",
        border: "1px solid rgba(var(--gold-rgb),0.4)",
        boxShadow: "0 0 14px rgba(var(--gold-rgb),0.12)",
      }}
    >
      <span className="text-xs font-semibold" style={{ color: "var(--color-gold-light)" }}>
        {citation.act} · Sec {sectionLabel}
      </span>
      <span
        className="h-[3px] w-[3px] rounded-full"
        style={{ background: "rgba(255,255,255,0.3)" }}
      />
      <span className="text-[11px]" style={{ color: "rgba(139,195,143,0.9)" }}>
        {citation.status}
      </span>
    </div>
  );
}
