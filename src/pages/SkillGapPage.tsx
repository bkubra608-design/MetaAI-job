import React, { useState, useEffect } from 'react';
import {
  BrainCircuit,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  BookOpen,
  ArrowRight,
  Target,
  Layers,
  GraduationCap,
  Bot,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { SkillGapAnalysis } from '../types.js';

interface SkillGapPageProps {
  openChatDrawer: () => void;
}

const COMMON_ROLES = [
  'Full Stack Developer',
  'Frontend Engineer',
  'Backend Engineer',
  'Data Scientist & AI Specialist',
  'Machine Learning Engineer',
  'DevOps & Cloud Engineer',
  'Cybersecurity Analyst',
  'UI/UX Product Designer',
];

export const SkillGapPage: React.FC<SkillGapPageProps> = ({ openChatDrawer }) => {
  const { user, profile } = useAuth();
  const [selectedRole, setSelectedRole] = useState(profile?.desiredRole || 'Full Stack Developer');
  const [analysis, setAnalysis] = useState<SkillGapAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSkillGap = async (role: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/skill-gap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.id || 'user-ahmed-001'}`,
        },
        body: JSON.stringify({ targetRole: role }),
      });
      if (res.ok) {
        const data = await res.json();
        setAnalysis(data);
      }
    } catch (err) {
      console.error('Skill gap error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillGap(selectedRole);
  }, [selectedRole, profile?.skills]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>AI Career Roadmaps</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">AI Skill Gap Diagnostics</h1>
          <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
            CareerMate AI compares your registered skill profile with active market requirements and generates a tailored step-by-step learning path.
          </p>
        </div>

        <button
          onClick={openChatDrawer}
          className="px-5 py-3 rounded-xl bg-white text-indigo-950 hover:bg-indigo-50 font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2 shrink-0"
        >
          <Bot className="w-4 h-4 text-indigo-600" />
          <span>Ask CareerMate AI</span>
        </button>
      </div>

      {/* Target Role Selector */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>Select Target Career Role</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Analyze your current readiness for any position in the market.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden"
            >
              {COMMON_ROLES.map(role => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Role Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {COMMON_ROLES.map(role => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedRole === role
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Result */}
      {isLoading ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 animate-pulse space-y-4">
          <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <BrainCircuit className="w-6 h-6 animate-spin" />
          </div>
          <p className="text-sm font-semibold text-slate-700">CareerMate AI is analyzing market requirements...</p>
        </div>
      ) : analysis ? (
        <div className="space-y-6">
          {/* Readiness Meter & Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col items-center justify-center text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
                Overall Role Readiness
              </div>

              <div className="relative w-32 h-32 flex items-center justify-center my-2">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-indigo-600"
                    strokeDasharray={`${analysis.matchPercentage}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-slate-900">{analysis.matchPercentage}%</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Readiness</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 max-w-xs mt-2 leading-relaxed">
                {analysis.readinessSummary}
              </p>
            </div>

            {/* Mastered vs Missing Matrix */}
            <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
              {/* Mastered */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Mastered Skills for this Role ({analysis.masteredSkills.length})</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.masteredSkills.map(s => (
                    <span
                      key={s}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold"
                    >
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing / High Priority */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5 mb-3">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>High-Impact Skills to Acquire ({analysis.missingSkills.length})</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {analysis.missingSkills.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            item.importance === 'High'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.importance} Priority
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">{item.reason}</p>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 pt-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Est. Learning Time: {item.estimatedTimeToLearn}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3-Step Recommended Learning Path */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
                <GraduationCap className="w-4 h-4" />
                <span>Structured Roadmap</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Recommended 3-Step Learning Path for {selectedRole}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Follow this sequential trajectory to bridge your skill gaps and unlock senior-tier compensation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {analysis.recommendedLearningPath.map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                      {step.step}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-200/80">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Key Competencies:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {step.skills.map(sk => (
                        <span key={sk} className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {sk}
                        </span>
                      ))}
                    </div>

                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pt-1">
                      Recommended Resources:
                    </div>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {step.resources.map((res, rIdx) => (
                        <li key={rIdx} className="flex items-center gap-1.5 text-[11px]">
                          <BookOpen className="w-3 h-3 text-indigo-500 shrink-0" />
                          <span className="truncate">{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
