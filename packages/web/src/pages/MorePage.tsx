import { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Gamepad2, Settings, ChevronRight, Sparkles, Box, Wallet } from 'lucide-react';
import DiscoverPage from './DiscoverPage';
import GamesPage from './GamesPage';
import WalletConnect from '../components/WalletConnect';

export default function MorePage() {
  const [activeView, setActiveView] = useState<'index' | 'discover' | 'games'>('index');

  if (activeView === 'discover') {
    return (
      <div className="h-full flex flex-col relative bg-background">
        <header className="px-5 py-3 border-b border-border flex items-center shrink-0">
          <button 
            onClick={() => setActiveView('index')}
            className="text-[14px] font-semibold text-muted-foreground hover:text-foreground"
          >
            ← 返回
          </button>
        </header>
        <DiscoverPage />
      </div>
    );
  }

  if (activeView === 'games') {
    return (
      <div className="h-full flex flex-col relative bg-background">
        <header className="px-5 py-3 border-b border-border flex items-center shrink-0">
          <button 
            onClick={() => setActiveView('index')}
            className="text-[14px] font-semibold text-muted-foreground hover:text-foreground"
          >
            ← 返回
          </button>
        </header>
        <GamesPage />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      <header className="px-6 pt-5 pb-4 shrink-0 z-10">
        <h2 className="text-[22px] font-black tracking-tight text-foreground">Explore</h2>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-32 space-y-6 no-scrollbar">
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Wallet className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-muted-foreground">Account</h3>
          </div>
          <div className="rounded-[24px] border border-border/50 bg-card/70 p-5 shadow-sm backdrop-blur-md">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h4 className="text-[17px] font-bold text-foreground leading-tight mb-1">钱包连接</h4>
                <p className="text-[13px] font-medium text-muted-foreground">
                  仅在链上同步或发布时需要连接，平时不用占据主界面。
                </p>
              </div>
              <div className="shrink-0 self-stretch sm:self-auto">
                <WalletConnect />
              </div>
            </div>
          </div>
        </section>

        
        {/* Discover Module */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-muted-foreground">Network</h3>
          </div>
          <motion.button 
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView('discover')}
            className="w-full text-left p-5 rounded-[24px] bg-gradient-to-br from-secondary/50 to-secondary/10 border border-border/50 shadow-sm backdrop-blur-md flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[16px] bg-foreground flex items-center justify-center shadow-lg">
                <Compass className="w-6 h-6 text-background" />
              </div>
              <div>
                <h4 className="text-[17px] font-bold text-foreground leading-tight mb-1">发现搭子</h4>
                <p className="text-[13px] font-medium text-muted-foreground">探索并连接志同道合的朋友</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.button>
        </section>

        {/* Utilities Module */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Box className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-muted-foreground">Utilities</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <motion.button 
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView('games')}
              className="text-left p-5 rounded-[20px] bg-card border border-border/50 shadow-sm flex flex-col gap-3 group"
            >
              <div className="w-10 h-10 rounded-[12px] bg-secondary flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-foreground leading-tight">互动卡片</h4>
                <p className="text-[11px] font-medium text-muted-foreground mt-1">破冰与深入交流的小游戏</p>
              </div>
            </motion.button>

            <div className="text-left p-5 rounded-[20px] bg-card border border-border/50 shadow-sm flex flex-col gap-3 opacity-70">
              <div className="w-10 h-10 rounded-[12px] bg-secondary flex items-center justify-center">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-foreground leading-tight">设置</h4>
                <p className="text-[11px] font-medium text-muted-foreground mt-1">应用偏好与账户管理，敬请期待</p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
