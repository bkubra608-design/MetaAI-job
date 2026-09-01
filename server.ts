import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { db } from './server/store/db.js';
import { calculateFullJobMatch } from './server/services/matchingEngine.js';
import { generateCareerChatResponse, generateSkillGapAnalysis } from './server/services/geminiService.js';
import { Job, JobWithMatch, UserProfile, CompanyInfo } from './src/types.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Simple JWT / Auth Token helper (Bearer token or demo token)
function extractUserId(req: Request): string {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    if (token) return token;
  }
  // Default to demo user Ahmed if no explicit token provided for smooth preview experience
  return 'user-ahmed-001';
}

function getActiveUserId(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    if (token && token !== 'guest' && token !== 'null') {
      return token;
    }
  }
  return null;
}

// ----------------------------------------------------
// REST APIs
// ----------------------------------------------------

// 1. Authentication
app.post('/api/auth/register', (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }
    const { user, profile } = db.register(name, email, password);
    return res.status(201).json({
      token: user.id,
      user,
      profile,
      message: 'Account created successfully!',
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message || 'Registration failed.' });
  }
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    const { user, profile } = db.login(email, password);
    return res.json({
      token: user.id,
      user,
      profile,
      message: 'Welcome back!',
    });
  } catch (err: any) {
    return res.status(401).json({ error: err.message || 'Invalid credentials.' });
  }
});

