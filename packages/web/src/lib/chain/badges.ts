/**
 * Soulbound badges — non-transferable achievements minted to a user's chain.
 * Badges are pure metadata; the chain stores only badge IDs in ChainState.badges.
 */

import { Sparkles, Star, Flame, Hand, Compass, Layers, Award, Zap, Heart, Gem } from 'lucide-react';
import type { ComponentType } from 'react';
import type { ChainState } from './chain';

export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface BadgeDef {
  id: string;
  name: string;
  emoji: string;
  icon: ComponentType<{ className?: string }>;
  description: string;
  rarity: BadgeRarity;
  /** A function that decides whether the badge should be granted given the latest chain state. */
  check: (state: ChainState) => boolean;
}

export const BADGES: BadgeDef[] = [
  {
    id: 'genesis',
    name: 'Genesis',
    emoji: '✨',
    icon: Sparkles,
    description: '你的链上身份诞生',
    rarity: 'common',
    check: () => true,
  },
  {
    id: 'first_card',
    name: 'First Card',
    emoji: '💳',
    icon: Star,
    description: '创建第一张数字名片',
    rarity: 'common',
    check: (s) => s.blocks.some(b => b.txs.some(t => t.type === 'profile.create')),
  },
  {
    id: 'edit_5',
    name: 'Card Curator',
    emoji: '🪄',
    icon: Gem,
    description: '5 次以上完善名片',
    rarity: 'rare',
    check: (s) => {
      const count = s.blocks.flatMap(b => b.txs).filter(t => t.type === 'profile.update').length;
      return count >= 5;
    },
  },
  {
    id: 'first_activity',
    name: 'Trailblazer',
    emoji: '🚀',
    icon: Compass,
    description: '发起第一个活动',
    rarity: 'rare',
    check: (s) => s.blocks.some(b => b.txs.some(t => t.type === 'activity.create')),
  },
  {
    id: 'social_5',
    name: 'Connector',
    emoji: '🤝',
    icon: Hand,
    description: '加入 5 个活动',
    rarity: 'rare',
    check: (s) => {
      const count = s.blocks.flatMap(b => b.txs).filter(t => t.type === 'activity.join').length;
      return count >= 5;
    },
  },
  {
    id: 'icebreaker',
    name: 'Icebreaker',
    emoji: '❄️',
    icon: Zap,
    description: '抽过 10 张破冰卡',
    rarity: 'common',
    check: (s) => {
      const count = s.blocks.flatMap(b => b.txs).filter(t => t.type === 'card.draw').length;
      return count >= 10;
    },
  },
  {
    id: 'streak_3',
    name: '3-Day Streak',
    emoji: '🔥',
    icon: Flame,
    description: '连续 3 天活跃',
    rarity: 'rare',
    check: (s) => s.stats.streak >= 3,
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    emoji: '⚡',
    icon: Flame,
    description: '连续 7 天活跃',
    rarity: 'epic',
    check: (s) => s.stats.streak >= 7,
  },
  {
    id: 'block_50',
    name: 'Block Builder',
    emoji: '🧱',
    icon: Layers,
    description: '链上累计 50 个区块',
    rarity: 'epic',
    check: (s) => s.stats.blockCount >= 50,
  },
  {
    id: 'thread_lover',
    name: 'Storyteller',
    emoji: '📖',
    icon: Heart,
    description: '发布 3 条动态',
    rarity: 'common',
    check: (s) => {
      const count = s.blocks.flatMap(b => b.txs).filter(t => t.type === 'thread.publish').length;
      return count >= 3;
    },
  },
  {
    id: 'verified',
    name: 'Verified Builder',
    emoji: '✅',
    icon: Award,
    description: '完成所有名片字段',
    rarity: 'legendary',
    check: () => false, // granted explicitly when profile is complete
  },
];

export const BADGE_BY_ID: Record<string, BadgeDef> = Object.fromEntries(
  BADGES.map(b => [b.id, b]),
);

export function rarityColor(r: BadgeRarity): string {
  switch (r) {
    case 'common': return 'from-slate-400/20 to-slate-200/40 text-slate-700 dark:text-slate-200';
    case 'rare': return 'from-sky-400/30 to-blue-200/40 text-sky-700 dark:text-sky-200';
    case 'epic': return 'from-purple-400/30 to-fuchsia-200/40 text-purple-700 dark:text-purple-200';
    case 'legendary': return 'from-amber-400/30 to-yellow-200/50 text-amber-700 dark:text-amber-200';
  }
}

export function rarityRing(r: BadgeRarity): string {
  switch (r) {
    case 'common': return 'ring-1 ring-border';
    case 'rare': return 'ring-1 ring-sky-300/60';
    case 'epic': return 'ring-2 ring-purple-300/70';
    case 'legendary': return 'ring-2 ring-amber-300/80 shadow-[0_0_24px_rgba(251,191,36,0.25)]';
  }
}

/** Evaluate every badge against current state and return ones newly earned. */
export function evaluateBadges(state: ChainState, profileComplete = false): string[] {
  const earned: string[] = [];
  for (const def of BADGES) {
    if (state.badges.includes(def.id)) continue;
    if (def.id === 'verified' ? profileComplete : def.check(state)) {
      earned.push(def.id);
    }
  }
  return earned;
}
