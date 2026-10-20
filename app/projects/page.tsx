"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaFilter } from "react-icons/fa6";
import { Sparkles } from "lucide-react";
import Project3DCard from "../components/Project3DCard";
import siteContent from "@/data/site-content.json";

const { featuredProjects } = siteContent;

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const filterCategories = ["All", "AI Agents & MCP", "Full-Stack & E-Commerce", "3D & Interactive"];

  const filteredProjects = featuredProjects.filter((p) => {
    if (filter === "All") return true;
    if (filter === "AI Agents & MCP") {
      return (
        p.stack.some((s) => s.toLowerCase().includes("agent") || s.toLowerCase().includes("openai") || s.toLowerCase().includes("pubmed")) ||
        p.id === "wireroom" ||
        p.id === "assay" ||
        p.id === "clinical-evidence" ||
        p.id === "smartdesk" ||
        p.id === "physical-ai"
      );
    }
    if (filter === "Full-Stack & E-Commerce") {
      return (
        p.id === "nexora" ||
        p.id === "marketplace-admin" ||
        p.id === "taskflow" ||
        p.stack.some((s) => s.toLowerCase().includes("stripe") || s.toLowerCase().includes("postgresql"))
      );
    }
    if (filter === "3D & Interactive") {
      return (
        p.id === "learnova" ||
        p.id === "assay" ||
        p.id === "wireroom" ||
        p.stack.some((s) => s.toLowerCase().includes("three") || s.toLowerCase().includes("3d"))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0a1128] text-slate-100 pt-36 pb-28 px-6 md:px-[clamp(20px,6vw,110px)] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-violet-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-colors mb-8"
        >
          <FaArrowLeft /> <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            <span>Portfolio Showcase</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
            Shipped Projects &amp; <br />
            <span className="text-gradient-violet-cyan">Intelligent Systems</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every project below is an end-to-end production build: engineered with clean architecture, verified live links, and real-world problem solving.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-slate-800 pb-6">
          <span className="text-xs text-slate-500 font-mono flex items-center gap-1.5 mr-2">
            <FaFilter className="text-cyan-400" /> Filter:
          </span>
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                filter === cat
                  ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-glow-violet scale-105"
                  : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Projects 3D Grid */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <Project3DCard
                key={project.id}
                project={project}
                index={index}
                featured={true}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
