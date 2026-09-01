import React, { useState } from 'react';
import {
  Briefcase,
  Sparkles,
  Bot,
  Building2,
  Bookmark,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Compass,
  Layers,
  ChevronDown,
  FileCheck2,
  BrainCircuit,
  Info,
  ShieldCheck,
  Key,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { useClerkConfig } from '../context/ClerkAuthContext.js';
import { CareerYouthLogo, CareerYouthEmblem } from './CareerYouthLogo.js';
import { UserButton, useUser, useClerk } from '@clerk/clerk-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAuthModal: () => void;
  openChatDrawer: () => void;
  openClerkModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openAuthModal,
  openChatDrawer,
  openClerkModal,
}) => {
  const { user, profile, logout, switchDemoUser } = useAuth();
  const { isClerkConfigured, openClerkModal: triggerClerkModal } = useClerkConfig();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isDemoDropdownOpen, setIsDemoDropdownOpen] = useState(false);

  const handleOpenClerk = () => {
    if (openClerkModal) {
      openClerkModal();
    } else {
      triggerClerkModal('signin');
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'jobs', label: 'Explore Jobs', icon: Briefcase },
    { id: 'recommendations', label: 'AI Recommendations', icon: Sparkles, badge: 'AI' },
    { id: 'skill-gap', label: 'Skill Gap', icon: BrainCircuit },
    { id: 'applications', label: 'Tracker', icon: FileCheck2 },
    { id: 'companies', label: 'Companies', icon: Building2 },
    { id: 'how-it-works', label: 'How It Works', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo with signature corporate inverted triangle + necktie */}
          <div className="flex items-center gap-8">
            <button
              id="brand-logo-btn"
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-3 text-left group focus:outline-hidden"
              title="CareerYouth - Find the Job That Matches You"
            >
              <CareerYouthEmblem size={38} className="group-hover:scale-105 transition-transform" />
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-xl font-black tracking-tight text-slate-900">
                    Career<span className="text-indigo-600">Youth</span>
                  </span>
                </div>
                <span className="hidden sm:block text-[11px] font-medium text-slate-500 tracking-tight leading-none mt-1">
                  Find the Job That Matches You
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => setActiveTab(link.id)}
                    className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="ml-0.5 px-1.5 py-0.2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Clerk Status / Setup Quick Pill */}
            <button
              id="clerk-status-btn"
              onClick={handleOpenClerk}
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100/80 text-[11px] font-semibold text-indigo-700 transition-colors shadow-2xs"
              title="Clerk Authentication Configuration & Social Logins"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>{isClerkConfigured ? 'Clerk Active' : 'Clerk Auth'}</span>
            </button>

            {/* CareerMate AI quick launcher */}
            <button
              id="open-careermate-ai-btn"
              onClick={openChatDrawer}
              className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200/80 text-indigo-700 text-xs sm:text-sm font-semibold hover:bg-indigo-100/80 shadow-2xs hover:shadow-xs transition-all"
            >
              <Bot className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span className="hidden sm:inline">Ask CareerMate AI</span>
              <span className="sm:hidden">CareerMate</span>
            </button>

            {/* Demo user quick switcher */}
            <div className="relative hidden md:block">
              <button
                id="demo-switcher-btn"
                onClick={() => setIsDemoDropdownOpen(!isDemoDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors"
                title="Switch pre-configured candidate profiles"
              >
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                <span>Demo Profiles</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isDemoDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={() => setIsDemoDropdownOpen(false)}
                >
                  <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    Instant Candidate Switcher
                  </div>
                  <button
                    onClick={() => {
                      switchDemoUser('ahmed@example.com');
                      setIsDemoDropdownOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-indigo-50 text-xs text-slate-800 flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">Ahmed Khan</div>
                      <div className="text-slate-500 text-[11px]">Full Stack Dev (React, Node, Mongo)</div>
                    </div>
                    {profile?.email === 'ahmed@example.com' && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      switchDemoUser('sara@example.com');
                      setIsDemoDropdownOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-indigo-50 text-xs text-slate-800 flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">Sara Tariq</div>
                      <div className="text-slate-500 text-[11px]">Data Scientist (Python, ML, SQL)</div>
                    </div>
                    {profile?.email === 'sara@example.com' && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Auth / Profile Area */}
            {user ? (
              <div className="relative">
                <button
                  id="user-menu-btn"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 transition-all text-slate-800"
                >
                  {profile?.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-200"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                      {profile?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <span className="hidden sm:inline text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                    {profile?.name || user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isUserDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in"
                    onMouseLeave={() => setIsUserDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-900">{profile?.name || user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{profile?.email || user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                        {profile?.desiredRole || 'Job Seeker'}
                      </span>
                    </div>

                    <button
                      id="dropdown-dashboard-btn"
                      onClick={() => {
                        setActiveTab('home');
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      <Compass className="w-4 h-4 text-slate-400" />
                      <span>Dashboard</span>
                    </button>

                    <button
                      id="dropdown-profile-btn"
                      onClick={() => {
                        setActiveTab('profile');
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      <span>My Profile & Skills</span>
                    </button>

                    <button
                      id="dropdown-saved-btn"
                      onClick={() => {
                        setActiveTab('saved');
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      <Bookmark className="w-4 h-4 text-slate-400" />
                      <span>Saved Jobs</span>
                    </button>

                    <button
                      id="dropdown-tracker-btn"
                      onClick={() => {
                        setActiveTab('applications');
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      <FileCheck2 className="w-4 h-4 text-slate-400" />
                      <span>Application Tracker</span>
                    </button>

                    <button
                      id="dropdown-clerk-btn"
                      onClick={() => {
                        handleOpenClerk();
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-indigo-700 hover:bg-indigo-50 rounded-xl transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-indigo-600" />
                      <span>Clerk Auth Settings</span>
                    </button>

                    <div className="border-t border-slate-100 my-1 pt-1">
                      <button
                        id="dropdown-logout-btn"
                        onClick={() => {
                          logout();
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="navbar-login-btn"
                  onClick={handleOpenClerk}
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  Sign In
                </button>
                <button
                  id="navbar-signup-btn"
                  onClick={handleOpenClerk}
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                handleOpenClerk();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold text-xs flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Clerk Authentication & Settings</span>
            </button>

            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 pt-1">Demo Profiles</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  switchDemoUser('ahmed@example.com');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2 rounded-lg bg-slate-50 text-xs font-semibold text-slate-700 text-left border border-slate-200"
              >
                Ahmed (Full Stack)
              </button>
              <button
                onClick={() => {
                  switchDemoUser('sara@example.com');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2 rounded-lg bg-slate-50 text-xs font-semibold text-slate-700 text-left border border-slate-200"
              >
                Sara (Data Scientist)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
