import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Bot, ExternalLink, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { agents } from '../data/agents';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <p className="text-slate-400">You need to sign in to view your profile.</p>
        <Link to="/login" className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
          Sign in
        </Link>
      </div>
    );
  }

  const installedAgents = agents.filter((a) => user.installedAgents.includes(a.id));
  const paidAgents = installedAgents.filter((a) => a.price > 0);
  const monthlySpend = paidAgents.reduce((sum, a) => sum + a.price, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex-1">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-violet-500/20">
              {user.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="text-slate-400 text-sm">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 border border-white/10 hover:border-red-400/20 px-4 py-2 rounded-xl transition-all"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Installed agents', value: user.installedAgents.length, icon: Bot },
            { label: 'Paid agents', value: paidAgents.length, icon: ShoppingBag },
            { label: 'Monthly spend', value: `$${monthlySpend}/mo`, icon: ShoppingBag },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#16161e] border border-white/8 rounded-2xl p-5">
              <p className="text-slate-400 text-sm mb-1">{label}</p>
              <p className="text-2xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* Installed agents */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-5">My Agents</h2>
          {installedAgents.length === 0 ? (
            <div className="bg-[#16161e] border border-white/8 rounded-2xl p-10 text-center">
              <Bot size={36} className="text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 mb-4">No agents installed yet.</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
              >
                Browse marketplace
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {installedAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="bg-[#16161e] border border-white/8 rounded-2xl p-5 flex items-center gap-4 hover:border-violet-500/30 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-2xl shrink-0`}>
                    {agent.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate">{agent.name}</p>
                    <p className="text-slate-400 text-sm">{agent.category}</p>
                    <p className="text-xs text-emerald-400 font-medium mt-0.5">
                      {agent.price === 0 ? 'Free' : `$${agent.price}/mo`}
                    </p>
                  </div>
                  <Link
                    to={`/agent/${agent.id}`}
                    className="text-slate-500 hover:text-violet-400 transition-colors shrink-0"
                    title="View details"
                  >
                    <ExternalLink size={16} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
