'use client';

import React, { useId, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/solid';

// Swiper CSS imports (එකම file එකක කිහිප වරක් import කිරීම ගැටලුවක් නොවේ)
import 'swiper/css';

export default function RevisionCard({ lessons = [] }) {
  const router = useRouter();
  const rawId = useId();
  const sliderId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const prevClass = `ui11-programs-prev-${sliderId}`;
  const nextClass = `ui11-programs-next-${sliderId}`;

  // Card දත්ත සකසා ගැනීම (පිටතින් දත්ත නොලැබුනහොත් පෙන්වීමට default data ඇතුළත් කර ඇත)
  const programCards = useMemo(() => {
    const dataToUse = lessons.length > 0 ? lessons.slice(0, 4) : [
      { id: 1, title: 'AI Strategy for Leaders', image: '/images/Poster1.jpg', description: 'Master AI implementation.' },
      { id: 2, title: 'Product Management Foundations', image: '/images/Poster3.jpg', description: 'Build world-class products.' },
      { id: 3, title: 'Advanced React Patterns', image: '/images/Poster5.jpg', description: 'Scale your frontend apps.' },
      { id: 4, title: 'UX Research Methods', image: '/images/Poster7.jpg', description: 'Understand your users better.' }
    ];

    return dataToUse.map((lesson, index) => ({
      ...lesson,
      eyebrow: index === 0 ? 'Most popular' : index === 1 ? 'AI powered' : 'Career ready',
      cta: index === 1 ? 'View syllabus' : 'Learn more',
      meta: index === 0 ? '5.0 (1.8K)' : index === 1 ? '4.9 (2.1K)' : '4.8 (1.4K)',
      mentors: [
        '/images/Poster2.jpg', 
        '/images/Poster4.jpg', 
        '/images/Poster6.jpg', 
        '/images/Poster8.jpg'
      ],
      mentorLabel: index === 1 ? 'Taught by top AI strategists' : 'Taught by industry experts',
    }));
  }, [lessons]);

  return (
    <section className="rounded-[15px] bg-[#c4c4c4] pb-30 shadow-[0_22px_70px_rgba(15,23,42,0.12)] lg:rounded-[15px] mt-10">
      <div className="relative rounded-t-[15px] bg-[#050505] px-4 pb-28 pt-10 text-white sm:px-6 lg:px-8 lg:pb-36 lg:pt-7">
        {/* Abstract Background Decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(143,120,255,0.2),_transparent_55%)]" />
          <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[#5b4db0]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
        </div>

        <div className="relative z-10">
          <div className="mb-8 text-center">
            <h2 className="text-[28px] font-light tracking-[-0.04em] text-white sm:text-[34px]">
              Ready for your next move?
            </h2>
          </div>

          <div className="relative flex items-center justify-center gap-3 lg:gap-5">
            {/* Prev Button */}
            <button
              type="button"
              className={`${prevClass} hidden h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/85 backdrop-blur md:flex transition hover:bg-white/10`}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            <Swiper
              className="ui11-programs-swiper w-full max-w-[880px]"
              modules={[Navigation]}
              navigation={{
                nextEl: `.${nextClass}`,
                prevEl: `.${prevClass}`,
              }}
              loop
              grabCursor
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 14 },
                640: { slidesPerView: 1.6, spaceBetween: 18 },
                900: { slidesPerView: 2.2, spaceBetween: 20 },
                1180: { slidesPerView: 3, spaceBetween: 24 },
              }}
            >
              {programCards.map((lesson) => (
                <SwiperSlide key={lesson.id} className="!h-auto py-2">
                  {/* Mobile View Card (< sm) */}
                  <article className="sm:hidden mx-auto w-full max-w-[320px] overflow-hidden rounded-[20px] border border-zinc-800 bg-black p-5 flex flex-col items-center text-center shadow-2xl space-y-4">
                    <div className="relative h-[180px] w-full overflow-hidden rounded-[14px]">
                      <img
                        src={lesson.image}
                        alt={lesson.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-center space-y-2 pt-1">
                      <h3 className="text-[20px] font-bold text-white leading-tight">
                        Science development programme
                      </h3>
                      <p className="text-[12px] text-white/70 font-medium">
                        300+ students reviews
                      </p>
                      <p className="text-[11px] leading-[1.65] text-white/65 max-w-[275px]">
                        Quantum Mind is an innovative AI-powered education platform dedicated to transforming the way students learn, practice, and succeed. Designed for the Sri Lankan syllabus, it offers intelligent learning support, interactive exams, personalized guidance,
                      </p>
                      <div className="pt-3 w-full flex justify-center">
                        <button
                          type="button"
                          onClick={() => router.push('/courses')}
                          className="w-full max-w-[220px] py-3 rounded-lg border-2 border-[#fa9418] bg-transparent text-[11px] font-bold uppercase tracking-wider text-white transition hover:bg-[#fa9418]/10 active:scale-[0.98]"
                        >
                          LEARN MORE
                        </button>
                      </div>
                    </div>
                  </article>

                  {/* Desktop View Card (sm:) - UNTOUCHED */}
                  <article
                    className="hidden sm:block group mx-auto w-full max-w-[270px] min-h-[420px] overflow-hidden rounded-[18px] border border-[#363636] bg-[linear-gradient(180deg,#242424_0%,#1b1b1d_100%)] shadow-[0_18px_40px_rgba(0,0,0,0.34)] transition duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-[200px] overflow-hidden">
                      <img
                        src={lesson.image}
                        alt={lesson.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-black/20 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1b1b1d] to-transparent" />
                      <div className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full border border-[#6e6a58] bg-[#1e1e1e]/90 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.22em] text-[#d7d29a] backdrop-blur">
                        {lesson.eyebrow}
                      </div>
                    </div>

                    <div className="space-y-3 px-4 pb-4 pt-2 text-center">
                      <h3 className="text-[13px] font-semibold leading-[1.15] tracking-[-0.03em] text-white">
                        {lesson.title}
                      </h3>
                      <div className="flex items-center justify-center gap-1.5 text-[9px] text-[#d7d26f]">
                        <StarIcon className="h-2.5 w-2.5" />
                        <StarIcon className="h-2.5 w-2.5" />
                        <StarIcon className="h-2.5 w-2.5" />
                        <span className="ml-1 text-white/35">{lesson.meta}</span>
                      </div>
                      <p className="line-clamp-3 text-[9.5px] leading-[1.45] text-white/52">
                        {lesson.description}
                      </p>

                      <div className="mx-auto h-px w-[78%] bg-white/10" />

                      <div className="flex items-center justify-center">
                        <div className="flex -space-x-2">
                          {lesson.mentors.slice(0, 4).map((mentor, avatarIndex) => (
                            <img
                              key={avatarIndex}
                              src={mentor}
                              alt=""
                              className="h-6 w-6 rounded-full border border-[#1f1f20] object-cover"
                            />
                          ))}
                          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#1f1f20] bg-[#2c2c2d] text-[8px] text-white/55">
                            +
                          </span>
                        </div>
                      </div>

                      <p className="text-[8.5px] text-white/42">{lesson.mentorLabel}</p>

                      <div className="pt-1">
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-full border border-[#6a7241] bg-transparent px-5 py-2 text-[8.5px] font-semibold uppercase tracking-[0.2em] text-[#cad768] transition hover:bg-[#25281c]"
                        >
                          {lesson.cta}
                          <ArrowRightIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Next Button */}
            <button
              type="button"
              className={`${nextClass} hidden h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/85 backdrop-blur md:flex transition hover:bg-white/10`}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Money Back Guarantee Card */}
        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-1/2 px-4 sm:px-8 lg:px-16">
          <div className="rounded-[24px] bg-white px-6 py-8 text-slate-900 shadow-[0_24px_48px_rgba(15,23,42,0.18)] sm:px-8 lg:grid lg:grid-cols-[1.15fr_0.95fr] lg:items-center lg:gap-10">
            <div>
              <h3 className="text-[30px] font-light leading-[1.04] tracking-[-0.04em] text-slate-900 sm:text-[38px]">
                15-day money-back
                <br />
                guarantee
              </h3>
              <div className="mt-5 h-px w-full max-w-[280px] bg-slate-300 sm:mt-6 lg:max-w-[320px]" />
            </div>

            <div className="mt-6 lg:mt-0 lg:justify-self-end">
              <p className="max-w-[360px] text-sm leading-6 text-slate-600 sm:text-[15px]">
                All students are eligible for a full refund within 15 days of enrollment, no
                questions asked.
              </p>
              <button
                type="button"
                onClick={() => router.push('/browse')}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#d1da70] bg-[#dff23a] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-900 transition hover:bg-[#e5f85b]"
              >
                Explore all programs
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ui11-programs-swiper .swiper-slide {
          display: flex;
          height: auto;
        }
      `}</style>
    </section>
  );
}