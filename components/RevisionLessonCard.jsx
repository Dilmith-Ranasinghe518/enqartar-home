'use client';

import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

const defaultItem = {
  badge: "HOT",
  title: "The Sales Program",
  rating: "4.6",
  reviews: "300+ student reviews",
  description: "You cannot succeed in business without knowing how to sell. In this program, the King of Sales, Jeffrey Gitomer, will teach you the ins and outs of sales...",
  instructorsText: "Taught by Best-Selling Author Jeffrey Gitomer.",
  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80", 
};

export default function RevisionLessonCard({ item = defaultItem }) {
  if (!item) return null;

  return (
    <article className="group relative w-full max-w-[620px] h-[820px] overflow-hidden rounded-[28px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] select-none bg-[#1f1f22] text-white font-sans">
      
      <Image
        src={item.image}
        alt={item.title}
        fill 
        sizes="(max-width: 620px) 100vw, 620px" 
        priority
        className="object-cover brightness-[0.85] transition duration-500 group-hover:scale-[1.02]"
      />

      {/* Gradient Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

      {/* Content Over the Image */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 text-center items-center">
        
        {/* Title */}
        <h3 className="text-[46px] font-bold tracking-tight text-white mb-2">
          The <span className="text-[#cbf33b]">Sales</span> Program
        </h3>

        {/* Rating Row */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-5 font-medium">
          <span className="text-white font-bold">{item.rating}</span>
          <span className="text-[#cbf33b] text-sm">★</span>
          <span className="text-neutral-700 px-0.5">|</span>
          <span className="text-neutral-400/90">{item.reviews}</span>
        </div>

        {/* Description */}
        <p className="text-[13px] text-neutral-400 font-normal leading-relaxed max-w-[340px] line-clamp-3 mb-3">
          {item.description}
        </p>

        {/* Instructor Subtext */}
        <p className="text-[12px] text-neutral-500 font-medium tracking-wide max-w-[320px] line-clamp-1 mb-8">
          {item.instructorsText}
        </p>

        {/* LEARN MORE Button */}
        <div className="px-2">
          <button
            type="button"
            className="px-20 py-4 flex items-center justify-center gap-2 rounded-full border border-neutral-700/80 bg-black/30 hover:bg-black/60 text-[15px] font-bold tracking-[0.15em] text-[#cbf33b] hover:text-white transition duration-300 backdrop-blur-md"
          >
            LEARN MORE
            <ArrowRightIcon className="h-3.5 w-3.5 stroke-[3.5] text-neutral-400" />
          </button>
        </div>

      </div>
    </article>
  );
}