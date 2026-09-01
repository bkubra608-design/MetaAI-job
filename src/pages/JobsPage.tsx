import React from 'react';
import { JobWithMatch } from '../types.js';
import { JobCard } from '../components/JobCard.js';
import { JobFilters } from '../components/JobFilters.js';
import { Briefcase, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface FilterState {
  search: string;
  location: string;
  experience: string;
  jobType: string;
  careerField: string;
  skills: string[];
  sort: string;
}

interface JobsPageProps {
  jobs: JobWithMatch[];
  totalJobs: number;
  currentPage: number;
  totalPages: number;
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  onPageChange: (page: number) => void;
  onSelectJob: (job: JobWithMatch) => void;
  onToggleSave: (job: JobWithMatch, e: React.MouseEvent) => void;
  isLoading: boolean;
}

export const JobsPage: React.FC<JobsPageProps> = ({
  jobs,
  totalJobs,
  currentPage,
  totalPages,
  filters,
  onFilterChange,
  onResetFilters,
  onPageChange,
  onSelectJob,
  onToggleSave,
  isLoading,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            <Briefcase className="w-4 h-4" />
            <span>Job Explorer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Explore Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse verified job listings from LinkedIn with personalized AI match scores.
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl bg-indigo-50 border border-indigo-200/80 text-xs font-semibold text-indigo-800 self-start sm:self-auto">
          {totalJobs} Jobs Available
        </div>
      </div>

      {/* Filter Component */}
      <JobFilters
        filters={filters}
        onFilterChange={onFilterChange}
        onReset={onResetFilters}
        totalResults={totalJobs}
      />

      {/* Jobs Grid / Loading / Empty */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 rounded-2xl bg-slate-100 border border-slate-200/70 p-5"></div>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-white border border-slate-200 shadow-xs max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">No jobs match your criteria</h3>
          <p className="text-xs text-slate-500 mb-6">
            Try adjusting your search terms, removing filters, or clearing location constraints.
          </p>
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onSelect={onSelectJob}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            id="prev-page-btn"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="flex items-center gap-1 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  p === currentPage
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            id="next-page-btn"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="flex items-center gap-1 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
