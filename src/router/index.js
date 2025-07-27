import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

// Vistas generales
import AboutUs from '@/views/about-us.vue'

// Vistas del usuario
import ProfileView from '@/views/user/ProfileView.vue'
import GradesView from '@/views/user/GradesView.vue'
import CalendarView from '@/views/user/CalendarView.vue'
import PrivateFilesView from '@/views/user/PrivateFilesView.vue'
import ReportsView from '@/views/user/ReportsView.vue'
import PreferencesView from '@/views/user/PreferencesView.vue'

const routes = [
  { path: '/about-us', name: 'AboutUs', component: AboutUs },

  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/login', name: 'Login', component: () => import('@/views/Login.vue'), meta: { requiresGuest: true } },
  { path: '/register', name: 'Register', component: () => import('@/views/Register.vue'), meta: { requiresGuest: true } },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  { path: '/students', name: 'Students', component: () => import('@/views/Students.vue'), meta: { requiresAuth: true } },
  { path: '/teachers', name: 'Teachers', component: () => import('@/views/Teachers.vue'), meta: { requiresAuth: true } },
  { path: '/courses', name: 'Courses', component: () => import('@/views/Courses.vue'), meta: { requiresAuth: true } },

  // Rutas del perfil del usuario
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/grades',
    name: 'Grades',
    component: GradesView,
    meta: { requiresAuth: true }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: CalendarView,
    meta: { requiresAuth: true }
  },
  {
    path: '/files',
    name: 'PrivateFiles',
    component: PrivateFilesView,
    meta: { requiresAuth: true }
  },
  {
    path: '/reports',
    name: 'Reports',
    component: ReportsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/preferences',
    name: 'Preferences',
    component: PreferencesView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// ⛔️ Guards de navegación
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated
  console.log('Guard: isAuthenticated =', isAuthenticated)

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (isAuthenticated) {
      next('/dashboard')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
