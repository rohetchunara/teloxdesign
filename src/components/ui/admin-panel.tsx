import { useState, useEffect, useRef, useCallback } from 'react';
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
  Clock
} from 'lucide-react';
import { SidebarNav } from './dashboard-sidebar';

const mockData = {
  stats: {
    totalRevenue: 24680,
    monthlyRevenue: 8420,
    totalLeads: 156,
    activeLeads: 24,
    conversionRate: 3.2,
    totalOrders: 48,
    pendingOrders: 8,
    totalVisitors: 12450,
    uniqueVisitors: 8920,
    bounceRate: 42,
    avgSessionDuration: '2:34',
  },
  revenueData: [
    { month: 'Jan', value: 4200 },
    { month: 'Feb', value: 5800 },
    { month: 'Mar', value: 4900 },
    { month: 'Apr', value: 7200 },
    { month: 'May', value: 6800 },
    { month: 'Jun', value: 8420 },
  ],
  leads: [
    { id: 1, name: 'Suman Shrestha', email: 'suman@example.com', source: 'Contact Form', status: 'New', date: '2026-09-01', type: 'Message' },
    { id: 2, name: 'Priya Maharjan', email: 'priya@example.com', source: 'Checkout', status: 'Hot', date: '2026-08-31', type: 'Order' },
    { id: 3, name: 'Rikesh Tamang', email: 'rikesh@example.com', source: 'Landing Page', status: 'Warm', date: '2026-08-30', type: 'Lead' },
    { id: 4, name: 'Anita Gurung', email: 'anita@example.com', source: 'Referral', status: 'New', date: '2026-08-29', type: 'Message' },
    { id: 5, name: 'Bikash KC', email: 'bikash@example.com', source: 'Checkout', status: 'Hot', date: '2026-08-28', type: 'Order' },
    { id: 6, name: 'Nisha Rai', email: 'nisha@example.com', source: 'Contact Form', status: 'Warm', date: '2026-08-27', type: 'Lead' },
  ],
  orders: [
    { id: 'ORD-001', client: 'Suman Shrestha', service: 'Web Development', amount: 2500, status: 'In Progress', date: '2026-09-01' },
    { id: 'ORD-002', client: 'Priya Maharjan', service: 'SaaS Platform', amount: 4800, status: 'Pending', date: '2026-08-31' },
    { id: 'ORD-003', client: 'Bikash KC', service: 'UI/UX Design', amount: 1800, status: 'Completed', date: '2026-08-28' },
    { id: 'ORD-004', client: 'Rikesh Tamang', service: 'Branding', amount: 1200, status: 'In Progress', date: '2026-08-25' },
  ],
  trafficSources: [
    { source: 'Organic Search', visitors: 4520, percentage: 36 },
    { source: 'Direct', visitors: 3200, percentage: 26 },
    { source: 'Social Media', visitors: 2850, percentage: 23 },
    { source: 'Referral', visitors: 1880, percentage: 15 },
  ],
  projects: [
    { id: 1, name: 'Crosus Nepal', client: 'Crosus Team', status: 'Live', progress: 100, type: 'E-Commerce' },
    { id: 2, name: 'Nikon The Beats', client: 'Nikon Team', status: 'Live', progress: 100, type: 'Music Platform' },
    { id: 3, name: 'Brand Identity', client: 'Local Client', status: 'In Progress', progress: 65, type: 'Branding' },
    { id: 4, name: 'SaaS Dashboard', client: 'Startup', status: 'Development', progress: 40, type: 'Web App' },
  ]
};

