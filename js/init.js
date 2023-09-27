const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
//Método para imprimir el nombre de usuario en la barra de navegación
document.addEventListener("DOMContentLoaded", function(){
  var userName = localStorage.getItem("user_name"); //toma los datos guardados en login
  var insertName = document.createElement("a"); //crea una etiqueta "a" en la barra de navegación
  insertName.classList.add('nav-link'); //Inserta la clase existente para las etiquetas "a" del top-nav


  if (userName) {
      insertName.innerHTML = `    
  <div class="dropdown">
  <a class="navLink dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ${userName}
          </a>
  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
    <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi Perfil</a></li>
    <li><a class="dropdown-item" href="login.html" id="cerrarSesion">Cerrar Sesion</a></li>
  </ul>
</div>
      `; //toma el dato de la variable userName y lo imprime en la top-nav
      document.getElementById('user').appendChild(insertName); //agrega la etiqueta creada como hijo del elemento li
  }


  document.getElementById("cerrarSesion").addEventListener("click", function(event) {
    localStorage.removeItem("user_name"); //Al dar click en "Cerrar Sesión" elimina el dato de usuario almacenado en el local storage
  })
});

