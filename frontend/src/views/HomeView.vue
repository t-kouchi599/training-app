<template>
  <div class="home-container">
    <!-- 入力欄 -->
    <div class="body-weight">
      <label>日付:</label>
      <input type="date" v-model="inputDate" />

      <label>体重:</label>
      <input type="text" :value="inputWeight.toFixed(1)" step="0.1" min="0" max="999.9" pattern="^\\d+(\\.\\d)?$" style="width: 80px;"
        @blur="normalize" />
      <button @click="adjustWeight(-0.1)">ー</button>
      <button @click="adjustWeight(0.1)">＋</button>
      <button style="width: 60px;" @click="saveWeight">保存</button>
      <button style="width: 60px;" >削除</button>
    </div>

    <!-- 追加：期間フィルタ -->
    <label>開始日:</label>
    <input type="date" v-model="startDate" />

    <label>終了日:</label>
    <input type="date" v-model="endDate" />

    <!-- グラフ -->
    <div class="chart-area">
      <BodyWeightChart :startDate="startDate" :endDate="endDate" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTrainingStore } from '@/stores/training'
import BodyWeightChart from '@/components/BodyWeightChart.vue'
import { getTodayString } from '@/utils/date'
import { format } from 'date-fns'

const store = useTrainingStore()
const today = new Date()
const oneMonthAgo = new Date()

oneMonthAgo.setMonth(today.getMonth() - 1)

// 日付と体重の入力用
const inputDate = ref<string>(getTodayString())
const inputWeight = ref<number>(70.0)
const startDate = ref(format(oneMonthAgo, 'yyyy-MM-dd'))
const endDate = ref(format(today, 'yyyy-MM-dd'))
const prevStartDate = ref(startDate.value)
const prevEndDate = ref(endDate.value)

watch(startDate, (newVal) => {
  if (new Date(newVal) > new Date(endDate.value)) {
    alert('開始日は終了日より前にしてください')
    startDate.value = prevStartDate.value
  } else {
    prevStartDate.value = newVal
  }
})

watch(endDate, (newVal) => {
  if (new Date(startDate.value) > new Date(newVal)) {
    alert('開始日は終了日より前にしてください')
    endDate.value = prevEndDate.value
  } else {
    prevEndDate.value = newVal
  }
})

// 保存処理
function saveWeight() {
  store.addBodyWeight(inputWeight.value)
  alert('体重を保存しました！')
}

// +,-ボタン押下時の処理
function adjustWeight(amount: number) {
  let updated = inputWeight.value + amount

  // 小数第1位に丸める
  updated = parseFloat(updated.toFixed(1))

  inputWeight.value = updated
}

// フォーカス外れ時に正規化（小数1桁、最大999.9、.0付け）
function normalize(event: Event) {
  const target = event.target as HTMLInputElement
  let value = target.value.trim()

  // 整数3桁 + 小数1桁のパターンのみ許可
  const allowed = /^\d{1,3}(\.\d)?$/

  let num = parseFloat(value)

  // 数値でなければ 0.0 に
  if (isNaN(num)) {
    num = 0.0
    inputWeight.value = 0.0
    target.value = '0.0'
    return
  }

  // 999.9 を上限に補正
  if (num > 999.9) {
    num = 999.9
  }

  // フォーマット：整数なら整数表示、小数ありなら小数1桁表示
  if (allowed.test(value)) {
    inputWeight.value = num
    target.value = value.includes('.') ? num.toFixed(1) : value
  } else {
    const fixed = parseFloat(num.toFixed(1))
    inputWeight.value = fixed
    target.value = fixed.toFixed(1)
  }
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
  margin-bottom: 15px;
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
