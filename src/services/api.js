import axios from 'axios'

const API_BASE_URL = 'https://cuna-api-unsa-nine.vercel.app'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
})

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default {
  // Autenticación
  register(userData) {
    return api.post('/api/auth/register/', userData)
  },
  
  login(credentials) {
    return api.post('/api/auth/login/', credentials)
  },
  
  logout() {
    return api.post('/api/auth/logout/')
  },
  
  getProfile() {
    return api.get('/api/auth/profile/')
  },
  
  getAuthStatus() {
    return api.get('/api/auth/status/')
  },
  
  // Estudiantes
  getStudents() {
    return api.get('/api/students/')
  },
  
  getStudent(id) {
    return api.get(`/api/students/${id}/`)
  },
  
  createStudent(studentData) {
    return api.post('/api/students/', studentData)
  },
  
  updateStudent(id, studentData) {
    return api.put(`/api/students/${id}/`, studentData)
  },
  
  deleteStudent(id) {
    return api.delete(`/api/students/${id}/`)
  },
  
  // Docentes
  getTeachers() {
    return api.get('/api/teachers/')
  },
  createTeacher(data) {
  return api.post('/api/teachers/', data)
  },
  updateTeacher(id, teacher) {
  return api.put(`/api/teachers/${id}/`, teacher)
  },
  deleteTeacher(id) {
  return api.delete(`/api/teachers/${id}/`)
  },
  // Cursos
  getCourses() {
    return api.get('/api/courses/')
  },
  createCourse(data) {
  return api.post('/api/courses/', data)
  },
  updateCourse(id, data) {
    return api.put(`/api/courses/${id}/`, data)
  },
  deleteCourse(id) {
    return api.delete(`/api/courses/${id}/`)
  },
  // Usuarios
  getUsers() {
    return api.get('/api/users/')
  },
  
  
}