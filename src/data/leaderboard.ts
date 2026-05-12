import type { LeaderboardUser, PerformingAgent, TopMentor } from '../types';

export const architectRankings: LeaderboardUser[] = [
  { rank: 1, name: 'Priya Sharma', title: 'Logic Architect', avatar: 'PS', blueprintRate: 1248, blueprintTrend: 18, vettingAccuracy: 96, questCompletion: 32, totalCP: 18750 },
  { rank: 2, name: 'Daniel Kim', title: 'Senior Developer', avatar: 'DK', blueprintRate: 1102, blueprintTrend: 12, vettingAccuracy: 93, questCompletion: 28, totalCP: 15420 },
  { rank: 3, name: 'Arjun Patel', title: 'Staff Engineer', avatar: 'AP', blueprintRate: 968, blueprintTrend: 15, vettingAccuracy: 90, questCompletion: 26, totalCP: 13860 },
  { rank: 4, name: 'Sarah Johnson', title: 'Principal Engineer', avatar: 'SJ', blueprintRate: 876, blueprintTrend: 8, vettingAccuracy: 91, questCompletion: 24, totalCP: 12230 },
  { rank: 5, name: 'Miguel Lopez', title: 'Engineering Manager', avatar: 'ML', blueprintRate: 812, blueprintTrend: 10, vettingAccuracy: 89, questCompletion: 21, totalCP: 11150 },
];

export const performingAgents: PerformingAgent[] = [
  { rank: 1, name: 'GitHub Copilot CLI', source: 'Official', logoColor: '#24292e', logoText: 'GH', successRate: 98.6, efficiencyQuotient: 8.7, niche: '#1 Code Assistant', score: 9842 },
  { rank: 2, name: 'OpenAI Codex', source: 'Official', logoColor: '#10a37f', logoText: 'OA', successRate: 97.2, efficiencyQuotient: 8.1, niche: '#1 Code Generation', score: 9210 },
  { rank: 3, name: 'Atlassian Jira Agent', source: 'Partner', logoColor: '#0052cc', logoText: 'AT', successRate: 95.4, efficiencyQuotient: 7.6, niche: '#1 Jira Triage', score: 8765 },
];

export const topMentors: TopMentor[] = [
  { rank: 1, name: 'Alex Morgan', title: 'Logic Architect', avatar: 'AM', traceUpvotes: 1560, shortsEngagement: 24300, forkTree: 312, totalCP: 16320 },
  { rank: 2, name: 'Nina Patel', title: 'Staff Engineer', avatar: 'NP', traceUpvotes: 1248, shortsEngagement: 19800, forkTree: 278, totalCP: 13980 },
  { rank: 3, name: 'Rohan Das', title: 'Senior Developer', avatar: 'RD', traceUpvotes: 1102, shortsEngagement: 15600, forkTree: 210, totalCP: 11540 },
];

export const needsBuilder = [
  { id: 'auto-pr-reviewer', name: 'Auto PR Reviewer', category: 'Security', vettedBy: 32, logoColor: '#374151', logoText: '</>' },
  { id: 'data-quality-sentinel', name: 'Data Quality Sentinel', category: 'Data', vettedBy: 28, logoColor: '#336791', logoText: 'DQ' },
  { id: 'cloud-cost-optimizer', name: 'Cloud Cost Optimizer', category: 'Cloud Ops', vettedBy: 25, logoColor: '#64748b', logoText: 'CC' },
];
