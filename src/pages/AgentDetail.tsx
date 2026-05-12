import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Check,
  Zap,
  Users,
  Bot,
  ChevronRight,
  Download,
} from 'lucide-react';
import { agents } from '../data/agents';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';

export default function AgentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const agent = agents.find((a) => a.id === id);
  const { addToCart, items } = useCart();
  const { user, installAgent } = useAuth();

  if (!agent) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-400">
        <Bot size={48} className="opacity-30" />
        <p>Agent not found.</p>
        <Link to="/" className="text-violet-400 hover:underline text-sm">
          Back to marketplace
        </Link>
      </div>
    );
  }

  const inCart = items.some((i) => i.agent.id === agent.id);
  const isInstalled = user?.installedAgents.includes(agent.id);

  const handleAdd = () => {
    if (agent.price === 0) {
      if (!user) { navigate('/login'); return; }
      installAgent(agent.id);
    } else {
      addToCart(agent);
    }
  };

  const relatedAgents = agents
    .filter((a) => a.id !== agent.id && a.category === agent.category)
    .slice(0, 3);

  return (
    <div className="flex-1">
      {/* Breadcrumb */}
      <div className="border-b border-white/8 bg-[#0f0f13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-white transition-colors">Marketplace</Link>
          <ChevronRight size={14} />
          <span className="text-slate-400">{agent.category}</span>
          <ChevronRight size={14} />
          <span className="text-white">{agent.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Header */}
            <div className="flex gap-5 items-start">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-4xl shrink-0 shadow-lg`}>
                {agent.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="text-3xl font-bold text-white">{agent.name}</h1>
                  {agent.featured && (
                    <span className="text-xs bg-violet-500/20 border border-violet-500/30 text-violet-300 px-2 py-0.5 rounded-full font-semibold">
                      FEATURED
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-lg mb-3">{agent.tagline}</p>
                <div className="flex items-center flex-wrap gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={agent.rating} />
                    <span className="text-white font-medium">{agent.rating}</span>
                    <span>({agent.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download size={14} />
                    <span>{(agent.installs / 1000).toFixed(1)}k installs</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bot size={14} />
                    <span>{agent.modelPowered}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {agent.tags.map((tag) => (
                <span key={tag} className="text-xs bg-white/5 border border-white/10 text-slate-400 px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-white font-semibold text-lg mb-3">About</h2>
              <p className="text-slate-400 leading-relaxed">{agent.description}</p>
            </div>

            {/* Capabilities */}
            <div>
              <h2 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
                <Zap size={18} className="text-violet-400" /> Capabilities
              </h2>
              <ul className="flex flex-col gap-2.5">
                {agent.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-3 text-slate-300">
                    <Check size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
                <Users size={18} className="text-violet-400" /> User Reviews
              </h2>
              <div className="flex flex-col gap-4">
                {agent.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white/3 border border-white/8 rounded-xl p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {review.avatar}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{review.author}</p>
                        <p className="text-slate-500 text-xs">{review.date}</p>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{review.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Purchase card */}
            <div className="sticky top-24 bg-[#16161e] border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
              <div>
                <p className="text-slate-400 text-sm mb-1">Price</p>
                {agent.price === 0 ? (
                  <p className="text-3xl font-bold text-emerald-400">Free</p>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <p className="text-3xl font-bold text-white">${agent.price}</p>
                    <p className="text-slate-400 text-sm">/month</p>
                  </div>
                )}
              </div>

              <button
                onClick={handleAdd}
                disabled={(inCart && agent.price > 0) || isInstalled}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                  isInstalled
                    ? 'bg-emerald-500/15 text-emerald-400 cursor-default'
                    : inCart && agent.price > 0
                    ? 'bg-violet-500/15 text-violet-300 cursor-default'
                    : agent.price === 0
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
                    : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/20'
                }`}
              >
                {isInstalled ? (
                  <><Check size={16} /> Installed</>
                ) : inCart && agent.price > 0 ? (
                  <><Check size={16} /> In cart</>
                ) : agent.price === 0 ? (
                  <><Download size={16} /> Install for free</>
                ) : (
                  <><ShoppingCart size={16} /> Add to cart</>
                )}
              </button>

              {agent.price > 0 && !inCart && (
                <p className="text-xs text-slate-500 text-center">
                  Cancel anytime · 14-day free trial
                </p>
              )}

              <div className="border-t border-white/8 pt-4 flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Author</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[9px] font-bold text-white">
                      {agent.authorAvatar}
                    </div>
                    <span className="text-slate-300">{agent.author}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Category</span>
                  <span className="text-slate-300">{agent.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Powered by</span>
                  <span className="text-violet-300">{agent.modelPowered}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Installs</span>
                  <span className="text-slate-300">{agent.installs.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Related */}
            {relatedAgents.length > 0 && (
              <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4">Related agents</h3>
                <div className="flex flex-col gap-3">
                  {relatedAgents.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/agent/${rel.id}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${rel.gradient} flex items-center justify-center text-lg shrink-0`}>
                        {rel.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium group-hover:text-violet-300 transition-colors truncate">
                          {rel.name}
                        </p>
                        <p className="text-slate-500 text-xs">
                          {rel.price === 0 ? 'Free' : `$${rel.price}/mo`}
                        </p>
                      </div>
                      <Star size={12} className="fill-amber-400 text-amber-400 shrink-0" />
                      <span className="text-slate-400 text-xs">{rel.rating}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
