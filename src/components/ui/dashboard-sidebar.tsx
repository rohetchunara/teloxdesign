import React, { useState } from 'react';
import {
  Search,
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  LogOut,
  Hash,
  ChevronDown,
  ChevronRight,
  Inbox,
  Calendar,
  Activity,
  CreditCard,
  Globe,
  Terminal,
  Blocks,
  PanelLeftClose,
  PanelLeftOpen,
  Command,
  X,
  TrendingUp,
  DollarSign,
  Eye,
  ShoppingCart,
  Mail,
  BarChart3,
  UserCheck,
  MousePointerClick
} from 'lucide-react';

export type NavItemData = {
  id: string;
  title: string;
  icon: React.ElementType;
  badge?: number | string;
  shortcut?: string;
  children?: NavItemData[];
};

export type NavGroupData = {
  heading?: string;
  items: NavItemData[];
};

const mockNavGroups: NavGroupData[] = [
  {
    items: [
      { id: 'overview', title: 'Overview', icon: LayoutDashboard },
      { id: 'analytics', title: 'Analytics', icon: Activity, badge: 'Live' },
      { id: 'leads', title: 'Leads', icon: UserCheck, badge: 24 },
    ]
  },
  {
    heading: 'Business',
    items: [
      { id: 'orders', title: 'Orders', icon: ShoppingCart, badge: 8 },
      { id: 'revenue', title: 'Revenue', icon: DollarSign },
      { id: 'projects', title: 'Projects', icon: FolderKanban },
      {
        id: 'customers',
        title: 'Customers',
        icon: Users,
        children: [
          { id: 'c-active', title: 'Active', icon: Hash },
          { id: 'c-leads', title: 'Leads', icon: Hash },
          { id: 'c-vip', title: 'VIP', icon: Hash },
        ]
      },
    ]
  },
  {
    heading: 'Engagement',
    items: [
      { id: 'messages', title: 'Messages', icon: Mail, badge: 5 },
      { id: 'traffic', title: 'Traffic', icon: MousePointerClick },
      { id: 'performance', title: 'Performance', icon: TrendingUp },
    ]
  }
];

const mockBottomItems: NavItemData[] = [
  { id: 'settings', title: 'Settings', icon: Settings },
  { id: 'logout', title: 'Exit Admin', icon: LogOut },
];

