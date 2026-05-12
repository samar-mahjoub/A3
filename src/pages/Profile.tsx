import { Link, useNavigate } from 'react-router-dom';
import { LogOut, ExternalLink, Star, Bot } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { agents } from '../data/agents';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-24">
        <p className="text-gray-500 text-sm">You need to sign in to view your profile.</p>
        <Link to="/login" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">Sign in</Link>
      </div>
    );
  }

  const installedAgents = agents.filter((a) => user.installedAgents.includes(a.id));
  const monthlySpend = installedAgents.filter((a) => a.price > 0).reduce((sum, a) => sum + a.price, 0);
  const cpToNext = 15000;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gray-800 text-white text-lg font-bold flex items-center justify-center">
            {user.avatar}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-red-50 text-red-600 font-semibold border border-red-100 px-2 py-0.5 rounded-full">
                Level {user.level} · {user.levelTitle}
              </span>
              <div className="flex items-center gap-1">
                <Star size={11} className="text-amber-400 fill-amber-400" />
                <span className="text-xs text-gray-600 font-medium">{user.cp.toLocaleString()} CP</span>
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => { logout(); navigate('/'); }}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-200 px-3 py-2 rounded-lg transition-all">
          <LogOut size={14} /> Sign out
        </button>
      </div>

      {/* CP progress */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-gray-900">Progress to Level {user.level + 1}</p>
          <span className="text-xs text-gray-500">{user.cp.toLocaleString()} / {cpToNext.toLocaleString()} CP</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className="bg-red-600 h-2 rounded-full" style={{ width: `${(user.cp / cpToNext) * 100}%` }} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Installed agents', value: installedAgents.length },
          { label: 'Monthly spend', value: monthlySpend > 0 ? `$${monthlySpend}/mo` : '$0' },
          { label: 'Contribution points', value: user.cp.toLocaleString() },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Installed agents */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-4">My Agents</h2>
        {installedAgents.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
            <Bot size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500 mb-4">No agents installed yet.</p>
            <Link to="/agents" className="inline-flex bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors">
              Browse marketplace
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {installedAgents.map((agent) => (
              <div key={agent.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 hover:border-gray-300 transition-colors">
                <div className="w-10 h-10 rounded-xl text-white text-xs font-bold flex items-center justify-center shrink-0" style={{ backgroundColor: agent.logoColor }}>
                  {agent.logoText}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{agent.name}</p>
                  <p className="text-xs text-gray-400">{agent.source}</p>
                  <p className="text-xs font-medium text-green-600 mt-0.5">{agent.price === 0 ? 'Free' : `$${agent.price}/mo`}</p>
                </div>
                <Link to={`/agent/${agent.id}`} className="text-gray-400 hover:text-red-500 transition-colors shrink-0">
                  <ExternalLink size={15} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
