"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowUpRightFromSquare, FaGithub, FaLayerGroup, FaCheck } from "react-icons/fa6";
import { Sparkles } from "lucide-react";

export interface ProjectData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problem?: string;
  solution?: string;
  features: string[];
  stack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  image?: string | null;
}

export default function Project3DCard({
  project,
  index,
  featured = false,
}: {
  project: ProjectData;
  index: number;
  featured?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotY = ((x - centerX) / centerX) * 8;
    const rotX = -((y - centerY) / centerY) * 8;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Distinct theme accents per project index
  const accents = [
    { border: "hover:border-cyan-400/60", badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30", gradient: "from-cyan-500/20 via-violet-600/10 to-transparent", glow: "shadow-[0_0_35px_-8px_rgba(0,245,255,0.25)]" },
    { border: "hover:border-violet-400/60", badge: "bg-violet-500/10 text-violet-300 border-violet-500/30", gradient: "from-violet-600/25 via-fuchsia-600/10 to-transparent", glow: "shadow-[0_0_35px_-8px_rgba(139,92,246,0.25)]" },
    { border: "hover:border-purple-400/60", badge: "bg-purple-500/10 text-purple-300 border-purple-500/30", gradient: "from-purple-600/20 via-indigo-600/10 to-transparent", glow: "shadow-[0_0_35px_-8px_rgba(168,85,247,0.25)]" },
    { border: "hover:border-emerald-400/60", badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30", gradient: "from-emerald-600/20 via-cyan-600/10 to-transparent", glow: "shadow-[0_0_35px_-8px_rgba(16,185,129,0.25)]" },
  ];
  const accent = accents[index % accents.length];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? "transform 0.08s ease-out" : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      className={`project-card group relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 backdrop-blur-xl ${accent.border} ${isHovered ? accent.glow : "shadow-lg"} transition-all duration-300 preserve-3d overflow-hidden`}
    >
      {/* Specular glare overlay */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none z-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.01) 45%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Top Banner / Mockup Visual */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-slate-950/80 border border-slate-800/80 flex items-center justify-center">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            fill
            unoptimized
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${accent.gradient} flex flex-col items-center justify-center p-6 text-center relative overflow-hidden`}>
            {/* Geometric circuit grid pattern */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00f5ff_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-center text-cyan-400 text-xl shadow-lg">
                <Sparkles size={22} />
              </span>
              <p className="font-bold text-lg text-white tracking-tight">
                {project.name.split("—")[0].trim()}
              </p>
              <p className="text-xs text-slate-400 line-clamp-1 max-w-xs font-mono">
                {project.stack.slice(0, 3).join(" • ")}
              </p>
            </div>
          </div>
        )}

        {/* Live Status Tag */}
        {project.liveUrl && (
          <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE DEMO</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Project Header */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
              {project.name}
            </h3>
          </div>

          <p className="text-xs font-medium text-slate-400 mb-4 line-clamp-2">
            {project.tagline}
          </p>

          <p className="text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          {/* Key Features Bullet Highlights */}
          {project.features && project.features.length > 0 && (
            <div className="mb-6 space-y-1.5">
              {project.features.slice(0, 3).map((f, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <FaCheck className="text-cyan-400 text-[10px] mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-1">{f}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tech Stack Pills */}
        <div>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Live Demo</span>
                <FaArrowUpRightFromSquare className="text-xs" />
              </a>
            )}

            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center justify-center gap-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-all duration-300"
            >
              <FaLayerGroup className="text-xs" />
              <span>Case Study</span>
            </Link>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Source on GitHub"
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <FaGithub size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
