import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClerkProvider, useUser, useClerk, SignedIn, SignedOut, UserButton, SignIn, SignUp } from '@clerk/clerk-react';
import { useAuth } from './AuthContext.js';

interface ClerkConfigContextType {
  isClerkConfigured: boolean;
  publishableKey: string;
  setPublishableKey: (key: string) => void;
  openClerkModal: (mode?: 'signin' | 'signup') => void;
  isClerkModalOpen: boolean;
  closeClerkModal: () => void;
  clerkModalMode: 'signin' | 'signup';
}

const ClerkConfigContext = createContext<ClerkConfigContextType>({
  isClerkConfigured: false,
  publishableKey: '',
  setPublishableKey: () => {},
  openClerkModal: () => {},
  isClerkModalOpen: false,
  closeClerkModal: () => {},
  clerkModalMode: 'signin',
});

export const useClerkConfig = () => useContext(ClerkConfigContext);

/**
 * Syncs Clerk user state with CareerYouth's internal profile and matching engine
 * Must be rendered inside AuthProvider
 */
export const ClerkUserSync: React.FC = () => {
  const { isClerkConfigured } = useClerkConfig();
  
  if (!isClerkConfigured) return null;

  return <ClerkUserSyncInner />;
};

const ClerkUserSyncInner: React.FC = () => {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser();
  const { profile, updateProfileState } = useAuth();
  const [hasSynced, setHasSynced] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && clerkUser) {
      const email = clerkUser.primaryEmailAddress?.emailAddress || `${clerkUser.id}@clerk.user`;
      const name = clerkUser.fullName || clerkUser.firstName || 'CareerYouth Member';
      const avatar = clerkUser.imageUrl;

      // Update backend / profile if necessary
      if (!hasSynced || (profile && profile.email !== email)) {
        const updatedProfile = {
          userId: clerkUser.id,
          name,
          email,
          avatar: avatar || profile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          location: profile?.location || 'Remote / Worldwide',
          education: profile?.education || [
            {
              id: 'edu-clerk-1',
              degree: 'Bachelor of Science',
              university: 'Top University',
              fieldOfStudy: 'Computer Science & Engineering',
              graduationYear: 2024,
            },
          ],
          experience: profile?.experience || [
            {
              id: 'exp-clerk-1',
              jobTitle: 'Software Engineer',
              company: 'Tech Innovators',
              yearsOfExperience: 2,
              responsibilities: 'Built modern web applications, APIs, and scalable distributed systems.',
            },
          ],
          skills: profile?.skills?.length ? profile.skills : ['React', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 'PostgreSQL'],
          careerField: profile?.careerField || 'Software Development',
          preferredJobType: profile?.preferredJobType || 'Full Time',
          preferredLocation: profile?.preferredLocation || 'Remote',
          desiredRole: profile?.desiredRole || 'Full Stack Developer',
          yearsOfExperienceTotal: profile?.yearsOfExperienceTotal || 2,
          highestDegree: profile?.highestDegree || 'Bachelor Degree',
          bio: profile?.bio || 'Passionate software developer seeking next high-growth opportunity through CareerYouth.',
        };

        updateProfileState(updatedProfile);
        setHasSynced(true);

        // Sync with backend API silently
        fetch('/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${clerkUser.id}`,
          },
          body: JSON.stringify(updatedProfile),
        }).catch(err => console.error('Clerk profile sync notice:', err));
      }
    }
  }, [isLoaded, isSignedIn, clerkUser]);

  return null;
};

const DEFAULT_CLERK_PUBLISHABLE_KEY = 'pk_test_b3JpZW50ZWQtY29yZ2ktOTc4NS5jbGVyay5hY2NvdW50cy5kZXYk';

export const ClerkWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const envKey = ((import.meta as any).env?.VITE_CLERK_PUBLISHABLE_KEY || '').trim();
  const [storedKey, setStoredKey] = useState<string>(() => {
    return localStorage.getItem('careeryouth_clerk_pk') || envKey || DEFAULT_CLERK_PUBLISHABLE_KEY;
  });

  const [isClerkModalOpen, setIsClerkModalOpen] = useState(false);
  const [clerkModalMode, setClerkModalMode] = useState<'signin' | 'signup'>('signin');

  const isConfigured = Boolean(storedKey && storedKey.startsWith('pk_') && !storedKey.includes('...'));

  const handleSetKey = (key: string) => {
    const cleanKey = key.trim();
    setStoredKey(cleanKey);
    if (cleanKey) {
      localStorage.setItem('careeryouth_clerk_pk', cleanKey);
    } else {
      localStorage.removeItem('careeryouth_clerk_pk');
    }
  };

  const openClerkModal = (mode: 'signin' | 'signup' = 'signin') => {
    setClerkModalMode(mode);
    setIsClerkModalOpen(true);
  };

  const closeClerkModal = () => {
    setIsClerkModalOpen(false);
  };

  const contextValue: ClerkConfigContextType = {
    isClerkConfigured: isConfigured,
    publishableKey: storedKey,
    setPublishableKey: handleSetKey,
    openClerkModal,
    isClerkModalOpen,
    closeClerkModal,
    clerkModalMode,
  };

  if (!isConfigured) {
    // If Clerk key isn't configured yet, provide context with graceful fallback
    return (
      <ClerkConfigContext.Provider value={contextValue}>
        {children}
      </ClerkConfigContext.Provider>
    );
  }

  return (
    <ClerkConfigContext.Provider value={contextValue}>
      <ClerkProvider publishableKey={storedKey}>
        {children}
      </ClerkProvider>
    </ClerkConfigContext.Provider>
  );
};
