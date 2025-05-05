<template>
  <div class="A1">
    <h2>Taxistas</h2>

    <div class="A3">
      <input v-model="searchQuery" type="text" placeholder="Buscar..." />
    </div>

    <div class="A4">
      <button @click="mostrarFormulario = true">Agregar Taxista</button>
    </div>

    <!-- FORMULARIO AGREGAR NUEVO -->
    <div v-if="mostrarFormulario" class="formulario">
      <h3>Nuevo Taxista</h3>
      <form @submit.prevent="agregarRegistro">
        <input v-model="nuevoRegistro.nombres" placeholder="Nombres" required />
        <input v-model="nuevoRegistro.numero_licencia" placeholder="Número de Licencia" required />
        <input v-model="nuevoRegistro.telefono" placeholder="Teléfono" />
        <label for="vehiculo">Vehículo (Placa)</label>
        <select v-model="nuevoRegistro.vehiculo" required>
          <option disabled value="">Seleccione una placa</option>
          <option v-for="vehiculo in vehiculos" :key="vehiculo.id" :value="vehiculo.id">
            {{ vehiculo.placa }}
          </option>
        </select>
        <button type="submit">Guardar</button>
        <button type="button" @click="cancelarFormulario">Cancelar</button>
      </form>
    </div>

    <!-- Tabla Taxistas -->
    <div class="A5">
      <table>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Número Licencia</th>
            <th>Teléfono</th>
            <th>Vehículo (placa)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="taxista in filteredTaxistas" :key="taxista.id">
            <td>{{ taxista.nombres }}</td>
            <td>{{ taxista.numero_licencia }}</td>
            <td>{{ taxista.telefono }}</td>
            <td>{{ obtenerPlaca(taxista.vehiculo) }}</td>
            <td>
              <button @click="editarRegistro(taxista)">Editar</button>
              <button @click="eliminarRegistro(taxista)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edición -->
    <div v-if="registroEditando" class="A6">
      <div class="A7">
        <h3>Editar Taxista</h3>
        <form @submit.prevent="guardarCambios">
          <div v-for="(valor, campo) in registroEditando" :key="campo">
            <label :for="campo">{{ campo }}</label>
            <select v-if="campo === 'vehiculo'" v-model="registroEditando[campo]" :id="campo">
              <option v-for="vehiculo in vehiculos" :key="vehiculo.id" :value="vehiculo.id">
                {{ vehiculo.placa }}
              </option>
            </select>
            <input
              v-else
              v-model="registroEditando[campo]"
              :id="campo"
              :disabled="campo === 'id'"
            />
          </div>
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
      vehiculos: [],
      taxistas: [],
      searchQuery: '',
      registroEditando: null,
      mostrarFormulario: false,
      nuevoRegistro: {},
    }
  },
  computed: {
    filteredTaxistas() {
      return this.taxistas.filter((t) =>
        t.nombres.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
    },
  },
  methods: {
    editarRegistro(item) {
      this.registroEditando = { ...item }
    },
    cancelarEdicion() {
      this.registroEditando = null
    },
    async guardarCambios() {
      try {
        const endpoint = `http://127.0.0.1:8000/api/taxistas/${this.registroEditando.id}/`
        const payload = {
          nombres: this.registroEditando.nombres,
          numero_licencia: this.registroEditando.numero_licencia,
          telefono: this.registroEditando.telefono,
          vehiculo: this.registroEditando.vehiculo,
        }
        await axios.patch(endpoint, payload)
        alert('Cambios guardados correctamente.')
        this.registroEditando = null
        this.fetchData()
      } catch (error) {
        console.error('Error al guardar cambios:', error)
      }
    },
    async eliminarRegistro(item) {
      if (confirm('¿Estás seguro de eliminar este registro?')) {
        try {
          const endpoint = `http://127.0.0.1:8000/api/taxistas/${item.id}/`
          await axios.delete(endpoint)
          alert('Registro eliminado correctamente.')
          this.fetchData()
        } catch (error) {
          console.error('Error al eliminar registro:', error)
        }
      }
    },
    async agregarRegistro() {
      try {
        const endpoint = 'http://127.0.0.1:8000/api/taxistas/'
        await axios.post(endpoint, this.nuevoRegistro)
        alert('Registro agregado correctamente.')
        this.mostrarFormulario = false
        this.nuevoRegistro = {}
        this.fetchData()
      } catch (error) {
        console.error('Error al agregar registro:', error)
      }
    },
    cancelarFormulario() {
      this.mostrarFormulario = false
      this.nuevoRegistro = {}
    },
    async fetchData() {
      try {
        const [vehiculosRes, taxistasRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/vehiculos/'),
          axios.get('http://127.0.0.1:8000/api/taxistas/'),
        ])
        this.vehiculos = vehiculosRes.data
        this.taxistas = taxistasRes.data
      } catch (error) {
        console.error('Error al cargar datos:', error)
      }
    },
    obtenerPlaca(idVehiculo) {
      const vehiculo = this.vehiculos.find((v) => v.id === idVehiculo)
      return vehiculo ? vehiculo.placa : 'No encontrado'
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
