<!-- filepath: /home/karla/KARLITA/Cuna API unsa/cuna-frontend/src/components/common/NavbarComponent.vue -->
<template>
  <nav class="navbar navbar-expand-lg custom-navbar">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        🎓 CUNA UNSA
      </router-link>
      
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard">Página Principal</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/personal">Área Personal</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/announcements">Anuncios</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/courses">Curso</router-link>
          </li>
        </ul>
        
        <ul class="navbar-nav">
          <li class="nav-item dropdown" v-if="isAuthenticated">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
            >
              👤 {{ currentUser?.username }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <router-link class="dropdown-item" to="/profile">👤 Perfil</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/grades">📊 Calificaciones</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/calendar">📅 Calendario</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/files">📁 Archivos privados</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/reports">📋 Informes</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/preferences">⚙️ Preferencias</router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a class="dropdown-item text-danger" href="#" @click="handleLogout">
                  🚪 Cerrar Sesión
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item" v-else>
            <router-link class="nav-link" to="/login">Iniciar Sesión</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NavbarComponent',
  
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser'])
  },
  
  methods: {
    ...mapActions(['logout']),
    
    async handleLogout() {
      await this.logout()
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
.custom-navbar {
  background-color: #8B1538 !important;
  color: #FFFFFF;
}

.custom-navbar .nav-link {
  color: #FFFFFF !important;
  font-weight: 500;
  transition: color 0.3s ease;
}

.custom-navbar .nav-link:hover {
  color: #FFD700 !important; /* dorado al pasar el mouse */
}

.custom-navbar .navbar-brand {
  color: #FFFFFF !important;
  font-weight: bold;
}
.dropdown-menu {
  border-radius: 10px;
  padding: 0.5rem;
  min-width: 200px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>