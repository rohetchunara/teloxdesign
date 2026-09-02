import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  TrendingUp,
  DollarSign,
  Eye,
  ShoppingCart,
  Mail,
  BarChart3,
  UserCheck,
  MousePointerClick,
  Globe,
  Users,
  FolderKanban,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  RefreshCw,
  Menu
} from 'lucide-react';
import { SidebarNav } from './dashboard-sidebar';
import {
  getLeads,
  getDailyStats,
  getTotalStats,
  getRevenueChartData,
  getVisitorChartData,
  getTrafficSources,
  getTodayStats,
  updateLeadStatus,
  deleteLead,
  clearAllData,
  type Lead,
  type DailyStats
} from '@/lib/analytics';

function MiniChart({ data, color = '#ffffff' }: { data: { month: string; value: number }[]; color?: string }) {
  const max = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="flex items-end gap-1.5 h-20">
      {data.map((d, i) => {
        const height = (d.value / max) * 100;
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-full rounded-t-sm transition-all duration-300 min-h-[4px]"
              style={{ height: `${Math.max(4, height)}%`, backgroundColor: color, opacity: 0.7 }}
            />
            <span className="text-[9px] text-white/40">{d.month}</span>
          </div>
        );
      })}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, change, positive }: { icon: any; label: string; value: string | number; change?: string; positive?: boolean }) {
  return (
    <div className="p-3 md:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <Icon className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
        {change && (
          <div className={`flex items-center gap-1 text-[10px] md:text-[11px] ${positive ? 'text-green-400' : 'text-red-400'}`}>
            {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {change}
          </div>
        )}
      </div>
      <p className="text-[10px] md:text-[11px] text-white/50 mb-1">{label}</p>
      <p className="text-lg md:text-xl font-display font-bold text-white truncate">{value}</p>
    </div>
  );
}

export function AdminPanel({ onClose }: { onClose: () => void }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const refreshData = () => {
    setLeads(getLeads());
    setDailyStats(getDailyStats());
    setRefreshKey(k => k + 1);
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalStats = getTotalStats();
  const todayStats = getTodayStats();
  const revenueData = getRevenueChartData(7);
  const visitorData = getVisitorChartData(7);
  const trafficSources = getTrafficSources();

  const handleStatusChange = (id: string, status: 'new' | 'hot' | 'warm') => {
    updateLeadStatus(id, status);
    refreshData();
  };

  const handleDeleteLead = (id: string) => {
    deleteLead(id);
    refreshData();
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-4 md:space-y-6" key={refreshKey}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <StatCard icon={DollarSign} label="Total Revenue" value={`$${totalStats.totalRevenue.toLocaleString()}`} />
              <StatCard icon={UserCheck} label="Total Leads" value={totalStats.totalLeads} />
              <StatCard icon={ShoppingCart} label="Orders" value={totalStats.totalOrders} />
              <StatCard icon={Eye} label="Total Visitors" value={totalStats.totalVisitors.toLocaleString()} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <StatCard icon={Mail} label="Messages" value={totalStats.totalMessages} />
              <StatCard icon={Globe} label="Page Views" value={totalStats.totalPageViews.toLocaleString()} />
              <StatCard icon={Activity} label="Bounce Rate" value={`${totalStats.bounceRate}%`} />
              <StatCard icon={Clock} label="Today's Leads" value={todayStats.leads} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-4 md:p-5 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xs md:text-sm font-medium text-white mb-3 md:mb-4">Revenue (Last 7 Days)</h3>
                <MiniChart data={revenueData} />
              </div>
              <div className="p-4 md:p-5 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xs md:text-sm font-medium text-white mb-3 md:mb-4">Visitors (Last 7 Days)</h3>
                <MiniChart data={visitorData} color="#60a5fa" />
              </div>
            </div>

            <div className="p-4 md:p-5 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-xs md:text-sm font-medium text-white mb-3 md:mb-4">Traffic Sources</h3>
              <div className="space-y-3">
                {trafficSources.map((src, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] md:text-[11px] text-white/70">{src.source}</span>
                        <span className="text-[10px] md:text-[11px] text-white/50">{src.visitors} ({src.percentage}%)</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-white/60 rounded-full transition-all" style={{ width: `${src.percentage}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {leads.length > 0 && (
              <div className="p-4 md:p-5 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xs md:text-sm font-medium text-white mb-3 md:mb-4">Recent Leads</h3>
                <div className="space-y-3">
                  {leads.slice(-5).reverse().map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <span className="text-[10px] md:text-[11px] font-medium text-white">{lead.name.charAt(0)}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] md:text-[12px] text-white truncate">{lead.name}</p>
                          <p className="text-[9px] md:text-[10px] text-white/50 truncate">{lead.email}</p>
                        </div>
                      </div>
                      <span className={`text-[9px] md:text-[10px] px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                        lead.status === 'hot' ? 'bg-red-500/20 text-red-400' :
                        lead.status === 'warm' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>{lead.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'leads':
        return (
          <div className="space-y-4" key={refreshKey}>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <StatCard icon={UserCheck} label="Total Leads" value={totalStats.totalLeads} />
              <StatCard icon={MousePointerClick} label="New Today" value={todayStats.leads} />
              <StatCard icon={Mail} label="Messages" value={totalStats.totalMessages} />
            </div>
            {leads.length === 0 ? (
              <div className="p-8 md:p-12 rounded-xl bg-white/5 border border-white/10 text-center">
                <Mail className="w-10 h-10 md:w-12 md:h-12 text-white/20 mx-auto mb-3 md:mb-4" />
                <p className="text-white/60 text-xs md:text-sm">No leads yet. They will appear here when someone submits the contact form.</p>
              </div>
            ) : (
              <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-[10px] md:text-[11px] text-white/50 font-medium p-2 md:p-3">Name</th>
                        <th className="text-left text-[10px] md:text-[11px] text-white/50 font-medium p-2 md:p-3">Email</th>
                        <th className="text-left text-[10px] md:text-[11px] text-white/50 font-medium p-2 md:p-3">Source</th>
                        <th className="text-left text-[10px] md:text-[11px] text-white/50 font-medium p-2 md:p-3">Type</th>
                        <th className="text-left text-[10px] md:text-[11px] text-white/50 font-medium p-2 md:p-3">Status</th>
                        <th className="text-left text-[10px] md:text-[11px] text-white/50 font-medium p-2 md:p-3">Date</th>
                        <th className="text-left text-[10px] md:text-[11px] text-white/50 font-medium p-2 md:p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.slice().reverse().map((lead) => (
                        <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-2 md:p-3">
                            <p className="text-[11px] md:text-[12px] text-white">{lead.name}</p>
                            {lead.phone && <p className="text-[9px] md:text-[10px] text-white/40">{lead.phone}</p>}
                          </td>
                          <td className="p-2 md:p-3 text-[11px] md:text-[12px] text-white/70">{lead.email}</td>
                          <td className="p-2 md:p-3 text-[11px] md:text-[12px] text-white/70 capitalize">{lead.source.replace('_', ' ')}</td>
                          <td className="p-2 md:p-3">
                            <span className={`text-[9px] md:text-[10px] px-2 py-0.5 rounded-full ${
                              lead.type === 'order' ? 'bg-green-500/20 text-green-400' :
                              lead.type === 'message' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-purple-500/20 text-purple-400'
                            }`}>{lead.type}</span>
                          </td>
                          <td className="p-2 md:p-3">
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                              className={`text-[9px] md:text-[10px] px-1 md:px-2 py-0.5 rounded-full bg-transparent border-0 ${
                                lead.status === 'hot' ? 'text-red-400' :
                                lead.status === 'warm' ? 'text-yellow-400' :
                                'text-blue-400'
                              }`}
                            >
                              <option value="new" className="bg-[#111]">New</option>
                              <option value="warm" className="bg-[#111]">Warm</option>
                              <option value="hot" className="bg-[#111]">Hot</option>
                            </select>
                          </td>
                          <td className="p-2 md:p-3 text-[11px] md:text-[12px] text-white/50">{lead.date}</td>
                          <td className="p-2 md:p-3">
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="text-[9px] md:text-[10px] text-red-400 hover:text-red-300"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-4 md:space-y-6" key={refreshKey}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <StatCard icon={Eye} label="Total Visitors" value={totalStats.totalVisitors.toLocaleString()} />
              <StatCard icon={Globe} label="Page Views" value={totalStats.totalPageViews.toLocaleString()} />
              <StatCard icon={Activity} label="Bounce Rate" value={`${totalStats.bounceRate}%`} />
              <StatCard icon={Clock} label="Today's Views" value={todayStats.pageViews} />
            </div>
            <div className="p-4 md:p-5 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-xs md:text-sm font-medium text-white mb-3 md:mb-4">Visitor Trend (Last 7 Days)</h3>
              <div className="h-36 md:h-48 flex items-end gap-2">
                {visitorData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-sm bg-blue-400/50 hover:bg-blue-400/70 transition-colors min-h-[4px]"
                      style={{ height: `${Math.max(5, (d.value / Math.max(...visitorData.map(x => x.value), 1)) * 100)}%` }}
                    />
                    <span className="text-[8px] text-white/30">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 md:p-5 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-xs md:text-sm font-medium text-white mb-3 md:mb-4">Traffic Sources</h3>
              <div className="space-y-3">
                {trafficSources.map((src, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] md:text-[11px] text-white/70">{src.source}</span>
                        <span className="text-[10px] md:text-[11px] text-white/50">{src.visitors} visits ({src.percentage}%)</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-white/60 rounded-full transition-all" style={{ width: `${src.percentage}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-4" key={refreshKey}>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <StatCard icon={ShoppingCart} label="Total Orders" value={totalStats.totalOrders} />
              <StatCard icon={DollarSign} label="Revenue" value={`$${totalStats.totalRevenue.toLocaleString()}`} />
              <StatCard icon={Clock} label="Today's Orders" value={todayStats.orders} />
            </div>
            {leads.filter(l => l.type === 'order').length === 0 ? (
              <div className="p-8 md:p-12 rounded-xl bg-white/5 border border-white/10 text-center">
                <ShoppingCart className="w-10 h-10 md:w-12 md:h-12 text-white/20 mx-auto mb-3 md:mb-4" />
                <p className="text-white/60 text-xs md:text-sm">No orders yet. Orders will appear here when tracked.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leads.filter(l => l.type === 'order').slice().reverse().map((order) => (
                  <div key={order.id} className="p-3 md:p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0">
                    <div className="flex items-center gap-3 md:gap-4 min-w-0">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] md:text-[13px] text-white font-medium truncate">{order.name}</p>
                        <p className="text-[10px] md:text-[11px] text-white/50 truncate">{order.email} • {order.date}</p>
                        {order.message && <p className="text-[9px] md:text-[10px] text-white/40 mt-1 line-clamp-2">{order.message}</p>}
                      </div>
                    </div>
                    <span className={`self-start md:self-auto text-[9px] md:text-[10px] px-2 py-0.5 rounded-full ${
                      order.status === 'hot' ? 'bg-red-500/20 text-red-400' :
                      order.status === 'warm' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>{order.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'messages':
        return (
          <div className="space-y-4" key={refreshKey}>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <StatCard icon={Mail} label="Total Messages" value={totalStats.totalMessages} />
              <StatCard icon={Clock} label="Today's Messages" value={todayStats.messages} />
            </div>
            {leads.filter(l => l.type === 'message').length === 0 ? (
              <div className="p-8 md:p-12 rounded-xl bg-white/5 border border-white/10 text-center">
                <Mail className="w-10 h-10 md:w-12 md:h-12 text-white/20 mx-auto mb-3 md:mb-4" />
                <p className="text-white/60 text-xs md:text-sm">No messages yet. Messages will appear here when someone submits the contact form.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leads.filter(l => l.type === 'message').slice().reverse().map((msg) => (
                  <div key={msg.id} className="p-3 md:p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <span className="text-[10px] md:text-[11px] font-medium text-white">{msg.name.charAt(0)}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] md:text-[12px] text-white font-medium truncate">{msg.name}</p>
                          <p className="text-[9px] md:text-[10px] text-white/50 truncate">{msg.email}</p>
                        </div>
                      </div>
                      <span className="text-[9px] md:text-[10px] text-white/40 shrink-0">{msg.date}</span>
                    </div>
                    {msg.message && (
                      <p className="text-[11px] md:text-[12px] text-white/70 mt-2 pl-0 md:pl-11">{msg.message}</p>
                    )}
                    {msg.phone && (
                      <p className="text-[9px] md:text-[10px] text-white/40 mt-1 pl-0 md:pl-11">Phone: {msg.phone}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-4" key={refreshKey}>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <StatCard icon={FolderKanban} label="Total Projects" value={4} />
              <StatCard icon={Globe} label="Live Projects" value={2} />
            </div>
            <div className="space-y-3">
              {[
                { name: 'Crosus Nepal', client: 'Crosus Team', status: 'Live', progress: 100, type: 'E-Commerce' },
                { name: 'Nikon The Beats', client: 'Nikon Team', status: 'Live', progress: 100, type: 'Music Platform' },
                { name: 'Brand Identity', client: 'Local Client', status: 'In Progress', progress: 65, type: 'Branding' },
                { name: 'SaaS Dashboard', client: 'Startup', status: 'Development', progress: 40, type: 'Web App' },
              ].map((project, i) => (
                <div key={i} className="p-3 md:p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <div className="min-w-0">
                      <p className="text-[12px] md:text-[13px] text-white font-medium truncate">{project.name}</p>
                      <p className="text-[10px] md:text-[11px] text-white/50 truncate">{project.client} • {project.type}</p>
                    </div>
                    <span className={`text-[9px] md:text-[10px] px-2 py-0.5 rounded-full shrink-0 ${
                      project.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                      project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>{project.status}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/60 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <p className="text-[9px] md:text-[10px] text-white/40 mt-1 text-right">{project.progress}%</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col md:flex-row"
    >
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-50 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-[280px] bg-[#0a0a0a] border-r border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <SidebarNav
                activeId={activeSection}
                onSelect={setActiveSection}
                onClose={() => setIsMobileMenuOpen(false)}
                className="h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden md:block h-full">
        <SidebarNav
          activeId={activeSection}
          onSelect={setActiveSection}
          className="h-full"
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 md:px-6 bg-[#0a0a0a] shrink-0">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1.5 rounded-md hover:bg-white/5 text-white/60 hover:text-white transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm md:text-lg font-display font-semibold text-white truncate">Admin Dashboard</h1>
            <button
              onClick={refreshData}
              className="p-1.5 rounded-md hover:bg-white/5 text-white/60 hover:text-white transition-colors hidden sm:block"
              title="Refresh data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/40 hidden lg:block">Auto-refreshes every 5s</span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
              aria-label="Close admin panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderContent()}
        </div>
      </div>
    </motion.div>
  );
}

export function AdminAccessButton() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    if (email === 'teloxdesign@gmail.com' && password === 'telox_2026') {
      setAuthenticated(true);
      setShowLogin(false);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  if (authenticated) {
    return <AdminPanel onClose={() => setAuthenticated(false)} />;
  }

  return (
    <>
      <button
        onClick={() => setShowLogin(true)}
        className="fixed bottom-6 right-6 w-3 h-3 rounded-full bg-white/30 hover:bg-white/60 transition-colors z-50"
        title=""
      />

      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowLogin(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-[#111] border border-white/10 rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-display font-semibold text-white mb-4">Admin Access</h2>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                />
                {error && <p className="text-[12px] text-red-400">{error}</p>}
                <button
                  onClick={handleLogin}
                  className="w-full py-2.5 rounded-lg bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors"
                >
                  Login
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function useAdminShortcut() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const keySequence = useRef('');

  const handleAdminLogin = () => {
    if (email === 'teloxdesign@gmail.com' && password === 'telox_2026') {
      setShowAdmin(true);
      setShowLogin(false);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === 'shift') {
        keySequence.current = 'shift';
        return;
      }

      if (keySequence.current === 'shift' && key === 't') {
        keySequence.current = 'shiftt';
        return;
      }
      if (keySequence.current === 'shiftt' && key === 'e') {
        keySequence.current = 'shiftte';
        return;
      }
      if (keySequence.current === 'shiftte' && key === 'l') {
        keySequence.current = 'shiftel';
        return;
      }
      if (keySequence.current === 'shiftel' && key === 'o') {
        keySequence.current = 'shiftelo';
        return;
      }
      if (keySequence.current === 'shiftelo' && key === 'x') {
        e.preventDefault();
        setShowLogin(true);
        keySequence.current = '';
        return;
      }

      if (!e.shiftKey) {
        keySequence.current = '';
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        keySequence.current = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const AdminUI = (
    <>
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowLogin(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-[#111] border border-white/10 rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-display font-semibold text-white mb-4">Admin Access</h2>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                />
                {error && <p className="text-[12px] text-red-400">{error}</p>}
                <button
                  onClick={handleAdminLogin}
                  className="w-full py-2.5 rounded-lg bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors"
                >
                  Login
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showAdmin && (
        <AdminPanel onClose={() => setShowAdmin(false)} />
      )}
    </>
  );

  return { AdminUI, showAdmin };
}
