<!-- filepath: c:\CUNA-UNSA-\CunaFrontend\src\views\Attendance.vue -->
<template>
  <div>
    <h2>Asistencia</h2>
    <ul>
      <li v-for="att in attendance" :key="att.id">
        {{ att.student?.full_name }} - {{ att.fecha }} - {{ att.estado }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  data() {
    name: 'AttendanceView',
    return { attendance: [] }
  },
  async mounted() {
    try {
      const res = await api.getAttendance()
      this.attendance = res.data
    } catch (error) {
      this.attendance = []
    }
  }
}
</script>