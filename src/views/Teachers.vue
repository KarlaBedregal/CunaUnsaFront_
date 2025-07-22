<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-header bg-success text-white d-flex justify-content-between align-items-center">
        <h4>👨‍🏫 Lista de Docentes</h4>
        <button class="btn btn-light btn-sm" @click="toggleForm">
          {{ showForm ? 'Cancelar' : '➕ Agregar Docente' }}
        </button>
      </div>

      <!-- FORMULARIO -->
      <div v-if="showForm" class="card-body border border-success p-3 mb-3">
        <h5>{{ editingTeacher ? 'Editar Docente' : 'Nuevo Docente' }}</h5>
        <form @submit.prevent="submitForm">
          <div class="row">
            <div class="col-md-4 mb-2">
              <input v-model="form.names" type="text" class="form-control" placeholder="Nombres" required>
            </div>
            <div class="col-md-4 mb-2">
              <input v-model="form.father_surname" type="text" class="form-control" placeholder="Apellido Paterno" required>
            </div>
            <div class="col-md-4 mb-2">
              <input v-model="form.mother_surname" type="text" class="form-control" placeholder="Apellido Materno" required>
            </div>
            <div class="col-md-6 mb-2">
              <input v-model="form.email" type="email" class="form-control" placeholder="Correo electrónico" required>
            </div>
            <div class="col-md-6 mb-2">
              <input v-model="form.phone" type="text" class="form-control" placeholder="Teléfono">
            </div>
            <div class="col-md-6 mb-2">
              <div class="form-check">
                <input v-model="form.show_phone" class="form-check-input" type="checkbox" id="showPhone">
                <label class="form-check-label" for="showPhone">Mostrar Teléfono</label>
              </div>
            </div>

            <!-- Checkbox: Estado del docente -->
            <div class="col-md-6 mb-2">
              <div class="form-check">
                <input v-model="form.status" class="form-check-input" type="checkbox" id="status">
                <label class="form-check-label" for="status">Activo</label>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-success">
            {{ editingTeacher ? 'Actualizar' : 'Guardar' }}
          </button>
        </form>
      </div>

      <!-- TABLA -->
      <div class="card-body">
        <div v-if="loading">Cargando docentes...</div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <table v-if="teachers.length" class="table table-hover table-bordered">
          <thead class="table-success">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(teacher, index) in teachers" :key="teacher.id">
              <td>{{ index + 1 }}</td>
              <td>{{ teacher.names }} {{ teacher.father_surname }} {{ teacher.mother_surname }}</td>
              <td>{{ teacher.email }}</td>
              <td>
                <span :class="teacher.status ? 'text-success' : 'text-danger'">
                  {{ teacher.status ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-warning me-2" @click="editTeacher(teacher)">✏️</button>
                <button class="btn btn-sm btn-danger" @click="deleteTeacher(teacher.id)">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-muted">No hay docentes disponibles.</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import api from '@/services/api'

export default {
  name: 'TeachersView',
  data() {
    return {
      showForm: false,
      editingTeacher: null,
      form: {
        names: '',
        father_surname: '',
        mother_surname: '',
        email: '',
        phone: '',
        show_phone: false,
        status: true
      }
    }
  },
  computed: {
    ...mapGetters(['teachers', 'loading', 'error'])
  },
  created() {
    this.fetchTeachers()
  },
  methods: {
    ...mapActions(['fetchTeachers']),

    toggleForm() {
      this.resetForm()
      this.showForm = !this.showForm
    },

    resetForm() {
      this.editingTeacher = null
      this.form = {
        names: '',
        father_surname: '',
        mother_surname: '',
        email: '',
        phone: ''
      }
    },

    async submitForm() {
      try {
        if (this.editingTeacher) {
          await api.updateTeacher(this.editingTeacher.id, this.form)
          console.log('✏️ Docente actualizado')
        } else {
          await api.createTeacher(this.form)
          console.log('✅ Docente creado')
        }
        this.fetchTeachers()
        this.showForm = false
        this.resetForm()
      } catch (err) {
        console.error('❌ Error al guardar docente:', err)
        alert('No se pudo guardar el docente')
      }
    },

    async deleteTeacher(id) {
      if (!confirm('¿Estás seguro de eliminar este docente?')) return
      try {
        await api.deleteTeacher(id)
        this.fetchTeachers()
      } catch (err) {
        console.error('❌ Error al eliminar docente:', err)
      }
    },

    editTeacher(teacher) {
      this.showForm = true
      this.editingTeacher = teacher
      this.form = {
        names: teacher.names,
        father_surname: teacher.father_surname,
        mother_surname: teacher.mother_surname,
        email: teacher.email,
        phone: teacher.phone,
        show_phone: teacher.show_phone,
        status: teacher.status
      }
    }
  }
}
</script>

<style scoped>
.table td, .table th {
  vertical-align: middle;
}
</style>
