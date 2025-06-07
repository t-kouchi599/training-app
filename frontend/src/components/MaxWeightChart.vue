<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTrainingStore } from '@/stores/training'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { Bar } from 'vue-chartjs'

// Chart.jsのプラグイン登録
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const store = useTrainingStore()

// グラフ用データ整形
const chartData = computed(() => {
  const labels = Object.keys(store.maxWeightsByExercise)
  const data = Object.values(store.maxWeightsByExercise)

  return {
    labels,
    datasets: [
      {
        label: '最大重量 (kg)',
        data,
        backgroundColor: '#42a5f5'
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: true }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}
</script>

<style scoped>
</style>
