import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import Cityhs from '@/pages/Cityhs'
import Number1 from '@/pages/Number1' 
import Smallmid from '@/pages/Smallmid'
import Work from '@/pages/Work'
import Klines from '@/pages/Klines'
import Login from '@/pages/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/number',
      name: 'Number1',
      component: Number1
    },
    {
      path: '/cityhs',
      name: 'Cityhs',
      component: Cityhs
    },
    {
      path: '/smallmid',
      name: 'Smallmid',
      component: Smallmid
    },
    {
      path: '/work',
      name: 'Work',
      component: Work
    },
    {
      path: '/klines',
      name: 'Klines',
      component: Klines
    }
  ]
})
