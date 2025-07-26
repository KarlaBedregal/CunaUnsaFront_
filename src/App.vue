<template>
  <div id="app">
    <NavbarComponent v-if="mostrarNavbar" />
    <router-view />
  </div>
</template>

<script>
import NavbarComponent from '@/components/common/NavbarComponent.vue'
export default {
  name: 'App',
  components: {
    NavbarComponent
  },
  computed: {
    mostrarNavbar() {
      // Lista de rutas donde SÍ quieres mostrar la barra
      const rutasConBarra = [
        '/dashboard',
        '/profile',
        '/grades',
        '/calendar',
        '/files',
        '/reports',
        '/preferences'
      ]
      return rutasConBarra.includes(this.$route.path)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
