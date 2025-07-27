<!-- filepath: c:\CUNA-UNSA-\CunaFrontend\src\views\Announcements.vue -->
<template>
  <div>
    <h2>Anuncios</h2>
    <ul>
      <li v-for="ann in announcements" :key="ann.id">
        {{ ann.titulo }} - {{ ann.descripcion }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  data() {
    return { announcements: [] }
  },
  async mounted() {
    try {
      const res = await api.getAnnouncements()
      this.announcements = res.data
    } catch (error) {
      this.announcements = []
    }
  }
}
</script>