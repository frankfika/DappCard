/**
 * 夫妻保鲜 - 任务卡
 * 融入婚姻治疗技术、激情重燃方法、日常仪式感
 * 工具性：可持续的亲密习惯、约会创意、沟通练习
 */
module.exports = {
  mode: "marriage_fresh",
  mode_name: "夫妻保鲜",
  type: "task",
  cards: [
    // ========== Gottman 日常连接仪式 ==========
    { id: "mf_t_001", level: 1, category: "日常仪式", content: "建立'6秒之吻'仪式：每天出门前/回家时，一个至少6秒的吻", tips: "Gottman研究：6秒足够激活浪漫感受", theory: "Gottman 6-Second Kiss", tool: true },
    { id: "mf_t_002", level: 1, category: "日常仪式", content: "设立'每日check-in'：每天花10分钟聊今天的心情，不解决问题，只倾听", tips: "下班后或睡前", theory: "Stress-Reducing Conversation", tool: true },
    { id: "mf_t_003", level: 1, category: "日常仪式", content: "创建'感恩日记'：每周各写3件感谢对方的事，周末交换阅读", tips: "书面比口头更持久", tool: true },
    { id: "mf_t_004", level: 1, category: "日常仪式", content: "重新确认你们的'暗号'系统：什么暗号=想要拥抱/独处/支持？", tips: "私密语言增强连接", tool: true },

    // ========== 约会保鲜 Date Night ==========
    { id: "mf_t_005", level: 1, category: "约会之夜", content: "立刻安排下一次只有两个人的约会，把孩子/工作放下", tips: "约会日必须神圣不可侵犯", tool: true },
    { id: "mf_t_006", level: 2, category: "约会之夜", content: "来一次'重新第一次约会'：假装不认识，重新搭讪、介绍自己", tips: "Esther Perel推荐的激情技巧", theory: "Esther Perel", tool: true },
    { id: "mf_t_007", level: 2, category: "约会之夜", content: "做一件你们从来没一起做过的事", tips: "新体验刺激多巴胺，重燃激情" },
    { id: "mf_t_008", level: 2, category: "约会之夜", content: "重访你们有特殊意义的地方：第一次约会/求婚/某个回忆地点", tips: "唤起美好记忆" },
    { id: "mf_t_009", level: 2, category: "约会之夜", content: "计划一次只有两个人的旅行（哪怕只是一晚）", tips: "暂时脱离日常角色" },

    // ========== 身体亲密重建 ==========
    { id: "mf_t_010", level: 1, category: "亲密重建", content: "今晚给对方一个持续20秒的拥抱", tips: "20秒拥抱释放催产素，增加亲密感", theory: "Oxytocin", tool: true },
    { id: "mf_t_011", level: 2, category: "亲密重建", content: "感官聚焦练习：互相按摩手部10分钟，不说话，专注触感", tips: "性治疗常用技术，不带目的的触碰", theory: "Sensate Focus", tool: true },
    { id: "mf_t_012", level: 2, category: "亲密重建", content: "对视4分钟，不说话（36问经典练习）", tips: "研究证明能增强亲密感", theory: "36 Questions", tool: true },
    { id: "mf_t_013", level: 3, category: "亲密重建", content: "今晚尝试一个你们从来没试过的方式", tips: "保持好奇和探索" },
    { id: "mf_t_014", level: 3, category: "亲密重建", content: "坦诚讨论：我们的亲密生活，你希望有什么变化？", tips: "沟通是最好的春药", tool: true },

    // ========== 感恩与欣赏表达 ==========
    { id: "mf_t_015", level: 1, category: "感恩表达", content: "写一张小纸条，列出5件你欣赏对方的事，放在TA会发现的地方", tips: "小惊喜大温暖", tool: true },
    { id: "mf_t_016", level: 1, category: "感恩表达", content: "在对方面前向别人（孩子/父母/朋友）夸TA", tips: "第三方认可更有分量", tool: true },
    { id: "mf_t_017", level: 2, category: "感恩表达", content: "录一段语音/视频，说出你为什么还爱TA", tips: "保存起来，以后还能看", tool: true },
    { id: "mf_t_018", level: 2, category: "感恩表达", content: "写一封'婚姻感谢信'：感谢TA在这段婚姻中的付出", tips: "不要理所当然", tool: true },

    // ========== 回忆与怀旧 ==========
    { id: "mf_t_019", level: 1, category: "回忆时光", content: "一起翻看老照片，讲讲当时的故事", tips: "共同回忆强化'我们'感" },
    { id: "mf_t_020", level: 1, category: "回忆时光", content: "放你们的'定情歌曲'，跳一支慢舞", tips: "音乐唤起情感记忆" },
    { id: "mf_t_021", level: 2, category: "回忆时光", content: "一起写一份'我们的故事'，从相识到现在", tips: "叙事疗法：重构共同叙事", theory: "Narrative Therapy", tool: true },
    { id: "mf_t_022", level: 2, category: "回忆时光", content: "重新看你们的婚礼视频/照片，讨论那天的感受", tips: "重温承诺" },

    // ========== 冲突修复技术 ==========
    { id: "mf_t_023", level: 2, category: "冲突修复", content: "练习'软启动'：把最近的一个抱怨改成用'我'开头重新说", tips: "Gottman'软启动'减少防卫反应", theory: "Gottman Soft Startup", tool: true },
    { id: "mf_t_024", level: 2, category: "冲突修复", content: "一起制定'吵架公约'：列出5条吵架时必须遵守的规则", tips: "比如：不翻旧账、不人身攻击、可以叫暂停", tool: true },
    { id: "mf_t_025", level: 2, category: "冲突修复", content: "设定一个'暂停词'：吵到失控时说这个词就暂停20分钟", tips: "避免情绪升级造成更大伤害", theory: "Gottman Repair", tool: true },
    { id: "mf_t_026", level: 3, category: "冲突修复", content: "回顾上次冲突，双方各承认一个'我做得不好的地方'", tips: "修复比输赢重要", tool: true },

    // ========== 梦想与目标 ==========
    { id: "mf_t_027", level: 2, category: "梦想共创", content: "一起制作一个'愿望清单'：50件想一起做的事", tips: "从简单到疯狂都可以", tool: true },
    { id: "mf_t_028", level: 2, category: "梦想共创", content: "各自写下个人目标和共同目标，然后交换讨论如何支持彼此", tips: "个人成长+共同成长", tool: true },
    { id: "mf_t_029", level: 3, category: "梦想共创", content: "一起规划一个'大项目'：装修、旅行、创业...从计划到实现", tips: "共同目标增强团队感" },

    // ========== 承诺更新 ==========
    { id: "mf_t_030", level: 2, category: "承诺更新", content: "重写你们的'婚姻宣言'：现在的你会承诺什么？", tips: "承诺需要随时间更新", tool: true },
    { id: "mf_t_031", level: 3, category: "承诺更新", content: "举办一个小型的'重新承诺仪式'：就你们两个人", tips: "可以很简单但要认真" },
    { id: "mf_t_032", level: 3, category: "承诺更新", content: "互相写一封'给10年后的我们'的信，封存起来", tips: "10年后一起打开" },

    // ========== 实用习惯 ==========
    { id: "mf_t_033", level: 1, category: "实用习惯", content: "今晚手机都静音/放另一个房间，只属于彼此", tips: "数字排毒", tool: true },
    { id: "mf_t_034", level: 1, category: "实用习惯", content: "一起做一顿饭，从买菜到上桌都一起", tips: "协作增进感情" },
    { id: "mf_t_035", level: 2, category: "实用习惯", content: "设立'财务约会'：每月一次坐下来讨论家庭财务", tips: "透明的财务减少冲突", tool: true }
  ]
};
