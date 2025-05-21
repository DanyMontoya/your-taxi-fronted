<!-- <template>
  <body class="bg-white d-flex justify-content-center align-items-center vh-100">
    <div class="bg-white p-1 text-secondary shadow" style="width: 25rem">
      <h6 class="rounded-top-3 bg-black text-white p-1">Your Taxi</h6>
      <div class="bg-warning py-4 mb-5 text-center fs-4 fw-bold text-black">Login to your app</div>
      <div class="px-3">
        <div class="input-group">
          <div class="input-group-text bg-danger">
            <img
              src="@/assets/person_24dp_EFEFEF_FILL0_wght400_GRAD0_opsz24.png"
              alt="username-icon"
              style="height: 1rem"
            />
          </div>
          <input class="form-control bg-light" type="text" placeholder="Email" v-model="username" />
        </div>
        <div class="input-group mt-1">
          <div class="input-group-text bg-danger">
            <img src="@/assets/password-icon.svg" alt="password-icon" style="height: 1rem" />
          </div>
          <input
            class="form-control bg-light"
            type="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <div class="d-flex justify-content-around mt-1">
          <div class="d-flex align-items-center gap-1">
            <input class="form-check-input" type="checkbox" />
            <div class="pt-1 text-black" style="font-size: 0.9rem">Remember me</div>
          </div>
          <div class="pt-1">
            <a
              href="#"
              class="text-decoration-none text-blue fw-semibold fst-italic"
              style="font-size: 0.9rem"
              >Forgot your password?</a
            >
          </div>
        </div>

        <button @click="login" class="btn btn-warning text-black w-100 mt-3 fw-semibold shadow-sm">
          login
        </button>

        <div class="d-flex gap-1 justify-content-center mt-2">
          <div class="text-black">Don't have an account?</div>
          <RouterLink
            @click="selectedLinck('registrarse')"
            to="/registrarse"
            :class="[
              'text-decoration-none text-blue fw-semibold',
              { active: active === 'registrarse' },
            ]"
          >
            Registrarse
          </RouterLink>
        </div>

        <div class="p-3">
          <div class="border-bottom border-secondary text-center" style="height: 0.9rem">
            <span class="bg-white px-3 text-black">or</span>
          </div>
        </div>

        <div class="btn d-flex gap-3 justify-content-center border mt-3 shadow-sm bg-dark">
          <img src="@/assets/Facebook_icon.svg" alt="facebook-icon" style="height: 1.6rem" />
          <div class="fw-semibold text-white shadow-sm" style="font-size: 0.8rem">
            LOGIN WITH FACEBOOK
          </div>
        </div>

        <div class="btn d-flex gap-3 justify-content-center border shadow-sm bg-dark mt-2">
          <img src="@/assets/Logo_of_Twitter.svg" alt="twitter-icon" style="height: 1.6rem" />
          <div class="fw-semibold text-white shadow-sm" style="font-size: 0.8rem">
            LOGIN WITH TWITTER
          </div>
        </div>

        <div class="btn d-flex gap-3 justify-content-center border mt-2 shadow-sm bg-dark">
          <img src="@/assets/GOOGLE_1.png" alt="google-icon" style="height: 1.6rem" />
          <div class="fw-semibold text-white shadow-sm" style="font-size: 0.8rem">
            LOGIN WITH GOOGLE
          </div>
        </div>

        <div class="mt-3 text-danger text-center" v-if="error">{{ error }}</div>
      </div>

      <div class="p-4 mt-4 rounded-button-3 bg-black">
        <a href="index.html">Ir a página principal</a>
      </div>
    </div>
  </body>
</template>

<script>
import { RouterLink, useRouter } from 'vue-router'

