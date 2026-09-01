import React from 'react';
import { Sparkles } from 'lucide-react';

interface MatchScoreBadgeProps {
  score?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const MatchScoreBadge: React.FC<MatchScoreBadgeProps> = ({
  score = 0,
  size = 'md',
  showLabel = true,
}) => {
  // Color styling based on score
  let bgClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  let ringClass = 'text-emerald-600';
  let badgeText = 'Strong Match';

  if (score >= 90) {
    bgClass = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    ringClass = 'text-emerald-600';
    badgeText = 'Top Match';
  } else if (score >= 75) {
    bgClass = 'bg-indigo-50 text-indigo-700 border-indigo-200';
    ringClass = 'text-indigo-600';
    badgeText = 'Great Match';
  } else if (score >= 60) {
    bgClass = 'bg-amber-50 text-amber-800 border-amber-200';
    ringClass = 'text-amber-600';
    badgeText = 'Good Match';
  } else {
    bgClass = 'bg-slate-50 text-slate-700 border-slate-200';
    ringClass = 'text-slate-500';
    badgeText = 'Potential Fit';
  }

  if (size === 'sm') {
    return (
      <div
        id={`match-badge-sm-${score}`}
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold ${bgClass}`}
      >
        <Sparkles className={`w-3 h-3 ${ringClass}`} />
        <span>{score}% Match</span>
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div
        id={`match-badge-lg-${score}`}
        className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs"
      >
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={score >= 80 ? 'text-emerald-500' : score >= 65 ? 'text-indigo-500' : 'text-amber-500'}
              strokeDasharray={`${score}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-base font-bold text-slate-900 leading-none">{score}%</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600">
            <Sparkles className="w-3.5 h-3.5" />
            AI Match Score
          </div>
          <div className="text-base font-bold text-slate-900 mt-0.5">{badgeText}</div>
          <div className="text-xs text-slate-500 mt-0.5">Calculated by CareerMate AI</div>
        </div>
      </div>
    );
  }

  // Medium default
  return (
    <div
      id={`match-badge-md-${score}`}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-semibold ${bgClass} transition-all`}
    >
      <Sparkles className={`w-3.5 h-3.5 ${ringClass}`} />
      <span>{score}% Match</span>
      {showLabel && <span className="opacity-75 text-xs font-medium">({badgeText})</span>}
    </div>
  );
};
