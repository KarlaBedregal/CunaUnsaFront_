<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">📚 Cursos</h2>

    <!-- Mensaje de carga -->
    <div v-if="loading" class="text-center">Cargando cursos...</div>

    <!-- Lista de cursos -->
    <div v-else>
      <div v-if="courses.length > 0" class="row">
        <div v-for="course in courses" :key="course.id" class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ course.name }}</h5>
              <p class="card-text">Grado: {{ course.grade }}</p>
              <p class="card-text">Descripción: {{ course.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="alert alert-info text-center">
        No se encontraron cursos disponibles para ti.
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CoursesView',
  data() {
    return {
      courses: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchCourses();
  },
  methods: {
    async fetchCourses() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://cunaunsa.onrender.com/api/courses/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.courses = response.data;
      } catch (error) {
        console.error('Error al obtener cursos:', error);
        alert('No tienes autorización para ver los cursos.');
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.card {
  min-height: 180px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
