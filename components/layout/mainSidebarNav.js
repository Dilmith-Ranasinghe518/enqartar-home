export const MAIN_SIDEBAR_NAV_SECTIONS = [
  {
    title: null,
    items: [
      { id: 'nav-home', icon: '/icons/home.png', label: 'Home', href: '/home' },
      { id: 'nav-dashboard', icon: '/icons/course.png', label: 'Dashboard', href: '#dashboard' },
      { id: 'nav-research', icon: '/icons/search.png', label: 'Research', href: '#research' },
      { id: 'nav-audio', icon: '/icons/audio.png', label: 'Audio', href: '#audio' },
      { id: 'nav-browser', icon: '/icons/browser.png', label: 'Browser', href: '#browser' },
      { id: 'nav-chatting', icon: '/icons/chat.png', label: 'Chatting', href: '#chatting' },
      { id: 'nav-agent', icon: '/icons/agent.png', label: 'AI Agent', href: '#agent' },
      { id: 'nav-shortnote', icon: '/icons/shortnote.png', label: 'Short Notes', href: '#shortnote' },
      { id: 'nav-book', icon: '/icons/book.png', label: 'Books', href: '#book' },
      { id: 'nav-live', icon: '/icons/live.png', label: 'Live Classes', href: '#live' },
      { id: 'nav-exam', icon: '/icons/exam.png', label: 'Exam', href: '#exam' },
      { id: 'nav-revision', icon: '/icons/revision.png', label: 'Revision', href: '#revision' },
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
      active: item.href === activeHref || (item.id === 'nav-home' && (activeHref === '/home' || activeHref === '/')),
    })),
  }));
}
