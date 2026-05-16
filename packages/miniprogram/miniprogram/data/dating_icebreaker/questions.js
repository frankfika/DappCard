/**
 * 相亲破冰 - 问题卡
 * 融入心理学理论：36问快速建立亲密感、依恋理论、五种爱的语言
 */
module.exports = {
  mode: "dating_icebreaker",
  mode_name: "相亲破冰",
  type: "question",
  cards: [
    // ========== Level 1: 轻松暖场 ==========
    { id: "di_q_001", level: 1, category: "36问·热身", content: "如果可以邀请世界上任何人共进晚餐，你会选谁？", tips: "来自心理学家Arthur Aron的'36问坠入爱河'实验", theory: "36 Questions" },
    { id: "di_q_002", level: 1, category: "36问·热身", content: "你想成名吗？以什么方式成名？", tips: "这个问题揭示一个人的核心驱动力", theory: "36 Questions" },
    { id: "di_q_003", level: 1, category: "36问·热身", content: "打电话之前你会先排练一下要说什么吗？为什么？", tips: "了解对方的社交风格", theory: "36 Questions" },
    { id: "di_q_004", level: 1, category: "36问·热身", content: "对你来说，什么是'完美的一天'？", tips: "了解对方的生活理想", theory: "36 Questions" },
    { id: "di_q_005", level: 1, category: "36问·热身", content: "你上次独自唱歌是什么时候？上次对别人唱呢？", tips: "轻松问题，观察对方的开放程度", theory: "36 Questions" },

    { id: "di_q_006", level: 1, category: "破冰游戏", content: "用三个词形容你的2024年", tips: "快速了解对方近期状态" },
    { id: "di_q_007", level: 1, category: "破冰游戏", content: "你的MBTI是什么？你觉得准吗？", tips: "MBTI虽非严谨科学，但是很好的话题起点" },
    { id: "di_q_008", level: 1, category: "破冰游戏", content: "最近看的一部让你印象深刻的电影/剧是？", tips: "从文化消费了解价值观" },
    { id: "di_q_009", level: 1, category: "破冰游戏", content: "如果你的人生是一部电影，现在演到哪个章节？", tips: "了解对方的人生阶段感" },
    { id: "di_q_010", level: 1, category: "破冰游戏", content: "你手机里最常用的3个App是什么？（微信除外）", tips: "生活习惯的直接反映" },

    // ========== Level 2: 价值观探索 ==========
    { id: "di_q_011", level: 2, category: "36问·深入", content: "如果90岁那天早上醒来，发现可以保持30岁的头脑或身体30年，你选哪个？", tips: "来自36问实验，探索对衰老和人生的看法", theory: "36 Questions" },
    { id: "di_q_012", level: 2, category: "36问·深入", content: "你有没有秘密预感过自己会以什么方式死去？", tips: "探索对生命有限性的态度", theory: "36 Questions" },
    { id: "di_q_013", level: 2, category: "36问·深入", content: "说出三件你和对面这个人看起来有的共同点", tips: "主动寻找连接感", theory: "36 Questions" },
    { id: "di_q_014", level: 2, category: "36问·深入", content: "你生命中最感激的是什么？", tips: "感恩练习，展示价值观", theory: "36 Questions" },
    { id: "di_q_015", level: 2, category: "36问·深入", content: "如果可以改变你成长过程中的任何事，你会改变什么？", tips: "原生家庭话题的温和切入", theory: "36 Questions" },

    { id: "di_q_016", level: 2, category: "爱的语言", content: "你觉得哪种表达让你最有被爱的感觉：言语肯定、礼物、陪伴时光、服务行为、还是肢体接触？", tips: "来自Gary Chapman的《爱的五种语言》", theory: "5 Love Languages" },
    { id: "di_q_017", level: 2, category: "爱的语言", content: "你更喜欢收到一份精心挑选的礼物，还是对方花一整天陪你做你喜欢的事？", tips: "探索爱的语言偏好", theory: "5 Love Languages" },
    { id: "di_q_018", level: 2, category: "依恋风格", content: "当伴侣需要独处空间时，你通常会怎么反应？", tips: "探索依恋风格：安全型会尊重，焦虑型可能担心", theory: "Attachment Theory" },
    { id: "di_q_019", level: 2, category: "依恋风格", content: "在亲密关系中，你更害怕被抛弃还是被控制？", tips: "焦虑型更怕被抛弃，回避型更怕被控制", theory: "Attachment Theory" },
    { id: "di_q_020", level: 2, category: "价值观", content: "在事业、家庭、健康、爱情、友情中，让你排个序？", tips: "直接了解人生优先级" },

    // ========== Level 3: 深度连接 ==========
    { id: "di_q_021", level: 3, category: "36问·亲密", content: "用4分钟时间，尽可能详细地告诉对方你的人生故事", tips: "这是36问实验中最经典的环节", theory: "36 Questions" },
    { id: "di_q_022", level: 3, category: "36问·亲密", content: "如果你今晚就会死去，而且没有机会与任何人交流，你最遗憾没有告诉别人的是什么？为什么还没说？", tips: "探索内心深处的遗憾", theory: "36 Questions" },
    { id: "di_q_023", level: 3, category: "36问·亲密", content: "你的房子着火了，救出家人和宠物后，你还有时间安全地再救出一件东西，你会救什么？为什么？", tips: "了解对方最珍视什么", theory: "36 Questions" },
    { id: "di_q_024", level: 3, category: "36问·亲密", content: "在所有家人中，谁的去世会让你最难过？为什么？", tips: "探索家庭关系的深度", theory: "36 Questions" },
    { id: "di_q_025", level: 3, category: "36问·亲密", content: "分享一个你生命中尴尬的时刻", tips: "脆弱性展示能快速建立亲密感", theory: "Vulnerability" },

    { id: "di_q_026", level: 3, category: "原生家庭", content: "你觉得父母的婚姻给你最大的影响是什么？", tips: "原生家庭是理解一个人的钥匙" },
    { id: "di_q_027", level: 3, category: "原生家庭", content: "你希望未来的家庭和你成长的家庭有什么不同？", tips: "了解对方的家庭愿景" },
    { id: "di_q_028", level: 3, category: "关系观", content: "你觉得一段好的感情最重要的三个要素是什么？", tips: "直接了解关系期待" },
    { id: "di_q_029", level: 3, category: "关系观", content: "你在过去的感情中学到的最重要的一课是什么？", tips: "从经验中学习的能力很重要" },
    { id: "di_q_030", level: 3, category: "关系观", content: "你认为两个人在一起，应该互相改变还是接受彼此本来的样子？", tips: "没有标准答案，但能看出成熟度" },

    // ========== Level 4: 假设情境 ==========
    { id: "di_q_031", level: 4, category: "情境测试", content: "如果你中了500万，你会怎么用？会告诉家人吗？", tips: "了解金钱观和家庭边界" },
    { id: "di_q_032", level: 4, category: "情境测试", content: "如果伴侣比你优秀很多（收入、学历、社会地位），你会有压力吗？", tips: "探索自我价值感" },
    { id: "di_q_033", level: 4, category: "情境测试", content: "如果你们吵架了，对方3天不联系你，你会怎么做？", tips: "了解冲突处理模式" },
    { id: "di_q_034", level: 4, category: "情境测试", content: "如果对方的父母不喜欢你，你们会怎么处理？", tips: "家庭边界和忠诚度" },
    { id: "di_q_035", level: 4, category: "情境测试", content: "如果有一个很好的工作机会但需要异地2年，你会怎么选择？", tips: "事业与感情的平衡" }
  ]
};
