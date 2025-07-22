<!-- filepath: /home/karla/KARLITA/Cuna API unsa/cuna-frontend/src/views/RegisterView.vue -->
<template>
  <div class="register-container">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">🎓 Registro - CUNA UNSA</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleRegister">
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
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="form.email"
                    required
                  />
                </div>
                
                <div class="mb-3">
                  <label for="first_name" class="form-label">Nombre</label>
                  <input
                    type="text"
                    class="form-control"
                    id="first_name"
                    v-model="form.first_name"
                    required
                  />
                </div>
                
                <div class="mb-3">
                  <label for="last_name" class="form-label">Apellido</label>
                  <input
                    type="text"
                    class="form-control"
                    id="last_name"
                    v-model="form.last_name"
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
                
                <div class="mb-3">
                  <label for="password_confirm" class="form-label">Confirmar Contraseña</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password_confirm"
                    v-model="form.password_confirm"
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
                    {{ loading ? 'Registrando...' : 'Registrarse' }}
                  </button>
                </div>
              </form>
              
              <div v-if="error" class="alert alert-danger mt-3">
                {{ error }}
              </div>
              
              <div class="text-center mt-3">
                <p>¿Ya tienes cuenta? <router-link to="/login">Inicia sesión aquí</router-link></p>
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
  name: 'RegisterView',
  data() {
    return {
      form: {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password_confirm: ''
      }
    }
  },
  
  computed: {
    ...mapGetters(['loading', 'error'])
  },
  
  methods: {
    ...mapActions(['register']),
    
    async handleRegister() {
      try {
        await this.register(this.form)
        this.$router.push('/dashboard')
      } catch (error) {
        console.error('Error en registro:', error)
      }
    }
  }
}
</script>

<style scoped>
.register-container {
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