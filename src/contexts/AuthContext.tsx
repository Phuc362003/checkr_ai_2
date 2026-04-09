import React, { createContext, useContext, useState, useEffect } from 'react';
import { dataService } from '@/services/dataService';
import { UserProfile } from '@/services/mockData';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = dataService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const user = await dataService.login(email, password);
    setUser(user);
  };

  const register = async (email: string, password: string, fullName: string) => {
    const user = await dataService.register(email, password, fullName);
    setUser(user);
  };

  const logout = async () => {
    await dataService.logout();
    setUser(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    await dataService.updateProfile(updates);
    setUser(dataService.getCurrentUser());
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
