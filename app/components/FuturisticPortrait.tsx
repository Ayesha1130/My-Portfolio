"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FaBolt, FaRobot } from "react-icons/fa6";
import { Sparkles, CheckCircle } from "lucide-react";
import siteContent from "@/data/site-content.json";
import { liveProjectCount } from "@/lib/siteStats";

export default function FuturisticPortrait() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        setIsHovered(false);
        setRotateX(0);
        setRotateY(0);
        return;
      }

      setIsHovered(true);
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max 14 degree tilt
      const rotY = ((x - centerX) / centerX) * 12;
      const rotX = -((y - centerY) / centerY) * 12;

      setRotateX(rotX);
      setRotateY(rotY);
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setRotateX(0);
      setRotateY(0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center py-6">
      {/* 1. Ambient Hologram Radial Glows */}
      <div
        className="absolute -inset-10 bg-gradient-to-r from-violet-600/30 via-cyan-500/25 to-violet-500/30 rounded-full blur-[90px] pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="absolute w-[380px] h-[380px] md:w-[460px] md:h-[460px] rounded-full border border-violet-500/20 pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Concentric Holographic Orbital Rings */}
      <div
        className="absolute w-[360px] h-[360px] md:w-[440px] md:h-[440px] rounded-full border border-dashed border-cyan-400/30 animate-orbit-cw pointer-events-none"
        aria-hidden="true"
      >
        {/* Orbit Satellite 1 */}
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f5ff]" />
      </div>

      <div
        className="absolute w-[390px] h-[390px] md:w-[480px] md:h-[480px] rounded-full border border-dashed border-violet-500/35 animate-orbit-ccw pointer-events-none"
        aria-hidden="true"
      >
        {/* Orbit Satellite 2 */}
        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-violet-400 shadow-[0_0_14px_#a78bfa]" />
      </div>

      {/* 3. 3D Tilt Card Container */}
      <div
        ref={cardRef}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
        className="relative z-10 w-[290px] sm:w-[330px] md:w-[360px] aspect-[4/5] rounded-[32px] p-2 bg-gradient-to-b from-white/10 via-violet-500/10 to-cyan-500/15 border border-white/20 shadow-glass-card preserve-3d group cursor-pointer"
      >
        {/* Dynamic Specular Glare */}
        <div
          className="absolute inset-0 rounded-[30px] pointer-events-none z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)`,
            opacity: isHovered ? 1 : 0.2,
          }}
          aria-hidden="true"
        />

        {/* Inner Card Wrapper with Corner Accents */}
        <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-slate-950/90 border border-violet-500/30">
          {/* Cyberpunk corner brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
          <div className="absolute bottom-16 left-3 w-4 h-4 border-b-2 border-l-2 border-violet-400 z-20 pointer-events-none" />
          <div className="absolute bottom-16 right-3 w-4 h-4 border-b-2 border-r-2 border-violet-400 z-20 pointer-events-none" />

          {/* Real Portrait Image */}
          <Image
            src={siteContent.profile.image}
            alt="Ayesha Iqbal — Full-Stack AI Engineer"
            fill
            priority
            sizes="(min-width: 768px) 360px, (min-width: 640px) 330px, 290px"
            className="object-cover object-[50%_18%] transition-transform duration-700 group-hover:scale-105"
          />

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none z-10" />

          {/* Bottom Identity Overlay */}
          <div className="absolute bottom-3 left-3 right-3 z-20 bg-slate-900/85 backdrop-blur-xl rounded-2xl p-3.5 border border-white/10 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-1.5">
                  Ayesha Iqbal
                  <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f5ff]" />
                </h3>
                <p className="text-xs text-cyan-300 font-medium">
                  Full-Stack AI Engineer
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Open for Work</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. 3D Floating Holographic Badges (hovering outside the card) */}
      {/* Top Right: AI Engineer badge */}
      <div
        className="absolute -top-3 -right-2 sm:-right-8 z-20 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-violet-500/40 shadow-glow-violet flex items-center gap-2 animate-float pointer-events-none"
        style={{ animationDelay: "0s" }}
      >
        <span className="w-6 h-6 rounded-lg bg-violet-600/30 flex items-center justify-center text-violet-300 text-xs">
          <Sparkles size={13} />
        </span>
        <div>
          <p className="text-[10px] text-muted uppercase tracking-wider font-semibold">Role</p>
          <p className="text-xs font-bold text-white">Full-Stack AI Engineer</p>
        </div>
      </div>

      {/* Middle Left: OpenAI Agents & MCP */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -left-2 sm:-left-10 z-20 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-cyan-500/40 shadow-glow-cyan flex items-center gap-2 animate-float pointer-events-none"
        style={{ animationDelay: "1.5s" }}
      >
        <span className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300 text-xs">
          <FaBolt />
        </span>
        <div>
          <p className="text-[10px] text-muted uppercase tracking-wider font-semibold">Specialization</p>
          <p className="text-xs font-bold text-white">AI Agents &amp; MCP</p>
        </div>
      </div>

      {/* Bottom Right: live project count */}
      <div
        className="absolute -bottom-4 -right-2 sm:-right-6 z-20 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-violet-500/40 shadow-glow-violet flex items-center gap-2 animate-float pointer-events-none"
        style={{ animationDelay: "3s" }}
      >
        <span className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs">
          <CheckCircle size={13} />
        </span>
        <div>
          <p className="text-[10px] text-muted uppercase tracking-wider font-semibold">Portfolio</p>
          <p className="text-xs font-bold text-white">{liveProjectCount} Live Projects</p>
        </div>
      </div>
    </div>
  );
}
