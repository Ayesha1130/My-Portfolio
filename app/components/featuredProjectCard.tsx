"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaArrowUpRightFromSquare, FaLayerGroup, FaCheck } from "react-icons/fa6";
import { Sparkles } from "lucide-react";

interface FeaturedProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  features: string[];
  stack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  image?: string | null;
}

export default function FeaturedProjectCard({
  project,
  reverse = false,
}: {
  project: FeaturedProject;
  reverse?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotY = ((x - centerX) / centerX) * 4;
    const rotX = -((y - centerY) / centerY) * 4;

    setRotateX(rotX);
    setRotateY(rotY);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? "transform 0.08s ease-out" : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      className={`project-card group relative flex flex-col ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-stretch gap-8 lg:gap-12 bg-slate-900/60 border border-slate-800 hover:border-violet-500/50 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-glass-card hover:shadow-glow-violet transition-all duration-300 preserve-3d overflow-hidden`}
    >
      {/* Visual Thumbnail */}
      <div className="relative flex-1 min-h-[280px] sm:min-h-[340px] rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-800 flex items-center justify-center">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-900/30 via-slate-950 to-cyan-900/20 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00f5ff_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <span className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-violet-500/40 flex items-center justify-center text-cyan-400 text-2xl shadow-glow-cyan">
                <Sparkles size={24} />
              </span>
              <p className="text-2xl font-extrabold text-white tracking-tight">
                {project.name.split("—")[0].trim()}
              </p>
              <p className="text-xs font-mono text-cyan-300 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700">
                {project.stack.slice(0, 3).join(" • ")}
              </p>
            </div>
          </div>
        )}

        {/* Live Status Pill */}
        {project.liveUrl && (
          <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-xs font-semibold shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE DEMO</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-cyan-400 font-mono font-bold">
            Featured Case Study
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
          {project.name}
        </h3>
        <p className="mt-1 text-sm text-slate-400 font-medium">{project.tagline}</p>

        <p className="mt-4 text-sm text-slate-300/90 leading-relaxed">
          {project.description}
        </p>

        {/* Goal / Problem */}
        {project.problem && (
          <div className="mt-4 p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80">
            <p className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold mb-1">
              Engineering Challenge
            </p>
            <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{project.problem}</p>
          </div>
        )}

        {/* Key Features */}
        <div className="mt-5">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            {project.features.slice(0, 4).map((f) => (
              <li key={f} className="text-xs text-slate-300 flex items-start gap-2">
                <FaCheck className="text-cyan-400 text-[10px] mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-medium text-slate-300 bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-glow-violet transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>View Live Project</span>
              <FaArrowUpRightFromSquare size={12} />
            </a>
          )}

          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300"
          >
            <FaLayerGroup size={12} />
            <span>Architecture &amp; Decisions</span>
          </Link>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              aria-label="View Source on GitHub"
            >
              <FaGithub size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
