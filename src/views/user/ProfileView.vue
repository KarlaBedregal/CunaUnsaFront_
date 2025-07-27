<template>
  <div class="profile-container">
    <h1 class="title">👤 Detalles de Usuario</h1>

    <div class="grid-layout">
      <div class="profile-section">
        <h2>📝 Información Personal</h2>
        <p><strong>Nombre:</strong> Jack Franco Llaique Chullunquia</p>
        <p><strong>Correo:</strong> jllaiquec@unsa.edu.pe <span class="note">(Visible para otros participantes del curso)</span></p>
        <p><strong>País:</strong> Perú</p>
        <p><strong>Ciudad:</strong> Arequipa</p>
        <p><strong>Zona horaria:</strong> America/Lima</p>
      </div>

      <div class="profile-section">
        <h2>🔐 Privacidad y Políticas</h2>
        <p><strong>Resumen de retención de datos:</strong> Sin restricciones</p>
      </div>

      <div class="profile-section">
        <h2>📚 Detalles del Curso</h2>
        <ul class="course-list">
          <li>PROGRAMACIÓN WEB 2 - LAB. GRUPO D</li>
          <li>ESTRUCTURA DE DATOS Y ALGORITMOS - LAB. GRUPO E</li>
          <li>INNOVACIÓN Y CREATIVIDAD - FUSIÓN AB</li>
          <li>INGLÉS - GRUPO A</li>
          <li>CIUDADANÍA E INTERCULTURALIDAD - GRUPO C</li>
          <li>LIDERAZGO Y COLABORACIÓN - GRUPO B</li>
        </ul>
      </div>

      <div class="profile-section">
        <h2>📂 Miscelánea</h2>
        <ul>
          <li>Entradas del blog</li>
          <li>Mensajes en foros</li>
          <li>Planes de aprendizaje</li>
          <li>Sesiones del navegador</li>
        </ul>
      </div>

      <div class="profile-section">
        <h2>📈 Actividad de Acceso</h2>
        <p><strong>Primer acceso:</strong> lunes, 7 de abril de 2025, 15:17</p>
        <p><strong>Último acceso:</strong> sábado, 26 de julio de 2025, 00:48</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView'
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

.course-list {
  padding-left: 1.2rem;
  list-style-type: disc;
}

.note {
  font-style: italic;
  font-size: 0.9rem;
  color: #888888;
}
</style>