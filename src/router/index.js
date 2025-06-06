import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import TestVue from '@/components/TestVue.vue'
import RequestPage from '@/components/RequestPage/RequestPage.vue'
import CommunityPage from '@/components/CommunityPage/CommunityPage.vue'
import LoginView from '@/components/LoginView.vue'
import SignUpView from '@/components/SignUpView.vue'
import MypageView from '@/components/MypageView.vue'
import ShoppingView from '@/components/ShoppingView.vue'
import PersonalShopListView from "@/components/PersonalShopListView.vue";
import RequestListView from '@/components/RequestListView.vue'
import DeliveryView from '@/components/DeliveryView.vue'
import ConfilmView from '@/components/ConfilmView.vue'
import UserLinkView from '@/components/UserLinkView.vue'
import HomeView from '@/views/HomeView.vue'
import RecieveView from '@/components/RecieveView.vue'
import RequiredActionView from '@/components/RequiredActionView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
  },
  {
    path: "/personalshoplist",
    name: "personalshoplist",
    component: PersonalShopListView,
  },
  {
    path:'/shopping',
    name:'shopping',
    component:ShoppingView
  },
  {
    path:'/requestlist',
    name:'requestlist',
    component:RequestListView
  },
  {
    path:'/delivery',
    name:'delivery',
    component:DeliveryView
  },
  {
    path:'/confilm',
    name:'confilm',
    component:ConfilmView
  },
  {
    path:'/userlink',
    name:'userlink',
    component:UserLinkView,
  },
  {
    path:'/recieve',
    name:'recieve',
    component:RecieveView,
  },
  {
    path:'/required',
    name:'required',
    component:RequiredActionView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
