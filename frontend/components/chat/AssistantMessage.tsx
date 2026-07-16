import type { Message } from "./types";
import CitationChip from "./CitationChip";

export default function AssistantMessage({ message }: { message: Message }) {
  const paragraphs = message.content.split("\n\n");

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

      <div
        className="flex flex-col gap-4 text-[15px] leading-[1.72]"
        style={{ color: "rgba(255,255,255,0.82)" }}
      >
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="m-0">
            {paragraph}
          </p>
        ))}
      </div>

      {message.metadata?.citations && message.metadata.citations.length > 0 && (
        <div className="flex flex-wrap gap-[9px]">
          {message.metadata.citations.map((citation, i) => (
            <CitationChip key={i} citation={citation} />
          ))}
        </div>
      )}
    </div>
  );
}
