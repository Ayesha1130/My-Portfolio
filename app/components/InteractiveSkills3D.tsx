"use client";
import React, { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { FaBrain, FaCode, FaServer, FaDatabase, FaWrench, FaRobot, FaBolt, FaShieldHalved } from "react-icons/fa6";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiThreedotjs,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiZod,
  SiSupabase,
  SiPostgresql,
  SiOpenai,
  SiGit,
  SiGithub,
  SiVercel,
  SiDocker,
  SiStripe,
} from "react-icons/si";
import { Sparkles } from "lucide-react";
import siteContent from "@/data/site-content.json";

/** Real technology icons for the skills listed in data/site-content.json. */
const SKILL_ICONS: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  "HTML / CSS": FaCode,
  "Three.js": SiThreedotjs,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Python: SiPython,
  "REST APIs": FaServer,
  Zod: SiZod,
  "SSE streaming": FaBolt,
  Supabase: SiSupabase,
  PostgreSQL: SiPostgresql,
  Neon: FaDatabase,
  "Row-Level Security": FaShieldHalved,
  "OpenAI API": SiOpenai,
  "OpenAI Agents SDK": SiOpenai,
  "Gemini API": FaBrain,
  "AI Agents": FaRobot,
  "MCP (Model Context Protocol)": FaRobot,
  "Prompt Engineering": FaBrain,
  Git: SiGit,
  GitHub: SiGithub,
  Vercel: SiVercel,
  Docker: SiDocker,
  Stripe: SiStripe,
  JWT: FaShieldHalved,
  Vitest: FaBolt,
};

const CATEGORY_FALLBACK_ICON: Record<string, IconType> = {
  "AI & Agents": FaBrain,
  Frontend: FaCode,
  Backend: FaServer,
  Database: FaDatabase,
};

/** Soft purple / blue accents per category (matches the existing theme). */
const CATEGORY_ACCENT: Record<string, string> = {
  Frontend: "#a78bfa",
  Backend: "#60a5fa",
  Database: "#818cf8",
  "AI & Agents": "#22d3ee",
  "Tools & Payments": "#c4b5fd",
};

interface Skill {
  name: string;
  category: string;
}

function TechCard({ skill, index, visible, reducedMotion }: { skill: Skill; index: number; visible: boolean; reducedMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = SKILL_ICONS[skill.name] ?? CATEGORY_FALLBACK_ICON[skill.category] ?? FaWrench;
  const accent = CATEGORY_ACCENT[skill.category] ?? "#a78bfa";

  // Direct style updates: no React re-render on every pointer move.
  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${((px - 0.5) * 24).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-(py - 0.5) * 24).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  // Deterministic per-card float timing so server and client markup match.
  const floatStyle = {
    "--float-dur": `${5 + (index % 5) * 0.7}s`,
    "--float-delay": `${-(index % 7) * 0.6}s`,
    "--float-amp": `${6 + (index % 4) * 2}px`,
  } as React.CSSProperties;

  return (
    <div
      className={`tech-enter ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: visible ? `${Math.min(index, 14) * 45}ms` : "0ms" }}
    >
      <div className="tech-float" style={floatStyle}>
        <div
          ref={ref}
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          className="tech-card rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 sm:gap-3.5 cursor-default"
          style={{ "--accent": accent } as React.CSSProperties}
        >
          <span
            className="tech-layer-icon w-11 h-11 flex-shrink-0 rounded-xl flex items-center justify-center text-xl border"
            style={{
              color: accent,
              borderColor: `${accent}55`,
              background: `linear-gradient(145deg, ${accent}30, ${accent}08)`,
              boxShadow: `0 8px 20px -8px ${accent}`,
            }}
          >
            <Icon aria-hidden="true" />
          </span>
          <div className="tech-layer-text min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-white leading-tight break-words">{skill.name}</p>
            <p className="text-[10px] text-slate-400 font-mono mt-1 truncate">{skill.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InteractiveSkills3D() {
  const { techStack, whatICanBuild } = siteContent;
  const [activeTab, setActiveTab] = useState<string>("All");
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const categories = Object.entries(techStack);

  const allSkills: Skill[] = categories.flatMap(([category, items]) =>
    (items as string[]).map((name) => ({ name, category }))
  );
  const filteredSkills = activeTab === "All" ? allSkills : allSkills.filter((s) => s.category === activeTab);

  // Respect prefers-reduced-motion (CSS also disables the animations).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Play the entrance animation when the grid scrolls into view.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Replay the entrance whenever the category tab changes (ready is reset in selectTab).
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => cancelAnimationFrame(id);
  }, [activeTab]);

  const selectTab = (tab: string) => {
    if (tab === activeTab) return;
    setReady(false);
    setActiveTab(tab);
  };

  const visible = inView && ready;

  return (
    <section id="skills" className="py-24 px-6 md:px-[clamp(20px,6vw,110px)] bg-[#0a1128] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-blue-500/15 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-violet-500/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Expertise &amp; Tech Stack
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Production-proven tools and frameworks across the full stack and modern AI agent ecosystems.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist" aria-label="Technology categories">
          {["All", ...categories.map(([c]) => c)].map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => selectTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-glow-violet scale-105"
                  : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 3D Floating Technology Cards */}
        <div className="relative mb-20">
          <div className="tech-floor" aria-hidden="true" />
          <div ref={stageRef} className="tech-stage relative">
            <div
              className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 py-4"
              style={{ transformStyle: "preserve-3d" }}
            >
              {filteredSkills.map((skill, i) => (
                <TechCard
                  key={`${skill.category}-${skill.name}`}
                  skill={skill}
                  index={i}
                  visible={visible}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </div>
        </div>

        {/* "What I Can Build For You" Cards */}
        {whatICanBuild && whatICanBuild.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-800/80">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight text-center mb-8">
              What I Can Engineer For You
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatICanBuild.map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/40 transition-all duration-300 backdrop-blur-sm group hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-600/15 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-110 transition-transform">
                    <Sparkles size={16} />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
