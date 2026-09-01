import React from 'react';
import {
  Sparkles,
  Search,
  Briefcase,
  Bot,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  BrainCircuit,
  FileCheck2,
  Users,
  Compass,
} from 'lucide-react';
import { JobWithMatch } from '../types.js';
import { JobCard } from '../components/JobCard.js';
import { useAuth } from '../context/AuthContext.js';

interface HomePageProps {
  featuredJobs: JobWithMatch[];
  onSelectJob: (job: JobWithMatch) => void;
  onToggleSave: (job: JobWithMatch, e: React.MouseEvent) => void;
  setActiveTab: (tab: string) => void;
  openChatDrawer: () => void;
  openAuthModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  featuredJobs,
  onSelectJob,
  onToggleSave,
  setActiveTab,
  openChatDrawer,
  openAuthModal,
}) => {
  const { user, profile } = useAuth();

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-white">
        {/* Background glow orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-60">
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl"></div>
          <div className="absolute top-12 right-1/4 w-80 h-80 bg-cyan-300/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold shadow-2xs">
                <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
                <span>Next-Gen AI Job Matching • CareerMate AI</span>
              </div>

              {/* Title & Tagline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
                Find the Job That <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Matches You.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                CareerMatch AI analyzes your <strong className="text-slate-800">skills, experience, education, and career goals</strong> to discover high-affinity opportunities from our curated LinkedIn dataset.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="hero-explore-jobs-btn"
                  onClick={() => setActiveTab('jobs')}
                  className="px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Find My Job</span>
                </button>

                <button
                  id="hero-recommendations-btn"
                  onClick={() => setActiveTab('recommendations')}
                  className="px-6 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 text-slate-800 font-bold text-sm sm:text-base shadow-2xs transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>View AI Matches</span>
                </button>

                <button
                  id="hero-ask-careermate-btn"
                  onClick={openChatDrawer}
                  className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm sm:text-base transition-colors flex items-center gap-2"
                >
                  <Bot className="w-4 h-4 text-indigo-600" />
                  <span>Ask CareerMate</span>
                </button>
              </div>

              {/* Verified Trust Strip */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Weighted Multi-Factor Match</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Skill Gap Diagnostics</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Dataset</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive AI Match Simulation Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-white/95 border border-slate-200/90 shadow-2xl p-6 backdrop-blur-md">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">CareerMate Match Engine</div>
                      <div className="text-[11px] text-slate-400">Live Profile Alignment</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    94% High Affinity
                  </span>
                </div>

                {/* Candidate Snapshot */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 mb-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                    <span>Active Profile: {profile?.name || 'Ahmed Khan'}</span>
                    <span className="text-indigo-600 font-semibold text-[11px]">
                      {profile?.desiredRole || 'Full Stack Dev'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(profile?.skills || ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git']).slice(0, 5).map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Algorithmic Weighting Bars */}
                <div className="space-y-3 text-xs mb-5">
                  <div>
                    <div className="flex justify-between text-slate-600 font-semibold mb-1">
                      <span>Skills Match (40% Weight)</span>
                      <span className="text-emerald-600 font-bold">100% Match</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 font-semibold mb-1">
                      <span>Experience Alignment (20% Weight)</span>
                      <span className="text-indigo-600 font-bold">90% Match</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 font-semibold mb-1">
                      <span>Education & Degree (15% Weight)</span>
                      <span className="text-indigo-600 font-bold">95% Match</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 font-semibold mb-1">
                      <span>Location & Career Preferences (25% Weight)</span>
                      <span className="text-cyan-600 font-bold">92% Match</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Instant Action inside teaser */}
                <button
                  onClick={() => setActiveTab('recommendations')}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Explore Your Matched Jobs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PLATFORM METRICS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
          <div className="text-center p-2">
            <div className="text-3xl sm:text-4xl font-black text-indigo-300">100%</div>
            <div className="text-xs text-slate-300 mt-1 font-medium">Dataset Alignment</div>
          </div>
          <div className="text-center p-2">
            <div className="text-3xl sm:text-4xl font-black text-cyan-300">6+</div>
            <div className="text-xs text-slate-300 mt-1 font-medium">Matching Criteria</div>
          </div>
          <div className="text-center p-2">
            <div className="text-3xl sm:text-4xl font-black text-emerald-300">92%+</div>
            <div className="text-xs text-slate-300 mt-1 font-medium">AI Accuracy Rate</div>
          </div>
          <div className="text-center p-2">
            <div className="text-3xl sm:text-4xl font-black text-amber-300">0s</div>
            <div className="text-xs text-slate-300 mt-1 font-medium">Instant Recommendations</div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED JOB OPPORTUNITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Curated Opportunities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Featured Job Listings
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              High-impact roles matched against your active profile and preferences.
            </p>
          </div>

          <button
            id="view-all-jobs-btn"
            onClick={() => setActiveTab('jobs')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold shadow-2xs transition-colors"
          >
            <span>Explore All Jobs</span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.slice(0, 6).map(job => (
            <JobCard
              key={job.id}
              job={job}
              onSelect={onSelectJob}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      </section>

      {/* 4. HOW CAREERMATCH AI WORKS (4 PILLARS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Intelligent Matching Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-3 tracking-tight">
            How CareerMatch AI Connects You to Ideal Roles
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            No keyword lottery. Our multi-factor algorithm maps your real qualifications to job requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">1. Profile & Skills Ingestion</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Input your tech stack, degree, university, years of experience, and desired career track.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-4">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">2. Weighted AI Scoring</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Skills (40%), Experience (20%), Education (15%), Field (10%), Location (10%), and Job Type (5%).
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">3. Match Explanations</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              CareerMate AI writes plain-English summaries explaining why each opportunity fits your background.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center mb-4">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">4. Pipeline Kanban Tracking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Save favorite roles and track applications from Saved to Applied, Interview, Offer, or Rejection.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CAREERMATE AI PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-4 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Bot className="w-4 h-4" />
              <span>CareerMate AI Assistant</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Have questions about your resume, skill gaps, or target roles?
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
              Ask CareerMate AI anything. Get instant role recommendations, customized 3-step learning roadmaps, and salary negotiation insights.
            </p>
            <div className="pt-2">
              <button
                id="cta-chat-with-careermate-btn"
                onClick={openChatDrawer}
                className="px-6 py-3 rounded-xl bg-white text-indigo-950 hover:bg-indigo-50 font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-indigo-600" />
                <span>Chat with CareerMate AI</span>
              </button>
            </div>
          </div>

          <div className="w-full max-w-md bg-white/10 rounded-2xl p-4 border border-white/20 backdrop-blur-md space-y-2.5">
            <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1">
              Sample Prompts to Try:
            </div>
            {[
              'What jobs match my profile?',
              'Which skills am I missing for Full Stack roles?',
              'What should I learn to become a Data Scientist?',
            ].map((p, i) => (
              <button
                key={i}
                onClick={openChatDrawer}
                className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-white flex items-center justify-between transition-colors"
              >
                <span>"{p}"</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
