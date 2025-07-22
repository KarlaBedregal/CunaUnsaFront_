<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-header bg-info text-white d-flex justify-content-between align-items-center">
        <h4 class="mb-0">📚 Lista de Cursos</h4>
        <button class="btn btn-light btn-sm" @click="toggleForm">
          {{ showForm ? 'Cancelar' : '➕ Agregar Curso' }}
        </button>
      </div>

      <!-- FORMULARIO -->
      <div v-if="showForm" class="card-body border border-info p-3 mb-3">
        <h5>{{ editingCourse ? 'Editar Curso' : 'Nuevo Curso' }}</h5>
        <form @submit.prevent="submitForm">
          <div class="row">
            <div class="col-md-6 mb-2">
              <input v-model="form.name" type="text" class="form-control" placeholder="Nombre del curso" required>
            </div>
            <div class="col-md-6 mb-2">
              <input v-model="form.code" type="text" class="form-control" placeholder="Código" required>
            </div>
            <div class="col-md-4 mb-2">
              <input v-model.number="form.credits" type="number" class="form-control" placeholder="Créditos" required>
            </div>
            <div class="col-md-4 mb-2">
              <input v-model.number="form.year" type="number" class="form-control" placeholder="Año" required>
            </div>
            <div class="col-md-4 mb-2">
              <select v-model="form.bimester" class="form-select" required>
                <option disabled value="">Selecciona Bimestre</option>
                <option value="1">Primer Bimestre</option>
                <option value="2">Segundo Bimestre</option>
                <option value="3">Tercer Bimestre</option>
                <option value="4">Cuarto Bimestre</option>
              </select>
            </div>
            <div class="col-md-12 mb-2">
              <div class="form-check">
                <input v-model="form.status" class="form-check-input" type="checkbox" id="status">
                <label class="form-check-label" for="status">Activo</label>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-info text-white">
            {{ editingCourse ? 'Actualizar' : 'Guardar' }}
          </button>
        </form>
      </div>

      <!-- TABLA -->
      <div class="card-body">
        <div v-if="loading" class="alert alert-info">Cargando cursos...</div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <table class="table table-bordered table-hover table-striped text-center align-middle" v-if="courses.length">
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Código</th>
              <th>Créditos</th>
              <th>Año</th>
              <th>Bimestre</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(course, index) in courses" :key="course.id">
              <td>{{ index + 1 }}</td>
              <td>{{ course.name }}</td>
              <td>{{ course.code }}</td>
              <td>{{ course.credits }}</td>
              <td>{{ course.year }}</td>
              <td>{{ course.bimester }}</td>
              <td>
                <span :class="course.status ? 'text-success fw-bold' : 'text-danger fw-bold'">
                  {{ course.status ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-warning me-2" @click="editCourse(course)">✏️</button>
                <button class="btn btn-sm btn-danger" @click="deleteCourse(course.id)">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="!courses.length && !loading && !error" class="text-center text-muted">
          No hay cursos registrados.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import api from '@/services/api'

export default {
  name: 'CoursesView',
  data() {
    return {
      showForm: false,
      editingCourse: null,
      form: {
        name: '',
        code: '',
        credits: null,
        year: null,
        bimester: '',
        status: true
      }
    }
  },
  computed: {
    ...mapGetters(['courses', 'loading', 'error'])
  },
  created() {
    this.fetchCourses()
  },
  methods: {
    ...mapActions(['fetchCourses']),

    toggleForm() {
      this.resetForm()
      this.showForm = !this.showForm
    },

    resetForm() {
      this.editingCourse = null
      this.form = {
        name: '',
        code: '',
        credits: null,
        year: null,
        bimester: '',
        status: true
      }
    },

    async submitForm() {
      try {
        if (this.editingCourse) {
          await api.updateCourse(this.editingCourse.id, this.form)
        } else {
          await api.createCourse(this.form)
        }
        this.fetchCourses()
        this.showForm = false
        this.resetForm()
      } catch (err) {
        console.error('❌ Error al guardar curso:', err)
        alert('No se pudo guardar el curso')
      }
    },

    async deleteCourse(id) {
      if (!confirm('¿Estás seguro de eliminar este curso?')) return
      try {
        await api.deleteCourse(id)
        this.fetchCourses()
      } catch (err) {
        console.error('❌ Error al eliminar curso:', err)
      }
    },

    editCourse(course) {
      this.showForm = true
      this.editingCourse = course
      this.form = {
        name: course.name,
        code: course.code,
        credits: course.credits,
        year: course.year,
        bimester: course.bimester,
        status: course.status
      }
    }
  }
}
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>