<template>
  <div class="dashboard-view">
    <navbar-component />

    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-overlay">
        <div class="container">
          <div class="row justify-content-center text-center">
            <div class="col-lg-8">
              <h1 class="hero-title">BIENVENIDOS</h1>
              <h2 class="hero-subtitle">AL AULA VIRTUAL</h2>
              <h3 class="hero-year">2025 - A</h3>
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

    <!-- Main Dashboard Content -->
    <div class="container-fluid dashboard-content">
      <!-- Office Header -->
      <div class="row mb-5">
        <div class="col-12 text-center">
          <h2 class="office-title">Oficina de Tecnologías de la Información</h2>
        </div>
      </div>

      <!-- Main Action Cards -->
      <div class="row justify-content-center mb-5">
        <div
          v-for="card in dashboardCards"
          :key="card.title"
          class="col-lg-4 col-md-6 mb-4"
        >
          <div :class="['action-card', card.class]">
            <div class="card-icon">
              <div class="icon-circle">
                <i :class="card.icon"></i>
              </div>
            </div>
            <div class="card-content">
              <h3>{{ card.title }}</h3>
              <p>{{ card.description }}</p>
              <div class="card-actions">
                <router-link
                  v-for="btn in card.buttons"
                  :key="btn.text"
                  :to="btn.route"
                  :class="btn.class"
                >
                  <i :class="btn.icon"></i> {{ btn.text }}
                  <span v-if="btn.count !== undefined">({{ btn.count }})</span>
                </router-link>
                <button
                  v-if="card.help"
                  class="btn btn-outline-primary"
                  @click="openStudentHelp"
                >
                  <i class="fas fa-question-circle"></i> Centro de Ayuda
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics Section -->
      <div class="row mb-5">
        <div class="col-12">
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
      </div>

      <!-- Quick Actions -->
      <div class="row">
        <div class="col-12">
          <div class="quick-actions">
            <h4 class="text-center mb-4">🚀 Acciones Rápidas</h4>
            <div class="row justify-content-center">
              <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
                <button class="quick-action-btn" @click="fetchStudents">
                  <i class="fas fa-user-plus"></i>
                  <span>Nuevo Estudiante</span>
                </button>
              </div>
              <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
                <button class="quick-action-btn" @click="fetchTeachers">
                  <i class="fas fa-chalkboard"></i>
                  <span>Gestionar Aulas</span>
                </button>
              </div>
              <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
                <button class="quick-action-btn" @click="fetchCourses">
                  <i class="fas fa-calendar-alt"></i>
                  <span>Programar Clase</span>
                </button>
              </div>
              <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
                <button class="quick-action-btn" @click="generateReport">
                  <i class="fas fa-chart-bar"></i>
                  <span>Generar Reporte</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- User Info Footer -->
      <div class="row mt-5">
        <div class="col-12 text-center">
          <div class="user-info">
            <p class="mb-2">Bienvenido, <strong>{{ currentUser?.first_name }} {{ currentUser?.last_name }}</strong></p>
            <p class="text-muted">Última conexión: {{ new Date().toLocaleDateString('es-PE') }}</p>
            <span class="status-badge online">🟢 En línea</span>
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
  data() {
    return {
      dashboardCards: [
        {
          title: 'Ayuda Estudiante',
          description: 'Soporte y asistencia para estudiantes en el uso de la plataforma virtual',
          icon: 'fas fa-user-graduate',
          class: 'student-help',
          buttons: [
            {
              text: 'Gestionar Estudiantes',
              route: '/students',
              icon: 'fas fa-users',
              class: 'btn btn-primary',
              count: this.students?.length
            }
          ],
          help: true
        },
        {
          title: 'App Aulas Virtuales',
          description: 'Acceso a las aulas virtuales y herramientas de enseñanza digital',
          icon: 'fas fa-chalkboard-teacher',
          class: 'virtual-classroom',
          buttons: [
            {
              text: 'Ver Cursos',
              route: '/courses',
              icon: 'fas fa-book',
              class: 'btn btn-success',
              count: this.courses?.length
            },
            {
              text: 'Docentes',
              route: '/teachers',
              icon: 'fas fa-chalkboard-teacher',
              class: 'btn btn-outline-success'
            }
          ]
        },
        {
          title: 'Pagos y Documentos',
          description: 'Gestión de pagos y documentos importantes',
          icon: 'fas fa-file-invoice-dollar',
          class: 'payments-docs',
          buttons: [
            {
              text: 'Pagos',
              route: '/payments',
              icon: 'fas fa-money-check-alt',
              class: 'btn btn-danger'
            },
            {
              text: 'Documentos',
              route: '/documents',
              icon: 'fas fa-file-alt',
              class: 'btn btn-outline-secondary'
            }
          ]
        }
      ]
    }
  },
  methods: {
    ...mapActions(['fetchStudents', 'fetchTeachers', 'fetchCourses']),
    openStudentHelp() {
      alert('Abriendo centro de ayuda para estudiantes')
    },
    generateReport() {
      alert('Generando reporte del sistema')
    }
  },
  async created() {
    await this.fetchStudents()
    await this.fetchTeachers()
    await this.fetchCourses()
  }
}
</script>
<style scoped>
.dashboard-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, rgba(30, 60, 114, 0.9), rgba(42, 82, 152, 0.9)),
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="%23f0f0f0" width="1200" height="600"/></svg>');
  background-size: cover;
  background-position: center;
  min-height: 400px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(30, 60, 114, 0.8), rgba(42, 82, 152, 0.6));
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

/* Dashboard Content */
.dashboard-content {
  background: white;
  margin-top: -50px;
  border-radius: 20px 20px 0 0;
  position: relative;
  z-index: 3;
  padding: 4rem 2rem 2rem;
  box-shadow: 0 -10px 30px rgba(0,0,0,0.1);
}

.office-title {
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 3rem;
  position: relative;
}

.office-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

/* Action Cards */
.action-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  height: 100%;
  border: 1px solid #e9ecef;
}

.action-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.card-icon {
  text-align: center;
  margin-bottom: 2rem;
}

.icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  margin: 0 auto;
}

.student-help .icon-circle {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.virtual-classroom .icon-circle {
  background: linear-gradient(135deg, #f093fb, #f5576c);
}

.payments-docs .icon-circle {
  background: linear-gradient(135deg, #43cea2, #185a9d);
}

.card-content h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}

.card-content p {
  color: #6c757d;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.card-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-actions .btn {
  border-radius: 10px;
  padding: 12px 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

/* Statistics Section */
.stats-section {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 2rem;
}

.stat-card {
  background: white;
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

/* Quick Actions */
.quick-actions {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 15px;
  padding: 2rem;
  color: white;
}

.quick-actions h4 {
  color: white;
}

.quick-action-btn {
  width: 100%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.quick-action-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-3px);
  color: white;
}

.quick-action-btn i {
  font-size: 2rem;
}

.quick-action-btn span {
  font-weight: 500;
  font-size: 0.9rem;
}

/* User Info */
.user-info {
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 15px;
  margin-bottom: 2rem;
}

.status-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-badge.online {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  .hero-subtitle {
    font-size: 1.8rem;
  }
  .hero-year {
    font-size: 1.5rem;
  }
  .office-title {
    font-size: 2rem;
  }
  .action-card {
    padding: 2rem 1.5rem;
  }
  .dashboard-content {
    padding: 3rem 1rem 2rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }
  .hero-subtitle {
    font-size: 1.5rem;
  }
  .card-actions {
    gap: 0.5rem;
  }
  .card-actions .btn {
    padding: 10px 15px;
    font-size: 0.9rem;
  }
}
</style>