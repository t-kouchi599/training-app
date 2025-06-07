<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li><router-link to="/home">ホーム</router-link></li>
        <li><router-link to="/training">トレーニング記録</router-link></li>
        <li><router-link to="/history">履歴一覧</router-link></li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
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
