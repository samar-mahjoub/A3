import { Link } from 'react-router-dom';
import { Download, Users, MoreHorizontal, Circle } from 'lucide-react';
import type { Agent } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface Props {
  agent: Agent;
}

function SourceBadge({ source }: { source: Agent['source'] }) {
  if (source === 'Official (Verified)') {
    return (
      <span className="flex items-center gap-1 text-[11px] font-medium text-red-600">
        <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
        Official (Verified)
      </span>
    );
  }
  if (source === 'Partner') {
    return (
      <span className="flex items-center gap-1 text-[11px] font-medium text-gray-500">
        <Circle size={8} className="text-gray-400" />
        Partner
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-[11px] font-medium text-gray-400">
      <Circle size={8} className="text-gray-300" />
      Custom (Community)
    </span>
  );
}

export default function AgentCard({ agent }: Props) {
  const { addToCart, items } = useCart();
  const { user, installAgent } = useAuth();
  const inCart = items.some((i) => i.agent.id === agent.id);
  const isInstalled = user?.installedAgents.includes(agent.id);

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (agent.price === 0) {
      installAgent(agent.id);
    } else if (!inCart) {
      addToCart(agent);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all flex flex-col gap-3">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ backgroundColor: agent.logoColor }}
          >
            {agent.logoText}
          </div>
          <SourceBadge source={agent.source} />
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-0.5">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Name + handle */}
      <div>
        <Link
          to={`/agent/${agent.id}`}
          className="text-[15px] font-semibold text-gray-900 hover:text-red-600 transition-colors leading-tight block mb-0.5"
        >
          {agent.name}
        </Link>
        <p className="text-xs text-gray-400">
          {agent.handle} · {agent.version}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
        {agent.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {agent.tags.map((tag) => (
          <span key={tag} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 pt-1 border-t border-gray-100">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Download size={12} />
          <span>{(agent.installs / 1000).toFixed(1)}K installs</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Users size={12} />
          <span>{(agent.activeUsers / 1000).toFixed(1)}K active</span>
        </div>
        <div className="ml-auto">
          <button
            onClick={handleAction}
            disabled={isInstalled || (inCart && agent.price > 0)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
              isInstalled
                ? 'border-green-200 text-green-700 bg-green-50 cursor-default'
                : inCart && agent.price > 0
                ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-default'
                : 'border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50 bg-white'
            }`}
          >
            {isInstalled ? 'Installed' : inCart && agent.price > 0 ? 'In cart' : agent.price === 0 ? 'Use Agent' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
