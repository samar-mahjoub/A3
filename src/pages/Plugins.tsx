import { useState, useMemo } from 'react';
import { Heart, Clock, Grid3x3, List, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import PluginCard from '../components/PluginCard';
import { plugins, pluginCategories, pluginCompatibility } from '../data/plugins';
import type { Plugin } from '../types';

const pluginSources = ['Internal', 'External', 'Beta'] as const;
const pricingOptions = ['Free', 'Paid'] as const;

function FilterGroup({
  title,
  items,
  counts,
  selected,
  onToggle,
}: {
  title: string;
  items: readonly string[];
  counts: Record<string, number>;
  selected: Set<string>;
  onToggle: (v: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
      <button className="flex items-center justify-between w-full mb-2.5" onClick={() => setExpanded((v) => !v)}>
        <span className="text-xs font-semibold text-gray-700">{title}</span>
        <ChevronDown size={13} className={`text-gray-400 transition-transform ${expanded ? '' : '-rotate-90'}`} />
      </button>
      {expanded && (
        <div className="flex flex-col gap-1.5">
          {items.map((item) => (
            <label key={item} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selected.has(item)}
                onChange={() => onToggle(item)}
                className="w-3.5 h-3.5 rounded border-gray-300 accent-red-600"
              />
              <span className="text-xs text-gray-600 group-hover:text-gray-900 flex-1">{item}</span>
              <span className="text-[10px] text-gray-400">{counts[item] ?? 0}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PluginsPage() {
  const [tab, setTab] = useState<'all' | 'favorites' | 'recent'>('all');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSources, setSelectedSources] = useState<Set<string>>(new Set());
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedCompat, setSelectedCompat] = useState<Set<string>>(new Set());
  const [selectedPricing, setSelectedPricing] = useState<Set<string>>(new Set(['Free']));

  const toggle = (set: Set<string>, val: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    setter(next);
  };

  const clearAll = () => {
    setSelectedSources(new Set());
    setSelectedCategories(new Set());
    setSelectedCompat(new Set());
    setSelectedPricing(new Set());
  };

  const hasFilters = selectedSources.size > 0 || selectedCategories.size > 0 || selectedCompat.size > 0 || selectedPricing.size > 0;

  const counts = useMemo(() => {
    const src: Record<string, number> = {};
    const cat: Record<string, number> = {};
    const compat: Record<string, number> = {};
    const pricing: Record<string, number> = {};
    for (const p of plugins) {
      src[p.source] = (src[p.source] ?? 0) + 1;
      cat[p.category] = (cat[p.category] ?? 0) + 1;
      for (const c of p.compatibility) compat[c] = (compat[c] ?? 0) + 1;
      pricing[p.pricing] = (pricing[p.pricing] ?? 0) + 1;
    }
    return { src, cat, compat, pricing };
  }, []);

  const filtered = useMemo(() => {
    let list: Plugin[] = [...plugins];
    if (selectedSources.size > 0) list = list.filter((p) => selectedSources.has(p.source));
    if (selectedCategories.size > 0) list = list.filter((p) => selectedCategories.has(p.category));
    if (selectedCompat.size > 0) list = list.filter((p) => p.compatibility.some((c) => selectedCompat.has(c)));
    if (selectedPricing.size > 0) list = list.filter((p) => selectedPricing.has(p.pricing));
    if (sortBy === 'Most Popular') list.sort((a, b) => b.installs - a.installs);
    else if (sortBy === 'Most Active') list.sort((a, b) => b.activeUsers - a.activeUsers);
    return list;
  }, [selectedSources, selectedCategories, selectedCompat, selectedPricing, sortBy]);

  return (
    <div className="flex h-full">
      <div className="flex-1 min-w-0 p-6 overflow-y-auto">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900">Plugins</h1>
          <p className="text-sm text-gray-500 mt-0.5">Extend and customize your agent experience with powerful plugins.</p>
        </div>

        <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
            {[
              { key: 'all', label: `All Plugins`, count: plugins.length },
              { key: 'favorites', label: 'My Favorites', count: null },
              { key: 'recent', label: 'Recently Used', count: null },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setTab(key as typeof tab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  tab === key ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {key === 'favorites' && <Heart size={13} />}
                {key === 'recent' && <Clock size={13} />}
                {label}
                {count !== null && (
                  <span className={`text-[11px] font-bold ${tab === key ? 'text-red-100' : 'text-gray-400'}`}>{count}</span>
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
              {['Most Popular', 'Most Active'].map((v) => <option key={v}>{v}</option>)}
            </select>
            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md border transition-colors ${viewMode === 'grid' ? 'border-red-300 bg-red-50 text-red-600' : 'border-gray-200 text-gray-400 hover:text-gray-600'}`}>
              <Grid3x3 size={16} />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md border transition-colors ${viewMode === 'list' ? 'border-red-300 bg-red-50 text-red-600' : 'border-gray-200 text-gray-400 hover:text-gray-600'}`}>
              <List size={16} />
            </button>
          </div>
        </div>

        <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
          {filtered.map((plugin) => (
            <PluginCard key={plugin.id} plugin={plugin} />
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
          <FilterGroup title="Source" items={pluginSources} counts={counts.src} selected={selectedSources} onToggle={(v) => toggle(selectedSources, v, setSelectedSources)} />
          <FilterGroup title="Category" items={pluginCategories} counts={counts.cat} selected={selectedCategories} onToggle={(v) => toggle(selectedCategories, v, setSelectedCategories)} />
          <FilterGroup title="Compatibility" items={pluginCompatibility} counts={counts.compat} selected={selectedCompat} onToggle={(v) => toggle(selectedCompat, v, setSelectedCompat)} />
          <FilterGroup title="Pricing" items={pricingOptions} counts={counts.pricing} selected={selectedPricing} onToggle={(v) => toggle(selectedPricing, v, setSelectedPricing)} />
        </div>
        <button className="mt-4 flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-medium">
          <SlidersHorizontal size={12} /> Advanced Filters
        </button>
      </aside>
    </div>
  );
}
