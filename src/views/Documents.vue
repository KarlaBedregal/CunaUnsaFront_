<!-- filepath: c:\CUNA-UNSA-\CunaFrontend\src\views\Documents.vue -->
<template>
  <div>
    <h2>Documentos</h2>
    <ul>
      <li v-for="doc in documents" :key="doc.id">
        {{ doc.nombre }} - <a :href="doc.archivo" target="_blank">Descargar</a>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  data() {
    return { documents: [] }
  },
  async mounted() {
    try {
      const res = await api.getDocuments()
      this.documents = res.data
    } catch (error) {
      this.documents = []
    }
  }
}
</script>