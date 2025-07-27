<template>
  <div class="login-container">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">🎓 Iniciar Sesión</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleLogin">
                <div class="form-group">
                  <label for="username">Usuario (DNI)</label>
                  <input
                    type="text"
                    id="username"
                    v-model="form.username"
                    class="form-control"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="password">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    v-model="form.password"
                    class="form-control"
                    required
                  />
                </div>
                <div class="text-center mt-3">
                  <button type="submit" class="btn btn-primary">Ingresar</button>
                </div>
              </form>
              <p v-if="errorMessage" class="text-danger text-center mt-2">
                {{ errorMessage }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      try {
        const res = await this.login(this.form)
        // Si el login fue exitoso, redirige al dashboard
        if (res && res.success) {
          this.$router.push('/dashboard')
        } else {
          this.errorMessage = 'Credenciales inválidas.'
        }
      } catch (error) {
        this.errorMessage = 'Error al iniciar sesión.'
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  margin-top: 80px;
}
</style>
