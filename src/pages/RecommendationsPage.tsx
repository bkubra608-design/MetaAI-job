import React from 'react';
import { Sparkles, Bot, ArrowRight, CheckCircle2, AlertCircle, Bookmark, BookmarkCheck, User } from 'lucide-react';
import { JobWithMatch } from '../types.js';
import { MatchScoreBadge } from '../components/MatchScoreBadge.js';
import { useAuth } from '../context/AuthContext.js';

interface RecommendationsPageProps {
  recommendations: JobWithMatch[];
  onSelectJob: (job: JobWithMatch) => void;
  onToggleSave: (job: JobWithMatch, e: React.MouseEvent) => void;
  setActiveTab: (tab: string) => void;
  openChatDrawer: () => void;
  isLoading: boolean;
}

export const RecommendationsPage: React.FC<RecommendationsPageProps> = ({
  recommendations,
  onSelectJob,
  onToggleSave,
  setActiveTab,
  openChatDrawer,
  isLoading,
}) => {
  const { user, profile } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CareerMate AI Match Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">AI Job Recommendations</h1>
            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
              CareerMate AI found these opportunities based on your skills (**{profile?.skills?.slice(0, 4).join(', ') || 'tech stack'}**), experience level, education, and career preferences.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('profile')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold backdrop-blur-xs transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Update Profile</span>
            </button>

            <button
              onClick={openChatDrawer}
              className="px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>Ask CareerMate AI</span>
            </button>
          </div>
        </div>

        {/* Profile Strength Strip */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-indigo-300 font-medium">Target Role</div>
            <div className="text-white font-bold mt-0.5">{profile?.desiredRole || 'Full Stack Developer'}</div>
          </div>
          <div>
            <div className="text-indigo-300 font-medium">Profile Skills Count</div>
            <div className="text-white font-bold mt-0.5">{profile?.skills?.length || 0} Registered Skills</div>
          </div>
          <div>
            <div className="text-indigo-300 font-medium">Experience Level</div>
            <div className="text-white font-bold mt-0.5">{profile?.yearsOfExperienceTotal || 2} Years Industry Exp</div>
          </div>
          <div>
            <div className="text-indigo-300 font-medium">Matching Confidence</div>
            <div className="text-emerald-400 font-bold mt-0.5">High (Weighted Matrix)</div>
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-44 rounded-2xl bg-slate-100 border border-slate-200"></div>
          ))}
        </div>
      ) : recommendations.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-700">No recommendations found. Try adding more skills to your profile!</p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider px-1">
            <span>Ranked by CareerMate Alignment Score</span>
            <span>{recommendations.length} Matches Found</span>
          </div>

          {recommendations.map((job, index) => {
            const match = job.matchBreakdown;
            const score = job.matchScore ?? match?.overallScore ?? 80;

            return (
              <div
                key={job.id}
                id={`recommendation-card-${job.id}`}
                className="group relative p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer"
                onClick={() => onSelectJob(job)}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  {/* Left: Job & Company Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="relative">
                      {job.companyLogo ? (
                        <img
                          src={job.companyLogo}
                          alt={job.company}
                          className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shadow-2xs"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                          {job.company.charAt(0)}
                        </div>
                      )}
                      <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center border-2 border-white">
                        #{index + 1}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">{job.company}</span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {job.jobType}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {job.location}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {job.title}
                      </h3>
                      {job.salary && (
                        <div className="text-xs font-bold text-emerald-700">{job.salary}</div>
                      )}
                    </div>
                  </div>

                  {/* Right: Score Breakdown Visual Widget */}
                  <div className="w-full lg:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    <MatchScoreBadge score={score} size="md" />

                    {match && (
                      <div className="grid grid-cols-3 gap-3 text-[11px] text-slate-600 min-w-[200px]">
                        <div>
                          <div className="text-slate-400 font-medium">Skills</div>
                          <div className="font-bold text-slate-800">{match.skillsScore}%</div>
                        </div>
                        <div>
                          <div className="text-slate-400 font-medium">Experience</div>
                          <div className="font-bold text-slate-800">{match.experienceScore}%</div>
                        </div>
                        <div>
                          <div className="text-slate-400 font-medium">Education</div>
                          <div className="font-bold text-slate-800">{match.educationScore}%</div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={(e) => onToggleSave(job, e)}
                        className={`p-2.5 rounded-xl border transition-colors ${
                          job.isSaved
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                            : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
                        }`}
                        title={job.isSaved ? 'Saved' : 'Save'}
                      >
                        {job.isSaved ? <BookmarkCheck className="w-4 h-4 fill-indigo-600" /> : <Bookmark className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => onSelectJob(job)}
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Why It Matches Explanation */}
                {match?.whyItMatches && (
                  <div className="mt-4 p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-950 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong className="font-bold text-indigo-900">CareerMate AI Insight:</strong> {match.whyItMatches}
                    </p>
                  </div>
                )}

                {/* Skills Tag Matrix (Matching vs Missing) */}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400 font-medium text-[11px]">Skill Alignment:</span>
                  {job.skills.map(skill => {
                    const isMatching = match?.matchingSkills.includes(skill);
                    return (
                      <span
                        key={skill}
                        className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 ${
                          isMatching
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {isMatching ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertCircle className="w-3 h-3 text-amber-600" />}
                        <span>{skill}</span>
                        <span className="opacity-70 text-[10px]">({isMatching ? 'Matched' : 'Missing'})</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
