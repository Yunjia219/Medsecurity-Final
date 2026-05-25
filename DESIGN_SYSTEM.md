# MedSafe-Chain 視覺設計系統 (Design System)

這份文件定義了 MedSafe-Chain 專案的核心設計規範，旨在確保跨醫院用藥安全監測平台的專業性、一致性與易用性。

---

## 一、品牌色彩定義

### 1. 核心主色 (Primary)
- **顏色代碼**: `#1A5276` (醫療深藍)
- **使用情境**: 導覽列、主要按鈕、頁面標題、重要標頭。
- **品牌意涵**: 專業、信任、區塊鏈技術的穩定性。
- **Tailwind**: `med-primary`

### 2. 輔色與結構色彩
- **頁面背景**: `#F4F6F7` (`med-bg`) - 減少純白帶來的視覺疲勞。
- **文字主色**: `#212F3D` (`med-text`) - 深炭灰，優於純黑。
- **邊框顏色**: `#D5D8DC` (`med-border`) - 細緻分割線。

### 3. 語意警示色彩系統
| 類別 | 顏色代碼 | Tailwind Class | 搭配文字色 |
| :--- | :--- | :--- | :--- |
| 危險/錯誤 | `#C0392B` | `med-danger` | 白色 |
| 警告/注意 | `#F39C12` | `med-warning` | `#7A4E06` |
| 成功/安全 | `#27AE60` | `med-success` | 白色 |
| 資訊/提示 | `#3498DB` | `med-info` | 白色 |

---

## 二、通用元件規格

### 1. 按鈕 (Buttons)
- **主要按鈕**: `bg-med-primary text-white hover:bg-med-primary-dark`
- **危險按鈕**: `bg-med-danger text-white hover:opacity-90`
- **次要按鈕**: `bg-white text-med-text border border-med-border`

### 2. 卡片 (Cards)
- 圓角: `rounded-xl` (12px)
- 陰影: `shadow-sm` 或 `shadow-med`
- 內距: 統一使用 `p-6`

### 3. 表單 (Forms)
- 輸入框聚焦顏色: `focus:ring-med-primary`
- 標籤文字大小: `text-sm font-medium`

---

## 三、無障礙設計 (Accessibility)
- **對比度**: 所有文字與背景對比度符合 WCAG AA 標準 (≥ 4.5:1)。
- **警告色**: 在 `med-warning-light` 背景上必須使用 `med-warning-text`。
- **狀態標記**: 關鍵訊息除了色彩外，必須搭配圖示 (Icon) 輔助識別。

---

## 四、響應式斷點 (RWD)
- **手機 (md 以下)**: `max-width: 768px`，內距 `px-4`，數據卡片 2 欄。
- **桌機 (lg 以上)**: `max-width: 1024px`，內距 `px-6`，數據卡片 4 欄。
