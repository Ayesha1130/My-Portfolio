import { Sparkles } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  index: number;
}

export default function ServiceCard({ title, description, index }: ServiceCardProps) {
  return (
    <div
      className="group relative p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/50 hover:bg-slate-850/80 transition-all duration-300 backdrop-blur-md hover:shadow-glow-violet hover:-translate-y-1.5 flex flex-col justify-between"
      data-aos="fade-up"
      data-aos-delay={index * 80}
      data-aos-duration="800"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800">
            0{index + 1}
          </span>
          <span className="w-8 h-8 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 text-xs group-hover:scale-110 transition-transform">
            <Sparkles size={14} />
          </span>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight mb-3">
          {title}
        </h3>

        <p className="text-sm text-slate-300/80 group-hover:text-slate-200 transition-colors leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-300 transition-colors">
        <span className="font-mono text-[11px] uppercase tracking-wider">Production Spec</span>
        <span className="text-violet-400 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );
}
