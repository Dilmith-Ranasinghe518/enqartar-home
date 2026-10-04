'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0D0D0E] text-neutral-400 font-sans pt-8 md:pt-40 pb-6 px-4 md:px-8 mt-16 md:mt-40">
      
      {/* 1. 🤍 TOP FLOATING CARD (Accelerate Your Impact) */}
      <div className="relative md:absolute md:top-0 left-1/2 -translate-x-1/2 md:-translate-y-1/2 w-[calc(100%-16px)] md:w-[calc(100%-64px)] max-w-5xl bg-white text-zinc-950 rounded-[24px] p-6 md:p-12 text-center shadow-2xl border border-neutral-200/50 -mt-20 md:mt-0 mb-12 md:mb-0">
        <h3 className="font-bold text-2xl md:text-5xl font-extrabold tracking-tight mb-3 text-zinc-900">
          Accelerate Your Impact, <br/> 
          Become a Sponsor!
        </h3>
        <p className="text-xs md:text-sm text-neutral-500 max-w-2xl mx-auto mb-6 leading-relaxed">
          Maximize Product Visibility and reach your audience by sponsoring our dynamic radio station & podcast platform. Join us in shaping the future of content!
        </p>
        <button
          type="button"
          className="bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs md:text-sm tracking-wider px-6 py-3 rounded-full transition-all active:scale-[0.98]"
        >
          Let&apos;s Talk
        </button>
        <p className="text-[10px] text-neutral-400 mt-3">
          Or send an email to <span className="underline cursor-pointer hover:text-zinc-950">sponsor@yourdomain.com</span>
        </p>
      </div>

      {/* MAIN FOOTER CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto">
        
        {/* 2. 🗂️ GRID LAYOUT FOR LOGO & LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8 pb-12 border-b border-neutral-800/60">
          
          {/* Column 1: Logo & Branding Description (Takes 2 grid spaces on large screens) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white font-bold text-2xl tracking-wider">
              {/* 🎧 Custom Headphones Logo Icon */}
              <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12v7c0 1.1.9 2 2 2h3v-8H4v-1c0-4.41 3.59-8 8-8s8 3.59 8 8v1h-3v8h3c1.1 0 2-.9 2-2v-7c0-5.52-4.48-10-10-10z"/>
              </svg>
              POTSHOW
            </div>
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed max-w-sm">
              Potshow is a full featured WordPress Template Kit created to help you set up and manage your Radio Station & Podcast website in no time.
            </p>
            
            {/* 🎵 Streaming Platform Audio Shortcuts */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              <span className="hover:text-white cursor-pointer transition">Spotify</span>
              <span className="hover:text-white cursor-pointer transition">Apple Podcast</span>
              <span className="hover:text-white cursor-pointer transition">Google Podcast</span>
              <span className="hover:text-white cursor-pointer transition">Soundcloud</span>
            </div>
          </div>

          {/* Column 2: Page List Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-wide">Page List</h4>
            <ul className="flex flex-col gap-2.5 text-xs md:text-sm text-neutral-500">
              <li className="hover:text-white cursor-pointer transition-colors">👉 Podcasts</li>
              <li className="hover:text-white cursor-pointer transition-colors">👉 Radio Station</li>
              <li className="hover:text-white cursor-pointer transition-colors">👉 About Us 1</li>
              <li className="hover:text-white cursor-pointer transition-colors">👉 About Us 2</li>
              <li className="hover:text-white cursor-pointer transition-colors">👉 Features</li>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-wide">Useful Links</h4>
            <ul className="flex flex-col gap-2.5 text-xs md:text-sm text-neutral-500">
              <li className="hover:text-white cursor-pointer transition-colors">Useful Links</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms & Conditions</li>
              <li className="hover:text-white cursor-pointer transition-colors">Disclaimer</li>
              <li className="hover:text-white cursor-pointer transition-colors">Support</li>
              <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
            </ul>
          </div>

          {/* Column 4: Work Hours Details */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-wide">Work Hours</h4>
            <ul className="flex flex-col gap-2 text-xs md:text-sm text-neutral-500">
              <li><span className="text-neutral-400 font-medium">Mon - Fri:</span> 09:00 - 17:00</li>
              <li><span className="text-neutral-400 font-medium">Sat:</span> 09:00 - 15:00</li>
              <li><span className="text-neutral-400 font-medium">Sun:</span> 09:00 - 13:00</li>
            </ul>
          </div>

        </div>

        {/* 3. 📝 BOTTOM COPYRIGHT & SOCIAL BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[11px] md:text-xs text-neutral-600 font-medium">
          <div>
            © Potshow Radio Station & Podcast WordPress Theme.
          </div>
          
          {/* 🌐 Social Icons Layout */}
          <div className="flex items-center gap-4 text-sm">
            <span className="hover:text-white cursor-pointer transition"><i className="fab fa-facebook"></i> FB</span>
            <span className="hover:text-white cursor-pointer transition"><i className="fab fa-twitter"></i> TW</span>
            <span className="hover:text-white cursor-pointer transition"><i className="fab fa-instagram"></i> IG</span>
          </div>
        </div>

      </div>
    </footer>
  );
}