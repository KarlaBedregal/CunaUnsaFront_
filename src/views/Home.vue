<template>
  <div class="layout-wrapper">
  <div class="home-view">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand d-flex align-items-center" to="/">
          <img src="@/assets/img/navbar-logo.png" alt="Logo" class="img-fluid me-2" style="height: 40px;" />
        </router-link>
        <div class="navbar-nav ms-auto">
          <router-link to="/about-us" class="nav-link">Acerca de nosotros</router-link>
          <router-link to="/login" class="nav-link">Iniciar Sesión</router-link>
          <router-link to="/register" class="nav-link">Registro</router-link>
        </div>
      </div>
    </nav>
    <header class="masthead">
      <div class="container">
        <!-- HERO + SISTEMA ACADÉMICO -->
        <div class="row align-items-center py-5">
          <!-- COLUMNA IZQUIERDA -->
          <div class="col-md-6">
            <div class="masthead-subheading">Bienvenidos a Cuna UNSA</div>
            <div class="masthead-heading text-uppercase">Educación con amor y excelencia</div>
            <p class="lead text-white">
              Sistema de gestión académica para la Universidad Nacional de San Agustín
            </p>
            <div class="mt-4">
              <router-link to="/login" class="btn btn-primary btn-lg me-3">
                Iniciar Sesión
              </router-link>
              <router-link to="/register" class="btn btn-outline-light btn-lg">
                Registrarse
              </router-link>
            </div>
          </div>

        </div> <!-- row -->
      </div> <!-- container -->
    </header>
    <section class="page-section" id="services">
      <div class="container">
        <div class="text-center">
          <h2 class="section-heading text-uppercase">Nuestros Servicios</h2>
          <h3 class="section-subheading text-muted">Crecemos aprendiendo, jugando y descubriendo.</h3>
        </div>
        <div class="row text-center">
          <div class="col-md-4 mb-5">
            <div class="icon-wrapper mb-3">
              <span class="fa-stack custom-size">
                <i class="fas fa-circle fa-stack-2x custom-service-icon"></i>
                <i class="fas fa-book-open fa-stack-1x fa-inverse"></i>
              </span>
            </div>
            <h4 class="my-2">Educación Integral</h4>
            <p class="text-muted">Fomentamos el desarrollo cognitivo, emocional y social a través de un currículo diseñado por especialistas en educación inicial.</p>
          </div>
          <div class="col-md-4 mb-5">
            <div class="icon-wrapper mb-3">
              <span class="fa-stack custom-size">
                <i class="fas fa-circle fa-stack-2x custom-service-icon"></i>
                <i class="fas fa-paint-brush fa-stack-1x fa-inverse"></i>
              </span>
            </div>
            <h4 class="my-2">Arte y Creatividad</h4>
            <p class="text-muted">Actividades lúdicas y artísticas para que los niños desarrollen su imaginación y expresión personal desde temprana edad.</p>
          </div>
          <div class="col-md-4 mb-5">
            <div class="icon-wrapper mb-3">
              <span class="fa-stack custom-size">
                <i class="fas fa-circle fa-stack-2x custom-service-icon"></i>
                <i class="fas fa-heartbeat fa-stack-1x fa-inverse"></i>
              </span>
            </div>
            <h4 class="my-2">Cuidado y Bienestar</h4>
            <p class="text-muted">Ambiente seguro, saludable y acogedor con personal capacitado para el cuidado integral de cada niño y niña.</p>
          </div>
        </div>
      </div>
    </section>

        <!-- FUNCIONALIDADES (TARJETAS) -->
    <section id="funcionalidades" class="features-section mt-3">
        <div class="container">
              <div class="text-center mb-5">
                <h2 class="section-heading text-uppercase">Funcionalidades del Sistema</h2>
                <h3 class="section-subheading text-muted">Explora lo que puedes gestionar en Cuna UNSA</h3>
              </div>
              <div class="row">
                <div class="col-md-4 mb-4">
                  <div class="card h-100" @click="goToLogin" style="cursor: pointer;">
                    <div class="card-body text-center text-white">
                      <h5 class="card-title">👨‍🎓 Gestión de Estudiantes</h5>
                      <p class="card-text">Administra información completa de estudiantes</p>
                    </div>
                  </div>
                </div>

                <div class="col-md-4 mb-4">
                  <div class="card h-100" @click="goToLogin" style="cursor: pointer;">
                    <div class="card-body text-center text-white">
                      <h5 class="card-title">👨‍🏫 Gestión de Docentes</h5>
                      <p class="card-text">Control completo del personal docente</p>
                    </div>
                  </div>
                </div>

                <div class="col-md-4 mb-4">
                  <div class="card h-100" @click="goToLogin" style="cursor: pointer;">
                    <div class="card-body text-center text-white">
                      <h5 class="card-title">📚 Gestión de Cursos</h5>
                      <p class="card-text">Administración de cursos y materias</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
    </section>

    <footer class="footer mt-4 py-3 text-center text-white">
      <div class="container">
        <p class="mb-0 small">
          Hecho por: <strong>Karla Miluska Bedregal Coaguila</strong> (100%) 
          <strong>Jack Franco Llaique Chullunquia</strong> (100%) <strong>Laura Lucia Vilca Huarca</strong> (100%)
        </p>
      </div>
    </footer>
  </div>
  </div>
