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

});