import { useState, useMemo } from 'react';
import { Heart, Clock, Grid3x3, List, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import AgentCard from '../components/AgentCard';
import { agents, agentDomains, agentPhases, techStacks } from '../data/agents';
import type { Agent } from '../types';

const sources = ['Official (Verified)', 'Partner', 'Custom (Community)'] as const;
const maturities = ['Stable', 'Beta', 'Experimental'] as const;

function FilterGroup({
  title,
  items,
  counts,
  selected,
  onToggle,
  tooltip,
}: {
  title: string;
  items: readonly string[];
  counts: Record<string, number>;
  selected: Set<string>;
  onToggle: (v: string) => void;
  tooltip?: boolean;
}) {
  const [expanded, setExpanded] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const visible = showMore ? items : items.slice(0, 5);

  return (
    <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
      <button
        className="flex items-center justify-between w-full mb-2.5"
        onClick={() => setExpanded((v) => !v)}
      >
        <span className="text-xs font-semibold text-gray-700 flex items-center gap-1">
          {title}
          {tooltip && <span className="text-gray-400 cursor-help text-[10px] border border-gray-300 rounded-full w-3.5 h-3.5 inline-flex items-center justify-center">i</span>}
        </span>
        <ChevronDown size={13} className={`text-gray-400 transition-transform ${expanded ? '' : '-rotate-90'}`} />
      </button>
      {expanded && (
        <div className="flex flex-col gap-1.5">
          {visible.map((item) => (
            <label key={item} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selected.has(item)}
                onChange={() => onToggle(item)}
                className="w-3.5 h-3.5 rounded border-gray-300 text-red-600 accent-red-600"
              />
              <span className="text-xs text-gray-600 group-hover:text-gray-900 flex-1 transition-colors">{item}</span>
              <span className="text-[10px] text-gray-400">{counts[item] ?? 0}</span>
            </label>
          ))}
          {items.length > 5 && (
            <button
              onClick={() => setShowMore((v) => !v)}
              className="text-[11px] text-red-600 hover:text-red-700 font-medium text-left mt-0.5"
            >
              {showMore ? 'Show less ∧' : `Show more ∨`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function AgentsPage() {
  const [tab, setTab] = useState<'all' | 'favorites' | 'recent'>('all');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSources, setSelectedSources] = useState<Set<string>>(new Set(['Official (Verified)']));
  const [selectedMaturities, setSelectedMaturities] = useState<Set<string>>(new Set());
  const [selectedDomains, setSelectedDomains] = useState<Set<string>>(new Set());
  const [selectedPhases, setSelectedPhases] = useState<Set<string>>(new Set());
  const [selectedTech, setSelectedTech] = useState<Set<string>>(new Set());

  const toggle = (set: Set<string>, val: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    setter(next);
  };

  const clearAll = () => {
    setSelectedSources(new Set());
    setSelectedMaturities(new Set());
    setSelectedDomains(new Set());
    setSelectedPhases(new Set());
    setSelectedTech(new Set());
  };

  const hasFilters =
    selectedSources.size > 0 || selectedMaturities.size > 0 ||
    selectedDomains.size > 0 || selectedPhases.size > 0 || selectedTech.size > 0;

  const counts = useMemo(() => {
    const src: Record<string, number> = {};
    const mat: Record<string, number> = {};
    const dom: Record<string, number> = {};
    const ph: Record<string, number> = {};
    const tech: Record<string, number> = {};
    for (const a of agents) {
      src[a.source] = (src[a.source] ?? 0) + 1;
      mat[a.maturity] = (mat[a.maturity] ?? 0) + 1;
      dom[a.domain] = (dom[a.domain] ?? 0) + 1;
      ph[a.phase] = (ph[a.phase] ?? 0) + 1;
      for (const t of a.techStack) tech[t] = (tech[t] ?? 0) + 1;
    }
    return { src, mat, dom, ph, tech };
  }, []);

  const filtered = useMemo(() => {
    let list: Agent[] = [...agents];
    if (selectedSources.size > 0) list = list.filter((a) => selectedSources.has(a.source));
    if (selectedMaturities.size > 0) list = list.filter((a) => selectedMaturities.has(a.maturity));
    if (selectedDomains.size > 0) list = list.filter((a) => selectedDomains.has(a.domain));
    if (selectedPhases.size > 0) list = list.filter((a) => selectedPhases.has(a.phase));
    if (selectedTech.size > 0) list = list.filter((a) => a.techStack.some((t) => selectedTech.has(t)));

    switch (sortBy) {
      case 'Most Popular': list.sort((a, b) => b.installs - a.installs); break;
      case 'Top Rated': list.sort((a, b) => b.rating - a.rating); break;
      case 'Newest': list.sort((a, b) => parseFloat(b.version.slice(1)) - parseFloat(a.version.slice(1))); break;
      case 'Price: Low → High': list.sort((a, b) => a.price - b.price); break;
    }
    return list;
  }, [selectedSources, selectedMaturities, selectedDomains, selectedPhases, selectedTech, sortBy]);

  return (
    <div className="flex h-full">
      {/* Main content */}
      <div className="flex-1 min-w-0 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900">Agents</h1>
          <p className="text-sm text-gray-500 mt-0.5">Discover, evaluate, and use trusted enterprise agents.</p>
        </div>

        {/* Tabs + sort */}
        <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
            {[
              { key: 'all', label: `All Agents`, count: agents.length, icon: null },
              { key: 'favorites', label: 'My Favorites', count: null, icon: <Heart size={13} /> },
              { key: 'recent', label: 'Recently Used', count: null, icon: <Clock size={13} /> },
            ].map(({ key, label, count, icon }) => (
              <button
                key={key}
                onClick={() => setTab(key as typeof tab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  tab === key ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {icon}
                {label}
                {count !== null && (
                  <span className={`text-[11px] font-bold ${tab === key ? 'text-red-100' : 'text-gray-400'}`}>
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-red-300"
            >
              {['Most Popular', 'Top Rated', 'Newest', 'Price: Low → High'].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md border transition-colors ${viewMode === 'grid' ? 'border-red-300 bg-red-50 text-red-600' : 'border-gray-200 text-gray-400 hover:text-gray-600'}`}
            >
              <Grid3x3 size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md border transition-colors ${viewMode === 'list' ? 'border-red-300 bg-red-50 text-red-600' : 'border-gray-200 text-gray-400 hover:text-gray-600'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
          {filtered.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>

      {/* Filter sidebar */}
      <aside className="w-56 shrink-0 border-l border-gray-200 bg-white p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal size={14} className="text-gray-600" />
            <span className="text-sm font-semibold text-gray-900">Filters</span>
          </div>
          {hasFilters && (
            <button onClick={clearAll} className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-0.5">
              Clear all <X size={11} />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <FilterGroup title="Source & Trust" tooltip={true} items={sources} counts={counts.src} selected={selectedSources} onToggle={(v) => toggle(selectedSources, v, setSelectedSources)} />
          <FilterGroup title="Lifecycle & Maturity" tooltip={true} items={maturities} counts={counts.mat} selected={selectedMaturities} onToggle={(v) => toggle(selectedMaturities, v, setSelectedMaturities)} />
          <FilterGroup title="Systems & Domains" tooltip={true} items={agentDomains} counts={counts.dom} selected={selectedDomains} onToggle={(v) => toggle(selectedDomains, v, setSelectedDomains)} />
          <FilterGroup title="Phase" tooltip={true} items={agentPhases} counts={counts.ph} selected={selectedPhases} onToggle={(v) => toggle(selectedPhases, v, setSelectedPhases)} />
          <FilterGroup title="Technical Stack" tooltip={true} items={techStacks} counts={counts.tech} selected={selectedTech} onToggle={(v) => toggle(selectedTech, v, setSelectedTech)} />
        </div>

        <button className="mt-4 flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-medium">
          <SlidersHorizontal size={12} /> Advanced filters
        </button>
      </aside>
    </div>
  );
}
