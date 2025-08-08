<template>
  <div class="dashboard-view">
    <!-- Top Navigation Bar -->
    <nav class="top-navbar">
      <div class="navbar-left">
        <img src="@/assets/img/navbar-logo.png" alt="Logo" class="navbar-logo" />
        <span class="navbar-brand">CUNA UNSA</span>
      </div>
      
      <div class="navbar-center">
        <button 
          :class="['nav-btn', { active: currentView === 'home' }]"
          @click="setCurrentView('home')"
        >
          <i class="fas fa-home"></i> Página Principal
        </button>
        <button 
          :class="['nav-btn', { active: currentView === 'courses' }]"
          @click="setCurrentView('courses')"
        >
          <i class="fas fa-book"></i> Mis Cursos
        </button>
      </div>

      <div class="navbar-right">
        <div class="status-indicator">
          <span class="status-badge online">🟢 En línea</span>
        </div>
        <div class="user-dropdown">
          <button class="user-btn" @click="toggleUserMenu">
            <i class="fas fa-user-circle"></i>
            <span>{{ currentUser?.first_name || 'Usuario' }}</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div v-show="showUserMenu" class="dropdown-menu">
            <a href="#" class="dropdown-item">
              <i class="fas fa-user"></i> Mi Perfil
            </a>
            <a href="#" class="dropdown-item">
              <i class="fas fa-cog"></i> Configuración
            </a>
            <hr class="dropdown-divider">
            <a href="#" class="dropdown-item">
              <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
            </a>
          </div>
        </div>
      </div>
    </nav>

    <div class="main-container">
      <!-- Left Sidebar -->
      <aside class="left-sidebar">
        <div class="sidebar-menu">
          <button 
            :class="['sidebar-btn', { active: currentView === 'chats' }]"
            @click="setCurrentView('chats')"
          >
            <i class="fas fa-comments"></i>
            <span>Mis Chats</span>
          </button>
          <button 
            :class="['sidebar-btn', { active: currentView === 'payments' }]"
            @click="setCurrentView('payments')"
          >
            <i class="fas fa-credit-card"></i>
            <span>Mis Pagos</span>
          </button>
          <button 
            :class="['sidebar-btn', { active: currentView === 'documents' }]"
            @click="setCurrentView('documents')"
          >
            <i class="fas fa-file-alt"></i>
            <span>Mis Documentos</span>
          </button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="main-content">
        <!-- Home View -->
        <div v-if="currentView === 'home'" class="home-content">
          <!-- Hero Section -->
          <div class="hero-section">
            <div class="hero-overlay">
              <div class="container">
                <div class="row justify-content-center text-center">
                  <div class="col-lg-8">
                    <h1 class="hero-title">BIENVENIDOS</h1>
                    <h2 class="hero-subtitle">AL AULA VIRTUAL</h2>
                    <h3 class="hero-year">2025 - B</h3>
                    <div class="hero-badge">
                      <span class="badge-icon">🎓</span>
                      <div class="badge-text">
                        <small>LICENCIADA</small>
                        <strong>10 AÑOS POR SUNEDU</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Statistics Section -->
          <div class="stats-section">
            <h4 class="text-center mb-4">📊 Estadísticas del Sistema</h4>
            <div class="row">
              <div class="col-md-3 mb-3">
                <div class="stat-card primary">
                  <div class="stat-number">{{ students?.length || 0 }}</div>
                  <div class="stat-label">👨‍🎓 Estudiantes Activos</div>
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <div class="stat-card success">
                  <div class="stat-number">{{ teachers?.length || 0 }}</div>
                  <div class="stat-label">👨‍🏫 Docentes</div>
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <div class="stat-card info">
                  <div class="stat-number">{{ courses?.length || 0 }}</div>
                  <div class="stat-label">📚 Cursos Disponibles</div>
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <div class="stat-card warning">
                  <div class="stat-number">{{ loading ? '...' : '98%' }}</div>
                  <div class="stat-label">⚡ Uptime del Sistema</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Courses View -->
        <div v-else-if="currentView === 'courses'" class="courses-content">
          <div class="content-header">
            <h2>
              <i class="fas fa-book"></i>
              Mis Cursos Disponibles
            </h2>
            <p class="text-muted">Selecciona un curso para acceder a su contenido</p>
          </div>
          
          <div class="courses-grid">
            <div 
              v-for="course in userCourses" 
              :key="course.id"
              class="course-card"
              @click="selectCourse(course)"
            >
              <div class="course-header">
                <div class="course-icon">
                  <i class="fas fa-graduation-cap"></i>
                </div>
                <h4>{{ course.nombre }}</h4>
              </div>
              <div class="course-info">
                <p class="course-description">{{ course.descripcion }}</p>
                <div class="course-meta">
                  <span class="course-level">
                    <i class="fas fa-layer-group"></i>
                    {{ course.nivel || 'Inicial' }}
                  </span>
                  <span class="course-students">
                    <i class="fas fa-users"></i>
                    {{ course.students_count || 0 }} estudiantes
                  </span>
                </div>
              </div>
              <div class="course-actions">
                <button class="btn btn-primary">
                  <i class="fas fa-play"></i>
                  Acceder
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="!userCourses || userCourses.length === 0" class="empty-state">
            <div class="empty-icon">
              <i class="fas fa-book-open"></i>
            </div>
            <h3>No tienes cursos asignados</h3>
            <p>Contacta con el administrador para que te asigne cursos</p>
          </div>
        </div>

        <!-- Chats View -->
        <div v-else-if="currentView === 'chats'" class="chats-content">
          <div class="content-header">
            <h2>
              <i class="fas fa-comments"></i>
              Mis Chats
            </h2>
            <p class="text-muted">Conversaciones con docentes y personal</p>
          </div>
          <div class="coming-soon">
            <i class="fas fa-comments"></i>
            <h3>Chats - Próximamente</h3>
            <p>Esta funcionalidad estará disponible pronto</p>
          </div>
        </div>

        <!-- Payments View -->
        <div v-else-if="currentView === 'payments'" class="payments-content">
          <div class="content-header">
            <h2>
              <i class="fas fa-credit-card"></i>
              Mis Pagos
            </h2>
            <p class="text-muted">Estado de pagos y facturas</p>
          </div>
          <div class="coming-soon">
            <i class="fas fa-credit-card"></i>
            <h3>Pagos - Próximamente</h3>
            <p>Esta funcionalidad estará disponible pronto</p>
          </div>
        </div>

        <!-- Documents View -->
        <div v-else-if="currentView === 'documents'" class="documents-content">
          <div class="content-header">
            <h2>
              <i class="fas fa-file-alt"></i>
              Mis Documentos
            </h2>
            <p class="text-muted">Documentos y archivos importantes</p>
          </div>
          <div class="coming-soon">
            <i class="fas fa-file-alt"></i>
            <h3>Documentos - Próximamente</h3>
            <p>Esta funcionalidad estará disponible pronto</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'DashboardView',
  data() {
    return {
      currentView: 'home', // 'home', 'courses', 'chats', 'payments', 'documents'
      showUserMenu: false,
      userCourses: [] // Aquí cargaremos los cursos del usuario
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'students', 'teachers', 'courses', 'loading'])
  },
  methods: {
    ...mapActions(['fetchStudents', 'fetchTeachers', 'fetchCourses']),
    
    setCurrentView(view) {
      this.currentView = view
      this.showUserMenu = false
      
      if (view === 'courses') {
        this.loadUserCourses()
      }
    },
    
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },
    
    async loadUserCourses() {
      // Aquí cargarías los cursos específicos del usuario
      // Por ahora uso datos mock
      this.userCourses = [
        {
          id: 1,
          nombre: 'Matemáticas Básicas',
          descripcion: 'Curso de matemáticas para nivel inicial',
          nivel: 'Inicial',
          students_count: 25
        },
        {
          id: 2,
          nombre: 'Comunicación Integral',
          descripcion: 'Desarrollo de habilidades comunicativas',
          nivel: 'Inicial',
          students_count: 20
        },
        {
          id: 3,
          nombre: 'Ciencia y Ambiente',
          descripcion: 'Exploración del mundo natural',
          nivel: 'Inicial',
          students_count: 22
        }
      ]
    },
    
    selectCourse(course) {
      // Aquí manejarías la selección del curso
      console.log('Curso seleccionado:', course)
      // Podrías navegar a una vista específica del curso
      this.$router.push(`/courses/${course.id}`)
    }
  },
  
  async created() {
    await this.fetchStudents()
    await this.fetchTeachers()
    await this.fetchCourses()
  },
  
  mounted() {
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.user-dropdown')) {
        this.showUserMenu = false
      }
    })
  }
}
</script>

