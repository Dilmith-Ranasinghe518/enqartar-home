'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronLeft, MoreHorizontal, Search } from 'lucide-react';

interface GarfieldBannerProps {
  title?: string;
  subtitle?: string;
  actors?: string;
  badge?: string;
}

export default function GarfieldBanner({
  title = 'GARFIELD',
  subtitle = 'EINE EXTRA PORTION ABENTEUER',
  actors = 'HAPE KERKELING   ANKE ENGELKE',
  badge = 'AB 9.5. NUR IM KINO',
}: GarfieldBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-[16px] bg-gradient-to-r from-[#d94a00] via-[#ef6400] to-[#f6941b] text-white shadow-xl">
      {/* Top navigation controls */}
      <div className="absolute top-3 left-3 z-20">
        <button
          type="button"
          aria-label="Previous slide"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-black/25 text-white/90 hover:bg-black/40 hover:text-white transition backdrop-blur-sm"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      <div className="absolute top-3 right-3 z-20">
        <button
          type="button"
          aria-label="Options"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-black/25 text-white/90 hover:bg-black/40 hover:text-white transition backdrop-blur-sm"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between min-h-[200px] sm:min-h-[220px] px-6 py-6 sm:px-10">
        {/* Left text column */}
        <div className="z-10 flex flex-col items-center md:items-start text-center md:text-left pt-6 md:pt-0 max-w-[480px]">
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-white/90 uppercase">
            Mit den Stimmen von
          </p>
          <p className="text-[11px] sm:text-xs font-bold tracking-wide text-white uppercase mt-0.5">
            {actors}
          </p>

          <h2 className="mt-1 text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white drop-shadow-md">
            {title}
          </h2>

          <p className="mt-1 text-xs sm:text-sm font-bold tracking-wider text-white uppercase drop-shadow">
            {subtitle}
          </p>

          <div className="mt-3 inline-flex items-center rounded-full bg-[#df2323] px-4 py-1 text-[11px] sm:text-xs font-extrabold tracking-wider uppercase text-white shadow-md">
            {badge}
          </div>
        </div>

        {/* Right image with Garfield and Odie */}
        <div className="relative w-full md:w-[320px] lg:w-[380px] h-[160px] sm:h-[200px] flex items-center justify-center md:justify-end mt-4 md:mt-0">
          <div className="relative h-full w-full">
            <Image
              src="/images/login-hero.jpeg"
              alt="Garfield"
              fill
              className="object-contain object-center md:object-right"
            />
          </div>
        </div>
      </div>

      {/* Bottom right search circle button */}
      <div className="absolute bottom-3 right-3 z-20">
        <button
          type="button"
          aria-label="Visual Search"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition shadow-lg"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
