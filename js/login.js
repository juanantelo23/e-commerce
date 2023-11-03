document.getElementById("formulario").addEventListener("submit", function(event){
    event.preventDefault(); // Evitar que la pagina se recargue
    var usuario = document.getElementById("email_field").value; // Valor campo usuario
    var contrasena = document.getElementById("password_field").value;// Valor campo contrasena

    if (usuario && contrasena) {
        sessionStorage.setItem("isLoggedIn", "true");// Gardar clave en el almacenamiento local del navegador
        window.location.href = "index.html";
    }  
})
//Método que guarda el nombre ingresado en el login 
document.getElementById("botonUser").addEventListener("click", function(event){
    var user = document.getElementById("email_field").value; // Valor campo usuario
    if (user) {
        localStorage.setItem("user_name", user);// Gardar clave en el almacenamiento local del navegador
    }  
});

/* Guardar usuario y contraseña en el storage */
//Funcionalidad para guardar el usuarioy contraseña ingresada en el login
const loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const Users = JSON.parse(localStorage.getItem('users')) || []
    const validUser = Users.find(user => user.email === email && user.password === password)
    if(!validUser){
        return alert('Usuario y/o contraseña incorrectos!')
    }
    alert(`Bienvenido ${validUser.name}`)
    localStorage.setItem('login_success', JSON.stringify(validUser))
    window.location.href = 'index.html'   

});