'use client';

import React from 'react';
import { HeartIcon, StarIcon } from '@heroicons/react/24/solid';

const moviesData = [
  {
    id: 1,
    title: "Deadpool 2",
    year: "2018",
    rating: "8.1",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80", 
  },
  {
    id: 2,
    title: "The Meg",
    year: "2018",
    rating: "6.4",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80",
  },
  {
    id: 3,
    title: "October",
    year: "2018",
    rating: "8.0",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
  },
  {
    id: 4,
    title: "Incredibles 2",
    year: "2018",
    rating: "7.7",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80",
  },
  {
    id: 5,
    title: "The 15:17 to Paris",
    year: "2018",
    rating: "5.0",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80",
  }
];

export default function ShortnoteSection() {
  return (
    <section className="w-full min-h-[80vh] md:min-h-[93vh] bg-[#0a0a0c] text-white rounded-[18px] overflow-hidden shadow-2xl font-sans select-none border border-zinc-900 flex flex-col justify-between">
      
      {/* 1. 🎴 UPPER HERO BANNER AREA (Padding වැඩි කර උස වැඩි කරන ලදී) */}
      <div
        className="relative w-full pt-28 pb-20 px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8 bg-cover bg-center flex-1"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), #0a0a0c), url('https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=1600&q=80')` 
        }}
      >
        {/* Call to Action Texts */}
        <div className="max-w-2xl z-10 px-10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
            We're here to help!
          </h2>
          <p className="text-sm md:text-lg text-zinc-200 font-medium leading-relaxed tracking-wide opacity-90">
            Picking the right plan is easier with someone on the other end. Tell us what you need and we'll help you find the right fit. Got other questions?
          </p>
        </div>

        {/* Action Button */}
        <div className="z-10 flex-shrink-0 md:mb-2 px-7">
          <button
            type="button"
            className="bg-[#d97706] hover:bg-[#b45309] text-black font-extrabold text-xs md:text-xl tracking-widest px-12 py-3.5 rounded-[8px] transition-all active:scale-95 shadow-xl"
          >
            Download
          </button>
        </div>
      </div>

      {/* 2. 🎬 LOWER MOVIE CARDS GRID SEGMENT (පහළ කොටසේ ද පෑඩිං සහ ඉඩ වැඩි කර ඇත) */}
      <div className="px-6 md:px-12 pb-16 pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
          
          {moviesData.map((movie) => (
            <div 
              key={movie.id} 
              className="flex flex-col gap-3 group cursor-pointer"
            >
              {/* Card Poster Cover */}
              <div className="relative aspect-[2/3] w-full rounded-[8px] overflow-hidden bg-zinc-900 border border-zinc-800/60 shadow-md transition-transform duration-300 group-hover:scale-[1.03] group-hover:border-zinc-700">
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Poster Meta Descriptions */}
              <div className="flex flex-col gap-1 px-0.5">
                <h4 className="text-sm font-bold tracking-wide text-zinc-100 truncate group-hover:text-white transition-colors">
                  {movie.title}
                </h4>
                
                {/* Footer details line inside card */}
                <div className="flex items-center justify-between text-xs text-zinc-500 font-semibold mt-0.5">
                  <span>{movie.year}</span>
                  
                  <div className="flex items-center gap-3.5">
                    {/* Heart Like Interactive Icon */}
                    <button type="button" className="hover:text-red-500 transition-colors">
                      <HeartIcon className="w-3.5 h-3.5 text-zinc-700 hover:text-red-500 fill-current" />
                    </button>
                    
                    {/* Rating display */}
                    <div className="flex items-center gap-1 text-zinc-400">
                      <StarIcon className="w-3 h-3 text-amber-500 fill-current" />
                      <span className="text-zinc-300 font-bold">{movie.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>

    </section>
  );
}