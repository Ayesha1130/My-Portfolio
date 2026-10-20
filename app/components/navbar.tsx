"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { FaFileArrowDown } from "react-icons/fa6";
import siteContent from "@/data/site-content.json";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/#skills" },
    { label: "Certifications", href: "/#certifications" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-[clamp(20px,6vw,110px)] py-4 flex items-center justify-between ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-xl shadow-lg border-b border-slate-800/80"
          : "bg-transparent"
      }`}
    >
      {/* Brand Logo */}
      <Link href="/" className="group flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center text-white text-xs font-mono font-bold shadow-glow-cyan">
          AI
        </span>
        <div className="flex flex-col">
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
            Ayesha Iqbal
          </span>
          <span className="text-[10px] font-mono text-cyan-400 tracking-wider">
            Full-Stack AI Engineer
          </span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-7">
        {navLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-sm font-semibold text-slate-300 hover:text-cyan-300 transition-colors duration-200"
          >
            {label}
          </Link>
        ))}

        {/* Download CV CTA */}
        <a
          href={siteContent.profile.cvUrl}
          download={siteContent.profile.cvFileName}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white px-4 py-2.5 rounded-full shadow-glow-violet hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <FaFileArrowDown className="text-sm" />
          <span>Download CV</span>
        </a>

        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all duration-200"
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
        )}
      </nav>

      {/* Mobile Toggle */}
      <div className="lg:hidden flex items-center gap-3">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300"
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
        )}

        <button
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <nav className="absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 p-6 flex flex-col gap-4 lg:hidden shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-base font-semibold text-slate-200 hover:text-cyan-300 py-1"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a
            href={siteContent.profile.cvUrl}
            download={siteContent.profile.cvFileName}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold py-3 px-5 rounded-xl text-sm mt-2 shadow-glow-violet"
            onClick={() => setIsOpen(false)}
          >
            <FaFileArrowDown />
            <span>Download Updated CV</span>
          </a>
        </nav>
      )}
    </header>
  );
}