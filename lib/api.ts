import {
  convertTaggedFmToUnicode,
  convertJsxToUnicode,
  convertSubjectObjectToUnicode,
  isFmSinhalaText
} from './sinhalaConverter';

function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_MAIN_PLATFORM_API;
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    if (!envUrl || envUrl.startsWith('http://')) {
      return '/api/proxy';
    }
  }
  return envUrl || '/api/proxy';
}

const API_BASE_URL = getApiBaseUrl();


export interface LessonItem {
  id: string;
  title: string;
  duration?: string;
  videoUrl?: string;
  completed?: boolean;
  lessonNumber?: string | number;
}

export interface ChapterItem {
  id: string;
  title: string;
  lessons: LessonItem[];
}

export interface PageItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  iconName?: string;
  link?: string;
  badgeText?: string;
  badgeColor?: string;
  price?: string;
  isVisible: boolean;
  order: number;
  chapters?: ChapterItem[];
}

export interface PageSection {
  id: string;
  title: string;
  subtitle?: string;
  isVisible: boolean;
  items: PageItem[];
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  badgeText?: string;
}

export interface PageConfig {
  slug: string;
  title: string;
  subtitle?: string;
  heroSlides: HeroSlide[];
  sections: PageSection[];
  isPublished: boolean;
  updatedAt?: string;
}

export interface PageSummary {
  slug: string;
  title: string;
  subtitle?: string;
  sectionsCount: number;
  itemsCount: number;
  heroSlidesCount: number;
  isPublished: boolean;
  updatedAt?: string;
}

export async function adminLogin(username: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || 'Login failed');
  }
  return data;
}

export async function verifyAdminToken(token: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch {
    return { success: false, valid: false };
  }
}

export async function fetchPagesSummary(): Promise<PageSummary[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/pages`, { cache: 'no-store' });
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }
    return [];
  } catch (error) {
    console.error('Failed to fetch pages summary:', error);
    return [];
  }
}

export async function fetchPageConfig(slug: string): Promise<PageConfig | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/pages/${slug}`, { cache: 'no-store' });
    const json = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
    return null;
  } catch (error) {
    console.error(`Failed to fetch config for ${slug}:`, error);
    return null;
  }
}

export async function savePageConfig(slug: string, config: Partial<PageConfig>, token?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE_URL}/pages/${slug}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(config),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || 'Failed to save configuration');
  }
  return data;
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  if (!res.ok || !data.url) {
    throw new Error(data.detail || 'Image upload failed');
  }

  // Convert relative backend path to absolute URL if needed
  if (data.url.startsWith('/uploads/')) {
    if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
      return data.url;
    }
    const backendOrigin = process.env.NEXT_PUBLIC_BACKEND_URL || API_BASE_URL.replace(/\/api\/main-platform\/?$/, '');
    return `${backendOrigin}${data.url}`;
  }
  return data.url;
}

export function parseSubjectFromJsx(
  jsxContent: string,
  imageUrl: string = '/images/Poster12.jpg',
  badgeColor: string = '#ec4899'
): PageItem {
  let varName = 'SubjectData';
  const constMatch =
    jsxContent.match(/export\s+const\s+(\w+)\s*=/m) ||
    jsxContent.match(/(?:const|var|let)\s+(\w+)\s*=/m);
  if (constMatch) {
    varName = constMatch[1];
  }

  let cleaned = jsxContent
    .trim()
    .replace(/^export\s+default\s+/m, 'return ')
    .replace(/^export\s+const\s+\w+\s*=/m, 'return ')
    .replace(/^(const|var|let)\s+\w+\s*=/m, 'return ')
    .replace(/;\s*$/, '');

  let rawData: any = null;
  try {
    rawData = new Function(cleaned)();
  } catch (e) {
    try {
      const wrapped = `var __out; ${jsxContent
        .replace(/export\s+const\s+\w+\s*=/m, '__out =')
        .replace(/export\s+default\s+/, '__out =')}; return __out;`;
      rawData = new Function(wrapped)();
    } catch (e2: any) {
      console.error('Failed to parse JSX subject object:', e2);
      throw new Error(`Failed to parse JavaScript object: ${e2?.message || e2}`);
    }
  }

  if (!rawData || typeof rawData !== 'object') {
    throw new Error('Parsed subject data is empty or invalid.');
  }

  const rootKey = Object.keys(rawData)[0];
  const root =
    rootKey &&
    rawData[rootKey] &&
    typeof rawData[rootKey] === 'object' &&
    ('title' in rawData[rootKey] || 'chapters' in rawData[rootKey])
      ? rawData[rootKey]
      : rawData;

  const subjectTitle = convertTaggedFmToUnicode(root.title || varName);
  const rawDropdownHeading =
    (root.chapters && root.chapters[0] && root.chapters[0].dropdownHeading) ||
    `${subjectTitle} Syllabus`;
  const dropdownHeading = convertTaggedFmToUnicode(rawDropdownHeading);

  const formattedChapters: ChapterItem[] = (root.chapters || []).map((ch: any, idx: number) => ({
    id: 'ch-' + (ch.id || idx + 1),
    title: convertTaggedFmToUnicode(ch.title || `Chapter ${idx + 1}`),
    lessons: (ch.lessons || []).map((les: any, lIdx: number) => {
      const rawLessonNum =
        les.lessonNumber !== undefined
          ? les.lessonNumber
          : les.id !== undefined && !String(les.id).startsWith('les-')
          ? les.id
          : `${idx + 1}.${lIdx + 1}`;
      return {
        id: 'les-' + (les.id || lIdx + 1),
        lessonNumber: rawLessonNum,
        title: convertTaggedFmToUnicode(les.title || `Lesson ${lIdx + 1}`),
        duration: les.duration || '8m 00s',
        completed: Boolean(les.completed),
        videoUrl: les.videoUrl || '',
        description: convertTaggedFmToUnicode(
          les.description ||
          (les.objectives
            ? Array.isArray(les.objectives)
              ? les.objectives.join(', ')
              : String(les.objectives)
            : '')
        ),
      ...(les.objectives ? { objectives: convertSubjectObjectToUnicode(les.objectives) } : {}),
      ...(les.transcript ? { transcript: convertSubjectObjectToUnicode(les.transcript) } : {}),
      ...(les.resources ? { resources: convertSubjectObjectToUnicode(les.resources) } : {}),
      ...(les.studyMaterials ? { studyMaterials: les.studyMaterials } : {})
    };
  })
}));

  const subjectItem: PageItem = {
    id: 'subj-' + varName.toLowerCase(),
    title: subjectTitle,
    subtitle: dropdownHeading,
    description: convertTaggedFmToUnicode(
      root.description || `Complete syllabus and lessons for ${subjectTitle}`
    ),
    category: 'Syllabus',
    imageUrl: imageUrl || '/images/Poster12.jpg',
    badgeText: root.grade || 'Grade 7',
    badgeColor: badgeColor || '#ec4899',
    price: `${formattedChapters.length} Chapters`,
    isVisible: true,
    order: 1,
    chapters: formattedChapters
  };

  return subjectItem;
}

