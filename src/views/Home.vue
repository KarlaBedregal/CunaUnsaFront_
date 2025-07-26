<template>
  <div class="layout-wrapper">
    <div class="home-view">
      <!-- NAVBAR -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
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

      <!-- HERO -->
      <header class="masthead">
        <div class="container">
          <div class="row align-items-center py-5">
            <div class="col-md-6">
              <div class="masthead-subheading">Bienvenidos a Cuna UNSA</div>
              <div class="masthead-heading text-uppercase">Educación con amor y excelencia</div>
              <p class="lead text-white">
                Sistema de gestión académica para la Universidad Nacional de San Agustín
              </p>
              <div class="mt-4">
                <router-link to="/login" class="btn btn-primary btn-lg me-3">Iniciar Sesión</router-link>
                <router-link to="/register" class="btn btn-outline-light btn-lg">Registrarse</router-link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- SERVICIOS -->
      <section class="page-section" id="services">
        <div class="container">
          <div class="text-center">
            <h2 class="section-heading text-uppercase">Nuestros Servicios</h2>
            <h3 class="section-subheading text-muted">Crecemos aprendiendo, jugando y descubriendo.</h3>
          </div>
          <div class="row text-center">
            <div class="col-md-4 mb-5" v-for="(servicio, i) in servicios" :key="i">
              <div class="icon-wrapper mb-3">
                <span class="fa-stack custom-size">
                  <i class="fas fa-circle fa-stack-2x custom-service-icon"></i>
                  <i :class="servicio.icono" class="fa-stack-1x fa-inverse"></i>
                </span>
              </div>
              <h4 class="my-2">{{ servicio.titulo }}</h4>
              <p class="text-muted">{{ servicio.descripcion }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- FUNCIONALIDADES -->
      <section id="funcionalidades" class="features-section mt-3">
        <div class="container">
          <div class="text-center mb-5">
            <h2 class="section-heading text-uppercase">Funcionalidades del Sistema</h2>
            <h3 class="section-subheading text-muted">Explora lo que puedes gestionar en Cuna UNSA</h3>
          </div>
          <div class="row">
            <div
              class="col-md-4 mb-4"
              v-for="(funcion, i) in funcionalidades"
              :key="i"
            >
              <div class="card h-100 text-center text-white" @click="goToLogin" style="cursor: pointer;">
                <div class="card-body">
                  <h5 class="card-title">{{ funcion.titulo }}</h5>
                  <p class="card-text">{{ funcion.descripcion }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="footer mt-4 py-3 text-center text-white">
        <div class="container">
          <p class="mb-0 small">
            Hecho por: <strong>Karla Miluska Bedregal Coaguila</strong>,
            <strong>Jack Franco Llaique Chullunquia</strong>,
            <strong>Laura Lucia Vilca Huarca</strong>
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      servicios: [
        {
          titulo: 'Educación Integral',
          icono: 'fas fa-book-open',
          descripcion:
            'Fomentamos el desarrollo cognitivo, emocional y social a través de un currículo diseñado por especialistas en educación inicial.'
        },
        {
          titulo: 'Arte y Creatividad',
          icono: 'fas fa-paint-brush',
          descripcion:
            'Actividades lúdicas y artísticas para que los niños desarrollen su imaginación y expresión personal desde temprana edad.'
        },
        {
          titulo: 'Cuidado y Bienestar',
          icono: 'fas fa-heartbeat',
          descripcion:
            'Ambiente seguro, saludable y acogedor con personal capacitado para el cuidado integral de cada niño y niña.'
        }
      ],
      funcionalidades: [
        {
          titulo: '👨‍🎓 Gestión de Estudiantes',
          descripcion: 'Administra información completa de estudiantes'
        },
        {
          titulo: '👨‍🏫 Gestión de Docentes',
          descripcion: 'Control completo del personal docente'
        },
        {
          titulo: '📚 Gestión de Cursos',
          descripcion: 'Administración de cursos y materias'
        }
      ]
    }
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

html,
body {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
  background-color: transparent;
}

/* NAVBAR */
.navbar {
  background-color: #1b1b1b !important;
}

.navbar-nav .nav-link {
  color: #e63946 !important;
}

.navbar-nav .nav-link:hover {
  color: #d62839 !important;
}

/* HERO */
header.masthead {
  padding-top: 10rem;
  padding-bottom: 6rem;
  background-image: url('@/assets/img/header-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  z-index: 1;
  text-align: left;
}

header.masthead::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 0;
}

header.masthead * {
  position: relative;
  z-index: 1;
  color: white !important;
}

.masthead-subheading {
  font-size: 1.5rem;
  font-style: italic;
}

.masthead-heading {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

/* ICONOS */
.custom-service-icon {
  color: #d72638;
}

.fa-stack-1x {
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* SECCIONES */
.section-heading {
  color: #b3001b;
  font-weight: bold;
}

.section-subheading {
  color: #6c757d;
}

/* CARDS */
.card {
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  background-color: rgba(255, 255, 255, 0.2);
}

.card-title {
  color: black;
}

/* BOTONES */
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

/* FOOTER */
.footer {
  background-color: #222;
  color: #ccc;
  font-size: 0.95rem;
}
</style>
