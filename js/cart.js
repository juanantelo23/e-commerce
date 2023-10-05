    //constante con el link de cart info, pasandole el usario y formato json
    const CART_INFO_URL_JSON = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';
    document.addEventListener('DOMContentLoaded', function() {
        fetch(CART_INFO_URL_JSON)
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
                            <div class="sub-title">Nombre:</div>
                            <div>${item.name}</div>
                        </div>
                        <div class="col-md-2">
                            <div class="sub-title">Costo:</div>
                            <div>${item.unitCost} ${item.currency}</div>
                        </div>
                        <div class="col-md-2">
                            <div class="sub-title">Cantidad:</div>
                            <div><input type="number" class="form-control" value="${item.count}" disabled></div>
                        </div>
                        <div class="col-md-2">
                    <div class="sub-title">Sub total:</div>
                    <div class="font-weight-bold">${item.unitCost * item.count} ${item.currency}</div>
                        </div>
                    </div>
                    <hr class="divider">
                `;
                    // Insertar el HTML en el contenedor del carrito
                    cartContainer.innerHTML += productHTML;
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
    