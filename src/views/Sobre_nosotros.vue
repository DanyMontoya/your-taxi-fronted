<template>
  <div class="perfil-taxista">
    <h2>Perfil del Taxista</h2>

    <div class="perfil-card" v-if="taxista">
      <img v-if="taxista.foto" :src="taxista.foto" alt="Foto del taxista" class="foto-perfil" />

      <p><strong>Nombre:</strong> {{ taxista.nombres }}</p>
      <p><strong>Licencia:</strong> {{ taxista.numero_licencia }}</p>
      <p><strong>Teléfono:</strong> {{ taxista.telefono }}</p>
      <p><strong>Correo:</strong> {{ taxista.correo }}</p>

      <div v-if="taxista.vehiculo">
        <h3>Vehículo Asignado</h3>
        <p><strong>Marca:</strong> {{ taxista.vehiculo.marca }}</p>
        <p><strong>Modelo:</strong> {{ taxista.vehiculo.modelo }}</p>
        <p><strong>Placa:</strong> {{ taxista.vehiculo.placa }}</p>
      </div>

      <button @click="editarPerfil">Editar Perfil</button>
    </div>

    <div v-else>
      <p>Cargando información...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      taxista: null,
    }
  },
  methods: {
    async obtenerPerfil() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/taxistas/1/') // usa el ID correspondiente
        this.taxista = response.data
      } catch (error) {
        console.error('Error al obtener el perfil del taxista:', error)
      }
    },
    obtenerPlaca(idVehiculo) {
      const vehiculo = this.vehiculos.find((v) => v.id === idVehiculo)
      return vehiculo ? vehiculo.placa : 'No encontrado'
    },
    editarPerfil() {
      alert('Funcionalidad de edición aún no implementada')
    },
  },
  mounted() {
    this.obtenerPerfil()
  },
}
</script>

<style scoped>
.perfil-taxista {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
.perfil-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: #fafafa;
}
.foto-perfil {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