function WorkspaceSwitcher({ selected, onSelect }: { selected?: string; onSelect?: (ws: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState('Telox Admin');
  const current = selected || internalSelected;
  const handleSelect = onSelect || setInternalSelected;

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-2 py-2 mb-4 rounded-lg hover:bg-white/5 cursor-pointer transition-colors select-none group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[6px] bg-white text-black flex items-center justify-center font-semibold text-[13px] shadow-sm">
            T
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[13px] font-medium leading-none mb-1 text-white truncate max-w-[120px]">{current}</span>
            <span className="text-[11px] text-white/50 leading-none">Admin Panel</span>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors shrink-0" strokeWidth={1.5} />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-[52px] left-0 w-full bg-[#111] border border-white/10 rounded-lg shadow-xl z-50 py-1 flex flex-col gap-0.5">
            {['Telox Admin', 'Analytics View', 'Client Dashboard'].map(ws => (
              <div
                key={ws}
                onClick={() => { handleSelect(ws); setIsOpen(false); }}
                className={`px-3 py-2 mx-1 text-[13px] rounded-md cursor-pointer transition-colors ${current === ws ? 'bg-white/10 text-white font-medium' : 'text-white/70 hover:bg-white/5'}`}
              >
                {ws}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function NavItem({
  item,
  activeId,
  onSelect,
  level = 0
}: {
  item: NavItemData;
  activeId: string;
  onSelect: (id: string) => void;
  level?: number;
}) {
  const isActive = activeId === item.id;
  const hasChildren = !!item.children;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    } else {
      onSelect(item.id);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div
        className={`group flex items-center justify-between px-2.5 py-[7px] rounded-[6px] cursor-pointer transition-all duration-200 select-none
          ${isActive
            ? 'bg-white/10 text-white font-medium'
            : 'text-white/60 hover:bg-white/5 hover:text-white/90'
          }
        `}
        style={{ paddingLeft: `${level * 12 + 10}px` }}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2.5">
          <item.icon
            className={`w-[16px] h-[16px] transition-colors
              ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white/70'}
            `}
            strokeWidth={1.5}
          />
          <span className="text-[13px] tracking-wide truncate">
            {item.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {item.badge && (
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-medium rounded-full bg-white/10 text-white/80">
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <ChevronRight
              className={`w-3.5 h-3.5 text-white/40 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
              strokeWidth={2}
            />
          )}
        </div>
      </div>

      {hasChildren && (
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden min-h-0 relative flex flex-col gap-0.5 mt-0.5">
            <div
              className="absolute top-0 bottom-0 border-l border-white/10"
              style={{ left: `${level * 12 + 17.5}px` }}
            />
            {item.children!.map(child => (
              <NavItem
                key={child.id}
                item={child}
                activeId={activeId}
                onSelect={onSelect}
                level={level + 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SidebarNav({
  className = '',
  activeId,
  onSelect,
  activeWorkspace,
  onWorkspaceSelect,
  onClose
}: {
  className?: string;
  activeId?: string;
  onSelect?: (id: string) => void;
  activeWorkspace?: string;
  onWorkspaceSelect?: (ws: string) => void;
  onClose?: () => void;
}) {
  const [internalId, setInternalId] = useState('overview');
  const currentId = activeId !== undefined ? activeId : internalId;
  const handleSelect = (id: string) => {
    if (onSelect) onSelect(id);
    else setInternalId(id);
    if (onClose && window.innerWidth < 768) onClose();
  };

  return (
    <div className={`flex flex-col w-full md:w-[260px] h-full bg-[#0a0a0a] md:border-r border-white/10 p-3 font-sans ${className}`}>
      <div className="flex items-center justify-between md:block">
        <WorkspaceSwitcher selected={activeWorkspace} onSelect={onWorkspaceSelect} />
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-2 text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col gap-4 mt-2">
        {mockNavGroups.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-0.5">
            {group.heading && (
              <span className="px-2.5 mb-1 text-[11px] font-semibold tracking-wider text-white/40 uppercase">
                {group.heading}
              </span>
            )}
            {group.items.map(item => (
              <NavItem
                key={item.id}
                item={item}
                activeId={currentId}
                onSelect={handleSelect}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-0.5">
        {mockBottomItems.map(item => (
          <NavItem
            key={item.id}
            item={item}
            activeId={currentId}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}

const allItems = [...mockNavGroups.flatMap(g => g.items), ...mockBottomItems];
const flattenItems = (items: NavItemData[]): NavItemData[] => {
  return items.reduce((acc, item) => {
    acc.push(item);
    if (item.children) acc.push(...flattenItems(item.children));
    return acc;
  }, [] as NavItemData[]);
};
const flatMockData = flattenItems(allItems);

export default function SidebarNavPreview() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState('overview');
  const [activeWorkspace, setActiveWorkspace] = useState('Telox Admin');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const activeItem = flatMockData.find(i => i.id === activeId);
  const activeTitle = activeItem ? activeItem.title : 'Dashboard';

  const handleSelect = (id: string) => {
    if (id === 'search') {
      setIsSearchOpen(true);
      return;
    }
    setActiveId(id);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[700px] bg-background p-4 md:p-8">
      <div className="relative w-full max-w-4xl h-[700px] bg-card rounded-xl border border-white/10 flex overflow-hidden shadow-sm">
        <div
          className={`h-full transition-all duration-300 ease-in-out shrink-0 overflow-hidden bg-[#0a0a0a] border-r border-white/10 ${
            isOpen ? 'w-[260px] opacity-100' : 'w-0 opacity-0 border-none'
          }`}
        >
          <SidebarNav
            className="w-[260px] border-none bg-transparent"
            activeId={activeId}
            onSelect={handleSelect}
            activeWorkspace={activeWorkspace}
            onWorkspaceSelect={setActiveWorkspace}
          />
        </div>

        <div className="flex-1 bg-[#0d0d0d] flex flex-col min-w-0 transition-all duration-300">
          <div className="h-14 border-b border-white/10 flex items-center px-4 justify-between bg-[#0a0a0a] shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 rounded-md text-white/60 hover:bg-white/5 hover:text-white transition-colors"
              >
                {isOpen ? <PanelLeftClose className="w-[18px] h-[18px]" strokeWidth={1.5} /> : <PanelLeftOpen className="w-[18px] h-[18px]" strokeWidth={1.5} />}
              </button>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <span className="truncate">{activeWorkspace}</span>
                <span>/</span>
                <span className="font-medium text-white truncate">{activeTitle}</span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 overflow-y-auto">
            <h2 className="text-2xl font-display font-semibold text-white mb-6">{activeTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-white/50 text-xs mb-1">Total Revenue</p>
                <p className="text-2xl font-display font-bold text-white">$12,450</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-white/50 text-xs mb-1">Active Leads</p>
                <p className="text-2xl font-display font-bold text-white">24</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-white/50 text-xs mb-1">Conversion</p>
                <p className="text-2xl font-display font-bold text-white">3.2%</p>
              </div>
            </div>
            <div className="w-full h-64 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <BarChart3 className="w-12 h-12 text-white/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
