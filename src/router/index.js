import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'
import Login from '../views/Login.vue'
import Module from '../views/Module.vue'
import Session from '../views/Session.vue'

Vue.use(VueRouter)
async function beforeEnter (_to, _from, next) {
  if (!store.getters['user/isAuthenticated']) {
    await store.dispatch('user/fetchUser')
  }
  if (store.getters['user/isAuthenticated']) {
    next()
    return
  }
  next('/login')
 }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter
  },
  {
    path: '/module/:id',
    name: 'Module',
    component: Module,
    beforeEnter
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/session/:sessionId/do/:exerciseId',
    name: 'Session',
    component: Session,
    beforeEnter
  }
]

const router = new VueRouter({
  routes
})

export default router
