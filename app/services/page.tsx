"use client";
import React from "react";
import Link from "next/link";
import { FaArrowRight, FaArrowLeft, FaCheck } from "react-icons/fa6";
import { Sparkles } from "lucide-react";
import ServiceCard from "../components/serviceCard";
import siteContent from "@/data/site-content.json";

const { services, whatICanBuild } = siteContent;

export default function ServicesPage() {
  return (
    <main className="bg-[#0a1128] min-h-screen text-slate-100 pt-36 pb-28 px-6 md:px-[clamp(20px,6vw,110px)] relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-violet-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-colors mb-8"
        >
          <FaArrowLeft /> <span>Back to Home</span>
        </Link>

        {/* Page header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            <span>Engineering Capabilities</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
            Services &amp; Architecture.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            What I engineer for forward-thinking clients and tech teams — from multi-agent systems and MCP servers to high-performance e-commerce and SaaS platforms.
          </p>
        </div>

        {/* Services grid */}
        <section className="mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* What I can build for you section */}
        {whatICanBuild && whatICanBuild.length > 0 && (
          <section className="mb-24 pt-16 border-t border-slate-800/80">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Turnkey Solutions &amp; Deliverables
              </h2>
              <p className="mt-2 text-slate-400 text-sm sm:text-base">
                Tested architectural patterns ready for rapid deployment in your stack.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatICanBuild.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-md"
                >
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2">
                    <FaCheck /> <span>Delivered In Production</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-violet-950/40 via-slate-900/80 to-cyan-950/40 border border-violet-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Ready to engineer your next product?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              Let&apos;s discuss architecture, scope, and technical milestones for your team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-glow-violet transition-all duration-300 hover:scale-105"
            >
              <span>Get In Touch</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
