<template>
  <div class="A1">
    <h2>Servicios</h2>

    <div class="A3">
      <input v-model="searchQuery" type="text" placeholder="Buscar por origen..." />
    </div>

    <div class="A4">
      <button @click="mostrarFormulario = true">Agregar Servicio</button>
    </div>

    <!-- FORMULARIO AGREGAR NUEVO -->
    <div v-if="mostrarFormulario" class="formulario">
      <h3>Nuevo Servicio</h3>
      <form @submit.prevent="agregarRegistro">
        <input v-model="nuevoRegistro.fecha_hora" type="datetime-local" required />
        <input v-model="nuevoRegistro.origen" placeholder="Origen" required />
        <input v-model="nuevoRegistro.destino" placeholder="Destino" required />
        <input v-model="nuevoRegistro.tarifa" placeholder="Tarifa" type="number" required />

        <label>Usuario</label>
        <select v-model="nuevoRegistro.Usuarios" required>
          <option disabled value="">Seleccione un usuario</option>
          <option v-for="u in usuarios" :key="u.id" :value="u.id">{{ u.nombre }}</option>
        </select>

        <label>Taxista</label>
        <select v-model="nuevoRegistro.Taxistas" required>
          <option disabled value="">Seleccione un taxista</option>
          <option v-for="t in taxistas" :key="t.id" :value="t.id">{{ t.nombres }}</option>
        </select>

        <label>Vehículo</label>
        <select v-model="nuevoRegistro.Vehiculos" required>
          <option disabled value="">Seleccione un vehículo</option>
          <option v-for="v in vehiculos" :key="v.id" :value="v.id">{{ v.placa }}</option>
        </select>

        <button type="submit">Guardar</button>
        <button type="button" @click="cancelarFormulario">Cancelar</button>
      </form>
    </div>

    <!-- Tabla de Servicios -->
    <div class="A5">
      <table>
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Tarifa</th>
            <th>Usuario</th>
            <th>Taxista</th>
            <th>Vehículo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="servicio in filteredServicios" :key="servicio.id">
            <td>{{ servicio.fecha_hora }}</td>
            <td>{{ servicio.origen }}</td>
            <td>{{ servicio.destino }}</td>
            <td>{{ servicio.tarifa }}</td>
            <td>{{ obtenerNombreUsuario(servicio.Usuarios) }}</td>
            <td>{{ obtenerNombreTaxista(servicio.Taxistas) }}</td>
            <td>{{ obtenerPlaca(servicio.Vehiculos) }}</td>
            <td>
              <button @click="editarRegistro(servicio)">Editar</button>
              <button @click="eliminarRegistro(servicio)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edición -->
    <div v-if="registroEditando" class="A6">
      <div class="A7">
        <h3>Editar Servicio</h3>
        <form @submit.prevent="guardarCambios">
          <input v-model="registroEditando.fecha_hora" type="datetime-local" required />
          <input v-model="registroEditando.origen" placeholder="Origen" required />
          <input v-model="registroEditando.destino" placeholder="Destino" required />
          <input v-model="registroEditando.tarifa" type="number" required />

          <label>Usuario</label>
          <select v-model="registroEditando.Usuarios">
            <option v-for="u in usuarios" :key="u.id" :value="u.id">{{ u.nombre }}</option>
          </select>

          <label>Taxista</label>
          <select v-model="registroEditando.Taxistas">
            <option v-for="t in taxistas" :key="t.id" :value="t.id">{{ t.nombres }}</option>
          </select>

          <label>Vehículo</label>
          <select v-model="registroEditando.Vehiculos">
            <option v-for="v in vehiculos" :key="v.id" :value="v.id">{{ v.placa }}</option>
          </select>

          <button type="submit">Guardar</button>
          <button type="button" @click="cancelarEdicion">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      servicios: [],
      vehiculos: [],
      usuarios: [],
      taxistas: [],
      searchQuery: '',
      mostrarFormulario: false,
      nuevoRegistro: {},
      registroEditando: null,
    }
  },
  computed: {
    filteredServicios() {
      return this.servicios.filter((s) =>
        s.origen.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
    },
  },
  methods: {
    async fetchData() {
      try {
        const [servRes, vehRes, usuRes, taxRes] = await Promise.all([
          axios.get('http://localhost:8000/api/servicios/'),
          axios.get('http://localhost:8000/api/vehiculos/'),
          axios.get('http://localhost:8000/api/usuarios/'),
          axios.get('http://localhost:8000/api/taxistas/'),
        ])
        this.servicios = servRes.data
        this.vehiculos = vehRes.data
        this.usuarios = usuRes.data
        this.taxistas = taxRes.data
      } catch (error) {
        console.error('Error al cargar datos:', error)
      }
    },
    obtenerNombreUsuario(id) {
      const usuario = this.usuarios.find((u) => u.id === id)
      return usuario ? usuario.nombre : 'No encontrado'
    },
    obtenerNombreTaxista(id) {
      const taxista = this.taxistas.find((t) => t.id === id)
      return taxista ? taxista.nombres : 'No encontrado'
    },
    obtenerPlaca(id) {
      const vehiculo = this.vehiculos.find((v) => v.id === id)
      return vehiculo ? vehiculo.placa : 'No encontrado'
    },
    async agregarRegistro() {
      try {
        await axios.post('http://localhost:8000/api/servicios/', this.nuevoRegistro)
        alert('Servicio agregado correctamente.')
        this.nuevoRegistro = {}
        this.mostrarFormulario = false
        this.fetchData()
      } catch (error) {
        console.error('Error al agregar servicio:', error)
      }
    },
    editarRegistro(servicio) {
      this.registroEditando = { ...servicio }
    },
    async guardarCambios() {
      try {
        const url = `http://localhost:8000/api/servicios/${this.registroEditando.id}/`
        await axios.patch(url, this.registroEditando)
        alert('Cambios guardados correctamente.')
        this.registroEditando = null
        this.fetchData()
      } catch (error) {
        console.error('Error al guardar cambios:', error)
      }
    },
    cancelarFormulario() {
      this.mostrarFormulario = false
      this.nuevoRegistro = {}
    },
    cancelarEdicion() {
      this.registroEditando = null
    },
    async eliminarRegistro(servicio) {
      if (confirm('¿Estás seguro de eliminar este servicio?')) {
        try {
          await axios.delete(`http://localhost:8000/api/servicios/${servicio.id}/`)
          alert('Servicio eliminado correctamente.')
          this.fetchData()
        } catch (error) {
          console.error('Error al eliminar servicio:', error)
        }
      }
    },
  },
  mounted() {
    this.fetchData()
  },
}
</script>

<style scoped></style>
