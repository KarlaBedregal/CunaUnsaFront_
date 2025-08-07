<template>
  <div class="container mt-4">
    <h2>📄 Documentos</h2>
    <div v-if="canUpload" class="mb-3">
      <h5>Subir documento</h5>
      <form @submit.prevent="uploadDocument" enctype="multipart/form-data">
        <div class="mb-2">
          <label>Título:</label>
          <input v-model="form.title" type="text" class="form-control" required />
        </div>
        <div class="mb-2">
          <label>Descripción:</label>
          <textarea v-model="form.description" class="form-control" required></textarea>
        </div>
        <div class="mb-2">
          <label>Workload ID:</label>
          <input v-model="form.workload" type="number" class="form-control" required />
        </div>
        <div class="mb-2">
          <label>Archivo:</label>
          <input type="file" @change="handleFile" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-success">Subir</button>
        <button type="button" @click="resetForm" class="btn btn-secondary ms-2">Cancelar</button>
      </form>
    </div>
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
      form: { title: '', description: '', workload: '', file: null },
      userType: localStorage.getItem('user_type') || ''
    }
  },
  computed: {
    canUpload() {
      return this.userType === 'teacher'
    }
  },
  methods: {
    async fetchDocuments() {
      this.loading = true
      try {
        const res = await api.getDocuments()
        this.documents = res.data.results || res.data.data || res.data
      } catch (error) {
        this.documents = []
      } finally {
        this.loading = false
      }
    },
    handleFile(e) {
      this.form.file = e.target.files[0]
    },
    async uploadDocument() {
      try {
        const formData = new FormData()
        formData.append('title', this.form.title)
        formData.append('description', this.form.description)
        formData.append('workload', this.form.workload)
        formData.append('file', this.form.file)
        await api.createDocument(formData)
        this.fetchDocuments()
        this.resetForm()
      } catch (error) {
        alert('Error al subir documento')
      }
    },
    resetForm() {
      this.form = { title: '', description: '', workload: '', file: null }
    }
  },
  mounted() {
    this.fetchDocuments()
  }
}
</script>