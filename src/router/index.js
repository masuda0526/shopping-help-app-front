import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestVue from '@/components/TestVue.vue'
import AuthMypage from '@/components/AuthMypage/AuthMypage.vue'
import RequestPage from '@/components/RequestPage/RequestPage.vue'
import CommunityPage from '@/components/CommunityPage/CommunityPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/test',
    name:'test',
    component:TestVue
  },
  {
    path:'/mypage',
    name:'mypage',
    component:AuthMypage
  },
  {
    path:'/request',
    name:'request',
    component:RequestPage
  },
  {
    path:'/community',
    name:'community',
    component:CommunityPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
