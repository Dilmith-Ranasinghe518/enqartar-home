'use client';

import React, { useState, useEffect } from 'react';
import {
  adminLogin,
  verifyAdminToken,
  fetchPagesSummary,
  fetchPageConfig,
  savePageConfig,
  uploadImage,
  importSubjectJsx,
  parseSubjectFromJsx,
  PageConfig,
  PageSummary,
  PageSection,
  PageItem,
  ChapterItem,
  LessonItem,
  HeroSlide
} from '@/lib/api';

import {
  isFmSinhalaText,
  convertJsxToUnicode,
  convertTaggedFmToUnicode,
  hasSinhalaUnicode
} from '@/lib/sinhalaConverter';

import {
  LockClosedIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CloudArrowUpIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  TvIcon,
  DocumentTextIcon,
  SparklesIcon,
  BookOpenIcon,
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
  ListBulletIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/solid';

const PAGE_ICONS: Record<string, any> = {
  home: Squares2X2Icon,
  courses: BookOpenIcon,
  'exam-hub': AcademicCapIcon,
  revision: DocumentTextIcon,
  'short-note': PencilSquareIcon,
  book: BookOpenIcon,
  research: SparklesIcon,
  audio: TvIcon,
  'gaming-hub': AdjustmentsHorizontalIcon,
  live: TvIcon,
  'ai-agent': SparklesIcon,
  browser: Squares2X2Icon,
  chatting: DocumentTextIcon,
};

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [loginUsername, setLoginUsername] = useState<string>('admin');
  const [loginPassword, setLoginPassword] = useState<string>('admin123');
  const [loginError, setLoginError] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Pages & Configuration State
  const [pagesSummary, setPagesSummary] = useState<PageSummary[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>('home');
  const [activeConfig, setActiveConfig] = useState<PageConfig | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isLoadingPages, setIsLoadingPages] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');
  const [saveErrorMsg, setSaveErrorMsg] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'meta' | 'hero' | 'sections' | 'preview'>('sections');

  // Item Modal & Edit State
  const [editingItem, setEditingItem] = useState<{ sectionId: string; item: PageItem } | null>(null);
  const [newItemSectionId, setNewItemSectionId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // JSX Import Modal State
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [importJsxContent, setImportJsxContent] = useState<string>('');
  const [importedFileName, setImportedFileName] = useState<string>('');
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);
  const [importImageUrl, setImportImageUrl] = useState<string>('/images/Poster12.jpg');
  const [importBadgeColor, setImportBadgeColor] = useState<string>('#ec4899');
  const [isImporting, setIsImporting] = useState<boolean>(false);

  // Sinhala FM-Abhaya to Unicode Conversion State
  const [isSinhalaDetected, setIsSinhalaDetected] = useState<boolean>(false);
  const [autoConvertSinhala, setAutoConvertSinhala] = useState<boolean>(true);
  const [importModalTab, setImportModalTab] = useState<'preview' | 'code'>('preview');
  const [parsedUnicodePreview, setParsedUnicodePreview] = useState<PageItem | null>(null);
  const [rawOriginalJsx, setRawOriginalJsx] = useState<string>('');
  const [isConvertedInEditor, setIsConvertedInEditor] = useState<boolean>(false);

  const handleJsxContentUpdate = (content: string, fileName?: string) => {
    setImportJsxContent(content);
    const fname = fileName !== undefined ? fileName : importedFileName;
    const detected = isFmSinhalaText(content, fname);
    setIsSinhalaDetected(detected);

    if (detected || hasSinhalaUnicode(content)) {
      try {
        const preview = parseSubjectFromJsx(content, importImageUrl, importBadgeColor);
        setParsedUnicodePreview(preview);
        setImportModalTab('preview');
      } catch {
        setParsedUnicodePreview(null);
      }
    } else {
      setParsedUnicodePreview(null);
    }
  };

  const handleToggleConvertEditorCode = () => {
    if (isConvertedInEditor) {
      if (rawOriginalJsx) {
        setImportJsxContent(rawOriginalJsx);
        setIsConvertedInEditor(false);
        try {
          const preview = parseSubjectFromJsx(rawOriginalJsx, importImageUrl, importBadgeColor);
          setParsedUnicodePreview(preview);
        } catch {}
      }
    } else {
      if (!rawOriginalJsx) {
        setRawOriginalJsx(importJsxContent);
      }
      const converted = convertJsxToUnicode(importJsxContent);
      setImportJsxContent(converted);
      setIsConvertedInEditor(true);
      try {
        const preview = parseSubjectFromJsx(converted, importImageUrl, importBadgeColor);
        setParsedUnicodePreview(preview);
      } catch {}
    }
  };

  const processFile = (file: File) => {
    if (!file) return;
    if (!file.name.endsWith('.jsx') && !file.name.endsWith('.js') && !file.name.endsWith('.txt')) {
      alert('Please select a valid .jsx, .js, or .txt file.');
      return;
    }
    setImportedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        setRawOriginalJsx(text);
        setIsConvertedInEditor(false);
        handleJsxContentUpdate(text, file.name);
      }
    };
    reader.readAsText(file);
  };

  const handleJsxFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };


  // Check auth on load
  useEffect(() => {
    const savedToken = localStorage.getItem('main_platform_admin_token');
    if (savedToken) {
      verifyAdminToken(savedToken).then((res) => {
        if (res.valid) {
          setToken(savedToken);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('main_platform_admin_token');
        }
      });
    }
  }, []);

  // Load summary list of pages
  useEffect(() => {
    if (isAuthenticated) {
      loadPagesSummary();
    }
  }, [isAuthenticated]);

  // Load specific page config when selected slug changes
  useEffect(() => {
    if (isAuthenticated && selectedSlug) {
      loadPageConfig(selectedSlug);
    }
  }, [isAuthenticated, selectedSlug]);

  const loadPagesSummary = async () => {
    setIsLoadingPages(true);
    const summaries = await fetchPagesSummary();
    setPagesSummary(summaries);
    setIsLoadingPages(false);
  };

  const loadPageConfig = async (slug: string) => {
    setIsLoadingPages(true);
    const config = await fetchPageConfig(slug);
    if (config) {
      setActiveConfig(config);
    }
    setIsLoadingPages(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await adminLogin(loginUsername, loginPassword);
      if (res.success && res.token) {
        localStorage.setItem('main_platform_admin_token', res.token);
        setToken(res.token);
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      setLoginError(err.message || 'Invalid admin credentials');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('main_platform_admin_token');
    setToken('');
    setIsAuthenticated(false);
  };

  const handleSaveConfig = async () => {
    if (!activeConfig) return;
    setIsSaving(true);
    setSaveSuccessMsg('');
    setSaveErrorMsg('');
    try {
      await savePageConfig(activeConfig.slug, activeConfig, token);
      setSaveSuccessMsg(`Successfully saved page configuration for "${activeConfig.title}"!`);
      loadPagesSummary();
      setTimeout(() => setSaveSuccessMsg(''), 4000);
    } catch (err: any) {
      setSaveErrorMsg(err.message || 'Failed to save page configuration.');
    } finally {
      setIsSaving(false);
    }
  };

  // Section Handlers
  const handleAddSection = () => {
    if (!activeConfig) return;
    const newSecId = `sec-${Date.now()}`;
    const newSection: PageSection = {
      id: newSecId,
      title: 'New Subject Carousel Section',
      subtitle: 'Click items to view contents in sidebar',
      isVisible: true,
      items: [],
    };
    setActiveConfig({
      ...activeConfig,
      sections: [...activeConfig.sections, newSection],
    });
  };

  const handleDeleteSection = (secId: string) => {
    if (!activeConfig) return;
    setActiveConfig({
      ...activeConfig,
      sections: activeConfig.sections.filter((s) => s.id !== secId),
    });
  };

  const handleUpdateSectionMeta = (secId: string, field: 'title' | 'subtitle' | 'isVisible', val: any) => {
    if (!activeConfig) return;
    setActiveConfig({
      ...activeConfig,
      sections: activeConfig.sections.map((s) => (s.id === secId ? { ...s, [field]: val } : s)),
    });
  };

  // Item Handlers
  const handleOpenAddItem = (secId: string) => {
    setNewItemSectionId(secId);
    setEditingItem({
      sectionId: secId,
      item: {
        id: `subj-${Date.now()}`,
        title: 'New Subject Title',
        subtitle: 'Subject tagline or description',
        description: 'Detailed breakdown of course topics',
        category: 'Subject',
        imageUrl: '/images/Poster12.jpg',
        iconName: 'BookOpen',
        link: '',
        badgeText: 'On Sale',
        badgeColor: '#d9ff3f',
        price: 'Starts at $3.59',
        isVisible: true,
        order: 0,
        chapters: [
          {
            id: `ch-${Date.now()}`,
            title: 'Introduction',
            lessons: [
              { id: `les-${Date.now()}-1`, title: 'Overview & Fundamentals', duration: '5m 00s' }
            ]
          }
        ]
      },
    });
  };

  const handleSaveItemModal = () => {
    if (!activeConfig || !editingItem) return;
    const { sectionId, item } = editingItem;

    const updatedSections = activeConfig.sections.map((sec) => {
      if (sec.id !== sectionId) return sec;

      const existingIndex = sec.items.findIndex((i) => i.id === item.id);
      let updatedItems = [...sec.items];
      if (existingIndex >= 0) {
        updatedItems[existingIndex] = item;
      } else {
        updatedItems.push(item);
      }
      return { ...sec, items: updatedItems };
    });

    setActiveConfig({ ...activeConfig, sections: updatedSections });
    setEditingItem(null);
    setNewItemSectionId(null);
  };

  const handleDeleteItem = (secId: string, itemId: string) => {
    if (!activeConfig) return;
    const updatedSections = activeConfig.sections.map((sec) => {
      if (sec.id !== secId) return sec;
      return { ...sec, items: sec.items.filter((i) => i.id !== itemId) };
    });
    setActiveConfig({ ...activeConfig, sections: updatedSections });
  };

  const handleToggleItemVisibility = (secId: string, itemId: string) => {
    if (!activeConfig) return;
    const updatedSections = activeConfig.sections.map((sec) => {
      if (sec.id !== secId) return sec;
      return {
        ...sec,
        items: sec.items.map((i) => (i.id === itemId ? { ...i, isVisible: !i.isVisible } : i)),
      };
    });
    setActiveConfig({ ...activeConfig, sections: updatedSections });
  };

  const handleMoveItem = (secId: string, itemId: string, direction: 'up' | 'down') => {
    if (!activeConfig) return;
    const updatedSections = activeConfig.sections.map((sec) => {
      if (sec.id !== secId) return sec;
      const idx = sec.items.findIndex((i) => i.id === itemId);
      if (idx < 0) return sec;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= sec.items.length) return sec;

      const newItems = [...sec.items];
      const temp = newItems[idx];
      newItems[idx] = newItems[targetIdx];
      newItems[targetIdx] = temp;
      return { ...sec, items: newItems };
    });
    setActiveConfig({ ...activeConfig, sections: updatedSections });
  };

  // Chapter & Lesson Helpers inside Item Modal
  const handleAddChapterToEditingItem = () => {
    if (!editingItem) return;
    const newChapter: ChapterItem = {
      id: `ch-${Date.now()}`,
      title: 'New Chapter Title',
      lessons: [
        { id: `les-${Date.now()}`, title: 'First Lesson Topic', duration: '6m 00s' }
      ]
    };
    const chapters = [...(editingItem.item.chapters || []), newChapter];
    setEditingItem({
      ...editingItem,
      item: { ...editingItem.item, chapters }
    });
  };

  const handleUpdateChapterTitle = (chapterId: string, title: string) => {
    if (!editingItem) return;
    const chapters = (editingItem.item.chapters || []).map((ch) =>
      ch.id === chapterId ? { ...ch, title } : ch
    );
    setEditingItem({
      ...editingItem,
      item: { ...editingItem.item, chapters }
    });
  };

  const handleDeleteChapter = (chapterId: string) => {
    if (!editingItem) return;
    const chapters = (editingItem.item.chapters || []).filter((ch) => ch.id !== chapterId);
    setEditingItem({
      ...editingItem,
      item: { ...editingItem.item, chapters }
    });
  };

  const handleAddLessonToChapter = (chapterId: string) => {
    if (!editingItem) return;
    const newLesson: LessonItem = {
      id: `les-${Date.now()}`,
      title: 'New Lesson Video/Topic',
      duration: '5m 00s'
    };
    const chapters = (editingItem.item.chapters || []).map((ch) => {
      if (ch.id !== chapterId) return ch;
      return { ...ch, lessons: [...ch.lessons, newLesson] };
    });
    setEditingItem({
      ...editingItem,
      item: { ...editingItem.item, chapters }
    });
  };

  const handleUpdateLesson = (chapterId: string, lessonId: string, field: 'title' | 'duration', val: string) => {
    if (!editingItem) return;
    const chapters = (editingItem.item.chapters || []).map((ch) => {
      if (ch.id !== chapterId) return ch;
      const lessons = ch.lessons.map((les) => (les.id === lessonId ? { ...les, [field]: val } : les));
      return { ...ch, lessons };
    });
    setEditingItem({
      ...editingItem,
      item: { ...editingItem.item, chapters }
    });
  };

  const handleDeleteLesson = (chapterId: string, lessonId: string) => {
    if (!editingItem) return;
    const chapters = (editingItem.item.chapters || []).map((ch) => {
      if (ch.id !== chapterId) return ch;
      return { ...ch, lessons: ch.lessons.filter((l) => l.id !== lessonId) };
    });
    setEditingItem({
      ...editingItem,
      item: { ...editingItem.item, chapters }
    });
  };

  // Import JSX Subject Action
  const handleImportSubjectJsx = async () => {
    if (!importJsxContent.trim()) {
      alert('Please select/upload a .jsx/.js file or paste the subject content code first.');
      return;
    }

    // Pre-check for JS syntax errors
    try {
      const codeToTest = importJsxContent
        .replace(/^export\s+const\s+\w+\s*=/m, 'var _testSubject =')
        .replace(/^export\s+default\s+/, 'var _testSubject =');
      new Function(codeToTest);
    } catch (syntaxErr: any) {
      if (!confirm(`Warning: JavaScript Syntax Error detected in file:\n"${syntaxErr.message}"\n\nDo you still want to attempt importing?`)) {
        return;
      }
    }

    setIsImporting(true);
    try {
      const data = await importSubjectJsx(
        importJsxContent,
        importImageUrl,
        importBadgeColor,
        autoConvertSinhala
      );
      if (data.success) {
        setSaveSuccessMsg(data.message || 'Subject imported successfully in Sinhala Unicode!');
        setIsImportModalOpen(false);
        setImportJsxContent('');
        setImportedFileName('');
        setParsedUnicodePreview(null);
        setIsSinhalaDetected(false);
        setIsConvertedInEditor(false);
        setRawOriginalJsx('');
        if (selectedSlug !== 'home') {
          setSelectedSlug('home');
        } else {
          loadPageConfig('home');
        }
        setTimeout(() => setSaveSuccessMsg(''), 4000);
      } else {
        alert(data.detail || 'Import failed');
      }
    } catch (err: any) {
      alert('Failed to import subject: ' + err.message);
    } finally {
      setIsImporting(false);
    }
  };

  // Hero Slide Handlers
  const handleAddHeroSlide = () => {
    if (!activeConfig) return;
    const newSlide: HeroSlide = {
      id: `hero-${Date.now()}`,
      title: 'New Hero Announcement',
      subtitle: 'Catchy subtitle for the banner carousel',
      imageUrl: '/images/Poster1.jpg',
      buttonText: 'Learn More',
      buttonLink: '/courses',
      badgeText: 'Featured',
    };
    setActiveConfig({
      ...activeConfig,
      heroSlides: [...(activeConfig.heroSlides || []), newSlide],
    });
  };

  const handleDeleteHeroSlide = (slideId: string) => {
    if (!activeConfig) return;
    setActiveConfig({
      ...activeConfig,
      heroSlides: activeConfig.heroSlides.filter((s) => s.id !== slideId),
    });
  };

  const handleUpdateHeroSlide = (slideId: string, field: keyof HeroSlide, val: string) => {
    if (!activeConfig) return;
    setActiveConfig({
      ...activeConfig,
      heroSlides: activeConfig.heroSlides.map((s) => (s.id === slideId ? { ...s, [field]: val } : s)),
    });
  };

  // Upload handler for items or slides
  const handleImageFileUpload = async (file: File, callback: (url: string) => void) => {
    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      callback(url);
    } catch (err: any) {
      alert(err.message || 'File upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const filteredSummaries = pagesSummary.filter((p) =>
    p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // -------------------------------------------------------------
  // RENDER: LOGIN FORM (If not authenticated)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-slate-100 font-sans">
        <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <LockClosedIcon className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Main Platform Admin</h1>
            <p className="mt-2 text-sm text-slate-400">Sign in to configure subject carousels and contents page-by-page</p>
          </div>

          {loginError && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
              <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">Admin Username</label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition duration-200"
                  placeholder="Username"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3.5 font-semibold text-slate-950 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition duration-200 disabled:opacity-50 cursor-pointer"
            >
              {isLoggingIn ? (
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span>Sign In to Admin</span>
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 rounded-xl border border-slate-800/80 bg-slate-950/50 p-3.5 text-center text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Default Demo Credentials:</span> admin / admin123
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: MAIN ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">

      {/* LEFT SIDEBAR: Page Navigator */}
      <aside className="flex w-80 flex-col border-r border-slate-800 bg-slate-900/60 backdrop-blur-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Squares2X2Icon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">Admin Configurator</h2>
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Python Backend Active
              </span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-slate-800/60">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search pages..."
              className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Page List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {filteredSummaries.map((p) => {
            const IconComp = PAGE_ICONS[p.slug] || Squares2X2Icon;
            const isSelected = selectedSlug === p.slug;

            return (
              <button
                key={p.slug}
                onClick={() => setSelectedSlug(p.slug)}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-sm font-medium transition duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300 shadow-md shadow-amber-500/5'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <IconComp className={`h-5 w-5 flex-shrink-0 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                  <div className="truncate">
                    <div className="truncate font-semibold">{p.title}</div>
                    <div className="text-[11px] text-slate-500 truncate">/{p.slug}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                    {p.itemsCount} subjects
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Logout */}
        <div className="border-t border-slate-800 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition cursor-pointer"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex flex-1 flex-col overflow-hidden bg-slate-950">

        {/* TOP BAR */}
        <header className="flex h-16 items-center justify-between border-b border-slate-800 px-6 bg-slate-900/40">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-white">
              {activeConfig ? activeConfig.title : 'Page Configurator'}
            </h1>
            <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-400">
              slug: /{selectedSlug}
            </span>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-950 p-1">
            <button
              onClick={() => setActiveTab('sections')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                activeTab === 'sections' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Subjects & Carousels ({activeConfig?.sections?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('hero')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                activeTab === 'hero' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Hero Banner ({activeConfig?.heroSlides?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('meta')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                activeTab === 'meta' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Page Info
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                activeTab === 'preview' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Live Preview
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-500/15 px-3.5 py-2 text-xs font-bold text-indigo-300 hover:bg-indigo-500/25 transition cursor-pointer"
            >
              <ArrowDownTrayIcon className="h-4 w-4 text-indigo-400" />
              <span>Import Subject (.jsx)</span>
            </button>

            <button
              onClick={handleSaveConfig}
              disabled={isSaving || !activeConfig}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-emerald-500 transition cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <ArrowPathIcon className="h-4 w-4 animate-spin" />
              ) : (
                <CloudArrowUpIcon className="h-4 w-4" />
              )}
              <span>Save Page to DB</span>
            </button>
          </div>
        </header>

        {/* NOTIFICATIONS */}
        {saveSuccessMsg && (
          <div className="flex items-center justify-between border-b border-emerald-500/30 bg-emerald-500/10 px-6 py-2.5 text-xs text-emerald-300">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="h-4 w-4" />
              <span>{saveSuccessMsg}</span>
            </div>
            <button onClick={() => setSaveSuccessMsg('')} className="text-emerald-400 hover:underline">Dismiss</button>
          </div>
        )}
        {saveErrorMsg && (
          <div className="flex items-center justify-between border-b border-rose-500/30 bg-rose-500/10 px-6 py-2.5 text-xs text-rose-300">
            <div className="flex items-center gap-2">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <span>{saveErrorMsg}</span>
            </div>
            <button onClick={() => setSaveErrorMsg('')} className="text-rose-400 hover:underline">Dismiss</button>
          </div>
        )}

        {/* WORKSPACE CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoadingPages ? (
            <div className="flex h-64 items-center justify-center text-slate-500 gap-3">
              <ArrowPathIcon className="h-6 w-6 animate-spin text-amber-500" />
              <span className="text-sm">Loading page configuration from Python Backend...</span>
            </div>
          ) : !activeConfig ? (
            <div className="flex h-64 items-center justify-center text-slate-500">
              Select a page from the sidebar to start configuring.
            </div>
          ) : (
            <>
              {/* TAB 1: SECTIONS & SUBJECT ITEMS */}
              {activeTab === 'sections' && (
                <div className="space-y-6 max-w-5xl mx-auto">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-white">Subject Carousels & Contents Manager</h2>
                      <p className="text-xs text-slate-400">Configure subject cards, cover images, and lesson contents for the sidebar</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsImportModalOpen(true)}
                        className="flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-3.5 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition cursor-pointer"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4 text-indigo-400" />
                        <span>Import Subject (.jsx)</span>
                      </button>
                      <button
                        onClick={handleAddSection}
                        className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
                      >
                        <PlusIcon className="h-4 w-4 text-amber-400" />
                        <span>Add Carousel Section</span>
                      </button>
                    </div>
                  </div>

                  {activeConfig.sections.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-12 text-center text-slate-500">
                      No carousel sections added yet. Click "Add Carousel Section" above to begin.
                    </div>
                  ) : (
                    activeConfig.sections.map((sec) => (
                      <div key={sec.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl space-y-4">
                        
                        {/* Section Header Editor */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={sec.title}
                              onChange={(e) => handleUpdateSectionMeta(sec.id, 'title', e.target.value)}
                              className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-sm font-semibold text-white focus:border-amber-500 focus:outline-none"
                              placeholder="Section Title (e.g., Weekly Specials)"
                            />
                            <input
                              type="text"
                              value={sec.subtitle || ''}
                              onChange={(e) => handleUpdateSectionMeta(sec.id, 'subtitle', e.target.value)}
                              className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-400 focus:border-amber-500 focus:outline-none"
                              placeholder="Section Subtitle"
                            />
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <button
                              onClick={() => handleUpdateSectionMeta(sec.id, 'isVisible', !sec.isVisible)}
                              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition cursor-pointer ${
                                sec.isVisible ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-500'
                              }`}
                            >
                              {sec.isVisible ? <EyeIcon className="h-3.5 w-3.5" /> : <EyeSlashIcon className="h-3.5 w-3.5" />}
                              <span>{sec.isVisible ? 'Visible' : 'Hidden'}</span>
                            </button>

                            <button
                              onClick={() => handleOpenAddItem(sec.id)}
                              className="flex items-center gap-1 rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-xs font-semibold text-amber-400 hover:bg-amber-500/20 transition cursor-pointer"
                            >
                              <PlusIcon className="h-3.5 w-3.5" />
                              <span>Add Subject</span>
                            </button>

                            <button
                              onClick={() => handleDeleteSection(sec.id)}
                              className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-1.5 text-rose-400 hover:bg-rose-500/20 transition cursor-pointer"
                              title="Delete Section"
                            >
                              <TrashIcon className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Subject Items Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {sec.items.length === 0 ? (
                            <div className="col-span-full py-4 text-center text-xs text-slate-500 italic">
                              No subject cards in this carousel section. Click "+ Add Subject" to create one.
                            </div>
                          ) : (
                            sec.items.map((item, itemIdx) => {
                              const chaptersCount = item.chapters?.length || 0;
                              const lessonsCount = item.chapters?.reduce((acc, c) => acc + (c.lessons?.length || 0), 0) || 0;

                              return (
                                <div
                                  key={item.id}
                                  className={`group relative flex flex-col justify-between rounded-xl border p-3.5 transition duration-200 ${
                                    item.isVisible
                                      ? 'border-slate-800 bg-slate-950/80 hover:border-amber-500/30'
                                      : 'border-slate-900 bg-slate-950/40 opacity-60'
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                      <span
                                        className="rounded-md px-2 py-0.5 text-[10px] font-bold text-slate-950 uppercase"
                                        style={{ backgroundColor: item.badgeColor || '#d9ff3f' }}
                                      >
                                        {item.badgeText || 'On Sale'}
                                      </span>
                                      <div className="flex items-center gap-1">
                                        <button
                                          onClick={() => handleMoveItem(sec.id, item.id, 'up')}
                                          disabled={itemIdx === 0}
                                          className="text-slate-500 hover:text-white disabled:opacity-20 cursor-pointer"
                                        >
                                          <ArrowUpIcon className="h-3.5 w-3.5" />
                                        </button>
                                        <button
                                          onClick={() => handleMoveItem(sec.id, item.id, 'down')}
                                          disabled={itemIdx === sec.items.length - 1}
                                          className="text-slate-500 hover:text-white disabled:opacity-20 cursor-pointer"
                                        >
                                          <ArrowDownIcon className="h-3.5 w-3.5" />
                                        </button>
                                        <button
                                          onClick={() => handleToggleItemVisibility(sec.id, item.id)}
                                          className="text-slate-500 hover:text-amber-400 ml-1 cursor-pointer"
                                        >
                                          {item.isVisible ? <EyeIcon className="h-3.5 w-3.5" /> : <EyeSlashIcon className="h-3.5 w-3.5" />}
                                        </button>
                                      </div>
                                    </div>

                                    {item.imageUrl && (
                                      <div className="relative mb-2 h-28 w-full overflow-hidden rounded-lg bg-slate-900">
                                        <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                                      </div>
                                    )}

                                    <h4 className="font-bold text-white text-sm line-clamp-1">{item.title}</h4>
                                    {item.price && <p className="text-xs text-amber-400 font-semibold">{item.price}</p>}
                                    {item.subtitle && <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.subtitle}</p>}

                                    <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-slate-900/80 px-2.5 py-1 text-[11px] text-slate-300 border border-slate-800">
                                      <ListBulletIcon className="h-3.5 w-3.5 text-amber-400" />
                                      <span>{chaptersCount} Chapters • {lessonsCount} Lessons</span>
                                    </div>
                                  </div>

                                  <div className="mt-3 flex items-center justify-end gap-2 border-t border-slate-800/80 pt-2">
                                    <button
                                      onClick={() => setEditingItem({ sectionId: sec.id, item })}
                                      className="flex items-center gap-1 text-xs text-slate-300 hover:text-amber-400 font-medium cursor-pointer"
                                    >
                                      <PencilSquareIcon className="h-3.5 w-3.5" />
                                      <span>Edit Subject & Contents</span>
                                    </button>
                                    <button
                                      onClick={() => handleDeleteItem(sec.id, item.id)}
                                      className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-medium cursor-pointer"
                                    >
                                      <TrashIcon className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>

                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 2: HERO SLIDES */}
              {activeTab === 'hero' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-white">Hero Banner Manager</h2>
                      <p className="text-xs text-slate-400">Configure top hero banners for this page</p>
                    </div>
                    <button
                      onClick={handleAddHeroSlide}
                      className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-semibold text-amber-400 hover:bg-amber-500/20 transition cursor-pointer"
                    >
                      <PlusIcon className="h-4 w-4" />
                      <span>Add Hero Slide</span>
                    </button>
                  </div>

                  {(activeConfig.heroSlides || []).length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-12 text-center text-slate-500">
                      No hero slides configured for this page. Click "Add Hero Slide" to create one.
                    </div>
                  ) : (
                    activeConfig.heroSlides.map((slide, sIdx) => (
                      <div key={slide.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <h3 className="font-bold text-white text-sm">Slide #{sIdx + 1}</h3>
                          <button
                            onClick={() => handleDeleteHeroSlide(slide.id)}
                            className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 cursor-pointer"
                          >
                            <TrashIcon className="h-3.5 w-3.5" />
                            <span>Remove Slide</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div>
                            <label className="block text-slate-400 mb-1">Slide Title</label>
                            <input
                              type="text"
                              value={slide.title}
                              onChange={(e) => handleUpdateHeroSlide(slide.id, 'title', e.target.value)}
                              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-400 mb-1">Badge Text (e.g., Featured, Live)</label>
                            <input
                              type="text"
                              value={slide.badgeText || ''}
                              onChange={(e) => handleUpdateHeroSlide(slide.id, 'badgeText', e.target.value)}
                              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-slate-400 mb-1">Subtitle / Description</label>
                            <textarea
                              rows={2}
                              value={slide.subtitle || ''}
                              onChange={(e) => handleUpdateHeroSlide(slide.id, 'subtitle', e.target.value)}
                              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-slate-400 mb-1">Background Image URL / Upload</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={slide.imageUrl || ''}
                                onChange={(e) => handleUpdateHeroSlide(slide.id, 'imageUrl', e.target.value)}
                                className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                              />
                              <label className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-300 hover:bg-slate-700 cursor-pointer">
                                <CloudArrowUpIcon className="h-4 w-4 text-amber-400" />
                                <span>Upload</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                      handleImageFileUpload(e.target.files[0], (url) => handleUpdateHeroSlide(slide.id, 'imageUrl', url));
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 3: PAGE META INFO */}
              {activeTab === 'meta' && (
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-5">
                    <h2 className="text-lg font-bold text-white">Page Settings</h2>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Page Title</label>
                      <input
                        type="text"
                        value={activeConfig.title}
                        onChange={(e) => setActiveConfig({ ...activeConfig, title: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Page Subtitle / Tagline</label>
                      <textarea
                        rows={3}
                        value={activeConfig.subtitle || ''}
                        onChange={(e) => setActiveConfig({ ...activeConfig, subtitle: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                      <div>
                        <div className="text-sm font-semibold text-white">Publish Status</div>
                        <div className="text-xs text-slate-400">Make this page active and accessible</div>
                      </div>
                      <button
                        onClick={() => setActiveConfig({ ...activeConfig, isPublished: !activeConfig.isPublished })}
                        className={`rounded-full px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                          activeConfig.isPublished ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {activeConfig.isPublished ? 'Published' : 'Draft Mode'}
                      </button>
                    </div>

                    {activeConfig.updatedAt && (
                      <div className="text-[11px] text-slate-500 pt-2">
                        Last saved to database: {new Date(activeConfig.updatedAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: LIVE PREVIEW */}
              {activeTab === 'preview' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-6">
                    <div className="border-b border-slate-800 pb-4">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Live Page Preview</span>
                      <h1 className="text-2xl font-bold text-white mt-1">{activeConfig.title}</h1>
                      <p className="text-sm text-slate-400">{activeConfig.subtitle}</p>
                    </div>

                    {/* Preview Sections */}
                    {activeConfig.sections.map((sec) => (
                      <div key={sec.id} className="space-y-3">
                        <h3 className="text-base font-bold text-white">{sec.title}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                          {sec.items.filter(i => i.isVisible).map((item) => (
                            <div key={item.id} className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-3 flex flex-col justify-between space-y-2">
                              {item.imageUrl && (
                                <img src={item.imageUrl} alt={item.title} className="h-24 w-full object-cover rounded-lg" />
                              )}
                              <div>
                                <span
                                  className="inline-block rounded px-2 py-0.5 text-[9px] font-bold text-slate-950 uppercase"
                                  style={{ backgroundColor: item.badgeColor || '#d9ff3f' }}
                                >
                                  {item.badgeText || 'On Sale'}
                                </span>
                                <h4 className="font-bold text-xs text-white mt-1">{item.title}</h4>
                                <p className="text-[10px] text-amber-400 font-semibold">{item.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* EDIT / ADD SUBJECT ITEM & CONTENTS MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-2xl my-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6 max-h-[90vh] flex flex-col">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">
                {newItemSectionId ? 'Add New Subject Card' : 'Edit Subject & Contents'}
              </h3>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setNewItemSectionId(null);
                }}
                className="text-slate-400 hover:text-white font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-5 pr-1 text-xs">

              {/* Subject Basic Meta */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-950 p-4 space-y-3">
                <h4 className="font-bold text-amber-400 uppercase text-[11px] tracking-wider">Subject Card Details</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Subject Title *</label>
                    <input
                      type="text"
                      value={editingItem.item.title}
                      onChange={(e) => setEditingItem({ ...editingItem, item: { ...editingItem.item, title: e.target.value } })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none font-semibold text-sm"
                      placeholder="e.g. Catholicism"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Subtitle / Tagline</label>
                    <input
                      type="text"
                      value={editingItem.item.subtitle || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, item: { ...editingItem.item, subtitle: e.target.value } })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                      placeholder="e.g. Grade 7 | Catholicism Syllabus"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Badge Text</label>
                    <input
                      type="text"
                      value={editingItem.item.badgeText || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, item: { ...editingItem.item, badgeText: e.target.value } })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                      placeholder="Grade 7"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Price / Tag Line</label>
                    <input
                      type="text"
                      value={editingItem.item.price || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, item: { ...editingItem.item, price: e.target.value } })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                      placeholder="4 Chapters"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Badge Color</label>
                    <input
                      type="color"
                      value={editingItem.item.badgeColor || '#ec4899'}
                      onChange={(e) => setEditingItem({ ...editingItem, item: { ...editingItem.item, badgeColor: e.target.value } })}
                      className="w-full h-9 rounded-lg border border-slate-800 bg-slate-900 px-1 py-1 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Subject Cover Image URL / Upload</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingItem.item.imageUrl || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, item: { ...editingItem.item, imageUrl: e.target.value } })}
                      className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                      placeholder="/images/Poster12.jpg"
                    />
                    <label className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 cursor-pointer">
                      <CloudArrowUpIcon className="h-4 w-4 text-amber-400" />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleImageFileUpload(e.target.files[0], (url) =>
                              setEditingItem({ ...editingItem, item: { ...editingItem.item, imageUrl: url } })
                            );
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Subject Contents (Chapters & Lessons) Manager */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-950 p-4 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div>
                    <h4 className="font-bold text-amber-400 uppercase text-[11px] tracking-wider">
                      Subject Chapters & Lessons (Sidebar Contents)
                    </h4>
                    <p className="text-[11px] text-slate-400">These chapters and lessons will show in the left Contents sidebar when clicked</p>
                  </div>
                  <button
                    onClick={handleAddChapterToEditingItem}
                    className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-400 hover:bg-amber-500/20 cursor-pointer"
                  >
                    <PlusIcon className="h-3.5 w-3.5" />
                    <span>Add Chapter</span>
                  </button>
                </div>

                {(editingItem.item.chapters || []).length === 0 ? (
                  <div className="py-4 text-center text-slate-500 italic text-xs">
                    No chapters added for this subject. Click "+ Add Chapter" to create sidebar contents.
                  </div>
                ) : (
                  editingItem.item.chapters!.map((ch, chIdx) => (
                    <div key={ch.id} className="rounded-lg border border-slate-800 bg-slate-900/90 p-3 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="font-bold text-slate-500">Ch #{chIdx + 1}</span>
                          <input
                            type="text"
                            value={ch.title}
                            onChange={(e) => handleUpdateChapterTitle(ch.id, e.target.value)}
                            className="flex-1 rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-semibold font-sinhala text-white focus:border-amber-500 focus:outline-none"
                            placeholder="Chapter Title (e.g. Introduction)"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAddLessonToChapter(ch.id)}
                            className="flex items-center gap-1 rounded bg-slate-800 px-2 py-1 text-[11px] text-amber-400 hover:bg-slate-700 cursor-pointer font-medium"
                          >
                            <PlusIcon className="h-3 w-3" />
                            <span>Add Lesson</span>
                          </button>
                          <button
                            onClick={() => handleDeleteChapter(ch.id)}
                            className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                          >
                            <TrashIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Lessons List inside Chapter */}
                      <div className="space-y-1.5 pl-4 border-l-2 border-slate-800">
                        {ch.lessons.length === 0 ? (
                          <div className="text-[11px] text-slate-500 italic">No lessons in this chapter yet.</div>
                        ) : (
                          ch.lessons.map((les, lIdx) => {
                            const lesNum =
                              les.lessonNumber !== undefined && les.lessonNumber !== ''
                                ? les.lessonNumber
                                : les.id !== undefined && !String(les.id).startsWith('les-')
                                ? les.id
                                : `${chIdx + 1}.${lIdx + 1}`;
                            return (
                              <div key={les.id} className="flex items-center gap-2">
                                <span className="flex-shrink-0 inline-flex items-center justify-center rounded bg-slate-800 px-1.5 py-1 text-[10px] font-mono font-bold text-amber-400 border border-slate-700 min-w-[28px]">
                                  #{lesNum}
                                </span>
                                <input
                                  type="text"
                                  value={les.title}
                                  onChange={(e) => handleUpdateLesson(ch.id, les.id, 'title', e.target.value)}
                                  className="flex-1 rounded border border-slate-800 bg-slate-950 px-2 py-1 text-[11px] font-sinhala text-slate-200 focus:border-amber-500 focus:outline-none"
                                  placeholder="Lesson title (e.g. What is Generative AI?)"
                                />
                                <input
                                  type="text"
                                  value={les.duration || ''}
                                  onChange={(e) => handleUpdateLesson(ch.id, les.id, 'duration', e.target.value)}
                                  className="w-24 rounded border border-slate-800 bg-slate-950 px-2 py-1 text-[11px] text-slate-400 focus:border-amber-500 focus:outline-none"
                                  placeholder="5m 23s"
                                />
                                <button
                                  onClick={() => handleDeleteLesson(ch.id, les.id)}
                                  className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                                >
                                  <TrashIcon className="h-3 w-3" />
                                </button>
                              </div>
                            );
                          })
                        )}
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
              <button
                onClick={() => {
                  setEditingItem(null);
                  setNewItemSectionId(null);
                }}
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveItemModal}
                className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition cursor-pointer"
              >
                Save Subject & Contents
              </button>
            </div>

          </div>
        </div>
      )}

      {/* IMPORT JSX SUBJECT MODAL */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ArrowDownTrayIcon className="h-5 w-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Import Subject Data (.jsx / .js)</h3>
              </div>
              <button onClick={() => setIsImportModalOpen(false)} className="text-slate-400 hover:text-white font-bold cursor-pointer">
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Upload a <code className="text-amber-400">.jsx</code> or <code className="text-amber-400">.js</code> file (like <code className="text-amber-400">Catholicism7E.jsx</code>, <code className="text-amber-400">BharathaNatyam7T.jsx</code>, <code className="text-amber-400">BharathaNatyam7S.jsx</code>), or paste the subject content code below.
            </p>

            <div className="space-y-3.5 text-xs">
              {/* FILE UPLOAD / DRAG & DROP ZONE */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Upload File (.jsx / .js)</label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDraggingFile(true); }}
                  onDragLeave={() => setIsDraggingFile(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center transition cursor-pointer ${
                    isDraggingFile
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-slate-800 bg-slate-950/60 hover:border-indigo-500/50 hover:bg-slate-950'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jsx,.js,.txt"
                    className="hidden"
                    onChange={handleJsxFileUpload}
                  />
                  <CloudArrowUpIcon className="h-7 w-7 text-indigo-400 mb-1" />
                  {importedFileName ? (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-emerald-400">{importedFileName}</span>
                      <span className="text-[10px] text-slate-400">({(importJsxContent.length / 1024).toFixed(1)} KB)</span>
                    </div>
                  ) : (
                    <>
                      <p className="font-medium text-slate-300">
                        Click to select or drag & drop your <span className="text-indigo-400 font-semibold">.jsx</span> / <span className="text-indigo-400 font-semibold">.js</span> file
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Supports .jsx, .js, or .txt subject files</p>
                    </>
                  )}
                </div>
              </div>

              {/* SINHALA FM-ABHAYA DETECTION BANNER & CONTROLS */}
              {isSinhalaDetected && (
                <div className="rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-amber-600/10 to-transparent p-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="text-2xl">🇱🇰</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-amber-300 text-xs">Sinhala Subject Detected (FM-Abhaya Font Format)</span>
                          <span className="rounded-full bg-amber-400/25 px-2 py-0.5 text-[10px] font-bold text-amber-200 uppercase tracking-wider">
                            FM Abhaya → Unicode
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-0.5">
                          Legacy FM-Abhaya font encoding detected. Converted to standard Sinhala Unicode using <strong className="text-amber-300">FM Abhaya / Abhaya Libre</strong> typography.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-amber-500/20 pt-2 text-[11px]">
                    <div className="flex items-center gap-1 rounded-lg bg-slate-950/80 p-0.5 border border-slate-800">
                      <button
                        type="button"
                        onClick={() => setImportModalTab('preview')}
                        className={`flex items-center gap-1.5 rounded-md px-3 py-1 font-semibold transition cursor-pointer ${
                          importModalTab === 'preview'
                            ? 'bg-amber-500 text-slate-950 shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <EyeIcon className="h-3 w-3" />
                        <span>Sinhala Unicode Preview</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setImportModalTab('code')}
                        className={`flex items-center gap-1.5 rounded-md px-3 py-1 font-semibold transition cursor-pointer ${
                          importModalTab === 'code'
                            ? 'bg-indigo-600 text-white shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <DocumentTextIcon className="h-3 w-3" />
                        <span>JSX Subject Code</span>
                      </button>
                    </div>

                    <label className="flex items-center gap-2 text-amber-200 font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoConvertSinhala}
                        onChange={(e) => setAutoConvertSinhala(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 cursor-pointer"
                      />
                      <span>Auto-convert to Unicode on Import</span>
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 1: SINHALA UNICODE PREVIEW */}
              {isSinhalaDetected && importModalTab === 'preview' ? (
                <div className="space-y-3">
                  {parsedUnicodePreview ? (
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                      {/* Subject Banner */}
                      <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                            Subject Title (Sinhala Unicode)
                          </span>
                          <h4 className="font-sinhala text-xl font-bold text-amber-300 leading-snug">
                            {parsedUnicodePreview.title}
                          </h4>
                          {parsedUnicodePreview.subtitle && (
                            <p className="font-sinhala text-xs text-slate-300">
                              {parsedUnicodePreview.subtitle}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                            {parsedUnicodePreview.badgeText || 'Grade 7'}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {parsedUnicodePreview.chapters?.length || 0} Chapters •{' '}
                            {parsedUnicodePreview.chapters?.reduce((acc, c) => acc + (c.lessons?.length || 0), 0) || 0} Lessons
                          </span>
                        </div>
                      </div>

                      {/* Chapters & Lessons Preview List */}
                      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                        <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
                          <span>Chapters & Lessons Hierarchy</span>
                          <span className="text-amber-400 font-sinhala text-[10px]">Font: FM Abhaya / Abhaya Libre</span>
                        </div>
                        {(parsedUnicodePreview.chapters || []).map((ch, chIdx) => (
                          <div key={ch.id} className="rounded-lg border border-slate-800/80 bg-slate-900/80 p-2.5 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/20">
                                Ch {chIdx + 1}
                              </span>
                              <h5 className="font-sinhala font-bold text-xs text-white flex-1 truncate">
                                {ch.title}
                              </h5>
                              <span className="text-[10px] text-slate-500">
                                {ch.lessons?.length || 0} lessons
                              </span>
                            </div>

                            <div className="space-y-1.5 pl-3 border-l-2 border-slate-800">
                              {(ch.lessons || []).map((les, lIdx) => {
                                const lessonNum =
                                  les.lessonNumber !== undefined && les.lessonNumber !== ''
                                    ? les.lessonNumber
                                    : les.id !== undefined && !String(les.id).startsWith('les-')
                                    ? les.id
                                    : `${chIdx + 1}.${lIdx + 1}`;
                                return (
                                  <div
                                    key={les.id}
                                    className="flex items-center justify-between gap-2 text-[11px] text-slate-300 py-1 px-1.5 rounded-md bg-slate-950/40 hover:bg-slate-950/80 transition border border-slate-800/40"
                                  >
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                      <span className="flex-shrink-0 inline-flex items-center justify-center rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-mono font-bold text-indigo-300 border border-indigo-500/30">
                                        Lesson {lessonNum}
                                      </span>
                                      <span className="font-sinhala truncate text-slate-200">
                                        {les.title}
                                      </span>
                                    </div>
                                    {les.duration && (
                                      <span className="flex-shrink-0 text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                                        {les.duration}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-center text-slate-400 text-xs">
                      <p>Subject code is being parsed or contains syntax differences.</p>
                      <button
                        type="button"
                        onClick={() => setImportModalTab('code')}
                        className="mt-2 text-indigo-400 underline cursor-pointer"
                      >
                        Switch to JSX Subject Code to inspect
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* TAB 2: JSX CONTENT TEXTAREA */
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-slate-300 font-semibold">JSX Subject Code *</label>
                    <div className="flex items-center gap-2">
                      {isSinhalaDetected && (
                        <button
                          type="button"
                          onClick={handleToggleConvertEditorCode}
                          className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 cursor-pointer transition"
                        >
                          {isConvertedInEditor ? '↩️ Revert to Raw FM Abhaya' : '✨ Convert Code to Sinhala Unicode'}
                        </button>
                      )}
                      {importJsxContent && (
                        <button
                          type="button"
                          onClick={() => {
                            setImportJsxContent('');
                            setImportedFileName('');
                            setParsedUnicodePreview(null);
                            setIsSinhalaDetected(false);
                            setRawOriginalJsx('');
                            setIsConvertedInEditor(false);
                          }}
                          className="text-[11px] text-rose-400 hover:underline cursor-pointer"
                        >
                          Clear Content
                        </button>
                      )}
                    </div>
                  </div>
                  <textarea
                    rows={8}
                    value={importJsxContent}
                    onChange={(e) => handleJsxContentUpdate(e.target.value)}
                    placeholder="export const Catholicism7E = { 1: { title: 'Catholicism', chapters: [...] } };"
                    className={`w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-3 font-mono text-[11px] text-amber-300 focus:border-indigo-500 focus:outline-none ${
                      isConvertedInEditor ? 'font-sinhala' : ''
                    }`}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Cover Image URL</label>
                  <input
                    type="text"
                    value={importImageUrl}
                    onChange={(e) => setImportImageUrl(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Badge Color</label>
                  <input
                    type="color"
                    value={importBadgeColor}
                    onChange={(e) => setImportBadgeColor(e.target.value)}
                    className="w-full h-9 rounded-lg border border-slate-800 bg-slate-950 px-1 py-1 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleImportSubjectJsx}
                disabled={isImporting}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition cursor-pointer disabled:opacity-50"
              >
                {isImporting ? (
                  <ArrowPathIcon className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowDownTrayIcon className="h-4 w-4" />
                )}
                <span>Import into Database</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