</template>

<script>
//import api from '@/services/api'

export default {
  name: 'HomeView',
  data() {
    return {
      apiStatus: null
    }
  },
  methods: {
    async testConnection() {
      this.apiStatus = '✅ API activa :)'
    },
    goToLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

.masthead-subheading {
  font-size: 1.5rem;
  color: #f8f9fa;
  margin-bottom: 1rem;
  font-style: italic;
}

.masthead-heading {
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2rem;
}

header.masthead {
  padding-top: 10.5rem;
  padding-bottom: 6rem;
  text-align: center;
  color: white;
  background-image: url('@/assets/img/header-bg.jpg');
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: center center;
  background-size: cover;
  position: relative;
  z-index: 1;
}

/* Filtro oscuro encima del fondo */
header.masthead::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.45); /* puedes ajustar la opacidad */
  z-index: 0;
}

header.masthead * {
  color: white !important;
  position: relative;
  z-index: 1;
}

.navbar {
  background-color: #1b1b1b !important;
}

.navbar-nav .nav-link {
  color: #e63946 !important; /* Coral brillante */
}

.navbar-nav .nav-link:hover,
.navbar-nav .nav-link.active {
  color: #d62839 !important; /* Coral más intenso al hacer hover o estar activo */
}

/* Círculo de fondo para los íconos */
.custom-service-icon {
  color: #d72638; /* rojo coral */
}

/* Íconos blancos centrados correctamente */
.fa-stack-1x {
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}


/* Títulos y texto */
.section-heading {
  color: #b3001b;
}

.section-subheading {
  color: #6c757d;
}

/* Ajuste general si deseas más espacio entre ítems */
#services .col-md-4 {
  margin-bottom: 2rem;
}


.welcome-card {
  background: rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(6px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.features-section {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 60px 0;
  border-radius: 20px;
  margin-top: 30px;
}

.section-heading {
  font-size: 2rem;
  font-weight: bold;
  color: #b3001b;
}

.section-subheading {
  font-size: 1rem;
  color: #6c757d;
}


.card {
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 15px;
  transition: transform 0.3s ease, background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.card:hover {
  transform: translateY(-10px);
  background-color: rgba(255, 255, 255, 0.2);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: black;
}

.footer {
  background-color: #222;
  color: #ccc;
  font-size: 0.95rem;
  padding: 1rem 0;
}

.btn-outline-light:hover {
  background-color: white;
  color: #333;
}

.btn-primary {
  background-color: #ffe66d;
  border: none;
  color: #333;
}

.btn-primary:hover {
  background-color: #ffd700;
}

html, body {
  background-color: transparent;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
}


</style>
