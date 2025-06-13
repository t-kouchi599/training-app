import { defineStore } from 'pinia'

export interface TrainingRecord {
  id: number
  date: string
  exercise: string
  weight: number
  reps: number
}

let nextId = 1

export const useTrainingStore = defineStore('training', {
  state: () => ({
    history: [] as TrainingRecord[],
    exercises: ['ベンチプレス', 'スクワット', 'デッドリフト'] as string[],
    bodyWeight: 70,
    bodyWeightHistory: [] as { date: string; weight: number }[]
  }),
  getters: {
    totalRecords(state) {
      return state.history.length
    },
    maxWeightsByExercise(state): Record<string, number> {
      const result: Record<string, number> = {}
      state.history.forEach(record => {
        if (!result[record.exercise] || record.weight > result[record.exercise]) {
          result[record.exercise] = record.weight
        }
      })
      return result
    }
  },
  actions: {
    addRecord(record: Omit<TrainingRecord, 'id'>) {
      this.history.push({ id: nextId++, ...record })
    },
    deleteRecord(id: number) {
      this.history = this.history.filter((r) => r.id !== id)
    },
    updateRecord(updated: TrainingRecord) {
      const index = this.history.findIndex((r) => r.id === updated.id)
      if (index !== -1) {
        this.history[index] = updated
      }
    },
    addExercise(newExercise: string) {
      if (!this.exercises.includes(newExercise)) {
        this.exercises.push(newExercise)
      }
    },
    addBodyWeight(newWeight: number) {
      const today = new Date().toISOString().substr(0, 10)
      this.bodyWeightHistory.push({ date: today, weight: newWeight })
    },
    updateBodyWeight(newWeight: number) {
      this.bodyWeight = newWeight
    },
    async fetchBodyWeightHistory(start: string, end: string) {
      const res = await fetch(`http://localhost:3000/api/body-weights?start=${start}&end=${end}`)
      if (res.ok) {
        const data = await res.json()
        this.bodyWeightHistory = data
      } else {
        console.error('体重履歴取得失敗')
      }
    }
  }
})
