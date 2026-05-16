/**
 * 统一卡片数据库
 * 所有卡片使用标签系统，支持多维度筛选
 */

const allCards = [
  // ==================== Arthur Aron 36问 ====================
  // 第一组：破冰（1-12题）
  {
    id: 'aron_01',
    question: '如果可以邀请世界上任何人共进晚餐，你会选择谁？',
    tags: ['36问', '灵魂拷问', '破冰', '梦想目标', '初识', '轻松搞笑'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_02',
    question: '你想成名吗？以什么方式成名？',
    tags: ['36问', '灵魂拷问', '破冰', '梦想目标', '初识', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_03',
    question: '打电话之前，你会先排练要说什么吗？为什么？',
    tags: ['36问', '灵魂拷问', '破冰', '性格特质', '初识', '轻松搞笑'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_04',
    question: '对你来说，怎样才算"完美"的一天？',
    tags: ['36问', '灵魂拷问', '破冰', '生活方式', '初识', '温馨治愈'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_05',
    question: '你上一次对自己唱歌是什么时候？对别人唱呢？',
    tags: ['36问', '灵魂拷问', '破冰', '性格特质', '初识', '轻松搞笑'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_06',
    question: '如果你能活到90岁，后60年可以一直保持30岁时的心智或身体，你会选哪个？',
    tags: ['36问', '二选一', '破冰', '人生哲学', '初识', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_07',
    question: '你有没有秘密地预感过自己会以怎样的方式死去？',
    tags: ['36问', '灵魂拷问', '暖场', '恐惧脆弱', '约会中', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_08',
    question: '说出三件你和对方看起来相同的特点。',
    tags: ['36问', '默契考验', '破冰', '性格特质', '初识', '浪漫甜蜜'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_09',
    question: '你人生中最感恩的是什么？',
    tags: ['36问', '灵魂拷问', '暖场', '价值观', '初识', '温馨治愈'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_10',
    question: '如果你能改变成长过程中的一件事，会是什么？',
    tags: ['36问', '灵魂拷问', '暖场', '原生家庭', '约会中', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_11',
    question: '用四分钟，尽可能详细地告诉对方你的人生故事。',
    tags: ['36问', '灵魂拷问', '暖场', '童年回忆', '约会中', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_12',
    question: '如果明天醒来能获得一种能力或特质，你希望是什么？',
    tags: ['36问', '灵魂拷问', '暖场', '梦想目标', '初识', '轻松搞笑'],
    source: 'Arthur Aron 36问'
  },

  // 第二组：深入（13-24题）
  {
    id: 'aron_13',
    question: '如果有个水晶球能告诉你关于自己、人生、未来或任何事的真相，你想知道什么？',
    tags: ['36问', '灵魂拷问', '深入', '人生哲学', '约会中', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_14',
    question: '有没有什么事是你梦想很久却一直没做的？为什么没做？',
    tags: ['36问', '灵魂拷问', '深入', '梦想目标', '约会中', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_15',
    question: '你人生中最大的成就是什么？',
    tags: ['36问', '灵魂拷问', '深入', '价值观', '约会中', '温馨治愈'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_16',
    question: '在友情中你最看重什么？',
    tags: ['36问', '灵魂拷问', '深入', '价值观', '约会中', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_17',
    question: '你最珍贵的记忆是什么？',
    tags: ['36问', '灵魂拷问', '深入', '童年回忆', '约会中', '温馨治愈'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_18',
    question: '你最糟糕的记忆是什么？',
    tags: ['36问', '灵魂拷问', '深入', '恐惧脆弱', '热恋期', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_19',
    question: '如果你知道自己一年后会突然死去，你会改变现在的生活方式吗？为什么？',
    tags: ['36问', '灵魂拷问', '深入', '人生哲学', '热恋期', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_20',
    question: '友情对你来说意味着什么？',
    tags: ['36问', '灵魂拷问', '深入', '价值观', '约会中', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_21',
    question: '爱和情感在你生命中扮演什么角色？',
    tags: ['36问', '灵魂拷问', '深入', '爱情观', '热恋期', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_22',
    question: '轮流分享你认为对方身上的优点，每人说五条。',
    tags: ['36问', '默契考验', '深入', '性格特质', '约会中', '浪漫甜蜜'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_23',
    question: '你的家庭关系亲密温暖吗？你觉得你的童年比别人更幸福吗？',
    tags: ['36问', '灵魂拷问', '深入', '原生家庭', '热恋期', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_24',
    question: '你和母亲的关系如何？',
    tags: ['36问', '灵魂拷问', '深入', '原生家庭', '热恋期', '深度走心'],
    source: 'Arthur Aron 36问'
  },

  // 第三组：灵魂（25-36题）
  {
    id: 'aron_25',
    question: '用"我们"造三个真实的句子，比如"我们都在这个房间里感到..."',
    tags: ['36问', '默契考验', '灵魂', '爱情观', '热恋期', '浪漫甜蜜'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_26',
    question: '完成这个句子："我希望有人能和我分享..."',
    tags: ['36问', '灵魂拷问', '灵魂', '恐惧脆弱', '热恋期', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_27',
    question: '如果你要和对方成为亲密的朋友，有什么是TA需要知道的？',
    tags: ['36问', '灵魂拷问', '灵魂', '恐惧脆弱', '热恋期', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_28',
    question: '告诉对方你喜欢TA什么，要非常诚实，说一些你不会对刚认识的人说的话。',
    tags: ['36问', '灵魂拷问', '灵魂', '爱情观', '热恋期', '浪漫甜蜜'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_29',
    question: '和对方分享生命中尴尬的时刻。',
    tags: ['36问', '灵魂拷问', '灵魂', '恐惧脆弱', '热恋期', '轻松搞笑'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_30',
    question: '你上一次在别人面前哭是什么时候？自己一个人哭呢？',
    tags: ['36问', '灵魂拷问', '灵魂', '恐惧脆弱', '稳定期', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_31',
    question: '告诉对方，你已经喜欢上了TA的什么。',
    tags: ['36问', '灵魂拷问', '灵魂', '爱情观', '热恋期', '浪漫甜蜜'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_32',
    question: '有什么事情是太严肃了而不能开玩笑的？',
    tags: ['36问', '灵魂拷问', '灵魂', '价值观', '稳定期', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_33',
    question: '如果你今晚就会死去，而且没有机会和任何人交流，你最后悔没说出口的是什么？为什么还没说？',
    tags: ['36问', '灵魂拷问', '灵魂', '恐惧脆弱', '稳定期', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_34',
    question: '你的房子着火了，里面有你所有的东西。救出家人和宠物后，你还有时间再冲进去拿一样东西，你会拿什么？为什么？',
    tags: ['36问', '情景模拟', '灵魂', '价值观', '稳定期', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_35',
    question: '家人中谁的去世会让你最难过？为什么？',
    tags: ['36问', '灵魂拷问', '灵魂', '原生家庭', '稳定期', '深度走心'],
    source: 'Arthur Aron 36问'
  },
  {
    id: 'aron_36',
    question: '分享一个私人问题，询问对方会怎么处理。然后也请对方告诉你，TA觉得你对这个问题的感受如何。',
    tags: ['36问', '灵魂拷问', '灵魂', '恐惧脆弱', '稳定期', '深度走心'],
    source: 'Arthur Aron 36问'
  },

  // ==================== Gottman研究所问题 ====================
  {
    id: 'gottman_01',
    question: '我最欣赏你的三个品质是什么？',
    tags: ['Gottman', '灵魂拷问', '暖场', '性格特质', '稳定期', '浪漫甜蜜'],
    source: 'Gottman研究所'
  },
  {
    id: 'gottman_02',
    question: '你觉得我们的关系中最需要改善的是什么？',
    tags: ['Gottman', '灵魂拷问', '深入', '爱情观', '稳定期', '深度走心'],
    source: 'Gottman研究所'
  },
  {
    id: 'gottman_03',
    question: '我们上次开怀大笑是什么时候？当时发生了什么？',
    tags: ['Gottman', '灵魂拷问', '暖场', '生活方式', '稳定期', '轻松搞笑'],
    source: 'Gottman研究所'
  },
  {
    id: 'gottman_04',
    question: '你希望我以什么方式表达爱意？',
    tags: ['Gottman', '爱的语言', '灵魂拷问', '深入', '爱情观', '稳定期', '浪漫甜蜜'],
    source: 'Gottman研究所'
  },
  {
    id: 'gottman_05',
    question: '当我们发生冲突时，你最希望我做什么？',
    tags: ['Gottman', '灵魂拷问', '深入', '爱情观', '稳定期', '深度走心'],
    source: 'Gottman研究所'
  },
  {
    id: 'gottman_06',
    question: '你现在最大的压力来源是什么？我能怎么帮你？',
    tags: ['Gottman', '灵魂拷问', '深入', '恐惧脆弱', '稳定期', '温馨治愈'],
    source: 'Gottman研究所'
  },
  {
    id: 'gottman_07',
    question: '描述一下你理想中的退休生活。',
    tags: ['Gottman', '灵魂拷问', '深入', '未来规划', '稳定期', '温馨治愈'],
    source: 'Gottman研究所'
  },
  {
    id: 'gottman_08',
    question: '你觉得我们现在处于关系的哪个阶段？',
    tags: ['Gottman', '灵魂拷问', '深入', '爱情观', '稳定期', '深度走心'],
    source: 'Gottman研究所'
  },
  {
    id: 'gottman_09',
    question: '我们的关系中有什么"禁区"是我不知道的吗？',
    tags: ['Gottman', '灵魂拷问', '灵魂', '恐惧脆弱', '老夫老妻', '深度走心'],
    source: 'Gottman研究所'
  },
  {
    id: 'gottman_10',
    question: '你对我们关系的未来有什么担忧？',
    tags: ['Gottman', '灵魂拷问', '灵魂', '未来规划', '稳定期', '深度走心'],
    source: 'Gottman研究所'
  },
  {
    id: 'gottman_11',
    question: '如果有一件事你希望我能改变，那会是什么？',
    tags: ['Gottman', '灵魂拷问', '灵魂', '爱情观', '老夫老妻', '深度走心'],
    source: 'Gottman研究所'
  },
  {
    id: 'gottman_12',
    question: '我们的第一次约会你还记得什么？',
    tags: ['Gottman', '灵魂拷问', '暖场', '童年回忆', '稳定期', '浪漫甜蜜'],
    source: 'Gottman研究所'
  },
  {
    id: 'gottman_13',
    question: '你第一次意识到爱上我是什么时候？',
    tags: ['Gottman', '灵魂拷问', '深入', '爱情观', '稳定期', '浪漫甜蜜'],
    source: 'Gottman研究所'
  },
  {
    id: 'gottman_14',
    question: '我们有什么共同的人生目标？',
    tags: ['Gottman', '灵魂拷问', '深入', '未来规划', '稳定期', '深度走心'],
    source: 'Gottman研究所'
  },
  {
    id: 'gottman_15',
    question: '你觉得我们的亲密关系还有改善的空间吗？',
    tags: ['Gottman', '灵魂拷问', '灵魂', '爱情观', '老夫老妻', '刺激挑战'],
    source: 'Gottman研究所'
  },

  // ==================== Proust问卷 ====================
  {
    id: 'proust_01',
    question: '你认为最完美的快乐是什么？',
    tags: ['Proust问卷', '灵魂拷问', '深入', '人生哲学', '约会中', '深度走心'],
    source: '普鲁斯特问卷'
  },
  {
    id: 'proust_02',
    question: '你最害怕的是什么？',
    tags: ['Proust问卷', '灵魂拷问', '深入', '恐惧脆弱', '热恋期', '深度走心'],
    source: '普鲁斯特问卷'
  },
  {
    id: 'proust_03',
    question: '你目前的心境怎么样？',
    tags: ['Proust问卷', '灵魂拷问', '暖场', '性格特质', '初识', '温馨治愈'],
    source: '普鲁斯特问卷'
  },
  {
    id: 'proust_04',
    question: '还在世的人中你最钦佩谁？',
    tags: ['Proust问卷', '灵魂拷问', '暖场', '价值观', '约会中', '深度走心'],
    source: '普鲁斯特问卷'
  },
  {
    id: 'proust_05',
    question: '你认为自己最伟大的成就是什么？',
    tags: ['Proust问卷', '灵魂拷问', '深入', '梦想目标', '约会中', '深度走心'],
    source: '普鲁斯特问卷'
  },
  {
    id: 'proust_06',
    question: '你自己的哪个特点让你最觉得痛恨？',
    tags: ['Proust问卷', '灵魂拷问', '灵魂', '恐惧脆弱', '热恋期', '深度走心'],
    source: '普鲁斯特问卷'
  },
  {
    id: 'proust_07',
    question: '你最看重朋友的什么特点？',
    tags: ['Proust问卷', '灵魂拷问', '暖场', '价值观', '初识', '深度走心'],
    source: '普鲁斯特问卷'
  },
  {
    id: 'proust_08',
    question: '你最奢侈的是什么？',
    tags: ['Proust问卷', '灵魂拷问', '暖场', '生活方式', '约会中', '轻松搞笑'],
    source: '普鲁斯特问卷'
  },
  {
    id: 'proust_09',
    question: '你认为被过誉的美德是什么？',
    tags: ['Proust问卷', '灵魂拷问', '深入', '价值观', '热恋期', '深度走心'],
    source: '普鲁斯特问卷'
  },
  {
    id: 'proust_10',
    question: '你最痛恨别人的什么特点？',
    tags: ['Proust问卷', '灵魂拷问', '深入', '价值观', '约会中', '深度走心'],
    source: '普鲁斯特问卷'
  },
  {
    id: 'proust_11',
    question: '你最后悔的事情是什么？',
    tags: ['Proust问卷', '灵魂拷问', '灵魂', '恐惧脆弱', '稳定期', '深度走心'],
    source: '普鲁斯特问卷'
  },
  {
    id: 'proust_12',
    question: '你最喜欢男性身上的什么品质？',
    tags: ['Proust问卷', '灵魂拷问', '暖场', '爱情观', '约会中', '深度走心'],
    source: '普鲁斯特问卷'
  },
  {
    id: 'proust_13',
    question: '你最喜欢女性身上的什么品质？',
    tags: ['Proust问卷', '灵魂拷问', '暖场', '爱情观', '约会中', '深度走心'],
    source: '普鲁斯特问卷'
  },
  {
    id: 'proust_14',
    question: '你最珍惜的财产是什么？',
    tags: ['Proust问卷', '灵魂拷问', '暖场', '价值观', '约会中', '温馨治愈'],
    source: '普鲁斯特问卷'
  },
  {
    id: 'proust_15',
    question: '你这一生中最爱的人是谁？',
    tags: ['Proust问卷', '灵魂拷问', '灵魂', '爱情观', '稳定期', '深度走心'],
    source: '普鲁斯特问卷'
  },
  {
    id: 'proust_16',
    question: '你希望以什么方式死去？',
    tags: ['Proust问卷', '灵魂拷问', '灵魂', '人生哲学', '稳定期', '深度走心'],
    source: '普鲁斯特问卷'
  },
  {
    id: 'proust_17',
    question: '如果你能选择的话，你希望变成谁？',
    tags: ['Proust问卷', '灵魂拷问', '深入', '梦想目标', '约会中', '轻松搞笑'],
    source: '普鲁斯特问卷'
  },
  {
    id: 'proust_18',
    question: '你的座右铭是什么？',
    tags: ['Proust问卷', '灵魂拷问', '暖场', '人生哲学', '初识', '深度走心'],
    source: '普鲁斯特问卷'
  },

  // ==================== 五种爱的语言 ====================
  {
    id: 'love_lang_01',
    question: '你更喜欢收到实用的礼物还是有纪念意义的礼物？',
    tags: ['爱的语言', '二选一', '暖场', '爱情观', '约会中', '浪漫甜蜜'],
    source: '五种爱的语言'
  },
  {
    id: 'love_lang_02',
    question: '你更希望伴侣经常说"我爱你"，还是用行动证明？',
    tags: ['爱的语言', '二选一', '深入', '爱情观', '热恋期', '深度走心'],
    source: '五种爱的语言'
  },
  {
    id: 'love_lang_03',
    question: '忙碌的一天后，你更想要一个拥抱还是一段倾诉的时间？',
    tags: ['爱的语言', '二选一', '暖场', '爱情观', '稳定期', '温馨治愈'],
    source: '五种爱的语言'
  },
  {
    id: 'love_lang_04',
    question: '哪种行为最让你感受到被爱：收礼物、听甜言蜜语、肢体接触、优质相处时间、还是对方帮你做事？',
    tags: ['爱的语言', '灵魂拷问', '深入', '爱情观', '热恋期', '深度走心'],
    source: '五种爱的语言'
  },
  {
    id: 'love_lang_05',
    question: '你表达爱的主要方式是什么？和你希望被爱的方式一样吗？',
    tags: ['爱的语言', '灵魂拷问', '深入', '爱情观', '稳定期', '深度走心'],
    source: '五种爱的语言'
  },
  {
    id: 'love_lang_06',
    question: '伴侣做什么事会让你觉得不被重视？',
    tags: ['爱的语言', '灵魂拷问', '深入', '爱情观', '稳定期', '深度走心'],
    source: '五种爱的语言'
  },
  {
    id: 'love_lang_07',
    question: '你最后一次感到被深深爱着是什么时候？当时发生了什么？',
    tags: ['爱的语言', '灵魂拷问', '灵魂', '爱情观', '稳定期', '浪漫甜蜜'],
    source: '五种爱的语言'
  },
  {
    id: 'love_lang_08',
    question: '如果伴侣只能用一种方式表达爱一年，你希望是哪种？',
    tags: ['爱的语言', '情景模拟', '深入', '爱情观', '热恋期', '深度走心'],
    source: '五种爱的语言'
  },

  // ==================== 依恋理论 ====================
  {
    id: 'attach_01',
    question: '当伴侣需要独处空间时，你的第一反应是什么？',
    tags: ['依恋理论', '灵魂拷问', '深入', '爱情观', '热恋期', '深度走心'],
    source: '依恋理论'
  },
  {
    id: 'attach_02',
    question: '在关系中，你更担心被抛弃还是被束缚？',
    tags: ['依恋理论', '二选一', '灵魂', '恐惧脆弱', '稳定期', '深度走心'],
    source: '依恋理论'
  },
  {
    id: 'attach_03',
    question: '当发生冲突时，你倾向于追着对方说清楚，还是需要先冷静一下？',
    tags: ['依恋理论', '二选一', '深入', '性格特质', '热恋期', '深度走心'],
    source: '依恋理论'
  },
  {
    id: 'attach_04',
    question: '你小时候难过的时候，父母通常怎么回应？',
    tags: ['依恋理论', '灵魂拷问', '灵魂', '原生家庭', '稳定期', '深度走心'],
    source: '依恋理论'
  },
  {
    id: 'attach_05',
    question: '你在关系中有没有过"测试"对方的行为？',
    tags: ['依恋理论', '灵魂拷问', '灵魂', '恐惧脆弱', '稳定期', '深度走心'],
    source: '依恋理论'
  },
  {
    id: 'attach_06',
    question: '你觉得"真正亲密"是什么感觉？你害怕那种感觉吗？',
    tags: ['依恋理论', '灵魂拷问', '灵魂', '爱情观', '稳定期', '深度走心'],
    source: '依恋理论'
  },
  {
    id: 'attach_07',
    question: '当对方不及时回复消息时，你脑海中会想些什么？',
    tags: ['依恋理论', '灵魂拷问', '深入', '恐惧脆弱', '约会中', '深度走心'],
    source: '依恋理论'
  },
  {
    id: 'attach_08',
    question: '你觉得自己更像"追逐者"还是"回避者"？',
    tags: ['依恋理论', '灵魂拷问', '灵魂', '性格特质', '稳定期', '深度走心'],
    source: '依恋理论'
  },

  // ==================== {THE AND}风格深度问题 ====================
  {
    id: 'theand_01',
    question: '你觉得我们的关系中，有什么是你不敢问我的？',
    tags: ['THE AND', '灵魂拷问', '灵魂', '恐惧脆弱', '稳定期', '深度走心'],
    source: 'The Skin Deep'
  },
  {
    id: 'theand_02',
    question: '我有没有做过什么事让你失望但你没说出来？',
    tags: ['THE AND', '灵魂拷问', '灵魂', '恐惧脆弱', '稳定期', '深度走心'],
    source: 'The Skin Deep'
  },
  {
    id: 'theand_03',
    question: '你觉得我真正了解你吗？有什么是我不知道的？',
    tags: ['THE AND', '灵魂拷问', '灵魂', '恐惧脆弱', '稳定期', '深度走心'],
    source: 'The Skin Deep'
  },
  {
    id: 'theand_04',
    question: '你有没有想过我们分手？是什么情况下？',
    tags: ['THE AND', '灵魂拷问', '灵魂', '爱情观', '老夫老妻', '深度走心'],
    source: 'The Skin Deep'
  },
  {
    id: 'theand_05',
    question: '你觉得我是否因为你而变成了更好的人？反过来呢？',
    tags: ['THE AND', '灵魂拷问', '灵魂', '爱情观', '稳定期', '深度走心'],
    source: 'The Skin Deep'
  },
  {
    id: 'theand_06',
    question: '在这段关系中，你牺牲了什么？',
    tags: ['THE AND', '灵魂拷问', '灵魂', '恐惧脆弱', '老夫老妻', '深度走心'],
    source: 'The Skin Deep'
  },
  {
    id: 'theand_07',
    question: '你最不想让我知道的秘密是什么？',
    tags: ['THE AND', '灵魂拷问', '灵魂', '恐惧脆弱', '稳定期', '刺激挑战'],
    source: 'The Skin Deep'
  },
  {
    id: 'theand_08',
    question: '当我看着你的时候，你觉得我看到了什么？',
    tags: ['THE AND', '灵魂拷问', '灵魂', '爱情观', '热恋期', '浪漫甜蜜'],
    source: 'The Skin Deep'
  },
  {
    id: 'theand_09',
    question: '如果我们今天分手，你最怀念的是什么？',
    tags: ['THE AND', '灵魂拷问', '灵魂', '爱情观', '稳定期', '深度走心'],
    source: 'The Skin Deep'
  },
  {
    id: 'theand_10',
    question: '你有没有因为我而哭过？是什么事情？',
    tags: ['THE AND', '灵魂拷问', '灵魂', '恐惧脆弱', '稳定期', '深度走心'],
    source: 'The Skin Deep'
  },

  // ==================== School of Life ====================
  {
    id: 'sol_01',
    question: '你觉得爱情中"了解一个人"意味着什么？',
    tags: ['School of Life', '灵魂拷问', '深入', '爱情观', '约会中', '深度走心'],
    source: 'School of Life'
  },
  {
    id: 'sol_02',
    question: '你相信一见钟情吗？为什么？',
    tags: ['School of Life', '灵魂拷问', '暖场', '爱情观', '初识', '深度走心'],
    source: 'School of Life'
  },
  {
    id: 'sol_03',
    question: '在关系中，你是追求刺激多一点还是安全感多一点？',
    tags: ['School of Life', '二选一', '深入', '爱情观', '约会中', '深度走心'],
    source: 'School of Life'
  },
  {
    id: 'sol_04',
    question: '你觉得长久关系中最难维持的是什么？',
    tags: ['School of Life', '灵魂拷问', '深入', '爱情观', '稳定期', '深度走心'],
    source: 'School of Life'
  },
  {
    id: 'sol_05',
    question: '你有没有"恋爱幻想"？比如完美伴侣应该是什么样的？',
    tags: ['School of Life', '灵魂拷问', '深入', '爱情观', '约会中', '深度走心'],
    source: 'School of Life'
  },
  {
    id: 'sol_06',
    question: '你觉得嫉妒在关系中是好事还是坏事？',
    tags: ['School of Life', '灵魂拷问', '深入', '爱情观', '热恋期', '深度走心'],
    source: 'School of Life'
  },
  {
    id: 'sol_07',
    question: '如果可以重新设计婚姻制度，你会怎么设计？',
    tags: ['School of Life', '灵魂拷问', '深入', '价值观', '稳定期', '深度走心'],
    source: 'School of Life'
  },
  {
    id: 'sol_08',
    question: '你觉得人能同时爱两个人吗？',
    tags: ['School of Life', '灵魂拷问', '灵魂', '爱情观', '稳定期', '刺激挑战'],
    source: 'School of Life'
  },

  // ==================== Esther Perel ====================
  {
    id: 'esther_01',
    question: '在关系中，你是更害怕失去自我，还是更害怕失去对方？',
    tags: ['Esther Perel', '灵魂拷问', '灵魂', '恐惧脆弱', '稳定期', '深度走心'],
    source: 'Esther Perel'
  },
  {
    id: 'esther_02',
    question: '你觉得神秘感在长期关系中还重要吗？',
    tags: ['Esther Perel', '灵魂拷问', '深入', '爱情观', '老夫老妻', '深度走心'],
    source: 'Esther Perel'
  },
  {
    id: 'esther_03',
    question: '安全感和激情可以共存吗？你怎么平衡？',
    tags: ['Esther Perel', '灵魂拷问', '深入', '爱情观', '稳定期', '深度走心'],
    source: 'Esther Perel'
  },
  {
    id: 'esther_04',
    question: '你觉得什么样的出轨更难以接受：身体出轨还是精神出轨？',
    tags: ['Esther Perel', '二选一', '灵魂', '爱情观', '老夫老妻', '刺激挑战'],
    source: 'Esther Perel'
  },
  {
    id: 'esther_05',
    question: '你曾经幻想过其他人吗？这正常吗？',
    tags: ['Esther Perel', '灵魂拷问', '灵魂', '恐惧脆弱', '老夫老妻', '刺激挑战'],
    source: 'Esther Perel'
  },
  {
    id: 'esther_06',
    question: '你觉得长期关系中的欲望应该被"培养"还是"顺其自然"？',
    tags: ['Esther Perel', '灵魂拷问', '深入', '爱情观', '老夫老妻', '深度走心'],
    source: 'Esther Perel'
  },
  {
    id: 'esther_07',
    question: '当对方成为"家人"般的存在，你还能保持吸引力吗？',
    tags: ['Esther Perel', '灵魂拷问', '灵魂', '爱情观', '老夫老妻', '深度走心'],
    source: 'Esther Perel'
  },
  {
    id: 'esther_08',
    question: '你有什么"禁忌幻想"是从未告诉任何人的？',
    tags: ['Esther Perel', '灵魂拷问', '灵魂', '恐惧脆弱', '老夫老妻', '刺激挑战'],
    source: 'Esther Perel'
  },

  // ==================== 经典派对游戏：二选一 ====================
  {
    id: 'wyr_01',
    question: '宁可永远不能吃甜食，还是永远不能吃咸的？',
    tags: ['二选一', '破冰', '生活方式', '初识', '轻松搞笑'],
    source: '经典派对游戏'
  },
  {
    id: 'wyr_02',
    question: '宁可有读心术但别人也能读你的心，还是完全没有这个能力？',
    tags: ['二选一', '情景模拟', '暖场', '人生哲学', '初识', '轻松搞笑'],
    source: '经典派对游戏'
  },
  {
    id: 'wyr_03',
    question: '宁可回到过去改变一件事，还是看到未来但不能改变？',
    tags: ['二选一', '情景模拟', '深入', '人生哲学', '约会中', '深度走心'],
    source: '经典派对游戏'
  },
  {
    id: 'wyr_04',
    question: '宁可有个无聊但稳定的工作，还是刺激但收入不稳的事业？',
    tags: ['二选一', '深入', '价值观', '约会中', '深度走心'],
    source: '经典派对游戏'
  },
  {
    id: 'wyr_05',
    question: '宁可和一个你爱但不爱你的人在一起，还是一个爱你但你不爱的人？',
    tags: ['二选一', '灵魂', '爱情观', '热恋期', '深度走心'],
    source: '经典派对游戏'
  },
  {
    id: 'wyr_06',
    question: '宁可有钱但没时间，还是有时间但没钱？',
    tags: ['二选一', '暖场', '价值观', '初识', '轻松搞笑'],
    source: '经典派对游戏'
  },
  {
    id: 'wyr_07',
    question: '宁可知道自己的死亡日期，还是死亡方式？',
    tags: ['二选一', '深入', '人生哲学', '热恋期', '深度走心'],
    source: '经典派对游戏'
  },
  {
    id: 'wyr_08',
    question: '宁可永远单身但有很多好朋友，还是有伴侣但朋友很少？',
    tags: ['二选一', '深入', '爱情观', '约会中', '深度走心'],
    source: '经典派对游戏'
  },
  {
    id: 'wyr_09',
    question: '宁可住在海边还是山里？',
    tags: ['二选一', '破冰', '生活方式', '初识', '轻松搞笑'],
    source: '经典派对游戏'
  },
  {
    id: 'wyr_10',
    question: '宁可失去所有的旧记忆，还是永远不能形成新记忆？',
    tags: ['二选一', '灵魂', '人生哲学', '稳定期', '深度走心'],
    source: '经典派对游戏'
  },

  // ==================== Never Have I Ever ====================
  {
    id: 'nhie_01',
    question: '我从没在公共场合唱过歌',
    tags: ['Never Have I Ever', '破冰', '性格特质', '初识', '轻松搞笑'],
    source: '经典派对游戏'
  },
  {
    id: 'nhie_02',
    question: '我从没在分手后还想复合过',
    tags: ['Never Have I Ever', '深入', '爱情观', '约会中', '深度走心'],
    source: '经典派对游戏'
  },
  {
    id: 'nhie_03',
    question: '我从没在电影院里哭过',
    tags: ['Never Have I Ever', '破冰', '性格特质', '初识', '轻松搞笑'],
    source: '经典派对游戏'
  },
  {
    id: 'nhie_04',
    question: '我从没给不喜欢的人发过"在干嘛"',
    tags: ['Never Have I Ever', '暖场', '爱情观', '约会中', '轻松搞笑'],
    source: '经典派对游戏'
  },
  {
    id: 'nhie_05',
    question: '我从没假装生病逃避社交',
    tags: ['Never Have I Ever', '暖场', '性格特质', '初识', '轻松搞笑'],
    source: '经典派对游戏'
  },
  {
    id: 'nhie_06',
    question: '我从没在约会前偷看对方社交媒体超过30分钟',
    tags: ['Never Have I Ever', '暖场', '爱情观', '约会中', '轻松搞笑'],
    source: '经典派对游戏'
  },
  {
    id: 'nhie_07',
    question: '我从没对父母撒过关于恋爱的谎',
    tags: ['Never Have I Ever', '深入', '原生家庭', '热恋期', '轻松搞笑'],
    source: '经典派对游戏'
  },
  {
    id: 'nhie_08',
    question: '我从没在初次见面时就觉得"就是TA了"',
    tags: ['Never Have I Ever', '深入', '爱情观', '热恋期', '浪漫甜蜜'],
    source: '经典派对游戏'
  },
  {
    id: 'nhie_09',
    question: '我从没删过前任的联系方式又加回来',
    tags: ['Never Have I Ever', '深入', '爱情观', '约会中', '轻松搞笑'],
    source: '经典派对游戏'
  },
  {
    id: 'nhie_10',
    question: '我从没在心里偷偷比较过现任和前任',
    tags: ['Never Have I Ever', '灵魂', '爱情观', '稳定期', '刺激挑战'],
    source: '经典派对游戏'
  },

  // ==================== 两真一假 ====================
  {
    id: 'ttl_01',
    question: '说出关于你童年的三件事，其中一件是假的。让对方猜猜哪个是假的？',
    tags: ['两真一假', '破冰', '童年回忆', '初识', '轻松搞笑'],
    source: '经典派对游戏'
  },
  {
    id: 'ttl_02',
    question: '说出三个你曾经的梦想职业，一个是假的。',
    tags: ['两真一假', '暖场', '梦想目标', '初识', '轻松搞笑'],
    source: '经典派对游戏'
  },
  {
    id: 'ttl_03',
    question: '说出三个关于你恋爱史的事实，一个是假的。',
    tags: ['两真一假', '深入', '爱情观', '约会中', '轻松搞笑'],
    source: '经典派对游戏'
  },
  {
    id: 'ttl_04',
    question: '说出三件让你尴尬到想消失的事，一个是假的。',
    tags: ['两真一假', '暖场', '恐惧脆弱', '约会中', '轻松搞笑'],
    source: '经典派对游戏'
  },
  {
    id: 'ttl_05',
    question: '说出三件你偷偷做过但没人知道的事，一个是假的。',
    tags: ['两真一假', '深入', '恐惧脆弱', '热恋期', '刺激挑战'],
    source: '经典派对游戏'
  },

  // ==================== 快问快答 ====================
  {
    id: 'quick_01',
    question: '咖啡还是茶？',
    tags: ['快问快答', '破冰', '生活方式', '初识', '轻松搞笑'],
    source: '经典破冰游戏'
  },
  {
    id: 'quick_02',
    question: '猫派还是狗派？',
    tags: ['快问快答', '破冰', '生活方式', '初识', '轻松搞笑'],
    source: '经典破冰游戏'
  },
  {
    id: 'quick_03',
    question: '早起鸟还是夜猫子？',
    tags: ['快问快答', '破冰', '生活方式', '初识', '轻松搞笑'],
    source: '经典破冰游戏'
  },
  {
    id: 'quick_04',
    question: '甜的还是辣的？',
    tags: ['快问快答', '破冰', '生活方式', '初识', '轻松搞笑'],
    source: '经典破冰游戏'
  },
  {
    id: 'quick_05',
    question: '海边还是山里？',
    tags: ['快问快答', '破冰', '生活方式', '初识', '轻松搞笑'],
    source: '经典破冰游戏'
  },
  {
    id: 'quick_06',
    question: '外向还是内向？',
    tags: ['快问快答', '破冰', '性格特质', '初识', '轻松搞笑'],
    source: '经典破冰游戏'
  },
  {
    id: 'quick_07',
    question: '计划派还是随性派？',
    tags: ['快问快答', '破冰', '性格特质', '初识', '轻松搞笑'],
    source: '经典破冰游戏'
  },
  {
    id: 'quick_08',
    question: '文字还是打电话？',
    tags: ['快问快答', '破冰', '生活方式', '初识', '轻松搞笑'],
    source: '经典破冰游戏'
  },
  {
    id: 'quick_09',
    question: '大城市还是小城镇？',
    tags: ['快问快答', '暖场', '未来规划', '约会中', '轻松搞笑'],
    source: '经典破冰游戏'
  },
  {
    id: 'quick_10',
    question: '事业第一还是家庭第一？',
    tags: ['快问快答', '深入', '价值观', '热恋期', '深度走心'],
    source: '经典破冰游戏'
  },

  // ==================== 默契考验 ====================
  {
    id: 'sync_01',
    question: '猜猜对方最怕什么动物？',
    tags: ['默契考验', '破冰', '恐惧脆弱', '初识', '轻松搞笑'],
    source: '默契考验游戏'
  },
  {
    id: 'sync_02',
    question: '对方最喜欢什么颜色？',
    tags: ['默契考验', '破冰', '性格特质', '初识', '轻松搞笑'],
    source: '默契考验游戏'
  },
  {
    id: 'sync_03',
    question: '猜猜对方如果中了一百万会先做什么？',
    tags: ['默契考验', '暖场', '梦想目标', '约会中', '轻松搞笑'],
    source: '默契考验游戏'
  },
  {
    id: 'sync_04',
    question: '对方小时候的梦想是什么？',
    tags: ['默契考验', '深入', '童年回忆', '热恋期', '温馨治愈'],
    source: '默契考验游戏'
  },
  {
    id: 'sync_05',
    question: '猜猜对方觉得自己最大的缺点是什么？',
    tags: ['默契考验', '深入', '恐惧脆弱', '稳定期', '深度走心'],
    source: '默契考验游戏'
  },
  {
    id: 'sync_06',
    question: '对方最后悔的一件事是什么？',
    tags: ['默契考验', '灵魂', '恐惧脆弱', '稳定期', '深度走心'],
    source: '默契考验游戏'
  },
  {
    id: 'sync_07',
    question: '猜猜对方在关系中最看重什么？',
    tags: ['默契考验', '深入', '爱情观', '热恋期', '深度走心'],
    source: '默契考验游戏'
  },
  {
    id: 'sync_08',
    question: '对方最受不了伴侣做什么事？',
    tags: ['默契考验', '灵魂', '爱情观', '稳定期', '深度走心'],
    source: '默契考验游戏'
  },

  // ==================== 情景模拟 ====================
  {
    id: 'scenario_01',
    question: '如果我们同时失业了，你会怎么办？',
    tags: ['情景模拟', '深入', '未来规划', '稳定期', '深度走心'],
    source: '情景模拟问题'
  },
  {
    id: 'scenario_02',
    question: '如果你的好友不喜欢我，你会怎么处理？',
    tags: ['情景模拟', '深入', '爱情观', '热恋期', '深度走心'],
    source: '情景模拟问题'
  },
  {
    id: 'scenario_03',
    question: '如果我们的父母都希望我们离婚，你会怎么做？',
    tags: ['情景模拟', '灵魂', '原生家庭', '老夫老妻', '深度走心'],
    source: '情景模拟问题'
  },
  {
    id: 'scenario_04',
    question: '如果你发现我有一个秘密银行账户，你会怎么想？',
    tags: ['情景模拟', '灵魂', '价值观', '稳定期', '刺激挑战'],
    source: '情景模拟问题'
  },
  {
    id: 'scenario_05',
    question: '如果我需要为了工作去另一个城市一年，你会怎么选择？',
    tags: ['情景模拟', '深入', '未来规划', '稳定期', '深度走心'],
    source: '情景模拟问题'
  },
  {
    id: 'scenario_06',
    question: '如果我想辞职去追梦但收入会大减，你支持吗？',
    tags: ['情景模拟', '深入', '梦想目标', '稳定期', '深度走心'],
    source: '情景模拟问题'
  },
  {
    id: 'scenario_07',
    question: '如果我们对要不要孩子的看法不同，怎么办？',
    tags: ['情景模拟', '灵魂', '未来规划', '老夫老妻', '深度走心'],
    source: '情景模拟问题'
  },
  {
    id: 'scenario_08',
    question: '如果20年后我们的激情消退了，你会怎么让关系保鲜？',
    tags: ['情景模拟', '灵魂', '爱情观', '老夫老妻', '深度走心'],
    source: '情景模拟问题'
  },

  // ==================== 荒岛求生 ====================
  {
    id: 'island_01',
    question: '如果只能带三样东西去荒岛，你会带什么？',
    tags: ['荒岛求生', '破冰', '价值观', '初识', '轻松搞笑'],
    source: '荒岛问题'
  },
  {
    id: 'island_02',
    question: '如果被困荒岛，只能听一首歌一辈子，你选哪首？',
    tags: ['荒岛求生', '暖场', '性格特质', '初识', '轻松搞笑'],
    source: '荒岛问题'
  },
  {
    id: 'island_03',
    question: '如果荒岛上只能有一个人陪你，你会选谁？',
    tags: ['荒岛求生', '深入', '价值观', '约会中', '深度走心'],
    source: '荒岛问题'
  },
  {
    id: 'island_04',
    question: '如果被困荒岛一年，你最想念的是什么？',
    tags: ['荒岛求生', '深入', '生活方式', '约会中', '温馨治愈'],
    source: '荒岛问题'
  },
  {
    id: 'island_05',
    question: '如果可以把一个记忆带到荒岛反复重温，你选哪个？',
    tags: ['荒岛求生', '灵魂', '童年回忆', '稳定期', '温馨治愈'],
    source: '荒岛问题'
  },

  // ==================== 亲密挑战 ====================
  {
    id: 'dare_01',
    question: '对视30秒不说话，看看会发生什么。',
    tags: ['亲密挑战', '真心话大冒险', '暖场', '爱情观', '约会中', '浪漫甜蜜'],
    source: '亲密挑战'
  },
  {
    id: 'dare_02',
    question: '用一分钟描述为什么喜欢对方，不能停顿。',
    tags: ['亲密挑战', '真心话大冒险', '深入', '爱情观', '热恋期', '浪漫甜蜜'],
    source: '亲密挑战'
  },
  {
    id: 'dare_03',
    question: '给对方一个持续10秒的拥抱。',
    tags: ['亲密挑战', '真心话大冒险', '暖场', '爱情观', '约会中', '浪漫甜蜜'],
    source: '亲密挑战'
  },
  {
    id: 'dare_04',
    question: '说出三件你从未告诉对方但一直想说的话。',
    tags: ['亲密挑战', '真心话大冒险', '灵魂', '恐惧脆弱', '稳定期', '深度走心'],
    source: '亲密挑战'
  },
  {
    id: 'dare_05',
    question: '让对方看你手机相册里最后10张照片。',
    tags: ['亲密挑战', '真心话大冒险', '暖场', '生活方式', '约会中', '刺激挑战'],
    source: '亲密挑战'
  },
  {
    id: 'dare_06',
    question: '模仿对方平时说话的样子。',
    tags: ['亲密挑战', '真心话大冒险', '破冰', '性格特质', '稳定期', '轻松搞笑'],
    source: '亲密挑战'
  },
  {
    id: 'dare_07',
    question: '给对方按摩肩膀一分钟。',
    tags: ['亲密挑战', '真心话大冒险', '暖场', '爱情观', '热恋期', '浪漫甜蜜'],
    source: '亲密挑战'
  },
  {
    id: 'dare_08',
    question: '向对方坦白一个小秘密。',
    tags: ['亲密挑战', '真心话大冒险', '深入', '恐惧脆弱', '热恋期', '刺激挑战'],
    source: '亲密挑战'
  },

  // ==================== 浪漫日常问题 ====================
  {
    id: 'romantic_01',
    question: '你觉得我们第一次见面时，我穿的什么？',
    tags: ['默契考验', '暖场', '童年回忆', '稳定期', '浪漫甜蜜'],
    source: '浪漫问题'
  },
  {
    id: 'romantic_02',
    question: '如果我是一首歌，你觉得我是哪首？',
    tags: ['灵魂拷问', '暖场', '性格特质', '热恋期', '浪漫甜蜜'],
    source: '浪漫问题'
  },
  {
    id: 'romantic_03',
    question: '你最想和我一起完成的一件事是什么？',
    tags: ['灵魂拷问', '深入', '梦想目标', '热恋期', '浪漫甜蜜'],
    source: '浪漫问题'
  },
  {
    id: 'romantic_04',
    question: '你觉得我们最像哪对电影里的情侣？',
    tags: ['灵魂拷问', '暖场', '爱情观', '约会中', '轻松搞笑'],
    source: '浪漫问题'
  },
  {
    id: 'romantic_05',
    question: '十年后你希望我们在做什么？',
    tags: ['灵魂拷问', '深入', '未来规划', '稳定期', '浪漫甜蜜'],
    source: '浪漫问题'
  },
  {
    id: 'romantic_06',
    question: '你最珍惜我们之间的什么？',
    tags: ['灵魂拷问', '灵魂', '爱情观', '稳定期', '浪漫甜蜜'],
    source: '浪漫问题'
  },
  {
    id: 'romantic_07',
    question: '如果可以重新开始认识我，你会做什么不同的事？',
    tags: ['灵魂拷问', '灵魂', '爱情观', '老夫老妻', '温馨治愈'],
    source: '浪漫问题'
  },
  {
    id: 'romantic_08',
    question: '你希望我们的爱情故事怎么被讲述？',
    tags: ['灵魂拷问', '灵魂', '爱情观', '稳定期', '浪漫甜蜜'],
    source: '浪漫问题'
  },

  // ==================== 有趣破冰问题 ====================
  {
    id: 'fun_01',
    question: '如果你的人生是一部电影，它是什么类型的？',
    tags: ['灵魂拷问', '破冰', '性格特质', '初识', '轻松搞笑'],
    source: '趣味破冰'
  },
  {
    id: 'fun_02',
    question: '你的"guilty pleasure"是什么？（偷偷喜欢但不好意思承认的事）',
    tags: ['灵魂拷问', '破冰', '生活方式', '初识', '轻松搞笑'],
    source: '趣味破冰'
  },
  {
    id: 'fun_03',
    question: '如果你有一个超能力只能用一天，你想要什么？',
    tags: ['灵魂拷问', '情景模拟', '破冰', '梦想目标', '初识', '轻松搞笑'],
    source: '趣味破冰'
  },
  {
    id: 'fun_04',
    question: '你最讨厌的网络流行语是什么？',
    tags: ['灵魂拷问', '破冰', '性格特质', '初识', '轻松搞笑'],
    source: '趣味破冰'
  },
  {
    id: 'fun_05',
    question: '如果你可以和任何虚构人物约会，你选谁？',
    tags: ['灵魂拷问', '破冰', '爱情观', '初识', '轻松搞笑'],
    source: '趣味破冰'
  },
  {
    id: 'fun_06',
    question: '你做过最"社死"的事是什么？',
    tags: ['灵魂拷问', '暖场', '恐惧脆弱', '初识', '轻松搞笑'],
    source: '趣味破冰'
  },
  {
    id: 'fun_07',
    question: '如果明天不用工作/上学，你会怎么过这一天？',
    tags: ['灵魂拷问', '破冰', '生活方式', '初识', '轻松搞笑'],
    source: '趣味破冰'
  },
  {
    id: 'fun_08',
    question: '你觉得自己最像哪个卡通人物？',
    tags: ['灵魂拷问', '破冰', '性格特质', '初识', '轻松搞笑'],
    source: '趣味破冰'
  },
  {
    id: 'fun_09',
    question: '你的手机里最尴尬的APP是什么？',
    tags: ['灵魂拷问', '破冰', '生活方式', '约会中', '轻松搞笑'],
    source: '趣味破冰'
  },
  {
    id: 'fun_10',
    question: '如果你要开一家店，会开什么店？',
    tags: ['灵魂拷问', '暖场', '梦想目标', '初识', '轻松搞笑'],
    source: '趣味破冰'
  }
];

/**
 * 根据标签筛选卡片
 * @param {Array} selectedTags - 已选标签数组
 * @param {string} matchMode - 匹配模式: 'any'(包含任一标签) 或 'all'(包含所有标签)
 * @returns {Array} 匹配的卡片
 */
function getCardsByTags(selectedTags, matchMode = 'any') {
  if (!selectedTags || selectedTags.length === 0) {
    return allCards;
  }

  return allCards.filter(card => {
    if (matchMode === 'all') {
      // 卡片必须包含所有选中的标签
      return selectedTags.every(tag => card.tags.includes(tag));
    } else {
      // 卡片包含任一选中的标签即可
      return selectedTags.some(tag => card.tags.includes(tag));
    }
  });
}

/**
 * 根据分类筛选卡片（每个分类取交集）
 * @param {Object} categoryTags - 按分类组织的标签，如 { source: ['36问'], depth: ['破冰', '暖场'] }
 * @returns {Array} 匹配的卡片
 */
function getCardsByCategoryTags(categoryTags) {
  if (!categoryTags || Object.keys(categoryTags).length === 0) {
    return allCards;
  }

  return allCards.filter(card => {
    // 对于每个分类，卡片必须包含该分类中的至少一个标签
    return Object.entries(categoryTags).every(([category, tags]) => {
      if (!tags || tags.length === 0) return true;
      return tags.some(tag => card.tags.includes(tag));
    });
  });
}

/**
 * 随机打乱数组
 * @param {Array} array
 * @returns {Array}
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 获取所有卡片
 * @returns {Array} 所有卡片
 */
function getAllCards() {
  return allCards;
}

/**
 * 获取卡片总数
 * @returns {number}
 */
function getCardCount() {
  return allCards.length;
}

/**
 * 按来源统计卡片数量
 * @returns {Object} { sourceName: count }
 */
function getCardCountBySource() {
  const counts = {};
  allCards.forEach(card => {
    const source = card.source || '其他';
    counts[source] = (counts[source] || 0) + 1;
  });
  return counts;
}

/**
 * 根据模式获取卡片（兼容旧代码）
 * 模式映射到关系阶段标签
 * @param {string} mode - 模式名
 * @returns {Array}
 */
function getCardsByMode(mode) {
  const modeTagMap = {
    'dating_icebreaker': ['初识', '破冰'],
    'romance_spark': ['约会中', '暖场'],
    'couple_deep': ['热恋期', '稳定期', '深入', '灵魂'],
    'marriage_fresh': ['老夫老妻', '稳定期']
  };
  const tags = modeTagMap[mode];
  if (!tags) return allCards;
  return getCardsByTags(tags, 'any');
}

/**
 * 根据来源获取卡片
 * @param {string} source - 来源名称
 * @returns {Array}
 */
function getCardsBySource(source) {
  return allCards.filter(card => card.source === source);
}

/**
 * 搜索卡片
 * @param {string} keyword - 关键词
 * @returns {Array}
 */
function searchCards(keyword) {
  if (!keyword || !keyword.trim()) return [];
  const kw = keyword.trim().toLowerCase();
  return allCards.filter(card =>
    card.question.toLowerCase().includes(kw) ||
    card.tags.some(tag => tag.toLowerCase().includes(kw)) ||
    (card.source && card.source.toLowerCase().includes(kw))
  );
}

/**
 * 获取每日推荐卡片
 * @returns {Object} 一张卡片
 */
function getDailyCard() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const index = dayOfYear % allCards.length;
  return allCards[index];
}

module.exports = {
  allCards,
  getCardsByTags,
  getCardsByCategoryTags,
  getCardsByMode,
  getCardsBySource,
  searchCards,
  getDailyCard,
  shuffleArray,
  getAllCards,
  getCardCount,
  getCardCountBySource
};
