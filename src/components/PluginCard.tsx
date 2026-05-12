import { Download, Users, MoreHorizontal, Plus } from 'lucide-react';
import type { Plugin } from '../types';

function SourceBadge({ source }: { source: Plugin['source'] }) {
  const styles = {
    Internal: 'bg-gray-100 text-gray-600',
    External: 'bg-blue-50 text-blue-600',
    Beta: 'bg-amber-50 text-amber-600',
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${styles[source]}`}>
      {source}
    </span>
  );
}

export default function PluginCard({ plugin }: { plugin: Plugin }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all flex flex-col gap-3">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-[11px] font-bold shrink-0 border border-gray-100"
            style={{ backgroundColor: plugin.logoColor }}
          >
            {plugin.logoText}
          </div>
          <SourceBadge source={plugin.source} />
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-0.5">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Name + handle */}
      <div>
        <p className="text-[15px] font-semibold text-gray-900 leading-tight mb-0.5">{plugin.name}</p>
        <p className="text-xs text-gray-400">
          {plugin.handle} · {plugin.version}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
        {plugin.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {plugin.tags.map((tag) => (
          <span key={tag} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 pt-1 border-t border-gray-100">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Download size={12} />
          <span>{(plugin.installs / 1000).toFixed(1)}K installs</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Users size={12} />
          <span>{(plugin.activeUsers / 1000).toFixed(1)}K active</span>
        </div>
        <div className="ml-auto">
          <button className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50 bg-white transition-colors">
            <Plus size={12} /> Add Plugin
          </button>
        </div>
      </div>
    </div>
  );
}
