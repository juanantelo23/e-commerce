   //constante con el link de cart info, pasandole el usario y formato json
const CART_INFO_URL_JSON = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';
document.addEventListener('DOMContentLoaded', function() {
    /*fetch(CART_INFO_URL_JSON)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
               const cartContainer = document.getElementById('cartContainer'); //Aca ponemos la magia
                cartContainer.innerHTML = '';
               const articles = data.articles; //el objeto que contiene la info se llama "articles"
               articles.forEach(item => { // recorremos los items y los vamos pegando
                    const productHTML = `
                    <div class="row product-row">
                        <div class="col-md-2">
                            <img src="${item.image}" alt="${item.name}" style="width: 100px;">
                        </div>
                        <div class="col-md-2">
                            <div class="sub-title fw-bold">Nombre:</div>
                            <div>${item.name}</div>
                        </div>
                        <div class="col-md-2">
                            <div class="sub-title fw-bold">Costo:</div>
                            <div>${item.unitCost} ${item.currency}</div>
                        </div>
                        <div class="col-md-2">
                            <div class="sub-title fw-bold ">Cantidad:</div>
                            <div class="col-6"><input type="number" class="form-control" value="1" id="cantidad-${item.id}" min="1" max="99">
                            </div>
                        </div>
                        <div class="col-md-2 fw-bold">
                    <div class="sub-title">Sub total:</div>
                    <div class="font-weight-bold" id="subtotal-${item.id}"> ${item.currency} ${item.unitCost} </div>
                        </div>
                    </div>
                    <hr class="divider">
            `;
                   // Insertar el HTML en el contenedor del carrito
                cartContainer.innerHTML += productHTML;

              // Agrega el evento input para cada input
                const cantidadInput = document.getElementById(`cantidad-${item.id}`);
                const subtotalDiv = document.getElementById(`subtotal-${item.id}`);
                cantidadInput.addEventListener("input", function() {
                const cantidad = cantidadInput.value
                const precio = item.unitCost;
                  const subtotal = cantidad * precio; //Constante que almacena la suma del total
                subtotalDiv.textContent = `${item.currency} ${subtotal} `;
            });
    });
    })
    .catch(error => {
    console.error('Error:', error);
    });
      */
     //USAMOS EL JSON DE PRODUCTS-INFO MOMENTÁNEAMENTE  HASTA OBTENER EL ORIGINAL DE CART
     //DEJAR EL CÓDIGO COMENTADO DE ARRIBA NO ELIMMINAR LO USAREMOS UNA VEZ QUE TENGAMOS EL URL REAL
    const compras = localStorage.getItem("listaCompra");
    const listaCompra = JSON.parse(compras);
    const cartContainer = document.getElementById('cartContainer'); //Aca ponemos la magia
    cartContainer.innerHTML = '';
    for(let i=0; i<listaCompra.length; i++){
        let item = listaCompra[i];
        const htmlContentToAppend = `
        <div class="row product-row">
                        <div class="col-md-2">
                            <img src="${item.images[1]}" alt="${item.name}" style="width: 100px;">
                        </div>
                        <div class="col-md-2">
                            <div class="sub-title fw-bold">Nombre:</div>
                            <div>${item.name}</div>
                        </div>
                        <div class="col-md-2">
                            <div class="sub-title fw-bold">Costo:</div>
                            <div>${item.cost} ${item.currency}</div>
                        </div>
                        <div class="col-md-2">
                            <div class="sub-title fw-bold ">Cantidad:</div>
                            <div class="col-6"><input type="number" class="form-control" value="1" id="cantidad-${item.id}" min="1" max="99">
                            </div>
                        </div>
                        <div class="col-md-2 fw-bold">
                    <div class="sub-title">Sub total:</div>
                    <div class="font-weight-bold" id="subtotal-${item.id}"> ${item.currency} ${item.cost} </div>
                        </div>
                    </div>
                    <hr class="divider">
        `;
cartContainer.innerHTML += htmlContentToAppend;
        // Agrega el evento input para cada input
        const cantidadInput = document.getElementById(`cantidad-${item.id}`);
        const subtotalDiv = document.getElementById(`subtotal-${item.id}`);
        cantidadInput.addEventListener("input", function() {
            const cantidad = cantidadInput.value
            const precio = item.cost;
            const subtotal = cantidad * precio; //Constante que almacena la suma del total
            subtotalDiv.textContent = `${item.currency} ${subtotal} `;
        });
}});   

