"use client";
import React from "react";
import Image from "next/image";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

interface Props {
  title: string;
  description: string;
  img: string;
  link: string;
}

export default function ProjectCard({ prop }: { prop: Props }) {
  return (
    <div
      className="project-card group relative p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_-5px_rgba(0,245,255,0.2)]"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <a href={prop.link} target="_blank" rel="noopener noreferrer" className="block">
        <div className="aspect-[16/10] overflow-hidden rounded-xl bg-slate-950 border border-slate-800 relative">
          <Image
            src={prop.img}
            alt={prop.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-105"
          />
        </div>
        <div className="mt-4 flex items-start justify-between gap-2">
          <div>
            <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              {prop.title}
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
              {prop.description}
            </p>
          </div>
          <span className="p-2 rounded-lg bg-slate-800 text-slate-300 group-hover:text-cyan-400 group-hover:bg-slate-700 transition-colors flex-shrink-0 mt-1">
            <FaArrowUpRightFromSquare size={12} />
          </span>
        </div>
      </a>
    </div>
  );
}
