import { useState, useEffect, useCallback } from 'react';

export interface Profile {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  tags: { label: string; icon: string }[];
  lookingFor: string;
  highlights: { id: number; title: string; type: string; icon: string; link: string }[];
  verified: { wallet: string; twitter: string; discord: string };
  event: string;
}

export interface GameSession {
  presetId: string | null;
  selectedTags: string[];
  history: string[];
  favorites: string[];
}

export interface Activity {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  location: string;
  time: string;
  participants: number;
  maxParticipants: number;
  creator: string;
  avatar: string;
  description: string;
  joined: boolean;
}

const DEFAULT_PROFILE: Profile = {
  name: '',
  handle: '',
  avatar: '',
  bio: '',
  tags: [],
  lookingFor: '',
  highlights: [],
  verified: { wallet: '', twitter: '', discord: '' },
  event: '',
};

const DEFAULT_GAME_SESSION: GameSession = {
  presetId: null,
  selectedTags: [],
  history: [],
  favorites: [],
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {}
  return fallback;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(() =>
    loadFromStorage('dappcard_profile', DEFAULT_PROFILE)
  );
  const [isSetup, setIsSetup] = useState(() => {
    return !!loadFromStorage('dappcard_profile', DEFAULT_PROFILE).name;
  });

  useEffect(() => {
    localStorage.setItem('dappcard_profile', JSON.stringify(profile));
    setIsSetup(!!profile.name);
  }, [profile]);

  const updateProfile = useCallback((updates: Partial<Profile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  }, []);

  return { profile, updateProfile, isSetup };
}

export function useGameSession() {
  const [session, setSession] = useState<GameSession>(() =>
    loadFromStorage('dappcard_game', DEFAULT_GAME_SESSION)
  );

  useEffect(() => {
    localStorage.setItem('dappcard_game', JSON.stringify(session));
  }, [session]);

  const addToHistory = useCallback((cardId: string) => {
    setSession(prev => ({
      ...prev,
      history: [...prev.history.filter(id => id !== cardId), cardId],
    }));
  }, []);

  const toggleFavorite = useCallback((cardId: string) => {
    setSession(prev => ({
      ...prev,
      favorites: prev.favorites.includes(cardId)
        ? prev.favorites.filter(id => id !== cardId)
        : [...prev.favorites, cardId],
    }));
  }, []);

  const resetHistory = useCallback(() => {
    setSession(prev => ({ ...prev, history: [] }));
  }, []);

  return { session, setSession, addToHistory, toggleFavorite, resetHistory };
}

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>(() =>
    loadFromStorage('dappcard_activities', [])
  );

  useEffect(() => {
    localStorage.setItem('dappcard_activities', JSON.stringify(activities));
  }, [activities]);

  const addActivity = useCallback((activity: Omit<Activity, 'id' | 'participants' | 'joined'>) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      participants: 1,
      joined: true,
    };
    setActivities(prev => [newActivity, ...prev]);
    return newActivity;
  }, []);

  const joinActivity = useCallback((id: string) => {
    setActivities(prev => prev.map(a =>
      a.id === id && !a.joined
        ? { ...a, participants: a.participants + 1, joined: true }
        : a
    ));
  }, []);

  const leaveActivity = useCallback((id: string) => {
    setActivities(prev => prev.map(a =>
      a.id === id && a.joined
        ? { ...a, participants: Math.max(0, a.participants - 1), joined: false }
        : a
    ));
  }, []);

  return { activities, addActivity, joinActivity, leaveActivity };
}
