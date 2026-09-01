import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import { ClerkWrapper, ClerkUserSync, useClerkConfig } from './context/ClerkAuthContext.js';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { HomePage } from './pages/HomePage.js';
import { JobsPage } from './pages/JobsPage.js';
import { RecommendationsPage } from './pages/RecommendationsPage.js';
import { SkillGapPage } from './pages/SkillGapPage.js';
import { ApplicationsPage } from './pages/ApplicationsPage.js';
import { CompaniesPage } from './pages/CompaniesPage.js';
import { ProfilePage } from './pages/ProfilePage.js';
import { HowItWorksPage } from './pages/HowItWorksPage.js';
import { JobDetailsModal } from './components/JobDetailsModal.js';
import { AuthModal } from './components/AuthModal.js';
import { ClerkAuthModal } from './components/ClerkAuthModal.js';
import { CareerMateDrawer } from './components/CareerMateDrawer.js';
import { JobWithMatch } from './types.js';
import { Bot, Sparkles } from 'lucide-react';

const INITIAL_FILTERS = {
  search: '',
  location: 'all',
  experience: 'all',
  jobType: 'all',
  careerField: 'all',
  skills: [] as string[],
  sort: 'relevance',
};

const MainContent: React.FC = () => {
  const { user, profile, token } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedJob, setSelectedJob] = useState<JobWithMatch | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isClerkModalOpen, setIsClerkModalOpen] = useState(false);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [chatInitialQuery, setChatInitialQuery] = useState<string | undefined>(undefined);

  // Jobs state
  const [jobs, setJobs] = useState<JobWithMatch[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<JobWithMatch[]>([]);
  const [recommendations, setRecommendations] = useState<JobWithMatch[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [isJobsLoading, setIsJobsLoading] = useState(false);
  const [isRecsLoading, setIsRecsLoading] = useState(false);

  // Fetch Jobs based on filters & pagination
  const fetchJobs = async () => {
    setIsJobsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '9',
        sort: filters.sort,
      });
      if (filters.search) params.append('q', filters.search);
      if (filters.location !== 'all') params.append('location', filters.location);
      if (filters.experience !== 'all') params.append('experience', filters.experience);
      if (filters.jobType !== 'all') params.append('jobType', filters.jobType);
      if (filters.careerField !== 'all') params.append('careerField', filters.careerField);
      if (filters.skills.length > 0) params.append('skills', filters.skills.join(','));

      const res = await fetch(`/api/jobs?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token || 'user-ahmed-001'}` },
      });
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
        setTotalJobs(data.total || 0);
        setTotalPages(data.totalPages || 1);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setIsJobsLoading(false);
    }
  };

  // Fetch Featured Jobs
  const fetchFeatured = async () => {
    try {
      const res = await fetch('/api/jobs/featured', {
        headers: { Authorization: `Bearer ${token || 'user-ahmed-001'}` },
      });
      if (res.ok) {
        const data = await res.json();
        setFeaturedJobs(data);
      }
    } catch (err) {
      console.error('Error fetching featured jobs:', err);
    }
  };

  // Fetch Recommendations
  const fetchRecommendations = async () => {
    setIsRecsLoading(true);
    try {
      const res = await fetch('/api/recommendations', {
        headers: { Authorization: `Bearer ${token || 'user-ahmed-001'}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRecommendations(data.recommendations || []);
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
    } finally {
      setIsRecsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters, currentPage, token]);

  useEffect(() => {
    fetchFeatured();
    fetchRecommendations();
  }, [token, profile?.skills]);

  // Toggle Save Job
  const handleToggleSave = async (job: JobWithMatch, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      if (job.isSaved) {
        await fetch(`/api/saved-jobs/${job.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token || 'user-ahmed-001'}` },
        });
      } else {
        await fetch(`/api/saved-jobs/${job.id}`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token || 'user-ahmed-001'}` },
        });
      }

      // Update local states
      const updatedSaved = !job.isSaved;
      setJobs(prev => prev.map(j => (j.id === job.id ? { ...j, isSaved: updatedSaved } : j)));
      setFeaturedJobs(prev => prev.map(j => (j.id === job.id ? { ...j, isSaved: updatedSaved } : j)));
      setRecommendations(prev => prev.map(j => (j.id === job.id ? { ...j, isSaved: updatedSaved } : j)));
      if (selectedJob && selectedJob.id === job.id) {
        setSelectedJob({ ...selectedJob, isSaved: updatedSaved });
      }
    } catch (err) {
      console.error('Error saving job:', err);
    }
  };

  // Quick Apply
  const handleApply = async (job: JobWithMatch) => {
    await fetch(`/api/applications/${job.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || 'user-ahmed-001'}`,
      },
      body: JSON.stringify({ status: 'Applied', notes: 'Submitted via CareerYouth' }),
    });
  };

  // Open Chat with custom prompt
  const handleAskAiAboutJob = (jobTitle: string, company: string) => {
    setChatInitialQuery(`Tell me more about the ${jobTitle} role at ${company} and why my profile matches it.`);
    setIsChatDrawerOpen(true);
  };

  const handleSelectJobById = async (jobId: string) => {
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token || 'user-ahmed-001'}` },
      });
      if (res.ok) {
        const jobData = await res.json();
        setSelectedJob(jobData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectCompanyJobs = (companyName: string) => {
    setFilters({ ...INITIAL_FILTERS, search: companyName });
    setActiveTab('jobs');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuthModal={() => setIsAuthModalOpen(true)}
        openClerkModal={() => setIsClerkModalOpen(true)}
        openChatDrawer={() => {
          setChatInitialQuery(undefined);
          setIsChatDrawerOpen(true);
        }}
      />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            featuredJobs={featuredJobs}
            onSelectJob={setSelectedJob}
            onToggleSave={handleToggleSave}
            setActiveTab={setActiveTab}
            openChatDrawer={() => {
              setChatInitialQuery(undefined);
              setIsChatDrawerOpen(true);
            }}
            openAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {activeTab === 'jobs' && (
          <JobsPage
            jobs={jobs}
            totalJobs={totalJobs}
            currentPage={currentPage}
            totalPages={totalPages}
            filters={filters}
            onFilterChange={(newF) => {
              setFilters(newF);
              setCurrentPage(1);
            }}
            onResetFilters={() => {
              setFilters(INITIAL_FILTERS);
              setCurrentPage(1);
            }}
            onPageChange={setCurrentPage}
            onSelectJob={setSelectedJob}
            onToggleSave={handleToggleSave}
            isLoading={isJobsLoading}
          />
        )}

        {activeTab === 'recommendations' && (
          <RecommendationsPage
            recommendations={recommendations}
            onSelectJob={setSelectedJob}
            onToggleSave={handleToggleSave}
            setActiveTab={setActiveTab}
            openChatDrawer={() => {
              setChatInitialQuery(undefined);
              setIsChatDrawerOpen(true);
            }}
            isLoading={isRecsLoading}
          />
        )}

        {activeTab === 'skill-gap' && (
          <SkillGapPage
            openChatDrawer={() => {
              setChatInitialQuery(undefined);
              setIsChatDrawerOpen(true);
            }}
          />
        )}

        {activeTab === 'applications' && (
          <ApplicationsPage
            onSelectJobById={handleSelectJobById}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'saved' && (
          <ApplicationsPage
            onSelectJobById={handleSelectJobById}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'companies' && (
          <CompaniesPage onSelectCompanyJobs={handleSelectCompanyJobs} />
        )}

        {activeTab === 'profile' && (
          <ProfilePage
            setActiveTab={setActiveTab}
            openChatDrawer={() => {
              setChatInitialQuery(undefined);
              setIsChatDrawerOpen(true);
            }}
          />
        )}

        {activeTab === 'how-it-works' && (
          <HowItWorksPage
            setActiveTab={setActiveTab}
            openChatDrawer={() => {
              setChatInitialQuery(undefined);
              setIsChatDrawerOpen(true);
            }}
          />
        )}
      </main>

      {/* Floating CareerMate AI Button in bottom right */}
      <button
        id="floating-careermate-btn"
        onClick={() => {
          setChatInitialQuery(undefined);
          setIsChatDrawerOpen(true);
        }}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 px-4 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all"
      >
        <div className="relative">
          <Bot className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-indigo-600 rounded-full"></span>
        </div>
        <span className="hidden sm:inline">Ask CareerMate AI</span>
      </button>

      {/* Modals & Drawers */}
      <JobDetailsModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onToggleSave={handleToggleSave}
        onApply={handleApply}
        onAskAi={handleAskAiAboutJob}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onOpenClerkModal={() => setIsClerkModalOpen(true)}
      />

      <ClerkAuthModal
        isOpen={isClerkModalOpen}
        onClose={() => setIsClerkModalOpen(false)}
      />

      <CareerMateDrawer
        isOpen={isChatDrawerOpen}
        onClose={() => setIsChatDrawerOpen(false)}
        initialQuery={chatInitialQuery}
        onViewJob={handleSelectJobById}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export function App() {
  return (
    <ClerkWrapper>
      <AuthProvider>
        <ClerkUserSync />
        <MainContent />
      </AuthProvider>
    </ClerkWrapper>
  );
}

export default App;
