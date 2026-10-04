'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpenIcon } from '@heroicons/react/24/solid';

import MainHeader from '@/components/layout/MainHeader';
import SolutionsBar from '@/components/layout/SolutionsBar';
import MobileIconBar from '@/components/layout/MobileIconBar';
import MainSidebar, { getMainSidebarWidth } from '@/components/layout/MainSidebar';
import { getMainSidebarNavSections } from '@/components/layout/mainSidebarNav';
import ContentsSidebar from '@/components/layout/ContentsSidebar';
import MobileContentsDropdown from '@/components/MobileContentsDropdown';
import WeeklySpecialsCarousel from '@/components/WeeklySpecialsCarousel';
import GarfieldBanner from '@/components/GarfieldBanner';
import MovieCardGrid from '@/components/MovieCardGrid';
import Footer from '@/components/layout/Footer';
import { homeCourseData } from '@/Data/homeData';

type Theme = 'light' | 'dark';

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';

  try {
    const storedTheme = window.localStorage?.getItem('ll-theme');
    return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'dark';
  } catch {
    return 'dark';
  }
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isContentsOpen, setIsContentsOpen] = useState(true);
  const [currentLessonId, setCurrentLessonId] = useState<string | number | null>('1-1');

  const router = useRouter();
  const isDark = theme === 'dark';

  const navSections = getMainSidebarNavSections('/home');

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.theme = theme;
    if (typeof window !== 'undefined') {
      try {
        window.localStorage?.setItem('ll-theme', theme);
      } catch {
        // ignore storage write issues
      }
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const closeDrawer = () => {
      if (mediaQuery.matches) setIsSidebarOpen(false);
    };
    closeDrawer();
    mediaQuery.addEventListener('change', closeDrawer);
    return () => mediaQuery.removeEventListener('change', closeDrawer);
  }, [isSidebarOpen]);

  const navWidth = getMainSidebarWidth({ isCollapsed: isNavCollapsed });

  const openContents = () => {
    setIsContentsOpen(true);
    setIsSidebarOpen(true);
  };

  return (
    <div
      className={`flex h-dvh flex-col overflow-hidden ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#f3f4f3] text-slate-900'}`}
      style={{ '--main-sidebar-width': `${navWidth}px` } as React.CSSProperties}
    >
      {/* Top sticky header area */}
      <div className="sticky top-0 z-40 flex flex-shrink-0 flex-col">
        <MainHeader
          onOpenMobileNav={() => setIsSidebarOpen(true)}
          theme={theme}
          onToggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
        />
        <MobileIconBar theme={theme} />
        <SolutionsBar theme={theme} />
      </div>

      {/* Main app body */}
      <div className="flex flex-col lg:flex-row min-h-0 flex-1 overflow-hidden transition-[padding] duration-300 lg:pl-[var(--main-sidebar-width)]">
        <MainSidebar
          navSections={navSections}
          isCollapsed={isNavCollapsed}
          onToggleCollapse={() => setIsNavCollapsed((prev) => !prev)}
          theme={theme}
          onNavigate={(href: string) => href && router.push(href)}
        />

        <div className={`flex min-h-0 flex-1 overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-[#eff3f2]'}`}>
          {/* Contents Sidebar Drawer */}
          <aside
            className={`hidden min-h-0 flex-shrink-0 overflow-hidden border-y border-r border-black/15 bg-[#252b35] shadow-[0_20px_40px_rgba(15,23,42,0.18)] transition-[width,opacity] duration-300 lg:block ${
              isContentsOpen
                ? 'w-[320px] rounded-r-[12px] opacity-100 xl:w-[380px] 2xl:w-[440px]'
                : 'w-0 border-0 opacity-0'
            }`}
            aria-hidden={!isContentsOpen}
          >
            <div className="h-full w-[320px] xl:w-[380px] 2xl:w-[440px]">
              <ContentsSidebar
                course={homeCourseData}
                currentLessonId={currentLessonId}
                onSelectLesson={setCurrentLessonId}
                onClose={() => setIsContentsOpen(false)}
                theme="dark"
              />
            </div>
          </aside>

          {/* Main Scrollable Area */}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
            <main className="min-w-0 flex-1 space-y-6 px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
              <button
                type="button"
                onClick={openContents}
                className={`hidden lg:inline-flex items-center gap-2 rounded-full bg-[#2f343d] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(15,23,42,0.18)] ${
                  isContentsOpen ? 'lg:hidden' : ''
                }`}
              >
                <BookOpenIcon className="h-4 w-4" />
                Open contents
              </button>

              <MobileContentsDropdown
                course={homeCourseData}
                currentLessonId={currentLessonId}
                setCurrentLessonId={(id: any) => setCurrentLessonId(id)}
                isDark={isDark}
              />

              {/* 1. Top Section: Weekly Specials $4.99 movies */}
              <WeeklySpecialsCarousel />

              {/* 2. Garfield Banner #1 */}
              <GarfieldBanner />

              {/* 3. Movie Card Grid #1 */}
              <MovieCardGrid />

              {/* 4. Garfield Banner #2 */}
              <GarfieldBanner />

              {/* 5. Movie Card Grid #2 */}
              <MovieCardGrid />

              {/* 6. Garfield Banner #3 */}
              <GarfieldBanner />
            </main>

            <Footer />
          </div>
        </div>
      </div>

      {/* Mobile Drawer for Contents Sidebar */}
      <div className="lg:hidden">
        <div
          className={`fixed inset-0 z-50 bg-slate-950/60 transition-opacity duration-300 ${
            isSidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
        <div
          className={`fixed bottom-0 left-0 top-0 z-[60] w-[360px] max-w-[90%] transform transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <ContentsSidebar
            course={homeCourseData}
            currentLessonId={currentLessonId}
            onSelectLesson={(lessonId: any) => {
              setCurrentLessonId(lessonId);
              setIsSidebarOpen(false);
            }}
            onClose={() => setIsSidebarOpen(false)}
            theme="dark"
          />
        </div>
      </div>
    </div>
  );
}
