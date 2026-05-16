/**
 * 约会心动 - 问题卡
 * 融入心理学：吸引力法则、峰终定律、多巴胺约会理论
 * 欧美经典：20 Questions、Hot Seat、Dating Game Show问题
 */
module.exports = {
  mode: "romance_spark",
  mode_name: "约会心动",
  type: "question",
  cards: [
    // ========== 吸引力探索 Attraction ==========
    { id: "rs_q_001", level: 1, category: "吸引力", content: "第一次见我，你注意到的第一件事是什么？", tips: "研究表明第一印象在7秒内形成", theory: "First Impression" },
    { id: "rs_q_002", level: 1, category: "吸引力", content: "我身上最吸引你的特质是什么？外在还是内在？", tips: "探索吸引力的来源" },
    { id: "rs_q_003", level: 1, category: "吸引力", content: "你是先被我的外表吸引，还是先被我说的话打动？", tips: "视觉型vs听觉型", theory: "NLP" },
    { id: "rs_q_004", level: 2, category: "吸引力", content: "我做什么事情的时候你觉得最有魅力？", tips: "专注做事的人最有吸引力" },
    { id: "rs_q_005", level: 2, category: "吸引力", content: "如果用三个词形容我给你的感觉，你会选哪三个？", tips: "直觉反应最真实" },

    // ========== 20问游戏 20 Questions ==========
    { id: "rs_q_006", level: 1, category: "20问", content: "你小时候的梦想是什么？现在实现了吗？", tips: "经典20问开场", game: "20 Questions" },
    { id: "rs_q_007", level: 1, category: "20问", content: "你做过最疯狂的一件事是什么？", tips: "疯狂程度揭示性格", game: "20 Questions" },
    { id: "rs_q_008", level: 1, category: "20问", content: "如果明天世界末日，今晚你想做什么？", tips: "揭示真实欲望", game: "20 Questions" },
    { id: "rs_q_009", level: 2, category: "20问", content: "你最近一次哭是什么时候？为什么？", tips: "脆弱性展示建立连接", game: "20 Questions" },
    { id: "rs_q_010", level: 2, category: "20问", content: "你有什么秘密从没告诉过别人？", tips: "适度透露增进亲密", game: "20 Questions" },

    // ========== Hot Seat 热椅问答 ==========
    { id: "rs_q_011", level: 2, category: "热椅", content: "你现在最大的恐惧是什么？", tips: "Hot Seat经典问题", game: "Hot Seat" },
    { id: "rs_q_012", level: 2, category: "热椅", content: "如果你可以改变自己一件事，你会改什么？", tips: "自我认知程度", game: "Hot Seat" },
    { id: "rs_q_013", level: 2, category: "热椅", content: "你上一段感情是怎么结束的？学到了什么？", tips: "过去的经历塑造现在", game: "Hot Seat" },
    { id: "rs_q_014", level: 3, category: "热椅", content: "你觉得爱一个人和喜欢一个人有什么区别？", tips: "爱情观的深度探索", game: "Hot Seat" },
    { id: "rs_q_015", level: 3, category: "热椅", content: "你有没有做过让自己后悔的感情决定？", tips: "诚实面对过去", game: "Hot Seat" },

    // ========== 多巴胺问题 Dopamine ==========
    { id: "rs_q_016", level: 1, category: "心动时刻", content: "和我在一起时，哪个瞬间你心跳加速了？", tips: "多巴胺峰值时刻", theory: "Dopamine" },
    { id: "rs_q_017", level: 1, category: "心动时刻", content: "你有没有偷偷看过我的朋友圈？看到第几年？", tips: "小心机暴露心动程度" },
    { id: "rs_q_018", level: 2, category: "心动时刻", content: "收到我消息时你通常多久会回？为什么？", tips: "回复速度=在意程度？" },
    { id: "rs_q_019", level: 2, category: "心动时刻", content: "你有没有因为我而失眠过？在想什么？", tips: "夜晚的胡思乱想" },
    { id: "rs_q_020", level: 2, category: "心动时刻", content: "我的哪条消息你反复看过很多遍？", tips: "小心思曝光" },

    // ========== 峰终定律 Peak-End Rule ==========
    { id: "rs_q_021", level: 2, category: "回忆杀", content: "和我相处的所有时刻里，哪一刻你最难忘？", tips: "峰终定律：人们记住峰值和结尾", theory: "Peak-End Rule" },
    { id: "rs_q_022", level: 2, category: "回忆杀", content: "我们之间最好笑的一次是什么时候？", tips: "共同笑点是感情粘合剂" },
    { id: "rs_q_023", level: 3, category: "回忆杀", content: "如果给我们的故事取个名字，你会叫它什么？", tips: "如何定义这段关系" },

    // ========== 关系定义 Define The Relationship ==========
    { id: "rs_q_024", level: 2, category: "DTR", content: "你觉得我们现在是什么关系？", tips: "DTR（Define The Relationship）时刻", game: "DTR Talk" },
    { id: "rs_q_025", level: 2, category: "DTR", content: "你会怎么向朋友介绍我？", tips: "社交认可程度" },
    { id: "rs_q_026", level: 3, category: "DTR", content: "你对我们的未来有什么期待？", tips: "探索长期意愿" },
    { id: "rs_q_027", level: 3, category: "DTR", content: "你觉得什么时候才算真正在一起？", tips: "关系边界的定义" },

    // ========== 爱的语言探索 ==========
    { id: "rs_q_028", level: 1, category: "爱的语言", content: "我做什么事情让你最有被在乎的感觉？", tips: "发现对方的爱的语言", theory: "5 Love Languages" },
    { id: "rs_q_029", level: 2, category: "爱的语言", content: "你更希望我花时间陪你，还是给你买礼物？", tips: "精心时刻vs礼物", theory: "5 Love Languages" },
    { id: "rs_q_030", level: 2, category: "爱的语言", content: "我夸你的时候你是开心还是不好意思？", tips: "言语肯定的接受程度", theory: "5 Love Languages" },

    // ========== Dating Game Show 约会游戏秀 ==========
    { id: "rs_q_031", level: 1, category: "约会秀", content: "如果我们一起旅行，你最想去哪里？", tips: "旅行测试兼容性", game: "Dating Game" },
    { id: "rs_q_032", level: 1, category: "约会秀", content: "你理想的周末约会是什么样的？", tips: "约会偏好" },
    { id: "rs_q_033", level: 2, category: "约会秀", content: "在我面前你有没有什么不敢做的事？", tips: "舒适度测试" },
    { id: "rs_q_034", level: 2, category: "约会秀", content: "你觉得我有什么习惯你可能受不了？", tips: "早期红旗测试" },
    { id: "rs_q_035", level: 3, category: "约会秀", content: "如果必须说出我的一个缺点，你会说什么？", tips: "诚实但温柔" }
  ]
};
