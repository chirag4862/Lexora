import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import TrustStrip from "@/components/landing/TrustStrip";
import Features from "@/components/landing/Features";
import CtaBand from "@/components/landing/CtaBand";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div
      className="relative w-full overflow-hidden bg-bg"
      style={{ color: "rgba(255,255,255,0.92)" }}
    >
      {/* ambient depth glows */}
      <div
        className="pointer-events-none absolute z-0"
        style={{
          top: -180,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1100,
          height: 900,
          background:
            "radial-gradient(ellipse at center, rgba(var(--gold-rgb),0.22), rgba(var(--gold-rgb),0.06) 40%, transparent 68%)",
          filter: "blur(20px)",
        }}
      />
      <div
        className="pointer-events-none absolute z-0"
        style={{
          top: 340,
          left: -120,
          width: 620,
          height: 620,
          background:
            "radial-gradient(circle at center, rgba(74,110,180,0.14), transparent 66%)",
          filter: "blur(30px)",
        }}
      />
      <div
        className="pointer-events-none absolute z-0"
        style={{
          top: 1500,
          right: -160,
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle at center, rgba(var(--gold-rgb),0.10), transparent 66%)",
          filter: "blur(40px)",
        }}
      />
      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, transparent 55%, rgba(3,5,10,0.85) 100%)",
        }}
      />

      <Nav />
      <Hero />
      <TrustStrip />
      <Features />
      <CtaBand />
      <Footer />
    </div>
  );
}
