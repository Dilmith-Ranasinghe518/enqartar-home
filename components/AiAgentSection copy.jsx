'use client';

import React, { useId } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';

// Carousel එක සඳහා අවශ්‍ය default පින්තූර දත්ත
const defaultImages = [
  { id: 1, src: '/images/Poster1.jpg' },
  { id: 2, src: '/images/Poster2.jpg' },
  { id: 3, src: '/images/Poster3.jpg' },
  { id: 4, src: '/images/Poster4.jpg' },
  { id: 5, src: '/images/Poster5.jpg' },
  { id: 6, src: '/images/Poster6.jpg' },
  { id: 7, src: '/images/Poster7.jpg' },
  { id: 8, src: '/images/Poster8.jpg' },
  { id: 9, src: '/images/Poster9.jpg' },
  { id: 10, src: '/images/Poster10.jpg' },
  { id: 11, src: '/images/Poster11.jpg' },
  { id: 12, src: '/images/Poster12.jpg' },
  { id: 13, src: '/images/Poster13.jpg' },
  { id: 14, src: '/images/Poster14.jpg' },
  { id: 15, src: '/images/Poster15.jpg' },
];

// Inner Carousel Component
function ImageCarousel({
  theme = 'light',
  items,
  onSelect,
  cardHeightClass = 'h-90',
  variant = 'default',
}) {
  const isDark = theme === 'dark';
  const slides = items?.length ? items : defaultImages;
  const rawId = useId();
  const sliderId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const prevClass = `image-carousel-prev-${sliderId}`;
  const nextClass = `image-carousel-next-${sliderId}`;
  const isQCHome = variant === 'qchome';
  const isAppStore = variant === 'appstore';
  
  const shellBase = 'relative flex flex-col justify-end overflow-hidden rounded-[10px] border shadow-[0_45px_95px_rgba(15,23,42,0.18)]';
  const shellClasses = isDark
    ? `${shellBase} ${cardHeightClass} border-white/15 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-900/60 shadow-[0_45px_95px_rgba(0,0,0,0.55)]`
    : `${shellBase} ${cardHeightClass} border-white/80 bg-gradient-to-br from-white/95 via-slate-50/70 to-white/80`;
  
  const overlayGradient = isDark ? 'from-black/65 via-black/35 to-transparent' : 'from-white/35 via-white/15 to-transparent';
  const labelClasses = isDark ? 'bg-white/20 text-white' : 'bg-white/85 text-slate-900';
  
  const navButtonClasses = `pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-xl transition-colors ${
    isDark ? 'border-white/15 bg-white/10 text-white hover:bg-white/20' : 'border-white/70 bg-white/80 text-slate-900 hover:bg-white'
  }`;
  const qcNavButtonClasses = 'pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition hover:bg-slate-50';
  
  const swiperBreakpoints = isQCHome
    ? {
        480: { slidesPerView: 2, spaceBetween: 16 },
        640: { slidesPerView: 3, spaceBetween: 18 },
        768: { slidesPerView: 4, spaceBetween: 20 },
        1024: { slidesPerView: 5, spaceBetween: 22 },
      }
    : isAppStore
      ? {
          480: { slidesPerView: 2.15, spaceBetween: 14 },
          640: { slidesPerView: 3.15, spaceBetween: 16 },
          768: { slidesPerView: 4.15, spaceBetween: 18 },
          1024: { slidesPerView: 5.15, spaceBetween: 18 },
        }
      : {
          480: { slidesPerView: 3, spaceBetween: 16 },
          640: { slidesPerView: 4, spaceBetween: 18 },
          768: { slidesPerView: 5, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 22 },
        };

  return (
    <div className="relative z-0 w-full">
      {/* Prev Navigation Button */}
      <div className={`pointer-events-none absolute z-10 hidden lg:flex items-center ${
        isQCHome ? 'left-0 top-1/2 -translate-x-5 -translate-y-1/2' : isAppStore ? '-left-4 top-1/2 -translate-y-1/2' : 'left-3 top-1/2 -translate-y-1/2'
      }`}>
        <div className={`${prevClass} ${isQCHome ? qcNavButtonClasses : isAppStore ? qcNavButtonClasses : navButtonClasses}`}>
          <ChevronLeft size={20} />
        </div>
      </div>
      
      {/* Next Navigation Button */}
      <div className={`pointer-events-none absolute z-10 hidden lg:flex items-center ${
        isQCHome ? 'right-0 top-1/2 translate-x-5 -translate-y-1/2' : isAppStore ? '-right-4 top-1/2 -translate-y-1/2' : 'right-3 top-1/2 -translate-y-1/2'
      }`}>
        <div className={`${nextClass} ${isQCHome ? qcNavButtonClasses : isAppStore ? qcNavButtonClasses : navButtonClasses}`}>
          <ChevronRight size={20} />
        </div>
      </div>

      <Swiper
        className={`liquid-swiper !px-0 ${isAppStore ? 'appstore-swiper' : ''}`}
        spaceBetween={isAppStore ? 12 : 16}
        slidesPerView={isQCHome ? 1.2 : isAppStore ? 1.7 : 2}
        grabCursor
        navigation={{
          nextEl: `.${nextClass}`,
          prevEl: `.${prevClass}`,
        }}
        modules={[Navigation]}
        loop
        breakpoints={swiperBreakpoints}
      >
        {slides.map((image, index) => {
          const canSelect = Boolean(onSelect);
          const Wrapper = canSelect ? 'button' : 'div';
          const imageId = image.id ?? index + 1;
          const title = image.title || `Poster ${imageId}`;
          return (
            <SwiperSlide key={imageId} className={`!h-auto ${isQCHome ? 'lg:!w-[calc((100%_-_110px)/6)]' : ''}`}>
              <Wrapper
                type={canSelect ? 'button' : undefined}
                onClick={canSelect ? () => onSelect(image) : undefined}
                className={`${
                  isQCHome || isAppStore
                    ? `group h-full w-full text-left transition duration-500 hover:-translate-y-1 ${canSelect ? 'cursor-pointer' : ''}`
                    : `${shellClasses} w-full text-left transition duration-500 hover:-translate-y-1 ${canSelect ? 'cursor-pointer' : ''}`
                }`}
                aria-label={canSelect ? `Open ${title}` : undefined}
              >
                {isQCHome ? (
                  <>
                    <div className="overflow-hidden rounded-[18px] bg-slate-200 shadow-[0_16px_35px_rgba(15,23,42,0.14)]">
                      <img src={image.src} alt={title} className={`w-full object-cover transition duration-500 group-hover:scale-105 ${cardHeightClass}`} />
                    </div>
                    <div className="px-1 pb-1 pt-3 text-center">
                      <p className="line-clamp-2 text-s font-medium text-white mt-2">{title}</p>
                      {image.duration && <p className="mt-1 text-s text-white/80">{image.duration}</p>}
                      {image.subtitle && <p className="mt-1 text-s text-white/80">{image.subtitle}</p>}
                    </div>
                  </>
                ) : isAppStore ? (
                  <div className="overflow-hidden rounded-[16px] border border-slate-200/80 bg-white shadow-[0_14px_35px_rgba(15,23,42,0.1)]">
                    <div className="overflow-hidden rounded-t-[16px] bg-slate-100 relative">
                      <img src={image.src} alt={title} className={`w-full object-cover transition duration-500 group-hover:scale-[1.03] ${cardHeightClass}`} />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/88 via-black/55 to-transparent" />
                    </div>
                    <div className="relative -mt-16 space-y-2 px-3 pb-3 pt-0 text-white z-10">
                      <p className="line-clamp-2 min-h-[2.5rem] text-[12px] font-semibold leading-4 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                        {title}
                      </p>
                      <div className="flex items-center justify-between gap-2 text-[11px] leading-none">
                        <span className="font-medium text-white/90">
                          {image.discount ? (
                            <span className="inline-flex items-center gap-1.5">
                              <span className="rounded bg-yellow-300 px-1 py-0.5 text-[10px] font-bold text-slate-900">{image.discount}</span>
                              {image.oldPrice && <span className="text-white/70 line-through">{image.oldPrice}</span>}
                            </span>
                          ) : image.rating ? `${image.rating} ★` : image.subtitle || 'Top rated'}
                        </span>
                        <span>{image.price || 'Free'}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 rounded-[10px] backdrop-blur-2xl" />
                    <div className="absolute inset-0 overflow-hidden rounded-[10px]">
                      <img src={image.src} alt={title} className="h-full w-full object-cover" />
                      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${overlayGradient}`} />
                      <div className="pointer-events-none absolute inset-0 bg-white/5 blur-3xl opacity-50" />
                    </div>
                    <div className="relative z-10 flex w-full flex-col gap-3 px-4 pb-4 text-white">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] drop-shadow">
                        <span>Gallery</span>
                        <span>{`#${imageId.toString().padStart(2, '0')}`}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${labelClasses}`}>{title}</span>
                        {image.duration && <span className={`text-xs ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{image.duration}</span>}
                      </div>
                      {image.subtitle && <p className={`text-xs ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{image.subtitle}</p>}
                    </div>
                  </>
                )}
              </Wrapper>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <style jsx global>{`
        .liquid-swiper .swiper-slide {
          background: transparent !important;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          justify-content: start;
        }
        .liquid-swiper .swiper-button-prev::after,
        .liquid-swiper .swiper-button-next::after {
          display: none;
        }
        .appstore-swiper .swiper-wrapper {
          align-items: stretch;
        }
      `}</style>
    </div>
  );
}

// 🟢 MAIN AGENT SECTION COMPONENT
export default function AiAgentSection({ carouselItems = defaultImages, theme = 'light', variant = 'default' }) {
  const router = useRouter();

  return (
    // 🟡 මුළු සෙක්ෂන් එකටම bg-slate-400 සහ දෙපසට පෑඩින් එකතු කරන ලදී
    <div className="w-full flex flex-col items-center py-10 bg-zinc-200 px-4 sm:px-8 rounded-2xl">
      
      {/* 1. Guarantee Banner Area */}
      <div className="flex items-center w-full max-w-[62vw] rounded-[25px] bg-white px-8 py-10 text-slate-900 shadow-[0_12px_28px_rgba(15,23,42,0.12)] sm:px-10 lg:px-20 lg:py-14">
        <div className="grid gap-12 w-full lg:grid-cols-[1.2fr_1fr] lg:items-start">
          
          {/* Header Side */}
          <div className="space-y-6">
            <h3 className="text-[32px] sm:text-[40px] font-light leading-[1.1] tracking-[-0.04em] text-slate-900">
              15-day money-back
              <br />
              guarantee
            </h3>
            <div className="h-[2px] w-full max-w-[320px] bg-black" />
          </div>

          {/* Action/Description Side */}
          <div className="flex flex-col items-start lg:items-end lg:text-right justify-between h-full">
            <p className="text-[16px] leading-[1.55] text-slate-700 lg:max-w-[340px]">
              All students are eligible for a full refund within 15 days of enrollment - no questions asked.
            </p>
            <button
              type="button"
              onClick={() => router.push('/qchome/qchomepage1')}
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#cfd56e] bg-[#dcef37] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] transition hover:bg-[#e6f94f] active:scale-[0.98]"
            >
              <span className="whitespace-nowrap text-center">Explore all programs</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Image Carousel Segment */}
      <div className="w-full mt-10">
        <ImageCarousel items={carouselItems} theme={theme} variant={variant} />
      </div>

    </div>
  );
}