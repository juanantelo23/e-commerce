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
        function SaveProfile() {
            const firstName = document.getElementById("name").value;
            const segundoNombre = document.getElementById("secondName").value;
            const apellido = document.getElementById("surName").value;
            const segundoApellido = document.getElementById("secondSurname").value;
            const email = document.getElementById("emailInp").value;
            const number = document.getElementById("number").value;
            if (Validar(firstName, segundoNombre, apellido, segundoApellido, email, number)) {
                let perfil = {
                    nombre: firstName,
                    segundoNombre: segundoNombre,
                    apelldo: apellido,
                    segApellido: segundoApellido,
                    email: email,
                    celu: number
                };
                localStorage.setItem("perfil", JSON.stringify(perfil));
                alert('Datos guardados correctamente');
            }
            else {
                alert('Faltan datos');
            }
            console.log(perfil.email)
        };










});
