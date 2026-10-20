"use client";
import React from "react";
import { FaCertificate, FaAward, FaShieldHalved, FaBolt, FaGraduationCap } from "react-icons/fa6";
import siteContent from "@/data/site-content.json";

export default function CertificationsSection() {
  const { certifications } = siteContent;

  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-24 px-6 md:px-[clamp(20px,6vw,110px)] bg-slate-950 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-violet-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-widest mb-4">
            <FaAward className="text-cyan-400" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Professional Certifications
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Rigorous certifications in Agentic AI, Model Context Protocol (MCP), and Prompt Engineering.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((cert, i) => {
            const isAnthropic = cert.issuer.includes("Anthropic");
            const isPIAIC = cert.issuer.includes("PIAIC");

            return (
              <div
                key={i}
                className="cert-card group relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-md flex flex-col justify-between hover:shadow-[0_0_25px_-5px_rgba(0,245,255,0.2)] hover:-translate-y-1"
              >
                <div>
                  {/* Top Badge & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-base shadow-sm ${
                        isAnthropic
                          ? "bg-violet-500/15 text-violet-400 border border-violet-500/30"
                          : isPIAIC
                          ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                          : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {isAnthropic ? <FaBolt /> : isPIAIC ? <FaShieldHalved /> : <FaGraduationCap />}
                    </span>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-400">
                      {cert.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-2">
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <p className="text-xs text-slate-400 font-medium">
                    {cert.issuer}
                  </p>
                </div>

                {/* Bottom Verification Tag */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-mono uppercase tracking-wider">Credential</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <FaCertificate className="text-[10px]" /> Verified
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
