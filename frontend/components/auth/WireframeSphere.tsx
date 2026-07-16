export default function WireframeSphere() {
  return (
    <div
      className="pointer-events-none absolute z-0"
      style={{
        bottom: -560,
        left: "50%",
        transform: "translateX(-50%)",
        width: 1000,
        height: 1000,
      }}
    >
      {/* core glow */}
      <div
        className="absolute rounded-full"
        style={{
          inset: -80,
          background:
            "radial-gradient(circle at 50% 38%, rgba(var(--gold-light-rgb),0.30), rgba(var(--gold-rgb),0.10) 45%, transparent 70%)",
          filter: "blur(30px)",
          animation: "lexPulse 7s ease-in-out infinite",
        }}
      />
      {/* outer circle */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1px solid rgba(var(--gold-light-rgb),0.5)",
          boxShadow:
            "0 0 40px rgba(var(--gold-rgb),0.35), inset 0 0 60px rgba(var(--gold-rgb),0.12)",
        }}
      />
      {/* longitude ellipses */}
      <div
        className="absolute rounded-full"
        style={{
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 1000,
          border: "1px solid rgba(var(--gold-light-rgb),0.32)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 380,
          height: 1000,
          border: "1px solid rgba(var(--gold-light-rgb),0.24)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 60,
          height: 1000,
          border: "1px solid rgba(var(--gold-light-rgb),0.18)",
        }}
      />
      {/* latitude ellipses */}
      <div
        className="absolute rounded-full"
        style={{
          top: 80,
          left: "50%",
          transform: "translateX(-50%)",
          width: 560,
          height: 130,
          border: "1px solid rgba(var(--gold-light-rgb),0.35)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: 230,
          left: "50%",
          transform: "translateX(-50%)",
          width: 860,
          height: 180,
          border: "1px solid rgba(var(--gold-light-rgb),0.30)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: 420,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1000,
          height: 200,
          border: "1px solid rgba(var(--gold-light-rgb),0.25)",
        }}
      />
      {/* node points */}
      <div
        className="absolute rounded-full"
        style={{
          top: 76,
          left: 500,
          width: 6,
          height: 6,
          background: "var(--color-gold-light)",
          boxShadow: "0 0 12px var(--color-gold-light)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: 142,
          left: 222,
          width: 5,
          height: 5,
          background: "rgba(var(--gold-light-rgb),0.9)",
          boxShadow: "0 0 10px rgba(var(--gold-light-rgb),0.9)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: 152,
          left: 770,
          width: 5,
          height: 5,
          background: "rgba(var(--gold-light-rgb),0.9)",
          boxShadow: "0 0 10px rgba(var(--gold-light-rgb),0.9)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: 300,
          left: 74,
          width: 4,
          height: 4,
          background: "rgba(var(--gold-light-rgb),0.7)",
          boxShadow: "0 0 8px rgba(var(--gold-light-rgb),0.7)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: 314,
          left: 928,
          width: 4,
          height: 4,
          background: "rgba(var(--gold-light-rgb),0.7)",
          boxShadow: "0 0 8px rgba(var(--gold-light-rgb),0.7)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: 262,
          left: 500,
          width: 4,
          height: 4,
          background: "rgba(var(--gold-light-rgb),0.8)",
          boxShadow: "0 0 8px rgba(var(--gold-light-rgb),0.8)",
        }}
      />
    </div>
  );
}