<style scoped>
.dashboard-view {
  min-height: 100vh;
  background: #f8f9fa;
}

/* Top Navigation */
.top-navbar {
  background: linear-gradient(135deg, #dc3545, #c82333);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar-logo {
  height: 40px;
  width: auto;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.navbar-center {
  display: flex;
  gap: 1rem;
}

.nav-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.nav-btn.active {
  background: white;
  color: #dc3545;
  font-weight: 600;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-indicator {
  margin-right: 1rem;
}

.status-badge {
  background: rgba(255, 255, 255, 0.15);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.user-dropdown {
  position: relative;
}

.user-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.user-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
  min-width: 200px;
  margin-top: 0.5rem;
  border: 1px solid #e9ecef;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #495057;
  text-decoration: none;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background: #f8f9fa;
  color: #dc3545;
}

.dropdown-divider {
  margin: 0.5rem 0;
  border-color: #e9ecef;
}

/* Main Container */
.main-container {
  display: flex;
  min-height: calc(100vh - 80px);
}

/* Left Sidebar */
.left-sidebar {
  width: 250px;
  background: white;
  border-right: 1px solid #e9ecef;
  padding: 2rem 0;
  box-shadow: 2px 0 10px rgba(0,0,0,0.05);
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
}

.sidebar-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: #6c757d;
  text-align: left;
  transition: all 0.3s ease;
  font-weight: 500;
}

.sidebar-btn:hover {
  background: #f8f9fa;
  color: #dc3545;
}

.sidebar-btn.active {
  background: #dc3545;
  color: white;
}

.sidebar-btn i {
  font-size: 1.2rem;
  width: 20px;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, rgba(30, 60, 114, 0.9), rgba(42, 82, 152, 0.9));
  border-radius: 20px;
  min-height: 400px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 3rem;
}

.hero-overlay {
  position: relative;
  z-index: 2;
  width: 100%;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  margin-bottom: 0;
  letter-spacing: 2px;
}

.hero-subtitle {
  font-size: 2.5rem;
  font-weight: 600;
  color: #ffd700;
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.hero-year {
  font-size: 2rem;
  font-weight: 400;
  color: white;
  margin-bottom: 2rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 15px 25px;
  margin-top: 1rem;
}

.badge-icon {
  font-size: 2rem;
  margin-right: 15px;
}

.badge-text small {
  display: block;
  color: #ffd700;
  font-size: 0.8rem;
  font-weight: 500;
}

.badge-text strong {
  color: white;
  font-size: 1rem;
  font-weight: 700;
}

/* Statistics Section */
.stats-section {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
}

.stat-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem 1rem;
  text-align: center;
  border-left: 4px solid;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.stat-card.primary { border-left-color: #007bff; }
.stat-card.success { border-left-color: #28a745; }
.stat-card.info { border-left-color: #17a2b8; }
.stat-card.warning { border-left-color: #ffc107; }

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #6c757d;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Content Headers */
.content-header {
  margin-bottom: 2rem;
  text-align: center;
}

.content-header h2 {
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.content-header h2 i {
  color: #dc3545;
  margin-right: 0.5rem;
}

/* Courses Grid */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.course-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
  border-color: #dc3545;
}

.course-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.course-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #dc3545, #c82333);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.course-header h4 {
  color: #2c3e50;
  font-weight: 600;
  margin: 0;
}

.course-description {
  color: #6c757d;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.course-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.course-level,
.course-students {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.9rem;
}

.course-actions {
  text-align: center;
}

.course-actions .btn {
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 500;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6c757d;
}

.empty-icon {
  font-size: 4rem;
  color: #dc3545;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

/* Coming Soon */
.coming-soon {
  text-align: center;
  padding: 4rem 2rem;
  color: #6c757d;
}

.coming-soon i {
  font-size: 4rem;
  color: #dc3545;
  margin-bottom: 1rem;
}

.coming-soon h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar-center {
    gap: 0.5rem;
  }
  
  .nav-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .left-sidebar {
    width: 200px;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.8rem;
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 576px) {
  .top-navbar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .navbar-center,
  .navbar-right {
    width: 100%;
    justify-content: center;
  }
  
  .main-container {
    flex-direction: column;
  }
  
  .left-sidebar {
    width: 100%;
    order: 2;
    padding: 1rem 0;
  }
  
  .sidebar-menu {
    flex-direction: row;
    overflow-x: auto;
    padding: 0 1rem;
  }
  
  .sidebar-btn {
    flex-shrink: 0;
    min-width: 120px;
  }
}
</style>