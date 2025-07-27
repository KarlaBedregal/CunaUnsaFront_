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
import axios from 'axios';

export default {
  name: 'DocumentView',
  data() {
    return {
      documents: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchDocuments();
  },
  methods: {
    async fetchDocuments() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token'); // JWT del login
        const response = await axios.get('https://cunaunsa.onrender.com/api/documents/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.documents = response.data;
      } catch (error) {
        console.error('Error al obtener los documentos:', error);
        if (error.response && error.response.status === 401) {
          alert('No tienes autorización para ver los documentos.');
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
