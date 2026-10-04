'use client';

import React, { useEffect, useState } from 'react';
import { fetchPageConfig, PageConfig } from '@/lib/api';
import Link from 'next/link';

interface DynamicPageConfigProps {
  slug: string;
  className?: string;
}

export default function DynamicPageConfig({ slug, className = '' }: DynamicPageConfigProps) {
  const [config, setConfig] = useState<PageConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchPageConfig(slug);
      if (data) {
        setConfig(data);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className={`animate-pulse space-y-4 ${className}`}>
        <div className="h-8 w-1/3 rounded-lg bg-slate-800/50" />
        <div className="h-4 w-1/2 rounded-lg bg-slate-800/30" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="h-40 rounded-xl bg-slate-800/40" />
          <div className="h-40 rounded-xl bg-slate-800/40" />
          <div className="h-40 rounded-xl bg-slate-800/40" />
        </div>
      </div>
    );
  }

  if (!config || !config.isPublished) {
    return null;
  }

  return (
    <div className={`space-y-8 ${className}`}>

      {/* Hero Slides section if present */}
      {config.heroSlides && config.heroSlides.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.heroSlides.map((slide) => (
            <div
              key={slide.id}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl text-white transition hover:border-amber-500/40"
              style={
                slide.imageUrl
                  ? {
                      backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.75)), url('${slide.imageUrl}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : undefined
              }
            >
              {slide.badgeText && (
                <span className="inline-block rounded-full bg-amber-500/20 border border-amber-500/30 px-3 py-0.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  {slide.badgeText}
                </span>
              )}
              <h2 className="text-xl font-bold text-white tracking-tight">{slide.title}</h2>
              {slide.subtitle && <p className="mt-1 text-sm text-slate-300">{slide.subtitle}</p>}
              {slide.buttonText && (
                <Link
                  href={slide.buttonLink || '#'}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                >
                  {slide.buttonText}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Sections and Items */}
      {config.sections.map((sec) => {
        if (!sec.isVisible) return null;
        const visibleItems = sec.items.filter((i) => i.isVisible);
        if (visibleItems.length === 0) return null;

        return (
          <section key={sec.id} className="space-y-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">{sec.title}</h2>
              {sec.subtitle && <p className="text-xs text-slate-400">{sec.subtitle}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/80 p-5 shadow-lg backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-amber-500/40 hover:bg-slate-900"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider"
                        style={{ backgroundColor: item.badgeColor || '#3b82f6' }}
                      >
                        {item.badgeText || item.category || 'Module'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition line-clamp-1">
                      {item.title}
                    </h3>
                    {item.subtitle && <p className="text-xs font-medium text-slate-400 mt-0.5 line-clamp-1">{item.subtitle}</p>}
                    {item.description && (
                      <p className="text-xs text-slate-400/90 mt-2 line-clamp-2 leading-relaxed">{item.description}</p>
                    )}
                  </div>

                  {item.link && (
                    <div className="mt-4 border-t border-slate-800/80 pt-3">
                      <Link
                        href={item.link}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
                      >
                        <span>Explore</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
