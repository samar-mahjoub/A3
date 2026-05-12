import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  installAgent: (agentId: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 600));
    setUser({
      id: 'u1',
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      avatar: email.slice(0, 2).toUpperCase(),
      installedAgents: ['flow-planner'],
    });
  };

  const signup = async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 600));
    setUser({
      id: 'u2',
      name,
      email,
      avatar: name.slice(0, 2).toUpperCase(),
      installedAgents: [],
    });
  };

  const logout = () => setUser(null);

  const installAgent = (agentId: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      if (prev.installedAgents.includes(agentId)) return prev;
      return { ...prev, installedAgents: [...prev.installedAgents, agentId] };
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, installAgent }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
