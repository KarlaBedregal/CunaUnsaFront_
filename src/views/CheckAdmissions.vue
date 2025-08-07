<!-- filepath: c:\CUNA-UNSA-\CunaFrontend\src\views\CheckAdmission.vue -->
<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-center">
            <h3>🔍 Consultar Estado de Postulación</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="checkStatus">
              <div class="mb-3">
                <label for="studentDni" class="form-label">DNI del Estudiante:</label>
                <input 
                  id="studentDni"
                  v-model="studentDni" 
                  type="text" 
                  class="form-control" 
                  placeholder="Ingrese el DNI del estudiante"
                  required 
                  maxlength="8"
                />
                <div class="form-text">
                  Ingrese el DNI del estudiante postulante para consultar el estado
                </div>
              </div>
              <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                {{ loading ? 'Consultando...' : '🔍 Consultar Estado' }}
              </button>
            </form>

            <!-- Resultado de la consulta -->
            <div v-if="result" class="mt-4">
              <div v-if="result.found" class="alert alert-info">
                <h5>📋 Información de la Postulación</h5>
                <hr>
                <p><strong>Número de postulación:</strong> {{ result.admission.application_number }}</p>
                <p><strong>Estudiante:</strong> {{ result.admission.student_nombres }} {{ result.admission.student_apellido_paterno }}</p>
                <p><strong>Fecha de postulación:</strong> {{ formatDate(result.admission.application_date) }}</p>
                <p><strong>Estado actual:</strong> 
                  <span :class="getStatusClass(result.admission.status)" class="fw-bold">
                    {{ getStatusText(result.admission.status) }}
                  </span>
                </p>
                
                <!-- Mensajes según el estado -->
                <div v-if="result.admission.status === 'pending'" class="alert alert-warning mt-3">
                  <strong>⏳ Su postulación está en revisión</strong><br>
                  Recibirá una notificación por correo electrónico cuando haya una decisión.
                </div>
                
                <div v-else-if="result.admission.status === 'accepted'" class="alert alert-success mt-3">
                  <strong>🎉 ¡Felicitaciones! Su hijo/a ha sido aceptado/a</strong><br>
                  <p class="mb-1">Fecha de aceptación: {{ formatDate(result.admission.decision_date) }}</p>
                  <p class="mb-1">Plazo para matriculación: {{ formatDate(result.admission.enrollment_deadline) }}</p>
                  <p class="mb-0">Revise su correo electrónico para los próximos pasos e información de acceso al sistema.</p>
                </div>
                
                <div v-else-if="result.admission.status === 'rejected'" class="alert alert-danger mt-3">
                  <strong>❌ Su postulación no fue aceptada</strong><br>
                  <p class="mb-1">Fecha de decisión: {{ formatDate(result.admission.decision_date) }}</p>
                  <p v-if="result.admission.rejection_reason" class="mb-0">
                    <strong>Motivo:</strong> {{ result.admission.rejection_reason }}
                  </p>
                </div>
                
                <div v-else-if="result.admission.status === 'enrolled'" class="alert alert-primary mt-3">
                  <strong>✅ Su hijo/a ya está matriculado/a</strong><br>
                  ¡Bienvenido/a a la familia CUNA UNSA!
                </div>
              </div>
              
              <div v-else class="alert alert-warning">
                <strong>❌ No se encontró ninguna postulación</strong><br>
                No existe una postulación registrada con el DNI: <strong>{{ studentDni }}</strong>
              </div>
            </div>

            <!-- Error -->
            <div v-if="error" class="alert alert-danger mt-4">
              <strong>Error:</strong> {{ error }}
            </div>
          </div>
        </div>
        
        <!-- Enlaces adicionales -->
        <div class="text-center mt-4">
          <router-link to="/admission" class="btn btn-outline-primary me-2">
            📝 Nueva Postulación
          </router-link>
          <router-link to="/" class="btn btn-outline-secondary">
            🏠 Volver al Inicio
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'

export default {
  name: 'CheckAdmission',
  data() {
    return {
      studentDni: '',
      result: null,
      loading: false,
      error: null
    }
  },
  methods: {
    async checkStatus() {
      if (!this.studentDni || this.studentDni.length !== 8) {
        this.error = 'Por favor ingrese un DNI válido de 8 dígitos'
        return
      }

      this.loading = true
      this.error = null
      this.result = null

      try {
        const response = await api.checkAdmissionStatus(this.studentDni)
        this.result = response.data
      } catch (error) {
        this.error = 'Error al consultar el estado. Intente nuevamente.'
        console.error('Error:', error)
      } finally {
        this.loading = false
      }
    },
    
    formatDate(date) {
      if (!date) return 'No disponible'
      return new Date(date).toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    
    getStatusText(status) {
      const statusMap = {
        'pending': '⏳ Pendiente',
        'accepted': '✅ Aceptado',
        'rejected': '❌ Rechazado',
        'enrolled': '🎓 Matriculado'
      }
      return statusMap[status] || status
    },
    
    getStatusClass(status) {
      const classMap = {
        'pending': 'text-warning',
        'accepted': 'text-success',
        'rejected': 'text-danger',
        'enrolled': 'text-primary'
      }
      return classMap[status] || ''
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>