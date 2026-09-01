import React from 'react';
import {
  BrainCircuit,
  Award,
  Layers,
  Sparkles,
  Bot,
  Database,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

interface HowItWorksPageProps {
  setActiveTab: (tab: string) => void;
  openChatDrawer: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ setActiveTab, openChatDrawer }) => {
  const criteria = [
    {
      name: 'Skills Match',
      weight: '40%',
      color: 'bg-indigo-600',
      description: 'Jaccard and semantic similarity between candidate technical competencies and required job tags.',
    },
    {
      name: 'Experience Level',
      weight: '20%',
      color: 'bg-blue-600',
      description: 'Candidate cumulative years of experience compared to the minimum experience threshold for the role.',
    },
    {
      name: 'Education Requirement',
      weight: '15%',
      color: 'bg-emerald-600',
      description: 'Degree level hierarchy (Bachelors, Masters, PhD) and field of study alignment with job specifications.',
    },
    {
      name: 'Location Match',
      weight: '10%',
      color: 'bg-cyan-600',
      description: 'City alignment or Remote status compatibility.',
    },
    {
      name: 'Career Field Alignment',
      weight: '10%',
      color: 'bg-amber-600',
      description: 'Domain alignment (Software Engineering, Data Science, AI/ML, DevOps, Cybersecurity, etc.).',
    },
    {
      name: 'Job Type Compatibility',
      weight: '5%',
      color: 'bg-purple-600',
      description: 'Full Time, Part Time, Contract, Internship, or Hybrid preference agreement.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-full">
          Matching Methodology
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          How CareerYouth Works
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Our deterministic and AI-enhanced matching engine maps job seeker profiles to live verified job listings without keyword guessing.
        </p>
      </div>

      {/* 6-Part Algorithmic Breakdown */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
          <BrainCircuit className="w-6 h-6 text-indigo-600" />
          <span>Weighted Multi-Factor Scoring Formula (0 - 100%)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {criteria.map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">{item.name}</span>
                  <span className="text-xs font-black text-white px-2 py-0.5 rounded-md bg-indigo-600">
                    {item.weight}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dataset & Compliance */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <Database className="w-6 h-6 text-emerald-400" />
          <h3 className="text-lg font-bold">Verified LinkedIn Job Dataset</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          CareerYouth operates on curated, structured job data collected for educational and portfolio demonstration purposes. All listings include normalized tech stacks, explicit minimum experience thresholds, clear educational criteria, and salary transparency benchmarks.
        </p>
      </div>

      {/* Frequently Asked Questions */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
            <h4 className="font-bold text-slate-900">How is my match score calculated?</h4>
            <p className="text-slate-600 leading-relaxed">
              When you view a job, CareerMate AI evaluates your registered skills (40%), experience length (20%), education (15%), location preferences (10%), career field (10%), and contract type (5%) to calculate a weighted percentage between 0 and 100%.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
            <h4 className="font-bold text-slate-900">How does the Skill Gap Analyzer work?</h4>
            <p className="text-slate-600 leading-relaxed">
              CareerMate AI compares your current skillset against all active postings for your target role, highlighting missing competencies with priority ratings and estimated learning durations.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center space-y-4 pt-4">
        <button
          onClick={() => setActiveTab('recommendations')}
          className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all inline-flex items-center gap-2"
        >
          <span>Explore Your AI Recommendations</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
