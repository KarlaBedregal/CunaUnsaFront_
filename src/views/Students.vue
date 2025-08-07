<!-- eslint-disable no-unused-vars -->
<template>
  <div>
    <h2>Estudiantes</h2>
    <div v-if="canCreate" class="mb-3">
      <h5>Nuevo estudiante</h5>
      <form @submit.prevent="createStudent">
      <!-- ...campos... -->
        <div class="mb-2">
          <label>Nombre completo:</label>
          <input v-model="form.full_name" type="text" class="form-control" required />
        </div>
        <div class="mb-2">
          <label>Correo:</label>
          <input v-model="form.correo_electronico" type="email" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-success">Crear</button>
        <button type="button" @click="resetForm" class="btn btn-secondary ms-2">Cancelar</button>
        <!-- ...campos... -->
      </form>
    </div>
    <ul>
        <li v-for="_student in students" :key="_student.id">
        <span v-if="editingId !== _student.id">
          {{ _student.full_name }} - DNI: {{ _student.dni }}
          <span v-if="canEdit(_student)" class="ms-2">
            <button class="btn btn-sm btn-warning" @click="editStudent(_student)">Editar</button>
          </span>
          <span v-if="canDelete" class="ms-2">
            <button class="btn btn-sm btn-danger" @click="deleteStudent(student.id)">Eliminar</button>
          </span>
        </span>
        <span v-else>
          <input v-model="form.full_name" type="text" class="form-control form-control-sm mb-1" />
          <input v-model="form.dni" type="text" class="form-control form-control-sm mb-1" />
          <input v-model="form.correo_electronico" type="email" class="form-control form-control-sm mb-1" />
          <button class="btn btn-sm btn-success" @click="updateStudent(student.id)">Guardar</button>
          <button class="btn btn-sm btn-secondary ms-2" @click="cancelEdit">Cancelar</button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  name: 'StudentsView',
  data() {
    return {
      students: [],
      form: { full_name: '', dni: '', correo_electronico: '' },
      editingId: null,
      userType: localStorage.getItem('user_type') || '',
      userId: localStorage.getItem('user_id') || ''
    }
  },
  computed: {
    canCreate() {
      return this.userType === 'admin'
    },
    canDelete() {
      return this.userType === 'admin'
    }
  },
  methods: {
    async fetchStudents() {
      try {
        const res = await api.getStudents()
        this.students = res.data.results || res.data.data || res.data
      } catch (error) {
        this.students = []
      }
    },
    canEdit(student) {
      // Padres/madres pueden editar sus hijos
      return this.userType === 'father' || this.userType === 'mother'
    },
    editStudent(student) {
      this.form = {
        full_name: student.full_name,
        dni: student.dni,
        correo_electronico: student.correo_electronico
      }
      this.editingId = student.id
    },
    async updateStudent(id) {
      try {
        await api.updateStudent(id, this.form)
        this.fetchStudents()
        this.cancelEdit()
      } catch (error) {
        alert('No tienes permisos para editar este estudiante.')
      }
    },
    async createStudent() {
      try {
        await api.createStudent(this.form)
        this.fetchStudents()
        this.resetForm()
      } catch (error) {
        alert('Error al crear estudiante.')
      }
    },
    async deleteStudent(id) {
      if (!confirm('¿Seguro que quieres eliminar este estudiante?')) return
      try {
        await api.deleteStudent(id)
        this.fetchStudents()
      } catch (error) {
        alert('No tienes permisos para eliminar este estudiante.')
      }
    },
    resetForm() {
      this.form = { full_name: '', dni: '', correo_electronico: '' }
      this.editingId = null
    },
    cancelEdit() {
      this.resetForm()
    }
  },
  mounted() {
    this.fetchStudents()
  }
}
</script>