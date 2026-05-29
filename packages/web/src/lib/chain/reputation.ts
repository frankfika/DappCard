/**
 * Reputation — a derived score from on-chain activity.
 * Pure function over ChainState; UI displays it as DappRep.
 */

import type { ChainState } from './chain';

export interface ReputationBreakdown {
  total: number;
  level: number;
  tier: 'Newcomer' | 'Builder' | 'Contributor' | 'Pioneer' | 'Legend';
  components: {
    activity: number;
    streak: number;
    badges: number;
    diversity: number;
  };
  nextLevelAt: number;
  progress: number; // 0..1
}

const WEIGHTS = {
  txBase: 2,
  badgeBase: 25,
  streakBase: 8,
  diversityBase: 12,
} as const;

const TIER_THRESHOLDS: { tier: ReputationBreakdown['tier']; min: number }[] = [
  { tier: 'Newcomer', min: 0 },
  { tier: 'Builder', min: 100 },
  { tier: 'Contributor', min: 300 },
  { tier: 'Pioneer', min: 700 },
  { tier: 'Legend', min: 1500 },
];

export function computeReputation(state: ChainState | null): ReputationBreakdown {
  if (!state) {
    return {
      total: 0, level: 1, tier: 'Newcomer',
      components: { activity: 0, streak: 0, badges: 0, diversity: 0 },
      nextLevelAt: 100, progress: 0,
    };
  }

  const txCount = state.stats.txCount;
  const distinctTypes = new Set(state.blocks.flatMap(b => b.txs).map(t => t.type)).size;

  const activity = Math.min(400, txCount * WEIGHTS.txBase);
  const streak = Math.min(200, state.stats.streak * WEIGHTS.streakBase);
  const badges = Math.min(500, state.badges.length * WEIGHTS.badgeBase);
  const diversity = Math.min(150, distinctTypes * WEIGHTS.diversityBase);
  const total = activity + streak + badges + diversity;

  const level = Math.max(1, Math.floor(Math.sqrt(total / 25)) + 1);

  let tier: ReputationBreakdown['tier'] = 'Newcomer';
  for (const t of TIER_THRESHOLDS) if (total >= t.min) tier = t.tier;

  const nextLevelTotal = (level) * (level) * 25;
  const prevLevelTotal = (level - 1) * (level - 1) * 25;
  const progress = nextLevelTotal === prevLevelTotal
    ? 1
    : Math.min(1, Math.max(0, (total - prevLevelTotal) / (nextLevelTotal - prevLevelTotal)));

  return {
    total,
    level,
    tier,
    components: { activity, streak, badges, diversity },
    nextLevelAt: nextLevelTotal,
    progress,
  };
}

export function tierColor(tier: ReputationBreakdown['tier']): string {
  switch (tier) {
    case 'Newcomer':    return 'text-slate-500';
    case 'Builder':     return 'text-sky-600';
    case 'Contributor': return 'text-violet-600';
    case 'Pioneer':     return 'text-amber-600';
    case 'Legend':      return 'text-rose-600';
  }
}

export function tierGradient(tier: ReputationBreakdown['tier']): string {
  switch (tier) {
    case 'Newcomer':    return 'from-slate-400 to-slate-600';
    case 'Builder':     return 'from-sky-400 to-blue-600';
    case 'Contributor': return 'from-violet-400 to-purple-600';
    case 'Pioneer':     return 'from-amber-400 to-orange-600';
    case 'Legend':      return 'from-rose-400 via-fuchsia-500 to-amber-500';
  }
}
