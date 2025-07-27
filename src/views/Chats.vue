<!-- filepath: c:\CUNA-UNSA-\CunaFrontend\src\views\Chats.vue -->
<template>
  <div>
    <h2>Chats</h2>
    <ul>
      <li v-for="chat in chats" :key="chat.id">
        {{ chat.titulo }} - {{ chat.mensaje }}
      </li>
    </ul>
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
      this.chats = res.data
    } catch (error) {
      this.chats = []
    }
  }
}
</script>