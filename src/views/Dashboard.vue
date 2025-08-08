<template>
  <div class="dashboard-view">
    <!-- Top Navigation Bar -->
    <nav class="top-navbar">
      <div class="navbar-left">
        <img src="@/assets/img/navbar-logo.png" alt="Logo" class="navbar-logo" />
        <span class="navbar-brand">CUNA UNSA</span>
      </div>
      
      <div class="navbar-center">
        <button 
          :class="['nav-btn', { active: currentView === 'home' }]"
          @click="setCurrentView('home')"
        >
          <i class="fas fa-home"></i> Página Principal
        </button>
        <button 
          :class="['nav-btn', { active: currentView === 'courses' }]"
          @click="setCurrentView('courses')"
        >
          <i class="fas fa-book"></i> Mis Cursos
        </button>
      </div>

      <div class="navbar-right">
        <div class="status-indicator">
          <span class="status-badge online">🟢 En línea</span>
        </div>
        <div class="user-dropdown" @click.stop>
          <button class="user-btn" @click="toggleUserMenu">
            <i class="fas fa-user-circle"></i>
            <span>{{ getUserDisplayName() }}</span>
            <i :class="['fas', showUserMenu ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
          </button>
          <!-- ✅ DROPDOWN MENU -->
          <transition name="dropdown">
            <div v-if="showUserMenu" class="dropdown-menu" @click.stop>
              <router-link to="/profile" class="dropdown-item" @click="closeUserMenu">
                <i class="fas fa-user"></i> Mi Perfil
              </router-link>
              <router-link to="/grades" class="dropdown-item" @click="closeUserMenu">
                <i class="fas fa-star"></i> Calificaciones
              </router-link>
              <router-link to="/calendar" class="dropdown-item" @click="closeUserMenu">
                <i class="fas fa-calendar"></i> Calendario
              </router-link>
              <hr class="dropdown-divider">
              <button class="dropdown-item" @click="handleLogout">
                <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
              </button>
            </div>
          </transition>
        </div>
      </div>
    </nav>

    <div class="main-container">
      <!-- Left Sidebar -->
      <aside class="left-sidebar">
        <div class="sidebar-menu">
          <button 
            :class="['sidebar-btn', { active: currentView === 'chats' }]"
            @click="setCurrentView('chats')"
          >
            <i class="fas fa-comments"></i>
            <span>Mis Chats</span>
          </button>
          <button 
            :class="['sidebar-btn', { active: currentView === 'payments' }]"
            @click="setCurrentView('payments')"
          >
            <i class="fas fa-credit-card"></i>
            <span>Mis Pagos</span>
          </button>
          <button 
            :class="['sidebar-btn', { active: currentView === 'documents' }]"
            @click="setCurrentView('documents')"
          >
            <i class="fas fa-file-alt"></i>
            <span>Mis Documentos</span>
          </button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="main-content">
        <!-- Home View -->
        <div v-if="currentView === 'home'" class="home-content">
          <!-- Hero Section -->
          <div class="hero-section">
            <div class="hero-overlay">
              <div class="container">
                <div class="row justify-content-center text-center">
                  <div class="col-lg-8">
                    <h1 class="hero-title">BIENVENIDOS</h1>
                    <h2 class="hero-subtitle">AL AULA VIRTUAL</h2>
                    <h3 class="hero-year">2025 - B</h3>
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
        </div>

        <!-- Courses View - Integrado con Courses.vue -->
        <div v-else-if="currentView === 'courses'" class="courses-content">
          <div class="content-header">
            <h2>
              <i class="fas fa-book"></i>
              Mis Cursos Disponibles
            </h2>
            <p class="text-muted">Selecciona un curso para acceder a su contenido</p>
          </div>
          
          <div v-if="loadingCourses" class="text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Cargando cursos...</span>
            </div>
            <p class="mt-2">Cargando cursos...</p>
          </div>
          
          <div v-else-if="userCourses && userCourses.length > 0" class="courses-grid">
            <div 
              v-for="course in userCourses" 
              :key="course.id"
              class="course-card"
              @click="selectCourse(course)"
            >
              <div class="course-header">
                <div class="course-icon">
                  <i class="fas fa-graduation-cap"></i>
                </div>
                <!-- ✅ USAR LOS NOMBRES CORRECTOS DE TU BACKEND -->
                <h4>{{ course.name || course.nombre || 'Sin nombre' }}</h4>
              </div>
              <div class="course-info">
                <p class="course-description">{{ course.description || course.descripcion || 'Sin descripción' }}</p>
                <div class="course-meta">
                  <span class="course-level">
                    <i class="fas fa-layer-group"></i>
                    {{ course.grade || course.nivel || 'Inicial' }}
                  </span>
                  <span class="course-students">
                    <i class="fas fa-users"></i>
                    {{ course.students_count || 0 }} estudiantes
                  </span>
                </div>
              </div>
              <div class="course-actions">
                <button class="btn btn-primary">
                  <i class="fas fa-play"></i>
                  Acceder
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="empty-state">
            <div class="empty-icon">
              <i class="fas fa-book-open"></i>
            </div>
            <h3>No tienes cursos asignados</h3>
            <p>Contacta con el administrador para que te asigne cursos</p>
          </div>
        </div>

        <!-- Chats View - Integrado con Chats.vue -->
        <div v-else-if="currentView === 'chats'" class="chats-content">
          <div class="content-header">
            <h2>
              <i class="fas fa-comments"></i>
              Mis Chats
            </h2>
            <p class="text-muted">Conversaciones con docentes y personal</p>
          </div>
          <!-- ✅ BOTÓN PARA INICIAR CHAT -->
          <div class="mb-4">
            <button 
              v-if="!showChatForm" 
              class="btn btn-primary btn-lg"
              @click="showChatForm = true"
            >
              <i class="fas fa-plus"></i> Iniciar Nuevo Chat
            </button>
          </div>

          <!-- Formulario para enviar mensajes -->
          <div v-if="showChatForm && canSendMessages" class="mb-4 chat-form">
            <div class="card">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">
                  <i class="fas fa-paper-plane"></i>
                  Enviar nuevo mensaje
                </h5>
                <button class="btn btn-sm btn-outline-secondary" @click="showChatForm = false">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div class="card-body">
                <form @submit.prevent="sendMessage">
                  <!-- ✅ SELECTOR DE WORKLOAD/CURSO -->
                  <div class="mb-3">
                    <label class="form-label">Seleccionar Curso:</label>
                    <select v-model="chatForm.workload" class="form-control" required>
                      <option value="">-- Selecciona un curso --</option>
                      <option v-for="course in userCourses" :key="course.id" :value="course.id">
                        {{ course.name || course.nombre }} - {{ course.grade || course.nivel }}
                      </option>
                    </select>
                    <div class="form-text">Selecciona el curso relacionado con tu mensaje</div>
                  </div>
                  
                  <!-- ✅ SELECTOR DE DESTINATARIO -->
                  <div class="mb-3" v-if="chatForm.workload">
                    <label class="form-label">Enviar a:</label>
                    <select v-model="chatForm.recipient" class="form-control">
                      <option value="">-- Mensaje general del curso --</option>
                      <option v-for="teacher in availableTeachers" :key="teacher.id" :value="teacher.id">
                        👨‍🏫 {{ teacher.first_name }} {{ teacher.last_name }} (Docente)
                      </option>
                      <option v-for="parent in availableParents" :key="parent.id" :value="parent.id">
                        👨‍👩‍👧‍👦 {{ parent.first_name }} {{ parent.last_name }} (Padre/Madre)
                      </option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Mensaje:</label>
                    <textarea 
                      v-model="chatForm.message" 
                      class="form-control" 
                      rows="4" 
                      required 
                      placeholder="Escribe tu mensaje aquí..."
                    ></textarea>
                  </div>
                  <div class="d-flex gap-2">
                    <button type="submit" class="btn btn-primary" :disabled="!chatForm.workload || !chatForm.message">
                      <i class="fas fa-send"></i> Enviar Mensaje
                    </button>
                    <button type="button" @click="resetChatForm" class="btn btn-secondary">
                      <i class="fas fa-times"></i> Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Lista de chats existentes -->
          <div v-if="userChats && userChats.length > 0">
            <h4 class="mb-3">
              <i class="fas fa-history"></i>
              Conversaciones Recientes
            </h4>
            <div class="chat-list">
              <div v-for="chat in userChats" :key="chat.id" class="chat-item">
                <div class="chat-header">
                  <div class="chat-info">
                    <strong>{{ chat.workload?.name || `Curso ${chat.workload}` }}</strong>
                    <span class="chat-sender">
                      por {{ chat.sender?.first_name || 'Usuario' }}
                    </span>
                  </div>
                  <span class="chat-time">
                    {{ formatDate(chat.created_at) }}
                  </span>
                </div>
                <div class="chat-message">
                  {{ chat.message }}
                </div>
              </div>
            </div>
          </div>
          
          <div v-else-if="!showChatForm" class="empty-state">
            <div class="empty-icon">
              <i class="fas fa-comments"></i>
            </div>
            <h3>No hay conversaciones</h3>
            <p>Inicia tu primera conversación haciendo clic en "Iniciar Nuevo Chat"</p>
          </div>
        </div>

      <div v-else-if="currentView === 'payments'" class="payments-content">
          <div class="content-header">
            <h2>
              <i class="fas fa-credit-card"></i>
              Mis Pagos
            </h2>
            <p class="text-muted">Estado de pagos y facturas</p>
          </div>
          <!-- ✅ FORMULARIO PARA REGISTRAR PAGO (para padres) -->
          <div v-if="canRegisterPayments" class="mb-4 payment-form">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">
                  <i class="fas fa-plus"></i>
                  Registrar Pago Realizado
                </h5>
              </div>
              <div class="card-body">
                <form @submit.prevent="registerPayment">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Concepto:</label>
                      <select v-model="paymentForm.concept" class="form-control" required>
                        <option value="">-- Selecciona el concepto --</option>
                        <option value="mensualidad">Mensualidad</option>
                        <option value="matricula">Matrícula</option>
                        <option value="materiales">Materiales</option>
                        <option value="excursion">Excursión</option>
                        <option value="uniforme">Uniforme</option>
                        <option value="otros">Otros</option>
                      </select>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Monto (S/.):</label>
                      <input v-model="paymentForm.amount" type="number" step="0.01" class="form-control" required />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Número de Recibo/Operación:</label>
                      <input v-model="paymentForm.receipt_number" type="text" class="form-control" required />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Fecha de Pago:</label>
                      <input v-model="paymentForm.payment_date" type="date" class="form-control" required />
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Descripción adicional (opcional):</label>
                    <textarea v-model="paymentForm.description" class="form-control" rows="2"></textarea>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Voucher/Comprobante:</label>
                    <input type="file" @change="handleVoucherUpload" class="form-control" accept="image/*,.pdf" required />
                    <div class="form-text">Sube una foto o PDF del comprobante de pago</div>
                  </div>
                  <div class="d-flex gap-2">
                    <button type="submit" class="btn btn-success">
                      <i class="fas fa-check"></i> Registrar Pago
                    </button>
                    <button type="button" @click="resetPaymentForm" class="btn btn-secondary">
                      <i class="fas fa-times"></i> Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          
          <div v-if="loadingPayments" class="text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Cargando pagos...</span>
            </div>
            <p class="mt-2">Cargando información de pagos...</p>
          </div>
          
          <!-- ✅ LISTA MEJORADA DE PAGOS -->
          <div v-else-if="userPayments.length > 0">
            <h4 class="mb-3">
              <i class="fas fa-list"></i>
              Historial de Pagos
            </h4>
                  
        <div class="payments-list">
              <div v-for="payment in userPayments" :key="payment.id" class="payment-card">
                <div class="payment-header">
                  <div class="payment-info">
                    <h5>{{ payment.concept || payment.description || 'Pago' }}</h5>
                    <p class="text-muted mb-1">Recibo: {{ payment.receipt_number || 'N/A' }}</p>
                  </div>
                  <span :class="['payment-status', getPaymentStatusClass(payment.status)]">
                    <i :class="getPaymentStatusIcon(payment.status)"></i>
                    {{ getPaymentStatusText(payment.status) }}
                  </span>
                </div>
                <div class="payment-details">
                  <div class="row">
                    <div class="col-md-6">
                      <p><strong>Monto:</strong> S/. {{ payment.amount }}</p>
                      <p><strong>Fecha:</strong> {{ formatDate(payment.payment_date || payment.date) }}</p>
                    </div>
                    <div class="col-md-6">
                      <p v-if="payment.student_name"><strong>Estudiante:</strong> {{ payment.student_name }}</p>
                      <p v-if="payment.voucher">
                        <strong>Comprobante:</strong> 
                        <a :href="payment.voucher" target="_blank" class="btn btn-sm btn-outline-primary ms-2">
                          <i class="fas fa-eye"></i> Ver
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            <div class="empty-icon">
              <i class="fas fa-credit-card"></i>
            </div>
            <h3>No hay pagos registrados</h3>
            <p>No se encontraron pagos para mostrar</p>
          </div>
        </div>

      <!-- Documents View - Integrado con Documents.vue -->
      <div v-else-if="currentView === 'documents'" class="documents-content">
        <div class="content-header">
          <h2>
            <i class="fas fa-file-alt"></i>
            Mis Documentos
          </h2>
          <p class="text-muted">Documentos y archivos importantes</p>
        </div>

          <!-- ✅ FORMULARIO MEJORADO PARA SUBIR DOCUMENTOS -->
          <div v-if="canUploadDocuments" class="mb-4 document-form">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">
                  <i class="fas fa-upload"></i>
                  Subir documento
                </h5>
              </div>
              <div class="card-body">
                <form @submit.prevent="uploadDocument" enctype="multipart/form-data">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Título del documento:</label>
                      <input v-model="documentForm.title" type="text" class="form-control" required />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Categoría:</label>
                      <select v-model="documentForm.category" class="form-control" required>
                        <option value="">-- Selecciona una categoría --</option>
                        <option v-if="userType === 'teacher'" value="material_clase">Material de Clase</option>
                        <option v-if="userType === 'teacher'" value="evaluacion">Evaluación</option>
                        <option v-if="userType === 'teacher'" value="proyecto">Proyecto</option>
                        <option v-if="['father', 'mother'].includes(userType)" value="justificacion">Justificación</option>
                        <option v-if="['father', 'mother'].includes(userType)" value="permiso">Permiso</option>
                        <option v-if="['father', 'mother'].includes(userType)" value="documento_medico">Documento Médico</option>
                        <option value="otros">Otros</option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Descripción (opcional):</label>
                    <textarea v-model="documentForm.description" class="form-control" rows="3" placeholder="Describe brevemente el contenido del documento"></textarea>
                  </div>
                  <div class="mb-3" v-if="userType === 'teacher'">
                    <label class="form-label">Workload ID:</label>
                    <select v-model="documentForm.workload" class="form-control">
                      <option value="">-- Documento general --</option>
                      <option v-for="course in userCourses" :key="course.id" :value="course.id">
                        {{ course.name || course.nombre }} - {{ course.grade || course.nivel }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Archivo:</label>
                    <input type="file" @change="handleFileUpload" class="form-control" required />
                    <div class="form-text">Formatos permitidos: PDF, DOC, DOCX, JPG, PNG (máx. 10MB)</div>
                  </div>
                  <div class="d-flex gap-2">
                    <button type="submit" class="btn btn-success">
                      <i class="fas fa-upload"></i> Subir Documento
                    </button>
                    <button type="button" @click="resetDocumentForm" class="btn btn-secondary">
                      <i class="fas fa-times"></i> Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Lista de documentos -->
          <div v-if="loadingDocuments" class="text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Cargando documentos...</span>
            </div>
            <p class="mt-2">Cargando documentos...</p>
          </div>
          
          <div v-else-if="userDocuments.length > 0">
            <h4 class="mb-3">
              <i class="fas fa-folder"></i>
              Mis Documentos
            </h4>
            <div class="documents-list">
              <div v-for="doc in userDocuments" :key="doc.id" class="document-card">
                <div class="document-icon">
                  <i :class="getDocumentIcon(doc.file)"></i>
                </div>
                <div class="document-info">
                  <h5>{{ doc.title }}</h5>
                  <p v-if="doc.description">{{ doc.description }}</p>
                  <div class="document-meta">
                    <span class="badge bg-secondary me-2">{{ doc.category || 'General' }}</span>
                    <span class="text-muted">
                      <i class="fas fa-calendar"></i>
                      {{ formatDate(doc.created_at) }}
                    </span>
                    <span class="text-muted ms-2">
                      <i class="fas fa-user"></i>
                      {{ doc.uploaded_by?.first_name || 'Usuario' }}
                    </span>
                  </div>
                </div>
                <div class="document-actions">
                  <a :href="doc.file" target="_blank" class="btn btn-primary btn-sm">
                    <i class="fas fa-eye"></i> Ver
                  </a>
                  <a :href="doc.file" download class="btn btn-outline-primary btn-sm">
                    <i class="fas fa-download"></i> Descargar
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            <div class="empty-icon">
              <i class="fas fa-file-alt"></i>
            </div>
            <h3>No hay documentos</h3>
            <p>{{ canUploadDocuments ? 'Sube tu primer documento usando el formulario de arriba' : 'No se encontraron documentos para mostrar' }}</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

        

<script>
import { mapGetters, mapActions } from 'vuex'
import api from '@/services/api'

export default {
  name: 'DashboardView',
  data() {
    return {
      currentView: 'home',
      showUserMenu: false,
      showChatForm: false,
      
      // Datos reales de la API
      userCourses: [],
      userChats: [],
      userPayments: [],
      userDocuments: [],
      availableTeachers: [],
      availableParents: [],
      
      // Estados de carga
      loadingCourses: false,
      loadingPayments: false,
      loadingDocuments: false,
      
      // Formularios
      chatForm: { 
        workload: '', 
        message: '', 
        recipient: '' 
      },
      documentForm: { 
        title: '', 
        description: '', 
        workload: '', 
        category: '',
        file: null 
      },
      paymentForm: {
        concept: '',
        amount: '',
        receipt_number: '',
        payment_date: '',
        description: '',
        voucher: null
      },
      
      // Tipo de usuario
      userType: localStorage.getItem('user_type') || ''
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'students', 'teachers', 'courses', 'loading']),
    
    canSendMessages() {
      return ['teacher', 'father', 'mother'].includes(this.userType)
    },
    
    canUploadDocuments() {
      return ['teacher', 'father', 'mother'].includes(this.userType)
    },
    
    canRegisterPayments() {
      return ['father', 'mother'].includes(this.userType)
    }
  },
  methods: {
    ...mapActions(['fetchStudents', 'fetchTeachers', 'fetchCourses', 'logout']),
    
    setCurrentView(view) {
      this.currentView = view
      this.showUserMenu = false
      this.showChatForm = false
      
      // Cargar datos según la vista
      switch(view) {
        case 'courses':
          this.loadUserCourses()
          break
        case 'chats':
          this.loadUserChats()
          break
        case 'payments':
          this.loadUserPayments()
          break
        case 'documents':
          this.loadUserDocuments()
          break
      }
    },
    
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
      console.log('👤 Toggle user menu:', this.showUserMenu)
    },
    closeUserMenu() {
      this.showUserMenu = false
    },
    getUserDisplayName() {
      if (!this.currentUser) return 'Usuario'
            
      // Si tiene first_name, usar solo eso
      if (this.currentUser.first_name) {
        return this.currentUser.first_name
      }
      
      // Si tiene full_name, tomar solo la primera palabra
      if (this.currentUser.full_name) {
        return this.currentUser.full_name.split(' ')[0]
      }
      
      // Si tiene nombres, tomar solo el primer nombre
      if (this.currentUser.nombres) {
        return this.currentUser.nombres.split(' ')[0]
      }
      
      // Como último recurso, usar username
      return this.currentUser.username || 'Usuario'
    },
    
    async handleLogout() {
      try {
        await this.logout()
        this.$router.push('/login')
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
        // Forzar logout local
        localStorage.clear()
        this.$router.push('/login')
      }
    },
    
    // ✅ MÉTODOS MEJORADOS
    async sendMessage() {
      try {
        console.log('📤 Enviando mensaje:', this.chatForm)
        await api.createChat(this.chatForm)
        console.log('✅ Mensaje enviado')
        await this.loadUserChats()
        this.resetChatForm()
        this.showChatForm = false
        alert('Mensaje enviado correctamente')
      } catch (error) {
        console.error('❌ Error enviando mensaje:', error)
        alert('Error al enviar mensaje: ' + (error.response?.data?.message || error.message))
      }
    },
    async registerPayment() {
      try {
        const formData = new FormData()
        formData.append('concept', this.paymentForm.concept)
        formData.append('amount', this.paymentForm.amount)
        formData.append('receipt_number', this.paymentForm.receipt_number)
        formData.append('payment_date', this.paymentForm.payment_date)
        formData.append('description', this.paymentForm.description)
        formData.append('voucher', this.paymentForm.voucher)
        
        await api.createPayment(formData)
        await this.loadUserPayments()
        this.resetPaymentForm()
        alert('Pago registrado correctamente. Será verificado por el administrador.')
      } catch (error) {
        console.error('Error registrando pago:', error)
        alert('Error al registrar pago: ' + (error.response?.data?.message || error.message))
      }
    },
    // ✅ MÉTODOS AUXILIARES MEJORADOS
    getPaymentStatusText(status) {
      switch (status?.toLowerCase()) {
        case 'pagado':
        case 'paid':
        case 'verificado':
          return 'Pagado'
        case 'pendiente':
        case 'pending':
          return 'Pendiente'
        case 'verificando':
          return 'En Verificación'
        case 'rechazado':
          return 'Rechazado'
        default:
          return 'Pendiente'
      }
    },

    getPaymentStatusIcon(status) {
      switch (status?.toLowerCase()) {
        case 'pagado':
        case 'paid':
        case 'verificado':
          return 'fas fa-check-circle'
        case 'pendiente':
        case 'pending':
          return 'fas fa-clock'
        case 'verificando':
          return 'fas fa-hourglass-half'
        case 'rechazado':
          return 'fas fa-times-circle'
        default:
          return 'fas fa-clock'
      }
    },
    getDocumentIcon(filename) {
      if (!filename) return 'fas fa-file'
      const ext = filename.split('.').pop().toLowerCase()
      switch (ext) {
        case 'pdf': return 'fas fa-file-pdf'
        case 'doc':
        case 'docx': return 'fas fa-file-word'
        case 'jpg':
        case 'jpeg':
        case 'png': return 'fas fa-file-image'
        default: return 'fas fa-file'
      }
    },
    
    resetChatForm() {
      this.chatForm = { workload: '', message: '', recipient: '' }
    },
    
    resetPaymentForm() {
      this.paymentForm = {
        concept: '',
        amount: '',
        receipt_number: '',
        payment_date: '',
        description: '',
        voucher: null
      }
    },
    resetDocumentForm() {
      this.documentForm = { 
        title: '', 
        description: '', 
        workload: '', 
        category: '',
        file: null 
      }
    },
    
    handleVoucherUpload(event) {
      this.paymentForm.voucher = event.target.files[0]
    },

    // Métodos para cargar datos
    async loadUserCourses() {
      this.loadingCourses = true
      try {
        console.log('🔄 Cargando cursos...')
        const response = await api.getCourses()
        console.log('📚 Respuesta cursos:', response.data)
        
        // Manejar diferentes formatos de respuesta
        if (response.data.results) {
          this.userCourses = response.data.results
        } else if (Array.isArray(response.data)) {
          this.userCourses = response.data
        } else if (response.data.data) {
          this.userCourses = response.data.data
        } else {
          this.userCourses = []
        }
        
        console.log('✅ Cursos cargados:', this.userCourses)
      } catch (error) {
        console.error('❌ Error cargando cursos:', error)
        this.userCourses = []
      } finally {
        this.loadingCourses = false
      }
    },
    
    async loadUserChats() {
      try {
        console.log('🔄 Cargando chats...')
        const response = await api.getChats()
        console.log('💬 Respuesta chats:', response.data)
        
        if (response.data.results) {
          this.userChats = response.data.results
        } else if (Array.isArray(response.data)) {
          this.userChats = response.data
        } else if (response.data.data) {
          this.userChats = response.data.data
        } else {
          this.userChats = []
        }
        
        console.log('✅ Chats cargados:', this.userChats)
      } catch (error) {
        console.error('❌ Error cargando chats:', error)
        this.userChats = []
      }
    },
    
    async loadUserPayments() {
      this.loadingPayments = true
      try {
        console.log('🔄 Cargando pagos...')
        const response = await api.getPayments()
        console.log('💰 Respuesta pagos:', response.data)
        
        if (response.data.results) {
          this.userPayments = response.data.results
        } else if (Array.isArray(response.data)) {
          this.userPayments = response.data
        } else if (response.data.data) {
          this.userPayments = response.data.data
        } else {
          this.userPayments = []
        }
        
        console.log('✅ Pagos cargados:', this.userPayments)
      } catch (error) {
        console.error('❌ Error cargando pagos:', error)
        this.userPayments = []
      } finally {
        this.loadingPayments = false
      }
    },
    
    async loadUserDocuments() {
      this.loadingDocuments = true
      try {
        console.log('🔄 Cargando documentos...')
        const response = await api.getDocuments()
        console.log('📄 Respuesta documentos:', response.data)
        
        if (response.data.results) {
          this.userDocuments = response.data.results
        } else if (Array.isArray(response.data)) {
          this.userDocuments = response.data
        } else if (response.data.data) {
          this.userDocuments = response.data.data
        } else {
          this.userDocuments = []
        }
        
        console.log('✅ Documentos cargados:', this.userDocuments)
      } catch (error) {
        console.error('❌ Error cargando documentos:', error)
        this.userDocuments = []
      } finally {
        this.loadingDocuments = false
      }
    },
    
    // Métodos para manejar acciones
    selectCourse(course) {
      console.log('Curso seleccionado:', course)
      this.$router.push(`/courses`)
    },
    
    async sendMessage() {
      try {
        console.log('📤 Enviando mensaje:', this.chatForm)
        await api.createChat(this.chatForm)
        console.log('✅ Mensaje enviado')
        await this.loadUserChats()
        this.resetChatForm()
        alert('Mensaje enviado correctamente')
      } catch (error) {
        console.error('❌ Error enviando mensaje:', error)
        alert('Error al enviar mensaje: ' + (error.response?.data?.message || error.message))
      }
    },
    
    async uploadDocument() {
      try {
        const formData = new FormData()
        formData.append('title', this.documentForm.title)
        formData.append('description', this.documentForm.description)
        formData.append('workload', this.documentForm.workload)
        formData.append('file', this.documentForm.file)
        
        await api.createDocument(formData)
        await this.loadUserDocuments()
        this.resetDocumentForm()
        alert('Documento subido correctamente')
      } catch (error) {
        console.error('Error subiendo documento:', error)
        alert('Error al subir documento: ' + (error.response?.data?.message || error.message))
      }
    },
    
    // Métodos auxiliares
    resetChatForm() {
      this.chatForm = { workload: '', message: '' }
    },
    
    resetDocumentForm() {
      this.documentForm = { title: '', description: '', workload: '', file: null }
    },
    
    handleFileUpload(event) {
      this.documentForm.file = event.target.files[0]
    },
    
    formatDate(dateString) {
      if (!dateString) return 'Sin fecha'
      try {
        return new Date(dateString).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      } catch {
        return dateString
      }
    },
    
    getPaymentStatusClass(status) {
      switch (status?.toLowerCase()) {
        case 'pagado':
        case 'paid':
          return 'status-paid'
        case 'pendiente':
        case 'pending':
          return 'status-pending'
        case 'vencido':
        case 'overdue':
          return 'status-overdue'
        default:
          return 'status-unknown'
      }
    }
  },
  
  async created() {
    // Cargar datos iniciales
    await this.fetchStudents()
    await this.fetchTeachers()
    await this.fetchCourses()
  },
  
  mounted() {
    // Cerrar menú al hacer click fuera - MEJORADO
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.user-dropdown')) {
        this.showUserMenu = false
      }
    })
  }
}
</script>

