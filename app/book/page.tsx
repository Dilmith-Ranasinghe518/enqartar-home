'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpenIcon } from '@heroicons/react/24/solid';

import MainHeader from '@/components/layout/MainHeader';
import SolutionsBar from '@/components/layout/SolutionsBar';
import MainSidebar, { getMainSidebarWidth } from '@/components/layout/MainSidebar';
import { getMainSidebarNavSections } from '@/components/layout/mainSidebarNav';
import ContentsSidebar from '@/components/layout/ContentsSidebar';
import HeroCarousel from '@/components/HeroCarousel';
import PageCarousel from '@/components/PageCarousel';
import BookSection from '@/components/BookSection';
import Footer from '@/components/layout/Footer';
import MobileContentsDropdown from '@/components/MobileContentsDropdown';
import { allCourses } from '@/Data/data';

const course = allCourses[1];
const lessons = course.chapters.flatMap((chapter) => chapter.lessons);

export default function BookPage() {
  const [theme, setTheme] = useState('light');
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isContentsOpen, setIsContentsOpen] = useState(true);
  const [currentLessonId, setCurrentLessonId] = useState<number | null>(
    lessons[0]?.id ?? null
  );

  const router = useRouter();
  const isDark = theme === 'dark';

  const navSections = getMainSidebarNavSections('/book');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const storedTheme = window.localStorage?.getItem('ll-theme');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        // The saved preference is only available after the client mounts.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTheme(storedTheme);
      }
    } catch {
      // ignore storage read issues
    }
  }, []);

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

  // The drawer is already CSS-hidden at `lg`, so this only clears leftover state
  // and can never leave it stranded on top of the desktop layout.
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

  const handleNavigate = (href: string) => {
    if (!href) return;
    router.push(href);
  };

  // Width is applied through a CSS var + `lg:` utility so the padding and the
  // sidebar itself flip at exactly the same breakpoint the sidebar uses.
  const navWidth = getMainSidebarWidth({ isCollapsed: isNavCollapsed });

  const openContents = () => {
    setIsContentsOpen(true);
    setIsSidebarOpen(true);
  };

  return (
    <div
      className={`flex h-dvh flex-col overflow-hidden ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#f3f4f3] text-slate-900'}`}
      style={{ '--main-sidebar-width': `${navWidth}px` } as CSSProperties}
    >
      <div className="sticky top-0 z-40 flex flex-shrink-0 flex-col">
        <MainHeader
          onOpenMobileNav={() => setIsSidebarOpen(true)}
          theme={theme}
          onToggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
        />
        <SolutionsBar theme={theme} />
      </div>

      <div className="flex flex-col lg:flex-row min-h-0 flex-1 overflow-hidden transition-[padding] duration-300 lg:pl-[var(--main-sidebar-width)]">
        <MainSidebar
          navSections={navSections}
          isCollapsed={isNavCollapsed}
          onToggleCollapse={() => setIsNavCollapsed((prev) => !prev)}
          theme={theme}
          onNavigate={handleNavigate}
        />

        <div className={`flex min-h-0 flex-1 overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-[#eff3f2]'}`}>
          {/* Contents column — part of the flex row, so it reflows with the nav sidebar */}
          <aside
            className={`hidden min-h-0 flex-shrink-0 overflow-hidden border-y border-r border-black/10 bg-[#2f3640] shadow-[0_20px_40px_rgba(15,23,42,0.14)] transition-[width,opacity] duration-300 lg:block ${
              isContentsOpen
                ? 'w-[340px] rounded-r-[12px] opacity-100 xl:w-[420px] 2xl:w-[520px]'
                : 'w-0 border-0 opacity-0'
            }`}
            aria-hidden={!isContentsOpen}
          >
            <div className="h-full w-[340px] xl:w-[420px] 2xl:w-[520px]">
              <ContentsSidebar
                course={course}
                currentLessonId={currentLessonId}
                onSelectLesson={setCurrentLessonId}
                onClose={() => setIsContentsOpen(false)}
                theme="dark"
              />
            </div>
          </aside>

          {/* Main column — scrolls on its own so the contents list stays put */}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
            <main className="min-w-0 flex-1 space-y-5 px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
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

              

              <HeroCarousel />
              <MobileContentsDropdown
                course={course}
                currentLessonId={currentLessonId as any}
                setCurrentLessonId={setCurrentLessonId as any}
                isDark={isDark}
              />

              <PageCarousel />
              <BookSection />

              <PageCarousel />
              <BookSection />

            </main>

            <Footer />
          </div>
        </div>
      </div>

      {/* Contents drawer — below `lg` only, so it can never sit under the nav rail */}
      <div className="lg:hidden">
        <div
          className={`fixed inset-0 z-50 bg-slate-950/55 transition-opacity duration-300 ${
            isSidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
        <div
          className={`fixed bottom-0 left-0 top-0 z-[60] w-[520px] max-w-[94%] transform transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <ContentsSidebar
            course={course}
            currentLessonId={currentLessonId}
            onSelectLesson={(lessonId: number) => {
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
