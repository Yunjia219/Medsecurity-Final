window.mockData = {

  // DDI 規則庫（seed 至 Firestore ddi_rules collection）
  ddiRules: [
    { drugA: 'Warfarin',     drugB: 'Aspirin',       severity: '極高風險', effect: '雙重抗凝血，顯著增加胃腸道及顱內出血風險，需嚴密監測 INR 值。',          cssClass: 'bg-red-100 text-danger' },
    { drugA: 'Warfarin',     drugB: 'Amiodarone',    severity: '極高風險', effect: 'Amiodarone 抑制 CYP2C9，使 Warfarin 血中濃度大幅升高，易致嚴重出血。',   cssClass: 'bg-red-100 text-danger' },
    { drugA: 'Warfarin',     drugB: 'Ibuprofen',     severity: '高風險',   effect: 'NSAIDs 抑制血小板並刺激胃黏膜，合用增加消化道出血風險。',               cssClass: 'bg-orange-100 text-warning' },
    { drugA: 'Warfarin',     drugB: 'Fluoxetine',    severity: '高風險',   effect: 'SSRI 抑制 CYP2C9，使 Warfarin 效果增強，出血風險上升，需調整劑量。',     cssClass: 'bg-orange-100 text-warning' },
    { drugA: 'Warfarin',     drugB: 'Omeprazole',    severity: '中等風險', effect: 'Omeprazole 抑制 CYP2C19，可能使 Warfarin 血中濃度輕度升高，需監測 INR。', cssClass: 'bg-yellow-100 text-yellow-700' },
    { drugA: 'Aspirin',      drugB: 'Clopidogrel',   severity: '高風險',   effect: '雙重抗血小板療法顯著增加出血風險，僅在特定心血管適應症下使用。',         cssClass: 'bg-orange-100 text-warning' },
    { drugA: 'Rivaroxaban',  drugB: 'Aspirin',       severity: '極高風險', effect: '新型口服抗凝血劑合併抗血小板藥物，大出血風險極高，避免常規合用。',       cssClass: 'bg-red-100 text-danger' },
    { drugA: 'Metformin',    drugB: 'Furosemide',    severity: '中等風險', effect: '利尿劑可能加重腎功能負擔，增加 Metformin 蓄積及乳酸中毒風險。',         cssClass: 'bg-yellow-100 text-yellow-700' },
    { drugA: 'Glipizide',    drugB: 'Fluoxetine',    severity: '高風險',   effect: 'SSRI 可能增強磺醯尿素類降血糖效果，導致嚴重低血糖，需加強血糖監測。',   cssClass: 'bg-orange-100 text-warning' },
    { drugA: 'Digoxin',      drugB: 'Amiodarone',    severity: '極高風險', effect: 'Amiodarone 使 Digoxin 血中濃度升高 50-100%，易發生洋地黃中毒（心律不整、噁心）。', cssClass: 'bg-red-100 text-danger' },
    { drugA: 'Digoxin',      drugB: 'Furosemide',    severity: '高風險',   effect: '利尿劑引起低鉀血症，低鉀狀態使心肌對 Digoxin 毒性敏感度增加。',         cssClass: 'bg-orange-100 text-warning' },
    { drugA: 'Metoprolol',   drugB: 'Amiodarone',    severity: '高風險',   effect: '兩者皆減慢心跳傳導，合用可能引起嚴重心跳過慢或心搏停止。',             cssClass: 'bg-orange-100 text-warning' },
    { drugA: 'Lisinopril',   drugB: 'Spironolactone',severity: '高風險',   effect: 'ACE 抑制劑合併保鉀利尿劑易造成高鉀血症，嚴重時可引起致命性心律不整。', cssClass: 'bg-orange-100 text-warning' },
    { drugA: 'Atorvastatin', drugB: 'Amiodarone',    severity: '高風險',   effect: 'Amiodarone 抑制 CYP3A4，使 Statin 血中濃度上升，橫紋肌溶解症風險增加。', cssClass: 'bg-orange-100 text-warning' },
    { drugA: 'Colchicine',   drugB: 'Atorvastatin',  severity: '高風險',   effect: '兩者皆可能引起肌肉毒性，合用時橫紋肌溶解症風險顯著升高。',             cssClass: 'bg-orange-100 text-warning' },
    { drugA: 'Fluoxetine',   drugB: 'Lorazepam',     severity: '中等風險', effect: 'SSRI 可能增強苯二氮平類鎮靜效果，導致過度嗜睡與認知功能下降。',         cssClass: 'bg-yellow-100 text-yellow-700' },
    { drugA: 'Levothyroxine',drugB: 'Calcium Carbonate', severity: '中等風險', effect: '鈣片與甲狀腺素結合形成不溶性複合物，降低 Levothyroxine 吸收率，需間隔 4 小時服用。', cssClass: 'bg-yellow-100 text-yellow-700' },
    { drugA: 'Metoprolol',   drugB: 'Valsartan',     severity: '中等風險', effect: '乙型阻斷劑合併 ARB 可能造成血壓過低，老年患者需特別監測站立性低血壓。', cssClass: 'bg-yellow-100 text-yellow-700' },
    { drugA: 'Alendronate',  drugB: 'Calcium Carbonate', severity: '中等風險', effect: '鈣片會干擾雙磷酸鹽吸收，Alendronate 需空腹服用，至少間隔 30 分鐘再補鈣。', cssClass: 'bg-yellow-100 text-yellow-700' },
    { drugA: 'Donepezil',    drugB: 'Lorazepam',     severity: '高風險',   effect: '膽鹼酯酶抑制劑的認知改善效果可能被 BZD 的中樞抑制作用拮抗，失智症患者應避免合用。', cssClass: 'bg-orange-100 text-warning' }
  ],

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
      { id: 'P004', name: '劉建國', status: '危險', lastCheck: '2025-05-24' },
      { id: 'P001', name: '張小泉', status: '安全', lastCheck: '2025-05-20' },
      { id: 'P002', name: '李大維', status: '警告', lastCheck: '2025-05-22' },
      { id: 'P003', name: '陳美花', status: '安全', lastCheck: '2025-05-23' }
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

  // 保險端數據
  insurance: {
    stats: {
      activePolicies: 12450,
      claimsProcessed: 892,
      aiRiskAnalysis: 3420,
      premiumDiscounts: '$2.4M',
      coverageHealth: 94.2,
      blockchainVerification: '100%'
    },
    claimsTrend: [65, 59, 80, 81, 56, 55, 72],
    riskRadar: [85, 90, 70, 80, 75],
    discountsMonthly: [120000, 150000, 140000, 180000, 160000, 210000, 195000],
    aiPredictionTrend: [25, 22, 18, 15, 12, 10, 8],
    claimsTracking: [
      { id: 'CLM-8821', customer: '王大明', amount: '$1,200', status: 'Approved', statusClass: 'text-turquoise bg-turquoise/10', time: '2小時前', progress: 100 },
      { id: 'CLM-8822', customer: '陳小美', amount: '$4,500', status: 'Processing', statusClass: 'text-yellow-500 bg-yellow-50', time: '5小時前', progress: 65 },
      { id: 'CLM-8823', customer: '李國華', amount: '$850', status: 'AI Reviewing', statusClass: 'text-indigo-500 bg-indigo-50', time: '1天前', progress: 40 },
      { id: 'CLM-8824', customer: '張健', amount: '$2,300', status: 'Pending Documents', statusClass: 'text-gray-500 bg-gray-50', time: '2天前', progress: 20 },
    ],
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
    // 抗凝血劑
    { id: 1,  name: 'Warfarin',       zhName: '華法林',       category: '抗凝血劑',         dosage: '5mg',    unit: '錠', stock: 1200, price: 15,  status: '正常', location: 'A-01' },
    { id: 2,  name: 'Clopidogrel',    zhName: '氯吡格雷',     category: '抗血小板藥',       dosage: '75mg',   unit: '錠', stock: 900,  price: 45,  status: '正常', location: 'A-03' },
    { id: 3,  name: 'Rivaroxaban',    zhName: '利伐沙班',     category: '抗凝血劑',         dosage: '20mg',   unit: '錠', stock: 600,  price: 120, status: '正常', location: 'A-04' },
    // 非類固醇消炎藥 / 止痛藥
    { id: 4,  name: 'Aspirin',        zhName: '阿斯匹靈',     category: '非類固醇消炎藥',   dosage: '100mg',  unit: '錠', stock: 2500, price: 5,   status: '正常', location: 'A-02' },
    { id: 5,  name: 'Ibuprofen',      zhName: '布洛芬',       category: '非類固醇消炎藥',   dosage: '400mg',  unit: '錠', stock: 1800, price: 8,   status: '正常', location: 'A-05' },
    { id: 6,  name: 'Acetaminophen',  zhName: '乙醯胺酚',     category: '止痛退燒藥',       dosage: '500mg',  unit: '錠', stock: 5000, price: 3,   status: '正常', location: 'A-06' },
    // 降血糖藥
    { id: 7,  name: 'Metformin',      zhName: '二甲雙胍',     category: '降血糖藥',         dosage: '500mg',  unit: '錠', stock: 3000, price: 8,   status: '正常', location: 'B-01' },
    { id: 8,  name: 'Glipizide',      zhName: '格列吡嗪',     category: '降血糖藥',         dosage: '5mg',    unit: '錠', stock: 1200, price: 18,  status: '正常', location: 'B-02' },
    { id: 9,  name: 'Insulin Glargine', zhName: '長效胰島素', category: '胰島素',           dosage: '100U/mL', unit: '支', stock: 400,  price: 380, status: '正常', location: 'B-03' },
    { id: 10, name: 'Sitagliptin',    zhName: '西他列汀',     category: '降血糖藥',         dosage: '100mg',  unit: '錠', stock: 800,  price: 85,  status: '正常', location: 'B-04' },
    // 降血壓藥
    { id: 11, name: 'Lisinopril',     zhName: '賴諾普利',     category: '降血壓藥',         dosage: '10mg',   unit: '錠', stock: 1500, price: 12,  status: '正常', location: 'C-01' },
    { id: 12, name: 'Amlodipine',     zhName: '氨氯地平',     category: '鈣離子阻斷劑',     dosage: '5mg',    unit: '錠', stock: 2000, price: 22,  status: '正常', location: 'C-02' },
    { id: 13, name: 'Metoprolol',     zhName: '美托洛爾',     category: '乙型阻斷劑',       dosage: '50mg',   unit: '錠', stock: 1600, price: 16,  status: '正常', location: 'C-03' },
    { id: 14, name: 'Valsartan',      zhName: '纈沙坦',       category: '降血壓藥',         dosage: '80mg',   unit: '錠', stock: 1100, price: 35,  status: '正常', location: 'C-04' },
    { id: 15, name: 'Furosemide',     zhName: '呋塞米',       category: '利尿劑',           dosage: '40mg',   unit: '錠', stock: 900,  price: 6,   status: '正常', location: 'C-05' },
    // 降血脂藥
    { id: 16, name: 'Atorvastatin',   zhName: '阿托伐他汀',   category: '降血脂藥',         dosage: '20mg',   unit: '錠', stock: 2200, price: 28,  status: '正常', location: 'D-01' },
    { id: 17, name: 'Rosuvastatin',   zhName: '瑞舒伐他汀',   category: '降血脂藥',         dosage: '10mg',   unit: '錠', stock: 1800, price: 42,  status: '正常', location: 'D-02' },
    // 心臟用藥
    { id: 18, name: 'Amiodarone',     zhName: '胺碘酮',       category: '抗心律不整藥',     dosage: '200mg',  unit: '錠', stock: 500,  price: 65,  status: '正常', location: 'D-03' },
    { id: 19, name: 'Digoxin',        zhName: '地高辛',       category: '強心劑',           dosage: '0.25mg', unit: '錠', stock: 700,  price: 12,  status: '正常', location: 'D-04' },
    { id: 20, name: 'Spironolactone', zhName: '螺內酯',       category: '保鉀利尿劑',       dosage: '25mg',   unit: '錠', stock: 850,  price: 10,  status: '正常', location: 'D-05' },
    // 腸胃藥
    { id: 21, name: 'Omeprazole',     zhName: '奧美拉唑',     category: '質子幫浦抑制劑',   dosage: '20mg',   unit: '膠囊', stock: 3500, price: 18, status: '正常', location: 'E-01' },
    { id: 22, name: 'Pantoprazole',   zhName: '潘托拉唑',     category: '質子幫浦抑制劑',   dosage: '40mg',   unit: '錠', stock: 2000, price: 22,  status: '正常', location: 'E-02' },
    // 骨科 / 痛風
    { id: 23, name: 'Allopurinol',    zhName: '別嘌醇',       category: '降尿酸藥',         dosage: '100mg',  unit: '錠', stock: 1300, price: 8,   status: '正常', location: 'F-01' },
    { id: 24, name: 'Colchicine',     zhName: '秋水仙素',     category: '痛風用藥',         dosage: '0.5mg',  unit: '錠', stock: 600,  price: 25,  status: '注意', location: 'F-02' },
    { id: 25, name: 'Alendronate',    zhName: '阿崙膦酸',     category: '骨質疏鬆用藥',     dosage: '70mg',   unit: '錠', stock: 400,  price: 55,  status: '正常', location: 'F-03' },
    // 神經精神科
    { id: 26, name: 'Fluoxetine',     zhName: '氟西汀',       category: '抗憂鬱藥',         dosage: '20mg',   unit: '膠囊', stock: 700, price: 35,  status: '正常', location: 'G-01' },
    { id: 27, name: 'Lorazepam',      zhName: '勞拉西泮',     category: '鎮靜安眠藥',       dosage: '1mg',    unit: '錠', stock: 500,  price: 12,  status: '管制', location: 'G-02' },
    { id: 28, name: 'Donepezil',      zhName: '多奈哌齊',     category: '失智症用藥',       dosage: '5mg',    unit: '錠', stock: 350,  price: 95,  status: '正常', location: 'G-03' },
    // 甲狀腺 / 其他
    { id: 29, name: 'Levothyroxine',  zhName: '左旋甲狀腺素', category: '甲狀腺用藥',       dosage: '50mcg',  unit: '錠', stock: 900,  price: 15,  status: '正常', location: 'H-01' },
    { id: 30, name: 'Calcium Carbonate', zhName: '碳酸鈣',   category: '鈣質補充劑',       dosage: '500mg',  unit: '錠', stock: 2800, price: 4,   status: '正常', location: 'H-02' }
  ],

  // -------------------------------------------------------------------
  // 藥物交互作用網狀圖資料 (D3.js)
  // -------------------------------------------------------------------
  graphData: {
    nodes: [
      { id: "Warfarin", name_en: "Warfarin", name_zh: "華法林", hospital: "台大醫院", conflict: true, dosage: "5mg", freq: "每日一次" },
      { id: "Aspirin", name_en: "Aspirin", name_zh: "阿斯匹靈", hospital: "長庚醫院", conflict: true, dosage: "100mg", freq: "每日一次" },
      { id: "Amiodarone", name_en: "Amiodarone", name_zh: "胺碘酮", hospital: "成大醫院", conflict: true, dosage: "200mg", freq: "每日一次" },
      { id: "Metformin", name_en: "Metformin", name_zh: "二甲雙胍", hospital: "榮總醫院", conflict: false, dosage: "500mg", freq: "每日兩次" },
      { id: "Lisinopril", name_en: "Lisinopril", name_zh: "賴諾普利", hospital: "台大醫院", conflict: false, dosage: "10mg", freq: "每日一次" },
      { id: "Atorvastatin", name_en: "Atorvastatin", name_zh: "阿托伐他汀", hospital: "馬偕醫院", conflict: false, dosage: "20mg", freq: "睡前一次" }
    ],
    links: [
      { source: "Warfarin", target: "Aspirin", conflict: true, effect: "高風險：增加嚴重的胃腸道出血與內出血風險。", recommendation: "避免合併使用，或需嚴密監測 INR 值與出血徵兆。" },
      { source: "Warfarin", target: "Amiodarone", conflict: true, effect: "高風險：顯著提升藥物血中濃度，易導致抗凝效果過強。", recommendation: "建議劑量減半，並密切監測凝血指標。" }
    ],
    scenarios: {
      A: ["Warfarin", "Aspirin", "Metformin", "Amiodarone"],
      B: ["Metformin", "Lisinopril", "Atorvastatin"]
    }
  }
};
