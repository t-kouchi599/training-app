<template>
  <div class="history-container">
    <h1>履歴一覧</h1>
    <table>
      <thead>
        <tr>
          <th>日付</th>
          <th>種目</th>
          <th>重量 (kg)</th>
          <th>回数</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in store.history" :key="index">
          <td>{{ record.date }}</td>
          <td>{{ record.exercise }}</td>
          <td>{{ record.weight }}</td>
          <td>{{ record.reps }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTrainingStore } from '@/stores/training'

const store = useTrainingStore()

const history = ref([
  { date: '2024-06-07', exercise: 'ベンチプレス', weight: 100, reps: 5 },
  { date: '2024-06-06', exercise: 'スクワット', weight: 120, reps: 8 },
  { date: '2024-06-05', exercise: 'デッドリフト', weight: 160, reps: 3 }
])
</script>

<style scoped>
.history-container {
  padding: 20px;
}

table {
  border-collapse: collapse;
  width: 100%;
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
