'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const defaultPromoItems = [
  {
    id: 1,
    src: '/images/Poster10.jpg',
    title: 'Timecop',
    badge: 'On Sale',
    price: 'Starts at $3.99',
  },
  {
    id: 2,
    src: '/images/Poster11.jpg',
    title: 'Blue Beetle',
    badge: 'Member Deal',
    price: 'Starts at $4.49',
  },
  {
    id: 3,
    src: '/images/Poster3.jpg',
    title: 'Clash of the Titans',
    badge: 'On Sale',
    price: 'Starts at $3.59',
  },
  {
    id: 4,
    src: '/images/Poster4.jpg',
    title: 'Instant Family',
    badge: 'Buy on sale',
    price: 'Family movie night',
  },
  {
    id: 5,
    src: '/images/Poster5.jpg',
    title: 'Peppermint',
    badge: 'On Sale',
    price: 'Starts at $3.99',
  },
  {
    id: 6,
    src: '/images/Poster12.jpg',
    title: 'Kung Fu Panda 4',
    badge: 'On Sale',
    price: 'Starts at $4.19',
  },
];

function PromoCard({ item, accent = 'amber' }) {
  const badgeClass =
    accent === 'cyan'
      ? 'bg-[#70f0ff] text-slate-950 shadow-[0_10px_18px_rgba(112,240,255,0.3)]'
      : 'bg-[#e8ff36] text-slate-950 shadow-[0_10px_18px_rgba(232,255,54,0.28)]';

  return (
    <article className="group relative min-h-[365px] overflow-hidden rounded-[10px] bg-slate-900 shadow-[0_16px_30px_rgba(15,23,42,0.18)] ring-1 ring-black/10">
      <Image
        src={item.src}
        alt={item.title}
        fill
        sizes="(min-width: 1024px) 16vw, (min-width: 640px) 50vw, 100vw"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,10,15,0)_0%,rgba(9,10,15,0.08)_46%,rgba(11,12,18,0.58)_76%,rgba(8,8,12,0.9)_100%)]" />
      <div className="absolute inset-x-2 bottom-2 rounded-[8px] bg-[linear-gradient(180deg,rgba(32,34,42,0.12),rgba(11,12,18,0.72))] px-2.5 pb-3 pt-2.5 backdrop-blur-[8px]">
        <p className="truncate text-[11px] font-medium text-white">{item.title}</p>
        <div className="mt-2 flex flex-col items-start gap-1">
          <span className={`inline-flex rounded-[4px] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] ${badgeClass}`}>
            {item.badge}
          </span>
          <span className="text-[10px] text-white/80">{item.price}</span>
        </div>
      </div>
    </article>
  );
}

export default function MainCarousel({
  title = 'Garfield',
  subtitle = 'Im Extraportion Popcorn',
  priceLine = 'Ab 9,5 nur im kino',
  accent = 'amber',
  items = defaultPromoItems,
  heroImage = '/images/Poster1.jpg',
}) {
  const panelClass =
    accent === 'cyan'
      ? 'bg-[linear-gradient(135deg,#2db5ff_0%,#58d5ff_42%,#96efff_100%)]'
      : 'bg-[linear-gradient(135deg,#ef7a19_0%,#f38f1b_38%,#f5bf45_100%)]';

  return (
    <section className="space-y-3">
      <div className={`relative min-h-[460px] overflow-hidden rounded-[12px] px-6 py-8 text-white shadow-[0_18px_36px_rgba(15,23,42,0.08)] ring-1 ring-black/5 sm:px-8 ${panelClass}`}>
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(97,42,5,0.84)_0%,rgba(167,83,8,0.6)_34%,rgba(239,122,25,0.24)_58%,rgba(245,191,69,0.16)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_38%,rgba(255,255,255,0.24),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.08))]" />

        <div className="relative z-10 flex min-h-[180px] max-w-[36rem] flex-col justify-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/75">
            Family favorites
          </p>
          <h2 className="mt-3 max-w-[11ch] text-[2.6rem] font-black uppercase leading-[0.92] tracking-normal sm:text-[3.1rem]">
            {title}
          </h2>
          <p className="mt-2 max-w-[26ch] text-sm font-semibold uppercase tracking-[0.14em] text-white/88">
            {subtitle}
          </p>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#fff4b8]">
            {priceLine}
          </p>
        </div>

        <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/15 text-white backdrop-blur-sm">
          <ChevronRight size={20} />
        </div>
      </div>

      <div className="pt-3 pb-3">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {items.map((item) => (
            <PromoCard key={item.id} item={item} accent={accent} />
          ))}
        </div>
      </div>
    </section>
  );
}
