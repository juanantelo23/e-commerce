// Función general para mostrar alertas
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', `alert-${type}`);
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);

    // Ocultar la alerta después de 3 segundos (3000 milisegundos)
    setTimeout(function () {
        alertDiv.style.display = 'none';
    }, 2000); // 2000 milisegundos = 2 segundos
};

document.addEventListener("DOMContentLoaded", function () {
    const usuarioGuardado = localStorage.getItem("user_name");

    // Función que mantiene el usuario seleccionado en el correo electrónico
    const inputUsuarioGuardado = document.getElementById("validationDefaultUsername");
    if (usuarioGuardado) {
        inputUsuarioGuardado.value = usuarioGuardado;
    };

    // Validación para completar el formulario
    const formularioPerfil = document.querySelector('.needs-validation');
    formularioPerfil.addEventListener('submit', function (event) {
        event.preventDefault();
        formularioPerfil.classList.add('was-validated');

        if (!formularioPerfil.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            showAlert('Datos actualizados', 'success');
            // event.preventDefault(); // Esta línea puede no ser necesaria
        }
    }, false);

    // Función para guardar cambios en el perfil
    const guardarCambios = document.getElementById('signupForm');
    guardarCambios.addEventListener('click', SaveProfile);

    // Objeto perfil vacío para llenarlo después
    var perfil = {
        nombre: "",
        segundoNombre: "",
        apellido: "",
        segApellido: "",
        email: "",
        celu: ""
    };

    // Referencias a los elementos de input
    const primerNombre = document.getElementById("validationDefault01");
    const segundoNombre = document.getElementById("validationDefault02");
    const apellido = document.getElementById("validationDefault03");
    const segundoApellido = document.getElementById("validationDefault04");
    const email = document.getElementById("validationDefaultUsername");
    const numeroTelefono = document.getElementById("validationDefault05");

    // Función para cargar datos del perfil en los campos de input
    function cargarDatosPerfil() {
        const perfilGuardado = JSON.parse(localStorage.getItem("perfil"));
        if (perfilGuardado) {
            primerNombre.value = perfilGuardado.nombre;
            segundoNombre.value = perfilGuardado.segundoNombre;
            apellido.value = perfilGuardado.apellido;
            segundoApellido.value = perfilGuardado.segApellido;
            email.value = perfilGuardado.email;
            numeroTelefono.value = perfilGuardado.celu;
        }
    };
    // Cargar datos del perfil al cargar la página
    cargarDatosPerfil();

    function SaveProfile() {
        // Actualizar el objeto perfil con los valores de los campos de input
        perfil.nombre = primerNombre.value;
        perfil.segundoNombre = segundoNombre.value;
        perfil.apellido = apellido.value;
        perfil.segApellido = segundoApellido.value;
        perfil.email = email.value;
        perfil.celu = numeroTelefono.value;

        // Verificar si todos los campos necesarios tienen algún valor
        if (perfil.nombre && perfil.apellido && perfil.email) {
            localStorage.setItem("perfil", JSON.stringify(perfil));
            showAlert('Datos guardados correctamente', 'success');
        } else {
            showAlert('Faltan datos obligatorios', 'danger');
        }
    }

    // Funcionalidad de guardar una foto de perfil.
    const fotoDePerfil = document.getElementById('profile-img');
    const inputImgFile = document.getElementById('inputGroupFile02');

    function guardarFotoPerfil() {
        const file = inputImgFile.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const imageUrl = event.target.result;
                fotoDePerfil.src = imageUrl;
                // Guardar la URL de la imagen en el Local Storage
                localStorage.setItem("fotoPerfil", imageUrl);
                showAlert('Foto de perfil actualizada', 'success');
            };
            reader.readAsDataURL(file);
        } else {
            showAlert('Selecciona una foto', 'danger');
        }
    };

    guardarCambios.addEventListener('click', function (event) {
        // Primero, guardar la foto de perfil
        guardarFotoPerfil();

        // Luego, guardar los datos del perfil en el Local Storage
        SaveProfile();

        // Evitar que el formulario se envíe y recargue la página
        event.preventDefault();
    });

    // Cargar la foto de perfil al cargar la página
    const fotoPerfilGuardada = localStorage.getItem("fotoPerfil");
    if (fotoPerfilGuardada) {
        fotoDePerfil.src = fotoPerfilGuardada;
    } else {
        // Si no hay foto de perfil guardada, mostrar la imagen de base
        fotoDePerfil.src = "../img/img_perfil.png";
    };

    // Función para cerrar sesión (borrar datos del Local Storage)
    function borrarSesion() {
        localStorage.removeItem("perfil");
        localStorage.removeItem("fotoPerfil");
        primerNombre.value = "";
        segundoNombre.value = "";
        apellido.value = "";
        segundoApellido.value = "";
        email.value = "";
        numeroTelefono.value = "";
        fotoDePerfil.src = "../img/img_perfil.png";
        showAlert('Sesión cerrada, datos eliminados', 'info');
    };

    // Llamar a la función borrarSesion cuando el usuario haga clic en el botón de cerrar sesión
    const botonBorrarSesion = document.getElementById('cerrarSesionId');
    botonBorrarSesion.addEventListener('click', borrarSesion);
});
