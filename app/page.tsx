import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaFileArrowDown, FaArrowUpRightFromSquare, FaEnvelope } from "react-icons/fa6";
import { Sparkles } from "lucide-react";
import HeroSection from "./components/heroSection";
import TechStack from "./components/autoSroll";
import InteractiveSkills3D from "./components/InteractiveSkills3D";
import CertificationsSection from "./components/CertificationsSection";
import EducationSection from "./components/EducationSection";
import Project3DCard from "./components/Project3DCard";
import ServiceCard from "./components/serviceCard";
import siteContent from "@/data/site-content.json";

const { about, services, featuredProjects, profile } = siteContent;

export default function Home() {
  return (
    <div className="bg-[#0a1128] min-h-screen text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* 1. Hero Section with 3D Scene and Futuristic Portrait */}
      <HeroSection />

      {/* 2. Tech Stack Marquee Ticker */}
      <TechStack />

      {/* 3. About Section */}
      <section id="about" className="py-28 px-6 md:px-[clamp(20px,6vw,110px)] relative overflow-hidden bg-gradient-to-b from-[#0a1128] via-[#0d1531] to-[#0a1128]">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-violet-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row gap-14 items-center">
          {/* Portrait with Holographic Glow */}
          <div className="relative flex-shrink-0 group">
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
            <div className="relative w-48 h-56 sm:w-60 sm:h-72 rounded-2xl overflow-hidden border-2 border-violet-500/40 bg-slate-900 shadow-2xl">
              <Image
                src={profile.image}
                alt="Ayesha Iqbal"
                fill
                sizes="(min-width: 640px) 240px, 192px"
                className="object-cover object-[50%_18%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            </div>
            <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-400/40 text-[11px] font-mono font-bold text-cyan-300 shadow-lg">
              Remote Ready
            </div>
          </div>

          {/* About Copy */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-widest mb-4">
              <Sparkles className="text-cyan-400" size={14} />
              <span>Full-Stack AI Engineer</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              Engineering Intelligent Systems That{" "}
              <span className="text-gradient-cyan">Deliver Impact</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white px-7 py-3 rounded-xl font-bold text-sm shadow-glow-violet transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Get In Touch</span>
                <FaArrowRight className="text-xs" />
              </Link>

              <a
                href={siteContent.profile.cvUrl}
                download={siteContent.profile.cvFileName}
                className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 hover:border-violet-400 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
              >
                <FaFileArrowDown className="text-cyan-400" />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Projects Showcase (all live projects) */}
      <section id="projects" className="py-28 px-6 md:px-[clamp(20px,6vw,110px)] relative overflow-hidden bg-[#0a1128]">
        {/* Ambient glow */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
                <Sparkles size={14} />
                <span>Shipped Work</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Featured Live Projects
              </h2>
              <p className="mt-3 text-slate-400 text-base sm:text-lg max-w-xl">
                Production-grade applications spanning autonomous AI agents, medical evidence platforms, and full-stack commerce.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>View all projects &amp; case studies</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </div>

          {/* 3D Grid of Featured Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <Project3DCard
                key={project.id}
                project={project}
                index={index}
                featured={index < 4}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Interactive 3D Skills & Capabilities */}
      <InteractiveSkills3D />

      {/* 5b. Education */}
      <EducationSection />

      {/* 6. Verified Professional Certifications */}
      <CertificationsSection />

      {/* 7. Services Section */}
      <section id="services" className="py-28 px-6 md:px-[clamp(20px,6vw,110px)] bg-gradient-to-b from-[#0a1128] via-[#0e1633] to-[#0a1128] relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-widest mb-4">
              <Sparkles className="text-cyan-400" size={14} />
              <span>Full Lifecycle Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Services &amp; Architecture
            </h2>
            <p className="mt-3 text-slate-400 text-base sm:text-lg">
              End-to-end technical delivery from autonomous agent design to scalable full-stack web platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Explore full service specifications</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Cinematic Contact CTA */}
      <section className="py-28 px-6 md:px-[clamp(20px,6vw,110px)] bg-gradient-to-t from-[#060b20] via-[#0b122c] to-[#0a1128] text-center relative overflow-hidden">
        {/* Glow sphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-violet-600/15 via-cyan-500/15 to-violet-600/15 blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 font-bold">
            Start A Conversation
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mt-4 mb-6 leading-tight">
            Have a product or AI challenge? <br />
            <span className="text-gradient-violet-cyan">Let&apos;s build it right.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-10 max-w-xl mx-auto">
            Whether you need autonomous AI agents, full-stack Next.js web applications, or modern payment workflows, I&apos;m ready to collaborate.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-glow-violet transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <FaEnvelope />
              <span>Contact Ayesha</span>
            </Link>

            <a
              href={siteContent.profile.cvUrl}
              download={siteContent.profile.cvFileName}
              className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 hover:border-violet-400 font-bold text-sm px-7 py-4 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <FaFileArrowDown className="text-cyan-400" />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
