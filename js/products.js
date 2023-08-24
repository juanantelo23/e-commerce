document.addEventListener("DOMContentLoaded", function() {
    const catID = localStorage.getItem("catID");
    
    // Crear la URL de la API utilizando el catID obtenido
    const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

    // Realizar la solicitud utilizando la URL generada
    getJSONData2(url).then(function(resultObj) {
        if (resultObj.status === "ok") {
            const categoriesArray = resultObj.data.products;
            showCategoriesList(categoriesArray);
        }
    });
});
async function getJSONData2(url) {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            return { status: 'ok', data: response };
        })
        .catch(function(error) {
            return { status: 'error', data: error };
        });
}
function showCategoriesList(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                            <h4>${product.name}-${product.currency} ${product.cost} </h4>
                            <p>${product.description}</p>
                        </div>
                        <small class="text-muted"> ${product.soldCount} vendidos </small>
                    </div>
                    <small class="text-muted"> </small>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}
