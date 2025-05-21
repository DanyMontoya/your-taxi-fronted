<template>
  <div class="p-4">
    <h2 class="text-xl font-semibold">Panel del Usuario</h2>
    <div v-if="usuario">
      <p><strong>Nombre:</strong> {{ usuario.nombres }}</p>
      <p><strong>email:</strong> {{ usuario.email }}</p>
      <p><strong>Documento:</strong> {{ usuario.documento }}</p>
    </div>
    <p v-else>Cargando...</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      usuario: null,
    }
  },
  async created() {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get('http://localhost:8000/api/mi_perfil/', {
        headers: { Authorization: `Token ${token}` },
      })
      this.usuario = response.data
    } catch (error) {
      console.error('Error cargando perfil:', error)
    }
  },
}
</script>
