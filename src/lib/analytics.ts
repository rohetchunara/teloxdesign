type LeadSource = 'contact_form' | 'checkout' | 'direct' | 'referral';
type LeadStatus = 'new' | 'hot' | 'warm';
type LeadType = 'message' | 'order' | 'inquiry';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source: LeadSource;
  status: LeadStatus;
  type: LeadType;
  date: string;
  timestamp: number;
}

export interface PageView {
  path: string;
  timestamp: number;
  date: string;
  referrer?: string;
}

export interface DailyStats {
  date: string;
  visitors: number;
  pageViews: number;
  leads: number;
  messages: number;
  orders: number;
  revenue: number;
}

const STORAGE_KEYS = {
  LEADS: 'telox_leads',
  PAGE_VIEWS: 'telox_page_views',
  DAILY_STATS: 'telox_daily_stats',
  TOTAL_REVENUE: 'telox_total_revenue',
  INITIALIZED: 'telox_initialized',
};

function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn('localStorage write failed');
  }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export function trackPageView(path: string): void {
  const views = getStorageItem<PageView[]>(STORAGE_KEYS.PAGE_VIEWS, []);
  const view: PageView = {
    path,
    timestamp: Date.now(),
    date: getToday(),
    referrer: document.referrer || undefined,
  };
  views.push(view);
  setStorageItem(STORAGE_KEYS.PAGE_VIEWS, views);

  const dailyStats = getStorageItem<DailyStats[]>(STORAGE_KEYS.DAILY_STATS, []);
  const today = getToday();
  const todayStats = dailyStats.find(s => s.date === today);

  if (todayStats) {
    todayStats.pageViews++;
    if (!views.slice(0, -1).find(v => v.path === path && v.date === today)) {
      todayStats.visitors++;
    }
  } else {
    dailyStats.push({
      date: today,
      visitors: 1,
      pageViews: 1,
      leads: 0,
      messages: 0,
      orders: 0,
      revenue: 0,
    });
  }

  setStorageItem(STORAGE_KEYS.DAILY_STATS, dailyStats);
}

export function trackLead(data: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source: LeadSource;
  type: LeadType;
}): Lead {
  const leads = getStorageItem<Lead[]>(STORAGE_KEYS.LEADS, []);

  const lead: Lead = {
    id: generateId(),
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    source: data.source,
    status: 'new',
    type: data.type,
    date: getToday(),
    timestamp: Date.now(),
  };

  leads.push(lead);
  setStorageItem(STORAGE_KEYS.LEADS, leads);

  const dailyStats = getStorageItem<DailyStats[]>(STORAGE_KEYS.DAILY_STATS, []);
  const today = getToday();
  const todayStats = dailyStats.find(s => s.date === today);

  if (todayStats) {
    todayStats.leads++;
    if (data.type === 'message') todayStats.messages++;
    if (data.type === 'order') todayStats.orders++;
  } else {
    dailyStats.push({
      date: today,
      visitors: 1,
      pageViews: 1,
      leads: 1,
      messages: data.type === 'message' ? 1 : 0,
      orders: data.type === 'order' ? 1 : 0,
      revenue: 0,
    });
  }

  setStorageItem(STORAGE_KEYS.DAILY_STATS, dailyStats);

  return lead;
}

export function trackOrder(amount: number): void {
  const dailyStats = getStorageItem<DailyStats[]>(STORAGE_KEYS.DAILY_STATS, []);
  const today = getToday();
  const todayStats = dailyStats.find(s => s.date === today);

  if (todayStats) {
    todayStats.orders++;
    todayStats.revenue += amount;
  } else {
    dailyStats.push({
      date: today,
      visitors: 0,
      pageViews: 0,
      leads: 0,
      messages: 0,
      orders: 1,
      revenue: amount,
    });
  }

  setStorageItem(STORAGE_KEYS.DAILY_STATS, dailyStats);

  const totalRevenue = getStorageItem<number>(STORAGE_KEYS.TOTAL_REVENUE, 0);
  setStorageItem(STORAGE_KEYS.TOTAL_REVENUE, totalRevenue + amount);
}

