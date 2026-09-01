import React, { useState } from 'react';
import {
  X,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  Building,
  Sparkles,
  Share2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Bot,
  Send,
  GraduationCap,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { JobWithMatch } from '../types.js';

interface JobDetailsModalProps {
  job: JobWithMatch | null;
  onClose: () => void;
  onToggleSave: (job: JobWithMatch) => void;
  onApply: (job: JobWithMatch) => Promise<void>;
  onAskAi: (jobTitle: string, company: string) => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  onClose,
  onToggleSave,
  onApply,
  onAskAi,
}) => {
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  if (!job) return null;

  const match = job.matchBreakdown;
  const overallScore = job.matchScore ?? match?.overallScore;

  const handleApply = async () => {
    setIsApplying(true);
    try {
      await onApply(job);
      setHasApplied(true);
      // Trigger joyful celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b'],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsApplying(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto">
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative">
          <button
            id="close-job-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pr-8">
            <div className="flex items-center gap-4">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-md"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <Building className="w-8 h-8" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-indigo-300">{job.company}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                    {job.source || 'LinkedIn Job Dataset'}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">{job.title}</h2>
              </div>
            </div>

            {/* AI Match percentage widget in header */}
            {typeof overallScore === 'number' && (
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md">
                <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 flex items-center justify-end gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    CareerMate Fit
                  </div>
                  <div className="text-xl font-black text-white">{overallScore}% Match</div>
                </div>
              </div>
            )}
          </div>

          {/* Meta Tags Row */}
          <div className="flex flex-wrap items-center gap-2.5 mt-6 text-xs text-slate-200">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs font-medium">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs font-medium">
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
              {job.jobType}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs font-medium">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {job.experienceLevel} ({job.minExperienceYears}+ Years)
            </span>
            {job.salary && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                <DollarSign className="w-3.5 h-3.5" />
                {job.salary}
              </span>
            )}
            <span className="text-[11px] text-slate-400 ml-auto hidden sm:inline">
              Posted: {job.postedDate}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* AI Match Diagnostic Box */}
          {match && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-blue-50/50 to-white border border-indigo-200/80 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-indigo-950">CareerMate AI Match Diagnostics</h3>
                    <p className="text-xs text-indigo-700">Detailed algorithmic breakdown against your active profile</p>
                  </div>
                </div>
                <div className="text-base font-black text-indigo-600">{match.overallScore}% Overall</div>
              </div>

              {/* 5-part progress indicator */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 py-3 border-y border-indigo-100/80 text-xs">
                <div>
                  <div className="text-slate-500 font-medium mb-1">Skills Match (40%)</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-indigo-100 overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${match.skillsScore}%` }}></div>
                    </div>
                    <span className="font-bold text-slate-800">{match.skillsScore}%</span>
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 font-medium mb-1">Experience (20%)</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-indigo-100 overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${match.experienceScore}%` }}></div>
                    </div>
                    <span className="font-bold text-slate-800">{match.experienceScore}%</span>
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 font-medium mb-1">Education (15%)</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-indigo-100 overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${match.educationScore}%` }}></div>
                    </div>
                    <span className="font-bold text-slate-800">{match.educationScore}%</span>
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 font-medium mb-1">Location (10%)</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-indigo-100 overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${match.locationScore}%` }}></div>
                    </div>
                    <span className="font-bold text-slate-800">{match.locationScore}%</span>
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 font-medium mb-1">Career Field (10%)</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-indigo-100 overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${match.careerScore}%` }}></div>
                    </div>
                    <span className="font-bold text-slate-800">{match.careerScore}%</span>
                  </div>
                </div>
              </div>

              {/* Why this job matches you explanation */}
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-start gap-2 text-indigo-900 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-indigo-950 font-bold">Why you match:</strong> {match.whyItMatches}
                  </p>
                </div>

                {match.potentialGaps && (
                  <div className="flex items-start gap-2 text-amber-900 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/80 leading-relaxed">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-amber-950 font-bold">Skill Gap Insight:</strong> {match.potentialGaps}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Required Skills Matrix */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              Required Skills & Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map(skill => {
                const isMatching = match?.matchingSkills.includes(skill);
                return (
                  <span
                    key={skill}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                      isMatching
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {isMatching ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : null}
                    <span>{skill}</span>
                    {isMatching && <span className="text-[10px] text-emerald-600 font-bold">(In Profile)</span>}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">About The Role</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{job.description}</p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">Key Responsibilities</h3>
              <ul className="space-y-2">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0"></span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements & Education */}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
                Qualifications & Requirements
              </h3>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
                {job.educationRequirement && (
                  <li className="flex items-start gap-2.5 text-sm font-medium text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <GraduationCap className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                    <span>
                      <strong>Education Requirement:</strong> {job.educationRequirement}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">Perks & Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {job.benefits.map((b, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              id="modal-toggle-save-btn"
              onClick={() => onToggleSave(job)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                job.isSaved
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {job.isSaved ? <BookmarkCheck className="w-4 h-4 text-indigo-600 fill-indigo-600" /> : <Bookmark className="w-4 h-4" />}
              <span>{job.isSaved ? 'Saved in Profile' : 'Save Job'}</span>
            </button>

            <button
              id="modal-share-btn"
              onClick={handleShare}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-xs sm:text-sm font-semibold text-slate-700 transition-colors"
              title="Share job link"
            >
              <Share2 className="w-4 h-4" />
              <span>{shareCopied ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              id="modal-ask-ai-btn"
              onClick={() => {
                onClose();
                onAskAi(job.title, job.company);
              }}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-indigo-100/70 hover:bg-indigo-100 border border-indigo-200 text-xs sm:text-sm font-semibold text-indigo-800 transition-colors"
            >
              <Bot className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Ask CareerMate AI</span>
            </button>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              id="modal-apply-btn"
              disabled={isApplying || hasApplied}
              onClick={handleApply}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 ${
                hasApplied
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
              }`}
            >
              {hasApplied ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Applied! (Tracked)</span>
                </>
              ) : isApplying ? (
                <span>Submitting Application...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Apply Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
