import { useState } from 'react';
import {
  Share, MapPin, Sparkles, MessageCircle, Wallet, Twitter,
  Check, User, Zap, X, Send, Plus, Trash2,
  CheckCircle2, Link2, ExternalLink, Edit3, CloudUpload, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAccount } from 'wagmi';
import { useProfile } from '../store';

const AVATAR_SEEDS = ['Alex', 'Luna', 'Max', 'Zoe', 'Kai', 'Nova', 'Aria', 'Leo', 'Mia', 'Finn', 'Sage', 'River'];
const TAG_OPTIONS = [
  { label: 'Builder', icon: '🔨' }, { label: 'Designer', icon: '✨' },
  { label: 'Founder', icon: '🚀' }, { label: 'Developer', icon: '💻' },
  { label: 'Artist', icon: '🎨' }, { label: 'Trader', icon: '📈' },
  { label: 'Researcher', icon: '🔬' }, { label: 'Community', icon: '🌐' },
  { label: 'Marketing', icon: '📣' }, { label: 'Investor', icon: '💰' },
  { label: 'Content', icon: '✍️' }, { label: 'Gaming', icon: '🎮' },
];

export default function CardPage() {
  const { profile, updateProfile, isSetup, syncStatus, syncToChain } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [showShareDiv, setShowShareDiv] = useState(false);
  const [showSayHi, setShowSayHi] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isMe, setIsMe] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const { isConnected } = useAccount();

  if (!isSetup) {
    return <OnboardingFlow onComplete={(data) => updateProfile(data)} />;
  }

  const handleShare = (platform: string) => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => { setIsCopied(false); if (platform === 'copy') setShowShareDiv(false); }, 1500);
  };

  const handleSync = async () => {
    if (!isConnected || syncing) return;
    setSyncing(true);
    try {
      await syncToChain();
    } finally {
      setSyncing(false);
    }
  };

  const avatarUrl = profile.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${profile.name}&backgroundColor=transparent`;

  return (
    <>
      <header className="px-5 py-3 flex justify-between items-center z-20 shrink-0">
        <button onClick={() => setIsMe(!isMe)} className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-sm flex items-center justify-center text-gray-800 hover:scale-105 transition-transform">
          <User className="w-5 h-5" />
        </button>
        {profile.event && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-extrabold text-[10px] tracking-widest uppercase text-gray-800">{profile.event}</span>
          </div>
        )}
      </header>

      <main className="flex-1 overflow-y-auto px-5 pb-40 z-10 no-scrollbar relative w-full pt-2">
        <div className="flex flex-col items-center mb-5">
          <motion.div initial={{ scale: 0.9, y: 10 }} animate={{ scale: 1, y: 0 }} className="w-[100px] h-[100px] rounded-full p-1.5 bg-gradient-to-tr from-[#A6F7E2] to-[#C0A3F9] mb-3 relative shadow-xl">
            <img src={avatarUrl} className="w-full h-full rounded-full object-cover bg-white" alt="avatar"/>
            {profile.verified.wallet && (
              <div className="absolute bottom-0 right-0 w-7 h-7 bg-gray-900 rounded-full border-[3px] border-[#F7F9F8] shadow-sm flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-[#A6F7E2] stroke-[3]" />
              </div>
            )}
          </motion.div>
          <h1 className="text-[26px] font-black tracking-tight text-gray-900 mb-0.5">{profile.name}</h1>
          {profile.handle && <div className="text-[14px] font-bold text-gray-500 mb-3">{profile.handle}</div>}
          {profile.event && (
            <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-md border border-white text-gray-900 px-3.5 py-1.5 rounded-full shadow-sm mb-4">
              <MapPin className="w-3 h-3 text-[#C0A3F9]" />
              <span className="text-[10px] font-black uppercase tracking-widest">{profile.event}</span>
            </div>
          )}
        </div>

        {profile.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {profile.tags.map((tag) => (
              <div key={tag.label} className="px-3.5 py-2 rounded-[18px] font-bold text-[12px] border border-white/60 bg-white/60 backdrop-blur-md text-gray-800 shadow-sm flex items-center gap-1.5">
                <span>{tag.icon}</span><span>{tag.label}</span>
              </div>
            ))}
          </div>
        )}

        {profile.bio && (
          <div className="bg-white/80 backdrop-blur-xl rounded-[28px] p-5 mb-3 shadow-[0_6px_24px_rgba(0,0,0,0.04)] border border-white">
            <p className="text-[15px] leading-relaxed font-semibold text-gray-700 text-center">{profile.bio}</p>
          </div>
        )}

        {profile.lookingFor && (
          <div className="w-full p-4 bg-gradient-to-br from-[#F4F1FD] to-white rounded-[28px] mb-3 flex gap-3 items-center border border-white shadow-[0_6px_24px_rgba(0,0,0,0.03)]">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
              <Zap className="w-4 h-4 text-[#C0A3F9] fill-[#C0A3F9]/20" />
            </div>
            <div>
              <div className="text-[9px] font-black tracking-widest uppercase text-[#A385E0] mb-0.5">Looking for</div>
              <span className="text-[14px] font-bold leading-snug text-gray-800">{profile.lookingFor}</span>
            </div>
          </div>
        )}

        {(profile.verified.wallet || profile.verified.twitter || profile.verified.discord) && (
          <div className="bg-white/80 backdrop-blur-xl rounded-[28px] p-5 shadow-[0_6px_24px_rgba(0,0,0,0.04)] border border-white flex justify-around mb-6">
            {profile.verified.wallet && (
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center"><Wallet className="w-4 h-4 text-orange-500" /></div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Wallet</span>
              </div>
            )}
            {profile.verified.twitter && (
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center"><Twitter className="w-4 h-4 text-blue-500" /></div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Social</span>
              </div>
            )}
            {profile.verified.discord && (
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center"><MessageCircle className="w-4 h-4 text-indigo-500" /></div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Discord</span>
              </div>
            )}
          </div>
        )}

        {profile.highlights.length > 0 && (
          <div className="w-full mb-6">
            <div className="flex items-center gap-2 mb-3 pl-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C0A3F9]" />
              <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-500">Highlights</h3>
            </div>
            <div className="space-y-2.5">
              {profile.highlights.map((item) => (
                <a key={item.id} href={item.link || '#'} className="block w-full bg-white/80 backdrop-blur-md rounded-[24px] p-3.5 flex items-center justify-between shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:scale-[1.01] active:scale-[0.98] transition-transform border border-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[18px] shadow-sm">{item.icon}</div>
                    <div>
                      <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{item.type}</div>
                      <div className="text-[13px] font-bold text-gray-800 leading-tight">{item.title}</div>
                    </div>
                  </div>
                  {item.link && <ExternalLink className="w-3.5 h-3.5 text-gray-300" />}
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Actions */}
      <div className="absolute bottom-20 left-0 right-0 h-16 bg-gradient-to-t from-[#F7F9F8] to-transparent pointer-events-none z-20"></div>
      <div className="absolute bottom-[88px] left-5 right-5 flex gap-3 z-30">
        {isMe ? (
          <>
            <button onClick={() => setIsEditing(true)} className="w-[52px] h-[52px] rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all border border-gray-100">
              <Edit3 className="w-5 h-5 text-gray-700" />
            </button>
            {isConnected && (
              <button
                onClick={handleSync}
                disabled={syncing || syncStatus.isSynced}
                className={`w-[52px] h-[52px] rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all border ${
                  syncStatus.isSynced
                    ? 'bg-green-50 border-green-200 text-green-600'
                    : 'bg-white border-gray-100 text-gray-600'
                }`}
                title={syncStatus.isSynced ? '已同步到链上' : '同步到链上'}
              >
                {syncing ? (
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
                ) : syncStatus.isSynced ? (
                  <Globe className="w-5 h-5" />
                ) : (
                  <CloudUpload className="w-5 h-5" />
                )}
              </button>
            )}
            <button onClick={() => setShowShareDiv(true)} className="flex-1 h-[52px] rounded-full bg-gray-900 text-[#A6F7E2] font-black text-[14px] shadow-xl flex items-center justify-center gap-2 active:scale-[0.97] transition-all">
              分享名片 <Share className="w-4 h-4 ml-1" />
            </button>
          </>
        ) : (
          <button onClick={() => setShowSayHi(true)} className="w-full h-[52px] rounded-full bg-gray-900 text-white font-black text-[15px] shadow-xl flex items-center justify-center gap-2 active:scale-[0.97] transition-all">
            👋 Say Hi
          </button>
        )}
      </div>

      <AnimatePresence>{showSayHi && <SayHiDrawer onClose={() => setShowSayHi(false)} />}</AnimatePresence>
      <AnimatePresence>{showShareDiv && <ShareDrawer onClose={() => setShowShareDiv(false)} handleShare={handleShare} isCopied={isCopied} />}</AnimatePresence>
      <AnimatePresence>{isEditing && <EditProfile profile={profile} avatarUrl={avatarUrl} onSave={(p) => { updateProfile(p); setIsEditing(false); }} onClose={() => setIsEditing(false)} />}</AnimatePresence>
    </>
  );
}

function OnboardingFlow({ onComplete }: { onComplete: (data: Partial<import('../store').Profile>) => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [bio, setBio] = useState('');
  const [selectedTags, setSelectedTags] = useState<{ label: string; icon: string }[]>([]);
  const [lookingFor, setLookingFor] = useState('');
  const [avatarSeed, setAvatarSeed] = useState(AVATAR_SEEDS[0]);

  const toggleTag = (tag: { label: string; icon: string }) => {
    setSelectedTags(prev =>
      prev.find(t => t.label === tag.label) ? prev.filter(t => t.label !== tag.label) : [...prev, tag].slice(0, 5)
    );
  };

  const finish = () => {
    onComplete({
      name,
      handle,
      bio,
      tags: selectedTags,
      lookingFor,
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${avatarSeed}&backgroundColor=transparent`,
    });
  };

  return (
    <div className="flex-1 flex flex-col px-6 pt-12 pb-28 overflow-y-auto no-scrollbar">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1">
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-[24px] font-black text-gray-900 mb-2">Create Your Card</h2>
              <p className="text-[14px] text-gray-500 font-medium">Let people know who you are</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#A6F7E2] to-[#C0A3F9] mb-3 shadow-lg">
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${avatarSeed}&backgroundColor=transparent`} className="w-full h-full rounded-full bg-white" alt="avatar" />
              </div>
              <div className="flex gap-1.5 flex-wrap justify-center">
                {AVATAR_SEEDS.slice(0, 8).map(seed => (
                  <button key={seed} onClick={() => setAvatarSeed(seed)} className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${avatarSeed === seed ? 'border-gray-900 scale-110' : 'border-transparent opacity-60'}`}>
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=transparent`} className="w-full h-full bg-gray-50" alt={seed} />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full bg-white rounded-[20px] px-5 py-4 text-[16px] font-bold text-gray-900 outline-none focus:ring-2 focus:ring-[#A6F7E2] border border-gray-100 shadow-sm" />
              <input value={handle} onChange={e => setHandle(e.target.value)} placeholder="Handle (e.g. alex.eth)" className="w-full bg-white rounded-[20px] px-5 py-4 text-[16px] font-bold text-gray-900 outline-none focus:ring-2 focus:ring-[#A6F7E2] border border-gray-100 shadow-sm" />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-[24px] font-black text-gray-900 mb-2">About You</h2>
              <p className="text-[14px] text-gray-500 font-medium">A short bio and what you're looking for</p>
            </div>
            <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="One-line bio..." className="w-full bg-white rounded-[24px] px-5 py-4 text-[15px] font-medium text-gray-900 outline-none focus:ring-2 focus:ring-[#A6F7E2] border border-gray-100 shadow-sm resize-none h-24" />
            <input value={lookingFor} onChange={e => setLookingFor(e.target.value)} placeholder="What are you looking for? (e.g. Co-founder, Collaborators)" className="w-full bg-white rounded-[20px] px-5 py-4 text-[15px] font-medium text-gray-900 outline-none focus:ring-2 focus:ring-[#A6F7E2] border border-gray-100 shadow-sm" />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-[24px] font-black text-gray-900 mb-2">Your Tags</h2>
              <p className="text-[14px] text-gray-500 font-medium">Pick up to 5 that describe you</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {TAG_OPTIONS.map(tag => (
                <button key={tag.label} onClick={() => toggleTag(tag)} className={`px-4 py-2.5 rounded-[18px] text-[13px] font-bold transition-all border ${selectedTags.find(t => t.label === tag.label) ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-100 hover:border-gray-300'}`}>
                  {tag.icon} {tag.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      <div className="flex gap-3 mt-6 relative z-50">
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)} className="px-6 h-[52px] rounded-full bg-white border border-gray-200 font-bold text-[14px] text-gray-700 active:scale-95 transition-all">
            Back
          </button>
        )}
        <button
          onClick={() => step < 2 ? setStep(s => s + 1) : finish()}
          disabled={step === 0 && !name}
          className="flex-1 h-[52px] rounded-full bg-gray-900 text-white font-black text-[15px] shadow-lg active:scale-[0.97] transition-all disabled:opacity-40"
        >
          {step < 2 ? 'Next' : 'Create Card'}
        </button>
      </div>
    </div>
  );
}
function EditProfile({ profile, avatarUrl, onSave, onClose }: { profile: import('../store').Profile; avatarUrl: string; onSave: (p: Partial<import('../store').Profile>) => void; onClose: () => void }) {
  const [name, setName] = useState(profile.name);
  const [handle, setHandle] = useState(profile.handle);
  const [bio, setBio] = useState(profile.bio);
  const [lookingFor, setLookingFor] = useState(profile.lookingFor);
  const [event, setEvent] = useState(profile.event);
  const [selectedTags, setSelectedTags] = useState(profile.tags);
  const [highlights, setHighlights] = useState(profile.highlights);
  const [wallet, setWallet] = useState(profile.verified.wallet);
  const [twitter, setTwitter] = useState(profile.verified.twitter);
  const [discord, setDiscord] = useState(profile.verified.discord);

  const toggleTag = (tag: { label: string; icon: string }) => {
    setSelectedTags(prev => prev.find(t => t.label === tag.label) ? prev.filter(t => t.label !== tag.label) : [...prev, tag].slice(0, 5));
  };

  const addHighlight = () => {
    setHighlights(prev => [...prev, { id: Date.now(), title: '', type: '', icon: '🎯', link: '' }]);
  };

  const updateHighlight = (id: number, field: string, value: string) => {
    setHighlights(prev => prev.map(h => h.id === id ? { ...h, [field]: value } : h));
  };

  const removeHighlight = (id: number) => {
    setHighlights(prev => prev.filter(h => h.id !== id));
  };

  const save = () => {
    onSave({ name, handle, bio, lookingFor, event, tags: selectedTags, highlights: highlights.filter(h => h.title), verified: { wallet, twitter, discord } });
  };

  return (
    <motion.div initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }} transition={{ type: "spring", damping: 24, stiffness: 200 }} className="absolute inset-0 bg-[#F4F4F5] z-50 overflow-y-auto pb-8">
      <div className="sticky top-0 bg-[#F4F4F5]/80 backdrop-blur-xl z-20 px-5 py-4 flex justify-between items-center">
        <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm"><X className="w-4 h-4" /></button>
        <span className="font-extrabold text-[15px] tracking-tight text-gray-900">Edit Card</span>
        <button onClick={save} className="text-white bg-black px-4 py-2 rounded-full font-bold text-[12px] hover:scale-105 transition-transform">Save</button>
      </div>
      <div className="px-5 py-4 space-y-5">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden mb-2">
            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover bg-gradient-to-tr from-[#A6F7E2] to-[#C0A3F9]" />
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-100 space-y-3">
          <div><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Name</label><input value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-50 rounded-[16px] px-4 py-3 text-[15px] font-bold text-gray-900 outline-none focus:ring-2 focus:ring-[#A6F7E2] mt-1" /></div>
          <div><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Handle</label><input value={handle} onChange={e => setHandle(e.target.value)} className="w-full bg-gray-50 rounded-[16px] px-4 py-3 text-[15px] font-bold text-gray-900 outline-none focus:ring-2 focus:ring-[#A6F7E2] mt-1" /></div>
          <div><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Bio</label><textarea value={bio} onChange={e => setBio(e.target.value)} className="w-full bg-gray-50 rounded-[16px] px-4 py-3 text-[15px] font-medium text-gray-900 outline-none focus:ring-2 focus:ring-[#A6F7E2] mt-1 resize-none h-20" /></div>
          <div><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Looking For</label><input value={lookingFor} onChange={e => setLookingFor(e.target.value)} className="w-full bg-gray-50 rounded-[16px] px-4 py-3 text-[15px] font-medium text-gray-900 outline-none focus:ring-2 focus:ring-[#A6F7E2] mt-1" /></div>
          <div><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Event / Location</label><input value={event} onChange={e => setEvent(e.target.value)} placeholder="e.g. ETHGlobal Tokyo" className="w-full bg-gray-50 rounded-[16px] px-4 py-3 text-[15px] font-medium text-gray-900 outline-none focus:ring-2 focus:ring-[#A6F7E2] mt-1" /></div>
        </div>

        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 mb-2 block">Tags</label>
          <div className="flex flex-wrap gap-2">
            {TAG_OPTIONS.map(tag => (
              <button key={tag.label} onClick={() => toggleTag(tag)} className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border ${selectedTags.find(t => t.label === tag.label) ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200'}`}>
                {tag.icon} {tag.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 mb-2 block">Verified Accounts</label>
          <div className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-100 space-y-3">
            <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0"><Wallet className="w-4 h-4 text-orange-500" /></div><input value={wallet} onChange={e => setWallet(e.target.value)} placeholder="0x..." className="flex-1 bg-gray-50 rounded-[12px] px-3 py-2 text-[13px] font-medium outline-none" /></div>
            <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0"><Twitter className="w-4 h-4 text-blue-500" /></div><input value={twitter} onChange={e => setTwitter(e.target.value)} placeholder="@handle" className="flex-1 bg-gray-50 rounded-[12px] px-3 py-2 text-[13px] font-medium outline-none" /></div>
            <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0"><MessageCircle className="w-4 h-4 text-indigo-500" /></div><input value={discord} onChange={e => setDiscord(e.target.value)} placeholder="user#1234" className="flex-1 bg-gray-50 rounded-[12px] px-3 py-2 text-[13px] font-medium outline-none" /></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Highlights</label>
            <button onClick={addHighlight} className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center"><Plus className="w-3.5 h-3.5" /></button>
          </div>
          <div className="space-y-2">
            {highlights.map(h => (
              <div key={h.id} className="bg-white rounded-[16px] p-3 border border-gray-100 flex gap-2 items-start">
                <input value={h.icon} onChange={e => updateHighlight(h.id, 'icon', e.target.value)} className="w-8 h-8 text-center text-[18px] bg-gray-50 rounded-lg shrink-0" maxLength={2} />
                <div className="flex-1 space-y-1.5">
                  <input value={h.title} onChange={e => updateHighlight(h.id, 'title', e.target.value)} placeholder="Title" className="w-full bg-gray-50 rounded-[10px] px-3 py-1.5 text-[12px] font-bold outline-none" />
                  <div className="flex gap-1.5">
                    <input value={h.type} onChange={e => updateHighlight(h.id, 'type', e.target.value)} placeholder="Type" className="flex-1 bg-gray-50 rounded-[10px] px-3 py-1.5 text-[11px] outline-none" />
                    <input value={h.link} onChange={e => updateHighlight(h.id, 'link', e.target.value)} placeholder="Link" className="flex-1 bg-gray-50 rounded-[10px] px-3 py-1.5 text-[11px] outline-none" />
                  </div>
                </div>
                <button onClick={() => removeHighlight(h.id)} className="text-gray-300 hover:text-red-400 mt-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
function SayHiDrawer({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const send = () => { setSent(true); setTimeout(onClose, 1200); };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm z-40" />
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] p-6 pt-5 z-50 shadow-2xl">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
        {sent ? (
          <div className="flex flex-col items-center py-8">
            <CheckCircle2 className="w-12 h-12 text-green-500 mb-3" />
            <p className="text-[16px] font-bold text-gray-900">Signal Sent!</p>
          </div>
        ) : (
          <>
            <h3 className="text-[20px] font-black text-gray-900 mb-4">Send a Signal</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Let's connect 🤝", "Love your work ✨", "Want to collaborate 🚀", "Coffee? ☕"].map(msg => (
                <button key={msg} onClick={() => setMessage(msg)} className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all border ${message === msg ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 text-gray-700 border-gray-100'}`}>{msg}</button>
              ))}
            </div>
            <div className="relative">
              <textarea value={message} onChange={e => setMessage(e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-[24px] p-5 pr-14 text-[15px] outline-none focus:ring-2 focus:ring-[#A6F7E2] resize-none h-[100px] font-medium" placeholder="Write something..." />
              <button onClick={send} disabled={!message} className="absolute bottom-3 right-3 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform disabled:opacity-30">
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}

function ShareDrawer({ onClose, handleShare, isCopied }: { onClose: () => void; handleShare: (p: string) => void; isCopied: boolean }) {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm z-50" />
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] p-6 pt-5 z-50">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
        <h3 className="text-[20px] font-black text-center text-gray-900 mb-6">Share Card</h3>
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { name: 'X', icon: Twitter, color: 'bg-gray-50', text: 'text-black', key: 'x' },
            { name: 'Telegram', icon: Send, color: 'bg-blue-50', text: 'text-blue-500', key: 'telegram' },
            { name: 'Discord', icon: MessageCircle, color: 'bg-indigo-50', text: 'text-indigo-500', key: 'discord' },
            { name: 'Line', icon: MessageCircle, color: 'bg-green-50', text: 'text-green-500', key: 'line' },
          ].map(p => (
            <div key={p.key} className="flex flex-col items-center gap-2">
              <button className={`w-14 h-14 ${p.color} ${p.text} rounded-full flex items-center justify-center active:scale-95 transition-all border border-gray-50`} onClick={() => handleShare(p.key)}>
                <p.icon className="w-5 h-5" />
              </button>
              <span className="text-[11px] font-bold text-gray-500">{p.name}</span>
            </div>
          ))}
        </div>
        <button onClick={() => handleShare('copy')} className="w-full flex items-center justify-center gap-2 py-4 bg-gray-50 border border-gray-100 rounded-full font-extrabold text-[14px] text-gray-900 active:bg-gray-200 transition-colors">
          {isCopied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
          {isCopied ? "Copied!" : "Copy Link"}
        </button>
      </motion.div>
    </>
  );
}
