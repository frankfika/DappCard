/**
 * 夫妻保鲜 - 问题卡
 * 融入Gottman婚姻研究、Esther Perel激情理论、婚姻治疗工具
 * 工具性：婚姻诊断、沟通修复、激情重燃
 */
module.exports = {
  mode: "marriage_fresh",
  mode_name: "夫妻保鲜",
  type: "question",
  cards: [
    // ========== Gottman 爱情地图更新 ==========
    { id: "mf_q_001", level: 1, category: "爱情地图", content: "我现在生活中最大的压力是什么？你知道吗？", tips: "Gottman研究：持续更新伴侣的'内心地图'是幸福婚姻的基础", theory: "Gottman Love Maps", tool: true },
    { id: "mf_q_002", level: 1, category: "爱情地图", content: "我最近有什么新的梦想或目标？", tips: "人在不断变化，你跟上了吗", theory: "Gottman Love Maps", tool: true },
    { id: "mf_q_003", level: 1, category: "爱情地图", content: "我现在最担心的事情是什么？", tips: "了解才能支持", theory: "Gottman Love Maps", tool: true },
    { id: "mf_q_004", level: 2, category: "爱情地图", content: "在工作/生活中，我最近有什么成就感到骄傲？", tips: "你在关注TA的成长吗", theory: "Gottman Love Maps", tool: true },
    { id: "mf_q_005", level: 2, category: "爱情地图", content: "我和我的朋友们最近都在聊什么？", tips: "你了解TA的社交世界吗" },

    // ========== 婚姻健康检测 ==========
    { id: "mf_q_006", level: 2, category: "婚姻诊断", content: "【Gottman四骑士检测】我们吵架时有这些吗：批评人格、蔑视翻白眼、防卫反击、冷战stonewalling？", tips: "这四个是婚姻杀手，准确率94%", theory: "Four Horsemen", tool: true },
    { id: "mf_q_007", level: 2, category: "婚姻诊断", content: "1-10分，你对我们婚姻的满意度是多少？什么让你扣分？", tips: "定期check-in很重要", tool: true },
    { id: "mf_q_008", level: 2, category: "婚姻诊断", content: "在我们的婚姻里，你有没有感到孤独的时刻？", tips: "已婚的孤独比单身更痛苦", tool: true },
    { id: "mf_q_009", level: 3, category: "婚姻诊断", content: "如果让你写一份'婚姻年度报告'，亮点和改进项分别是什么？", tips: "像复盘工作一样复盘婚姻", tool: true },
    { id: "mf_q_010", level: 3, category: "婚姻诊断", content: "你觉得我们婚姻中最大的'房间里的大象'是什么？", tips: "那个我们都不说但都知道的问题", tool: true },

    // ========== Esther Perel 激情理论 ==========
    { id: "mf_q_011", level: 2, category: "重燃激情", content: "我们的关系中，安全感和神秘感的比例是多少？", tips: "Esther Perel：激情需要适度的距离和神秘", theory: "Esther Perel", tool: true },
    { id: "mf_q_012", level: 2, category: "重燃激情", content: "你觉得我们的关系从什么时候开始变得'太舒适'了？", tips: "舒适≠无聊，但警惕过度", theory: "Esther Perel" },
    { id: "mf_q_013", level: 3, category: "重燃激情", content: "在我身上，你还有什么没探索过的领域？", tips: "保持好奇心是激情的源泉", theory: "Esther Perel" },
    { id: "mf_q_014", level: 3, category: "重燃激情", content: "你有没有什么幻想是不敢告诉我的？", tips: "安全空间里可以坦诚", theory: "Esther Perel" },
    { id: "mf_q_015", level: 3, category: "重燃激情", content: "你觉得我们多久没有'新鲜感'了？怎么创造？", tips: "新体验刺激多巴胺" },

    // ========== 沟通修复 ==========
    { id: "mf_q_016", level: 2, category: "NVC练习", content: "用这个句式说一件事：'当你...时，我感到...，因为我需要...，我希望你...'", tips: "非暴力沟通：观察-感受-需要-请求", theory: "NVC", tool: true },
    { id: "mf_q_017", level: 2, category: "沟通修复", content: "我们最近一次吵架，如果重新来过你会怎么说？", tips: "练习更好的表达", tool: true },
    { id: "mf_q_018", level: 2, category: "沟通修复", content: "在我们的沟通中，你最希望我改变什么？", tips: "具体的、可行动的建议", tool: true },
    { id: "mf_q_019", level: 3, category: "沟通修复", content: "有没有什么话你想说但一直憋着？今天说出来", tips: "积压的情绪会腐蚀关系", tool: true },

    // ========== 原生家庭影响 ==========
    { id: "mf_q_020", level: 2, category: "原生家庭", content: "你觉得你父母的婚姻给你最大的影响是什么？正面还是负面？", tips: "觉察原生家庭模式", theory: "Family of Origin", tool: true },
    { id: "mf_q_021", level: 2, category: "原生家庭", content: "你有没有在我身上投射过你对父母的期待或不满？", tips: "意识到投射才能改变", theory: "Projection" },
    { id: "mf_q_022", level: 3, category: "原生家庭", content: "我们的婚姻和你父母的婚姻有什么相似？你希望不同的地方呢？", tips: "打破代际循环", tool: true },

    // ========== 育儿与婚姻 ==========
    { id: "mf_q_023", level: 2, category: "育儿与婚姻", content: "有了孩子后，你觉得我们的关系发生了什么变化？", tips: "孩子是婚姻的考验", tool: true },
    { id: "mf_q_024", level: 2, category: "育儿与婚姻", content: "在育儿上，你觉得我们分工公平吗？你希望怎么调整？", tips: "坦诚讨论分工", tool: true },
    { id: "mf_q_025", level: 2, category: "育儿与婚姻", content: "我们有多久没有只属于两个人的时间了？怎么创造？", tips: "夫妻关系优先于亲子关系", tool: true },

    // ========== 金钱与婚姻 ==========
    { id: "mf_q_026", level: 2, category: "金钱观", content: "我们的财务管理方式你满意吗？有什么想调整的？", tips: "金钱是婚姻冲突的主要来源之一", tool: true },
    { id: "mf_q_027", level: 2, category: "金钱观", content: "有没有什么你想花但不敢提的钱？", tips: "坦诚讨论消费观", tool: true },
    { id: "mf_q_028", level: 3, category: "金钱观", content: "如果有100万可以自由支配，你会怎么用？", tips: "看优先级差异", tool: true },

    // ========== 感恩与欣赏 ==========
    { id: "mf_q_029", level: 1, category: "感恩练习", content: "说出三件最近想感谢对方但没说的事", tips: "Gottman：5:1比例，5句好话抵消1句批评", theory: "Gottman 5:1", tool: true },
    { id: "mf_q_030", level: 1, category: "感恩练习", content: "在这段婚姻里，你最感激我的是什么？", tips: "真诚地说", tool: true },
    { id: "mf_q_031", level: 2, category: "感恩练习", content: "和我在一起后，你觉得自己最大的成长是什么？", tips: "婚姻应该让人更好" },

    // ========== 未来规划 ==========
    { id: "mf_q_032", level: 2, category: "未来规划", content: "5年后/10年后，你希望我们的生活是什么样子？", tips: "对齐期待很重要", tool: true },
    { id: "mf_q_033", level: 2, category: "未来规划", content: "你理想的退休生活是什么样的？", tips: "提前规划" },
    { id: "mf_q_034", level: 3, category: "未来规划", content: "有没有什么你一直想做但'因为婚姻/家庭'放弃的？", tips: "找到平衡点", tool: true },

    // ========== 终极问题 ==========
    { id: "mf_q_035", level: 3, category: "终极问题", content: "如果我们的婚姻出问题，你觉得最可能因为什么？", tips: "预防比治疗重要", tool: true },
    { id: "mf_q_036", level: 3, category: "终极问题", content: "你愿意为了这段婚姻做出的最大改变是什么？", tips: "承诺需要行动" },
    { id: "mf_q_037", level: 3, category: "终极问题", content: "如果可以重新选择，你还会选择我吗？为什么？", tips: "确认彼此的选择" }
  ]
};
