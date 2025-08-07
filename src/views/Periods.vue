<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">📆 Lista de Períodos</h2>
    <div v-if="userType === 'admin'" class="card mb-4">
      <div class="card-header">{{ editMode ? 'Editar Período' : 'Nuevo Período' }}</div>
      <div class="card-body">
        <form @submit.prevent="editMode ? updatePeriod() : createPeriod()">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" v-model="newPeriod.name" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="start_date" class="form-label">Fecha de inicio</label>
            <input type="date" v-model="newPeriod.start_date" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="end_date" class="form-label">Fecha de fin</label>
            <input type="date" v-model="newPeriod.end_date" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-success">{{ editMode ? 'Actualizar' : 'Crear' }}</button>
          <button type="button" class="btn btn-secondary ms-2" v-if="editMode" @click="cancelEdit">Cancelar</button>
        </form>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th v-if="userType === 'admin'">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="period in periods" :key="period.id">
              <td>{{ period.name }}</td>
              <td>{{ period.start_date }}</td>
              <td>{{ period.end_date }}</td>
              <td v-if="userType === 'admin'">
                <button class="btn btn-sm btn-warning me-2" @click="editPeriod(period)">Editar</button>
                <button class="btn btn-sm btn-danger" @click="deletePeriod(period.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  name: 'PeriodView',
  data() {
    return {
      periods: [],
      newPeriod: { name: '', start_date: '', end_date: '' },
      editMode: false,
      selectedId: null,
      userType: localStorage.getItem('user_type') || ''
    }
  },
  mounted() {
    this.fetchPeriods()
  },
  methods: {
    async fetchPeriods() {
      try {
        const res = await api.getPeriods()
        this.periods = res.data.results || res.data.data || res.data
      } catch (error) {
        console.error('Error al obtener períodos:', error)
      }
    },
    async createPeriod() {
      try {
        await api.createPeriod(this.newPeriod)
        this.newPeriod = { name: '', start_date: '', end_date: '' }
        this.fetchPeriods()
      } catch (error) {
        console.error('Error al crear período:', error)
      }
    },
    async updatePeriod() {
      try {
        await api.updatePeriod(this.selectedId, this.newPeriod)
        this.cancelEdit()
        this.fetchPeriods()
      } catch (error) {
        console.error('Error al actualizar período:', error)
      }
    },
    async deletePeriod(id) {
      if (!confirm('¿Estás seguro de eliminar este período?')) return
      try {
        await api.deletePeriod(id)
        this.fetchPeriods()
      } catch (error) {
        console.error('Error al eliminar período:', error)
      }
    },
    editPeriod(period) {
      this.newPeriod = { ...period }
      this.selectedId = period.id
      this.editMode = true
    },
    cancelEdit() {
      this.newPeriod = { name: '', start_date: '', end_date: '' }
      this.selectedId = null
      this.editMode = false
    }
  }
}
</script>