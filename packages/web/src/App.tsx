import { useState, useEffect, type ReactNode } from 'react';
import { User, Layers, Menu, ChevronLeft } from 'lucide-react';
import CardPage from './pages/CardPage';
import ThreadsPage from './pages/ThreadsPage';
import MorePage from './pages/MorePage';
import IMBrowserNotice from './components/IMBrowserNotice';

type Tab = 'card' | 'threads' | 'more';

const TAB_CONFIG: { id: Tab; icon: ReactNode; label: string }[] = [
  { id: 'card', icon: <User className="w-5 h-5" />, label: '名片' },
  { id: 'threads', icon: <Layers className="w-5 h-5" />, label: '动态' },
  { id: 'more', icon: <Menu className="w-5 h-5" />, label: '更多' },
];

function MobileHeader({ activeTab, onBack }: { activeTab: string; onBack?: () => void }) {
  const getTitle = () => {
    switch (activeTab) {
      case 'card': return '我的名片';
      case 'threads': return '动态';
      case 'more': return '发现与工具';
      default: return 'DappCard';
    }
  };

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 pointer-events-auto">
      <div className="bg-background/85 backdrop-blur-2xl pt-safe border-b border-border/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="h-12 flex items-center justify-between px-4 max-w-md mx-auto relative">
          <div className="w-10 flex items-center justify-start">
            {onBack && (
              <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-foreground/5 transition-colors active:scale-95">
                <ChevronLeft className="w-6 h-6 text-foreground" />
              </button>
            )}
          </div>
          <h1 className="text-[16px] font-bold tracking-tight text-foreground flex-1 text-center">
            {getTitle()}
          </h1>
          <div className="w-10 flex items-center justify-end">
            {/* 预留右侧操作区，如发布、设置等 */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    return (localStorage.getItem('dappcard_tab') as Tab) || 'card';
  });

  useEffect(() => {
    localStorage.setItem('dappcard_tab', activeTab);
  }, [activeTab]);

  return (
    <>
      <IMBrowserNotice />
      <div className="min-h-screen bg-background text-foreground flex md:flex-row flex-col">
        <MobileHeader activeTab={activeTab} />
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-56 border-r border-border bg-sidebar shrink-0">
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <User className="w-4 h-4 text-background" />
            </div>
            <div>
              <span className="font-black text-lg tracking-tight block leading-none">DappCard</span>
            </div>
          </div>

          <nav className="flex-1 px-3 py-2 space-y-0.5">
            {TAB_CONFIG.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen md:h-auto relative overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden relative pt-[calc(48px+env(safe-area-inset-top))] pb-[88px] md:pt-0 md:pb-0">
            {activeTab === 'card' && <CardPage />}
            {activeTab === 'threads' && <ThreadsPage />}
            {activeTab === 'more' && <MorePage />}
          </div>

          {/* Mobile Bottom Tab Bar */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
            <div className="h-8 bg-gradient-to-t from-background to-transparent" />
            <div className="bg-background/85 backdrop-blur-2xl px-6 pb-safe pt-3 pointer-events-auto border-t border-border/50 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between max-w-md mx-auto">
                {TAB_CONFIG.map(tab => (
                  <div key={tab.id} className="flex-1 flex justify-center">
                    <TabBtn
                      icon={tab.icon}
                      label={tab.label}
                      active={activeTab === tab.id}
                      onClick={() => setActiveTab(tab.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function TabBtn({ icon, label, active, onClick }: { icon: ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition-all duration-400 ease-out group"
    >
      {/* Background Highlight */}
      <div 
        className={`absolute inset-0 rounded-2xl transition-all duration-400 ease-out ${
          active ? 'bg-foreground/10 scale-100 opacity-100' : 'bg-foreground/0 scale-50 opacity-0 group-hover:bg-foreground/5 group-hover:scale-100 group-hover:opacity-100'
        }`}
      />
      
      {/* Icon Container */}
      <div 
        className={`relative z-10 transition-all duration-400 ease-out ${
          active ? 'text-foreground scale-110 -translate-y-0.5' : 'text-muted-foreground scale-100 translate-y-0 group-hover:text-foreground/80'
        }`}
      >
        {icon}
      </div>
      
      {/* Label Container */}
      <div 
        className={`relative z-10 text-[10px] font-bold tracking-wider transition-all duration-400 ease-out ${
          active ? 'text-foreground opacity-100 translate-y-0' : 'text-muted-foreground opacity-70 translate-y-0.5 group-hover:opacity-90'
        }`}
      >
        {label}
      </div>
    </button>
  );
}
