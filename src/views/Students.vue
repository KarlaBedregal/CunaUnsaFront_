<template>
  <div class="students-view">
    <navbar-component />

    <div class="container mt-4">
      <div class="row">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <h1>👨‍🎓 Gestión de Estudiantes</h1>
          <button class="btn btn-primary" @click="toggleForm">
            {{ showForm ? 'Cancelar' : '➕ Agregar Estudiante' }}
          </button>
        </div>
      </div>

      <div v-if="showForm" class="row mt-3">
        <div class="col-12">
          <div class="card border border-primary">
            <div class="card-body">
              <h5>{{ editingStudent ? 'Editar Estudiante' : 'Nuevo Estudiante' }}</h5>
              <form @submit.prevent="submitForm">
                <div class="row">
                  <div class="col-md-4 mb-2">
                    <input v-model="form.cui" type="text" class="form-control" placeholder="CUI" required>
                  </div>
                  <div class="col-md-4 mb-2">
                    <input v-model="form.names" type="text" class="form-control" placeholder="Nombres" required>
                  </div>
                  <div class="col-md-4 mb-2">
                    <select v-model="form.status" class="form-select">
                      <option :value="true">Activo</option>
                      <option :value="false">Inactivo</option>
                    </select>
                  </div>
                </div>
                <button type="submit" class="btn btn-success">
                  {{ editingStudent ? 'Actualizar' : 'Guardar' }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5>📋 Lista de Estudiantes</h5>
              <button class="btn btn-secondary" @click="fetchStudents">
                🔄 Actualizar
              </button>
            </div>
            <div class="card-body">
              <div v-if="loading" class="text-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Cargando...</span>
                </div>
              </div>

              <div v-else-if="error" class="alert alert-danger">
                {{ error }}
              </div>

              <div v-else-if="students.length === 0" class="text-center">
                <p>No hay estudiantes registrados</p>
              </div>

              <div v-else>
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>CUI</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Fecha Creación</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="student in students" :key="student.id">
                        <td>{{ student.id }}</td>
                        <td>{{ student.cui }}</td>
                        <td>{{ student.names }}</td>
                        <td>
                          <span :class="student.status ? 'badge bg-success' : 'badge bg-danger'">
                            {{ student.status ? 'Activo' : 'Inactivo' }}
                          </span>
                        </td>
                        <td>{{ new Date(student.created).toLocaleDateString() }}</td>
                        <td>
                          <button class="btn btn-sm btn-warning me-2" @click="editStudent(student)">✏️</button>
                          <button class="btn btn-sm btn-danger" @click="deleteStudent(student.id)">🗑️</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NavbarComponent from '@/components/common/NavbarComponent.vue'
import api from '@/services/api'

export default {
  name: 'StudentsView',
  components: {
    NavbarComponent
  },
  data() {
    return {
      showForm: false,
      editingStudent: null,
      form: {
        cui: '',
        names: '',
        status: true
      }
    }
  },
  computed: {
    ...mapGetters(['students', 'loading', 'error'])
  },
  methods: {
    ...mapActions(['fetchStudents']),

    toggleForm() {
      this.resetForm()
      this.showForm = !this.showForm
    },

    resetForm() {
      this.editingStudent = null
      this.form = { cui: '', names: '', status: true }
    },

    async submitForm() {
      try {
        if (this.editingStudent) {
          await api.updateStudent(this.editingStudent.id, this.form)
        } else {
          await api.createStudent(this.form)
        }
        this.fetchStudents()
        this.showForm = false
        this.resetForm()
      } catch (error) {
        console.error('Error al guardar estudiante:', error)
        alert('No se pudo guardar el estudiante')
      }
    },

    editStudent(student) {
      this.showForm = true
      this.editingStudent = student
      this.form = {
        cui: student.cui,
        names: student.names,
        status: student.status
      }
    },

    async deleteStudent(id) {
      if (!confirm('¿Estás seguro de eliminar este estudiante?')) return
      try {
        await api.deleteStudent(id)
        this.fetchStudents()
      } catch (error) {
        console.error('Error al eliminar estudiante:', error)
      }
    }
  },
  async created() {
    await this.fetchStudents()
  }
}
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>