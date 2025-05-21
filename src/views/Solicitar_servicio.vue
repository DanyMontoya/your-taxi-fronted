<!-- <template>
  <p class="par">Haz próximamente tus solicitudes de servicios en esta parte...</p>
</template>

<script></script>

<style scoped>
.par {
  color: blue;
  text-align: center;
  padding-bottom: 10%;
  font-size: 30px;
}
</style> -->

<!-- <template>
  <div class="container">
    <h2>Bienvenido, {{ usuario.nombre }}</h2>

    <section class="datos">
      <h3>Datos personales</h3>
      <p><strong>Nombre:</strong> {{ usuario.nombre }}</p>
      <p><strong>Correo:</strong> {{ usuario.email }}</p>
      <p><strong>Teléfono:</strong> {{ usuario.telefono }}</p>
    </section>

    <section class="solicitud">
      <h3>Solicitar un viaje</h3>
      <form @submit.prevent="solicitarViaje">
        <label for="origen">Origen:</label>
        <input type="text" v-model="solicitud.origen" required />

        <label for="destino">Destino:</label>
        <input type="text" v-model="solicitud.destino" required />

        <button type="submit">Solicitar</button>
      </form>
      <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
    </section>

    <section class="historial">
      <h3>Historial de viajes</h3>
      <ul>
        <li v-for="servicio in historial" :key="servicio.id">
          {{ servicio.origen }} → {{ servicio.destino }} | {{ servicio.estado }} |
          {{ servicio.fecha_solicitud }}
        </li>
      </ul>
    </section>

    <button @click="cerrarSesion" class="cerrar">Cerrar sesión</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MenuPerfilUsuario',
  data() {
    return {
      usuario: {},
      historial: [],
      solicitud: {
        origen: '',
        destino: '',
      },
      mensaje: '',
    }
  },
  methods: {
    async obtenerDatos() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/mi_perfil/', {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        })
        this.usuario = response.data
      } catch (err) {
        this.$router.push('/login')
      }
    },
    async obtenerHistorial() {
      const response = await axios.get('http://127.0.0.1:8000/api/mis_servicios/', {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      this.historial = response.data
    },
    async solicitarViaje() {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/solicitar_servicio/',
          this.solicitud,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            },
          },
        )
        this.mensaje = '¡Solicitud enviada con éxito!'
        this.obtenerHistorial()
        this.solicitud.origen = ''
        this.solicitud.destino = ''
      } catch (err) {
        this.mensaje = 'Error al solicitar el servicio.'
      }
    },
    cerrarSesion() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
  },
  mounted() {
    this.obtenerDatos()
    this.obtenerHistorial()
  },
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
label {
  display: block;
  margin-top: 10px;
}
button {
  margin-top: 15px;
}
.mensaje {
  color: green;
}
.cerrar {
  background-color: red;
  color: white;
  margin-top: 30px;
}
</style> -->

<template>
  <section v-if="usuario">
    <h3 class="a1">Mi perfil</h3>
    <div class="a2">
      <p>
        <strong>👤</strong> {{ usuario.nombres }} {{ usuario.primer_apellido }}
        {{ usuario.segundo_apellido }}
      </p>
      <p><strong>🆔</strong> {{ usuario.documento }}</p>
      <p><strong>📧</strong> {{ usuario.email }}</p>
      <p><strong>👤</strong> {{ usuario.username }}</p>
      <p><strong>📞</strong> {{ usuario.telefono }}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: ['usuario'],
}
</script>
