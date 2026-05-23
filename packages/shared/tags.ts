export interface TagDefinition {
  category: string;
  name: string;
  icon: string;
  color: string;
  desc: string;
  fullName?: string;
}

export interface TagCategory {
  id: string;
  name: string;
  icon: string;
}

export interface Preset {
  id: string;
  name: string;
  icon: string;
  desc: string;
  tags: string[];
}

export const tagCategories: TagCategory[] = [
  { id: 'source', name: '经典来源', icon: '' },
  { id: 'game', name: '游戏类型', icon: '' },
  { id: 'depth', name: '深度等级', icon: '' },
  { id: 'topic', name: '话题领域', icon: '' },
  { id: 'stage', name: '关系阶段', icon: '' },
  { id: 'mood', name: '氛围风格', icon: '' },
];

export const tags: Record<string, TagDefinition> = {
  '36问': { category: 'source', name: '36问', fullName: 'Arthur Aron 36问', icon: '', color: '#ff6b6b', desc: '36个问题让陌生人坠入爱河' },
  'Gottman': { category: 'source', name: 'Gottman', icon: '', color: '#4ecdc4', desc: '40年婚姻研究成果' },
  'Proust问卷': { category: 'source', name: 'Proust问卷', icon: '', color: '#a66cff', desc: '普鲁斯特经典人格问卷' },
  '爱的语言': { category: 'source', name: '爱的语言', icon: '', color: '#ff8fab', desc: '五种爱的语言' },
  '依恋理论': { category: 'source', name: '依恋理论', icon: '', color: '#ffd93d', desc: '依恋风格如何影响亲密关系' },
  'THE AND': { category: 'source', name: '{THE AND}', icon: '', color: '#6c5ce7', desc: '深度情侣对话问题' },
  'School of Life': { category: 'source', name: 'School of Life', icon: '', color: '#00b894', desc: '哲学思辨式关系问题' },
  'Esther Perel': { category: 'source', name: 'Esther Perel', icon: '', color: '#e17055', desc: '探索欲望与亲密' },
  '灵魂拷问': { category: 'game', name: '灵魂拷问', icon: '', color: '#ff8a80', desc: '开放式深度问题' },
  '二选一': { category: 'game', name: '二选一', icon: '', color: '#ce93d8', desc: '两难选择' },
  '真心话大冒险': { category: 'game', name: '真心话大冒险', icon: '', color: '#ff7043', desc: 'Truth or Dare' },
  '两真一假': { category: 'game', name: '两真一假', icon: '', color: '#4dd0e1', desc: '猜猜哪个是假的' },
  'Never Have I Ever': { category: 'game', name: '我从没...', icon: '', color: '#aed581', desc: '说出你从没做过的事' },
  '默契考验': { category: 'game', name: '默契考验', icon: '', color: '#ffb74d', desc: '猜猜对方会怎么回答' },
  '情景模拟': { category: 'game', name: '情景模拟', icon: '', color: '#ba68c8', desc: '假设情境' },
  '快问快答': { category: 'game', name: '快问快答', icon: '', color: '#ffd54f', desc: '3秒内回答！' },
  '亲密挑战': { category: 'game', name: '亲密挑战', icon: '', color: '#f48fb1', desc: '甜蜜任务' },
  '荒岛求生': { category: 'game', name: '荒岛求生', icon: '', color: '#81c784', desc: '极端情境选择' },
  '破冰': { category: 'depth', name: '破冰', icon: '', color: '#64b5f6', desc: '轻松开场' },
  '暖场': { category: 'depth', name: '暖场', icon: '', color: '#ffb74d', desc: '打开话匣子' },
  '深入': { category: 'depth', name: '深入', icon: '', color: '#4fc3f7', desc: '了解真实的TA' },
  '灵魂': { category: 'depth', name: '灵魂', icon: '', color: '#b39ddb', desc: '触及内心最深处' },
  '价值观': { category: 'topic', name: '价值观', icon: '', color: '#5c6bc0', desc: '三观是否一致' },
  '原生家庭': { category: 'topic', name: '原生家庭', icon: '', color: '#8d6e63', desc: '成长背景' },
  '未来规划': { category: 'topic', name: '未来规划', icon: '', color: '#7986cb', desc: '是否同频' },
  '童年回忆': { category: 'topic', name: '童年回忆', icon: '', color: '#f06292', desc: '塑造TA的往事' },
  '人生哲学': { category: 'topic', name: '人生哲学', icon: '', color: '#9575cd', desc: '对生命的思考' },
  '梦想目标': { category: 'topic', name: '梦想目标', icon: '', color: '#ffd700', desc: '内心的渴望' },
  '恐惧脆弱': { category: 'topic', name: '恐惧脆弱', icon: '', color: '#90a4ae', desc: '分享脆弱建立信任' },
  '爱情观': { category: 'topic', name: '爱情观', icon: '', color: '#ef5350', desc: '对爱情的理解' },
  '性格特质': { category: 'topic', name: '性格特质', icon: '', color: '#26a69a', desc: '了解TA的个性' },
  '生活方式': { category: 'topic', name: '生活方式', icon: '', color: '#66bb6a', desc: '日常习惯' },
  '初识': { category: 'stage', name: '初识', icon: '', color: '#4dd0e1', desc: '刚刚认识' },
  '约会中': { category: 'stage', name: '约会中', icon: '', color: '#f48fb1', desc: '感情升温' },
  '热恋期': { category: 'stage', name: '热恋期', icon: '', color: '#ff7043', desc: '甜蜜热恋' },
  '稳定期': { category: 'stage', name: '稳定期', icon: '', color: '#81c784', desc: '深入了解' },
  '老夫老妻': { category: 'stage', name: '老夫老妻', icon: '', color: '#a1887f', desc: '长期保鲜' },
  '轻松搞笑': { category: 'mood', name: '轻松搞笑', icon: '', color: '#ffee58', desc: '笑着玩' },
  '浪漫甜蜜': { category: 'mood', name: '浪漫甜蜜', icon: '', color: '#f8bbd9', desc: '甜到齁' },
  '深度走心': { category: 'mood', name: '深度走心', icon: '', color: '#b39ddb', desc: '认真聊人生' },
  '刺激挑战': { category: 'mood', name: '刺激挑战', icon: '', color: '#ff8a65', desc: '突破舒适区' },
  '温馨治愈': { category: 'mood', name: '温馨治愈', icon: '', color: '#a5d6a7', desc: '温暖人心' },
};

