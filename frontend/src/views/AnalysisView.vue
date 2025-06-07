<template>
  <div class="analysis-container">
    <div class="chart-area">
      <h2>最大重量グラフ</h2>
      <MaxWeightChart />
    </div>

    <div class="summary">
      <h2>種目ごとの最大重量</h2>
      <table>
        <thead>
          <tr>
            <th>種目</th>
            <th>最大重量 (kg)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(weight, exercise) in store.maxWeightsByExercise" :key="exercise">
            <td>{{ exercise }}</td>
            <td>{{ weight }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useTrainingStore } from '@/stores/training'
import MaxWeightChart from '@/components/MaxWeightChart.vue'

const store = useTrainingStore()
</script>

<style scoped>
.analysis-container {
  padding: 20px;
}

.chart-area {
  margin-top: 20px;
}

.summary {
  margin-top: 30px;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 10px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #1976d2;
  color: white;
}
</style>

