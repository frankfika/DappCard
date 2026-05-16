/**
 * 约会心动 - 场景卡
 * 融入角色扮演游戏、即兴表演、电影情境重现
 */
module.exports = {
  mode: "romance_spark",
  mode_name: "约会心动",
  type: "scene",
  cards: [
    // ========== 初识重演 First Meet ==========
    { id: "rs_s_001", level: 1, category: "初识重演", content: "假装是第一次见面，用不同的方式搭讪", tips: "发挥创意，可以搞笑", scenario: "First Meeting" },
    { id: "rs_s_002", level: 1, category: "初识重演", content: "假装在咖啡店偶遇，从借个位置开始聊天", tips: "看谁先打破沉默", scenario: "Coffee Shop" },
    { id: "rs_s_003", level: 2, category: "初识重演", content: "假装在图书馆被同一本书吸引", tips: "会聊什么？", scenario: "Library" },
    { id: "rs_s_004", level: 2, category: "初识重演", content: "假装是朋友介绍的相亲对象，第一次见面", tips: "会有什么不同吗", scenario: "Blind Date" },

    // ========== 经典电影情境 Movie Scenes ==========
    { id: "rs_s_005", level: 2, category: "电影情境", content: "重现《泰坦尼克号》船头展臂的经典场景", tips: "I'm flying!", movie: "Titanic" },
    { id: "rs_s_006", level: 2, category: "电影情境", content: "演一段《怦然心动》里隔着篱笆对视的场景", tips: "青春心动感", movie: "Flipped" },
    { id: "rs_s_007", level: 2, category: "电影情境", content: "假装你们是《爱乐之城》里在星空下跳舞的情侣", tips: "可以只是晃一晃", movie: "La La Land" },
    { id: "rs_s_008", level: 3, category: "电影情境", content: "演一段告白戏：借用任何电影里的经典台词", tips: "可以抄台词但要认真演", movie: "Any Movie" },

    // ========== 平行宇宙假设 What If ==========
    { id: "rs_s_009", level: 2, category: "平行宇宙", content: "如果我们是同班同学，你觉得我们会在什么时候认识？", tips: "重构相遇的可能性", scenario: "What If" },
    { id: "rs_s_010", level: 2, category: "平行宇宙", content: "如果我们是在旅行中偶遇的陌生人，你会怎么搭讪？", tips: "旅行相遇的浪漫", scenario: "Travel" },
    { id: "rs_s_011", level: 2, category: "平行宇宙", content: "如果我们是同事，你觉得会发生什么？", tips: "办公室恋情？", scenario: "Office" },
    { id: "rs_s_012", level: 3, category: "平行宇宙", content: "如果我们在10年前认识，现在会是什么样子？", tips: "时空穿越感" },

    // ========== 未来情境 Future ==========
    { id: "rs_s_013", level: 2, category: "未来想象", content: "假装你们已经在一起一年了，描述一个普通的周末", tips: "看对方的生活想象", scenario: "1 Year Later" },
    { id: "rs_s_014", level: 3, category: "未来想象", content: "假装你在向朋友介绍'这是我对象'，你会怎么说？", tips: "社交认可", scenario: "Introduction" },
    { id: "rs_s_015", level: 3, category: "未来想象", content: "假装你们正在计划第一次一起旅行", tips: "讨论目的地和行程", scenario: "Travel Plan" },

    // ========== 冲突演练 Conflict ==========
    { id: "rs_s_016", level: 2, category: "冲突演练", content: "假装你们因为一件小事吵架了，现在要和好", tips: "如何化解冲突", scenario: "Make Up" },
    { id: "rs_s_017", level: 3, category: "冲突演练", content: "假装一方说了让对方生气的话，现在要道歉", tips: "道歉的艺术", scenario: "Apology" },
    { id: "rs_s_018", level: 3, category: "冲突演练", content: "假装你们异地一个月后第一次见面", tips: "重逢的感觉", scenario: "Reunion" },

    // ========== 即兴表演 Improv ==========
    { id: "rs_s_019", level: 1, category: "即兴演出", content: "一人开始讲一个故事，另一人在关键时刻接着讲", tips: "即兴共创", game: "Story Chain" },
    { id: "rs_s_020", level: 2, category: "即兴演出", content: "用表情和动作传达一种情绪，让对方猜", tips: "非语言沟通", game: "Emotion Charades" },
    { id: "rs_s_021", level: 2, category: "即兴演出", content: "假装你们是综艺节目上的情侣嘉宾，接受采访", tips: "如何介绍你们的故事", game: "Talk Show" },
    { id: "rs_s_022", level: 3, category: "即兴演出", content: "假装向对方求婚，发挥全部演技", tips: "惊喜还是感动？", game: "Proposal" },

    // ========== 角色互换 Role Swap ==========
    { id: "rs_s_023", level: 2, category: "角色互换", content: "模仿对方说话的方式和口头禅", tips: "看对方如何看自己", game: "Imitation" },
    { id: "rs_s_024", level: 2, category: "角色互换", content: "假装你是对方，回答'你喜欢TA什么'", tips: "换位思考", game: "Role Swap" },
    { id: "rs_s_025", level: 3, category: "角色互换", content: "假装你们性别互换了一天，会做什么？", tips: "有趣的思想实验", game: "Gender Swap" }
  ]
};
