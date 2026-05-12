import { useState } from 'react';
import { Crown, TrendingUp, ChevronDown, Info, ArrowRight } from 'lucide-react';
import { architectRankings, performingAgents, topMentors, needsBuilder } from '../data/leaderboard';

const heatmapData = Array.from({ length: 13 * 7 }, () => Math.random());

function HeatCell({ val }: { val: number }) {
  const opacity = val < 0.1 ? 0 : val < 0.3 ? 0.2 : val < 0.6 ? 0.5 : val < 0.85 ? 0.75 : 1;
  return (
    <div
      className="w-3 h-3 rounded-sm"
      style={{ backgroundColor: `rgba(220, 38, 38, ${opacity})`, border: '1px solid rgba(0,0,0,0.04)' }}
    />
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-lg">🥇</span>;
  if (rank === 2) return <span className="text-lg">🥈</span>;
  if (rank === 3) return <span className="text-lg">🥉</span>;
  return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">{rank}</span>;
}


export default function LeaderboardPage() {
  const [tab, setTab] = useState<'architect' | 'performance' | 'mentor'>('architect');
  const [period] = useState('This Month');

  const myRank = 8;
  const myCP = 12450;
  const totalForNext = 15000;

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track engineering impact. Earn CP. Climb the ranks.</p>
        </div>
        <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
          <span className="text-xs">📅</span> {period} <ChevronDown size={13} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main section */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Tabs + my stats */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Tab header */}
            <div className="flex border-b border-gray-200">
              {[
                { key: 'architect', label: 'Architect Rankings', sub: 'Design Mastery', icon: Crown },
                { key: 'performance', label: 'Performance Leaderboard', sub: 'Operational Excellence', icon: TrendingUp },
                { key: 'mentor', label: 'Mentor Leaderboard', sub: 'Knowledge Sharing', icon: Crown },
              ].map(({ key, label, sub, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setTab(key as typeof tab)}
                  className={`flex-1 flex items-center gap-2 px-4 py-3 border-b-2 transition-colors text-left ${
                    tab === key
                      ? 'border-red-600 bg-red-50/50'
                      : 'border-transparent hover:bg-gray-50'
                  }`}
                >
                  <Icon size={15} className={tab === key ? 'text-red-600' : 'text-gray-400'} />
                  <div>
                    <p className={`text-xs font-semibold ${tab === key ? 'text-red-600' : 'text-gray-700'}`}>{label}</p>
                    <p className="text-[10px] text-gray-400">{sub}</p>
                  </div>
                </button>
              ))}

              {/* My stats */}
              <div className="flex items-center gap-4 px-5 border-l border-gray-200 shrink-0">
                <div className="text-center">
                  <p className="text-[10px] text-gray-400">My Rank</p>
                  <p className="text-sm font-bold text-gray-900">#{myRank} <span className="text-[10px] font-normal text-gray-400">Top 5%</span></p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-400">My CP</p>
                  <p className="text-sm font-bold text-red-600">{myCP.toLocaleString()} <span className="text-[10px] font-normal text-green-500">+85↑</span></p>
                </div>
              </div>
            </div>

            {/* Architect table */}
            {tab === 'architect' && (
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Top Architects (Design Mastery)</h3>
                  <Info size={14} className="text-gray-400" />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="pb-2 text-left w-8"></th>
                        <th className="pb-2 text-left text-[11px] text-gray-400 font-medium">Name</th>
                        <th className="pb-2 text-right pr-4">
                          <div className="flex items-center justify-end gap-1">
                            <span className="text-[11px] text-gray-400 font-medium">Blueprint</span>
                            <span className="text-[10px] text-gray-300">Adoption Rate</span>
                          </div>
                        </th>
                        <th className="pb-2 text-right pr-4">
                          <div className="flex items-center justify-end gap-1">
                            <span className="text-[11px] text-gray-400 font-medium">Vetting</span>
                            <span className="text-[10px] text-gray-300">Accuracy</span>
                          </div>
                        </th>
                        <th className="pb-2 text-right pr-4">
                          <div className="flex items-center justify-end gap-1">
                            <span className="text-[11px] text-gray-400 font-medium">Quest</span>
                            <span className="text-[10px] text-gray-300">Completion</span>
                          </div>
                        </th>
                        <th className="pb-2 text-right text-[11px] text-gray-400 font-medium">Total CP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {architectRankings.map((user) => (
                        <tr key={user.rank} className="border-b border-gray-50 hover:bg-gray-50/50">
                          <td className="py-3"><RankBadge rank={user.rank} /></td>
                          <td className="py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                                {user.avatar}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                <p className="text-[11px] text-gray-400">{user.title}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-right pr-4">
                            <span className="text-sm font-medium text-gray-800">{user.blueprintRate.toLocaleString()}</span>
                            <span className="text-[11px] text-green-500 ml-1">↑{user.blueprintTrend}%</span>
                          </td>
                          <td className="py-3 text-right pr-4 text-sm text-gray-700">{user.vettingAccuracy}%</td>
                          <td className="py-3 text-right pr-4 text-sm text-gray-700">{user.questCompletion}</td>
                          <td className="py-3 text-right text-sm font-bold text-red-600">{user.totalCP.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="mt-3 text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
                  View full Architect rankings <ArrowRight size={11} />
                </button>
              </div>
            )}

            {/* Performance tab */}
            {tab === 'performance' && (
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                    Top Performing Agents (Operational Excellence) <Info size={13} className="text-gray-400" />
                  </h3>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-2 w-8"></th>
                      <th className="pb-2 text-left text-[11px] text-gray-400 font-medium">Agent</th>
                      <th className="pb-2 text-right pr-3 text-[11px] text-gray-400 font-medium">Success Rate</th>
                      <th className="pb-2 text-right pr-3 text-[11px] text-gray-400 font-medium">Efficiency Q.</th>
                      <th className="pb-2 text-right pr-3 text-[11px] text-gray-400 font-medium">Niche</th>
                      <th className="pb-2 text-right text-[11px] text-gray-400 font-medium">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performingAgents.map((a) => (
                      <tr key={a.rank} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="py-3"><RankBadge rank={a.rank} /></td>
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg text-white text-[10px] font-bold flex items-center justify-center shrink-0" style={{ backgroundColor: a.logoColor }}>
                              {a.logoText}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{a.name}</p>
                              <p className="text-[11px] text-gray-400">{a.source}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-right pr-3 text-sm font-medium text-gray-800">{a.successRate}%</td>
                        <td className="py-3 text-right pr-3">
                          <span className="text-sm font-medium text-gray-800">{a.efficiencyQuotient}</span>
                          <span className="text-[10px] text-gray-400 ml-1 block">Low Cost</span>
                        </td>
                        <td className="py-3 text-right pr-3 text-[11px] text-gray-600">{a.niche}</td>
                        <td className="py-3 text-right text-sm font-bold text-red-600">{a.score.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="mt-3 text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
                  View full Performance leaderboard <ArrowRight size={11} />
                </button>
              </div>
            )}

            {/* Mentor tab */}
            {tab === 'mentor' && (
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                    Top Mentors (Knowledge Sharing) <Info size={13} className="text-gray-400" />
                  </h3>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-2 w-8"></th>
                      <th className="pb-2 text-left text-[11px] text-gray-400 font-medium">Name</th>
                      <th className="pb-2 text-right pr-3 text-[11px] text-gray-400 font-medium">Trace Upvotes</th>
                      <th className="pb-2 text-right pr-3 text-[11px] text-gray-400 font-medium">Shorts Eng.</th>
                      <th className="pb-2 text-right pr-3 text-[11px] text-gray-400 font-medium">Fork Tree</th>
                      <th className="pb-2 text-right text-[11px] text-gray-400 font-medium">Total CP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topMentors.map((m) => (
                      <tr key={m.rank} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="py-3"><RankBadge rank={m.rank} /></td>
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-[10px] font-bold flex items-center justify-center">
                              {m.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                              <p className="text-[11px] text-gray-400">{m.title}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-right pr-3 text-sm text-gray-700">{m.traceUpvotes.toLocaleString()}</td>
                        <td className="py-3 text-right pr-3 text-sm text-gray-700">{(m.shortsEngagement / 1000).toFixed(1)}K</td>
                        <td className="py-3 text-right pr-3 text-sm text-gray-700">{m.forkTree}</td>
                        <td className="py-3 text-right text-sm font-bold text-red-600">{m.totalCP.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="mt-3 text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
                  View full Mentor leaderboard <ArrowRight size={11} />
                </button>
              </div>
            )}
          </div>

          {/* Current Sprint */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500">
                  <span className="text-xs">🛡️</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Current Sprint</p>
                  <p className="text-sm font-bold text-gray-900">Security Sprint</p>
                </div>
              </div>
              <span className="text-xs bg-red-50 text-red-600 font-semibold border border-red-100 px-2.5 py-1 rounded-full">10 days left</span>
              <div className="ml-auto flex gap-6 text-center">
                {[
                  { label: 'Total Developers', value: '1,842' },
                  { label: 'Ideas Submitted', value: '634' },
                  { label: 'Agents Published', value: '289' },
                  { label: 'CP Awarded', value: '94.4K' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-base font-bold text-gray-900">{value}</p>
                    <p className="text-[11px] text-gray-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-5">
          {/* Needs a Builder */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                Needs a Builder <Info size={13} className="text-gray-400" />
              </h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">Top-vetted Blueprints from DX Lab waiting to be built.</p>
            <div className="flex flex-col gap-3">
              {needsBuilder.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg border border-gray-200 text-xs font-bold flex items-center justify-center shrink-0" style={{ backgroundColor: item.logoColor, color: '#fff' }}>
                    {item.logoText.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-400">Vetted by {item.vettedBy} architects</p>
                    <p className="text-[10px] text-gray-400">0% built</p>
                  </div>
                  <span className="text-[10px] bg-gray-100 text-gray-500 font-medium px-1.5 py-0.5 rounded shrink-0">{item.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contribution Heatmap */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                Contribution Heatmap <Info size={13} className="text-gray-400" />
              </h3>
              <span className="text-xs text-gray-400">Last 90 d</span>
            </div>
            <div className="flex gap-px flex-wrap">
              {heatmapData.map((val, i) => (
                <HeatCell key={i} val={val} />
              ))}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] text-gray-400">Less</span>
              <div className="flex gap-px">
                {[0.05, 0.3, 0.6, 0.85, 1].map((v) => (
                  <div key={v} className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: `rgba(220, 38, 38, ${v})` }} />
                ))}
              </div>
              <span className="text-[10px] text-gray-400">More</span>
            </div>
          </div>

          {/* Your Tier */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                Your Tier <Info size={13} className="text-gray-400" />
              </h3>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-600 text-white text-base font-black flex items-center justify-center shrink-0">
                16
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Logic Architect</p>
                <p className="text-xs text-gray-400">Level 16</p>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-1.5">
              <div
                className="bg-red-600 h-2 rounded-full"
                style={{ width: `${(myCP / totalForNext) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-gray-400">{myCP.toLocaleString()} / {totalForNext.toLocaleString()} CP to Level 17</p>

            <div className="mt-3 border-t border-gray-100 pt-3">
              <p className="text-[11px] font-medium text-gray-500 mb-2">Next Tiers</p>
              <div className="flex flex-col gap-1">
                {[{ cp: 25, label: 'Trace Master' }, { cp: 50, label: 'Agentic Legend' }].map((t) => (
                  <div key={t.label} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-gray-100 text-gray-500 text-[10px] font-bold flex items-center justify-center">
                      {t.cp}
                    </div>
                    <span className="text-xs text-gray-600">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
