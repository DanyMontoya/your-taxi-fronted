<template>
  <div class="perfil_usuario">
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
    <div>
      <button class="a4"><span class="a5">⏻ </span>CERRAR SESIÓN</button>
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
            @click="selectedLink = ''"
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
export default {
  props: ['usuario'],
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
  /* padding: 20 px; */
  margin: auto;
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
