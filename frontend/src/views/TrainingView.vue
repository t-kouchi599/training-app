<template>
  <div class="training-container">
    <h1>トレーニング記録</h1>
    <form @submit.prevent="saveTraining">
      <div>
        <label>日付:</label>
        <input type="date" v-model="date" required />
      </div>
      <div>
        <label>種目:</label>
        <input type="text" v-model="exercise" required />
      </div>
      <div>
        <label>重量 (kg):</label>
        <input type="number" v-model="weight" required />
      </div>
      <div>
        <label>回数:</label>
        <input type="number" v-model="reps" required />
      </div>
      <button type="submit">保存</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTrainingStore } from '@/stores/training'

const store = useTrainingStore()

const date = ref(new Date().toISOString().substr(0, 10))
const exercise = ref('')
const weight = ref(0)
const reps = ref(0)

function saveTraining() {
  store.addRecord({
    date: date.value,
    exercise: exercise.value,
    weight: weight.value,
    reps: reps.value
  })
  alert('保存しました！')

  // 入力初期化
  exercise.value = ''
  weight.value = 0
  reps.value = 0
}
</script>


<style scoped>
.training-container {
  padding: 20px;
  font-size: 18px;
}
.training-container div {
  margin-bottom: 15px;
}
</style>
