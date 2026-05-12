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
  const [user, setUser] = useState<User | null>({
    id: 'u1',
    name: 'Alex Morgan',
    email: 'alex.morgan@company.com',
    avatar: 'AM',
    level: 5,
    levelTitle: 'Innovator',
    cp: 2450,
    installedAgents: ['github-copilot-cli', 'notion-ai', 'anthropic-claude'],
    isAdmin: false,
  });

  const login = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 600));
    const isAdmin = email.toLowerCase().includes('admin');
    setUser({
      id: 'u1',
      name: isAdmin ? 'Admin' : email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      avatar: isAdmin ? 'AD' : email.slice(0, 2).toUpperCase(),
      level: 5,
      levelTitle: 'Innovator',
      cp: 2450,
      installedAgents: ['github-copilot-cli', 'notion-ai'],
      isAdmin,
    });
  };

  const signup = async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 600));
    setUser({
      id: 'u2',
      name,
      email,
      avatar: name.slice(0, 2).toUpperCase(),
      level: 1,
      levelTitle: 'Explorer',
      cp: 0,
      installedAgents: [],
      isAdmin: false,
    });
  };

  const logout = () => setUser(null);

  const installAgent = (agentId: string) => {
    setUser((prev) => {
      if (!prev || prev.installedAgents.includes(agentId)) return prev;
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
