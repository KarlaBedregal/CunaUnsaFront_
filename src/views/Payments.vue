<!-- filepath: c:\CUNA-UNSA-\CunaFrontend\src\views\Payments.vue -->
<template>
  <div>
    <h2>Pagos</h2>
    <ul>
      <li v-for="pay in payments" :key="pay.id">
        {{ pay.student?.full_name }} - {{ pay.estado }} - {{ pay.monto }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
    name: 'PaymentsView',
  data() {
    return { payments: [] }
  },
  async mounted() {
    try {
      const res = await api.getPayments()
      this.payments = res.data
    } catch (error) {
      this.payments = []
    }
  }
}
</script>