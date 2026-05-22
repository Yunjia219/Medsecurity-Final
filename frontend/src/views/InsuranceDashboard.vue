<template>
  <div class="min-h-screen bg-med-bg">
    <NavBar />
    
    <main class="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-10">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-med-border pb-6">
        <div>
          <h1 class="text-3xl font-bold text-med-text">保險核保分析中心</h1>
          <p class="text-med-text-muted text-sm mt-1">基於區塊鏈數據的跨院用藥風險評估與趨勢監控。</p>
        </div>
        <div class="flex gap-3">
          <button class="bg-white text-med-text px-4 py-2 rounded-lg text-sm font-medium border border-med-border hover:bg-gray-50 transition-all flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            下載月度報表
          </button>
        </div>
      </div>

      <!-- 核心統計數據 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl border border-med-border shadow-sm p-6 border-t-4 border-t-med-primary">
          <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">本月審核總數</p>
          <p class="text-3xl font-black text-med-text">{{ stats?.total_patients || 0 }} <span class="text-xs font-normal text-gray-400">件</span></p>
        </div>
        <div class="bg-white rounded-xl border border-med-border shadow-sm p-6 border-t-4 border-t-med-success">
          <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">安全領藥數 (Green)</p>
          <p class="text-3xl font-black text-med-success">{{ stats?.green_light_count || 0 }}</p>
        </div>
        <div class="bg-white rounded-xl border border-med-border shadow-sm p-6 border-t-4 border-t-med-danger">
          <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">衝突攔截數 (Red)</p>
          <p class="text-3xl font-black text-med-danger">{{ stats?.red_light_count || 0 }}</p>
        </div>
        <div class="bg-white rounded-xl border border-med-border shadow-sm p-6 border-t-4 border-t-med-info">
          <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">核保預防率</p>
          <p class="text-3xl font-black text-med-info">12.5%</p>
        </div>
      </div>

      <!-- ECharts 視覺化區塊 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <!-- 趨勢圖 -->
        <div class="bg-white rounded-2xl shadow-sm border border-med-border p-6">
          <h3 class="font-bold text-med-text mb-6 flex items-center gap-2">
            <span class="w-1 h-4 bg-med-primary rounded-full"></span>
            跨院用藥安全趨勢 (年度)
          </h3>
          <div ref="trendChartRef" class="w-full h-[300px]"></div>
        </div>

        <!-- 圓餅圖 -->
        <div class="bg-white rounded-2xl shadow-sm border border-med-border p-6">
          <h3 class="font-bold text-med-text mb-6 flex items-center gap-2">
            <span class="w-1 h-4 bg-med-warning rounded-full"></span>
            當前投保人風險分佈
          </h3>
          <div ref="riskChartRef" class="w-full h-[300px]"></div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 列表 -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-sm border border-med-border overflow-hidden">
            <div class="p-6 border-b border-med-border bg-gray-50/50 flex justify-between items-center">
              <h3 class="font-bold text-med-text">待核保高風險案件</h3>
              <span class="text-xs text-med-danger font-bold">需人工介入審核</span>
            </div>
            <table class="w-full text-left">
              <thead class="bg-med-bg text-med-text text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th class="px-6 py-4">保戶 ID</th>
                  <th class="px-6 py-4">風險等級</th>
                  <th class="px-6 py-4">跨院重複領藥</th>
                  <th class="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-med-border">
                <tr v-for="(caseItem, idx) in cases" :key="idx" class="hover:bg-med-primary-light/20 transition-colors">
                  <td class="px-6 py-5 font-bold text-med-text">{{ caseItem.id }}</td>
                  <td class="px-6 py-5">
                    <span :class="caseItem.riskClass" class="px-3 py-1 rounded-full text-[10px] font-bold">
                      {{ caseItem.risk }}
                    </span>
                  </td>
                  <td class="px-6 py-5">
                    <span v-if="caseItem.duplicate" class="text-med-danger font-bold flex items-center gap-1">
                      <span class="w-1.5 h-1.5 bg-med-danger rounded-full animate-pulse"></span> YES
                    </span>
                    <span v-else class="text-gray-400">NO</span>
                  </td>
                  <td class="px-6 py-5 text-right">
                    <button class="bg-med-primary text-white px-3 py-1.5 rounded text-[10px] font-bold shadow-sm hover:bg-med-primary-dark transition-all">啟動區塊鏈核驗</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 側邊欄工具 -->
        <div class="space-y-6">
          <div class="bg-gradient-to-br from-med-primary to-med-primary-dark rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div class="relative z-10">
              <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                <span class="text-2xl">🛡️</span> 智慧防詐系統
              </h3>
              <p class="text-sm opacity-80 leading-relaxed mb-6">
                系統已自動比對 <b>台北總院</b> 與 <b>台中分院</b> 之電子處方，發現 3 筆異常重疊之理賠申請。
              </p>
              <div class="bg-white/10 p-4 rounded-xl border border-white/20">
                <div class="flex justify-between text-[10px] mb-2 uppercase font-bold tracking-widest">
                  <span>AI 偵測準確率</span>
                  <span>94.2%</span>
                </div>
                <div class="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                  <div class="bg-med-success w-[94%] h-full"></div>
                </div>
              </div>
            </div>
            <div class="absolute right-[-20px] bottom-[-20px] text-white/5 text-8xl font-black italic">AI</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import * as echarts from 'echarts'
