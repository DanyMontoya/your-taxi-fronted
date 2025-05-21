<template>
  <div class="perfil_usuario">
    <!-- <h2 class="text-xl font-semibold mb-4">Panel del Usuario</h2> -->

    <section v-if="usuario">
      <!-- <h3 class="text-lg font-semibold">Perfil</h3> -->
      <h3 class="a1">Mi perfil</h3>
      <div class="a2">
        <p>
          <strong><span>👤 </span></strong> {{ usuario.nombres }} {{ usuario.primer_apellido }}
          {{ usuario.segundo_apellido }}
        </p>
        <p>
          <strong><span>🆔 </span></strong> {{ usuario.documento }}
        </p>
        <p>
          <strong><span>📧 </span></strong> {{ usuario.email }}
        </p>
        <p>
          <strong><span>👤 </span></strong> {{ usuario.username }}
        </p>
        <p>
          <strong><span>📞 </span></strong>{{ usuario.telefono }}
        </p>
      </div>
      <!-- Muestra los métodos de pago -->
      <section v-if="usuario.metodos_pago && usuario.metodos_pago.length" class="mt-4">
        <h3 class="text-lg font-semibold">Métodos de Pago Registrados</h3>
        <ul>
          <li
            v-for="metodo in usuario.metodos_pago"
            :key="metodo.id"
            class="flex items-center justify-between mb-1"
          >
            <div>
              <strong>{{ metodo.tipo }}:</strong> {{ metodo.detalles }}
            </div>
            <button
              @click="eliminarMetodoPago(metodo.id)"
              class="ml-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Eliminar
            </button>
          </li>
        </ul>
      </section>
    </section>

    <!-- Este es el formulario para agregar método de pago -->
    <form @submit.prevent="registrarMetodoPago" class="mt-4">
      <h3 class="text-lg font-semibold mb-2">Agregar Método de Pago</h3>
      <div class="mb-2">
        <label class="block">Tipo:</label>
        <select v-model="nuevoMetodo.tipo" class="border p-1 w-full">
          <option value="">Seleccione un método</option>
          <option value="credito">Tarjeta de Crédito</option>
          <option value="debito">Tarjeta Débito</option>
          <option value="efectivo">Efectivo</option>
          <option value="nequi">Nequi</option>
          <option value="daviplata">Daviplata</option>
        </select>
      </div>
      <div class="mb-2">
        <label class="block">Detalles:</label>
        <input
          v-model="nuevoMetodo.detalles"
          class="border p-1 w-full"
          placeholder="Ej: **** 1234"
        />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Agregar</button>
    </form>

    <!-- Historial de viajes -->
    <section v-if="viajes.length">
      <h3 class="text-lg font-semibold mt-6">Historial de Viajes</h3>
      <ul>
        <li v-for="viaje in viajes" :key="viaje.id" class="mb-2">
          <strong>Destino:</strong> {{ viaje.destino }} <br />
          <strong>Fecha:</strong> {{ formatFecha(viaje.fecha_solicitud) }} <br />
          <strong>Estado:</strong> {{ viaje.estado }}
        </li>
      </ul>
    </section>

    <!-- Estados -->
    <p v-if="!usuario && !error">Cargando perfil...</p>
    <p v-if="usuario && viajes.length === 0">No hay viajes registrados.</p>
    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    <div>
      <button class="a4"><span class="a5">🚖 </span>Solicitar Servivio</button>
    </div>
    <nav class="a1">
      <ul class="menu">
        <li>
          <RouterLink
            @click="selectedLink = 'sobre_mi_cuenta'"
            to="/sobre_mi_cuenta"
            :class="['nav-link', { active: selectedLink === 'sobre_mi_cuenta' }]"
            ><span class="a3">👤 </span>Sobre mi Cuenta</RouterLink
          >
        </li>
        <li>
          <RouterLink
            @click="selectedLink = 'perfil_usuario'"
            to="/perfil_usuario"
            :class="['nav-link', { active: selectedLink === 'perfil_usuario' }]"
            ><span class="a3">🏠 </span>Principal</RouterLink
          >
        </li>
        <li>
          <RouterLink
            @click="selectedLink = 'informacion'"
            to="/informacion"
            :class="['nav-link', { active: selectedLink === 'informacion' }]"
            ><span class="a3">ℹ️ </span>Información</RouterLink
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      active: '', // quitar esto si no funciona la prueva //////////////////////////////////////
      selectedLink: '', // para controlar qué enlace está activo
      usuario: null,
      viajes: [],
      error: '',
      nuevoMetodo: {
        tipo: '',
        detalles: '',
      },
    }
  },

  methods: {
    formatFecha(fecha) {
      return new Date(fecha).toLocaleString()
    },

    async registrarMetodoPago() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.error = 'No estás autenticado.'
        return
      }

      try {
        const response = await axios.post(
          'http://localhost:8000/api/metodos-pago/',
          this.nuevoMetodo,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        )
        alert('Método de pago registrado correctamente.')
        this.nuevoMetodo.tipo = ''
        this.nuevoMetodo.detalles = ''
        // para actualizar el perfil
        const perfilResp = await axios.get('http://localhost:8000/usuario/perfil-completo/', {
          headers: { Authorization: `Token ${token}` },
        })
        this.usuario = perfilResp.data
      } catch (error) {
        console.error('Error registrando método de pago:', error)
        this.error = 'No se pudo registrar el método de pago.'
      }
    },
    async eliminarMetodoPago(id) {
      const token = localStorage.getItem('token')
      if (!token) {
        this.error = 'No estás autenticado.'
        return
      }

      try {
        await axios.delete(`http://localhost:8000/api/metodos-pago/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        })
        // Actualizar el perfil después de eliminar
        const perfilResp = await axios.get('http://localhost:8000/usuario/perfil-completo/', {
          headers: { Authorization: `Token ${token}` },
        })
        this.usuario = perfilResp.data
      } catch (error) {
        console.error('Error eliminando método de pago:', error)
        this.error = 'No se pudo eliminar el método de pago.'
      }
    },
  },

  async created() {
    const token = localStorage.getItem('token')

    if (!token) {
      this.error = 'Token no encontrado. Por favor inicia sesión.'
      return
    }

    try {
      const perfilResp = await axios.get('http://localhost:8000/usuario/perfil-completo/', {
        headers: { Authorization: `Token ${token}` },
      })
      this.usuario = perfilResp.data

      const viajesResp = await axios.get('http://localhost:8000/api/viajes/', {
        headers: { Authorization: `Token ${token}` },
      })
      this.viajes = viajesResp.data
    } catch (error) {
      console.error('Error cargando datos:', error)
      this.error = 'No se pudieron cargar los datos del perfil o historial de viajes.'
    }
  },
}
</script>
<style scoped>
.perfil_usuario {
  /* display: flex; */
  /* justify-content: center;
  align-items: center;
  height: 100vh; */
  background-color: rgba(0, 0, 0, 0.962);
  color: white;
  max-width: 800px;
  max-height: 150vh;
  margin: auto;
  margin-top: 10px;
}
.a1 {
  text-align: center;
  background-color: rgb(255, 72, 0);
}
.a2 {
  margin-left: 5%;
}
.a3 {
  font-size: 20px;
}
.a4 {
  width: 400px;
  height: 50px;
  display: block;
  margin: 0 auto 10px auto;
  padding: 0px 0px 50px 0px;
  border-radius: 4px;
}
.a5 {
  font-size: 30px;
}
</style>
