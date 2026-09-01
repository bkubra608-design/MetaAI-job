import React, { useState } from 'react';
import { X, Key, ShieldCheck, ExternalLink, Sparkles, CheckCircle2, Copy, ArrowRight, UserCheck } from 'lucide-react';
import { useClerkConfig } from '../context/ClerkAuthContext.js';
import { SignIn, SignUp, useUser, useClerk } from '@clerk/clerk-react';
import { CareerYouthEmblem } from './CareerYouthLogo.js';

interface ClerkAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export const ClerkAuthModal: React.FC<ClerkAuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
}) => {
  const { isClerkConfigured, publishableKey, setPublishableKey } = useClerkConfig();
  const [mode, setMode] = useState<'signin' | 'signup' | 'setup'>(
    isClerkConfigured ? initialMode : 'setup'
  );
  const [inputKey, setInputKey] = useState(publishableKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.trim().startsWith('pk_')) {
      setPublishableKey(inputKey.trim());
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        setMode('signin');
      }, 1200);
    }
  };

  const handleCopyEnv = () => {
    navigator.clipboard.writeText(`VITE_CLERK_PUBLISHABLE_KEY="${inputKey || 'pk_test_...'}"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CareerYouthEmblem size={34} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight">CareerYouth</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-400/30">
                  Clerk Authentication
                </span>
              </div>
              <p className="text-[11px] text-slate-300">Secure User Management & Passkeys</p>
            </div>
          </div>
          <button
            id="close-clerk-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs if Clerk is configured */}
        {isClerkConfigured && (
          <div className="flex border-b border-slate-200 bg-slate-50/80 px-6 pt-3 gap-2">
            <button
              onClick={() => setMode('signin')}
              className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 ${
                mode === 'signin'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 ${
                mode === 'signup'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
            <button
              onClick={() => setMode('setup')}
              className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 ml-auto ${
                mode === 'setup'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              API Key Config
            </button>
          </div>
        )}

        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {/* 1. CLERK CONFIGURED: SIGN IN MODE */}
          {isClerkConfigured && mode === 'signin' && (
            <div className="flex flex-col items-center justify-center">
              <SignIn
                routing="hash"
                appearance={{
                  elements: {
                    rootBox: 'w-full',
                    card: 'shadow-none border-0 p-0 w-full',
                    headerTitle: 'text-slate-900 font-bold',
                    headerSubtitle: 'text-slate-500 text-xs',
                    formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs',
                    footerActionLink: 'text-indigo-600 font-bold hover:underline',
                  },
                }}
              />
            </div>
          )}

          {/* 2. CLERK CONFIGURED: SIGN UP MODE */}
          {isClerkConfigured && mode === 'signup' && (
            <div className="flex flex-col items-center justify-center">
              <SignUp
                routing="hash"
                appearance={{
                  elements: {
                    rootBox: 'w-full',
                    card: 'shadow-none border-0 p-0 w-full',
                    headerTitle: 'text-slate-900 font-bold',
                    headerSubtitle: 'text-slate-500 text-xs',
                    formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs',
                    footerActionLink: 'text-indigo-600 font-bold hover:underline',
                  },
                }}
              />
            </div>
          )}

          {/* 3. CLERK SETUP & API KEY GUIDE */}
          {(!isClerkConfigured || mode === 'setup') && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-indigo-950">Clerk Publishable Key Setup</h4>
                  <p className="text-[11px] text-indigo-800/80 leading-relaxed mt-0.5">
                    Connect your free Clerk account to enable social logins (Google, GitHub, Apple), multi-factor auth, and user session management.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveKey} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    VITE_CLERK_PUBLISHABLE_KEY
                  </label>
                  <div className="relative">
                    <input
                      id="clerk-publishable-key-input"
                      type="text"
                      placeholder="pk_test_..."
                      value={inputKey}
                      onChange={(e) => setInputKey(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono text-slate-900 focus:bg-white focus:border-indigo-600 outline-hidden"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Find this in your{' '}
                    <a
                      href="https://dashboard.clerk.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 font-semibold hover:underline inline-flex items-center gap-0.5"
                    >
                      Clerk Dashboard <ExternalLink className="w-2.5 h-2.5" />
                    </a>{' '}
                    → API Keys.
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    id="save-clerk-key-btn"
                    type="submit"
                    disabled={!inputKey.trim().startsWith('pk_')}
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    {savedSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        <span>Connected to Clerk!</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Apply Clerk Key</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyEnv}
                    className="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    title="Copy for .env file"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>{copied ? 'Copied' : '.env'}</span>
                  </button>
                </div>
              </form>

              {/* Step by step help */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>How to connect Clerk in 3 easy steps:</span>
                </div>
                <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
                  <li>
                    Create a free project at{' '}
                    <a
                      href="https://clerk.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 font-semibold underline"
                    >
                      clerk.com
                    </a>
                  </li>
                  <li>Go to <strong>API Keys</strong> in your dashboard and copy the <strong>Publishable key</strong></li>
                  <li>Paste it in the box above or add <code className="bg-slate-200/80 px-1 py-0.5 rounded text-[11px] font-mono">VITE_CLERK_PUBLISHABLE_KEY=pk_test_...</code> to your environment</li>
                </ol>
              </div>

              {/* Instant dismiss / Close */}
              <div className="text-center pt-2">
                <button
                  onClick={onClose}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Continue browsing without Clerk
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
