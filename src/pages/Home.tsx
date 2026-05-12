import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import AgentCard from '../components/AgentCard';
import { agents, categories } from '../data/agents';
import type { AgentCategory } from '../types';

type SortKey = 'featured' | 'rating' | 'price-asc' | 'price-desc' | 'installs';

export default function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | AgentCategory>('All');
  const [sort, setSort] = useState<SortKey>('featured');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');

  const filtered = useMemo(() => {
    let list = [...agents];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.tagline.toLowerCase().includes(q) ||
          a.tags.some((t) => t.includes(q)) ||
          a.category.toLowerCase().includes(q),
      );
    }

    if (category !== 'All') {
      list = list.filter((a) => a.category === category);
    }

    if (priceFilter === 'free') list = list.filter((a) => a.price === 0);
    if (priceFilter === 'paid') list = list.filter((a) => a.price > 0);

    switch (sort) {
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'installs':
        list.sort((a, b) => b.installs - a.installs);
        break;
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [query, category, sort, priceFilter]);

  const featuredAgents = agents.filter((a) => a.featured).slice(0, 3);

  return (
    <div className="flex-1">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-transparent to-indigo-900/20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/10 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Sparkles size={12} /> 8 agents available · Powered by Claude
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight mb-4 leading-tight">
            The Marketplace for<br />
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              AI Agents
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
            Discover, deploy, and manage AI agents that automate your most complex workflows.
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search agents by name, category, or tag…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-10 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Featured strip */}
        {!query && category === 'All' && (
          <div className="mb-12">
            <h2 className="text-white font-semibold text-xl mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-violet-400" /> Featured Agents
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {featuredAgents.map((agent) => (
                <div
                  key={agent.id}
                  className={`relative rounded-2xl bg-gradient-to-br ${agent.gradient} p-px`}
                >
                  <div className="bg-[#16161e] rounded-2xl p-5 h-full flex flex-col gap-2">
                    <span className="text-3xl">{agent.icon}</span>
                    <p className="text-white font-semibold text-lg leading-tight">{agent.name}</p>
                    <p className="text-slate-400 text-sm flex-1">{agent.tagline}</p>
                    <p className="text-violet-300 text-sm font-semibold">
                      {agent.price === 0 ? 'Free' : `$${agent.price}/mo`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Category pills */}
          <div className="flex gap-2 flex-wrap flex-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat as typeof category)}
                className={`text-sm px-3.5 py-1.5 rounded-full border font-medium transition-all ${
                  category === cat
                    ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-600/20'
                    : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white bg-white/3'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort + price */}
          <div className="flex gap-2 shrink-0">
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as typeof priceFilter)}
              className="bg-white/5 border border-white/10 text-slate-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-violet-500/50"
            >
              <option value="all">All prices</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-white/5 border border-white/10 text-slate-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-violet-500/50"
            >
              <option value="featured">Featured first</option>
              <option value="rating">Top rated</option>
              <option value="installs">Most installed</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Results header */}
        <div className="flex items-center gap-2 mb-5 text-sm text-slate-500">
          <SlidersHorizontal size={14} />
          <span>{filtered.length} agent{filtered.length !== 1 ? 's' : ''}</span>
          {query && <span>matching "<span className="text-slate-300">{query}</span>"</span>}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-slate-500">
            <Search size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-lg">No agents found</p>
            <p className="text-sm mt-1">Try a different search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
