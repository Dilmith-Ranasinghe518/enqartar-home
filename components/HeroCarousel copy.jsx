'use client';

import React, { useId } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';

const defaultItems = [
  {
    id: 1,
    src: '/images/Poster12.jpg',
    title: 'Clash of the Titans',
    badge: 'On Sale',
    price: 'Starts at $3.59',
  },
  {
    id: 2,
    src: '/images/Poster8.jpg',
    title: 'Instant Family',
    badge: 'Buy on sale or stream',
    price: 'Family movie night',
  },
  {
    id: 3,
    src: '/images/Poster7.jpg',
    title: 'Peppermint',
    badge: 'On Sale',
    price: 'Starts at $3.99',
  },
  {
    id: 4,
    src: '/images/Poster10.jpg',
    title: 'Timecop',
    badge: 'On Sale',
    price: 'Starts at $3.99',
  },
  {
    id: 5,
    src: '/images/Poster14.jpg',
    title: 'Blue Beetle',
    badge: 'Member deal',
    price: 'Starts at $4.49',
  },
];

function HeroSlideCard({ item }) {
  return (
    <article className="lg:mt-10 group relative h-full min-h-[312px] w-full overflow-hidden rounded-[10px] bg-black/15 shadow-[0_20px_40px_rgba(0,0,0,0.24)] ring-1 ring-white/10">
      <img
        src={item.src}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 rounded-[18px] bg-[linear-gradient(180deg,rgba(8,8,12,0)_0%,rgba(8,8,12,0.06)_42%,rgba(11,10,18,0.36)_62%,rgba(10,10,16,0.72)_80%,rgba(8,8,12,0.96)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[32%] rounded-b-[18px] bg-[linear-gradient(180deg,rgba(54,38,83,0)_0%,rgba(54,38,83,0.1)_30%,rgba(18,14,28,0.4)_68%,rgba(8,8,12,0.72)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 flex min-h-[122px] flex-col justify-end rounded-b-[18px] px-3 pb-12 pt-8">
        <p className="line-clamp-2 min-h-[32px] text-sm font-medium leading-4 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.72)]">
          {item.title}
        </p>
        <div className="mt-1 flex flex-col items-end gap-1.5">
          <div className="inline-flex max-w-full truncate rounded-[3px] bg-[#d9ff3f] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-slate-950 shadow-[0_8px_18px_rgba(217,255,63,0.28)]">
            {item.badge}
          </div>
          <p className="text-right text-xs text-white/82 drop-shadow-[0_2px_6px_rgba(0,0,0,0.72)]">{item.price}</p>
        </div>
      </div>
    </article>
  );
}

export default function HeroCarousel({ items = defaultItems }) {
  const rawId = useId();
  const sliderId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const prevClass = `weekly-specials-prev-${sliderId}`;
  const nextClass = `weekly-specials-next-${sliderId}`;

  return (
    /* Mobile වලදී overflow-visible දමා Cards පහළට පැනීමට ඉඩ සලසා ඇත (Desktop එකේදී overflow-hidden ලෙසම පවතී) */
    <section className="relative overflow-visible lg:overflow-hidden rounded-[10px] bg-[radial-gradient(circle_at_18%_28%,rgba(87,94,214,0.18),transparent_24%),radial-gradient(circle_at_76%_18%,rgba(108,52,193,0.28),transparent_28%),linear-gradient(120deg,#06070b_0%,#0d101b_36%,#23124a_100%)] px-6 pt-8 pb-32 lg:pb-8 text-white shadow-[0_30px_60px_rgba(15,23,42,0.28)] sm:px-7 sm:pt-9">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_50%,rgba(255,255,255,0.05),transparent_22%)]" />

      <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(220px,0.82fr)_minmax(0,1.28fr)] lg:items-center">
        <div className="space-y-4 pr-2">
          <div className="space-y-2">
            <h1 className="text-[1.9rem] font-medium leading-tight sm:text-[2.1rem]">
              Weekly specials: $4.99 movies
            </h1>
            <p className="max-w-[28ch] text-sm leading-6 text-white/70">
              New top deals refreshed every Tuesday
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center rounded-[4px] bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/16"
          >
            See all
          </button>
        </div>

        {/* Mobile එකේදී absolute positioning භාවිතයෙන් cards පහළට පනින ලෙස සකසා ඇත */}
        <div className="relative pt-3 lg:py-4 lg:pl-3 lg:static">
          <div className="absolute right-3 -top-12 z-20 flex items-center gap-2 sm:flex lg:top-2">
            <button
              type="button"
              className={`${prevClass} flex h-8 w-8 items-center justify-center rounded-full bg-white/25 text-white transition hover:bg-white/35`}
              aria-label="Previous specials"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className={`${nextClass} flex h-8 w-8 items-center justify-center rounded-full bg-white/25 text-white transition hover:bg-white/35`}
              aria-label="Next specials"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="absolute left-0 right-0 top-6 z-20 lg:relative lg:top-0">
            <Swiper
              className="weekly-specials-swiper !overflow-visible lg:!overflow-hidden"
              modules={[Navigation]}
              navigation={{
                nextEl: `.${nextClass}`,
                prevEl: `.${prevClass}`,
              }}
              loop
              spaceBetween={14}
              slidesPerView={1.4}
              breakpoints={{
                640: { slidesPerView: 2.25, spaceBetween: 14 },
                900: { slidesPerView: 3.2, spaceBetween: 16 },
                1180: { slidesPerView: 4, spaceBetween: 16 },
              }}
            >
              {items.map((item) => (
                <SwiperSlide key={item.id} className="!h-auto">
                  <HeroSlideCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .weekly-specials-swiper .swiper-slide {
          display: flex;
          height: auto;
        }
      `}</style>
    </section>
  );
}

export { defaultItems as HeroCarousel };