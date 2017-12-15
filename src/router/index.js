import Vue from 'vue'
import Router from 'vue-router'
import Hall from '@/components/hall/Hall'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hall',
      component: Hall
    }
  ]
})
