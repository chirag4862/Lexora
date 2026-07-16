interface Feature {
  title: string;
  description: string;
  prompt: string;
  icon: React.ReactNode;
}

const FEATURES: Feature[] = [
  {
    title: "Rights if arrested",
    description: "What police can and can't do",
    prompt: "What are my rights if I get arrested?",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
  },
  {
    title: "File an FIR",
    description: "Step-by-step, with your rights",
    prompt: "How do I file an FIR?",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
      </svg>
    ),
  },
  {
    title: "Punishments under BNS",
    description: "Sections, terms and fines",
    prompt: "What is the punishment for murder under BNS?",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3v18"></path>
        <path d="M5 7h14"></path>
        <path d="M5 7l-3 6a3.5 3.5 0 0 0 7 0z"></path>
        <path d="M19 7l-3 6a3.5 3.5 0 0 0 7 0z"></path>
      </svg>
    ),
  },
  {
    title: "Old law vs new law",
    description: "IPC sections mapped to BNS",
    prompt: "How does IPC Section 302 map to BNS?",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="17 1 21 5 17 9"></polyline>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
        <polyline points="7 23 3 19 7 15"></polyline>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
      </svg>
    ),
  },
];

const SUGGESTIONS = [
  "What are my rights if police stop me?",
  "Punishment for theft under BNS?",
  "How do I get bail?",
];

export default function WelcomeState({
  onPromptSelect,
}: {
  onPromptSelect: (prompt: string) => void;
}) {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-[60px] pt-10">
      {/* § emblem */}
      <div className="relative mb-[26px]">
        <div
          className="absolute rounded-full"
          style={{
            inset: -26,
            background:
              "radial-gradient(circle at center, rgba(var(--gold-rgb),0.35), transparent 68%)",
            filter: "blur(16px)",
            animation: "lexPulse 5s ease-in-out infinite",
          }}
        />
        <div
          className="font-heading relative flex h-[72px] w-[72px] items-center justify-center rounded-[22px] text-[38px] font-semibold"
          style={{
            background:
              "linear-gradient(150deg, rgba(240,208,137,0.16), rgba(212,168,67,0.05))",
            border: "1px solid rgba(240,208,137,0.45)",
            backdropFilter: "blur(10px)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.2), 0 0 34px rgba(var(--gold-rgb),0.3)",
            color: "var(--color-gold-light)",
            textShadow: "0 0 20px rgba(240,208,137,0.7)",
          }}
        >
          §
        </div>
      </div>

      <h1 className="font-heading mb-[10px] text-[34px] font-semibold tracking-[-0.025em] text-white">
        Welcome to Lexora.
      </h1>
      <p
        className="mb-[38px] max-w-[480px] text-center text-[15px] leading-[1.55]"
        style={{ color: "rgba(255,255,255,0.52)" }}
      >
        Ask anything about Indian law — every answer cited to the exact section.
      </p>

      {/* feature cards */}
      <div className="mb-[22px] grid w-full max-w-[860px] grid-cols-4 gap-[14px]">
        {FEATURES.map((feature, i) => (
          <button
            key={feature.title}
            type="button"
            onClick={() => onPromptSelect(feature.prompt)}
            className="lex-feature-card rounded-2xl px-4 pt-[18px] pb-[18px] text-left"
            style={{
              background:
                i % 2 === 0
                  ? "linear-gradient(160deg, rgba(212,168,67,0.13), rgba(255,255,255,0.02) 60%)"
                  : "linear-gradient(160deg, rgba(198,140,60,0.11), rgba(255,255,255,0.02) 60%)",
              border: "1px solid rgba(255,255,255,0.09)",
              backdropFilter: "blur(10px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <div className="mb-3" style={{ color: "var(--color-gold-soft)" }}>
              {feature.icon}
            </div>
            <div
              className="mb-1 text-[13.5px] font-semibold"
              style={{ color: "rgba(255,255,255,0.88)" }}
            >
              {feature.title}
            </div>
            <div
              className="text-[11.5px] leading-[1.45]"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              {feature.description}
            </div>
          </button>
        ))}
      </div>

      {/* suggestion chips */}
      <div className="flex flex-wrap justify-center gap-[10px]">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onPromptSelect(suggestion)}
            className="lex-suggestion-chip rounded-pill px-4 py-[9px] text-[12.5px]"
            style={{
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
