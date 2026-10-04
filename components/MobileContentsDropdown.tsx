import React from 'react';

export default function MobileContentsDropdown({
  course,
  currentLessonId,
  setCurrentLessonId,
  isDark = false,
}: {
  course: any;
  currentLessonId: any;
  setCurrentLessonId: (id: number) => void;
  isDark?: boolean;
}) {
  if (!course || !course.chapters) return null;

  return (
    <div className="mt-4 lg:hidden px-2">
      <div className="relative">
        <select
          className={`w-full appearance-none rounded-[8px] px-5 py-4 text-base font-medium font-sinhala outline-none transition-colors shadow-sm ${
            isDark
              ? 'bg-white/10 text-white border border-white/20'
              : 'bg-[#f4f4f4] text-gray-800 border border-transparent'
          }`}
          value={currentLessonId || ''}
          onChange={(e) => setCurrentLessonId(Number(e.target.value))}
        >
          <option value="" disabled>All creative fields</option>
          {course.chapters?.map((chapter: any) => (
            <optgroup key={chapter.id} label={chapter.title}>
              {chapter.lessons?.map((lesson: any) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.lessonNumber ? `#${lesson.lessonNumber} - ` : ''}{lesson.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
