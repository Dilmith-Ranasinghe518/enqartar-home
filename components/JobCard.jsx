'use client';

import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';

// රූපයේ ඇති පරිදි දත්ත ලැයිස්තුව (Mock Data)
const initialJobs = [
  {
    id: 1,
    title: 'Building end-to-end crowdfunding application',
    type: 'Remote work',
    salary: '$4,000 - $12,000',
    applicants: '14 Applicant',
    description: 'We are looking for a talented and experienced developer to join our team to develop a new crowdfunding app. As a Crowdfunding App Developer, you will be responsible for designing, developing, and implementing the app, ensuring it is user-friendly, functional, and secure.',
    tags: [
      { label: 'Kotlin', bg: 'bg-blue-50 text-blue-600 border-blue-100' },
      { label: 'iOS Developer', bg: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
      { label: 'Software Engineer', bg: 'bg-purple-50 text-purple-600 border-purple-100' }
    ],
    postedAt: 'Posted 5 mins ago',
    isBookmarked: false,
    logoBg: 'bg-black text-white',
    logoLetter: '▲'
  },
  {
    id: 2,
    title: 'UX Copywriter for company profile landing page',
    type: 'Fulltime',
    salary: '$9,000 - $22,000',
    applicants: '120 Applicant',
    description: 'We are seeking a talented UX Copywriter to join our team to create an engaging and effective company profile landing page. As the UX Copywriter for the Company Profile Landing Page, you will work closely with our marketing and design teams to craft compelling, persuasive, and user-friendly copy.',
    tags: [
      { label: 'UX Copywriter', bg: 'bg-orange-50 text-orange-600 border-orange-100' },
      { label: 'Company Profile', bg: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
      { label: 'UX Writer', bg: 'bg-teal-50 text-teal-600 border-teal-100' }
    ],
    postedAt: 'Posted 2 days ago',
    isBookmarked: true,
    logoBg: 'bg-gradient-to-tr from-teal-400 to-emerald-500 text-white',
    logoLetter: '❖'
  }
];

function JobCard({ job, onToggleBookmark }) {
  return (
    <div className="w-full bg-white border border-zinc-100 rounded-[16px] p-5 md:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between gap-5">
      
      {/* Upper Area: Logo, Title and Bookmark */}
      <div className="w-full flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Company Logo Icon */}
          <div className={`h-11 w-11 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 ${job.logoBg}`}>
            {job.logoLetter}
          </div>
          
          {/* Title & Meta info */}
          <div className="space-y-1">
            <h3 className="text-[16px] md:text-[17px] font-bold text-zinc-900 leading-snug hover:text-[#027947] cursor-pointer transition-colors">
              {job.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] font-medium text-zinc-400">
              <span>{job.type}</span>
              <span className="text-zinc-300">•</span>
              <span className="text-zinc-600 font-semibold">{job.salary}</span>
              <span className="text-zinc-300">•</span>
              <span>{job.applicants}</span>
            </div>
          </div>
        </div>

        {/* Bookmark Action Button */}
        <button
          type="button"
          onClick={() => onToggleBookmark(job.id)}
          className={`p-2 rounded-lg border transition-colors shrink-0 ${
            job.isBookmarked 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
              : 'bg-zinc-50 border-zinc-100 text-zinc-400 hover:text-zinc-600'
          }`}
        >
          <Bookmark size={18} fill={job.isBookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Middle Area: Job Description */}
      <p className="text-[13px] md:text-[14px] text-zinc-500 leading-relaxed font-normal line-clamp-3 md:line-clamp-none">
        {job.description}
      </p>

      {/* Lower Area: Dynamic Badges & Timestamp */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 border-t border-zinc-50/80">
        {/* Skill Badges List */}
        <div className="flex flex-wrap items-center gap-2">
          {job.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 text-[12px] font-medium rounded-md border ${tag.bg}`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Time Segment */}
        <span className="text-[12px] font-medium text-zinc-400 whitespace-nowrap">
          {job.postedAt}
        </span>
      </div>

    </div>
  );
}

export default function JobListSection() {
  const [jobs, setJobs] = useState(initialJobs);

  const handleToggleBookmark = (id) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === id ? { ...job, isBookmarked: !job.isBookmarked } : job
      )
    );
  };

  return (
    <div className="w-full mx-auto px-4 py-10 bg-zinc-50/50 ">
      <div className="flex flex-col gap-5 w-full">
        {jobs.map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            onToggleBookmark={handleToggleBookmark} 
          />
        ))}
      </div>
    </div>
  );
}