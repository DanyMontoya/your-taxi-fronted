<template>
  <div class="A1">
    <h2>Administrador</h2>

    <div class="A2">
      <button :class="{ active: selectedTab === 'vehiculos' }" @click="selectTab('vehiculos')">
        Vehículos
      </button>
      <button :class="{ active: selectedTab === 'taxistas' }" @click="selectTab('taxistas')">
        Taxistas
      </button>
      <button :class="{ active: selectedTab === 'usuarios' }" @click="selectTab('usuarios')">
        Usuarios
      </button>
    </div>

    <div class="A3">
      <input v-model="searchQuery" type="text" placeholder="Buscar..." />
    </div>

    <div class="A4">
      <button @click="mostrarFormulario = true">Agregar {{ selectedTab.slice(0, -1) }}</button>
    </div>

    <!-- FORMULARIO AGREGAR NUEVO -->
    <div v-if="mostrarFormulario" class="formulario">
      <h3>Nuevo {{ selectedTab }}</h3>
      <form @submit.prevent="agregarRegistro">
        <div v-if="selectedTab === 'vehiculos'">
          <input v-model="nuevoRegistro.placa" placeholder="Placa" required />
          <input v-model="nuevoRegistro.modelo" placeholder="Modelo" type="number" required />
          <input v-model="nuevoRegistro.marca" placeholder="Marca" required />
        </div>
        <div v-else-if="selectedTab === 'taxistas'">
          <input v-model="nuevoRegistro.nombres" placeholder="Nombres" required />
          <input
            v-model="nuevoRegistro.numero_licencia"
            placeholder="Número de Licencia"
            required
          />
          <input v-model="nuevoRegistro.telefono" placeholder="Teléfono" />
          <label for="vehiculo">Vehículo (Placa)</label>
          <select v-model="nuevoRegistro.vehiculo" required>
            <option disabled value="">Seleccione una placa</option>
            <option v-for="vehiculo in vehiculos" :key="vehiculo.id" :value="vehiculo.id">
              {{ vehiculo.placa }}
            </option>
          </select>
        </div>
        <div class="containers" v-else-if="selectedTab === 'usuarios'">
          <!-- <input v-model="nuevoRegistro.id" placeholder="id" required /> -->
          <div class="form-group">
            <label for="tipoDocumento">Tipo de Documento</label>
            <select id="tipoDocumento" v-model="nuevoRegistro.tipo_documento" required>
              <option value="c.c">Cédula de Ciudadanía</option>
              <option value="t.i">Tarjeta de Identidad</option>
              <option value="c.e">Cédula de Extranjería</option>
            </select>
          </div>
          <input
            class="form-group"
            v-model="nuevoRegistro.documento"
            placeholder="Numero de documento"
          />
          <input
            class="form-group"
            v-model="nuevoRegistro.primer_apellido"
            placeholder="Primer apellido"
          />
          <input
            class="form-group"
            v-model="nuevoRegistro.segundo_apellido"
            placeholder="Segundo apellido"
          />
          <input class="form-group" v-model="nuevoRegistro.nombres" placeholder="Nombres" />
          <div class="form-group">
            <label>Género</label>
            <div class="radio-group">
              <label
                ><input type="radio" value="femenino" v-model="nuevoRegistro.genero" />
                Femenino</label
              >
              <label
                ><input type="radio" value="masculino" v-model="nuevoRegistro.genero" />
                Masculino</label
              >
              <label><input type="radio" value="otro" v-model="nuevoRegistro.genero" /> Otro</label>
            </div>
          </div>
          <div class="form-group">
            <label for="fechaNacimiento">Fecha de Nacimiento</label>
            <input
              type="date"
              id="fefachaNacimiento"
              v-model="nuevoRegistro.fecha_nacimiento"
              required
            />
          </div>
          <input
            class="form-group"
            v-model="nuevoRegistro.correo"
            placeholder="Correo electrónico"
          />
          <input
            class="form-group"
            v-model="nuevoRegistro.telefono"
            placeholder="Telefono o celular"
          />
          <input class="form-group" v-model="nuevoRegistro.username" placeholder="Usuario" />
          <input class="form-group" v-model="nuevoRegistro.password" placeholder="Contraseña" />
        </div>
        <button type="submit">Guardar</button>
        <button type="button" @click="cancelarFormulario">Cancelar</button>
      </form>
    </div>

    <!-- Tabla Vehículos -->
    <div class="A5" v-if="selectedTab === 'vehiculos'">
      <table>
        <thead>
          <tr>
            <!-- <td>Id</td> -->
            <th>Placa</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vehiculo in filteredVehiculos" :key="vehiculo.id">
            <!-- <td>{{ vehiculo.id }}</td> -->
            <td>{{ vehiculo.placa }}</td>
            <td>{{ vehiculo.modelo }}</td>
            <td>{{ vehiculo.marca }}</td>
            <td>
              <button @click="editarRegistro(vehiculo)">Editar</button>
              <button @click="eliminarRegistro(vehiculo)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tabla Taxistas -->
    <div class="A5" v-if="selectedTab === 'taxistas'">
      <table>
        <thead>
          <tr>
            <!-- <th>Id</th> -->
            <th>Nombres</th>
            <th>Número Licencia</th>
            <th>Teléfono</th>
            <th>Vehículo (placa)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="taxista in filteredTaxistas" :key="taxista.id">
            <!-- <td>{{ taxista.id }}</td> -->
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

    <!-- Tabla Usuarios -->
    <div class="A5" v-if="selectedTab === 'usuarios'">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tipo_documento</th>
            <th>Documento</th>
            <th>Primer_apellido</th>
            <th>Segundo_apellido</th>
            <th>Nombres</th>
            <th>Genero</th>
            <th>Fecha_nacimiento</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Username</th>
            <th>Password</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in filteredUsuarios" :key="usuario.id">
            <td>{{ usuario.id }}</td>
            <td>{{ usuario.tipo_documento }}</td>
            <td>{{ usuario.documento }}</td>
            <td>{{ usuario.primer_apellido }}</td>
            <td>{{ usuario.segundo_apellido }}</td>
            <td>{{ usuario.nombres }}</td>
            <td>{{ usuario.genero }}</td>
            <td>{{ usuario.fecha_nacimiento }}</td>
            <td>{{ usuario.correo }}</td>
            <td>{{ usuario.telefono }}</td>
            <td>{{ usuario.username }}</td>
            <td>{{ usuario.password }}</td>

            <td>
              <button @click="editarRegistro(usuario)">Editar</button>
              <button @click="eliminarRegistro(usuario)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edición -->
    <div v-if="registroEditando" class="A6">
      <div class="A7">
        <h3>Editar {{ selectedTab.slice(0, -1) }}</h3>
        <form @submit.prevent="guardarCambios">
          <div v-for="(valor, campo) in registroEditando" :key="campo">
            <label :for="campo">{{ campo }}</label>
            <select
              v-if="selectedTab === 'taxistas' && campo === 'vehiculo'"
              v-model="registroEditando[campo]"
              :id="campo"
            >
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
          <div v-if="registroEditando && selectedTab === 'usuarios'">
            <label for="password">Contraseña</label>
            <input v-model="registroEditando.password" id="password" type="password" />
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
      usuarios: [],
      selectedTab: 'vehiculos',
      searchQuery: '',
      registroEditando: null,
      mostrarFormulario: false,
      nuevoRegistro: {},
    }
  },
  computed: {
    filteredVehiculos() {
      return this.vehiculos.filter((v) =>
        v.placa.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
    },
    filteredTaxistas() {
      return this.taxistas.filter((t) =>
        t.nombres.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
    },
    filteredUsuarios() {
      return this.usuarios.filter((u) =>
        u.nombres.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
    },
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab
      this.searchQuery = ''
      this.mostrarFormulario = false
      this.nuevoRegistro = {}
    },
    editarRegistro(item) {
      this.registroEditando = { ...item }
    },
    cancelarEdicion() {
      this.registroEditando = null
    },
    async guardarCambios() {
      try {
        const endpoint = `http://127.0.0.1:8000/api/${this.selectedTab}/${this.registroEditando.id}/`

        let payload = {}

        if (this.selectedTab === 'usuarios') {
          payload = {
            tipo_documento: this.registroEditando.tipo_documento,
            documento: this.registroEditando.documento,
            primer_apellido: this.registroEditando.primer_apellido,
            segundo_apellido: this.registroEditando.segundo_apellido,
            nombres: this.registroEditando.nombres,
            genero: this.registroEditando.genero,
            fecha_nacimiento: this.registroEditando.fecha_nacimiento,
            correo: this.registroEditando.correo,
            telefono: this.registroEditando.telefono,
            username: this.registroEditando.username,
            ...(this.registroEditando.password && { password: this.registroEditando.password }),
          }
        } else if (this.selectedTab === 'vehiculos') {
          payload = {
            placa: this.registroEditando.placa,
            modelo: this.registroEditando.modelo,
            marca: this.registroEditando.marca,
          }
        } else if (this.selectedTab === 'taxistas') {
          payload = {
            nombres: this.registroEditando.nombres,
            numero_licencia: this.registroEditando.numero_licencia,
            telefono: this.registroEditando.telefono,
            vehiculo: this.registroEditando.vehiculo,
          }
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
          const endpoint = `http://127.0.0.1:8000/api/${this.selectedTab}/${item.id}/`
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
        const endpoint = `http://127.0.0.1:8000/api/${this.selectedTab}/`
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
        const [vehiculosRes, taxistasRes, usuariosRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/vehiculos/'),
          axios.get('http://127.0.0.1:8000/api/taxistas/'),
          axios.get('http://127.0.0.1:8000/api/usuarios/'),
        ])
        this.vehiculos = vehiculosRes.data
        this.taxistas = taxistasRes.data
        this.usuarios = usuariosRes.data
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
