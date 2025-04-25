<template>

    <body>

        <div class="containers">
            <h2>Registro</h2>
            <form>

                <div class="form-group">
                    <label for="tipoDocumento">Tipo de Documento</label>
                    <select id="tipoDocumento">
                        <option value="cc">Cédula de Ciudadanía</option>
                        <option value="ti">Tarjeta de Identidad</option>
                        <option value="ce">Cédula de Extranjería</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="documento">Número de Documento</label>
                    <input type="number" id="documento" placeholder="Ingrese su número de documento">
                </div>

                <div class="form-group">
                    <label for="apellido1">Primer Apellido</label>
                    <input type="text" id="apellido1" placeholder="Ingrese su primer apellido">
                </div>

                <div class="form-group">
                    <label for="apellido2">Segundo Apellido</label>
                    <input type="text" id="apellido2" placeholder="Ingrese su segundo apellido">
                </div>

                <div class="form-group">
                    <label for="nombre">Nombres</label>
                    <input type="text" id="nombre" placeholder="Ingrese sus nombres">
                </div>

                <div class="form-group">
                    <label>Género</label>
                    <div class="radio-group">
                        <label><input type="radio" name="genero" value="femenino"> Femenino</label>
                        <label><input type="radio" name="genero" value="masculino"> Masculino</label>
                        <label><input type="radio" name="genero" value="otro"> Otro</label>
                    </div>
                </div>

                <div class="form-group">
                    <label for="fechaNacimiento">Fecha de Nacimiento</label>
                    <input type="date" id="fechaNacimiento">
                </div>

                <div class="form-group">
                    <label for="correo">Correo Electrónico</label>
                    <input type="email" id="correo" placeholder="Ingrese su correo">
                </div>

                <div class="form-group">
                    <label for="telefono">Teléfono</label>
                    <input type="tel" id="telefono" placeholder="Ingrese su número de teléfono">
                </div>

                <div class="form-group">
                    <label for="usuario">Usuario</label>
                    <input type="text" id="usuario" placeholder="Ingrese su usuario">
                </div>

                <div class="form-group">
                    <label for="contraseña">Contraseña</label>
                    <input type="password" id="contraseña" placeholder="Ingrese su contraseña">
                </div>

                <div class="form-group">
                    <label for="confirmarContraseña">Confirmar Contraseña</label>
                    <input type="password" id="confirmarContraseña" placeholder="Confirme su contraseña">
                </div>

                <div class="form-group terms">
                    <input type="checkbox" id="terminos">
                    <label for="terminos">Acepto los términos y condiciones</label>
                </div>

                <button type="submit"><a href="login1.html">Registrarse</a></button>

            </form>
        </div>

    </body>
</template>

<script>

</script>

<style scoped></style>