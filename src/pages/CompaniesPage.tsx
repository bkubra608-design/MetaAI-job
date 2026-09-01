import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Users, Globe, ExternalLink, ArrowRight, Briefcase } from 'lucide-react';
import { CompanyInfo } from '../types.js';

interface CompaniesPageProps {
  onSelectCompanyJobs: (companyName: string) => void;
}

export const CompaniesPage: React.FC<CompaniesPageProps> = ({ onSelectCompanyJobs }) => {
  const [companies, setCompanies] = useState<CompanyInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/companies')
      .then(res => res.json())
      .then(data => setCompanies(data))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
          <Building2 className="w-4 h-4" />
          <span>Employer Directory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Featured Tech Companies
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore top enterprise software, AI labs, and high-growth organizations hiring on CareerYouth.
        </p>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 rounded-3xl bg-slate-100 border border-slate-200"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map(comp => (
            <div
              key={comp.name}
              className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src={comp.logo}
                    alt={comp.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shadow-2xs"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{comp.name}</h3>
                    <p className="text-xs font-medium text-indigo-600">{comp.industry}</p>
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {comp.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{comp.description}</p>

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {comp.employeeCount} team
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                    <Briefcase className="w-3.5 h-3.5" />
                    {comp.openJobsCount} Open Positions
                  </span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={comp.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-medium"
                >
                  <span>Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => onSelectCompanyJobs(comp.name)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors"
                >
                  <span>View Open Jobs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
