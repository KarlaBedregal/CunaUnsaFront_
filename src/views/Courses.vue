<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">📚 Cursos</h2>
    <div v-if="loading" class="text-center">Cargando cursos...</div>
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
import api from '@/services/api'
export default {
  name: 'CoursesView',
  data() {
    return {
      courses: [],
      loading: false,
    }
  },
  async mounted() {
    this.loading = true
    try {
      const res = await api.getCourses()
      this.courses = res.data.results || res.data.data || res.data
    } catch (error) {
      console.error('Error al obtener cursos:', error)
      alert('No tienes autorización para ver los cursos.')
    } finally {
      this.loading = false
    }
  }
}
</script>