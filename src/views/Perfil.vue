<template>
  <body class="rounded-5 d-flex bg-white justify-content-center align-items-center vh-100">
    <div class="bg-white rounded-button-2 text-secondary shadow" style="width: 25rem">
      <div class="container-fluid text-white bg-dark rounded-top-3" style="font-size: 0.9rem">
        Your Taxi
      </div>
      <div class="bg-warning p-2">
        <a class="btn btn-warning" href="menu_perfil.html">☰</a>
      </div>
      <div class="bg-white text-center">
        <div class="bg-warning" style="height: 4rem"></div>
        <div class="bg-warning" style="height: 4rem">
          <img
            class="mt-3 bg-black rounded-circle p-1"
            src="img/person_24dp_EFEFEF_FILL0_wght400_GRAD0_opsz24.png"
            alt="username-icon"
            style="height: 5rem"
          />
        </div>

        <div class="mt-5 fw-bold fs-4 text-black" style="">Dany Montoya</div>
        <div class="form-check">
          <input
            class="form-check-auto"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label class="form-check-label" for="flexRadioDefault1"> conductor </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-auto"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked
          />
          <label class="form-check-label" for="flexRadioDefault2"> Pasajero </label>
          <div>Coopebombas, Medellin</div>
        </div>
        <div class="justify-content-center d-flex gap-3">
          <div class="fw-bold text-black">999</div>
          <div>Viajes</div>
        </div>
        <div class="px-3 pb-3">
          <div class="p-2 m-x-3 bg-secondary text-white fw-bold fs-4 mt-3">Conductor</div>
          <div class="p-5 bg-warning text-black fs-4 fw-bold">Taxi Hyndai I 10 Gl</div>
        </div>
      </div>
      <div class="text-center container-fluid p-3 bg-dark rounded-button-3" style="font-size: 1rem">
        <a href="login1.html" class="btn btn-warning w-10 text-white text-center"> Regresar </a>
        <a href="ofertas.html" class="btn btn-warning w-10 text-white text-center"> Conducir </a>
      </div>
    </div>
  </body>
</template>

<script></script>

<style scoped></style>
