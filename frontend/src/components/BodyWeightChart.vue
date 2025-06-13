<template>
  <div style="width: 100%; height: 50vh;">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTrainingStore } from '@/stores/training'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js'
import { Line } from 'vue-chartjs'
import 'chartjs-adapter-date-fns'
import type { TooltipItem, ChartOptions } from 'chart.js'
import { format } from 'date-fns'

// Chart.js コンポーネント登録
ChartJS.register(
  LineElement,
  PointElement,
  TimeScale,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
)

// Props（親コンポーネントから受け取る）
const props = defineProps<{
  startDate: string
  endDate: string
}>()

const store = useTrainingStore()

// フィルタ済みの体重履歴（期間内）
const filteredHistory = computed(() => {
  const start = new Date(props.startDate)
  const end = new Date(props.endDate)

  return store.bodyWeightHistory.filter(item => {
    const d = new Date(item.date)
    return d >= start && d <= end
  })
})

// グラフデータ
const chartData = computed(() => {
  const labels = filteredHistory.value.map(item => item.date)
  const data = filteredHistory.value.map(item => item.weight)

  return {
    labels,
    datasets: [
      {
        label: '体重 (kg)',
        data,
        borderColor: '#42a5f5',
        fill: false
      }
    ]
  }
})

// グラフオプション
const chartOptions = computed<ChartOptions<'line'>>(() => {
  const weights = filteredHistory.value.map(item => item.weight)

  if (weights.length === 0) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        tooltip: {
          callbacks: {
            title: (tooltipItems: TooltipItem<'line'>[]) => {
              const rawDate = tooltipItems[0].label
              const formatted = format(new Date(rawDate), 'yyyy年MM月dd日')
              return `日付: ${formatted}`
            },
            label: (tooltipItem: TooltipItem<'line'>) => {
              const weight = tooltipItem.formattedValue
              return `体重: ${weight} kg`
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }

  const minWeight = Math.min(...weights)
  const maxWeight = Math.max(...weights)

  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest' as const,
      intersect: false
    },
    plugins: {
      legend: { display: true },
        tooltip: {
          callbacks: {
            title: (tooltipItems: TooltipItem<'line'>[]) => {
              const x = tooltipItems[0].parsed.x
              if (!x) return ''
              const date = typeof x === 'number' ? new Date(x) : x
              const formatted = format(date, 'yyyy年MM月dd日')
              return `日付: ${formatted}`
            },
            label: (tooltipItem: TooltipItem<'line'>) => {
              const weight = tooltipItem.formattedValue
              return `体重: ${weight} kg`
            }
          }
        }
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'day' as const,
          displayFormats: {
            day: 'yyyy-MM-dd'
          }
        },
        title: {
          display: true,
          text: '年月日'
        }
      },
      y: {
        min: Math.floor(minWeight - 10),
        max: Math.ceil(maxWeight + 10),
        beginAtZero: false,
        title: {
          display: true,
          text: '体重 (kg)'
        }
      }
    }
  }
})
</script>

