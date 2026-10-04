'use client';

import React from 'react';
import { HandThumbUpIcon, PlayIcon, UserIcon } from '@heroicons/react/24/outline';

export default function CourseCard({
  item,
  theme = 'light',
}) {
  if (!item) return null;

  const isDark = theme === 'dark';

  return (
    <article
      className={`overflow-hidden rounded-[14px] border shadow-[0_16px_34px_rgba(15,23,42,0.08)] transition-transform duration-200 hover:-translate-y-0.5 ${
        isDark ? 'border-white/10 bg-slate-900 text-slate-100' : 'border-black/10 bg-white text-slate-900'
      }`}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-200">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-6 top-6 inline-flex rounded-[4px] bg-[#f5df3f] px-2 py-1 text-[15px] font-extrabold uppercase tracking-[0.14em] text-slate-950">
          {item.badge}
        </span>
        <button
          type="button"
          aria-label={`Play ${item.title}`}
          className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#2f2a3a]/88 text-white shadow-[0_12px_24px_rgba(15,23,42,0.24)] backdrop-blur-sm"
        >
          <PlayIcon className="ml-1 h-6 w-6" />
        </button>
      </div>

      <div className="space-y-5 px-7 pb-7 pt-7">
        <div className="space-y-3">
          <h3 className="line-clamp-2 text-[25px] font-semibold leading-[2] md:text-[25px]">
            {item.title}
          </h3>
          <p className={`text-[20px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {item.subtitle}
          </p>
          <p className={`line-clamp-2 text-[20px] leading-7 ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
            {item.description}
          </p>
        </div>

        <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
          <span className="inline-flex items-center gap-1.5">
            <UserIcon className="h-4.5 w-4.5" />
            {item.learners}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <HandThumbUpIcon className="h-4.5 w-4.5" />
            {item.rating}
          </span>
        </div>

        <span className="inline-flex rounded-[6px] border border-[#ffcfdb] bg-[#fff2f7] px-2 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#df6d98]">
          {item.pill}
        </span>

        <button
          type="button"
          className="inline-flex w-full items-center justify-center rounded-[6px] bg-[#2ba9bb] px-4 py-3.5 text-[25px] font-semibold text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.12)] transition hover:bg-[#2398a8]"
        >
          Get started now!
        </button>
      </div>
    </article>
  );
}
