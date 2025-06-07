<script setup lang="ts">
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div>
    <!-- パスが /login 以外の時だけ表示 -->
    <Header v-if="route.path !== '/login'" />
    <Sidebar v-if="route.path !== '/login'" />

    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.content {
  padding-top: 60px;
  padding-left: 240px;
}
</style>