app.post('/api/auth/logout', (_req: Request, res: Response) => {
  return res.json({ success: true, message: 'Logged out successfully.' });
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const userId = getActiveUserId(req);
  if (!userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const user = db.getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const profile = db.getProfile(userId);
  return res.json({ user, profile });
});

// 2. Profile
app.get('/api/profile', (req: Request, res: Response) => {
  const userId = extractUserId(req);
  const profile = db.getProfile(userId);
  return res.json(profile);
});

app.put('/api/profile', (req: Request, res: Response) => {
  const userId = extractUserId(req);
  const updates = req.body;
  const updated = db.updateProfile(userId, updates);
  return res.json({ profile: updated, message: 'Profile updated successfully!' });
});

// 3. Jobs Listing, Search & Filters
app.get('/api/jobs', (req: Request, res: Response) => {
  const {
    q,
    location,
    experience,
    jobType,
    careerField,
    skills,
    sort = 'relevance',
    page = '1',
    limit = '12',
  } = req.query;

  const userId = getActiveUserId(req);
  const userProfile: UserProfile | null = userId ? db.getProfile(userId) : null;
  const allJobs = db.getAllJobs();

  let filtered = allJobs.map(job => {
    let matchBreakdown = undefined;
    let matchScore = undefined;
    if (userProfile) {
      matchBreakdown = calculateFullJobMatch(userProfile, job);
      matchScore = matchBreakdown.overallScore;
    }
    const isSaved = userId ? db.isJobSaved(userId, job.id) : false;
    return {
      ...job,
      matchBreakdown,
      matchScore,
      isSaved,
    } as JobWithMatch;
  });

  // Search keyword filter (title, company, skills, description, location)
  if (q && typeof q === 'string' && q.trim().length > 0) {
    const term = q.trim().toLowerCase();
    filtered = filtered.filter(
      j =>
        j.title.toLowerCase().includes(term) ||
        j.company.toLowerCase().includes(term) ||
        j.location.toLowerCase().includes(term) ||
        j.careerField.toLowerCase().includes(term) ||
        j.skills.some(s => s.toLowerCase().includes(term)) ||
        j.description.toLowerCase().includes(term)
    );
  }

  // Location filter
  if (location && typeof location === 'string' && location !== 'all') {
    const locLower = location.toLowerCase();
    filtered = filtered.filter(j => {
      if (locLower === 'remote') return j.jobType === 'Remote' || j.location.toLowerCase().includes('remote');
      return j.location.toLowerCase().includes(locLower);
    });
  }

  // Experience level filter
  if (experience && typeof experience === 'string' && experience !== 'all') {
    const expLower = experience.toLowerCase();
    filtered = filtered.filter(j => j.experienceLevel.toLowerCase() === expLower);
  }

  // Job Type filter
  if (jobType && typeof jobType === 'string' && jobType !== 'all') {
    const typeLower = jobType.toLowerCase();
    filtered = filtered.filter(j => j.jobType.toLowerCase().includes(typeLower));
  }

  // Career Field filter
  if (careerField && typeof careerField === 'string' && careerField !== 'all') {
    const fieldLower = careerField.toLowerCase();
    filtered = filtered.filter(j => j.careerField.toLowerCase().includes(fieldLower));
  }

  // Skills filter (multi-select)
  if (skills) {
    const skillsList = Array.isArray(skills)
      ? (skills as string[])
      : (skills as string).split(',').map(s => s.trim()).filter(Boolean);

    if (skillsList.length > 0) {
      filtered = filtered.filter(j =>
        skillsList.some(reqSkill =>
          j.skills.some(js => js.toLowerCase() === reqSkill.toLowerCase())
        )
      );
    }
  }

  // Sorting
  if (sort === 'highest-match') {
    filtered.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  } else if (sort === 'newest') {
    filtered.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
  } else if (sort === 'oldest') {
    filtered.sort((a, b) => new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime());
  } else if (sort === 'company') {
    filtered.sort((a, b) => a.company.localeCompare(b.company));
  } else {
    // Default relevance: match score if logged in, otherwise newest
    if (userProfile) {
      filtered.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    } else {
      filtered.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    }
  }

  // Pagination
  const pageNum = parseInt(page as string, 10) || 1;
  const pageSize = parseInt(limit as string, 10) || 12;
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (pageNum - 1) * pageSize;
  const paginatedJobs = filtered.slice(startIndex, startIndex + pageSize);

  return res.json({
    jobs: paginatedJobs,
    total,
    page: pageNum,
    pageSize,
    totalPages,
  });
});

// Featured Jobs
app.get('/api/jobs/featured', (req: Request, res: Response) => {
  const userId = getActiveUserId(req);
  const userProfile = userId ? db.getProfile(userId) : null;
  const all = db.getAllJobs();

  const featured = all.slice(0, 6).map(j => {
    const matchBreakdown = userProfile ? calculateFullJobMatch(userProfile, j) : undefined;
    return {
      ...j,
      matchBreakdown,
      matchScore: matchBreakdown?.overallScore || (Math.floor(Math.random() * 15) + 80),
      isSaved: userId ? db.isJobSaved(userId, j.id) : false,
    };
  });

  return res.json(featured);
});

// Category counts
app.get('/api/jobs/categories', (_req: Request, res: Response) => {
  const all = db.getAllJobs();
  const map: Record<string, number> = {};
  all.forEach(j => {
    map[j.careerField] = (map[j.careerField] || 0) + 1;
  });
  return res.json(map);
});

// Single Job Details
app.get('/api/jobs/:id', (req: Request, res: Response) => {
  const job = db.getJobById(req.params.id);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  const userId = getActiveUserId(req);
  let matchBreakdown = undefined;
  if (userId) {
    const profile = db.getProfile(userId);
    matchBreakdown = calculateFullJobMatch(profile, job);
  }

  const isSaved = userId ? db.isJobSaved(userId, job.id) : false;

  return res.json({
    ...job,
    matchBreakdown,
    matchScore: matchBreakdown?.overallScore,
    isSaved,
  });
});

// 4. Companies Directory
app.get('/api/companies', (_req: Request, res: Response) => {
  const allJobs = db.getAllJobs();
  const companyMap = new Map<string, Job[]>();

  allJobs.forEach(j => {
    const list = companyMap.get(j.company) || [];
    list.push(j);
    companyMap.set(j.company, list);
  });

  const companies: CompanyInfo[] = [
    {
      name: 'TechVision Solutions',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80',
      industry: 'Enterprise Software & SaaS',
      location: 'Lahore, Pakistan',
      description: 'Pioneering next-generation enterprise SaaS solutions and cloud-native architecture across North America and MENA.',
      website: 'https://techvision-example.com',
      employeeCount: '250 - 500',
      openJobsCount: companyMap.get('TechVision Solutions')?.length || 2,
      featuredJobs: companyMap.get('TechVision Solutions') || [],
    },
    {
      name: 'ByteWave Interactive',
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&auto=format&fit=crop&q=80',
      industry: 'Digital Media & Web Platforms',
      location: 'Remote / Global',
      description: 'Building ultra-fast responsive media portals, streaming interfaces, and developer-first interaction tools.',
      website: 'https://bytewave-example.com',
      employeeCount: '100 - 250',
      openJobsCount: companyMap.get('ByteWave Interactive')?.length || 3,
      featuredJobs: companyMap.get('ByteWave Interactive') || [],
    },
    {
      name: 'Apex AI Labs',
      logo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=128&auto=format&fit=crop&q=80',
      industry: 'Artificial Intelligence & Robotics',
      location: 'Islamabad, Pakistan',
      description: 'Cutting-edge AI research studio specializing in foundation models, LLM agents, computer vision, and NLP production stacks.',
      website: 'https://apex-ai-example.com',
      employeeCount: '80 - 150',
      openJobsCount: companyMap.get('Apex AI Labs')?.length || 2,
      featuredJobs: companyMap.get('Apex AI Labs') || [],
    },
    {
      name: 'DataPulse Analytics',
      logo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=128&auto=format&fit=crop&q=80',
      industry: 'Big Data & Financial Intelligence',
      location: 'Karachi & Peshawar',
      description: 'Transforming enterprise data warehouses into real-time predictive analytics and business intelligence pipelines.',
      website: 'https://datapulse-example.com',
      employeeCount: '150 - 300',
      openJobsCount: companyMap.get('DataPulse Analytics')?.length || 2,
      featuredJobs: companyMap.get('DataPulse Analytics') || [],
    },
    {
      name: 'CloudScale Systems',
      logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=128&auto=format&fit=crop&q=80',
      industry: 'Cloud Infrastructure & DevOps',
      location: 'Lahore, Pakistan',
      description: 'High-availability cloud engineering, Kubernetes orchestration, and multi-region SRE consulting.',
      website: 'https://cloudscale-example.com',
      employeeCount: '300 - 600',
      openJobsCount: companyMap.get('CloudScale Systems')?.length || 3,
      featuredJobs: companyMap.get('CloudScale Systems') || [],
    },
    {
      name: 'GlobalFin Advisory',
      logo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=128&auto=format&fit=crop&q=80',
      industry: 'FinTech & Capital Markets',
      location: 'Karachi, Pakistan',
      description: 'Institutional financial advisory and distributed ledger technology processing billions in monthly volume.',
      website: 'https://globalfin-example.com',
      employeeCount: '500+',
      openJobsCount: companyMap.get('GlobalFin Advisory')?.length || 2,
      featuredJobs: companyMap.get('GlobalFin Advisory') || [],
    },
  ];

  return res.json(companies);
});

// 5. Recommendations
app.get('/api/recommendations', (req: Request, res: Response) => {
  const userId = extractUserId(req);
  const profile = db.getProfile(userId);
  const allJobs = db.getAllJobs();

  const scoredJobs = allJobs.map(job => {
    const matchBreakdown = calculateFullJobMatch(profile, job);
    const isSaved = db.isJobSaved(userId, job.id);
    return {
      ...job,
      matchBreakdown,
      matchScore: matchBreakdown.overallScore,
      isSaved,
    };
  });

  // Sort by highest match
  scoredJobs.sort((a, b) => b.matchScore - a.matchScore);

  return res.json({
    recommendations: scoredJobs,
    profileSummary: {
      name: profile.name,
      desiredRole: profile.desiredRole,
      skillsCount: profile.skills.length,
      topSkills: profile.skills.slice(0, 5),
    },
  });
});

app.get('/api/recommendations/:jobId', (req: Request, res: Response) => {
  const userId = extractUserId(req);
  const profile = db.getProfile(userId);
  const job = db.getJobById(req.params.jobId);

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  const matchBreakdown = calculateFullJobMatch(profile, job);
  const isSaved = db.isJobSaved(userId, job.id);

  return res.json({
    job: {
      ...job,
      matchBreakdown,
      matchScore: matchBreakdown.overallScore,
      isSaved,
    },
    matchBreakdown,
  });
});

// 6. Saved Jobs
app.get('/api/saved-jobs', (req: Request, res: Response) => {
  const userId = extractUserId(req);
  const list = db.getSavedJobs(userId);
  const profile = db.getProfile(userId);

  const enriched = list.map(item => {
    const matchBreakdown = calculateFullJobMatch(profile, item.job);
    return {
      ...item,
      job: {
        ...item.job,
        matchBreakdown,
        matchScore: matchBreakdown.overallScore,
        isSaved: true,
      },
    };
  });

  return res.json(enriched);
});

app.post('/api/saved-jobs/:jobId', (req: Request, res: Response) => {
  const userId = extractUserId(req);
  const { jobId } = req.params;
  const record = db.saveJob(userId, jobId);
  return res.status(201).json({ success: true, savedJob: record });
});

app.delete('/api/saved-jobs/:jobId', (req: Request, res: Response) => {
  const userId = extractUserId(req);
  const { jobId } = req.params;
  const removed = db.removeSavedJob(userId, jobId);
  return res.json({ success: removed });
});

// 7. Applications & Kanban Tracker
app.get('/api/applications', (req: Request, res: Response) => {
  const userId = extractUserId(req);
  const applications = db.getApplications(userId);
  const profile = db.getProfile(userId);

  const enriched = applications.map(app => {
    const job = db.getJobById(app.jobId);
    let matchScore = undefined;
    if (job) {
      matchScore = calculateFullJobMatch(profile, job).overallScore;
    }
    return {
      ...app,
      matchScore,
    };
  });

  return res.json(enriched);
});

app.post('/api/applications/:jobId', (req: Request, res: Response) => {
  const userId = extractUserId(req);
  const { jobId } = req.params;
  const { status = 'Applied', notes = '' } = req.body;
  const appRecord = db.addApplication(userId, jobId, status, notes);
  return res.status(201).json({ success: true, application: appRecord });
});

app.put('/api/applications/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const updated = db.updateApplicationStatus(id, status, notes);
  if (!updated) {
    return res.status(404).json({ error: 'Application not found' });
  }
  return res.json({ success: true, application: updated });
});

