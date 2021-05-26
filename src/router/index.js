import { createRouter, createWebHashHistory } from 'vue-router'
// import Login from '../views/Login/index.vue'

const routes = [
  {
    path: '/',
    redirect:'login'    // 重定向
  },
  {
    path: '/login',
    name: 'Login',
    component:() => import('../views/Login/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
