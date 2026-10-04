'use client';

import React from 'react';
import { HeartIcon, StarIcon, EyeIcon } from '@heroicons/react/24/solid';

const moviesRow1 = [
  {
    id: "r1-1",
    title: "Deadpool 2",
    year: "2018",
    rating: "8.1",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80",
  },
  {
    id: "r1-2",
    title: "October",
    year: "2018",
    rating: "8.0",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
  },
  {
    id: "r1-3",
    title: "The Meg",
    year: "2018",
    rating: "6.4",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80",
  }
];

const moviesRow2 = [
  {
    id: "r2-1",
    title: "The Meg",
    year: "2018",
    rating: "6.4",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80",
  },
  {
    id: "r2-2",
    title: "October",
    year: "2018",
    rating: "8.0",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
  },
  {
    id: "r2-3",
    title: "Deadpool 2",
    year: "2018",
    rating: "8.1",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80",
  }
];

export default function ShortNoteCard() {
  
  //   Movie Card Component 
  const MovieCard = ({ movie, isInverted = false }) => (
    <div className={`flex flex-col gap-3 group cursor-pointer ${isInverted ? 'rotate-180' : ''}`}>
      
      {/* 1. Movie Poster Image */}
      <div className="relative aspect-[2/2.8] w-full rounded-[12px] overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-lg transition-transform duration-300 group-hover:scale-[1.02] group-hover:border-zinc-700">
        <img 
          src={movie.image} 
          alt={movie.title}
          className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* 2. Title & Metadata Row */}
      <div className="flex flex-col gap-1 px-0.5">
        <h4 className="text-sm md:text-base font-bold tracking-wide text-zinc-100 truncate group-hover:text-white transition-colors">
          {movie.title}
        </h4>
        
        <div className="flex items-center justify-between text-xs text-zinc-500 font-semibold mt-0.5">
          <span>{movie.year}</span>
          
          <div className="flex items-center gap-3">
            {/* Heart Icon */}
            <button type="button" className="hover:text-red-500 transition-colors">
              <HeartIcon className="w-3.5 h-3.5 text-zinc-800 hover:text-red-500 fill-current" />
            </button>
            
            {/* View/Eye Icon */}
            <button type="button" className="hover:text-blue-400 transition-colors">
              <EyeIcon className="w-3.5 h-3.5 text-red-600/90 fill-current" />
            </button>
            
            {/* Rating */}
            <div className="flex items-center gap-0.5 text-zinc-400">
              <StarIcon className="w-3.5 h-3.5 text-amber-500 fill-current" />
              <span className="text-zinc-200 font-bold">{movie.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Orange Download Button */}
      <button
        type="button"
        className="w-full bg-[#df8e1d] hover:bg-[#c67a15] text-black font-extrabold text-xs md:text-sm tracking-wider py-3 rounded-[8px] transition-all active:scale-[0.98] shadow-md mt-1"
      >
        Download
      </button>

    </div>
  );

  return (
    <section className="w-full min-h-screen bg-black text-white py-16 px-6 md:px-12 flex flex-col justify-center items-center font-sans select-none">
      <div className="w-full max-w-6xl flex flex-col gap-16">
        
        {/* 🟢 ROW 1: NORMAL VIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {moviesRow1.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isInverted={false} />
          ))}
        </div>

        {/* 🔴 ROW 2: INVERTED MIRROR VIEW  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {moviesRow2.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isInverted={false} />
          ))}
        </div>

      </div>
    </section>
  );
}