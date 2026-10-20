"use client";
import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaArrowRight, FaFileArrowDown, FaEnvelope, FaPhone } from "react-icons/fa6";
import Hero3DScene from "./Hero3DScene";
import FuturisticPortrait from "./FuturisticPortrait";
import siteContent from "@/data/site-content.json";
import { liveProjectCount, certificationCount, anthropicCredentialCount } from "@/lib/siteStats";

export default function HeroSection() {
  const { profile } = siteContent;

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-[clamp(20px,6vw,110px)] pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#070d22] via-[#0b122c] to-[#0a1128]">
      {/* 1. Interactive 3D WebGL Three.js Scene */}
      <Hero3DScene />

      {/* 2. Cinematic Gradient Ambient Lights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-violet-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-cyan-500/15 blur-[160px] rounded-full pointer-events-none" />

      {/* 3. Main Hero Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography & CTAs (7 cols on lg) */}
        <div className="lg:col-span-7 text-center lg:text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-violet-500/30 backdrop-blur-md text-xs sm:text-sm text-slate-300 shadow-sm mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981]" />
            <span className="font-medium">Open to remote full-stack roles · internships · freelance</span>
          </div>

          {/* Name & Title */}
          <div className="space-y-2 mb-4">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.35em] text-cyan-400 font-mono">
              AYESHA IQBAL
            </p>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              FULL-STACK{" "}
              <span className="text-gradient-violet-cyan block sm:inline">
                AI ENGINEER
              </span>
            </h1>
          </div>

          {/* Tagline & Subtitle */}
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-200 tracking-tight mt-3 mb-4">
            Building Intelligent Digital Experiences.
          </h2>
          <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            &ldquo;From AI agents to scalable full-stack applications, I engineer intelligent products that solve real-world problems.&rdquo;
          </p>

          {/* Key Tech Badges */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-5 pb-8">
            {[
              "AI Agents & MCP",
              "OpenAI Agents SDK",
              "Next.js & TypeScript",
              "Node.js & Python",
              "Supabase & PostgreSQL",
              "Stripe & E-Commerce",
            ].map((badge) => (
              <span
                key={badge}
                className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-900/70 border border-slate-700/60 text-slate-300 hover:border-cyan-400/60 hover:text-cyan-300 transition-colors"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
            {/* Explore Projects Button */}
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:shadow-glow-violet hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              <span>Explore Projects</span>
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Download Updated CV Button */}
            <a
              href={siteContent.profile.cvUrl}
              download={siteContent.profile.cvFileName}
              className="inline-flex items-center gap-2.5 bg-slate-900/80 hover:bg-slate-800 text-white border border-violet-500/40 hover:border-violet-400 px-6 py-3.5 rounded-xl font-bold text-sm shadow-sm hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              <FaFileArrowDown className="text-cyan-400 text-base" />
              <span>Download Updated CV</span>
            </a>

            {/* Contact Me Button */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 px-4 py-3.5 font-semibold text-sm transition-colors hover:underline underline-offset-8"
            >
              <FaEnvelope className="text-xs" />
              <span>Contact Me</span>
            </Link>
          </div>

          {/* Social Links & Location */}
          <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 border-t border-slate-800/80 pt-6">
            <div className="flex items-center gap-3">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/70 flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 shadow-sm"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/70 flex items-center justify-center text-slate-300 hover:text-white hover:border-violet-400 hover:bg-violet-500/10 transition-all duration-300 shadow-sm"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Send Email"
                className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/70 flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 shadow-sm"
              >
                <FaEnvelope size={17} />
              </a>
              <a
                href={profile.phoneHref}
                aria-label={`Call ${profile.phone}`}
                className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/70 flex items-center justify-center text-slate-300 hover:text-white hover:border-violet-400 hover:bg-violet-500/10 transition-all duration-300 shadow-sm"
              >
                <FaPhone size={15} />
              </a>
            </div>

            <span className="hidden sm:inline-block w-px h-6 bg-slate-800" />

            <div className="text-xs text-slate-400">
              <span className="text-slate-200 font-semibold">{profile.location}</span>
              <span className="mx-2">•</span>
              <a href={`mailto:${profile.email}`} className="text-cyan-400 hover:underline">{profile.email}</a>
              <span className="mx-2">•</span>
              <a href={profile.phoneHref} className="text-cyan-400 hover:underline">{profile.phone}</a>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Holographic Portrait Presentation (5 cols on lg) */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <FuturisticPortrait />
        </div>
      </div>

      {/* 4. Verified Metrics Ribbon */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-16 pt-10 border-t border-slate-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60 backdrop-blur-sm">
            <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
              {liveProjectCount}
            </p>
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">
              Live Shipped Projects
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60 backdrop-blur-sm">
            <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300">
              {certificationCount}
            </p>
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">
              Certifications
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60 backdrop-blur-sm">
            <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
              {anthropicCredentialCount}
            </p>
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">
              Anthropic Claude Credentials
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60 backdrop-blur-sm">
            <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              100%
            </p>
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">
              Production Architecture
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}