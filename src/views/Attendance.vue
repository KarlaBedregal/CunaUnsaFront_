<template>
  <div class="container mt-5">
    <h2 class="mb-4">📋 Registro de Asistencia</h2>
    <div v-if="canEdit" class="mb-3">
      <h5>{{ isEditing ? 'Editar' : 'Nueva' }} Asistencia</h5>
      <form @submit.prevent="saveAttendance">
        <div class="mb-2">
          <label>Inscripción ID:</label>
          <input v-model="form.inscription" type="number" class="form-control" required />
        </div>
        <div class="mb-2">
          <label>Fecha:</label>
          <input v-model="form.date" type="date" class="form-control" required />
        </div>
        <div class="mb-2">
          <label>Estado:</label>
          <select v-model="form.status" class="form-control" required>
            <option value="presente">Presente</option>
            <option value="ausente">Ausente</option>
            <option value="justificado">Justificado</option>
          </select>
        </div>
        <button type="submit" class="btn btn-success">{{ isEditing ? 'Actualizar' : 'Registrar' }}</button>
        <button type="button" @click="cancelEdit" class="btn btn-secondary ms-2">Cancelar</button>
      </form>
    </div>
    <div v-if="attendances.length === 0">No hay registros de asistencia.</div>
    <ul v-else class="list-group">
      <li v-for="attendance in attendances" :key="attendance.id" class="list-group-item">
        <strong>Estudiante:</strong> {{ attendance.inscription.student.first_name }} {{ attendance.inscription.student.last_name }}<br>
        <strong>Fecha:</strong> {{ attendance.date }}<br>
        <strong>Estado:</strong> {{ attendance.status }}
        <div v-if="canEdit" class="mt-2">
          <button class="btn btn-warning btn-sm me-2" @click="editAttendance(attendance)">Editar</button>
          <button class="btn btn-danger btn-sm" @click="deleteAttendance(attendance.id)">Eliminar</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  name: 'AttendanceView',
  data() {
    return {
      attendances: [],
      form: { inscription: '', date: '', status: 'presente' },
      isEditing: false,
      editingId: null,
      userType: localStorage.getItem('user_type') || ''
    }
  },
  computed: {
    canEdit() {
      return this.userType === 'admin' || this.userType === 'teacher'
    }
  },
  methods: {
    async fetchAttendance() {
      try {
        const res = await api.getAttendance()
        this.attendances = res.data.results || res.data.data || res.data
      } catch (error) {
        this.attendances = []
      }
    },
    async saveAttendance() {
      try {
        if (this.isEditing) {
          await api.updateAttendance(this.editingId, this.form)
        } else {
          await api.createAttendance(this.form)
        }
        this.fetchAttendance()
        this.resetForm()
      } catch (error) {
        alert("Error al guardar asistencia")
      }
    },
    editAttendance(attendance) {
      this.form = {
        inscription: attendance.inscription.id,
        date: attendance.date,
        status: attendance.status
      }
      this.isEditing = true
      this.editingId = attendance.id
    },
    async deleteAttendance(id) {
      if (!confirm("¿Estás seguro de eliminar este registro?")) return
      try {
        await api.deleteAttendance(id)
        this.fetchAttendance()
      } catch (error) {
        alert("Error al eliminar asistencia")
      }
    },
    cancelEdit() {
      this.resetForm()
    },
    resetForm() {
      this.form = { inscription: '', date: '', status: 'presente' }
      this.isEditing = false
      this.editingId = null
    }
  },
  mounted() {
    this.fetchAttendance()
  }
}
</script>