'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpenIcon } from '@heroicons/react/24/solid';

import MainHeader from '@/components/layout/MainHeader';
import SolutionsBar from '@/components/layout/SolutionsBar';
import MobileIconBar from '@/components/layout/MobileIconBar';
import MainSidebar, { getMainSidebarWidth } from '@/components/layout/MainSidebar';
import { getMainSidebarNavSections } from '@/components/layout/mainSidebarNav';
import ContentsSidebar from '@/components/layout/ContentsSidebar';
import HeroCarousel from '@/components/HeroCarousel';
import SubjectCarousel from '@/components/SubjectCarousel';
import Footer from '@/components/layout/Footer';
import MobileContentsDropdown from '@/components/MobileContentsDropdown';
import DynamicPageConfig from '@/components/DynamicPageConfig';
import { fetchPageConfig, PageConfig, PageItem } from '@/lib/api';
import { allCourses } from '@/Data/data';

type CourseId = keyof typeof allCourses;
type Theme = 'light' | 'dark';

const DEFAULT_COURSE_ID: CourseId = 1;

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  try {
    const storedTheme = window.localStorage?.getItem('ll-theme');
    return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'light';
  } catch {
    return 'light';
  }
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isContentsOpen, setIsContentsOpen] = useState(true);
  const [currentLessonId, setCurrentLessonId] = useState<string | number | null>(null);

  // Backend Dynamic Data State
  const [homeConfig, setHomeConfig] = useState<PageConfig | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  const router = useRouter();
  const fallbackCourse = allCourses[DEFAULT_COURSE_ID];
  const isDark = theme === 'dark';

  const navSections = getMainSidebarNavSections('/');

  // Fetch Home Page Config from Backend
  useEffect(() => {
    async function loadHomeData() {
      const data = await fetchPageConfig('home');
      if (data) {
        setHomeConfig(data);
        // Default to first subject item in the main carousel section
        const firstSection = data.sections?.find((s) => s.isVisible);
        if (firstSection && firstSection.items?.length > 0) {
          setSelectedSubjectId(firstSection.items[0].id);
        }
      }
    }
    loadHomeData();
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

  // Extract Carousel Section Items (Subjects)
  const carouselSection = useMemo(() => {
    if (!homeConfig) return null;
    return homeConfig.sections?.find((s) => s.isVisible);
  }, [homeConfig]);

  const subjectItems = useMemo(() => {
    if (!carouselSection) return [];
    return carouselSection.items?.filter((i) => i.isVisible) || [];
  }, [carouselSection]);

  // Find currently selected subject item
  const selectedSubjectItem = useMemo<PageItem | null>(() => {
    if (!subjectItems || subjectItems.length === 0) return null;
    return subjectItems.find((i) => i.id === selectedSubjectId) || subjectItems[0];
  }, [subjectItems, selectedSubjectId]);

  // Convert selected subject item chapters to course object format for ContentsSidebar
  const activeCourse = useMemo(() => {
    if (!selectedSubjectItem || !selectedSubjectItem.chapters || selectedSubjectItem.chapters.length === 0) {
      return fallbackCourse;
    }
    return {
      id: selectedSubjectItem.id,
      title: selectedSubjectItem.title,
      chapters: selectedSubjectItem.chapters.map((ch, chIdx) => ({
        id: ch.id || chIdx + 1,
        title: ch.title,
        lessons: (ch.lessons || []).map((les, lesIdx) => ({
          id: les.id || `les-${chIdx}-${lesIdx}`,
          lessonNumber: les.lessonNumber,
          title: les.title,
          duration: les.duration || '',
          completed: les.completed || false,
        })),
      })),
    };
  }, [selectedSubjectItem, fallbackCourse]);

  const handleSelectSubject = (item: PageItem) => {
    setSelectedSubjectId(item.id);
    setIsContentsOpen(true);
    setIsSidebarOpen(true);
  };

  const handleNavigate = (href?: string) => {
    if (!href) return;
    router.push(href);
  };

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
      <div className="sticky top-0 z-40 flex flex-shrink-0 flex-col">
        <MainHeader
          onOpenMobileNav={() => setIsSidebarOpen(true)}
          theme={theme}
          onToggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
        />
        <MobileIconBar theme={theme} />
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
          {/* Contents Sidebar Column */}
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
                course={activeCourse}
                currentLessonId={currentLessonId as any}
                onSelectLesson={setCurrentLessonId}
                onClose={() => setIsContentsOpen(false)}
                theme="dark"
              />
            </div>
          </aside>

          {/* Main Column */}
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
                Open contents ({selectedSubjectItem?.title || 'Subject'})
              </button>

              <MobileContentsDropdown
                course={activeCourse}
                currentLessonId={currentLessonId as any}
                setCurrentLessonId={setCurrentLessonId as any}
                isDark={isDark}
              />

              <HeroCarousel />

              {/* Subject Carousel Managed from Admin Panel */}
              <SubjectCarousel
                title={carouselSection?.title || 'Weekly specials: $4.99 movies'}
                subtitle={carouselSection?.subtitle || 'New top deals refreshed every Tuesday'}
                items={subjectItems}
                selectedSubjectId={selectedSubjectId || undefined}
                onSelectSubject={handleSelectSubject}
              />

              <DynamicPageConfig slug="home" />
            </main>

            <Footer />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
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
            course={activeCourse}
            currentLessonId={currentLessonId as any}
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