import NavBar from '../components/NavBar.vue'

const stats = ref(null)
const trendChartRef = ref(null)
const riskChartRef = ref(null)
let trendChart = null
let riskChart = null

const cases = ref([
  { id: 'CUST-8821', risk: 'Critical', riskClass: 'bg-med-danger-light text-med-danger', duplicate: true },
  { id: 'CUST-7712', risk: 'Medium', riskClass: 'bg-med-warning-light text-med-warning-text', duplicate: false },
  { id: 'CUST-6604', risk: 'Low', riskClass: 'bg-med-success-light text-med-success-text', duplicate: false },
  { id: 'CUST-5591', risk: 'Critical', riskClass: 'bg-med-danger-light text-med-danger', duplicate: true },
])

const initTrendChart = (data) => {
  if (!trendChartRef.value) return
  trendChart = echarts.init(trendChartRef.value)
  trendChart.setOption({
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.months,
      axisLabel: { color: '#717D7E' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { formatter: '{value}%', color: '#717D7E' },
      splitLine: { lineStyle: { type: 'dashed' } }
    },
    series: [{
      name: '用藥安全率',
      type: 'line',
      smooth: true,
      data: data.monthly_safe_rate,
      itemStyle: { color: '#1A5276' },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(26, 82, 118, 0.3)' },
          { offset: 1, color: 'rgba(26, 82, 118, 0.05)' }
        ])
      }
    }]
  })
}

const initRiskChart = (data) => {
  if (!riskChartRef.value) return
  riskChart = echarts.init(riskChartRef.value)
  riskChart.setOption({
    tooltip: { trigger: 'item' },
    legend: { bottom: '0', left: 'center', textStyle: { color: '#717D7E' } },
    series: [{
      name: '風險分佈',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
      label: { show: false },
      emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold' } },
      data: data.risk_distribution.map((item, idx) => ({
        ...item,
        itemStyle: { color: idx === 2 ? '#C0392B' : (idx === 1 ? '#F39C12' : '#27AE60') }
      }))
    }]
  })
}

onMounted(async () => {
  try {
    const response = await axios.get('/api/insurance/stats')
    stats.value = response.data
    initTrendChart(response.data)
    initRiskChart(response.data)
  } catch (err) {
    console.error('Failed to fetch insurance stats:', err)
  }
  
  window.addEventListener('resize', () => {
    trendChart?.resize()
    riskChart?.resize()
  })
})

onUnmounted(() => {
  trendChart?.dispose()
  riskChart?.dispose()
})
</script>
