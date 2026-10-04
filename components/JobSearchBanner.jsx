'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function JobSearchBanner() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="w-full mx-auto py-8 select-none">
      {/* Main Container Box */}
      <div className="relative w-full overflow-hidden rounded-[16px] bg-[#027947] px-6 py-10 md:px-12 md:py-12 shadow-lg">
        
        {/* Subtle background abstract pattern */}
        <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 w-full space-y-6">
          
          {/* Texts Segment */}
          <div className="space-y-2.5">
            <h2 className="text-[28px] md:text-[34px] font-bold text-white tracking-tight leading-tight">
              Are you looking for a dream job?
            </h2>
            <p className="text-[16px] md:text-[17px] text-emerald-100/90 font-medium max-w-[750px] leading-relaxed">
              Derrida is a place where you can find your dream job in various skills, more than 10,000 jobs are available here
            </p>
          </div>

          {/* 🟢 Search Form Box - Full Width එකට සකසා ඇත */}
          <form 
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-stretch gap-3.5 w-full pt-2"
          >
            {/* Input Wrapper - ඉතිරි වන සම්පූර්ණ ඉඩම ලබා ගනී */}
            <div className="relative flex-grow">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200/80">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your dream job here"
                className="w-full bg-[#1b8658] border border-transparent rounded-xl py-3.5 pl-11 pr-4 text-[14px] font-medium text-white placeholder-emerald-200/60 focus:outline-none focus:bg-[#209261] focus:border-emerald-300/30 transition-all"
              />
            </div>

            {/* 🟢 Action Button - Desktop වලදීත් කැපී පෙනෙන පළලක් (sm:min-w-[160px]) ලබා දී ඇත */}
            <button
              type="submit"
              className="bg-white hover:bg-emerald-50 text-[#027947] font-bold px-7 py-3.5 rounded-xl text-[14px] shadow-md transition-all active:scale-[0.98] whitespace-nowrap sm:min-w-[160px] flex items-center justify-center"
            >
              Search Job
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}