<!-- src/views/user/GradesView.vue -->
<template>
  <div class="profile-container">
    <h1 class="title">📊 Calificaciones</h1>

    <div class="grid-layout">
      <div class="profile-section">
        <h2>PROGRAMACIÓN WEB 2</h2>
        <p><strong>Nota final:</strong> 18</p>
      </div>

      <div class="profile-section">
        <h2>ESTRUCTURA DE DATOS</h2>
        <p><strong>Nota final:</strong> 17</p>
      </div>

      <div class="profile-section">
        <h2>INGLÉS</h2>
        <p><strong>Nota final:</strong> 19</p>
      </div>

      <!-- Puedes seguir agregando más cursos aquí -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'GradesView'
}
</script>

<style scoped>
.profile-container {
  background-color: #ffffff;
  color: #333333;
  padding: 2rem;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}

.title {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.profile-section {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.profile-section:hover {
  transform: translateY(-2px);
}

.profile-section h2 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.4rem;
}
</style>
