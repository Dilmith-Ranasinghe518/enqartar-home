'use client';

import React, { useState } from 'react';

export default function NotificationSection() {
  const [inputValue, setInputValue] = useState('');

  // ඉහළින්ම ඇති අඳුරු cards 7 සඳහා array එකක්
  const topCards = Array(7).fill(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Asking Quantum Capital:', inputValue);
    // Connect AI query or API call 
    };

  return (
    <section className="w-full min-h-screen rounded-xl bg-black text-white flex flex-col justify-between p-6 md:p-8 font-sans select-none">
      
      {/* 1. 🔲 TOP SEGMENTED CARDS GRID */}
      <div className="w-full grid grid-cols-4 sm:grid-cols-7 gap-2.5 md:gap-3 max-w-7xl mx-auto">
        {topCards.map((_, index) => (
          <div
            key={index}
            className="aspect-[3/4] sm:aspect-[2/3] w-full bg-[#161617] rounded-[10px] border border-zinc-900/40 transition-all duration-300 hover:bg-[#1c1c1e] hover:border-zinc-800"
          />
        ))}
      </div>

      {/* 2. 🔔 CENTER NOTIFICATIONS BRANDING */}
      <div className="flex-1 flex items-center justify-center my-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-sans text-center">
          notifications
        </h1>
      </div>

      {/* 3. ⌨️ BOTTOM QUANTUM PROMPT INPUT BAR */}
      <div className="w-full max-w-5xl mx-auto pb-4">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative flex items-center bg-[#161617] rounded-xl border border-zinc-900/80 px-5 py-4 transition-all duration-300 focus-within:border-zinc-700/60 focus-within:ring-1 focus-within:ring-zinc-800">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="type what you want here to ask from quantum capital"
              className="w-full bg-transparent text-sm text-zinc-200 placeholder-zinc-500 font-normal tracking-wide focus:outline-none border-none p-0 m-0"
            />
            
            {/* Input එක ඇතුලට යමක් ටයිප් කර ඇති විට දිස්වන කුඩා Submit Indicator එකක් */}
            {inputValue.trim() && (
              <button 
                type="submit" 
                className="absolute right-4 text-xs text-zinc-400 hover:text-white transition-colors uppercase tracking-wider font-bold"
              >
                Ask →
              </button>
            )}
          </div>
        </form>
      </div>

    </section>
  );
}