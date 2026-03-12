import { createRouter, createWebHashHistory, createWebHistory, type RouterHistory } from 'vue-router'

let history: RouterHistory
if (import.meta.env.VITE_PATH_MODE === 'hash') {
  history = createWebHashHistory(import.meta.env.VITE_BASE_PATH)
} else {
  history = createWebHistory(import.meta.env.VITE_BASE_PATH)
}
const router = createRouter({
  history,
  routes: [],
})
router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string)
    ? `${to.meta.title} | ${import.meta.env.VITE_APP_NAME}`
    : import.meta.env.VITE_APP_NAME
  next()
})

export default router
