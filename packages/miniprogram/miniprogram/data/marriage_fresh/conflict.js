/**
 * 夫妻保鲜 - 冲突化解卡
 * 融入Gottman冲突管理、NVC非暴力沟通、情绪聚焦疗法
 * 工具性：冲突诊断、修复技术、预防策略
 */
module.exports = {
  mode: "marriage_fresh",
  mode_name: "夫妻保鲜",
  type: "conflict_resolution",
  description: "冲突化解工具箱：帮助建设性地沟通和解决问题",
  cards: [
    // ========== Gottman 四骑士诊断 ==========
    { id: "mf_c_001", level: 1, category: "四骑士诊断", content: "【批评 vs 抱怨】检查你的表达：'你总是/从来不...'是批评，'这件事让我不舒服'是抱怨。把最近的一句批评改成抱怨。", tips: "批评攻击人格，抱怨针对行为", theory: "Four Horsemen - Criticism", tool: true },
    { id: "mf_c_002", level: 2, category: "四骑士诊断", content: "【蔑视检测】我们吵架时有没有翻白眼、讽刺、挖苦、嘲笑？这是婚姻最大杀手。", tips: "蔑视是Gottman预测离婚的头号指标", theory: "Four Horsemen - Contempt", tool: true },
    { id: "mf_c_003", level: 2, category: "四骑士诊断", content: "【防卫检测】当对方提出问题时，你的第一反应是解释/反击，还是试着理解？", tips: "防卫让问题永远得不到解决", theory: "Four Horsemen - Defensiveness", tool: true },
    { id: "mf_c_004", level: 2, category: "四骑士诊断", content: "【冷战检测】你们有没有出现过长时间不说话、回避问题、情感关闭？", tips: "Stonewalling是关系中的'装死'反应", theory: "Four Horsemen - Stonewalling", tool: true },

    // ========== NVC 非暴力沟通练习 ==========
    { id: "mf_c_005", level: 1, category: "NVC练习", content: "用这个模板说一件困扰你的事：'当（具体事实）发生时，我感到（情绪），因为我需要（需求）。你能（具体请求）吗？'", tips: "NVC四要素：观察-感受-需要-请求", theory: "NVC", tool: true },
    { id: "mf_c_006", level: 2, category: "NVC练习", content: "把上次吵架时说的话用NVC重新表达一遍", tips: "从指责变成请求", theory: "NVC", tool: true },
    { id: "mf_c_007", level: 2, category: "NVC练习", content: "对方说完后，用这个句式确认：'我听到你说的是...，你的感受是...，你需要的是...，对吗？'", tips: "镜像反馈确保理解", theory: "NVC + Mirroring", tool: true },

    // ========== Gottman 软启动技术 ==========
    { id: "mf_c_008", level: 1, category: "软启动", content: "把'你怎么又...'改成'我注意到...，我希望...'", tips: "用'我'开头而不是'你'开头", theory: "Gottman Soft Startup", tool: true },
    { id: "mf_c_009", level: 2, category: "软启动", content: "在提出问题前，先说一件你欣赏对方的事", tips: "软启动=先肯定再提问题", theory: "Gottman Soft Startup", tool: true },
    { id: "mf_c_010", level: 2, category: "软启动", content: "练习：把一个抱怨拆解成'具体事件+你的感受+你希望的改变'", tips: "具体化减少防卫", tool: true },

    // ========== 修复技术 ==========
    { id: "mf_c_011", level: 1, category: "修复技术", content: "设定你们的'暂停词'：吵到失控时，任何一方说这个词就暂停20分钟", tips: "暂停不是逃避，是避免情绪升级", theory: "Gottman Repair", tool: true },
    { id: "mf_c_012", level: 2, category: "修复技术", content: "吵架时试着用幽默（不是讽刺）缓解气氛", tips: "共同的笑点能瓦解紧张", theory: "Gottman Repair" },
    { id: "mf_c_013", level: 2, category: "修复技术", content: "主动说'我刚才说得太过了，让我重新说'", tips: "承认失态是修复的开始", theory: "Gottman Repair", tool: true },
    { id: "mf_c_014", level: 2, category: "修复技术", content: "吵完后，不管谁对谁错，先说'这件事伤害了我们的感情，我们来修复一下'", tips: "关系比对错重要", theory: "Gottman Repair", tool: true },

    // ========== 冲突规则制定 ==========
    { id: "mf_c_015", level: 2, category: "冲突规则", content: "一起制定'吵架公约'：列出吵架时绝对不能做的3件事", tips: "例：不翻旧账、不人身攻击、不威胁分手", tool: true },
    { id: "mf_c_016", level: 2, category: "冲突规则", content: "约定吵架后的'冷却期'和'复盘时间'", tips: "冷却≠冷战，复盘是为了不重蹈覆辙", tool: true },
    { id: "mf_c_017", level: 2, category: "冲突规则", content: "设定'安全词'：当一方说出这个词，意味着'我现在真的很受伤'", tips: "紧急停止信号", tool: true },

    // ========== 倾听练习 ==========
    { id: "mf_c_018", level: 1, category: "倾听练习", content: "一方说3分钟，另一方只能听，不能打断、反驳、给建议。然后复述听到的内容。", tips: "不带评判的倾听是最难的技能", theory: "Active Listening", tool: true },
    { id: "mf_c_019", level: 2, category: "倾听练习", content: "试着说'我理解你的感受是...'而不是'但是我觉得...'", tips: "先共情，再解释", tool: true },
    { id: "mf_c_020", level: 2, category: "倾听练习", content: "问对方：'你需要我倾听、给建议、还是帮你解决问题？'", tips: "确认对方需要什么类型的支持", tool: true },

    // ========== 可解决 vs 永久性问题 ==========
    { id: "mf_c_021", level: 2, category: "问题分类", content: "讨论：我们的分歧是'可解决的'还是'永久性的'？永久性问题需要接纳而不是解决。", tips: "Gottman：69%的婚姻问题是永久性的", theory: "Gottman Perpetual Problems", tool: true },
    { id: "mf_c_022", level: 3, category: "问题分类", content: "找出一个'永久性问题'，讨论如何在不解决的情况下共存", tips: "学会与差异共处", theory: "Gottman Perpetual Problems", tool: true },
    { id: "mf_c_023", level: 3, category: "问题分类", content: "回忆你们成功解决过的一次冲突，当时是怎么做到的？", tips: "复制成功经验", tool: true },

    // ========== 冲突背后的需求 ==========
    { id: "mf_c_024", level: 2, category: "需求探索", content: "最近一次吵架，表面原因是什么？背后真正的需求是什么？", tips: "冲突表面是事件，深层是需求", theory: "EFT", tool: true },
    { id: "mf_c_025", level: 3, category: "需求探索", content: "对方让你最生气的行为，可能满足了TA什么需求？", tips: "理解行为背后的积极意图", theory: "Positive Intent", tool: true },
    { id: "mf_c_026", level: 3, category: "需求探索", content: "你们反复吵的那个'经典问题'，核心矛盾是什么？", tips: "识别循环模式才能打破它", tool: true },

    // ========== 道歉与原谅 ==========
    { id: "mf_c_027", level: 2, category: "道歉艺术", content: "练习完整的道歉：承认错误+表达理解对方感受+承诺改变+请求原谅", tips: "'对不起'三个字不是完整道歉", tool: true },
    { id: "mf_c_028", level: 2, category: "道歉艺术", content: "分享一件你一直想道歉但没说出口的事", tips: "清理积压的旧账", tool: true },
    { id: "mf_c_029", level: 3, category: "原谅练习", content: "有没有什么旧伤你一直没真正原谅？今天可以放下吗？", tips: "不原谅是喝毒药希望对方死", tool: true },

    // ========== 预防性沟通 ==========
    { id: "mf_c_030", level: 1, category: "预防沟通", content: "设立'周度check-in'：每周固定时间聊聊感情状态，及早发现问题", tips: "定期维护好过事后修理", tool: true },
    { id: "mf_c_031", level: 2, category: "预防沟通", content: "你最近有没有什么小不满在积累？现在说出来，别等爆发", tips: "小问题早说，大问题可避免", tool: true },
    { id: "mf_c_032", level: 2, category: "预防沟通", content: "告诉对方：'当我（某种状态）时，我最需要你（某种支持）'", tips: "提前沟通需求，减少误解", tool: true }
  ]
};
