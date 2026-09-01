import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserProfile } from '../types.js';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  switchDemoUser: (email: string) => Promise<void>;
  updateProfileState: (updatedProfile: UserProfile) => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('careermatch_token') || 'user-ahmed-001');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCurrentUser = async (authToken: string) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setProfile(data.profile);
      } else {
        // Default to demo profile Ahmed if token expired
        const profileRes = await fetch('/api/profile', {
          headers: { Authorization: `Bearer user-ahmed-001` },
        });
        if (profileRes.ok) {
          const p = await profileRes.json();
          setUser({ id: 'user-ahmed-001', name: p.name, email: p.email, role: 'user', createdAt: '2026-08-01' });
          setProfile(p);
          setToken('user-ahmed-001');
          localStorage.setItem('careermatch_token', 'user-ahmed-001');
        }
      }
    } catch (err) {
      console.error('Error loading current user:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('careermatch_token') || 'user-ahmed-001';
    setToken(savedToken);
    fetchCurrentUser(savedToken);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      setUser(data.user);
      setProfile(data.profile);
      setToken(data.token);
      localStorage.setItem('careermatch_token', data.token);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      setUser(data.user);
      setProfile(data.profile);
      setToken(data.token);
      localStorage.setItem('careermatch_token', data.token);
    } finally {
      setIsLoading(false);
    }
  };

  const switchDemoUser = async (email: string) => {
    await login(email, 'password123');
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    setToken(null);
    localStorage.removeItem('careermatch_token');
  };

  const updateProfileState = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    if (user) {
      setUser({ ...user, name: updatedProfile.name, email: updatedProfile.email });
    }
  };

  const refreshProfile = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (err) {
      console.error('Error refreshing profile:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        token,
        isLoading,
        login,
        register,
        logout,
        switchDemoUser,
        updateProfileState,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
