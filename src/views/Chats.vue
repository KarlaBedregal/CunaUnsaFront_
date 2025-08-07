<template>
  <div class="container mt-4">
    <h2>📢 Chats</h2>
    <div v-if="canSend" class="mb-3">
      <h5>Enviar mensaje</h5>
      <form @submit.prevent="sendChat">
        <div class="mb-2">
          <label>Workload ID:</label>
          <input v-model="form.workload" type="number" class="form-control" required />
        </div>
        <div class="mb-2">
          <label>Mensaje:</label>
          <textarea v-model="form.message" class="form-control" required></textarea>
        </div>
        <button type="submit" class="btn btn-success">Enviar</button>
        <button type="button" @click="resetForm" class="btn btn-secondary ms-2">Cancelar</button>
      </form>
    </div>
    <div v-if="chats.length">
      <ul class="list-group">
        <li v-for="chat in chats" :key="chat.id" class="list-group-item">
          <strong>{{ chat.workload.name }}</strong>: {{ chat.message }}
          <span class="text-muted float-end">{{ chat.created_at ? chat.created_at.slice(0, 16).replace('T', ' ') : '' }}</span>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No hay chats disponibles.</p>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  name: 'ChatsView',
  data() {
    return {
      chats: [],
      form: { workload: '', message: '' },
      userType: localStorage.getItem('user_type') || ''
    }
  },
  computed: {
    canSend() {
      return this.userType === 'teacher' || this.userType === 'father' || this.userType === 'mother'
    }
  },
  methods: {
    async fetchChats() {
      try {
        const res = await api.getChats()
        this.chats = res.data.results || res.data.data || res.data
      } catch (error) {
        this.chats = []
      }
    },
    async sendChat() {
      try {
        await api.createChat(this.form)
        this.fetchChats()
        this.resetForm()
      } catch (error) {
        alert('Error al enviar mensaje')
      }
    },
    resetForm() {
      this.form = { workload: '', message: '' }
    }
  },
  mounted() {
    this.fetchChats()
  }
}
</script>