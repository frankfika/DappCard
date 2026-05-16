export interface CompanionCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  subcategories: { id: string; name: string }[];
}

export const companionTypes: CompanionCategory[] = [
  { id: 'sport', name: '运动搭子', icon: '🏃', color: '#FF6B6B', subcategories: [{ id: 'running', name: '跑步' }, { id: 'fitness', name: '健身' }, { id: 'hiking', name: '徒步' }, { id: 'swimming', name: '游泳' }, { id: 'ball', name: '球类' }, { id: 'yoga', name: '瑜伽' }] },
  { id: 'travel', name: '旅行搭子', icon: '✈️', color: '#4ECDC4', subcategories: [{ id: 'nearby', name: '周边游' }, { id: 'longtrip', name: '长途旅行' }, { id: 'selfdrive', name: '自驾' }, { id: 'camping', name: '露营' }] },
  { id: 'food', name: '饭搭子', icon: '🍜', color: '#FFE66D', subcategories: [{ id: 'explore', name: '探店' }, { id: 'cooking', name: '做饭' }, { id: 'afternoon', name: '下午茶' }, { id: 'latenight', name: '夜宵' }] },
  { id: 'study', name: '学习搭子', icon: '📚', color: '#95E1D3', subcategories: [{ id: 'postgrad', name: '考研' }, { id: 'civilservice', name: '考公' }, { id: 'language', name: '语言学习' }, { id: 'bookclub', name: '读书会' }] },
  { id: 'movie', name: '观影搭子', icon: '🎬', color: '#A8E6CF', subcategories: [{ id: 'cinema', name: '电影' }, { id: 'theater', name: '话剧' }, { id: 'concert', name: '音乐会' }, { id: 'exhibition', name: '展览' }] },
  { id: 'game', name: '游戏搭子', icon: '🎮', color: '#B4A7D6', subcategories: [{ id: 'boardgame', name: '桌游' }, { id: 'videogame', name: '电子游戏' }, { id: 'script', name: '剧本杀' }, { id: 'escape', name: '密室' }] },
  { id: 'pet', name: '遛宠搭子', icon: '🐕', color: '#FFB6C1', subcategories: [{ id: 'dogwalk', name: '遛狗' }, { id: 'catcafe', name: '猫咖' }, { id: 'petparty', name: '宠物聚会' }] },
  { id: 'hobby', name: '兴趣搭子', icon: '🎨', color: '#FFDAB9', subcategories: [{ id: 'painting', name: '画画' }, { id: 'photography', name: '摄影' }, { id: 'handcraft', name: '手作' }, { id: 'music', name: '音乐' }] },
];

export interface Activity {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  location: string;
  time: string;
  participants: number;
  maxParticipants: number;
  avatar: string;
  creator: string;
}

export const mockActivities: Activity[] = [
  { id: '1', title: '周末朝阳公园跑步', category: 'sport', subcategory: 'running', location: '朝阳公园', time: '周六 7:00', participants: 3, maxParticipants: 6, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=runner1', creator: '小明' },
  { id: '2', title: '三里屯新开的日料探店', category: 'food', subcategory: 'explore', location: '三里屯', time: '周五 18:30', participants: 2, maxParticipants: 4, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=foodie1', creator: '美食家' },
  { id: '3', title: '周末密室逃脱组队', category: 'game', subcategory: 'escape', location: '望京', time: '周六 14:00', participants: 4, maxParticipants: 6, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=gamer1', creator: '密室达人' },
  { id: '4', title: '香山徒步一日游', category: 'travel', subcategory: 'nearby', location: '香山', time: '周日 8:00', participants: 5, maxParticipants: 10, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=hiker1', creator: '户外爱好者' },
  { id: '5', title: '咖啡馆自习室', category: 'study', subcategory: 'postgrad', location: '中关村', time: '每天 9:00-17:00', participants: 8, maxParticipants: 12, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=student1', creator: '考研人' },
  { id: '6', title: '周末猫咖聚会', category: 'pet', subcategory: 'catcafe', location: '五道口', time: '周六 15:00', participants: 3, maxParticipants: 8, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=catperson', creator: '猫奴' },
];
