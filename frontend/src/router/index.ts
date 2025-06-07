import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import TrainingView from '@/views/TrainingView.vue'
import HistoryView from '@/views/HistoryView.vue'


const routes = [
  { path: '/login', name: 'login', component: LoginView, meta: { title: 'ログイン' } },
  { path: '/home', name: 'home', component: HomeView, meta: { title: 'ホーム' } },
  { path: '/training', name: 'training', component: TrainingView, meta: { title: 'トレーニング記録' } },
  { path: '/history', name: 'history', component: HistoryView, meta: { title: '履歴一覧' } }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
