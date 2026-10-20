import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FaGithub, FaArrowUpRightFromSquare, FaArrowLeft, FaCheck } from "react-icons/fa6";
import { Sparkles } from "lucide-react";
import siteContent from "@/data/site-content.json";

const { featuredProjects } = siteContent;

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.id }));
}

function getProject(slug: string) {
  return featuredProjects.find((p) => p.id === slug) ?? null;
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project Not Found — Ayesha Iqbal" };
  return {
    title: `${project.name} — Case Study | Ayesha Iqbal`,
    description: project.tagline,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-[#0a1128] text-slate-100 pt-36 pb-28 px-6 md:px-[clamp(20px,6vw,110px)] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-24 left-1/4 w-[500px] h-[500px] bg-violet-600/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-24 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-colors mb-10"
        >
          <FaArrowLeft size={11} /> All Projects
        </Link>

        {/* Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-widest mb-4">
          <Sparkles className="text-cyan-400" size={14} />
          <span>Case Study</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
          {project.name}
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
          {project.positioning}
        </p>

        {/* Live Demo & Code CTAs */}
        <div className="flex flex-wrap gap-4 mb-12">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white px-7 py-3 rounded-xl font-bold text-sm shadow-glow-violet transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>View Live Project</span>
              <FaArrowUpRightFromSquare size={13} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-slate-900 border border-slate-700 hover:border-violet-400 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
            >
              <FaGithub size={16} /> <span>View Code on GitHub</span>
            </a>
          )}
        </div>

        {/* Hero visual banner */}
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center mb-14 shadow-2xl">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.name} screenshot`}
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-violet-900/30 via-slate-950 to-cyan-900/20 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00f5ff_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <span className="w-16 h-16 rounded-2xl bg-slate-900/90 border border-violet-500/40 flex items-center justify-center text-cyan-400 text-3xl shadow-glow-cyan">
                  <Sparkles size={28} />
                </span>
                <span className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {project.name.split("—")[0].trim()}
                </span>
                <p className="text-xs font-mono text-cyan-300 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 mt-1">
                  {project.stack.join(" • ")}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-2 mb-14">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono font-medium text-slate-300 bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-1.5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Problem */}
        {project.problem && (
          <Section title="The Problem &amp; Opportunity">
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">{project.problem}</p>
          </Section>
        )}

        {/* Solution */}
        {project.solution && (
          <Section title="The Solution &amp; Engineering Approach">
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">{project.solution}</p>
          </Section>
        )}

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <Section title="Key System Features">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {project.features.map((f) => (
                <li key={f} className="text-slate-300 flex items-start gap-2.5 leading-relaxed text-sm">
                  <FaCheck className="text-cyan-400 text-xs mt-1 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Architecture */}
        {project.architecture && project.architecture.length > 0 && (
          <Section title="System Architecture &amp; Data Flow">
            <ul className="space-y-3">
              {project.architecture.map((a) => (
                <li key={a} className="text-slate-300 flex items-start gap-3 leading-relaxed text-sm bg-slate-900/50 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-cyan-400 font-mono text-xs mt-0.5">›</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Technical decisions */}
        {project.decisions && project.decisions.length > 0 && (
          <Section title="Key Engineering Decisions &amp; Trade-Offs">
            <ul className="space-y-3">
              {project.decisions.map((d) => (
                <li key={d} className="text-slate-300 leading-relaxed text-sm flex items-start gap-3 bg-slate-900/50 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-violet-400 font-mono text-xs mt-0.5">›</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Results */}
        {project.results && (
          <Section title="Engineering Outcome">
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">{project.results}</p>
          </Section>
        )}

        {/* Footer CTAs */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 flex flex-wrap items-center gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 text-white px-7 py-3 rounded-xl font-bold text-sm shadow-glow-violet transition-all duration-300 hover:scale-105"
            >
              <span>View Live Demo</span> <FaArrowUpRightFromSquare size={13} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
            >
              <FaGithub /> <span>View Code</span>
            </a>
          )}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-cyan-400 px-3 py-3 font-semibold text-sm hover:underline"
          >
            Let&apos;s Work Together →
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-14 p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
      <h2 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-cyan-400 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}
