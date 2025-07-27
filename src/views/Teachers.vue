<template>
  <div>
    <h2>Docentes</h2>
    <ul>
      <li v-for="teacher in teachers" :key="teacher.id">
        {{ teacher.full_name }} - DNI: {{ teacher.dni }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  name: 'TeachersView',
  data() {
    return { teachers: [] }
  },
  async mounted() {
    try {
      const res = await api.getTeachers()
      this.teachers = res.data.results || res.data.data || res.data
    } catch (error) {
      this.teachers = []
    }
  }
}
</script>