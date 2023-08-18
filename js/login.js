document.getElementById("formulario").addEventListener("submit", function(event){
    event.preventDefault(); // Evitar que la pagina se recargue
    var usuario = document.getElementById("email_field").value; // Valor campo usuario
    var contrasena = document.getElementById("password_field").value;// Valor campo contrasena

    if (usuario && contrasena) {
        sessionStorage.setItem("isLoggedIn", "true");// Gardar clave en el almacenamiento local del navegador
        window.location.href = "index.html";
    }  
})