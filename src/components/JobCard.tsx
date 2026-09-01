import React from 'react';
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  Building,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { JobWithMatch } from '../types.js';
import { MatchScoreBadge } from './MatchScoreBadge.js';

interface JobCardProps {
  job: JobWithMatch;
  onSelect: (job: JobWithMatch) => void;
  onToggleSave: (job: JobWithMatch, e: React.MouseEvent) => void;
  onQuickApply?: (job: JobWithMatch, e: React.MouseEvent) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onSelect,
  onToggleSave,
}) => {
  const matchScore = job.matchScore ?? job.matchBreakdown?.overallScore;

  return (
    <div
      id={`job-card-${job.id}`}
      onClick={() => onSelect(job)}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 cursor-pointer overflow-hidden"
    >
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.company}
                className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-2xs group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
                <Building className="w-6 h-6" />
              </div>
            )}

            <div>
              <h4 className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                {job.company}
                {job.source && (
                  <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-normal">
                    {job.source}
                  </span>
                )}
              </h4>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mt-0.5">
                {job.title}
              </h3>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            id={`bookmark-btn-${job.id}`}
            onClick={(e) => onToggleSave(job, e)}
            className={`p-2 rounded-xl border transition-colors ${
              job.isSaved
                ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
            title={job.isSaved ? 'Remove from saved' : 'Save job'}
          >
            {job.isSaved ? (
              <BookmarkCheck className="w-4 h-4 fill-indigo-600" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Badges & Meta row */}
        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-slate-600">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/60 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {job.location}
          </span>

          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/60 font-medium">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            {job.jobType}
          </span>

          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/60 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {job.experienceLevel} ({job.minExperienceYears}+ yrs)
          </span>

          {job.salary && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50/70 border border-emerald-200/60 text-emerald-800 font-semibold">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              {job.salary}
            </span>
          )}
        </div>

        {/* Skills Chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.skills.slice(0, 4).map((skill, idx) => {
            const isMatch = job.matchBreakdown?.matchingSkills?.includes(skill);
            return (
              <span
                key={idx}
                className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                  isMatch
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {skill}
              </span>
            );
          })}
          {job.skills.length > 4 && (
            <span className="text-[11px] text-slate-400 px-1.5 py-0.5">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>

        {/* AI Match Reason Snapshot */}
        {job.matchBreakdown?.whyItMatches && (
          <div className="mb-4 p-2.5 rounded-xl bg-indigo-50/50 border border-indigo-100 text-[11px] text-indigo-950 flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
            <p className="line-clamp-2 leading-relaxed">
              <span className="font-semibold text-indigo-700">CareerMate AI:</span>{' '}
              {job.matchBreakdown.whyItMatches.replace(/^CareerMate AI analyzed your profile for [^.]+\. /, '')}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          {typeof matchScore === 'number' ? (
            <MatchScoreBadge score={matchScore} size="sm" />
          ) : (
            <span className="text-[11px] text-slate-400">Sign in for Match %</span>
          )}
        </div>

        <button
          id={`view-job-btn-${job.id}`}
          onClick={() => onSelect(job)}
          className="flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:text-indigo-700 group-hover:translate-x-0.5 transition-all"
        >
          <span>View Job Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
