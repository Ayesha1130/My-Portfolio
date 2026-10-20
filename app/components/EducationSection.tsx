import React from "react";
import { FaGraduationCap, FaLocationDot } from "react-icons/fa6";
import siteContent from "@/data/site-content.json";

export default function EducationSection() {
  const { education } = siteContent;

  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-20 px-6 md:px-[clamp(20px,6vw,110px)] bg-[#0a1128] relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-widest mb-4">
            <FaGraduationCap className="text-cyan-400" />
            <span>Qualifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Education</h2>
        </div>

        <div className="space-y-5">
          {education.map((item) => (
            <div
              key={`${item.degree}-${item.institution}`}
              className="group p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-md flex flex-col sm:flex-row sm:items-center gap-5 hover:-translate-y-1"
            >
              <span className="w-14 h-14 flex-shrink-0 rounded-2xl bg-violet-500/15 text-violet-400 border border-violet-500/30 flex items-center justify-center text-2xl">
                <FaGraduationCap />
              </span>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {item.degree}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 font-medium mt-1">{item.institution}</p>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <FaLocationDot className="text-cyan-400" /> {item.location}
                </p>
              </div>
              <div className="flex sm:flex-col gap-2 sm:items-end">
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-300">
                  {item.year}
                </span>
                {item.grade && (
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                    {item.grade}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
