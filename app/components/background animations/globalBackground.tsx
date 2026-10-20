"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function GlobalBackground() {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const x1 = gsap.quickTo(blob1Ref.current, "x", { duration: 1.8, ease: "power2" });
    const y1 = gsap.quickTo(blob1Ref.current, "y", { duration: 1.8, ease: "power2" });
    const x2 = gsap.quickTo(blob2Ref.current, "x", { duration: 2.6, ease: "power2" });
    const y2 = gsap.quickTo(blob2Ref.current, "y", { duration: 2.6, ease: "power2" });

    const onMove = (e: MouseEvent) => {
      x1(e.clientX - 350);
      y1(e.clientY - 350);
      x2(e.clientX - 450);
      y2(e.clientY - 450);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  });

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#0a1128]">
      {/* Subtle background circuit grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Electric Violet ambient orb */}
      <div
        ref={blob1Ref}
        className="absolute w-[700px] h-[700px] rounded-full animate-breathe pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.02) 50%, transparent 70%)",
          filter: "blur(90px)",
          top: 0,
          left: 0,
        }}
      />

      {/* Cyan ambient orb */}
      <div
        ref={blob2Ref}
        className="absolute w-[850px] h-[850px] rounded-full animate-breathe-slow pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,245,255,0.08) 0%, rgba(0,245,255,0.01) 50%, transparent 70%)",
          filter: "blur(110px)",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}
