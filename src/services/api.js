import axios from 'axios';

// ✅ Configurar la URL base desde el entorno (.env)
const API_BASE_URL = process.env.VUE_APP_API_URL;
console.log("🌐 API conectando a:", API_BASE_URL);

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
// ✅ Crear instancia de Axios
const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
});

// ✅ Interceptor: agregar token automáticamente a las peticiones
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
<<<<<<< HEAD
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
=======
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
>>>>>>> 6c5e762b526c61e370bea61f137f19bb050f13f7
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor: manejar errores de autenticación
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
apiInstance.get('/api/health/')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
// ✅ Exportar las funciones de API como objeto agrupado
const api = {
  // --- Autenticación ---
  login(credentials) {
    // Obtener el CSRF token de las cookies
    const csrfToken = getCookie('csrftoken');
    return apiInstance.post('/api/auth/login/', credentials, {
      headers: {
        'X-CSRFToken': csrfToken
      }
    });
  },

  logout() {
    return apiInstance.post('/api/auth/logout/');
  },

  getProfile() {
    return apiInstance.get('/api/auth/profile/');
  },
  // --- Estudiantes ---
  getStudents() {
    return apiInstance.get('/api/students/');
  },

  getStudent(id) {
    return apiInstance.get(`/api/students/${id}/`);
  },

  createStudent(studentData) {
    return apiInstance.post('/api/students/', studentData);
  },

  updateStudent(id, studentData) {
    return apiInstance.put(`/api/students/${id}/`, studentData);
  },

  deleteStudent(id) {
    return apiInstance.delete(`/api/students/${id}/`);
  },

  // --- Docentes ---
  getTeachers() {
    return apiInstance.get('/api/teachers/');
  },

  createTeacher(data) {
    return apiInstance.post('/api/teachers/', data);
  },

  updateTeacher(id, teacher) {
    return apiInstance.put(`/api/teachers/${id}/`, teacher);
  },

  deleteTeacher(id) {
    return apiInstance.delete(`/api/teachers/${id}/`);
  },

  // --- Cursos ---
  getCourses() {
    return apiInstance.get('/api/courses/');
  },

  createCourse(data) {
    return apiInstance.post('/api/courses/', data);
  },

  updateCourse(id, data) {
    return apiInstance.put(`/api/courses/${id}/`, data);
  },

  deleteCourse(id) {
    return apiInstance.delete(`/api/courses/${id}/`);
  },

  // --- Usuarios ---
  getUsers() {
    return apiInstance.get('/api/users/');
  },
};

export default api;
