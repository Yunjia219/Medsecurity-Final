# MedSafe-Chain 跨醫院多重用藥衝突與副作用網頁預警系統

## 隊伍資訊
- 隊伍名稱：漂亮北極熊
- 作品名稱：MedSafe-Chain 跨醫院多重用藥衝突與副作用網頁預警系統
- 主題領域：醫療資訊 / 長期照護
- 核心 FHIR Resources：MedicationRequest、Bundle、Patient

---

## 專案簡介
本系統針對台灣高齡化社會中，長輩跨院就醫導致的多重用藥衝突問題，建立一個即時預警平台。系統整合四個使用者端口（病患家屬、醫師、管理員、保險公司），透過模擬數據展示 DDI 藥物交互作用比對與 FHIR 整合流程。

---

## 系統架構 (純前端展示版)
本專案目前為**純前端 (Standalone Frontend)** 實作，所有資料與邏輯均在瀏覽器端運行。

```text
前端介面 (HTML5 / Vue 3 / Tailwind CSS)
        ↕
模擬數據引擎 (js/mockData.js)
        ↕
本地存儲 (localStorage)
```

---

## 使用者角色與功能

| 角色 | 帳號 | 密碼 | 主要功能 |
|------|------|------|----------|
| 病患家屬/用戶端 | patient01 | 123 | 模擬跨院 FHIR 處方載入、查看 DDI 警告 |
| 臨床醫師端 | doctor | 123 | 模擬病患藥歷、ECharts 關係網狀圖、開立處方 |
| 系統管理員 | admin | 123 | 模擬藥典管理、DDI 規則庫維護 |
| 保險核保員 | insurance01 | 123 | 查看理賠統計圖表、AI 風險分析 |

---

## 如何執行
本版本不需要 Node.js 或 Python 環境。

1. 下載專案後，直接使用瀏覽器開啟 `index.html`。
2. 系統會自動導向 `login.html` 進行登入。
3. 登入後即可操作各端口的功能。

---

## 技術特點 (展示)
1. **Mock Data 驅動**：完整的 CRUD 模擬邏輯，不需後端即可展示完整流程。
2. **ECharts / D3.js 視覺化**：動態展示藥物交互作用網狀圖。
3. **響應式設計**：完美適配桌面與行動端裝置。

---

## 專案檔案結構
```text
medsafe-chain/
├── index.html       # 載入與跳轉入口
├── login.html       # 登入介面
├── patient.html     # 患者端儀表板
├── dashboard.html   # 醫師端儀表板
├── admin.html       # 管理員端
├── insurance.html   # 保險端
├── js/
│   ├── auth.js      # 登入驗證邏輯
│   ├── mockData.js  # 模擬數據庫
│   └── utils.js     # 工具函式
├── README.md        # 專案說明
└── DESIGN_SYSTEM.md # 設計規範
```

