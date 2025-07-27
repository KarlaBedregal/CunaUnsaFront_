<!-- filepath: /home/karla/KARLITA/Cuna API unsa/cuna-frontend/src/views/LoginView.vue -->
<template>
  <div class="login-container">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">🎓 Iniciar Sesión - CUNA UNSA</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="username" class="form-label">Usuario</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    v-model="form.username"
                    required
                  />
                </div>
                
                <div class="mb-3">
                  <label for="password" class="form-label">Contraseña</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="form.password"
                    required
                  />
                </div>
                
                <div class="d-grid">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="loading"
                  >
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                    {{ loading ? 'Iniciando...' : 'Iniciar Sesión' }}
                  </button>
                </div>
              </form>
              
              <div v-if="error" class="alert alert-danger mt-3">
                {{ error }}
              </div>
              
              <div class="text-center mt-3">
                <p>¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link></p>
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

export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  
  computed: {
    ...mapGetters(['loading', 'error'])
  },
  
  methods: {
    ...mapActions(['login']),
    
    async handleLogin() {
      try {
        await this.login(this.form)
        this.$router.push('/dashboard')
      } catch (error) {
        console.error('Error en login:', error)
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
  border: none;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px 15px 0 0;
}
</style>