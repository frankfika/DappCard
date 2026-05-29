/**
 * ProofPill — a small inline pill that shows a transaction or block hash.
 * Used on profile, activity cards, and threads to surface the on-chain anchor.
 */

import { ShieldCheck } from 'lucide-react';
import { shortHash } from '../../lib/chain/chain';

interface Props {
  hash: string;
  label?: string;
  onClick?: () => void;
  variant?: 'default' | 'subtle' | 'glow';
}

export default function ProofPill({ hash, label = 'Proof', onClick, variant = 'default' }: Props) {
  if (!hash) return null;
  const base = 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide transition-all';
  const styles = {
    default: 'bg-foreground/5 text-foreground hover:bg-foreground/10 border border-border',
    subtle: 'bg-secondary/60 text-muted-foreground hover:text-foreground border border-transparent',
    glow: 'bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-900/30 dark:to-sky-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40 shadow-[0_0_12px_rgba(16,185,129,0.12)]',
  } as const;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${styles[variant]} active:scale-95`}
      aria-label={`${label} ${hash}`}
    >
      <ShieldCheck className="w-3 h-3" />
      <span className="opacity-70">{label}</span>
      <code className="font-mono text-[10.5px] opacity-90">{shortHash(hash)}</code>
    </button>
  );
}
