import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Download, Users, Bot, ChevronRight, Check, ShoppingCart, Zap, Circle } from 'lucide-react';
import { agents } from '../data/agents';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function SourceBadge({ source }: { source: string }) {
  if (source === 'Official (Verified)') {
    return <span className="flex items-center gap-1 text-xs font-medium text-red-600"><span className="w-2 h-2 rounded-full bg-red-600 inline-block" />{source}</span>;
  }
  if (source === 'Partner') {
    return <span className="flex items-center gap-1 text-xs font-medium text-gray-500"><Circle size={8} />{source}</span>;
  }
  return <span className="text-xs font-medium text-gray-400">{source}</span>;
}

export default function AgentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const agent = agents.find((a) => a.id === id);
  const { addToCart, items } = useCart();
  const { user, installAgent } = useAuth();

  if (!agent) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-500 py-24">
        <Bot size={40} className="opacity-30" />
        <p>Agent not found.</p>
        <Link to="/agents" className="text-red-600 hover:underline text-sm">Back to agents</Link>
      </div>
    );
  }

  const inCart = items.some((i) => i.agent.id === agent.id);
  const isInstalled = user?.installedAgents.includes(agent.id);
  const related = agents.filter((a) => a.id !== agent.id && a.category === agent.category).slice(0, 3);

  const handleAction = () => {
    if (agent.price === 0) {
      if (!user) { navigate('/login'); return; }
      installAgent(agent.id);
    } else {
      addToCart(agent);
    }
  };

  return (
    <div className="flex-1">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white px-6 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center gap-1.5 text-xs text-gray-500">
          <Link to="/agents" className="hover:text-gray-800 transition-colors">Agents</Link>
          <ChevronRight size={12} />
          <span>{agent.category}</span>
          <ChevronRight size={12} />
          <span className="text-gray-800">{agent.name}</span>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors group">
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Header */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex gap-4 items-start">
                <div className="w-16 h-16 rounded-2xl text-white text-lg font-bold flex items-center justify-center shrink-0" style={{ backgroundColor: agent.logoColor }}>
                  {agent.logoText}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
                    <SourceBadge source={agent.source} />
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{agent.handle} · {agent.version}</p>
                  <p className="text-gray-600 mb-3">{agent.tagline}</p>
                  <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span className="font-medium text-gray-800">{agent.rating}</span>
                      <span>({agent.reviewCount.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center gap-1"><Download size={13} />{(agent.installs / 1000).toFixed(1)}K installs</div>
                    <div className="flex items-center gap-1"><Users size={13} />{(agent.activeUsers / 1000).toFixed(1)}K active</div>
                    <div className="flex items-center gap-1"><Bot size={13} />{agent.modelPowered}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {agent.tags.map((t) => (
                <span key={t} className="text-xs bg-gray-100 text-gray-600 border border-gray-200 px-2.5 py-1 rounded-full">#{t}</span>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{agent.description}</p>
            </div>

            {/* Capabilities */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-1.5">
                <Zap size={15} className="text-red-500" /> Capabilities
              </h2>
              <ul className="flex flex-col gap-2">
                {agent.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check size={14} className="text-green-500 mt-0.5 shrink-0" />{cap}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            {agent.reviews.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Reviews</h2>
                <div className="flex flex-col gap-3">
                  {agent.reviews.map((r) => (
                    <div key={r.id} className="bg-white border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 text-[10px] font-bold flex items-center justify-center shrink-0">{r.avatar}</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{r.author}</p>
                          <p className="text-[11px] text-gray-400">{r.date}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={11} className={i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{r.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Purchase card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-20">
              <div className="mb-4">
                {agent.price === 0 ? (
                  <p className="text-2xl font-bold text-green-600">Free</p>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-bold text-gray-900">${agent.price}</p>
                    <p className="text-sm text-gray-400">/month</p>
                  </div>
                )}
              </div>
              <button
                onClick={handleAction}
                disabled={(inCart && agent.price > 0) || isInstalled}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all mb-2 ${
                  isInstalled ? 'bg-green-50 text-green-700 border border-green-200 cursor-default'
                  : inCart && agent.price > 0 ? 'bg-gray-50 text-gray-400 border border-gray-200 cursor-default'
                  : agent.price === 0 ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isInstalled ? <><Check size={14} /> Installed</>
                  : inCart && agent.price > 0 ? <><Check size={14} /> In cart</>
                  : agent.price === 0 ? 'Use Agent'
                  : <><ShoppingCart size={14} /> Add to cart</>}
              </button>
              {agent.price > 0 && !inCart && <p className="text-xs text-gray-400 text-center mb-4">14-day free trial · Cancel anytime</p>}

              <div className="border-t border-gray-100 pt-4 flex flex-col gap-2.5 text-sm">
                {[
                  { label: 'Author', value: agent.author },
                  { label: 'Category', value: agent.category },
                  { label: 'Maturity', value: agent.maturity },
                  { label: 'Powered by', value: agent.modelPowered },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-500">{label}</span>
                    <span className="text-gray-800 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Related agents</h3>
                <div className="flex flex-col gap-3">
                  {related.map((a) => (
                    <Link key={a.id} to={`/agent/${a.id}`} className="flex items-center gap-2.5 group">
                      <div className="w-8 h-8 rounded-lg text-white text-[10px] font-bold flex items-center justify-center shrink-0" style={{ backgroundColor: a.logoColor }}>{a.logoText}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors truncate">{a.name}</p>
                        <p className="text-xs text-gray-400">{a.price === 0 ? 'Free' : `$${a.price}/mo`}</p>
                      </div>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs text-gray-500">{a.rating}</span>
                      </div>
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
