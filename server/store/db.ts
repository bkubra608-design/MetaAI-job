import crypto from 'crypto';
import { Job, User, UserProfile, SavedJobRecord, JobApplication } from '../../src/types.js';
import { LINKEDIN_JOBS_DATASET } from '../data/jobsData.js';

// In-Memory persistent mock database with dataset pre-seeding
class Database {
  private users: Map<string, User> = new Map();
  private userPasswords: Map<string, string> = new Map(); // email -> sha256 hash
  private profiles: Map<string, UserProfile> = new Map();
  private jobs: Map<string, Job> = new Map();
  private savedJobs: Map<string, SavedJobRecord> = new Map(); // id -> SavedJobRecord
  private applications: Map<string, JobApplication> = new Map();

  constructor() {
    this.seedInitialData();
  }

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  private seedInitialData() {
    // Seed LinkedIn Dataset
    LINKEDIN_JOBS_DATASET.forEach(job => {
      this.jobs.set(job.id, job);
    });

    // Seed Demo User 1: Ahmed Khan (Full Stack)
    const user1Id = 'user-ahmed-001';
    const user1: User = {
      id: user1Id,
      name: 'Ahmed Khan',
      email: 'ahmed@example.com',
      role: 'user',
      createdAt: '2026-08-01T10:00:00.000Z',
    };
    this.users.set(user1Id, user1);
    this.userPasswords.set('ahmed@example.com', this.hashPassword('password123'));

    const profile1: UserProfile = {
      userId: user1Id,
      name: 'Ahmed Khan',
      email: 'ahmed@example.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80',
      location: 'Lahore',
      careerField: 'Web Development',
      preferredJobType: 'Full Time',
      preferredLocation: 'Lahore',
      desiredRole: 'Full Stack Developer',
      salaryExpectation: '$2,000 - $2,800 / month',
      yearsOfExperienceTotal: 2,
      highestDegree: "Bachelor's in Computer Science",
      bio: 'Enthusiastic Full Stack Engineer focused on modern React, Node.js, and high-performance cloud applications.',
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git', 'CSS', 'HTML5'],
      education: [
        {
          id: 'edu-1',
          degree: "Bachelor of Science",
          university: 'FAST-NUCES Lahore',
          fieldOfStudy: 'Computer Science',
          graduationYear: 2024,
        },
      ],
      experience: [
        {
          id: 'exp-1',
          jobTitle: 'Software Engineer',
          company: 'InnoTech Soft',
          yearsOfExperience: 2,
          responsibilities: 'Built customer portals using React and Express. Designed RESTful API endpoints and improved query speeds.',
        },
      ],
    };
    this.profiles.set(user1Id, profile1);

    // Seed Demo User 2: Sara Tariq (Data Science)
    const user2Id = 'user-sara-002';
    const user2: User = {
      id: user2Id,
      name: 'Sara Tariq',
      email: 'sara@example.com',
      role: 'user',
      createdAt: '2026-08-05T10:00:00.000Z',
    };
    this.users.set(user2Id, user2);
    this.userPasswords.set('sara@example.com', this.hashPassword('password123'));

    const profile2: UserProfile = {
      userId: user2Id,
      name: 'Sara Tariq',
      email: 'sara@example.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&auto=format&fit=crop&q=80',
      location: 'Islamabad',
      careerField: 'Data Science',
      preferredJobType: 'Full Time',
      preferredLocation: 'Islamabad',
      desiredRole: 'Data Scientist & AI Specialist',
      salaryExpectation: '$2,500 - $3,500 / month',
      yearsOfExperienceTotal: 3,
      highestDegree: "Master's in Data Science",
      bio: 'Machine learning specialist passionate about deep learning, predictive modeling, and NLP applications.',
      skills: ['Python', 'SQL', 'Machine Learning', 'Deep Learning', 'PyTorch', 'Pandas', 'Statistics', 'Docker', 'Git'],
      education: [
        {
          id: 'edu-sara-1',
          degree: "Master of Science",
          university: 'NUST Islamabad',
          fieldOfStudy: 'Data Science & AI',
          graduationYear: 2023,
        },
      ],
      experience: [
        {
          id: 'exp-sara-1',
          jobTitle: 'Data Analyst & ML Specialist',
          company: 'QuantData Labs',
          yearsOfExperience: 3,
          responsibilities: 'Developed customer churn models and predictive revenue pipelines using Python and Scikit-learn.',
        },
      ],
    };
    this.profiles.set(user2Id, profile2);

    // Seed sample saved jobs and applications for Ahmed
    this.saveJob(user1Id, 'job-001');
    this.saveJob(user1Id, 'job-002');
    this.addApplication(user1Id, 'job-001', 'Applied', 'Submitted resume and portfolio.');
    this.addApplication(user1Id, 'job-005', 'Interview', 'Technical screen scheduled for Thursday.');
  }

  // --- Auth / Users ---
  public register(name: string, email: string, password: string): { user: User; profile: UserProfile } {
    const existing = Array.from(this.users.values()).find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('User already exists with this email address.');
    }

    const userId = `user-${Date.now()}`;
    const user: User = {
      id: userId,
      name,
      email,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    this.users.set(userId, user);
    this.userPasswords.set(email.toLowerCase(), this.hashPassword(password));

    const profile: UserProfile = {
      userId,
      name,
      email,
      location: '',
      careerField: 'Software Engineering',
      preferredJobType: 'Full Time',
      preferredLocation: '',
      desiredRole: '',
      yearsOfExperienceTotal: 0,
      highestDegree: '',
      skills: [],
      education: [],
      experience: [],
    };
    this.profiles.set(userId, profile);

    return { user, profile };
  }

