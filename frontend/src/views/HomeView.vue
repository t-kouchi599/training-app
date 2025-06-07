<template>
  <div class="home-container">
    <div class="body-weight">
      <h2>体重管理</h2>
      <div>
        <label>今日の体重:</label>
        <input type="number" v-model="inputWeight" />
        <button @click="saveWeight">保存</button>
      </div>
    </div>

    <div class="chart-area">
      <h2>体重推移</h2>
      <BodyWeightChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTrainingStore } from '@/stores/training'
import BodyWeightChart from '@/components/BodyWeightChart.vue'

const store = useTrainingStore()
const inputWeight = ref(70)

function saveWeight() {
  store.addBodyWeight(inputWeight.value)
  alert('体重を保存しました！')
}
</script>

<style scoped>
.home-container {
  padding: 20px;
}

.summary {
  margin-top: 30px;
}

.body-weight {
  margin-bottom: 30px;
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
