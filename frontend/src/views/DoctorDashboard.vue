<template>
  <div class="min-h-screen bg-med-bg">
    <NavBar />
    
    <main class="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-10">
      <!-- 頂部歡迎與動作列 -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <h1 class="text-3xl font-bold text-med-text">醫師工作站</h1>
            <span class="bg-med-primary-light text-med-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Verified MD</span>
          </div>
          <p class="text-med-text-muted text-sm">歡迎回來，今天有 8 位患者待診，其中 2 位存有用藥衝突警示。</p>
        </div>
        <div class="flex gap-3">
          <button class="bg-white text-med-text px-4 py-2.5 rounded-lg text-sm font-medium border border-med-border hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            匯出報表
          </button>
        </div>
      </div>

      <!-- 數據指標 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
        <div class="bg-white rounded-xl border border-med-border shadow-sm p-5 border-l-4 border-l-med-primary">
          <div class="text-xs text-med-text-muted font-medium mb-1">今日門診人數</div>
          <div class="text-2xl font-bold text-med-primary">12</div>
        </div>
        <div class="bg-white rounded-xl border border-med-border shadow-sm p-5 border-l-4 border-l-med-danger">
          <div class="text-xs text-med-text-muted font-medium mb-1">衝突攔截次數</div>
          <div class="text-2xl font-bold text-med-danger">4</div>
        </div>
        <div class="bg-white rounded-xl border border-med-border shadow-sm p-5 border-l-4 border-l-med-success">
          <div class="text-xs text-med-text-muted font-medium mb-1">安全性驗證</div>
          <div class="text-2xl font-bold text-med-success">100%</div>
        </div>
        <div class="bg-white rounded-xl border border-med-border shadow-sm p-5 border-l-4 border-l-med-info">
          <div class="text-xs text-med-text-muted font-medium mb-1">待處理訊息</div>
          <div class="text-2xl font-bold text-med-info">3</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 左側：患者搜尋與處方區域 -->
        <div class="lg:col-span-2 space-y-8">
          <div class="bg-white rounded-2xl shadow-sm border border-med-border overflow-hidden">
            <div class="p-6 border-b border-med-border bg-gray-50/50 flex justify-between items-center">
              <h3 class="font-bold text-med-text">診間病歷調閱</h3>
              <div class="relative">
                <input 
                  v-model="searchId"
                  type="text" 
                  placeholder="輸入患者身分證號..."
                  class="pl-10 pr-4 py-2 border border-med-border rounded-lg text-sm focus:ring-1 focus:ring-med-primary focus:border-med-primary w-64 transition-all"
                >
                <svg class="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
            </div>

            <div class="p-8">
              <div v-if="!patientData" class="text-center py-20 bg-med-bg/30 rounded-xl border border-dashed border-med-border">
                <div class="text-5xl mb-4 text-gray-300">🔎</div>
                <h4 class="text-med-text font-medium mb-1">尚未調閱患者資料</h4>
                <p class="text-med-text-muted text-sm px-10">請於右上方輸入患者身分證字號，系統將即時從區塊鏈網路串聯各院處方紀錄。</p>
              </div>

              <!-- 患者資料與處方列表 -->
              <div v-else class="space-y-6">
                <!-- 患者簡介卡 -->
                <div class="flex items-center gap-6 p-4 bg-med-primary-light/30 rounded-xl border border-med-primary/10">
                  <div class="w-16 h-16 rounded-full bg-med-primary text-white flex items-center justify-center text-2xl font-bold shadow-md">
                    {{ patientData.name.charAt(0) }}
                  </div>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-1">
                    <div><span class="text-[10px] text-gray-400 font-bold uppercase">姓名</span><p class="font-bold text-med-text">{{ patientData.name }}</p></div>
                    <div><span class="text-[10px] text-gray-400 font-bold uppercase">年齡</span><p class="font-bold text-med-text">{{ patientData.age }} 歲</p></div>
                    <div><span class="text-[10px] text-gray-400 font-bold uppercase">過敏史</span><p class="font-bold text-med-danger">無紀錄</p></div>
                    <div><span class="text-[10px] text-gray-400 font-bold uppercase">最後看診</span><p class="font-bold text-med-text">2024/05/18</p></div>
                  </div>
                </div>

                <!-- 交互作用視覺化圖表 -->
                <div class="bg-white border border-med-border rounded-xl p-6 shadow-sm">
                  <h4 class="font-bold text-med-text mb-4 flex items-center gap-2">
                    <span class="w-1 h-4 bg-med-info rounded-full"></span>
                    交互作用視覺化分析 (Network Graph)
                  </h4>
                  <div class="h-[400px]">
                    <MedChart :data="chartData" />
                  </div>
                </div>

                <!-- 處方列表 -->
                <div>
                  <h4 class="font-bold text-med-text mb-4 flex items-center gap-2">
                    <span class="w-1 h-4 bg-med-primary rounded-full"></span>
                    歷史雲端處方 (跨院聯防模式)
                  </h4>
                  <div class="border border-med-border rounded-xl overflow-hidden shadow-sm">
                    <table class="w-full text-left">
                      <thead class="bg-gray-50 text-med-text text-xs font-bold border-b border-med-border">
                        <tr>
                          <th class="px-4 py-3">處方日期</th>
                          <th class="px-4 py-3">藥物名稱</th>
                          <th class="px-4 py-3">劑量</th>
                          <th class="px-4 py-3">開立醫院</th>
                          <th class="px-4 py-3">狀態</th>
                        </tr>
                      </thead>
                      <tbody class="text-sm divide-y divide-med-border bg-white">
                        <tr v-for="(med, idx) in patientData.medications" :key="idx" class="hover:bg-med-bg transition-colors">
                          <td class="px-4 py-3 text-med-text-muted">{{ med.date }}</td>
                          <td class="px-4 py-3 font-medium text-med-text">{{ med.name }}</td>
                          <td class="px-4 py-3">{{ med.dosage }}</td>
                          <td class="px-4 py-3">{{ med.hospital }}</td>
                          <td class="px-4 py-3">
                            <span v-if="med.safe" class="bg-med-success-light text-med-success-text px-2 py-0.5 rounded-full text-[11px] font-bold">安全</span>
                            <span v-else class="bg-med-danger-light text-med-danger px-2 py-0.5 rounded-full text-[11px] font-bold">衝突風險</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右側：衝突預警面板 -->
        <div class="space-y-6">
          <div class="bg-white rounded-2xl shadow-sm border border-med-border p-6">
            <h3 class="font-bold text-med-text mb-6 flex items-center justify-between">
              DDI 智能預警
              <span class="text-[10px] bg-med-info text-white px-2 py-0.5 rounded">AI POWERED</span>
            </h3>
            
            <div v-if="conflicts.length > 0" class="space-y-4">
              <div v-for="(c, i) in conflicts" :key="i" class="p-4 rounded-xl border border-med-danger bg-med-danger-light/20 flex flex-col gap-2">
                <div class="flex items-center gap-2 text-med-danger font-bold text-sm">
                  <span class="animate-pulse">🚫</span> {{ c.level === 'High' ? '高風險衝突' : '中度衝突' }}
                </div>
                <p class="text-xs text-med-text leading-relaxed">
                  <span class="font-bold">{{ c.med1 }}</span> 與 <span class="font-bold">{{ c.med2 }}</span> 同時服用可能導致 <b>{{ c.effect }}</b>。
                </p>
                <div class="flex justify-end gap-2 mt-2">
                  <button class="text-[11px] font-bold text-med-danger border border-med-danger px-3 py-1 rounded hover:bg-med-danger hover:text-white transition-all">刪除衝突藥物</button>
                </div>
              </div>
            </div>

            <div v-else class="py-12 text-center">
              <div class="text-4xl mb-3">✅</div>
              <p class="text-sm text-med-text font-medium">目前無交互作用衝突</p>
              <p class="text-[11px] text-med-text-muted mt-1 px-4">系統已自動掃描跨院處方，目前並未發現任何已知的藥物衝突。</p>
            </div>
          </div>

          <!-- 診間功能快速鍵 -->
          <div class="grid grid-cols-2 gap-4">
            <button class="p-4 bg-med-primary text-white rounded-xl shadow-md hover:translate-y-[-2px] transition-all flex flex-col items-center gap-2">
              <span class="text-2xl">📋</span>
              <span class="text-xs font-bold">開立新處方</span>
            </button>
            <button class="p-4 bg-white text-med-primary border border-med-primary/20 rounded-xl shadow-sm hover:translate-y-[-2px] transition-all flex flex-col items-center gap-2">
              <span class="text-2xl">🔗</span>
              <span class="text-xs font-bold">同步區塊鏈</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import NavBar from '../components/NavBar.vue'
