"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaEnvelope, FaFileArrowDown, FaArrowLeft, FaCopy, FaCheck, FaPhone, FaWhatsapp } from "react-icons/fa6";
import { Sparkles } from "lucide-react";
import siteContent from "@/data/site-content.json";
import { liveProjectCount, certificationCount } from "@/lib/siteStats";

const { social, email, phone, phoneHref, whatsappUrl, location, availability } = siteContent.profile;

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a1128] text-slate-100 pt-36 pb-28 px-6 md:px-[clamp(20px,6vw,110px)] relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-24 left-1/4 w-[500px] h-[500px] bg-violet-600/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-24 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-colors mb-8"
        >
          <FaArrowLeft /> <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            <span>Connect &amp; Collaborate</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
            Let&apos;s Build Something <br />
            <span className="text-gradient-violet-cyan">Extraordinary.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
            Have a project in mind, need a Full-Stack AI Engineer, or want to discuss full-time roles, internships, or freelance systems? Reach out directly.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Email Direct */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-400/50 backdrop-blur-xl transition-all duration-300 shadow-glass-card flex flex-col justify-between">
            <div>
              <span className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl mb-4">
                <FaEnvelope />
              </span>
              <h2 className="text-lg font-bold text-white mb-1">Direct Email</h2>
              <p className="text-xs text-slate-400 mb-4">Typical response time: under 24 hours.</p>
              <a
                href={`mailto:${email}`}
                className="text-base sm:text-lg font-mono font-semibold text-cyan-300 hover:underline break-all"
              >
                {email}
              </a>
              <div className="mt-5 flex items-center gap-3 text-slate-300">
                <span className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 text-sm">
                  <FaPhone />
                </span>
                <div>
                  <a href={phoneHref} className="text-base sm:text-lg font-mono font-semibold text-violet-300 hover:underline">
                    {phone}
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-300 transition-colors mt-0.5"
                  >
                    <FaWhatsapp className="text-emerald-400" /> Also on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Email"}</span>
              </button>

              <a
                href={`mailto:${email}`}
                className="text-xs font-semibold text-violet-400 hover:text-cyan-300 transition-colors"
              >
                Open Mail App →
              </a>
            </div>
          </div>

          {/* CV & Status */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/50 backdrop-blur-xl transition-all duration-300 shadow-glass-card flex flex-col justify-between">
            <div>
              <span className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 text-xl mb-4">
                <FaFileArrowDown />
              </span>
              <h2 className="text-lg font-bold text-white mb-1">Verified Resume / CV</h2>
              <p className="text-xs text-slate-400 mb-4">
                Full-Stack AI Engineer, {certificationCount} certifications, {liveProjectCount} live shipped projects.
              </p>
              <p className="text-sm text-slate-300 font-mono">
                Location: <span className="text-white font-semibold">{location}</span>
              </p>
              <p className="text-xs text-emerald-400 mt-1 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {availability}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <a
                href={siteContent.profile.cvUrl}
                download={siteContent.profile.cvFileName}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm py-3 px-5 rounded-xl shadow-glow-violet transition-all duration-300 hover:scale-[1.02]"
              >
                <FaFileArrowDown />
                <span>Download Updated CV (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Social Profiles List */}
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-md">
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400 mb-6">
            Professional Networks &amp; Code Repositories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-400/50 hover:bg-slate-900 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center text-lg">
                  <FaLinkedin />
                </span>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    LinkedIn
                  </p>
                  <p className="text-xs text-slate-400 font-mono">in/ayesha-iqbal-dev</p>
                </div>
              </div>
              <span className="text-slate-500 group-hover:text-cyan-400 transition-colors text-sm">→</span>
            </a>

            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-violet-400/50 hover:bg-slate-900 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center text-lg">
                  <FaGithub />
                </span>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                    GitHub
                  </p>
                  <p className="text-xs text-slate-400 font-mono">github.com/Ayesha1130</p>
                </div>
              </div>
              <span className="text-slate-500 group-hover:text-violet-400 transition-colors text-sm">→</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
