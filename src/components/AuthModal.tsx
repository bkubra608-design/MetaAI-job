import React, { useState } from 'react';
import { X, Lock, Mail, User, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register, switchDemoUser } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      if (isRegisterMode) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoSelect = async (demoEmail: string) => {
    setError('');
    setIsSubmitting(true);
    try {
      await switchDemoUser(demoEmail);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 sm:p-8">
        <button
          id="close-auth-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-2xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {isRegisterMode ? 'Create your CareerMatch account' : 'Welcome back to CareerMatch AI'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isRegisterMode
              ? 'Start matching your skills with live curated LinkedIn opportunities'
              : 'Sign in to access your AI match recommendations & application tracker'}
          </p>
        </div>

        {/* Instant Demo Accounts */}
        <div className="mb-6 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2 text-center">
            🚀 1-Click Instant Demo Login
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              id="demo-login-ahmed"
              type="button"
              onClick={() => handleDemoSelect('ahmed@example.com')}
              disabled={isSubmitting}
              className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-left transition-all text-xs group"
            >
              <div className="font-bold text-slate-900 group-hover:text-indigo-600 flex items-center justify-between">
                <span>Ahmed Khan</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600" />
              </div>
              <div className="text-[10px] text-slate-500">Full Stack Dev (React, Node)</div>
            </button>

            <button
              id="demo-login-sara"
              type="button"
              onClick={() => handleDemoSelect('sara@example.com')}
              disabled={isSubmitting}
              className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-left transition-all text-xs group"
            >
              <div className="font-bold text-slate-900 group-hover:text-indigo-600 flex items-center justify-between">
                <span>Sara Tariq</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600" />
              </div>
              <div className="text-[10px] text-slate-500">Data Scientist (Python, ML)</div>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400 font-semibold text-[10px]">Or continue with email</span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegisterMode && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="auth-name-input"
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-500 outline-hidden"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="auth-email-input"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-500 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="auth-password-input"
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-500 outline-hidden"
              />
            </div>
          </div>

          <button
            id="auth-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? (
              <span>Processing...</span>
            ) : isRegisterMode ? (
              <span>Create Free Account</span>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center mt-5 text-xs text-slate-500">
          {isRegisterMode ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegisterMode(false)}
                className="font-bold text-indigo-600 hover:underline"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setIsRegisterMode(true)}
                className="font-bold text-indigo-600 hover:underline"
              >
                Sign Up Free
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
