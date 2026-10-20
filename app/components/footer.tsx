"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaEnvelope, FaFileArrowDown, FaPhone } from "react-icons/fa6";
import siteContent from "@/data/site-content.json";

export default function Footer() {
  const { profile } = siteContent;

  return (
    <footer className="bg-[#070d22] border-t border-slate-800/80 pt-16 pb-10 text-slate-300 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-gradient-to-r from-violet-600/10 to-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-[clamp(20px,6vw,110px)] relative z-10">
        {/* Contact Banner */}
        <div className="relative overflow-hidden bg-slate-900/60 border border-slate-800 rounded-3xl py-10 px-6 md:px-12 text-center mb-16 backdrop-blur-md shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold">
              Available For Opportunities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 mb-4 tracking-tight">
              Let&apos;s Build Something Intelligent Together
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-8">
              Open to remote full-stack engineering roles, AI agent integrations, internships, and freelance projects worldwide.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-sm py-3 px-6 rounded-xl shadow-glow-violet transition-all duration-300 hover:scale-105"
              >
                <FaEnvelope />
                <span>{profile.email}</span>
              </a>

              <a
                href={profile.phoneHref}
                className="inline-flex items-center gap-2 bg-slate-800/90 hover:bg-slate-750 text-white border border-slate-700 hover:border-cyan-400 font-semibold text-sm py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <FaPhone className="text-violet-400" />
                <span>{profile.phone}</span>
              </a>

              <a
                href={siteContent.profile.cvUrl}
                download={siteContent.profile.cvFileName}
                className="inline-flex items-center gap-2 bg-slate-800/90 hover:bg-slate-750 text-white border border-slate-700 hover:border-violet-400 font-semibold text-sm py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <FaFileArrowDown className="text-cyan-400" />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-6">
          {/* Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-violet-500/40 group-hover:border-cyan-400 transition-colors">
              <Image
                src={profile.image}
                alt="Ayesha Iqbal"
                fill
                sizes="44px"
                className="object-cover object-[50%_18%]"
              />
            </div>
            <div>
              <p className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                Ayesha Iqbal
              </p>
              <p className="text-xs text-slate-400 font-mono">
                Full-Stack AI Engineer
              </p>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-400">
            <Link href="/#about" className="hover:text-cyan-300 transition-colors">
              About
            </Link>
            <Link href="/projects" className="hover:text-cyan-300 transition-colors">
              Projects
            </Link>
            <Link href="/#skills" className="hover:text-cyan-300 transition-colors">
              Skills
            </Link>
            <Link href="/#certifications" className="hover:text-cyan-300 transition-colors">
              Certifications
            </Link>
            <Link href="/services" className="hover:text-cyan-300 transition-colors">
              Services
            </Link>
            <Link href="/contact" className="hover:text-cyan-300 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Social Profiles */}
          <div className="flex items-center gap-3">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
            >
              <FaGithub size={18} />
            </a>

            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-400 hover:bg-violet-500/10 transition-all duration-300"
            >
              <FaLinkedin size={18} />
            </a>

            <a
              href={`mailto:${profile.email}`}
              aria-label="Send Email"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
            >
              <FaEnvelope size={16} />
            </a>

            <a
              href={profile.phoneHref}
              aria-label={`Call ${profile.phone}`}
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-400 hover:bg-violet-500/10 transition-all duration-300"
            >
              <FaPhone size={15} />
            </a>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} Ayesha Iqbal. Engineered with Next.js, TypeScript &amp; Three.js.</p>
          <p className="font-mono text-slate-400">Pakistan • Remote Ready Worldwide</p>
        </div>
      </div>
    </footer>
  );
}