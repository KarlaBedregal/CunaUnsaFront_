<template>
  <div class="container mt-4">
    <h2>📄 Documentos</h2>
    <div v-if="loading" class="mt-3">
      <p>Cargando documentos...</p>
    </div>
    <div v-else>
      <div v-if="documents.length === 0" class="alert alert-info mt-3">
        No hay documentos disponibles.
      </div>
      <ul v-else class="list-group mt-3">
        <li v-for="doc in documents" :key="doc.id" class="list-group-item">
          <h5>{{ doc.title }}</h5>
          <p>{{ doc.description }}</p>
          <a :href="doc.file" target="_blank">📎 Ver documento</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  name: 'DocumentsView',
  data() {
    return {
      documents: [],
      loading: false,
    }
  },
  async mounted() {
    this.loading = true
    try {
      const res = await api.getDocuments()
      this.documents = res.data.results || res.data.data || res.data
    } catch (error) {
      this.documents = []
    } finally {
      this.loading = false
    }
  }
}
</script>