<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="card shadow">
          <div class="card-header bg-primary text-white">
            <h2 class="mb-0">📝 Postulación CUNA UNSA</h2>
            <p class="mb-0">Complete el formulario para postular a su hijo/a</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitAdmission" enctype="multipart/form-data">
              
              <!-- Datos del estudiante -->
              <div class="border rounded p-3 mb-4">
                <h4 class="text-primary">👶 Datos del Estudiante</h4>
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Nombres *</label>
                    <input v-model="form.student_nombres" type="text" class="form-control" required />
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Apellido Paterno *</label>
                    <input v-model="form.student_apellido_paterno" type="text" class="form-control" required />
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Apellido Materno *</label>
                    <input v-model="form.student_apellido_materno" type="text" class="form-control" required />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <label class="form-label">DNI *</label>
                    <input v-model="form.student_dni" type="text" class="form-control" maxlength="8" required />
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Fecha de Nacimiento *</label>
                    <input v-model="form.student_fecha_nacimiento" type="date" class="form-control" required />
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Sexo *</label>
                    <select v-model="form.student_sexo" class="form-control" required>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Lugar de Nacimiento *</label>
                    <input v-model="form.student_lugar_nacimiento" type="text" class="form-control" required />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Domicilio Actual *</label>
                    <input v-model="form.student_domicilio" type="text" class="form-control" required />
                  </div>
                </div>
              </div>

              <!-- Datos del padre -->
              <div class="border rounded p-3 mb-4">
                <h4 class="text-info">👨 Datos del Padre</h4>
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Nombres *</label>
                    <input v-model="form.father_nombres" type="text" class="form-control" required />
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Apellido Paterno *</label>
                    <input v-model="form.father_apellido_paterno" type="text" class="form-control" required />
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Apellido Materno *</label>
                    <input v-model="form.father_apellido_materno" type="text" class="form-control" required />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3 mb-3">
                    <label class="form-label">DNI *</label>
                    <input v-model="form.father_dni" type="text" class="form-control" maxlength="8" required />
                  </div>
                  <div class="col-md-3 mb-3">
                    <label class="form-label">Celular *</label>
                    <input v-model="form.father_celular" type="text" class="form-control" required />
                  </div>
                  <div class="col-md-3 mb-3">
                    <label class="form-label">Correo *</label>
                    <input v-model="form.father_correo" type="email" class="form-control" required />
                  </div>
                  <div class="col-md-3 mb-3">
                    <label class="form-label">Ocupación *</label>
                    <input v-model="form.father_ocupacion" type="text" class="form-control" required />
                  </div>
                </div>
              </div>

              <!-- Datos de la madre -->
              <div class="border rounded p-3 mb-4">
                <h4 class="text-success">👩 Datos de la Madre</h4>
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Nombres *</label>
                    <input v-model="form.mother_nombres" type="text" class="form-control" required />
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Apellido Paterno *</label>
                    <input v-model="form.mother_apellido_paterno" type="text" class="form-control" required />
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Apellido Materno *</label>
                    <input v-model="form.mother_apellido_materno" type="text" class="form-control" required />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3 mb-3">
                    <label class="form-label">DNI *</label>
                    <input v-model="form.mother_dni" type="text" class="form-control" maxlength="8" required />
                  </div>
                  <div class="col-md-3 mb-3">
                    <label class="form-label">Celular *</label>
                    <input v-model="form.mother_celular" type="text" class="form-control" required />
                  </div>
                  <div class="col-md-3 mb-3">
                    <label class="form-label">Correo *</label>
                    <input v-model="form.mother_correo" type="email" class="form-control" required />
                  </div>
                  <div class="col-md-3 mb-3">
                    <label class="form-label">Ocupación *</label>
                    <input v-model="form.mother_ocupacion" type="text" class="form-control" required />
                  </div>
                </div>
              </div>

              <!-- Documentos -->
              <div class="border rounded p-3 mb-4">
                <h4 class="text-warning">📄 Documentos Requeridos</h4>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Partida de Nacimiento</label>
                    <input type="file" @change="handleFile('birth_certificate', $event)" 
                           class="form-control" accept=".pdf,.jpg,.png" />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Foto del Estudiante</label>
                    <input type="file" @change="handleFile('student_photo', $event)" 
                           class="form-control" accept=".jpg,.png" />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Copia DNI del Padre</label>
                    <input type="file" @change="handleFile('father_dni_copy', $event)" 
                           class="form-control" accept=".pdf,.jpg,.png" />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Copia DNI de la Madre</label>
                    <input type="file" @change="handleFile('mother_dni_copy', $event)" 
                           class="form-control" accept=".pdf,.jpg,.png" />
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Certificado Médico</label>
                  <input type="file" @change="handleFile('medical_certificate', $event)" 
                         class="form-control" accept=".pdf,.jpg,.png" />
                </div>
              </div>

              <!-- Información adicional -->
              <div class="border rounded p-3 mb-4">
                <h4 class="text-secondary">ℹ️ Información Adicional</h4>
                <div class="form-check mb-3">
                  <input v-model="form.has_siblings_in_school" type="checkbox" class="form-check-input" id="siblings">
                  <label class="form-check-label" for="siblings">
                    ¿Tiene hermanos estudiando en CUNA UNSA?
                  </label>
                </div>
                <div v-if="form.has_siblings_in_school" class="mb-3">
                  <label class="form-label">Nombres de los hermanos</label>
                  <textarea v-model="form.sibling_names" class="form-control" rows="2"></textarea>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Necesidades especiales</label>
                    <textarea v-model="form.special_needs" class="form-control" rows="3" 
                              placeholder="Describa cualquier necesidad especial..."></textarea>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Alergias</label>
                    <textarea v-model="form.allergies" class="form-control" rows="3" 
                              placeholder="Describa cualquier alergia..."></textarea>
                  </div>
                </div>
              </div>

              <!-- Botones -->
              <div class="text-center">
                <button type="submit" class="btn btn-primary btn-lg me-3" :disabled="submitting">
                  <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
                  {{ submitting ? 'Enviando...' : 'Enviar Postulación' }}
                </button>
                <button type="button" @click="resetForm" class="btn btn-secondary btn-lg">
                  Limpiar Formulario
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'