export async function importSubjectJsx(
  jsxContent: string,
  imageUrl?: string,
  badgeColor?: string,
  autoConvertUnicode: boolean = true
) {
  // If auto-convert is active and content has FM Sinhala, convert JSX content
  const effectiveJsx = autoConvertUnicode && isFmSinhalaText(jsxContent)
    ? convertJsxToUnicode(jsxContent)
    : jsxContent;

  // 1. Evaluate and format subject data directly in the client runtime
  const subjectItem = parseSubjectFromJsx(effectiveJsx, imageUrl, badgeColor);

  let processedJsx = effectiveJsx.trim();
  const exportConstMatch = processedJsx.match(/^export\s+const\s+(\w+)\s*=/m);
  if (exportConstMatch) {
    const varName = exportConstMatch[1];
    processedJsx = processedJsx.replace(/^export\s+const\s+/, 'const ');
    if (!processedJsx.includes('module.exports')) {
      processedJsx += `\nif (typeof module !== 'undefined') { module.exports = ${varName}; }`;
    }
  } else if (/^export\s+default/m.test(processedJsx)) {
    processedJsx = processedJsx.replace(/^export\s+default\s+/, 'const _defaultExport = ');
    if (!processedJsx.includes('module.exports')) {
      processedJsx += `\nif (typeof module !== 'undefined') { module.exports = _defaultExport; }`;
    }
  }

  // 2. Attempt backend endpoint (supplying parsed object to relieve server of Node requirement)
  let backendSucceeded = false;
  let backendResponse: any = null;
  try {
    const res = await fetch(`${API_BASE_URL}/import-subject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsxContent: processedJsx,
        rawJsxContent: jsxContent,
        subjectItem,
        parsedData: subjectItem,
        jsonContent: JSON.stringify(subjectItem),
        imageUrl: subjectItem.imageUrl,
        badgeColor: subjectItem.badgeColor
      }),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.success) {
      backendSucceeded = true;
      backendResponse = data;
    } else {
      console.warn('Backend /import-subject did not complete successfully, using direct home sync fallback:', data);
    }
  } catch (err) {
    console.warn('Network call to /import-subject failed, using direct home sync fallback:', err);
  }

  if (backendSucceeded && backendResponse) {
    return backendResponse;
  }

  // 3. Fallback: Save directly to the Home page configuration in MongoDB
  const homeConfig = await fetchPageConfig('home');
  const baseConfig: PageConfig = homeConfig || {
    slug: 'home',
    title: 'Main Platform Hub',
    subtitle: 'Explore subjects, live tools, AI agents, research, and interactive learning modules.',
    heroSlides: [],
    sections: [],
    isPublished: true
  };

  const sections = [...(baseConfig.sections || [])];
  let carouselSec = sections.find(
    (s) => s.id === 'sec-subjects-carousel' || s.title?.toLowerCase().includes('subject')
  );

  if (!carouselSec) {
    if (sections.length > 0) {
      carouselSec = sections[0];
    } else {
      carouselSec = {
        id: 'sec-subjects-carousel',
        title: 'Subject Carousels & Learning Modules',
        subtitle: 'Click any subject to view its full course contents in the left sidebar',
        isVisible: true,
        items: []
      };
      sections.push(carouselSec);
    }
  }

  const items = [...(carouselSec.items || [])];
  const existingIdx = items.findIndex((it) => it.id === subjectItem.id);
  if (existingIdx >= 0) {
    items[existingIdx] = subjectItem;
  } else {
    items.unshift(subjectItem);
  }
  carouselSec.items = items;

  await savePageConfig('home', {
    ...baseConfig,
    sections
  });

  return {
    success: true,
    message: `Successfully imported subject '${subjectItem.title}' into Database!`,
    data: subjectItem
  };
}



