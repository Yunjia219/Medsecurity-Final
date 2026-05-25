<template>
  <div class="min-h-screen bg-med-bg">
    <NavBar />
    
    <main class="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-10">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-med-border pb-6">
        <div>
          <h1 class="text-3xl font-bold text-med-text">系統管理後台</h1>
          <p class="text-med-text-muted text-sm mt-1">監控區塊鏈節點狀態與用藥安全性統計資料。</p>
        </div>
        <div class="flex gap-3">
          <button class="bg-med-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-med-primary-dark transition-all shadow-md flex items-center gap-2">
            <span>⚙️</span> 系統設定
          </button>
        </div>
      </div>

      <!-- 核心統計數據 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div class="bg-white rounded-xl border border-med-border shadow-sm p-6 flex flex-col items-center">
          <span class="text-xs text-gray-400 font-bold uppercase mb-2 tracking-widest">活躍節點數</span>
          <p class="text-4xl font-black text-med-primary">24</p>
          <span class="text-[10px] text-med-success font-bold mt-2">↑ 2 from last month</span>
        </div>
        <div class="bg-white rounded-xl border border-med-border shadow-sm p-6 flex flex-col items-center">
          <span class="text-xs text-gray-400 font-bold uppercase mb-2 tracking-widest">跨院交易量 (TPS)</span>
          <p class="text-4xl font-black text-med-info">15.2</p>
          <span class="text-[10px] text-med-info-light bg-med-info px-2 py-0.5 rounded-full mt-2">Normal Range</span>
        </div>
        <div class="bg-white rounded-xl border border-med-border shadow-sm p-6 flex flex-col items-center">
          <span class="text-xs text-gray-400 font-bold uppercase mb-2 tracking-widest">今日攔截衝突</span>
          <p class="text-4xl font-black text-med-danger">18</p>
          <span class="text-[10px] text-med-danger bg-med-danger-light px-2 py-0.5 rounded-full mt-2 font-bold italic">Urgent Review</span>
        </div>
        <div class="bg-white rounded-xl border border-med-border shadow-sm p-6 flex flex-col items-center">
          <span class="text-xs text-gray-400 font-bold uppercase mb-2 tracking-widest">系統健康度</span>
          <p class="text-4xl font-black text-med-success">99.9%</p>
          <span class="text-[10px] text-med-success-text mt-2 font-bold">Stable</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 系統日誌 -->
        <div class="bg-white rounded-2xl shadow-sm border border-med-border overflow-hidden">
          <div class="p-6 border-b border-med-border flex justify-between items-center bg-gray-50/50">
            <h3 class="font-bold text-med-text">區塊鏈同步日誌 (Node Sync)</h3>
            <button class="text-xs text-med-primary font-bold hover:underline">查看完整日誌</button>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="i in 5" :key="i" class="flex gap-4 p-3 hover:bg-med-bg rounded-lg transition-colors border-l-2 border-l-med-primary">
                <div class="text-xs font-mono text-gray-400 mt-0.5">14:2{{i}}:12</div>
                <div>
                  <p class="text-sm font-medium text-med-text">Block #1,290,{{i}}82 Confirmed</p>
                  <p class="text-[11px] text-med-text-muted italic">Transaction hash: 0x{{i}}a2...{{i}}b7</p>
                </div>
                <div class="ml-auto">
                  <span class="bg-med-success-light text-med-success-text px-2 py-0.5 rounded text-[10px] font-bold">SUCCESS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 使用者權限管理 -->
        <div class="bg-white rounded-2xl shadow-sm border border-med-border overflow-hidden">
          <div class="p-6 border-b border-med-border bg-gray-50/50 flex justify-between items-center">
            <h3 class="font-bold text-med-text">待處理角色審核</h3>
            <span class="bg-med-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3 待審</span>
          </div>
          <div class="p-6">
            <table class="w-full text-left">
              <thead class="text-[11px] text-gray-400 font-black uppercase tracking-widest">
                <tr>
                  <th class="pb-4">申請人</th>
                  <th class="pb-4">申請角色</th>
                  <th class="pb-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-med-border">
                <tr v-for="(req, idx) in ['陳醫師 (長庚)', '林管理員 (台大)', '王專員 (南山)']" :key="idx" class="group">
                  <td class="py-4 font-bold text-med-text">{{ req }}</td>
                  <td class="py-4 text-med-text-muted">{{ idx % 2 === 0 ? '執業醫師' : '機構管理員' }}</td>
                  <td class="py-4 text-right">
                    <div class="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button class="bg-med-success text-white px-3 py-1 rounded text-xs">核准</button>
                      <button class="bg-med-danger text-white px-3 py-1 rounded text-xs">拒絕</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
</script>
