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
        <select v-model="exercise" required>
          <option disabled value="">選択してください</option>
          <option v-for="ex in store.exercises" :key="ex" :value="ex">{{ ex }}</option>
        </select>
        <div class="add-exercise">
          <input type="text" v-model="newExercise" placeholder="新しい種目を追加" />
          <button type="button" @click="addNewExercise">追加</button>
        </div>
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
const newExercise = ref('')

function addNewExercise() {
  if (newExercise.value.trim() === '') {
    alert('種目名を入力してください')
    return
  }
  store.addExercise(newExercise.value)
  exercise.value = newExercise.value
  newExercise.value = ''
}

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
.add-exercise {
  margin-top: 10px;
}
</style>