import MedChart from '../components/MedChart.vue'

const searchId = ref('')
const patientData = ref(null)
const conflicts = ref([])

// 計算圖表所需資料
const chartData = computed(() => {
  if (!patientData.value) return { nodes: [], links: [] }
  
  const nodes = patientData.value.medications.map(med => ({
    name: med.name,
    category: med.safe ? 1 : 0,
    symbolSize: med.safe ? 35 : 55
  }))
  
  const links = conflicts.value.map(c => ({
    source: c.med1,
    target: c.med2,
    label: { show: true, formatter: c.effect }
  }))
  
  return { nodes, links }
})

// 模擬資料調閱 (醫師通常輸入 ID 後按 Enter)
onMounted(() => {
  // 延遲載入範例資料，模擬區塊鏈查詢
  setTimeout(() => {
    patientData.value = {
      name: '張家豪',
      age: 68,
      medications: [
        { date: '2024/05/20', name: 'Warfarin 5mg', dosage: '1pc/day', hospital: '台北總院', safe: false },
        { date: '2024/05/15', name: 'Metformin 500mg', dosage: '2pc/day', hospital: '台大醫院', safe: true },
        { date: '2024/05/10', name: 'Atorvastatin 20mg', dosage: '1pc/night', hospital: '診所', safe: true }
      ]
    }
    conflicts.value = [
      { med1: 'Warfarin', med2: 'Aspirin', level: 'High', effect: '嚴重內出血風險' }
    ]
  }, 1000)
})
</script>
