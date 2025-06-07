<template>
  <div>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTrainingStore } from '@/stores/training'
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend)

const store = useTrainingStore()

const chartData = computed(() => {
  const labels = store.bodyWeightHistory.map(item => item.date)
  const data = store.bodyWeightHistory.map(item => item.weight)

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

const chartOptions = {
  responsive: true,
  plugins: { legend: { display: true } },
  scales: { y: { beginAtZero: true } }
}
</script>
