import React, { useState, useEffect } from 'react';
import {
  User as UserIcon,
  Sparkles,
  CheckCircle2,
  Plus,
  Trash2,
  Briefcase,
  GraduationCap,
  Save,
  BrainCircuit,
  MapPin,
  DollarSign,
  Layers,
  Award,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { UserProfile, Education, Experience } from '../types.js';
import { POPULAR_SKILLS, CAREER_FIELDS, LOCATIONS, JOB_TYPES } from '../components/JobFilters.js';

interface ProfilePageProps {
  setActiveTab: (tab: string) => void;
  openChatDrawer: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ setActiveTab, openChatDrawer }) => {
  const { user, profile, updateProfileState, token } = useAuth();
  const [formData, setFormData] = useState<UserProfile>(() => profile || ({} as UserProfile));
  const [newSkill, setNewSkill] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Education item state
  const [newEdu, setNewEdu] = useState<Partial<Education>>({
    degree: "Bachelor of Science",
    university: '',
    fieldOfStudy: 'Computer Science',
    graduationYear: 2024,
  });
  const [showEduForm, setShowEduForm] = useState(false);

  // New Experience item state
  const [newExp, setNewExp] = useState<Partial<Experience>>({
    jobTitle: '',
    company: '',
    yearsOfExperience: 2,
    responsibilities: '',
  });
  const [showExpForm, setShowExpForm] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleAddSkill = (skillToAdd?: string) => {
    const s = (skillToAdd || newSkill).trim();
    if (!s) return;
    if (!formData.skills.includes(s)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, s],
      }));
    }
    if (!skillToAdd) setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove),
    }));
  };

  const handleAddEducation = () => {
    if (!newEdu.university || !newEdu.degree) return;
    const item: Education = {
      id: `edu-${Date.now()}`,
      degree: newEdu.degree || "Bachelor's",
      university: newEdu.university,
      fieldOfStudy: newEdu.fieldOfStudy || 'Computer Science',
      graduationYear: Number(newEdu.graduationYear) || 2024,
    };
    setFormData(prev => ({
      ...prev,
      education: [...(prev.education || []), item],
      highestDegree: `${item.degree} in ${item.fieldOfStudy}`,
    }));
    setNewEdu({ degree: "Bachelor of Science", university: '', fieldOfStudy: 'Computer Science', graduationYear: 2024 });
    setShowEduForm(false);
  };

  const handleRemoveEducation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      education: (prev.education || []).filter(e => e.id !== id),
    }));
  };

  const handleAddExperience = () => {
    if (!newExp.jobTitle || !newExp.company) return;
    const item: Experience = {
      id: `exp-${Date.now()}`,
      jobTitle: newExp.jobTitle,
      company: newExp.company,
      yearsOfExperience: Number(newExp.yearsOfExperience) || 1,
      responsibilities: newExp.responsibilities || '',
    };
    const updatedList = [...(prevExperienceList(formData.experience)), item];
    const totalExp = updatedList.reduce((sum, e) => sum + (Number(e.yearsOfExperience) || 0), 0);

    setFormData(prev => ({
      ...prev,
      experience: updatedList,
      yearsOfExperienceTotal: totalExp,
    }));
    setNewExp({ jobTitle: '', company: '', yearsOfExperience: 2, responsibilities: '' });
    setShowExpForm(false);
  };

  const prevExperienceList = (list?: Experience[]) => list || [];

  const handleRemoveExperience = (id: string) => {
    setFormData(prev => {
      const updated = (prev.experience || []).filter(e => e.id !== id);
      const total = updated.reduce((sum, e) => sum + (Number(e.yearsOfExperience) || 0), 0);
      return {
        ...prev,
        experience: updated,
        yearsOfExperienceTotal: total,
      };
    });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token || 'user-ahmed-001'}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        updateProfileState(data.profile);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to save profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Profile Completeness calculation
  const skillsCount = formData.skills?.length || 0;
  const hasEdu = (formData.education?.length || 0) > 0;
  const hasExp = (formData.experience?.length || 0) > 0;
  const hasRole = !!formData.desiredRole;
  const hasLoc = !!formData.preferredLocation;

  let completion = 20;
  if (skillsCount >= 3) completion += 25;
  if (hasEdu) completion += 20;
  if (hasExp) completion += 20;
  if (hasRole && hasLoc) completion += 15;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {formData.avatar ? (
            <img
              src={formData.avatar}
              alt={formData.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-md"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center font-black text-2xl text-white">
              {formData.name?.charAt(0) || 'U'}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">{formData.name || 'Candidate Profile'}</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                {completion}% Complete
              </span>
            </div>
            <p className="text-xs text-indigo-200 mt-0.5">{formData.email}</p>
            <p className="text-xs text-slate-300 font-medium mt-1">
              Target: <strong className="text-white">{formData.desiredRole || 'Software Engineer'}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('recommendations')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>View Job Matches</span>
          </button>
        </div>
      </div>

      {/* Main Profile Editor Form */}
      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-indigo-600" />
            <span>Personal & Career Summary</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Desired Role Title
              </label>
              <input
                type="text"
                placeholder="e.g. Full Stack Developer, Data Scientist"
                value={formData.desiredRole || ''}
                onChange={(e) => setFormData({ ...formData, desiredRole: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Career Field
              </label>
              <select
                value={formData.careerField || 'Software Engineering'}
                onChange={(e) => setFormData({ ...formData, careerField: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-500 outline-hidden"
              >
                {CAREER_FIELDS.map(f => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Preferred Location
              </label>
              <select
                value={formData.preferredLocation || 'Remote'}
                onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-500 outline-hidden"
              >
                {LOCATIONS.map(l => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Preferred Job Type
              </label>
              <select
                value={formData.preferredJobType || 'Full Time'}
                onChange={(e) => setFormData({ ...formData, preferredJobType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-500 outline-hidden"
              >
                {JOB_TYPES.map(jt => (
                  <option key={jt} value={jt}>
                    {jt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Professional Bio & Objectives
            </label>
            <textarea
              rows={3}
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-500 outline-hidden"
              placeholder="Highlight your key achievements and what kind of teams you love working with..."
            />
          </div>
        </div>

        {/* Section 2: Technical Skills Management */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                <span>Skills & Technologies ({formData.skills?.length || 0})</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                CareerMate AI matches these directly against dataset requirements (40% algorithm weighting).
              </p>
            </div>
          </div>

          {/* Add custom skill input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add skill (e.g., TypeScript, Docker, PyTorch, GraphQL)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-500 outline-hidden"
            />
            <button
              type="button"
              onClick={() => handleAddSkill()}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill</span>
            </button>
          </div>

          {/* Active Skills Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {(formData.skills || []).map(skill => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-semibold"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-rose-600 p-0.5"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Quick Suggestions Strip */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Popular skills to add:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_SKILLS.filter(s => !formData.skills?.includes(s)).slice(0, 10).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleAddSkill(s)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 text-xs font-medium transition-colors"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Education History */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <span>Education ({formData.education?.length || 0})</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Degrees and university background.</p>
            </div>

            <button
              type="button"
              onClick={() => setShowEduForm(!showEduForm)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Degree</span>
            </button>
          </div>

          {showEduForm && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Degree (e.g. Bachelor of Science)"
                  value={newEdu.degree || ''}
                  onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
                />
                <input
                  type="text"
                  placeholder="University (e.g. FAST-NUCES, NUST)"
                  value={newEdu.university || ''}
                  onChange={(e) => setNewEdu({ ...newEdu, university: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
                />
                <input
                  type="text"
                  placeholder="Field of Study (e.g. Computer Science)"
                  value={newEdu.fieldOfStudy || ''}
                  onChange={(e) => setNewEdu({ ...newEdu, fieldOfStudy: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
                />
                <input
                  type="number"
                  placeholder="Graduation Year (e.g. 2024)"
                  value={newEdu.graduationYear || 2024}
                  onChange={(e) => setNewEdu({ ...newEdu, graduationYear: Number(e.target.value) })}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEduForm(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                >
                  Save Degree
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {(formData.education || []).map(edu => (
              <div
                key={edu.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {edu.degree} in {edu.fieldOfStudy}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {edu.university} • Graduated {edu.graduationYear}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveEducation(edu.id)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Work Experience History */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                <span>Work Experience ({formData.yearsOfExperienceTotal || 0} Years Total)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Past industry roles and responsibilities.</p>
            </div>

            <button
              type="button"
              onClick={() => setShowExpForm(!showExpForm)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Role</span>
            </button>
          </div>

          {showExpForm && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Job Title (e.g. Software Engineer)"
                  value={newExp.jobTitle || ''}
                  onChange={(e) => setNewExp({ ...newExp, jobTitle: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
                />
                <input
                  type="text"
                  placeholder="Company Name (e.g. InnoTech)"
                  value={newExp.company || ''}
                  onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
                />
                <input
                  type="number"
                  placeholder="Years (e.g. 2)"
                  value={newExp.yearsOfExperience || 2}
                  onChange={(e) => setNewExp({ ...newExp, yearsOfExperience: Number(e.target.value) })}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
                />
              </div>
              <textarea
                placeholder="Key responsibilities and achievements..."
                rows={2}
                value={newExp.responsibilities || ''}
                onChange={(e) => setNewExp({ ...newExp, responsibilities: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowExpForm(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                >
                  Save Experience
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {(formData.experience || []).map(exp => (
              <div
                key={exp.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">{exp.jobTitle}</div>
                  <div className="text-[11px] font-semibold text-indigo-600">
                    {exp.company} • {exp.yearsOfExperience} Years Experience
                  </div>
                  {exp.responsibilities && (
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{exp.responsibilities}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveExperience(exp.id)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
          <div>
            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile updated & AI match scores recalculated!</span>
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes...' : 'Save Profile & Recalculate Matches'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
