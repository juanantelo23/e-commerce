document.addEventListener("DOMContentLoaded", function () {
    const usuarioGuardado = localStorage.getItem("user_name");
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
    };

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

        const signupForm = document.getElementById("signupForm");
        signupForm.addEventListener('submit', (e) => {
            console.log('Evento submit disparado');
            e.preventDefault();
            const name = document.querySelector('.firstName').value;
            const secondName = document.querySelector('.secondName').value;
            const lastName = document.querySelector('.lastName').value;
            const secondLastName = document.querySelector('.secondLastName').value;
            const telefono = document.querySelector('.telefono').value;
            const fotoDePerfil = document.querySelector('.fotoDePerfil').value;
            const mail = localStorage.getItem('user_name');
            const users = JSON.parse(localStorage.getItem('users')) || [];
        
            const isUserRegistered = users.find(user => user.mail === mail);
            if (isUserRegistered) {
            return alert('El usuario ya está registrado!');
            }
            users.push({
                name: name,
                mail: mail,
                secondName: secondName,
                lastName: lastName,
                secondLastName: secondLastName,
                telefono: telefono,
                fotoDePerfil: fotoDePerfil
            });
        
            localStorage.setItem("users", JSON.stringify(users));
            alert('Registro Exitoso!');
            window.location.href = 'my-profile.html';
        });
    });