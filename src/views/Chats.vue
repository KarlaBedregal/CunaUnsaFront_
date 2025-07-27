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
import api from '@/services/api'
export default {
  name: 'ChatsView',
  data() {
    return { chats: [] }
  },
  async mounted() {
    try {
      const res = await api.getChats()
      this.chats = res.data.results || res.data.data || res.data
    } catch (error) {
      this.chats = []
    }
  }
}
</script>