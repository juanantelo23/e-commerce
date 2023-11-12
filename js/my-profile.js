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
}

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
const segundoNombre = document.getElementById("validationDefault04");
const apellido = document.getElementById("validationDefault02");
const segundoApellido = document.getElementById("validationDefault03");
const email = document.getElementById("validationDefaultUsername");
const numeroTelefono = document.getElementById("validationDefault05");

const noObligatorio = document.querySelectorAll(".noObligatorio");

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

// Función para guardar cambios en el perfil
function saveProfile() {
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





document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event fired");
    const usuarioGuardado = localStorage.getItem("user_name");

    // Función que mantiene el usuario seleccionado en el correo electrónico
    const inputUsuarioGuardado = document.getElementById("validationDefaultUsername");
    if (usuarioGuardado) {
        inputUsuarioGuardado.value = usuarioGuardado;
    }

    
    // Asignar evento al botón de guardar cambios
    const guardarCambios = document.getElementById('signupForm');
   
    // Función para cargar datos del perfil al cargar la página
    cargarDatosPerfil();

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
    }
    
    guardarCambios.addEventListener('click', function (event) {
        // Evitar que el formulario se envíe y recargue la página
        event.preventDefault();
        
        const formularioPerfil = document.querySelector('.needs-validation');
        
        
        //iterar sobre cada elemento del formulario, si está vacío agrega la clase Invalido
        formularioPerfil.querySelectorAll('.form-control').forEach(input => {
            if (input.value === "") {
                input.classList.add("is-invalid");
                
            } else {
                input.classList.remove("is-invalid"); 
                input.classList.add("is-valid");
            }
          
        });

        //discriminar aquellos campos que no son obligatorios pero que fueron asignados a la clase 
        noObligatorio.forEach(input => {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        });
    
        // Primero, guardar la foto de perfil
        guardarFotoPerfil();
    
        // Luego, guardar los datos del perfil en el Local Storage
        saveProfile();
    
        // Validar el formulario después de realizar los cambios
        validarFormulario();
    });
    
    // Cargar la foto de perfil al cargar la página
    const fotoPerfilGuardada = localStorage.getItem("fotoPerfil");
    if (fotoPerfilGuardada) {
        fotoDePerfil.src = fotoPerfilGuardada;
    } else {
        // Si no hay foto de perfil guardada, mostrar la imagen de base
        fotoDePerfil.src = "../img/img_perfil.png";
    }

    // Función para cerrar sesión (borrar datos del Local Storage)
    function borrarSesion() {
        localStorage.removeItem("perfil");
        localStorage.removeItem("fotoPerfil");
        cargarDatosPerfil(); // Cargar los datos iniciales después de borrar la sesión
        showAlert('Sesión cerrada, datos eliminados', 'info');
    }

    // Llamar a la función borrarSesion cuando el usuario haga clic en el botón de cerrar sesión
    const botonBorrarSesion = document.getElementById('cerrarSesionId');
    botonBorrarSesion.addEventListener('click', borrarSesion);

    // Cargar datos del perfil al cargar la página
cargarDatosPerfil();

});
