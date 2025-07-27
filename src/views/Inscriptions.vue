<template>
  <div class="container mt-4">
    <h2>Inscripciones</h2>
    <div v-if="canCreate" class="mb-3">
      <h5>Nueva inscripción</h5>
      <form @submit.prevent="createInscription">
        <div class="mb-2">
          <label>Estudiante ID:</label>
          <input v-model="form.student" type="number" class="form-control" required />
        </div>
        <div class="mb-2">
          <label>Workload ID:</label>
          <input v-model="form.workload" type="number" class="form-control" required />
        </div>
        <div class="mb-2">
          <label>Fecha:</label>
          <input v-model="form.date" type="date" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-success">Inscribir</button>
        <button type="button" @click="resetForm" class="btn btn-secondary ms-2">Cancelar</button>
      </form>
    </div>
    <div v-if="inscriptions.length === 0">
      <p>No hay inscripciones disponibles.</p>
    </div>
    <table v-else class="table table-hover mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Estudiante</th>
          <th>Workload</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ins in inscriptions" :key="ins.id">
          <td>{{ ins.id }}</td>
          <td>{{ ins.student_name || ins.student?.full_name }}</td>
          <td>{{ ins.workload_name || ins.workload?.nombre }}</td>
          <td>{{ formatDate(ins.date) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  name: 'InscriptionsView',
  data() {
    return {
      inscriptions: [],
      form: { student: '', workload: '', date: '' },
      userType: localStorage.getItem('user_type') || ''
    }
  },
  computed: {
    canCreate() {
      return this.userType === 'admin'
    }
  },
  methods: {
    async fetchInscriptions() {
      try {
        const res = await api.getInscriptions()
        this.inscriptions = res.data.results || res.data.data || res.data
      } catch (error) {
        this.inscriptions = []
      }
    },
    async createInscription() {
      try {
        await api.createInscription(this.form)
        this.fetchInscriptions()
        this.resetForm()
      } catch (error) {
        alert('Error al crear inscripción')
      }
    },
    resetForm() {
      this.form = { student: '', workload: '', date: '' }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString()
    }
  },
  mounted() {
    this.fetchInscriptions()
  }
}
</script>