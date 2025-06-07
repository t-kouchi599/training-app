import { defineStore } from 'pinia'

export interface TrainingRecord {
  date: string
  exercise: string
  weight: number
  reps: number
}

export const useTrainingStore = defineStore('training', {
  state: () => ({
    history: [] as TrainingRecord[]
  }),
  actions: {
    addRecord(record: TrainingRecord) {
      this.history.push(record)
    }
  }
})
