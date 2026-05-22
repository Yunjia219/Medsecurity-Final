import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import PatientDashboard from '../views/PatientDashboard.vue'
import DoctorDashboard from '../views/DoctorDashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import InsuranceDashboard from '../views/InsuranceDashboard.vue'

const routes = [
  { 
    path: '/', 
    redirect: '/login' 
  },
  { 
    path: '/login', 
    name: 'Login',
    component: Login 
  },
  { 
    path: '/patient', 
    name: 'PatientDashboard',
    component: PatientDashboard, 
    meta: { role: 'patient' } 
  },
  { 
    path: '/doctor', 
    name: 'DoctorDashboard',
    component: DoctorDashboard, 
    meta: { role: 'doctor' } 
  },
  { 
    path: '/admin', 
    name: 'AdminDashboard',
    component: AdminDashboard, 
    meta: { role: 'admin' } 
  },
  { 
    path: '/insurance', 
    name: 'InsuranceDashboard',
    component: InsuranceDashboard, 
    meta: { role: 'insurance' } 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守衛：處理登入狀態與角色權限
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('medsafe_user'))

  if (to.path === '/login') {
    // 已登入者進入登入頁，自動跳向對應 Dashboard
    if (user) {
      next(`/${user.role}`)
    } else {
      next()
    }
  } else {
    // 未登入者進入保護頁面，導向登入頁
    if (!user) {
      next('/login')
    } else {
      // 角色權限檢查：若進入錯誤角色頁面，強制轉向其應屬頁面
      if (to.meta.role && to.meta.role !== user.role) {
        next(`/${user.role}`)
      } else {
        next()
      }
    }
  }
})

export default router
