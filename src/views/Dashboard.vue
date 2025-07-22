<!-- filepath: /home/karla/KARLITA/Cuna API unsa/cuna-frontend/src/views/DashboardView.vue -->
<template>
  <div class="dashboard-view">
    <navbar-component />
    
    <div class="container mt-4">
      <div class="row">
        <div class="col-12">
          <h1>🎓 Dashboard - CUNA</h1>
          <p class="lead">Bienvenido, {{ currentUser?.first_name }} {{ currentUser?.last_name }}</p>
        </div>
      </div>
      
      <div class="row mt-4">
        <div class="col-md-3 mb-3">
          <div class="card bg-primary text-white">
            <div class="card-body">
              <h5 class="card-title">👨‍🎓 Estudiantes</h5>
              <p class="card-text display-4">{{ students.length }}</p>
              <router-link to="/students" class="btn btn-light">Ver Todos</router-link>
            </div>
          </div>
        </div>
        
        <!-- Docentes -->
      <div class="col-md-3 mb-3">
        <div class="card bg-success text-white">
          <div class="card-body">
            <h5 class="card-title">👨‍🏫 Docentes</h5>
            <p class="card-text display-4">{{ teachers.length }}</p>
            <router-link to="/teachers" class="btn btn-light w-100">Gestionar</router-link>
          </div>
        </div>
      </div>
        
        <!-- Cursos -->
      <div class="col-md-3 mb-3">
        <div class="card bg-info text-white">
          <div class="card-body">
            <h5 class="card-title">📚 Cursos</h5>
            <p class="card-text display-4">{{ courses.length }}</p>
            <router-link to="/courses" class="btn btn-light w-100">Gestionar</router-link>
          </div>
        </div>
      </div>
        
        <div class="col-md-3 mb-3">
          <div class="card bg-warning text-white">
            <div class="card-body">
              <h5 class="card-title">📊 Estado</h5>
              <p class="card-text">{{ loading ? 'Cargando...' : 'Activo' }}</p>
              <span class="badge bg-light text-dark">Online</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5>🔧 Acciones Rápidas</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-4 mb-2">
                  <router-link to="/students" class="btn btn-outline-primary w-100">
                    👨‍🎓 Gestionar Estudiantes
                  </router-link>
                </div>
                <div class="col-md-4 mb-2">
                  <button class="btn btn-outline-success w-100" @click="fetchTeachers">
                    👨‍🏫 Ver Docentes
                  </button>
                </div>
                <div class="col-md-4 mb-2">
                  <button class="btn btn-outline-info w-100" @click="fetchCourses">
                    📚 Ver Cursos
                  </button>
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

export default {
  name: 'DashboardView',
  components: {
    NavbarComponent
  },
  
  computed: {
    ...mapGetters(['currentUser', 'students', 'teachers', 'courses', 'loading'])
  },
  
  methods: {
    ...mapActions(['fetchStudents', 'fetchTeachers', 'fetchCourses'])
  },
  
  async created() {
  await this.fetchStudents()
  await this.fetchTeachers()
  await this.fetchCourses()
  }
}
</script>