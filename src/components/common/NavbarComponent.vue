<!-- filepath: /home/karla/KARLITA/Cuna API unsa/cuna-frontend/src/components/common/NavbarComponent.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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
            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/students">Estudiantes</router-link>
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
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#" @click="handleLogout">
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