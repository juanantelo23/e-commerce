

document.addEventListener('DOMContentLoaded', function () {


    // Obtener el ID del producto almacenado en el almacenamiento local
    const productID = localStorage.getItem("productID");
  
  
    // Construir la URL del JSON
    const catID = localStorage.getItem("catID");
    const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
  
  
    // Obtener el elemento donde se mostrarán los detalles del producto
    const productInfoContainer = document.getElementById('product-info-container');
  
  
    // Realizar una solicitud GET al JSON
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Buscar el producto seleccionado por su ID
        const selectedProduct = data.products.find(product => product.id === parseInt(productID));
  
  
        if (selectedProduct) {
          // Llenar el contenedor con los detalles del producto
          productInfoContainer.innerHTML = `
                    <div class="container product-info">
                        <h2 class="p-info" id="product-name">${selectedProduct.name}</h2>
                        <p>Precio <span id="product-price">${selectedProduct.currency} ${selectedProduct.cost}</span></p>
                        <p>Descripción <span id="product-description">${selectedProduct.description}</span></p>
                        <p>Categoría <span id="product-category">${data.catName}</span></p>
                        <p>Cantidad de vendidos <span id="product-soldCount">${selectedProduct.soldCount}</span></p>
                        <p>Imágenes ilustrativas</p>
                        <img src="${selectedProduct.image}" alt="${selectedProduct.name}">
                    </div>
                `;
        } else {
          console.error("Producto no encontrado");
        }
      })
      .catch(error => {
        console.error("Error al cargar los detalles del producto:", error);
      });
  });
  
  
  