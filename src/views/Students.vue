<template>
  <div>
    <h2>Estudiantes</h2>
    <ul>
      <li v-for="student in students" :key="student.id">
        {{ student.full_name }} - DNI: {{ student.dni }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  name: 'StudentsView',
  data() {
    return { students: [] }
  },
  async mounted() {
    try {
      const res = await api.getStudents()
      this.students = res.data.results || res.data.data || res.data
    } catch (error) {
      this.students = []
    }
  }
}
</script>