export const presets: Preset[] = [
  { id: 'first_date', name: '第一次约会', icon: '', desc: '轻松破冰，留下好印象', tags: ['破冰', '暖场', '初识', '轻松搞笑'] },
  { id: 'deep_talk', name: '深夜长谈', icon: '', desc: '聊点真正重要的事', tags: ['36问', '深入', '灵魂', '深度走心'] },
  { id: 'party_game', name: '派对游戏', icon: '', desc: '朋友聚会嗨起来', tags: ['二选一', '两真一假', 'Never Have I Ever', '轻松搞笑'] },
  { id: 'couple_night', name: '情侣夜话', icon: '', desc: '和TA聊聊心里话', tags: ['THE AND', 'Gottman', '稳定期', '深度走心'] },
  { id: 'know_yourself', name: '认识自我', icon: '', desc: '通过问题更了解自己', tags: ['Proust问卷', '人生哲学', '性格特质', '深入'] },
  { id: 'spice_up', name: '感情保鲜', icon: '', desc: '给长期关系加点料', tags: ['Esther Perel', '亲密挑战', '老夫老妻', '刺激挑战'] },
];

export function getTagsByCategory(categoryId: string): string[] {
  return Object.entries(tags)
    .filter(([, def]) => def.category === categoryId)
    .map(([key]) => key);
}
