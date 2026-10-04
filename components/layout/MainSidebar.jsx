import React from 'react';
import { ChevronLeftIcon as ChevronLeft } from '@heroicons/react/24/solid';
import SidebarNavContent from '@/components/layout/SidebarNavContent';

export const MAIN_SIDEBAR_COLLAPSED_WIDTH = 80;
export const MAIN_SIDEBAR_EXPANDED_WIDTH = 320;
export const DEFAULT_MAIN_SIDEBAR_WIDTHS = {
  collapsedWidth: MAIN_SIDEBAR_COLLAPSED_WIDTH,
  expandedWidth: MAIN_SIDEBAR_EXPANDED_WIDTH,
};

export function getMainSidebarWidth({
  isCollapsed,
  sidebarWidths = DEFAULT_MAIN_SIDEBAR_WIDTHS,
  collapsedWidth = MAIN_SIDEBAR_COLLAPSED_WIDTH,
  expandedWidth = MAIN_SIDEBAR_EXPANDED_WIDTH,
}) {
  const normalizedWidths = {
    collapsedWidth: sidebarWidths?.collapsedWidth ?? collapsedWidth,
    expandedWidth: sidebarWidths?.expandedWidth ?? expandedWidth,
  };

  return isCollapsed ? normalizedWidths.collapsedWidth : normalizedWidths.expandedWidth;
}

export default function MainSidebar({
  navSections,
  isCollapsed,
  onToggleCollapse,
  theme = 'light',
  onNavigate,
  sidebarWidths = DEFAULT_MAIN_SIDEBAR_WIDTHS,
  collapsedWidth = MAIN_SIDEBAR_COLLAPSED_WIDTH,
  expandedWidth = MAIN_SIDEBAR_EXPANDED_WIDTH,
}) {
  const isDark = theme === 'dark';
  const sidebarWidth = getMainSidebarWidth({ isCollapsed, sidebarWidths, collapsedWidth, expandedWidth });
  const handleToggleCollapse = () => {
    onToggleCollapse?.();
  };
  const sidebarClasses = isDark
    ? 'border-white/10 bg-slate-900/70 text-gray-100 backdrop-blur-2xl shadow-[0_20px_50px_rgba(2,6,23,0.65)]'
    : 'border-white/70 bg-gradient-to-br from-white/95 via-slate-50/80 to-white/65 text-gray-900 backdrop-blur-2xl shadow-[0_30px_60px_rgba(15,23,42,0.18)]';
  const buttonClasses = isDark
    ? 'rounded-full p-2 text-gray-200 transition-colors duration-200 hover:bg-white/10'
    : 'rounded-full p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-900/5';
  return (
    <aside
      className={`flex w-full flex-shrink-0 flex-row items-center border-b lg:border-b-0 overflow-x-auto scrollbar-none transition-all duration-300 lg:fixed lg:left-0 lg:top-[5.75rem] lg:z-30 lg:flex-col lg:h-[calc(100vh-5.75rem)] lg:w-[var(--main-sidebar-width)] lg:overflow-y-auto lg:overflow-x-hidden lg:border-r ${sidebarClasses}`}
    >
      <div className={`hidden lg:flex px-3 py-4 ${isCollapsed ? 'justify-center' : 'justify-end'}`}>
        <button
          type="button"
          onClick={handleToggleCollapse}
          className={buttonClasses}
          aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          aria-expanded={!isCollapsed}
          title={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
      <SidebarNavContent
        navSections={navSections}
        collapsed={isCollapsed}
        theme={theme}
        onNavigate={onNavigate}
      />
    </aside>
  );
}
