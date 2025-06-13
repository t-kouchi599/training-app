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
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

// Chart.js コンポーネント登録
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend)

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
const chartOptions = computed(() => {
  const weights = filteredHistory.value.map(item => item.weight)

  if (weights.length === 0) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true }
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
    plugins: {
      legend: { display: true }
    },
    scales: {
      y: {
        min: Math.floor(minWeight - 10),
        max: Math.ceil(maxWeight + 10),
        beginAtZero: false
      }
    }
  }
})
</script>

