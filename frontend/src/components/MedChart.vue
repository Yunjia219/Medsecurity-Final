<template>
  <div ref="chartRef" class="w-full h-full min-h-[400px]"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      nodes: [
        { name: 'Warfarin', category: 0, symbolSize: 50 },
        { name: 'Aspirin', category: 0, symbolSize: 40 },
        { name: 'Metformin', category: 1, symbolSize: 30 },
        { name: 'Atorvastatin', category: 1, symbolSize: 30 },
        { name: 'Clopidogrel', category: 0, symbolSize: 45 }
      ],
      links: [
        { source: 'Warfarin', target: 'Aspirin', label: { show: true, formatter: '高風險' } },
        { source: 'Warfarin', target: 'Clopidogrel', label: { show: true, formatter: '中風險' } },
        { source: 'Aspirin', target: 'Clopidogrel', label: { show: true, formatter: '增加出血' } }
      ]
    })
  }
})

const chartRef = ref(null)
let myChart = null

const initChart = () => {
  if (!chartRef.value) return
  
  myChart = echarts.init(chartRef.value)
  
  const option = {
    title: {
      text: '用藥交互作用網絡圖',
      subtext: '視覺化分析患者處方之潛在衝突',
      top: 'bottom',
      left: 'right',
      textStyle: {
        color: '#212F3D',
        fontSize: 14
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        if (params.dataType === 'node') {
          return `藥物: <b>${params.name}</b><br/>類型: ${params.data.category === 0 ? '抗凝血劑' : '慢性病用藥'}`
        }
        return `衝突: <b>${params.data.source} ↔ ${params.data.target}</b><br/>影響: ${params.data.label.formatter}`
      }
    },
    legend: [
      {
        data: ['高風險藥物', '一般藥物'],
        orient: 'vertical',
        left: 'left',
        textStyle: { color: '#717D7E' }
      }
    ],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: 'Drug Interaction',
        type: 'graph',
        layout: 'force',
        data: props.data.nodes.map(node => ({
          ...node,
          itemStyle: {
            color: node.category === 0 ? '#C0392B' : '#1A5276'
          }
        })),
        links: props.data.links.map(link => ({
          ...link,
          lineStyle: {
            width: 2,
            curveness: 0.1,
            color: '#D5D8DC'
          }
        })),
        categories: [{ name: '高風險藥物' }, { name: '一般藥物' }],
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
          fontSize: 12,
          color: '#212F3D'
        },
        force: {
          repulsion: 300,
          edgeLength: 120
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 6,
            color: '#F39C12'
          }
        }
      }
    ]
  }

  myChart.setOption(option)
}

const handleResize = () => {
  myChart?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  myChart?.dispose()
})

watch(() => props.data, () => {
  initChart()
}, { deep: true })
</script>
