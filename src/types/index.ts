export type SourceType = 'Official (Verified)' | 'Partner' | 'Custom (Community)';
export type MaturityType = 'Stable' | 'Beta' | 'Experimental';
export type PluginSource = 'Internal' | 'External' | 'Beta';

export interface Agent {
  id: string;
  name: string;
  handle: string;
  version: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  price: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  capabilities: string[];
  source: SourceType;
  maturity: MaturityType;
  domain: string;
  phase: string;
  techStack: string[];
  installs: number;
  activeUsers: number;
  author: string;
  authorAvatar: string;
  logoColor: string;
  logoText: string;
  featured: boolean;
  modelPowered: string;
}

export interface Plugin {
  id: string;
  name: string;
  handle: string;
  version: string;
  description: string;
  tags: string[];
  source: PluginSource;
  category: string;
  installs: number;
  activeUsers: number;
  compatibility: string[];
  pricing: 'Free' | 'Paid';
  logoColor: string;
  logoText: string;
  logoIcon?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  body: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  title: string;
  avatar: string;
  blueprintRate: number;
  blueprintTrend: number;
  vettingAccuracy: number;
  questCompletion: number;
  totalCP: number;
}

export interface PerformingAgent {
  rank: number;
  name: string;
  source: string;
  logoColor: string;
  logoText: string;
  successRate: number;
  efficiencyQuotient: number;
  niche: string;
  score: number;
}

export interface TopMentor {
  rank: number;
  name: string;
  title: string;
  avatar: string;
  traceUpvotes: number;
  shortsEngagement: number;
  forkTree: number;
  totalCP: number;
}

export interface CartItem {
  agent: Agent;
  quantity: 1;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  levelTitle: string;
  cp: number;
  installedAgents: string[];
  isAdmin?: boolean;
}
