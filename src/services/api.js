import axios from 'axios'


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
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
  getAttendance() {
    return apiInstance.get('/api/attendance/');
  },
  createAttendance(data) {
    return apiInstance.post('/api/attendance/', data);
  },
  updateAttendance(id, data) {
    return apiInstance.put(`/api/attendance/${id}/`, data);
  },
  deleteAttendance(id) {
    return apiInstance.delete(`/api/attendance/${id}/`);
  },
  getChats() {
    return apiInstance.get('/api/chats/');
  },
  createChat(data) {
    return apiInstance.post('/api/chats/', data);
  },
  updateChat(id, data) {
    return apiInstance.put(`/api/chats/${id}/`, data);
  },
  deleteChat(id) {
    return apiInstance.delete(`/api/chats/${id}/`);
  },
  getDocuments() {
    return apiInstance.get('/api/documents/');
  },
  createDocument(data) {
    return apiInstance.post('/api/documents/', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getInscriptions() {
    return apiInstance.get('/api/inscriptions/');
  },
  createInscription(data) {
    return apiInstance.post('/api/inscriptions/', data);
  },
  getPayments() {
    return apiInstance.get('/api/payments/');
  },
  createPayment(data) {
    return apiInstance.post('/api/payments/', data);
  },
  deletePayment(id) {
    return apiInstance.delete(`/api/payments/${id}/`);
  },
  getPeriods() {
    return apiInstance.get('/api/periods/');
  },
  createPeriod(data) {
    return apiInstance.post('/api/periods/', data);
  },
  updatePeriod(id, data) {
    return apiInstance.put(`/api/periods/${id}/`, data);
  },
  deletePeriod(id) {
    return apiInstance.delete(`/api/periods/${id}/`);
  },
  getProfile() {
    return apiInstance.get('/api/auth/profile/');
  },
  getStudents() {
    return apiInstance.get('/api/students/');
  },
  createStudent(data) {
    return apiInstance.post('/api/students/', data);
  },
  updateStudent(id, data) {
    return apiInstance.put(`/api/students/${id}/`, data);
  },
  deleteStudent(id) {
    return apiInstance.delete(`/api/students/${id}/`);
  },
  getTeachers() {
    return apiInstance.get('/api/teachers/');
  },
  getWorkloads() {
    return apiInstance.get('/api/workloads/');
  },
  createWorkload(data) {
    return apiInstance.post('/api/workloads/', data);
  },
  updateWorkload(id, data) {
    return apiInstance.put(`/api/workloads/${id}/`, data);
  },
};

export default api;
