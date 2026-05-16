/**
 * 约会心动 - 任务卡
 * 融入欧美约会游戏、KTV/派对互动、社交媒体挑战
 */
module.exports = {
  mode: "romance_spark",
  mode_name: "约会心动",
  type: "task",
  cards: [
    // ========== 经典调情任务 Flirting ==========
    { id: "rs_t_001", level: 1, category: "调情入门", content: "对视10秒，不说话，不笑", tips: "眼神接触是最强的非语言调情", theory: "Eye Contact" },
    { id: "rs_t_002", level: 1, category: "调情入门", content: "用一句话夸对方，要具体（不能说好看/帅）", tips: "具体的赞美更打动人" },
    { id: "rs_t_003", level: 1, category: "调情入门", content: "偷偷在对方手背上画一颗心", tips: "轻微的肢体接触升温" },
    { id: "rs_t_004", level: 2, category: "调情进阶", content: "靠近对方耳边小声说一句话", tips: "近距离耳语增加亲密感" },
    { id: "rs_t_005", level: 2, category: "调情进阶", content: "帮对方整理头发或衣领，动作要慢", tips: "服务行为传达在乎" },

    // ========== 肢体接触升级 Touch ==========
    { id: "rs_t_006", level: 1, category: "轻触", content: "牵手走10步，然后自然松开", tips: "不用力握，轻轻牵", theory: "Kino Escalation" },
    { id: "rs_t_007", level: 1, category: "轻触", content: "把头靠在对方肩上30秒", tips: "放松，不要说话" },
    { id: "rs_t_008", level: 2, category: "亲密触", content: "给对方一个持续20秒的拥抱", tips: "20秒拥抱能释放催产素", theory: "Oxytocin" },
    { id: "rs_t_009", level: 2, category: "亲密触", content: "从背后环抱对方，保持一分钟", tips: "感受彼此的体温和心跳" },
    { id: "rs_t_010", level: 3, category: "亲密触", content: "鼻尖碰鼻尖，对视5秒", tips: "Eskimo Kiss" },

    // ========== KTV/派对游戏 ==========
    { id: "rs_t_011", level: 1, category: "KTV任务", content: "一起唱一首情歌的副歌部分", tips: "选你们都会的歌" },
    { id: "rs_t_012", level: 1, category: "KTV任务", content: "用一首歌的歌词向对方表白", tips: "搞笑或认真都可以" },
    { id: "rs_t_013", level: 2, category: "KTV任务", content: "对唱一首情侣对唱曲", tips: "推荐：屋顶、广岛之恋" },
    { id: "rs_t_014", level: 2, category: "派对游戏", content: "【Sip or Skip】说一件你做过的事，做过的人喝一口水", tips: "轻松版Never Have I Ever", game: "Sip or Skip" },
    { id: "rs_t_015", level: 2, category: "派对游戏", content: "【10秒挑战】10秒内说出对方5个优点", tips: "挑战时间压力", game: "10 Seconds" },

    // ========== 社交媒体挑战 ==========
    { id: "rs_t_016", level: 1, category: "社媒挑战", content: "一起拍一张创意合照", tips: "可以发朋友圈那种" },
    { id: "rs_t_017", level: 1, category: "社媒挑战", content: "互相拍一张对方的侧脸照", tips: "选你觉得最好看的角度" },
    { id: "rs_t_018", level: 2, category: "社媒挑战", content: "录一段10秒的视频：说出你们第一次见面的细节", tips: "可以存在手机里" },
    { id: "rs_t_019", level: 2, category: "社媒挑战", content: "给对方设置一个专属备注名", tips: "让对方看到" },

    // ========== 真心话任务 ==========
    { id: "rs_t_020", level: 2, category: "真心话", content: "对对方说一句你一直想说但没说的话", tips: "勇气时刻" },
    { id: "rs_t_021", level: 2, category: "真心话", content: "分享你手机里最近三张照片的故事", tips: "相册是生活的窗口" },
    { id: "rs_t_022", level: 3, category: "真心话", content: "打开你的Spotify/网易云，分享今年听最多的歌", tips: "音乐品味是灵魂的反映" },

    // ========== 浪漫挑战 ==========
    { id: "rs_t_023", level: 2, category: "浪漫任务", content: "在对方手心写一个字，让TA猜", tips: "写得轻柔，增加触感" },
    { id: "rs_t_024", level: 2, category: "浪漫任务", content: "即兴给对方写一首三行情诗", tips: "不用押韵，真情实感" },
    { id: "rs_t_025", level: 3, category: "浪漫任务", content: "用手机录一段30秒的语音情书", tips: "发给对方或当场播放" },

    // ========== 默契测试 ==========
    { id: "rs_t_026", level: 1, category: "默契测试", content: "同时说出心中想的一种颜色", tips: "测试默契度" },
    { id: "rs_t_027", level: 1, category: "默契测试", content: "同时比出1-5中的一个数字", tips: "想想对方会出什么" },
    { id: "rs_t_028", level: 2, category: "默契测试", content: "同时说出一个约会想去的地方", tips: "如果一样就必须去" },
    { id: "rs_t_029", level: 2, category: "默契测试", content: "猜对方手机壁纸是什么", tips: "如果猜对有奖励" },

    // ========== 承诺时刻 ==========
    { id: "rs_t_030", level: 3, category: "承诺", content: "认真地说一次'我喜欢你'", tips: "眼睛看着对方" },
    { id: "rs_t_031", level: 3, category: "承诺", content: "约定下一次见面的时间和地点", tips: "具体到日期" },
    { id: "rs_t_032", level: 3, category: "承诺", content: "互相交换一件小物品作为纪念", tips: "可以是随身携带的小东西" }
  ]
};
