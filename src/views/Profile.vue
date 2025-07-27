<!-- filepath: c:\CUNA-UNSA-\CunaFrontend\src\views\Profile.vue -->
<template>
  <div>
    <h2>Mi Perfil</h2>
    <div v-if="profile">
      <p><strong>Nombre:</strong> {{ profile.user_data.full_name }}</p>
      <p><strong>DNI:</strong> {{ profile.user_data.dni }}</p>
      <p><strong>Correo:</strong> {{ profile.user_data.correo_electronico }}</p>
      <p><strong>Tipo:</strong> {{ profile.user_type }}</p>
      <ul>
        <li v-for="action in profile.available_actions" :key="action.url">
          <a :href="action.url">{{ action.name }}</a>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Cargando perfil...</p>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  data() {
    return { profile: null }
  },
  async mounted() {
    try {
      const res = await api.getProfile()
      this.profile = res.data
    } catch (error) {
      this.profile = null
    }
  }
}
</script>