export function getLeads(): Lead[] {
  return getStorageItem<Lead[]>(STORAGE_KEYS.LEADS, []);
}

export function getPageViews(): PageView[] {
  return getStorageItem<PageView[]>(STORAGE_KEYS.PAGE_VIEWS, []);
}

export function getDailyStats(): DailyStats[] {
  return getStorageItem<DailyStats[]>(STORAGE_KEYS.DAILY_STATS, []);
}

export function getTodayStats(): DailyStats {
  const stats = getDailyStats();
  const today = getToday();
  return stats.find(s => s.date === today) || {
    date: today,
    visitors: 0,
    pageViews: 0,
    leads: 0,
    messages: 0,
    orders: 0,
    revenue: 0,
  };
}

export function getTotalStats() {
  const dailyStats = getDailyStats();
  const leads = getLeads();
  const pageViews = getPageViews();

  return {
    totalVisitors: dailyStats.reduce((sum, s) => sum + s.visitors, 0),
    totalPageViews: pageViews.length,
    totalLeads: leads.length,
    totalMessages: leads.filter(l => l.type === 'message').length,
    totalOrders: leads.filter(l => l.type === 'order').length,
    totalRevenue: dailyStats.reduce((sum, s) => sum + s.revenue, 0),
    uniqueVisitors: new Set(pageViews.map(v => v.timestamp)).size,
    bounceRate: dailyStats.length > 0
      ? Math.round((dailyStats.filter(s => s.pageViews === 1).length / dailyStats.length) * 100)
      : 0,
  };
}

export function getRevenueChartData(days: number = 7) {
  const stats = getDailyStats();
  const result = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayStats = stats.find(s => s.date === dateStr);
    result.push({
      month: date.toLocaleDateString('en', { month: 'short' }),
      value: dayStats?.revenue || 0,
    });
  }

  return result;
}

export function getVisitorChartData(days: number = 7) {
  const stats = getDailyStats();
  const result = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayStats = stats.find(s => s.date === dateStr);
    result.push({
      month: date.toLocaleDateString('en', { month: 'short' }),
      value: dayStats?.visitors || 0,
    });
  }

  return result;
}

export function getTrafficSources() {
  const views = getPageViews();
  const sources: Record<string, number> = { Direct: 0, Organic: 0, Social: 0, Referral: 0 };

  views.forEach(v => {
    if (!v.referrer || v.referrer === '') {
      sources.Direct++;
    } else if (v.referrer.includes('google') || v.referrer.includes('bing')) {
      sources.Organic++;
    } else if (v.referrer.includes('facebook') || v.referrer.includes('instagram') || v.referrer.includes('twitter')) {
      sources.Social++;
    } else {
      sources.Referral++;
    }
  });

  const total = views.length || 1;
  return [
    { source: 'Direct', visitors: sources.Direct, percentage: Math.round((sources.Direct / total) * 100) },
    { source: 'Organic Search', visitors: sources.Organic, percentage: Math.round((sources.Organic / total) * 100) },
    { source: 'Social Media', visitors: sources.Social, percentage: Math.round((sources.Social / total) * 100) },
    { source: 'Referral', visitors: sources.Referral, percentage: Math.round((sources.Referral / total) * 100) },
  ];
}

export function updateLeadStatus(id: string, status: LeadStatus): void {
  const leads = getLeads();
  const lead = leads.find(l => l.id === id);
  if (lead) {
    lead.status = status;
    setStorageItem(STORAGE_KEYS.LEADS, leads);
  }
}

export function deleteLead(id: string): void {
  const leads = getLeads().filter(l => l.id !== id);
  setStorageItem(STORAGE_KEYS.LEADS, leads);
}

export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
}
