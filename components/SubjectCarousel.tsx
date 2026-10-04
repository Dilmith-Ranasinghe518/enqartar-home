'use client';

import React, { useCallback, useEffect, useId, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, CheckCircleIcon } from 'lucide-react';
import { PageItem } from '@/lib/api';

import 'swiper/css';

interface SubjectCarouselProps {
  title?: string;
  subtitle?: string;
  items: PageItem[];
  selectedSubjectId?: string;
  onSelectSubject?: (item: PageItem) => void;
}

function SubjectCard({ item, isSelected, onClick }: { item: PageItem; isSelected: boolean; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      className={`mt-6 group relative h-full min-h-[312px] w-full overflow-hidden rounded-[14px] bg-black/15 shadow-[0_20px_40px_rgba(0,0,0,0.24)] ring-1 transition-all duration-300 cursor-pointer ${
        isSelected ? 'ring-2 ring-amber-400 scale-[1.02] shadow-[0_24px_50px_rgba(245,158,11,0.35)]' : 'ring-white/10 hover:ring-white/30'
      }`}
    >
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex items-center justify-center p-4">
          <span className="text-sm font-bold text-slate-300 text-center">{item.title}</span>
        </div>
      )}

      {/* Selected Active Badge Overlay */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-extrabold text-slate-950 shadow-lg">
          <CheckCircleIcon size={13} />
          <span>Active Subject</span>
        </div>
      )}

      <div className="absolute inset-0 rounded-[14px] bg-[linear-gradient(180deg,rgba(8,8,12,0)_0%,rgba(8,8,12,0.06)_42%,rgba(11,10,18,0.36)_62%,rgba(10,10,16,0.72)_80%,rgba(8,8,12,0.96)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[38%] rounded-b-[14px] bg-[linear-gradient(180deg,rgba(54,38,83,0)_0%,rgba(54,38,83,0.1)_30%,rgba(18,14,28,0.4)_68%,rgba(8,8,12,0.85)_100%)]" />
      
      <div className="absolute inset-x-0 bottom-0 flex min-h-[122px] flex-col justify-end rounded-b-[14px] px-3.5 pb-4 pt-8">
        <p className="line-clamp-2 min-h-[32px] text-sm font-bold font-sinhala leading-5 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.72)]">
          {item.title}
        </p>
        <div className="mt-1.5 flex flex-col items-end gap-1.5">
          <div
            className="inline-flex max-w-full truncate rounded-[4px] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.06em] text-slate-950 shadow-md"
            style={{ backgroundColor: item.badgeColor || '#d9ff3f' }}
          >
            {item.badgeText || 'On Sale'}
          </div>
          {item.price && (
            <p className="text-right text-xs font-semibold text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.72)]">
              {item.price}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function SubjectCarousel({
  title = 'Weekly specials: $4.99 movies',
  subtitle = 'New top deals refreshed every Tuesday',
  items,
  selectedSubjectId,
  onSelectSubject,
}: SubjectCarouselProps) {
  const rawId = useId();
  const sliderId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const prevClass = `subject-specials-prev-${sliderId}`;
  const nextClass = `subject-specials-next-${sliderId}`;

  const swiperRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastWidthRef = useRef(0);

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

  if (!items || items.length === 0) return null;

  return (
    <section className="relative rounded-[14px] px-6 pt-8 pb-2 sm:px-7 sm:pt-9 sm:pb-4 text-white lg:bg-[radial-gradient(circle_at_18%_28%,rgba(87,94,214,0.18),transparent_24%),radial-gradient(circle_at_76%_18%,rgba(108,52,193,0.28),transparent_28%),linear-gradient(120deg,#06070b_0%,#0d101b_36%,#23124a_100%)] lg:shadow-[0_30px_60px_rgba(15,23,42,0.28)] lg:overflow-hidden">
      {/* Mobile background element that covers only the top portion */}
      <div className="absolute inset-x-0 top-0 h-[65%] rounded-[14px] bg-[radial-gradient(circle_at_18%_28%,rgba(87,94,214,0.18),transparent_24%),radial-gradient(circle_at_76%_18%,rgba(108,52,193,0.28),transparent_28%),linear-gradient(120deg,#06070b_0%,#0d101b_36%,#23124a_100%)] shadow-[0_20px_40px_rgba(15,23,42,0.28)] lg:hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_50%,rgba(255,255,255,0.05),transparent_22%)] rounded-[14px]" />
      </div>

      {/* Desktop background shine */}
      <div className="hidden lg:block pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_50%,rgba(255,255,255,0.05),transparent_22%)]" />

      <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(220px,0.82fr)_minmax(0,1.28fr)] lg:items-center">
        <div className="min-w-0 space-y-4 pr-2">
          <div className="space-y-2">
            <h1 className="text-[1.9rem] font-bold leading-tight sm:text-[2.1rem]">
              {title}
            </h1>
            <p className="max-w-[28ch] text-sm leading-6 text-white/70">
              {subtitle}
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center rounded-[6px] bg-amber-500/20 border border-amber-500/40 px-4 py-2 text-xs font-bold text-amber-300 transition hover:bg-amber-500/30"
          >
            Click a Subject to view Contents
          </button>
        </div>

        <div ref={containerRef} className="relative w-full min-w-0 py-3 pl-0 lg:py-4 lg:pl-3">
          <div className="absolute right-3 top-2 z-20 hidden items-center gap-2 sm:flex">
            <button
              type="button"
              className={`${prevClass} flex h-8 w-8 items-center justify-center rounded-full bg-white/25 text-white transition hover:bg-white/35 cursor-pointer`}
              aria-label="Previous subjects"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className={`${nextClass} flex h-8 w-8 items-center justify-center rounded-full bg-white/25 text-white transition hover:bg-white/35 cursor-pointer`}
              aria-label="Next subjects"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <Swiper
            className="subject-specials-swiper overflow-hidden"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation]}
            navigation={{
              nextEl: `.${nextClass}`,
              prevEl: `.${prevClass}`,
            }}
            spaceBetween={14}
            slidesPerView={1.4}
            breakpointsBase="container"
            breakpoints={{
              0: { slidesPerView: 3.25, spaceBetween: 8 },
              420: { slidesPerView: 3.25, spaceBetween: 12 },
              640: { slidesPerView: 4, spaceBetween: 14 },
            }}
          >
            {items.map((item) => (
              <SwiperSlide key={item.id} className="!h-auto flex">
                <SubjectCard
                  item={item}
                  isSelected={selectedSubjectId === item.id}
                  onClick={() => onSelectSubject?.(item)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <style jsx global>{`
        .subject-specials-swiper .swiper-slide {
          display: flex;
          height: auto;
        }
      `}</style>
    </section>
  );
}
