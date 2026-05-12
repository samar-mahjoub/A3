import { NavLink } from 'react-router-dom';
import {
  Home, Bot, Layers, Box, Puzzle, Share2,
  FlaskConical, Rocket, Users, Trophy,
  LayoutDashboard, UserCog, Shield, Settings, FileText,
  ChevronDown, Star,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navSection = (
  label: string,
  items: { to: string; icon: React.ReactNode; label: string; badge?: string }[],
) => ({ label, items });

const discover = navSection('DISCOVER', [
  { to: '/', icon: <Home size={16} />, label: 'Home' },
  { to: '/agents', icon: <Bot size={16} />, label: 'Agents' },
  { to: '/skills', icon: <Layers size={16} />, label: 'Skills' },
  { to: '/mcps', icon: <Box size={16} />, label: 'MCPs' },
  { to: '/plugins', icon: <Puzzle size={16} />, label: 'Plugins' },
  { to: '/integrations', icon: <Share2 size={16} />, label: 'Integrations' },
]);

const build = navSection('BUILD & PUBLISH', [
  { to: '/lab', icon: <FlaskConical size={16} />, label: 'DX Lab' },
  { to: '/how-to-publish', icon: <Rocket size={16} />, label: 'How to Publish' },
]);

const community = navSection('COMMUNITY', [
  { to: '/collective', icon: <Users size={16} />, label: 'DX Collective' },
  { to: '/leaderboard', icon: <Trophy size={16} />, label: 'Leaderboard', badge: 'NEW' },
]);

const admin = navSection('ADMIN', [
  { to: '/admin/overview', icon: <LayoutDashboard size={16} />, label: 'Overview' },
  { to: '/admin/users', icon: <UserCog size={16} />, label: 'Users' },
  { to: '/admin/roles', icon: <Shield size={16} />, label: 'Roles & Permissions' },
  { to: '/admin/settings', icon: <Settings size={16} />, label: 'Settings' },
  { to: '/admin/audit', icon: <FileText size={16} />, label: 'Audit Logs' },
]);

function NavItem({ to, icon, label, badge }: { to: string; icon: React.ReactNode; label: string; badge?: string }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? 'bg-red-50 text-red-600'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`
      }
    >
      {icon}
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="text-[10px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
          {badge}
        </span>
      )}
    </NavLink>
  );
}

export default function Sidebar() {
  const { user, logout } = useAuth();

  const sections = [discover, build, community];

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-gray-100">
        <NavLink to="/" className="flex items-center gap-1.5">
          <span className="text-xl font-black text-red-600 leading-none">DX</span>
          <span className="text-sm font-semibold text-gray-900">AgentPlace</span>
        </NavLink>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 flex flex-col gap-5 overflow-y-auto">
        {sections.map(({ label, items }) => (
          <div key={label}>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1">
              {label}
            </p>
            <div className="flex flex-col gap-0.5">
              {items.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </div>
          </div>
        ))}

        {user?.isAdmin && (
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1">
              ADMIN
            </p>
            <div className="flex flex-col gap-0.5">
              {admin.items.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Build with DX Lab CTA */}
      <div className="mx-3 mb-3 rounded-lg border border-red-100 bg-red-50 p-3">
        <div className="flex items-center gap-1.5 mb-1">
          <FlaskConical size={13} className="text-red-600" />
          <span className="text-xs font-semibold text-red-700">Build with DX Lab</span>
        </div>
        <p className="text-[11px] text-red-600/80 mb-2 leading-snug">
          Create, test and publish your custom agents, skills, or plugins.
        </p>
        <NavLink
          to="/lab"
          className="flex items-center gap-1 text-[11px] font-semibold text-white bg-red-600 hover:bg-red-700 px-2.5 py-1.5 rounded-md transition-colors w-full justify-center"
        >
          Go to DX Lab →
        </NavLink>
      </div>

      {/* User profile */}
      {user ? (
        <div className="border-t border-gray-100 p-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gray-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-[11px] text-gray-500">Level {user.level} · {user.levelTitle}</p>
            </div>
            <button onClick={logout} className="text-gray-400 hover:text-gray-600 transition-colors">
              <ChevronDown size={14} />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star size={11} className="text-amber-400 fill-amber-400" />
              <span className="text-xs text-gray-600 font-medium">{user.cp.toLocaleString()} pts</span>
            </div>
            <NavLink to="/profile" className="text-[11px] text-red-600 hover:text-red-700 font-medium">
              View Profile →
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="border-t border-gray-100 p-3 flex flex-col gap-2">
          <NavLink to="/login" className="text-sm text-center text-red-600 border border-red-200 hover:bg-red-50 py-2 rounded-md font-medium transition-colors">
            Sign in
          </NavLink>
        </div>
      )}
    </aside>
  );
}
