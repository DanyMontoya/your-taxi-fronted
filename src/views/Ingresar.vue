<template>

    <body class="bg-white d-flex justify-content-center align-items-center vh-100">
        <div class="bg-white p-1 text-secondary shadow" style="width:25rem">
            <h6 class="rounded-top-3 bg-black text-white p-1">Your Taxi</h6>
            <div class="bg-warning py-4 mb-5 text-center fs-4 fw-bold text-black">Login to your app</div>
            <div class="px-3">
                <div class="input-group">
                    <div class="input-group-text bg-danger">
                        <img src="@/assets/person_24dp_EFEFEF_FILL0_wght400_GRAD0_opsz24.png" alt="username-icon"
                            style="height: 1rem" />
                    </div>
                    <input class="form-control bg-light" type="text" placeholder="Username or Email" />
                </div>
                <div class="input-group mt-1">
                    <div class="input-group-text bg-danger">
                        <img src="@/assets/password-icon.svg" alt="username-icon" style="height: 1rem" />
                    </div>
                    <input class="form-control bg-light" type="password" placeholder="password" />
                </div>
                <div class="d-flex justify-content-around mt-1">
                    <div class="d-flex align-items-center gap-1">
                        <input class="form-check-input" type="checkbox">
                        <div class="pt-1 text-black" style="font-size: 0.9rem">Remember me</div>
                    </div>
                    <div class="pt-1">
                        <a href="#" class="text-decoration-none text-blue fw-semibold fst-italic"
                            style="font-size:0.9rem">Forgot your password?</a>
                    </div>
                </div>
                <a href="perfil.html" class="btn btn-warning text-black w-100 mt-3 fw-semibold shadow-sm">
                    Login
                </a>
                <div class="d-flex gap-1 justify-content-center mt-2">
                    <div class="text-black">Don't have an account?</div>
                    <a href="#" class="text-decoration-none text-blue fw-semibold">Register</a>
                </div>
                <div class="p-3">
                    <div class="border-bottom border-secondary text-center" style="height: 0.9rem">
                        <span class="bg-white px-3 text-black">or</span>
                    </div>
                </div>
                <div class="btn d-flex gap-3 justify-content-center border mt-3 shadow-sm bg-dark">
                    <img src="@/assets/Facebook_icon.svg" alt="fasfebook-icon" style="height: 1.6rem" />
                    <div class="fw-semibold text-white shadow-sm" style="font-size: 0.8rem">LOGIND WITH FASEBOOK</div>
                </div>

                <div class="btn d-flex gap-3 justify-content-center border shadow-sm bg-dark mt-2">
                    <img src="@/assets/Logo_of_Twitter.svg" alt="twitter-icon" style="height: 1.6rem" />
                    <div class="fw-semibold text-white shadow-sm" style="font-size: 0.8rem">LOGIN WITH TWITTER</div>
                </div>
                <div class="btn d-flex gap-3 justify-content-center border mt-2 shadow-sm bg-dark">
                    <img src="@/assets/GOOGLE_1.png" alt="google-icon" style="height: 1.6rem" />
                    <div class="fw-semibold text-white shadow-sm" style="font-size:0.8rem">LOGIN WITH GOOGLE</div>
                </div>
            </div>
            <div class="p-4 mt-4 rounded-button-3 bg-black">
                <a href="index.html">Ir a pagina principal</a>
            </div>
        </div>
        <!-- </div> -->
    </body>
</template>

<script>

</script>

<style scoped></style>