function MiniChart({ data, color = '#ffffff' }: { data: { month: string; value: number }[]; color?: string }) {
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;

  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((d, i) => {
        const height = ((d.value - min) / range) * 100;
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-full rounded-t-sm transition-all duration-300"
              style={{ height: `${Math.max(10, height)}%`, backgroundColor: color, opacity: 0.7 }}
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
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <Icon className="w-5 h-5 text-white/60" />
        {change && (
          <div className={`flex items-center gap-1 text-[11px] ${positive ? 'text-green-400' : 'text-red-400'}`}>
            {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {change}
          </div>
        )}
      </div>
      <p className="text-[11px] text-white/50 mb-1">{label}</p>
      <p className="text-xl font-display font-bold text-white">{value}</p>
    </div>
  );
}

export function AdminPanel({ onClose }: { onClose: () => void }) {
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={DollarSign} label="Total Revenue" value={`$${mockData.stats.totalRevenue.toLocaleString()}`} change="+12.5%" positive />
              <StatCard icon={UserCheck} label="Total Leads" value={mockData.stats.totalLeads} change="+8.3%" positive />
              <StatCard icon={ShoppingCart} label="Orders" value={mockData.stats.totalOrders} change="+5.2%" positive />
              <StatCard icon={Eye} label="Visitors" value={mockData.stats.totalVisitors.toLocaleString()} change="+15.7%" positive />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-sm font-medium text-white mb-4">Revenue Trend</h3>
                <MiniChart data={mockData.revenueData} />
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-sm font-medium text-white mb-4">Traffic Sources</h3>
                <div className="space-y-3">
                  {mockData.trafficSources.map((src, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] text-white/70">{src.source}</span>
                          <span className="text-[11px] text-white/50">{src.percentage}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-white/60 rounded-full" style={{ width: `${src.percentage}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-sm font-medium text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {mockData.leads.slice(0, 4).map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="text-[11px] font-medium text-white">{lead.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-[12px] text-white">{lead.name}</p>
                        <p className="text-[10px] text-white/50">{lead.source}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      lead.status === 'Hot' ? 'bg-red-500/20 text-red-400' :
                      lead.status === 'Warm' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>{lead.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'leads':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <StatCard icon={UserCheck} label="New Leads" value={mockData.stats.activeLeads} />
              <StatCard icon={MousePointerClick} label="Checkout Reaches" value={12} />
              <StatCard icon={Mail} label="Messages" value={18} />
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-[11px] text-white/50 font-medium p-3">Name</th>
                    <th className="text-left text-[11px] text-white/50 font-medium p-3">Source</th>
                    <th className="text-left text-[11px] text-white/50 font-medium p-3">Type</th>
                    <th className="text-left text-[11px] text-white/50 font-medium p-3">Status</th>
                    <th className="text-left text-[11px] text-white/50 font-medium p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-3">
                        <div>
                          <p className="text-[12px] text-white">{lead.name}</p>
                          <p className="text-[10px] text-white/40">{lead.email}</p>
                        </div>
                      </td>
                      <td className="p-3 text-[12px] text-white/70">{lead.source}</td>
                      <td className="p-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          lead.type === 'Order' ? 'bg-green-500/20 text-green-400' :
                          lead.type === 'Message' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>{lead.type}</span>
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          lead.status === 'Hot' ? 'bg-red-500/20 text-red-400' :
                          lead.status === 'Warm' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>{lead.status}</span>
                      </td>
                      <td className="p-3 text-[12px] text-white/50">{lead.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <StatCard icon={ShoppingCart} label="Total Orders" value={mockData.stats.totalOrders} />
              <StatCard icon={Clock} label="Pending" value={mockData.stats.pendingOrders} />
              <StatCard icon={DollarSign} label="Avg. Order" value="$2,450" />
            </div>
            <div className="space-y-3">
              {mockData.orders.map((order) => (
                <div key={order.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <FolderKanban className="w-5 h-5 text-white/60" />
                    </div>
                    <div>
                      <p className="text-[13px] text-white font-medium">{order.service}</p>
                      <p className="text-[11px] text-white/50">{order.client} • {order.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] text-white font-medium">${order.amount.toLocaleString()}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      order.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={Eye} label="Total Visitors" value={mockData.stats.totalVisitors.toLocaleString()} change="+15.7%" positive />
              <StatCard icon={UserCheck} label="Unique Visitors" value={mockData.stats.uniqueVisitors.toLocaleString()} change="+10.2%" positive />
              <StatCard icon={Activity} label="Bounce Rate" value={`${mockData.stats.bounceRate}%`} change="-3.1%" positive />
              <StatCard icon={Clock} label="Avg. Session" value={mockData.stats.avgSessionDuration} />
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-sm font-medium text-white mb-4">Traffic Overview</h3>
              <div className="h-48 flex items-end gap-2">
                {[65, 45, 78, 92, 58, 84, 70, 95, 62, 88, 74, 90].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-sm bg-white/40 hover:bg-white/60 transition-colors"
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-[8px] text-white/30">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <StatCard icon={FolderKanban} label="Total Projects" value={mockData.projects.length} />
              <StatCard icon={Globe} label="Live Projects" value={mockData.projects.filter(p => p.status === 'Live').length} />
            </div>
            <div className="space-y-3">
              {mockData.projects.map((project) => (
                <div key={project.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-[13px] text-white font-medium">{project.name}</p>
                      <p className="text-[11px] text-white/50">{project.client} • {project.type}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
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
                  <p className="text-[10px] text-white/40 mt-1 text-right">{project.progress}%</p>
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
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex"
    >
      <SidebarNav
        activeId={activeSection}
        onSelect={setActiveSection}
        className="h-full"
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-[#0a0a0a] shrink-0">
          <h1 className="text-lg font-display font-semibold text-white">Admin Dashboard</h1>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
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
    return (
      <AdminPanel onClose={() => setAuthenticated(false)} />
    );
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
