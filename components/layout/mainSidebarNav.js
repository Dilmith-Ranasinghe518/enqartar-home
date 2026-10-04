export const MAIN_SIDEBAR_NAV_SECTIONS = [
  {
    title: null,
    items: [
      { icon: '/icons/home.png', label: 'Home', href: '/home' },
      { icon: '/icons/course.png', label: 'Dashboard', href: '/home' },
      { icon: '/icons/search.png', label: 'Research', href: '/home' },
      { icon: '/icons/audio.png', label: 'Audio', href: '/home' },
      { icon: '/icons/browser.png', label: 'Browser', href: '/home' },
      { icon: '/icons/chat.png', label: 'Chatting', href: '/home' },
      { icon: '/icons/agent.png', label: 'AI Agent', href: '/home' },
      { icon: '/icons/shortnote.png', label: 'Short Notes', href: '/home' },
      { icon: '/icons/book.png', label: 'Books', href: '/home' },
      { icon: '/icons/live.png', label: 'Live Classes', href: '/home' },
      { icon: '/icons/exam.png', label: 'Exam', href: '/home' },
      { icon: '/icons/revision.png', label: 'Revision', href: '/home' },
    ],
  },
  {
    title: 'Tools',
    items: [],
  },
  {
    title: 'Learn',
    items: [],
  },
];

export function getMainSidebarNavSections(activeHref) {
  return MAIN_SIDEBAR_NAV_SECTIONS.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      active: item.href === activeHref,
    })),
  }));
}
