window.mockData = {
  // 測試帳號
  users: [
    { username: 'admin', password: '123', role: 'admin', name: '王大明主任' },
    { username: 'doctor', password: '123', role: 'doctor', name: '李曉美醫師' },
    { username: 'patient01', password: '123', role: 'patient', name: '王大明' },
    { username: 'insurance01', password: '123', role: 'insurance', name: '國泰核保員' }
  ],

  // 管理員端數據
  admin: {
    stats: {
      totalUsers: 4500,
      totalHospitals: 24,
      systemUptime: '99.9%',
      securityAlerts: 0,
      totalDdiRules: 12450,
      aiAnalyticsCount: 8920,
      todayApiCalls: 15620,
      blockchainSyncAmount: '2.4 TB'
    },
    aiTrendData: [450, 590, 820, 710, 950, 1100, 1280],
    ddiRiskLevels: [120, 85, 45, 10],
    medicationCategories: [
      { label: '心血管', value: 450 },
      { label: '神經系統', value: 320 },
      { label: '消化道', value: 210 },
      { label: '抗感染', value: 150 },
      { label: '內分泌', value: 80 }
    ],
    blockchainSyncTrend: [120, 150, 180, 160, 210, 240, 280],
    logs: [
      { time: '10:24:15', user: '李醫師', action: 'AI 交互分析完成', type: 'ai', status: '成功' },
      { time: '09:45:02', user: '系統', action: '新 DDI 規則更新', type: 'rule', status: '成功' },
      { time: '08:30:00', user: '系統', action: 'Blockchain Sync 成功', type: 'blockchain', status: '成功' },
      { time: '07:15:22', user: '系統', action: '保險資料同步完成', type: 'insurance', status: '成功' }
    ],
    systemStatus: {
      apiHealth: 98,
      aiEngine: 95,
      blockchain: 100,
      database: 92
    }
  },

  // 醫師端數據
  doctor: {
    stats: {
      totalPatients: 1250,
      activePrescriptions: 450,
      conflictAlerts: 12,
      safetyRate: 98.5
    },
    prescriptionsByMonth: [65, 59, 80, 81, 56, 55, 40],
    conflictRates: [2.5, 2.1, 3.0, 1.8, 2.4, 1.5, 1.2],
    categoryDistribution: [
      { label: '心血管用藥', value: 300 },
      { label: '糖尿病用藥', value: 250 },
      { label: '抗生素', value: 150 },
      { label: '止痛藥', value: 200 },
      { label: '其他', value: 100 }
    ],
    recentPatients: [
      { id: 'P001', name: '張小泉', status: '安全', lastCheck: '2025-05-20' },
      { id: 'P002', name: '李大維', status: '警告', lastCheck: '2025-05-22' },
      { id: 'P003', name: '陳美花', status: '安全', lastCheck: '2025-05-23' },
      { id: 'P004', name: '劉建國', status: '危險', lastCheck: '2025-05-24' }
    ]
  },

  // 患者端數據
  patient: {
    profile: {
      id: 'patient01',
      name: '王大明',
      age: 72,
      gender: '男',
      avatar: 'https://ui-avatars.com/api/?name=王大明&background=24A15D&color=fff',
      healthSummary: '目前用藥狀況穩定，但需注意血壓藥與抗凝血劑的潛在交互作用。',
      nextAppointment: '2024-06-15'
    },
    stats: {
      safetyScore: 92,
      activeMeds: 6,
      aiChecksToday: 12,
      lastSync: '5 分鐘前'
    },
    safetyTrend: [85, 88, 82, 90, 87, 93, 92],
    medicationCategories: [
      { label: '心血管用藥', value: 3 },
      { label: '降血糖藥', value: 1 },
      { label: '止痛藥', value: 1 },
      { label: '補充品', value: 1 }
    ],
    weeklySafetyRate: [98, 95, 99, 92, 94, 96, 92],
    medications: [
      { id: 1, name: 'Warfarin', zhName: '華法林', dosage: '5mg', freq: '每日一次 (晚)', category: '抗凝血劑', status: '風險', color: 'danger', icon: 'shield-exclamation' },
      { id: 2, name: 'Aspirin', zhName: '阿斯匹靈', dosage: '100mg', freq: '每日一次 (早)', category: '非類固醇消炎藥', status: '風險', color: 'danger', icon: 'shield-exclamation' },
      { id: 3, name: 'Metformin', zhName: '二甲雙胍', dosage: '500mg', freq: '每日兩次 (飯後)', category: '降血糖藥', status: '安全', color: 'success', icon: 'check-circle' },
      { id: 4, name: 'Lisinopril', zhName: '賴諾普利', dosage: '10mg', freq: '每日一次 (早)', category: '降血壓藥', status: '安全', color: 'success', icon: 'check-circle' },
      { id: 5, name: 'Vitamin D3', zhName: '維生素 D3', dosage: '1000IU', freq: '每日一次', category: '營養補充', status: '安全', color: 'success', icon: 'check-circle' },
      { id: 6, name: 'Multivitamin', zhName: '綜合維他命', dosage: '1錠', freq: '每日一次', category: '營養補充', status: '安全', color: 'success', icon: 'check-circle' }
    ],
    ddiAlerts: [
      { 
        id: 'A001', 
        drugs: ['Warfarin', 'Aspirin'], 
        severity: '極高風險', 
        message: '同時服用華法林與阿斯匹靈會顯著增加胃腸道出血風險。', 
        recommendation: '請諮詢李醫師是否需要調整抗血小板藥物劑量。' 
      }
    ],
    aiInsights: [
      { icon: 'clock', text: '您的用藥規律性優於 85% 的用戶，請繼續保持。' },
      { icon: 'info-circle', text: '近期攝取過多葡萄柚可能影響藥物代謝。' },
      { icon: 'calendar-check', text: '下週三有定期回診，系統已為您備份近期安全日誌。' }
    ],
    reminders: [
      { time: '08:00', text: '服用阿斯匹靈、賴諾普利', completed: true },
      { time: '12:00', text: '服用二甲雙胍 (飯後)', completed: false },
      { time: '20:00', text: '服用華法林', completed: false }
    ]
  },

  // 保險端 (insurance.html) 數據 - 進階版
  insurance: {
    stats: {
      activePolicies: 12450,
      claimsProcessed: 892,
      aiRiskAnalysis: 3420,
      premiumDiscounts: '$2.4M',
      coverageHealth: 94.2,
      blockchainVerification: '100%'
    },
    // 年度理賠趨勢 (Line)
    claimsTrend: [65, 59, 80, 81, 56, 55, 72],
    // 保戶風險分析 (Radar)
    riskRadar: [85, 90, 70, 80, 75], // 慢性病, 藥物衝突, 年齡因素, 用藥規律, 回診率
    // 保費折抵統計 (Bar)
    discountsMonthly: [120000, 150000, 140000, 180000, 160000, 210000, 195000],
    // AI 風險預測 (Area)
    aiPredictionTrend: [25, 22, 18, 15, 12, 10, 8], // 預測未來半年出險率降低趨勢
    // 理賠追蹤
    claimsTracking: [
      { id: 'CLM-8821', customer: '王大明', amount: '$1,200', status: 'Approved', statusClass: 'text-turquoise bg-turquoise/10', time: '2小時前', progress: 100 },
      { id: 'CLM-8822', customer: '陳小美', amount: '$4,500', status: 'Processing', statusClass: 'text-yellow-500 bg-yellow-50', time: '5小時前', progress: 65 },
      { id: 'CLM-8823', customer: '李國華', amount: '$850', status: 'AI Reviewing', statusClass: 'text-indigo-500 bg-indigo-50', time: '1天前', progress: 40 },
      { id: 'CLM-8824', customer: '張健', amount: '$2,300', status: 'Pending Documents', statusClass: 'text-gray-500 bg-gray-50', time: '2天前', progress: 20 },
    ],
    // 保障缺口分析
    coverageGaps: [
      { type: '心血管疾病額度不足', customerCount: 450, riskLevel: 'High', recommendation: '建議調增 20% 醫療額度' },
      { type: '藥物衝突高風險群', customerCount: 120, riskLevel: 'Critical', recommendation: '啟動 AI 即時用藥監控專案' },
      { type: '年長保戶長照缺口', customerCount: 890, riskLevel: 'Medium', recommendation: '推出專屬長照附加條款' }
    ],
    topSafeUsers: [
      { name: '王大明', score: 98, discount: '$2,500' },
      { name: '陳小美', score: 97, discount: '$2,300' },
      { name: '李國華', score: 96, discount: '$2,100' }
    ]
  },

  // 全域藥品清單
  allMedications: [
    { id: 1, name: 'Warfarin', zhName: '華法林', category: '抗凝血劑', dosage: '5mg', unit: '錠', stock: 1200, price: 15, status: '正常', location: 'A-01' },
    { id: 2, name: 'Aspirin', zhName: '阿斯匹靈', category: '非類固醇消炎藥', dosage: '100mg', unit: '錠', stock: 2500, price: 5, status: '正常', location: 'A-02' },
    { id: 3, name: 'Metformin', zhName: '二甲雙胍', category: '降血糖藥', dosage: '500mg', unit: '錠', stock: 3000, price: 8, status: '正常', location: 'B-01' },
    { id: 4, name: 'Lisinopril', zhName: '賴諾普利', category: '降血壓藥', dosage: '10mg', unit: '錠', stock: 1500, price: 12, status: '正常', location: 'B-02' }
  ]
};
