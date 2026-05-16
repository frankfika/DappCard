/**
 * 相亲破冰 - 任务卡
 * 融入欧美派对游戏：Two Truths One Lie、Never Have I Ever、Speed Dating经典互动
 */
module.exports = {
  mode: "dating_icebreaker",
  mode_name: "相亲破冰",
  type: "task",
  cards: [
    // ========== 两真一假 Two Truths and a Lie ==========
    { id: "di_t_001", level: 1, category: "两真一假", content: "说三件关于自己的事，其中两真一假，让对方猜哪个是假的", tips: "经典破冰游戏，既有趣又能快速了解对方", game: "Two Truths One Lie" },
    { id: "di_t_002", level: 1, category: "两真一假", content: "说三个你去过的地方，其中一个是假的", tips: "旅行经历版", game: "Two Truths One Lie" },
    { id: "di_t_003", level: 2, category: "两真一假", content: "说三件你做过的疯狂的事，其中一件是编的", tips: "冒险程度版", game: "Two Truths One Lie" },

    // ========== 我从未 Never Have I Ever ==========
    { id: "di_t_004", level: 1, category: "我从未", content: "轮流说'我从未...'，做过的人要承认。谁先暴露5件事谁输", tips: "经典酒桌游戏改良版，不喝酒也能玩", game: "Never Have I Ever" },
    { id: "di_t_005", level: 1, category: "我从未", content: "我从未...在公共场合唱过歌（做过的人要现场唱一句）", tips: "惩罚要有趣但不尴尬", game: "Never Have I Ever" },
    { id: "di_t_006", level: 2, category: "我从未", content: "我从未...偷偷喜欢过不该喜欢的人（做过的人讲一下故事）", tips: "适度暴露增加亲密感", game: "Never Have I Ever" },

    // ========== 36问配套任务 ==========
    { id: "di_t_007", level: 2, category: "36问任务", content: "对视4分钟，不说话。结束后分享感受", tips: "这是Arthur Aron实验的经典环节，真的能产生亲密感", theory: "36 Questions" },
    { id: "di_t_008", level: 2, category: "36问任务", content: "交替说'我喜欢你的...'，每人说5个", tips: "真诚的赞美是最好的连接", theory: "36 Questions" },
    { id: "di_t_009", level: 3, category: "36问任务", content: "分享一个你目前面临的个人问题，请对方给建议", tips: "展示脆弱性，测试对方的同理心", theory: "36 Questions" },

    // ========== 快速约会任务 Speed Dating ==========
    { id: "di_t_010", level: 1, category: "快问快答", content: "30秒内尽可能多地说出对方身上你注意到的细节", tips: "测试观察力和关注度" },
    { id: "di_t_011", level: 1, category: "快问快答", content: "用10秒钟给对方一个第一印象评分（1-10），并解释原因", tips: "诚实但温和" },
    { id: "di_t_012", level: 1, category: "快问快答", content: "1分钟电梯演讲：向对方推销自己为什么值得交往", tips: "有趣但不尬" },

    // ========== 角色扮演 ==========
    { id: "di_t_013", level: 2, category: "情境模拟", content: "假装你们是在书店/咖啡店偶遇，重新搭讪一次", tips: "放松一点，看对方的社交能力" },
    { id: "di_t_014", level: 2, category: "情境模拟", content: "假设你们已经在一起3年了，向对方抱怨一个'坏习惯'", tips: "从假设中看真实期待" },
    { id: "di_t_015", level: 3, category: "情境模拟", content: "假装向朋友介绍对方，你会怎么介绍？", tips: "看对方如何定位你们的关系" },

    // ========== KTV/派对游戏 ==========
    { id: "di_t_016", level: 1, category: "歌曲挑战", content: "各自说一首能代表自己现在心情的歌，放出来一起听", tips: "音乐品味是很好的话题" },
    { id: "di_t_017", level: 1, category: "歌曲挑战", content: "一起唱一首你们都会的歌的副歌", tips: "合唱能快速打破尴尬" },
    { id: "di_t_018", level: 2, category: "歌曲挑战", content: "选一首歌，用歌词对对方表白（可以搞笑）", tips: "用别人的歌词说自己的话" },

    // ========== 创意互动 ==========
    { id: "di_t_019", level: 1, category: "创意任务", content: "交换手机看对方的最近9张相册照片，每张讲一个故事", tips: "照片是了解一个人生活的窗口" },
    { id: "di_t_020", level: 1, category: "创意任务", content: "给对方拍一张照片，选你觉得最好看的角度", tips: "看对方的审美和关注点" },
    { id: "di_t_021", level: 2, category: "创意任务", content: "画一幅对方的简笔画（30秒内）", tips: "艺术天赋不重要，用心最重要" },
    { id: "di_t_022", level: 2, category: "创意任务", content: "用手机给对方写一句话当做备注名", tips: "看对方怎么定义你" },

    // ========== 默契测试 ==========
    { id: "di_t_023", level: 1, category: "默契考验", content: "同时在手机上打一个1-100的数字，看谁更接近50", tips: "纯看运气，但能制造话题" },
    { id: "di_t_024", level: 1, category: "默契考验", content: "同时说出一种颜色，看是否一致", tips: "默契测试系列" },
    { id: "di_t_025", level: 2, category: "默契考验", content: "同时说出脑海中第一个想到的城市，解释为什么", tips: "潜意识的选择往往说明问题" }
  ]
};
