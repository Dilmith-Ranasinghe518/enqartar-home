export const MAIN_SIDEBAR_NAV_SECTIONS = [
  {
    title: null,
    items: [
      { icon: '/icons/home.png', label: 'Home', href: '/' },
      { icon: '/icons/course.png', label: 'Dashboard', href: '/courses' },
      { icon: '/icons/search.png', label: 'Research', href: '/research' },
      { icon: '/icons/audio.png', label: 'Audio', href: '/audio' },
      
      { icon: '/icons/browser.png', label: 'Browser', href: '/browser' },
      { icon: '/icons/chat.png', label: 'Chatting', href: '/chatting' },
      { icon: '/icons/agent.png', label: 'AI Agent', href: '/ai-agent' },

      { icon: '/icons/shortnote.png', label: 'Short Notes', href: '/short-note' },
      { icon: '/icons/book.png', label: 'Books', href: '/book' },
      { icon: '/icons/live.png', label: 'Live Classes', href: '/live' },
      { icon: '/icons/exam.png', label: 'Exam', href: '/exam-hub' },
      { icon: '/icons/revision.png', label: 'Revision', href: '/revision' },
    ],
  },
  {
    title: 'Tools',
    items: [
      
    ],
  },
  {
    title: 'Learn',
    items: [
      
    ],
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
