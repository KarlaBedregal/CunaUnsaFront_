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
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/about-us', name: 'AboutUs', component: () => import('@/views/about-us.vue') },
  { path: '/login', name: 'Login', component: () => import('@/views/Login.vue'), meta: { requiresGuest: true } },
  { path: '/register', name: 'Register', component: () => import('@/views/Register.vue'), meta: { requiresGuest: true } },

  // Dashboard principal
  { path: '/dashboard', name: 'Dashboard', component: () => import('@/views/Dashboard.vue'), meta: { requiresAuth: true } },

  // Entidades principales
  { path: '/students', name: 'Students', component: () => import('@/views/Students.vue'), meta: { requiresAuth: true } },
  { path: '/teachers', name: 'Teachers', component: () => import('@/views/Teachers.vue'), meta: { requiresAuth: true } },
  { path: '/courses', name: 'Courses', component: () => import('@/views/Courses.vue'), meta: { requiresAuth: true } },
  { path: '/grades', name: 'Grades', component: () => import('@/views/Grades.vue'), meta: { requiresAuth: true } },
  { path: '/attendance', name: 'Attendance', component: () => import('@/views/Attendance.vue'), meta: { requiresAuth: true } },
  { path: '/payments', name: 'Payments', component: () => import('@/views/Payments.vue'), meta: { requiresAuth: true } },
  { path: '/announcements', name: 'Announcements', component: () => import('@/views/Announcement.vue'), meta: { requiresAuth: true } },
  { path: '/documents', name: 'Documents', component: () => import('@/views/Documents.vue'), meta: { requiresAuth: true } },
  { path: '/chats', name: 'Chats', component: () => import('@/views/Chats.vue'), meta: { requiresAuth: true } },
  { path: '/inscriptions', name: 'Inscriptions', component: () => import('@/views/Inscriptions.vue'), meta: { requiresAuth: true } },
  { path: '/workloads', name: 'Workloads', component: () => import('@/views/Workloads.vue'), meta: { requiresAuth: true } },
  { path: '/periods', name: 'Periods', component: () => import('@/views/Periods.vue'), meta: { requiresAuth: true } },

  // Perfil
  { path: '/profile', name: 'Profile', component: () => import('@/views/Profile.vue'), meta: { requiresAuth: true } },

  // Puedes dejar las rutas de usuario si las usas
  { path: '/calendar', name: 'Calendar', component: () => import('@/views/user/CalendarView.vue'), meta: { requiresAuth: true } },
  { path: '/files', name: 'PrivateFiles', component: () => import('@/views/user/PrivateFilesView.vue'), meta: { requiresAuth: true } },
  { path: '/reports', name: 'Reports', component: () => import('@/views/user/ReportsView.vue'), meta: { requiresAuth: true } },
  { path: '/preferences', name: 'Preferences', component: () => import('@/views/user/PreferencesView.vue'), meta: { requiresAuth: true } },
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
