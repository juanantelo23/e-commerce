
//Espera que termine de cargar el DOM para ejecutar la función
document.addEventListener("DOMContentLoaded", function(){
//Obtiene la categoria autos a través de boton y lo guarda en localstorage
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        //Redirecciona a la pagina de productos
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

document.addEventListener("DOMContentLoaded", function () {
    //Chequear si el usuario esta logeado
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    //Si el usario no esta logeado, redireccionar a la pagina de login
    if (!isLoggedIn) {
        setTimeout(function(){
            window.location.href = "login.html";
    }, 1500);
    }
});
