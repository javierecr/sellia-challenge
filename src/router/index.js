import ActiveConversation from '@/components/chat/ActiveConversation.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'chats/:id',
        name: 'Chats',
        component: ActiveConversation,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