  public login(email: string, password: string): { user: User; profile: UserProfile } {
    const emailNorm = email.toLowerCase();
    const user = Array.from(this.users.values()).find(u => u.email.toLowerCase() === emailNorm);
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const expectedHash = this.userPasswords.get(emailNorm);
    const providedHash = this.hashPassword(password);
    if (expectedHash !== providedHash) {
      throw new Error('Invalid email or password.');
    }

    const profile = this.getProfile(user.id);
    return { user, profile };
  }

  public getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  // --- Profiles ---
  public getProfile(userId: string): UserProfile {
    let profile = this.profiles.get(userId);
    if (!profile) {
      const user = this.getUserById(userId);
      profile = {
        userId,
        name: user?.name || 'Candidate',
        email: user?.email || '',
        location: '',
        careerField: 'Software Engineering',
        preferredJobType: 'Full Time',
        preferredLocation: '',
        desiredRole: '',
        yearsOfExperienceTotal: 0,
        highestDegree: '',
        skills: [],
        education: [],
        experience: [],
      };
      this.profiles.set(userId, profile);
    }
    return profile;
  }

  public updateProfile(userId: string, updates: Partial<UserProfile>): UserProfile {
    const current = this.getProfile(userId);
    const updated: UserProfile = {
      ...current,
      ...updates,
      userId, // guarantee id
    };

    // calculate total years of experience if experience items provided
    if (updates.experience) {
      const total = updates.experience.reduce((sum, e) => sum + (Number(e.yearsOfExperience) || 0), 0);
      updated.yearsOfExperienceTotal = total;
    }

    this.profiles.set(userId, updated);
    return updated;
  }

  // --- Jobs ---
  public getAllJobs(): Job[] {
    return Array.from(this.jobs.values());
  }

  public getJobById(id: string): Job | undefined {
    return this.jobs.get(id);
  }

  public addOrUpdateJob(job: Job): Job {
    this.jobs.set(job.id, job);
    return job;
  }

  public importDataset(jobsList: Job[]): { total: number; added: number; skipped: number } {
    let added = 0;
    let skipped = 0;
    for (const j of jobsList) {
      if (this.jobs.has(j.id)) {
        skipped++;
      } else {
        this.jobs.set(j.id, j);
        added++;
      }
    }
    return { total: this.jobs.size, added, skipped };
  }

  // --- Saved Jobs ---
  public getSavedJobs(userId: string): (SavedJobRecord & { job: Job })[] {
    const list: (SavedJobRecord & { job: Job })[] = [];
    for (const record of this.savedJobs.values()) {
      if (record.userId === userId) {
        const job = this.getJobById(record.jobId);
        if (job) {
          list.push({ ...record, job });
        }
      }
    }
    return list.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
  }

  public saveJob(userId: string, jobId: string): SavedJobRecord {
    const existing = Array.from(this.savedJobs.values()).find(
      s => s.userId === userId && s.jobId === jobId
    );
    if (existing) return existing;

    const id = `saved-${userId}-${jobId}`;
    const record: SavedJobRecord = {
      id,
      userId,
      jobId,
      savedAt: new Date().toISOString(),
    };
    this.savedJobs.set(id, record);
    return record;
  }

  public removeSavedJob(userId: string, jobId: string): boolean {
    const record = Array.from(this.savedJobs.values()).find(
      s => s.userId === userId && s.jobId === jobId
    );
    if (record) {
      this.savedJobs.delete(record.id);
      return true;
    }
    return false;
  }

  public isJobSaved(userId: string, jobId: string): boolean {
    return Array.from(this.savedJobs.values()).some(
      s => s.userId === userId && s.jobId === jobId
    );
  }

  // --- Applications ---
  public getApplications(userId: string): JobApplication[] {
    const list: JobApplication[] = [];
    for (const app of this.applications.values()) {
      if (app.userId === userId) {
        list.push(app);
      }
    }
    return list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  public addApplication(
    userId: string,
    jobId: string,
    status: 'Saved' | 'Applied' | 'Interview' | 'Offer' | 'Rejected' = 'Applied',
    notes: string = ''
  ): JobApplication {
    const existing = Array.from(this.applications.values()).find(
      a => a.userId === userId && a.jobId === jobId
    );

    const job = this.getJobById(jobId);
    const now = new Date().toISOString();

    if (existing) {
      existing.status = status;
      existing.updatedAt = now;
      if (notes) existing.notes = notes;
      return existing;
    }

    const id = `app-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newApp: JobApplication = {
      id,
      userId,
      jobId,
      jobTitle: job?.title || 'Position',
      company: job?.company || 'Company',
      location: job?.location || 'Location',
      salary: job?.salary,
      status,
      appliedDate: now,
      updatedAt: now,
      notes,
    };

    this.applications.set(id, newApp);
    return newApp;
  }

  public updateApplicationStatus(
    id: string,
    status: 'Saved' | 'Applied' | 'Interview' | 'Offer' | 'Rejected',
    notes?: string
  ): JobApplication | null {
    const app = this.applications.get(id);
    if (!app) return null;
    app.status = status;
    app.updatedAt = new Date().toISOString();
    if (notes !== undefined) app.notes = notes;
    return app;
  }
}

export const db = new Database();
