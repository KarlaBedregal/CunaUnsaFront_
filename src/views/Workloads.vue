<!-- filepath: c:\CUNA-UNSA-\CunaFrontend\src\views\Workloads.vue -->
<template>
  <div>
    <h2>Cargas Académicas</h2>
    <ul>
      <li v-for="workload in workloads" :key="workload.id">
        {{ workload.nombre }} - {{ workload.teacher?.full_name }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  data() {
    return { workloads: [] }
  },
  async mounted() {
    try {
      const res = await api.getWorkloads()
      this.workloads = res.data
    } catch (error) {
      this.workloads = []
    }
  }
}
</script>