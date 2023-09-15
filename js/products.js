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

    searchFilters(".busqueda", ".searching");
});
//Función async para obtener los datos de la API
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
        <div id="${product.id}" class="list-group-item list-group-item-action searching">
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
    
    //Se guarda en un localStorage el ID del producto seleccionado
    const productListItems = document.querySelectorAll('.list-group-item.searching');
    productListItems.forEach(function(item) {
        item.addEventListener("click", function() {
            const productId = item.id;
            localStorage.setItem("productID", productId);
            window.location = "product-info.html";
        });
    });




    return htmlContentToAppend;
}



//Funcion que indica la categoria
function updateCategoryTitle(categoryName, categoryTitle) {
    categoryTitle.innerHTML = categoryName;
}

  //Funcion para la barra de busqueda
const d = document;
function searchFilters(input, selector){
    d.addEventListener("keyup", e => {
        if(e.target.matches(input)) {
            d.querySelectorAll(selector).forEach(el => el.textContent.toLowerCase().includes(e.target.value)
            ?el.classList.remove("filter")
            :el.classList.add("filter")
            );
            
        }
    })
}

// Ordena de forma ascendente          
let ascendente = document.getElementById("sortByCountDow");
ascendente.addEventListener("click", function () {
    const catID = localStorage.getItem("catID");
    const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let productosOrdenados = ordenarProductosAscendente(data.products);
            let ordenadosAsc = showCategoriesList(productosOrdenados);
            
            document.getElementById("cat-list-container").innerHTML = ordenadosAsc;
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
            let ordenadosDesc = showCategoriesList(productosOrdenados);
           
            document.getElementById("cat-list-container").innerHTML = ordenadosDesc;
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
            let relevancia = showCategoriesList(productosOrdenados);
            
            document.getElementById("cat-list-container").innerHTML = relevancia;
        })
});

function ordenarProductosRelevancia(productos) {
    return productos.sort((b, a) => parseInt(a.soldCount) - parseInt(b.soldCount));
}


  //Funcion de filtro por precio
let filtroPrecio = document.getElementById("rangeFilterPrice");
filtroPrecio.addEventListener("click", function(){
    let precioMin = document.getElementById("rangeFilterPriceMin").value;
    let precioMax = document.getElementById("rangeFilterPriceMax").value;

    if ((precioMin != undefined) && (precioMin != "") && (parseInt(precioMin)) >= 0){
        precioMin = parseInt(precioMin);
    }
    else{
        precioMin = undefined;
    }

    if ((precioMax != undefined) && (precioMax != "") && (parseInt(precioMax)) >= 0){
    precioMax = parseInt(precioMax);
    }
    else{
        precioMax = undefined;
    }
            
    const catID = localStorage.getItem("catID");
    const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let datos = data.products;
            let arrayFiltrado = [];
            for (let i = 0; i < datos.length; i++) {
                if (datos[i].cost >= precioMin && datos[i].cost <= precioMax ) {
                    arrayFiltrado.push(datos[i]);
                }
            };
            
            let filter = showCategoriesList(arrayFiltrado);
            
            document.getElementById("cat-list-container").innerHTML = filter;
        })

})
//Funcion Limpiar
document.getElementById("clearRangeFilterPrice").addEventListener("click", function(){
    
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";

    minPrice = undefined;
    maxPrice = undefined;

    const catID = localStorage.getItem("catID");
    const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            
            let lista = showCategoriesList(data.products);
            
            document.getElementById("cat-list-container").innerHTML = lista;
        })
});



