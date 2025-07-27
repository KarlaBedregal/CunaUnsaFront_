<!-- filepath: c:\CUNA-UNSA-\CunaFrontend\src\views\Grades.vue -->
<template>
  <div>
    <h2>Notas</h2>
    <ul>
      <li v-for="grade in grades" :key="grade.id">
        {{ grade.student?.full_name }} - {{ grade.valor }} ({{ grade.tipo }})
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  data() {
    return { grades: [] }
  },
  async mounted() {
    try {
      const res = await api.getGrades()
      this.grades = res.data
    } catch (error) {
      this.grades = []
    }
  }
}
</script>