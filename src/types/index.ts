export type AgentCategory =
  | 'Productivity'
  | 'Research'
  | 'Coding'
  | 'Creative'
  | 'Data & Analytics'
  | 'Customer Support'
  | 'Finance'
  | 'Marketing';

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  body: string;
}

export interface Agent {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: AgentCategory;
  tags: string[];
  price: number; // USD/month; 0 = free
  rating: number;
  reviewCount: number;
  reviews: Review[];
  capabilities: string[];
  author: string;
  authorAvatar: string;
  icon: string; // emoji
  gradient: string; // tailwind gradient classes
  featured: boolean;
  installs: number;
  modelPowered: string;
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
  installedAgents: string[];
}