export default {
  name: 'AdmissionView',
  data() {
    return {
      submitting: false,
      form: {
        // Estudiante
        student_nombres: '',
        student_apellido_paterno: '',
        student_apellido_materno: '',
        student_dni: '',
        student_fecha_nacimiento: '',
        student_sexo: 'M',
        student_lugar_nacimiento: '',
        student_domicilio: '',
        
        // Padre
        father_nombres: '',
        father_apellido_paterno: '',
        father_apellido_materno: '',
        father_dni: '',
        father_celular: '',
        father_correo: '',
        father_ocupacion: '',
        
        // Madre
        mother_nombres: '',
        mother_apellido_paterno: '',
        mother_apellido_materno: '',
        mother_dni: '',
        mother_celular: '',
        mother_correo: '',
        mother_ocupacion: '',
        
        // Documentos
        birth_certificate: null,
        student_photo: null,
        father_dni_copy: null,
        mother_dni_copy: null,
        medical_certificate: null,
        
        // Adicional
        has_siblings_in_school: false,
        sibling_names: '',
        special_needs: '',
        allergies: ''
      }
    }
  },
  methods: {
    handleFile(field, event) {
      this.form[field] = event.target.files[0]
    },
    
    async submitAdmission() {
      this.submitting = true
      
      const formData = new FormData()
      
      // Agregar todos los campos al FormData
      Object.keys(this.form).forEach(key => {
        if (this.form[key] !== null && this.form[key] !== '') {
          formData.append(key, this.form[key])
        }
      })
      
      try {
        const response = await api.createAdmission(formData)
        
        this.$swal({
          title: '¡Postulación Enviada!',
          text: `Su postulación ha sido registrada exitosamente. Número de postulación: ${response.data.application_number || 'En proceso'}`,
          icon: 'success',
          confirmButtonText: 'Entendido'
        }).then(() => {
          this.resetForm()
          this.$router.push('/')
        })
        
      } catch (error) {
        console.error('Error al enviar postulación:', error)
        this.$swal({
          title: 'Error',
          text: 'Hubo un problema al enviar su postulación. Inténtelo nuevamente.',
          icon: 'error',
          confirmButtonText: 'Reintentar'
        })
      } finally {
        this.submitting = false
      }
    },
    
    resetForm() {
      // Reiniciar todos los campos
      Object.keys(this.form).forEach(key => {
        if (typeof this.form[key] === 'boolean') {
          this.form[key] = false
        } else if (key === 'student_sexo') {
          this.form[key] = 'M'
        } else {
          this.form[key] = ''
        }
      })
      
      // Limpiar archivos
      const fileInputs = document.querySelectorAll('input[type="file"]')
      fileInputs.forEach(input => input.value = '')
    }
  }
}
</script>

<style scoped>
.form-label {
  font-weight: 600;
  color: #495057;
}

.border {
  border-color: #dee2e6 !important;
}

.card {
  border: none;
}

.form-control:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn-lg {
  padding: 0.75rem 1.5rem;
}
</style>