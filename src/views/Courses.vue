<!-- filepath: c:\CUNA-UNSA-\CunaFrontend\src\views\Courses.vue -->
<template>
  <div>
    <h2>Cursos</h2>
    <ul>
      <li v-for="course in courses" :key="course.id">
        {{ course.nombre }} - {{ course.codigo }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  name: 'CoursesView',
  data() {
    return { courses: [] }
  },
  async mounted() {
    try {
      const res = await api.getCourses()
      this.courses = res.data
    } catch (error) {
      this.courses = []
    }
  }
}
</script>