<style scoped>
.user-dropdown {
  position: relative;
}

.user-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.user-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  min-width: 220px;
  border: 1px solid #e9ecef;
  z-index: 9999; /* ✅ Z-index muy alto */
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #495057;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background: #f8f9fa;
  color: #dc3545;
  text-decoration: none;
}

.dropdown-divider {
  margin: 0.5rem 0;
  border-color: #e9ecef;
}

.dashboard-view {
  min-height: 100vh;
  background: #f8f9fa;
}

/* ✅ ANIMACIÓN DEL DROPDOWN */
.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.chat-sender {
  color: #6c757d;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.chat-info {
  display: flex;
  flex-direction: column;
}

/* ✅ ESTILOS PARA PAGOS MEJORADOS */
.payment-info h5 {
  margin: 0;
  color: #2c3e50;
}


.payment-status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-paid {
  background: #d4edda;
  color: #155724;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-verificando {
  background: #cce5ff;
  color: #004085;
}
.status-rechazado {
  background: #f8d7da;
  color: #721c24;
}

/* ✅ MEJORAS GENERALES */
.payment-form .card,
.chat-form .card,
.document-form .card {
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

/* Top Navigation */
.top-navbar {
  background: linear-gradient(135deg, #dc3545, #c82333);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar-logo {
  height: 40px;
  width: auto;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.navbar-center {
  display: flex;
  gap: 1rem;
}

.nav-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.nav-btn.active {
  background: white;
  color: #dc3545;
  font-weight: 600;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-indicator {
  margin-right: 1rem;
}

.status-badge {
  background: rgba(255, 255, 255, 0.15);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.user-dropdown {
  position: relative;
}

.user-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.user-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
  min-width: 200px;
  margin-top: 0.5rem;
  border: 1px solid #e9ecef;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #495057;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f8f9fa;
  color: #dc3545;
  text-decoration: none;
}

.dropdown-divider {
  margin: 0.5rem 0;
  border-color: #e9ecef;
}

/* Main Container */
.main-container {
  display: flex;
  min-height: calc(100vh - 80px);
}

/* Left Sidebar */
.left-sidebar {
  width: 250px;
  background: white;
  border-right: 1px solid #e9ecef;
  padding: 2rem 0;
  box-shadow: 2px 0 10px rgba(0,0,0,0.05);
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
}

.sidebar-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: #6c757d;
  text-align: left;
  transition: all 0.3s ease;
  font-weight: 500;
}

.sidebar-btn:hover {
  background: #f8f9fa;
  color: #dc3545;
}

.sidebar-btn.active {
  background: #dc3545;
  color: white;
}

.sidebar-btn i {
  font-size: 1.2rem;
  width: 20px;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, rgba(30, 60, 114, 0.9), rgba(42, 82, 152, 0.9));
  border-radius: 20px;
  min-height: 400px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 3rem;
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

/* Statistics Section */
.stats-section {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
}

.stat-card {
  background: #f8f9fa;
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

/* Content Headers */
.content-header {
  margin-bottom: 2rem;
  text-align: center;
}

.content-header h2 {
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.content-header h2 i {
  color: #dc3545;
  margin-right: 0.5rem;
}

/* Courses Grid */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.course-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
  border-color: #dc3545;
}

.course-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.course-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #dc3545, #c82333);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.course-header h4 {
  color: #2c3e50;
  font-weight: 600;
  margin: 0;
}

.course-description {
  color: #6c757d;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.course-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.course-level,
.course-students {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.9rem;
}

.course-actions {
  text-align: center;
}

.course-actions .btn {
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 500;
}

/* Chat Styles */
.chat-form,
.document-form {
  margin-bottom: 2rem;
}

.chat-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chat-item {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  border-left: 4px solid #dc3545;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.chat-time {
  color: #6c757d;
  font-size: 0.8rem;
}

.chat-message {
  color: #495057;
  line-height: 1.5;
}

/* Payment Styles */
.payments-list {
  display: grid;
  gap: 1rem;
}

.payment-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.payment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.payment-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-paid {
  background: #d4edda;
  color: #155724;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-overdue {
  background: #f8d7da;
  color: #721c24;
}

.status-unknown {
  background: #f8f9fa;
  color: #6c757d;
}

/* Document Styles */
.documents-list {
  display: grid;
  gap: 1rem;
}

.document-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.document-icon {
  width: 50px;
  height: 50px;
  background: #dc3545;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.document-info {
  flex: 1;
}

.document-info h5 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.document-info p {
  margin: 0 0 0.5rem 0;
  color: #6c757d;
  font-size: 0.9rem;
}

.document-meta {
  font-size: 0.8rem;
}

.document-actions {
  display: flex;
  gap: 0.5rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6c757d;
}

.empty-icon {
  font-size: 4rem;
  color: #dc3545;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar-center {
    gap: 0.5rem;
  }
  
  .nav-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .left-sidebar {
    width: 200px;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.8rem;
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .document-card {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 576px) {
  .top-navbar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .navbar-center,
  .navbar-right {
    width: 100%;
    justify-content: center;
  }
  
  .main-container {
    flex-direction: column;
  }
  
  .left-sidebar {
    width: 100%;
    order: 2;
    padding: 1rem 0;
  }
  
  .sidebar-menu {
    flex-direction: row;
    overflow-x: auto;
    padding: 0 1rem;
  }
  
  .sidebar-btn {
    flex-shrink: 0;
    min-width: 120px;
  }
}
</style>