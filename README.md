# MedSafe-Chain 跨醫院多重用藥衝突與副作用網頁預警系統

## 隊伍資訊
- 隊伍名稱：（待填入）
- 作品名稱：MedSafe-Chain 跨醫院多重用藥衝突與副作用網頁預警系統
- 主題領域：醫療資訊 / 長期照護
- 核心 FHIR Resources：MedicationRequest、Bundle、Patient

---

## 專案簡介
本系統針對台灣高齡化社會中，長輩跨院就醫導致的多重用藥衝突問題，建立一個符合 HL7 FHIR 國際標準的即時預警平台。系統整合四個使用者端口（病患家屬、醫師、管理員、保險公司），透過 DDI 藥物交互作用比對引擎，在病患服藥前即時偵測潛在衝突並發出警告。

---

## 系統架構

```text
前端 (Vue 3 + Tailwind CSS)
        ↕ HTTP / FHIR Bundle JSON
後端中繼閘道 (Python FastAPI + ngrok)
        ↕ RESTful API
HAPI FHIR Server (https://hapi.fhir.org/baseR4)
```

---

## 使用者角色與功能

| 角色 | 帳號 | 密碼 | 主要功能 |
|------|------|------|----------|
| 病患家屬/用戶端 | patient01 | patient123 | 匯入跨院 FHIR 處方、查看 DDI 紅綠燈警告 |
| 臨床醫師端 | doctor01 | doctor123 | 查詢病患藥歷、ECharts 關係網狀圖、開立新處方 |
| 系統管理員 | admin01 | admin123 | 管理藥典清單、維護 DDI 規則庫 |
| 保險核保員 | insurance01 | insurance123 | 查看去識別化統計圖表、發放外溢保費 |

---

## 核心 FHIR Resources 說明

### MedicationRequest
此 resource 用於記錄每筆處方開立紀錄，包含 `medicationCodeableConcept`（藥物代碼）、`subject`（病患參照）、`requester`（開立醫師）、`dosageInstruction`（劑量指示）。

### Bundle
此 resource 用於將多筆 `MedicationRequest` 打包成一個交易單元，一次性上傳至 HAPI FHIR Server，確保資料傳輸的完整性與原子性。

### Patient
此 resource 作為病患身份識別的主體，`MedicationRequest` 透過 `subject.reference` 關聯至特定的 Patient Resource。

---

## Demo 操作流程

### 用戶端 Demo（DDI 警告展示）
1. 用 `patient01` / `patient123` 登入。
2. 點擊「一鍵匯入跨院處方（FHIR Bundle）」。
3. 觀察系統將資料上傳至 HAPI FHIR Server。
4. 系統自動比對 DDI，畫面出現**紅色脈衝警告橫幅**。
5. 查看衝突藥物詳情（例如：Warfarin × Aspirin）。

### 醫師端 Demo（ECharts 網狀圖展示）
1. 用 `doctor01` / `doctor123` 登入。
2. 點擊「載入示範病患 A（有衝突）」。
3. 觀察 **ECharts 關係網狀圖**，紅線連接衝突藥物，綠線連接安全藥物。
4. 懸停在紅線上查看衝突副作用與建議處置。
5. 點擊「載入示範病患 B（安全）」觀察全綠線圖表。

### 管理員端 Demo
1. 用 `admin01` / `admin123` 登入。
2. 展示藥典清單管理（新增/編輯/刪除）。
3. 展示 DDI 規則庫維護功能，調整嚴重程度標籤。

### 保險端 Demo
1. 用 `insurance01` / `insurance123` 登入。
2. 觀察「年度用藥安全率折線圖」與「保戶風險分佈圓餅圖」。
3. 對符合資格之保戶點擊「發放優惠券」，觀察總發放金額即時更新。

---

## 如何執行

### 環境需求
- Python 3.10 以上
- Node.js 18 以上
- ngrok 帳號（免費方案即可）

### 後端啟動步驟
```bash
cd backend
pip install -r requirements.txt
python main.py
```
啟動後終端機會印出 **ngrok 公開網址**，複製該網址備用。

### 前端啟動步驟
```bash
cd frontend
npm install
npm run dev
```
開啟瀏覽器至 `http://localhost:5173`

### 外網存取
後端啟動時會自動產生 ngrok 網址。將前端 `vite.config.js` 的 proxy target 改為此 ngrok 網址，評審即可直接透過外網存取完整功能。

---

## 技術亮點
1. **HL7 FHIR R4 標準實作**：完整的 Bundle + MedicationRequest 資源上傳與讀取。
2. **DDI 比對引擎**：15 組高風險藥對即時比對，毫秒級回應。
3. **ECharts 動態視覺化**：force layout 關係網狀圖，紅綠線直覺呈現衝突關係。
4. **四端口角色分離**：獨立登入驗證，各端口功能完全隔離，確保資訊安全。

---

## 專案檔案結構
```text
medsafe-chain/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.js
│       ├── App.vue
│       ├── router/
│       │   └── index.js
│       ├── views/
│       │   ├── Login.vue
│       │   ├── PatientDashboard.vue
│       │   ├── DoctorDashboard.vue
│       │   ├── AdminDashboard.vue
│       │   └── InsuranceDashboard.vue
│       └── components/
│           ├── NavBar.vue
│           ├── AlertBanner.vue
│           └── MedChart.vue
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── data/
│       ├── users.json
│       ├── ddi_rules.json
│       └── medications.json
├── README.md
└── LEARNING_LOG.md
```
