import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import QuizResultsView from '@/views/QuizResultsView.vue'
import AuthenticationView from '@/views/AuthenticationView.vue'
import QuizResultView from '@/views/QuizResultView.vue'
import CategoryView from '@/views/CategoryView.vue'
import QuizView from '@/views/QuizView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/quiz-results',
      name: 'quiz-results',
      component: QuizResultsView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthenticationView
    },
    {
      path: '/quiz-results/:userId/:quizResultId',
      name: 'quiz-result',
      component: QuizResultView
    },
    {
      path: '/:categoryId',
      name: 'category',
      component: CategoryView
    },
    {
      path: '/:categoryId/:quizId',
      name: 'quiz',
      component: QuizView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: { name: 'home' }
    },
  ]
})

export default router
