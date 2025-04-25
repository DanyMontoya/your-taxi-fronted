<template>
  <body class="bg-white d-flex justify-content-center align-items-center vh-100">
    <div class="bg-white rounded-button-2 text-secondary shadow" style="width: 25rem">
      <div class="rounded-top-3 bg-black p-1 text-white">
        <dive class="bg-black text-white" style="font-size: 0.9rem">Your Taxi</dive>
      </div>
      <div class="container text-center">
        <div class="row">
          <div class="col-12 col-md-6 bg-white p-5">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label class="form-check-label" for="flexRadioDefault1"> Disponible </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
              <label class="form-check-label" for="flexRadioDefault2"> No disponi </label>
            </div>
          </div>
          <div class="col-12 col-md-6 bg-white">
            <img
              class="contenblet-center mt-1 bg-black rounded-circle p-1"
              src="img/person_24dp_EFEFEF_FILL0_wght400_GRAD0_opsz24.png"
              alt="username-icon"
              style="height: 4rem"
            />
            <div class="mt-1 fw-bold fs-5 text-black">Dany Montoya</div>
          </div>
        </div>
        <hr />
        <div>
          <p class="text-center fw-bold text-">OFERTAS DE SERVICIOS</p>
          <div></div>
        </div>

        <section>
          <div class="container-fluid bg-white">
            <div class="row">
              <div class="col-6">
                <a href="recoger.html" class="text-decoration-none">Clle 35 # 45-79</a>
              </div>
              <div class="col-6"><a href="#" class="text-decoration-none">296 metros</a></div>
              <div class="col-6"><a href="#" class="text-decoration-none">Calle35 35 # 94</a></div>
              <div class="col-6"><a href="#" class="text-decoration-none">300 metros</a></div>
              <a href="file:///C:/Users/danym/demo/recoger.html" class="col-6 text-decoration-none"
                >Celle 35 # 62-35</a
              >
              <div class="col-6"><a href="#" class="text-decoration-none">5,8 kilometros</a></div>
            </div>
          </div>
        </section>
        <hr />
        <div class="bg-light p-2 fw-bold fs-4">Conductor</div>
        <div class="p-5 bg-warning">Taxi Hyndai I 10 Gl</div>
      </div>
      <footer class="text-center mt-2 p-2 bg-black rounded-button-2">
        <a href="/perfil.html" class="btn text-white">Regresar</a>
      </footer>
    </div>
  </body>
</template>
