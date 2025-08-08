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
apiInstance.get('/health/')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
// ✅ Exportar las funciones de API como objeto agrupado
const api = {
  getAdmissions() {
    return apiInstance.get('/admissions/');
  },
  createAdmission(formData) {
    return apiInstance.post('/admissions/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  acceptAdmission(id) {
    return apiInstance.post(`/admissions/${id}/accept_admission/`);
  },
  rejectAdmission(id, data) {
    return apiInstance.post(`/admissions/${id}/reject_admission/`, data);
  },
  checkAdmissionStatus(studentDni) {
    return apiInstance.get(`/check-admission/?dni=${studentDni}`);
  },

  // --- Autenticación ---
  login(credentials) {
    // Obtener el CSRF token de las cookies
    const csrfToken = getCookie('csrftoken');
    return apiInstance.post('/auth/login/', credentials, {
      headers: {
        'X-CSRFToken': csrfToken
      }
    });
  },

  logout() {
    return apiInstance.post('/auth/logout/');
  },
  getAttendance() {
    return apiInstance.get('/attendance/');
  },
  createAttendance(data) {
    return apiInstance.post('/attendance/', data);
  },
  updateAttendance(id, data) {
    return apiInstance.put(`/attendance/${id}/`, data);
  },
  deleteAttendance(id) {
    return apiInstance.delete(`/attendance/${id}/`);
  },
  getChats() {
    return apiInstance.get('/chats/');
  },
  createChat(data) {
    return apiInstance.post('/chats/', data);
  },
  updateChat(id, data) {
    return apiInstance.put(`/chats/${id}/`, data);
  },
  deleteChat(id) {
    return apiInstance.delete(`/chats/${id}/`);
  },
  getDocuments() {
    return apiInstance.get('/documents/');
  },
  createDocument(data) {
    return apiInstance.post('/documents/', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getCourses() {
    return apiInstance.get('/courses/');
  },
  createCourse(data) {
    return apiInstance.post('/courses/', data);
  },
  updateCourse(id, data) {
    return apiInstance.put(`/courses/${id}/`, data);
  },
  deleteCourse(id) {
    return apiInstance.delete(`/courses/${id}/`);
  },

  getGrades() {
    return apiInstance.get('/grades/');
  },
  createGrade(data) {
    return apiInstance.post('/grades/', data);
  },
  updateGrade(id, data) {
    return apiInstance.put(`/grades/${id}/`, data);
  },
  deleteGrade(id) {
    return apiInstance.delete(`/grades/${id}/`);
  },

  createAnnouncement(data) {
    return apiInstance.post('/announcements/', data);
  },
  updateAnnouncement(id, data) {
    return apiInstance.put(`/announcements/${id}/`, data);
  },
  deleteAnnouncement(id) {
    return apiInstance.delete(`/announcements/${id}/`);
  },

  updateDocument(id, data) {
    return apiInstance.put(`/documents/${id}/`, data);
  },
  deleteDocument(id) {
    return apiInstance.delete(`/documents/${id}/`);
  },
  getInscriptions() {
    return apiInstance.get('/inscriptions/');
  },
  createInscription(data) {
    return apiInstance.post('/inscriptions/', data);
  },
  getPayments() {
    return apiInstance.get('/payments/');
  },
  createPayment(data) {
    return apiInstance.post('/payments/', data);
  },
  deletePayment(id) {
    return apiInstance.delete(`/payments/${id}/`);
  },
  getPeriods() {
    return apiInstance.get('/periods/');
  },
  createPeriod(data) {
    return apiInstance.post('/periods/', data);
  },
  updatePeriod(id, data) {
    return apiInstance.put(`/periods/${id}/`, data);
  },
  deletePeriod(id) {
    return apiInstance.delete(`/periods/${id}/`);
  },
  getProfile() {
    return apiInstance.get('/auth/profile/');
  },
  getStudents() {
    return apiInstance.get('/students/');
  },
  createStudent(data) {
    return apiInstance.post('/students/', data);
  },
  updateStudent(id, data) {
    return apiInstance.put(`/students/${id}/`, data);
  },
  deleteStudent(id) {
    return apiInstance.delete(`/students/${id}/`);
  },
  getAnnouncements() {
    return apiInstance.get('/announcements/');
  },
  getTeachers() {
    return apiInstance.get('/teachers/');
  },
  getWorkloads() {
    return apiInstance.get('/workloads/');
  },
  createWorkload(data) {
    return apiInstance.post('/workloads/', data);
  },
  updateWorkload(id, data) {
    return apiInstance.put(`/workloads/${id}/`, data);
  },
};

export default api;
