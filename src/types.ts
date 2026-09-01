export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  jobType: 'Full Time' | 'Part Time' | 'Contract' | 'Internship' | 'Remote' | 'Hybrid';
  experienceLevel: 'Internship' | 'Entry Level' | 'Junior' | 'Mid Level' | 'Senior' | 'Lead';
  minExperienceYears: number;
  salary?: string;
  careerField: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferredQualifications?: string[];
  benefits: string[];
  educationRequirement: string;
  postedDate: string;
  source: string;
  department?: string;
  applicantCount?: number;
}

export interface EducationItem {
  id: string;
  degree: string;
  university: string;
  fieldOfStudy: string;
  graduationYear: number | string;
}
export type Education = EducationItem;

export interface ExperienceItem {
  id: string;
  jobTitle: string;
  company: string;
  yearsOfExperience: number;
  responsibilities: string;
}
export type Experience = ExperienceItem;

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  location: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: string[];
  careerField: string;
  preferredJobType: string;
  preferredLocation: string;
  desiredRole: string;
  salaryExpectation?: string;
  yearsOfExperienceTotal: number;
  highestDegree: string;
  bio?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface MatchScoreBreakdown {
  overallScore: number;
  skillsScore: number;
  experienceScore: number;
  educationScore: number;
  careerScore: number;
  locationScore: number;
  jobTypeScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  whyItMatches: string;
  potentialGaps: string;
  keyHighlights: string[];
}

export interface JobWithMatch extends Job {
  matchBreakdown?: MatchScoreBreakdown;
  matchScore?: number;
  isSaved?: boolean;
  applicationStatus?: 'Saved' | 'Applied' | 'Interview' | 'Offer' | 'Rejected';
}

export interface SavedJobRecord {
  id: string;
  userId: string;
  jobId: string;
  savedAt: string;
  job?: Job;
}

export interface JobApplication {
  id: string;
  userId: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  status: 'Saved' | 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  appliedDate: string;
  updatedAt: string;
  notes?: string;
  salary?: string;
  matchScore?: number;
}

export interface CompanyInfo {
  name: string;
  logo: string;
  industry: string;
  location: string;
  description: string;
  website: string;
  employeeCount: string;
  openJobsCount: number;
  featuredJobs: Job[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedJobs?: Job[];
  suggestedSkills?: string[];
  actionType?: 'view_jobs' | 'skill_gap' | 'improve_profile';
}

export interface SkillGapAnalysis {
  targetRole: string;
  matchPercentage: number;
  userSkills: string[];
  masteredSkills: string[];
  missingSkills: {
    name: string;
    importance: 'High' | 'Medium' | 'Recommended';
    reason: string;
    estimatedTimeToLearn: string;
  }[];
  recommendedLearningPath: {
    step: number;
    title: string;
    description: string;
    skills: string[];
    resources: string[];
  }[];
  readinessSummary: string;
}
