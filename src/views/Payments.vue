<template>
  <div class="container mt-4">
    <h2 class="mb-4">Pagos</h2>
    <div v-if="isAdmin">
      <h4>Registrar nuevo pago</h4>
      <form @submit.prevent="createPayment">
        <div class="mb-3">
          <label>Estudiante ID</label>
          <input type="number" class="form-control" v-model="newPayment.student" required />
        </div>
        <div class="mb-3">
          <label>Monto</label>
          <input type="number" class="form-control" v-model="newPayment.amount" required />
        </div>
        <div class="mb-3">
          <label>Fecha de Pago</label>
          <input type="date" class="form-control" v-model="newPayment.date" required />
        </div>
        <button class="btn btn-primary" type="submit">Registrar</button>
      </form>
    </div>
    <hr class="my-4" />
    <h4>Lista de pagos</h4>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Estudiante</th>
          <th>Monto</th>
          <th>Fecha</th>
          <th v-if="isAdmin">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payment in payments" :key="payment.id">
          <td>{{ payment.id }}</td>
          <td>{{ payment.student }}</td>
          <td>{{ payment.amount }}</td>
          <td>{{ payment.date }}</td>
          <td v-if="isAdmin">
            <button class="btn btn-sm btn-danger" @click="deletePayment(payment.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  name: 'PaymentsView',
  data() {
    return {
      payments: [],
      newPayment: { student: '', amount: '', date: '' },
      userType: localStorage.getItem('user_type') || ''
    }
  },
  computed: {
    isAdmin() {
      return this.userType === 'admin'
    }
  },
  methods: {
    async fetchPayments() {
      try {
        const res = await api.getPayments()
        this.payments = res.data.results || res.data.data || res.data
      } catch (error) {
        console.error('Error al obtener pagos:', error)
      }
    },
    async createPayment() {
      try {
        await api.createPayment(this.newPayment)
        this.newPayment = { student: '', amount: '', date: '' }
        this.fetchPayments()
      } catch (error) {
        console.error('Error al crear pago:', error)
        alert('No tienes permisos o hubo un error al crear el pago.')
      }
    },
    async deletePayment(id) {
      try {
        await api.deletePayment(id)
        this.fetchPayments()
      } catch (error) {
        console.error('Error al eliminar pago:', error)
        alert('No tienes permisos o hubo un error al eliminar.')
      }
    }
  },
  mounted() {
    this.fetchPayments()
  }
}
</script>