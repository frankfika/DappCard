import { useState } from 'react';
import { MapPin, Users, Plus, X, Clock, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { companionTypes } from '@shared';
import { useActivities } from '../store';

export default function DiscoverPage() {
  const { activities, addActivity, joinActivity, leaveActivity } = useActivities();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const filteredActivities = selectedCategory
    ? activities.filter(a => a.category === selectedCategory)
    : activities;

  const getCategoryInfo = (categoryId: string) => companionTypes.find(c => c.id === categoryId);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-5 pt-4 pb-2 flex items-center justify-between shrink-0">
        <h2 className="text-[18px] font-black text-gray-900">发现搭子</h2>
        <button onClick={() => setShowCreate(true)} className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center shadow-sm active:scale-95 transition-transform">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-32 no-scrollbar">
        {/* Category Pills */}
        <div className="mb-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 pb-1">
            <button onClick={() => setSelectedCategory(null)} className={`px-3.5 py-2 rounded-full text-[11px] font-bold whitespace-nowrap shrink-0 transition-all ${!selectedCategory ? 'bg-gray-900 text-white' : 'bg-white/80 text-gray-600 border border-white/60'}`}>
              全部
            </button>
            {companionTypes.map(cat => (
              <button key={cat.id} onClick={() => setSelectedCategory(prev => prev === cat.id ? null : cat.id)} className={`px-3.5 py-2 rounded-full text-[11px] font-bold whitespace-nowrap shrink-0 transition-all ${selectedCategory === cat.id ? 'text-white shadow-sm' : 'bg-white/80 text-gray-600 border border-white/60'}`} style={selectedCategory === cat.id ? { backgroundColor: cat.color } : undefined}>
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Activity Cards */}
        {filteredActivities.length > 0 ? (
          <div className="space-y-2.5">
            {filteredActivities.map((activity, idx) => {
              const cat = getCategoryInfo(activity.category);
              return (
                <motion.div key={activity.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} className="bg-white/80 backdrop-blur-xl rounded-[22px] p-4 border border-white shadow-[0_4px_16px_rgba(0,0,0,0.03)]">
                  <div className="flex items-start gap-3">
                    <img src={activity.avatar} alt="" className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#A6F7E2] to-[#C0A3F9] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {cat && <span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white" style={{ backgroundColor: cat.color }}>{cat.icon} {cat.name}</span>}
                        <span className="text-[10px] text-gray-400 font-medium">{activity.creator}</span>
                      </div>
                      <h4 className="text-[14px] font-bold text-gray-800 leading-tight mb-1.5">{activity.title}</h4>
                      {activity.description && <p className="text-[12px] text-gray-500 mb-2 line-clamp-2">{activity.description}</p>}
                      <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{activity.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{activity.time}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{activity.participants}/{activity.maxParticipants}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => activity.joined ? leaveActivity(activity.id) : joinActivity(activity.id)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold shrink-0 transition-all ${activity.joined ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-gray-900 text-white'}`}
                    >
                      {activity.joined ? <><Check className="w-3 h-3 inline mr-0.5" />已加入</> : '加入'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-[40px] mb-3">{selectedCategory ? '🔍' : '🎯'}</div>
            <p className="text-[14px] font-bold text-gray-400 mb-1">{selectedCategory ? '这个分类还没有活动' : '还没有活动'}</p>
            <p className="text-[12px] text-gray-400">点击右上角 + 发起一个吧</p>
          </div>
        )}
      </div>

      {/* Create Activity Drawer */}
      <AnimatePresence>
        {showCreate && <CreateActivityDrawer onClose={() => setShowCreate(false)} onSubmit={(data) => { addActivity(data); setShowCreate(false); }} />}
      </AnimatePresence>
    </div>
  );
}

function CreateActivityDrawer({ onClose, onSubmit }: { onClose: () => void; onSubmit: (data: any) => void }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('6');
  const [description, setDescription] = useState('');

  const selectedCat = companionTypes.find(c => c.id === category);

  const submit = () => {
    if (!title || !category || !location || !time) return;
    const profile = JSON.parse(localStorage.getItem('dappcard_profile') || '{}');
    onSubmit({
      title,
      category,
      subcategory,
      location,
      time,
      maxParticipants: parseInt(maxParticipants) || 6,
      description,
      creator: profile.name || 'Me',
      avatar: profile.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=Me&backgroundColor=transparent`,
    });
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm z-40" />
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[36px] p-5 pt-4 z-50 max-h-[85%] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[18px] font-black text-gray-900">发起活动</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><X className="w-4 h-4" /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">活动标题</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. 周末朝阳公园跑步" className="w-full bg-gray-50 rounded-[16px] px-4 py-3 text-[14px] font-bold outline-none focus:ring-2 focus:ring-[#A6F7E2] border border-gray-100" />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">分类</label>
            <div className="flex flex-wrap gap-2">
              {companionTypes.map(cat => (
                <button key={cat.id} onClick={() => { setCategory(cat.id); setSubcategory(''); }} className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border ${category === cat.id ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-200'}`} style={category === cat.id ? { backgroundColor: cat.color } : undefined}>
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
            {selectedCat && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {selectedCat.subcategories.map(sub => (
                  <button key={sub.id} onClick={() => setSubcategory(sub.id)} className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${subcategory === sub.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {sub.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">地点</label>
              <input value={location} onChange={e => setLocation(e.target.value)} placeholder="朝阳公园" className="w-full bg-gray-50 rounded-[14px] px-3.5 py-2.5 text-[13px] font-medium outline-none border border-gray-100" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">时间</label>
              <input value={time} onChange={e => setTime(e.target.value)} placeholder="周六 14:00" className="w-full bg-gray-50 rounded-[14px] px-3.5 py-2.5 text-[13px] font-medium outline-none border border-gray-100" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">人数上限</label>
            <input type="number" value={maxParticipants} onChange={e => setMaxParticipants(e.target.value)} className="w-20 bg-gray-50 rounded-[14px] px-3.5 py-2.5 text-[13px] font-bold outline-none border border-gray-100" />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">描述 (可选)</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="活动详情..." className="w-full bg-gray-50 rounded-[16px] px-4 py-3 text-[13px] font-medium outline-none border border-gray-100 resize-none h-16" />
          </div>

          <button onClick={submit} disabled={!title || !category || !location || !time} className="w-full h-[48px] rounded-full bg-gray-900 text-white font-black text-[14px] shadow-lg active:scale-[0.97] transition-all disabled:opacity-40">
            发布活动
          </button>
        </div>
      </motion.div>
    </>
  );
}
