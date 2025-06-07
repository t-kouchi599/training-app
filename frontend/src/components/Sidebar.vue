<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li v-for="route in menuRoutes" :key="route.path">
          <router-link :to="route.path">{{ route.meta.title }}</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'

// ルーターから全ルート取得
const router = useRouter()

// サイドバーに出したいルートを抽出
const menuRoutes = router.getRoutes().filter(route => {
  return route.meta?.title && route.path !== '/login'
})
</script>


<style scoped>
.sidebar {
  position: fixed;
  top: 60px; /* ヘッダーの高さに合わせる */
  left: 0;
  width: 200px;
  height: calc(100% - 60px);
  background-color: #eeeeee;
  padding: 20px;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin-bottom: 15px;
}

.sidebar a {
  text-decoration: none;
  color: #333;
}

.sidebar a.router-link-active {
  font-weight: bold;
}
</style>
