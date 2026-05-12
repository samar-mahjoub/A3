import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Check } from 'lucide-react';
import type { Agent } from '../types';
import { useCart } from '../context/CartContext';

interface Props {
  agent: Agent;
}

export default function AgentCard({ agent }: Props) {
  const { addToCart, items } = useCart();
  const inCart = items.some((i) => i.agent.id === agent.id);

  return (
    <div className="group relative bg-[#16161e] border border-white/8 rounded-2xl overflow-hidden hover:border-violet-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 flex flex-col">
      {/* Gradient header */}
      <div className={`h-24 bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-4xl relative`}>
        <span>{agent.icon}</span>
        {agent.featured && (
          <span className="absolute top-2 right-2 text-[10px] font-bold bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
            FEATURED
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <Link
              to={`/agent/${agent.id}`}
              className="font-semibold text-white text-lg hover:text-violet-300 transition-colors leading-tight"
            >
              {agent.name}
            </Link>
            <span className="text-lg font-bold text-white whitespace-nowrap">
              {agent.price === 0 ? (
                <span className="text-emerald-400 text-sm font-semibold">Free</span>
              ) : (
                <span className="text-sm">${agent.price}<span className="text-slate-400 text-xs font-normal">/mo</span></span>
              )}
            </span>
          </div>
          <p className="text-slate-400 text-sm">{agent.tagline}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {agent.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[11px] bg-white/5 border border-white/8 text-slate-400 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Rating & installs */}
        <div className="flex items-center justify-between text-sm text-slate-400 mt-auto pt-2">
          <div className="flex items-center gap-1">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span className="text-white font-medium">{agent.rating}</span>
            <span>({agent.reviewCount})</span>
          </div>
          <span>{(agent.installs / 1000).toFixed(1)}k installs</span>
        </div>

        {/* Add to cart */}
        <button
          onClick={(e) => { e.preventDefault(); addToCart(agent); }}
          disabled={inCart || agent.price === 0}
          className={`mt-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            agent.price === 0
              ? 'bg-emerald-500/15 text-emerald-400 cursor-default'
              : inCart
              ? 'bg-violet-500/15 text-violet-300 cursor-default'
              : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-500/30'
          }`}
        >
          {agent.price === 0 ? (
            <>Install Free</>
          ) : inCart ? (
            <><Check size={15} /> Added to cart</>
          ) : (
            <><ShoppingCart size={15} /> Add to cart</>
          )}
        </button>
      </div>
    </div>
  );
}
