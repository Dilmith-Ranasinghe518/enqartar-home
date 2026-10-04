'use client';

import React, { useState } from 'react';
import { PlusIcon, MinusIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const faqData = [
  {
    question: "What services does your digital agency offer?",
    answer: "We provide comprehensive digital solutions including custom web development, brand identity design, and result-driven digital marketing strategies tailored for your business."
  },
  {
    question: "What industries do you specialize in?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    question: "What is your process for working with clients?",
    answer: "Our workflow is structured around transparency; starting from discovery, moving through design and development, and ending with dedicated support and optimization."
  },
  {
    question: "What platforms and technologies do you specialize in?",
    answer: "We are experts in modern frameworks like Next.js, React, and Tailwind CSS, as well as robust backend technologies to ensure your platform is scalable and fast."
  },
  {
    question: "How can your agency help my business grow online?",
    answer: "By optimizing your user experience and implementing high-converting marketing funnels, we help turn your visitors into loyal customers."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(1);

  return (
    <section className="-mx-4 sm:mx-0 w-[calc(100%+2rem)] sm:w-full bg-white rounded-none sm:rounded-2xl py-10 sm:py-16 md:py-20 px-0 sm:px-6 font-sans">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* TOP HEADER SECTION */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16 px-4 sm:px-0">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-[2px] bg-[#cbf33b]"></div>
            <span className="text-xs font-black tracking-[0.3em] text-neutral-400 uppercase">FAQs</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] md:text-[50px] font-bold text-neutral-900 tracking-tight leading-tight">
            Question? Look here.
          </h2>
        </div>

        {/* ACCORDION SECTION */}
        <div className="space-y-3 sm:space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className={`transition-all duration-400 ease-in-out rounded-none sm:rounded-[20px] overflow-hidden ${
                  isOpen 
                    ? 'bg-[#cbf33b] shadow-lg border-none' 
                    : 'bg-[#efefef] hover:bg-[#e0e0e0]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between py-5 sm:py-6 md:py-7 px-4 sm:px-6 md:px-8 text-left focus:outline-none"
                >
                  <span className="text-[15px] sm:text-[17px] md:text-[19px] font-bold text-neutral-900 pr-4 sm:pr-8">
                    {item.question}
                  </span>
                  
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <MinusIcon className="h-5 w-5 md:h-6 md:w-6 text-neutral-900 stroke-[3px]" />
                    ) : (
                      <PlusIcon className="h-5 w-5 md:h-6 md:w-6 text-neutral-400 stroke-[2px]" />
                    )}
                  </div>
                </button>

                {/* Animated Answer Wrapper */}
                <div 
                  className={`grid transition-all duration-400 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-6 md:px-8 pb-6 md:pb-8 text-[13px] sm:text-[14px] md:text-[15px] leading-[1.6] text-neutral-800 font-medium max-w-full md:max-w-[90%]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA SECTION */}
        <div className="text-center mt-12 sm:mt-18 md:mt-24 px-4 sm:px-0">
          <h3 className="text-[24px] sm:text-[30px] md:text-[38px] font-bold text-neutral-900 mb-6 sm:mb-8 md:mb-10 tracking-tight">
            Still have a questions?
          </h3>
          
          {/* IMAGE STYLE BUTTON */}
          <div className="flex justify-center">
            <button className="flex items-center gap-4 sm:gap-6 bg-[#cbf33b] hover:bg-[#b8da32] transition-colors p-1.5 sm:p-2 pl-6 sm:pl-10 rounded-full group">
              <span className="text-black font-extrabold text-[13px] sm:text-[15px] tracking-wide uppercase">
                Contact Us
              </span>
              <div className="bg-black rounded-full p-3 sm:p-4 transition-transform group-hover:translate-x-1">
                <ArrowRightIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white stroke-[4px]" />
              </div>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}