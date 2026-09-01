import React from 'react';
import { Briefcase, Sparkles, Heart, Shield, Code2, Database } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-md">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">CareerMatch AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Find the Job That Matches You. Your Skills. Your Career. Your Next Opportunity.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-indigo-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Powered by CareerMate AI</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('jobs')} className="hover:text-white transition-colors">
                  Explore Job Listings
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('recommendations')} className="hover:text-white transition-colors">
                  AI Job Recommendations
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('skill-gap')} className="hover:text-white transition-colors">
                  Skill Gap Diagnostics
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('applications')} className="hover:text-white transition-colors">
                  Application Tracker
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('companies')} className="hover:text-white transition-colors">
                  Companies Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Career Domains */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Top Domains</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('jobs')} className="hover:text-white transition-colors">
                  Software Engineering
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('jobs')} className="hover:text-white transition-colors">
                  Data Science & Machine Learning
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('jobs')} className="hover:text-white transition-colors">
                  Cloud & DevOps Engineering
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('jobs')} className="hover:text-white transition-colors">
                  Cybersecurity & Network Defense
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('jobs')} className="hover:text-white transition-colors">
                  Product Management & UI/UX
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Dataset & Architecture */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Dataset & Transparency</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Built using verified job listings collected from LinkedIn for educational and matching evaluation purposes.
            </p>
            <div className="flex flex-col gap-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>LinkedIn Job Dataset Pre-Seeded</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Full Stack React + Express + Gemini AI</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} CareerMatch AI. All rights reserved. Find the Job That Matches You.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('how-it-works')} className="hover:text-slate-300">
              Algorithm Methodology
            </button>
            <button onClick={() => setActiveTab('profile')} className="hover:text-slate-300">
              Profile Privacy
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">CareerMate AI v2.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
