<template>
  <div class="login-container">
    <h1>ログイン</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">ユーザーID:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">パスワード:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">ログイン</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')

function handleLogin() {
  console.log('ログイン試行:', username.value, password.value)
  alert('ログインボタン押されました（仮実装）')
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
