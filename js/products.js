document.addEventListener("DOMContentLoaded", function() {
    const catID = localStorage.getItem("catID");
    const categoryTitle = document.getElementById("category-name");
    
    // Crear la URL de la API utilizando el catID obtenido
    const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

    // Realizar la solicitud utilizando la URL generada
    getJSONData2(url).then(function(resultObj) {
        if (resultObj.status === "ok") {
            const categoriesArray = resultObj.data.products;
            const catName = resultObj.data.catName; 
            showCategoriesList(categoriesArray);
            updateCategoryTitle(catName, categoryTitle);
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

// Ordena de forma descendente          
let ascendente = document.getElementById("sortByCountDow");
ascendente.addEventListener("click", function () {
    const catID = localStorage.getItem("catID");
    const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let productosOrdenados = ordenarProductosAscendente(data.products);
            showCategoriesList(productosOrdenados);
            let productosHTML = "";
            for (let i = 0; i < productosOrdenados.length; i++) {
                productosHTML +=
                    `
                <div class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="${data[i].image}" alt="product image" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="mb-1">
                                    <h4>${data[i].name}-${data[i].currency} ${data[i].cost} </h4>
                                    <p>${data[i].description}</p>
                                </div>
                                <small class="text-muted"> ${data[i].soldCount} vendidos </small>
                            </div>
                            <small class="text-muted"> </small>
                        </div>
                    </div>
                </div>
                `
            };
            document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        })

});
function ordenarProductosAscendente(productos) {
    return productos.slice().sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost));
}

// Ordena de forma descendente
let descendente = document.getElementById("sortByCountUp");
descendente.addEventListener("click", function () {
    const catID = localStorage.getItem("catID");
    const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let productosOrdenados = ordenarProductosDescendente(data.products);
            showCategoriesList(productosOrdenados);
            let productosHTML = "";
            for (let i = 0; i < productosOrdenados.length; i++) {
                productosHTML +=
                    `
                <div class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="${data[i].image}" alt="product image" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="mb-1">
                                    <h4>${data[i].name}-${data[i].currency} ${data[i].cost} </h4>
                                    <p>${data[i].description}</p>
                                </div>
                                <small class="text-muted"> ${data[i].soldCount} vendidos </small>
                            </div>
                            <small class="text-muted"> </small>
                        </div>
                    </div>
                </div>
                `
            };
            document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        })

});
function ordenarProductosDescendente(productos) {
    return productos.slice().sort((b, a) => parseFloat(a.cost) - parseFloat(b.cost));
}

// Relevancia
let relevancia = document.getElementById("sortByRel");
relevancia.addEventListener("click", function () {
    const catID = localStorage.getItem("catID");
    const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let productosOrdenados = ordenarProductosRelevancia(data.products);
            showCategoriesList(productosOrdenados);
            let productosHTML = "";
            for (let i = 0; i < productosOrdenados.length; i++) {
                productosHTML +=
                    `
                <div class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="${data[i].image}" alt="product image" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="mb-1">
                                    <h4>${data[i].name}-${data[i].currency} ${data[i].cost} </h4>
                                    <p>${data[i].description}</p>
                                </div>
                                <small class="text-muted"> ${data[i].soldCount} vendidos </small>
                            </div>
                            <small class="text-muted"> </small>
                        </div>
                    </div>
                </div>
                `
            };
            document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        })
});

function ordenarProductosRelevancia(productos) {
    return productos.sort((b, a) => parseInt(a.soldCount) - parseInt(b.soldCount));
}

function updateCategoryTitle(categoryName, categoryTitle) {
    categoryTitle.innerHTML = categoryName;
  }

  document.getElementById("clearRangeFilterPrice").addEventListener("click", function(){
    
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";

    minPrice = undefined;
    maxPrice = undefined;

    showCategoriesList();
});


