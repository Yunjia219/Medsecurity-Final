<template>
  <div class="min-h-screen bg-med-bg p-8 space-y-12 font-sans text-med-text">
    <header class="border-b-2 border-med-primary pb-4 flex justify-between items-end">
      <div>
        <h1 class="text-3xl font-bold text-med-primary">MedSafe-Chain 組件參考手冊</h1>
        <p class="text-med-text-muted mt-2">設計師與工程師的 UI 標準指南</p>
      </div>
      <div class="text-xs text-med-text-muted">Version 1.0.0</div>
    </header>

    <!-- 1. 導覽列 (NavBar) -->
    <section>
      <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
        <span class="w-2 h-6 bg-med-primary rounded-full"></span> 1. 導覽列 (NavBar)
      </h2>
      <nav class="bg-med-primary shadow-md h-16 px-6 flex items-center justify-between rounded-xl">
        <div class="flex items-center gap-4">
          <span class="text-white font-bold text-xl tracking-tight">MedSafe-Chain</span>
          <span class="text-white/60 text-sm hidden md:block border-l border-white/20 pl-4">醫療專業版</span>
        </div>
        <div class="flex items-center gap-6">
          <div class="flex flex-col items-end">
            <span class="text-white text-xs font-medium">王小明 醫師</span>
            <span class="text-white/60 text-[10px]">台北總院</span>
          </div>
          <button class="text-white border border-white/40 px-3 py-1.5 rounded-lg text-xs hover:bg-white/10 transition-all font-medium">登出</button>
        </div>
      </nav>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- 2. 按鈕系統 -->
      <section class="space-y-4">
        <h2 class="text-xl font-bold">2. 按鈕系統 (Buttons)</h2>
        <div class="flex flex-wrap gap-4">
          <button class="bg-med-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-med-primary-dark transition-colors duration-150">主要按鈕</button>
          <button class="bg-med-danger text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-colors duration-150">危險按鈕</button>
          <button class="bg-med-success text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-colors duration-150">成功按鈕</button>
          <button class="bg-white text-med-text px-5 py-2.5 rounded-lg text-sm font-medium border border-med-border hover:bg-med-bg transition-colors duration-150">次要按鈕</button>
        </div>
        <div class="flex items-center gap-4">
          <button class="text-med-primary text-sm font-medium hover:underline transition-all">文字連結按鈕</button>
          <button disabled class="bg-med-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium opacity-70 cursor-not-allowed">
            <span class="inline-block animate-spin mr-2">⏳</span> 處理中...
          </button>
        </div>
      </section>

      <!-- 3. 表單元件 -->
      <section class="space-y-4">
        <h2 class="text-xl font-bold">3. 表單元件 (Forms)</h2>
        <div class="space-y-4 bg-white p-6 rounded-xl border border-med-border">
          <div>
            <label class="block text-sm font-medium text-med-text mb-1.5">患者姓名 <span class="text-med-danger ml-1">*</span></label>
            <input type="text" placeholder="請輸入姓名" class="w-full border border-med-border rounded-lg px-4 py-2.5 text-med-text text-sm bg-white focus:outline-none focus:ring-1 focus:ring-med-primary focus:border-med-primary placeholder-gray-400 transition-all">
          </div>
          <div>
            <label class="block text-sm font-medium text-med-text mb-1.5">醫療院所</label>
            <select class="w-full border border-med-border rounded-lg px-4 py-2.5 text-med-text text-sm bg-white focus:outline-none focus:ring-1 focus:ring-med-primary focus:border-med-primary transition-all">
              <option>台北榮民總醫院</option>
              <option>國立台灣大學醫學院附設醫院</option>
            </select>
          </div>
          <p class="text-med-danger text-xs mt-1">⚠️ 欄位驗證錯誤範例</p>
        </div>
      </section>
    </div>

    <!-- 4. 數據總覽卡片 (Metric Cards) -->
    <section>
      <h2 class="text-xl font-bold mb-4">4. 數據總覽 (Metric Cards)</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white rounded-xl border border-med-border shadow-sm p-5 flex flex-col gap-1 border-l-4 border-l-med-primary">
          <span class="text-sm text-gray-500">歷史處方總數</span>
          <p class="text-3xl font-bold text-med-primary">1,280</p>
        </div>
        <div class="bg-white rounded-xl border border-med-border shadow-sm p-5 flex flex-col gap-1 border-l-4 border-l-med-success">
          <span class="text-sm text-gray-500">用藥安全性</span>
          <p class="text-3xl font-bold text-med-success">98.5%</p>
        </div>
        <div class="bg-white rounded-xl border border-med-border shadow-sm p-5 flex flex-col gap-1 border-l-4 border-l-med-danger">
          <span class="text-sm text-gray-500">偵測衝突數</span>
          <p class="text-3xl font-bold text-med-danger">12</p>
        </div>
        <div class="bg-white rounded-xl border border-med-border shadow-sm p-5 flex flex-col gap-1 border-l-4 border-l-med-warning">
          <span class="text-sm text-gray-500">待評估報告</span>
          <p class="text-3xl font-bold text-med-warning">5</p>
        </div>
      </div>
    </section>

    <!-- 5. 警示橫幅與標籤 (Alerts & Badges) -->
    <section class="space-y-6">
      <h2 class="text-xl font-bold">5. 警示與狀態 (Alerts & Badges)</h2>
      <div class="flex flex-wrap gap-3 mb-6">
        <span class="bg-med-danger-light text-med-danger text-xs font-semibold px-3 py-1 rounded-full">高風險衝突</span>
        <span class="bg-med-warning-light text-med-warning-text text-xs font-semibold px-3 py-1 rounded-full">中度警示</span>
        <span class="bg-med-success-light text-med-success-text text-xs font-semibold px-3 py-1 rounded-full">安全確認</span>
        <span class="bg-med-info-light text-med-info text-xs font-semibold px-3 py-1 rounded-full">系統通知</span>
        <span class="bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full">已封存</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-med-danger text-white rounded-xl p-6 flex items-start gap-4 shadow-lg shadow-med-danger/20">
          <div class="text-3xl animate-pulse">🚫</div>
          <div>
            <h3 class="text-xl font-bold">嚴重用藥交互作用 (Level 1)</h3>
            <p class="text-sm opacity-90 mt-1">偵測到 Warfarin 與 Aspirin 同時處方，可能增加內出血風險，請立即調整。</p>
          </div>
        </div>
        <div class="bg-med-warning-light border-1.5 border-med-warning rounded-xl p-6 flex items-start gap-4">
          <div class="text-3xl">⚠️</div>
          <div>
            <h3 class="text-lg font-bold text-med-warning-text">藥物過敏警告</h3>
            <p class="text-sm text-med-warning-text opacity-90 mt-1">患者病歷紀錄顯示對 Penicillin 有過敏史，請再次確認處方內容。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Modal 範例 -->
    <section>
      <h2 class="text-xl font-bold mb-4">6. 彈出視窗 (Modal Overlay)</h2>
      <div class="bg-black/10 rounded-2xl p-8 flex justify-center">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
          <div class="flex items-center justify-between p-6 border-b border-med-border">
            <h3 class="text-lg font-bold text-med-text">確認發放處方</h3>
            <button class="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          <div class="p-6 space-y-4">
            <p class="text-sm text-med-text-muted leading-relaxed">
              您即將簽署並發送此電子處方箋至區塊鏈節點。一旦完成，此紀錄將無法被竄改，請確認內容無誤。
            </p>
            <div class="bg-med-bg p-4 rounded-lg">
              <div class="text-[10px] text-gray-400 uppercase font-bold">交易雜湊碼</div>
              <div class="text-xs font-mono text-med-primary break-all">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</div>
            </div>
          </div>
          <div class="flex gap-3 justify-end p-6 border-t border-med-border bg-gray-50">
            <button class="bg-white text-med-text px-4 py-2 rounded-lg text-sm border border-med-border">取消</button>
            <button class="bg-med-primary text-white px-4 py-2 rounded-lg text-sm">確認傳送</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 本組件僅作為視覺規範展示，不包含互動邏輯
</script>
