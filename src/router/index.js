import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Terraform Modules',
    component: () => import('../views/tf-modules.vue')
  },
  {
    path: '/tf-modules',
    name: 'Terraform Modules',
    component: () => import('../views/tf-modules.vue')
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
