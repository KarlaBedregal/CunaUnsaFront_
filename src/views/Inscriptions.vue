<!-- filepath: c:\CUNA-UNSA-\CunaFrontend\src\views\Inscriptions.vue -->
<template>
  <div>
    <h2>Inscripciones</h2>
    <ul>
      <li v-for="ins in inscriptions" :key="ins.id">
        {{ ins.student?.full_name }} - {{ ins.workload?.nombre }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  data() {
    return { inscriptions: [] }
  },
  async mounted() {
    try {
      const res = await api.getInscriptions()
      this.inscriptions = res.data
    } catch (error) {
      this.inscriptions = []
    }
  }
}
</script>