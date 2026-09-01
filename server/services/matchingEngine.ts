import { Job, UserProfile, MatchScoreBreakdown } from '../../src/types.js';

export function normalizeSkill(skill: string): string {
  return skill
    .toLowerCase()
    .replace(/\.js$/i, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

export function calculateSkillMatch(userSkills: string[], jobSkills: string[]): {
  score: number;
  matching: string[];
  missing: string[];
} {
  if (!jobSkills || jobSkills.length === 0) {
    return { score: 100, matching: [], missing: [] };
  }

  const normalizedUserSkills = (userSkills || []).map(s => ({
    original: s,
    norm: normalizeSkill(s),
  }));

  const matching: string[] = [];
  const missing: string[] = [];

  for (const jobSkill of jobSkills) {
    const normJob = normalizeSkill(jobSkill);
    const hasMatch = normalizedUserSkills.some(
      u => u.norm === normJob || u.norm.includes(normJob) || normJob.includes(u.norm)
    );

    if (hasMatch) {
      matching.push(jobSkill);
    } else {
      missing.push(jobSkill);
    }
  }

  const ratio = jobSkills.length > 0 ? matching.length / jobSkills.length : 1;
  const score = Math.round(ratio * 100);

  return { score, matching, missing };
}

export function calculateExperienceMatch(
  userProfile: UserProfile,
  job: Job
): number {
  const userYears = userProfile.yearsOfExperienceTotal || 0;
  const requiredYears = job.minExperienceYears || 0;

  if (requiredYears === 0) return 100;
  if (userYears >= requiredYears) return 100;
  if (userYears === 0 && requiredYears <= 1) return 70;

  const ratio = userYears / requiredYears;
  return Math.min(100, Math.round(ratio * 90));
}

export function calculateEducationMatch(
  userProfile: UserProfile,
  job: Job
): number {
  const userEdu = userProfile.education || [];
  if (userEdu.length === 0) return 60;

  const eduTexts = userEdu
    .map(e => `${e.degree} ${e.fieldOfStudy}`)
    .join(' ')
    .toLowerCase();

  const req = (job.educationRequirement || '').toLowerCase();

  if (req.includes('bachelor') && (eduTexts.includes('bachelor') || eduTexts.includes('bs') || eduTexts.includes('be') || eduTexts.includes('bsc') || eduTexts.includes('master') || eduTexts.includes('ms'))) {
    return 95;
  }
  if (req.includes('master') && (eduTexts.includes('master') || eduTexts.includes('ms') || eduTexts.includes('msc') || eduTexts.includes('phd'))) {
    return 95;
  }
  if (eduTexts.includes('computer') || eduTexts.includes('software') || eduTexts.includes('data') || eduTexts.includes('it')) {
    return 90;
  }

  return 75;
}

export function calculateLocationMatch(
  userProfile: UserProfile,
  job: Job
): number {
  const userLoc = (userProfile.preferredLocation || userProfile.location || '').toLowerCase();
  const jobLoc = (job.location || '').toLowerCase();

  if (job.jobType === 'Remote' || jobLoc.includes('remote') || userLoc.includes('remote')) {
    return 100;
  }

  if (userLoc && jobLoc && (userLoc.includes(jobLoc) || jobLoc.includes(userLoc))) {
    return 100;
  }

  return 40;
}

export function calculateCareerFieldMatch(
  userProfile: UserProfile,
  job: Job
): number {
  const userField = (userProfile.careerField || userProfile.desiredRole || '').toLowerCase();
  const jobField = (job.careerField || job.title || '').toLowerCase();

  if (userField && jobField && (userField.includes(jobField) || jobField.includes(userField))) {
    return 100;
  }

  // Cross-domain software compatibility
  if (
    (userField.includes('web') || userField.includes('software') || userField.includes('full stack')) &&
    (jobField.includes('web') || jobField.includes('software') || jobField.includes('frontend') || jobField.includes('backend') || jobField.includes('full stack'))
  ) {
    return 90;
  }

  return 60;
}

export function calculateJobTypeMatch(
  userProfile: UserProfile,
  job: Job
): number {
  const userType = (userProfile.preferredJobType || '').toLowerCase();
  const jobType = (job.jobType || '').toLowerCase();

  if (!userType || userType === 'any' || userType === 'all') return 100;
  if (userType === jobType || userType.includes(jobType) || jobType.includes(userType)) {
    return 100;
  }
  if (jobType === 'remote' && userType.includes('remote')) return 100;

  return 65;
}

export function calculateFullJobMatch(
  userProfile: UserProfile,
  job: Job
): MatchScoreBreakdown {
  const skillResult = calculateSkillMatch(userProfile.skills || [], job.skills || []);
  const experienceScore = calculateExperienceMatch(userProfile, job);
  const educationScore = calculateEducationMatch(userProfile, job);
  const careerScore = calculateCareerFieldMatch(userProfile, job);
  const locationScore = calculateLocationMatch(userProfile, job);
  const jobTypeScore = calculateJobTypeMatch(userProfile, job);

  // Weightings:
  // Skills Match: 40%
  // Experience Match: 20%
  // Education Match: 15%
  // Career Field: 10%
  // Location: 10%
  // Job Type: 5%
  const weightedOverall =
    skillResult.score * 0.40 +
    experienceScore * 0.20 +
    educationScore * 0.15 +
    careerScore * 0.10 +
    locationScore * 0.10 +
    jobTypeScore * 0.05;

  const overallScore = Math.min(99, Math.max(15, Math.round(weightedOverall)));

  const keyHighlights: string[] = [];
  if (skillResult.matching.length > 0) {
    keyHighlights.push(`You match ${skillResult.matching.length} of ${job.skills.length} core technical skills (${skillResult.matching.slice(0, 3).join(', ')})`);
  }
  if (experienceScore >= 90) {
    keyHighlights.push(`Your experience (${userProfile.yearsOfExperienceTotal || 0} years) fully meets the ${job.minExperienceYears || 0}+ years requirement`);
  }
  if (locationScore >= 90) {
    keyHighlights.push(`Location preference is an exact match (${job.location})`);
  }
  if (educationScore >= 85) {
    keyHighlights.push(`Your academic background aligns well with ${job.educationRequirement.split(',')[0]}`);
  }

  // Generate dynamic explanation
  let whyItMatches = `CareerMate AI analyzed your profile for ${job.title} at ${job.company}. You have a strong ${overallScore}% fit because `;
  if (skillResult.matching.length > 0) {
    whyItMatches += `you possess key proficiencies in ${skillResult.matching.slice(0, 4).join(', ')}. `;
  }
  if (experienceScore >= 90) {
    whyItMatches += `You also satisfy the target experience level for this role. `;
  }
  if (locationScore >= 90) {
    whyItMatches += `Additionally, your location alignment (${job.location}) is optimal.`;
  }

  let potentialGaps = '';
  if (skillResult.missing.length > 0) {
    potentialGaps = `Potential skill gaps to explore: ${skillResult.missing.slice(0, 3).join(', ')} ${skillResult.missing.length > 3 ? `(+${skillResult.missing.length - 3} more)` : ''}. Acquiring these will boost your candidacy to 95%+.`;
  } else {
    potentialGaps = 'No significant skill gaps identified. You match 100% of the listed technical requirements!';
  }

  return {
    overallScore,
    skillsScore: skillResult.score,
    experienceScore,
    educationScore,
    careerScore,
    locationScore,
    jobTypeScore,
    matchingSkills: skillResult.matching,
    missingSkills: skillResult.missing,
    whyItMatches,
    potentialGaps,
    keyHighlights,
  };
}
