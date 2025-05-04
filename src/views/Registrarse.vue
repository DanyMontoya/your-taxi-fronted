<template>
  <div class="containers">
    <h2>Registro</h2>
    <form @submit.prevent="registrarse">
      <div class="form-group">
        <label for="tipoDocumento">Tipo de Documento</label>
        <select id="tipoDocumento" v-model="form.tipoDocumento" required>
          <option value="cc">Cédula de Ciudadanía</option>
          <option value="ti">Tarjeta de Identidad</option>
          <option value="ce">Cédula de Extranjería</option>
        </select>
      </div>

      <div class="form-group">
        <label for="documento">Número de Documento</label>
        <input
          type="number"
          id="documento"
          v-model="form.documento"
          placeholder="Ingrese su número de documento"
          required
        />
      </div>

      <div class="form-group">
        <label for="apellido1">Primer Apellido</label>
        <input
          type="text"
          id="apellido1"
          v-model="form.apellido1"
          placeholder="Ingrese su primer apellido"
          required
        />
      </div>

      <div class="form-group">
        <label for="apellido2">Segundo Apellido</label>
        <input
          type="text"
          id="apellido2"
          v-model="form.apellido2"
          placeholder="Ingrese su segundo apellido"
        />
      </div>

      <div class="form-group">
        <label for="nombre">Nombres</label>
        <input
          type="text"
          id="nombre"
          v-model="form.nombre"
          placeholder="Ingrese sus nombres"
          required
        />
      </div>

      <div class="form-group">
        <label>Género</label>
        <div class="radio-group">
          <label><input type="radio" value="femenino" v-model="form.genero" /> Femenino</label>
          <label><input type="radio" value="masculino" v-model="form.genero" /> Masculino</label>
          <label><input type="radio" value="otro" v-model="form.genero" /> Otro</label>
        </div>
      </div>

      <div class="form-group">
        <label for="fechaNacimiento">Fecha de Nacimiento</label>
        <input type="date" id="fechaNacimiento" v-model="form.fechaNacimiento" required />
      </div>

      <div class="form-group">
        <label for="correo">Correo Electrónico</label>
        <input
          type="email"
          id="correo"
          v-model="form.correo"
          placeholder="Ingrese su correo"
          required
        />
      </div>

      <div class="form-group">
        <label for="telefono">Teléfono</label>
        <input
          type="tel"
          id="telefono"
          v-model="form.telefono"
          placeholder="Ingrese su número de teléfono"
          required
        />
      </div>

      <div class="form-group">
        <label for="usuario">Usuario</label>
        <input
          type="text"
          id="usuario"
          v-model="form.usuario"
          placeholder="Ingrese su usuario"
          required
        />
      </div>

      <div class="form-group">
        <label for="contraseña">Contraseña</label>
        <input
          type="password"
          id="contraseña"
          v-model="form.contraseña"
          placeholder="Ingrese su contraseña"
          required
        />
      </div>

      <div class="form-group">
        <label for="confirmarContraseña">Confirmar Contraseña</label>
        <input
          type="password"
          id="confirmarContraseña"
          v-model="form.confirmarContraseña"
          placeholder="Confirme su contraseña"
          required
        />
      </div>

      <div class="form-group terms">
        <input type="checkbox" id="terminos" v-model="form.aceptaTerminos" required />
        <label for="terminos">Acepto los términos y condiciones</label>
      </div>

      <button type="submit">Registrarse</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        tipoDocumento: 'cc',
        documento: '',
        apellido1: '',
        apellido2: '',
        nombre: '',
        genero: '',
        fechaNacimiento: '',
        correo: '',
        telefono: '',
        usuario: '',
        contraseña: '',
        confirmarContraseña: '',
        aceptaTerminos: false,
      },
    }
  },
  methods: {
    async registrarse() {
      if (this.form.contraseña !== this.form.confirmarContraseña) {
        alert('Las contraseñas no coinciden.')
        return
      }
      if (!this.form.aceptaTerminos) {
        alert('Debe aceptar los términos y condiciones.')
        return
      }

      try {
        const response = await axios.post('http://localhost:8000/api/usuarios/', {
          tipo_documento: this.form.tipoDocumento,
          documento: this.form.documento,
          primer_apellido: this.form.apellido1,
          segundo_apellido: this.form.apellido2,
          nombres: this.form.nombre,
          genero: this.form.genero,
          fecha_nacimiento: this.form.fechaNacimiento,
          correo: this.form.correo,
          telefono: this.form.telefono,
          username: this.form.usuario,
          password: this.form.contraseña,
        })

        alert('Registro exitoso')
        this.$router.push('/ingresar') // Solo si uso Vue Router
      } catch (error) {
        if (error.response && error.response.data.correo) {
          alert('El correo electrónico ya está registrado.')
        } else {
          alert('Ocurrió un error al registrar. Verifica los datos.')
        }
        console.error(error)
      }
    },
  },
}
</script>

<style scoped></style>
