/**
 * ChainExplorer — a slide-up drawer showing the user's microchain:
 * recent blocks, recent transactions, and a tamper-evident verify button.
 */

import { useEffect, useState, Fragment } from 'react';
import { motion } from 'motion/react';
import {
  X, ShieldCheck, ShieldAlert, ShieldQuestion, Hash, Clock, Copy, Check,
  Zap, RefreshCw,
} from 'lucide-react';
import { recentBlocks, recentTxs, shortHash, type Block, type Transaction, type TxType } from '../../lib/chain/chain';
import { useChain } from '../../lib/chain/useChain';

const TX_LABELS: Record<TxType, string> = {
  'genesis':         '🌱 Genesis',
  'profile.create':  '🪪 Profile Create',
  'profile.update':  '✏️ Profile Update',
  'badge.earn':      '🏆 Badge Earned',
  'activity.create': '🚀 Activity Create',
  'activity.join':   '🤝 Activity Join',
  'activity.leave':  '👋 Activity Leave',
  'card.draw':       '🎴 Card Drawn',
  'card.favorite':   '⭐ Card Favorited',
  'thread.publish':  '📝 Thread Published',
  'sayHi':           '👋 Say Hi',
};

interface Props { onClose: () => void; }

export default function ChainExplorer({ onClose }: Props) {
  const { state, verify, refresh } = useChain();
  const [tab, setTab] = useState<'blocks' | 'txs'>('blocks');
  const [verifyState, setVerifyState] = useState<'idle' | 'pending' | 'ok' | 'broken'>('idle');
  const [verifyBroken, setVerifyBroken] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const blocks = recentBlocks(50);
  const txs = recentTxs(50);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const runVerify = async () => {
    setVerifyState('pending');
    const result = await verify();
    if (result.ok) {
      setVerifyState('ok');
      setVerifyBroken(null);
    } else {
      setVerifyState('broken');
      setVerifyBroken(result.brokenAt ?? null);
    }
    setTimeout(() => setVerifyState('idle'), 3500);
  };

  const copy = (s: string) => {
    navigator.clipboard.writeText(s);
    setCopied(s);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50"
      />
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="fixed inset-x-0 bottom-0 md:inset-auto md:right-6 md:bottom-6 md:top-6 md:w-[420px] z-50 bg-background rounded-t-3xl md:rounded-3xl border border-border shadow-2xl flex flex-col h-[85vh] md:h-auto"
      >
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-border shrink-0">
          <div className="w-10 h-1 rounded-full bg-border mx-auto mb-3 md:hidden" />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[18px] font-black tracking-tight text-foreground">DappChain Explorer</h3>
              <p className="text-[11px] font-medium text-muted-foreground mt-0.5">你的链上活动一览无遗</p>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-secondary flex items-center justify-center">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Verify Action */}
          <button
            onClick={runVerify}
            disabled={verifyState === 'pending'}
            className={`mt-3 w-full flex items-center justify-center gap-2 h-10 rounded-xl text-[12px] font-bold border transition-all ${
              verifyState === 'ok'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300'
                : verifyState === 'broken'
                ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-900/30 dark:border-rose-800 dark:text-rose-300'
                : 'bg-secondary border-border text-foreground hover:bg-foreground hover:text-background'
            }`}
          >
            {verifyState === 'pending' && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
            {verifyState === 'ok'      && <ShieldCheck className="w-3.5 h-3.5" />}
            {verifyState === 'broken'  && <ShieldAlert className="w-3.5 h-3.5" />}
            {verifyState === 'idle'    && <ShieldQuestion className="w-3.5 h-3.5" />}
            {verifyState === 'pending' && '验证中…'}
            {verifyState === 'ok'      && '链完整性 ✓ 所有区块均已校验'}
            {verifyState === 'broken'  && `检测到篡改于区块 #${verifyBroken}`}
            {verifyState === 'idle'    && '验证链完整性'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-5 pt-3 gap-1 shrink-0">
          {([
            { id: 'blocks', label: 'Blocks', count: blocks.length },
            { id: 'txs',    label: 'Txs',    count: txs.length },
          ] as const).map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 h-9 rounded-xl text-[12px] font-bold transition-all ${
                tab === t.id
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.label} <span className="opacity-60">{t.count}</span>
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-3 no-scrollbar">
          {!state ? (
            <div className="text-center py-12 text-muted-foreground text-[13px]">
              链尚未初始化
            </div>
          ) : tab === 'blocks' ? (
            <div className="space-y-2">
              {blocks.map(b => (
                <Fragment key={b.hash}>
                  <BlockRow block={b} onCopy={copy} copied={copied === b.hash} />
                </Fragment>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {txs.map(tx => (
                <Fragment key={tx.id}>
                  <TxRow tx={tx} onCopy={copy} copied={copied === tx.id} />
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

function BlockRow({ block, onCopy, copied }: { block: Block; onCopy: (s: string) => void; copied: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-3.5 hover:bg-card transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-foreground text-background flex items-center justify-center text-[11px] font-black tabular-nums">
            #{block.index}
          </div>
          <button
            onClick={() => onCopy(block.hash)}
            className="font-mono text-[11px] font-semibold text-foreground hover:underline flex items-center gap-1"
          >
            <Hash className="w-3 h-3 text-muted-foreground" />
            {shortHash(block.hash)}
            {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
          </button>
        </div>
        <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" />
          {timeAgo(block.timestamp)}
        </span>
      </div>
      <div className="flex items-center gap-1.5 flex-wrap">
        {block.txs.map(tx => (
          <span key={tx.id} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
            {TX_LABELS[tx.type] ?? tx.type}
          </span>
        ))}
        <span className="text-[10px] font-mono text-muted-foreground ml-auto">nonce {block.nonce}</span>
      </div>
    </div>
  );
}

function TxRow({ tx, onCopy, copied }: { tx: Transaction; onCopy: (s: string) => void; copied: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-3.5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[12px] font-bold text-foreground">{TX_LABELS[tx.type] ?? tx.type}</span>
        <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" />
          {timeAgo(tx.timestamp)}
        </span>
      </div>
      <button
        onClick={() => onCopy(tx.id)}
        className="font-mono text-[10.5px] text-muted-foreground hover:text-foreground flex items-center gap-1"
      >
        <Zap className="w-2.5 h-2.5" />
        {shortHash(tx.id)}
        {copied ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Copy className="w-2.5 h-2.5" />}
      </button>
    </div>
  );
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}
