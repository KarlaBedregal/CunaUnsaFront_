<template>
  <div class="container mt-4">
    <h2>Inscripciones</h2>
    <div v-if="inscriptions.length === 0">
      <p>No hay inscripciones disponibles.</p>
    </div>
    <table v-else class="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Estudiante</th>
          <th>Workload</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ins in inscriptions" :key="ins.id">
          <td>{{ ins.id }}</td>
          <td>{{ ins.student_name }}</td>
          <td>{{ ins.workload_name }}</td>
          <td>{{ formatDate(ins.date) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Inscriptions',
  data() {
    return {
      inscriptions: []
    };
  },
  methods: {
    async fetchInscriptions() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://cunaunsa.onrender.com/api/inscriptions/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.inscriptions = response.data;
      } catch (error) {
        console.error('Error al cargar inscripciones:', error);
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    }
  },
  mounted() {
    this.fetchInscriptions();
  }
};
</script>