// 8. AI APIs: CareerMate Chat, Skill Gap, Profile Audit
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    const userId = getActiveUserId(req) || 'user-ahmed-001';
    const profile = db.getProfile(userId);
    const jobs = db.getAllJobs();

    const response = await generateCareerChatResponse(message, profile, jobs);
    return res.json(response);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'AI Chat processing error' });
  }
});

app.post('/api/ai/skill-gap', async (req: Request, res: Response) => {
  try {
    const { targetRole } = req.body;
    const userId = extractUserId(req);
    const profile = db.getProfile(userId);
    const allJobs = db.getAllJobs();

    const roleToAnalyze = targetRole || profile.desiredRole || 'Full Stack Developer';
    const analysis = await generateSkillGapAnalysis(roleToAnalyze, profile, allJobs);
    return res.json(analysis);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Skill gap analysis failed' });
  }
});

app.post('/api/ai/analyze-profile', async (req: Request, res: Response) => {
  try {
    const userId = extractUserId(req);
    const profile = db.getProfile(userId);
    const allJobs = db.getAllJobs();

    // Calculate completeness
    let completedSections = 0;
    const totalSections = 5;
    const checks = {
      personalInfo: !!(profile.name && profile.email && profile.location),
      skills: (profile.skills && profile.skills.length >= 3),
      education: (profile.education && profile.education.length > 0),
      experience: (profile.experience && profile.experience.length > 0),
      careerPreferences: !!(profile.desiredRole && profile.preferredLocation && profile.preferredJobType),
    };

    Object.values(checks).forEach(val => {
      if (val) completedSections++;
    });

    const completionRate = Math.round((completedSections / totalSections) * 100);

    const topMatches = allJobs
      .map(j => ({ job: j, match: calculateFullJobMatch(profile, j) }))
      .sort((a, b) => b.match.overallScore - a.match.overallScore)
      .slice(0, 3);

    return res.json({
      completionRate,
      checks,
      recommendationsCount: allJobs.length,
      topMatches,
      aiAdvice: completionRate < 100
        ? `Completing your ${!checks.education ? 'education' : !checks.experience ? 'experience' : 'career preferences'} will increase recommendation accuracy by 35%.`
        : 'Your profile is 100% complete! CareerMate AI is matching you with high-affinity listings across the platform.',
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Profile audit failed' });
  }
});

// 9. Dataset Stats & Import Script
app.get('/api/dataset/stats', (_req: Request, res: Response) => {
  const jobs = db.getAllJobs();
  const companies = new Set(jobs.map(j => j.company)).size;
  const locations = new Set(jobs.map(j => j.location)).size;
  const fields = new Set(jobs.map(j => j.careerField)).size;

  return res.json({
    totalJobs: jobs.length,
    totalCompanies: companies,
    totalLocations: locations,
    careerFieldsCount: fields,
    source: 'LinkedIn Job Dataset (Educational Integration)',
  });
});

app.post('/api/dataset/import', (req: Request, res: Response) => {
  const { jobs } = req.body;
  if (!Array.isArray(jobs)) {
    return res.status(400).json({ error: 'Jobs array required' });
  }
  const result = db.importDataset(jobs);
  return res.json({
    success: true,
    message: `Imported ${result.added} new records, skipped ${result.skipped} duplicates.`,
    ...result,
  });
});

// ----------------------------------------------------
// Vite Middleware / Static Asset Serving
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CareerMatch AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
