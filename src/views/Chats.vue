<template>
  <div class="container mt-4">
    <h2>📢 Chats</h2>

    <div v-if="chats.length">
      <ul class="list-group">
        <li v-for="chat in chats" :key="chat.id" class="list-group-item">
          <strong>{{ chat.workload.name }}</strong>: {{ chat.message }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No hay chats disponibles.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ChatsView',
  data() {
    return {
      chats: []
    };
  },
  mounted() {
    this.fetchChats();
  },
  methods: {
    async fetchChats() {
      try {
        const token = localStorage.getItem('access');
        const response = await axios.get('https://cunaunsa.onrender.com/api/chats/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.chats = response.data;
      } catch (error) {
        console.error('Error al obtener los chats:', error);
        if (error.response && error.response.status === 401) {
          alert('Tu sesión ha expirado. Inicia sesión nuevamente.');
          this.$router.push('/login');
        }
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 700px;
}
</style>
