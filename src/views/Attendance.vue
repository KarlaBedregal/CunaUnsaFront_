<template>
  <div class="container mt-5">
    <h2 class="mb-4">📋 Registro de Asistencia</h2>
    <div v-if="attendances.length === 0">No hay registros de asistencia.</div>
    <ul v-else class="list-group">
      <li v-for="attendance in attendances" :key="attendance.id" class="list-group-item">
        <strong>Estudiante:</strong> {{ attendance.inscription.student.first_name }} {{ attendance.inscription.student.last_name }}<br>
        <strong>Fecha:</strong> {{ attendance.date }}<br>
        <strong>Estado:</strong> {{ attendance.status }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  name: 'AttendanceView',
  data() {
    return { attendances: [] }
  },
  async mounted() {
    try {
      const res = await api.getAttendance()
      this.attendances = res.data.results || res.data.data || res.data
    } catch (error) {
      this.attendances = []
    }
  }
}
</script>