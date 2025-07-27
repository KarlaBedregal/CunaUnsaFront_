<template>
  <div class="container mt-4">
    <h2>Anuncios</h2>

    <!-- Admin y Teacher pueden crear -->
    <div v-if="userType === 'admin' || userType === 'teacher'" class="mb-3">
      <h5>{{ isEditing ? 'Editar' : 'Nuevo' }} Anuncio</h5>
      <form @submit.prevent="saveAnnouncement">
        <div class="mb-2">
          <label>Título:</label>
          <input v-model="form.title" type="text" class="form-control" required />
        </div>
        <div class="mb-2">
          <label>Contenido:</label>
          <textarea v-model="form.content" class="form-control" required></textarea>
        </div>
        <div class="mb-2">
          <label>Workload ID:</label>
          <input v-model="form.workload" type="number" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-success">{{ isEditing ? 'Actualizar' : 'Crear' }}</button>
        <button type="button" @click="cancelEdit" class="btn btn-secondary ms-2">Cancelar</button>
      </form>
    </div>

    <div v-if="anuncios.length === 0">
      <p>No hay anuncios disponibles.</p>
    </div>

    <ul class="list-group mt-3">
      <li v-for="a in anuncios" :key="a.id" class="list-group-item">
        <h5>{{ a.title }}</h5>
        <p>{{ a.content }}</p>
        <p><strong>Workload ID:</strong> {{ a.workload }}</p>

        <!-- Admin o Teacher pueden editar/eliminar -->
        <div v-if="userType === 'admin' || userType === 'teacher'" class="mt-2">
          <button class="btn btn-warning btn-sm me-2" @click="editAnnouncement(a)">Editar</button>
          <button class="btn btn-danger btn-sm" @click="deleteAnnouncement(a.id)">Eliminar</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AnnouncementsView",
  data() {
    return {
      anuncios: [],
      form: {
        title: "",
        content: "",
        workload: null,
      },
      isEditing: false,
      editingId: null,
      userType: "",
    };
  },
  methods: {
    async fetchAnnouncements() {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get("https://cunaunsa.onrender.com/api/announcements/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.anuncios = response.data;
      } catch (error) {
        console.error("Error al obtener anuncios:", error);
      }
    },
    async fetchUserType() {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get("https://cunaunsa.onrender.com/api/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.userType = response.data.user_type;
      } catch (error) {
        console.error("Error al obtener tipo de usuario:", error);
      }
    },
    async saveAnnouncement() {
      const token = localStorage.getItem("access");
      const url = `https://cunaunsa.onrender.com/api/announcements/${this.isEditing ? this.editingId + "/" : ""}`;
      const method = this.isEditing ? "put" : "post";

      try {
        await axios({
          method,
          url,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: this.form,
        });
        this.fetchAnnouncements();
        this.resetForm();
      } catch (error) {
        alert("Error al guardar anuncio: " + error.response?.data?.detail || error.message);
      }
    },
    editAnnouncement(anuncio) {
      this.form = { ...anuncio };
      this.isEditing = true;
      this.editingId = anuncio.id;
    },
    async deleteAnnouncement(id) {
      if (!confirm("¿Estás seguro de eliminar este anuncio?")) return;
      try {
        const token = localStorage.getItem("access");
        await axios.delete(`https://cunaunsa.onrender.com/api/announcements/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.fetchAnnouncements();
      } catch (error) {
        alert("Error al eliminar anuncio");
      }
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.form = {
        title: "",
        content: "",
        workload: null,
      };
      this.isEditing = false;
      this.editingId = null;
    },
  },
  mounted() {
    this.fetchUserType();
    this.fetchAnnouncements();
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
