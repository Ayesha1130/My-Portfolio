"use client";
import React from "react";
import Image from "next/image";
import { FaArrowUpRightFromSquare, FaFolderOpen } from "react-icons/fa6";

interface CardProps {
  img: string;
  alt?: string;
  title: string;
  description: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ img, alt = "Project preview", title, description, link }) => {
  return (
    <div className="group relative flex flex-col justify-between p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_-5px_rgba(0,245,255,0.2)] w-full max-w-sm">
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-950 border border-slate-800 flex items-center justify-center">
        {img ? (
          <Image
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={img}
            alt={alt}
            fill
            unoptimized
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <FaFolderOpen size={32} />
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
          {title}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-5 line-clamp-2">
          {description}
        </p>
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-gradient-to-r hover:from-violet-600 hover:to-cyan-500 text-white border border-slate-700 hover:border-transparent transition-all duration-300"
      >
        <span>View Project</span>
        <FaArrowUpRightFromSquare size={11} />
      </a>
    </div>
  );
};

export default Card;