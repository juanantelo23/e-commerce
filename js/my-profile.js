document.addEventListener("DOMContentLoaded", function () {
    const usuarioGuardado = localStorage.getItem("user_name");
    //funcion que mantiene el usuario seleccionado en el mail 
    const inputUsuarioGuardado = document.getElementById("validationDefaultUsername");
    if (usuarioGuardado) {
        inputUsuarioGuardado.value = usuarioGuardado;
    }

    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', `alert-${type}`);
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv); // Agrega el cartel de alerta al cuerpo del documento
        // Ocultar la alerta después de 3 segundos (3000 milisegundos)
        setTimeout(function () {
            alertDiv.style.display = 'none';
        }, 2000); // 2000 milisegundos = 2 segundos
    }

    // Validación para completar el formulario
    const forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    showAlert('Datos actualizados', 'success');
                    event.preventDefault();
                }
                form.classList.add('was-validated');
            }, false);
        });
    //Funcion que no paso Juan para guardar el perfil actualizado, pero no funciona. Quedo para arreglar.

    const guardarCambios = document.getElementById('signupForm');
    guardarCambios.addEventListener('click', SaveProfile());
});
var perfil = {
    nombre: "",
    segundoNombre: "",
    apellido: "",
    segApellido: "",
    email: "",
    celu: ""
};

function SaveProfile() {
    let firstName = document.getElementsByClassName("name");
    let segundoNombre = document.getElementsByClassName("secondName");
    let apellido = document.getElementsByClassName("surName");
    let segundoApellido = document.getElementsByClassName("secondSurname");
    let email = document.getElementsByClassName("emailInp");
    let number = document.getElementsByClassName("number");
    
    

    for (let i = 0; i < firstName.length; i++) {
        if (firstName[i].value || segundoNombre[i].value || apellido[i].value || segundoApellido[i].value || email[i].value || number[i].value) {
            perfil.nombre = firstName[i].value;
            perfil.segundoNombre = segundoNombre[i].value;
            perfil.apellido = apellido[i].value;
            perfil.segApellido = segundoApellido[i].value;
            perfil.email = email[i].value;
            perfil.celu = number[i].value;
            alert('Datos guardados correctamente');
        } else {
            alert('Faltan datos');
        }
    }
    localStorage.setItem("perfil", JSON.stringify(perfil));

};
console.log(perfil)
