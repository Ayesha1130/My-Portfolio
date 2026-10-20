"use client";
import React from "react";
import {
  SiTypescript,
  SiOpenai,
  SiSupabase,
  SiPostgresql,
  SiDocker,
  SiStripe,
  SiThreedotjs,
  SiTailwindcss,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiZod,
} from "react-icons/si";

export default function TechStack() {
  const techItems = [
    { name: "OpenAI Agents SDK", icon: <SiOpenai />, color: "hover:text-emerald-400" },
    { name: "Next.js 14", icon: <SiNextdotjs />, color: "hover:text-white" },
    { name: "TypeScript", icon: <SiTypescript />, color: "hover:text-cyan-400" },
    { name: "Python", icon: <SiPython />, color: "hover:text-amber-400" },
    { name: "Three.js", icon: <SiThreedotjs />, color: "hover:text-white" },
    { name: "Supabase", icon: <SiSupabase />, color: "hover:text-emerald-400" },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "hover:text-sky-400" },
    { name: "React 18", icon: <SiReact />, color: "hover:text-cyan-400" },
    { name: "Stripe", icon: <SiStripe />, color: "hover:text-indigo-400" },
    { name: "Docker", icon: <SiDocker />, color: "hover:text-blue-400" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "hover:text-cyan-400" },
    { name: "Zod Schema", icon: <SiZod />, color: "hover:text-blue-400" },
  ];

  // Duplicate for seamless infinite loop
  const duplicated = [...techItems, ...techItems];

  return (
    <div className="relative overflow-hidden w-full bg-[#070d22] py-14 border-y border-slate-800/80">
      {/* Left/Right Vignette Gradient for smooth edge fade */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#070d22] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#070d22] to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Marquee */}
      <div className="flex animate-marquee gap-12 sm:gap-16 items-center">
        {duplicated.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 text-slate-400 ${item.color} transition-all duration-300 cursor-default group flex-shrink-0`}
          >
            <span className="text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-125">
              {item.icon}
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wider font-mono uppercase">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}