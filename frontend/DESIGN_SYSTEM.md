# MedSafe-Chain 視覺設計系統 (Design System)

本文件記錄了 MedSafe-Chain 專案的品牌色彩、通用元件設計規格與使用規範，旨在確保系統視覺的一致性與專業感。

## 一、品牌色彩定義

### 1. 核心色彩 (Brand Colors)
- **主色調 (Primary)**: `#1A5276` (med-primary)
  - 使用情境：導覽列、主要按鈕、頁面標題、重要標頭。
  - 品牌意涵：專業、信任、醫療科技的嚴謹感。
- **文字主色 (Text)**: `#212F3D` (med-text)
  - 使用情境：所有主要內文、表格內容。
- **頁面背景 (Background)**: `#F4F6F7` (med-bg)
  - 理由：極淺灰色可降低長時間使用系統時的視覺疲勞。

### 2. 警示色彩 (Semantic Colors)
- **危險 (Danger)**: `#C0392B` (med-danger) - 用於高風險衝突、刪除、錯誤。
- **警告 (Warning)**: `#F39C12` (med-warning) - 用於注意提醒、中風險標籤。
- **成功 (Success)**: `#27AE60` (med-success) - 用於安全確認、功能成功。

## 二、通用元件設計規格

### 1. 卡片元件 (Card)
- 圓角：`rounded-xl` (12px)
- 內距：`p-6`
- 標題列：下方有 1px 邊框 (`border-b border-med-border`)。

### 2. 按鈕系統 (Buttons)
- **Primary**: 主色背景，白色文字，Hover 時加深。
- **Danger**: 紅色背景，白色文字。
- **Success**: 綠色背景，白色文字。
- **Secondary**: 白色背景，深色文字，帶有淺灰邊框。

### 3. 狀態標籤 (Badges)
- 採用「淺色背景 + 深色文字」的藥丸形圓角 (`rounded-full`) 設計，提升可讀性。

## 三、無障礙規範 (Accessibility)
- 警告色背景 (#FDEBD0) 嚴禁使用白色文字，必須使用 `#7A4E06`。
- 所有互動元件在 Focus 時必須具備環狀提示 (`focus:ring-1`)。
