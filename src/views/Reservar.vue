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
          <!-- {{ u.nombres }} le agregue la s -->
          <option v-for="u in usuarios" :key="u.id" :value="u.id">{{ u.nombres }}</option>
        </select>

        <label>Taxista</label>
        <select
          v-model="servicios.Taxistas"
          @change="asignarVehiculoDesdeTaxista"
          required
          class="border rounded px-4 py-2"
        >
          <option disabled value="">Seleccione un taxista</option>
          <option v-for="taxista in taxistas" :key="taxista.id" :value="taxista.id">
            {{ taxista.nombres }}
          </option>
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
            <option v-for="u in usuarios" :key="u.id" :value="u.id">{{ u.nombres }}</option>
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
        console.log(this.usuarios)
        this.taxistas = taxRes.data
      } catch (error) {
        console.error('Error al cargar datos:', error)
      }
    },
    asignarVehiculoDesdeTaxista() {
      const taxistaSeleccionado = this.taxistas.find((t) => t.id === this.servicio.Taxistas)
      if (taxistaSeleccionado) {
        this.servicio.Vehiculos = taxistaSeleccionado.vehiculo
      }
    },
    // le faltaba la s para que me mostrara los datos en la tabla "usuario.nombres"
    obtenerNombreUsuario(id) {
      const usuario = this.usuarios.find((u) => u.id === id)
      return usuario ? usuario.nombres : 'No encontrado'
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

<style scoped>
.A1 {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  text-align: center;
}
.A2 {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.A2 button {
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background-color: #ccc;
  border-radius: 5px;
}
.A2 button.active {
  background-color: #4caf50;
  color: white;
}
.A3 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
.A3 input {
  width: 50%;
  padding: 10px;
  font-size: 16px;
  text-align: center;
}
.A5 {
  overflow-x: auto;
  max-height: 160px; /* Altura máxima del contenedor */
  overflow-y: auto; /* Scroll vertical automático */
  border: 3px solid #ccc; /* Borde opcional */
  padding: 10px;
}
.usuario-item {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

/* tabla de registros */
table {
  width: 100%;
  border-collapse: collapse;
}

.formulario {
  width: 50%;
}
thead {
  background-color: #f2f2f2;
}
th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
/*Formulario de nuevo registro en administrador */
.A6 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  overflow: auto; /* Permite hacer scroll si el contenido es más grande que la pantalla */
  padding: 20px;
}
.A7 {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  max-height: 90vh; /* Limita la altura del viewport */
  overflow-y: auto; /* Habilita scroll interno */
}
.A7 form {
  display: flex;
  flex-direction: column;
}
.A7 label {
  margin-top: 10px;
}
.A7 input {
  padding: 5px;
}
.A7 button {
  margin-top: 10px;
}
</style>
