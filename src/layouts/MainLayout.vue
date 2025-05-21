<template>
  <!-- va codigo html -->
  <div>
    <header id="portada">
      <p>Your Taxi</p>
      <nav>
        <ul class="menu">
          <li>
            <RouterLink
              @click="selectedLink('registrarse')"
              to="/registrarse"
              :class="['nav-link', { active: active === 'registrarse' }]"
              >Registrarse</RouterLink
            >
          </li>
          <li>
            <RouterLink
              @click="selectedLink('tutorial')"
              to="/tutorial"
              :class="['nav-link', { active: active === 'tutorial' }]"
              >Tutorial</RouterLink
            >
          </li>
          <li>
            <RouterLink
              @click="selectedLink('ingresar')"
              to="/ingresar"
              :class="['nav-link', { active: active === 'ingresar' }]"
            >
              Ingresar</RouterLink
            >
          </li>
          <li>
            <RouterLink
              @click="selectedLink('sobre_nosotros')"
              to="/sobre_nosotros"
              :class="['nav-link', { active: active === 'sobre_nosotros' }]"
              >Taxistas</RouterLink
            >
          </li>
          <li>
            <RouterLink
              @click="selectedLink('reservar')"
              to="/reservar"
              :class="['nav-link', { active: active === 'reservar' }]"
              >Reservar</RouterLink
            >
          </li>
          <li>
            <RouterLink
              @click="selectedLink('solicitar_servicio')"
              to="/solicitar_servicio"
              :class="['nav-link', { active: active === 'solicitar_servicio' }]"
              >Solicitar servicio</RouterLink
            >
          </li>
          <li>
            <RouterLink
              @click="selectedLink('administrador')"
              to="/administrador"
              :class="['nav-link', { active: active === 'administrador' }]"
              >Administrador</RouterLink
            >
          </li>

          <!-- <li><a href="#">Ingresar</a></li> -->
        </ul>
        <button class="menu-toggle">☰</button>
      </nav>
    </header>
    <!-- si no  da la prueva eliminar :usurio="usuario" /////////////////////////////////////////////////////// -->
    <main>
      <RouterView :usuario="usuario" />
    </main>

    <footer class="principal">
      <section>
        <a href="#portada">Ir al comienzo</a><br />
        <a href="mailto:danyalexis3405@gmail.com">Contáctame aquí</a>
      </section>
      <p>Institución: Servicio Nacional de Aprendizaje - SENA</p>
      <p>Programa: ANÁLISIS Y DESARROLLO DE SOFTWARE. (2834810)</p>
      <p>Aprendiz: Dany Alexis Montoya Torres</p>
      <p>Profesor: FIREMAN ALBERTO PINEDA OROZCO</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: {
        nombres: 'Dany',
        primer_apellido: 'Montoya',
        segundo_apellido: 'Torres',
        documento: '12345678',
        email: 'dany@example.com',
        username: 'dany_user',
        telefono: '3010000000',
      },
    }
  },
}
</script>

<style scoped></style>
