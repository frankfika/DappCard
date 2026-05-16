/**
 * 相亲破冰 - 选择卡
 * 融入博弈论、MBTI、心理测试、Would You Rather经典游戏
 */
module.exports = {
  mode: "dating_icebreaker",
  mode_name: "相亲破冰",
  type: "choice",
  cards: [
    // ========== MBTI 维度测试 ==========
    { id: "di_c_001", level: 1, category: "MBTI·能量", content: "周末充电方式？", optionA: "独处看书追剧（I）", optionB: "约朋友出去浪（E）", tips: "I/E维度：内向者独处充电，外向者社交充电", theory: "MBTI" },
    { id: "di_c_002", level: 1, category: "MBTI·信息", content: "做决定时你更依赖？", optionA: "数据和事实（S）", optionB: "直觉和可能性（N）", tips: "S/N维度：感觉型vs直觉型", theory: "MBTI" },
    { id: "di_c_003", level: 1, category: "MBTI·决策", content: "朋友做了错误决定，你会？", optionA: "直接指出问题（T）", optionB: "先照顾TA情绪（F）", tips: "T/F维度：思考型vs情感型", theory: "MBTI" },
    { id: "di_c_004", level: 1, category: "MBTI·生活", content: "旅行你更喜欢？", optionA: "详细规划每天行程（J）", optionB: "走到哪算哪（P）", tips: "J/P维度：判断型vs感知型", theory: "MBTI" },

    // ========== 博弈论情境 ==========
    { id: "di_c_005", level: 2, category: "博弈论", content: "【信任博弈】对方先给你100元让你投资，收益翻倍后你会？", optionA: "全部还给TA（合作）", optionB: "只还一半（自利）", tips: "经典信任博弈：测试你的合作倾向", theory: "Trust Game" },
    { id: "di_c_006", level: 2, category: "博弈论", content: "【囚徒困境】你们一起犯了小错，分开审问，你会？", optionA: "保持沉默（合作）", optionB: "坦白减刑（背叛）", tips: "囚徒困境：合作还是背叛？", theory: "Prisoner's Dilemma" },
    { id: "di_c_007", level: 2, category: "博弈论", content: "【最后通牒】有100元要分，对方出价给你30元，你？", optionA: "接受（有总比没有好）", optionB: "拒绝（宁可都没有）", tips: "最后通牒博弈：公平感vs理性", theory: "Ultimatum Game" },
    { id: "di_c_008", level: 3, category: "博弈论", content: "【重复博弈】对方上次背叛了你，这次你会？", optionA: "选择原谅再合作", optionB: "以牙还牙报复", tips: "重复博弈中的'以牙还牙'策略是最优解", theory: "Repeated Game" },

    // ========== Would You Rather 经典 ==========
    { id: "di_c_009", level: 1, category: "两难选择", content: "你宁愿？", optionA: "读心术（知道别人想法）", optionB: "隐身术（随时消失）", tips: "选读心=重视理解他人；选隐身=重视个人空间" },
    { id: "di_c_010", level: 1, category: "两难选择", content: "你宁愿？", optionA: "永远不用工作但收入一般", optionB: "工作很忙但收入翻倍", tips: "反映你对金钱和自由时间的权衡" },
    { id: "di_c_011", level: 2, category: "两难选择", content: "你宁愿？", optionA: "知道自己的死亡日期", optionB: "永远不知道", tips: "对确定性的态度" },
    { id: "di_c_012", level: 2, category: "两难选择", content: "你宁愿？", optionA: "回到过去改变一件事", optionB: "看到未来10年的自己", tips: "对过去和未来的态度" },

    // ========== 依恋风格测试 ==========
    { id: "di_c_013", level: 2, category: "依恋测试", content: "恋爱中对方不回消息，你会？", optionA: "反复查看手机很焦虑", optionB: "该干嘛干嘛不在意", tips: "测试依恋风格：焦虑型vs回避型", theory: "Attachment" },
    { id: "di_c_014", level: 2, category: "依恋测试", content: "刚确定关系，你更倾向？", optionA: "恨不得天天黏在一起", optionB: "保持各自独立空间", tips: "依恋需求程度", theory: "Attachment" },
    { id: "di_c_015", level: 3, category: "依恋测试", content: "伴侣说需要独处空间，你会？", optionA: "担心TA是不是不爱我了", optionB: "正好我也需要休息", tips: "安全型会尊重，焦虑型会担心", theory: "Attachment" },

    // ========== 爱情观测试 ==========
    { id: "di_c_016", level: 2, category: "爱情观", content: "你相信？", optionA: "命中注定的灵魂伴侣", optionB: "爱情靠经营和选择", tips: "宿命论vs成长论", theory: "Sternberg" },
    { id: "di_c_017", level: 2, category: "爱情观", content: "理想的爱情是？", optionA: "激情燃烧轰轰烈烈", optionB: "细水长流平淡温馨", tips: "斯腾伯格爱情三角理论", theory: "Sternberg" },
    { id: "di_c_018", level: 2, category: "爱情观", content: "更看重？", optionA: "精神共鸣三观一致", optionB: "生活习惯相互适应", tips: "灵魂契合vs生活契合" },

    // ========== 五种爱的语言 ==========
    { id: "di_c_019", level: 1, category: "爱的语言", content: "你更喜欢收到？", optionA: "一句真诚的赞美", optionB: "一份用心的礼物", tips: "言语肯定vs礼物", theory: "5 Love Languages" },
    { id: "di_c_020", level: 1, category: "爱的语言", content: "你更看重？", optionA: "TA帮你做家务买早餐", optionB: "TA专心陪你聊一整晚", tips: "服务行为vs精心时刻", theory: "5 Love Languages" },
    { id: "di_c_021", level: 2, category: "爱的语言", content: "表达爱意你更常用？", optionA: "肢体接触（牵手拥抱）", optionB: "语言表达（说我爱你）", tips: "肢体接触vs言语肯定", theory: "5 Love Languages" },

    // ========== 价值观选择 ==========
    { id: "di_c_022", level: 1, category: "生活方式", content: "周末理想状态？", optionA: "宅家追剧打游戏", optionB: "户外运动或社交", tips: "生活节奏兼容性" },
    { id: "di_c_023", level: 1, category: "生活方式", content: "存钱vs体验？", optionA: "先存钱再考虑消费", optionB: "该花就花享受当下", tips: "金钱观" },
    { id: "di_c_024", level: 2, category: "生活方式", content: "职业选择？", optionA: "稳定工作朝九晚五", optionB: "创业折腾追求梦想", tips: "风险偏好" },
    { id: "di_c_025", level: 2, category: "生活方式", content: "定居选择？", optionA: "大城市打拼机会多", optionB: "小城市生活压力小", tips: "人生规划" },

    // ========== 关系边界测试 ==========
    { id: "di_c_026", level: 2, category: "关系边界", content: "恋爱后你的社交？", optionA: "保持原有朋友圈", optionB: "以伴侣为中心", tips: "边界感测试" },
    { id: "di_c_027", level: 2, category: "关系边界", content: "手机密码？", optionA: "可以互相知道", optionB: "保持个人隐私", tips: "隐私边界" },
    { id: "di_c_028", level: 3, category: "关系边界", content: "财务管理？", optionA: "AA或各管各的", optionB: "合并共同管理", tips: "经济独立程度" },

    // ========== 冲突处理测试 ==========
    { id: "di_c_029", level: 2, category: "冲突风格", content: "吵架时你更可能？", optionA: "据理力争不认输", optionB: "先冷静过后再说", tips: "冲突处理风格" },
    { id: "di_c_030", level: 2, category: "冲突风格", content: "意见不同时？", optionA: "直接表达不藏着", optionB: "委婉暗示给台阶", tips: "沟通风格" },
    { id: "di_c_031", level: 3, category: "冲突风格", content: "吵完架？", optionA: "必须当天解决", optionB: "可以睡一觉再说", tips: "和解节奏" },

    // ========== 趣味心理测试 ==========
    { id: "di_c_032", level: 1, category: "趣味测试", content: "你更像？", optionA: "猫（独立高冷）", optionB: "狗（热情忠诚）", tips: "性格自我认知" },
    { id: "di_c_033", level: 1, category: "趣味测试", content: "早上还是晚上？", optionA: "早起鸟（晨型人）", optionB: "夜猫子（夜型人）", tips: "生物钟兼容性很重要" },
    { id: "di_c_034", level: 1, category: "趣味测试", content: "做饭？", optionA: "喜欢/会做", optionB: "不会/不想学", tips: "生活技能" },
    { id: "di_c_035", level: 2, category: "趣味测试", content: "如果中了500万？", optionA: "先存起来/投资", optionB: "实现愿望清单", tips: "延迟满足能力" }
  ]
};
