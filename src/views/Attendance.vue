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
import axios from 'axios'

export default {
  name: 'AttendanceView',
  data() {
    return {
      attendances: []
    }
  },
  mounted() {
    this.fetchAttendance()
  },
  methods: {
    async fetchAttendance() {
      const token = localStorage.getItem('token') // Token guardado tras login
      try {
        const response = await axios.get('https://cunaunsa.onrender.com/api/attendance/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.attendances = response.data
      } catch (error) {
        console.error('Error al obtener asistencia:', error)
        alert('No autorizado o error en el servidor.')
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
