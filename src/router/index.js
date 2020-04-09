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
    component: (() => import('../views/Login.vue')),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    name: 'index',
    component: () => import('../views/Index.vue'),
    redirect: '/home',
    children: [{
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/clothing-add',
        name: 'clothingAdd',
        component: () => import('../views/clothing/ClothingAdd.vue'),
        meta: {
          title: '服装上新'
        }
      },
      {
        path: '/clothing-info',
        name: 'clothingInfo',
        component: () => import('../views/clothing/ClothingsInfo.vue'),
        meta: {
          title: '服装信息'
        }
      },
      {
        path: '/clothing-edit',
        name: 'clothingEdit',
        component: () => import('../views/clothing/ClothingEdit.vue'),
        meta: {
          title: '修改服装信息'
        }
      },
      {
        path: '/order-info',
        name: 'orderInfo',
        component: () => import('../views/order/OrdersInfo.vue'),
        meta: {
          title: '订单信息'
        }
      },
      {
        path: '/menu-info',
        name: 'menuInfo',
        component: () => import('../views/menu/MenuInfo.vue'),
        meta: {
          title: '菜单管理'
        }
      },
      {
        path: '/role-info',
        name: 'roleInfo',
        component: () => import('../views/role/RoleInfo.vue'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: '/user-info',
        name: 'userInfo',
        component: () => import('../views/user/UserInfo.vue'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: '/employee-info',
        name: 'Employee',
        component: () => import('../views/employee/EmployeeInfo.vue'),
        meta: {
          title: '员工管理'
        }
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
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.path !== '/login') {
    if (store.state.userInfo === null) {
      Message.warning("请先登录")
      next('/login')
    } else {
      if (store.state.userInfo.menuTree.length === 0) {
        Message.warning("权限不足")
        if (from.path !== '/login') {
          next('/login')
        }
      } else {
        next()
      }
    }
  } else {
    next()
  }
  // if (store.state.userInfo === null && to.path !== '/login') {
  //   Message.warning("请先登录")
  //   next('/login')
  // } else {
  //   next()
  // }

})
export default router