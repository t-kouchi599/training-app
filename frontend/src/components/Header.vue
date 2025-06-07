<template>
  <header class="app-header">
    <div class="logo">{{ pageTitle }}</div>

    <nav class="nav-links">
      <router-link to="/login">ログアウト</router-link>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const pageTitle = ref(route.meta.title)

// ページが切り替わるたびにtitleを更新
watch(route, () => {
  pageTitle.value = route.meta.title
})
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1976d2;
  color: white;
  padding: 10px 20px;
  box-sizing: border-box;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.nav-links a {
  color: white;
  margin-left: 20px;
  text-decoration: none;
}

.nav-links a.router-link-active {
  text-decoration: underline;
}
</style>
