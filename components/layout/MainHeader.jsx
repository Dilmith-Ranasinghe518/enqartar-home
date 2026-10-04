import React from 'react';
import {
  Bars3Icon as MenuIcon,
  MagnifyingGlassIcon as SearchIcon,
  ShoppingCartIcon,
  UserCircleIcon as UserCircle,
  GlobeAltIcon as Globe,
  ChevronDownIcon as ChevronDown,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/solid';

export default function MainHeader({ onOpenMobileNav, theme = 'dark', onToggleTheme }) {
  const isDark = theme === 'dark';
  
  const headerClasses = isDark
    ? 'border-white/10 bg-slate-950 text-slate-100 backdrop-blur-2xl shadow-md'
    : 'border-slate-200 bg-white text-slate-900 backdrop-blur-2xl shadow-sm';

  const iconButtonBase =
    'rounded-full p-1.5 transition-colors duration-200 focus:outline-none';

  const iconButtonStyles = isDark
    ? `${iconButtonBase} text-gray-200 hover:bg-white/10`
    : `${iconButtonBase} text-gray-700 hover:bg-slate-100`;

  const textButtonClasses = isDark
    ? 'text-gray-200 hover:text-white'
    : 'text-gray-700 hover:text-gray-900';

  const accentButtonClasses = isDark
    ? 'px-3 py-1 text-sm font-semibold text-gray-100 transition-colors duration-150 hover:text-white/90 bg-white/10 rounded-full backdrop-blur border border-white/20'
    : 'px-3 py-1 text-sm font-semibold text-gray-900 transition-colors duration-150 hover:text-gray-900 bg-gradient-to-r from-white/95 via-slate-50/60 to-white/70 rounded-full backdrop-blur border border-slate-200';

  const themeButtonClasses = isDark
    ? 'flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-gray-100 transition-colors hover:bg-white/20'
    : 'flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-gray-800 transition-colors hover:bg-slate-200';

  return (
    <header className={`flex h-14 items-center justify-between border-b px-4 ${headerClasses}`}>
      {/* Left side: Hamburger menu + Logo */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          className={iconButtonStyles}
          onClick={onOpenMobileNav}
          aria-label="Open navigation"
        >
          <MenuIcon className="h-6 w-6" />
        </button>

        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex h-6 w-6 items-center justify-center rounded-md bg-[#0a66c2] text-sm font-bold uppercase text-white shadow-md">
            in
          </div>
          <span className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Brainnix
          </span>
        </div>
      </div>

      {/* Right side: Navigation Items */}
      <div className="flex items-center gap-3 sm:gap-4 text-sm font-medium">
        {/* Search Icon */}
        <button 
          className={`flex items-center gap-1 transition-colors duration-150 ${textButtonClasses}`}
          aria-label="Search"
        >
          <SearchIcon className="h-6 w-6" />
          <span className="hidden md:inline">Search</span>
        </button>

        {/* Cart Icon (Mobile view image එකට අනුව එකතු කර ඇත) */}
        <button 
          className={`flex items-center gap-1 transition-colors duration-150 ${textButtonClasses}`}
          aria-label="Cart"
        >
          <ShoppingCartIcon className="h-6 w-6" />
        </button>

        {/* Log in / User Profile Button */}
        <button className={`flex items-center gap-1 transition-colors duration-150 ${textButtonClasses}`}>
          <UserCircle className="hidden sm:inline h-6 w-6" />
          <span className="font-medium text-sm">Log in</span>
          <ChevronDown className="hidden sm:inline h-4 w-4" />
        </button>

        {/* Desktop-only items (Mobile වලදී hide වේ) */}
        <button className={`hidden md:flex relative items-center gap-1 transition-colors duration-150 ${textButtonClasses}`}>
          <Globe className="h-5 w-5" />
          <span>EN</span>
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500" />
          <ChevronDown className="h-4 w-4" />
        </button>

        <button className={`hidden lg:block ${accentButtonClasses}`}>
          Start my free month
        </button>

        {onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            className={`hidden sm:flex ${themeButtonClasses}`}
            aria-label="Toggle color theme"
          >
            {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            <span>{isDark ? 'Light' : 'Dark'}</span>
          </button>
        )}
      </div>
    </header>
  );
}