import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import {
  Message
} from 'element-ui'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: (() => import('../views/Login.vue'))
  },
  {
    path: '/',
    name: 'index',
    component: () => import('../views/Index.vue'),
    redirect: '/home',
    children: [{
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/clothing-add',
        name: 'clothingAdd',
        component: () => import('../views/clothing/ClothingAdd.vue')
      },
      {
        path: '/clothing-info',
        name: 'clothingInfo',
        component: () => import('../views/clothing/ClothingsInfo.vue')
      },
      {
        path: '/clothing-edit',
        name: 'clothingEdit',
        component: () => import('../views/clothing/ClothingEdit.vue')
      },
      {
        path: '/order-info',
        name: 'orderInfo',
        component: () => import('../views/order/OrdersInfo.vue')
      },
      {
        path: '/menu-info',
        name: 'menuInfo',
        component: () => import('../views/menu/MenuInfo.vue')
      },
      {
        path: '/role-info',
        name: 'roleInfo',
        component: () => import('../views/role/RoleInfo.vue')
      },
      {
        path: '/user-info',
        name: 'userInfo',
        component: () => import('../views/user/UserInfo.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航首位
router.beforeEach((to, from, next) => {
  if (store.state.userInfo === null && to.path !== '/login') {
    Message.warning("请先登录")
    next('/login')
  } else {
    next()
  }

})
export default router