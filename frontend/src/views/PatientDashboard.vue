<template>
  <div class="min-h-screen bg-med-bg">
    <NavBar />
    
    <main class="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-10">
      <!-- 個人資料概覽 -->
      <div class="bg-white rounded-2xl shadow-sm border border-med-border p-6 md:p-8 mb-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div class="w-24 h-24 rounded-full bg-med-primary-light text-med-primary flex items-center justify-center text-4xl font-bold shadow-inner">
          {{ (user?.name || user?.username || '?').charAt(0).toUpperCase() }}
        </div>
        <div class="flex-1 text-center md:text-left">
          <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
            <h1 class="text-3xl font-bold text-med-text">您好，{{ user?.name || user?.username || '用戶' }}</h1>
            <span class="bg-med-success-light text-med-success-text px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 mx-auto md:mx-0">
              <span class="w-1.5 h-1.5 bg-med-success rounded-full"></span> 帳號安全已驗證
            </span>
          </div>
          <p class="text-med-text-muted text-sm max-w-2xl">
            這是您的跨院用藥安全儀表板。系統已同步您在全台各醫療機構的處方紀錄，並透過區塊鏈技術確保資料的真實性與隱私權。
          </p>
        </div>
        <div class="flex flex-col gap-2 w-full md:w-auto">
          <button class="bg-med-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-med-primary-dark transition-all shadow-md">
            查看數位藥盒
          </button>
          <button class="bg-white text-med-text px-6 py-2.5 rounded-lg text-sm font-medium border border-med-border hover:bg-gray-50 transition-all">
            編輯個人資料
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 左側：用藥明細 -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-2xl shadow-sm border border-med-border overflow-hidden">
            <div class="p-6 border-b border-med-border flex justify-between items-center">
              <h3 class="font-bold text-med-text flex items-center gap-2">
                <span class="text-lg">💊</span> 我的雲端處方清單
              </h3>
              <span class="text-xs text-med-text-muted font-medium">最後同步：10 分鐘前</span>
            </div>

            <div class="p-0">
              <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-gray-400">
                <div class="animate-spin text-3xl mb-4 text-med-primary">⌛</div>
                <p class="text-sm">正在從區塊鏈節點同步您的資料...</p>
              </div>

              <div v-else class="overflow-x-auto">
                <table class="w-full text-left">
                  <thead class="bg-med-bg text-med-text text-xs font-bold uppercase tracking-wider">
                    <tr>
                      <th class="px-6 py-4">藥物名稱</th>
                      <th class="px-6 py-4">服法 / 劑量</th>
                      <th class="px-6 py-4">醫療機構</th>
                      <th class="px-6 py-4">狀態</th>
                    </tr>
                  </thead>
                  <tbody class="text-sm divide-y divide-med-border">
                    <tr v-for="(med, idx) in meds" :key="idx" class="hover:bg-med-primary-light/30 transition-colors">
                      <td class="px-6 py-5">
                        <div class="font-bold text-med-text">{{ med.name }}</div>
                        <div class="text-[10px] text-gray-400 font-mono mt-0.5">{{ med.id }}</div>
                      </td>
                      <td class="px-6 py-5 text-med-text-muted">{{ med.dosage }}</td>
                      <td class="px-6 py-5">
                        <span class="inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold">{{ med.hospital }}</span>
                      </td>
                      <td class="px-6 py-5">
                        <span v-if="med.safe" class="bg-med-success-light text-med-success-text px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 w-fit">
                          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                          安全服用中
                        </span>
                        <span v-else class="bg-med-danger-light text-med-danger px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 w-fit animate-pulse">
                          ⚠️ 存在衝突
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- 右側：警示與健康小幫手 -->
        <div class="space-y-6">
          <!-- 衝突警示卡 -->
          <div class="bg-med-danger text-white rounded-2xl p-6 shadow-lg shadow-med-danger/20">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-3xl">⚠️</span>
              <h3 class="text-xl font-bold">即時衝突提醒</h3>
            </div>
            <p class="text-sm opacity-90 leading-relaxed mb-6">
              偵測到您目前在 <span class="font-bold">台北總院</span> 開立的藥物與 <span class="font-bold">台大醫院</span> 的歷史藥物存在交互作用風險。
            </p>
            <button class="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-xl text-sm transition-all backdrop-blur-sm border border-white/30">
              查看衝突詳情
            </button>
          </div>

          <!-- 健康小幫手 -->
          <div class="bg-white rounded-2xl shadow-sm border border-med-border p-6">
            <h3 class="font-bold text-med-text mb-4 flex items-center gap-2">
              <span class="text-med-primary text-xl">💡</span> 用藥提醒
            </h3>
            <ul class="space-y-4">
              <li class="flex gap-3">
                <div class="w-2 h-2 rounded-full bg-med-info mt-1.5 shrink-0"></div>
                <div>
                  <p class="text-sm font-medium text-med-text">記得隨餐服用 Metformin</p>
                  <p class="text-xs text-med-text-muted">這能減少腸胃不適的副作用。</p>
                </div>
              </li>
              <li class="flex gap-3">
                <div class="w-2 h-2 rounded-full bg-med-warning mt-1.5 shrink-0"></div>
                <div>
                  <p class="text-sm font-medium text-med-text">近期避免攝取葡萄柚</p>
                  <p class="text-xs text-med-text-muted">可能與您的降血脂藥物產生交互作用。</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavBar from '../components/NavBar.vue'

const user = JSON.parse(localStorage.getItem('medsafe_user'))
const loading = ref(true)
const meds = ref([])

onMounted(() => {
  // 模擬載入動畫
  setTimeout(() => {
    meds.value = [
      { id: 'RX-98210', name: 'Warfarin 5mg', dosage: '1pc/day', hospital: '台北總院', safe: false },
      { id: 'RX-77123', name: 'Metformin 500mg', dosage: '2pc/day', hospital: '台大醫院', safe: true },
      { id: 'RX-66041', name: 'Atorvastatin 20mg', dosage: '1pc/night', hospital: '國泰醫院', safe: true },
    ]
    loading.value = false
  }, 800)
})
</script>
