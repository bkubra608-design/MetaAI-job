import React, { useState, useEffect } from 'react';
import {
  FileCheck2,
  Bookmark,
  Building,
  MapPin,
  Clock,
  Sparkles,
  Calendar,
  Trash2,
  ExternalLink,
  ChevronRight,
  Plus,
  Edit3,
} from 'lucide-react';
import { JobApplication, JobWithMatch, SavedJobRecord } from '../types.js';
import { useAuth } from '../context/AuthContext.js';

interface ApplicationsPageProps {
  onSelectJobById: (jobId: string) => void;
  setActiveTab: (tab: string) => void;
}

const KANBAN_COLUMNS: Array<{ id: JobApplication['status']; label: string; color: string }> = [
  { id: 'Saved', label: 'Saved', color: 'border-slate-300 text-slate-700 bg-slate-100' },
  { id: 'Applied', label: 'Applied', color: 'border-blue-300 text-blue-800 bg-blue-50' },
  { id: 'Interview', label: 'Interview', color: 'border-indigo-300 text-indigo-800 bg-indigo-50' },
  { id: 'Offer', label: 'Offer Received', color: 'border-emerald-300 text-emerald-800 bg-emerald-50' },
  { id: 'Rejected', label: 'Archived', color: 'border-rose-200 text-rose-700 bg-rose-50' },
];

export const ApplicationsPage: React.FC<ApplicationsPageProps> = ({
  onSelectJobById,
  setActiveTab,
}) => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<'kanban' | 'saved'>('kanban');
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [savedJobs, setSavedJobs] = useState<(SavedJobRecord & { job: JobWithMatch })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const headers = { Authorization: `Bearer ${user?.id || 'user-ahmed-001'}` };
      const [appRes, savedRes] = await Promise.all([
        fetch('/api/applications', { headers }),
        fetch('/api/saved-jobs', { headers }),
      ]);

      if (appRes.ok) {
        const appData = await appRes.json();
        setApplications(appData);
      }
      if (savedRes.ok) {
        const savedData = await savedRes.json();
        setSavedJobs(savedData);
      }
    } catch (err) {
      console.error('Error fetching tracker data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.id]);

  const handleStatusChange = async (appId: string, newStatus: JobApplication['status']) => {
    try {
      const res = await fetch(`/api/applications/${appId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.id || 'user-ahmed-001'}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setApplications(prev =>
          prev.map(a => (a.id === appId ? { ...a, status: newStatus, updatedAt: new Date().toISOString() } : a))
        );
      }
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  const handleRemoveSaved = async (jobId: string) => {
    try {
      await fetch(`/api/saved-jobs/${jobId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user?.id || 'user-ahmed-001'}` },
      });
      setSavedJobs(prev => prev.filter(s => s.jobId !== jobId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            <FileCheck2 className="w-4 h-4" />
            <span>Opportunity Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Job Application Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Monitor your job pipeline, track stage progress, and manage saved opportunities.
          </p>
        </div>

        {/* View Switcher Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setActiveView('kanban')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeView === 'kanban'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kanban Pipeline ({applications.length})
          </button>
          <button
            onClick={() => setActiveView('saved')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeView === 'saved'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Saved Jobs ({savedJobs.length})
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      {activeView === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
          {KANBAN_COLUMNS.map(column => {
            const columnApps = applications.filter(a => a.status === column.id);

            return (
              <div
                key={column.id}
                className="bg-slate-50/80 rounded-3xl border border-slate-200/80 p-4 space-y-3 min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${column.color}`}>
                      {column.label}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-400">{columnApps.length}</span>
                </div>

                {/* Cards in column */}
                <div className="space-y-3">
                  {columnApps.map(app => (
                    <div
                      key={app.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-2.5"
                    >
                      <div>
                        <div className="text-[11px] font-bold text-slate-400 uppercase truncate">
                          {app.company}
                        </div>
                        <h4
                          onClick={() => onSelectJobById(app.jobId)}
                          className="text-xs sm:text-sm font-bold text-slate-900 hover:text-indigo-600 cursor-pointer line-clamp-1 mt-0.5"
                        >
                          {app.jobTitle}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {app.location}
                        </span>
                        {app.matchScore && (
                          <span className="font-bold text-emerald-600">{app.matchScore}% Match</span>
                        )}
                      </div>

                      {app.notes && (
                        <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 italic">
                          "{app.notes}"
                        </p>
                      )}

                      {/* Status select dropdown */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                        <span className="text-[10px] text-slate-400 font-medium">Move to:</span>
                        <select
                          value={app.status}
                          onChange={(e) =>
                            handleStatusChange(app.id, e.target.value as JobApplication['status'])
                          }
                          className="px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 text-[10px] font-semibold text-slate-800 focus:bg-white outline-hidden"
                        >
                          <option value="Saved">Saved</option>
                          <option value="Applied">Applied</option>
                          <option value="Interview">Interview</option>
                          <option value="Offer">Offer</option>
                          <option value="Rejected">Archived</option>
                        </select>
                      </div>
                    </div>
                  ))}

                  {columnApps.length === 0 && (
                    <div className="p-6 text-center text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
                      No jobs in {column.label}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Saved Jobs Directory View */}
      {activeView === 'saved' && (
        <div className="space-y-4">
          {savedJobs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 max-w-md mx-auto space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No saved jobs yet</h3>
              <p className="text-xs text-slate-500">
                Click the bookmark icon on any job card to save it for later review and application tracking.
              </p>
              <button
                onClick={() => setActiveTab('jobs')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-xs hover:bg-indigo-700 transition-colors"
              >
                Browse Job Listings
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedJobs.map(item => (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold text-slate-500">{item.job.company}</span>
                        <h3 className="text-base font-bold text-slate-900 mt-0.5">{item.job.title}</h3>
                      </div>
                      <button
                        onClick={() => handleRemoveSaved(item.jobId)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100">{item.job.location}</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100">{item.job.jobType}</span>
                      {item.job.salary && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-semibold">
                          {item.job.salary}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Saved {new Date(item.savedAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => onSelectJobById(item.jobId)}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
                    >
                      View & Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
