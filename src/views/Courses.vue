<!-- filepath: src/views/Courses.vue -->
<template>
  <div class="container py-4">
    <h2 class="mb-4 text-center">📚 Cursos Registrados</h2>

    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status"></div>
    </div>

    <div v-else-if="courses.length === 0" class="alert alert-warning text-center">
      No hay cursos disponibles.
    </div>

    <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div v-for="course in courses" :key="course.id" class="col">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ course.name }}</h5>
            <p class="card-text">
              <strong>Código:</strong> {{ course.code || 'N/A' }}<br />
              <strong>Créditos:</strong> {{ course.credits || 'No definido' }}<br />
              <strong>Año:</strong> {{ course.year }}<br />
              <strong>Bimestre:</strong> {{ course.bimester }}<br />
              <strong>Estado:</strong>
              <span :class="course.status ? 'text-success' : 'text-danger'">
                {{ course.status ? 'Activo' : 'Inactivo' }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Courses',
  computed: {
    ...mapGetters(['courses', 'loading'])
  },
  created() {
    this.fetchCourses()
  },
  methods: {
    ...mapActions(['fetchCourses'])
  }
}
</script>

<style scoped>
.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
