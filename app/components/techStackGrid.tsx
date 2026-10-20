"use client";
import React from "react";
import siteContent from "@/data/site-content.json";

const { techStack } = siteContent;

export default function TechStackGrid() {
  const categories = Object.entries(techStack);

  return (
    <section id="skills-grid" className="py-20 px-6 md:px-[clamp(20px,6vw,110px)] bg-[#0a1128]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map(([category, items], index) => (
            <div
              key={category}
              data-aos="fade-up"
              data-aos-delay={index * 80}
              data-aos-duration="800"
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-md"
            >
              <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-cyan-400 mb-4">
                {category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {(items as string[]).map((item) => (
                  <li
                    key={item}
                    className="text-xs font-medium text-slate-300 bg-slate-950/80 border border-slate-800 rounded-md px-2.5 py-1"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
