'use client';

import React, { useCallback, useEffect, useId, useRef } from 'react';
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

function WeeklySpecialsCard({ item }) {
  return (
    <article className="mt-4 sm:mt-10 group relative h-full w-full aspect-[2/3] overflow-hidden rounded-[10px] bg-black/15 shadow-[0_20px_40px_rgba(0,0,0,0.24)] ring-1 ring-white/10">
      <img
        src={item.src}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 rounded-[10px] bg-[linear-gradient(180deg,rgba(8,8,12,0)_0%,rgba(8,8,12,0.06)_42%,rgba(11,10,18,0.36)_62%,rgba(10,10,16,0.72)_80%,rgba(8,8,12,0.96)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[40%] rounded-b-[10px] bg-[linear-gradient(180deg,rgba(54,38,83,0)_0%,rgba(54,38,83,0.1)_30%,rgba(18,14,28,0.4)_68%,rgba(8,8,12,0.72)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end rounded-b-[10px] p-2 pb-4 sm:px-3 sm:pb-12 sm:pt-8">
        <p className="line-clamp-2 text-[10px] sm:text-sm font-medium leading-snug text-white drop-shadow-md">
          {item.title}
        </p>
        <div className="mt-1 flex flex-col items-start sm:items-end gap-1 sm:gap-1.5">
          <div className="inline-flex max-w-full truncate rounded-[3px] bg-[#d9ff3f] px-1 sm:px-2 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-950 shadow-sm">
            {item.badge}
          </div>
          <p className="text-left sm:text-right text-[8px] sm:text-xs text-white/80 drop-shadow-md">{item.price}</p>
        </div>
      </div>
    </article>
  );
}

export default function WeeklySpecialsCarousel({ items = defaultItems }) {
  const rawId = useId();
  const sliderId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const prevClass = `weekly-specials-prev-${sliderId}`;
  const nextClass = `weekly-specials-next-${sliderId}`;

  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const lastWidthRef = useRef(0);

  /* Container එකේ පළල sidebar දෙකෙන් වෙනස් වෙනවා, ඒත් Swiper එකේම observer එකෙන්
     breakpoint එක නැවත ගණන් හදන්නේ නෑ. ඒ නිසා size එක වෙනස් වන හැම වෙලාවකම measure කරනවා. */
  const syncSwiper = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.destroyed || !swiper.el || swiper.el.offsetWidth === 0) return;
    swiper.setBreakpoint();
    swiper.update();
  }, []);

  useEffect(() => {
    syncSwiper();

    const frame = requestAnimationFrame(syncSwiper);
    const node = containerRef.current;

    if (!node || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', syncSwiper);
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('resize', syncSwiper);
      };
    }

    const observer = new ResizeObserver((entries) => {
      const width = Math.round(entries[0].contentRect.width);
      if (width === 0 || width === lastWidthRef.current) return;
      lastWidthRef.current = width;
      syncSwiper();
    });
    observer.observe(node);
    window.addEventListener('resize', syncSwiper);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', syncSwiper);
    };
  }, [syncSwiper]);

  return (
    <section className="relative rounded-[10px] px-6 pt-8 pb-2 sm:px-7 sm:pt-9 sm:pb-4 text-white lg:bg-[radial-gradient(circle_at_18%_28%,rgba(87,94,214,0.18),transparent_24%),radial-gradient(circle_at_76%_18%,rgba(108,52,193,0.28),transparent_28%),linear-gradient(120deg,#06070b_0%,#0d101b_36%,#23124a_100%)] lg:shadow-[0_30px_60px_rgba(15,23,42,0.28)] lg:overflow-hidden">
      {/* Mobile background element that covers only the top portion */}
      <div className="absolute inset-x-0 top-0 h-[65%] rounded-[10px] bg-[radial-gradient(circle_at_18%_28%,rgba(87,94,214,0.18),transparent_24%),radial-gradient(circle_at_76%_18%,rgba(108,52,193,0.28),transparent_28%),linear-gradient(120deg,#06070b_0%,#0d101b_36%,#23124a_100%)] shadow-[0_20px_40px_rgba(15,23,42,0.28)] lg:hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_50%,rgba(255,255,255,0.05),transparent_22%)] rounded-[10px]" />
      </div>
      
      {/* Desktop background shine */}
      <div className="hidden lg:block pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_50%,rgba(255,255,255,0.05),transparent_22%)]" />

      <div className="relative z-10 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(220px,0.82fr)_minmax(0,1.28fr)] lg:gap-6 lg:items-center">
        <div className="min-w-0 space-y-4 pr-2">
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

        <div ref={containerRef} className="relative w-full min-w-0 py-3 pl-0 lg:py-4 lg:pl-3">
          <div className="absolute right-3 top-2 z-20 hidden items-center gap-2 sm:flex">
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

          <Swiper
            className="weekly-specials-swiper overflow-hidden"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation]}
            navigation={{
              nextEl: `.${nextClass}`,
              prevEl: `.${prevClass}`,
            }}
            loop
            spaceBetween={14}
            slidesPerView={1.4}
            /* Breakpoints මනින්නේ window එකෙන් නෙවෙයි container එකෙන් — sidebar
               දෙක නිසා window එක 1440 උනත් මේ column එක 520px විතරයි. */
            breakpointsBase="container"
            breakpoints={{
              0: { slidesPerView: 3.25, spaceBetween: 8 },
              420: { slidesPerView: 3.25, spaceBetween: 12 },
              640: { slidesPerView: 4, spaceBetween: 14 },
            }}
          >
            {items.map((item) => (
              <SwiperSlide key={item.id} className="!h-auto">
                <WeeklySpecialsCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
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

export { defaultItems as weeklySpecialItems };
