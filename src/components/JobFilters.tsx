import React, { useState } from 'react';
import {
  Search,
  Filter,
  X,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface FilterState {
  search: string;
  location: string;
  experience: string;
  jobType: string;
  careerField: string;
  skills: string[];
  sort: string;
}

interface JobFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const POPULAR_SKILLS = [
  'JavaScript',
  'Python',
  'React',
  'Node.js',
  'MongoDB',
  'SQL',
  'TypeScript',
  'Java',
  'C++',
  'Machine Learning',
  'Deep Learning',
  'AWS',
  'Docker',
  'Git',
  'Figma',
  'UI/UX',
  'FastAPI',
  'Kubernetes',
];

export const CAREER_FIELDS = [
  'Software Engineering',
  'Data Science',
  'Artificial Intelligence',
  'Cybersecurity',
  'Web Development',
  'Mobile Development',
  'UI/UX',
  'Marketing',
  'Finance',
  'Business',
  'HR',
  'Sales',
];

export const LOCATIONS = [
  'Remote',
  'Lahore',
  'Karachi',
  'Islamabad',
  'Quetta',
  'Peshawar',
];

export const EXPERIENCE_LEVELS = [
  'Internship',
  'Entry Level',
  'Junior',
  'Mid Level',
  'Senior',
  'Lead',
];

export const JOB_TYPES = [
  'Full Time',
  'Part Time',
  'Contract',
  'Internship',
  'Remote',
  'Hybrid',
];

export const JobFilters: React.FC<JobFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.search);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ ...filters, search: localSearch });
  };

  const handleSkillToggle = (skill: string) => {
    const exists = filters.skills.includes(skill);
    const updated = exists
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    onFilterChange({ ...filters, skills: updated });
  };

  const activeFiltersCount =
    (filters.location !== 'all' && filters.location ? 1 : 0) +
    (filters.experience !== 'all' && filters.experience ? 1 : 0) +
    (filters.jobType !== 'all' && filters.jobType ? 1 : 0) +
    (filters.careerField !== 'all' && filters.careerField ? 1 : 0) +
    filters.skills.length +
    (filters.search ? 1 : 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-6 mb-6">
      {/* Top Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            id="job-search-input"
            type="text"
            placeholder="Search by job title, skill (e.g. React, Python), keyword, company, or city..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium text-slate-900 transition-all outline-hidden"
          />
          {localSearch && (
            <button
              type="button"
              onClick={() => {
                setLocalSearch('');
                onFilterChange({ ...filters, search: '' });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            id="job-search-submit-btn"
            type="submit"
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>

          <button
            id="toggle-filters-btn"
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`px-4 py-3 rounded-xl border font-semibold text-sm transition-all flex items-center gap-2 ${
              isExpanded || activeFiltersCount > 0
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </form>

      {/* Expandable Filter Grid */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-slate-100 space-y-6 animate-in fade-in slide-in-from-top-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Career Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Career Field
              </label>
              <select
                id="filter-career-field"
                value={filters.careerField}
                onChange={(e) => onFilterChange({ ...filters, careerField: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden"
              >
                <option value="all">All Career Fields</option>
                {CAREER_FIELDS.map(f => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Location
              </label>
              <select
                id="filter-location"
                value={filters.location}
                onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden"
              >
                <option value="all">All Locations</option>
                {LOCATIONS.map(l => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Experience Level
              </label>
              <select
                id="filter-experience"
                value={filters.experience}
                onChange={(e) => onFilterChange({ ...filters, experience: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden"
              >
                <option value="all">All Experience Levels</option>
                {EXPERIENCE_LEVELS.map(exp => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Job Type
              </label>
              <select
                id="filter-job-type"
                value={filters.jobType}
                onChange={(e) => onFilterChange({ ...filters, jobType: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden"
              >
                <option value="all">All Job Types</option>
                {JOB_TYPES.map(jt => (
                  <option key={jt} value={jt}>
                    {jt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Multi-Select Skills Chips */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Filter by Required Skills
              </label>
              {filters.skills.length > 0 && (
                <button
                  type="button"
                  onClick={() => onFilterChange({ ...filters, skills: [] })}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  Clear skills ({filters.skills.length})
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SKILLS.map(skill => {
                const isSelected = filters.skills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? `✓ ${skill}` : `+ ${skill}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter Footer Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="text-xs text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-900">{totalResults}</span> matching job listings
            </div>

            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <button
                  id="clear-filters-btn"
                  type="button"
                  onClick={() => {
                    setLocalSearch('');
                    onReset();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sorting bar & Quick stats bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 font-medium">Quick Filters:</span>
          {['Remote', 'Full Time', 'React', 'Python', 'AI / ML'].map(quick => {
            const isMatch =
              filters.search.toLowerCase().includes(quick.toLowerCase()) ||
              filters.location.toLowerCase() === quick.toLowerCase() ||
              filters.skills.includes(quick);
            return (
              <button
                key={quick}
                onClick={() => {
                  if (quick === 'Remote') {
                    onFilterChange({ ...filters, location: filters.location === 'Remote' ? 'all' : 'Remote' });
                  } else if (quick === 'Full Time') {
                    onFilterChange({ ...filters, jobType: filters.jobType === 'Full Time' ? 'all' : 'Full Time' });
                  } else {
                    setLocalSearch(quick);
                    onFilterChange({ ...filters, search: quick });
                  }
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                  isMatch
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {quick}
              </button>
            );
          })}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-slate-500 font-medium whitespace-nowrap">Sort by:</label>
          <select
            id="sort-select"
            value={filters.sort}
            onChange={(e) => onFilterChange({ ...filters, sort: e.target.value })}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden"
          >
            <option value="relevance">Relevance & Match</option>
            <option value="highest-match">Highest AI Match %</option>
            <option value="newest">Newest Postings</option>
            <option value="oldest">Oldest Postings</option>
            <option value="company">Company Name (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
