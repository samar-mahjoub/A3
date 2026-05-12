import { Link } from 'react-router-dom';
import {
  Bot, Zap, CheckCircle, Clock, ArrowRight, Plus,
  Rocket, Users, FlaskConical, TrendingUp, Star,
} from 'lucide-react';
import Sparkline from '../components/Sparkline';
import { useAuth } from '../context/AuthContext';
import { agents } from '../data/agents';

const sparkData = {
  agentsUsed: [12, 15, 11, 18, 20, 16, 22, 19, 24],
  tasks: [80, 95, 88, 120, 105, 140, 130, 160, 186],
  success: [94, 95.2, 96, 95.5, 96.8, 96.2, 97, 96.4],
  time: [8, 10, 9, 12, 11, 14, 13, 15, 16.8],
};

const recentActivity = [
  { id: 1, icon: Bot, color: 'text-red-500', action: 'You used Code Review Agent', sub: 'Code Review · Version 2.1', time: '10 min ago' },
  { id: 2, icon: Zap, color: 'text-purple-500', action: 'You installed JIRA Connector Plugin', sub: 'Plugin', time: '1 hr ago' },
  { id: 3, icon: FlaskConical, color: 'text-blue-500', action: 'You submitted "API Docs Agent" in DX Lab', sub: 'Idea Submission', time: '3 hrs ago' },
  { id: 4, icon: Users, color: 'text-green-500', action: 'You shared Prompt Template: API Best Practices', sub: 'In DX Collective', time: '5 hrs ago' },
];

const continueBuildingItems = [
  { name: 'API Docs Agent', status: 'In Progress', progress: 60 },
  { name: 'Security Scan Agent', status: 'Draft', progress: 20 },
  { name: 'Incident Triage Agent', status: 'Draft', progress: 10 },
];

const leaderboardTop = [
  { rank: 1, name: 'Alex Kim', title: 'Principal Developer', avatar: 'AK', cp: 12450 },
  { rank: 2, name: 'Sarah J.', title: 'AI Architect', avatar: 'SJ', cp: 9230 },
  { rank: 3, name: 'Dev Team A', title: 'Platform Team', avatar: 'DT', cp: 7860 },
  { rank: 4, name: 'Mike Ross', title: 'Senior Developer', avatar: 'MR', cp: 6210 },
  { rank: 5, name: 'Code Wizards', title: 'Engineering Team', avatar: 'CW', cp: 5430 },
];

const publishSteps = [
  { label: 'Define Use Case' },
  { label: 'Build in DX Lab' },
  { label: 'Test & Validate' },
  { label: 'Submit for Review' },
  { label: 'Publish to Marketplace' },
];

const recommendedAgents = agents.slice(0, 4);

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Page header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name.split(' ')[0] ?? 'Guest'}!
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">What will you build, automate, or discover today?</p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/lab"
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm shadow-red-600/20"
          >
            <Plus size={16} /> Build in DX Lab
          </Link>
          <Link
            to="/how-to-publish"
            className="flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg border border-gray-200 transition-colors"
          >
            <Rocket size={16} /> How to Publish
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Agents Used', value: '24', change: '↑ 20%', sparkData: sparkData.agentsUsed, icon: Bot },
          { label: 'Tasks Executed', value: '186', change: '↑ 18%', sparkData: sparkData.tasks, icon: Zap },
          { label: 'Success Rate', value: '96.4%', change: '↑ 2.7%', sparkData: sparkData.success, icon: CheckCircle },
          { label: 'Time Saved', value: '16.8 hrs', change: '↑ 15%', sparkData: sparkData.time, icon: Clock },
        ].map(({ label, value, change, sparkData: sd, icon: Icon }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon size={16} className="text-red-500" />
                <span className="text-sm text-gray-500">{label}</span>
              </div>
              <Sparkline data={sd} color="#dc2626" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-green-600 font-medium mt-0.5">
                {change} <span className="text-gray-400 font-normal">vs last 7 days</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Quick Access */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Access</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { to: '/agents', icon: Bot, label: 'Browse Agents', sub: 'Discover and use vetted agents' },
                { to: '/lab', icon: FlaskConical, label: 'DX Lab', sub: 'Build and test your ideas' },
                { to: '/how-to-publish', icon: Rocket, label: 'How to Publish', sub: 'Learn how to publish your agent' },
                { to: '/collective', icon: Users, label: 'DX Collective', sub: 'Learn, share and grow with the community' },
              ].map(({ to, icon: Icon, label, sub }) => (
                <Link
                  key={to}
                  to={to}
                  className="border border-gray-200 rounded-xl p-3 hover:border-red-200 hover:bg-red-50/30 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center mb-2 transition-colors">
                    <Icon size={16} className="text-gray-600 group-hover:text-red-600 transition-colors" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{label}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{sub}</p>
                  <ArrowRight size={13} className="text-gray-400 group-hover:text-red-500 mt-2 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="flex flex-col gap-3">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon size={12} className={item.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 font-medium leading-tight">{item.action}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended for You */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Recommended for You</h2>
                <p className="text-xs text-gray-500">Agents and resources tailored to your interests and activity.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {recommendedAgents.map((agent) => (
                <Link
                  key={agent.id}
                  to={`/agent/${agent.id}`}
                  className="border border-gray-200 rounded-xl p-3 hover:border-gray-300 hover:shadow-sm transition-all group"
                >
                  <div
                    className="w-8 h-8 rounded-lg text-white text-xs font-bold flex items-center justify-center mb-2"
                    style={{ backgroundColor: agent.logoColor }}
                  >
                    {agent.logoText}
                  </div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-red-600 transition-colors">{agent.name}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug line-clamp-2">{agent.tagline}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span className="text-[11px] text-gray-500">{agent.rating}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Continue Building */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Continue Building</h2>
              <Link to="/lab" className="text-xs text-red-600 hover:text-red-700 font-medium">View All</Link>
            </div>
            <div className="flex flex-col gap-4">
              {continueBuildingItems.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                    <span className="text-xs text-gray-400">{item.status}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-red-600 h-1.5 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5 text-right">{item.progress}%</p>
                </div>
              ))}
            </div>
            <Link
              to="/lab"
              className="mt-3 flex items-center justify-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium border border-red-200 rounded-lg py-2 hover:bg-red-50 transition-colors"
            >
              Go to DX Lab →
            </Link>
          </div>

          {/* Leaderboard */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Leaderboard</h2>
              <span className="text-xs text-red-600 font-medium border border-red-100 bg-red-50 px-2 py-0.5 rounded-full">This Week</span>
            </div>
            <div className="flex flex-col gap-3">
              {leaderboardTop.map((person) => (
                <div key={person.rank} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400 w-4 text-center">{person.rank}</span>
                  <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {person.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{person.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{person.title}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{person.cp.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <Link
              to="/leaderboard"
              className="mt-3 flex items-center justify-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium"
            >
              View Full Leaderboard →
            </Link>
          </div>

          {/* How to Publish */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">How to Publish</h2>
              <Link to="/how-to-publish" className="text-xs text-red-600 hover:text-red-700 font-medium">View Guide</Link>
            </div>
            <div className="flex items-center gap-1 mb-3">
              {publishSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-1 flex-1">
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                      <TrendingUp size={11} className="text-gray-500" />
                    </div>
                    <p className="text-[9px] text-gray-500 text-center leading-tight">{step.label}</p>
                  </div>
                  {i < publishSteps.length - 1 && <ArrowRight size={10} className="text-gray-300 shrink-0 mb-3" />}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mb-3">Ready to share your agent with the enterprise?</p>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
              Start Publishing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
