import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MAIN_SIDEBAR_NAV_SECTIONS } from './mainSidebarNav';

export default function MobileIconBar({ theme = 'light' }) {
  const pathname = usePathname();
  const isDark = theme === 'dark';

  // Extract all items into a single array for the horizontal bar
  const items = MAIN_SIDEBAR_NAV_SECTIONS.flatMap(section => section.items);

  const bgClass = isDark ? 'bg-slate-950 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900';
  const iconFilter = isDark ? 'brightness-0 invert' : 'brightness-0';

  return (
    <div className={`flex w-full overflow-x-auto border-b lg:hidden px-2 py-1 items-center space-x-6 shadow-sm [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${bgClass}`}>
      {items.map((item, index) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
        
        return (
          <Link
            key={index}
            href={item.href || '#'}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors flex-shrink-0`}
          >
            {typeof item.icon === 'string' ? (
              <Image
                src={item.icon}
                alt={item.label}
                width={26}
                height={26}
                className={`h-[26px] w-[26px] object-contain transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'} ${iconFilter}`}
              />
            ) : (
              item.icon && <item.icon className={`h-[26px] w-[26px] ${isActive ? (isDark ? 'text-white' : 'text-gray-900') : (isDark ? 'text-gray-400' : 'text-gray-500')}`} />
            )}
          </Link>
        );
      })}
    </div>
  );
}
