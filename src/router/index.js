import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import TestVue from '@/components/TestVue.vue'
import RequestPage from '@/components/RequestPage/RequestPage.vue'
import CommunityPage from '@/components/CommunityPage/CommunityPage.vue'
import LoginView from '@/components/LoginView.vue'
import SignUpView from '@/components/SignUpView.vue'
import MypageView from '@/components/MypageView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
    path:'/test',
    name:'test',
    component:TestVue
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
  },
  {
    path:'/signup',
    name:'signup',
    component:SignUpView
  },
  {
    path:'/login',
    name:'login',
    component:LoginView
  },
  {
    path:'/mypage',
    name:'mypage',
    component:MypageView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