export default {
  components: { RouterLink },
  data() {
    return {
      email: '',
      password: '',
      error: '',
      active: '',
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  methods: {
    selectedLinck(link) {
      this.active = link
    },
    async login() {
      this.error = ''
      try {
        const response = await fetch('http://localhost:8000/api/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        })

        const data = await response.json() // 👈 Aquí obtenemos el cuerpo de la respuesta

        if (!response.ok) {
          console.log(data) // 👈 Aquí ves el mensaje exacto del backend
          this.error = data.non_field_errors ? data.non_field_errors[0] : 'Credenciales incorrectas'
          return
        }

        localStorage.setItem('token', data.token)
        this.$router.push('/perfil') // Redirige al perfil o vista protegida
      } catch (err) {
        this.error = 'Error de conexión con el servidor'
        console.error(err)
      }
    },
  },
}
</script>

<style scoped></style> -->

<template>
  <body class="bg-white d-flex justify-content-center align-items-center vh-100">
    <div class="bg-white p-1 text-secondary shadow" style="width: 25rem">
      <h6 class="rounded-top-3 bg-black text-white p-1">Your Taxi</h6>
      <div class="bg-warning py-4 mb-5 text-center fs-4 fw-bold text-black">Login to your app</div>
      <div class="px-3">
        <div class="input-group">
          <div class="input-group-text bg-danger">
            <img
              src="@/assets/person_24dp_EFEFEF_FILL0_wght400_GRAD0_opsz24.png"
              alt="username-icon"
              style="height: 1rem"
            />
          </div>
          <input class="form-control bg-light" type="text" placeholder="Email" v-model="email" />
        </div>
        <div class="input-group mt-1">
          <div class="input-group-text bg-danger">
            <img src="@/assets/password-icon.svg" alt="password-icon" style="height: 1rem" />
          </div>
          <input
            class="form-control bg-light"
            type="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <div class="d-flex justify-content-around mt-1">
          <div class="d-flex align-items-center gap-1">
            <input class="form-check-input" type="checkbox" />
            <div class="pt-1 text-black" style="font-size: 0.9rem">Remember me</div>
          </div>
          <div class="pt-1">
            <a
              href="#"
              class="text-decoration-none text-blue fw-semibold fst-italic"
              style="font-size: 0.9rem"
              >Forgot your password?</a
            >
          </div>
        </div>

        <button @click="login" class="btn btn-warning text-black w-100 mt-3 fw-semibold shadow-sm">
          login
        </button>

        <div class="d-flex gap-1 justify-content-center mt-2">
          <div class="text-black">Don't have an account?</div>
          <RouterLink
            @click="selectedLink('registrarse')"
            to="/registrarse"
            :class="[
              'text-decoration-none text-blue fw-semibold',
              { active: active === 'registrarse' },
            ]"
          >
            Registrarse
          </RouterLink>
        </div>

        <div class="p-3">
          <div class="border-bottom border-secondary text-center" style="height: 0.9rem">
            <span class="bg-white px-3 text-black">or</span>
          </div>
        </div>

        <div class="btn d-flex gap-3 justify-content-center border mt-3 shadow-sm bg-dark">
          <img src="@/assets/Facebook_icon.svg" alt="facebook-icon" style="height: 1.6rem" />
          <div class="fw-semibold text-white shadow-sm" style="font-size: 0.8rem">
            LOGIN WITH FACEBOOK
          </div>
        </div>

        <div class="btn d-flex gap-3 justify-content-center border shadow-sm bg-dark mt-2">
          <img src="@/assets/Logo_of_Twitter.svg" alt="twitter-icon" style="height: 1.6rem" />
          <div class="fw-semibold text-white shadow-sm" style="font-size: 0.8rem">
            LOGIN WITH TWITTER
          </div>
        </div>

        <div class="btn d-flex gap-3 justify-content-center border mt-2 shadow-sm bg-dark">
          <img src="@/assets/GOOGLE_1.png" alt="google-icon" style="height: 1.6rem" />
          <div class="fw-semibold text-white shadow-sm" style="font-size: 0.8rem">
            LOGIN WITH GOOGLE
          </div>
        </div>

        <div class="mt-3 text-danger text-center" v-if="error">{{ error }}</div>
      </div>

      <div class="p-4 mt-4 rounded-button-3 bg-black">
        <a href="/">Ir a página principal</a>
      </div>
    </div>
  </body>
</template>

<script>
import axios from 'axios'
import { RouterLink, useRouter } from 'vue-router'

export default {
  components: { RouterLink },
  data() {
    return {
      email: '',
      password: '',
      error: '',
      active: '',
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  methods: {
    selectedLink(link) {
      this.active = link
    },
    async login() {
      this.error = ''
      try {
        const response = await axios.post('http://localhost:8000/api/login/', {
          email: this.email,
          password: this.password,
        })

        localStorage.setItem('token', response.data.token)
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario)) //agregue esto para pruevas de vista de sobre mi cuenta ////////////////
        this.$router.push('/perfil_usuario') // Ruta corregida
      } catch (error) {
        if (error.response && error.response.data) {
          this.error = error.response.data.non_field_errors
            ? error.response.data.non_field_errors[0]
            : 'Credenciales incorrectas'
        } else {
          this.error = 'Error de conexión con el servidor'
        }
        console.error(error)
      }
    },
  },
}
</script>

<style scoped></style>
