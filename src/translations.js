// 中英文翻译
export const translations = {
  en: {
    // Start Screen
    startTitle: 'Tarot Love Reading',
    startSubtitle: 'Love Five-Star Spread',
    startDescription1: 'Welcome to the Love Five-Star Spread tarot reading. This ancient divination method uses five cards arranged in a star pattern to provide insight into your romantic life. The cards will reveal your current state, your partner\'s energy, past influences, present dynamics, and future possibilities.',
    startDescription2: 'Take a moment to center yourself and focus on your question about love. When you\'re ready, click below to begin your reading.',
    startButton: 'Begin Reading',

    // Question Input
    questionTitle: 'What would you like to know?',
    questionDescription: 'Focus on your question about love or relationships. You may ask about a current relationship, a potential partner, or your general romantic future. The cards will provide guidance based on your intention.',
    questionPlaceholder: 'Enter your question here...',
    questionButton: 'Continue to Card Drawing',
    questionRequired: 'Please enter your question before continuing',

    // Card Drawing
    drawingTitle: 'Love Five-Star Spread',
    drawingPrompt: 'Click on any card to reveal it',
    drawingComplete: 'All cards drawn. Generating your reading...',

    // Analyzing
    analyzingTitle: 'Interpreting Your Cards',
    analyzingMessage: 'The cards are revealing their wisdom...',

    // Spread Positions
    positionSelf: 'Self',
    positionSelfMeaning: 'Your current state and feelings in the relationship',
    positionPartner: 'Partner',
    positionPartnerMeaning: 'Partner\'s current state and feelings',
    positionPast: 'Past',
    positionPastMeaning: 'Past influences affecting the relationship',
    positionPresent: 'Present',
    positionPresentMeaning: 'Current situation and dynamics',
    positionFuture: 'Future',
    positionFutureMeaning: 'Potential outcome and direction',

    // Report
    reportTitle: 'Your Love Reading',
    reportQuestion: 'Your Question:',
    reportOverviewTitle: 'Reading Overview',
    reportCardsTitle: 'Your Cards',
    reportAnalysisTitle: 'Overall Analysis',
    reportAdviceTitle: 'Guidance & Advice',
    reportNewButton: 'New Reading',
    reportPrintButton: 'Print Reading',
    cardUpright: 'Upright',
    cardReversed: 'Reversed',

    // General
    languageSwitch: '中文',
    generalReading: 'General love reading',

    // Confirm Dialog
    confirmCancel: 'Cancel',
    confirmDelete: 'Delete',

    // History
    historyTitle: 'Reading History',
    historyEmpty: 'No reading history yet',
    historyEmptyDescription: 'Your past readings will appear here',
    historyBackButton: 'Back to Home',
    historyClearButton: 'Clear All History',
    historyClearConfirm: 'Are you sure you want to delete all reading history? This cannot be undone.',
    historyViewButton: 'View History',
    historyItemDate: 'Date',
    historyItemQuestion: 'Question',
    historyCachedBadge: 'From History',
    historyCachedNotice: 'This reading was retrieved from your history'
  },

  zh: {
    // 开始屏幕
    startTitle: '塔罗爱情占卜',
    startSubtitle: '爱情五星阵',
    startDescription1: '欢迎来到爱情五星阵塔罗占卜。这个古老的占卜方法使用五张以五角星形排列的塔罗牌，为您的爱情生活提供洞察。这些牌将揭示您的当前状态、伴侣的能量、过去的影响、现在的动态以及未来的可能性。',
    startDescription2: '请花一点时间让自己平静下来，专注于您关于爱情的问题。准备好后，点击下方开始您的占卜。',
    startButton: '开始占卜',

    // 问题输入
    questionTitle: '您想了解什么？',
    questionDescription: '专注于您关于爱情或关系的问题。您可以询问当前的关系、潜在的伴侣，或您的整体爱情未来。塔罗牌将根据您的意图提供指引。',
    questionPlaceholder: '在此输入您的问题...',
    questionButton: '继续抽牌',
    questionRequired: '请输入您的问题后再继续',

    // 抽牌
    drawingTitle: '爱情五星阵',
    drawingPrompt: '点击任意卡片进行翻开',
    drawingComplete: '所有牌已抽取。正在生成您的解读...',

    // 分析中
    analyzingTitle: '正在解读您的塔罗牌',
    analyzingMessage: '牌面正在揭示它们的智慧...',

    // 牌阵位置
    positionSelf: '自己',
    positionSelfMeaning: '您在关系中的当前状态和感受',
    positionPartner: '对方',
    positionPartnerMeaning: '伴侣的当前状态和感受',
    positionPast: '过去',
    positionPastMeaning: '影响关系的过去因素',
    positionPresent: '现在',
    positionPresentMeaning: '当前的状况和动态',
    positionFuture: '未来',
    positionFutureMeaning: '潜在的结果和方向',

    // 报告
    reportTitle: '您的爱情解读',
    reportQuestion: '您的问题：',
    reportOverviewTitle: '解读概览',
    reportCardsTitle: '您的塔罗牌',
    reportAnalysisTitle: '整体分析',
    reportAdviceTitle: '指引与建议',
    reportNewButton: '新的占卜',
    reportPrintButton: '打印解读',
    cardUpright: '正位',
    cardReversed: '逆位',

    // 通用
    languageSwitch: 'English',
    generalReading: '综合爱情解读',

    // 确认对话框
    confirmCancel: '取消',
    confirmDelete: '确定删除',

    // 历史记录
    historyTitle: '占卜历史',
    historyEmpty: '暂无占卜记录',
    historyEmptyDescription: '您的历史占卜记录会显示在这里',
    historyBackButton: '返回首页',
    historyClearButton: '清空所有历史',
    historyClearConfirm: '确定要删除所有占卜历史吗？此操作无法撤销。',
    historyViewButton: '查看历史',
    historyItemDate: '日期',
    historyItemQuestion: '问题',
    historyCachedBadge: '历史占卜',
    historyCachedNotice: '这是从您的历史记录中检索的占卜结果'
  }
};

// 获取当前语言的翻译
export function getTranslation(lang, key) {
  return translations[lang]?.[key] || translations.en[key] || key;
}
