<!-- filepath: c:\CUNA-UNSA-\CunaFrontend\src\views\Periods.vue -->
<template>
  <div>
    <h2>Períodos Académicos</h2>
    <ul>
      <li v-for="period in periods" :key="period.id">
        {{ period.nombre }} - {{ period.fecha_inicio }} a {{ period.fecha_fin }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  data() {
    return { periods: [] }
  },
  async mounted() {
    try {
      const res = await api.getPeriods()
      this.periods = res.data
    } catch (error) {
      this.periods = []
    }
  }
}
</script>