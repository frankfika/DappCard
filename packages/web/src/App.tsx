import { useState, useEffect, type ReactNode } from 'react';
import { User, Gamepad2, Compass } from 'lucide-react';
import CardPage from './pages/CardPage';
import GamesPage from './pages/GamesPage';
import DiscoverPage from './pages/DiscoverPage';

type Tab = 'card' | 'games' | 'discover';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    return (localStorage.getItem('dappcard_tab') as Tab) || 'card';
  });

  useEffect(() => {
    localStorage.setItem('dappcard_tab', activeTab);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#D9E3DF] text-gray-900 font-sans flex justify-center selection:bg-[#A6F7E2] sm:p-6 items-center overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#A6F7E2] rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#C0A3F9] rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="w-full sm:max-w-[400px] h-[100dvh] sm:h-[820px] bg-[#F7F9F8]/60 backdrop-blur-3xl sm:rounded-[48px] relative shadow-[0_20px_80px_rgba(0,0,0,0.07)] flex flex-col overflow-hidden sm:border border-white/50">
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {activeTab === 'card' && <CardPage />}
          {activeTab === 'games' && <GamesPage />}
          {activeTab === 'discover' && <DiscoverPage />}
        </div>

        {/* Bottom Tab Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-40 pointer-events-none">
          <div className="h-6 bg-gradient-to-t from-[#F7F9F8] to-transparent"></div>
          <div className="bg-[#F7F9F8]/90 backdrop-blur-xl px-5 pb-5 pt-1 pointer-events-auto">
            <div className="flex items-center justify-around bg-white/90 backdrop-blur-xl rounded-full py-2 px-2 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-white/60">
              <TabBtn icon={<User className="w-5 h-5" />} label="名片" active={activeTab === 'card'} onClick={() => setActiveTab('card')} />
              <TabBtn icon={<Gamepad2 className="w-5 h-5" />} label="互动" active={activeTab === 'games'} onClick={() => setActiveTab('games')} />
              <TabBtn icon={<Compass className="w-5 h-5" />} label="发现" active={activeTab === 'discover'} onClick={() => setActiveTab('discover')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabBtn({ icon, label, active, onClick }: { icon: ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 px-6 py-1.5 rounded-full transition-all ${
        active ? 'text-gray-900 bg-gray-100/80' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      {icon}
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}
