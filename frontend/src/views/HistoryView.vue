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
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in store.history" :key="record.id">
          <template v-if="editingId === record.id">
            <!-- 編集モード -->
            <td><input type="date" v-model="editDate" /></td>
            <td><input type="text" v-model="editExercise" /></td>
            <td><input type="number" v-model="editWeight" /></td>
            <td><input type="number" v-model="editReps" /></td>
            <td>
              <button @click="saveEdit(record.id)">保存</button>
              <button @click="cancelEdit()">キャンセル</button>
            </td>
          </template>
          <template v-else>
            <!-- 通常モード -->
            <td>{{ record.date }}</td>
            <td>{{ record.exercise }}</td>
            <td>{{ record.weight }}</td>
            <td>{{ record.reps }}</td>
            <td>
              <button @click="startEdit(record)">編集</button>
              <button @click="store.deleteRecord(record.id)">削除</button>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTrainingStore } from '@/stores/training'
import type { TrainingRecord } from '@/stores/training'


const store = useTrainingStore()

const editingId = ref<number | null>(null)
const editDate = ref<string>('')
const editExercise = ref<string>('')
const editWeight = ref<number>(0)
const editReps = ref<number>(0)

function startEdit(record: TrainingRecord) {
  editingId.value = record.id
  editDate.value = record.date
  editExercise.value = record.exercise
  editWeight.value = record.weight
  editReps.value = record.reps
}

function saveEdit(id: number) {
  store.updateRecord({
    id,
    date: editDate.value,
    exercise: editExercise.value,
    weight: editWeight.value,
    reps: editReps.value
  })
  editingId.value = null
}

function cancelEdit() {
  editingId.value = null
}
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
