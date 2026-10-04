'use client';

import React from 'react';
import Image from 'next/image';

interface MovieCard {
  id: number | string;
  title: string;
  badge: string;
  src: string;
  price?: string;
}

const defaultCards: MovieCard[] = [
  {
    id: 1,
    title: 'Final Fantasy VII',
    badge: 'Free',
    src: '/images/Poster2.jpg',
    price: 'Free',
  },
  {
    id: 2,
    title: 'Space Jam: A New Legacy',
    badge: 'Free',
    src: '/images/Poster3.jpg',
    price: 'Free',
  },
  {
    id: 3,
    title: 'Morgan Garfield',
    badge: 'Free',
    src: '/images/Poster4.jpg',
    price: 'Free',
  },
  {
    id: 4,
    title: 'The Walking Dead',
    badge: 'Free',
    src: '/images/Poster5.jpg',
    price: 'Free',
  },
  {
    id: 5,
    title: 'The Firebreak',
    badge: '$1.99',
    src: '/images/Poster6.jpg',
    price: '$1.99',
  },
  {
    id: 6,
    title: 'Westland Survival',
    badge: 'Free',
    src: '/images/Poster9.jpg',
    price: 'Free',
  },
];

export default function MovieCardGrid({ items = defaultCards }: { items?: MovieCard[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 py-1">
      {items.map((card) => (
        <article
          key={card.id}
          className="group relative aspect-[2/3] overflow-hidden rounded-[10px] bg-slate-900 shadow-md ring-1 ring-white/10 transition-all duration-300 hover:shadow-xl hover:ring-white/30 cursor-pointer"
        >
          <Image
            src={card.src}
            alt={card.title}
            fill
            priority={card.id === 1}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 flex flex-col justify-end">
            <p className="line-clamp-1 text-[11px] sm:text-xs font-semibold text-white drop-shadow">
              {card.title}
            </p>
            <div className="mt-1 flex items-center justify-between">
              <span className="inline-flex rounded-[3px] bg-emerald-500/90 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-950 shadow-sm">
                {card.badge}
              </span>
              {card.price && card.price !== card.badge && (
                <span className="text-[10px] text-white/70">{card.price}</span>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
