'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid'; // 👈 StarIcon එක සඳහා Heroicons පාවිච්චි කර ඇත

// බාහිරින් movieShelf එකක් නොදුන්නොත් පාවිච්චි වෙන්න default දත්ත කිහිපයක්
// const defaultMovies = [
//   { title: "Movie 1", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80", featured: true },
//   { title: "Movie 2", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80", featured: false },
//   { title: "Movie 3", image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&q=80", featured: false },
// ];

export default function AudioSection({ movieShelf }) {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const defaultMovies = React.useMemo(
    () => [
      { title: 'Poster 1', image: '/images/Poster1.jpg', featured: true },
      { title: 'Poster 3', image: '/images/Poster3.jpg', featured: false },
      { title: 'Poster 5', image: '/images/Poster5.jpg', featured: false },
      { title: 'Poster 7', image: '/images/Poster7.jpg', featured: false },
      { title: 'Poster 8', image: '/images/Poster8.jpg', featured: false },
      { title: 'Poster 9', image: '/images/Poster9.jpg', featured: false },
    ],
    []
  );
  const movies = movieShelf ?? defaultMovies;

  const handleScroll = (e) => {
    const container = e.currentTarget;
    const cardWidthWithGap = 122; // 110px width + 12px gap
    const index = Math.min(
      movies.length - 1,
      Math.max(0, Math.round(container.scrollLeft / cardWidthWithGap))
    );
    if (index !== activeMobileIndex) {
      setActiveMobileIndex(index);
    }
  };

  return (
    <section className="flex flex-col sm:block overflow-hidden rounded-[8px] border border-black/10 bg-white shadow-[0_18px_36px_rgba(15,23,42,0.08)] mr-0 sm:mr-5 mb-5">
      
      {/* Navigation / Header Row */}
      <div className="order-1 flex flex-wrap items-center gap-4 px-6 py-6 sm:px-15 sm:py-10">
        <div className="flex items-center gap-2 text-[#272a39]">
          <span className="inline-block h-2 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-[#7a72ea]" />
          <span className="text-[2rem] tracking-[-0.03em]">zuva</span>
        </div>

        <nav className="mx-auto hidden sm:flex items-center gap-5 text-[15px] font-semibold uppercase tracking-[0.32em] text-[#3b3f50] sm:gap-8 sm:text-[15px]">
          <a href="#">Home</a>
          <a href="#" className="text-[#7a72ea]">
            Movies
          </a>
          <a href="#">TV Shows</a>
          <a href="#">Favourite</a>
        </nav>

        <button
          type="button"
          aria-label="Search"
          className="ml-auto text-[#242738] transition hover:text-[#7a72ea]"
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current stroke-[2]">
            <circle cx="11" cy="11" r="6" />
            <path d="M20 20l-4.2-4.2" />
          </svg>
        </button>
      </div>

      {/* Horizontal Movie Slider */}
      <div
        onScroll={handleScroll}
        className="order-2 flex w-full min-w-0 items-center gap-3 overflow-x-auto px-4 pb-5 pt-2 sm:gap-5 sm:pb-6 sm:pt-1 sm:px-6 scroll-smooth"
      >
        {movies.map((movie, index) => {
          const isFirstInMobileView = index === activeMobileIndex;
          return (
            <article
              key={`${movie.title}-${index}`}
              className={`relative shrink-0 overflow-hidden rounded-[15px] bg-[#edf1f5] shadow-[0_24px_40px_rgba(15,23,42,0.16)] ring-1 ring-black/5 transition-all duration-300 ${
                isFirstInMobileView
                  ? 'h-[260px] w-[165px] min-w-[165px] sm:h-[400px] sm:w-[250px] sm:min-w-[250px]'
                  : 'h-[200px] w-[110px] min-w-[110px] sm:h-[400px] sm:w-[250px] sm:min-w-[250px]'
              }`}
            >
              <Image
                src={movie.image}
                alt={movie.title}
                fill
                sizes="(max-width: 640px) 220px, 250px"
                className="object-cover"
              />
            </article>
          );
        })}
      </div>

      {/* Spotlight / Footer Info Section */}
      <div className="order-3 px-4 pb-6 pt-2 sm:px-6 sm:pb-6 sm:pt-0">
        <div className="flex flex-col items-center text-center gap-6 rounded-[24px] bg-[#fbfbfd] px-5 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_24px_rgba(15,23,42,0.05)] sm:gap-4 sm:py-10 sm:flex-row sm:items-center sm:text-left sm:justify-between sm:px-7">
          <div className="max-w-[560px] flex flex-col items-center sm:block">
            <h2 className="text-[1.5rem] font-semibold text-[#2f3344] sm:text-[2rem] sm:tracking-[-0.04em]">
              Megamind
            </h2>
            <div className="mt-2 flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-4 w-4 ${star < 3 ? 'text-[#ffbf3f]' : 'text-[#e8ebf2]'}`}
                />
              ))}
            </div>
            <p className="mt-4 max-w-[520px] text-sm leading-6 text-[#767b8d] sm:mt-3">
              The supervillain Megamind finally defeats his nemesis, the superhero
              Metro Man. But without a hero, he loses all purpose and must find new
              meaning.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-4 self-center rounded-full px-1 py-1 text-lg font-medium text-[#303447] sm:self-center"
          >
            <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#7268e9] text-white shadow-[0_18px_28px_rgba(114,104,233,0.34)] sm:shrink">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-current">
                <path d="M8 5.5v13l10-6.5-10-6.5Z" />
              </svg>
            </span>
            <span>Play</span>
          </button>
        </div>
      </div>

    </section>
  );
}
